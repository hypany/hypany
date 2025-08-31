import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function BreadcrumbsDefault() {
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
      </ol>
    </nav>
  )
}
