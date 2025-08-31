import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerApi } from '@/app/api/server'

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

  const hdrs = await headers()

  // Ensure user is authenticated before accepting
  const api = await getServerApi()
  try {
    // Perform an authenticated call to check session
    await api.v1.organizations.list.get()
  } catch {
    const next = encodeURIComponent(
      `/organization/accept-invitation?id=${invitationId}`,
    )
    redirect(`/sign-in?next=${next}`)
  }

  try {
    await api.v1.organizations.invitations.accept.post({ invitationId })
    redirect('/app/organizations?accepted=1')
  } catch (_e) {
    redirect('/app/organizations?accepted=0')
  }
}
