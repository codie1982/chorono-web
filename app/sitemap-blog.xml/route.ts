import { publishedSitemapResponse } from '@/lib/site-index/sitemap'
export const dynamic = 'force-dynamic'
/** Existing editorial hub and articles. */
export function GET() { return publishedSitemapResponse('sitemap-blog.xml') }
