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
