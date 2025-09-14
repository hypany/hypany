Title: Set default active organization at session creation (Option 3)
Date: 2025-09-14

Context
- Users saw “No active organization” on first load even when they had organizations, while the sidebar showed a selected org. This was due to the session’s `activeOrganizationId` not being set on the initial render.

What changed
- Implemented Better Auth database hook to set a default active organization immediately after a session is created.
  - File: `app/api/auth.ts`
  - Hook: `databaseHooks.session.create.after`
  - Logic: If `activeOrganizationId` is empty, read the first membership from `members` and:
    - Update `sessions.activeOrganizationId` in the database
    - Update the in-flight session via `ctx.context.setNewSession` so cookie cache reflects the change on the same response
- Removed render-time mutation logic from `auth/server.ts#getSession` that tried to set active org during layout/page render.

Why
- Ensures a consistent, stable session before any React Server Components render. Eliminates first-load mismatch without UI hacks.

Notes on implementation
- Uses Drizzle directly (no HTTP from server components) per our Server-First Architecture rules.
- Avoided `any` in new code (used explicit types and `unknown` when necessary).

Files touched
- `app/api/auth.ts`: added `databaseHooks.session.create.after` to set default active org and to update cookie session.
- `auth/server.ts`: removed auto-set logic; now only reads the session.

Validation plan
- Sign up or sign in → land on `/app` → verify there’s no “No active organization” message and data loads for the first org.
- Switch organizations via the Org Switcher and verify it persists across reloads.

Follow-ups (optional)
- Consider removing the Org Switcher’s visual fallback to the first organization when none is active, to avoid any ambiguity.

