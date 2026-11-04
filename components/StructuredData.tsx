import { pageStructuredData, type PagePath } from '@/lib/site'

export default function StructuredData({ path }: { path: PagePath }) {
  const json = JSON.stringify(pageStructuredData(path)).replace(/</g, '\\u003c')
  return <script id="chorono-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
