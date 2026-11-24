import Link from "next/link";
import type { LoadedAnimation } from "@/lib/animation-library/loader";
import {
  animationEntries,
  animationHref,
} from "@/lib/animation-library/catalog";
import {
  documentationHref,
  findDocumentationPage,
} from "@/lib/documentation/manifest";
import { TableOfContents } from "@/components/documentation/TableOfContents";
import ScenePreview from "@/components/player/ScenePreview";
import InteractiveCrewPreview from './InteractiveCrewPreview';
import ExampleDownload from '@/components/ExampleDownload';
import { LibraryBreadcrumb, LibrarySchema, libraryProjectCrumbs } from './LibraryShowcase';
import { findShowcaseProject } from '@/lib/animation-library/showcase';
import { VideoPreview } from './VideoPreview';
import { animationVideoStructuredData } from '@/lib/animation-library/seo';

/** Present one distinct asset with verified stats and a complete download/edit handoff. */
export function AnimationDetail({ animation }: { animation: LoadedAnimation }) {
  const { entry, stats, downloads, prompt } = animation;
  const guide = findDocumentationPage(entry.guideSlug)!;
  const related = animationEntries.filter((item) => item.slug !== entry.slug);
  const trackingId = entry.preview.kind === 'example'
    ? entry.preview.exampleId
    : entry.preview.kind === 'motion-crew' ? 'motion-crew' : entry.slug;
  const project = findShowcaseProject(entry.libraryCategory, entry.slug);
  const crumbs = project ? libraryProjectCrumbs(project) : undefined;
  const videoStructuredData = animationVideoStructuredData(entry, stats.durationMs);
  const headings = [
    { id: 'about-the-animation', text: 'About this animation', depth: 2 as const },
    ...(entry.breakdown ? [{ id: 'motion-breakdown', text: entry.breakdown.heading, depth: 2 as const }] : []),
    ...(prompt ? [{ id: 'production-prompt', text: 'Production prompt', depth: 2 as const }] : []),
    { id: 'make-it-yours', text: 'Make it yours', depth: 2 as const },
    { id: 'use-and-license', text: 'Use & license', depth: 2 as const },
    { id: 'keep-exploring', text: 'Keep exploring', depth: 2 as const },
  ];
  return (
    <div className="cd-content-grid al-detail">
      {videoStructuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData).replace(/</g, '\\u003c') }} />}
      <main id="docs-main" className="cd-main" tabIndex={-1}>
        {crumbs && <LibrarySchema items={crumbs} />}
        <LibraryBreadcrumb items={crumbs} />
        <header className="al-detail-heading">
          <span className="cd-eyebrow">
            {entry.category} · EDITABLE ANIMATION
          </span>
          <h1>{entry.title}</h1>
          <p>{entry.description}</p>
          <div className="al-collection-meta">
            <span>Free to download</span>
            <span>MIT license</span>
            <span>Native project</span>
          </div>
        </header>
        {entry.preview.kind === 'example' ? <ScenePreview
        key={entry.slug}
          exampleId={entry.preview.exampleId}
          title={entry.title}
          initialTimeMs={entry.initialTimeMs}
        /> : entry.preview.kind === 'video' ? <VideoPreview
          src={entry.preview.src}
          poster={entry.preview.poster}
          title={entry.title}
          alt={entry.preview.alt}
        /> : <InteractiveCrewPreview />}
        <div className="al-download-row">
          <ExampleDownload
            exampleId={trackingId}
            className="al-button"
            href={`${animationHref(entry.slug)}/download`}
            download
          >
            Download editable project <span aria-hidden="true">↓</span>
          </ExampleDownload>
          <span>.chorono.json · {(stats.bytes / 1024).toFixed(1)} KB</span>
        </div>
        {downloads.length > 0 && <div className="al-extra-downloads" aria-label="Additional downloads">{downloads.map(asset=><ExampleDownload key={asset.href} exampleId={trackingId} className="al-download-asset" href={asset.href} download={asset.fileName}><span>{asset.label} <span aria-hidden="true">↓</span></span><small>{(asset.bytes/1024).toFixed(1)} KB</small></ExampleDownload>)}</div>}
        <dl className="al-specs">
          <div>
            <dt>Composition</dt>
            <dd>
              {stats.width} × {stats.height}
            </dd>
          </div>
          <div>
            <dt>{stats.states ? 'Idle loop' : 'Duration'}</dt>
            <dd>{stats.durationMs / 1000} seconds</dd>
          </div>
          <div>
            <dt>Frame rate</dt>
            <dd>{stats.frameRate} fps</dd>
          </div>
          <div>
            <dt>Layers / tracks</dt>
            <dd>
              {stats.layers} / {stats.tracks}
            </dd>
          </div>
          <div>
            <dt>Keyframes</dt>
            <dd>{stats.keyframes}</dd>
          </div>
          <div>
            <dt>Playback</dt>
            <dd>{stats.states ? `${stats.states} interactive states` : stats.loop ? "Looping" : "Plays once"}</dd>
          </div>
        </dl>
        <div className="cd-prose">
          <section id="about-the-animation">
            <h2>About this animation</h2>
            <p>{entry.about}</p>
            <p>{entry.preview.kind === 'video'
              ? 'The preview is the finished MP4; the editable scene is a separate download. The production prompt refers to a supplied reference video that is not included here.'
              : 'No external image, audio or font files are required. Preview playback uses the native Chorono runtime.'}</p>
          </section>
          {entry.breakdown && <section id="motion-breakdown">
            <h2>{entry.breakdown.heading}</h2>
            <p>{entry.breakdown.introduction}</p>
            <ol className="al-beat-list">
              {entry.breakdown.beats.map((beat) => <li key={beat.time}>
                <span>{beat.time}</span>
                <div><strong>{beat.technique}</strong><p>{beat.detail}</p></div>
              </li>)}
            </ol>
            <p>{entry.breakdown.conclusion}</p>
          </section>}
          {prompt && <section id="production-prompt">
            <h2>Production prompt</h2>
            <p>This consolidated brief includes the final music and end-card revisions. You can read it here or download the text file above.</p>
            <pre className="al-prompt"><code>{prompt}</code></pre>
          </section>}
          <section id="make-it-yours">
            <h2>Make it yours</h2>
            <ol>
              <li>
                <Link href="/docs/installation">Install and start Chorono</Link>{" "}
                on your computer.
              </li>
              <li>
                Download the project above. In the editor, choose{" "}
                <strong>Menu → Open Scene JSON</strong> and select it.
              </li>
              <li>{entry.revision}</li>
              <li>
                Choose <strong>Menu → Save Scene JSON</strong>, then reopen your
                saved file to check the revision.
              </li>
            </ol>
            <Link href={documentationHref(guide.slug)}>
              Follow the guide: {guide.title} →
            </Link>
          </section>
          <section id="use-and-license">
            <h2>Use & license</h2>
            <p>{entry.use}</p>
            <p>
              The project is provided under the{" "}
              <a href="https://github.com/codie1982/chorono-editor/blob/main/LICENSE">
                MIT license
              </a>
              . Keep its copyright and license notice with copies or substantial
              portions. Respect reduced-motion preferences and provide
              accessible status text when embedding canvas content.
            </p>
            <p>
              {entry.preview.kind === 'video'
                ? 'The main download is the editable Chorono project. The finished MP4 and consolidated production prompt are separate downloads. The video uses an additional HTML render pass, so its typography and motion blur may differ from the native editor preview.'
                : downloads.length
                  ? 'The main download is the native project. The ZIP also includes the transparent poster, authoring recipes, license and matching web reference source. The web reference requires an existing React/Next.js application.'
                  : 'This download is the editable source project. Runtime exports and video exports are separate steps; this page provides the native JSON file.'}
            </p>
            <a href={entry.provenanceUrl}>
              {entry.sourceLinkLabel ?? 'View the original example and its source →'}
            </a>
          </section>
        </div>
        <section id="keep-exploring" className="al-explore">
          <span className="cd-eyebrow">KEEP YOUR IDEAS MOVING</span>
          <h2>Keep exploring</h2>
          <div className="al-explore-links">
            <Link href={documentationHref(guide.slug)}>
              <span>EDIT THIS SCENE</span>
              <strong>{guide.title} →</strong>
            </Link>
            {related.map((item) => (
              <Link key={item.slug} href={animationHref(item.slug)}>
                <span>ANOTHER STARTING POINT</span>
                <strong>{item.title} →</strong>
              </Link>
            ))}
            <Link href="/animations">
              <span>THE COLLECTION</span>
              <strong>Browse all animations →</strong>
            </Link>
          </div>
        </section>

      </main>
      <TableOfContents headings={headings} />
    </div>
  );
}
