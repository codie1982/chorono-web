import React from 'react'
import { ImageResponse } from 'next/og.js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const h = React.createElement
const icon = `data:image/svg+xml;base64,${(await readFile(path.join(root, 'public/icon.svg'))).toString('base64')}`
const covers = [
  { slug: 'make-animations-with-claude', label: 'CLAUDE CODE', lines: ['Make animations', 'with Claude.'], prompt: '“Ideas in motion”', steps: ['Connect MCP', 'Describe motion', 'Refine the timeline'] },
  { slug: 'make-animations-with-codex', label: 'CODEX', lines: ['Your brief.', 'Editable motion.'], prompt: '“A little progress”', steps: ['Install the skills', 'Connect the editor', 'Create and revise'] },
  { slug: 'animation-prompts-for-claude-and-codex', label: 'PROMPT RECIPES', lines: ['Six prompts.', 'A place to start.'], prompt: '“Small ideas. Real motion.”', steps: ['A clear brief', 'Editable keyframes', 'A saved project'] },
]
await mkdir(path.join(root, 'public/blog'), { recursive: true })
for (const post of covers) {
  const cover = h('div', { style: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: 56, background: '#120D0B', color: '#fffaf7', fontFamily: 'sans-serif' } },
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } }, h('img', { src: icon, width: 48, height: 48 }), h('span', { style: { fontSize: 23, letterSpacing: 5 } }, 'CHORONO')),
      h('span', { style: { fontSize: 16, color: '#edae94', letterSpacing: 3 } }, post.label)),
    h('div', { style: { display: 'flex', flex: 1, alignItems: 'center', gap: 40 } },
      h('div', { style: { display: 'flex', flexDirection: 'column', width: 570, gap: 22 } },
        h('div', { style: { display: 'flex', flexDirection: 'column', fontSize: 62, lineHeight: 1.12, letterSpacing: -2 } }, ...post.lines.map((line, index) => h('span', { key: line, style: { color: index ? '#df8a65' : '#fffaf7' } }, line))),
        h('div', { style: { fontSize: 23, lineHeight: 1.5, color: '#d7bbb0', maxWidth: 490 } }, 'From a prompt to a scene you can keep editing.')),
      h('div', { style: { display: 'flex', flexDirection: 'column', width: 470, border: '2px solid #694537', borderRadius: 20, padding: 25, background: '#211612', gap: 22 } },
        h('div', { style: { fontSize: 15, letterSpacing: 3, color: '#edae94' } }, 'THE ANIMATION BRIEF'),
        h('div', { style: { fontSize: 27, color: '#fff0e9' } }, post.prompt),
        h('svg', { width: 410, height: 80, viewBox: '0 0 410 80' }, h('path', { d: 'M12 60C80 60 100 18 165 18S270 60 392 18', fill: 'none', stroke: '#694537', strokeWidth: 2, strokeDasharray: '5 7' }), h('circle', { cx: 165, cy: 18, r: 14, fill: '#df8a65' }), h('path', { d: 'M305 8v64', stroke: '#fff0e9', strokeWidth: 2 })),
        ...post.steps.map((step, i) => h('div', { key: step, style: { display: 'flex', alignItems: 'center', gap: 16, fontSize: 20, color: '#d7bbb0' } }, h('span', { style: { color: '#df8a65' } }, `0${i + 1}`), step)))),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 17, color: '#d7bbb0' } }, h('span', null, 'CHORONO BLOG / FIELD GUIDES'), h('span', null, 'chorono.com/blog')),
  )
  await writeFile(path.join(root, 'public/blog', `${post.slug}.png`), Buffer.from(await new ImageResponse(cover, { width: 1200, height: 675 }).arrayBuffer()))
}
console.log('Built three 1200×675 blog covers.')
