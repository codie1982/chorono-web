import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root, RootContent } from 'mdast'
import legacyPages from './legacy-pages.json'
import { documentationHref, documentationPages, findDocumentationPage } from './manifest'
import { documentationSections } from './sections'
import { prepareDocumentation, resolveDocumentationLink } from './content'
import { sitemapTopics } from '../site-index/sitemap'

describe('documentation reorganization compatibility', () => {
  it('preserves every established route, metadata field and reviewed source article', () => {
    for (const { sourceHash, group, ...page } of legacyPages) {
      expect(findDocumentationPage(page.slug)).toMatchObject(page)
      const source = readFileSync(page.source)
      expect(createHash('sha256').update(source).digest('hex')).toBe(sourceHash)
      const previousTopics: Record<string, string> = { 'Getting started': 'start', 'Create animations': 'editor', 'AI & scripting': 'ai', Resources: 'resources' }
      const previousTopic = previousTopics[group]
      expect(sitemapTopics.find(topic => topic.file === `sitemap-docs-${previousTopic}.xml`)?.paths).toContain(documentationHref(page.slug))
    }
  })

  it('gives every article one section, one sitemap inventory entry and a real source', () => {
    const paths = sitemapTopics.flatMap(topic => [...topic.paths, ...(topic.previewOnlyPaths ?? [])])
    expect(new Set(documentationPages.map(page => page.slug)).size).toBe(documentationPages.length)
    for (const section of documentationSections) {
      expect(findDocumentationPage(section.slug)?.section).toBe(section.id)
      expect(readFileSync(`app/${section.sitemap}/route.ts`, 'utf8')).toContain(section.sitemap)
    }
    for (const page of documentationPages) {
      expect(documentationSections.filter(section => section.id === page.section)).toHaveLength(1)
      expect(paths.filter(path => path === documentationHref(page.slug))).toHaveLength(1)
      expect(readFileSync(page.source, 'utf8').length).toBeGreaterThan(100)
    }
  })

  it('resolves new guide links and fragments to existing reader pages', () => {
    const original = new Set(legacyPages.map(page => page.slug))
    for (const page of documentationPages.filter(page => !original.has(page.slug))) {
      const tree = unified().use(remarkParse).parse(readFileSync(page.source, 'utf8'))
      const inspect = (node: Root | RootContent) => {
        if (node.type === 'link' && !/^https?:/.test(node.url)) {
          const href = resolveDocumentationLink(node.url, page.source)
          const [path, hash] = href.split('#')
          const target = documentationPages.find(item => documentationHref(item.slug) === path)
          expect(target, `${page.slug}: ${node.url} → ${href}`).toBeDefined()
          if (hash && target) {
            const content = prepareDocumentation(readFileSync(target.source, 'utf8'), target)
            expect(content.headings.map(heading => heading.id), href).toContain(hash)
          }
        }
        if ('children' in node) for (const child of node.children) inspect(child as RootContent)
      }
      inspect(tree)
    }
  })
})
