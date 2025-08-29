
# Engineering Philosophy

For UI Engineering, follow the instructions in ./agents/ui/index.md.

This document outlines the engineering principles and patterns used in this codebase. When making changes or additions, follow these guidelines to maintain consistency and quality.

## Core Principles

### 1. Server-First Architecture
**Do NOT fetch on the client what you can fetch on the server through Elysia Eden Treaty.**

❌ **Wrong:**
```tsx
// Client component with useEffect fetching
'use client'
export function BadComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return <div>{data}</div>
}
```

✅ **Right:**
```tsx
// Server component with Elysia Eden Treaty
export async function GoodComponent() {
  const data = await client.api.get('...')
  return <div>{data}</div>
}
```

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
**Access data directly when possible.**

❌ **Wrong:**
```tsx
// Making API call from server component
const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/campaigns/${id}`)
const campaign = await response.json()
```

✅ **Right:**
```tsx
// Direct database query
const [campaign] = await db
  .select()
  .from(campaigns)
  .where(eq(campaigns.id, id))
  .limit(1)
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
- Use Eden Treaty for type-safe client-server communication
- Handle errors with proper type narrowing
- Always check for error responses before accessing data

### Database (Drizzle)
- Use the existing schema as source of truth
- Don't add fields that plugins already provide
- Use proper relations and indexes
- Always limit queries when fetching single records

### UI Components
- Use Shadcn components - they're already installed
- Use Sonner for toast notifications (not inline messages)
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
- [ ] Toast notifications using Sonner, not inline messages
- [ ] Parallel data fetching where possible
- [ ] Server components used by default

## Philosophy Summary

**"The best code is no code. The second best is code that directly solves the problem using platform capabilities."**

Don't be clever. Be clear. Be direct. Be type-safe. Ship fast, but ship right.

When John Carmack reads your code, he should nod in approval, not shake his head at unnecessary complexity.
