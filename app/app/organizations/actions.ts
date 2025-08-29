"use server"

import { headers } from 'next/headers'
import { auth } from '@/auth'

export async function updateOrganizationAction(input: {
  organizationId?: string
  name?: string
  slug?: string
}) {
  const hdrs = await headers()

  try {
    const bodyBase = {
      data: {
        ...(input.name ? { name: input.name } : {}),
        ...(input.slug ? { slug: input.slug } : {}),
      },
    }
    const res = await auth.api.updateOrganization({
      body: (input.organizationId
        ? { ...bodyBase, organizationId: input.organizationId }
        : (bodyBase as any)) as any,
      headers: hdrs,
    })

    return { ok: true, organization: res }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return { ok: false, error: message }
  }
}
