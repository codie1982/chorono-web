/** One reviewed, real editor capture. Dimensions are intrinsic image pixels, not display size.
 * source resolves Markdown in GitHub; href resolves the same bytes from the website public directory.
 */
export interface DocumentationScreenshot {
  readonly source: string
  readonly href: string
  readonly width: number
  readonly height: number
}

/** Legacy captures use the downloadable examples (9 November 2026). New v1 panel captures
 * import real production components into the isolated React/history host (11 November 2026).
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

  { source: 'public/docs/screenshots/array-radial-v1.jpg', href: '/docs/screenshots/array-radial-v1.jpg', width: 420, height: 688 },
  { source: 'public/docs/screenshots/assets-panel-v1.jpg', href: '/docs/screenshots/assets-panel-v1.jpg', width: 500, height: 380 },
  { source: 'public/docs/screenshots/bindings-v1.jpg', href: '/docs/screenshots/bindings-v1.jpg', width: 500, height: 600 },
  { source: 'public/docs/screenshots/canvas-v1.jpg', href: '/docs/screenshots/canvas-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/clone-dialog-v1.jpg', href: '/docs/screenshots/clone-dialog-v1.jpg', width: 380, height: 442 },
  { source: 'public/docs/screenshots/composition-v1.jpg', href: '/docs/screenshots/composition-v1.jpg', width: 672, height: 544 },
  { source: 'public/docs/screenshots/curve-editor-v1.jpg', href: '/docs/screenshots/curve-editor-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/curve-modifiers-v1.jpg', href: '/docs/screenshots/curve-modifiers-v1.jpg', width: 500, height: 530 },
  { source: 'public/docs/screenshots/dope-sheet-v1.jpg', href: '/docs/screenshots/dope-sheet-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/drawing-tools-v1.jpg', href: '/docs/screenshots/drawing-tools-v1.jpg', width: 1120, height: 70 },
  { source: 'public/docs/screenshots/events-v1.jpg', href: '/docs/screenshots/events-v1.jpg', width: 500, height: 500 },
  { source: 'public/docs/screenshots/export-image-v1.jpg', href: '/docs/screenshots/export-image-v1.jpg', width: 448, height: 326 },
  { source: 'public/docs/screenshots/export-sequence-v1.jpg', href: '/docs/screenshots/export-sequence-v1.jpg', width: 448, height: 328 },
  { source: 'public/docs/screenshots/export-svg-v1.jpg', href: '/docs/screenshots/export-svg-v1.jpg', width: 384, height: 246 },
  { source: 'public/docs/screenshots/keyboard-shortcuts-v1.jpg', href: '/docs/screenshots/keyboard-shortcuts-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/keyframe-inspector-v1.jpg', href: '/docs/screenshots/keyframe-inspector-v1.jpg', width: 500, height: 420 },
  { source: 'public/docs/screenshots/keyframe-spreadsheet-v1.jpg', href: '/docs/screenshots/keyframe-spreadsheet-v1.jpg', width: 1120, height: 80 },
  { source: 'public/docs/screenshots/layers-basic-shapes-v1.jpg', href: '/docs/screenshots/layers-basic-shapes-v1.jpg', width: 500, height: 600 },
  { source: 'public/docs/screenshots/layers-media-v1.jpg', href: '/docs/screenshots/layers-media-v1.jpg', width: 500, height: 280 },
  { source: 'public/docs/screenshots/layers-particles-v1.jpg', href: '/docs/screenshots/layers-particles-v1.jpg', width: 500, height: 240 },
  { source: 'public/docs/screenshots/layers-path-vector-v1.jpg', href: '/docs/screenshots/layers-path-vector-v1.jpg', width: 500, height: 310 },
  { source: 'public/docs/screenshots/layers-spline-objects-v1.jpg', href: '/docs/screenshots/layers-spline-objects-v1.jpg', width: 500, height: 360 },
  { source: 'public/docs/screenshots/layers-text-v1.jpg', href: '/docs/screenshots/layers-text-v1.jpg', width: 500, height: 280 },
  { source: 'public/docs/screenshots/motion-keys-v1.jpg', href: '/docs/screenshots/motion-keys-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/parameters-v1.jpg', href: '/docs/screenshots/parameters-v1.jpg', width: 500, height: 360 },
  { source: 'public/docs/screenshots/particle-emitter-v1.jpg', href: '/docs/screenshots/particle-emitter-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/properties-appearance-v1.jpg', href: '/docs/screenshots/properties-appearance-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/properties-effects-v1.jpg', href: '/docs/screenshots/properties-effects-v1.jpg', width: 500, height: 470 },
  { source: 'public/docs/screenshots/properties-interact-v1.jpg', href: '/docs/screenshots/properties-interact-v1.jpg', width: 500, height: 510 },
  { source: 'public/docs/screenshots/properties-masks-v1.jpg', href: '/docs/screenshots/properties-masks-v1.jpg', width: 500, height: 440 },
  { source: 'public/docs/screenshots/properties-motion-v1.jpg', href: '/docs/screenshots/properties-motion-v1.jpg', width: 500, height: 550 },
  { source: 'public/docs/screenshots/properties-transform-v1.jpg', href: '/docs/screenshots/properties-transform-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/resources-cpu-v1.jpg', href: '/docs/screenshots/resources-cpu-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/resources-interaction-v1.jpg', href: '/docs/screenshots/resources-interaction-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/resources-media-v1.jpg', href: '/docs/screenshots/resources-media-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/resources-overview-v1.jpg', href: '/docs/screenshots/resources-overview-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/resources-surfaces-v1.jpg', href: '/docs/screenshots/resources-surfaces-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/runtime-preview-v1.jpg', href: '/docs/screenshots/runtime-preview-v1.jpg', width: 500, height: 620 },
  { source: 'public/docs/screenshots/scene-explorer-v1.jpg', href: '/docs/screenshots/scene-explorer-v1.jpg', width: 500, height: 500 },
  { source: 'public/docs/screenshots/selection-panel-v1.jpg', href: '/docs/screenshots/selection-panel-v1.jpg', width: 500, height: 500 },
  { source: 'public/docs/screenshots/snap-settings-v1.jpg', href: '/docs/screenshots/snap-settings-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/spline-editor-v1.jpg', href: '/docs/screenshots/spline-editor-v1.jpg', width: 500, height: 240 },
  { source: 'public/docs/screenshots/state-machine-v1.jpg', href: '/docs/screenshots/state-machine-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/text-properties-v1.jpg', href: '/docs/screenshots/text-properties-v1.jpg', width: 500, height: 680 },
  { source: 'public/docs/screenshots/timeline-ghost-v1.jpg', href: '/docs/screenshots/timeline-ghost-v1.jpg', width: 1120, height: 430 },
  { source: 'public/docs/screenshots/timeline-segments-v1.jpg', href: '/docs/screenshots/timeline-segments-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/timeline-v1.jpg', href: '/docs/screenshots/timeline-v1.jpg', width: 1120, height: 580 },
  { source: 'public/docs/screenshots/wires-v1.jpg', href: '/docs/screenshots/wires-v1.jpg', width: 820, height: 542 },
]

/** Finds exact reviewed repository paths or public URLs; never reads arbitrary paths or remote assets. */
export function findDocumentationScreenshot(reference: string): DocumentationScreenshot | undefined {
  return documentationScreenshots.find(image => image.source === reference || image.href === reference)
}
