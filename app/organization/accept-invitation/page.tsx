import { redirect } from 'next/navigation'
import { getSession } from '@/auth/server'
import {
  acceptInvitation,
  listUserOrganizations,
} from '@/functions/organizations'

export default async function AcceptInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; email?: string }>
}) {
  const params = await searchParams
  const invitationId = params?.id
  const email = params?.email

  if (!invitationId) {
    redirect('/app/organizations?accepted=0&reason=missing_id')
  }

  // Ensure user is authenticated before accepting
  const session = await getSession()
  if (!session) {
    const next = encodeURIComponent(
      `/organization/accept-invitation?id=${invitationId}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
    )
    // Redirect to sign-up to create an account with this email
    redirect(`/sign-up?email=${encodeURIComponent(email ?? '')}&next=${next}`)
  }

  // If logged in, verify account email matches the invitation email when provided
  if (
    email &&
    session.user?.email &&
    email.toLowerCase() !== session.user.email.toLowerCase()
  ) {
    redirect('/app/organizations?accepted=0&reason=wrong_account')
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
    redirect('/app/organizations?accepted=0&reason=error')
  }
}
