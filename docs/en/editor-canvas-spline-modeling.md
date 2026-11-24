# 2D spline modeling with Offset Path and Stroke to Path

Spline modeling reshapes an existing 2D vector path. Use an offset to create a parallel contour, a fillet to round a corner or an outline to create a filled band. The v0.4 **Spline Modeling** panel and the development build's **Edit** dock use different steps.

## Use the Spline Modeling panel in v0.4

1. Select a spline and open **Spline Modeling** from **Properties** or the **View** menu.
2. Choose a contour, then choose **Offset**, **Outline**, **Chamfer** or **Fillet**. Enter a distance or radius in layer-local pixels.
3. For **Offset** and **Outline**, pick **outward** or **inward** for a closed contour, or **left** or **right** for an open contour. For **Chamfer** or **Fillet**, select the corners to change.
4. Click **Preview**, inspect the cyan result, then click **Apply** for one Undo step. Use **Cancel** to discard the preview.

**Offset** adds a sibling layer with a parallel contour. **Outline** adds a sibling with a closed band or a capped strip. **Chamfer** cuts the corners of the selected contour and **Fillet** rounds them. Edit locked points or animated contours only after resolving the lock or the affected animation tracks.

## Offset a path or round a corner

In the 2D geometry development build, select a spline and open **Edit**. Open a tool from the mode-specific geometry controls or the canvas context menu. Adjust its settings, inspect **Preview**, then choose **Apply** to commit the result in one undo step. **Cancel** dismisses the preview.

| Task | Selection | Tool |
| --- | --- | --- |
| Offset an entire contour | An object or all edges of a contour | **Offset Path**. Use **Inset** or **Outset** on a closed contour and **Left**, **Right** or **Both** on an open contour. Applying replaces the selected contour unless you enable **Keep source** to append the result. |
| Bevel a sharp corner | Eligible points | **Chamfer**. Set the cut distance. |
| Round a sharp corner | Eligible points | **Fillet**. Set the radius. |

These three Edit tools measure distances in composition pixels. If a tight inner corner collapses or crosses itself in preview, try a smaller distance or radius. For a narrow border around a filled shape, use an outline band.

## Convert a stroke to a path

The **Live Outline** and **Stroke to Path** controls below are available in the 2D geometry development build.

1. Select a spline object, or select all edges of its object, and open **Outline · Live**. You can also choose **Outline** from **Add modifiers**.
2. Set width in layer-local pixels, then choose alignment, caps and joins. Inspect the preview and choose **Apply Outline**. A closed source can produce a filled band with a hole. An open source produces a strip with caps at the ends.
3. In **Edit**, use **Show source line** to see the editable centerline. Move an original point or handle to update the band. Switch **Outline enabled** off to see the original source appearance.
4. In **Properties → Paint target**, select the outline object to give the band its own fill or stroke. **Bake Outline / Stroke to Path** makes the band's boundaries directly editable. Undo restores the live outline.

![A filled Live Outline band on the inner and outer contours of a spline, with the spaces between them preserved.](../../public/docs/screenshots/spline-live-outline-v1.png)

Use the **Stroke to Path** stack entry when you want a generated band from static settings. Use **Outline · Live** when you need to edit the source curve while seeing the band update. A partial edge chain cannot drive a live outline.

## Use the spline modifier stack

In the development build, select a spline layer, open the **Edit** dock and choose **Add modifiers**. The stack is available from layer selection. Each row reads the output of the row above it. A new row starts with all eligible input geometry. Use its target control or **Use selection** to narrow the effect where available.

| Modifier | What it does |
| --- | --- |
| Offset Path | Calculates a parallel contour with configurable distance and join |
| Round Corners | Sets a radius on eligible sharp corners |
| Path Simplify | Reduces points according to a tolerance |
| Path Smoothing | Smooths tangents while keeping anchor positions |
| Path Resample | Redistributes points along the contour |
| Zig Zag | Adds a repeating pattern of peaks or curves to the contour |
| Pucker & Bloat | Pulls control points inward or pushes them away from a center |
| Repeater | Makes transformed copies of selected or eligible spline objects |

Choose **Execute stack** to apply pending settings. You can toggle, reorder or remove rows to compare results. To edit generated vertices directly, disable the relevant step or use **Bake stack** to make the evaluated geometry the editable source. If the selection controls are unavailable, check for a locked layer, an instance or an enabled modifier that owns the result.

## Set spline fill and stroke

Use **Properties** for fill and stroke. In the development build, a new spline has **No Fill** and a black 3 px stroke. Choose a solid color, gradient or pattern for the fill, then set the stroke's width, opacity, alignment, cap, join and dash style. Open contours use centered strokes. Use a closed contour when you want inside or outside stroke alignment.

To cut holes or combine overlapping areas before applying a modifier, see [compound paths and Boolean operations](editor-canvas-compound-splines.md). To reshape the original curve, see [Bézier points and spline curves](editor-canvas-splines.md).
