import { notFound } from 'next/navigation'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import { getHypothesisById } from '@/functions/hypotheses'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'

export default async function HypothesisOverview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  
  if (!activeOrgRes?.activeOrganizationId) {
    notFound()
  }

  const hypothesis = await getHypothesisById(id, activeOrgRes.activeOrganizationId)
  if (!hypothesis) notFound()

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
                {hypothesis.status}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Signups</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Subdomain</TableCell>
              <TableCell>
                {hypothesis.slug ?? '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
