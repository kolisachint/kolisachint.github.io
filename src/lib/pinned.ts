import snapshot from "../data/pinned.json";

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string | null;
  /** Short plain-text excerpt of the README; paragraphs split by a blank line. */
  readme: string;
}

/**
 * The project list: the GitHub pinned repos, as last fetched by
 * `npm run pins` (scripts/refresh-pins.mjs). Committed, so the build never
 * needs a network or a token. `source` is "seed" until the first real fetch.
 */
export const pinned: PinnedRepo[] = snapshot.repos as PinnedRepo[];
export const pinnedSource: string = snapshot.source;
