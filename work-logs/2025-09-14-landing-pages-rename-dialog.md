Title: Landing Pages — Rename opens dialog
Date: 2025-09-14

Context
- In the landing pages grid (`/app/hypotheses/:id/landing-pages`), the “Edit Name” action toggled inline editing inside the card. The desired behavior is to open a dialog for a more stable, focused rename UX.

What changed
- `LandingPageCard` now opens a dialog when choosing “Edit Name”. The dialog contains an input and Cancel/Save buttons. On save, it PATCHes the page name and refreshes the route.

Files touched
- `app/app/hypotheses/[id]/landing-pages/ui.tsx`

Details
- Imported `Dialog` and `Input` atoms.
- Added local state for dialog open/value/loading; wired save to `api.v1['landing-pages']['by-id'](...).patch({ name })`.
- Shows a success toast and closes dialog on success; error toast otherwise.

Validation
- Click “Edit Name” from the card’s menu → dialog opens.
- Enter a new name → Save → toast shows, dialog closes, and the listing refreshes with the new name.

