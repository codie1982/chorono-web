import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download } from 'lucide-react'
import GameStudy from '@/components/GameStudy'
import InteractiveAnimationExample from '@/components/InteractiveAnimationExample'
import ScenePreview from '@/components/player/ScenePreview'
import { CopySnippet } from '@/components/tutorial/CopySnippet'
import { samplePrompt, sampleSkill, type Sample } from '@/lib/animation-library/sample-studies'
import { exampleEditorial } from '@/lib/animation-library/example-editorial'
import { ExampleEditorial } from './ExampleEditorial'
import { SITE_URL } from '@/lib/site'
import { ANIMATION_RENDER_PATH, ANIMATION_SKILLS_PATH, showcaseCategoryNames, showcaseCollectionHref } from '@/lib/animation-library/routes'
import { showcaseProjectHref, type ShowcaseFilm, type ShowcaseProject } from '@/lib/animation-library/showcase'
import { ComingSoon, LibraryBreadcrumb, LibrarySchema, libraryProjectCrumbs } from './LibraryShowcase'

function StudyPreview({ sample, cover }: { sample: Sample; cover: ShowcaseProject['cover'] }) {
  switch (sample.category) {
    case 'game': return <GameStudy id={sample.id} image={cover.src} alt={cover.alt} />
    case 'web-components': return <InteractiveAnimationExample exampleId={sample.id} />
    case 'motion': return <ScenePreview exampleId={sample.id} title={sample.title} />
    case 'render': return <figure className="al-study-figure">
      <Image src={sample.image} alt={sample.alt} width={1400} height={900} sizes="(max-width: 760px) 90vw, 750px" />
      <figcaption><span>Concept image</span><a href={sample.image}>Open full-size image <ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
    </figure>
  }
}

function FilmPreview({ film }: { film: ShowcaseFilm }) {
  const editorial = exampleEditorial[film.slug]
  const absolute = (path: string) => new URL(path, SITE_URL).href
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${absolute(showcaseProjectHref(film))}#video`,
    name: editorial ? `${film.title} · ${editorial.topic}` : film.title,
    description: editorial?.description ?? film.description,
    thumbnailUrl: absolute(film.cover.src),
    contentUrl: absolute(film.video),
    uploadDate: film.uploadDate,
    duration: `PT${film.durationSeconds}S`,
  }).replace(/</g, '\\u003c')

  return <figure className="al-study-figure al-study-film">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    <video controls playsInline preload="none" poster={film.cover.src} src={film.video} width={1280} height={720} aria-label={film.title}>
      <a href={film.video}>Open MP4</a>
    </video>
    <figcaption className="al-film-actions">
      <span>{film.durationSeconds} seconds</span>
      <a href={film.projectFile} download={`${film.slug}.chorono.json`}>Download editable Chorono project <Download size={16} aria-hidden="true" /></a>
    </figcaption>
  </figure>
}

export function LibraryProject({ project }: { project: Extract<ShowcaseProject, { kind: 'study' | 'video' | 'film' | 'storyboard' | 'concept' }> }) {
  const editorial = project.kind === 'film' ? exampleEditorial[project.slug] : undefined
  const crumbs = libraryProjectCrumbs(project)
  const back = showcaseCollectionHref(project.category)
  return <main className="al-gallery al-project">
    <LibrarySchema items={crumbs} />
    <LibraryBreadcrumb items={crumbs} />
    <header className="al-gallery-lead">
      <div className="al-format-row"><p className="cd-eyebrow">{editorial ? project.title : project.format}</p>{(project.kind === 'concept' || project.kind === 'storyboard') && <ComingSoon />}</div>
      <h1>{editorial?.topic ?? project.title}</h1><p>{editorial?.description ?? project.description}</p>
      <Link className="al-button al-install" href="/docs/installation">Install Chorono</Link>
    </header>
    {project.kind === 'film' && <>
      <FilmPreview film={project} />
      <ExampleEditorial slug={project.slug} />
    </>}
    {project.kind === 'study' && <div className="al-study-layout">
      <div><StudyPreview sample={project.sample} cover={project.cover} />
        {project.sample.category === 'motion' && <a className="al-button" href={`/examples/${project.sample.id}.chorono.json`} download>Download editable scene <Download size={16} aria-hidden="true" /></a>}
      </div>
      <aside className="al-study-notes">
        <h2>Try this variation</h2><p>{project.sample.task}</p>
        <CopySnippet label="creative prompt" text={samplePrompt(project.sample)} snippetId={`library-${project.slug}`} prompt />
        <a className="al-text-action" href={`data:text/markdown;charset=utf-8,${encodeURIComponent(sampleSkill(project.sample))}`} download="SKILL.md">Download SKILL.md <Download size={16} aria-hidden="true" /></a>
      </aside>
    </div>}
    {project.kind === 'concept' && <div className="al-study-layout">
      <figure className="al-study-figure">
        <Image src={project.cover.src} alt={project.cover.alt} width={1536} height={1024} priority sizes="(max-width: 760px) 90vw, 750px" />
        <figcaption><span>Concept image</span><a href={project.cover.src}>View full-size image <ArrowUpRight size={15} aria-hidden="true" /></a></figcaption>
      </figure>
      <aside className="al-study-notes">
        <h2>{project.category === '2d-3d-compositing' ? 'Planned controls' : 'Planned render study'}</h2>
        <dl className="al-concept-notes">{project.notes.map(note => <div key={note.label}><dt>{note.label}</dt><dd>{note.text}</dd></div>)}</dl>
      </aside>
    </div>}
    {project.kind === 'storyboard' && <section aria-labelledby="storyboard-title" className="al-gallery-section al-storyboard">
      <h2 id="storyboard-title">Storyboard and timing</h2>
      <ol>{project.beats.map(beat => <li key={beat.time}>
        <div className="al-cover"><Image src={beat.image.src} alt={beat.image.alt} fill sizes="(max-width: 560px) 90vw, 50vw" /></div>
        <div><span>{beat.time}</span><h3>{beat.title}</h3><p>{beat.notes}</p></div>
      </li>)}</ol>
      <CopySnippet label="animatic prompt" text={project.prompt} snippetId={`library-${project.slug}`} prompt />
    </section>}
    {project.kind === 'video' && <figure className="al-study-figure al-study-film">
      <video controls playsInline preload="none" poster={project.cover.src} src={project.src} aria-label={project.title} />
      <figcaption>Silent montage of concept frames · 10 seconds</figcaption>
    </figure>}
    <nav className="al-project-links" aria-label="Explore more examples">
      <Link href={back}>Browse {showcaseCategoryNames[project.category]} <ArrowUpRight size={18} aria-hidden="true" /></Link>
      {back !== ANIMATION_RENDER_PATH && (project.kind === 'video' || project.kind === 'study' && project.sample.category === 'render')
        ? <Link href={ANIMATION_RENDER_PATH}>Chorono Render showcase <ArrowUpRight size={18} aria-hidden="true" /></Link>
        : <Link href={ANIMATION_SKILLS_PATH}>Skills & prompts <ArrowUpRight size={18} aria-hidden="true" /></Link>}
    </nav>
  </main>
}
