import { and, eq, isNull } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { auth } from '@/auth'
import {
  TabNavigation,
  TabNavigationLink,
} from '@/components/atoms/tab-navigation'
import { db } from '@/drizzle'
import { hypotheses, landingPages, waitlists } from '@/schema'

export default async function HypothesisLayout({
  children,
  params,
}: {
  params: Promise<{ id: string }>
  children: ReactNode
}) {
  const { id } = await params
  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  const orgId = session?.session?.activeOrganizationId
  if (!orgId) notFound()

  const result = await db
    .select({
      hypothesis: hypotheses,
      landingPage: landingPages,
      waitlist: waitlists,
    })
    .from(hypotheses)
    .leftJoin(landingPages, eq(landingPages.hypothesisId, hypotheses.id))
    .leftJoin(waitlists, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, orgId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)

  const row = result[0]
  if (!row?.hypothesis) notFound()

  return (
    <div>
      <div className='mb-2 p-4 border-b border-gray-200 dark:border-gray-800'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {row.hypothesis.name}
        </h1>
        {row.hypothesis.description ? (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {row.hypothesis.description}
          </p>
        ) : null}
      </div>

      <div>
        <TabNavigation className='gap-x-4'>
          {[
            { href: `/app/hypotheses/${id}`, name: 'Overview' },
            { href: `/app/hypotheses/${id}/landing-pages`, name: 'Landing Pages' },
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
