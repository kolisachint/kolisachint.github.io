#!/usr/bin/env node
/**
 * Vendors the HooCode documentation into this repo.
 *
 *   npm run docs
 *
 * The docs are authored in the hoocode repository, at
 * packages/coding-agent/docs. This script copies them here rather than the
 * site fetching them at build time, for one reason: AGENTS.md requires that
 * `npm run build` work with no network and no token. Vendoring keeps that
 * true. The cost is that the copy can go stale, so the deploy workflow runs
 * this weekly and commits any drift.
 *
 * What it writes:
 *   src/content/docs/hoocode/**.md   the pages
 *   src/data/hoocode-nav.json        sidebar, redirects and the source commit
 *   public/hoocode/images/*          images referenced by the pages
 *   public/hoocode/install.{sh,ps1}  the one-click installers, served verbatim
 *
 * Nothing here is hand-edited. Fix the hoocode repo and re-run.
 */
import { writeFile, mkdir, rm } from "node:fs/promises";
import { basename, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OWNER = "kolisachint";
const REPO = "hoocode";
const SRC = "packages/coding-agent/docs";

const DOCS_OUT = resolve(ROOT, "src/content/docs/hoocode");
const IMG_OUT = resolve(ROOT, "public/hoocode/images");
const NAV_OUT = resolve(ROOT, "src/data/hoocode-nav.json");
// The installers are served from here, so that
// `curl -fsSL https://kolisachint.github.io/hoocode/install.sh | sh` is the
// documented one-liner rather than a raw.githubusercontent.com URL whose shape
// changes whenever the default branch does.
const INSTALL_OUT = resolve(ROOT, "public/hoocode");
const INSTALLERS = ["install/install.sh", "install/install.ps1"];

const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "kolisachint.github.io",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function api(path) {
  const res = await fetch(`https://api.github.com/${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${path}`);
  return res.json();
}

// -- Resolve the default branch and its head commit, so the vendored copy can
//    say exactly which revision it came from. --------------------------------

const repo = await api(`repos/${OWNER}/${REPO}`);
const branch = repo.default_branch;
const head = await api(`repos/${OWNER}/${REPO}/commits/${branch}`);
const sha = head.sha;

const tree = await api(
  `repos/${OWNER}/${REPO}/git/trees/${sha}?recursive=1`,
);

const entries = tree.tree.filter(
  (t) => t.type === "blob" && t.path.startsWith(`${SRC}/`),
);

if (entries.length === 0) {
  console.error(`No files found under ${SRC} at ${sha.slice(0, 8)}`);
  process.exit(1);
}

async function raw(path) {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${sha}/${path}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "kolisachint.github.io" },
  });
  if (!res.ok) throw new Error(`raw ${res.status} on ${path}`);
  return res;
}

// -- Clean, so a file deleted upstream disappears here too. -------------------

await rm(DOCS_OUT, { recursive: true, force: true });
await rm(IMG_OUT, { recursive: true, force: true });
await mkdir(DOCS_OUT, { recursive: true });
await mkdir(IMG_OUT, { recursive: true });

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]);

let pages = 0;
let images = 0;
let nav = null;

for (const entry of entries) {
  const rel = entry.path.slice(SRC.length + 1);
  const ext = extname(rel).toLowerCase();

  if (rel === "docs.json") {
    nav = JSON.parse(await (await raw(entry.path)).text());
    continue;
  }

  if (ext === ".md") {
    const text = await (await raw(entry.path)).text();
    const out = resolve(DOCS_OUT, rel);
    await mkdir(dirname(out), { recursive: true });
    // No frontmatter is injected. The title comes from the first H1 at render
    // time, so the vendored file stays byte-identical to the source.
    await writeFile(out, text);
    pages++;
    continue;
  }

  if (IMAGE_EXT.has(ext)) {
    const buf = Buffer.from(await (await raw(entry.path)).arrayBuffer());
    const out = resolve(IMG_OUT, rel.replace(/^images\//, ""));
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    images++;
  }
}

if (!nav) {
  console.error(`${SRC}/docs.json is missing — the sidebar is generated from it`);
  process.exit(1);
}

// -- The installers. They live outside SRC, so they need their own pass rather
//    than falling out of the tree filter above. Copied verbatim: the file people
//    pipe into `sh` has to be byte-identical to the one reviewed in the
//    repository, and any transform here would be an unreviewable step between
//    the two. ----------------------------------------------------------------

await mkdir(INSTALL_OUT, { recursive: true });
let installers = 0;
for (const path of INSTALLERS) {
  const text = await (await raw(path)).text();
  await writeFile(resolve(INSTALL_OUT, basename(path)), text);
  installers++;
}

await mkdir(dirname(NAV_OUT), { recursive: true });
await writeFile(
  NAV_OUT,
  JSON.stringify(
    {
      source: {
        repo: `${OWNER}/${REPO}`,
        path: SRC,
        branch,
        sha,
        syncedAt: new Date().toISOString(),
      },
      navigation: nav.navigation ?? [],
      redirects: nav.redirects ?? [],
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `synced ${pages} pages, ${images} images, ${installers} installers from ${OWNER}/${REPO}@${sha.slice(0, 8)}`,
);
