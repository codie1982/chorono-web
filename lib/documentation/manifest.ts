/** A published local-preview article backed by one versioned Markdown source. */
export interface DocumentationPage {
  readonly slug: string
  readonly source: string
  readonly label: string
  readonly title: string
  readonly description: string
  readonly group: string
}

/**
 * Curated documentation entry points. Empty slug is /docs; nested slugs are
 * resolved only through this allowlist, never directly into filesystem paths.
 * Legacy SDK/advanced guides remain outside this first reviewed navigation.
 */
export const documentationPages: readonly DocumentationPage[] = [
  {
    slug: '',
    source: 'docs/en/README.md',
    label: 'Introduction',
    title: 'Chorono documentation',
    description:
      'Learn Chorono with editable animation examples. Install the editor, edit keyframes, build loops and connect Claude Code or Codex through MCP.',
    group: 'Getting started',
  },
  {
    slug: 'installation',
    source: 'docs/en/installation.md',
    label: 'Installation',
    title: 'Install Chorono',
    description:
      'Set up the free, open-source animation editor on your computer and start a local browser session.',
    group: 'Getting started',
  },
  {
    slug: 'first-animation',
    source: 'docs/en/getting-started.md',
    label: 'Your first animation',
    title: 'Create your first editable animation',
    description:
      'Open an editable Chorono example, change its text and colors, inspect the timeline, then save and reopen your first 2D animation.',
    group: 'Getting started',
  },
  {
    slug: 'editor/keyframes',
    source: 'docs/en/editor-keyframes.md',
    label: 'Keyframes',
    title: 'Edit keyframes in Chorono',
    description:
      'Inspect a property track, change a keyframe value and compare the movement in a real editable project.',
    group: 'Create animations',
  },
  {
    slug: 'editor/timeline',
    source: 'docs/en/editor-timeline.md',
    label: 'Timeline & playback',
    title: 'Work with the animation timeline',
    description:
      'Read animation tracks, scrub the playhead and understand milliseconds, frames and independent timelines.',
    group: 'Create animations',
  },
  {
    slug: 'animation/loops',
    source: 'docs/en/loop-animation.md',
    label: 'Looping animations',
    title: 'Make a looping animation',
    description:
      'Make a looping animation in Chorono. Inspect a three-dot example, adjust its keyframes and stagger, and check the loop boundary before saving.',
    group: 'Create animations',
  },
  {
    slug: 'ai/mcp',
    source: 'docs/en/connect-ai-agent.md',
    label: 'Connect your AI agent',
    title: 'Connect your AI agent with MCP',
    description:
      'Connect Claude Code or Codex to a real Chorono editor through MCP and check the scene before making changes.',
    group: 'AI & scripting',
  },
  {
    slug: 'ai/skills',
    source: 'docs/en/agent-skills.md',
    label: 'Agent skills',
    title: 'Chorono agent skills',
    description:
      'Install, inspect and update the setup and animation-authoring skills for Claude Code and Codex.',
    group: 'AI & scripting',
  },
  {
    slug: 'scripting',
    source: 'docs/en/scripting.md',
    label: 'JavaScript scripting',
    title: 'JavaScript scene scripting',
    description:
      'Create and edit native layers, timelines and interactions in the isolated MCP scripting bridge.',
    group: 'AI & scripting',
  },
  {
    slug: 'troubleshooting',
    source: 'docs/en/troubleshooting.md',
    label: 'Troubleshooting',
    title: 'Chorono setup and MCP troubleshooting',
    description:
      'Diagnose startup, MCP connection and skill problems with explicit readiness checks.',
    group: 'Resources',
  },
  {
    slug: 'releases/0.2.0',
    source: 'docs/releases/v0.2.0.md',
    label: 'Release notes',
    title: 'Chorono 0.2.0',
    description:
      'Read the scope, installation notes and known limitations of the 0.2.0 release.',
    group: 'Resources',
  },
]

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
