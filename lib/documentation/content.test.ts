import { describe, expect, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import {
  documentationHeadingIds,
  prepareDocumentation,
  resolveDocumentationLink,
} from './content'
import { documentationPages } from './manifest'
import { searchDocumentation } from './search'

describe('documentation reader and discovery contract', () => {
  const page = documentationPages[2]
  const source =
    '# A title\n\n[Documentation](README.md) · [Türkçe](../tr/getting-started.md)\n\nAn editable example.\n\n## Save & reopen\n\nKeep your portable project.\n\n```js\n## Not a heading\n```\n\n## Save & reopen\n\nFind the revised blue circle.'

  it('shares stable duplicate-aware heading IDs with rendering and ignores code fences', () => {
    const result = prepareDocumentation(source, page)
    expect(result.introduction).toBe('An editable example.')
    expect(result.markdown).not.toContain('Türkçe')
    expect(result.headings.map((heading) => heading.id)).toEqual([
      'save--reopen',
      'save--reopen-1',
    ])
    const rendered = unified().use(remarkParse).parse(result.markdown)
    documentationHeadingIds()(rendered)
    expect(
      rendered.children
        .filter((node) => node.type === 'heading')
        .map((node) => node.data?.hProperties?.id)
    ).toEqual(result.headings.map((heading) => heading.id))
  })

  it('resolves sibling docs, hashes and repository files without inventing local routes', () => {
    expect(
      resolveDocumentationLink(
        'installation.md#2-start-and-connect',
        page.source
      )
    ).toBe('/docs/installation#2-start-and-connect')
    expect(resolveDocumentationLink('../../LICENSE', page.source)).toBe(
      'https://github.com/codie1982/chorono-editor/blob/main/LICENSE'
    )
    expect(
      resolveDocumentationLink(
        'https://www.chorono.com/text-animation',
        page.source
      )
    ).toBe('https://www.chorono.com/text-animation')
  })

  it('finds section body terms, requires every term and does not mutate the index', () => {
    const entries = prepareDocumentation(source, page).search
    const snapshot = JSON.stringify(entries)
    expect(searchDocumentation(entries, 'BLUE circle')[0].href).toBe(
      '/docs/first-animation#save--reopen-1'
    )
    expect(searchDocumentation(entries, 'blue missing')).toEqual([])
    expect(searchDocumentation(entries, '')).toHaveLength(1)
    expect(JSON.stringify(entries)).toBe(snapshot)
  })

  it('ranks a matching article title above incidental mentions in other pages', () => {
    const mcpPage = documentationPages.find((page) => page.slug === 'ai/mcp')!
    const incidental = prepareDocumentation(
      '# Intro\n\nRead about MCP.',
      documentationPages[0]
    ).search
    const focused = prepareDocumentation(
      '# Connect\n\nConnect the editor.',
      mcpPage
    ).search
    expect(
      searchDocumentation([...incidental, ...focused], 'MCP')[0].href
    ).toBe('/docs/ai/mcp')
  })
})
