Title: Fix Layers disclosure arrow orientation
Date: 2025-09-14

Context
- The expand/collapse arrow in the Layers panel pointed down when folded and left when unfolded. Expected behavior is right (folded) and down (unfolded), matching common disclosure patterns (e.g., Figma).

What changed
- Replaced the custom inline SVG + rotation with Lucide icons `ChevronRight` (collapsed) and `ChevronDown` (expanded).
- File: `app/app/editor/[hypothesisId]/[landingPageId]/layers.tsx`

Why
- Clear, conventional orientation improves scannability and matches user expectations.

Validation
- Node with children collapsed → arrow points right; click toggles to down.
- Node expanded → arrow points down; click toggles to right.

