Title: Add custom domain routing via middleware + public API
Date: 2025-09-14

Context
- We want published pages to render on user-provided custom domains (e.g., example.com) hosted on Vercel.
- Subdomain routing for `*.hypany.app` already worked; custom domains needed a resolver path.

What changed
- Middleware: if no platform subdomain is detected, attempt resolving the Host as a custom domain and rewrite to `/published/:id`.
- Public API: added `GET /api/v1/public/resolve-domain?host=<host>` to resolve `landingPageId` by `hypotheses.customDomain`.
- Functions: added `resolveActiveLandingPageIdByCustomDomain(host)` using Drizzle and existing published-page selection logic.

Files touched
- `middleware.ts`
- `app/api/v1/public.ts`
- `functions/public.ts`

Why
- Ensure requests to a verified custom domain reach the correct published page without client-side redirects.

Validation
- Attach a custom domain to the Vercel project and point DNS to Vercel.
- `curl -I https://yourdomain.com/` → 200/HTML from `/published/:id` (no redirect to www.hypany.com).
- `curl -s https://yourdomain.com/api/v1/public/resolve-domain?host=yourdomain.com` → `{ id: "<landingPageId>" }`.

Follow-ups
- Add UI + API to set/verify `customDomain` and integrate with Vercel Domains API for automated attachment and status polling.

