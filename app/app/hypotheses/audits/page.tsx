'use client'

import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react'
import { Link, SlidersHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/atoms/accordion'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'

const getStatusIcon = (status: 'complete' | 'warning') => {
  if (status === 'complete') {
    return (
      <RiCheckboxCircleFill className='size-[18px] shrink-0 text-emerald-600 dark:text-emerald-400' />
    )
  }
  return (
    <RiErrorWarningFill className='size-[18px] shrink-0 text-red-600 dark:text-red-400' />
  )
}

type Section = {
  id: string
  title: string
  certified: string
  progress: { current: number; total: number }
  status: 'complete' | 'warning'
  auditDates: Array<{ auditor: string; date: string }>
  documents: Array<{ name: string; status: 'OK' | 'Needs update' | 'In audit' }>
}

export default function Audits() {
  const api = getClientApi()
  const t = useTranslations('app.hypotheses.audits')
  const [sections, setSections] = useState<Section[]>([])

  const getDocStatusLabel = (
    status: Section['documents'][number]['status'],
  ): string => {
    switch (status) {
      case 'OK':
        return t('docStatus.ok')
      case 'Needs update':
        return t('docStatus.needsUpdate')
      case 'In audit':
        return t('docStatus.inAudit')
    }
  }

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const res = await api.v1.hypotheses.get({
          query: {
            limit: 100,
          },
        })
        const d = res.data
        if (!d || !d.hypotheses) return
        const total = Math.max(d.hypotheses.length, 1)
        const mapped: Section[] = d.hypotheses.map((h, idx) => ({
          auditDates: [
            {
              auditor: t('system'),
              date: new Date().toLocaleDateString(),
            },
          ],
          certified: h.status,
          documents: [
            {
              name: (h as { slug?: string | null }).slug ?? t('noSlug'),
              // Use literal union values to satisfy Section type
              status: (h as { slug?: string | null }).slug ? 'OK' : 'Needs update',
            },
          ],
          id: h.id,
          progress: { current: idx + 1, total },
          status: h.status === 'published' ? 'complete' : 'warning',
          title: h.name,
        }))
        if (!ignore) setSections(mapped)
      } catch {
        if (!ignore) setSections([])
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [t])

  return (
    <section aria-label={t('aria')}>
      <div className='flex flex-col items-center justify-between gap-2 p-6 sm:flex-row'>
        <Input
          type='search'
          placeholder={t('searchPlaceholder')}
          className='sm:w-64 [&>input]:py-1.5'
        />
        <Button
          variant='secondary'
          className='w-full gap-2 py-1.5 text-base sm:w-fit sm:text-sm'
        >
          <SlidersHorizontal
            className='-ml-0.5 size-4 shrink-0 text-gray-400 dark:text-gray-600'
            aria-hidden='true'
          />
          {t('filters')}
        </Button>
      </div>
      <div className='border-t border-gray-200 px-6 pb-6 dark:border-gray-800'>
        <Accordion type='multiple' className='mt-3'>
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className='py-5'>
                <p className='flex w-full items-center justify-between pr-4'>
                  <span className='flex items-center gap-2.5'>
                    <span>{section.title}</span>
                    <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-400/10 dark:text-gray-300'>
                      {section.certified}
                    </span>
                  </span>
                  <span className='flex items-center gap-x-2 tabular-nums'>
                    {getStatusIcon(section.status)}
                    {section.progress.current}/{section.progress.total}
                  </span>
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div className='mt-2 grid grid-cols-1 gap-8 md:grid-cols-2'>
                  <div>
                    <p className='flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-50'>
                      <span>{t('auditRound')}</span>
                      <span>{t('auditor')}</span>
                    </p>
                    <ul className='mt-1 divide-y divide-gray-200 text-sm text-gray-600 dark:divide-gray-800 dark:text-gray-400'>
                      {section.auditDates.map((audit) => (
                        <li
                          key={`${audit.auditor}-${audit.date}`}
                          className='flex items-center justify-between py-2.5'
                        >
                          <span>{audit.date}</span>
                          <span>{audit.auditor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className='flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-50'>
                      <span>{t('relatedDocs')}</span>
                      <span>{t('status')}</span>
                    </p>
                    <ul className='mt-1 divide-y divide-gray-200 text-gray-600 dark:divide-gray-800 dark:text-gray-400'>
                      {section.documents.map((doc) => (
                        <li
                          key={`${section.id}-${doc.name}`}
                          className='flex items-center justify-between py-2.5 text-sm'
                        >
                          <button
                            type='button'
                            className='flex items-center gap-2 text-emerald-500 hover:underline hover:underline-offset-4 dark:text-emerald-500'
                          >
                            <Link
                              className='size-4 shrink-0'
                              aria-hidden='true'
                            />
                            {doc.name}
                          </button>
                          <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-500 dark:text-gray-400'>
                              {getDocStatusLabel(doc.status)}
                            </span>
                            <button
                              type='button'
                              className='hover:text-gray-900 hover:underline hover:underline-offset-4 dark:hover:text-gray-50'
                            >
                              {t('edit')}
                            </button>
                            <span
                              className='h-4 w-px bg-gray-300 dark:bg-gray-700'
                              aria-hidden='true'
                            />
                            <button
                              type='button'
                              className='hover:text-gray-900 hover:underline hover:underline-offset-4 dark:hover:text-gray-50'
                            >
                              {t('reupload')}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
