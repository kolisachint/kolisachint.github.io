/**
 * Page screenshots over the Chrome DevTools Protocol.
 *
 * `--window-size` was the obvious way to do this and it is wrong: macOS
 * enforces a minimum window width of roughly 500px, so every "390px" shot came
 * out as the left-hand 390 pixels of an 800px layout — which looks exactly like
 * a horizontal-overflow bug that isn't there. Emulation.setDeviceMetricsOverride
 * has no such floor, emulates prefers-color-scheme properly, and can capture
 * past the fold in one frame.
 *
 * No dependencies: Node 22 ships a global WebSocket, and the repo already
 * assumed a Chromium binary for the OG card.
 *
 *   node scripts/shot.mjs --base http://127.0.0.1:4399 --out .shots \
 *     --widths 1440,820,390 --themes dark,light -- / /work/ /about/
 */
import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DEFAULT_CHROME =
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/` +
  `chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

// --- args ------------------------------------------------------------------

const argv = process.argv.slice(2);
const paths = [];
const opt = {
  base: "http://127.0.0.1:4399",
  out: ".shots",
  widths: "1440,820,390",
  themes: "dark,light",
  scale: "2",
  maxHeight: "8000",
  chrome: process.env.CHROME || DEFAULT_CHROME,
};

for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--") {
    paths.push(...argv.slice(i + 1));
    break;
  }
  if (a.startsWith("--")) opt[camel(a.slice(2))] = argv[++i];
  else paths.push(a);
}

function camel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

if (!paths.length) paths.push("/");

const widths = opt.widths.split(",").map(Number);
const themes = opt.themes.split(",");
const scale = Number(opt.scale);
const maxHeight = Number(opt.maxHeight);

// --- browser ---------------------------------------------------------------

const port = 9000 + Math.floor(Math.random() * 900);

const chrome = spawn(
  opt.chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

chrome.on("error", (e) => fail(`cannot start chromium: ${e.message}`));

function fail(msg) {
  console.error(msg);
  chrome.kill();
  process.exit(1);
}

/** Chrome prints "DevTools listening on ws://…" once the port is bound. */
const wsUrl = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("chromium did not start")), 15000);
  let buf = "";
  chrome.stderr.on("data", (d) => {
    buf += d;
    const m = buf.match(/ws:\/\/\S+/);
    if (m) {
      clearTimeout(timer);
      resolve(m[0]);
    }
  });
}).catch((e) => fail(e.message));

const ws = new WebSocket(wsUrl);
await new Promise((r, j) => {
  ws.onopen = r;
  ws.onerror = () => j(new Error("devtools socket failed"));
}).catch((e) => fail(e.message));

let seq = 0;
const pending = new Map();
const waiters = [];

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    return;
  }
  for (let i = waiters.length - 1; i >= 0; i--) {
    if (waiters[i].method === msg.method) waiters.splice(i, 1)[0].resolve(msg.params);
  }
};

function send(method, params = {}, sessionId) {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

function once(method, ms = 15000) {
  return new Promise((resolve) => {
    const w = { method, resolve };
    waiters.push(w);
    setTimeout(() => {
      const i = waiters.indexOf(w);
      if (i !== -1) waiters.splice(i, 1);
      resolve(null);
    }, ms);
  });
}

// One tab, reused for every shot. Attaching flat gives a sessionId to address.
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const call = (method, params) => send(method, params, sessionId);

await call("Page.enable");
await call("Runtime.enable");

// --- capture ---------------------------------------------------------------

await rm(opt.out, { recursive: true, force: true });
await mkdir(opt.out, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const path of paths) {
  const slug =
    path.replace(/^\//, "").replace(/\/$/, "").replace(/\.html$/, "").replace(/\//g, "-") ||
    "home";

  for (const theme of themes) {
    await call("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: theme }],
    });

    for (const width of widths) {
      await call("Emulation.setDeviceMetricsOverride", {
        width,
        height: 900,
        deviceScaleFactor: scale,
        mobile: width < 600,
      });

      const loaded = once("Page.loadEventFired");
      await call("Page.navigate", { url: opt.base + path });
      await loaded;
      // Webfonts and the video poster settle after load.
      await sleep(400);

      const { cssContentSize } = await call("Page.getLayoutMetrics");
      const height = Math.min(Math.ceil(cssContentSize.height), maxHeight);

      const { data } = await call("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width, height, scale: 1 },
      });

      const file = join(opt.out, `${slug}--${theme}--${width}.png`);
      await writeFile(file, Buffer.from(data, "base64"));
      console.log(`  ${file}  ${width}\u00d7${height}`);
    }
  }
}

// A page wider than its viewport is a bug; report it rather than leave it to
// be spotted in an image.
await call("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 900,
  deviceScaleFactor: 1,
  mobile: true,
});

for (const path of paths) {
  const loaded = once("Page.loadEventFired");
  await call("Page.navigate", { url: opt.base + path });
  await loaded;
  const { result } = await call("Runtime.evaluate", {
    expression: `document.documentElement.scrollWidth - document.documentElement.clientWidth`,
    returnByValue: true,
  });
  if (result.value > 0) {
    console.log(`  overflow: ${path} scrolls ${result.value}px horizontally at 390px`);
    process.exitCode = 1;
  }
}

ws.close();
chrome.kill();
