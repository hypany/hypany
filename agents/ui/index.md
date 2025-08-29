UI Frontend Engineering Guide

This guide describes how to discover, evaluate, and integrate Tremor Blocks into a modern Next.js/React frontend with consistent quality, performance, and accessibility.

**What You Have**
- By‑section docs: `agents/tremor-blocks/index.md` (links to section files like `area-charts.md`, `tables.md`, `lib.md`).
- Source catalog: `agents/TREMORBLOCKS.md` (scan the first ~400 lines for the directory tree and file index if needed).

**Quick Start**
- Review sections: open `agents/tremor-blocks/index.md` to browse components by category.
- Pick a block: open the corresponding section (e.g., `tables.md`) and read all related files to understand the block.
- Extract code: copy the block’s component into your app, then adapt imports, props, and styling.
- Verify: render it in a sandbox page, confirm behavior, then integrate with real data.

**Component Discovery**
- Catalog first: use `agents/tremor-blocks/index.md` to find categories and counts.
- Locate files: within a section file, search for the file header matching your target (e.g., `### src/content/components/tables/table-04.tsx`).
- Alt path: when only the monolith exists, open `agents/TREMORBLOCKS.md` and scan the first ~400 lines; use the tree to find the exact `FILE:` anchor and jump there.

**Choosing the Right Block**
- Match use case: prefer blocks whose layout and interactivity already fit your scenario (e.g., pagination style, tooltip density, mobile affordances).
- Check dependencies: note imported utilities (e.g., `@/components/Tabs`, chart utils under `src/lib/`), and confirm equivalents exist or will be ported.
- Assess complexity: pick simplest variant that meets your needs before adding features.

**Integration Workflow**
- Create destination: place reusable UI under `src/components/<domain>/...`; page-level composition lives under `app/<route>/page.tsx` (App Router) or `pages/` (Pages Router).
- Copy block: paste component and preserve the file’s name where reasonable (helps future diffing against upstream).
- Rewire imports:
  - App aliases: map `@/components/*` via `tsconfig.json` `paths` and Next config, or convert to relative imports.
  - Utilities: copy needed `src/lib/*` functions; avoid copy‑pasting unused helpers.
- Connect data:
  - Replace mock arrays with typed props from APIs or state.
  - Keep presentational components pure; push data fetching to containers or server components.
- Validate: render in isolation, test edge cases (empty, loading, error), then integrate.

**Styling & Theming**
- Tailwind: ensure Tailwind is configured; mirror utility classes from the block.
- Design tokens: prefer class names and CSS variables over hard‑coded values; extract repeating values to a theme.
- Dark mode: blocks already include `dark:` variants—verify dark/light contrast and hover/focus states.
- Responsiveness: confirm layout at common breakpoints (`sm`, `md`, `lg`); avoid fixed widths for content lists and tables.

**Accessibility**
- Roles/ARIA: use semantic elements; preserve accessible labels on buttons and inputs.
- Focus management: verify tab order and visible focus rings.
- Color contrast: meet WCAG AA; avoid information conveyed by color alone.
- Keyboard: dialogs, tabs, tooltips, and menus must be operable via keyboard.

**State & Data Flow**
- Server vs client: prefer server components for data fetching; wrap interactive blocks with `"use client"` components.
- Prop typing: define stable, minimal props with TypeScript interfaces; avoid passing entire API objects.
- Local state: keep presentational state local; lift only when multiple components need it.
- Global state: introduce a store (e.g., Zustand) only for cross‑page, multi‑consumer state.

**Charts (Tremor)**
- Utilities: review `lib.md` for `chartUtils.ts` and helpers; reuse rather than re‑implement.
- Data shapes: normalize chart series to the expected `{ name, value }` or series arrays used by the block.
- Performance: memoize derived datasets; prefer `dynamic(() => import(...), { ssr: false })` for heavy client‑only charts.
- Tooltips: ensure accessible fallback text and keyboard reachability if interactivity is required.

**Performance**
- Code splitting: lazy‑load heavy blocks (tables, charts) behind route or interaction boundaries.
- Memoization: use `React.memo`, `useMemo`, and `useCallback` on hot paths with stable inputs.
- Virtualization: for long lists/tables, adopt virtualization before data tops a few hundred rows.
- Images/icons: prefer SVG and sprite/inline where practical; avoid unbounded `img` without sizes.

**File & Project Structure**
- Components: `src/components/<domain>/<Component>.tsx` with adjacent `types.ts` when shared.
- Hooks: `src/hooks/useX.ts`—cohesive, documented, and tested in isolation.
- Styles: co‑locate minor CSS modules; centralize tokens/theme.
- Pages: route components compose blocks and wire data only; keep pages thin.

**Testing**
- Unit: test pure logic (formatters, helpers) with Jest/Vitest.
- Component: test interactive blocks with React Testing Library; cover keyboard and ARIA.
- Visual: add Storybook stories or lightweight example pages for design reviews.
- Integration: add smoke tests for critical flows (auth, checkout, dashboards).

**Code Quality**
- TypeScript: strict mode; no `any` unless justified; narrow types at boundaries.
- Lint/format: ESLint + Prettier with CI gates.
- Commits: conventional commits; small, focused changes.
- Reviews: include screenshots or Storybook links; note a11y and perf considerations.

**Next.js Gotchas**
- Client markers: keep `"use client"` only where required; prefer server components.
- Hydration: ensure initial render matches server output; guard on `window`/`document`.
- Dynamic import: use `next/dynamic` for client‑only/heavy modules; annotate `ssr: false` as needed.
- Route data: cache with `revalidate` and `fetch` options; avoid waterfalls with `Promise.all`.

**Reusing Tremor Blocks Safely**
- Keep provenance: retain original file headers or a short comment with source path in your repo’s docs (not in code if discouraged).
- Minimize edits: adapt via wrappers and props rather than forking internals.
- Update path: when upstream changes, diff against your copy using the original path for orientation.

**Contributing New Blocks**
- Start with a minimal, accessible implementation.
- Document props, required data shape, and example usage.
- Provide empty, loading, and error states.
- Add a small test and, if possible, a Storybook story.

**Finding Components Quickly**
- Browse: open `agents/tremor-blocks/index.md`.
- Sections: open files like `tables.md`, `area-charts.md`, `kpi-cards.md`.
- Locate: search within a section for the `### src/.../file.tsx` header of interest.

Use this workflow to go from discovery → evaluation → extraction → adaptation → verification with consistent quality across the codebase.
