import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { and, count, eq, isNull } from 'drizzle-orm'
import { auth } from '@/auth'
import { TabNavigation, TabNavigationLink } from '@/components/atoms/tab-navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { db } from '@/drizzle'
import { hypotheses, landingPages, waitlistEntries, waitlists } from '@/schema'

export default async function HypothesisOverview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  const orgId = session?.session?.activeOrganizationId
  if (!orgId) notFound()

  const result = await db
    .select({ hypothesis: hypotheses, landingPage: landingPages, waitlist: waitlists })
    .from(hypotheses)
    .leftJoin(landingPages, eq(landingPages.hypothesisId, hypotheses.id))
    .leftJoin(waitlists, eq(waitlists.hypothesisId, hypotheses.id))
    .where(and(eq(hypotheses.id, id), eq(hypotheses.organizationId, orgId), isNull(hypotheses.deletedAt)))
    .limit(1)

  const row = result[0]
  if (!row?.hypothesis) notFound()

  // Signup count (all-time)
  let signupCount = 0
  if (row.waitlist?.id) {
    const [c] = await db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(eq(waitlistEntries.waitlistId, row.waitlist.id))
    signupCount = Number(c?.count || 0)
  }

  return (
    <section className='px-4 py-6 sm:px-6'>
      <div className='mb-2'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          {row.hypothesis.name}
        </h1>
        {row.hypothesis.description ? (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {row.hypothesis.description}
          </p>
        ) : null}
      </div>

      <div className='mb-4'>
        <TabNavigation className='gap-x-4'>
          {[
            { href: `/app/hypotheses/${id}`, name: 'Overview' },
            { href: `/app/hypotheses/${id}/editor`, name: 'Editor' },
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

      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Field</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Status</TableCell>
              <TableCell className='capitalize'>{row.hypothesis.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Signups</TableCell>
              <TableCell>{signupCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Landing</TableCell>
              <TableCell>{row.landingPage?.slug ?? '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
