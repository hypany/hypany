import { getSession } from '@/auth/server'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { getActivityFeed } from '@/functions/analytics'
import { getHypothesesForOrganization } from '@/functions/hypotheses'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

type HypothesisRow = {
  id: string
  name: string
  status: string
  signupCount: number
}

type Activity = {
  email: string | null
  hypothesisId: string
  source: string
  timestamp: Date
  type: 'page_view' | 'signup' | 'verification'
}

export default async function Page() {
  const t = await getTranslations('app')
  const session = await getSession()

  if (!session?.session?.activeOrganizationId) {
    return <div>No active organization</div>
  }

  const [hypotheses, activity] = await Promise.all([
    getHypothesesForOrganization(session.session.activeOrganizationId),
    getActivityFeed(session.session.activeOrganizationId, {
      limit: 10,
      range: '30d',
    }),
  ])

  const hypothesesRows: HypothesisRow[] = hypotheses.map((h) => ({
    id: h.id,
    name: h.name,
    signupCount: h.signupCount,
    status: h.status,
  }))

  const topHypotheses = hypothesesRows
    .slice()
    .sort((a, b) => b.signupCount - a.signupCount)
    .slice(0, 5)

  const activities: Activity[] = activity.items.map((item) => ({
    email: item.email,
    hypothesisId: item.hypothesisId,
    source: item.source,
    timestamp: new Date(item.timestamp),
    type: item.type as 'page_view' | 'signup' | 'verification',
  }))

  return (
    <section aria-label={t('pages.root.aria') || 'Dashboard'}>
      <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-3'>
        <div className='col-span-1 lg:col-span-2'>
          <Card className='p-0 overflow-hidden'>
            <div className='flex items-center justify-between px-4 pt-4 pb-3'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.root.top-hypotheses')}
              </h2>
              <Link
                href='/app/hypotheses'
                className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
              >
                {t('pages.root.view-all')}
              </Link>
            </div>
            <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>
                      {t('pages.root.table.columns.hypothesis')}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {t('pages.root.table.columns.status')}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {t('pages.root.table.columns.signups')}
                    </TableHeaderCell>
                    <TableHeaderCell className='text-right'>
                      {t('pages.root.table.columns.analytics')}
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topHypotheses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className='text-center text-sm text-gray-500 dark:text-gray-500'
                      >
                        <div className='flex flex-col items-center gap-3 py-6'>
                          <div>{t('pages.root.no-hypotheses')}</div>
                          <Button asChild>
                            <Link href='/app/hypotheses/create'>
                              {t('pages.root.create-first')}
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    topHypotheses.map((h, idx) => (
                      <TableRow key={h.id ?? idx}>
                        <TableCell className='font-medium'>
                          <Link
                            href={`/app/hypotheses/${h.id}`}
                            className='hover:underline'
                          >
                            {h.name}
                          </Link>
                        </TableCell>
                        <TableCell className='capitalize'>{h.status}</TableCell>
                        <TableCell>{h.signupCount}</TableCell>
                        <TableCell className='text-right'>
                          <Link
                            href={`/app/hypotheses/${h.id}/analytics`}
                            className='text-emerald-600 hover:underline dark:text-emerald-500'
                          >
                            {t('pages.root.table.analytics-link')}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableRoot>
          </Card>
        </div>

        <div className='col-span-1'>
          <Card className='p-0 overflow-hidden'>
            <div className='px-4 pt-4 pb-3'>
              <h2 className='font-semibold text-gray-900 dark:text-gray-50'>
                {t('pages.root.recent-activity')}
              </h2>
            </div>
            <ul className='divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-800 dark:border-gray-800'>
              {activities.length === 0 ? (
                <li className='py-4 text-sm text-gray-500 dark:text-gray-500 text-center'>
                  {t('pages.root.no-activity')}
                </li>
              ) : (
                activities.map((a, idx) => {
                  const ts = a.timestamp.toISOString()
                  let label = ''
                  if (a.type === 'page_view')
                    label = t('pages.root.activity.page-view', {
                      source: a.source,
                    })
                  else if (a.type === 'signup')
                    label = t('pages.root.activity.signup', {
                      email: a.email ? ` (${a.email})` : '',
                    })
                  else if (a.type === 'verification')
                    label = t('pages.root.activity.verification', {
                      email: a.email ? ` (${a.email})` : '',
                    })
                  return (
                    <li key={idx} className='p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-medium text-gray-900 dark:text-gray-50'>
                            {label}
                          </p>
                          <p className='mt-0.5 truncate text-xs text-gray-500 dark:text-gray-500'>
                            <Link
                              href={`/app/hypotheses/${a.hypothesisId}`}
                              className='hover:underline'
                            >
                              {t('pages.root.activity.view-hypothesis')}
                            </Link>
                            <span className='mx-1'>•</span>
                            <time dateTime={ts}>
                              {new Date(ts).toLocaleString()}
                            </time>
                          </p>
                        </div>
                        <span className='shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'>
                          {a.type.replace('_', ' ')}
                        </span>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
