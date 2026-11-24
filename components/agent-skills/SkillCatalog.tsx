import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import {
  SKILL_CATALOG_DESCRIPTION, SKILL_CATALOG_TITLE, skillBreadcrumbs, skillCatalogRoutes,
  skillExampleMedia, skillExamples, type SkillCatalogSurface, type SkillExample,
} from '@/lib/agent-skills/catalog'
import { skillCatalogStructuredData } from '@/lib/agent-skills/seo'
import { SkillExampleList } from './SkillExampleList'
import { SkillExamplePlayback } from './SkillExamplePlayback'
import { SkillInteractiveDemo } from './SkillInteractiveDemo'
import styles from './skill-catalog.module.css'

function Breadcrumbs({ example, surface }: { example?: SkillExample; surface: SkillCatalogSurface }) {
  const items = skillBreadcrumbs(example, surface)
  return <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>
    {items.map(({ label, path }, index) => <li key={path}>
      {index > 0 && <ChevronRight size={13} aria-hidden="true" />}
      {index === items.length - 1 ? <span aria-current="page">{label}</span> : <Link href={path}>{label}</Link>}
    </li>)}
  </ol></nav>
}

function Lead({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className={styles.lead}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h1>{title}</h1>
    <p>{text}</p>
  </header>
}

/** Only public routes describe themselves as the canonical page. */
function CatalogSchema({ example }: { example: SkillExample }) {
  const json = JSON.stringify(skillCatalogStructuredData(example)).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function SkillCatalogPreview() {
  const routes = skillCatalogRoutes.preview
  const cards = skillExamples.map(({ slug, title, category, description, posterAlt, durationSeconds, width, height }) => ({
    slug, title, category, description, posterAlt, durationSeconds, width, height,
  }))
  return <div className={styles.page} data-surface="preview">
    <Breadcrumbs surface="preview" />
    <Lead eyebrow="Agent skills" title={SKILL_CATALOG_TITLE} text={SKILL_CATALOG_DESCRIPTION} />
    <SkillExampleList examples={cards} collectionPath={routes.collection} />
    <section className={styles.setup} aria-labelledby="skill-setup-title">
      <div><h2 id="skill-setup-title">Make one in Chorono</h2><p>Install the editor and connect Codex or Claude Code through MCP to run a prompt in an editable scene.</p></div>
      <Link className={styles.action} href={routes.setup}>Set up your agent <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </section>
  </div>
}

export function SkillExampleDetail({ example, surface = 'public' }: {
  example: SkillExample
  surface?: SkillCatalogSurface
}) {
  const guide = surface === 'preview' ? example.guide.preview : example.guide
  return <article className={styles.page} data-surface={surface}>
    {surface === 'public' && <CatalogSchema example={example} />}
    <Breadcrumbs example={example} surface={surface} />
    <Lead eyebrow={example.category} title={example.title} text={example.description} />
    <SkillExamplePlayback key={example.slug} example={example} />
    {example.interactiveDemo && <SkillInteractiveDemo kind={example.interactiveDemo} project={skillExampleMedia(example.slug).project}
      poster={skillExampleMedia(example.slug).poster} width={example.width} height={example.height} />}
    <div className={styles.notes}>
      <section aria-labelledby="skill-beats-title">
        <h2 id="skill-beats-title">On the timeline</h2>
        <ol className={styles.beats}>{example.beats.map(beat => <li key={beat.time}>
          <span>{beat.time}</span><div><h3>{beat.label}</h3><p>{beat.detail}</p></div>
        </li>)}</ol>
      </section>
      <section className={styles.revision} aria-labelledby="skill-revision-title">
        <h2 id="skill-revision-title">Make a revision</h2>
        <p>{example.revision}</p>
        {guide && <Link href={guide.href}>{guide.label} <ArrowUpRight size={16} aria-hidden="true" /></Link>}
        <Link href={skillCatalogRoutes[surface].install}>Install the Chorono agent skills <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  </article>
}
