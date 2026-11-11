import type { DocumentationSectionId } from './sections'
import { editorGuides } from './editor-guides'
import { runtimeGuides } from './runtime-guides'
import { documentationSections } from './sections'

/** A published local-preview article backed by one versioned Markdown source. */
export interface DocumentationPage {
  readonly slug: string
  readonly source: string
  readonly label: string
  readonly title: string
  readonly description: string
  readonly group: string
  readonly section: DocumentationSectionId
  /** Publicly readable status page; excluded from search indexing until ready. */
  readonly availability?: 'coming-soon'
  /** Navigation parent only. It never changes the page's canonical address. */
  readonly parentSlug?: string
}

/**
 * Curated documentation entry points. Empty slug is /docs; nested slugs are
 * resolved only through this allowlist, never directly into filesystem paths.
 * Sections organize discovery independently of slugs, titles and source files.
 * Existing indexed articles keep their canonical addresses and content intent.
 */
const establishedPages: readonly DocumentationPage[] = [
  {
    slug: '',
    source: 'docs/en/README.md',
    label: 'Introduction',
    title: 'Chorono documentation',
    description:
      'Learn Chorono with editable animation examples. Install the editor, edit keyframes, build loops and connect Claude Code or Codex through MCP.',
    section: 'start',
    group: 'Getting started',
  },
  {
    slug: 'installation',
    source: 'docs/en/installation.md',
    label: 'Installation',
    title: 'Install Chorono',
    description:
      'Set up the free, open-source animation editor on your computer and start a local browser session.',
    section: 'start',
    group: 'Getting started',
  },
  {
    slug: 'first-animation',
    source: 'docs/en/getting-started.md',
    label: 'Your first animation',
    title: 'Create your first editable animation',
    description:
      'Open an editable Chorono example, change its text and colors, inspect the timeline, then save and reopen your first 2D animation.',
    section: 'start',
    group: 'Getting started',
  },
  {
    slug: "editor",
    source: "docs/en/editor-overview.md",
    label: "Editor overview",
    title: "Chorono editor workspace",
    description: "Find the canvas, layers, properties, timeline and resource tools in the Chorono editor. Choose a guide for each part of your animation workflow.",
    section: "editor",
    group: "Workspace",
  },
  {
    slug: "editor/canvas",
    source: "docs/en/editor-canvas.md",
    label: "Canvas & tools",
    title: "Canvas and drawing tools",
    description: "Navigate the canvas, draw shapes and splines, use snapping and edit motion keys in Chorono.",
    section: "editor",
    group: "Workspace",
  },
  {
    slug: "editor/layers",
    source: "docs/en/editor-layers.md",
    label: "Layers & hierarchy",
    title: "Layers and scene hierarchy",
    description: "Select, name, group and organize scene objects in Chorono using the Layers panel and Scene Explorer.",
    section: "editor",
    group: "Workspace",
  },
  {
    slug: "editor/properties",
    source: "docs/en/editor-properties.md",
    label: "Properties & effects",
    title: "Edit layer properties and effects",
    description: "Adjust transforms, appearance, effects and motion for a selected Chorono layer, then animate supported values with keyframes.",
    section: "editor",
    group: "Workspace",
  },
  {
    slug: "editor/resources",
    source: "docs/en/editor-resources.md",
    label: "Resources & performance",
    title: "Resources and performance",
    description: "Inspect project resources, media and rendering measurements in Chorono without confusing tracked resource estimates with total process memory.",
    section: "editor",
    group: "Workspace",
  },
  {
    slug: 'editor/keyframes',
    source: 'docs/en/editor-keyframes.md',
    label: 'Keyframes',
    title: 'Edit keyframes in Chorono',
    description:
      'Inspect a property track, change a keyframe value and compare the movement in a real editable project.',
    section: 'editor',
    group: 'Animation & interaction',
  },
  {
    slug: 'editor/timeline',
    source: 'docs/en/editor-timeline.md',
    label: 'Timeline & playback',
    title: 'Work with the animation timeline',
    description:
      'Read animation tracks, scrub the playhead and understand milliseconds, frames and independent timelines.',
    section: 'editor',
    group: 'Animation & interaction',
  },
  {
    slug: 'animation/loops',
    source: 'docs/en/loop-animation.md',
    label: 'Looping animations',
    title: 'Make a looping animation',
    description:
      'Make a looping animation in Chorono. Inspect a three-dot example, adjust its keyframes and stagger, and check the loop boundary before saving.',
    section: 'editor',
    group: 'Animation & interaction',
  },
  {
    slug: "editor/state-machines",
    source: "docs/en/editor-state-machines.md",
    label: "State machines",
    title: "State machines and interactions",
    description: "Connect animation states and transitions in Chorono, then test parameters and interaction events before runtime export.",
    section: "editor",
    group: "Animation & interaction",
  },
  {
    slug: "integrations",
    source: "docs/en/integrations.md",
    label: "Integration overview",
    title: "Chorono integrations",
    description: "Explore current AI agent connections and upcoming design-tool and publishing integrations for Chorono.",
    section: "integrations",
    group: "Connections",
  },
  {
    slug: "runtime",
    source: "docs/en/runtime-overview.md",
    label: "Runtime overview",
    title: "Chorono runtimes and SDKs",
    description: "Choose a Chorono playback integration, explore the JavaScript runtime and find versioned SDK downloads and framework guides.",
    section: "runtime",
    group: "Overview",
  },
  {
    slug: "runtime/javascript",
    source: "docs/en/runtime-javascript.md",
    label: "JavaScript / TypeScript",
    title: "Chorono JavaScript runtime",
    description: "Install @chorono/runtime, load a runtime export into a canvas and control playback with the JavaScript and TypeScript API.",
    section: "runtime",
    group: "Web playback",
  },
  {
    slug: "runtime/react",
    source: "docs/en/runtime-react.md",
    label: "React",
    title: "Use Chorono with React",
    description: "Mount a Chorono canvas player in React with cancellation, effect cleanup and the published @chorono/runtime package.",
    section: "runtime",
    group: "Web playback",
  },
  {
    slug: "runtime/vue",
    source: "docs/en/runtime-vue.md",
    label: "Vue",
    title: "Use Chorono with Vue",
    description: "Mount a Chorono canvas player in Vue and release its clock and listeners when the component unmounts.",
    section: "runtime",
    group: "Web playback",
  },
  {
    slug: "runtime/downloads",
    source: "docs/en/runtime-downloads.md",
    label: "SDK downloads & status",
    title: "Chorono SDK downloads",
    description: "Download the versioned Chorono JavaScript runtime from npm or CDN and check which additional SDK distributions are available.",
    section: "runtime",
    group: "Distributions",
  },
  {
    slug: "export",
    source: "docs/en/export-overview.md",
    label: "Export overview",
    title: "Export from Chorono",
    description: "Choose an editable project, runtime JSON, still image, image sequence, SVG or standalone HTML export for your Chorono scene.",
    section: "export",
    group: "Choose an output",
  },
  {
    slug: "export/project-json",
    source: "docs/en/export-project-json.md",
    label: "Project JSON & saving",
    title: "Save an editable Chorono project",
    description: "Keep an editable scene, use folder versions and check portable assets when saving or sharing a Chorono project.",
    section: "export",
    group: "Formats",
  },
  {
    slug: "export/runtime-json",
    source: "docs/en/export-runtime-json.md",
    label: "Runtime JSON",
    title: "Export Chorono runtime JSON",
    description: "Export a runtime package, inspect warnings and pass its runtime payload to the Chorono player while preserving an editable source copy.",
    section: "export",
    group: "Formats",
  },
  {
    slug: "export/images",
    source: "docs/en/export-images.md",
    label: "Images, SVG & sequences",
    title: "Export images, SVG and frame sequences",
    description: "Export PNG, WebP, JPEG, SVG or a numbered frame sequence from Chorono and check transparency, dimensions and format limitations.",
    section: "export",
    group: "Formats",
  },
  {
    slug: "export/html",
    source: "docs/en/export-html.md",
    label: "Standalone HTML",
    title: "Export a standalone HTML animation",
    description: "Export a self-playing Chorono HTML animation and test playback and asset portability before sharing it.",
    section: "export",
    group: "Formats",
  },
  {
    slug: 'ai/mcp',
    source: 'docs/en/connect-ai-agent.md',
    label: 'Connect your AI agent',
    title: 'Connect your AI agent with MCP',
    description:
      'Connect Claude Code or Codex to a real Chorono editor through MCP and check the scene before making changes.',
    section: 'ai',
    group: 'AI & scripting',
  },
  {
    slug: 'ai/skills',
    source: 'docs/en/agent-skills.md',
    label: 'Agent skills',
    title: 'Chorono agent skills',
    description:
      'Install, inspect and update the setup and animation-authoring skills for Claude Code and Codex.',
    section: 'ai',
    group: 'AI & scripting',
  },
  {
    slug: 'scripting',
    source: 'docs/en/scripting.md',
    label: 'JavaScript scripting',
    title: 'JavaScript scene scripting',
    description:
      'Create and edit native layers, timelines and interactions in the isolated MCP scripting bridge.',
    section: 'ai',
    group: 'AI & scripting',
  },
  {
    slug: 'troubleshooting',
    source: 'docs/en/troubleshooting.md',
    label: 'Troubleshooting',
    title: 'Chorono setup and MCP troubleshooting',
    description:
      'Diagnose startup, MCP connection and skill problems with explicit readiness checks.',
    section: 'resources',
    group: 'Resources',
  },
  {
    slug: 'releases/0.2.0',
    source: 'docs/releases/v0.2.0.md',
    label: 'Release notes',
    title: 'Chorono 0.2.0',
    description:
      'Read the scope, installation notes and known limitations of the 0.2.0 release.',
    section: 'resources',
    group: 'Resources',
  },
]

