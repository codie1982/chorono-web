import AnimationExample from '@/components/AnimationExample'
import type { AnimationExampleId } from '@/lib/animation-example'

/**
 * Compact docs/library presentation of the existing website player. The shared
 * player owns loading, its frame clock, visibility pause and disposal. Native
 * runtime exports/posters are public assets; no editor implementation is imported.
 * Initial time is milliseconds in the scene's timeline. Playback is opt-in.
 */
export default function ScenePreview({ exampleId, title, initialTimeMs = 0 }: {
  exampleId: AnimationExampleId
  title: string
  initialTimeMs?: number
}) {
  return <AnimationExample key={exampleId} exampleId={exampleId} compact title={title} initialTimeMs={initialTimeMs} />
}
