'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'
import { MetricsCards } from '@/components/molecules/homepage/metrics-cards'

const navigation = [
  { href: '/app/hypotheses', name: 'Overview' },
  { href: '/app/hypotheses/monitoring', name: 'Monitoring' },
  { href: '/app/hypotheses/audits', name: 'Audits' },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
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
              <Link href={item.href}>{item.name}</Link>
            </TabNavigationLink>
          ))}
        </TabNavigation>
        <>{children}</>
      </div>
    </>
  )
}
