# Chorono Web

A minimal Next.js project for Chorono - Time is Everything.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Public pages and SEO

The canonical site is `https://www.chorono.com/`. The homepage focuses on the animation editor and creation with AI agents. `/getting-started` and `/agent-skills` explain installation, MCP connection and editable animation workflows.

- `lib/site.ts` centralizes the site identity, canonical URLs, Open Graph/Twitter cards and page-specific JSON-LD. See the [JSON-LD field map](docs/structured-data.md) for entities, fields and relationships.
- `app/robots.ts` serves `/robots.txt`; `app/sitemap.ts` lists the public editor, setup, blog, example and animation fundamentals pages.
- `/keyframe-animation` explains real values in the existing Ideas in motion project; `/animation-easing` adds an accessible, manually scrubbed comparison of the cubic runtime presets. Both preserve the existing example files and link to editor setup.
- `app/manifest.ts` supplies app icons and theme information. Vercel preview deployments use `noindex` metadata.
- `public/icon.svg` is the editable source for the existing copper C brand. Run `npm run brand:build` to regenerate the favicon, Apple/app icons, sharing image and article-specific guide covers.
- After building and starting the site, run `npm run seo:check`. Pass a different origin with `npm run seo:check -- https://www.chorono.com` to validate the deployment.

The software markup describes the public project without inventing ratings or reviews. Structured data does not guarantee Google rich results; eligibility and appearance require separate validation after deployment.

`npm test` checks that unavailable, rate-limited or malformed GitHub API responses cannot crash the landing page's star counter. Homepage structured data is rendered on the server before the interactive component.

## Project Structure

```
chorono-web/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── package.json
├── tsconfig.json
└── next.config.js
```

## Mobile landing page and GitHub support

`components/LandingPage.tsx` constrains runtime/Android grid cards with a zero minimum width and a single explicit mobile column. Code samples retain their own horizontal scrolling; the page is not globally clipped. The decorative timeline uses a narrower mobile layer column and a shrinkable track.

The existing GitHub button is visible on mobile and labeled “Star on GitHub”. It reuses the public star loader. Only button activation sends `github_star_click`; loading the count sends no event. This event measures outbound intent, not a completed star. Actual starring still happens on GitHub; no user authorization or automatic starring is added.

Validation: `npm test` (4 passing), `npm run build`, browser width checks at 320/375/390/768/1440px, and visual inspection of the 320px hero and 390px runtime cards. Getting started, agent skills, blog, text animation and animation easing were also checked at 390px. The production site requires deployment of these changes.

## Landing page copy consistency

The hero states that Chorono is installed on the visitor’s computer and opened in a browser. Its installation CTA continues to use `/getting-started` and records `editor_setup_click` with the hero placement. Runtime/Android integration examples and editor feature cards have separate sections; editor features do not imply SDK support. The Android dependency example consistently names `app/build.gradle.kts` and identifies Kotlin DSL. These copy changes do not change installation behavior or SDK compatibility.


## English docs and animation library

The website owns `/docs`, `/animations` and topic sitemaps. The animation editor stays in its separate repository. See [migration, local preview and validation](docs/plans/docs-library-migration.md), [docs architecture](docs/plans/english-docs-interface.md) and [library/sitemap ownership](docs/plans/animation-library-and-sitemaps.md). The new content remains noindex during local review; no deployment is performed by these commands.

Run `npm test`, `npm run build`, then `npm run start -- --hostname 127.0.0.1 --port 2011`. Open `/docs`, `/animations` and `/sitemap-preview.xml`. Stop the owned server before building again.

## Interactive homepage crew

The homepage plays an editable, transparent Chorono scene with four distinct characters, curved limbs, squash/stretch and mouse/keyboard/touch responses. Hover the characters or the two existing hero CTAs; click a CTA for short feedback before navigation. Reduced motion starts paused. See [native scene sources, lifecycle and re-authoring](docs/plans/hero-crew.md). The public scene and alpha poster are in `public/hero/`; authoring recipes live in `scene-source/hero-crew/` and run only through MCP.

The hero has [a project detail/download page](docs/plans/hero-project-discovery.md) and
[interaction events](docs/plans/hero-analytics.md). Open `/?crewDebug=1` locally to inspect
character dwell, non-overlapping engagement and actual native motion events. The latest idle
loop gives Pip a wave, Milo a stretch, Fig a jelly-like breath and Dot a lens/antenna scan.
