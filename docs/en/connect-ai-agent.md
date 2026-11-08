# Connect your AI agent with MCP

Use Claude Code or Codex to create and revise an editable scene in a real Chorono editor. MCP is the connection that gives the agent access to editor tools; the Chorono skills explain how to use those tools.

## Prepare your workspace

Follow [Installation](installation.md) to download Chorono and prepare your chosen client. For an existing checkout, the setup commands can select one client:

```sh
npm run chorono -- setup --agent codex
```

Use `--agent claude-code` for Claude Code. Setup preserves existing configuration; review a stale entry through [Troubleshooting](troubleshooting.md) before replacing it. Your chosen agent client must be installed separately.

## Connect the editor tab

```sh
npm run chorono -- start --background --open
```

Open the printed address and choose **MCP → Connect this editor**. Keep the browser tab open. After setup changes the client configuration, reload the client's MCP connections or start a new agent session.

Refreshing the browser tab requires connecting it again. Installing a skill alone does not connect the tab.

## Check the connection

Use the same client selector that you used during setup:

```sh
npm run chorono -- doctor --agent codex
```

Ask the agent to call `list_sessions`, `get_capabilities` and `get_scene` before editing. If multiple editors are connected, identify the intended session explicitly. A healthy local server is not proof that the agent can reach your scene.

## Give the agent a clear brief

> Use the chorono skill to inspect the connected editor. Create a short title animation with editable text and shapes. Name the layers, preserve unrelated work, inspect real preview images and validate the scene. Save a portable project and report its path.

Specify the canvas size, exact copy, duration and the change you want. Keep later revisions focused on one part of the scene. The [first-animation tutorial](getting-started.md) includes an exercise with exact layer names.

## Keep the result editable

Inspect the animation in the editor, then keep the saved portable project. You can continue with manual changes or another focused agent revision.

Read [Agent skills](agent-skills.md) for installation and update details, or [JavaScript scene scripting](scripting.md) for the isolated authoring API. For an empty session list, use [Troubleshooting](troubleshooting.md).
