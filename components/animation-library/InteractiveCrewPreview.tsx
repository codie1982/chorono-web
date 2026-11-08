'use client'

import HeroCharacters from '@/components/hero/HeroCharacters'
import { useHeroCrew } from '@/components/hero/useHeroCrew'

/** Reuses the homepage's native scene/adapter with explicit play and non-navigating reaction controls.
 * Scroll remains page navigation here. The same saved project supplies every pose and pointer wire.
 */
export default function InteractiveCrewPreview() {
  const crew = useHeroCrew({ autoPlay: false, followScroll: false, placement: 'library' })
  const disabled = !crew.ready || crew.paused
  const buttonClass = 'min-h-[44px] rounded-lg border border-white/20 px-4 py-2 text-xs font-medium text-[#F7EBDD] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3CC9B] disabled:cursor-not-allowed disabled:opacity-40'
  return <section ref={crew.section} aria-label="Interactive motion crew preview" className="my-7 overflow-hidden rounded-2xl bg-[#17100D] px-4 pb-5 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 py-4 text-[10px] uppercase tracking-[0.12em] text-[#C5B9AE]"><span>Interactive motion crew</span><span>Transparent scene · Editable source</span></div>
    <HeroCharacters crew={crew} />
    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
      <button type="button" disabled={disabled} {...crew.cta('install')} onClick={()=>crew.trigger('celebrate')} className={buttonClass}>Celebrate</button>
      <button type="button" disabled={disabled} {...crew.cta('skills')} onClick={()=>crew.trigger('highfive')} className={buttonClass}>High five</button>
      <button type="button" disabled={disabled} onPointerEnter={()=>crew.setIntent('ctaPointer','sit')} onPointerLeave={()=>crew.setIntent('ctaPointer')} onFocus={()=>crew.setIntent('ctaFocus','sit')} onBlur={()=>crew.setIntent('ctaFocus')} onClick={()=>crew.setIntent('ctaFocus','sit')} className={buttonClass}>Sit down</button>
    </div>
    <p className="mt-3 text-xs leading-6 text-[#C5B9AE]">Press play, then move your cursor, hover a character or try a reaction. Keyboard and click controls work too.</p>
  </section>
}
