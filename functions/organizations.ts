import 'server-only'
import { auth } from '@/app/api/auth'
import { headers } from 'next/headers'

/**
 * List all organizations for the current user
 */
export async function listUserOrganizations() {
  const hdrs = await headers()
  const orgs = await auth.api.listOrganizations({
    headers: hdrs,
  })
  return orgs || []
}

/**
 * Get the active organization from the session
 */
export async function getActiveOrganization() {
  const hdrs = await headers()
  const session = await auth.api.getSession({
    headers: hdrs,
  })
  if (!session?.session?.activeOrganizationId) {
    return null
  }
  return {
    activeOrganizationId: session.session.activeOrganizationId
  }
}

/**
 * Create a new organization
 */
export async function createOrganization(data: {
  name: string
  slug: string
  logo?: string
  metadata?: Record<string, any>
}) {
  const hdrs = await headers()
  const response = await auth.api.createOrganization({
    headers: hdrs,
    body: data,
  })
  return response
}

/**
 * Set the active organization
 */
export async function setActiveOrganization(organizationId: string) {
  const hdrs = await headers()
  const response = await auth.api.setActiveOrganization({
    headers: hdrs,
    body: { organizationId },
  })
  return response
}

/**
 * Accept an organization invitation
 */
export async function acceptInvitation(invitationId: string) {
  const hdrs = await headers()
  const response = await auth.api.acceptInvitation({
    headers: hdrs,
    body: { invitationId },
  })
  return response
}

/**
 * Count members for an organization (server-only)
 */
export async function countMembers(organizationId: string) {
  const hdrs = await headers()
  const res = await auth.api.listMembers({
    headers: hdrs,
    query: { organizationId },
  })
  if (!res) return 0
  if (typeof (res as any).total === 'number') return (res as any).total as number
  const members = (res as any).members as unknown[] | undefined
  return Array.isArray(members) ? members.length : 0
}

/**
 * Count pending invitations for an organization (server-only)
 */
export async function countInvitations(organizationId: string) {
  const hdrs = await headers()
  const res = (await auth.api.listInvitations({
    headers: hdrs,
    query: { organizationId },
  })) as unknown
  if (Array.isArray(res)) return res.length
  if (res && typeof (res as any).total === 'number') return (res as any).total
  return 0
}
