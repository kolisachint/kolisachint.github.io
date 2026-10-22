/**
 * Site-wide constants.
 *
 * Facts here must be traceable to the verified career record. Nothing
 * speculative, nothing rounded up, no client names. See AGENTS.md.
 */

export const site = {
  name: "Sachin Koli",
  shortName: "sk",
  role: "Solution architect — cloud data & AI platforms",
  description:
    "Solution architect for cloud data & AI platforms, at Tata Consultancy Services, in data since 2008. Also the author of four open-source tools for coding agents, all written in Rust.",
  locale: "en_GB",
} as const;

/**
 * The headlines, one slot each. Assigned deliberately — see AGENTS.md.
 * Do not reword or relocate without asking. The home subhead was retired
 * 2026-10-22 when the site went short and scannable; site.role does its job.
 */
export const headlines = {
  home: "Large data systems by day. Small, sharp tools the rest of the time.",
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
 * The career, in a few lines. Source: data/career-facts.md and the public bio
 * in the private life repo, which he approved as the site's source on
 * 2026-10-22 (see AGENTS.md). Short on purpose: a line each, not a CV.
 * Clients stay anonymised by their public framing.
 */
export const career = {
  /** Shown small under the role line on the home page. */
  meta: "Tata Consultancy Services · in data since 2008 · Pune, India",
  employer: "Tata Consultancy Services",
  current:
    "a batch and real-time data platform on Google Cloud for a UK tier-1 retail bank, and its move off an on-premise data warehouse",
  earlier:
    "Before that: four years on the same bank's cards and payments, and before that Sears, Cognizant and Mahindra Satyam, building data platforms for retail, telecoms and banking.",
  credential: "Google Cloud Certified Professional Data Engineer",
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
