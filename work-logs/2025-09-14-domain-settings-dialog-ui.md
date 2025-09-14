Title: Domain Settings Dialog — custom domain UX and verification
Date: 2025-09-14

Context
- We need an end-to-end flow for connecting custom domains and verifying DNS from the app UI, using the existing Domain Settings dialog.

What changed
- Dialog (`DomainEditButton`) now shows DNS instructions for the entered custom domain, and adds a “Verify connection” action that calls the server to probe `/_hypany_probe` on the domain.
- The PATCH endpoint already syncs domains with Vercel. Improved it to remove the previous domain from the Vercel project when changing to a new domain (prevents stale domain attachments).

Files touched
- `app/app/hypotheses/[id]/domains/edit-button.tsx`: added DNS instructions panel + verify button (uses React Query mutation) and normalized display of domain.
- `app/api/v1/landing-pages.ts`: when setting a new `customDomain`, also remove any previous domain from the Vercel project.

Flow summary
1) Open “Domain Settings” → edit subdomain + custom domain.
2) Save → server validates + updates DB, and ensures the new domain(s) are attached to the Vercel project.
3) Configure DNS at registrar (A apex → 76.76.21.21, CNAME www → cname.vercel-dns.com).
4) Click “Verify connection” → server probes `https://<domain>/_hypany_probe` (falls back to http) → toast success/failure.

Notes
- Verification uses the existing `/api/v1/landing-pages/hypothesis/:id/verify-domain` endpoint.
- DNS instructions are generic and provider-agnostic; Vercel-managed DNS will validate automatically.

