import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root-level installation and first-edit sitemap. */
export function GET() {
  return publishedSitemapResponse("sitemap-docs-start.xml");
}
