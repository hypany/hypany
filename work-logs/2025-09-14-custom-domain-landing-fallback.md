Title: Ensure custom domains hit published pages (server fallback)
Date: 2025-09-14

Context
- Some requests to custom domains were rendering the marketing homepage instead of the user’s landing page. This can happen if middleware doesn’t rewrite (platform edge conditions).

What changed
- `app/(landing)/page.tsx`: added a server-side fallback that, when on a custom domain, resolves the corresponding landing page via `resolveActiveLandingPageIdByCustomDomain(host)` and redirects to `/published/:id`.
- Keeps the existing subdomain check for `*.hypany.app` and adds the custom-domain path when no subdomain is present.

Why
- Guarantees the correct behavior even if middleware rewrite is skipped. Follows our Server-First guideline by using `/functions` directly.

Validation
- Visit a custom domain connected to a hypothesis → request reaches the marketing page server route → it resolves and redirects to `/published/:id`.
- Middleware rewrite still handles the common case; the server fallback covers edge cases.

