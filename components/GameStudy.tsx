'use client'

import { useState } from 'react'

const games = {
  'valley-gate': {
    states: ['The path ends at a silent gate. A copper dial sits beside the arch.', 'The dial points east. A seam of daylight appears in the stone.', 'The gate opens onto the valley. You found the passage.'],
    choices: ['Turn the dial', 'Push the gate'],
    blocked: 'The stone holds. Try the dial first.',
  },
  'observatory': {
    states: ['The observatory is dark. Moonlight enters through a narrow slit.', 'The mirror catches the moonlight. Its beam rests on the lens.', 'The lens projects a star map. The observatory is awake.'],
    choices: ['Align the mirror', 'Focus the lens'],
    blocked: 'The lens needs light. Find a way to redirect the beam.',
  },
}

export type GameId = keyof typeof games

export default function GameStudy({ id, image, alt }: { id: GameId; image: string; alt: string }) {
  const game = games[id]
  const [step, setStep] = useState(0)
  const [hint, setHint] = useState('')
  function choose(index: number) {
    if (index !== step) { setHint(game.blocked); return }
    setHint('')
    setStep(step + 1)
  }
  return <div className="sample-game">
    <img src={image} alt={alt} />
    <div className="sample-game-controls">
      <p role="status">{hint || game.states[step]}</p>
      {step < 2 && game.choices.map((choice,i)=><button type="button" key={choice} disabled={i < step} onClick={()=>choose(i)}>{choice}</button>)}
      {step > 0 && <button type="button" onClick={()=>{setStep(0);setHint('')}}>Restart scene</button>}
    </div>
  </div>
}
