import type { RenderAdapter, RenderFrame } from '@chorono/runtime'

type Scene = RenderFrame['scene']
type Layer = Scene['layers'][number]
type Spline = NonNullable<Layer['spline']>
type ScalarBinding = { key: string; target: { x: number; y: number }; axis: 'x' | 'y'; base: number }
const SPLINE_SCALAR = /^layers\.([^.]+)\.spline\.(points|handles|segments)\.([^.]+)\.(?:(control1)\.)?(x|y)$/

/** Bridges evaluated native spline coordinates to the published 0.1.0 canvas renderer.
 * That renderer reads spline records directly while the player returns their animation in overrides.
 * This adapter copies only spline records, compiles writable scalar references once, and projects
 * native values before delegating drawing. It does not evaluate animation or convert paths.
 *
 * Source scenes stay immutable. One instance owns reusable mutable render records/frame; the
 * delegate consumes them synchronously and must not retain snapshots. Scene identity changes
 * rebuild those records. Missing overrides reset to authored values, preventing stale geometry.
 * Remove this feature-scoped bridge when the published SDK materializes spline overrides itself.
 */
export class NativeSplineFrameAdapter implements RenderAdapter {
  private source: Scene | null = null
  private projected: Scene | null = null
  private bindings: ScalarBinding[] = []
  private forwarded: RenderFrame | null = null

  /** Borrows a synchronous native renderer; its canvas/resource ownership remains with the caller. */
  constructor(private readonly delegate: Pick<RenderAdapter, 'render'>) {}

  /** Projects only precompiled point, handle and quadratic-control scalars; delegates all drawing. */
  render(frame: RenderFrame): void {
    if (frame.scene !== this.source) this.compile(frame.scene)
    for (const binding of this.bindings) {
      const value = frame.overrides.get(binding.key)
      binding.target[binding.axis] = typeof value === 'number' && Number.isFinite(value) ? value : binding.base
    }
    if (!this.forwarded) this.forwarded = { ...frame, scene: this.projected! }
    else {
      this.forwarded.timeMs = frame.timeMs
      this.forwarded.overrides = frame.overrides
      this.forwarded.paramValues = frame.paramValues
      this.forwarded.assets = frame.assets
    }
    this.delegate.render(this.forwarded)
  }

  /** Allocates isolated spline records and resolves supported native targets once per scene.
   * Unknown animated spline channels fail explicitly instead of silently drawing frozen geometry.
   */
  private compile(scene: Scene): void {
    const splines = new Map<string, Spline>()
    const layers = scene.layers.map(layer => {
      if (!layer.spline) return layer
      const spline = structuredClone(layer.spline)
      splines.set(layer.id, spline)
      return { ...layer, spline }
    })
    const bindings: ScalarBinding[] = [], seen = new Set<string>()
    for (const timeline of scene.timelines) for (const track of timeline.tracks) {
      if (!track.target.includes('.spline.') || seen.has(track.target)) continue
      seen.add(track.target)
      const match = SPLINE_SCALAR.exec(track.target)
      if (!match) throw new Error(`Unsupported hero spline channel: ${track.target}`)
      const [, layerId, table, id, control, coordinate] = match
      const spline = splines.get(layerId)
      if (!spline) throw new Error(`Missing hero spline layer: ${layerId}`)
      let target: { x: number; y: number } | undefined
      if (table === 'points' && !control) target = spline.points[id]
      else if (table === 'handles' && !control) target = spline.handles[id]
      else if (table === 'segments' && control) target = spline.segments[id]?.control1
      const axis = coordinate === 'x' ? 'x' : 'y'
      if (!target || !Number.isFinite(target[axis])) throw new Error(`Missing hero spline scalar: ${track.target}`)
      bindings.push({ key: track.target, target, axis, base: target[axis] })
    }
    this.source = scene
    this.projected = { ...scene, layers }
    this.bindings = bindings
    this.forwarded = null
  }
}
