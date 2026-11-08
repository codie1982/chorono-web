import { serializeSitemap } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Inspect actual local route grouping without advertising unpublished public URLs. */
export function GET(request: Request) {
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
