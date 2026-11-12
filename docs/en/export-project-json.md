# Save an editable Chorono project

Save the editable scene before creating delivery exports. A project retains the source objects and animation structure you need to continue work in Chorono.

## Save Scene JSON

Use **Project → Save Scene JSON**, or the corresponding File menu command. The browser downloads a scene file. Give the file a clear project name and keep versions when making substantial changes.

Older editor builds may expose JSON inspection and saving through a separate toolbar button. Use the scene-save action for an editable source; a runtime export has a different purpose.

## Folder saving and versions

**Choose Save Folder** enables folder-based saving in browsers that support the required file access. Grant access to the intended project directory and check the displayed saving status. **Save Version** creates a timestamped version when a save folder is available.

If folder saving is unavailable, use the JSON download workflow. A visible scene is not proof that its latest changes were written to disk; inspect the saved status or reopen the downloaded file.

## Check portability

Imported media can depend on local or remote assets. A temporary `blob:` URL is only meaningful inside the browser session that owns it. Use a portable project/package workflow for asset-backed scenes and check the resulting project after reopening it in a fresh session.

For MCP-authored work, the [agent workflow](connect-ai-agent.md) supports saving a portable project. Preserve any accompanying files required by the chosen save format.

## Reopen before sharing

1. Save the scene and keep the original version.
2. Reopen the saved project in Chorono.
3. Check layer names, text, fonts and media.
4. Play the timeline and test interactions.
5. Share the complete project/package needed by the recipient.

Use [Runtime JSON](export-runtime-json.md) to embed playback or [images and sequences](export-images.md) for rendered output. Keep the editable project alongside those delivery files.

## Keep an external backup as well as local recovery

**Saved locally** is a browser recovery status, not proof that a file exists in your downloads or chosen folder. Save Scene JSON when you need to move work, archive a version or protect it from cleared browser data.

The Save Scene JSON flow can include a portable recovery envelope with the project session and bounded history. Inspect / Copy exports source scene data, while MCP save follows its own portable-format contract. Check which flow produced a file before treating its wrapper as interchangeable with another.

Session suffixes and supported `sessions/<sessionId>/` folders keep documents distinct. Reopen the saved file and inspect its media, geometry and animation before relying on it. See [local recovery](editor-projects.md#automatic-local-recovery) for browser origins, history limits and retry behavior.
