# AI animation generator with manual editing — content brief

Status: two branch drafts for review, 17 November 2026. Target: US English. URLs: `/blog/ai-animation-generator-manual-editing` and `/blog/codex-animation-preserve-manual-edits`.

## Editorial decision

Use the broad `ai animation generator` query to explain a specific alternative: Claude Code or Codex builds a native 2D Chorono scene, and the user can edit the resulting text, shapes and keyframes directly. The article must explain that Chorono is a locally run editor connected to a separate agent client, not an instant hosted text-to-video service. Do not claim all later agent commands preserve manual work; show the current-scene read, narrow target, review and saved-project comparison.

The broad article uses the existing `first-animation` project throughout: a 960 × 540, four-second scene with eight layers, 13 tracks and 51 keyframes. Its playable preview and portable JSON are already available. The prompt asks the agent to delay only Motion dot 2 after the reader has manually changed the headline and Motion dot 1 color.

The Codex article addresses the narrower user problem: manual changes should survive a later Codex request. It uses the separate `codex-loading-loop` project and asks Codex to change only Middle dot timing after the user edits the headline and Left dot color. These are reproducible exercises, not recorded before/after test results.

## DataForSEO keyword map

DataForSEO Google Ads Search Volume Live, United States (2840), English, queried 17 November 2026. Values are approximate monthly averages. `No data` is a null result, not zero searches. Close variants overlap and must not be summed.

| Phrase | US monthly average | Editorial use |
| --- | ---: | --- |
| ai animation generator | 3,600 | Primary title and opening; qualify the workflow immediately |
| ai animation tool | 880 | Context only; too broad for repeated use |
| ai motion graphics | 480 | Fit section for text and shape animation |
| animation editor | 390 | Explain the real editor and timeline |
| claude animation | 260 | Ambiguous; do not make a primary target |
| claude code animation | 70 | Agent workflow and link to existing Claude guide |
| motion graphics editor | 40 | Supporting contextual phrase |
| claude code video editor | 40 | Different possible intent; do not promise footage editing |
| ai animation editor | 20 | Editable object and keyframe section |
| ai animation workflow | 20 | Process description |
| codex motion graphics | 10 | Supporting Codex context |
| codex video editor | 10 | Different possible intent; do not promise video editing |
| ai motion graphics editor | 10 | Supporting phrase |
| editable ai animation | No data | Natural explanation of portable source |
| edit ai generated animation | No data | Manual editing section |
| how to edit ai generated animation | No data | How-to steps and FAQ |
| ai generated animation editable | No data | FAQ answer, not awkward exact-match copy |
| prompt to editable animation | No data | Agent-to-editor process |
| ai animation manual editing | No data | Core product demonstration |
| preserve manual edits ai | No data | Codex-focused revision safety explanation |
| claude code animation editor | No data | Linked Claude guide context |
| codex animation editor | No data | Codex-focused article and guide context |
| ai animation with keyframes | No data | Timeline and keyframe section |

The direct-problem phrases have no measured volume in this sample, but they describe the product benefit precisely. The larger generator phrase mostly attracts text-to-video and image-to-video results, so a clear first paragraph and honest fit section are essential. The broad article owns generator intent; the Codex article owns manual-edits and second-revision intent. Do not show this SEO table to site visitors; it guides copy rather than being a product feature.

## Real editor screenshots

1. `/docs/screenshots/first-animation-editor.jpg` — 1280 × 720. The same downloadable project, showing the selected Editable headline, text Content field, layers and timeline. This supports the manual editing claim.
2. `/docs/screenshots/mcp-connect-v2.jpg` — 528 × 306. The editor's Claude & Codex connection dialog. This shows the separate connection step; it is not a before/after preservation proof.
3. `/docs/screenshots/timeline-panel-v2.jpg` — 1280 × 489. The Codex loading-loop timeline with Left, Middle and Right dot tracks. This belongs to the Codex article and shows why one track can be identified for a narrow revision.

All assets already exist in `public/docs/screenshots/`; the articles use them directly with descriptive alt text and captions. The heroes use the actual `/examples/first-animation.png` and `/examples/codex-loading-loop.png` previews. No synthetic UI images are used.

## Review before release

- Run the article's manual edit and targeted agent revision with a fresh copy of the example, compare the saved project values, and verify the stale-revision behavior before strengthening the preservation claim.
- Check the article at mobile and desktop widths. Confirm both screenshots, preview, download, canonical metadata, internal links and sitemap entry.
- This draft has not been deployed, merged or submitted for indexing.

Sources: [DataForSEO volume method](https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/), [Chorono first-animation tutorial](https://www.chorono.com/docs/first-animation), [Chorono scripting and revision checks](https://www.chorono.com/docs/scripting).
