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
npm run repos    # refresh the committed GitHub repo snapshot
npm run og       # re-render the social card
```

Deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `master`, plus a weekly rebuild so the repository listing on
`/work` stays current.

House rules for humans and agents live in [AGENTS.md](AGENTS.md).
