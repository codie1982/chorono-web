/**
 * Show one reviewed public MP4 and poster with native keyboard-accessible controls.
 * Playback starts only on visitor action and loops at the source's seam.
 * The browser owns media buffering; unsupported browsers receive a direct file link.
 */
export function VideoPreview({
  src,
  poster,
  title,
  alt,
}: {
  src: string;
  poster: string;
  title: string;
  alt: string;
}) {
  return (
    <figure className="al-video-preview">
      <video controls loop playsInline preload="none" poster={poster} aria-label={`${title}. ${alt}`}>
        <source src={src} type="video/mp4" />
        <a href={src}>Download the MP4 preview</a>
      </video>
      <figcaption>Finished video with music. Select play to watch the loop.</figcaption>
    </figure>
  );
}
