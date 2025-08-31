import { getServerApi } from '@/app/api/server'
import { OrgSwitcherClient } from './org-switcher.client'

type Organization = { id: string; name: string; logo?: string | null }

export default async function OrgSwitcher() {
  const api = await getServerApi()
  const [{ data: activeRes }, { data: organizations }] = await Promise.all([
    api.v1.organizations.active.get(),
    api.v1.organizations.list.get(),
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
