#!/usr/bin/env node
/**
 * Refreshes the committed pinned-repo snapshot at src/data/pinned.json.
 *
 * The site's project list is the GitHub pinned repos of kolisachint, nothing
 * else. Pins exist only in the GraphQL API, which needs a token (the Actions
 * GITHUB_TOKEN is enough for public pins). For each pin this also fetches the
 * README through REST and stores a short plain-text excerpt for its page.
 *
 *   GITHUB_TOKEN=... npm run pins
 *
 * With no token, or if anything fails, the existing snapshot is kept and a
 * warning is printed. This script never fails the build.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "kolisachint";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/pinned.json");

const QUERY = `{
  user(login: "${USER}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name description url homepageUrl stargazerCount pushedAt
          primaryLanguage { name }
          repositoryTopics(first: 10) { nodes { topic { name } } }
        }
      }
    }
  }
}`;

/** First meaningful paragraph or two of a README, as plain text. */
export function excerpt(md, max = 480) {
  const text = md
    .replace(/\r/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");
  const paras = [];
  let len = 0;
  for (const block of text.split(/\n\s*\n/)) {
    let p = block.trim();
    if (!p) continue;
    if (/^(#|>|\||[-*+]\s|\d+\.\s|={3,}|-{3,}|!\[|\[!\[|<)/.test(p)) continue;
    p = p
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/[*_`]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (p.length < 25) continue;
    paras.push(p);
    len += p.length;
    if (paras.length === 2 || len >= max) break;
  }
  let out = paras.join("\n\n");
  if (out.length > max) out = out.slice(0, max).replace(/\s+\S*$/, "") + "…";
  return out;
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[pins] no GITHUB_TOKEN, keeping the existing snapshot");
    return;
  }
  const previous = JSON.parse(await readFile(OUT, "utf8"));
  const headers = { "User-Agent": "kolisachint.github.io", Authorization: `bearer ${token}` };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  const nodes = (json.data?.user?.pinnedItems?.nodes ?? []).filter((n) => n?.name);
  if (nodes.length === 0) throw new Error("no pinned repositories returned");

  const repos = [];
  for (const n of nodes) {
    const old = previous.repos?.find((r) => r.name === n.name);
    let readme = old?.readme ?? "";
    try {
      const r = await fetch(`https://api.github.com/repos/${USER}/${n.name}/readme`, {
        headers: { ...headers, Accept: "application/vnd.github.raw+json" },
        signal: AbortSignal.timeout(15000),
      });
      if (r.ok) readme = excerpt(await r.text());
      else console.warn(`[pins] README ${n.name}: ${r.status}, keeping previous excerpt`);
    } catch (err) {
      console.warn(`[pins] README ${n.name}: ${err}, keeping previous excerpt`);
    }
    repos.push({
      name: n.name,
      description: n.description ?? "",
      url: n.url,
      homepage: n.homepageUrl || null,
      language: n.primaryLanguage?.name ?? null,
      stars: n.stargazerCount ?? 0,
      topics: (n.repositoryTopics?.nodes ?? []).map((t) => t.topic.name),
      pushedAt: n.pushedAt ?? null,
      readme,
    });
  }

  // Leave the file alone when nothing but the clock changed, so the deploy
  // workflow does not commit a new snapshot on every run.
  if (previous.source === "graphql" && JSON.stringify(previous.repos) === JSON.stringify(repos)) {
    console.log("[pins] no change");
    return;
  }
  const data = { source: "graphql", fetchedAt: new Date().toISOString(), repos };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[pins] wrote ${repos.length} pinned repositories`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => console.warn(`[pins] ${err}, keeping the existing snapshot`));
}
