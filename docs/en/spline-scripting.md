# Script editable spline geometry

Chorono's JavaScript scene scripting can create a spline layer and edit its native point model. This is authoring-time animation scripting: the result stays editable and the player later evaluates the saved scene. Use the MCP `run_script` workflow in [JavaScript scene scripting](scripting.md) when an agent is connected. The editor's manual Script Console uses a separate legacy browser runner, so MCP isolation and dry-run plans do not apply to that console.

## Create a line and add a contour

The example uses layer-local coordinates. Inspect returned IDs instead of guessing them; topology edits can replace segment IDs.

```js
const curve = scene.addSpline('line', { x1: 0, y1: 0, x2: 100, y2: 0 });
curve.set({ name: 'Editable outline' });
const spline = curve.spline;
const contour = spline.addContour([
  { x: 0, y: 40 },
  { x: 100, y: 40 },
  { x: 50, y: 90 },
], { closed: true, name: 'Lower shape' });
scene.log(contour.contourIds[0], contour.pointIds);
```

`addContour` needs 2–10,000 anchors. Pass `subShapeId` to place another contour in an existing subshape; otherwise it creates an independent subshape. `appendPrimitive` adds a supported circle, rectangle, ellipse, arc, donut, NGon, star or line to the same spline. Returned ID groups include subshapes, contours, points, handles and segments.

## Edit points and segments safely

Read `spline.data`, `spline.bounds` or an element getter before editing. Use `movePoint`, `setPointType`, `setHandle`, `setSegmentType` and `splitSegment(segmentId, t)` for a precise change; `t` must be strictly between 0 and 1. Use `setContourClosed` or `reverseContour` for contour direction and closure. The spline domain validates topology and locks, and deleted elements remove their animation tracks in the same undoable edit. An instance is read-only through its instance handle; edit its source layer explicitly.

The current script handle does **not** expose Connect, Weld, Divide as a dedicated operation, edge deletion, Attach/Detach, Boolean preview, Offset/Outline, Chamfer or Fillet. Those calls should be documented here only after their shared domain commands and MCP behavior are implemented. For current canvas editing, read [compound Bézier splines](editor-canvas-compound-splines.md); for the requested next workflow, read the [release preview](editor-canvas-spline-modeling.md).
