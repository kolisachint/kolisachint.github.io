# AGENTS.md

Portable instructions for any agent working in this repo. Read this first. If
something here conflicts with a general habit you have, this file wins.

---

## What this is

The public personal site of Sachin Koli, and the eventual landing zone for the
`hoo*` product docs (HooCode, HooCowork, HooTeams).

Two audiences, in this order:

1. **Developers** who arrived from a GitHub repo or an npm package and want to
   know who wrote it.
2. **Recruiters and hiring agents** who need to establish credibility in thirty
   seconds and find a way to make contact.

Everything on this site is public the moment it is committed. Write as if a
current employer, a future employer, and a stranger are all reading it — because
they are.

---

## The publish gate — the only rule that can actually hurt

The private life repo at `~/github/my-life` is the source of truth for career
facts. You may **read** it freely.

You may **not** move anything from it into this repo without explicit approval
in the current session.

The gate applies to any fact, sentence, number, date, or file that originates in
`~/github/my-life` and would land in a committed file here. Before writing it:

- Quote the exact text you intend to publish.
- Say which file it came from.
- Wait for a yes.

A yes covers that fact only. It is not a standing licence for the file, the
directory, or "similar facts".

**Never publish, never ask:** compensation of any kind, bank or investment
balances, budgets, EMIs, loans, retirement arithmetic, dates of birth, home or
school addresses, phone numbers, government identifiers, family members' names,
health matters, notice-period terms, credentials, tokens, or anything from
`.env`. These are not judgement calls. Do not surface them for approval; simply
do not use them.

`data/career-facts.md` in that repo is the single source of truth for any title,
date, employer, award, or technology this site states. If a fact is not in there,
it is not verified, and it does not go on the site.

---

## Client anonymisation — never name a client

Employers may be named: Tata Consultancy Services, Sears IT & Management
Services India, Cognizant, Mahindra Satyam.

Clients may not. Use the agreed framings:

| Real client | Public framing |
|---|---|
| Lloyds Banking Group | UK tier-1 retail bank |
| Sears Holdings | US Fortune-500 retailer |
| Saudi Telecom | Gulf national telecom operator |
| Barclays | UK tier-1 bank (emerging markets) |
| Telstra | Australian national telecom operator |

The two industry awards are public record and may be named in full — Banking
Tech Awards 2024 and Card & Payments Awards 2025. That a reader can connect a
public award to a public employer is their inference, not our disclosure. Do not
help the inference along by pairing the award with a client name in the same
sentence.

---

## Claims this site does not make

Do not write **LLM engineering**, **GenAI**, **MLOps**, **model training**, or
**model deployment** anywhere on this site. The work is *inference* and
*systems*: ONNX Runtime, int8 quantisation, embedding search, ASR, multi-provider
LLM APIs, agent runtimes. Those are the accurate words and they are strong
enough. The inflated ones invite a conversation about work that was never done.

Do not invent metrics. Do not round a number up. Do not describe something as
"production" unless it is. If a claim cannot be traced to `career-facts.md` or a
public repo, cut it.

---

## Stack — Astro, and do not add to it

- **Astro**, static output, zero client JS by default.
- **No UI framework.** No React, Vue, Svelte. If a page needs interactivity, it
  gets a `<script>` tag measured in lines, not a runtime measured in kilobytes.
- **No CSS framework.** Plain CSS with the design tokens below. No Tailwind, no
  preprocessor.
- **No analytics, no fonts-as-a-service beacons, no third-party embeds** without
  asking first. Fonts are self-hosted via `@fontsource-variable/*`.
- **Dependencies are a cost.** Adding one is a decision to raise, not a detail to
  slip into a commit.

The full dependency list, and why each one is there:

| Package | Why |
|---|---|
| `astro` | the framework |
| `@fontsource-variable/inter` | self-hosted Inter, no Google beacon |
| `@fontsource-variable/jetbrains-mono` | self-hosted JetBrains Mono |
| `@astrojs/check`, `typescript`, `@types/node` | dev only — type checking |

Deployment is GitHub Actions to GitHub Pages. The site must build with
`npm run build` and nothing else — no network, no token, no prior step.

```
npm run dev      local server
npm run build    static build to dist/
npm run check    astro check — must be 0 errors before a commit
npm run repos    refresh the committed GitHub snapshot
npm run og       re-render public/brand/og.png from /og-card
```

The domain is undecided. Never hardcode `kolisachint.github.io` in a page,
component, or content file. Read it from `site` in `astro.config.mjs` so a custom
domain is a one-line change.

---

## Design tokens are canonical — do not invent colour

The visual system comes from `github.com/kolisachint/hoo-brand`. It is already
decided. Reproduce it; do not redesign it.

```css
--hoo-cyan:      #00F0FF;   /* the only accent */
--hoo-cyan-dim:  rgba(0, 240, 255, 0.15);
--hoo-cyan-glow: rgba(0, 240, 255, 0.40);

--hoo-base:      #09090B;   /* background */
--hoo-card:      #18181B;   /* card surface */
--hoo-border:    #27272A;
--hoo-white:     #FAFAFA;   /* primary text */
--hoo-text-2:    #E4E4E7;
--hoo-text-3:    #A1A1AA;
--hoo-muted:     #71717A;

--hoo-r-card:    20px;
--hoo-r-badge:   12px;
```

