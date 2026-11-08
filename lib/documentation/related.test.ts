import { describe, expect, it } from 'vitest'
import { documentationPages } from './manifest'
import { getRelatedDocumentation } from './related'

describe('curated documentation relationships', () => {
  it('provides distinct valid follow-up tasks with no self links', () => {
    for (const page of documentationPages) {
      const related = getRelatedDocumentation(page.slug)
      expect(related).toHaveLength(3)
      expect(new Set(related.map((target) => target.slug)).size).toBe(
        related.length
      )
      expect(related.every((target) => target.slug !== page.slug)).toBe(true)
    }
  })
  it('gives every leaf article at least one contextual incoming relationship', () => {
    const incoming = new Set(
      documentationPages.flatMap((page) =>
        getRelatedDocumentation(page.slug).map((target) => target.slug)
      )
    )
    for (const page of documentationPages.filter((page) => page.slug))
      expect(incoming.has(page.slug)).toBe(true)
    expect(getRelatedDocumentation('not-a-doc')).toEqual([])
  })
})
