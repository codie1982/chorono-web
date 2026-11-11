# Chorono integrations

Connect Chorono to the tools in your workflow. AI agent connections are available today; dedicated design-tool and publishing integrations are coming soon.

## Available today: AI agents

Use [MCP](connect-ai-agent.md) to connect Claude Code or Codex to an explicitly connected local Chorono editor. The agent can inspect and edit native layers, keyframes and scene data. Install the editor, start it, and choose **MCP → Connect this editor** in the browser.

[Agent skills](agent-skills.md) provide setup and authoring instructions. They complement the connection; installing a skill alone does not open or connect an editor.

## Design tools — coming soon

| Integration area | Status | Current workflow |
| --- | --- | --- |
| Figma | Coming soon | Prepare an asset in your design tool and inspect the supported import in Chorono. No dedicated Chorono Figma plugin is available here yet. |
| After Effects | Coming soon | Keep the source project in After Effects. Do not assume its project format or effects can be edited directly in Chorono. |
| Canva | Coming soon | Export assets from your design tool and check the imported result. A native Chorono Canva connection is not available here yet. |

These entries describe upcoming integration areas, not downloadable plugins. Release timing and exact supported features will be added when the integrations are ready.

## Website builders — coming soon

Dedicated Framer, Webflow and WordPress integrations are coming soon. Installation instructions and download links will appear here with their releases.

For a website you can edit today, use the published [JavaScript runtime](runtime-javascript.md) with a canvas, or review [standalone HTML export](export-html.md). A custom embed depends on the host's support for scripts and asset URLs; it is not a native website-builder plugin.

## Application frameworks

The [React](runtime-react.md) and [Vue](runtime-vue.md) guides use `@chorono/runtime`. They explain how to mount and clean up the same JavaScript player in each framework. They do not require a separate Chorono React or Vue package.

Check [SDK downloads & status](runtime-downloads.md) for published distributions. For manual editing before export, return to the [Editor workspace](editor-overview.md).
