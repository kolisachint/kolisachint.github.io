import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { hrefFor } from "../lib/docs";

/**
 * Hand-rolled rather than @astrojs/sitemap — this is thirty lines and one
 * fewer dependency. Hand-written routes are listed below; documentation pages
 * are derived, so a page added upstream appears here on the next sync.
 * /og-card is deliberately absent: it is a render source, not a page.
 */
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs");

  const docs = await getCollection("docs");

  const routes = [
    { path: "/", priority: "1.0" },
    { path: "/work", priority: "0.9" },
    { path: "/hoocode", priority: "0.9" },
    { path: "/about", priority: "0.8" },
    ...docs
      .filter((entry) => entry.id !== "index")
      .map((entry) => ({ path: hrefFor(entry.id), priority: "0.6" })),
  ];

  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path, priority }) => `  <url>
    <loc>${new URL(path, site).href}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
