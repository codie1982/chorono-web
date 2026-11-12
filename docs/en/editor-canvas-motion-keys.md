# Edit animation positions on the canvas

Motion Keys bring position editing onto the canvas. They are useful when the movement looks wrong spatially even though its timing looks reasonable in the timeline.

![Motion Keys controls on the real canvas with a selected animated layer.](../../public/docs/screenshots/motion-keys-v1.jpg)

## Edit an existing movement

Select an animated layer and its timeline, then enable **Motion Keys**. Use **Edit** to select a position key or **Add Key** to add a new one. The selected-key inspector lets you edit world X/Y and the key's time in milliseconds.

Use **Duplicate keys** with an explicit time offset when a position should recur later. A spatial point and a key time are separate decisions: moving a point changes the route; changing its time changes when the layer gets there.

## Draw a movement

Choose **Draw Motion** and set the start/end times. **Equal time** distributes the samples evenly in time; **By distance** uses spacing along the drawing. Choose **Append** to retain existing keys and reject collisions, or **Replace start–end range** when replacing that part of the movement is intentional.

Play the result, then compare its speed in [Curve Editor](editor-timeline-curves.md). Drawing a pleasing path does not automatically produce the timing you want.

## Edit a motion path in world coordinates

A Motion Key represents native X/Y keys at the same time. Its selection shares key IDs with Timeline and Curve Editor; use Shift to add or remove points from the selection. **World X**, **World Y** and **Time** provide precise edits without dragging.

When a parent moves, the editor resolves its transform at the key's time and converts the world position back to the layer's local X/Y. Canvas zoom does not change the stored position. **Add Key** adds a position at the current time.

## Draw a route with successive clicks

Choose **Draw Motion**, then click successive route points. This is a point-by-point route, not a freehand stroke or a spatial Bézier-handle editor. Choose equal time between points or timing by distance, then apply the route as one Undo step. Cancel or press Escape to discard the preview.

Append rejects key collisions. **Replace range** replaces only X/Y keys inside the chosen window; interpolation to neighboring keys can still change, so preview across both boundaries.

For Follow Path animation, use **Edit Path Source** to change the path and **Edit Progress Timing** to change movement along it. A conflict with another driver is shown for review; the editor does not automatically bake that driver to make room.
