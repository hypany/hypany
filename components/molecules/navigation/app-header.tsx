import Link from 'next/link'
import { SaveStatusBadge } from '@/components/atoms/save-status'
import { SidebarTrigger } from '@/components/atoms/sidebar'
import { TopRightActions } from '@/components/molecules/navigation/top-right-actions'

export async function AppHeader({
  breadcrumbs,
}: {
  breadcrumbs?: React.ReactNode
}) {
  const base = 'sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4'
  const normalBg =
    'border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'

  return (
    <header className={`${base} ${normalBg}`}>
      <SidebarTrigger className='-ml-1' />
      <div className='mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800' />
      {breadcrumbs ?? (
        <nav aria-label='Breadcrumb' className='ml-2'>
          <ol className='flex items-center space-x-3 text-sm'>
            <li className='flex'>
              <Link
                href='/app'
                className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              >
                Home
              </Link>
            </li>
          </ol>
        </nav>
      )}
      <TopRightActions />
      <SaveStatusBadge className='pl-2' />
    </header>
  )
}
