import { Pencil } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { treaty } from '@elysiajs/eden'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { MetricsCards, type Metric } from '@/components/molecules/homepage/metrics-cards'
import { serviceUrl } from '@/lib/url'
import type { App } from '@/app/api/[[...slugs]]/route'

type Row = {
  id: string
  name: string
  status: string
  signupCount: number
  slug: string | null
  landingPageId: string | null
}

export default async function HypothesesPage() {
  const hdrs = await headers()
  const cookie = hdrs.get('cookie') ?? ''
  const { api } = treaty<App>(serviceUrl, {
    fetcher: (url, init) => fetch(url, { ...init, headers: { ...init?.headers, cookie } }),
  })

  const res = await api.v1.hypotheses.get({ query: {} })
  const d = res.data
  if (!d || !d.hypotheses) {
    return (
      <section className='px-4 py-6 sm:p-6'>
        <p className='text-sm text-gray-500 dark:text-gray-500'>No data.</p>
      </section>
    )
  }
  const data: Row[] = (d.hypotheses as any[]).map((h) => ({
    id: h.id,
    landingPageId: h.landingPage?.id ?? null,
    name: h.name,
    signupCount: h.signupCount ?? 0,
    slug: (h as { slug?: string | null }).slug ?? null,
    status: h.status,
  }))

  // Compute metrics from API-provided summary
  const growthRate7d = Number(d.metrics?.growthRate7d ?? 0)

  // We skip sparkline details here; link to analytics page for details

  // Use API-provided ready-to-launch count
  const readyToLaunch = Number(d.metrics?.readyToLaunch ?? 0)

  const denom = 3
  const readyCount = readyToLaunch
  const metrics: Metric[] = [
    {
      fraction: `${Number(d.metrics?.last7Signups ?? 0)}/${Number(d.metrics?.prev7Signups ?? 0)}`,
      label: 'Signup Growth (WoW)',
      percentage: `${growthRate7d >= 0 ? '+' : ''}${growthRate7d.toFixed(1)}%`,
      value: Math.max(0, Math.min(1, growthRate7d / 100)),
    },
    {
      fraction: `${readyCount}/${denom}`,
      label: 'Ready to Launch',
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
              <TableHeaderCell>Hypothesis</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Waitlist</TableHeaderCell>
              <TableHeaderCell>Analytics</TableHeaderCell>
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
                    View
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
