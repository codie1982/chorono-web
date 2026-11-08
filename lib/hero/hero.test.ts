import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'
import { ChronoPlayer } from '@chorono/runtime'
import { HeroInteractionModel, shouldDelayNavigation } from './interaction'
import { HERO_CHARACTERS, CREW_CONTACTS } from './manifest'

type Scene = Parameters<ChronoPlayer['load']>[0]
const scene: Scene = JSON.parse(readFileSync(new URL('../../public/hero/motion-crew.chorono.json', import.meta.url), 'utf8'))
let wall = 0
beforeEach(() => { wall = 0; vi.spyOn(performance, 'now').mockImplementation(() => wall) })
afterEach(() => vi.restoreAllMocks())

/** Uses the published SDK and saved scene, allowing the native blend clock to settle. */
function frame(pose: string, timeMs = 0) {
  const player = new ChronoPlayer(scene, null, { loop: false })
  player.dispatch(pose); player.tick(0); wall += 250
  const result = player.tick(timeMs)
  return { player, result }
}
/** Reads a native scalar override, falling back to the authored layer property. */
function value(result: ReturnType<ChronoPlayer['tick']>, name: string, path: string) {
  const layer = scene.layers.find(l => l.name === name)!
  const animated = result.overrides.get(`layers.${layer.id}.${path}`)
  if (animated !== undefined) return animated as number
  return path.split('.').reduce((data: any, key) => data[key], layer) as number
}
/** Resolves a palm center in the high-five state, whose body transform is identity. */
function palm(result: ReturnType<ChronoPlayer['tick']>, name: string, side: string) {
  return [value(result, `${name}.root`, 'transform.x') + value(result, `${name}.arm${side}.end`, 'transform.x'),
    value(result, `${name}.root`, 'transform.y') + value(result, `${name}.arm${side}.end`, 'transform.y')]
}

describe('hero website input arbitration', () => {
  it('uses the latest direct input when mouse and keyboard are combined', () => {
    const m = new HeroInteractionModel()
    m.setIntent('characterPointer', 'shy-dot'); m.setIntent('characterFocus', 'shy-milo')
    expect(m.resolve(0)).toBe('shy-milo')
    m.setIntent('ctaFocus', 'excited'); expect(m.resolve(0)).toBe('excited')
    m.setIntent('characterPointer', 'shy-fig'); expect(m.resolve(0)).toBe('shy-fig')
    m.setIntent('characterPointer'); expect(m.resolve(0)).toBe('excited')
    m.setIntent('ctaFocus'); expect(m.resolve(0)).toBe('shy-milo')
  })
  it('preserves focus when pointer hover leaves and prioritizes the character', () => {
    const m = new HeroInteractionModel()
    m.setIntent('ctaFocus', 'excited'); m.setIntent('characterPointer', 'shy-pip')
    expect(m.resolve(0)).toBe('shy-pip')
    m.setIntent('characterPointer'); expect(m.resolve(0)).toBe('excited')
  })
  it('sits with scroll hysteresis and returns to the current hover', () => {
    const m = new HeroInteractionModel(); m.setIntent('ctaPointer', 'curious')
    m.setScroll(45); expect(m.resolve(0)).toBe('sit')
    m.setScroll(25); expect(m.resolve(0)).toBe('sit')
    m.setScroll(0); expect(m.resolve(0)).toBe('curious')
  })
  it('finishes one-shot feedback before resolving the latest scroll/focus input', () => {
    const m = new HeroInteractionModel(); m.trigger('highfive', 100)
    m.setScroll(80); expect(m.resolve(600)).toBe('highfive')
    expect(m.resolve(1100)).toBe('sit')
    m.setScroll(0); m.setIntent('characterFocus', 'shy-fig')
    expect(m.resolve(1200)).toBe('shy-fig')
  })
  it('lets a fresh touch or focus interact with a character after scrolling', () => {
    const m = new HeroInteractionModel()
    m.setIntent('ctaPointer', 'curious'); m.setScroll(500)
    expect(m.resolve(0)).toBe('sit')
    m.setIntent('characterFocus', 'shy-fig'); expect(m.resolve(0)).toBe('shy-fig')
    m.setScroll(510); expect(m.resolve(0)).toBe('shy-fig')
    m.setIntent('characterFocus'); expect(m.resolve(0)).toBe('sit')
  })
  it('keeps normal navigation when paused, unavailable or using new-tab modifiers', () => {
    const click = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false }
    expect(shouldDelayNavigation(click, true, true)).toBe(true)
    expect(shouldDelayNavigation(click, false, true)).toBe(false)
    expect(shouldDelayNavigation(click, true, false)).toBe(false)
    for (const key of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) expect(shouldDelayNavigation({ ...click, [key]: true }, true, true)).toBe(false)
    expect(shouldDelayNavigation({ ...click, button: 1 }, true, true)).toBe(false)
  })
})

