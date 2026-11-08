import { publishedSitemapResponse } from '@/lib/site-index/sitemap'
export const dynamic = 'force-dynamic'
/** Existing public homepage and product setup URLs. */
export function GET() { return publishedSitemapResponse('sitemap-site.xml') }
