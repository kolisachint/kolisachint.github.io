import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// `z` re-exported from astro:content is deprecated in Astro 7; astro/zod is
// the same instance without the warning, and without adding a dependency.
import { z } from "astro/zod";

/**
 * Reserved for v2. Registering an empty collection makes every build warn, so
 * it stays commented until there is a first note to put in it.
 *
 * const notes = defineCollection({
 *   loader: glob({ pattern: "**\/*.md", base: "./src/content/notes" }),
 *   schema: z.object({
 *     title: z.string(),
 *     date: z.coerce.date(),
 *     summary: z.string().optional(),
 *     tags: z.array(z.string()).default([]),
 *     draft: z.boolean().default(false),
 *   }),
 * });
 */

/**
 * The hoocode documentation: short pages written for this site, from the Rust
 * build's README, --help and CHANGELOG. No frontmatter, so the schema is empty;
 * titles come from src/data/hoocode-nav.json, falling back to the first H1.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs/hoocode" }),
  schema: z.object({}),
});

export const collections = { docs };
