'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { skillExampleHref, skillExampleMedia, type SkillExample } from '@/lib/agent-skills/catalog'
import styles from './skill-catalog.module.css'

export type SkillExampleCard = Pick<SkillExample, 'slug' | 'title' | 'category' | 'description' | 'posterAlt' | 'durationSeconds' | 'width' | 'height'>

/** Filter reviewed examples locally without producing additional crawlable URLs. */
export function SkillExampleList({ examples, collectionPath }: {
  examples: readonly SkillExampleCard[]
  collectionPath: string
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const categories = [...new Set(examples.map(example => example.category))].sort()
  const search = query.trim().toLowerCase()
  const visible = examples.filter(example =>
    (!category || example.category === category) &&
    `${example.title} ${example.category} ${example.description}`.toLowerCase().includes(search),
  )

  return <section aria-labelledby="skill-examples-title" className={styles.collection}>
    <div className={styles.collectionHead} data-single={examples.length === 1 || undefined}>
      <h2 id="skill-examples-title" className={examples.length === 1 ? 'sr-only' : undefined}>Explore the examples</h2>
      {examples.length > 1 && <div className={styles.filters}>
        <label><span>Search examples</span><span className={styles.search}><Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} /></span></label>
        {categories.length > 1 && <label><span>Technique</span><select value={category} onChange={event => setCategory(event.target.value)}>
          <option value="">All techniques</option>
          {categories.map(name => <option key={name} value={name}>{name}</option>)}
        </select></label>}
      </div>}
    </div>
    {examples.length > 1 && <p className="sr-only" role="status">{visible.length} {visible.length === 1 ? 'example' : 'examples'} found</p>}
    {visible.length === 0 && <p className={styles.empty}>No examples match these filters.</p>}
    <ul className={styles.cards} data-featured={examples.length === 1 || undefined}>
      {visible.map(example => <li key={example.slug}>
        <Link className={styles.card} href={skillExampleHref(example.slug, collectionPath)}>
          <img src={skillExampleMedia(example.slug).poster} alt={example.posterAlt} width={example.width} height={example.height} loading={examples.length === 1 ? 'eager' : 'lazy'} />
          <div className={styles.cardBody}>
            <p className={styles.meta}>{example.category} <span aria-hidden="true">·</span> {example.durationSeconds}s</p>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <span className={styles.cardAction}>Watch and get the prompt <ArrowUpRight size={18} aria-hidden="true" /></span>
          </div>
        </Link>
      </li>)}
    </ul>
  </section>
}
