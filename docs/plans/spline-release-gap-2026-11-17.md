# Spline, scripting and web main gap — 17 November 2026

## Git state

| Repository / checkout | Local `main` | Remote `main` | Gap now | Notes |
| --- | --- | --- | --- | --- |
| `chorono-web` | `d028a5b` | `d028a5b` | 0 commits | Updated from `9fa6020`; it had been 33 commits behind. |
| `chorono-web` older worktree `codex/docs-library-migration` | `5d2cae5` branch head | `d028a5b` | 5 commits behind | Its uncommitted files were left intact. This report and docs are in a fresh `codex/spline-docs-20261117` worktree based on current `main`. |
| `chorono-editor` | `a4d4e64` | `a4d4e64` | 0 commits | The local worktree has uncommitted Agent Handoff/MCP and early spline geometry work; none is a published spline release. |

The five `chorono-web` commits newer than the previous `origin/main` checkout are: shared site shell and expanded editor guides (`5e03e1e`), Vercel Web Analytics (`2d13b47`), a beat-locked animation-library showreel (`5059a44`), animation-library SEO updates (`68edb94`), and Codex guide/internal-link improvements (`d028a5b`). The full 33-commit gap since the former local `main` also includes the docs library, runtime guides, editable examples, AI setup guides, SEO/sitemaps and analytics. These are website and content changes. The compared `chorono-web` range does not add editor spline algorithms or script APIs.

## Spline and script source status

The inspected `chorono-editor` `main` currently supports point edits, segment insertion, contour open/close/reverse, adding independent contours to a spline, and Continue from an open endpoint. Its `SplineHandle` script API can append primitives, add contours, edit points/handles/segments, split a segment, change contour closure/direction and transform geometry. Source tests exercise these methods. Script operations for the requested new topology and Boolean tools are not present in this `main` snapshot.

The full requested Point/Edge/Object modes, dedicated Spline & Boolean panel, Auto Close setting, Connect/Weld/Refine/Divide and edge/copy/Attach/Detach workflows, Boolean preview/re-edit, real zoom-independent vertex snap and drawing from one open endpoint to another are being added separately. During this documentation work, uncommitted `src/lib/spline/modeling` helpers for Offset/Outline, corner treatment, contour sampling and animation guards appeared in the editor worktree. They are in-progress geometry sources, not commands in the inspected `main` commit or verified UI/script workflows. The inspected editor also still has both a quick Snap menu and detailed Snap panel, and both a shortcut modal and dock panel. The new docs release-preview route is therefore `coming-soon` and noindex; it must not be switched to a current-feature guide based on the request list alone.

## Next implementation and docs gate

1. Bring the new spline code into `chorono-editor` and verify every reported action against its actual UI, domain command and portable project shape. Recheck Undo/Redo, rejected animation/manual-edit conflicts, Boolean Apply/Cancel/re-edit and drawing at different zoom levels.
2. Expose the same validated operations through the script/MCP surface, with supported parameters, returned IDs, stale-revision behavior and explicit unsupported cases. Keep legacy Script Console and isolated MCP runner differences clear.
3. Update the release-preview document to current instructions only for verified features, then remove its `coming-soon` status and check the sitemap. Link the new Spline & Boolean panel to that page when the panel exists. The present point inspector, spline draw tool and Script Console already point to the verified helper pages.
4. Implement **Offset / Outline** with equidistant parallel contours, direction/distance and preview Apply/Cancel (user estimate: 3–5 workdays); **Chamfer** with straight/curved edge trimming and join (2–3 workdays); **Fillet** with radius, tangent joins and collision checks (estimate pending geometry scope). Add each to docs and script reference after its acceptance checks pass.
5. Run the editor's tests, MCP build, site tests/build, browser editing checks and link/metadata checks before a release or deployment. Do not infer a search ranking gain from keyword volume.

SEO evidence and content choices: [focused audit](spline-seo-opportunities-2026-11-17.md) and [keyword map](spline-keywords-2026-11-17.csv). Git comparison used the fetched `origin/main` and GitHub commit metadata on 17 November 2026. This is a source-state report, not a release announcement.
