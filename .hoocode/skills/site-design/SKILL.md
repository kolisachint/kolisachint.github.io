---
name: site-design
description: Redesign, restyle, or visually review any page of this Astro site — home, work, about, 404, the HooCode docs shell, or the OG card. Use when the task touches how the site looks, moves, or responds; when running the ui-ux-pro-max design skill against this repo; or when a change needs screenshotting, auditing against AGENTS.md, or checking at 390/820/1440px in both themes. Covers bin/site, scripts/shot.mjs, the token layer, and the traps that have already cost a pass.
---

# Designing this site

`AGENTS.md` is the contract — publish gate, client anonymisation, forbidden
claims, stack limits, assigned headlines. Read it first; this file does not
repeat it. What follows is the *how*: the loop, the tools, and the specific
things that have already gone wrong once.

## The loop

```bash
bin/site verify            # astro check + build + audit — before every commit
bin/site shots             # all pages, dark + light, 1440/820/390, into .shots/
bin/site shots /hoocode/   # one page, when iterating
bin/site poster <mp4>      # re-cut a video poster from its own frame 0
bin/site design "<query>" --domain ux
```

`bin/site audit` is `AGENTS.md` expressed as greps: inflated AI claims, named
clients, hardcoded domain, raw hex outside `tokens.css`, hand-edited generated
docs, `var(--token, fallback)` gaps, missing `alt`, emoji, and dependency drift.
Every rule in it traces to a line in that file. A rule with no line there does
not belong in it.

**Read the screenshots back.** `.shots/` is git-ignored and the images are for
the agent as much as the human — open them with `read`. A layout bug at 390px is
invisible in a diff and obvious in a PNG. `scripts/shot.mjs` also fails the run
if any page scrolls horizontally at 390px, so that class of bug reports itself.

## Using ui-ux-pro-max here

Run it through `bin/site design`, which knows where the skill lives. Take its
**structure**: section order, navigation patterns, motion tier, the
pre-delivery checklist, the accessibility outcomes.

Ignore its **palette and typography** every time. It will recommend a blue
accent and a Google Fonts `@import`; this site has one accent, self-hosted
fonts, and a token file that is canonical. Its style pick for "developer
portfolio" is Brutalism, which contradicts the brand entirely. The tool is a
source of reasoning, not of colour.

Motion here is the **subtle** tier and nothing more: 350ms, 12px of travel, on
scroll entry, behind `prefers-reduced-motion`. The mechanism already exists —
add `data-reveal` to an element and it is handled by the script in
`BaseLayout.astro`. `--reveal-delay` staggers a group.

## Where things live

| Want to change | File |
|---|---|
| A colour, space step, radius, duration | `src/styles/tokens.css` — and only there |
| Buttons, `.contacts`, `:target` offset, `.shell` | `src/styles/global.css` |
| The section spine and its cyan node | `src/components/Section.astro` |
| Masthead, theme boot, scroll reveal | `src/layouts/BaseLayout.astro` |
| Docs two-pane shell, sidebar, TOC, prev/next | `src/layouts/DocsLayout.astro` |
| Docs prose | `src/styles/docs.css` |

The `/hoocode` landing renders **through `DocsLayout` with `landing`**, so it
gets the same sidebar and the same shell as every docs page, minus the
breadcrumb, the sequence and the prose wrapper. There is one docs shell. Do not
grow a second one for `/hoocowork` or `/hooteams` — generalise this one when the
second section actually lands.

## Traps, each paid for once

**`--window-size` lies below ~500px.** macOS enforces a minimum window width, so
a "390px" Chrome screenshot is the left-hand 390 pixels of an 800px layout —
which looks exactly like a horizontal-overflow bug that is not there.
`scripts/shot.mjs` uses `Emulation.setDeviceMetricsOverride` over CDP instead,
which has no floor and emulates `prefers-color-scheme` properly. Do not
"simplify" it back to the CLI flag.

**`auto-fit` plus a hairline gap shows its empty cells.** The gap-as-border
trick (`gap: 1px` over a `--border` background) turns an unfilled grid cell into
a visible grey rectangle. Four items in a three-wide grid is a bug you can see.
Use explicit counts that divide: 1 → 2 → 4.

**Docs pane width is not viewport width.** The sidebar takes 15rem from 60rem
up. A media query written against the viewport is off by that much inside the
pane; breakpoints for content in `.main` belong at 86rem, not 60rem.

**An inline fallback is a missing token.** `var(--space-5, 1.25rem)` means
`--space-5` was never added and the fallback hid it. Add the token. The audit
now catches this, but only for real token families — a per-element custom
property like `--reveal-delay` is not one.

**`var()` in an SVG presentation attribute** is legal CSS and a silent
black-on-black mark if a renderer disagrees. In `og-card.astro`, whose output is
committed, stroke and fill are set from the stylesheet instead.

**A poster is frame 0, not a frame you liked.** A still lifted from the middle
of a recording shows a busy screen before anyone has pressed play and advertises
a state the video does not open in. `bin/site poster` cuts frame 0 at 1280px
wide; it is both the honest still and, being mostly empty, the smaller file.
While you are there, re-read the caption — the HooCode demo's said "Ask mode"
long after the recording had moved on through Plan into Build.

**Cyan is emphasis, not atmosphere.** A glow orb behind the hero was removed for
this reason. One cyan moment per viewport: the section node, the portrait node,
the current role, the primary button. Not all of them at once.

**Generated trees.** `src/content/docs/hoocode/`, `src/data/hoocode-nav.json`
and `public/hoocode/images/` are written by `npm run docs`. An edit there is
destroyed by the next sync and the page still credits upstream for it.

## Before saying it is done

- `bin/site verify` clean — check, build, audit.
- `bin/site shots` read back at all three widths, both themes.
- Touch targets ≥ 38px with ≥ 8px between them; focus visible on everything
  operable; `prefers-reduced-motion` honoured by anything that moves.
- One `<h1>` per page, headings descending without a skip.
- Any new fact on a page traceable to `career-facts.md`, or it does not ship.
