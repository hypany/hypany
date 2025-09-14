# Engineering Philosophy

For UI Engineering, follow the instructions in ./agents/ui/index.md.

This document outlines the engineering principles and patterns used in this codebase. When making changes or additions, follow these guidelines to maintain consistency and quality.

## Simple Rules

- Use Bun
- Use Tailwind and Tremor (NOT shadcn/ui)
- Use React Server Components
- Use React Query for data mutations
- Do not use Unicode Icons or Emojis; use Lucide Icons instead
- Document all work logs in `/work-logs`
- Always read `/work-logs` in full before starting any codework

## Core Principles

### 1. Server-First Architecture
**React Server Components fetch directly from the database. Client Components receive initial data from Server Components and use React Query for revalidation.**

⚠️ **CRITICAL: Never use Eden Treaty (HTTP requests) in Server Components - it causes infinite loops during SSR!**
⚠️ **CRITICAL: All data access functions must be in `/functions` directory at root!**

❌ **Wrong:**
```tsx
// Server component making HTTP request to itself - CAUSES DEADLOCK!
export async function BadServerComponent() {
  const api = await getServerApi() // This uses Eden Treaty internally
  const data = await api.v1.hypotheses.get() // HTTP request to self = deadlock
  return <div>{data}</div>
}
```

✅ **Right Pattern:**
```tsx
// functions/hypotheses.ts - Shared data access
export async function getHypotheses() {
  const [data] = await db.select().from(hypotheses)
  return data
}

// Server Component - Fetches initial data
import { getHypotheses } from '@/functions/hypotheses'

export async function ParentServerComponent() {
  const initialData = await getHypotheses()
  return <ClientComponent initialData={initialData} />
}

// Client Component - Uses initial data + React Query for revalidation
'use client'
import { useQuery } from '@tanstack/react-query'

export function ClientComponent({ initialData }) {
  const { data } = useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => fetch('/api/v1/hypotheses').then(r => r.json()),
    initialData,
    staleTime: 30 * 1000, // Consider data fresh for 30s
  })
  
  return <div>{/* Use data */}</div>
}

// For mutations - use Eden Treaty
const mutation = useMutation({
  mutationFn: (data) => client.api.v1.hypotheses.post(data)
})

### 2. Type Safety Without Compromise
**Never use `any`. Ever.**

- Use Better Auth's inferred types: `typeof auth.$Infer.Session`
- Use Elysia Eden Treaty for type-safe API clients and Drizzle ORM for database access
- Infer database types from Drizzle schemas
- If you need a type, derive it from the source of truth

❌ **Wrong:**
```ts
const org = orgs?.find((o: any) => o.slug === orgSlug)
```

✅ **Right:**
```ts
type Organization = Awaited<ReturnType<typeof auth.api.listOrganizations>>[number]
const org = orgs?.find((o) => o.slug === orgSlug)
```

### 3. Use Platform Features, Not Libraries
**Leverage what Better Auth, Stripe, and the platform provide.**

❌ **Wrong:**
```ts
// Creating custom billing API when Stripe plugin exists
export const billingApi = new Elysia({ prefix: '/billing' })
  .post('/create-checkout-session', async () => {
    // Custom implementation
  })
```

✅ **Right:**
```ts
// Use Better Auth's Stripe plugin
await client.subscription.upgrade({
  plan: "pro",
  successUrl: "/dashboard",
  cancelUrl: "/pricing"
})
```

### 4. Direct Over Indirect
**Access data directly when possible. Share data access functions between Elysia routes and Server Components.**

❌ **Wrong:**
```tsx
// Making API call from server component
const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/campaigns/${id}`)
const campaign = await response.json()
```

✅ **Right:**
```tsx
// Shared data access function used by both Elysia and Server Components
// functions/campaigns.ts (MUST be in /functions directory!)
export async function getCampaign(id: string) {
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.id, id))
    .limit(1)
  return campaign
}

// In Server Component
import { getCampaign } from '@/functions/campaigns'
const campaign = await getCampaign(id)

// In Elysia route
import { getCampaign } from '@/functions/campaigns'
.get('/:id', async ({ params }) => {
  return await getCampaign(params.id)
})
```

### 5. Performance is Not Optional
**Every decision should consider performance.**

- Use parallel routes for independent data fetching
- Implement proper caching strategies
- Avoid waterfall requests
- Use React Server Components to minimize client-side JavaScript

❌ **Wrong:**
```tsx
// Sequential fetching
const user = await getUser()
const org = await getOrg(user.orgId)
const members = await getMembers(org.id)
```

✅ **Right:**
```tsx
// Parallel fetching
const [user, org, members] = await Promise.all([
  getUser(),
  getOrg(userId),
  getMembers(orgId)
])
```

## Technology-Specific Guidelines

### Better Auth
- Use server helper functions (`getSession`, `listOrganizations`) for server-side operations
- Never call client methods from the server
- Leverage built-in plugins (Stripe, Organization) instead of building custom solutions
- Use `referenceId` for multi-tenant scenarios (users, organizations)

### Elysia & Eden Treaty
- Use Eden Treaty ONLY for mutations in Client Components
- Never use Eden Treaty in Server Components (causes SSR deadlock)
- Create shared data access functions in `/functions` directory for use in both Elysia routes and Server Components
- Client Components should receive initial data from Server Components and use React Query for revalidation
- Handle errors with proper type narrowing
- Always check for error responses before accessing data

### Database (Drizzle)
- Use the existing schema as source of truth
- Don't add fields that plugins already provide
- Use proper relations and indexes
- Always limit queries when fetching single records

### UI Components
- Use Shadcn components - they're already installed
- Use the built-in toast (`@/lib/use-toast` + `<Toaster />`) for notifications (not inline messages)
- Server components by default, client components only when necessary
- Pass data down, not fetch up

## Anti-Patterns to Avoid

### 1. Client-Side Data Fetching in Server-Rendered Apps
If you're writing `useEffect` to fetch data, you're probably doing it wrong.

### 2. Duplicating Plugin Functionality
Before building anything, check if Better Auth, Stripe, or other plugins already provide it.

### 3. Ignoring Type Errors
TypeScript errors are not suggestions. Fix them properly, don't suppress them.

### 4. Creating Unnecessary Abstractions
Don't wrap platform features in custom abstractions unless absolutely necessary.

### 5. Fetching Without Caching
Always consider caching strategy. Use Next.js cache directives and React cache when appropriate.

## Code Review Checklist

Before submitting code, ensure:

- [ ] No `any` types
- [ ] No client-side fetching of server-available data  
- [ ] No duplicate implementations of platform features
- [ ] All TypeScript errors resolved
- [ ] Direct database access from server components
- [ ] Proper error handling with type safety
- [ ] Toast notifications using the built-in toast (not inline messages)
- [ ] Parallel data fetching where possible
- [ ] Server components used by default

## Philosophy Summary

**"The best code is no code. The second best is code that directly solves the problem using platform capabilities."**

Don't be clever. Be clear. Be direct. Be type-safe. Ship fast, but ship right.

When John Carmack reads your code, he should nod in approval, not shake his head at unnecessary complexity.
