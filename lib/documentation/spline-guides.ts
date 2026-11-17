import type { DocumentationPage } from './manifest'

/** Keep verified spline workflows and the noindex release preview in one manifest helper. */
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
    label: 'Spline modeling preview',
    title: 'Spline modeling tools: release preview',
    description: 'Preview planned Boolean, topology, snap, Offset, Chamfer and Fillet workflows before their release.',
    availability: 'coming-soon',
    parentSlug: 'editor/canvas',
    section: 'editor',
    group: 'Workspace',
  },
  {
    slug: 'scripting/splines',
    source: 'docs/en/spline-scripting.md',
    label: 'Spline scripting',
    title: 'Script editable spline geometry',
    description: 'Create contours, edit Bézier points and split segments with Chorono JavaScript scene scripting.',
    parentSlug: 'scripting',
    section: 'ai',
    group: 'AI & scripting',
  },
]
