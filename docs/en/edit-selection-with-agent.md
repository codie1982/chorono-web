# Edit animations with Claude or Codex

Select an object in Chorono, then ask Claude Code, Codex or another MCP-compatible agent to explain or revise that part of the animation. The **Agent** menu prepares a focused prompt while the scene stays editable in the editor.

This workflow requires a local editor version with the Agent menu and selection context support. If those controls are missing, update your checkout using the [installation guide](installation.md). Your chosen agent client must also be configured for Chorono's Model Context Protocol (MCP) tools.

## Connect an agent before editing

Follow [Connect your AI agent](connect-ai-agent.md#open-agent-connections), then choose **Connect this editor**. Claude Code, Claude Desktop, Codex and other MCP-compatible clients share that editor connection. Opening the connection window does not launch a client or configure its MCP server.

Ask the agent to check `list_sessions` and identify the intended editor. With several editor tabs connected, use the correct `sessionId` explicitly.

## Use the Agent menu

1. Select one or several objects on the canvas, in **Layers**, or in **Scene Explorer**.
2. Right-click an object and open **Agent**. Right-clicking a member of your selection keeps that set as the focus; right-clicking another object targets that object.
3. Choose a task from the menu below.
4. Paste the copied prompt into your connected agent chat. The menu does not send it automatically.

| Menu action | What happens |
| --- | --- |
| **Copy selection context** | Copies a prompt asking the agent to read the focused objects and wait for your instruction. |
| **Explain this selection** | Requests an explanation of the objects and their animation without changing the scene. |
| **Find a problem here** | Requests an investigation with evidence from the current scene and previews. |
| **Suggest improvements** | Requests concrete suggestions without applying them. |
| **Edit this selection…** | Opens a dialog for your change request; **Copy prompt** prepares it for your agent chat. |
| **Ask a custom question…** | Opens a dialog for a question about the focused objects, without requesting an edit. |
| **Agent connections…** | Opens the same connection window as the toolbar's **MCP** button. |
| **Selection & agent help…** | Opens this guide at the Agent menu instructions. |

The Agent submenu applies to objects. If you right-click empty canvas, select or right-click an object to access these actions.

## Edit or ask about the selection

For a revision, choose **Edit this selection…** and describe one observable change:

> Reduce the selected title's upward movement by half. Keep its text, duration, colors and every other layer unchanged. Compare previews before and after the revision.

For an investigation, choose **Ask a custom question…**:

> Why does this selected circle disappear halfway through the loop? Inspect opacity, visibility and the relevant timeline. Explain the evidence without editing.

The dialog's **Focus** line names the captured objects. It keeps that focus while you type. If you need a different target or timeline, cancel and open a new request from that target.

Paste and use the copied request promptly. Its focus record stays in that editor tab for up to ten minutes; refreshing or closing the tab removes it. If the agent cannot retrieve the request, reconnect the editor if needed and copy a new prompt.

The copied prompt asks the agent to retrieve the editor-held focus with `get_handoff_context`. That read supplies the current scene and the captured layer IDs, timeline and playhead time. Changing the selection after copying does not retarget the saved request. If its document or objects no longer match, prepare a new prompt.

## Read selected objects through MCP

You can also select objects and ask your agent directly:

> Read get_scene for this editor and identify the currently selected objects before answering. Explain their animation without changing anything.

`get_scene.selected` reports selection at read time, alongside the scene snapshot. Each selected layer includes its `id`, `name`, `type`, stable `address` and `parentId`. Read the complete authored properties from the matching `scene.layers` records.

For example, a single selected layer can be reported as:

```json
{
  "selected": {
    "primaryLayerId": "title",
    "layerIds": ["title"],
    "layers": [
      {
        "id": "title",
        "name": "Headline",
        "type": "text",
        "address": ["layer", "title"],
        "parentId": null
      }
    ]
  }
}
```

The example IDs and names are illustrative; use the values returned by your editor.

| Selection state | How to interpret the result |
| --- | --- |
| One object | `layerIds` and `layers` contain one entry; `primaryLayerId` identifies it. |
| Several objects | Both arrays contain the selected objects; `primaryLayerId` identifies the primary object. |
| No objects | Both arrays are empty and `primaryLayerId` is `null`. |
| Selection unavailable | `selected` is `null`, or missing on an older host; do not infer a target. |

`address: ["layer", id]` identifies a layer independently of its position in an array. `parentId` identifies its parent group, or is `null` at the root. Selection is temporary editor state: reading it does not change the project, advance the scene revision or create an Undo step.

Live selection and a copied Agent request have different lifetimes. `get_scene.selected` shows the current selection; a copied request keeps its captured focus. Selection metadata alone is not an instruction to edit.

## Review and save the revision

Ask the agent to preserve unrelated layers, read `get_scene` immediately before each source edit and use that read's `revision` and `readToken`. A selection read or copied request does not replace the fresh read required for a later write.

Review actual preview images at the relevant times, play the revised animation and inspect any validation warnings. Then [save an editable project](export-project-json.md) so you can reopen it and continue manually.

## If the workflow stops

- **No connection:** open **Agent → Agent connections…**, connect the editor and verify the client can list that session.
- **Wrong objects:** inspect the **Focus** line or `selected.layerIds`; create a new request from the intended objects.
- **Nothing selected:** choose an object first; empty selection provides no layer target.
- **Prompt was not copied:** check browser clipboard access and retry from the local editor.
- **Stale request:** after ten minutes, a tab refresh, document replacement or deletion of focused objects, copy a new prompt.
- **Tools unavailable:** follow [MCP troubleshooting](troubleshooting.md) and check the client's configuration.

For selection tools, read [Select exactly the objects you need](editor-canvas-selection.md). For reusable agent instructions, see [Agent skills](agent-skills.md).
