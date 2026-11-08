import Link from "next/link";
import {
  documentationHref,
  documentationPages,
} from "@/lib/documentation/manifest";
import type { loadDocumentation } from "@/lib/documentation/loader";
import { loadDocumentationExample } from "@/lib/documentation/loader";
import { DocumentationIcon as Icon } from "./DocumentationIcon";
import { DocumentationMarkdown } from "./DocumentationMarkdown";
import {
  DocumentationOverview,
  overviewHeadings,
} from "./DocumentationOverview";
import { TableOfContents } from "./TableOfContents";
import ScenePreview from "@/components/player/ScenePreview";
import { animationHref } from "@/lib/animation-library/catalog";
import { RelatedGuides } from "./RelatedGuides";
import { relatedGuidesHeading } from "@/lib/documentation/related";

type Article = NonNullable<Awaited<ReturnType<typeof loadDocumentation>>>;

/** Compose the readable server-rendered article with route-local navigation. */
export async function DocumentationArticle({ article }: { article: Article }) {
  const { page } = article;
  const index = documentationPages.findIndex((item) => item.slug === page.slug);
  const previous = documentationPages[index - 1];
  const next = documentationPages[index + 1];
  const home = !page.slug;
  const example = await loadDocumentationExample(page.slug);
  return (
    <div className={`cd-content-grid${home ? " cd-content-home" : ""}`}>
      <main id="docs-main" className="cd-main" tabIndex={-1}>
        <nav aria-label="Breadcrumb" className="cd-breadcrumb">
          <Link href="/docs">
            <Icon name="book" size={14} />
            Docs
          </Link>
          <Icon name="chevron" size={12} />
          <span>{page.group}</span>
          {!home && (
            <>
              <Icon name="chevron" size={12} />
              <span>{page.label}</span>
            </>
          )}
        </nav>
        <header className="cd-article-header">
          <span className="cd-eyebrow">
            {home ? "A LITTLE GUIDANCE. A LOT OF POSSIBILITY." : page.group}
          </span>
          <h1>
            {page.title}
            {home && <span className="cd-title-dot">.</span>}
          </h1>
          <div className="cd-lead">
            <DocumentationMarkdown
              markdown={article.introduction || page.description}
              source={page.source}
            />
          </div>
          <div className="cd-article-meta">
            {home ? (
              <>
                <span className="cd-meta-pill">
                  <span className="cd-status-dot" />
                  Free & open source
                </span>
                <span>Made to be edited</span>
              </>
            ) : (
              <>
                <span>
                  <Icon name="clock" size={13} />
                  {article.readingMinutes} min read
                </span>
                <span>Chorono handbook</span>
              </>
            )}
          </div>
        </header>
        {example && (
          <ScenePreview
            key={page.slug}
            exampleId={example.exampleId}
            title={example.title}
            initialTimeMs={example.initialTimeMs}
          />
        )}
        {home ? (
          <DocumentationOverview />
        ) : (
          <div className="cd-prose">
            <DocumentationMarkdown
              markdown={article.markdown}
              source={page.source}
            />
          </div>
        )}
        {example && (
          <p className="cd-animation-link">
            <Link href={animationHref(example.slug)}>
              View this animation and download its editable project →
            </Link>
          </p>
        )}
        <RelatedGuides slug={page.slug} />
        <div className="cd-article-footer">
          <a href="https://github.com/codie1982/chorono-web/tree/main/docs">
            <Icon name="code" size={15} />
            Browse documentation source <Icon name="external" size={12} />
          </a>
          <span>Keep making things move.</span>
        </div>
        <nav className="cd-pagination" aria-label="Documentation pages">
          {previous ? (
            <Link href={documentationHref(previous.slug)}>
              <span>← Previous</span>
              <strong>{previous.label}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              className="cd-pagination-next"
              href={documentationHref(next.slug)}
            >
              <span>Up next →</span>
              <strong>{next.label}</strong>
            </Link>
          )}
        </nav>
        <footer className="cd-page-footer">
          <span>© {new Date().getFullYear()} Chorono</span>
          <span>Open source. Open possibilities.</span>
        </footer>
      </main>
      <TableOfContents
        headings={[
          ...(home ? overviewHeadings : article.headings),
          relatedGuidesHeading,
        ]}
      />
    </div>
  );
}
