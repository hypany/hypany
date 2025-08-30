'use client'

import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/atoms/button'
import { cx, focusRing } from '@/lib/utils'
import { DropdownUserProfile } from './dropdown-user-profile'

type UserProfileProps = {
  user: { name?: string | null; email?: string | null } | null
}

export function UserProfileClient({ user }: UserProfileProps) {
  const initials = React.useMemo(() => {
    const src = (user?.name ?? undefined) || user?.email || ''
    const parts = src.replace(/@.*/, '').split(/\s|\./).filter(Boolean)
    const a = parts[0]?.[0] ?? ''
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase() || (src[0]?.toUpperCase() ?? 'U')
  }, [user])

  return (
    <DropdownUserProfile email={user?.email ?? null}>
      <Button
        aria-label='User settings'
        variant='ghost'
        className={cx(
          'group flex w-full items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50 dark:hover:bg-gray-800/50 dark:data-[state=open]:bg-gray-900',
          focusRing,
        )}
      >
        <span className='flex items-center gap-3'>
          <span
            className='flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'
            aria-hidden='true'
          >
            {initials}
          </span>
          <span>{user?.name || user?.email || 'User'}</span>
        </span>
        <ChevronsUpDown
          className='size-4 shrink-0 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-400'
          aria-hidden='true'
        />
      </Button>
    </DropdownUserProfile>
  )
}

export default UserProfileClient
