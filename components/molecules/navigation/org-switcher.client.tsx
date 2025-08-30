'use client'

import { RiArrowDownSFill, RiCheckLine } from '@remixicon/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { client } from '@/auth/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import { CreateOrganizationForm } from '@/components/molecules/organization/create-organization-form'
import { toast } from '@/lib/use-toast'

type Organization = { id: string; name: string; logo?: string | null }

export function OrgSwitcherClient({
  organizations,
  activeOrganizationId,
}: {
  organizations: Organization[] | null
  activeOrganizationId?: string | null
}) {
  const router = useRouter()

  const activeOrg = useMemo(() => {
    if (!organizations) return null
    return organizations.find((o) => o.id === activeOrganizationId) || null
  }, [organizations, activeOrganizationId])

  const current = useMemo(() => {
    const name =
      activeOrg?.name ?? organizations?.[0]?.name ?? 'Select organization'
    const logo =
      activeOrg && 'logo' in activeOrg
        ? ((activeOrg.logo as string | null) ?? undefined)
        : undefined
    return { logo, name }
  }, [activeOrg, organizations])

  function initials(name?: string) {
    if (!name) return 'O'
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const second = parts[1]?.[0] ?? ''
    return (first + second).toUpperCase() || (first || 'O').toUpperCase()
  }

  function hueFromString(s: string) {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
    return h
  }

  async function setActive(organizationId: string) {
    const res = await client.organization.setActive({ organizationId })
    if ((res as any)?.error) {
      toast({
        description: 'Please try again.',
        title: 'Failed to switch organization',
        variant: 'error',
      })
    } else {
      toast({
        description: 'Active organization updated.',
        title: 'Organization switched',
        variant: 'success',
      })
      client.$store.notify('$sessionSignal')
      router.refresh()
    }
  }

  const disabled = !organizations || organizations.length === 0

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className='flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-base font-semibold hover:bg-gray-200/50 dark:hover:bg-gray-900'
          disabled={disabled}
        >
          <span className='relative inline-flex size-7 items-center justify-center overflow-hidden rounded-md ring-1 ring-gray-200 dark:ring-gray-800'>
            {current.logo ? (
              <Image
                src={current.logo}
                alt={current.name}
                className='size-full object-cover'
                width={28}
                height={28}
              />
            ) : (
              <span
                className='size-full text-xs text-white'
                style={{
                  backgroundColor: `hsl(${hueFromString(current.name)} 70% 45%)`,
                  display: 'grid',
                  placeItems: 'center',
                }}
                aria-hidden='true'
              >
                {initials(current.name)}
              </span>
            )}
          </span>
          <span className='truncate max-w-[10rem]'>{current.name}</span>
          <RiArrowDownSFill
            className='size-5 shrink-0 text-gray-400 dark:text-gray-600'
            aria-hidden='true'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='min-w-72'>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations?.map((org) => {
            const isActive = activeOrg?.id === org.id
            const logo =
              'logo' in org
                ? ((org.logo as string | null) ?? undefined)
                : undefined
            return (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setActive(org.id)}
                data-active={isActive}
                className='flex items-center gap-2 data-[active=true]:text-emerald-600 dark:data-[active=true]:text-emerald-500'
              >
                <span className='relative inline-flex size-6 items-center justify-center overflow-hidden rounded-sm ring-1 ring-gray-200 dark:ring-gray-800'>
                  {logo ? (
                    <Image
                      src={logo}
                      alt={org.name}
                      width={24}
                      height={24}
                      className='object-cover'
                    />
                  ) : (
                    <span
                      className='size-full text-[10px] leading-none text-white'
                      style={{
                        backgroundColor: `hsl(${hueFromString(org.name)} 70% 45%)`,
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      aria-hidden='true'
                    >
                      {initials(org.name)}
                    </span>
                  )}
                </span>
                <span className='flex-1 truncate'>{org.name}</span>
                {isActive && (
                  <RiCheckLine
                    className='size-4 shrink-0 text-emerald-500'
                    aria-hidden='true'
                  />
                )}
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              + Create organization
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => router.push('/app/organizations')}>
            Manage organizations
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
        </DialogHeader>
        <CreateOrganizationForm />
      </DialogContent>
    </Dialog>
  )
}

export default OrgSwitcherClient
