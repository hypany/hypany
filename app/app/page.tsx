import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getServerApi } from '@/app/api/server'
import { Button } from '@/components/atoms/button'
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
  type Metric,
  MetricsCards,
} from '@/components/molecules/homepage/metrics-cards'

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

function isHypothesisRow(o: unknown): o is HypothesisRow {
  if (!o || typeof o !== 'object') return false
  const x = o as Record<string, unknown>
  return (
    typeof x.id === 'string' &&
    typeof x.name === 'string' &&
    typeof x.status === 'string' &&
    typeof x.signupCount === 'number'
  )
}

function isActivity(o: unknown): o is Activity {
  if (!o || typeof o !== 'object') return false
  const x = o as Record<string, unknown>
  const typeOk =
    x.type === 'page_view' || x.type === 'signup' || x.type === 'verification'
  return (
    typeOk &&
    typeof x.hypothesisId === 'string' &&
    typeof x.source === 'string' &&
    x.timestamp instanceof Date &&
    (x.email === null || typeof x.email === 'string')
  )
}

export default async function Page() {
  const t = await getTranslations('app.pages.root')
  const api = await getServerApi()

  const [hypRes, actRes] = await Promise.all([
    api.v1.hypotheses.get({ query: {} }),
    api.v1.analytics.activity.get({ query: { limit: 20, range: '30d' } }),
  ])

  const d = hypRes.data
  const act = actRes.data

  const hypotheses: HypothesisRow[] = Array.isArray(d?.hypotheses)
    ? d!.hypotheses
        .map((row: unknown) => {
          if (!row || typeof row !== 'object') return null
          const r = row as Record<string, unknown>
          const signupCount =
            typeof r.signupCount === 'number' ? r.signupCount : 0
          const id = typeof r.id === 'string' ? r.id : ''
          const name = typeof r.name === 'string' ? r.name : ''
          const status = typeof r.status === 'string' ? r.status : 'draft'
          const next: HypothesisRow = { id, name, signupCount, status }
          return isHypothesisRow(next) ? next : null
        })
        .filter((v): v is HypothesisRow => Boolean(v))
    : []

  const topHypotheses = hypotheses
    .slice()
    .sort((a, b) => b.signupCount - a.signupCount)
    .slice(0, 5)

  // Metrics summary
  const growthRate7d = Number(d?.metrics?.growthRate7d ?? 0)
  const uniqueVisitors30d = Number(d?.metrics?.uniqueVisitors30d ?? 0)
  const signups30d = Number(d?.metrics?.signups30d ?? 0)
  const readyToLaunch = Number(d?.metrics?.readyToLaunch ?? 0)
  const last7Signups = Number(d?.metrics?.last7Signups ?? 0)
  const prev7Signups = Number(d?.metrics?.prev7Signups ?? 0)
  const conversion = uniqueVisitors30d > 0 ? signups30d / uniqueVisitors30d : 0

  const metrics: Metric[] = [
    {
      fraction: `${signups30d}/${uniqueVisitors30d || 0}`,
      label: t('metrics.visitorConversion'),
      percentage: `${(conversion * 100).toFixed(1)}%`,
      value: conversion,
    },
    {
      fraction: `${last7Signups}/${prev7Signups}`,
      label: t('metrics.signupGrowthWoW'),
      percentage: `${growthRate7d >= 0 ? '+' : ''}${growthRate7d.toFixed(1)}%`,
      value: Math.max(0, Math.min(1, growthRate7d / 100)),
    },
    {
      fraction: `${readyToLaunch}/${Math.max(3, hypotheses.length)}`,
      label: t('metrics.readyToLaunch'),
      percentage: '',
      value: Math.min(1, readyToLaunch / Math.max(3, hypotheses.length || 1)),
    },
  ]

  const activities: Activity[] = Array.isArray(act?.items)
    ? act!.items.filter(isActivity)
    : []

  return (
    <section aria-label={t('aria') || 'Dashboard'}>
      <div className='px-6 py-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
              {t('title') || 'Dashboard'}
            </h1>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            <Button asChild variant='secondary'>
              <Link href='/app/assets'>{t('actions.upload-asset')}</Link>
            </Button>
            <Button asChild>
              <Link href='/app/hypotheses/create'>
                {t('actions.create-hypothesis')}
              </Link>
            </Button>
          </div>
        </div>
        {d?.metrics ? (
          <div className='mt-2'>
            <MetricsCards metrics={metrics} compact />
          </div>
        ) : null}
      </div>

      <div className='grid grid-cols-1 gap-6 px-6 pb-10 lg:grid-cols-3'>
        <div className='col-span-1 lg:col-span-2'>
          <div className='rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-925'>
            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800'>
              <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
                {t('top-hypotheses')}
              </h2>
              <Link
                href='/app/hypotheses'
                className='text-sm text-emerald-600 hover:underline dark:text-emerald-500'
              >
                {t('view-all')}
              </Link>
            </div>
            <TableRoot>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>
                      {t('table.columns.hypothesis')}
                    </TableHeaderCell>
                    <TableHeaderCell>{t('table.columns.status')}</TableHeaderCell>
                    <TableHeaderCell>{t('table.columns.signups')}</TableHeaderCell>
                    <TableHeaderCell className='text-right'>
                      {t('table.columns.analytics')}
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
                          <div>{t('no-hypotheses')}</div>
                          <Button asChild>
                            <Link href='/app/hypotheses/create'>
                              {t('create-first')}
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    topHypotheses.map((h) => (
                      <TableRow key={h.id}>
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
                            {t('table.analyticsLink')}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableRoot>
          </div>
        </div>

        <div className='col-span-1'>
          <div className='rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-925'>
            <div className='border-b border-gray-200 px-4 py-3 dark:border-gray-800'>
              <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-50'>
                {t('recent-activity')}
              </h2>
            </div>
            <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
              {activities.length === 0 ? (
                <li className='px-4 py-4 text-sm text-gray-500 dark:text-gray-500'>
                  {t('no-activity')}
                </li>
              ) : (
                activities.map((a, idx) => {
                  const ts = a.timestamp.toISOString()
                  let label = ''
                  if (a.type === 'page_view')
                    label = t('activity.page-view', { source: a.source })
                  else if (a.type === 'signup')
                    label = t('activity.signup', {
                      email: a.email ? ` (${a.email})` : '',
                    })
                  else if (a.type === 'verification')
                    label = t('activity.verification', {
                      email: a.email ? ` (${a.email})` : '',
                    })
                  return (
                    <li key={idx} className='px-4 py-3'>
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
                              {t('activity.view-hypothesis')}
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
          </div>
        </div>
      </div>
    </section>
  )
}
