'use client'

import { useId, useState } from 'react'

// Cubic presets used by @chorono/runtime 0.1.0, not CSS keyword curves.
const curves = [
  { name: 'Linear', formula: 't', value: (t: number) => t, note: 'Constant speed' },
  { name: 'Ease in', formula: 't³', value: (t: number) => t ** 3, note: 'Slow start, accelerating' },
  { name: 'Ease out', formula: '1 − (1 − t)³', value: (t: number) => 1 - (1 - t) ** 3, note: 'Fast start, slowing down' },
  { name: 'Ease in-out', formula: 'Piecewise cubic', value: (t: number) => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2, note: 'Slow start and finish' },
]

export default function EasingExplorer() {
  const id = useId()
  const [progress, setProgress] = useState(25)
  const t = progress / 100
  return <figure aria-labelledby={id} className="my-7 overflow-hidden rounded-2xl border border-[#d9bca9] bg-white">
    <div className="border-b border-[#e7d8cf] p-5">
      <p id={id} className="!mb-1 font-semibold !text-[#211612]">Same start. Same finish. Different speed.</p>
      <p className="!mb-3 !text-sm">Move the time slider to compare four objects travelling from 0 to 100. Nothing plays automatically.</p>
      <label className="block text-sm font-semibold text-[#211612]" htmlFor={`${id}-time`}>Elapsed time: <output>{progress}%</output></label>
      <input id={`${id}-time`} type="range" min={0} max={100} step={1} value={progress} aria-valuetext={`${progress} percent elapsed time`} onChange={event => setProgress(Number(event.target.value))} className="min-h-[44px] w-full cursor-pointer accent-[#8F3D27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F3D27]" />
      <div className="flex flex-wrap gap-2">{[0, 25, 50, 75, 100].map(value => <button key={value} type="button" aria-pressed={progress === value} onClick={() => setProgress(value)} className={`min-h-[44px] min-w-[48px] rounded-lg border px-3 text-sm ${progress === value ? 'border-[#8F3D27] bg-[#8F3D27] text-white' : 'border-[#d9bca9] text-[#8F3D27] hover:bg-[#f7f1ed]'}`}>{value}%</button>)}</div>
    </div>
    <div className="grid gap-5 p-5 sm:grid-cols-2">{curves.map(curve => {
      const travelled = curve.value(t)
      const points = Array.from({ length: 41 }, (_, index) => `${24 + index * 3.8},${176 - curve.value(index / 40) * 152}`).join(' ')
      return <div key={curve.name} className="min-w-0 rounded-xl border border-[#e7d8cf] bg-[#faf7f4] p-4">
        <div className="flex flex-wrap justify-between gap-2 text-sm font-semibold text-[#211612]"><span>{curve.name}</span><span className="tabular-nums">{(travelled * 100).toFixed(1)}% travelled</span></div>
        <p className="!mb-2 !mt-1 !text-sm">{curve.note}</p>
        <svg viewBox="0 0 200 210" className="mx-auto w-full max-w-[200px]" role="img" aria-label={`${curve.name} graph: elapsed time horizontally and distance travelled vertically. At ${progress}% time, ${(travelled * 100).toFixed(1)}% travelled.`}>
          <path d="M24 24V176H176" fill="none" stroke="#b69e90" />
          <path d="M24 100H176M100 24V176" fill="none" stroke="#e7d8cf" strokeDasharray="3 3" />
          <polyline points={points} fill="none" stroke="#8F3D27" strokeWidth="3" />
          <circle cx={24 + t * 152} cy={176 - travelled * 152} r="5" fill="#211612" />
          <text x="24" y="195" fill="#6d5a52" fontSize="11">0</text><text x="154" y="195" fill="#6d5a52" fontSize="11">time</text>
          <text x="24" y="14" fill="#6d5a52" fontSize="11">distance</text>
        </svg>
        <svg viewBox="0 0 300 36" className="w-full" aria-hidden="true"><path d="M15 18H285" stroke="#d9bca9" strokeWidth="2" /><circle cx={15 + travelled * 270} cy="18" r="12" fill="#8F3D27" /></svg>
        <p className="!mb-0 !mt-2 !text-xs">{curve.formula}</p>
      </div>
    })}</div>
    <figcaption className="border-t border-[#e7d8cf] px-5 py-4 text-sm leading-6 text-[#6d5a52]">The cubic presets match Chorono runtime 0.1.0. CSS ease-in, ease-out and ease-in-out use different cubic Bézier curves. At 25% time, these objects have travelled 25%, 1.6%, 57.8% and 6.3% respectively.</figcaption>
  </figure>
}
