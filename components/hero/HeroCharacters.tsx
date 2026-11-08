'use client'

import CrewEventLog from './CrewEventLog'
import { Pause, Play } from 'lucide-react'
import { HERO_CHARACTERS } from '@/lib/hero/manifest'
import type { HeroCrew } from './useHeroCrew'

const captions: Record<HeroCrew['pose'], string> = {
  idle: 'Move your cursor. Hover a friend. Try the buttons.',
  'shy-pip': 'Pip is a little shy. Peekaboo!',
  'shy-milo': 'Milo can’t see you. You can’t see Milo.',
  'shy-fig': 'Fig has officially disappeared. Almost.',
  'shy-dot': 'Dot is hiding. Nothing to see here.',
  excited: 'A new animation adventure? Count us in.',
  curious: 'An agent with animation skills? Tell us more.',
  celebrate: 'You’re in. Let’s make something move!',
  highfive: 'Good ideas deserve a high five.',
  sit: 'We’ll take a seat while you explore.',
}

/** Displays the transparent native scene directly over the hero background.
 * Authored hit bounds supply keyboard/touch controls; the alpha poster reserves the same layout.
 * Captions have a fixed height so pose changes never shift the surrounding content.
 */
export default function HeroCharacters({ crew }: { crew: HeroCrew }) {
  return <figure aria-labelledby="crew-title" className="min-w-0 max-w-full">
    <h2 id="crew-title" className="sr-only">Meet the motion crew</h2>
    <div ref={crew.stage} data-hero-crew data-pose={crew.pose} className="relative isolate w-full" style={{ aspectRatio: '3 / 2' }}>
      <img src="/hero/motion-crew.png" width={1200} height={800} alt="Four original motion characters: coral teardrop Pip, lilac triangle Milo, sage blob Fig and blue robot Dot." fetchPriority="high" className={`absolute inset-0 h-full w-full ${crew.ready ? 'opacity-0' : ''}`} />
      <canvas ref={crew.canvas} width={1200} height={800} aria-hidden="true" className={`absolute inset-0 h-full w-full ${crew.ready ? '' : 'invisible'}`} />
      {HERO_CHARACTERS.map(character => <button key={character.name} type="button" disabled={!crew.ready} aria-label={`Play peekaboo with ${character.name}`} className="absolute rounded-[35%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F3CC9B]" style={{ left: `${character.hit.x*100}%`, top: `${character.hit.y*100}%`, width: `${character.hit.width*100}%`, height: `${character.hit.height*100}%` }}
        onPointerEnter={() => crew.setIntent('characterPointer', character.pose)}
        onPointerLeave={() => crew.setIntent('characterPointer')}
        onFocus={() => crew.setIntent('characterFocus', character.pose)}
        onBlur={() => crew.setIntent('characterFocus')}
        onClick={event => { event.currentTarget.focus({ preventScroll: true }); crew.setIntent('characterFocus', character.pose) }}>
        <span className="pointer-events-none absolute inset-x-0 text-[10px] font-medium tracking-wide text-[#C5B9AE] sm:text-xs" style={{top:`${(590/640-character.hit.y)/character.hit.height*100}%`}}>{character.name}</span>
      </button>)}
    </div>
    <figcaption className="grid h-[72px] grid-cols-[1fr_44px] items-center gap-3 px-2 text-xs leading-5 text-[#C5B9AE] sm:text-sm">
      <span>{crew.failed ? 'Meet the crew. Create your own characters in Chorono.' : crew.paused ? 'Taking a breather. Press play whenever you’re ready.' : captions[crew.pose]}</span>
      <button type="button" onClick={crew.toggle} disabled={!crew.ready} aria-label={crew.paused ? 'Play character animation' : 'Pause character animation'} aria-pressed={crew.paused} className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#E8DCCF] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3CC9B] disabled:opacity-40">
        {crew.paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </figcaption>
    <CrewEventLog />
  </figure>
}
