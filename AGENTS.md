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
| `@astrojs/markdown-satteri` | configures the Markdown processor Astro already runs, so the docs pipeline can take plugins |
| `@fontsource-variable/inter` | self-hosted Inter, no Google beacon |
| `@fontsource-variable/jetbrains-mono` | self-hosted JetBrains Mono |
| `@astrojs/check`, `typescript`, `@types/node` | dev only — type checking |

Deployment is GitHub Actions to GitHub Pages. The site must build with
`npm run build` and nothing else — no network, no token, no prior step.

```
npm run dev      local server
npm run build    static build to dist/
npm run check    astro check — must be 0 errors before a commit
npm run verify   check + build + audit — the gate before a commit
npm run audit    this file, expressed as greps (bin/site audit)
npm run shots    screenshot every page, dark + light, 1440/820/390 → .shots/
npm run repos    refresh the committed GitHub repository snapshot
npm run docs     re-vendor the HooCode documentation
npm run og       re-render public/brand/og.png from /og-card
```

`bin/site` is the tool belt behind the last three, plus `bin/site design` for
the ui-ux-pro-max search. `.hoocode/skills/site-design/` is the skill that
explains the design loop and the traps it has already hit; an agent working on
appearance should load it.

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
| Home `<h1>` | Large data systems by day. Small, sharp tools the rest of the time. |
| Home subhead | I work on data platforms, coding agents, and the space between them. |
| `/work` lead | Four tools I built because I needed them, and kept because they worked. |
| `/about` opener | Eighteen years moving data. Lately, teaching agents to move it for me. |

