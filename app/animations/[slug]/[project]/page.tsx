import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SkillExampleDetail } from '@/components/agent-skills/SkillCatalog'
import skillStyles from '@/components/agent-skills/skill-catalog.module.css'
import { LibraryProject } from '@/components/animation-library/LibraryProject'
import { skillCatalogMetadata } from '@/lib/agent-skills/seo'
import { findShowcaseProject, showcaseProjectHref, showcaseProjects } from '@/lib/animation-library/showcase'
import { pageMetadata } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

type Props = { params: { slug: string; project: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return showcaseProjects.filter(project => project.kind !== 'native').map(({ category, slug }) => ({ slug: category, project: slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = findShowcaseProject(params.slug, params.project)
  if (!project || project.kind === 'native') notFound()
  if (project.kind === 'skill') return skillCatalogMetadata(project.example)
  const path = showcaseProjectHref(project)
  return {
    ...pageMetadata(project.title, project.description, path, { image: project.cover.src, imageAlt: project.cover.alt }),
    ...contentPublicationMetadata(path, project.kind !== 'concept'),
  }
}

export default async function AnimationProjectPage({ params }: Props) {
  const project = findShowcaseProject(params.slug, params.project)
  if (!project || project.kind === 'native') notFound()
  if (project.kind === 'skill') return <main className={skillStyles.publicMain}><SkillExampleDetail example={project.example} /></main>
  return <LibraryProject project={project} />
}
