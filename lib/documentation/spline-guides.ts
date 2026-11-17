import type { DocumentationPage } from './manifest'

/** Keep the current spline editing, modeling and scripting guides together. */
export const splineGuides: readonly DocumentationPage[] = [
  {
    slug: 'editor/canvas/compound-splines',
    source: 'docs/en/editor-canvas-compound-splines.md',
    label: 'Compound splines',
    title: 'Draw and edit compound Bézier splines',
    description: 'Add contours to one spline layer, continue an open line, and refine editable Bézier points in Chorono.',
    parentSlug: 'editor/canvas',
    section: 'editor',
    group: 'Workspace',
  },
  {
    slug: 'editor/canvas/spline-modeling',
    source: 'docs/en/editor-canvas-spline-modeling.md',
    label: 'Spline modeling',
    title: 'Offset, outline, chamfer and fillet spline contours',
    description: 'Preview and apply Offset, Outline, Chamfer and Fillet to editable spline contours in Chorono.',
    parentSlug: 'editor/canvas',
    section: 'editor',
    group: 'Workspace',
  },
  {
    slug: 'scripting/splines',
    source: 'docs/en/spline-scripting.md',
    label: 'Spline scripting',
    title: 'Script editable spline geometry',
    description: 'Create contours, edit Bézier points and apply Offset, Outline, Chamfer or Fillet with Chorono JavaScript scripting.',
    parentSlug: 'scripting',
    section: 'ai',
    group: 'AI & scripting',
  },
]
