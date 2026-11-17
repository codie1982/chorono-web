# Offset, outline, chamfer and fillet spline contours

The **Spline Modeling** panel previews four edits to an existing Chorono spline: Offset, Outline, Chamfer and Fillet. Select a spline layer, open the panel from its Properties shortcut or restore it from **View**, then choose the contour you intend to change. The result stays editable as spline points and segments.

## Offset or outline a contour

Choose **Offset** when you need an offset path: it creates one parallel contour on a new sibling spline layer. Choose **Outline** to create a band around the source: a closed contour becomes a ring with an even-odd fill rule, while an open contour becomes a capped strip. The source layer and its animation remain in place.

Enter a positive distance in layer-local pixels. A closed contour offers **Outward** and **Inward**; an open contour offers **Left** and **Right** relative to its point order. Use **Preview** to compare the gray source with the cyan result, then **Apply** to create the sibling or **Cancel** to discard the preview.

The distance follows a sampled approximation of curved edges. Inspect tight curves and large zoom levels after Apply; a parallel curve is not guaranteed to remain mathematically equidistant from every point of an arbitrary Bézier segment.

## Chamfer or fillet selected corners

Choose **Chamfer** to trim a corner and join its sides with a straight cut. Choose **Fillet** to round it with a tangent connection. Set the distance or radius, then select eligible points in the panel. A selected canvas point can also be used. Open endpoints and locked points are unavailable for these operations.

**Preview** shows the cut or round without changing the saved scene. **Apply** replaces only the selected contour in one Undo step; other contours keep their IDs. The editor rejects overlapping cuts, collapsed geometry and contours with animation tracks that would be overwritten. Bake or remove conflicting geometry animation before trying again.

For two straight sides, the Fillet radius is exact. For curved sides, Chorono uses a sampled curve and a tangent cubic approximation, so inspect the result at your intended display size. Start with a small radius and increase it only if the preview keeps enough room between nearby corners.

## Keep the preview tied to the current scene

Changing the spline, document or scene revision after Preview invalidates that result. Run **Preview** again before Apply. Cancel removes only the temporary preview; it does not change the source or add an Undo step.

For contour creation and open-end continuation, read [compound spline editing](editor-canvas-compound-splines.md). The [spline scripting guide](spline-scripting.md) shows the same four modeling operations through the authoring API; script calls apply immediately and do not open this visual preview.

## Features still in development

The current panel does not provide separate Point, Edge and Object selection modes or a Boolean preview that can be reopened for editing. Auto Close on right-click, drawing between two open endpoints, dedicated Connect/Weld/Divide commands, Attach/Detach and spline-vertex acquisition during drawing are also outside this modeling workflow. Use the [current drawing guide](editor-canvas-compound-splines.md) for the controls available today.
