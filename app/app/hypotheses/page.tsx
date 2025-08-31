import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { requireAuth } from '@/auth/server'
import { getActiveOrganization } from '@/functions/organizations'
import { getHypothesesForOrganization, getHypothesesMetrics } from '@/functions/hypotheses'
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
import { getTranslations } from 'next-intl/server'

type Row = {
  id: string
  name: string
  status: string
  signupCount: number
  slug: string | null
  landingPageId: string | null
}

export default async function HypothesesPage() {
  await requireAuth()
  const t = await getTranslations('app')
  const activeOrgRes = await getActiveOrganization()
  
  if (!activeOrgRes?.activeOrganizationId) {
    return (
      <section className='px-4 py-6 sm:p-6'>
        <p className='text-sm text-gray-500 dark:text-gray-500'>
          {t('pages.hypotheses.no-active-organization')}
        </p>
      </section>
    )
  }

  const [hypotheses, metricsData] = await Promise.all([
    getHypothesesForOrganization(activeOrgRes.activeOrganizationId),
    getHypothesesMetrics(activeOrgRes.activeOrganizationId),
  ])

  if (!hypotheses || hypotheses.length === 0) {
    return (
      <section className='px-4 py-6 sm:p-6'>
        <p className='text-sm text-gray-500 dark:text-gray-500'>
          {t('pages.hypotheses.no-data')}
        </p>
      </section>
    )
  }
  
  const data: Row[] = hypotheses.map((h) => ({
    id: h.id,
    landingPageId: h.landingPageId ?? null,
    name: h.name,
    signupCount: h.signupCount ?? 0,
    slug: h.slug ?? null,
    status: h.status,
  }))

  // Compute metrics from direct database calls
  const growthRate7d = Number(metricsData?.growthRate7d ?? 0)
  const uniqueVisitors30d = Number(metricsData?.uniqueVisitors30d ?? 0)
  const signups30d = Number(metricsData?.signups30d ?? 0)

  // We skip sparkline details here; link to analytics page for details

  // Use database-provided ready-to-launch count
  const readyToLaunch = Number(metricsData?.readyToLaunch ?? 0)

  const conversion = uniqueVisitors30d > 0 ? signups30d / uniqueVisitors30d : 0
  const denom = 3
  const readyCount = readyToLaunch
  const metrics: Metric[] = [
    {
      fraction: `${signups30d}/${uniqueVisitors30d || 0}`,
      label: t('pages.root.metrics.visitor-conversion'),
      percentage: `${(conversion * 100).toFixed(1)}%`,
      value: conversion,
    },
    {
      fraction: `${Number(metricsData?.last7Signups ?? 0)}/${Number(metricsData?.prev7Signups ?? 0)}`,
      label: t('pages.root.metrics.signup-growth-wow'),
      percentage: `${growthRate7d >= 0 ? '+' : ''}${growthRate7d.toFixed(1)}%`,
      value: Math.max(0, Math.min(1, growthRate7d / 100)),
    },
    {
      fraction: `${readyCount}/${denom}`,
      label: t('pages.root.metrics.ready-to-launch'),
      percentage: '',
      value: Math.min(1, readyCount / denom),
    },
  ]

  return (
    <section>
      <MetricsCards metrics={metrics} compact />

      {/** Global chart removed for clarity */}
      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>{t('pages.root.table.columns.hypothesis')}</TableHeaderCell>
              <TableHeaderCell>{t('pages.root.table.columns.status')}</TableHeaderCell>
              <TableHeaderCell>{t('pages.root.table.columns.signups')}</TableHeaderCell>
              <TableHeaderCell>{t('pages.root.table.columns.analytics')}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>
                  <Link
                    href={`/app/hypotheses/${item.id}`}
                    className='hover:underline'
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className='capitalize'>
                  <Link
                    href={`/app/hypotheses/${item.id}/landing-pages`}
                    className='group inline-flex items-center gap-1 hover:underline'
                  >
                    {item.status}
                    <Pencil className='size-3.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600' />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/app/hypotheses/${item.id}/waitlist`}
                    className='hover:underline'
                  >
                    {item.signupCount}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/app/hypotheses/${item.id}/analytics`}
                    className='group inline-flex items-center gap-3 text-emerald-600 hover:underline dark:text-emerald-500'
                  >
                    {t('pages.root.table.analytics-link')}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
