# Edit layer properties and effects

The Properties panel shows the controls supported by the selected Chorono layer. Select an object first; available geometry, text, media and effect controls depend on its type.

![The Properties panel for a selected rectangle.](../../public/docs/screenshots/properties-transform-v1.jpg)

## Transform and appearance

The transform controls include position, scale, rotation and anchor. Position and anchors use scene or parent coordinates, rotation is in degrees, and scale is a multiplier: 1 is the original scale. An anchor changes the pivot used for scaling and rotation.

Appearance controls include opacity and blend mode. Inspect overlapping content when changing blending. The panel may show opacity as a percentage while serialized data uses a normalized value.

## Type-specific controls

Shape controls describe geometry and paint. Text controls describe content and typography. Media layers refer to assets. Select a different layer type to see the controls relevant to that object; avoid assuming that all layers expose the same properties.

## Effects, motion and interaction

The **Effects**, **Motion** and **Interact** areas organize additional behavior. Make one change at a time and preview the result. Effects can increase the rendering work and may have different support in SVG, HTML and runtime output.

Use [Resources & performance](editor-resources.md) to inspect the scene's workload and [State machines](editor-state-machines.md) for animation states and transitions.

## Animate a property

1. Select the correct layer and timeline.
2. Move the playhead to the desired time.
3. Add or update a keyframe for a supported property.
4. Move to another time and set the next value.
5. Scrub between the keys to check the interpolation.

Review the active keyframe mode before editing a value. Read the [Keyframes guide](editor-keyframes.md) for the full workflow. Keep a saved project before major changes and inspect the actual exported result rather than relying only on the editor preview.
