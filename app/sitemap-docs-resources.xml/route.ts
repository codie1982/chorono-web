import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root-level troubleshooting and releases sitemap. */
export function GET() {
  return publishedSitemapResponse("sitemap-docs-resources.xml");
}