describe('transparent elastic crew on the published Chorono web SDK', () => {
  it('keeps four distinct native silhouettes, hit bounds and ten states', () => {
    expect(HERO_CHARACTERS).toHaveLength(4)
    expect(scene.stateMachines?.[0].states).toHaveLength(10)
    expect(scene.parameterWires).toHaveLength(14)
    const outlines = new Set<string>()
    for (const c of HERO_CHARACTERS) {
      expect(scene.layers.find(l=>l.id===c.rootId)?.name).toBe(`${c.name}.root`)
      expect(scene.layers.find(l=>l.id===c.bodyId)?.name).toBe(`${c.name}.body`)
      const root=scene.layers.find(l=>l.id===c.rootId)!, body=scene.layers.find(l=>l.id===c.silhouetteId)!
      expect(c.hit.x).toBeCloseTo((root.transform.x+body.transform.x-20*1.25)/1200)
      expect(c.hit.width).toBeCloseTo((body.size!.width+40*1.25)/1200)
      outlines.add(JSON.stringify(body.spline ?? {shape:body.shapeKind,size:body.size}))
    }
    expect(outlines.size).toBe(4)
  })
  it('responds to every saved native state-machine event', () => {
    for (const state of scene.stateMachines![0].states) {
      const { player }=frame(state.name)
      expect([...player.smRuntimes.values()][0].activeTimelineId).toBe(state.timelineId)
      player.destroy()
    }
  })
  it('moves all seven pupils in both directions and keeps them inside their whites', () => {
    const player=new ChronoPlayer(scene,null,{loop:false})
    for(const c of HERO_CHARACTERS)for(const side of c.eyes){
      const name=`${c.name}.pupil${side}`,pupil=scene.layers.find(l=>l.name===name)!,white=scene.layers.find(l=>l.name===`${c.name}.white${side}`)!
      player.setParam('pointerX',0);player.setParam('pointerY',0)
      const a=player.tick(0),x0=value(a,name,'transform.x'),y0=value(a,name,'transform.y')
      player.setParam('pointerX',1);player.setParam('pointerY',1)
      const b=player.tick(0),x1=value(b,name,'transform.x'),y1=value(b,name,'transform.y')
      expect(x1-x0).toBeGreaterThan(5);expect(y1-y0).toBeGreaterThan(5)
      expect(x0).toBeGreaterThanOrEqual(-white.size!.width/2)
      expect(x1+pupil.size!.width).toBeLessThanOrEqual(white.size!.width/2)
      expect(y0).toBeGreaterThanOrEqual(-white.size!.height/2)
      expect(y1+pupil.size!.height).toBeLessThanOrEqual(white.size!.height/2)
    }
    player.destroy()
  })
  it('covers every character’s eyes with two matching palms', () => {
    for(const c of HERO_CHARACTERS){
      const {result,player}=frame(c.pose,320)
      const y=value(result,`${c.name}.eyes`,'transform.y')
      for(const side of ['L','R']){
        expect(Math.abs(value(result,`${c.name}.arm${side}.end`,'transform.y')-y)).toBeLessThan(6)
        expect(value(result,`${c.name}.arm${side}.end`,'transform.scaleX')).toBe(1.15)
      }
      player.destroy()
    }
  })
  it('meets each neighboring pair of high-five palms within 0.02 native pixels', () => {
    CREW_CONTACTS.forEach((contact,i)=>{
      const {result,player}=frame('highfive',contact.time)
      const a=palm(result,HERO_CHARACTERS[i].name,'R'),b=palm(result,HERO_CHARACTERS[i+1].name,'L')
      for(let axis=0;axis<2;axis++)expect(Math.abs(a[axis]-b[axis])).toBeLessThanOrEqual(.02)
      expect(Math.abs(a[0]-contact.x*1.25)).toBeLessThanOrEqual(.02)
      expect(Math.abs(a[1]-contact.y*1.25)).toBeLessThanOrEqual(.02)
      player.destroy()
    })
  })
  it('keeps animated spline endpoints attached to the glove and shoe groups', () => {
    for(const [pose,time]of [['idle',1200],['excited',450],['shy-milo',320],['highfive',405],['sit',0]] as const){
      const {result,player}=frame(pose,time)
      for(const c of HERO_CHARACTERS)for(const limb of ['armL','armR','legL','legR']){
        const name=`${c.name}.${limb}`,path=scene.layers.find(l=>l.name===`${name}.path`)!,contour=Object.values(path.spline!.contours)[0]
        const endpoint=contour.pointIds[1],segment=path.spline!.segments[contour.segmentIds[0]]
        expect(segment.type).toBe('quadratic')
        for(const axis of ['x','y']){
          const actual=value(result,`${name}.path`,`transform.${axis}`)+value(result,`${name}.path`,`spline.points.${endpoint}.${axis}`)
          expect(Math.abs(actual-value(result,`${name}.end`,`transform.${axis}`))).toBeLessThanOrEqual(.021)
        }
      }
      player.destroy()
    }
  })
  it('bows the arms instead of drawing straight shafts', () => {
    const {result,player}=frame('idle',0)
    for(const c of HERO_CHARACTERS){
      const name=`${c.name}.armR.path`,path=scene.layers.find(l=>l.name===name)!,contour=Object.values(path.spline!.contours)[0]
      const end=value(result,name,`spline.points.${contour.pointIds[1]}.x`)
      const control=value(result,name,`spline.segments.${contour.segmentIds[0]}.control1.x`)
      expect(Math.abs(control-end/2)).toBeGreaterThan(20)
    }
    player.destroy()
  })
  it('plants idle feet while bodies breathe and sway', () => {
    for(const t of [0,1200,2400,4700]){
      const {result,player}=frame('idle',t)
      for(const c of HERO_CHARACTERS)for(const side of ['L','R']){
        expect(value(result,`${c.name}.root`,'transform.y')+value(result,`${c.name}.leg${side}.end`,'transform.y')).toBe(685)
      }
      player.destroy()
    }
  })
  it('anticipates a jump, stretches in the air and squashes on landing', () => {
    const prep=frame('celebrate',95),air=frame('celebrate',260),land=frame('celebrate',555),rest=frame('celebrate',850)
    expect(value(prep.result,'Pip.root','transform.y')).toBeGreaterThan(625)
    expect(value(prep.result,'Pip.body','transform.scaleY')).toBeLessThan(.9)
    expect(value(air.result,'Pip.root','transform.y')).toBeLessThan(600)
    expect(value(air.result,'Pip.body','transform.scaleY')).toBeGreaterThan(1.05)
    expect(value(land.result,'Pip.body','transform.scaleY')).toBeLessThan(.9)
    expect(value(rest.result,'Pip.body','transform.scaleY')).toBe(1)
    expect(value(air.result,'Confetti.0','opacity')).toBeGreaterThan(.3)
    ;[prep,air,land,rest].forEach(x=>x.player.destroy())
  })
  it('deforms Milo’s tip independently of its body transform', () => {
    const shape=scene.layers.find(l=>l.name==='Milo.silhouette')!,point=Object.values(shape.spline!.points)[0]
    const {result,player}=frame('idle',3400)
    expect(Math.abs(value(result,'Milo.silhouette',`spline.points.${point.id}.x`)-point.x)).toBeGreaterThan(5)
    player.destroy()
  })
  it('sits with crossed feet and holds a lower, softer body', () => {
    const {result,player}=frame('sit',0)
    for(const c of HERO_CHARACTERS){
      expect(value(result,`${c.name}.root`,'transform.y')).toBeGreaterThan(625)
      expect(value(result,`${c.name}.body`,'transform.scaleY')).toBe(.8)
      expect(value(result,`${c.name}.legL.end`,'transform.x')).toBeGreaterThan(value(result,`${c.name}.legR.end`,'transform.x'))
    }
    expect(value(result,'Confetti.0','opacity')).toBe(0)
    player.destroy()
  })
  it('keeps a truly transparent native scene and alpha poster', () => {
    expect(scene.composition.backgroundColor).toBe('rgba(0,0,0,0)')
    expect(scene.layers.some(l=>l.name==='Stage.ground')).toBe(false)
    const png=readFileSync(new URL('../../public/hero/motion-crew.png',import.meta.url))
    expect(png.readUInt8(25)).toBe(6) // PNG RGBA color type.
    const chunks: Buffer[]=[]
    for(let offset=8;offset<png.length;){
      const n=png.readUInt32BE(offset)
      if(png.toString('ascii',offset+4,offset+8)==='IDAT')chunks.push(png.subarray(offset+8,offset+8+n))
      offset+=n+12
    }
    // All PNG predictors have zero predecessors for the first pixel of the first row.
    expect(inflateSync(Buffer.concat(chunks))[4]).toBe(0)
  })
  it('gives each character a different staggered native idle gesture', () => {
    const pip=frame('idle',1200),milo=frame('idle',3100),fig=frame('idle',5000),dotL=frame('idle',6200),dotR=frame('idle',6600)
    expect(value(pip.result,'Pip.armL.end','transform.y')).toBeLessThan(-200)
    expect(value(milo.result,'Milo.body','transform.scaleY')).toBeGreaterThan(1.05)
    expect(value(fig.result,'Fig.body','transform.scaleX')).toBeGreaterThan(1.07)
    expect(value(dotL.result,'Dot.eyes','transform.x')).toBeLessThan(-8)
    expect(value(dotR.result,'Dot.eyes','transform.x')).toBeGreaterThan(8)
    ;[pip,milo,fig,dotL,dotR].forEach(x=>x.player.destroy())
  })
  it('joins the idle loop without a pose jump', () => {
    const start=frame('idle',0),end=frame('idle',8000)
    for(const[key,v]of start.result.overrides)if(typeof v==='number')expect(end.result.overrides.get(key)).toBeCloseTo(v,5)
    start.player.destroy();end.player.destroy()
  })
})
