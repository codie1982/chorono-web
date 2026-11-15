import { SITE_URL } from '@/lib/site';
import { animationHref, type AnimationEntry } from './catalog';

/**
 * Describe a published, watchable video using URLs from the reviewed catalogue.
 * Duration is the source composition length in milliseconds; no video schema is
 * emitted when the first publication date is unknown. This does not claim that
 * the native editor preview and the finished MP4 are frame-identical.
 */
export function animationVideoStructuredData(entry: AnimationEntry, durationMs: number) {
  if (entry.preview.kind !== 'video' || !entry.videoPublishedAt || durationMs <= 0) return null;
  const pageUrl = new URL(animationHref(entry.slug), SITE_URL).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video`,
    name: entry.title,
    description: entry.description,
    thumbnailUrl: new URL(entry.preview.poster, SITE_URL).href,
    uploadDate: entry.videoPublishedAt,
    duration: `PT${durationMs / 1000}S`,
    contentUrl: new URL(entry.preview.src, SITE_URL).href,
    mainEntityOfPage: pageUrl,
  };
}
