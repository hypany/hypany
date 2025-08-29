'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type React from 'react'
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
  const t = useTranslations('app.hypotheses.tabs')
  return (
    <>
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
        <>{children}</>
      </div>
    </>
  )
}
