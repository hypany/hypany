"use client"

import { SidebarTrigger } from '@/components/atoms/sidebar'
import { TopRightActions } from '@/components/molecules/navigation/top-right-actions'
import { SaveStatusBadge } from '@/components/atoms/save-status'
import { usePathname } from 'next/navigation'

export function AppHeader() {
  const base = 'sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4'
  const normalBg =
    'border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'
  const pathname = usePathname()
  const showSaveBadge = /^\/app\/hypotheses\/[^/]+$/.test(pathname || '')

  return (
    <header className={`${base} ${normalBg}`}>
      <SidebarTrigger className='-ml-1' />
      <div className='mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800' />
      {/* Breadcrumbs moved to server-rendered layouts */}
      <TopRightActions />
      {showSaveBadge ? <SaveStatusBadge className='ml-auto pl-2' /> : null}
    </header>
  )
}
