import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root-level agent connection, skills and scripting sitemap. */
export function GET() {
  return publishedSitemapResponse("sitemap-docs-ai.xml");
}
