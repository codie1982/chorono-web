'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './skill-catalog.module.css'

const controls = [
  { angle: -60, label: 'Turn left', status: 'Left −60°' },
  { angle: 0, label: 'Center', status: 'Centered at 0°' },
  { angle: 60, label: 'Turn right', status: 'Right +60°' },
] as const
type Angle = typeof controls[number]['angle']

const scene = { width: 1440, height: 810 }
const model = { x: 858, y: 198, width: 346, height: 480 }
const readout = { x: 1205, y: 758, width: 180, height: 31 }
const signal = { x: 1215, y: 769, size: 12 }
const columns = 7
const indicators = { x: 6 * model.width, y: 5 * model.height }

function drawRadar(context: CanvasRenderingContext2D, atlas: HTMLImageElement, angle: number, target: Angle, pulse: number) {
  const frame = Math.round((angle + 60) / 3)
  const indicator = (target + 60) / 60
  context.drawImage(atlas, (frame % columns) * model.width, Math.floor(frame / columns) * model.height, model.width, model.height,
    model.x, model.y, model.width, model.height)
  context.drawImage(atlas, indicators.x, indicators.y + indicator * readout.height, readout.width, readout.height,
    readout.x, readout.y, readout.width, readout.height)
  context.globalAlpha = pulse
  context.drawImage(atlas, indicators.x, indicators.y + 3 * readout.height, signal.size, signal.size,
    signal.x, signal.y, signal.size, signal.size)
  context.globalAlpha = 1
}

export function CoastalRadarDemo({ poster, posterAlt }: { poster: string; posterAlt: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const atlas = useRef<Promise<HTMLImageElement> | null>(null)
  const frame = useRef(0)
  const request = useRef(0)
  const angle = useRef(0)
  const [selected, setSelected] = useState<Angle>(0)
  const [status, setStatus] = useState('Centered at 0°')

  useEffect(() => () => {
    request.current += 1
    cancelAnimationFrame(frame.current)
  }, [])

  async function turn(target: Angle) {
    const turnRequest = ++request.current
    if (!atlas.current) {
      setStatus('Loading the radar…')
      const image = new Image()
      image.src = '/agent-skill-examples/coastal-radar/radar-frames.webp'
      atlas.current = image.decode().then(() => image)
    }

    let image: HTMLImageElement
    try {
      image = await atlas.current
    } catch {
      if (turnRequest !== request.current) return
      atlas.current = null
      setStatus('The radar could not load. You can watch the preview below.')
      return
    }

    if (turnRequest !== request.current) return
    const context = canvas.current?.getContext('2d')
    if (!context) {
      setStatus('The radar canvas is unavailable. You can watch the preview below.')
      return
    }
    cancelAnimationFrame(frame.current)
    setSelected(target)
    setStatus(controls.find(control => control.angle === target)!.status)
    if (target === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      angle.current = target
      drawRadar(context, image, target, target, 0)
      return
    }

    const start = performance.now()
    const from = angle.current
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / 620)
      const ease = progress * progress * (3 - 2 * progress)
      const pulse = Math.max(0, Math.min(1, elapsed / 205, (960 - elapsed) / 755))
      angle.current = from + (target - from) * ease
      drawRadar(context, image, angle.current, target, pulse)
      if (elapsed < 960) frame.current = requestAnimationFrame(animate)
    }
    frame.current = requestAnimationFrame(animate)
  }

  return <section className={styles.interactiveDemo} aria-label="Interactive coastal radar demo">
    <h2>Turn the coastal radar</h2>
    <div className={styles.interactiveCanvas} style={{ aspectRatio: '16 / 9' }}>
      <img src={poster} alt={posterAlt} width={scene.width} height={scene.height} />
      <canvas ref={canvas} width={scene.width} height={scene.height} aria-hidden="true" />
      <button className={styles.radarHotspot} data-turn="left" type="button" lang="tr" aria-label="Sola dön" tabIndex={-1} onClick={() => void turn(-60)} />
      <button className={styles.radarHotspot} data-turn="right" type="button" lang="tr" aria-label="Sağa dön" tabIndex={-1} onClick={() => void turn(60)} />
    </div>
    <div className={styles.interactiveControls} role="group" aria-label="Radar angle">
      {controls.map(control => <button key={control.angle} type="button" aria-pressed={selected === control.angle} onClick={() => void turn(control.angle)}>
        {control.label}
      </button>)}
    </div>
    <p role="status">{status}</p>
  </section>
}
