'use server'

import { headers } from 'next/headers'
import { auth } from '@/app/api/auth'

export async function updateOrganizationAction(input: {
  organizationId?: string
  name?: string
  slug?: string
}) {
  const hdrs = await headers()

  try {
    // Always include organizationId
    let orgId = input.organizationId
    if (!orgId) {
      const active = await auth.api.getFullOrganization({ headers: hdrs })
      if (active && typeof active === 'object' && 'id' in active) {
        orgId = (active as { id: string }).id
      }
    }
    if (!orgId) {
      return { error: 'No active organization', ok: false }
    }

    const res = await auth.api.updateOrganization({
      body: {
        data: {
          ...(input.name ? { name: input.name } : {}),
          ...(input.slug ? { slug: input.slug } : {}),
        },
        organizationId: orgId,
      },
      headers: hdrs,
    })

    return { ok: true, organization: res }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return { error: message, ok: false }
  }
}
