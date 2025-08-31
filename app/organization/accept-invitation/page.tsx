import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/app/api/auth'

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
  const session = await auth.api.getSession({ headers: hdrs })
  if (!session) {
    const next = encodeURIComponent(
      `/organization/accept-invitation?id=${invitationId}`,
    )
    redirect(`/sign-in?next=${next}`)
  }

  try {
    await auth.api.acceptInvitation({
      body: { invitationId },
      headers: hdrs,
    })
    redirect('/app/organizations?accepted=1')
  } catch (_e) {
    redirect('/app/organizations?accepted=0')
  }
}
