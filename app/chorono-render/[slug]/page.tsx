import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GuideLink, PreviewLink } from '@/components/render-research/RenderResearch'
import styles from '@/components/render-research/render-research.module.css'
import { renderCover, renderGuidePath, renderGuides, renderPath } from '@/lib/render-guides'
import { GUIDE_AUTHOR, pageMetadata, SITE_URL } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

type Props = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return renderGuides.map(guide => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: Props) {
  const guide = renderGuides.find(item => item.slug === params.slug)
  if (!guide) notFound()
  const path = renderGuidePath(guide)
  return {
    ...pageMetadata(guide.title + ' | Chorono Render', guide.description, path, renderCover),
    ...contentPublicationMetadata(path),
  }
}

export default function RenderGuidePage({ params }: Props) {
  const guide = renderGuides.find(item => item.slug === params.slug)
  if (!guide) notFound()
  const url = new URL(renderGuidePath(guide), SITE_URL).href
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Organization', ...GUIDE_AUTHOR },
    mainEntityOfPage: url,
    image: new URL(renderCover.image, SITE_URL).href,
    inLanguage: 'en',
  }

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <div className={styles.wrapper}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>
        <li><Link href="/3d-rendering-software">Chorono Render</Link></li>
        <li><Link href={renderPath}>Architecture</Link></li>
        <li aria-current="page">{guide.title}</li>
      </ol></nav>
      <article className={styles.article}>
        <header>
          <h1>{guide.title}</h1>
          <p className={styles.lead}>{guide.intro}</p>
          <p className={styles.author}>By {GUIDE_AUTHOR.name}</p>
          <PreviewLink topic={guide.slug} />
        </header>
        {guide.sections.map(section => <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {'checklist' in section && <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}
        </section>)}
        <section className={styles.articleCta}>
          <h2>Try it with the courtyard pavilion</h2>
          <p>Switch between named stops in the rendered preview and share the workflow you would use on your own project.</p>
          <PreviewLink topic={guide.slug} />
        </section>
        <section className={styles.references}>
          <h2>References</h2>
          <ul>{guide.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul>
        </section>
        <nav aria-label="Related rendering guides" className={styles.references}>
          <h2>Related guides</h2>
          <ul>{renderGuides.filter(other => other.slug !== guide.slug).map(other => <li key={other.slug}>
            <GuideLink href={renderGuidePath(other)} topic={other.slug}>{other.title}</GuideLink>
          </li>)}</ul>
        </nav>
      </article>
    </div>
  </main>
}
