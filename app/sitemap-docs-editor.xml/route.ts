import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root-level keyframe, timeline and loop sitemap. */
export function GET() {
  return publishedSitemapResponse("sitemap-docs-editor.xml");
}
