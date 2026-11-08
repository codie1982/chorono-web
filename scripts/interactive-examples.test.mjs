import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ChronoPlayer } from '../node_modules/@chorono/runtime/dist/chorono-runtime.mjs'

for (const [id, layerId, off, on, target, offValue, onValue] of [
  ['heart-like', 'path_2', 'unliked', 'liked', 'layers.path_2.style.fill.opacity', 0, 100],
  ['hamburger-menu', 'rect_9', 'closed', 'open', 'layers.rect_5.transform.rotationDeg', 0, 45],
]) {
  test(`${id}: portable trigger plays, blends both ways and supports reduced motion`, t => {
    let wall = 1000
    t.mock.method(performance, 'now', () => wall)
    const scene = JSON.parse(readFileSync(new URL(`../public/examples/${id}.chorono.json`, import.meta.url)))
    assert.equal(scene.timelines.length, 2)
    const player = new ChronoPlayer(scene)
    const machine = [...player.smRuntimes.values()][0]
    assert.equal(machine.activeTimelineId, off)
    assert.equal(player.tick(0).overrides.get(target), offValue)
    player.fireEvent({ type: 'click', layerId })
    player.tick(0); player.tick(0)
    assert.equal(machine.activeTimelineId, on)
    wall += 140
    const middle = player.tick(0).overrides.get(target)
    assert.ok(middle > offValue && middle < onValue)
    wall += 200
    assert.equal(player.tick(0).overrides.get(target), onValue)
    player.fireEvent({ type: 'click', layerId })
    player.tick(0); player.tick(0)
    wall += 250
    assert.equal(machine.activeTimelineId, off)
    assert.equal(player.tick(0).overrides.get(target), offValue)
    machine.sync({ ...scene.stateMachines[0], transitions: scene.stateMachines[0].transitions.map(tr => ({ ...tr, blendMs: 0 })) })
    player.fireEvent({ type: 'click', layerId })
    player.tick(0)
    assert.equal(player.tick(0).overrides.get(target), onValue)
    assert.equal(machine.getBlend(wall), null)
    player.destroy()
  })
}
