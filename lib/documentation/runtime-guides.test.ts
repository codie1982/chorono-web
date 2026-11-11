import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { documentationPages, documentationHref, findDocumentationPage } from './manifest'
import { runtimeGuides } from './runtime-guides'
import { documentationStructuredData } from './structured-data'
import { contentPublicationMetadata } from '../site-index/publication'
import { serializeSitemap } from '../site-index/sitemap'

afterEach(() => vi.unstubAllEnvs())

/** Release boundaries cover metadata contracts, both XML modes and honest page
 * content. Existing JavaScript/React/Vue entry points remain independently usable. */
describe('runtime platform release boundary', () => {
  it('keeps every runtime platform at one real destination', () => {
    expect(runtimeGuides).toHaveLength(16)
    expect(runtimeGuides.filter(page => page.availability === 'coming-soon')).toHaveLength(15)
    for (const slug of ['javascript', 'react', 'vue', 'downloads'])
      expect(findDocumentationPage(`runtime/${slug}`)?.source).toBe(`docs/en/runtime-${slug}.md`)
    for (const page of runtimeGuides) expect(documentationPages).toContain(page)
  })

  it('makes ready guides indexable and forthcoming guides readable but noindex', () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    const publicXml = serializeSitemap('https://www.chorono.com', 'sitemap-docs-runtime.xml', false, true)!
    const inspectionXml = serializeSitemap('http://localhost:2011', 'sitemap-docs-runtime.xml', true)!
    for (const page of runtimeGuides) {
      const comingSoon = page.availability === 'coming-soon'
      const path = documentationHref(page.slug)
      const metadata = contentPublicationMetadata(path, !comingSoon)
      expect(metadata.robots).toEqual({ index: !comingSoon, follow: true })
      expect(metadata.alternates).toEqual({ canonical: `https://www.chorono.com${path}` })
      expect(publicXml.includes(`<loc>https://www.chorono.com${path}</loc>`)).toBe(!comingSoon)
      expect(inspectionXml).toContain(`<loc>http://localhost:2011${path}</loc>`)
      const graph = documentationStructuredData(page, [])['@graph']
      expect(graph.some(item => item['@type'] === 'TechArticle')).toBe(!comingSoon)
      if (comingSoon) {
        const source = readFileSync(page.source, 'utf8')
        expect(source).toContain('**Coming soon.**')
        expect(source).not.toMatch(/```(?:sh|bash|kotlin|swift|dart|python)/)
      }
    }
    expect(publicXml).toContain('/docs/runtime/javascript</loc>')
    expect(publicXml).toContain('/docs/runtime/android</loc>')
  })

  it('retains preview isolation for both ready and forthcoming pages', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    for (const page of runtimeGuides)
      expect(contentPublicationMetadata(documentationHref(page.slug), page.availability !== 'coming-soon').robots)
        .toEqual({ index: false, follow: false })
  })
})
