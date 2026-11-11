import Link from 'next/link'
import { DocumentationCategories } from './DocumentationCategories'
import firstAnimationPreview from '@/public/examples/first-animation.png'
import type { DocumentationHeading } from '@/lib/documentation/content'
import {
  DocumentationIcon as Icon,
  type DocumentationIconName,
} from './DocumentationIcon'

/** Curated homepage section IDs, also supplied to its contents rail. */
export const overviewHeadings: readonly DocumentationHeading[] = [
  { id: 'explore-the-docs', text: 'Explore the docs', depth: 2 },
  { id: 'start-here', text: 'Start here', depth: 2 },
  { id: 'learn-the-movement', text: 'Learn the movement', depth: 2 },
  { id: 'create-your-way', text: 'Create your way', depth: 2 },
]

/** A focused entry to real source-backed tasks, with no automatic animation. */
export function DocumentationOverview() {
  const lessons: {
    href: string
    icon: DocumentationIconName
    title: string
    copy: string
    number: string
  }[] = [
    {
      href: '/docs/editor/keyframes',
      icon: 'layers',
      title: 'Keyframes',
      copy: 'Small changes. Carefully timed.',
      number: '01',
    },
    {
      href: '/docs/editor/timeline',
      icon: 'clock',
      title: 'Timeline & playback',
      copy: 'Find the rhythm of your scene.',
      number: '02',
    },
    {
      href: '/docs/animation/loops',
      icon: 'circle',
      title: 'Looping animations',
      copy: 'Make the last frame feel like the first.',
      number: '03',
    },
  ]
  return (
    <div className="cd-overview">
      <section id="explore-the-docs">
        <div className="cd-section-heading"><h2>Explore the docs</h2><span>FROM WORKSPACE TO PLAYBACK</span></div>
        <DocumentationCategories />
      </section>
      <section id="start-here" className="cd-start-section">
        <div className="cd-section-heading">
          <h2>Start here</h2>
          <span>One scene. Endless possibilities.</span>
        </div>
        <Link href="/docs/first-animation" className="cd-featured">
          <div className="cd-featured-copy">
            <span className="cd-eyebrow">YOUR FIRST SCENE</span>
            <h3>
              A little change.
              <br /> Something yours.
            </h3>
            <p>
              Open a real animation. Change the words, play with the colors and
              keep every detail editable.
            </p>
            <span className="cd-featured-link">
              Create your first animation <Icon name="arrow" size={16} />
            </span>
          </div>
          <div className="cd-featured-image">
            <img
              src={firstAnimationPreview.src}
              alt="Editable Chorono title card with three colorful circles"
            />
            <span>
              <span className="cd-status-dot" /> 8 layers · 4 seconds · yours to
              edit
            </span>
          </div>
        </Link>
        <div className="cd-setup-note">
          <span className="cd-setup-icon">
            <Icon name="terminal" size={20} />
          </span>
          <div>
            <strong>A home for your next idea.</strong>
            <p>
              Install the free editor on your computer. Work in your browser.
            </p>
          </div>
          <Link href="/docs/installation">
            Install Chorono <Icon name="arrow" size={15} />
          </Link>
        </div>
      </section>
      <section id="learn-the-movement">
        <div className="cd-section-heading">
          <h2>Learn the movement</h2>
          <span>THE BUILDING BLOCKS</span>
        </div>
        <div className="cd-lesson-grid">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="cd-lesson-card"
            >
              <div>
                <span className="cd-lesson-icon">
                  <Icon name={lesson.icon} size={23} />
                </span>
                <span className="cd-lesson-number">{lesson.number}</span>
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.copy}</p>
              <span className="cd-lesson-arrow">
                <Icon name="arrow" size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section id="create-your-way">
        <div className="cd-section-heading">
          <h2>Create your way</h2>
          <span>YOUR WORKFLOW, YOUR CALL</span>
        </div>
        <div className="cd-workflow-list">
          <Link href="/docs/ai/mcp">
            <span className="cd-workflow-icon">
              <Icon name="spark" size={21} />
            </span>
            <div>
              <h3>Bring your AI agent.</h3>
              <p>
                Connect Claude Code or Codex. Build, inspect and refine
                together.
              </p>
            </div>
            <Icon name="arrow" size={18} />
          </Link>
          <Link href="/docs/scripting">
            <span className="cd-workflow-icon">
              <Icon name="code" size={21} />
            </span>
            <div>
              <h3>Think in JavaScript.</h3>
              <p>Turn a few lines of code into native layers and keyframes.</p>
            </div>
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
      <div className="cd-open-note">
        <Icon name="github" size={18} />
        <p>
          Built in the open. Made to be edited.
          <br />
          <a href="https://github.com/codie1982/chorono-editor">
            Explore the source on GitHub <span>↗</span>
          </a>
        </p>
        <span className="cd-open-license">MIT LICENSE</span>
      </div>
    </div>
  )
}
