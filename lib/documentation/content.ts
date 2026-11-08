import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import type { Root } from 'mdast'
import {
  documentationHref,
  documentationPages,
  type DocumentationPage,
} from './manifest'

export interface DocumentationHeading {
  readonly id: string
  readonly text: string
  readonly depth: number
}
export interface DocumentationSearchEntry {
  readonly id: string
  readonly href: string
  readonly title: string
  readonly section: string
  readonly group: string
  readonly text: string
}
export interface DocumentationContent {
  readonly markdown: string
  readonly introduction: string
  readonly headings: readonly DocumentationHeading[]
  readonly search: readonly DocumentationSearchEntry[]
  readonly readingMinutes: number
}

/**
 * Convert a trusted repository Markdown article into reader/search payloads.
 * Removes the source title and repository-only breadcrumb paragraph, keeping
 * the first prose paragraph as the lead. GFM parsing excludes fenced-code
 * pseudo-headings and produces stable, duplicate-aware GitHub anchor IDs.
 * The input is immutable; no HTML or scripts are executed.
 */
export function prepareDocumentation(
  markdown: string,
  page: DocumentationPage
): DocumentationContent {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  const nodes = tree.children.filter((node, index) => {
    if (index === 0 && node.type === 'heading' && node.depth === 1) return false
    if (index >= 3 || node.type !== 'paragraph') return true
    return (
      !/^(Documentation|Docs)\s*[·|]/.test(toString(node)) &&
      !node.children.some(
        (child) => child.type === 'link' && toString(child) === 'Türkçe'
      )
    )
  })
  const slice = (node: (typeof nodes)[number]) =>
    markdown.slice(node.position?.start.offset, node.position?.end.offset)
  const introduction =
    nodes[0]?.type === 'paragraph' ? slice(nodes.shift()!) : ''
  const slugger = new GithubSlugger()
  const headings: DocumentationHeading[] = []
  const search: DocumentationSearchEntry[] = [
    {
      id: page.slug || 'introduction',
      href: documentationHref(page.slug),
      title: page.title,
      section: '',
      group: page.group,
      text: `${page.description} ${introduction}`,
    },
  ]
  for (const node of nodes) {
    if (node.type === 'heading') {
      const text = toString(node)
      const id = slugger.slug(text)
      if (node.depth === 2 || node.depth === 3)
        headings.push({ id, text, depth: node.depth })
      search.push({
        id: `${page.slug}#${id}`,
        href: `${documentationHref(page.slug)}#${id}`,
        title: page.title,
        section: text,
        group: page.group,
        text: '',
      })
    } else {
      const last = search[search.length - 1]
      search[search.length - 1] = {
        ...last,
        text: `${last.text} ${toString(node)}`.trim().slice(0, 1800),
      }
    }
  }
  return {
    markdown: nodes.map(slice).join('\n\n'),
    introduction,
    headings,
    search,
    readingMinutes: Math.max(
      1,
      Math.ceil(toString(tree).split(/\s+/).length / 220)
    ),
  }
}

/**
 * Remark plugin shared by article rendering and TOC preparation. Each parse
 * receives its own slugger; duplicate heading names retain deterministic IDs.
 */
export function documentationHeadingIds() {
  return (tree: Root) => {
    const slugger = new GithubSlugger()
    for (const node of tree.children) {
      if (node.type !== 'heading') continue
      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          id: slugger.slug(toString(node)),
        },
      }
    }
  }
}

/**
 * Resolve Markdown-relative references against their source location. Known
 * docs stay local; non-curated repository files use a precise GitHub source
 * link. Hashes are preserved. External protocols are left to react-markdown's
 * default safe URL policy; this function never enables raw HTML.
 */
export function resolveDocumentationLink(href: string, source: string): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) return href
  const resolved = new URL(href, `https://documentation.invalid/${source}`)
  const path = decodeURIComponent(resolved.pathname.slice(1))
  const local = documentationPages.find((page) => page.source === path)
  if (local) return documentationHref(local.slug) + resolved.hash
  return `https://github.com/codie1982/chorono-editor/blob/main/${path}${resolved.hash}`
}
