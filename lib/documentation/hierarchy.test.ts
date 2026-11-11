import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root, RootContent } from 'mdast'
import { documentationPages } from './manifest'
import { documentationAncestors, documentationChildren } from './hierarchy'
import { editorGuides } from './editor-guides'
import { findDocumentationScreenshot } from './screenshots'
import { resolveDocumentationLink } from './content'

/** Navigation and media checks protect routes from accidental orphaning and
 * captions from silently falling back to non-rendering repository links. */
describe('detailed editor guide contracts', () => {
  it('keeps every new guide reachable under its explicit navigation parent', () => {
    for (const guide of editorGuides) {
      expect(documentationPages).toContain(guide)
      const ancestors = documentationAncestors(guide)
      expect(ancestors.at(-1)?.slug).toBe(guide.parentSlug)
      if (ancestors.length) expect(documentationChildren(ancestors.at(-1)!)).toContain(guide)
    }
  })
  it('resolves every detailed guide image to a real allowlisted local capture', () => {
    for (const guide of editorGuides) {
      const tree = unified().use(remarkParse).parse(readFileSync(guide.source, 'utf8'))
      let images = 0
      const inspect = (node: Root | RootContent) => {
        if (node.type === 'image') {
          images++
          const href = resolveDocumentationLink(node.url, guide.source)
          const image = findDocumentationScreenshot(href)
          expect(image, `${guide.slug}: ${node.url}`).toBeDefined()
          expect(readFileSync(image!.source).length).toBeGreaterThan(1000)
          expect(image!.width).toBeGreaterThan(0)
          expect(image!.height).toBeGreaterThan(0)
          expect(node.alt?.length).toBeGreaterThan(12)
        }
        if ('children' in node) for (const child of node.children) inspect(child as RootContent)
      }
      inspect(tree)
      expect(images, guide.slug).toBeGreaterThan(0)
    }
  })
})
