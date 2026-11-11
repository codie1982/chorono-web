import type { DocumentationPage } from './manifest'

/** Task-focused guides. Explicit parents organize navigation without moving any established URL. */
export const editorGuides: readonly DocumentationPage[] = [
  {
    "slug": "editor/projects",
    "label": "Projects & saving",
    "title": "Set up and save an animation project",
    "description": "Choose a canvas size and frame rate, save an editable scene and keep project versions in Chorono.",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-projects.md"
  },
  {
    "slug": "editor/canvas/tools",
    "label": "Drawing & transform tools",
    "title": "Choose a drawing or transform tool",
    "description": "Use Select, Pan, Pen, Move, Rotate, Scale and Anchor tools without losing track of the active editing mode.",
    "parentSlug": "editor/canvas",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-canvas-tools.md"
  },
  {
    "slug": "editor/canvas/selection",
    "label": "Advanced selection",
    "title": "Select exactly the objects you need",
    "description": "Use box, lasso, circle, paint and rule-based selection to work with several animation layers.",
    "parentSlug": "editor/canvas",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-canvas-selection.md"
  },
  {
    "slug": "editor/canvas/snapping",
    "label": "Guides & snapping",
    "title": "Align objects with guides and snapping",
    "description": "Set grid, object, point, guide, pixel, angle and scale snapping for precise placement in Chorono.",
    "parentSlug": "editor/canvas",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-canvas-snapping.md"
  },
  {
    "slug": "editor/canvas/splines",
    "label": "Bézier points & splines",
    "title": "Edit Bézier points and spline curves",
    "description": "Draw editable paths, adjust points and handles, and extend or close a spline in Chorono.",
    "parentSlug": "editor/canvas",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-canvas-splines.md"
  },
  {
    "slug": "editor/canvas/motion-keys",
    "label": "Motion Keys",
    "title": "Edit animation positions on the canvas",
    "description": "Use Motion Keys to adjust position keys, draw a movement and control how the path is timed.",
    "parentSlug": "editor/canvas",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-canvas-motion-keys.md"
  },
  {
    "slug": "editor/layers/basic-shapes",
    "label": "Basic Shapes",
    "title": "Draw and edit basic shapes",
    "description": "Create rectangles, circles, polygons and procedural shapes, then adjust their geometry in Properties.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-basic-shapes.md"
  },
  {
    "slug": "editor/layers/paths",
    "label": "Path & Vector",
    "title": "Create vector paths and animated strokes",
    "description": "Choose Path Stroke, Bézier Path, SVG Import or Motion Path for the kind of vector work you need.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-paths.md"
  },
  {
    "slug": "editor/layers/text",
    "label": "Text",
    "title": "Create and style an animated text layer",
    "description": "Edit text, typography, fill, stroke and shadow, then animate the layer with Chorono keyframes.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-text.md"
  },
  {
    "slug": "editor/layers/media",
    "label": "Image, video & audio",
    "title": "Add image, video and audio layers",
    "description": "Place media in a scene and adjust fitting, playback and audio controls for the selected layer.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-media.md"
  },
  {
    "slug": "editor/layers/spline-objects",
    "label": "Spline Objects",
    "title": "Start a spline from a familiar shape",
    "description": "Create editable circle, rectangle, arc and other spline primitives before refining their points.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-spline-objects.md"
  },
  {
    "slug": "editor/layers/particles",
    "label": "Particle Emitter",
    "title": "Create and tune a particle emitter",
    "description": "Control emission, particle appearance, lifetime, randomness and rendering in the Particle panel.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-particles.md"
  },
  {
    "slug": "editor/layers/scene-explorer",
    "label": "Scene Explorer",
    "title": "Find and organize layers in Scene Explorer",
    "description": "Search, filter and organize a scene hierarchy with visibility, locking, labels and subtree controls.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-scene-explorer.md"
  },
  {
    "slug": "editor/layers/cloning",
    "label": "Clone & Instance",
    "title": "Duplicate layers with Copy or Instance",
    "description": "Choose independent copies or linked appearance instances and decide whether their animations should be copied.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-cloning.md"
  },
  {
    "slug": "editor/layers/arrays",
    "label": "Linear, Grid, Radial & Path Array",
    "title": "Arrange copies in a line, grid, circle or path",
    "description": "Use Array patterns with explicit spacing, coordinate space, pivot and animation offsets.",
    "parentSlug": "editor/layers",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-layers-arrays.md"
  },
  {
    "slug": "editor/properties/transform",
    "label": "Transform & anchor",
    "title": "Position, rotate and scale a layer",
    "description": "Set layer position, scale, rotation and anchor precisely, and understand how these values affect animation.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-transform.md"
  },
  {
    "slug": "editor/properties/appearance",
    "label": "Fill, stroke & opacity",
    "title": "Style a layer with fills, strokes and opacity",
    "description": "Change a layer’s visual appearance, including gradients, outlines, blend modes and shape-specific controls.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-appearance.md"
  },
  {
    "slug": "editor/properties/effects",
    "label": "Effects & motion blur",
    "title": "Add blur, glow, shadows and color effects",
    "description": "Use the Effects tab to build an ordered effect chain and inspect motion blur settings.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-effects.md"
  },
  {
    "slug": "editor/properties/masks",
    "label": "Masks",
    "title": "Reveal a layer through another shape",
    "description": "Add shape-based masks, combine them in order and adjust opacity, inversion and feathering.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-masks.md"
  },
  {
    "slug": "editor/properties/motion",
    "label": "Follow path",
    "title": "Move a layer along a path",
    "description": "Use Follow Path to control progress, orientation and offsets along an editable route.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-motion.md"
  },
  {
    "slug": "editor/properties/interact",
    "label": "Tap, drag & cursor",
    "title": "Make a layer respond to interaction",
    "description": "Configure tapping, dragging and cursor-driven behavior, then test the response in the runtime preview.",
    "parentSlug": "editor/properties",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-properties-interact.md"
  },
  {
    "slug": "editor/timeline/dope-sheet",
    "label": "Dope Sheet",
    "title": "Adjust animation timing in the Dope Sheet",
    "description": "Move groups of keyframes, align beats and compare the timing of several layers without editing value curves.",
    "parentSlug": "editor/timeline",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-timeline-dope-sheet.md"
  },
  {
    "slug": "editor/timeline/curves",
    "label": "Curve Editor",
    "title": "Shape animation easing in the Curve Editor",
    "description": "Read time-value curves, adjust keyframes and tangents, and compare acceleration across an animation.",
    "parentSlug": "editor/timeline",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-timeline-curves.md"
  },
  {
    "slug": "editor/timeline/controllers",
    "label": "Controllers & modifiers",
    "title": "Add procedural motion to a property track",
    "description": "Combine track controllers and ordered modifiers for oscillation, noise, springs and other reusable motion.",
    "parentSlug": "editor/timeline",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-timeline-controllers.md"
  },
  {
    "slug": "editor/timeline/segments",
    "label": "Segments & markers",
    "title": "Organize a timeline with segments and markers",
    "description": "Name ranges for playback, mark useful moments and connect animation events to those locations.",
    "parentSlug": "editor/timeline",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-timeline-segments.md"
  },
  {
    "slug": "editor/timeline/onion-skin",
    "label": "Ghost & onion skin",
    "title": "Compare animation poses with onion skinning",
    "description": "Use Ghost controls to compare neighboring poses, choose a time range and keep motion spacing readable.",
    "parentSlug": "editor/timeline",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-timeline-onion-skin.md"
  },
  {
    "slug": "editor/keyframes/inspector",
    "label": "Keyframe Inspector",
    "title": "Edit a keyframe’s time, value and easing",
    "description": "Use the Keyframe Inspector for precise numeric edits and interpolation choices on a selected key.",
    "parentSlug": "editor/keyframes",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-keyframes-inspector.md"
  },
  {
    "slug": "editor/keyframes/spreadsheet",
    "label": "Keyframe Spreadsheet",
    "title": "Edit selected keyframes in a table",
    "description": "Use the keyframe spreadsheet to compare and edit exact times, values and easing across selected keys.",
    "parentSlug": "editor/keyframes",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-keyframes-spreadsheet.md"
  },
  {
    "slug": "editor/keyframes/timing",
    "label": "Timing, stagger & repeat",
    "title": "Retiming and staggering keyframes",
    "description": "Move, stagger and repeat animation with deliberate timing and out-of-range behavior.",
    "parentSlug": "editor/keyframes",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-keyframes-timing.md"
  },
  {
    "slug": "editor/assets",
    "label": "Assets & media",
    "title": "Manage the assets used by a scene",
    "description": "Inspect imported media, add it to the composition and keep assets portable when saving or exporting.",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-assets.md"
  },
  {
    "slug": "editor/assets/import",
    "label": "Import formats",
    "title": "Import images, SVG, GIF and sprite sheets",
    "description": "Choose the right import path and understand what becomes editable scene content and what remains a media asset.",
    "parentSlug": "editor/assets",
    "group": "Workspace",
    "section": "editor",
    "source": "docs/en/editor-assets-import.md"
  },
  {
    "slug": "editor/state-machines/parameters",
    "label": "Parameters",
    "title": "Define parameters for interactive animation",
    "description": "Create named runtime inputs with defaults and ranges, then connect them to animation behavior.",
    "parentSlug": "editor/state-machines",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-state-machines-parameters.md"
  },
  {
    "slug": "editor/state-machines/events",
    "label": "Events & actions",
    "title": "Trigger animation actions from events",
    "description": "Connect clicks, drags, markers and playback events to explicit actions in the scene.",
    "parentSlug": "editor/state-machines",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-state-machines-events.md"
  },
  {
    "slug": "editor/state-machines/bindings",
    "label": "Motion bindings",
    "title": "Map parameters to motion with bindings",
    "description": "Connect an input value to a layer property, timeline progress or another parameter with explicit ranges.",
    "parentSlug": "editor/state-machines",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-state-machines-bindings.md"
  },
  {
    "slug": "editor/state-machines/wires",
    "label": "Wires & expressions",
    "title": "Connect properties with parameter wires",
    "description": "Build an expression-based relationship between compatible values and inspect validation feedback before applying it.",
    "parentSlug": "editor/state-machines",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-state-machines-wires.md"
  },
  {
    "slug": "editor/preview",
    "label": "Preview & playback",
    "title": "Preview animation and interactive behavior",
    "description": "Compare timeline playback with runtime interaction, inspect parameter changes and test the exported player.",
    "group": "Animation & interaction",
    "section": "editor",
    "source": "docs/en/editor-preview.md"
  },
  {
    "slug": "editor/shortcuts",
    "label": "Keyboard shortcuts",
    "title": "Find keyboard shortcuts for the editor",
    "description": "Search the editor’s shortcut reference and use the commands that match your current editing context.",
    "group": "Reference",
    "section": "editor",
    "source": "docs/en/editor-shortcuts.md"
  },
  {
    "slug": "export/svg",
    "label": "SVG",
    "title": "Export a scene as SVG",
    "description": "Export supported vector content and inspect warnings for effects, media and other format differences.",
    "parentSlug": "export/images",
    "group": "Formats",
    "section": "export",
    "source": "docs/en/export-svg.md"
  },
  {
    "slug": "export/sequence",
    "label": "Image sequence",
    "title": "Export an animation as an image sequence",
    "description": "Choose frame format, scale and frame rate, then download numbered frames for another production tool.",
    "parentSlug": "export/images",
    "group": "Formats",
    "section": "export",
    "source": "docs/en/export-sequence.md"
  }
]
