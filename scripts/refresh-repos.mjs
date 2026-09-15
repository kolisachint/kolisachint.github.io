#!/usr/bin/env node
/**
 * Refreshes the committed repo snapshot at src/data/repos.json.
 *
 * The site fetches GitHub live at build time; this snapshot is the fallback
 * that keeps `npm run build` working offline, rate-limited, or in CI without a
 * token. Run it whenever the repo list changes meaningfully:
 *
 *   npm run repos
 *
 * Honours GITHUB_TOKEN if present (higher rate limit, same public data).
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/repos.json",
);

const token = process.env.GITHUB_TOKEN;
const res = await fetch(
  "https://api.github.com/users/kolisachint/repos?per_page=100&sort=pushed",
  {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "kolisachint.github.io",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  },
);

if (!res.ok) {
  console.error(`GitHub API ${res.status} ${res.statusText}`);
  process.exit(1);
}

const repos = (await res.json())
  .filter((r) => !r.private)
  .map((r) => ({
    name: r.name,
    description: r.description,
    lang: r.language,
    url: r.html_url,
    stars: r.stargazers_count,
    updated: r.pushed_at,
    fork: r.fork,
    archived: r.archived,
  }))
  .sort((a, b) => b.updated.localeCompare(a.updated));

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`wrote ${repos.length} repos → ${OUT}`);
