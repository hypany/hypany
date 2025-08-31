'use client'

import { getClientApi } from '@/app/api/client'
import { Badge } from '@/components/atoms/badge'
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
import { Input } from '@/components/atoms/input'
import { CreateOrganizationForm } from '@/components/molecules/organization/create-organization-form'
import { toast } from '@/lib/use-toast'
import { RiAddLine, RiCheckLine } from '@remixicon/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

type Organization = { id: string; name: string; logo?: string | null }

export function OrgSwitcherClient({
  organizations,
  activeOrganizationId,
}: {
  organizations: Organization[] | null
  activeOrganizationId?: string | null
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')

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
    } catch {
      toast({
        description: 'Please try again.',
        title: 'Failed to switch organization',
        variant: 'error',
      })
    }
  }

  const disabled = !organizations || organizations.length === 0
  const filtered = useMemo(() => {
    if (!organizations) return [] as Organization[]
    const q = query.trim().toLowerCase()
    if (!q) return organizations
    return organizations.filter((o) => o.name.toLowerCase().includes(q))
  }, [organizations, query])

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className='flex items-center rounded-lg px-2.5 py-2 text-base font-semibold w-full min-w-0 border border-gray-200 shadow-xs bg-white/70 hover:bg-white dark:border-gray-800 dark:bg-gray-950/40 dark:hover:bg-gray-900/60'
          disabled={disabled}
        >
          <span className='flex items-center justify-between w-full min-w-0'>
            <span className='relative inline-flex items-center justify-center overflow-hidden rounded-sm ring-1 ring-gray-200 dark:ring-gray-800 shrink-0 w-7 h-7 aspect-square bg-white dark:bg-gray-900'>
              {current.logo ? (
                <Image
                  src={current.logo}
                  alt={current.name}
                  className='object-cover w-full h-full aspect-square'
                  width={28}
                  height={28}
                />
              ) : (
                <span
                  className='w-full h-full aspect-square text-xs text-white grid place-items-center'
                  style={{
                    backgroundColor: `hsl(${hueFromString(current.name)} 70% 45%)`,
                  }}
                  aria-hidden='true'
                >
                  {initials(current.name)}
                </span>
              )}
            </span>
            <span className='truncate flex-1 min-w-0 px-2 text-left'>
              {current.name}
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='min-w-72'>
          <div className='p-2 pt-2'>
            <Input
              type='search'
              placeholder='Search organizations'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputClassName='text-sm'
              autoFocus
            />
          </div>
          <DropdownMenuLabel className='text-left'>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filtered.map((org) => {
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
                <span className='flex-1 truncate text-left'>{org.name}</span>
                {isActive && (
                  <Badge variant='neutral' className='ml-1'>Active</Badge>
                )}
                {isActive && (
                  <RiCheckLine
                    className='size-4 shrink-0 text-emerald-500'
                    aria-hidden='true'
                  />
                )}
              </DropdownMenuItem>
            )
          })}
          {filtered.length === 0 && (
            <div className='px-3 py-6 text-sm text-gray-500 dark:text-gray-600'>
              No organizations found
            </div>
          )}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className='text-emerald-600 dark:text-emerald-500'
            >
              <RiAddLine className='mr-1 size-4' aria-hidden='true' />
              Create organization
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
