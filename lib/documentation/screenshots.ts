/** One reviewed, real editor capture. Dimensions are intrinsic image pixels, not display size.
 * source resolves Markdown in GitHub; href resolves the same bytes from the website public directory.
 */
export interface DocumentationScreenshot {
  readonly source: string
  readonly href: string
  readonly width: number
  readonly height: number
}

/** Captured from a separate local editor on 9 November 2026, using the downloadable examples.
 * Keep this small allowlist, actual image dimensions and capture notes synchronized when replacing files.
 * Screenshots contain UI only; no bridge credentials, active session IDs or external agent accounts.
 */
export const documentationScreenshots: readonly DocumentationScreenshot[] = [
  { source: 'public/docs/screenshots/timeline-panel-v2.jpg', href: '/docs/screenshots/timeline-panel-v2.jpg', width: 1280, height: 489 },
  { source: 'public/docs/screenshots/dope-sheet-panel-v2.jpg', href: '/docs/screenshots/dope-sheet-panel-v2.jpg', width: 1280, height: 489 },
  { source: 'public/docs/screenshots/curve-editor-panel-v2.jpg', href: '/docs/screenshots/curve-editor-panel-v2.jpg', width: 1280, height: 489 },
  { source: 'public/docs/screenshots/keyframe-inspector-v2.jpg', href: '/docs/screenshots/keyframe-inspector-v2.jpg', width: 292, height: 222 },
  { source: 'public/docs/screenshots/keyframe-spreadsheet-v2.jpg', href: '/docs/screenshots/keyframe-spreadsheet-v2.jpg', width: 1280, height: 197 },

  { source: 'public/docs/screenshots/welcome.jpg', href: '/docs/screenshots/welcome.jpg', width: 1280, height: 720 },
  { source: 'public/docs/screenshots/first-animation-editor.jpg', href: '/docs/screenshots/first-animation-editor.jpg', width: 1280, height: 720 },
  { source: 'public/docs/screenshots/loop-timeline-v2.jpg', href: '/docs/screenshots/loop-timeline-v2.jpg', width: 1280, height: 454 },
  { source: 'public/docs/screenshots/mcp-connect-v2.jpg', href: '/docs/screenshots/mcp-connect-v2.jpg', width: 528, height: 306 },
]

/** Finds exact reviewed repository paths or public URLs; never reads arbitrary paths or remote assets. */
export function findDocumentationScreenshot(reference: string): DocumentationScreenshot | undefined {
  return documentationScreenshots.find(image => image.source === reference || image.href === reference)
}
