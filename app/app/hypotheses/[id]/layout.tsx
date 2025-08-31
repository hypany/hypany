import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import { getHypothesisById } from '@/functions/hypotheses'
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
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  
  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  const hypothesis = await getHypothesisById(id, activeOrgRes.activeOrganizationId)
  if (!hypothesis) notFound()
  const t = await getTranslations('app')

  return (
    <div>
      <div className='mb-2 p-4 border-b border-gray-200 dark:border-gray-800'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {hypothesis.name}
        </h1>
        {hypothesis.description ? (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {hypothesis.description}
          </p>
        ) : null}
      </div>

      <div>
        <TabNavigation className='gap-x-4'>
          {[
            { href: `/app/hypotheses/${id}/landing-pages`, name: t('pages.hypotheses.tabs.landing-pages') },
            { href: `/app/hypotheses/${id}/domains`, name: t('pages.hypotheses.tabs.domains') },
            { href: `/app/hypotheses/${id}/waitlist`, name: t('pages.hypotheses.tabs.waitlist') },
            { href: `/app/hypotheses/${id}/analytics`, name: t('pages.hypotheses.tabs.analytics') },
          ].map((item) => (
            <TabNavigationLink key={item.href} asChild>
              <Link href={item.href}>{item.name}</Link>
            </TabNavigationLink>
          ))}
        </TabNavigation>
      </div>

      {children}
    </div>
  )
}
