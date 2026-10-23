# AGENTS.md

Portable instructions for any agent working in this repo. Read this first. If
something here conflicts with a general habit you have, this file wins.

---

## What this is

The public personal site of Sachin Koli, and the eventual landing zone for the
`hoo*` product docs (hoocode, HooCowork, HooTeams).

Two audiences, in this order:

1. **Developers** who arrived from a GitHub repo or an npm package and want to
   know who wrote it.
2. **Recruiters and hiring agents** who need to establish credibility in thirty
   seconds and find a way to make contact.

Everything on this site is public the moment it is committed. Write as if a
current employer, a future employer, and a stranger are all reading it — because
they are.

---

## The source of facts, and what never goes up

The private life repo at `~/github/my-life` is the source of truth for career
facts: `data/career-facts.md`, the career documents and their public bio
(`notes/Goals/Career/Sachin_Koli_Public_Bio.html`, written for this site), and
the open-source inventory (`notes/Goals/Career/portfolio.md`).

**2026-10-22: he approved my-life as the site's source and delegated the
judgement.** His words: "For the website, you can make best judge out of me. My
life repo is for that purpose only." An agent may use facts from it without a
per-fact yes. This replaces the earlier publish gate, which asked for approval
fact by fact. Judgement still means: public-profile material only, short (see "Short and
scannable"), and nothing from the list below.

**Never publish, never ask:** compensation of any kind, bank or investment
balances, budgets, EMIs, loans, retirement arithmetic, dates of birth, home or
school addresses, phone numbers, government identifiers, family members' names,
health matters, notice-period terms, credentials, tokens, or anything from
`.env`. These are not judgement calls. Do not surface them for approval; simply
do not use them.

`data/career-facts.md` in that repo is the single source of truth for any title,
date, employer, award, or technology this site states. If a fact is not in there
or in the public bio, it is not verified, and it does not go on the site. The
public bio mentions his family; that line stays off, under the list above.

---

## Client anonymisation — never name a client

Employers may be named: Tata Consultancy Services, Sears IT & Management
Services India, Cognizant, Mahindra Satyam.

Clients may not — not the name, not a detail that identifies one. Every
engagement is referred to only by its agreed public framing. These five are the
whole permitted vocabulary:

- UK tier-1 retail bank
- US Fortune-500 retailer
- Gulf national telecom operator
- UK tier-1 bank (emerging markets)
- Australian national telecom operator

Which real client each framing stands for is recorded in the private life repo,
and only there. **This file is committed to a public repository** — a
name-to-framing table written here would hand a reader the key to every framing
on the site, which is the one thing the framings exist to prevent. If you need
the mapping to check a draft, read it in the private repo and leave it there.

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
`npm run build` and nothing else — no network, no token, no prior step. The
pinned-repo snapshot is committed for that reason; the deploy workflow refreshes
it before every build.

```
npm run dev      local server
npm run build    static build to dist/
npm run check    astro check — must be 0 errors before a commit
npm run verify   check + build + audit — the gate before a commit
npm run audit    this file, expressed as greps (bin/site audit)
npm run shots    screenshot every page, dark + light, 1440/820/390 → .shots/
npm run pins     refresh the committed pinned-repo snapshot (needs GITHUB_TOKEN)
npm run docs     re-copy the hoocode installer from kolisachint/hoocode
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

## Short and scannable — the 2026-10-22 direction, revised 2026-10-23

His words: nobody has time to read a long site. Visitors want to know who he
is, what he does, and which projects might help them, and they decide in
seconds. So:

- **Two kinds of page: Home and product pages.** `/work` and `/about` were
  deleted on 2026-10-23 and redirect to `/`. Do not add a page without asking.
- **Home is the ten-second version.** Photo, name, the headline and subhead
  (who), the role line and one small employer line (what), a short bio of two
  paragraphs, then a card per pinned repo, then one contact line (X) and the
  awards line.
- **A product page** (`/<repo>/`) shows the name, the GitHub description,
  topics, language, a short README excerpt and buttons for GitHub and the
  homepage. Nothing on it is written by hand.
- Keep the human voice. Short is not a template: first person, plain words, no
  marketing verbs.

Before adding a paragraph anywhere, ask whether a visitor in a hurry needs it.
If not, leave it out.

---

## Headlines are assigned — do not rewrite them

Three lines, one slot each. They were chosen together. Do not reword, merge, or
relocate them without asking.

| Slot | Line |
|---|---|
| Home `<h1>` | Large data systems by day. Small, sharp tools the rest of the time. |
| Home subhead | I work on data platforms, coding agents, and the space between them. |

The home `<h1>` was replaced 2026-09-18, with approval. The original
("Architect of large data systems. Author of small sharp tools.") read as a
self-awarded title. It is not coming back. The `/work` lead and `/about` opener
were retired with those pages on 2026-10-23.

The home subhead was retired on 2026-10-22 for the short-and-scannable pass and
restored the same day, with approval: it is the only line on the home page that
names coding agents, which is what the pinned projects are. It sits between the
`<h1>` and the role line (`site.role`).

---

## Tone, and the two rules that set it

The site was rewritten 2026-09-18 because it read as a boast. Two rules came
out of that, and both are load-bearing.

**Employed work gets a line, not a CV.** Until 2026-10-22 the site named no
employer, role or years. That rule is replaced by the decision above: a visitor
should be able to tell who he is and what he does. So the home page carries the
role (`site.role`, the positioning from `career-facts.md`) and one small line of
employer, start year and city (`career.meta`). The home bio gives the current work
and the earlier employers in two sentences (`career` in `src/site.ts`), and the
JSON-LD says no more than that. No employment table, no engagement
descriptions beyond that, no stack lists tied to a client, no numbers from the
day job. LinkedIn carries the specifics. Clients stay anonymised, as above.

The two awards survive as **one line of small grey type at the foot of
the home page**, and nowhere else. Stated once, as a fact. Not a section, not a
home-page tile, never "award-winning".

**Projects = the GitHub pinned repos, fetched at build.** (Decided 2026-10-23,
replacing "exactly four curated projects".) Name, description, topics,
homepage, language and stars all come from GitHub, so the site is never edited
when pins or descriptions change. There is no hardcoded project list and no
"all repos" tail. To change what appears, change the pins or the repo's
description on GitHub.

The voice is a welcome, not a pitch. A visitor arriving from a README is a
guest. Sentences that begin "Most X do Y. I do Z." are a pitch. Instructions to
the reader about how to contact him properly are a door policy. Neither belongs
here.

---

## Content conventions

- Projects come from `src/data/pinned.json`, written by
  `scripts/refresh-pins.mjs` (`npm run pins`): GraphQL `pinnedItems` for the
  pins (needs a token), REST for each README, from which a short plain-text
  excerpt is stored. Never edit the file by hand; `"source": "seed"` marks the
  initial hand-made snapshot. Without a token, or on failure, the script keeps
  the existing snapshot and warns. `src/lib/pinned.ts` reads it.
- **The hoocode pages are written here** (`src/content/docs/hoocode/`), to
  the rules in "The documentation section" below. `public/hoocode/install.sh`
  is the one generated file there: never edit it, fix it in
  `kolisachint/hoocode` and run `npm run docs`.
- Facts that more than one page states live in `src/site.ts`, not in a page,
  with a comment naming where in my-life each came from.
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
  refresh-pins.mjs       pinned repos + README excerpts → pinned.json (npm run pins)
  make-og.sh             renders /og-card → public/brand/og.png (npm run og)
  shot.mjs               CDP screenshots — real viewports, both themes
public/
  brand/sk*.svg          the personal monogram, dark + light
  brand/favicon*.svg     32×favicon, dark + light
  brand/og.png           social card, generated — never hand-edited
  img/                   photography
src/
  site.ts                name, headlines, profiles, the one-sentence background
  content.config.ts      collection schemas (docs only)
  data/pinned.json       committed snapshot of the GitHub pinned repos
  lib/pinned.ts          typed access to pinned.json
  styles/tokens.css      raw brand palette → semantic tokens, both themes
  styles/global.css      reset, base elements, layout primitives
  styles/docs.css        documentation prose — plain CSS, namespaced under .doc
  layouts/BaseLayout      head, masthead, theme boot script, footer
  layouts/DocsLayout      the two-pane docs shell — sidebar, TOC, prev/next,
                          provenance. `landing` renders /hoocode through it.
  components/            Mark, Section (the spine), PinCard, Footer, toggle
  lib/docs.ts            sidebar, ordering, titles and summaries for the docs
  lib/satteri-hoocode.mjs  Markdown plugins for the hoocode docs
  content/docs/hoocode/  the hoocode docs pages, written here
  data/hoocode-nav.json  sidebar, redirects, the release the pages describe
  pages/
    index.astro          home: hero, short bio, pinned-repo cards, contact, JSON-LD Person
    [repo].astro         one product page per pinned repo (skips hoocode)
    hoocode/index.astro  docs landing — hand-written, not upstream's index.md
    hoocode/[...slug]    one route per docs page
    og-card.astro        render source for og.png — noindex, not in the sitemap
    sitemap.xml.ts       home + pinned repos + every docs page, derived
    robots.txt.ts        derives the sitemap URL from `site`
    404.astro
public/hoocode/install.sh  GENERATED — verbatim copy of hoocode's installer
.github/workflows/       deploy to Pages; refreshes the pins on every run
```

`/work` and `/about` redirect to `/` (`astro.config.mjs`). `/hoocode` is
reserved: `[repo].astro` skips that name so it cannot collide with the docs.

---

## The documentation section

`/hoocode` documents the Rust build of hoocode. Until 2026-10-22 it vendored the
TypeScript build's docs from `kolisachint/hoocode-ts`. That build is retired,
and the Rust repository has no user docs folder to vendor, so the pages are now
**written here**: short, scannable, and drawn from the Rust build's README,
`hoocode --help` and CHANGELOG.

**Five pages, not forty.** The landing (`src/pages/hoocode/index.astro`), and
`install`, `quickstart`, `configuration` and `commands` as markdown in
`src/content/docs/hoocode/`. The sidebar and the redirects are in
`src/data/hoocode-nav.json`. Every old TypeScript-era URL redirects to the
closest page, so outside links keep working. For anything the pages leave out,
link to the repository; do not copy its docs over.

**Only what the Rust build does.** Check a claim against `hoocode --help` (the
source is `crates/hoocode-code-cli/src/help_text.rs`), the README and the
CHANGELOG before writing it. Not available: Windows, crates.io, Homebrew. Never
mention extensions, `-e`, `--export`, `/share`, canvases, `hoocode resources`,
`~/.hoocode/agent`, `.ts` examples, or a flag `--help` no longer lists.
`bin/site audit` greps for these.

**Versions.** Say what the current release is (`source.writtenFor` in the nav
file) and mark anything from the CHANGELOG's Unreleased section as coming in
the next version. Never describe an unreleased version as out.

**The installer is copied, not written.** `public/hoocode/install.sh` is a
verbatim copy of `install/install.sh` in `kolisachint/hoocode`. `npm run docs`
refreshes it, and the deploy workflow runs that daily and commits any drift.
Never edit it here. The retired TypeScript installers (`/hoocode-ts/`) were
removed on 2026-10-22; there is no Windows install.

No search. Five pages do not need it.

Room is left for `/hoocowork` and `/hooteams` to arrive the same way. Generalise
`lib/docs.ts` when the second one lands, not before.

---

## Standing context

- In enterprise data since January 2008. Currently a solution architect at
  Tata Consultancy Services, on a Google Cloud data platform for a UK tier-1
  retail bank. Positioning: "Solution Architect — Cloud Data & AI Platforms".
- Ships open-source agent tooling: `hoocode` (Rust since October 2026, replacing
  the TypeScript build; still installable from npm),
  `embeddingsearchtools`, `voicetools`, `webtools`, `browsertools`, `filetools`
  (Rust), `hooteams`, `hoocowork`.
- The portrait is the illustrated avatar with wire glasses on flat teal, from
  his headshot set (`illustrated-glasses-1024.png`, the same picture as his
  GitHub avatar). It is `public/img/sachin-koli.webp` (480px) and
  `public/brand/apple-touch-icon.png` (180px). It appears on the homepage hero
  in colour, and nowhere else on the site. The studio
  photographs are not used here. Chosen by him 2026-10-22; it replaced a
  sunglasses illustration used for a few hours the same day.
- Contact is X only: https://x.com/sachinkoli (@sachinkoli). There is no email
  address, `mailto:` link or `email` field anywhere on the site (decided
  2026-10-23). The profiles list may also carry GitHub, LinkedIn and npm.
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
