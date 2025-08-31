import { notFound, redirect } from 'next/navigation'
import { requireAuth } from '@/auth/server'
import { getLandingPageIdForOrg } from '@/functions/landing-pages'
import { getActiveOrganization } from '@/functions/organizations'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()

  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  const lp = await getLandingPageIdForOrg(id, activeOrgRes.activeOrganizationId)
  if (!lp) notFound()
  redirect(`/app/editor/${id}/${lp.id}`)
}
