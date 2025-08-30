'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from '@/lib/use-toast'

export function AcceptInvitationToast() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // accepted: "1" | "0"; reason?: string
    const accepted = params.get('accepted')
    const reason = params.get('reason')
    if (!accepted) return

    if (accepted === '1') {
      toast({ title: 'Invitation accepted', variant: 'success' })
    } else {
      toast({
        description: reason ? `Reason: ${reason}` : undefined,
        title: 'Failed to accept invitation',
        variant: 'error',
      })
    }

    // Clean the URL to avoid duplicate toasts
    router.replace('/app/organizations')
  }, [params, router])

  return null
}

export default AcceptInvitationToast
