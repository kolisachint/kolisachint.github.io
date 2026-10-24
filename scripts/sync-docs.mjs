#!/usr/bin/env node
/**
 * Keeps the /hoocode pages and installer in step with kolisachint/hoocode.
 *
 *   npm run docs
 *
 * 1. The pages. Since 2026-10-24 they are written in the hoocode repository,
 *    in docs/user/, next to the code. This copies that folder from the
 *    **latest release tag** into src/content/docs/hoocode/, so the site always
 *    describes a version people can install, and records the tag as
 *    `source.writtenFor` in src/data/hoocode-nav.json. docs/user/README.md is
 *    for contributors and is not copied. If the tag has no docs/user/ folder,
 *    or it is missing a page the sidebar lists, the pages here are left alone.
 *
 * 2. The installer. public/hoocode/install.sh is a verbatim copy of
 *    install/install.sh on the default branch, so that
 *    `curl -fsSL <site>/hoocode/install.sh | sh` runs exactly the file
 *    reviewed in that repository.
 *
 * The deploy workflow runs this daily, builds and audits the result, and
 * commits it only if both pass. Without network access it fails and changes
 * nothing; the committed copies keep the site building offline.
 */
import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OWNER = "kolisachint";
const REPO = "hoocode";
const DOCS_SRC = "docs/user";
const DOCS_OUT = resolve(ROOT, "src/content/docs/hoocode");
const NAV = resolve(ROOT, "src/data/hoocode-nav.json");
const INSTALL_SRC = "install/install.sh";
const INSTALL_OUT = resolve(ROOT, "public/hoocode/install.sh");

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

async function raw(ref, path) {
  const res = await fetch(
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${ref}/${path}`,
    { headers: { "User-Agent": "kolisachint.github.io" } },
  );
  if (!res.ok) throw new Error(`raw ${res.status} on ${path}@${ref}`);
  return res.text();
}

// --- 1. the pages, from the latest release ----------------------------------

const release = await api(`repos/${OWNER}/${REPO}/releases/latest`);
const tag = release.tag_name;
const nav = JSON.parse(await readFile(NAV, "utf8"));

let listing = null;
try {
  listing = await api(`repos/${OWNER}/${REPO}/contents/${DOCS_SRC}?ref=${tag}`);
} catch {
  // 404: this release predates docs/user/.
}

const pages = (listing ?? [])
  .filter((f) => f.type === "file" && f.name.endsWith(".md") && f.name !== "README.md")
  .map((f) => f.name);

// The landing is src/pages/hoocode/index.astro, not a markdown page.
const wanted = nav.navigation
  .flatMap((g) => g.items.map((i) => i.path))
  .filter((p) => p !== "index.md");
const missing = wanted.filter((p) => !pages.includes(p));

if (!listing) {
  console.warn(`${tag} has no ${DOCS_SRC}/ — pages left as they are`);
} else if (missing.length) {
  console.warn(`${tag} is missing ${missing.join(", ")} — pages left as they are`);
} else {
  const fetched = await Promise.all(pages.map(async (name) => [name, await raw(tag, `${DOCS_SRC}/${name}`)]));

  // Mirror: a page removed upstream is removed here.
  for (const name of await readdir(DOCS_OUT)) {
    if (name.endsWith(".md") && !pages.includes(name)) await rm(resolve(DOCS_OUT, name));
  }
  for (const [name, text] of fetched) await writeFile(resolve(DOCS_OUT, name), text);

  nav.source.writtenFor = tag;
  nav.source.updated = release.published_at.slice(0, 10);
  await writeFile(NAV, `${JSON.stringify(nav, null, 2)}\n`);
  console.log(`synced ${pages.length} pages from ${OWNER}/${REPO}@${tag}`);
}

// --- 2. the installer, from the default branch -------------------------------

const repo = await api(`repos/${OWNER}/${REPO}`);
const head = await api(`repos/${OWNER}/${REPO}/commits/${repo.default_branch}`);

// Verbatim: any transform here would be an unreviewed step between the file
// in the repository and the one people pipe into `sh`.
await writeFile(INSTALL_OUT, await raw(head.sha, INSTALL_SRC));
console.log(`synced ${INSTALL_SRC} from ${OWNER}/${REPO}@${head.sha.slice(0, 8)}`);
