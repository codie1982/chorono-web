import { documentationPages, documentationHref } from '@/lib/documentation/manifest'
import { animationEntries, animationHref } from '@/lib/animation-library/catalog'
import { SITE_URL } from '@/lib/site'
import { existingSitemapTopics, existingModificationDates } from './existing'
import { publicContentOrigin } from './publication'

/** One root-level topic, with explicit eligibility for unpublished new content. */
export interface SitemapTopic {
  readonly file: string
  readonly paths: readonly string[]
  readonly unpublished?: boolean
}

const docGroups = [
  ['sitemap-docs-start.xml', 'Getting started'],
  ['sitemap-docs-editor.xml', 'Create animations'],
  ['sitemap-docs-ai.xml', 'AI & scripting'],
  ['sitemap-docs-resources.xml', 'Resources'],
] as const

/** Same inventories drive routes and sitemaps; old public coverage is retained. */
export const sitemapTopics: readonly SitemapTopic[] = [
  ...existingSitemapTopics,
  ...docGroups.map(([file, group]) => ({ file, unpublished: true, paths: documentationPages.filter(page => page.group === group).map(page => documentationHref(page.slug)) })),
  { file: 'sitemap-animations.xml', unpublished: true, paths: ['/animations', ...animationEntries.map(entry => animationHref(entry.slug))] },
]

/** Encode a URL/date as XML text, without trusting origin or query characters. */
function xmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

/**
 * Serialize the index or one topic using absolute URLs. Existing authoritative
 * modification dates survive the migration; new pages receive no invented date.
 * Unknown or unpublished topics return null. Preview includes all real local
 * routes and points only at labelled inspection endpoints, not the live index.
 */
export function serializeSitemap(origin: string, file = 'sitemap.xml', preview = false, includeUnpublished = preview): string | null {
  const topics = sitemapTopics.filter(topic => includeUnpublished || !topic.unpublished)
  const topic = topics.find(item => item.file === file)
  if (file !== 'sitemap.xml' && !topic) return null
  const index = file === 'sitemap.xml'
  const locations = index
    ? topics.filter(item => item.paths.length).map(item => ({ url: new URL(preview ? `/sitemap-preview.xml?topic=${item.file}` : `/${item.file}`, origin).href, modified: undefined as string | undefined }))
    : topic!.paths.map(path => ({ url: new URL(path, origin).href, modified: existingModificationDates.get(path) }))
  const root = index ? 'sitemapindex' : 'urlset'
  const tag = index ? 'sitemap' : 'url'
  return `<?xml version="1.0" encoding="UTF-8"?>\n${preview ? '<!-- Local preview only. Do not submit this endpoint to search engines. -->\n' : ''}<${root} xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map(item => `  <${tag}><loc>${xmlText(item.url)}</loc>${item.modified ? `<lastmod>${xmlText(item.modified)}</lastmod>` : ''}</${tag}>`).join('\n')}\n</${root}>`
}

/** Keep existing public sitemap coverage live; gate only the new docs/library. */
export function publishedSitemapResponse(file = 'sitemap.xml'): Response {
  const publicOrigin = publicContentOrigin()
  const xml = serializeSitemap(publicOrigin ?? SITE_URL, file, false, !!publicOrigin)
  return xml ? new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }) : new Response('No published content sitemap', { status: 404 })
}
