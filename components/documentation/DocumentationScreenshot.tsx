import Image from 'next/image'
import type { DocumentationScreenshot as Screenshot } from '@/lib/documentation/screenshots'
import { DocumentationIcon } from './DocumentationIcon'

/**
 * Render a real capture with reserved aspect ratio, responsive lazy loading and
 * a native full-size link. Source bytes remain unchanged; Next's image endpoint
 * supplies display variants. The article owns captions and alt text. Small
 * dialog captures never upscale past their intrinsic width. This server
 * component owns no listeners, modal state or additional animation runtime.
 */
export function DocumentationScreenshot({
  image,
  alt,
  caption,
}: {
  image: Screenshot
  alt: string
  caption?: string
}) {
  return (
    <figure className="cd-screenshot" style={{ maxWidth: image.width }}>
      <a
        className="cd-screenshot-link"
        href={image.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size screenshot: ${alt} (opens in a new tab)`}
      >
        <Image
          src={image.href}
          alt={alt}
          width={image.width}
          height={image.height}
          quality={90}
          loading="lazy"
          sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1120px) calc(100vw - 96px), 760px"
        />
        <span className="cd-screenshot-open" aria-hidden="true">
          Open full size <DocumentationIcon name="external" size={12} />
        </span>
      </a>
      <figcaption>{caption || alt}</figcaption>
    </figure>
  )
}
