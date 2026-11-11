import { documentationPages, documentationHref } from '@/lib/documentation/manifest'
import { animationEntries, animationHref } from '@/lib/animation-library/catalog'
import { SITE_URL } from '@/lib/site'
import { existingSitemapTopics, existingModificationDates } from './existing'
import { publicContentOrigin } from './publication'
import { documentationSections } from '@/lib/documentation/sections'

/** One root-level topic, with explicit eligibility for unpublished new content. */
export interface SitemapTopic {
  readonly file: string
  readonly paths: readonly string[]
  /** Readable status pages included only in the explicitly noindex inspector. */
  readonly previewOnlyPaths?: readonly string[]
  readonly unpublished?: boolean
}

/** Same inventories drive routes and sitemaps; old public coverage is retained. */
export const sitemapTopics: readonly SitemapTopic[] = [
  ...existingSitemapTopics,
  ...documentationSections.map(section => ({
    file: section.sitemap, unpublished: true,
    paths: documentationPages.filter(page => page.section === section.id && page.availability !== 'coming-soon').map(page => documentationHref(page.slug)),
    previewOnlyPaths: documentationPages.filter(page => page.section === section.id && page.availability === 'coming-soon').map(page => documentationHref(page.slug)),
  })),
  { file: 'sitemap-animations.xml', unpublished: true, paths: ['/animations', ...animationEntries.map(entry => animationHref(entry.slug))] },
]

/** Fail authoring checks on duplicate/noncanonical URLs, unsafe topic names or
 * oversized inventories. Every HTML page belongs to exactly one root-level
 * sitemap. Download payloads, query variants and fragments are not pages. */
export function validateSitemapInventory(topics: readonly SitemapTopic[]): void {
  const files = new Set<string>(), paths = new Set<string>()
  if (topics.length > 50_000) throw new Error('Sitemap index exceeds 50,000 topics')
  for (const topic of topics) {
    if (!/^sitemap-[a-z0-9-]+\.xml$/.test(topic.file) || files.has(topic.file)) throw new Error(`Invalid or duplicate sitemap: ${topic.file}`)
    files.add(topic.file)
    const allPaths = [...topic.paths, ...(topic.previewOnlyPaths ?? [])]
    if (allPaths.length > 50_000) throw new Error(`Sitemap exceeds 50,000 URLs: ${topic.file}`)
    for (const path of allPaths) {
      if (!/^\/(?:[a-z0-9][a-z0-9./-]*)?$/.test(path) || (path !== '/' && path.endsWith('/'))
        || new URL(path, SITE_URL).pathname !== path || path.endsWith('/download') || paths.has(path))
        throw new Error(`Noncanonical or duplicate sitemap path: ${path}`)
      paths.add(path)
    }
  }
}

validateSitemapInventory(sitemapTopics)

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
    ? topics.filter(item => item.paths.length || preview && item.previewOnlyPaths?.length).map(item => ({ url: new URL(preview ? `/sitemap-preview.xml?topic=${item.file}` : `/${item.file}`, origin).href, modified: undefined as string | undefined }))
    : [...topic!.paths, ...(preview ? topic!.previewOnlyPaths ?? [] : [])].sort().map(path => ({ url: new URL(path, origin).href, modified: existingModificationDates.get(path) }))
  const root = index ? 'sitemapindex' : 'urlset'
  const tag = index ? 'sitemap' : 'url'
  return `<?xml version="1.0" encoding="UTF-8"?>\n${preview ? '<!-- Local preview only. Do not submit this endpoint to search engines. -->\n' : ''}<${root} xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map(item => `  <${tag}>\n    <loc>${xmlText(item.url)}</loc>${item.modified ? `\n    <lastmod>${xmlText(item.modified)}</lastmod>` : ''}\n  </${tag}>`).join('\n')}\n</${root}>\n`
}

/** Keep existing public sitemap coverage live; gate only the new docs/library. */
export function publishedSitemapResponse(file = 'sitemap.xml'): Response {
  const publicOrigin = publicContentOrigin()
  const xml = serializeSitemap(publicOrigin ?? SITE_URL, file, false, !!publicOrigin)
  return xml ? new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }) : new Response('No published content sitemap', { status: 404 })
}
