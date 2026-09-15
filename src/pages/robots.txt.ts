import type { APIRoute } from "astro";

/**
 * An endpoint rather than a static file, so the sitemap URL follows `site`
 * and survives a domain change without anyone remembering to edit it.
 */
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("`site` must be set in astro.config.mjs");

  const body = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site).href}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