/** Build reader order from explicit parents, preserving each section's source
 * order. Invalid parents/cycles fail validation; URLs never follow this tree. */
function orderDocumentation(pages: readonly DocumentationPage[]): readonly DocumentationPage[] {
  const bySlug = new Map(pages.map(page => [page.slug, page]))
  if (bySlug.size !== pages.length) throw new Error('Duplicate documentation slug')
  for (const page of pages) {
    const seen = new Set([page.slug])
    let current = page
    while (current.parentSlug !== undefined) {
      const parent = bySlug.get(current.parentSlug)
      if (!parent || parent.section !== page.section || seen.has(parent.slug))
        throw new Error(`Invalid documentation parent: ${current.slug}`)
      seen.add(parent.slug); current = parent
    }
  }
  const visit = (page: DocumentationPage): DocumentationPage[] => [page, ...pages.filter(child => child.parentSlug === page.slug).flatMap(visit)]
  const ordered = documentationSections.flatMap(section => pages.filter(page => page.section === section.id && page.parentSlug === undefined).flatMap(visit))
  if (ordered.length !== pages.length) throw new Error('Unreachable documentation article')
  return ordered
}

export const documentationPages = orderDocumentation([...establishedPages, ...editorGuides, ...runtimeGuides])

/** Return the local route for an allowlisted article, with no trailing slash. */
export function documentationHref(slug: string): string {
  return slug ? `/docs/${slug}` : '/docs'
}

/** Resolve a route slug without accepting arbitrary local file paths. */
export function findDocumentationPage(
  slug: string
): DocumentationPage | undefined {
  return documentationPages.find((page) => page.slug === slug)
}
