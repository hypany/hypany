import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function AcceptInvitationPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const invitationId = searchParams?.id

  if (!invitationId) {
    redirect('/app/organizations?accepted=0&reason=missing_id')
  }

  const hdrs = await headers()

  // Ensure user is authenticated before accepting
  const session = await auth.api.getSession({ headers: hdrs })
  if (!session) {
    const next = encodeURIComponent(`/organization/accept-invitation?id=${invitationId}`)
    redirect(`/sign-in?next=${next}`)
  }

  try {
    await auth.api.acceptInvitation({
      body: { invitationId },
      headers: hdrs,
    })
    redirect('/app/organizations?accepted=1')
  } catch (e) {
    redirect('/app/organizations?accepted=0')
  }
}

