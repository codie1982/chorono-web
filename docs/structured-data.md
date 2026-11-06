# JSON-LD field map

The site embeds one page-specific JSON-LD graph in each rendered HTML page. `lib/site.ts` defines the data and stable entity IDs; `components/StructuredData.tsx` serializes it safely. `SITE_PAGES` supplies guide metadata, visible headings and the schema fields together.

| Entity | Fields | Source and meaning |
| --- | --- | --- |
| `WebSite` | `@id`, `name`, `alternateName`, `url`, `description`, `inLanguage`, `image`, `about` | Chorono site identity, logo and relationship to the application |
| `SoftwareApplication` | `@id`, `name`, `alternateName`, `url`, `description`, `applicationCategory`, `operatingSystem`, `image`, `isAccessibleForFree`, `license`, `sameAs`, `installUrl`, `softwareHelp`, `offers`, `featureList` | The open-source editor, supported platforms, license, free source access, setup guide and features visible on the site |
| `SoftwareApplication` (runtime) | `@id`, `name`, `softwareVersion`, `applicationCategory`, `applicationSubCategory`, `applicationSuite`, `operatingSystem`, `softwareRequirements`, `license`, `sameAs`, `installUrl`, `softwareHelp`, `offers`, `featureList` | A separate `/#runtime` entity for the published `@chorono/runtime` package; npm 0.1.0 and MIT license verified on 2026-11-04 |
| `Organization` (guide author) | `@id`, `name`, `url`, `logo` | User-confirmed author “Chorono ekibi”, linked to the visible `/#team` attribution |
| `WebPage` | `@id`, `url`, `name`, `description`, `inLanguage`, `isPartOf`, `about`, `primaryImageOfPage`, `mainEntity`, `breadcrumb` on guides | This exact canonical page and its primary subject |
| `TechArticle` | `@id`, `url`, `headline`, `author`, `image`, `description`, `articleSection`, `dependencies`, `proficiencyLevel`, `inLanguage`, `isAccessibleForFree`, `mainEntityOfPage`, `isPartOf`, `about` | Guide H1, confirmed author, visible guide cover and H2 sections, stated prerequisites and beginner level |
| `BreadcrumbList` | `@id`, `itemListElement` with `@type`, `position`, `name`, `item` | The visible two-step trail from Chorono to the current guide |
| `ImageObject` | `@id`, `url`, `contentUrl`, `width`, `height`, `caption`, `encodingFormat` | The 512×512 logo, 1200×630 homepage image, and each guide's visible 1200×675 cover |

## Page relationships

- `/`: its `WebPage.mainEntity` points to `/#software`.
- `/getting-started`: its `WebPage.mainEntity` points to `/getting-started#article`; the article is about `/#software`.
- `/agent-skills`: its `WebPage.mainEntity` points to `/agent-skills#article`; the article is about `/#software`.
- Every page belongs to `/#website`. Entity references resolve inside the same graph.
- The editor is `/#software`; the separately installable npm runtime is `/#runtime`. The runtime is defined on the homepage, where its installation and usage are visible. Guide main entities remain articles about the editor.
- Guide `author` points to `/#team`; the user confirmed the author name “Chorono ekibi”.
- Guide `BreadcrumbList` data matches the visible trail. All canonical URLs use `https://www.chorono.com`.
- Guide `TechArticle.image`, page metadata and the visible cover reference the same article-specific image.
- The homepage JSON-LD is server-rendered outside the interactive landing page. Optional GitHub star data is validated before rendering; failed or rate-limited responses preserve the page and link.

`offers.price: 0` describes free access to the public source/package; it does not assert a paid service or subscription. The guide author was confirmed by the user and is visible on the pages. Ratings, reviews, contact details and publication dates still require verified supporting information.

## Verification

Build the site, start the production server, then run `npm run seo:check -- http://127.0.0.1:3217`. After deployment, run `npm run seo:check -- https://www.chorono.com`.

The check parses the actual HTML and verifies unique IDs, resolved entity references, canonical URLs, page-specific main entities, guide headings/sections and visible breadcrumbs. It also checks the existing metadata, sitemap and image assets. This is an implementation check, not a claim of Google rich-result eligibility.

Run `npm test` for GitHub API failure regressions. Use the [Google Rich Results Test](https://search.google.com/test/rich-results) separately to inspect Google's rendered output and eligibility warnings. Optional author and aggregate-rating data must come from real, verifiable information; their absence must not be hidden with fabricated data.

Schema references: [WebSite](https://schema.org/WebSite), [SoftwareApplication](https://schema.org/SoftwareApplication), [WebPage](https://schema.org/WebPage), [TechArticle](https://schema.org/TechArticle), [BreadcrumbList](https://schema.org/BreadcrumbList), [ImageObject](https://schema.org/ImageObject).
## Animation fundamentals

`/keyframe-animation` and `/animation-easing` are distinct English TechArticles with visible Chorono team authorship, publication date, matching section headings and BreadcrumbList entities. Both reference the existing Ideas in motion CreativeWork and its portable JSON download. Reusing that example does not create a new animation or change its asset modification date. The easing explorer is an interactive SVG teaching aid, not a VideoObject or a separate software product. No review, FAQ rich-result or instant-generator claims are added.

Use-case editorial revisions are tracked per URL in `USE_CASE_CONTENT_UPDATED`. The visible update date, TechArticle `dateModified` and sitemap `lastModified` use that same value. Updating the motion graphics and text animation articles preserves their original publication dates, the kinetic typography article date and all downloadable scene modification dates.
