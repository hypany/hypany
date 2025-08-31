import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function HypothesisBreadcrumbs({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const t = await getTranslations('app')
  return (
    <nav aria-label='Breadcrumb' className='ml-2 px-4 pt-3'>
      <ol className='flex items-center space-x-3 text-sm'>
        <li className='flex'>
          <Link
            href='/app'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.home')}
          </Link>
        </li>
        <span className='text-gray-600 dark:text-gray-400'>/</span>
        <li className='flex'>
          <Link
            href='/app/hypotheses'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.hypotheses')}
          </Link>
        </li>
        <span className='text-gray-600 dark:text-gray-400'>/</span>
        <li className='flex'>
          <Link
            href={`/app/hypotheses/${id}`}
            aria-current='page'
            className='text-gray-900 dark:text-gray-50'
          >
            {name}
          </Link>
        </li>
      </ol>
    </nav>
  )
}

