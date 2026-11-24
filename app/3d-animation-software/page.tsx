import { ProductModePage, productModeMetadata } from '@/components/ProductModePage'
import { productModePages } from '@/lib/product-mode-pages'

const mode = productModePages.modeling
export const metadata = productModeMetadata(mode)

export default function ModelingPage() {
  return <ProductModePage mode={mode} />
}
