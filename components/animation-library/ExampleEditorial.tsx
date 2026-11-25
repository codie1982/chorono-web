import Link from 'next/link'
import { exampleEditorial } from '@/lib/animation-library/example-editorial'
import { showcaseProjectHref, showcaseProjects } from '@/lib/animation-library/showcase'

export function ExampleEditorial({ slug }: { slug: string }) {
  const content = exampleEditorial[slug]
  if (!content) return null
  const related = content.related.map(relatedSlug => showcaseProjects.find(project => project.slug === relatedSlug))

  return <section className="al-editorial" aria-labelledby="animation-study-heading" data-animation-editorial="">
    <h2 id="animation-study-heading">{content.heading}</h2>
    {content.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <nav aria-label="Related animation examples" className="al-project-links al-related-examples">
      {related.map(project => project && <Link key={project.slug} href={showcaseProjectHref(project)}>
        {project.title} · {exampleEditorial[project.slug].topic}
      </Link>)}
    </nav>
  </section>
}
