import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// `z` re-exported from astro:content is deprecated in Astro 7; astro/zod is
// the same instance without the warning, and without adding a dependency.
import { z } from "astro/zod";

/**
 * Curated projects. Hand-written prose — never a description scraped from
 * GitHub. The long-tail repo list is generated separately at build time and is
 * deliberately not part of this collection.
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    /** One line. Shown in listings. No marketing verbs. */
    tagline: z.string(),
    /** Primary language, as GitHub reports it. */
    lang: z.enum(["Rust", "TypeScript", "Python", "Shell", "HTML"]),
    repo: z.url(),
    npm: z.url().optional(),
    site: z.url().optional(),
    /** Only claim "shipped" when it is installable by a stranger. */
    status: z.enum(["shipped", "active", "early", "archived"]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** Lower sorts first within the featured set. */
    order: z.number().default(99),
    /** Optional screen recording. Paths are site-relative, under public/. */
    demo: z
      .object({
        src: z.string(),
        poster: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
  }),
});

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
 * The vendored HooCode documentation. Synced by `npm run docs` from
 * kolisachint/hoocode; never hand-edited here.
 *
 * The source files carry no frontmatter and are kept byte-identical to
 * upstream, so the schema is empty on purpose. Titles come from
 * src/data/hoocode-nav.json, falling back to the page's first H1.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs/hoocode" }),
  schema: z.object({}),
});

export const collections = { projects, docs };
