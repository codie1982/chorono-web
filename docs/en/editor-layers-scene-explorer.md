# Find and organize layers in Scene Explorer

Scene Explorer is useful once a project is too busy to navigate by clicking the canvas. Its rows describe the source hierarchy, while columns expose common layer states.

![Search, filters and layer state columns in Scene Explorer.](../../public/docs/screenshots/scene-explorer-v1.jpg)

## Find a layer

Search by name, use a type filter, or try a query such as `type:shape has:keyframes`. **Find selected** brings the current selection into view when it is outside the visible rows. Clear a restrictive filter before concluding that a layer has disappeared.

## Work with a branch

Expand or collapse a group to navigate its children. Subtree operations apply to the selected layer and its source descendants, including children outside the current filtered view. Read the selection count before locking, hiding or freezing a branch.

Expand and Collapse change only the panel view. Show, Hide, Lock, Solo and Freeze subtree actions change the selected source branches, including hidden or filtered children. Ordinary row flags affect that row's layer. Undo restores the previous mixed states across the branch.

Visibility, Lock, Solo and Pin are separate states. Use Exit isolation to leave a temporary isolated view; Show All is a visibility operation. Color labels help distinguish related objects without changing their names.

Right-click a row for duplication, deletion, grouping and other available actions. After moving a layer in the hierarchy, check its placement: a parent transform affects its children. Keep [Clone and Instance](editor-layers-cloning.md) separate from ordinary group organization.

## Isolate a branch temporarily

Use **Isolate** to focus on selected branches while keeping the parent context needed to position them. Children you manually hid stay hidden. Choose **Exit isolation** to return to the full scene; edits made while isolated remain.

Isolation is a temporary visual workspace state. It does not change saved layer visibility, add an Undo entry, enter project JSON or limit exported output. It also does not mute audio. Use persistent visibility or Solo controls when you need a saved scene change.

## Reveal selected animation rows

**Find selected** and the Layers **▤ Timeline** action reveal selected source layers even when an ancestor is collapsed. The views can temporarily relax filters to show the selection; **Restore filters** restores the previous view. This is an explicit navigation action, so ordinary selection does not constantly move your scroll position.
