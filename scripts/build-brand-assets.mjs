import React from 'react'
import { ImageResponse } from 'next/og.js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const h = React.createElement
const svg = await readFile(path.join(root, 'public/icon.svg'))
const iconSource = `data:image/svg+xml;base64,${svg.toString('base64')}`
await mkdir(path.join(root, 'public/icons'), { recursive: true })

async function icon(size, square = false) {
  return Buffer.from(await new ImageResponse(
    h('div', { style: { display: 'flex', width: size, height: size, ...(square ? { background: '#B55233' } : {}) } },
      h('img', { src: iconSource, width: size, height: size })),
    { width: size, height: size },
  ).arrayBuffer())
}

for (const [file, size, square] of [
  ['apple-touch-icon.png', 180, true],
  ['icons/chorono-192.png', 192, false],
  ['icons/chorono-512.png', 512, false],
  ['icons/chorono-maskable-512.png', 512, true],
]) {
  await writeFile(path.join(root, 'public', file), await icon(size, square))
}

const sizes = [16, 32, 48, 64]
const images = await Promise.all(sizes.map(size => icon(size)))
const header = Buffer.alloc(6 + sizes.length * 16)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
for (let i = 0; i < sizes.length; i++) {
  const entry = 6 + i * 16
  header[entry] = sizes[i]
  header[entry + 1] = sizes[i]
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(images[i].length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += images[i].length
}
await writeFile(path.join(root, 'app/favicon.ico'), Buffer.concat([header, ...images]))

const timeline = h('svg', { width: 400, height: 330, viewBox: '0 0 400 330' },
  h('rect', { x: 1, y: 1, width: 398, height: 328, rx: 24, fill: '#211612', stroke: '#694537', strokeWidth: 2 }),
  h('rect', { x: 24, y: 24, width: 352, height: 145, rx: 14, fill: '#120D0B' }),
  h('path', { d: 'M60 137C110 137 100 56 170 56S240 137 328 70', fill: 'none', stroke: '#694537', strokeWidth: 2, strokeDasharray: '6 8' }),
  h('circle', { cx: 170, cy: 56, r: 19, fill: '#d96f45' }),
  h('rect', { x: 292, y: 52, width: 37, height: 37, rx: 9, fill: '#f3d5ca', transform: 'rotate(16 310 70)' }),
  ...[204, 244, 284].map(y => h('rect', { key: `row-${y}`, x: 24, y, width: 352, height: 24, rx: 6, fill: '#38261f' })),
  ...[[64,216],[152,216],[306,216],[109,256],[248,256],[76,296],[188,296],[306,296]].map(([x,y]) =>
    h('path', { key: `${x}-${y}`, d: `M${x} ${y-6}l6 6-6 6-6-6z`, fill: '#d96f45' })),
  h('path', { d: 'M218 190V314', stroke: '#fff0e9', strokeWidth: 2 }),
  h('path', { d: 'M212 184h12l-6 8z', fill: '#fff0e9' }),
)

const card = h('div', { style: { display: 'flex', width: '100%', height: '100%', background: '#120D0B', color: '#fffaf7', padding: '58px 64px', fontFamily: 'sans-serif', position: 'relative' } },
  h('div', { style: { position: 'absolute', width: 14, height: 630, top: 0, left: 0, background: '#B55233' } }),
  h('div', { style: { display: 'flex', flexDirection: 'column', width: 650 } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 18, marginBottom: 48 } },
      h('img', { src: iconSource, width: 60, height: 60 }),
      h('div', { style: { fontSize: 29, fontWeight: 700, letterSpacing: 6 } }, 'CHORONO')),
    h('div', { style: { fontSize: 70, fontWeight: 700, lineHeight: 1.08, letterSpacing: -3, display: 'flex', flexDirection: 'column' } },
      h('span', null, 'Create editable'),
      h('span', { style: { color: '#d96f45' } }, '2D animations.')),
    h('div', { style: { marginTop: 28, fontSize: 24, lineHeight: 1.5, maxWidth: 560, color: '#d7bbb0' } }, 'Build in your browser. Create with your AI agent.'),
    h('div', { style: { display: 'flex', marginTop: 48, fontSize: 18, color: '#e8c9ba', letterSpacing: 2 } }, 'OPEN SOURCE  /  EDITOR + MCP')),
  h('div', { style: { display: 'flex', flexDirection: 'column', width: 400, justifyContent: 'center', gap: 22 } },
    timeline,
    h('div', { style: { display: 'flex', justifyContent: 'flex-end', fontSize: 21, color: '#d7bbb0' } }, 'chorono.com')),
)
const response = new ImageResponse(card, { width: 1200, height: 630 })
await writeFile(path.join(root, 'public/opengraph-image.png'), Buffer.from(await response.arrayBuffer()))

await mkdir(path.join(root, 'public/guides'), { recursive: true })
for (const guide of [
  { file: 'getting-started', lines: ['Your first', 'editable animation'], subtitle: 'A local workspace. Every layer and keyframe stays editable.', steps: ['1. Install the editor', '2. Connect MCP', '3. Create and save'] },
  { file: 'agent-skills', lines: ['Build with', 'your AI agent'], subtitle: 'Setup and authoring skills for Claude Code and Codex.', steps: ['chorono-setup', 'chorono', 'Editable project'] },
]) {
  const cover = h('div', { style: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: 64, background: '#120D0B', color: '#fffaf7', fontFamily: 'sans-serif' } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 18 } }, h('img', { src: iconSource, width: 54, height: 54 }), h('span', { style: { fontSize: 24, letterSpacing: 5 } }, 'CHORONO GUIDES')),
    h('div', { style: { display: 'flex', flex: 1, alignItems: 'center', gap: 46 } },
      h('div', { style: { display: 'flex', flexDirection: 'column', width: 630, gap: 26 } },
        h('div', { style: { display: 'flex', flexDirection: 'column', fontSize: 64, lineHeight: 1.12, letterSpacing: -2 } }, ...guide.lines.map((line, i) => h('span', { key: line, style: { color: i ? '#d96f45' : '#fffaf7' } }, line))),
        h('div', { style: { fontSize: 26, lineHeight: 1.5, color: '#d7bbb0', maxWidth: 570 } }, guide.subtitle)),
      h('div', { style: { display: 'flex', flexDirection: 'column', width: 380, gap: 24 } }, ...guide.steps.map((step, i) =>
        h('div', { key: step, style: { display: 'flex', alignItems: 'center', gap: 18, padding: '26px 22px', borderRadius: 16, border: '2px solid #694537', background: '#211612', fontSize: 23 } },
          h('div', { style: { width: 12, height: 12, background: i === 2 ? '#f3d5ca' : '#d96f45', transform: 'rotate(45deg)' } }), step)))),
    h('div', { style: { display: 'flex', fontSize: 20, color: '#d7bbb0' } }, `chorono.com/${guide.file}`),
  )
  await writeFile(path.join(root, 'public/guides', `${guide.file}.png`), Buffer.from(await new ImageResponse(cover, { width: 1200, height: 675 }).arrayBuffer()))
}
console.log('Built favicon, app icons, homepage sharing image and two 1200×675 guide covers.')
