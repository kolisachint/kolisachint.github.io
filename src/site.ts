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
    "Solution architect working on cloud data platforms, and the author of four small open-source tools for coding agents, written in Rust and TypeScript.",
  locale: "en_GB",
} as const;

/**
 * The four headlines, one slot each. Assigned deliberately — see AGENTS.md.
 * Do not reword or relocate without asking.
 */
export const headlines = {
  home: "Large data systems by day. Small, sharp tools the rest of the time.",
  homeSub:
    "I work on data platforms, coding agents, and the space between them.",
  work: "Four tools I built because I needed them, and kept because they worked.",
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
  text: "Building HooCode, a terminal coding agent, and the small Rust tools it leans on for search, speech and fetching the web. All of it is open, and questions about any of it are welcome.",
} as const;

/**
 * The employment record, reduced to a sentence on purpose.
 *
 * The four-row table of employers, years, roles and engagement descriptors was
 * removed 2026-09-18. None of that work is in the public domain, a stranger
 * does not need it to understand what this site is for, and listing it turned
 * the page into a CV nobody asked to read. LinkedIn carries the specifics for
 * anyone who wants them; the sentence below is what the site itself claims.
 *
 * The span is traceable to the verified career record — first working day
 * 7 January 2008. Nothing else here is a fact about an employer or a client.
 */
export const background = {
  sentence:
    "Eighteen years in enterprise data — banking, retail, telecoms. Mostly large organisations, where the systems are old, the rules are strict, and nothing is allowed to stop while you change it.",
} as const;

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
  { label: "HooCode", href: "/hoocode" },
  { label: "About", href: "/about" },
] as const;
