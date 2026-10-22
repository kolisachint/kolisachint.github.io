#!/usr/bin/env node
/**
 * Keeps the HooCode installer served by this site in step with its source.
 *
 *   npm run docs
 *
 * Writes public/hoocode/install.sh, a verbatim copy of install/install.sh in
 * kolisachint/hoocode (the Rust build), so that
 * `curl -fsSL <site>/hoocode/install.sh | sh` runs exactly the file reviewed
 * in that repository. The deploy workflow runs this weekly and commits drift.
 *
 * Until 2026-10-22 this script also vendored the TypeScript build's docs from
 * kolisachint/hoocode-ts. That build is retired and the Rust build has no user
 * docs folder, so the /hoocode pages are now written in this repository
 * (src/content/docs/hoocode/). public/hoocode-ts/ holds the retired TS
 * installers as they were last synced; nothing links to them and nothing
 * refreshes them.
 */
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OWNER = "kolisachint";
const REPO = "hoocode";
const SRC = "install/install.sh";
const OUT = resolve(ROOT, "public/hoocode/install.sh");

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

// Pin to the default branch's head commit, so the log says which revision the
// copy came from.
const repo = await api(`repos/${OWNER}/${REPO}`);
const head = await api(`repos/${OWNER}/${REPO}/commits/${repo.default_branch}`);
const sha = head.sha;

const res = await fetch(
  `https://raw.githubusercontent.com/${OWNER}/${REPO}/${sha}/${SRC}`,
  { headers: { "User-Agent": "kolisachint.github.io" } },
);
if (!res.ok) throw new Error(`raw ${res.status} on ${SRC}`);

// Verbatim: any transform here would be an unreviewed step between the file
// in the repository and the one people pipe into `sh`.
await writeFile(OUT, await res.text());

console.log(`synced ${SRC} from ${OWNER}/${REPO}@${sha.slice(0, 8)}`);
