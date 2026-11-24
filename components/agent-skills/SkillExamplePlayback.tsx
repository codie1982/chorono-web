'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { CopySnippet } from '@/components/tutorial/CopySnippet'
import { skillExampleMedia, type SkillExample } from '@/lib/agent-skills/catalog'
import styles from './skill-catalog.module.css'

type ExamplePlayback = Pick<SkillExample, 'title' | 'slug' | 'width' | 'height' | 'durationSeconds' | 'frameRate' | 'prompt' | 'portrait' | 'englishCaptions'>

const formats = [
  ['landscape', '16:9 Landscape'],
  ['portrait', '9:16 Portrait'],
] as const

/** Switch the preview and its matching source files within the same watch page. */
export function SkillExamplePlayback({ example }: { example: ExamplePlayback }) {
  const [format, setFormat] = useState<(typeof formats)[number][0]>('landscape')
  const portrait = format === 'portrait' ? example.portrait : undefined
  const composition = portrait ?? example
  const media = skillExampleMedia(example.slug, portrait ? 'portrait' : 'landscape')

  return <div className={styles.detail}>
    <div>
      {example.portrait && <div className={styles.formats} role="group" aria-label="Video format">
        {formats.map(([id, label]) => <button key={id} type="button" aria-pressed={format === id} onClick={() => setFormat(id)}>{label}</button>)}
      </div>}
      <div className={styles.playback} data-portrait={composition.height > composition.width || undefined}>
        <figure className={styles.player}>
          <video key={media.video} controls playsInline preload="none" poster={media.poster} width={composition.width} height={composition.height}
            aria-label={`${example.title}${portrait ? ' portrait' : ''} animation`}>
            <source src={media.video} type="video/mp4" />
            {composition.englishCaptions && <track kind="captions" srcLang="en" label="English" src={media.captions} />}
            <a href={media.video}>Open the MP4 preview</a>
          </video>
          <figcaption className={styles.videoCaption}>
            <span>{example.durationSeconds}s</span>
            <span>{composition.width} × {composition.height}</span>
            <span>{example.frameRate} fps</span>
          </figcaption>
        </figure>
        <a className={`${styles.action} ${styles.download}`} href={media.project} download={media.fileName}>
          <Download size={17} aria-hidden="true" /> Download Chorono project
        </a>
      </div>
    </div>
    <section className={styles.prompt} aria-labelledby="skill-prompt-title">
      <h2 id="skill-prompt-title">Build this animation</h2>
      <p>Paste the prompt into your connected agent.</p>
      <CopySnippet key={media.project} label="prompt" text={composition.prompt} snippetId={`animation-prompt-${example.slug}${portrait ? '-portrait' : ''}`} prompt />
    </section>
  </div>
}
