/**
 * Site-wide constants.
 *
 * Facts here must be traceable to the verified career record. Nothing
 * speculative, nothing rounded up, no client names. See AGENTS.md.
 */

export const site = {
  name: "Sachin Koli",
  shortName: "sk",
  role: "Solution architect — cloud data platforms",
  description:
    "Architect of large data systems, author of small sharp tools. Cloud data platforms at bank scale; open-source agent tooling in Rust and TypeScript.",
  locale: "en_GB",
} as const;

/**
 * The four headlines, one slot each. Assigned deliberately — see AGENTS.md.
 * Do not reword or relocate without asking.
 */
export const headlines = {
  home: "Architect of large data systems. Author of small sharp tools.",
  homeSub:
    "I work on data platforms, coding agents, and the space between them.",
  work: "I build data platforms at bank scale — and the tools I wish I'd had.",
  about:
    "Eighteen years moving data. Lately, teaching agents to move it for me.",
} as const;

/** Split so the literal address never appears in the served HTML. */
export const email = {
  user: "kolisachint",
  domain: "gmail.com",
} as const;

export const profiles = [
  { name: "GitHub", handle: "@kolisachint", url: "https://github.com/kolisachint" },
  {
    name: "LinkedIn",
    handle: "in/kolisachint",
    url: "https://www.linkedin.com/in/kolisachint",
  },
  { name: "npm", handle: "@kolisachint", url: "https://www.npmjs.com/~kolisachint" },
  { name: "X", handle: "@sachinkoli", url: "https://twitter.com/sachinkoli" },
] as const;

/**
 * A short, occasionally-updated status line. Open source only, by choice —
 * see AGENTS.md. Bump `updated` whenever the text changes.
 */
export const now = {
  updated: "September 2026",
  text: "Building HooCode, a terminal coding agent, and the small Rust tools it leans on — search, browser, speech, files.",
} as const;

/**
 * Employment record. Approved for publication 2026-09-15.
 * Source: my-life/data/career-facts.md. Employers named, clients anonymised.
 * Years only — no grades, no months, no compensation.
 */
export const track = [
  {
    period: "2021 — now",
    employer: "Tata Consultancy Services",
    role: "Solution architect",
    client: "UK tier-1 retail bank",
  },
  {
    period: "2018 — 2021",
    employer: "Sears IT & Management Services India",
    role: "Architect",
    client: "US Fortune-500 retailer",
  },
  {
    period: "2010 — 2018",
    employer: "Cognizant",
    role: "Senior associate",
    client: "UK tier-1 bank · Gulf national telecom operator",
  },
  {
    period: "2008 — 2010",
    employer: "Mahindra Satyam",
    role: "Software developer",
    client: "Australian national telecom operator",
  },
] as const;

/**
 * Approved phrasing, 2026-09-15. Credits the work, not the person. Do not
 * upgrade this to "award-winning" — that is a different and unapproved claim.
 */
export const recognition = [
  { award: "Banking Tech Awards", year: 2024, subject: "self-serve fraud journey" },
  { award: "Card & Payments Awards", year: 2025, subject: "self-serve fraud journey" },
] as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;
