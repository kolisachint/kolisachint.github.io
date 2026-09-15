/**
 * Markdown pipeline plugins for the vendored HooCode docs.
 *
 * Written against Sätteri, Astro's native Markdown processor, rather than
 * remark/rehype. Sätteri is the default; reaching for the unified pipeline
 * would mean installing a second processor to run two small transforms.
 *
 * Both plugins are factories gated on the file being compiled, so they are not
 * installed at all for this project's own markdown.
 *
 * 1. hoocodeLinks (mdast)  — rewrites on-disk relative links for the web.
 * 2. hoocodeStructure (hast) — heading permalinks and scrollable tables.
 */

const REPO = "https://github.com/kolisachint/hoocode/blob/main";
const DOCS_DIR = "packages/coding-agent/docs";
const SCOPE = "/content/docs/hoocode/";

/** Resolve `rel` against `base`, POSIX-style, without touching the filesystem. */
function resolvePath(base, rel) {
  const out = base.split("/").filter(Boolean);
  for (const part of rel.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out.join("/");
}

function splitHash(url) {
  const i = url.indexOf("#");
  return i === -1 ? [url, ""] : [url.slice(0, i), url.slice(i)];
}

/**
 * The docs are written to be read on GitHub, so their links are paths on disk:
 *
 *   quickstart.md          a sibling page  → /hoocode/quickstart
 *   images/tree-view.png   a local asset   → /hoocode/images/tree-view.png
 *   ../examples/foo.ts     repository code → github.com/…/blob/main/…
 *
 * Absolute URLs, `mailto:` and bare anchors are left alone.
 */
export function rewriteUrl(url) {
  if (!url) return url;
  if (/^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url)) return url;

  const [pathPart, hash] = splitHash(url);

  if (pathPart.startsWith("images/")) return `/hoocode/${pathPart}${hash}`;

  if (pathPart.endsWith(".md") && !pathPart.startsWith("..")) {
    const slug = pathPart.replace(/\.md$/, "").replace(/(^|\/)index$/, "");
    const clean = `/hoocode/${slug}`.replace(/\/+$/, "");
    return `${clean || "/hoocode"}${hash}`;
  }

  return `${REPO}/${resolvePath(DOCS_DIR, pathPart)}${hash}`;
}

/** Rewrite href/src inside a raw HTML block. A couple of pages use <img>. */
function rewriteHtml(value) {
  return value.replace(
    /\b(src|href)=("|')([^"']+)\2/g,
    (_m, attr, quote, url) => `${attr}=${quote}${rewriteUrl(url)}${quote}`,
  );
}

const inScope = (ctx) => (ctx.fileURL?.pathname ?? "").includes(SCOPE);

const linksPlugin = {
  name: "hoocode-links",
  link: (node) => ({ ...node, url: rewriteUrl(node.url) }),
  definition: (node) => ({ ...node, url: rewriteUrl(node.url) }),
  image: (node) => ({ ...node, url: rewriteUrl(node.url) }),
  html: (node) => ({ ...node, value: rewriteHtml(node.value) }),
};

/*
 * No heading-permalink plugin here, deliberately.
 *
 * Astro assigns heading ids in its own hast plugin, which runs after every
 * user plugin — including the `after` hook. `properties.id` is empty whenever
 * we can reach the node, so an anchor would have nothing to point at.
 * Generating our own slug would risk disagreeing with the table of contents,
 * which is built from Astro's `headings`. The ids are in the output and deep
 * links work; only the hover dot is missing, and that is a fair trade.
 */
const structurePlugin = {
  name: "hoocode-structure",
  element: [
    {
      // Several reference pages have tables too wide for a phone. Give them
      // their own scroll container so the page itself does not slide.
      filter: ["table"],
      visit(node, ctx) {
        const parent = ctx.parent(node);
        if (parent?.type === "element" && parent.tagName === "div") return;
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [],
        });
      },
    },
  ],
};

export const hoocodeLinks = (ctx) => (inScope(ctx) ? linksPlugin : null);
export const hoocodeStructure = (ctx) => (inScope(ctx) ? structurePlugin : null);
