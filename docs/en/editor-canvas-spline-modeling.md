# Spline modeling tools: release preview

**Release preview, not a current editor instruction.** This page records the requested spline and Boolean workflow so the documentation, helper routes and implementation can be checked together. The inspected editor `main` does not yet provide the full set below. This page stays out of the public search sitemap until code and browser behavior are verified.

## Point, edge and object editing

The target workflow has explicit **Point**, **Edge** and **Object** modes in a dedicated **Spline & Boolean** panel. Each mode should select and edit only its own level. Today, point editing and some right-click segment/contour actions exist; the separate modes and panel still need implementation.

## Draw and connect contours

The current editor already supports adding independent contours to one spline layer and continuing a selected open endpoint. The proposed **Auto Close** setting changes right-click: enabled joins the last point to the first, disabled leaves the line open. **Add Line** should be able to start at one open endpoint, pass through intermediate points and finish at another open endpoint.

The planned topology commands are **Connect**, **Weld**, **Refine**, **Divide**, edge deletion, subobject copy and **Attach/Detach**. Each needs an explicit selection rule, stable geometry and animation IDs, and a single Undo/Redo step. Conflicting animation or manual edits must cause a visible rejection instead of a partial change.

## Fill, stroke and Boolean preview

The target creation flow chooses fill and stroke independently, including a stroke-only spline or no fill. The proposed Boolean workflow shows a preview, then **Apply** or **Cancel**, and lets the user reopen an existing Boolean result for editing. The preview must not silently replace source geometry or tracks.

The proposed spline vertex snap uses actual spline points with a screen-pixel tolerance that stays consistent as zoom changes. Snap settings are intended to live in one menu, and shortcuts in a separate window. The current editor still has both quick and detailed snap controls and has not verified the requested vertex collection.

## Next modeling tools

**Offset / Outline** is planned for parallel contours with direction, distance, preview and Apply/Cancel. **Chamfer** will trim and join selected straight or curved corners. **Fillet** will use a controlled radius, tangent joins and collision checks. These are not current editor commands. Read [compound spline editing](editor-canvas-compound-splines.md) for working actions today.
