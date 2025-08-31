import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { getServerApi } from '@/app/api/server'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'

export default async function HypothesisLayout({
  children,
  params,
}: {
  params: Promise<{ id: string }>
  children: ReactNode
}) {
  const { id } = await params
  const api = await getServerApi()
  const res = await api.v1.hypotheses({ id }).get()
  const data = res.data
  if (!data || !data.hypothesis) notFound()

  return (
    <div>
      <div className='mb-2 p-4 border-b border-gray-200 dark:border-gray-800'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {data.hypothesis.name}
        </h1>
        {data.hypothesis.description ? (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {data.hypothesis.description}
          </p>
        ) : null}
      </div>

      <div>
        <TabNavigation className='gap-x-4'>
          {[
            { href: `/app/hypotheses/${id}`, name: 'Overview' },
            {
              href: `/app/hypotheses/${id}/landing-pages`,
              name: 'Landing Pages',
            },
            { href: `/app/hypotheses/${id}/domains`, name: 'Domains' },
            { href: `/app/hypotheses/${id}/waitlist`, name: 'Waitlist' },
            { href: `/app/hypotheses/${id}/analytics`, name: 'Analytics' },
          ].map((item) => (
            <TabNavigationLink
              key={item.href}
              asChild
              active={item.href === `/app/hypotheses/${id}`}
            >
              <Link href={item.href}>{item.name}</Link>
            </TabNavigationLink>
          ))}
        </TabNavigation>
      </div>

      {children}
    </div>
  )
}
