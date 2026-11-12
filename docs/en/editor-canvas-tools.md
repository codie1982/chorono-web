# Choose a drawing or transform tool

Choose the tool that matches the edit you are making. Moving the view, moving a layer and moving its pivot are different operations, even when they begin with a drag.

![The production toolbar with selection and transform tools.](../../public/docs/screenshots/drawing-tools-v1.jpg)

## Pick the right tool

| Tool | Use it to |
| --- | --- |
| Select | Pick objects and work with their selection handles. |
| Pan | Move your view across the canvas. |
| Pen | Draw or edit a vector path. |
| Move | Change an object's position. |
| Rotate | Turn it around its pivot. |
| Scale | Resize it with transform handles. |
| Anchor | Move the pivot used by rotation and scale. |

The active tool stays highlighted. If a drag starts panning instead of editing a layer, check that highlight first. Pan can return you to the tool you were using previously.

## Make a precise edit

Select a rectangle, choose **Move**, and drag it along one axis. Then open [Transform](editor-properties-transform.md) to check its X and Y values. Use Undo to compare the result with the starting position. Small numeric adjustments are often easier there than with another drag.

## Place shapes with a drag

With a shape tool active, press to set the start point, drag to choose its dimensions and release to finish. The tool stays active for another shape until you right-click or leave drawing mode. Escape cancels an unfinished gesture.

Off-composition objects remain editable, which is useful for an entrance or exit animation. Output uses the composition boundary, not the portion of the workspace currently visible. See [Transform and anchor](editor-properties-transform.md) for pivots and parented selections.
