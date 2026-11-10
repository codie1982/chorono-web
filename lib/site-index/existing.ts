import { SITE_URL, DOCS_LINKS_UPDATED } from '@/lib/site'
import { BLOG_POSTS, blogPath } from '@/lib/blog'
import { USE_CASES, USE_CASE_CONTENT_UPDATED, type UseCasePath } from '@/lib/use-cases'
import { ANIMATION_GUIDES, ANIMATION_GUIDE_DATE } from '@/lib/animation-guides'

/** Existing public inventory and authoritative dates, preserved from app/sitemap.ts. */
export const existingSitemapEntries = [
  ...['/', '/getting-started', '/agent-skills', '/blog'].map(path => ({ url: new URL(path, SITE_URL).href, ...(path === '/agent-skills' ? { lastModified: DOCS_LINKS_UPDATED } : path === '/' ? { lastModified: ANIMATION_GUIDE_DATE } : {}) })),
  ...BLOG_POSTS.map(post => ({ url: new URL(blogPath(post), SITE_URL).href, lastModified: post.modified ?? post.published })),
  ...Object.keys(USE_CASES).map(path => ({ url: new URL(path, SITE_URL).href, lastModified: USE_CASE_CONTENT_UPDATED[path as UseCasePath] })),
  ...Object.keys(ANIMATION_GUIDES).map(path => ({ url: new URL(path, SITE_URL).href, lastModified: ANIMATION_GUIDE_DATE })),
]

/** Keep existing marketing, editorial and technique families independently inspectable. */
export const existingSitemapTopics = [
  { file: 'sitemap-site.xml', paths: ['/', '/getting-started', '/agent-skills'] },
  { file: 'sitemap-blog.xml', paths: ['/blog', ...BLOG_POSTS.map(blogPath)] },
  { file: 'sitemap-guides.xml', paths: [...Object.keys(USE_CASES), ...Object.keys(ANIMATION_GUIDES)] },
]

/** Preserve real editorial dates; newly migrated pages intentionally have no invented date. */
export const existingModificationDates = new Map(existingSitemapEntries.flatMap(entry =>
  'lastModified' in entry ? [[new URL(entry.url).pathname, entry.lastModified] as const] : []
))
