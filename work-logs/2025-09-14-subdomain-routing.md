Title: Simplify subdomain routing (drop NEXT_PUBLIC_ENABLE_PLATFORM_SUBDOMAINS)
Date: 2025-09-14

Context
- `anaclumos.localhost:3000` worked but `anaclumos.hypany.app` did not. The middleware had a flag `NEXT_PUBLIC_ENABLE_PLATFORM_SUBDOMAINS` which could rewrite to `/s/<subdomain>`, a route we don’t implement, causing confusion.

What changed
- Removed the feature flag path. Middleware now always resolves `<slug>.<root>` to `/published/<landingPageId>` via `/api/v1/public/resolve/:slug` and rewrites, regardless of env.
- File: `middleware.ts`

Why
- Unify behavior between dev and prod and remove a potential toggle misconfiguration.

Next steps to verify root cause
- Check if production DB contains a hypothesis with slug `anaclumos`. The resolve API will 404 if not.
- Verify `NEXT_PUBLIC_PUBLISHED_ROOT_DOMAIN` is `hypany.app` in prod (no protocol). Subdomain extraction depends on it.
- Hit `https://anaclumos.hypany.app/api/v1/public/resolve/anaclumos` in prod; if 404, seed or publish the page in prod DB.

