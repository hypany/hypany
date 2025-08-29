'use client'
import { Download } from 'lucide-react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { api } from '@/app/api'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { cx } from '@/lib/utils'

const colorClasses = [
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-purple-500 dark:bg-purple-500',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-cyan-500 dark:bg-cyan-500',
  'bg-rose-500 dark:bg-rose-500',
  'bg-indigo-500 dark:bg-indigo-500',
]

const getRandomColor = (initials: string) => {
  const seed = initials
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colorClasses[seed % colorClasses.length]
}
type HypothesisItem = {
  id: string
  name: string
  status: 'draft' | 'published' | 'archived' | (string & {})
  signupCount: number
  landingPage: { id: string; slug: string | null } | null
}

type HypothesisMetrics = {
  pageViews30d: number
  conversionRate30d: number
}

type AssignedPerson = { name: string; initials: string }

type Project = {
  company: string
  size: string
  probability: string
  duration: string
  status: 'drafted' | 'sent' | 'closed'
  assigned: AssignedPerson[]
}

type Region = {
  region: 'archived' | 'draft' | 'published' | (string & {})
  project: Project[]
}

const statusToBadge: Record<string, Project['status']> = {
  archived: 'closed',
  draft: 'drafted',
  published: 'sent',
}

function slugToInitials(slug?: string | null) {
  if (!slug) return 'HP'
  const parts = slug.split('-').filter(Boolean)
  const init = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('')
  return init || 'HP'
}

export default function Overview() {
  const t = useTranslations('app.hypotheses.overview')
  const [groups, setGroups] = useState<Region[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      try {
        const res = await api.v1.hypotheses.get({
          // keep defaults (pagination); UI shows first page
          query: {},
        })
        const data = res.data
        if (!data || !data.hypotheses) return

        // Fetch per-hypothesis metrics in parallel to enrich rows
        const metricsEntries: Array<Promise<[string, HypothesisMetrics]>> =
          data.hypotheses.map(async (h: HypothesisItem) => {
            try {
              const det = await api.v1.hypotheses({ id: h.id }).get()
              const md = det.data?.metrics
              return [
                h.id,
                {
                  conversionRate30d: Number(md?.conversionRate30d ?? 0),
                  pageViews30d: Number(md?.pageViews30d ?? 0),
                },
              ] as [string, HypothesisMetrics]
            } catch {
              return [h.id, { conversionRate30d: 0, pageViews30d: 0 }] as [
                string,
                HypothesisMetrics,
              ]
            }
          })
        const resolved = await Promise.all(metricsEntries)
        const metricsById = new Map<string, HypothesisMetrics>(resolved)

        // Group by status and map to table-friendly structure
        const grouped = new Map<string, Project[]>()
        for (const h of data.hypotheses as HypothesisItem[]) {
          const metrics = metricsById.get(h.id) ?? {
            conversionRate30d: 0,
            pageViews30d: 0,
          }
          const p: Project = {
            assigned: [
              {
                initials: slugToInitials(h.landingPage?.slug ?? h.name),
                name: h.landingPage?.slug ?? t('noSlug'),
              },
            ],
            company: h.name,
            duration: t('row.pageViews30d', { count: metrics.pageViews30d }),
            probability: t('row.conversionRate30d', {
              value: metrics.conversionRate30d.toFixed(1),
            }),
            size: t('row.signupCount', { count: h.signupCount }),
            status: statusToBadge[h.status] ?? 'Drafted',
          }
          const key = h.status in statusToBadge ? h.status : 'draft'
          const arr = grouped.get(key) ?? []
          arr.push(p)
          grouped.set(key, arr)
        }

        const regions: Region[] = Array.from(grouped.entries())
          .map(([key, project]) => ({ project, region: key }))
          .sort((a, b) => String(a.region).localeCompare(String(b.region)))

        if (!ignore) setGroups(regions)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  const dataToRender = useMemo<Region[]>(() => groups, [groups])

  return (
    <section aria-label={t('aria')}>
      <div className='flex flex-col justify-between gap-2 px-4 py-6 sm:flex-row sm:items-center sm:p-6'>
        <Input
          type='search'
          placeholder={t('searchPlaceholder')}
          className='sm:w-64 [&>input]:py-1.5'
        />
        <div className='flex flex-col items-center gap-2 sm:flex-row'>
          <Select>
            <SelectTrigger className='w-full py-1.5 sm:w-44'>
              <SelectValue placeholder={t('assignedPlaceholder')} />
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='1'>Harry Granger</SelectItem>
              <SelectItem value='2'>Hermoine Weasley</SelectItem>
              <SelectItem value='3'>Emma Stone</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant='secondary'
            className='w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm'
          >
            <Download
              className='-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600'
              aria-hidden='true'
            />
            {t('export')}
          </Button>
        </div>
      </div>
      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>{t('table.columns.hypothesis')}</TableHeaderCell>
              <TableHeaderCell>{t('table.columns.signups')}</TableHeaderCell>
              <TableHeaderCell>{t('table.columns.conv30d')}</TableHeaderCell>
              <TableHeaderCell>{t('table.columns.pageViews30d')}</TableHeaderCell>
              <TableHeaderCell>{t('table.columns.landing')}</TableHeaderCell>
              <TableHeaderCell>{t('table.columns.status')}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading ? [] : dataToRender).map((quote) => (
              <Fragment key={quote.region}>
                <TableRow>
                  <TableHeaderCell
                    scope='colgroup'
                    colSpan={6}
                    className='bg-gray-50 py-3 pl-4 sm:pl-6 dark:bg-gray-900'
                  >
                    {t(`regions.${quote.region}` as any)}
                    <span className='ml-2 font-medium text-gray-600 dark:text-gray-400'>
                      {quote.project.length}
                    </span>
                  </TableHeaderCell>
                </TableRow>
                {quote.project.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.probability}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>
                      <div className='flex -space-x-1 overflow-hidden'>
                        {item.assigned.map((name, nameIndex) => (
                          <span
                            key={nameIndex}
                            className={cx(
                              getRandomColor(name.initials),
                              'inline-flex size-5 items-center justify-center rounded-full text-xs font-medium text-white ring-2 ring-white dark:text-white dark:ring-[#090E1A]',
                            )}
                          >
                            {name.initials}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'closed'
                            ? 'success'
                            : item.status === 'drafted'
                              ? 'neutral'
                              : item.status === 'sent'
                                ? 'default'
                                : 'default'
                        }
                        className='rounded-full'
                      >
                        <span
                          className={cx(
                            'size-1.5 shrink-0 rounded-full',
                            'bg-gray-500 dark:bg-gray-500',
                            {
                              'bg-emerald-600 dark:bg-emerald-400':
                                item.status === 'closed',
                            },
                            {
                              'bg-gray-500 dark:bg-gray-500':
                                item.status === 'drafted',
                            },
                            {
                              'bg-emerald-500 dark:bg-emerald-500':
                                item.status === 'sent',
                            },
                          )}
                          aria-hidden='true'
                        />
                        {t(`statusLabel.${item.status}` as any)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
