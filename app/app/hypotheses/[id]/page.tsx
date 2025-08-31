import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
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
  const t = await getTranslations('app')

  return (
    <section>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>{t('pages.hypotheses.detail.table.columns.field')}</TableHeaderCell>
              <TableHeaderCell>{t('pages.hypotheses.detail.table.columns.value')}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>{t('pages.hypotheses.detail.table.columns.status')}</TableCell>
              <TableCell className='capitalize'>
                {hypothesis.status}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>{t('pages.hypotheses.detail.table.columns.signups')}</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>{t('pages.hypotheses.detail.table.columns.subdomain')}</TableCell>
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
