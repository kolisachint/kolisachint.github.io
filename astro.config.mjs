import { defineConfig } from "astro/config";

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
});
