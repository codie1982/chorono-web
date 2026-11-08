import { publishedSitemapResponse } from "@/lib/site-index/sitemap";
export const dynamic = "force-dynamic";
/** Root index for published docs and animations; private preview returns 404. */
export function GET() {
  return publishedSitemapResponse();
}
