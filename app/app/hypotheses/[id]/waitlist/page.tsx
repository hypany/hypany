import { getTranslations } from 'next-intl/server'
import { requireAuth } from '@/auth/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import {
  getWaitlistByHypothesisId,
  getWaitlistEntries,
} from '@/functions/hypotheses'
import { getActiveOrganization } from '@/functions/organizations'

function f(date: string | Date) {
  try {
    return new Date(date).toLocaleString()
  } catch {
    return String(date)
  }
}

export default async function WaitlistPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await requireAuth()
  const activeOrgRes = await getActiveOrganization()
  const t = await getTranslations('app')

  if (!activeOrgRes?.activeOrganizationId) {
    return <div>{t('pages.hypotheses.no-active-organization')}</div>
  }

  const [waitlistData, entries] = await Promise.all([
    getWaitlistByHypothesisId(id, activeOrgRes.activeOrganizationId),
    getWaitlistEntries(id, activeOrgRes.activeOrganizationId, { limit: 50 }),
  ])

  const stats = waitlistData?.stats
  const exportCsvHref = `/api/v1/waitlists/hypothesis/${id}/export?format=csv`

  return (
    <section>
      <div className='flex items-center justify-between px-4 py-4'>
        <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
          {t('pages.hypotheses.detail.headings.waitlist')}
          {stats && (
            <span>
              {t('pages.hypotheses.detail.waitlist.summary', {
                total: stats.totalEntries,
                verified: stats.verifiedEntries,
              })}
            </span>
          )}
        </h2>
        <a
          className='text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400'
          href={exportCsvHref}
        >
          {t('pages.hypotheses.detail.waitlist.exports', { fileType: 'CSV' })}
        </a>
      </div>
      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                {t('pages.waitlist.table.columns.email')}
              </TableHeaderCell>
              <TableHeaderCell>
                {t('pages.waitlist.table.columns.name')}
              </TableHeaderCell>
              <TableHeaderCell>
                {t('pages.waitlist.table.columns.verified')}
              </TableHeaderCell>
              <TableHeaderCell>
                {t('pages.waitlist.table.columns.source')}
              </TableHeaderCell>
              <TableHeaderCell>
                {t('pages.waitlist.table.columns.signed-up')}
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.id}>
                <TableCell className='font-medium'>{e.email}</TableCell>
                <TableCell>{e.name ?? ''}</TableCell>
                <TableCell>
                  {e.emailVerified
                    ? t('common.boolean.yes')
                    : t('common.boolean.no')}
                </TableCell>
                <TableCell>{e.source ?? t('common.direct')}</TableCell>
                <TableCell>{f(e.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
