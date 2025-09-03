import 'server-only'
import { headers } from 'next/headers'
import { auth } from '@/app/api/auth'

export async function getSession() {
  const hdrs = await headers()
  let session = await auth.api.getSession({ headers: hdrs })

  // Ensure an active organization is set if the user has orgs
  if (session && !session.session?.activeOrganizationId) {
    try {
      const orgs = await auth.api.listOrganizations({ headers: hdrs })
      const first = Array.isArray(orgs) && orgs.length > 0 ? orgs[0] : null
      if (first?.id) {
        await auth.api.setActiveOrganization({
          body: { organizationId: first.id },
          headers: hdrs,
        })
        // Re-fetch to return an updated session
        session = await auth.api.getSession({ headers: hdrs })
      }
    } catch {
      // Non-fatal: leave session as-is
    }
  }

  return session
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function getUser() {
  const session = await getSession()
  return session?.user || null
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}
