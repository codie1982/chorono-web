import { publishedSitemapResponse } from '@/lib/site-index/sitemap'
export const dynamic = 'force-dynamic'
/** Existing public technique and product guides. */
export function GET() { return publishedSitemapResponse('sitemap-guides.xml') }
