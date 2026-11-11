import { editorialSiteEntities, SITE_URL } from '@/lib/site'
import { documentationHref, type DocumentationPage } from './manifest'
import { documentationBreadcrumbs, documentationChildren } from './hierarchy'
import { documentationSections } from './sections'

/** Describe the rendered English guide and its visible navigation. Hub pages
 * are collections; task guides are technical articles. Shared publisher/site
 * identities reuse the public site's graph. No publication date, rating,
 * author byline, FAQ, software capability or search result is invented. */
export function documentationStructuredData(page: DocumentationPage, headings: readonly { text: string }[]) {
  const url = new URL(documentationHref(page.slug), SITE_URL).href
  const breadcrumbs = documentationBreadcrumbs(page)
  const collection = !page.slug || documentationChildren(page).length > 0
    || documentationSections.some(section => section.primary && section.slug === page.slug)
  const technicalArticle = !collection && page.availability !== 'coming-soon'
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...editorialSiteEntities(),
      {
        '@type': collection ? 'CollectionPage' : 'WebPage',
        '@id': `${url}#webpage`, url, name: page.title, description: page.description,
        inLanguage: 'en', isAccessibleForFree: true,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        ...(breadcrumbs.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
        ...(technicalArticle ? { mainEntity: { '@id': `${url}#article` } } : {}),
      },
      // Google's breadcrumb representation needs a trail of at least two items.
      // The Docs root keeps its visible label without inventing a parent trail.
      ...(breadcrumbs.length > 1 ? [{
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem', position: index + 1, name: crumb.label,
          item: new URL(crumb.href, SITE_URL).href,
        })),
      }] : []),
      ...(technicalArticle ? [{
        '@type': 'TechArticle', '@id': `${url}#article`, url,
        headline: page.title, description: page.description, inLanguage: 'en',
        isAccessibleForFree: true, articleSection: headings.map(heading => heading.text),
        publisher: { '@id': `${SITE_URL}/#team` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntityOfPage: { '@id': `${url}#webpage` },
      }] : []),
    ],
  }
}
