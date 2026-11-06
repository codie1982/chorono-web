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
