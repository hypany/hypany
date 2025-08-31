import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function HypothesesIndexBreadcrumbs() {
  const t = await getTranslations('app')
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
            aria-current='page'
            className='text-gray-900 dark:text-gray-50'
          >
            {t('breadcrumbs.hypotheses')}
          </Link>
        </li>
      </ol>
    </nav>
  )
}

