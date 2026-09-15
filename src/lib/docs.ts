import nav from "../data/hoocode-nav.json";

export const DOCS_BASE = "/hoocode";

export interface DocLink {
  /** Collection id: "quickstart", "profiles/data", "index". */
  id: string;
  title: string;
  href: string;
}

export interface DocGroup {
  title: string;
  items: DocLink[];
}

export const source = nav.source;

function idFromPath(path: string): string {
  return path.replace(/\.md$/, "");
}

export function hrefFor(id: string): string {
  return id === "index" ? DOCS_BASE : `${DOCS_BASE}/${id}`;
}

/**
 * The sidebar, straight from the upstream docs.json. Adding a page to the
 * HooCode docs and listing it there is all it takes to appear here.
 */
export const groups: DocGroup[] = (nav.navigation ?? []).map((group) => ({
  title: group.title,
  items: group.items.map((item) => {
    const id = idFromPath(item.path);
    return { id, title: item.title, href: hrefFor(id) };
  }),
}));

/** Navigation order, flattened. Drives prev/next. */
export const ordered: DocLink[] = groups.flatMap((g) => g.items);

const byId = new Map(ordered.map((d) => [d.id, d]));

/**
 * Pages reachable by link but absent from docs.json — the profile examples,
 * for instance. They render, but they are not in the sidebar or the sequence.
 */
export function isListed(id: string): boolean {
  return byId.has(id);
}

export function titleFor(id: string, fallback?: string): string {
  return byId.get(id)?.title ?? fallback ?? id;
}

export function groupFor(id: string): string | undefined {
  return groups.find((g) => g.items.some((i) => i.id === id))?.title;
}

export function neighbours(id: string): {
  prev?: DocLink;
  next?: DocLink;
} {
  const i = ordered.findIndex((d) => d.id === id);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ordered[i - 1] : undefined,
    next: i < ordered.length - 1 ? ordered[i + 1] : undefined,
  };
}

/**
 * A meta description, pulled from the page's first real sentence.
 *
 * The upstream files carry no frontmatter, so there is nothing to read. Skip
 * the H1, any badge or image HTML, and fenced code; take the first line that
 * looks like prose.
 */
export function summarise(body: string, max = 155): string {
  let inFence = false;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !line) continue;
    if (line.startsWith("#") || line.startsWith("<") || line.startsWith("|")) {
      continue;
    }
    if (line.startsWith("-") || line.startsWith(">")) continue;

    const text = line
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → their text
      .replace(/[`*_]/g, "")
      .trim();

    if (text.length < 24) continue;
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}\u2026` : text;
  }

  return "HooCode documentation.";
}

/** Link back to the page's source, so a reader can fix it at the origin. */
export function sourceUrl(id: string): string {
  return `https://github.com/${source.repo}/blob/${source.branch}/${source.path}/${id}.md`;
}
