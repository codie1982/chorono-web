import { ANIMATION_EXAMPLES, type AnimationExampleId } from '@/lib/animation-example'
import type { GameId } from '@/components/GameStudy'

export const categories = [
  { id:'game', name:'Game', description:'Play short environment puzzles and explore how actions change the state of a scene.' },
  { id:'motion', name:'Motion', description:'Scrub editable motion studies and see how pacing changes a composition.' },
  { id:'web-components', name:'Interactive web components', description:'Try small interface interactions and inspect the editable scenes behind them.' },
  { id:'render', name:'Render', description:'Study light, surfaces and cinematic composition through illustrated render briefs.' },
] as const

export type Sample = {
  slug:string; title:string; image:string; alt:string; description:string; task:string
} & ({category:'game'; id:GameId} | {category:'motion'; id:AnimationExampleId} | {category:'web-components'; id:'heart-like'|'hamburger-menu'} | {category:'render'; id:string})

export const samples: Sample[] = [
  {category:'game',id:'valley-gate',slug:'valley-gate',title:'Valley gate',image:'/new-home/studio/game-valley.jpg',alt:'A traveler facing a stone gateway above the waterfalls',description:'An environmental puzzle about unlocking a passage.',task:'Try opening the gate before and after turning the dial. The same action gives a different result once the lock changes state.'},
  {category:'game',id:'observatory',slug:'observatory',title:'The moonlit observatory',image:'/new-home/studio/game-ruins.jpg',alt:'An explorer approaching the overgrown observatory',description:'Restore a dormant star projector in two moves.',task:'Direct the moonlight through the optics. Test the lens before aligning the mirror to discover which step it depends on.'},
  ...(['brief-to-motion','first-animation','pause-then-move'] as const).map(id=>({
    category:'motion' as const,id,slug:id,title:ANIMATION_EXAMPLES[id].title,image:'/examples/'+id+'.png',alt:ANIMATION_EXAMPLES[id].alt,description:ANIMATION_EXAMPLES[id].description,
    task:{'brief-to-motion':'Scrub through the three entrances and compare when the progress marker reaches each card.','first-animation':'Pause on the title entrance. Open the source to change the headline or the timing of its first keyframe.','pause-then-move':'Compare the held pose with the movement that follows. Adjust the hold in the editable project.'}[id],
  })),
  ...(['heart-like','hamburger-menu'] as const).map(id=>({
    category:'web-components' as const,id,slug:id,title:ANIMATION_EXAMPLES[id].title,image:'/examples/'+id+'.png',alt:ANIMATION_EXAMPLES[id].alt,description:ANIMATION_EXAMPLES[id].description,
    task:id==='heart-like'?'Toggle the heart twice. Watch the outline, fill and scale as the state reverses.':'Open the menu, follow the change in the three bars, then press Escape to close it.',
  })),
  {category:'render',id:'optical-glass',slug:'optical-glass',title:'Optical glass',image:'/chorono-render/material-chair.png',alt:'Sculptural amber glass chair with refracted light',description:'Amber glass, a quiet studio and one carefully shaped highlight.',task:'Explore how thickness, roughness and a large side light affect the edges of the chair.'},
  {category:'render',id:'desert-pavilion',slug:'desert-pavilion',title:'Desert pavilion',image:'/chorono-render/architecture-desert.png',alt:'Architectural pavilion in a desert landscape',description:'A study in warm stone, long shadows and architectural scale.',task:'Set the sun low and use the shadow to lead the eye through the structure.'},
  {category:'render',id:'orbital-greenhouse',slug:'orbital-greenhouse',title:'Orbital greenhouse',image:'/chorono-render/cartoon-greenhouse.png',alt:'Stylized robot tending an orbital greenhouse',description:'A small botanical world told through soft shapes and warm light.',task:'Balance the cool exterior with warm light around the plants and the robot.'},

]


const directions: Record<string, string> = {
  'valley-gate': 'Build a two-step environmental puzzle. Turning the copper dial unlocks the stone gate. Opening it first gives a contextual hint. Provide restart, keyboard-operable controls and readable state feedback. Use the supplied valley artwork as a static scene background.',
  observatory: 'Build a two-step observatory puzzle. Aligning a mirror sends moonlight to a lens. Focusing the lens then reveals a star map. Handle reversed action order with a hint and support restarting from the initial state.',
  'brief-to-motion': 'Create an eight-second editable composition with three cards named Brief, Build and Refine. Stagger their entrances and move a small copper marker between them. Keep the final composition readable and name all layers.',
  'first-animation': 'Create a four-second title entrance with a headline, caption and three circles. Use a clean dark canvas, gentle easing and a readable final hold. Keep text and motion tracks independently editable.',
  'pause-then-move': 'Create a motion study built around anticipation, a deliberate hold and a decisive move. Expose the pause and movement as separate timeline segments. Keep the composition spare enough to read the timing.',
  'heart-like': 'Build a reversible like interaction with outlined and filled heart states. Animate scale and fill over approximately 300 ms. Provide a semantic button, aria-pressed state, keyboard activation and an immediate reduced-motion state change.',
  'hamburger-menu': 'Build an accessible menu toggle whose three bars transform into a close icon. Keep aria-expanded synchronized, close on Escape and restore focus to the trigger. Allow keyboard navigation to all menu items.',
  'optical-glass': 'Compose a sculptural amber glass chair on a neutral studio floor. Use a large side light and a narrow rim to reveal the silhouette. Preserve believable thickness and refraction, give the chair breathing room and keep the full object in frame.',
  'desert-pavilion': 'Compose a low desert pavilion in warm pale stone. Use a low sun, long directional shadows and a wide architectural view. Make the relationship between walls, openings and surrounding dunes the focal point.',
  'orbital-greenhouse': 'Compose a friendly stylized robot caring for plants in an orbital greenhouse. Use rounded forms, warm interior illumination and a cool space backdrop. Arrange the foliage to frame the character without hiding its gesture.',
}

export function samplePrompt(sample: Sample) {
  return `Create a new study called "${sample.title}".\n\n${directions[sample.slug]}\n\nUse the reference image for composition and mood. Adapt the layout to the target aspect ratio without stretching or enlarging low-resolution crops.\n\nDeliver a preview, editable source where supported, and a short explanation of the controls or parameters I can change. Check the result at its intended display size.`
}

export function sampleSkill(sample: Sample) {
  return `---\nname: chorono-${sample.slug}\ndescription: Recreate or adapt the ${sample.title} ${sample.category} study from a supplied brief and reference.\n---\n\n# ${sample.title}\n\n## Creative direction\n\n${directions[sample.slug]}\n\n## Working method\n\nInspect the project and available tools before choosing an implementation. Reuse the existing renderer, components and assets when appropriate. Confirm the actual capabilities of a connected editor before creating scene data.\n\nKeep dimensions, copy, colors and timing in named editable values. Treat all supplied numbers as values for this example. Preserve unrelated project content.\n\n## Verification\n\nReview the complete composition and relevant states. For interactive work, check keyboard controls, reset behavior and reduced motion. For images, check framing, subject detail and lighting. Provide the output path and explain which assets are concept references.\n`
}
