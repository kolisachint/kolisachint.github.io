# kolisachint.github.io

Source for [kolisachint.github.io](https://kolisachint.github.io) — personal
site, and the eventual home for the `hoo*` product documentation.

Astro, static output, no client framework. Design tokens come from the
[Hoo Brand System](https://github.com/kolisachint/hoo-brand).

```bash
npm install
npm run dev      # local server
npm run build    # static build to dist/
npm run check    # type check
npm run pins     # refresh src/data/pinned.json from GitHub (needs GITHUB_TOKEN)
npm run og       # re-render the social card
```

Deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`, on manual dispatch, and daily. Each run refreshes the
pinned-repo snapshot before building and commits it if it changed.

## Structure

- `/` is the home page: hero, a short bio, and a card for each of the GitHub
  pinned repos of `kolisachint`.
- `/<repo>/` is one product page per pinned repo (`src/pages/[repo].astro`),
  generated from `src/data/pinned.json`: description, topics, language, a README
  excerpt, and links to GitHub and the homepage.
- `/hoocode/` and its docs are written here (`src/pages/hoocode/`,
  `src/content/docs/hoocode/`) and are skipped by the generic product route.
- `/work` and `/about` redirect to `/`.

The project list is never edited by hand. `scripts/refresh-pins.mjs` (`npm run
pins`) queries the GitHub GraphQL API for the pinned repos and each README, and
writes `src/data/pinned.json`. Without `GITHUB_TOKEN`, or if a request fails, it
keeps the existing snapshot. The file says `"source": "seed"` until the first
successful fetch.

House rules for humans and agents live in [AGENTS.md](AGENTS.md).
