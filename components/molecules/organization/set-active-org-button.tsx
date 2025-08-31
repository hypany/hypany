'use client'

import { useRouter } from 'next/navigation'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { toast } from '@/lib/use-toast'

export default function SetActiveOrgButton({
  organizationId,
}: {
  organizationId: string
}) {
  const router = useRouter()

  async function onSetActive() {
    const api = getClientApi()
    try {
      const res = await api.v1.organizations['set-active'].post({
        organizationId,
      })
      if (!res.data) throw new Error('No response')
      toast({
        description: 'Active organization updated.',
        title: 'Organization switched',
        variant: 'success',
      })
      router.refresh()
    } catch (e) {
      toast({
        description: (e as Error).message ?? 'Please try again.',
        title: 'Failed to switch organization',
        variant: 'error',
      })
    }
  }

  return (
    <Button variant='secondary' onClick={onSetActive}>
      Set active
    </Button>
  )
}
