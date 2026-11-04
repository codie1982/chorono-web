# JSON-LD field map

The site embeds one page-specific JSON-LD graph in each rendered HTML page. `lib/site.ts` defines the data and stable entity IDs; `components/StructuredData.tsx` serializes it safely. `SITE_PAGES` supplies guide metadata, visible headings and the schema fields together.

| Entity | Fields | Source and meaning |
| --- | --- | --- |
| `WebSite` | `@id`, `name`, `alternateName`, `url`, `description`, `inLanguage`, `image`, `about` | Chorono site identity, logo and relationship to the application |
| `SoftwareApplication` | `@id`, `name`, `alternateName`, `url`, `description`, `applicationCategory`, `operatingSystem`, `image`, `isAccessibleForFree`, `license`, `sameAs`, `installUrl`, `softwareHelp`, `offers`, `featureList` | The open-source editor, supported platforms, license, free source access, setup guide and features visible on the site |
| `WebPage` | `@id`, `url`, `name`, `description`, `inLanguage`, `isPartOf`, `about`, `primaryImageOfPage`, `mainEntity`, `breadcrumb` on guides | This exact canonical page and its primary subject |
| `TechArticle` | `@id`, `url`, `headline`, `image`, `description`, `articleSection`, `dependencies`, `proficiencyLevel`, `inLanguage`, `isAccessibleForFree`, `mainEntityOfPage`, `isPartOf`, `about` | Guide H1, visible guide cover and H2 sections, stated prerequisites and beginner level |
| `BreadcrumbList` | `@id`, `itemListElement` with `@type`, `position`, `name`, `item` | The visible two-step trail from Chorono to the current guide |
| `ImageObject` | `@id`, `url`, `contentUrl`, `width`, `height`, `caption`, `encodingFormat` | The 512×512 logo, 1200×630 homepage image, and each guide's visible 1200×675 cover |

## Page relationships

- `/`: its `WebPage.mainEntity` points to `/#software`.
- `/getting-started`: its `WebPage.mainEntity` points to `/getting-started#article`; the article is about `/#software`.
- `/agent-skills`: its `WebPage.mainEntity` points to `/agent-skills#article`; the article is about `/#software`.
- Every page belongs to `/#website`. Entity references resolve inside the same graph.
- Guide `BreadcrumbList` data matches the visible trail. All canonical URLs use `https://www.chorono.com`.
- Guide `TechArticle.image`, page metadata and the visible cover reference the same article-specific image.
- The homepage JSON-LD is server-rendered outside the interactive landing page. Optional GitHub star data is validated before rendering; failed or rate-limited responses preserve the page and link.

`offers.price: 0` describes free access to the public source; it does not assert a paid service or subscription. No ratings, reviews, contact details, organization ownership, author attribution or publication dates are inferred. Add those only when the site has verified, visible supporting information.

## Verification

Build the site, start the production server, then run `npm run seo:check -- http://127.0.0.1:3217`. After deployment, run `npm run seo:check -- https://www.chorono.com`.

The check parses the actual HTML and verifies unique IDs, resolved entity references, canonical URLs, page-specific main entities, guide headings/sections and visible breadcrumbs. It also checks the existing metadata, sitemap and image assets. This is an implementation check, not a claim of Google rich-result eligibility.

Run `npm test` for GitHub API failure regressions. Use the [Google Rich Results Test](https://search.google.com/test/rich-results) separately to inspect Google's rendered output and eligibility warnings. Optional author and aggregate-rating data must come from real, verifiable information; their absence must not be hidden with fabricated data.

Schema references: [WebSite](https://schema.org/WebSite), [SoftwareApplication](https://schema.org/SoftwareApplication), [WebPage](https://schema.org/WebPage), [TechArticle](https://schema.org/TechArticle), [BreadcrumbList](https://schema.org/BreadcrumbList), [ImageObject](https://schema.org/ImageObject).
