import { and, count, eq, isNull } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
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

  if (!result.length) notFound()

  const row = result[0]

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
    <section>
      <TableRoot>
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
              <TableCell className='capitalize'>
                {row.hypothesis.status}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Signups</TableCell>
              <TableCell>{signupCount ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Subdomain</TableCell>
              <TableCell>{(row.hypothesis as { slug?: string | null }).slug ?? '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
