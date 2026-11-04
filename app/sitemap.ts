import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOG_POSTS, blogPath } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/getting-started', '/agent-skills', '/blog'].map(path => ({ url: new URL(path, SITE_URL).href })),
    ...BLOG_POSTS.map(post => ({ url: new URL(blogPath(post), SITE_URL).href, lastModified: post.published })),
  ]
}
