import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { hoocodeLinks, hoocodeStructure } from "./src/lib/satteri-hoocode.mjs";
import hoocodeNav from "./src/data/hoocode-nav.json" with { type: "json" };

/**
 * Redirects for the HooCode docs, kept in src/data/hoocode-nav.json. The site
 * served the TypeScript build's docs until 2026-10-22; their old URLs now land
 * on the closest page of the short Rust docs, so outside links keep working.
 * `session.md → quickstart.md` becomes `/hoocode/session → /hoocode/quickstart`,
 * and `index.md` means `/hoocode` itself.
 */
const docsPath = (file) =>
  `/hoocode/${file.replace(/\.md$/, "")}`.replace(/\/index$/, "");

const docsRedirects = Object.fromEntries(
  (hoocodeNav.redirects ?? []).map(({ from, to }) => [docsPath(from), docsPath(to)]),
);

// The ONLY place the public origin is written down. Everything else derives
// from `Astro.site`. Swapping in a custom domain is a one-line change here
// (plus a CNAME file in public/).
export default defineConfig({
  site: "https://kolisachint.github.io",
  base: "/",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  devToolbar: {
    enabled: false,
  },
  // /work and /about were folded into the home page on 2026-10-23.
  redirects: { ...docsRedirects, "/work": "/", "/about": "/" },
  markdown: {
    processor: satteri({
      mdastPlugins: [hoocodeLinks],
      hastPlugins: [hoocodeStructure],
    }),
    shikiConfig: {
      // Two themes, no default colour: Shiki emits --shiki-light-* and
      // --shiki-dark-* custom properties and the stylesheet picks one from
      // [data-theme]. Keeps highlighting in step with the toggle, no JS.
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      defaultColor: false,
      wrap: false,
    },
  },
});
