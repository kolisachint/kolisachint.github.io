import type { APIRoute } from "astro";

/**
 * Hand-rolled rather than @astrojs/sitemap — this is twenty lines and one
 * fewer dependency. Every route the site publishes must be listed here.
 * /og-card is deliberately absent: it is a render source, not a page.
 */
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs");

  const routes = [
    { path: "/", priority: "1.0" },
    { path: "/work", priority: "0.9" },
    { path: "/about", priority: "0.8" },
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
