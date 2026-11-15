# Animation library SEO decisions — 15 November 2026

## Scope and source

This is a focused content review of `/animations` and `/animations/one-bar-every-beat`, not a domain-wide SEO audit. The site and target copy are English; the market checked was United States, English, Google desktop. DataForSEO Labs keyword overview task `11150949-2404-0607-0000-f681cc7fd1af` returned 17 of 20 requested phrases (confirmed cost $0.01404). Its `search_volume` field is an estimated monthly query volume, not site traffic or a ranking forecast. The three requests with no returned row — `beat synced animation`, `animation project file`, and `editable animation templates` — have unknown volume here, not zero volume.

| Query | Estimated US searches/month | Reported intent | Page fit |
| --- | ---: | --- | --- |
| motion graphics examples | 590 | informational | Collection page; plural examples |
| motion design examples | 590 | informational | Collection page; related wording |
| kinetic typography examples | 170 | informational | Showreel technique explanation |
| kinetic typography animation | 110 | informational | Showreel technique explanation |
| motion design showreel | 10 | informational | Specific showreel, small query |
| motion graphics showreel | 10 | informational | Specific showreel, small query |
| looping animation | 480 | informational | Loop explanation; broad query |
| motion graphics software | 6,600 | transactional | Poor fit for an example page |
| AI motion graphics | 480 | informational | Ambiguous; avoid an unsupported AI-generation claim |

The keyword rows were retrieved on 15 November 2026; their provider update times vary from September to November 2026. Volumes, intent labels and difficulty are provider estimates. No Search Console clicks, impressions, positions or indexing status were available in this review.

Two DataForSEO Google organic live SERPs were checked on 15 November 2026 at 10 results each: `motion graphics examples` (task `11150951-2404-0139-0000-3549b6bf7ed9`, confirmed cost $0.002) and `kinetic typography examples` (task `11150951-2404-0139-0000-3ecc4738b4b5`, confirmed cost $0.002). The former returned inspiration lists and creative project collections; the latter returned tutorials, definitions and example collections. One result in the English-market sample was in German, so the returned listings support a broad intent read rather than a precise English-only competitor comparison. An earlier two-query response could not be parsed; its billing status was not confirmed. The confirmed cost for the three retained tasks is $0.01804.

## Editorial decision

- Aim the `/animations` title, introduction and heading at **motion graphics examples** because a collection satisfies the plural query. Keep the downloadable, editable nature explicit.
- Aim the showreel title and explanation at a **single motion graphics example** and its kinetic typography, 2D-to-3D, data/UI and loop techniques. Explain the visible 0–15-second sequence so the page offers more than a video embed.
- Keep the exact production prompt unchanged. The rendered film, editable project and prompt are distinct assets; page copy must not claim that editor playback matches the MP4 frame for frame.
- Add `VideoObject` only to the watch page, using the actual MP4, poster and source duration. The publication timestamp is the merge commit that first added the video to the site repository (`5059a441`, 15 November 2026, 11:49:21 +03:00). Do not mark a 15-second clip as a Google key-moments `Clip`; that feature has a 30-second minimum.
- Keep `robots.txt` pointing to the canonical sitemap index. The existing sitemap inventory automatically includes the showreel URL once in `sitemap-animations.xml`; the MP4 and project downloads are assets, not HTML sitemap entries.

## Verification limit

The edits can verify crawl directives, canonical URLs, structured data fields, rendered copy and asset availability. They cannot establish Google indexing or improved rankings. Check Search Console after recrawl for the actual query/page pair and video indexing feedback before treating this as a traffic gain.
