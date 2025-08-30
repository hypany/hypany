import { headers } from 'next/headers'
import { auth } from '@/auth'
import { OrgSwitcherClient } from './org-switcher.client'

type Organization = Awaited<
  ReturnType<typeof auth.api.listOrganizations>
>[number]

export default async function OrgSwitcher() {
  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  const orgs = await auth.api.listOrganizations({ headers: hdrs })
  const organizations = (Array.isArray(orgs) ? orgs : []) as Organization[]
  const activeOrganizationId = session?.session?.activeOrganizationId ?? null

  return (
    <OrgSwitcherClient
      organizations={organizations}
      activeOrganizationId={activeOrganizationId}
    />
  )
}
