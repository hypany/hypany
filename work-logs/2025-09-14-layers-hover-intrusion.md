Title: Prevent hover/selection visuals from intruding adjacent rows in Layers panel
Date: 2025-09-14

Context
- Hovering or selecting a layer row occasionally appeared to “intrude” into the neighboring row’s border/area. This was caused by two issues:
  1) The rows container used `gap-0.5` without a flex/grid context, so there was no actual spacing between rows.
  2) The selected state used an outer `ring` which draws outside the element’s bounds, visually overlapping adjacent rows when there’s no spacing.

What changed
- Added vertical spacing properly by making the list container `flex flex-col gap-0.5`.
- Made the selection ring inset by adding `ring-inset` so it renders inside the row bounds.
- Small z-index normalization (`relative z-0`) on rows to keep stacking predictable.

Files touched
- `app/app/editor/[hypothesisId]/[landingPageId]/layers.tsx`

Why
- Ensure hover/selection highlights don’t visually bleed into adjacent rows. Improves clarity and reduces visual jitter.

Validation
- Hover a row: background highlight does not overlap neighbors.
- Select a row: inset ring is contained within the row; neighboring rows remain visually intact.
- Drag-and-drop indicators remain visible and accurate.

