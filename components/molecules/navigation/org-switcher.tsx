'use client'

import { client } from '@/auth/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Input } from '@/components/atoms/input'
import { CreateOrganizationForm } from '@/components/molecules/organization/create-organization-form'
import { RiArrowDownSFill, RiCheckLine } from '@remixicon/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function OrgSwitcher() {
  const router = useRouter()
  const { data: activeOrg, isPending: activePending } =
    client.useActiveOrganization()
  const { data: organizations, isPending: listPending } =
    client.useListOrganizations()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => setMounted(true), [])

  const current = useMemo(() => {
    const name =
      activeOrg?.name ?? organizations?.[0]?.name ?? 'Select organization'
    const logo = (activeOrg as any)?.logo as string | undefined
    return { name, logo }
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
      toast.error('Failed to switch organization')
    } else {
      toast.success('Organization switched')
      // Notify the client store to refresh dependent hooks
      client.$store.notify('$sessionSignal')
      router.refresh()
    }
  }

  if (!mounted) return null

  const disabled =
    activePending || listPending || !organizations || organizations.length === 0

  const filtered = useMemo(() => {
    if (!organizations) return []
    const q = query.trim().toLowerCase()
    if (!q) return organizations
    return organizations.filter((o) =>
      [o.name, (o as any).slug]?.some((s) => s?.toLowerCase().includes(q)),
    )
  }, [organizations, query])

  return (
    <Dialog>
      <Popover>
        <PopoverTrigger
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
        </PopoverTrigger>
        <PopoverContent align='start' className='min-w-80 p-0'>
          <div className='p-2'>
            <div className='px-2 pb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500'>
              Organizations
            </div>
            <div className='px-2 pb-2'>
              <Input
                placeholder='Search organizations'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='h-8 text-sm'
              />
            </div>
            <div className='max-h-64 overflow-auto'>
              {listPending && (
                <div className='px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400'>
                  Loading...
                </div>
              )}
              {filtered.map((org) => {
                const isActive = activeOrg?.id === org.id
                const logo = (org as any)?.logo as string | undefined
                return (
                  <button
                    key={org.id}
                    type='button'
                    onClick={() => setActive(org.id)}
                    data-active={isActive}
                    className='flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-100 data-[active=true]:bg-gray-100 dark:hover:bg-gray-900 dark:data-[active=true]:bg-gray-900'
                  >
                    <span className='relative inline-flex size-6 items-center justify-center overflow-hidden rounded-sm ring-1 ring-gray-200 dark:ring-gray-800'>
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt={org.name} className='size-full object-cover' />
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
                      <RiCheckLine className='size-4 shrink-0 text-emerald-500' aria-hidden='true' />
                    )}
                  </button>
                )
              })}
            </div>
            <div className='mt-2 flex flex-col gap-1 border-t border-gray-200 pt-2 dark:border-gray-800'>
              <DialogTrigger asChild>
                <button
                  type='button'
                  className='w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900'
                >
                  + Create organization
                </button>
              </DialogTrigger>
              <button
                type='button'
                onClick={() => router.push('/app/organizations')}
                className='w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-900'
              >
                Manage organizations
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
        </DialogHeader>
        <CreateOrganizationForm />
      </DialogContent>
    </Dialog>
  )
}

export default OrgSwitcher
