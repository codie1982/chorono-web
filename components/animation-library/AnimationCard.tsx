import Link from "next/link";
import { animationHref } from "@/lib/animation-library/catalog";
import type { LoadedAnimation } from "@/lib/animation-library/loader";
import ScenePreview from "@/components/player/ScenePreview";

/** A real native preview and crawlable detail link; playback never starts automatically. */
export function AnimationCard({ animation }: { animation: LoadedAnimation }) {
  const { entry, stats } = animation;
  return (
    <article className="al-card">
      {entry.preview.kind === 'example' ? <ScenePreview
        exampleId={entry.preview.exampleId}
        title={entry.title}
        initialTimeMs={entry.initialTimeMs}
      /> : <Link href={animationHref(entry.slug)} className="al-static-preview"><img src={entry.preview.poster} alt={entry.preview.alt} width={1200} height={800} loading="lazy" /><span>Try the interactive scene <span aria-hidden="true">↗</span></span></Link>}
      <div className="al-card-body">
        <span className="cd-eyebrow">{entry.category}</span>
        <h2>
          <Link href={animationHref(entry.slug)}>
            {entry.title}
            <span aria-hidden="true">↗</span>
          </Link>
        </h2>
        <p>{entry.description}</p>
        <div className="al-card-meta">
          <span>{stats.durationMs / 1000}s</span>
          <span>{stats.layers} layers</span>
          <span>{stats.states ? 'Interactive' : stats.loop ? "Loops" : "Plays once"}</span>
          <span>MIT license</span>
        </div>
      </div>
    </article>
  );
}
