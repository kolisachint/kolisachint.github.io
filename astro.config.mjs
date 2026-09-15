import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { hoocodeLinks, hoocodeStructure } from "./src/lib/satteri-hoocode.mjs";
import hoocodeNav from "./src/data/hoocode-nav.json" with { type: "json" };

/**
 * The HooCode docs carry their own redirect table in docs.json. Mirror it here
 * so renamed pages keep working, rather than maintaining a second list by hand.
 * `session.md → session-format.md` becomes `/hoocode/session → /hoocode/session-format`.
 */
const docsRedirects = Object.fromEntries(
  (hoocodeNav.redirects ?? []).map(({ from, to }) => [
    `/hoocode/${from.replace(/\.md$/, "")}`,
    `/hoocode/${to.replace(/\.md$/, "")}`,
  ]),
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
  redirects: docsRedirects,
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
