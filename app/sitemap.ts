import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOG_POSTS, blogPath } from '@/lib/blog'
import { EXAMPLE_MODIFIED } from '@/lib/animation-example'
import { USE_CASES, USE_CASE_CONTENT_UPDATED, type UseCasePath } from '@/lib/use-cases'
import { ANIMATION_GUIDES, ANIMATION_GUIDE_DATE } from '@/lib/animation-guides'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/getting-started', '/agent-skills', '/blog'].map(path => ({ url: new URL(path, SITE_URL).href, ...(path === '/agent-skills' ? { lastModified: EXAMPLE_MODIFIED } : path === '/' ? { lastModified: ANIMATION_GUIDE_DATE } : {}) })),
    ...BLOG_POSTS.map(post => ({ url: new URL(blogPath(post), SITE_URL).href, lastModified: post.modified ?? post.published })),
    ...Object.keys(USE_CASES).map(path => ({ url: new URL(path, SITE_URL).href, lastModified: USE_CASE_CONTENT_UPDATED[path as UseCasePath] })),
    ...Object.keys(ANIMATION_GUIDES).map(path => ({ url: new URL(path, SITE_URL).href, lastModified: ANIMATION_GUIDE_DATE })),
  ]
}
