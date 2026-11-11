import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Publish this documentation topic through the shared production gate. */
export function GET() {
  return publishedSitemapResponse("sitemap-docs-integrations.xml");
}
