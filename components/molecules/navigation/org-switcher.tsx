import { requireAuth } from '@/auth/server'
import { listUserOrganizations, getActiveOrganization } from '@/functions/organizations'
import { OrgSwitcherClient } from './org-switcher.client'

type Organization = { id: string; name: string; logo?: string | null }

export default async function OrgSwitcher() {
  await requireAuth()
  const [activeRes, organizations] = await Promise.all([
    getActiveOrganization(),
    listUserOrganizations(),
  ])
  const orgs = Array.isArray(organizations)
    ? (organizations as Organization[])
    : ([] as Organization[])
  const activeOrganizationId = activeRes?.activeOrganizationId ?? null

  return (
    <OrgSwitcherClient
      organizations={orgs}
      activeOrganizationId={activeOrganizationId}
    />
  )
}
