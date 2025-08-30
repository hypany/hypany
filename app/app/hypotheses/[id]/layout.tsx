'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'

const tabs = (id: string): Array<{ href: string; name: string }> => [
  { href: `/app/hypotheses/${id}/editor`, name: 'Editor' },
  { href: `/app/hypotheses/${id}/domains`, name: 'Domains' },
  { href: `/app/hypotheses/${id}/waitlist`, name: 'Waitlist' },
  { href: `/app/hypotheses/${id}/analytics`, name: 'Analytics' },
]

export default function HypothesisLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()

  return (
    <div className='bg-white dark:bg-gray-925'>
      <div className='px-4 pt-6 sm:px-6'>
        <TabNavigation className='gap-x-4'>
          {tabs(id).map((item) => (
            <TabNavigationLink
              key={item.href}
              asChild
              active={pathname === item.href}
            >
              <Link href={item.href}>{item.name}</Link>
            </TabNavigationLink>
          ))}
        </TabNavigation>
      </div>
      <div>{children}</div>
    </div>
  )
}
