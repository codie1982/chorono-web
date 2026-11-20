# Selection and Agent docs SEO — Nov 20, 2026

## Your next SEO move

- Add one guide for revising selected animation objects with Claude or Codex.
- Connect that guide to editor Help and the existing MCP setup guide.
- Preserve existing setup and creation tutorials, routes and metadata.

## Recommendations

### Document selection-focused edits at /docs/ai/edit-selection

**Do this**

- Explain every Agent action, prompt copying and explicit paste into the user's chat.
- Show `get_scene.selected` for one, several, empty and unavailable selections.
- Distinguish live selection from the captured focus of a copied Agent request.
- Link to connection setup, selection tools and portable project saving.

**Why**

- The editor implements these operations; the existing docs do not explain the complete task.
- Claude animation queries show related demand, while exact selection-query demand remains unknown.
- The guide can attract relevant task searches and help current users complete revisions.
- Confidence is high in the documented workflow, limited in acquisition scale; no traffic uplift is estimated.

| Query | Estimated US searches/month, English, retrieved Nov 20, 2026 | Current visibility |
| --- | ---: | --- |
| claude animation | 170 | Not measured for Chorono |
| claude code animation | 70 | Unknown; 16 organic items returned with opaque destinations |
| codex animation | 10 | Unknown; 15 organic items returned with opaque destinations |
| ai animation editor | 20 | Not measured for Chorono |
| mcp animation editor | Unknown, row not returned | Lookup failed; visibility unknown |

These phrases overlap and are not added together. The page targets selected-object revision; existing blog tutorials retain the broader creation task.

### Explain the shared connection window and add contextual Help

**Do this**

