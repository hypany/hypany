## TODO - WYSIWYG Editor (Webflow/Framer Level)

Status: items with [x] are shipped; we'll tackle the rest one by one.

### Foundation (Done)
- [x] Replace Template1 with PageDocument renderer (public + fallback)
- [x] Builder schema: builderDraftJson, builderPublishedJson, versions table
- [x] Server functions: get/save/publish/list/restore
- [x] Editor shell (RSC + client), React Query provider
- [x] Library primitives (Section/Container/Grid/Heading/Text/Button/Image/Divider/Spacer/Icon)
- [x] Block templates (Hero/Features/FAQ/Footer)
- [x] Inspector basics (content, align, padding/margin/bg, button radius, grid cols/gap)
- [x] Image upload to Blob; Icon picker (curated Lucide)
- [x] Canvas: device views (Phone/Tablet/Desktop/Full), zoom, inline text edit, overflow-x fix
- [x] DnD baseline (reorder/move with before/after lines + inside overlay)
- [x] Autosave debounced; "Draft saved" toast only on changes
- [x] Versions dialog; Preview button

### Next - High-ROI UX
1) Layer Panel (MVP)
   - [ ] Tree view with select/rename/reorder/lock/hide
   - [ ] Keyboard nav + quick actions (duplicate/delete)
   - [ ] Context menu (Rename/Duplicate/Delete/Wrap in Container)

2) Resizers + Constraints
   - [ ] Resize handles for Box/Image/Text/Button
   - [ ] Aspect lock for images; min/max sizes
   - [ ] z-index controls; absolute/relative positioning

3) Responsive Overrides
   - [ ] Per-breakpoint style overrides for all style fields
   - [ ] Override indicators + "reset to base" control

4) Snapping + Measurements
   - [ ] Snap to container/sibling edges/centers; grid snap option
   - [ ] Rulers/guides; live spacing/size badges during drag/resize

5) Undo/Redo Stack
   - [ ] In-memory transaction stack with throttling/merging
   - [ ] Hook into autosave after idle; Ctrl/Cmd+Z/Y shortcuts

6) Components (Symbols) - MVP
   - [ ] Convert selection to component, create instances
   - [ ] Instance overrides (text/image), simple slots
   - [ ] Detach instance

### Advanced Styling & Inspector
- [ ] Typography system (fonts, scale, line-height, letter-spacing)
- [ ] Full borders/shadows/filters with presets
- [ ] Color tokens and theme editor (colors/radii/shadows)
- [ ] Class/styles reuse (local style presets)

### Interactions & Animations
- [ ] Triggers (hover/tap/scroll/viewport/page-load)
- [ ] Actions (navigate, open dialog, set state, animate)
- [ ] Timeline editor; scroll-linked animations (later)

### Data Binding (CMS) - Later Phase
- [ ] Collections (fields, relations, slugs)
- [ ] Repeaters (bind list -> nodes), filters, sorting
- [ ] Dynamic routes and SEO meta editor

### Assets & Publishing
- [ ] Asset library (folders/tags, replace, optimize)
- [ ] Publish status in toolbar (draft/published timestamp)
- [ ] Shareable preview links; publish history & rollback UI

### QA / A11y / i18n / Perf
- [ ] Keyboard ops parity (DnD, overlays), ARIA labels
- [ ] Internationalized strings for editor UI
- [ ] Perf budgets; lazy-load heavy panels; image srcset


## Others

- Centralize org scoping: add a tiny `requireActiveOrg(headers)` server helper and replace ad‑hoc `session.activeOrganizationId` checks and casts across v1 APIs.
- Server‑first overview: refactor `/app` overview to a server component with direct Drizzle queries, parallelized, and properly cached.
- Remove any/as‑any: audit and replace with proper result narrowing (Eden Treaty response guards) or light util types.
- Consolidate Elysia guards: introduce an `orgGuard` middleware to enforce active org on all org‑scoped endpoints and reduce boilerplate.
- UI polish: keep OrgSwitcher minimal and consistent with atoms; audit spacing/typography/dark mode; add compact search only if necessary.
- Tests/validation: add lightweight integration checks for org scoping on APIs (list/create/update/delete) and landing‑page slug checks.

### Nice‑to‑haves
- Add slug availability hinting during edit in Organizations settings form.
- Server‑triggered default org creation via Better Auth DB hooks (optional), to reduce code in app layout.
