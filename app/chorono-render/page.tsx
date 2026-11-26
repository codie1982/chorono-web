import Image from 'next/image'
import Link from 'next/link'
import { GuideLink, PilotInterest, PreviewLink, Walkthrough } from '@/components/render-research/RenderResearch'
import styles from '@/components/render-research/render-research.module.css'
import { renderCover, renderGuidePath, renderGuides, renderPath } from '@/lib/render-guides'
import { pageMetadata } from '@/lib/site'
import { contentPublicationMetadata } from '@/lib/site-index/publication'

const description = 'Explore three rendered architectural views and learn how to publish a 3D walkthrough, plan an off-plan tour or evaluate pixel streaming hosting.'

export const metadata = {
  ...pageMetadata('Architectural Visualization & Walkthroughs | Chorono Render', description, renderPath, renderCover),
  ...contentPublicationMetadata(renderPath),
}

export default function RenderResearchPage() {
  return <main className={styles.page}>
    <div className={styles.wrapper}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>
        <li><Link href="/3d-rendering-software">Chorono Render</Link></li>
        <li aria-current="page">Architecture</li>
      </ol></nav>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>Architectural visualization</p>
          <h1>Show clients how a space fits together</h1>
          <p className={styles.lead}>Explore an architectural scene from three viewpoints. Then choose how to deliver a 3D walkthrough, property tour or streamed application on your website.</p>
          <div className={styles.actions}><PreviewLink topic="overview" /><Link className={styles.textLink} href="#guides">Browse the guides</Link></div>
        </div>
        <figure className={styles.heroImage}>
          <Image src={renderCover.image} alt={renderCover.imageAlt} width={renderCover.imageWidth} height={renderCover.imageHeight} priority sizes="(max-width: 800px) 100vw, 53vw" />
          <figcaption>Courtyard pavilion · Chorono Render scene study</figcaption>
        </figure>
      </header>
      <Walkthrough />
      <section className={styles.guideIndex} id="guides" aria-labelledby="render-guides-title">
        <h2 id="render-guides-title">Guides for your next project</h2>
        <ul>
          {renderGuides.map(guide => <li key={guide.slug}>
            <h3><GuideLink topic={guide.slug} href={renderGuidePath(guide)}>{guide.title}</GuideLink></h3>
            <p>{guide.description}</p>
          </li>)}
        </ul>
      </section>
      <PilotInterest />
    </div>
  </main>
}
