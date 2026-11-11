import { documentationPages, findDocumentationPage, type DocumentationPage } from './manifest'
import { documentationHref } from './manifest'
import { documentationSections } from './sections'

/** Direct editorial children in reader order; never inferred from URL prefixes. */
export function documentationChildren(page: DocumentationPage): readonly DocumentationPage[] {
  return documentationPages.filter(item => item.parentSlug === page.slug)
}

/** Root-to-parent breadcrumb trail. Invalid/cyclic cross-section metadata is an
 * authoring error, not a reason to silently invent a route or breadcrumb. */
export function documentationAncestors(page: DocumentationPage): readonly DocumentationPage[] {
  const result: DocumentationPage[] = [], seen = new Set([page.slug])
  let current = page
  while (current.parentSlug !== undefined) {
    const parent = findDocumentationPage(current.parentSlug)
    if (!parent || parent.section !== page.section || seen.has(parent.slug)) throw new Error(`Invalid documentation parent: ${current.slug}`)
    seen.add(parent.slug); result.unshift(parent); current = parent
  }
  return result
}

/** One visible root-to-page trail shared with BreadcrumbList structured data.
 * Section hubs are editorial parents, never new URLs. Repeated destinations
 * (for example Getting started and Docs) appear only once. No input is mutated. */
export function documentationBreadcrumbs(page: DocumentationPage): readonly { label: string; href: string }[] {
  const section = documentationSections.find(item => item.id === page.section)!
  const trail = [
    { label: 'Docs', href: '/docs' },
    ...(page.slug ? [{ label: section.label, href: documentationHref(section.slug) }] : []),
    ...documentationAncestors(page).map(parent => ({ label: parent.label, href: documentationHref(parent.slug) })),
    ...(page.slug && page.slug !== section.slug ? [{ label: page.label, href: documentationHref(page.slug) }] : []),
  ]
  return trail.filter((item, index) => trail.findIndex(other => other.href === item.href) === index)
}
