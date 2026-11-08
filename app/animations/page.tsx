import { pageMetadata } from '@/lib/site'
import Link from "next/link";
import { animationEntries } from "@/lib/animation-library/catalog";
import { loadAnimation } from "@/lib/animation-library/loader";
import { AnimationCard } from "@/components/animation-library/AnimationCard";
import { contentPublicationMetadata } from "@/lib/site-index/publication";

export const metadata = {
  ...pageMetadata('Editable animation examples | Chorono', 'Preview and download editable Chorono animations, then follow the linked guides to make them yours.', '/animations'),
  ...contentPublicationMetadata('/animations'),
}

/** Render the small curated collection from real downloadable projects. */
export default async function AnimationLibraryPage() {
  const animations = await Promise.all(
    animationEntries.map((entry) => loadAnimation(entry.slug)),
  );
  return (
    <main id="docs-main" className="al-index" tabIndex={-1}>
      <nav className="cd-breadcrumb" aria-label="Breadcrumb">
        <Link href="/docs">Chorono</Link>
        <span>/</span>
        <span>Animation library</span>
      </nav>
      <header className="al-library-heading">
        <span className="cd-eyebrow">A STARTING POINT FOR YOUR NEXT IDEA</span>
        <h1>
          Made to move.
          <br />
          <span>Yours to make.</span>
        </h1>
        <p>
          A small collection of editable animations. Play a scene, explore its
          layers and take the source with you.
        </p>
        <div className="al-collection-meta">
          <span>{animations.length} editable scenes</span>
          <span>Free & open source</span>
          <span>Native Chorono projects</span>
        </div>
      </header>
      <section aria-labelledby="al-collection-title">
        <div className="al-section-heading">
          <h2 id="al-collection-title">The collection</h2>
          <span>Every scene is a starting point.</span>
        </div>
        <div className="al-card-grid">
          {animations.map(
            (animation) =>
              animation && (
                <AnimationCard
                  key={animation.entry.slug}
                  animation={animation}
                />
              ),
          )}
        </div>
      </section>
      <aside className="al-get-started">
        <div>
          <span className="cd-eyebrow">NEW TO CHORONO?</span>
          <h2>Your first edit starts here.</h2>
          <p>
            Install the local editor, open a project and keep every layer
            editable.
          </p>
        </div>
        <Link className="al-button" href="/docs/installation">
          Install Chorono <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </main>
  );
}
