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
    "Solution architect for cloud data & AI platforms, in data since 2008. Also the author of open-source tools for coding agents, all written in Rust.",
  locale: "en_GB",
} as const;

/**
 * The headlines, one slot each. Assigned deliberately — see AGENTS.md.
 * Do not reword or relocate without asking. The home subhead was retired
 * and restored the same day (2026-10-22): it names coding agents, which
 * neither the headline nor site.role does.
 */
export const headlines = {
  home: "Large data systems by day. Small, sharp tools the rest of the time.",
  homeSub:
    "I work on data platforms, coding agents, and the space between them.",
} as const;

export const profiles = [
  { name: "GitHub", handle: "@kolisachint", url: "https://github.com/kolisachint" },
  {
    name: "LinkedIn",
    handle: "in/kolisachint",
    url: "https://www.linkedin.com/in/kolisachint",
  },
  { name: "X", handle: "@sachinkoli", url: "https://x.com/sachinkoli" },
] as const;

/**
 * The career, in a line. Source: data/career-facts.md in the private life
 * repo. No employer, client, client location, city or awards (decided
 * 2026-10-24): together they let a reader identify the client. See AGENTS.md.
 */
export const career = {
  /** Shown small under the role line on the home page. */
  meta: "In data since 2008",
} as const;

export const nav = [
  { label: "hoocode", href: "/hoocode" },
] as const;
