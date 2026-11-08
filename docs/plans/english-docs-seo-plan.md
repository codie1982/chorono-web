# English Docs SEO Audit and Content Plan — Nov 8, 2026

Migration note, November 8, 2026: this research/audit describes the original editor-hosted preview. The implementation now belongs to `chorono-web`; see [current migration and verification](docs-library-migration.md) and [current sitemap ownership](animation-library-and-sitemaps.md). Historical measurements are not new measurements of the migrated website.

Status: research and English Markdown sources prepared. The initial docs interface is now implemented for local review; see [interface architecture](english-docs-interface.md). Website addresses below remain publication proposals, and some advanced routes remain deferred. Existing public addresses retain their current topics.

Follow-up: [on-page audit and public appearance check](english-docs-onpage-audit-2026-11-08.md); [two-entry animation library and topic sitemap implementation](animation-library-and-sitemaps.md). These remain local previews, with no public deployment or Search Console submission.

Market: United States, English, DataForSEO location 2840. Search volumes are estimated monthly searches, not visits. The fresh batch requested 35 terms and returned 30 rows; five missing rows mean unknown demand. Monthly trend series end in August or September 2026 depending on the term. Retrieval on November 8 is not a November search-volume observation.

## Your next SEO move

- Build the English docs entry and first-animation path around a real editable project and a saved revision.
- Publish the loop tutorial as the first new task guide, using the existing three-dot example.
- Keep established product and fundamentals pages; link to precise editor instructions instead of duplicating their introductions.

## Recommendations

### 1. Give new users an accurate English docs entry and first edit

**Do this**

