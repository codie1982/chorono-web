import { serializeSitemap } from "@/lib/site-index/sitemap";
import { publicContentOrigin } from "@/lib/site-index/publication";
export const dynamic = "force-dynamic";
/** Inspect actual local route grouping without advertising unpublished public URLs. */
export function GET(request: Request) {
  if (publicContentOrigin()) return new Response('Preview sitemap is unavailable in production', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  const url = new URL(request.url);
  const xml = serializeSitemap(
    url.origin,
    url.searchParams.get("topic") ?? "sitemap.xml",
    true,
  );
  return xml
    ? new Response(xml, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      })
    : new Response("Unknown sitemap topic", { status: 404 });
}
