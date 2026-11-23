import Image from 'next/image'

type EditorialScreenshotProps = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

/** Displays an editor capture with responsive sizing and a link to its original. */
export default function EditorialScreenshot({ src, alt, caption, width, height }: EditorialScreenshotProps) {
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-[#d9bca9] bg-white">
      <a href={src} target="_blank" rel="noopener" aria-label={`Open full-size screenshot: ${alt}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#8F3D27]">
        <Image src={src} alt={alt} width={width} height={height} loading="lazy" sizes="(max-width: 816px) calc(100vw - 48px), 768px" className="h-auto w-full" />
      </a>
      <figcaption className="border-t border-[#e7d8cf] bg-[#faf7f4] px-5 py-4 text-sm leading-6 text-[#6d5a52]">
        {caption} <a href={src} target="_blank" rel="noopener" className="font-semibold text-[#8F3D27] underline underline-offset-4">Open full-size screenshot</a>
      </figcaption>
    </figure>
  )
}
