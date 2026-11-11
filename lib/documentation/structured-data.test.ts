import { describe, expect, it } from 'vitest'
import { documentationPages, documentationHref, findDocumentationPage } from './manifest'
import { documentationBreadcrumbs } from './hierarchy'
import { documentationStructuredData } from './structured-data'

describe('documentation search identity', () => {
  it('describes every real page with resolved graph identities and the visible breadcrumb', () => {
    for (const page of documentationPages) {
      const graph = documentationStructuredData(page, [{ text: 'Read the controls' }])['@graph']
      const entities = new Map(graph.map(item => [item['@id'], item]))
      expect(entities.size).toBe(graph.length)
      const url = `https://www.chorono.com${documentationHref(page.slug)}`
      expect(entities.get(`${url}#webpage`)).toMatchObject({ url, name: page.title, description: page.description })
      const visibleTrail = documentationBreadcrumbs(page)
      const breadcrumb = entities.get(`${url}#breadcrumb`) as { itemListElement: { position: number; item: string }[] }
      if (visibleTrail.length > 1) {
        expect(breadcrumb.itemListElement.map(item => item.item)).toEqual(visibleTrail.map(crumb => `https://www.chorono.com${crumb.href}`))
        expect(breadcrumb.itemListElement.at(-1)?.item).toBe(url)
      } else {
        expect(breadcrumb).toBeUndefined()
        expect(entities.get(`${url}#webpage`)).not.toHaveProperty('breadcrumb')
      }
      const inspect = (value: unknown): void => {
        if (!value || typeof value !== 'object') return
        if ('@id' in value) expect(entities.has(String(value['@id']))).toBe(true)
        for (const child of Object.values(value)) if (Array.isArray(child)) child.forEach(inspect); else inspect(child)
      }
      graph.forEach(inspect)
      expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|FAQPage|datePublished|dateModified/)
    }
  })

  it('keeps nested editor parents while avoiding repeated Docs links', () => {
    expect(documentationBreadcrumbs(findDocumentationPage('editor/layers/basic-shapes')!).map(crumb => crumb.href))
      .toEqual(['/docs', '/docs/editor', '/docs/editor/layers', '/docs/editor/layers/basic-shapes'])
    expect(documentationBreadcrumbs(findDocumentationPage('installation')!).map(crumb => crumb.href))
      .toEqual(['/docs', '/docs/installation'])
    expect(documentationStructuredData(findDocumentationPage('editor')!, [])['@graph'].some(item => item['@type'] === 'TechArticle')).toBe(false)
    expect(documentationStructuredData(findDocumentationPage('editor/layers/basic-shapes')!, [])['@graph'].some(item => item['@type'] === 'TechArticle')).toBe(true)
  })
})
