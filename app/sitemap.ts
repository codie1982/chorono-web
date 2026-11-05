import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOG_POSTS, blogPath } from '@/lib/blog'
import { EXAMPLE_MODIFIED } from '@/lib/animation-example'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/getting-started', '/agent-skills', '/blog'].map(path => ({ url: new URL(path, SITE_URL).href, ...(path === '/agent-skills' ? { lastModified: EXAMPLE_MODIFIED } : {}) })),
    ...BLOG_POSTS.map(post => ({ url: new URL(blogPath(post), SITE_URL).href, lastModified: post.modified ?? post.published })),
  ]
}