- Use [the English docs home](../en/README.md) and [first-animation source](../en/getting-started.md) for the first website design.
- Link installation to the current [setup page](https://www.chorono.com/getting-started) and skills to [their existing page](https://www.chorono.com/agent-skills).
- Use the existing eight-layer [first-animation project](../../examples/first-animation/README.md), with exact layer names and save/reopen instructions.

**Why**

- The former English introduction claimed no installation, included outdated requirements and assumed automatic browser saving.
- The verified installation source requires local setup; the new tutorial makes a saved portable project the explicit outcome.
- Clear handoffs could improve completion among existing visitors; there is no measured completion baseline or traffic-gain estimate.

| Evidence checked on Nov 8, 2026 | Observed result | Decision |
| --- | --- | --- |
| Current website | 14 HTML pages in the sitemap; all 14 returned HTTP 200 and were reported indexable | Extend the site without an emergency indexing rewrite |
| Main public setup and skills pages | Both readable, index/follow, with a preferred URL matching the fetched page | Preserve the addresses and link into the docs |
| Repository first-animation project | 960 × 540, 4 seconds, 8 layers, 13 tracks, 51 keys | Reuse the maintained source, preview and instructions |
| Legacy `docs/en/sdks.md` | Example package and constructor differ from the runtime source | Keep out of the first docs release until corrected and exercised |

### 2. Make looping animation a practical first tutorial

**Do this**

- Use [Make a looping animation in Chorono](../en/loop-animation.md) as the source for proposed `/docs/animation/loops`.
- Explain the actual keyframe times, 180 ms stagger, matching rest positions and boundary inspection.
- Embed the existing Codex loop with manual playback controls and its portable source download.
- Keep the [Codex guide](https://www.chorono.com/blog/make-animations-with-codex) focused on agent setup and prompts; cross-link both guides.

**Why**

- The loop query includes tutorials and examples, while Chorono already has a working scene that supports a specific exercise.
- This creates a route from a technique question to an editable project and installation; new search visibility remains uncertain.
- It beats the particle tutorial because its example already exists and its endpoint values can be checked without a new animation production task.

| Query | Est. US searches/month | Organic difficulty, 0–100 | Evidence retrieval |
| --- | ---: | ---: | --- |
| looping animation | 480 | 0 | Fresh DataForSEO, Nov 8, 2026 |
| loading animation | 1,000 | 20 | Reused DataForSEO snapshot, Nov 8, 2026 |
| progress bar animation | 590 | 0 | Reused DataForSEO snapshot, Nov 8, 2026 |

These related queries overlap and serve different tasks. Do not add their volumes together. Difficulty 0 is a provider estimate, not a guarantee of an easy ranking. The existing loading and progress examples retain their public pages; the loop guide adds a different editing exercise.

### 3. Name editor references around actions and keep fundamentals together

**Do this**

- Use “Edit keyframes” and “Work with the timeline” for editor tasks rather than repeating the general definitions.
- Keep [keyframe animation](https://www.chorono.com/keyframe-animation) and [animation easing](https://www.chorono.com/animation-easing) as the explanatory owners.
- Place “JavaScript scene scripting” under Scripting and API; explain its authoring sandbox and time units immediately.

**Why**

- Keyframe and timeline terms have relevant demand, but current results mix animation tools, CSS and other meanings.
- “Animation scripting” has 480 estimated US searches/month but its results include screenplay writing and Lua requests.
- Task-specific headings qualify visitors; keyword density and high volume alone do not establish business value.

| Query | Est. US searches/month | Organic difficulty, 0–100 | Meaning found in Nov 8 results |
| --- | ---: | ---: | --- |
| animation keyframes | 880 | 13 | Tool education, CSS and animation fundamentals |
| animation timeline | 390 | 12 | Editing timelines, animated history graphics and developer APIs |
| animation scripting | 480 | 0 | Screenplay writing mixed with programming |
| javascript animation | 390 | 64 | Programming term; not equivalent to Chorono scene authoring |
| keyframe interpolation | 110 | 0 | Specific subtopic for the keyframe/easing family |

## Page ownership and English copy

Sidebar labels stay short. Search wording belongs in accurate titles, introductions and useful section headings; it does not need to appear in every navigation label. Existing acquisition pages answer selection and concept questions. Docs answer installation, editing, troubleshooting and integration tasks.

| Website destination | Role and primary task | English H1 | Title tag |
| --- | --- | --- | --- |
| Proposed `/docs` | Documentation hub; branded navigation, volume unknown | Chorono documentation | Chorono Docs: Editable 2D Animation Guides |
| Existing `/getting-started` | Install and connect; preserve current address | Your first editable animation | Preserve current setup title initially |
| Proposed `/docs/first-animation` | Make the first manual edit; tutorial intent | Create your first editable animation in Chorono | Create Your First 2D Animation &#124; Chorono Docs |
| Existing `/agent-skills` | Install and understand the two agent skills | Preserve current skills heading | Preserve current skills title initially |
| Proposed `/docs/editor/keyframes` | Edit a particular layer/property/time; keyframe cluster | Edit keyframes in Chorono | Edit Keyframes and Animation Tracks &#124; Chorono Docs |
| Proposed `/docs/editor/timeline` | Read tracks, timing and playback; timeline cluster | Work with the animation timeline | Animation Timeline and Playback &#124; Chorono Docs |
| Proposed `/docs/animation/loops` | Build/revise/check a loop; looping animation | Make a looping animation in Chorono | Make a Looping Animation &#124; Chorono Docs |
| Proposed `/docs/animation/particles` | Configure one emitter; particle animation | Create particle effects in Chorono | Particle Animation and Emitters &#124; Chorono Docs |
| Proposed `/docs/interactivity/state-machines` | Connect explicit states and transitions | Connect animation states and transitions | Animation State Machines &#124; Chorono Docs |
| Proposed `/docs/scripting` | Author native scenes with JavaScript | JavaScript scene scripting | JavaScript Scene Scripting &#124; Chorono Docs |
| Proposed `/docs/runtime/web` | Embed an exported scene with the actual runtime | Play a Chorono animation on the web | Web Animation Playback &#124; Chorono Docs |
| Proposed `/docs/troubleshooting` | Diagnose local setup and missing editor sessions | Troubleshoot Chorono and MCP | Chorono Setup and MCP Troubleshooting |

Proposed meta descriptions, the short summaries search engines may display:

- **Docs home:** Learn Chorono with editable animation examples. Install the editor, edit keyframes, build loops and connect Claude Code or Codex through MCP.
- **First animation:** Open an editable Chorono example, change its text and colors, inspect the timeline, then save and reopen your first 2D animation.
- **Loops:** Make a looping animation in Chorono. Inspect a three-dot example, adjust its keyframes and stagger, and check the loop boundary before saving.

First-animation sections: Before you start; Open the example; Find layers and tracks; Change text and color; Inspect timing; Save and reopen; Optional agent revision. Primary action: download the existing project, then save a visibly changed copy.

Loop sections: Open the example; Read timing; Reduce movement; Check the boundary; Optional agent revision; Save and reopen; Use a loading loop responsibly. Primary action: download the current Codex scene and reduce its peaks from y = 398 to 418 while preserving y = 438 rest positions.

The initial English navigation is **Getting Started · Editor · Animation · AI & MCP · Scripting & API · Examples · Troubleshooting · Releases**. These are browsing groups, not a list of exact search terms. Runtime and advanced guides need source verification before being exposed by the website navigation.

## What else we checked

| Opportunity | What we found | Decision |
| --- | --- | --- |
| Particle tutorial | particle animation 110/month, difficulty 3; particle effects 880/month, difficulty 19; mixed tool/game intent | Runner-up. Loop editing has an existing validated example; particles require a distinct demonstrated emitter exercise. |
| Canvas/runtime article | canvas animation 1,900/month, difficulty 24; results mix Canva and HTML canvas | Retain a precise runtime reference; a generic article would answer a much broader question. |
| Interactive/state-machine guide | interactive animation 320/month, difficulty 7; animation state machine 30/month, difficulty 0; game-engine intent appears | Useful advanced docs; validate the complete supported export/playback path before promising embeddable interaction. |
| Generic scripting article | animation scripting 480/month, difficulty 0; mixed story-writing/programming intent | Reject generic acquisition targeting; retain an accurate scene-scripting reference. |
| More text/motion acquisition pages | Existing text, motion-graphics, keyframe and easing pages have detailed distinct examples | Preserve and cross-link; no live ranking evidence justifies replacing their URLs or creating near-duplicates. |
| AI/MCP docs | codex animation 10/month, difficulty 4; no recorded rows for animation mcp or mcp animation | Keep setup and connection docs because they complete the product workflow, regardless of measurable search volume. |
| Technical maintenance | Crawl reported eight informational title/description length issues; no critical or warning issues | Review copy when relevant; no evidence that trimming these strings would materially grow traffic. |

## Website implementation requirements

- Render the article, title and navigation links as readable HTML; example playback is an enhancement.
- Use a single preferred public URL per article and matching canonical tags, the tags declaring that preferred address.
- Include only published, indexable articles in the sitemap; keep search/filter URLs out of it.
- Use real titles, descriptions, breadcrumb links and editorial dates; never fabricate ratings or freshness dates.
- Link from the existing setup, agent and fundamentals pages into the relevant new docs tasks.
- Preserve existing URLs during the first release. If a later move is justified, implement a permanent redirect and update internal links together.
- Keep heading anchors stable, code copyable and search usable with a keyboard. Test desktop and mobile reading layouts.
- Show real examples with a static initial view, play/pause controls and reduced-motion behavior.
- Test any structured data, machine-readable page descriptions, against the visible content. Markup is not a ranking guarantee.

## Publication and measurement

The source files prepared in the research step are the English docs home, revised first-animation tutorial and new loop tutorial. The subsequent interface work adds local `/docs` routes, search, contents navigation and native example playback, described in [the interface handoff](english-docs-interface.md). Public release and its indexing configuration remain separate. No public website was changed.

Before publishing, verify setup on the documented CLI version, exercise the manual edit/save/reopen flow, check every download and anchor, and inspect the real rendered pages at desktop and phone sizes. Recheck `docs/en/sdks.md` against the actual runtime package; its legacy `@chorono/web-sdk` and object-style constructor should not become new public instructions.

After publication, record the publish date and indexing state, then review complete 28-day windows. Use Search Console query/page impressions and clicks, plus measured example downloads and installation completions when instrumentation exists. First record a baseline; downloads are not proof of successful installation and search impressions are not conversions. Do not invent traffic, revenue or conversion forecasts from keyword volumes.

## How this report was made

Prepared using the [OpenSEO SEO Audit skill](https://openseo.so/docs/skills/seo-audit), run by Codex on November 8, 2026.

OpenSEO supplied DataForSEO metrics, live Google result blocks, domain/backlink orientation and a same-origin website crawl. Public HTML and portable projects were also read directly; repository menu labels, project contents and runtime constructor were checked against source. Tool estimates and editorial product-fit judgments are separate.

Coverage limits: the domain overview and ranked-keyword query returned no recorded footprint, not proof of zero traffic. OpenSEO's Search Console integration was unconfigured, and the separate property-list request was rejected by automatic approval review. No new first-party traffic baseline was obtained. Report-saving tools are not exposed by the current OpenSEO connection; this is a repository content plan, not a report saved in the OpenSEO report viewer.

<details>
<summary>Evidence and methodology</summary>

### Crawl and content review

Audit `5a3b95be-79c0-4923-a15c-b053994ee5bc`, completed November 8, 2026: 25 fetched URLs comprised 14 HTML pages and 11 JSON assets. The assets' empty titles/non-indexable status are not missing-title defects on HTML pages. All 14 HTML pages returned HTTP 200 and were reported indexable. The current sitemap also listed 14 pages. Lighthouse was not requested.

Read page families: setup and skills (`/getting-started`, `/agent-skills`); fundamentals (`/keyframe-animation`, `/animation-easing`); product/use-case discovery (`/text-animation`, `/motion-graphics-software`); practical examples (`/blog/make-animations-with-codex`, `/blog/progress-bar-and-success-animation`). No performing-versus-underperforming page claim is possible from an empty provider ranking sample.

Direct reads of those eight pages and the homepage returned HTTP 200, index/follow and preferred canonical URLs consistent with the fetched addresses. The homepage canonical omits the trailing slash. Robots allows public content and excludes `/api/`. The source site's current navigation links to setup, skills and examples; the docs release must add inbound links to new tasks.

The backlink overview reported 79 links and 77 referring domains with filtering enabled, but the sample and history do not establish their relevance or usefulness. No penalty, authority diagnosis or link-removal recommendation is made.

### Keyword data

The accompanying [35-term CSV](english-docs-keywords-2026-11-08.csv) preserves every requested fresh term, including missing rows, estimated volume, organic difficulty, provider intent and latest trend month. Full fresh response data and the original same-day 30-term example-keyword batch are retained in local evidence. The prior 5–6 November research log was reused for discovery and existing page ownership rather than re-purchased.

Five fresh missing terms: animation easing tutorial; animation mcp; mcp animation; chorono; chorono animation. Missing rows are unknown, not zero. Paid advertising competition and organic difficulty are different measures; advertising competition did not determine the page priorities. No overlapping query volumes were summed and no click-share or revenue calculation was made.

### Search-result observations

The live tool returns 20 mixed result blocks per query and exposes no depth argument. Only blocks typed organic were counted. Many organic URLs were opaque Google redirects, so exact destination domains and Chorono positions could not be verified. Do not report either a precise Chorono position or “not in the first 20 results.” These checks establish visible title-level intent only.

Initial batch, retrieved November 8, 2026, US/en. Precise per-query provider observation times were not returned:

| Query | Est. US searches/month | Organic blocks returned | Chorono position |
| --- | ---: | ---: | --- |
| animation keyframes | 880 | 14 | Unknown: opaque destination URLs |
| animation timeline | 390 | 16 | Unknown: opaque destination URLs |
| animation scripting | 480 | 15 | Unknown: opaque destination URLs |
| looping animation | 480 | 16 | Unknown: opaque destination URLs |
| particle animation | 110 | 15 | Unknown: opaque destination URLs |
| interactive animation | 320 | 16 | Unknown: opaque destination URLs |
| animation state machine | 30 | 16 | Unknown: opaque destination URLs |
| canvas animation | 1,900 | 16 | Unknown: opaque destination URLs |
| codex animation | 10 | 17 | Unknown: opaque destination URLs |

Follow-up checks were retrieved at 13:56:54 UTC on November 8 (16:56:54 Europe/Istanbul). Looping animation again returned 16 organic blocks; animation keyframes again returned 14. The loop titles changed between checks, while the leading keyframe titles remained similar. Both follow-ups still used opaque destination URLs, so Chorono positions remain unknown. These are same-day snapshots, not ranking trends.

### Sources and reproduction

- [Current sitemap](https://www.chorono.com/sitemap.xml) and [robots.txt](https://www.chorono.com/robots.txt).
- [Setup](https://www.chorono.com/getting-started), [skills](https://www.chorono.com/agent-skills), [keyframes](https://www.chorono.com/keyframe-animation), [easing](https://www.chorono.com/animation-easing).
- [Text animation](https://www.chorono.com/text-animation), [motion graphics](https://www.chorono.com/motion-graphics-software), [Codex example](https://www.chorono.com/blog/make-animations-with-codex), [progress and success](https://www.chorono.com/blog/progress-bar-and-success-animation).
- [Portable loading scene](https://www.chorono.com/examples/codex-loading-loop.chorono.json): 7,956 bytes, four layers, three tracks, 24 keys; first/last y = 438 on every animated track.
- [Maintained first-animation source](https://github.com/codie1982/chorono-editor/tree/main/examples/first-animation): eight layers, 13 tracks and 51 keys; reused without changing the animation.
- [Remotion Loop reference](https://www.remotion.dev/docs/loop): a comparator for task examples, duration semantics and API detail, not evidence of Chorono capability or a controlled ranking observation.
- [DataForSEO location reference](https://docs.dataforseo.com/v3/appendix-google-locations/): US country selection 2840; all fresh keyword and SERP calls used English explicitly.

Local raw responses, public HTML snapshots, two downloaded scenes and source extraction are under `outputs/docs-seo-2026-11-08/`. These files are ignored by Git; the linked public sources and the versioned CSV carry the durable evidence needed for this plan. No keyword tracking, advertising campaign, community post or publication was enabled.

</details>
