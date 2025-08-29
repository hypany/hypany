'use client'

import { RiArrowDownSFill } from '@remixicon/react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { client } from '@/auth/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'

export function OrgSwitcher() {
  const { data: activeOrg, isPending: activePending } = client.useActiveOrganization()
  const { data: organizations, isPending: listPending } = client.useListOrganizations()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const currentName = useMemo(() => {
    return activeOrg?.name ?? organizations?.[0]?.name ?? 'Select organization'
  }, [activeOrg, organizations])

  async function setActive(organizationId: string) {
    const res = await client.organization.setActive({ body: { organizationId } })
    if ('error' in (res as any) && (res as any).error) {
      toast.error('Failed to switch organization')
    } else {
      toast.success('Organization switched')
      // Notify the client store to refresh dependent hooks
      client.$store.notify('$sessionSignal')
    }
  }

  if (!mounted) return null

  const disabled = activePending || listPending || !organizations || organizations.length === 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-200/50 dark:hover:bg-gray-900'
        disabled={disabled}
      >
        <span className='truncate'>{currentName}</span>
        <RiArrowDownSFill className='size-5 shrink-0 text-gray-400 dark:text-gray-600' aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='min-w-56'>
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => setActive(org.id)}
            data-active={activeOrg?.id === org.id}
            className='data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-500'
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrgSwitcher

