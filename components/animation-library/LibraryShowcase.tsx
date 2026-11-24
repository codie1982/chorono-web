import Image from 'next/image'
import { skillExampleFamilies } from '@/lib/agent-skills/catalog'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import { ANIMATION_LIBRARY_PATH, ANIMATION_RENDER_PATH, ANIMATION_SKILLS_PATH, showcaseCategoryNames, showcaseCollectionHref } from '@/lib/animation-library/routes'
import { findShowcaseCollection, showcaseCategories, showcaseCollections, showcaseProjectHref, showcaseProjects, showcaseResourceCollections, upcomingRenderStyles, type ShowcaseProject } from '@/lib/animation-library/showcase'

type Crumb = { label: string; path: string }
const rootCrumbs: readonly Crumb[] = [
  { label: 'Chorono', path: '/' },
  { label: 'Animation library', path: ANIMATION_LIBRARY_PATH },
]

export function LibraryBreadcrumb({ items = rootCrumbs }: { items?: readonly Crumb[] }) {
  return <nav className="al-breadcrumb" aria-label="Breadcrumb"><ol>
    {items.map(({ label, path }, index) => <li key={path}>
      {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
      {index === items.length - 1 ? <span aria-current="page">{label}</span> : <Link href={path}>{label}</Link>}
    </li>)}
  </ol></nav>
}

export function libraryProjectCrumbs(project: ShowcaseProject): Crumb[] {
  return [...rootCrumbs,
    { label: showcaseCategoryNames[project.category], path: showcaseCollectionHref(project.category) },
    { label: project.title, path: showcaseProjectHref(project) },
  ]
}

export function LibrarySchema({ items, collection }: { items: readonly Crumb[]; collection?: { description: string; links: readonly Crumb[] } }) {
  const last = items[items.length - 1]
  const url = new URL(last.path, SITE_URL).href
  const breadcrumb = {
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: items.map(({ label, path }, index) => ({ '@type': 'ListItem', position: index + 1, name: label, item: new URL(path, SITE_URL).href })),
  }
  const graph = collection ? [breadcrumb, {
    '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: last.label, description: collection.description, breadcrumb: { '@id': breadcrumb['@id'] },
    mainEntity: { '@type': 'ItemList', itemListElement: collection.links.map(({ label, path }, index) => ({ '@type': 'ListItem', position: index + 1, name: label, url: new URL(path, SITE_URL).href })) },
  }] : [breadcrumb]
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

function CollectionsNav({ current }: { current?: string }) {
  return <nav className="al-collections-nav" aria-label="Animation library collections">
    <Link href={ANIMATION_LIBRARY_PATH} aria-current={current ? undefined : 'page'}>Overview</Link>
    {showcaseCollections.map(collection => <Link key={collection.slug} href={showcaseCollectionHref(collection.slug)} aria-current={current === collection.slug ? 'page' : undefined}>{collection.name}</Link>)}
  </nav>
}

export function ComingSoon() {
  return <span className="al-availability">Coming soon</span>
}

function ProjectGrid({ projects, label, heading: Heading = 'h2' }: { projects: readonly ShowcaseProject[]; label: string; heading?: 'h2' | 'h3' }) {
  return <ul className="al-project-grid" aria-label={label}>
    {projects.map(project => <li key={showcaseProjectHref(project)}><Link className="al-gallery-card" href={showcaseProjectHref(project)}>
      <div className="al-cover" data-transparent={project.slug === 'interactive-motion-crew' || undefined}><Image src={project.cover.src} alt="" fill sizes="(max-width: 560px) 90vw, (max-width: 860px) 46vw, 32vw" /></div>
      <div className="al-gallery-card-copy">
        <div className="al-format-row"><small>{project.format}</small>{(project.kind === 'concept' || project.kind === 'storyboard') && <ComingSoon />}</div>
        <Heading>{project.title}</Heading><p>{project.description}</p>
        <span className="al-card-link">{project.kind === 'concept' ? 'View concept' : project.kind === 'storyboard' ? 'View storyboard' : 'Open project'} <ArrowUpRight size={17} aria-hidden="true" /></span>
      </div>
    </Link></li>)}
  </ul>
}

const libraryDescription = 'Watch editable motion graphics, try interactive web and 2D game examples, and explore storyboards, render studies and 2D/3D compositing concepts.'
export { libraryDescription }

export function LibraryShowcase() {
  const featured = showcaseProjects.find(project => project.slug === 'small-wins') ?? showcaseProjects[0]
  return <main className="al-gallery">
    <LibrarySchema items={rootCrumbs} collection={{ description: libraryDescription, links: showcaseCollections.map(collection => ({ label: collection.name, path: showcaseCollectionHref(collection.slug) })) }} />
    <LibraryBreadcrumb />
    <header className="al-gallery-hero">
      <div className="al-gallery-hero-copy">
        <h1>Animation examples</h1>
        <p>Watch motion graphics, try playable scenes and inspect render studies. Download editable Chorono projects or copy a prompt for your next animation.</p>
        <a className="al-button" href="#collections">Browse collections <ArrowDown size={17} aria-hidden="true" /></a>
      </div>
      <Link href={showcaseProjectHref(featured)} className="al-featured-project">
        <div className="al-cover"><Image src={featured.cover.src} alt={featured.cover.alt} fill priority sizes="(max-width: 760px) 90vw, 55vw" /></div>
        <div><span>{featured.format}</span><strong>{featured.title}</strong><ArrowUpRight size={20} aria-hidden="true" /></div>
      </Link>
    </header>
    <section className="al-gallery-section" aria-labelledby="editable-examples-title">
      <h2 id="editable-examples-title">Editable animation examples</h2>
      <ProjectGrid projects={showcaseProjects.filter(project => project !== featured && (project.kind === 'native' || project.kind === 'skill'))} label="Editable Chorono examples" heading="h3" />
    </section>
    <section id="collections" className="al-gallery-section" aria-labelledby="collections-title">
      <h2 id="collections-title">Browse by format</h2>
      <div className="al-category-grid">{showcaseCategories.map(collection => <Link key={collection.slug} className="al-gallery-card" href={showcaseCollectionHref(collection.slug)}>
        <div className="al-cover"><Image src={collection.cover.src} alt="" fill sizes="(max-width: 560px) 90vw, (max-width: 860px) 46vw, 32vw" /></div>
        <div className="al-gallery-card-copy">
          {collection.upcoming && <ComingSoon />}
          <h3>{collection.name}</h3><p>{collection.description}</p>
          <span className="al-card-link">{collection.projects.length} {collection.projects.length === 1 ? 'example' : 'examples'} <ArrowUpRight size={17} aria-hidden="true" /></span>
        </div>
      </Link>)}</div>
    </section>
    <section className="al-gallery-section" aria-labelledby="resources-title">
      <h2 id="resources-title">Skills and render showcase</h2>
      <div className="al-resource-grid">{showcaseResourceCollections.map(collection => <Link key={collection.slug} className="al-resource-card" href={showcaseCollectionHref(collection.slug)}>
        {collection.upcoming && <div className="al-resource-image"><Image src={collection.cover.src} alt="" fill sizes="128px" /></div>}
        <div className="al-resource-copy">{collection.upcoming && <ComingSoon />}<h3>{collection.name}</h3><p>{collection.description}</p></div><ArrowUpRight size={20} aria-hidden="true" />
      </Link>)}</div>
    </section>
    <p className="al-library-context">Create your own scene with <Link href="/agent-skills">Chorono Agent Skills</Link> or follow the <Link href="/docs">Chorono docs</Link>.</p>
  </main>
}

function PromptProjectGroups({ projects }: { projects: readonly ShowcaseProject[] }) {
  const remaining = projects.filter(project => project.kind !== 'skill')
  const groups = Object.entries(skillExampleFamilies)
    .map(([id, title]) => ({ id, title, projects: projects.filter(project => project.kind === 'skill' && project.example.family === id) }))
    .filter(group => group.projects.length > 0)
  if (groups.length === 0) return <ProjectGrid projects={projects} label="Collection examples" />

  return <>
    <nav className="al-collections-nav" aria-label="Animation example categories">
      {groups.map(group => <a key={group.id} href={`#examples-${group.id}`}>{group.title}</a>)}
    </nav>
    {groups.map(group => <section key={group.id} id={`examples-${group.id}`} className="al-gallery-section" aria-labelledby={`heading-${group.id}`}>
      <h2 id={`heading-${group.id}`}>{group.title}</h2>
      <ProjectGrid projects={group.projects} label={group.title} heading="h3" />
    </section>)}
    {remaining.length > 0 && <section className="al-gallery-section" aria-labelledby="more-library-examples">
      <h2 id="more-library-examples">More examples</h2>
      <ProjectGrid projects={remaining} label="More examples" heading="h3" />
    </section>}
  </>
}

export function LibraryCollection({ collection }: { collection: NonNullable<ReturnType<typeof findShowcaseCollection>> }) {
  const path = showcaseCollectionHref(collection.slug)
  const crumbs = [...rootCrumbs, { label: collection.name, path }]
  const render = path === ANIMATION_RENDER_PATH
  return <main className="al-gallery">
    <LibrarySchema items={crumbs} collection={{ description: collection.description, links: collection.projects.map(project => ({ label: project.title, path: showcaseProjectHref(project) })) }} />
    <LibraryBreadcrumb items={crumbs} />
    <header className="al-gallery-lead"><h1>{collection.title}</h1><p>{collection.description}</p>
      {collection.upcoming && <div className="al-upcoming-note"><ComingSoon /><span>{collection.upcoming}</span></div>}
    </header>
    <CollectionsNav current={collection.slug} />
    {render ? <>
      <div className="al-render-groups">{upcomingRenderStyles.map((style, index) => <section key={style} aria-labelledby={`al-render-style-${index}`}>
        <h2 id={`al-render-style-${index}`}>{style}</h2>
        <ProjectGrid projects={collection.projects.filter(project => project.kind === 'concept' && project.format === style)} label={`${style} concepts`} heading="h3" />
      </section>)}</div>
      <section className="al-gallery-section" aria-labelledby="al-render-gallery"><h2 id="al-render-gallery">Concept gallery and showcase film</h2>
        <ProjectGrid projects={collection.projects.filter(project => project.kind !== 'concept')} label="Render concepts and showcase film" heading="h3" />
      </section>
    </> : <PromptProjectGroups projects={collection.projects} />}
    {path === ANIMATION_SKILLS_PATH && <p className="al-library-context"><Link href="/agent-skills">Connect Codex or Claude Code to Chorono</Link> or <Link href="/blog/animation-prompts-for-claude-and-codex">try the six guided animation exercises</Link>.</p>}
    {path === ANIMATION_RENDER_PATH && <p className="al-library-context"><Link href="/docs/export">Read the editor export docs</Link> for available formats and workflows.</p>}
  </main>
}
