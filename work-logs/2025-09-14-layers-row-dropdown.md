Title: Layers row dropdown opens only from three-dots
Date: 2025-09-14

Context
- Clicking anywhere on a layer row opened the context dropdown because the entire row was the `DropdownMenuTrigger`. This made accidental menu opens common and diverged from Figma-like ergonomics where only the overflow (three-dots) opens the menu.

What changed
- Moved the `DropdownMenuTrigger` from the whole row to the three-dots button.
- Removed row `onContextMenu` opening behavior; now only the three-dots button opens the menu.
- Clicking the three-dots also selects the row to ensure actions apply to the intended node.

Files touched
- `app/app/editor/[hypothesisId]/[landingPageId]/layers.tsx`

Why
- Prevent accidental dropdown openings when selecting or dragging.
- Align with expected editor ergonomics (Figma-like), where overflow controls explicitly open menus.

Validation
- Click anywhere on a row: selection changes, no dropdown opens.
- Click three-dots: dropdown opens, row becomes selected, actions work.
- Drag-and-drop on rows remains unaffected.

When