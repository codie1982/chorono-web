import Link from 'next/link'
import { documentationHref, documentationPages, type DocumentationPage } from '@/lib/documentation/manifest'
import { documentationSections } from '@/lib/documentation/sections'
import { DocumentationIcon as Icon } from './DocumentationIcon'
import { documentationChildren } from '@/lib/documentation/hierarchy'

/** Server-rendered entry cards reuse the manifest; no duplicate route or status inventory. */
export function DocumentationCategories({ page }: { page?: DocumentationPage }) {
  const items = page
    ? (documentationChildren(page).length ? documentationChildren(page) : documentationPages.filter(item => item.section === page.section && item.slug !== page.slug && item.parentSlug === undefined)).map(item => ({ href: documentationHref(item.slug), title: item.label, description: item.description }))
    : documentationSections.filter(section => section.primary).map(section => ({ href: documentationHref(section.slug), title: section.label, description: section.description }));
  if (!items.length) return null;
  return <div className="cd-category-grid">
    {items.map(item => <Link key={item.href} href={item.href}>
      <h3>{item.title}<Icon name="arrow" size={17} /></h3>
      <p>{item.description}</p>
    </Link>)}
  </div>;
}
