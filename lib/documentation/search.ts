import type { DocumentationSearchEntry } from './content'

export interface DocumentationSearchResult extends DocumentationSearchEntry {
  readonly excerpt: string
}

/** Normalize case and accents for deterministic English documentation search. */
function normalize(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/**
 * Rank immutable article/section entries by all query terms. Titles and
 * section names outrank body-only matches; ties preserve source order. Empty
 * input returns article shortcuts, and no-match queries return an empty list.
 * Results are bounded to 12 and do not require a network request or tracking.
 */
export function searchDocumentation(
  entries: readonly DocumentationSearchEntry[],
  query: string
): DocumentationSearchResult[] {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean)
  return entries
    .map((entry, order) => {
      const title = normalize(entry.title)
      const section = normalize(entry.section)
      const text = normalize(entry.text)
      const combined = `${title} ${section} ${text}`
      const match = terms.length
        ? terms.every((term) => combined.includes(term))
        : !entry.section
      const score = terms.reduce(
        (sum, term) =>
          sum +
          (title.includes(term) ? 30 : 0) +
          (section.includes(term) ? 20 : 0) +
          (text.includes(term) ? 1 : 0),
        0
      )
      const at = terms.length ? Math.max(0, text.indexOf(terms[0]) - 45) : 0
      return {
        entry,
        order,
        match,
        score,
        excerpt: `${at ? '…' : ''}${entry.text.slice(at, at + 145).trim()}${entry.text.length > at + 145 ? '…' : ''}`,
      }
    })
    .filter((result) => result.match)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 12)
    .map(({ entry, excerpt }) => ({ ...entry, excerpt }))
}
