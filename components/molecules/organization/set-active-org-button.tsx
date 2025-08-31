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
        title: 'Organization switched',
        description: 'Active organization updated.',
        variant: 'success',
      })
      router.refresh()
    } catch (e) {
      toast({
        title: 'Failed to switch organization',
        description: (e as Error).message ?? 'Please try again.',
        variant: 'error',
      })
    }
  }

  return (
    <Button variant='secondary' className='py-1.5' onClick={onSetActive}>
      Set active
    </Button>
  )
}

