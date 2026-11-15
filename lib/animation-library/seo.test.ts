import { describe, expect, it } from 'vitest';
import { animationEntries } from './catalog';
import { animationVideoStructuredData } from './seo';

describe('animation video discovery', () => {
  it('describes the published MP4 and poster on its canonical watch page', () => {
    const showreel = animationEntries.find(entry => entry.slug === 'one-bar-every-beat')!;
    expect(animationVideoStructuredData(showreel, 15000)).toMatchObject({
      '@type': 'VideoObject',
      contentUrl: 'https://www.chorono.com/examples/one-bar-every-beat.mp4',
      thumbnailUrl: 'https://www.chorono.com/examples/one-bar-every-beat.png',
      mainEntityOfPage: 'https://www.chorono.com/animations/one-bar-every-beat',
      duration: 'PT15S',
      uploadDate: '2026-11-15T11:49:21+03:00',
    });
  });

  it('does not invent video metadata for other animation types', () => {
    const loading = animationEntries.find(entry => entry.slug === 'three-dot-loading')!;
    expect(animationVideoStructuredData(loading, 4000)).toBeNull();
  });
});
