import { redirect } from 'next/navigation'
import { getSession } from '@/auth/server'
import { acceptInvitation, listUserOrganizations } from '@/functions/organizations'

export default async function AcceptInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const invitationId = params?.id

  if (!invitationId) {
    redirect('/app/organizations?accepted=0&reason=missing_id')
  }

  // Ensure user is authenticated before accepting
  const session = await getSession()
  if (!session) {
    const next = encodeURIComponent(
      `/organization/accept-invitation?id=${invitationId}`,
    )
    redirect(`/sign-in?next=${next}`)
  }

  try {
    // Verify user can access organizations (auth check)
    await listUserOrganizations()
  } catch {
    const next = encodeURIComponent(
      `/organization/accept-invitation?id=${invitationId}`,
    )
    redirect(`/sign-in?next=${next}`)
  }

  try {
    await acceptInvitation(invitationId)
    redirect('/app/organizations?accepted=1')
  } catch (_e) {
    redirect('/app/organizations?accepted=0')
  }
}
