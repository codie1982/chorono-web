# Script editable splines with JavaScript

Use `scene.addSpline()` to create a native spline layer and `layer.spline` to read its geometry or edit points, handles, segments and contours. The resulting vector path remains editable in Chorono.

## Create and split a spline segment

This example creates a line, splits it halfway and moves the new point in layer-local pixels.

```js
const guide = scene.addSpline(
  'line',
  {x1: 0, y1: 0, x2: 160, y2: 0},
  {x: 120, y: 180, name: 'Editable guide'}
);
if (!guide) throw new Error('Could not create the spline.');
const [segmentId] = Object.keys(guide.spline.data.segments);
const {pointId} = guide.spline.splitSegment(segmentId, 0.5);
guide.spline.movePoint(pointId, 80, -40);
scene.log(guide.id, pointId);
```

Supported starting primitives include `line`, `rectangle`, `circle`, `ellipse`, `arc`, `donut`, `ngon` and `star`. To add a contour to an existing spline, use `addContour(anchors, options)`. For exact curves, supply incoming and outgoing handles on the anchors. Reads from `spline.data` return detached data. Reuse the IDs returned by topology edits and call the handle methods to commit changes.

## Animate points and handle coordinates

Establish the contours first. Then key numeric properties such as `spline.points.<pointId>.x` or `spline.handles.<handleId>.y` on the intended timeline. Keys address existing point and handle IDs. Edit the source layer to change geometry shared by instances. Before changing topology on animated geometry, review the affected tracks. The development build refuses edits that invalidate live references.

## Preview changes through MCP

Read the scene first. Use its revision and one-use read token for the script dry run, then use the plan's returned revision and token to apply it. Check the running editor's capabilities and the [JavaScript authoring workflow](scripting.md#discover-and-execute).

In the 2D geometry development build, use `prepare_spline_edit` for worker-backed native spline edits. Inspect the draft and call `apply_spline_edit` with the plan-bound token, or use `discard_spline_edit` to dismiss it.

For manual editing, see [spline geometry](editor-canvas-splines.md) and [2D spline modeling](editor-canvas-spline-modeling.md).
