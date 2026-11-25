import type { CanvasRenderAdapter, RenderAdapter, RenderFrame } from '@chorono/runtime'

type Scene = RenderFrame['scene']
type Layer = Scene['layers'][number]

function frameValue(frame: RenderFrame, layer: Layer, property: string, fallback: number) {
  const value = frame.overrides.get(`layers.${layer.id}.${property}`)
  return typeof value === 'number' ? value : fallback
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return { canvas, context: canvas.getContext('2d')! }
}

/** Apply the state-machine transform to the spline, then cover it in stage space. */
export function makeHeroPanelRenderer(
  context: CanvasRenderingContext2D, scene: Scene, NativeAdapter: typeof CanvasRenderAdapter,
): RenderAdapter {
  const { width, height } = scene.composition
  const profile = scene.layers.find(layer => layer.name === 'Hero / master S profile')?.spline
  if (!profile) throw new Error('Hero panel outline unavailable')
  const [contour] = Object.values(profile.contours)
  const [topLeft, topRight, bottomRight, bottomLeft] = contour.pointIds.map(id => profile.points[id])
  const handles = Object.values(profile.handles)
  const from = handles.find(handle => handle.pointId === topRight.id && handle.kind === 'out')!
  const to = handles.find(handle => handle.pointId === bottomRight.id && handle.kind === 'in')!
  const edge = new Path2D()
  edge.moveTo(topRight.x, topRight.y)
  edge.bezierCurveTo(from.x, from.y, to.x, to.y, bottomRight.x, bottomRight.y)
  const outline = new Path2D()
  outline.moveTo(topLeft.x, topLeft.y)
  outline.lineTo(topRight.x, topRight.y)
  outline.bezierCurveTo(from.x, from.y, to.x, to.y, bottomRight.x, bottomRight.y)
  outline.lineTo(bottomLeft.x, bottomLeft.y)
  outline.closePath()

  const groups = scene.layers.filter(layer => layer.type === 'group' && layer.name.endsWith(' / UV panel'))
  const groupIds = new Set(groups.map(group => group.id))
  const panels = groups.map(group => {
    const children = scene.layers.filter(layer => layer.parentId === group.id)
    return {
      group,
      images: children.filter(layer => layer.image),
      stroke: children.find(layer => layer.type === 'spline')?.style?.stroke,
    }
  })
  const firstPanel = scene.layers.indexOf(groups[0])
  const backdropScene = { ...scene, layers: scene.layers.slice(0, firstPanel) }
  const overlayScene = {
    ...scene,
    composition: { ...scene.composition, backgroundColor: 'transparent' },
    layers: scene.layers.slice(firstPanel).filter(layer => !groupIds.has(layer.parentId ?? layer.id)),
  }
  const backdrop = makeCanvas(width, height)
  const overlay = makeCanvas(width, height)
  const paintBackdrop = new NativeAdapter(backdrop.context)
  const paintOverlay = new NativeAdapter(overlay.context)
  let hasBackdrop = false

  return {
    render(frame) {
      if (!hasBackdrop) {
        paintBackdrop.render({ ...frame, scene: backdropScene })
        hasBackdrop = true
      }
      context.drawImage(backdrop.canvas, 0, 0)

      for (const { group, images, stroke } of panels) {
        const x = frameValue(frame, group, 'transform.x', group.transform.x)
        const y = frameValue(frame, group, 'transform.y', group.transform.y)
        const sx = frameValue(frame, group, 'transform.scaleX', group.transform.scaleX)
        const sy = frameValue(frame, group, 'transform.scaleY', group.transform.scaleY)
        const bottom = y + bottomLeft.y * sy
        const left = Math.max(0, x), top = Math.max(0, y)
        const cropWidth = Math.min(width, x + topRight.x * sx) - left
        const cropHeight = Math.min(height, bottom) - top
        if (cropWidth <= 0 || cropHeight <= 0) continue

        const transform = new DOMMatrix([sx, 0, 0, sy, x, y])
        const clip = new Path2D()
        clip.addPath(outline, transform)
        context.save()
        context.clip(clip)
        context.fillStyle = '#111b24'
        context.fillRect(left, top, cropWidth, cropHeight)
        for (const layer of images) {
          const opacity = frameValue(frame, layer, 'opacity', layer.opacity)
          const image = frame.assets.get(layer.image!.assetId)
          if (opacity <= 0 || !(image instanceof HTMLImageElement)) continue
          const scale = Math.max(cropWidth / image.naturalWidth, cropHeight / image.naturalHeight)
          const imageWidth = image.naturalWidth * scale
          const imageHeight = image.naturalHeight * scale
          const headroom = Math.min(1, Math.max(0, (cropWidth - 700) / 400))
          context.globalAlpha = opacity
          context.drawImage(image, left + (cropWidth - imageWidth) / 2,
            top + (cropHeight - imageHeight) * (.5 - headroom * .39), imageWidth, imageHeight)
        }
        context.restore()

        if (stroke) {
          const rim = new Path2D()
          rim.addPath(edge, transform)
          const gradient = context.createLinearGradient(0, y, 0, bottom)
          for (const stop of stroke.gradient?.stops ?? []) gradient.addColorStop(stop.offset, stop.color)
          context.strokeStyle = stroke.gradient ? gradient : stroke.color
          context.lineWidth = stroke.width
          context.stroke(rim)
        }
      }

      paintOverlay.render({ ...frame, scene: overlayScene })
      context.drawImage(overlay.canvas, 0, 0)
    },
  }
}
