import Link from 'next/link'
import { documentationHref } from '@/lib/documentation/manifest'
import {
  getRelatedDocumentation,
  relatedGuidesHeading,
} from '@/lib/documentation/related'
import { DocumentationIcon as Icon } from './DocumentationIcon'

/** Render crawlable, descriptive next-task links in the article's actual HTML. */
export function RelatedGuides({ slug }: { slug: string }) {
  const pages = getRelatedDocumentation(slug)
  if (!pages.length) return null
  return (
    <section
      className="cd-related-guides"
      id={relatedGuidesHeading.id}
      aria-labelledby="docs-related-title"
    >
      <div className="cd-section-heading">
        <h2 id="docs-related-title">{relatedGuidesHeading.text}</h2>
        <span>KEEP YOUR IDEAS MOVING</span>
      </div>
      <div className="cd-related-grid">
        {pages.map((page) => (
          <Link href={documentationHref(page.slug)} key={page.slug}>
            <span className="cd-related-group">{page.group}</span>
            <h3>{page.title}</h3>
            <p>{page.description}</p>
            <span className="cd-related-arrow">
              Read the guide <Icon name="arrow" size={15} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
