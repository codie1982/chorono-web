import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root-level curated library and individual animation sitemap. */
export function GET() {
  return publishedSitemapResponse("sitemap-animations.xml");
}
