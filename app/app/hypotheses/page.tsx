import {
  and,
  count,
  desc,
  eq,
  gte,
  inArray,
  isNull,
  lte,
  sql,
} from 'drizzle-orm'
import { Pencil } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
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
import { Tooltip } from '@/components/atoms/tooltip'
import { Sparkline } from '@/components/molecules/charts/sparkline'
import {
  type Metric,
  MetricsCards,
} from '@/components/molecules/homepage/metrics-cards'
import { db } from '@/drizzle'
import { BOT_UA_REGEX, WAITLIST_THRESHOLD } from '@/lib/constants'
import {
  hypotheses,
  landingPages,
  pageVisits,
  waitlistEntries,
  waitlists,
} from '@/schema'

type Row = {
  id: string
  name: string
  status: string
  signupCount: number
  slug: string | null
}

export default async function HypothesesPage() {
  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  const orgId = session?.session?.activeOrganizationId

  if (!orgId) {
    // Render empty state gracefully
    return (
      <section className='px-4 py-6 sm:p-6'>
        <p className='text-sm text-gray-500 dark:text-gray-500'>
          No active organization.
        </p>
      </section>
    )
  }

  // Fetch hypotheses with optional landing and waitlist
  const rows = await db
    .select({
      hypothesis: hypotheses,
      landingPage: landingPages,
      waitlist: waitlists,
    })
    .from(hypotheses)
    .leftJoin(landingPages, eq(landingPages.hypothesisId, hypotheses.id))
    .leftJoin(waitlists, eq(waitlists.hypothesisId, hypotheses.id))
    .where(
      and(eq(hypotheses.organizationId, orgId), isNull(hypotheses.deletedAt)),
    )
    .orderBy(desc(hypotheses.createdAt))

  const waitlistIds = rows
    .map((r) => r.waitlist?.id)
    .filter((v): v is string => Boolean(v))
  const hypothesisIds = rows.map((r) => r.hypothesis.id)

  let countsByWaitlist = new Map<string, number>()
  if (waitlistIds.length > 0) {
    const counts = await db
      .select({
        count: sql<number>`count(*)`,
        waitlistId: waitlistEntries.waitlistId,
      })
      .from(waitlistEntries)
      .where(inArray(waitlistEntries.waitlistId, waitlistIds))
      .groupBy(waitlistEntries.waitlistId)
    countsByWaitlist = new Map(
      counts.map((c) => [c.waitlistId, Number(c.count)]),
    )
  }

  const data: Row[] = rows.map((r) => ({
    id: r.hypothesis.id,
    name: r.hypothesis.name,
    signupCount: r.waitlist?.id ? countsByWaitlist.get(r.waitlist.id) || 0 : 0,
    slug: r.landingPage?.slug ?? null,
    status: r.hypothesis.status,
  }))

  // Compute metrics
  const now = new Date()
  const todayUtcMidnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  )
  const sevenDaysAgo = new Date(
    todayUtcMidnight.getTime() - 7 * 24 * 60 * 60 * 1000,
  )
  const fourteenDaysAgo = new Date(
    todayUtcMidnight.getTime() - 14 * 24 * 60 * 60 * 1000,
  )
  const thirtyDaysAgo = new Date(
    todayUtcMidnight.getTime() - 30 * 24 * 60 * 60 * 1000,
  )

  // Signups last 7d and previous 7d
  let last7 = 0
  let prev7 = 0
  if (waitlistIds.length > 0) {
    const [{ count: last7c } = { count: 0 }] = await db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gte(waitlistEntries.createdAt, sevenDaysAgo),
        ),
      )
    const [{ count: prev7c } = { count: 0 }] = await db
      .select({ count: count() })
      .from(waitlistEntries)
      .where(
        and(
          inArray(waitlistEntries.waitlistId, waitlistIds),
          gte(waitlistEntries.createdAt, fourteenDaysAgo),
          lte(waitlistEntries.createdAt, sevenDaysAgo),
        ),
      )
    last7 = Number(last7c || 0)
    prev7 = Number(prev7c || 0)
  }

  const growthRate7d =
    prev7 > 0 ? ((last7 - prev7) / prev7) * 100 : last7 > 0 ? 100 : 0

  // Unique visitors 30d (filter bots), and signups 30d
  let uniqueVisitors30d = 0
  let signups30d = 0
  if (hypothesisIds.length > 0) {
    const pvRows = await db
      .select({
        createdAt: pageVisits.createdAt,
        hypothesisId: pageVisits.hypothesisId,
        userAgent: pageVisits.userAgent,
        visitorId: pageVisits.visitorId,
      })
      .from(pageVisits)
      .where(
        and(
          inArray(pageVisits.hypothesisId, hypothesisIds),
          gte(pageVisits.createdAt, thirtyDaysAgo),
          lte(pageVisits.createdAt, todayUtcMidnight),
        ),
      )

    const visitorSet = new Set<string>()
    const perHypVisitors = new Map<string, Map<string, Set<string>>>()
    for (const r of pvRows) {
      if (r.userAgent && BOT_UA_REGEX.test(r.userAgent)) continue
      if (r.visitorId) {
        visitorSet.add(r.visitorId)
        const d = r.createdAt ? new Date(r.createdAt) : null
        if (d) {
          const dateStr = d.toISOString().slice(0, 10)
          const m =
            perHypVisitors.get(r.hypothesisId) ?? new Map<string, Set<string>>()
          const set = m.get(dateStr) ?? new Set<string>()
          set.add(r.visitorId)
          m.set(dateStr, set)
          perHypVisitors.set(r.hypothesisId, m)
        }
      }
    }
    uniqueVisitors30d = visitorSet.size

    if (waitlistIds.length > 0) {
      const [{ count: su30 } = { count: 0 }] = await db
        .select({ count: count() })
        .from(waitlistEntries)
        .where(
          and(
            inArray(waitlistEntries.waitlistId, waitlistIds),
            gte(waitlistEntries.createdAt, thirtyDaysAgo),
            lte(waitlistEntries.createdAt, todayUtcMidnight),
          ),
        )
      signups30d = Number(su30 || 0)
    }

    // Build daily aggregates for big chart and per-row sparklines
    const waitlistToHypothesis = new Map<string, string>()
    rows.forEach((r) => {
      if (r.waitlist) waitlistToHypothesis.set(r.waitlist.id, r.hypothesis.id)
    })
    // But our select above doesn't include r.waitlist; create a mapping from earlier
  }

  // Requery signups rows for daily mapping (last 14 days)
  const fourteenDays = 14
  const sparkStart = new Date(
    todayUtcMidnight.getTime() - fourteenDays * 24 * 60 * 60 * 1000,
  )

  const sparkSignupRows = waitlistIds.length
    ? await db
        .select({
          createdAt: waitlistEntries.createdAt,
          waitlistId: waitlistEntries.waitlistId,
        })
        .from(waitlistEntries)
        .where(
          and(
            inArray(waitlistEntries.waitlistId, waitlistIds),
            gte(waitlistEntries.createdAt, sparkStart),
            lte(waitlistEntries.createdAt, todayUtcMidnight),
          ),
        )
    : []

  // Build helper date buckets
  const days: string[] = []
  for (let i = fourteenDays - 1; i >= 0; i--) {
    const d = new Date(todayUtcMidnight.getTime() - i * 24 * 60 * 60 * 1000)
    days.push(d.toISOString().slice(0, 10))
  }

  // Map waitlistId -> hypId
  const waitlistToHyp = new Map<string, string>()
  for (const r of rows) {
    if (r.waitlist?.id) waitlistToHyp.set(r.waitlist.id, r.hypothesis.id)
  }

  // Per-hypothesis daily visitors built above perHypVisitors, compute daily counts
  const perHypVisitorsDaily = new Map<string, Map<string, number>>()
  // If pvRows path didn't run (no page visits), ensure empty maps
  // we rebuild quickly using a 0 map per hyp
  for (const hid of hypothesisIds) {
    const m = new Map<string, number>()
    days.forEach((d) => {
      m.set(d, 0)
    })
    perHypVisitorsDaily.set(hid, m)
  }
  // Re-run a lightweight pageVisits query for sparkStart..today to fill perHypVisitorsDaily
  if (hypothesisIds.length > 0) {
    const pvRows2 = await db
      .select({
        createdAt: pageVisits.createdAt,
        hypothesisId: pageVisits.hypothesisId,
        userAgent: pageVisits.userAgent,
        visitorId: pageVisits.visitorId,
      })
      .from(pageVisits)
      .where(
        and(
          inArray(pageVisits.hypothesisId, hypothesisIds),
          gte(pageVisits.createdAt, sparkStart),
          lte(pageVisits.createdAt, todayUtcMidnight),
        ),
      )
    const temp = new Map<string, Map<string, Set<string>>>()
    for (const r of pvRows2) {
      if (r.userAgent && BOT_UA_REGEX.test(r.userAgent)) continue
      if (!r.visitorId) continue
      const d = r.createdAt ? new Date(r.createdAt) : null
      if (!d) continue
      const dateStr = d.toISOString().slice(0, 10)
      const map = temp.get(r.hypothesisId) ?? new Map<string, Set<string>>()
      const set = map.get(dateStr) ?? new Set<string>()
      set.add(r.visitorId)
      map.set(dateStr, set)
      temp.set(r.hypothesisId, map)
    }
    // Convert to counts
    for (const [hid, map] of temp.entries()) {
      const m = perHypVisitorsDaily.get(hid) ?? new Map<string, number>()
      for (const d of days) {
        const c = map.get(d)?.size ?? 0
        m.set(d, c)
      }
      perHypVisitorsDaily.set(hid, m)
    }
  }

  // Per-hypothesis daily signups
  const perHypSignupsDaily = new Map<string, Map<string, number>>()
  for (const hid of hypothesisIds) {
    const m = new Map<string, number>()
    days.forEach((d) => {
      m.set(d, 0)
    })
    perHypSignupsDaily.set(hid, m)
  }
  for (const r of sparkSignupRows) {
    const d = r.createdAt ? new Date(r.createdAt) : null
    if (!d) continue
    const dateStr = d.toISOString().slice(0, 10)
    const hid = waitlistToHyp.get(r.waitlistId)
    if (!hid) continue
    const m = perHypSignupsDaily.get(hid) ?? new Map<string, number>()
    m.set(dateStr, (m.get(dateStr) ?? 0) + 1)
    perHypSignupsDaily.set(hid, m)
  }

  // Keep daily maps for per-row use; we no longer render a global chart.
  const readyToLaunch = rows.reduce((acc, r) => {
    const c = r.waitlist?.id ? countsByWaitlist.get(r.waitlist.id) || 0 : 0
    return acc + (c >= WAITLIST_THRESHOLD ? 1 : 0)
  }, 0)

  const conversion = uniqueVisitors30d > 0 ? signups30d / uniqueVisitors30d : 0
  const denom = 3
  const readyCount = readyToLaunch
  const metrics: Metric[] = [
    {
      fraction: `${signups30d}/${uniqueVisitors30d || 0}`,
      label: 'Visitor Conversion Rate',
      percentage: `${(conversion * 100).toFixed(1)}%`,
      value: conversion,
    },
    {
      fraction: `${last7}/${prev7}`,
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
                    href={`/app/hypotheses/${item.id}/editor`}
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
                  <Tooltip
                    side='top'
                    showArrow={false}
                    unstyled
                    content={(() => {
                      const visMap = perHypVisitorsDaily.get(item.id)
                      const suMap = perHypSignupsDaily.get(item.id)
                      let vis = 0
                      let su = 0
                      days.forEach((d) => {
                        vis += visMap?.get(d) ?? 0
                        su += suMap?.get(d) ?? 0
                      })
                      return (
                        <div className='w-56 rounded-md border border-gray-200 bg-white p-2 text-sm shadow-md dark:border-gray-800 dark:bg-gray-950'>
                          <div className='space-y-1.5'>
                            <div className='flex items-center justify-between'>
                              <span className='text-xs text-gray-500 dark:text-gray-500'>
                                Visitors (14d)
                              </span>
                              <span className='font-medium text-gray-900 dark:text-gray-50'>
                                {vis}
                              </span>
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-xs text-gray-500 dark:text-gray-500'>
                                Signups (14d)
                              </span>
                              <span className='font-medium text-gray-900 dark:text-gray-50'>
                                {su}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  >
                    <Link
                      href={`/app/hypotheses/${item.id}/analytics`}
                      className='group inline-flex items-center gap-3'
                    >
                      <span className='text-emerald-600 dark:text-emerald-500'>
                        <Sparkline
                          data={days.map((d) => {
                            const v =
                              perHypVisitorsDaily.get(item.id)?.get(d) ?? 0
                            const s =
                              perHypSignupsDaily.get(item.id)?.get(d) ?? 0
                            return v > 0 ? s / v : 0
                          })}
                        />
                      </span>
                    </Link>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
