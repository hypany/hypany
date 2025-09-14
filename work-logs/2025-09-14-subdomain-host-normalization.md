Title: Normalize root domain parsing for subdomain routing
Date: 2025-09-14

Context
- On production `slug.hypany.app` did not rewrite to `/published/:id` even though it worked on `slug.localhost:3000`.
- Root cause suspicion: `NEXT_PUBLIC_PUBLISHED_ROOT_DOMAIN` may contain protocol (`https://`) or `www.` which broke `extractSubdomainFromHost`’s `endsWith(.${root})` check.

What changed
- `lib/domains.ts`: added `stripProtocolAndWww` and used it to normalize both the incoming `hostname` and `tenantRoot`.
- This makes extraction robust if env contains `https://hypany.app`, `www.hypany.app`, or trailing slashes.

Why
- Prevent env misconfiguration from breaking subdomain detection. Keeps middleware behavior consistent across environments.

Validation
- With `NEXT_PUBLIC_PUBLISHED_ROOT_DOMAIN` set to any of:
  - `hypany.app`
  - `www.hypany.app`
  - `https://hypany.app`
  - `https://www.hypany.app/`
  Requests to `slug.hypany.app` extract `slug` correctly and middleware rewrites to `/published/:id` (when `/api/v1/public/resolve/:slug` returns 200).

