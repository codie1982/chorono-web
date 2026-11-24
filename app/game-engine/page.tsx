import { ProductModePage, productModeMetadata } from '@/components/ProductModePage'
import { productModePages } from '@/lib/product-mode-pages'

const mode = productModePages.game
export const metadata = productModeMetadata(mode)

export default function GameEnginePage() {
  return <ProductModePage mode={mode} />
}
