import snapshot from "../data/repos.json";

export interface Repo {
  name: string;
  description: string | null;
  lang: string | null;
  url: string;
  stars: number;
  updated: string;
  fork: boolean;
  archived: boolean;
}

/**
 * Repos with a curated entry in src/content/projects — excluded from the tail.
 *
 * Four, deliberately. Everything else that used to be written up at length now
 * gets a single row in the tail instead: still findable, no longer competing
 * with the four for a reader's attention.
 */
const CURATED = new Set([
  "hoocode",
  "embeddingsearchtools",
  "webtools",
  "voicetools",
]);

/** Meta-repos that are not work: the profile README, this site itself. */
const HIDDEN = new Set(["kolisachint", "kolisachint.github.io"]);

/**
 * Everything before this was learning in public — course exercises, notebook
 * dumps, Docker scratchpads. Still on GitHub, deliberately not on the shelf.
 */
const SINCE = "2024-01-01";

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

function normalise(r: ApiRepo): Repo {
  return {
    name: r.name,
    description: r.description,
    lang: r.language,
    url: r.html_url,
    stars: r.stargazers_count,
    updated: r.pushed_at,
    fork: r.fork,
    archived: r.archived,
  };
}

/**
 * The long tail of public repos.
 *
 * Fetched live at build time when the network allows, so the list never goes
 * stale. Falls back to the committed snapshot in src/data/repos.json so that
 * `npm run build` always works — offline, rate-limited, or in a fresh clone.
 * Refresh the snapshot with `npm run repos`.
 */
export async function getRepos(): Promise<{ repos: Repo[]; live: boolean }> {
  let repos: Repo[] = snapshot as Repo[];
  let live = false;

  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(
      "https://api.github.com/users/kolisachint/repos?per_page=100&sort=pushed",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "kolisachint.github.io",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (res.ok) {
      const json = (await res.json()) as ApiRepo[];
      repos = json.filter((r) => !r.private).map(normalise);
      live = true;
    } else {
      console.warn(`[github] ${res.status} — using snapshot`);
    }
  } catch (err) {
    console.warn(`[github] fetch failed (${String(err)}) — using snapshot`);
  }

  return { repos, live };
}

/**
 * Everything worth listing that does not already have a curated entry.
 *
 * The rule is deliberately strict: if a repo has no description, or says it is
 * a placeholder, it is not work and does not appear. Undescribed repos stay
 * discoverable on GitHub; they just do not get shelf space here.
 */
export function tail(repos: Repo[]): Repo[] {
  return repos
    .filter((r) => !CURATED.has(r.name))
    .filter((r) => !HIDDEN.has(r.name))
    .filter((r) => !r.fork)
    .filter((r) => r.updated >= SINCE)
    .filter((r) => (r.description?.trim().length ?? 0) > 0)
    .filter((r) => !/placeholder/i.test(r.description ?? ""))
    .sort((a, b) => b.updated.localeCompare(a.updated));
}
