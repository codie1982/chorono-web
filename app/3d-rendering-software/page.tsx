import { ProductModePage, productModeMetadata } from '@/components/ProductModePage'
import { productModePages } from '@/lib/product-mode-pages'

const mode = productModePages.render
export const metadata = productModeMetadata(mode)

export default function RenderingPage() {
  return <ProductModePage mode={mode} />
}
