import type { MetadataRoute } from 'next'
import { siteRobots } from '@/lib/site-index/robots'

/** Serve the same crawl policy checked alongside the sitemap inventory. */
export default function robots(): MetadataRoute.Robots {
  return siteRobots()
}
