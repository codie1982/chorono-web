import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  documentationHeadingIds,
  resolveDocumentationLink,
} from '@/lib/documentation/content'
import firstAnimationPreview from '@/public/examples/first-animation.png'
import { CodeBlock } from './CodeBlock'

/** Render repository GFM safely; local docs/assets resolve to real preview URLs. */
export function DocumentationMarkdown({
  markdown,
  source,
}: {
  markdown: string
  source: string
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, documentationHeadingIds]}
      components={{
        a: ({ href = '', children, ...props }) => (
          <a {...props} href={resolveDocumentationLink(href, source)}>
            {children}
          </a>
        ),
        pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
        table: ({ children }) => (
          <div className="cd-table-scroll">
            <table>{children}</table>
          </div>
        ),
        img: ({ src = '', alt = '' }) => (
          <img
            src={
              src.includes('examples/first-animation/preview.png')
                ? firstAnimationPreview.src
                : src
            }
            alt={alt}
            loading="lazy"
          />
        ),
        h2: ({ children, id }) => (
          <h2 id={id}>
            {children}
            <a
              href={`#${id}`}
              aria-label="Link to this section"
              className="cd-heading-anchor"
            >
              #
            </a>
          </h2>
        ),
        h3: ({ children, id }) => (
          <h3 id={id}>
            {children}
            <a
              href={`#${id}`}
              aria-label="Link to this section"
              className="cd-heading-anchor"
            >
              #
            </a>
          </h3>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
