import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getActiveOrganization } from '@/functions/organizations'
import { resolveEntityNameById } from '@/functions/resolve'
import { notFound } from 'next/navigation'

export default async function HypothesisAnalyticsBreadcrumbs({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getTranslations('app')
  const { id } = await params
  const activeOrgRes = await getActiveOrganization()
  if (!activeOrgRes?.activeOrganizationId) notFound()
  const resolved = await resolveEntityNameById(id, activeOrgRes.activeOrganizationId)
  if (!resolved) notFound()

  return (
    <nav aria-label='Breadcrumb' className='ml-2'>
      <ol className='flex items-center space-x-3 text-sm'>
        <li className='flex'>
          <Link
            href='/app'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.home')}
          </Link>
        </li>
        <ChevronRight className='size-4 shrink-0 text-gray-600 dark:text-gray-400' aria-hidden='true' />
        <li className='flex'>
          <Link
            href='/app/hypotheses'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.hypotheses')}
          </Link>
        </li>
        <ChevronRight className='size-4 shrink-0 text-gray-600 dark:text-gray-400' aria-hidden='true' />
        <li className='flex'>
          <Link
            href={`/app/hypotheses/${id}`}
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {resolved.name}
          </Link>
        </li>
        <ChevronRight className='size-4 shrink-0 text-gray-600 dark:text-gray-400' aria-hidden='true' />
        <li className='flex'>
          <Link
            href={`/app/hypotheses/${id}/analytics`}
            aria-current='page'
            className='text-gray-900 dark:text-gray-50'
          >
            {t('pages.hypotheses.tabs.analytics')}
          </Link>
        </li>
      </ol>
    </nav>
  )
}