- Extend [the existing connection guide](https://www.chorono.com/docs/ai/mcp) with the Agent menu entry point.
- Reuse `DocumentationHelp` beside connection and edit/question dialog titles.
- Add the same guide action to canvas, Layers and Scene Explorer Agent menus.

**Why**

- The shared dialog is accessible from several surfaces but had no direct task help.
- Existing editor users need the connection step before copying a useful revision request.
- This improves task completion; conversion and traffic effects are unmeasured.

| Existing guide | Observed gap | Added destination |
| --- | --- | --- |
| /docs/ai/mcp | Toolbar setup only; no contextual Agent entry | #open-agent-connections |
| /docs/ai/edit-selection | New task | #use-the-agent-menu |
| /docs/ai/edit-selection | Edit and custom-question dialog | #edit-or-ask-about-the-selection |

## What else we checked

| Opportunity | What we found | Decision |
| --- | --- | --- |
| Broad Claude/Codex MCP landing page | 5,400 / 1,600 estimated US searches monthly; general connection intent | Runner-up. Higher demand, but the new selection task has a direct product gap; retain the specific setup guide. |
| Standalone selection API page | Exact selection terms have no returned volume | Explain the contract within the task guide; avoid splitting a small topic. |
| Another Codex creation tutorial | /blog/make-animations-with-codex already covers setup and a real example | Preserve creation intent there; this guide covers focused revision. |
| General metadata maintenance | Thirty-page crawl returned five long-description and three long-title info issues | Outside this feature task; no measured traffic loss supports unrelated edits. |
| Existing spline Help links | Three pre-existing targets are absent from this website checkout | Separate spline-docs integration; all three new Agent Help targets resolve. |

## How this report was made

Research followed the [OpenSEO SEO Audit skill](https://openseo.so/docs/skills/seo-audit), run by Codex on November 20, 2026.

This is a feature-specific documentation implementation record, not a full-domain audit. OpenSEO's connected tool inventory does not expose `list_reports` or `save_report`; no hosted HTML report was created.

<details>
<summary>Evidence and methodology</summary>

- Project: Chorono, `016339b3-2965-4937-bf53-ea847cd51952`; project context read before research. Existing research under 30 days old reused for site structure and prior decisions.
- Market: United States, location `2840`, English `en`, from project defaults. No device filter is exposed by the OpenSEO keyword/SERP connector; effective SERP device unknown. No global demand claim.
- `whoami`: self-hosted account; balance unknown (`creditsRemaining: null`). One focused 12-term metrics batch and one three-query SERP batch were used. Credit charges were not exposed; no clickstream multiplier or duplicate direct DataForSEO purchase.
- Metrics returned six of twelve exact rows. Missing rows remain unknown, not zero. Keyword metric observation dates are not exposed. Retrieval: November 20, 2026; evidence timestamp recorded at 09:33:02 UTC.
- Live SERP lookup: `claude code animation` returned 20 mixed blocks including 16 organic listings; `codex animation` returned 20 blocks including 15 organic listings. The connector's `rank` includes mixed result types and all destinations were opaque Google redirects. Organic positions and Chorono presence cannot be established. `mcp animation editor` failed with `Internal SE Server Error`. No ranking diagnosis drives the implementation, so no repeat rank lookup was purchased.
- Search Console request: WEB/final, October 21–November 17, 2026, query/page dimensions, page contains `/docs/ai/`; failed with `gsc_oauth_not_configured`. Traffic baseline, clicks, impressions and losses remain unknown for this task.
- Live crawl: `9ba0333c-1e6f-4275-b06d-816ed29ef7ab`, started November 20 at 09:30:02 UTC, 30/30 pages, no Lighthouse. No critical/warning issues in the sample; eight informational metadata-length issues outside this feature. This does not establish whole-site health.
- Live `/docs/ai/mcp`: HTTP 200 and `isIndexable: true` from the crawler. Its `inSitemap: false` flag alone does not establish an omission. Preferred URL declarations (canonicals), robots directives and sitemap membership are checked against the local rendered build before release.
- Page families read for this task: MCP setup and skills; canvas selection, Layers and Scene Explorer; existing Claude/Codex creation tutorials as overlap checks. Runtime, comparison pages and backlinks were outside the requested feature scope.
- Source verification: local editor main worktree, feature commit `4f9e67cc` (the current main version of the change described as `4d8177d2`), `agentHandoff/menu.ts`, `MCPConnection.tsx`, `AgentHandoffDialog.tsx`, `SceneSelection.ts`, and `agentHandoff/prompt.ts`.
- External content reads: [MCP setup guide](https://www.chorono.com/docs/ai/mcp) and [agent skills](https://www.chorono.com/docs/ai/skills). Search-result titles were used only as limited intent evidence, not product facts. Technical behavior comes from source.
- No cannibalization or AI answer-collection module ran; no mention/citation rates or ranking-loss claims. Provider estimates are not measured visits or revenue.
- Reproducible keyword mapping: `agent-selection-keywords-2026-11-20.csv`. Local raw provider responses and shortlist are retained under ignored `outputs/agent-selection-seo-2026-11-20/` for handoff; those paths are storage locations, not public evidence links.

</details>

## Implementation and release state

One new task guide is registered in the existing manifest, AI navigation, search and automatic sitemap inventory. Existing guide headings and metadata are preserved; introduction and MCP source hashes are refreshed after reviewing the small link/section additions. Contextual links are added to Introduction, MCP, Selection, Layers and Scene Explorer.

Editor Help was merged into `chorono-editor` main through PR #19, merge commit `30cbb099`, after all required CI checks passed. It reuses the typed documentation registry, existing help link behavior and common Agent menu builder. The helper action opens the guide with `noopener,noreferrer`, without connecting an agent, transferring scene context or editing the project.

The companion website change was prepared separately from current remote main `9809269`, preserving the later Codex tutorial links, release notes, library additions and three published blog guides. Production helper destinations belong to this website release; the original dirty checkout remains untouched.

### Initial authoring validation

- Web: 15 Node tests and 63 docs tests passed; local production-mode build and `seo:check` passed.
- Rendered production audit: 107 HTML pages, 86 docs, 92 sitemap URLs across 11 topic files, 63 images; zero errors. The 15 existing coming-soon runtime pages remain noindex/follow and unlisted.
- Three new Agent Help targets resolve to the intended rendered headings. The full registry check also found three pre-existing 404 targets: `editor/canvas/compound-splines`, `editor/canvas/spline-modeling` and `scripting/splines`; those entries already exist in editor main and are outside this feature change.
- Editor: 385 test files / 3,048 tests passed; MCP build and Next production build passed. Builds ran in isolated copies, without disturbing existing running editors.
- Browser: real shared connection dialog, edit dialog and Agent submenu rendered in an isolated host with synthetic focus and no live MCP connection. Help remained keyboard-reachable; edit textarea initial focus was restored after adding header Help. The docs page had one H1 and no page overflow at the observed widths, approximately 329, 674, 898 and 1,263 CSS pixels.
- Independent skill review accepted the intent split and evidence limits. It caught a working-note fragment and unsupported word count, both corrected; the source-confirmed ten-minute/tab-refresh request lifetime was added.
- The SEO checker's existing blog/date and docs-count expectations were stale relative to the current local content. Its inventory was synchronized without altering the blog articles: eight posts, three November 19 publication dates, and 75 released docs/library additions including this guide.
- Existing feature/version-import, optional Sharp and Browserslist warnings remain; no new build error was introduced. `git diff --check` passes for both repositories.

Local review: [task guide](http://127.0.0.1:4317/docs/ai/edit-selection), [Agent menu help](http://127.0.0.1:4317/docs/ai/edit-selection#use-the-agent-menu), [edit/question help](http://127.0.0.1:4317/docs/ai/edit-selection#edit-or-ask-about-the-selection), [connection help](http://127.0.0.1:4317/docs/ai/mcp#open-agent-connections).

The optional OpenSEO shared-memory write was rejected by automatic approval review because external persistence of unpublished implementation/research details was not explicitly authorized. No project-memory update was applied. This local record retains the evidence and research-reuse information; no further write was attempted after inspecting that rejection.


### Release verification on current main

- User authorized the web push on November 20, 2026. Only this task's guide, cross-links, metadata hashes, research notes and checker corrections were carried into a clean worktree.
- Fresh lockfile install completed. Fifteen Node tests and 66 docs tests passed; production-mode Next build and `seo:check` passed.
- Rendered release audit: 108 HTML pages, 86 docs, 93 sitemap URLs, 11 topic files, 63 images, zero errors. Fifteen existing runtime status pages remain noindex/follow and unlisted.
- The checker now verifies all eight published blog articles and their actual images/dates. Its released docs/library expectation is 76 URLs, accounting for the current main library inventory and this new guide. No existing blog content or product UI was changed.
