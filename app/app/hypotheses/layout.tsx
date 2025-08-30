'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useEffect, useId, useMemo, useState } from 'react'
import { api } from '@/app/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'
import { MetricsCards } from '@/components/molecules/homepage/metrics-cards'

const navigation = [
  { href: '/app/hypotheses', name: 'overview' },
  { href: '/app/hypotheses/monitoring', name: 'monitoring' },
  { href: '/app/hypotheses/audits', name: 'audits' },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('app.hypotheses.tabs')
  const [items, setItems] = useState<Array<{ id: string; name: string }>>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectId = useId()

  // Extract hypothesis id from current path if present
  const pathId = useMemo(() => {
    const m = pathname.match(/\/app\/hypotheses\/([^/]+)/)
    return m?.[1]?.length ? m[1] : null
  }, [pathname])

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const res = await api.v1.hypotheses.get({ query: { limit: 50 } })
        const list = (res.data?.hypotheses || []).map((h: any) => ({
          id: h.id as string,
          name: h.name as string,
        }))
        if (ignore) return
        setItems(list)
        if (pathId) setSelectedId(pathId)
        else if (list.length > 0) setSelectedId(list[0].id)
      } catch {
        if (!ignore) setItems([])
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [pathId])

  const perHypothesisTabs = useMemo(() => {
    if (!selectedId)
      return [] as Array<{ href: string; label: string; active: boolean }>
    const base = `/app/hypotheses/${selectedId}`
    return [
      { href: `${base}/editor`, label: 'Editor' },
      { href: `${base}/domains`, label: 'Domains' },
      { href: `${base}/waitlist`, label: 'Waitlist' },
      { href: `${base}/analytics`, label: 'Analytics' },
      { href: `/app/settings`, label: 'Settings' },
    ].map((t0) => ({ ...t0, active: pathname === t0.href }))
  }, [pathname, selectedId])

  return (
    <div className='bg-white dark:bg-gray-925'>
      <div className='p-4 sm:p-6'>
        <MetricsCards />
      </div>
      <TabNavigation className='mt-6 gap-x-4 px-4 sm:px-6'>
        {navigation.map((item) => (
          <TabNavigationLink
            key={item.name}
            asChild
            active={pathname === item.href}
          >
            <Link href={item.href}>{t(item.name as any)}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      <div className='mt-6 flex items-end justify-between gap-3 px-4 sm:px-6'>
        <div className='w-72'>
          <label
            className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={selectId}
          >
            Active Hypothesis
          </label>
          <Select
            value={selectedId ?? ''}
            onValueChange={(v) => {
              setSelectedId(v)
              // Navigate to editor for this hypothesis when switching from portfolio tabs
              if (
                !pathname.includes('/editor') &&
                !pathname.includes('/domains') &&
                !pathname.includes('/waitlist') &&
                !pathname.includes('/analytics')
              ) {
                router.push(`/app/hypotheses/${v}/editor`)
              } else {
                // Stay on current sub-tab but swap id
                const sub = pathname.split('/').slice(-1)[0]
                router.push(`/app/hypotheses/${v}/${sub}`)
              }
            }}
          >
            <SelectTrigger id={selectId} className='py-1.5'>
              <SelectValue placeholder='Select hypothesis' />
            </SelectTrigger>
            <SelectContent>
              {items.map((it) => (
                <SelectItem key={it.id} value={it.id}>
                  {it.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-end gap-3'>
          <TabNavigation className='gap-x-4'>
            {perHypothesisTabs.map((tab) => (
              <TabNavigationLink key={tab.href} asChild active={tab.active}>
                <Link href={tab.href}>{tab.label}</Link>
              </TabNavigationLink>
            ))}
          </TabNavigation>
          <Link
            href='/app/hypotheses/create'
            className='rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-900/60'
          >
            Create Hypothesis
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
