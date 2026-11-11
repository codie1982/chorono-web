/** Stable navigation identities; reorganizing a section never moves an article URL. */
export type DocumentationSectionId = 'start' | 'editor' | 'integrations' | 'runtime' | 'export' | 'ai' | 'resources'

/** One discoverable topic and its existing or additive sitemap endpoint. */
export interface DocumentationSection {
  readonly id: DocumentationSectionId
  readonly label: string
  readonly slug: string
  readonly description: string
  readonly sitemap: string
  readonly primary?: boolean
}

/** Shared by the header, sidebar, category cards and sitemap inventory. */
export const documentationSections: readonly DocumentationSection[] = [
  { id: 'start', label: 'Getting started', slug: '', description: 'Install Chorono and make your first editable animation.', sitemap: 'sitemap-docs-start.xml' },
  { id: 'editor', label: 'Editor', slug: 'editor', description: 'Explore the workspace, draw layers and bring them to life.', sitemap: 'sitemap-docs-editor.xml', primary: true },
  { id: 'integrations', label: 'Integrations', slug: 'integrations', description: 'Connect your workflow. See what works today and what is coming next.', sitemap: 'sitemap-docs-integrations.xml', primary: true },
  { id: 'runtime', label: 'Runtime', slug: 'runtime', description: 'Play animations in your app with SDK guides and versioned downloads.', sitemap: 'sitemap-docs-runtime.xml', primary: true },
  { id: 'export', label: 'Export', slug: 'export', description: 'Save editable projects and choose the right delivery format.', sitemap: 'sitemap-docs-export.xml', primary: true },
  { id: 'ai', label: 'AI & scripting', slug: 'ai/mcp', description: 'Connect an agent and author native scenes through MCP.', sitemap: 'sitemap-docs-ai.xml' },
  { id: 'resources', label: 'Resources', slug: 'troubleshooting', description: 'Troubleshooting and release notes.', sitemap: 'sitemap-docs-resources.xml' },
]
