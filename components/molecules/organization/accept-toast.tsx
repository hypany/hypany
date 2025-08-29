'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export function AcceptInvitationToast() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // accepted: "1" | "0"; reason?: string
    const accepted = params.get('accepted')
    const reason = params.get('reason')
    if (!accepted) return

    if (accepted === '1') {
      toast.success('Invitation accepted')
    } else {
      toast.error('Failed to accept invitation', {
        description: reason ? `Reason: ${reason}` : undefined,
      })
    }

    // Clean the URL to avoid duplicate toasts
    router.replace('/app/organizations')
  }, [params, router])

  return null
}

export default AcceptInvitationToast

