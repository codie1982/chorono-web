import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/** Keep production documentation and its rendering assets crawlable. Preview
 * deployments are not discovery targets and never advertise a public sitemap.
 * Page noindex metadata remains separate: robots.txt controls crawling only. */
export function siteRobots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === 'preview') return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