Rules that follow from it:

- **Cyan is the only accent.** No second hue, ever. No gradients between hues.
- **One cyan moment per viewport.** The glow tokens exist for emphasis, not
  atmosphere. Used everywhere, they read cheap.
- **Greys come from the zinc scale.** Do not introduce a grey that is not listed.
- Dark is the default. Light is a toggle, and it honours
  `prefers-color-scheme` on first visit.

---

## Typography — mono is seasoning, not the meal

- **JetBrains Mono** for labels, metadata, navigation, code, tables of versions,
  anything terminal-adjacent.
- **Inter** for prose and headings.
- Prose sets to an editorial measure, roughly 68 characters. Do not let body text
  run the full width of a wide screen.
- Fluid scale via `clamp()`. Display lands around 32 → 56px.

An all-mono page reads as a product landing page. This is a person's site. The
restraint is the point.

---

## Headlines are assigned — do not rewrite them

Four lines, one slot each. They were chosen together. Do not reword, merge, or
relocate them without asking.

| Slot | Line |
|---|---|
| Home `<h1>` | Architect of large data systems. Author of small sharp tools. |
| Home subhead | I work on data platforms, coding agents, and the space between them. |
| `/work` lead | I build data platforms at bank scale — and the tools I wish I'd had. |
| `/about` opener | Eighteen years moving data. Lately, teaching agents to move it for me. |

---

## Content conventions

- Projects live in `src/content/projects/` as a typed collection. The schema in
  `src/content.config.ts` is the contract; extend the schema before adding a
  field to an entry. The `notes` collection is written but commented out —
  registering an empty collection makes every build warn. Uncomment it when
  there is a first note.
- Facts that more than one page states live in `src/site.ts`, not in a page.
  That file is where the publish gate's approvals are recorded.
- Project entries are **curated prose**, not a description scraped from GitHub.
  Say what the thing does, what was hard about it, and why it exists. The
  long-tail repo list is generated from the GitHub API at build time and is
  deliberately separate from the curated set.
- One `<h1>` per page. Headings descend without skipping.
- Every image has real alt text. Every external link to a hoo\* product points at
  the canonical repo or docs page, never a fork.
- British spelling in prose, to match the rest of his writing.

---

## Repo map

```
AGENTS.md                this file
astro.config.mjs         `site` lives here — the only place the domain appears
scripts/
  refresh-repos.mjs      GitHub snapshot refresher (npm run repos)
  make-og.sh             renders /og-card → public/brand/og.png (npm run og)
public/
  brand/sk*.svg          the personal monogram, dark + light
  brand/favicon*.svg     32×favicon, dark + light
  brand/og.png           social card, generated — never hand-edited
  img/                   photography
src/
  site.ts                name, headlines, profiles, career record
  content.config.ts      collection schemas
  content/projects/      curated project entries, one markdown file each
  data/repos.json        committed GitHub snapshot — build fallback
  lib/github.ts          live fetch + snapshot fallback + the tail filter
  styles/tokens.css      raw brand palette → semantic tokens, both themes
  styles/global.css      reset, base elements, layout primitives
  layouts/BaseLayout     head, masthead, theme boot script, footer
  components/            Mark, Section (the spine), ProjectCard, Footer, toggle
  pages/
    index.astro          home
    work/index.astro     curated projects + the GitHub tail
    about.astro          bio, track, recognition, contact, JSON-LD Person
    og-card.astro        render source for og.png — noindex, not in the sitemap
    sitemap.xml.ts       hand-rolled, add every new route
    robots.txt.ts        derives the sitemap URL from `site`
    404.astro
.github/workflows/       deploy to Pages
```

Reserved for later, do not build yet: `src/content/docs/` for a Starlight docs
island mounted at `/hoocode`. The information architecture leaves room for it.
Nothing in v1 should make that harder.

**The work page's long tail is filtered by rule, not by hand**: a repository
appears only if it is not a fork, was pushed since 2024, has a description, and
that description does not say "placeholder". Curating the list by hand would rot
within a month. If a repo should appear, give it a description on GitHub.

---

## Standing context

- Eighteen-plus years in enterprise data. Currently a solution architect on GCP
  data platforms at a UK tier-1 retail bank, via TCS.
- Ships open-source agent tooling: `hoocode` (TypeScript, on npm),
  `embeddingsearchtools`, `voicetools`, `webtools`, `browsertools`, `filetools`
  (Rust), `hooteams`, `hoocowork`.
- The photograph appears on the homepage. It does not appear anywhere else in
  public material.
- Contact is email, LinkedIn, GitHub. The address is lightly obfuscated against
  scrapers but must remain trivially usable by a human.
- Medium is an archive. Link it; do not migrate from it; do not treat it as the
  writing home.

---

## Working style

- Read before editing. Never write to a file you have not read this session.
- Small commits, present-tense subject lines, no emoji.
- Run `npm run build` after any change that could break the build. A red build is
  reported, not worked around.
- Prefer deleting to adding. This site earns its keep by being fast and short.
- If a decision is a matter of taste and was not settled here, ask. Do not pick
  silently and hope.
- When unsure whether something is publishable: it is not, until asked.
