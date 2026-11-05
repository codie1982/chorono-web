import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOG_POSTS, blogPath } from '@/lib/blog'
import { EXAMPLE_MODIFIED, USE_CASE_UPDATED } from '@/lib/animation-example'
import { USE_CASES } from '@/lib/use-cases'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/getting-started', '/agent-skills', '/blog'].map(path => ({ url: new URL(path, SITE_URL).href, ...(path === '/agent-skills' ? { lastModified: EXAMPLE_MODIFIED } : path === '/' ? { lastModified: USE_CASE_UPDATED } : {}) })),
    ...BLOG_POSTS.map(post => ({ url: new URL(blogPath(post), SITE_URL).href, lastModified: post.modified ?? post.published })),
    ...Object.keys(USE_CASES).map(path => ({ url: new URL(path, SITE_URL).href, lastModified: USE_CASE_UPDATED })),
  ]
}
