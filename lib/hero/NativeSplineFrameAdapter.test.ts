import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { CanvasRenderAdapter, type RenderFrame } from '@chorono/runtime'
import { NativeSplineFrameAdapter } from './NativeSplineFrameAdapter'

const source: RenderFrame['scene'] = JSON.parse(readFileSync(new URL('../../public/hero/motion-crew.chorono.json',import.meta.url),'utf8'))

/** Isolates an existing authored curve and its tracks; no test geometry generator is involved. */
function fixture() {
  const original=source.layers.find(l=>l.name==='Milo.armL.path')!
  const layer={...original,parentId:undefined,transform:{...original.transform,x:0,y:0}}
  const scene={...source,layers:[layer],timelines:source.timelines.map(t=>({...t,tracks:t.tracks.filter(track=>track.target.startsWith(`layers.${layer.id}.`))})),stateMachines:[],parameterWires:[]}
  const contour=Object.values(layer.spline!.contours)[0]
  const end=contour.pointIds[1],segment=contour.segmentIds[0],prefix=`layers.${layer.id}.spline.`
  return {scene,layer,end,segment,prefix}
}

/** Creates a native frame envelope with supplied evaluated scalars, in composition pixels. */
function frame(scene: RenderFrame['scene'], values: Array<[string,number]>): RenderFrame {
  return {scene,overrides:new Map(values),timeMs:330,paramValues:new Map(),assets:new Map()}
}

describe('published SDK spline rendering compatibility',()=>{
  it('passes animated quadratic coordinates into the real native canvas drawing commands',()=>{
    const f=fixture(),curves:number[][]=[]
    // Minimal test context for this one native vector layer. Missing drawing operations fail loudly.
    const context={canvas:{width:1200,height:800},globalAlpha:1,filter:'none',
      save(){},restore(){},setTransform(){},clearRect(){},fillRect(){},translate(){},rotate(){},scale(){},beginPath(){},moveTo(){},setLineDash(){},stroke(){},
      quadraticCurveTo(...values:number[]){curves.push(values)},
    }
    const adapter=new NativeSplineFrameAdapter(new CanvasRenderAdapter(context as unknown as CanvasRenderingContext2D))
    adapter.render(frame(f.scene,[[f.prefix+`points.${f.end}.x`,140],[f.prefix+`points.${f.end}.y`,-120],
      [f.prefix+`segments.${f.segment}.control1.x`,90],[f.prefix+`segments.${f.segment}.control1.y`,-80]]))
    expect(curves).toEqual([[90,-80,140,-120]])
    expect(f.layer.spline!.points[f.end].x).not.toBe(140)
  })
  it('reuses private records and resets missing overrides without changing the source',()=>{
    const f=fixture(),base=f.layer.spline!.points[f.end].x
    let received:RenderFrame|undefined
    const adapter=new NativeSplineFrameAdapter({render(value){received=value}})
    adapter.render(frame(f.scene,[[f.prefix+`points.${f.end}.x`,140]]))
    const envelope=received!,geometry=received!.scene.layers[0].spline!
    expect(geometry.points[f.end].x).toBe(140)
    expect(geometry).not.toBe(f.layer.spline)
    adapter.render(frame(f.scene,[]))
    expect(received).toBe(envelope)
    expect(received!.scene.layers[0].spline).toBe(geometry)
    expect(geometry.points[f.end].x).toBe(base)
    expect(f.layer.spline!.points[f.end].x).toBe(base)
  })
  it('reports unsupported spline channels instead of silently freezing geometry',()=>{
    const f=fixture()
    f.scene.timelines[0].tracks.push({target:f.prefix+`segments.${f.segment}.control2.x`,keyframes:[]})
    const adapter=new NativeSplineFrameAdapter({render(){}})
    expect(()=>adapter.render(frame(f.scene,[]))).toThrow('Unsupported hero spline channel')
  })
})
