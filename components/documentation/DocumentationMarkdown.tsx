import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  documentationHeadingIds,
  resolveDocumentationLink,
} from '@/lib/documentation/content'
import firstAnimationPreview from '@/public/examples/first-animation.png'
import { CodeBlock } from './CodeBlock'
import { DocumentationScreenshot } from './DocumentationScreenshot'
import { findDocumentationScreenshot } from '@/lib/documentation/screenshots'

/** Safely renders repository GFM with local documentation and reviewed asset URLs.
 * Standalone captures become captioned figures; inline images remain phrasing content.
 * Article Markdown owns descriptions, while the screenshot allowlist supplies dimensions.
 * Existing scene previews remain supported and raw HTML/script execution stays disabled.
 */
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
        // Only standalone images become figures. Inline images remain valid phrasing content.
        p: ({ node, children }) => {
          const child = node?.children.length === 1 ? node.children[0] : undefined
          if (child?.type === 'element' && child.tagName === 'img') {
            const { src, alt, title } = child.properties
            const screenshot = typeof src === 'string' ? findDocumentationScreenshot(resolveDocumentationLink(src, source)) : undefined
            if (screenshot) return <DocumentationScreenshot image={screenshot} alt={typeof alt === 'string' ? alt : ''} caption={typeof title === 'string' ? title : undefined} />
          }
          return <p>{children}</p>
        },
        img: ({ src = '', alt = '', title }) => {
          const screenshot = findDocumentationScreenshot(resolveDocumentationLink(src, source))
          return <img
            src={screenshot?.href ?? (src.includes('examples/first-animation/preview.png') ? firstAnimationPreview.src : src)}
            alt={alt}
            title={title}
            width={screenshot?.width}
            height={screenshot?.height}
            loading="lazy"
          />
        },
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
