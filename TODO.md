# TODO

This is the focused, high‑value cleanup to align with our engineering philosophy (server‑first, type‑safe, direct, performant) and make the org model rock‑solid.

- Centralize org scoping: add a tiny `requireActiveOrg(headers)` server helper and replace ad‑hoc `session.activeOrganizationId` checks and casts across v1 APIs.
- Server‑first overview: refactor `/app` overview to a server component with direct Drizzle queries, parallelized, and properly cached.
- Remove any/as‑any: audit and replace with proper result narrowing (Eden Treaty response guards) or light util types.
- Consolidate Elysia guards: introduce an `orgGuard` middleware to enforce active org on all org‑scoped endpoints and reduce boilerplate.
- UI polish: keep OrgSwitcher minimal and consistent with atoms; audit spacing/typography/dark mode; add compact search only if necessary.
- Tests/validation: add lightweight integration checks for org scoping on APIs (list/create/update/delete) and landing‑page slug checks.

Nice‑to‑haves
- Add slug availability hinting during edit in Organizations settings form.
- Server‑triggered default org creation via Better Auth DB hooks (optional), to reduce code in app layout.
