# Draw and edit compound Bézier splines

Use a spline when an outline needs editable points. A single Chorono spline layer can contain several independent contours, so a badge, icon or letter shape can stay together while each outline remains editable. This guide covers the controls verified in the current editor. For the broader modeling work under development, see the [spline tools release preview](editor-canvas-spline-modeling.md).

## Add another contour to one spline layer

Create or select a spline layer, then choose a **Spline Object** from **Layers → Add**. With a compatible spline selected, the new primitive can be appended to the same layer instead of creating a separate layer. The canvas also offers **Add line to spline** for a new open contour. Select the intended layer first; a locked, frozen or hidden target cannot receive the new drawing.

Use separate contours for disconnected pieces. A donut, for example, has an outer boundary and an inner boundary. The spline's fill rule determines how overlapping contours fill; it is not a command to merge their points.

## Continue an open line

Select an open endpoint on the spline. The canvas action changes to **Continue spline**. Click to add one or more points from that endpoint. Press **Enter** or right-click to finish the line open. When the line is not continuing an existing endpoint, clicking near its first point closes it. Check the visible contour before filling it.

The editor checks that the document revision and playhead time have not changed while drawing. If they change, restart the gesture; the pending line is rejected rather than written over newer work. A non-invertible layer transform also prevents an append.

## Refine Bézier points and segments

Select a point to edit its coordinates, type and incoming or outgoing handles in **Spline Point**. **Corner** makes a sharp join; **Smooth**, **Bézier** and **Bézier Corner** control handle behavior. Right-click a segment to insert a point, or right-click a contour to open, close or reverse it. These are geometry edits, so inspect the result at the intended animation time.

Fill and stroke are styled in **Properties** in the inspected editor. For the general point and handle controls, read [Edit Bézier points and spline curves](editor-canvas-splines.md). For the script API that creates contours and splits segments, read [Script editable spline geometry](spline-scripting.md).
