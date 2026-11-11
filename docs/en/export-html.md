# Export a standalone HTML animation

Standalone HTML creates a self-playing web document from the scene. Use it for a simple browser delivery and inspect the exported file before sharing it.

## Export and open

1. Save the [editable project](export-project-json.md).
2. Choose **Export → Standalone HTML (self-playing)**, or the corresponding File menu command.
3. Open the downloaded HTML in a browser.
4. Compare its layout and motion with the editor preview.

If the scene needs remote assets, verify them in the environment where the HTML will be opened. Local-file and hosted-page access rules can differ.

## Understand the output

This export uses its own generated playback document. Do not assume it reproduces every layer, effect, media feature or interaction supported by the editor or by `@chorono/runtime`.

Check fonts, images, timing, easing and any exported diagnostics. A self-playing file should also be reviewed for the destination's motion and accessibility requirements.

## Host or embed

Keep required assets available and test from the final hosting location. Website builders may restrict custom scripts or iframe content. Dedicated [builder integrations](integrations.md#website-builders--coming-soon) are coming soon; an HTML file does not install a native integration.

If your application needs explicit play/pause controls, parameters or state-machine events, use the [JavaScript runtime](runtime-javascript.md). The [React](runtime-react.md) and [Vue](runtime-vue.md) guides show how to manage that player's lifecycle.

## Revise later

Return to the saved scene to change the animation, then export a new HTML file. Keep the editable source and delivery file clearly named so the next revision starts from the right project.