The first and third were replaced 2026-09-18, with approval. The originals
("Architect of large data systems. Author of small sharp tools." and "I build
data platforms at bank scale — and the tools I wish I'd had.") read as two
self-awarded titles and a scale claim. They are not coming back.

---

## Tone, and the two rules that set it

The site was rewritten 2026-09-18 because it read as a boast. Two rules came
out of that, and both are load-bearing.

**The site does not describe his employed work.** No employers, no roles, no
years, no engagement descriptors, no stack lists tied to a client. `/about`
says *"Eighteen years in enterprise data — banking, retail, telecoms"* and
stops. That work is not in the public domain and a stranger does not need it to
understand the site. LinkedIn carries the specifics for anyone who asks. The
four-row employment table that used to sit on `/about` was deleted, along with
`track` in `src/site.ts` and `worksFor` in the page's JSON-LD — structured data
that says more than the visible page is a back door, not a feature.

The two awards survive as **one line of small grey type at the foot of
`/about`**, and nowhere else. Stated once, as a fact. Not a section, not a
home-page tile, never "award-winning".

**Four curated projects. Not five.** hoocode, embeddingsearchtools, webtools,
voicetools — the four the career record calls "the four that carry the story".
Everything else that used to have a write-up (hoocowork, hooteams, browsertools,
filetools, screencut) now gets a single row in the generated tail on `/work`,
which is where a fifth one goes too. Adding a fifth file to
`src/content/projects/` is a decision to raise, not a detail to slip into a
commit — and it means removing one of the four.

The voice is a welcome, not a pitch. A visitor arriving from a README is a
guest. Sentences that begin "Most X do Y. I do Z." are a pitch. Instructions to
the reader about how to contact him properly are a door policy. Neither belongs
here.

---

## Content conventions

- Projects live in `src/content/projects/` as a typed collection. The schema in
  `src/content.config.ts` is the contract; extend the schema before adding a
  field to an entry. The `notes` collection is written but commented out —
  registering an empty collection makes every build warn. Uncomment it when
  there is a first note.
- **`src/content/docs/hoocode/` is generated. Never edit a file in it.** Any
  correction belongs in the `kolisachint/hoocode` repository, at
  `packages/coding-agent/docs`. Then run `npm run docs`. An edit made here is
  silently destroyed by the next sync, and the page still credits upstream for
  it.
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
bin/site                 verify · audit · shots · design — the repo's tool belt
.hoocode/skills/         project-local agent skills
  site-design/SKILL.md   the design loop, and every trap already paid for
scripts/
  refresh-repos.mjs      GitHub snapshot refresher (npm run repos)
  make-og.sh             renders /og-card → public/brand/og.png (npm run og)
  shot.mjs               CDP screenshots — real viewports, both themes
public/
  brand/sk*.svg          the personal monogram, dark + light
  brand/favicon*.svg     32×favicon, dark + light
  brand/og.png           social card, generated — never hand-edited
  img/                   photography
src/
  site.ts                name, headlines, profiles, the one-sentence background
  content.config.ts      collection schemas
  content/projects/      curated project entries, one markdown file each
  data/repos.json        committed GitHub snapshot — build fallback
  lib/github.ts          live fetch + snapshot fallback + the tail filter
  styles/tokens.css      raw brand palette → semantic tokens, both themes
  styles/global.css      reset, base elements, layout primitives
  styles/docs.css        documentation prose — plain CSS, namespaced under .doc
  layouts/BaseLayout      head, masthead, theme boot script, footer
  layouts/DocsLayout      the two-pane docs shell — sidebar, TOC, prev/next,
                          provenance. `landing` renders /hoocode through it.
  components/            Mark, Section (the spine), ProjectCard, Footer, toggle
  lib/docs.ts            sidebar, ordering, titles and summaries for the docs
  lib/satteri-hoocode.mjs  Markdown plugins for the vendored docs
  content/docs/hoocode/  GENERATED — see the rule above
  data/hoocode-nav.json  GENERATED — sidebar, redirects, source commit
  pages/
    index.astro          home
    work/index.astro     curated projects + the GitHub tail
    about.astro          bio, track, recognition, contact, JSON-LD Person
    hoocode/index.astro  docs landing — hand-written, not upstream's index.md
    hoocode/[...slug]    one route per vendored page
    og-card.astro        render source for og.png — noindex, not in the sitemap
    sitemap.xml.ts       hand-written routes + every docs page, derived
    robots.txt.ts        derives the sitemap URL from `site`
    404.astro
public/hoocode/images/   GENERATED — images referenced by the docs
.github/workflows/       deploy to Pages, and the weekly vendor refresh
```

**The work page's long tail is filtered by rule, not by hand**: a repository
appears only if it is not a fork, was pushed since 2024, has a description, and
that description does not say "placeholder". Curating the list by hand would rot
within a month. If a repo should appear, give it a description on GitHub.

---

## The documentation section

`/hoocode` renders documentation authored in another repository. Four rules keep
that honest.

**The source of truth is upstream.** `packages/coding-agent/docs` in
`kolisachint/hoocode`. `npm run docs` copies the markdown, the images and
`docs.json` into this repo and records the commit it took them from. Every docs
page shows that commit and links to its own source. Fix things there, sync here.

**The sidebar is generated, not written.** It comes from upstream `docs.json`,
as do the redirects. Adding a page to the HooCode docs and listing it in
`docs.json` is the whole procedure for making it appear here. There is no second
list to keep in step.

**Vendored, not fetched at build time.** The site must build with no network,
which rules out fetching during the build. The cost is drift, so the deploy
workflow re-syncs weekly and commits whatever changed.

**Do not hand-write docs prose here.** The one exception is
`src/pages/hoocode/index.astro`, the landing page, which is ours: upstream's
`index.md` is a list of links to the other pages, and the sidebar already is
that. `index.md` is excluded from routing for this reason.

No search yet. Pagefind is the obvious addition when the section justifies it;
it is a static index and works without a framework, at the cost of the first
JavaScript on the site.

Room is left for `/hoocowork` and `/hooteams` to arrive the same way. Generalise
`lib/docs.ts` when the second one lands, not before.

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
