'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { trackRenderResearch } from '@/lib/analytics'
import { renderPath, renderTopic, type RenderTopic } from '@/lib/render-guides'
import styles from './render-research.module.css'

const views = [
  { id: 'arrival', label: 'Arrival', image: '/chorono-render/courtyard-arrival.jpg', alt: 'Limestone pavilion with oak screens and olive trees viewed from the approach.', caption: 'See how the entrance connects the approach to the terrace.' },
  { id: 'living-room', label: 'Living room', image: '/chorono-render/courtyard-living.jpg', alt: 'Pavilion living room with a linen sofa, low round table and oak wall detailing.', caption: 'Compare the stone floor and oak finish from seated eye level.' },
  { id: 'terrace', label: 'Terrace', image: '/chorono-render/courtyard-terrace.jpg', alt: 'Terrace bench and timber screen along the front of the limestone pavilion.', caption: 'Look along the facade to see where the timber screen creates privacy.' },
] as const

const useCases = [
  { id: 'client-review', label: 'Architectural design review' },
  { id: 'property-launch', label: 'Off-plan property tour' },
  { id: 'showroom', label: 'Interactive showroom' },
  { id: 'hosting', label: 'Hosting a 3D application' },
] as const

type ViewId = (typeof views)[number]['id']
type UseCase = (typeof useCases)[number]['id']

function topicFromLocation() {
  return renderTopic(new URLSearchParams(window.location.search).get('from'))
}

export function PreviewLink({ topic }: { topic: RenderTopic }) {
  const href = topic === 'overview' ? '#walkthrough' : renderPath + '?from=' + topic + '#walkthrough'
  return <Link className={styles.primary} href={href} onClick={() => trackRenderResearch('preview_open', topic)}>
    Try the walkthrough <ArrowDown size={17} aria-hidden="true" />
  </Link>
}

export function GuideLink({ topic, href, children }: { topic: RenderTopic; href: string; children: string }) {
  return <Link href={href} onClick={() => trackRenderResearch('guide_open', topic)}>
    {children} <ArrowUpRight size={17} aria-hidden="true" />
  </Link>
}

export function Walkthrough() {
  const [view, setView] = useState<(typeof views)[number]>(views[0])
  const [visited, setVisited] = useState<ReadonlySet<ViewId>>(() => new Set(['arrival']))

  function choose(next: (typeof views)[number]) {
    if (view.id === next.id) return
    setView(next)
    if (visited.has(next.id)) return
    const nextVisited = new Set(visited).add(next.id)
    setVisited(nextVisited)
    const topic = topicFromLocation()
    trackRenderResearch('preview_view_selected', topic, next.id)
    if (nextVisited.size === views.length) trackRenderResearch('preview_explored', topic)
  }

  return <section className={styles.walkthrough} id="walkthrough" aria-labelledby="walkthrough-title" tabIndex={-1}>
    <div className={styles.walkthroughHead}>
      <div>
        <h2 id="walkthrough-title">Walk through the courtyard pavilion</h2>
        <p>Explore three camera stops rendered in Chorono Render.</p>
      </div>
      <span className={styles.statusLabel}>Rendered preview</span>
    </div>
    <div className={styles.viewButtons} role="group" aria-label="Camera views">
      {views.map(item => <button type="button" key={item.id} aria-pressed={view.id === item.id} onClick={() => choose(item)}>{item.label}</button>)}
    </div>
    <figure>
      <div className={styles.frame}>
        <Image key={view.id} src={view.image} alt={view.alt} width={1008} height={672} sizes="(max-width: 768px) 100vw, 1050px" />
      </div>
      <figcaption className={styles.caption} aria-live="polite"><strong>{view.label}</strong><span>{view.caption}</span></figcaption>
    </figure>
  </section>
}

export function PilotInterest() {
  const [choice, setChoice] = useState<UseCase>()
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!choice || submitted) return
    setSubmitted(true)
    trackRenderResearch('pilot_interest', topicFromLocation(), choice)
  }

  return <section className={styles.interest} id="pilot" aria-labelledby="pilot-title">
    <div>
      <h2 id="pilot-title">Which project would you publish?</h2>
      <p>Chorono Cloud is in research. Your choice helps us decide what to try in a pilot.</p>
      <p className={styles.formNote}>This question collects your choice only.</p>
    </div>
    <form onSubmit={submit}>
      <fieldset disabled={submitted}>
        <legend>Pick one workflow</legend>
        {useCases.map(item => <label key={item.id}>
          <input type="radio" name="use-case" value={item.id} checked={choice === item.id} required onChange={() => setChoice(item.id)} />
          {item.label}
        </label>)}
      </fieldset>
      {submitted
        ? <p role="status" className={styles.thanks}>Your choice: {useCases.find(item => item.id === choice)?.label}. Thanks for your input.</p>
        : <button type="submit" className={styles.primary} disabled={!choice}>Share my interest</button>}
    </form>
  </section>
}
