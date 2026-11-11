# Editor guide expansion — 11 November 2026

The website adds 39 task-focused guides to the 28-page documentation tree (67 articles total). An explicit `parentSlug` groups articles without deriving or moving their URLs. The 11 established articles are protected by `legacy-pages.json`: slug, source, title, description and source SHA-256 remain unchanged. Existing marketing pages retain their broad acquisition intent. New docs answer how to perform a particular operation in Chorono.

## Research evidence

OpenSEO project: `016339b3-2965-4937-bf53-ea847cd51952`, chorono.com. The connected tool endpoint was unavailable, so the existing local OpenSEO launcher configuration was used to reach the same authorized server through a loopback SSH tunnel. No credential or server configuration was changed.

- DataForSEO metrics: United States (2840), English. 61 initial terms plus 3 focused follow-ups; 42 returned rows, 22 without a returned row. Missing results remain unknown rather than zero.
- The 8 November keyword research was reused for existing topics. Retrieval dates and the latest trend month are recorded separately in `editor-guides-keywords-2026-11-11.csv`; November retrieval does not imply November search volume.
- Six fresh SERPs: dope sheet animation, animation onion skin, radial array, animation expressions, sprite sheet animation, spline editor.
- GSC was not connected (`gsc_oauth_not_configured`). No first-party query performance or verified indexing claim is made.
- Credit totals were not returned in the tool metadata. No invented cost is recorded. The focused batch was below the tool's 2,000-credit confirmation threshold.

The page map records a researched primary topic and media for each new detailed guide. Closely related tasks remain grouped under their parent rather than creating keyword-spelling variants. Provider intent labels are a signal; editorial intent is based on the query results, the actual controls and the reader's task.

## Search-intent decisions

| Topic | Observed pattern | Content decision |
| --- | --- | --- |
| Dope Sheet | Keyframe overview and timing tutorials, including Blender documentation | Explain timing rows and moving a beat; link to curves for value changes. |
| Onion skin | Mixed studio-brand and ghost-frame results | Use onion skinning and Chorono's Ghost control together; explain pose spacing. |
| Radial array | Circular duplication in 3D/CAD tools | Explain Chorono's 2D placement, count, pivot and orientation with its real dialog. |
| Animation expressions | Formula tutorials plus unrelated facial-expression intent | Qualify as property wires; show supported expression syntax, not a general scripting claim. |
| Sprite sheet animation | Frame slicing, layout and playback questions | Cover frame layout/timing and distinguish media import from native editable tracks. |
| Spline editor | Strong Spline product/3D brand intent | Describe Chorono Bézier point editing and spline objects explicitly. |

SERP responses included opaque Google redirect destinations. Titles and snippets support these intent observations; they do not justify exact competitor URL/ranking claims. Research is used to answer tasks naturally, not to repeat a keyword throughout a page.

## Component evidence and ownership

New captures import production components into the separate editor repository's `src/components/documentation-tests` host. Each page uses its own synthetic scene, real `useEditorState` and command history on port 4322. No connection to the user's editor or MCP session is made. The maintainer entry point is `docs/tr/documentation-panel-host.md` in `chorono-editor`.

The screenshot allowlist stores actual image dimensions. Captures show real controls, including disabled/coming-soon states. No copied interface mockups or invented screenshots are used. Runtime, integration and export availability remain explicit; React/Vue examples wrap the published JavaScript runtime and do not imply separate published native SDKs.

## Verification

- Legacy route/metadata/source-hash checks; every guide has a source and one sitemap topic.
- Parent reachability, same-section ancestry, duplicate/cycle rejection and incoming related-guide coverage.
- All new detailed-guide images resolve to real allowlisted files with alt text.
- Local production crawl: 67 articles, no broken internal links, no duplicate titles/descriptions.
- SEO script passed for existing public pages and release-gated sitemap policy.
- Browser: desktop and mobile navigation, article images and nested active states reviewed.
- Editor: 2,838 tests, MCP build and Next production build passed. Browser history checks cover spreadsheet value edits, keyframe dragging, Array and particle presets; PNG import also succeeded.

Changes are prepared locally. Publication remains a separate action. Search engine indexing and rankings cannot be guaranteed by local checks.
