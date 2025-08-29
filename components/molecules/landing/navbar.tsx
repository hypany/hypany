'use client'

import { siteConfig } from '@/app/site-config'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import useScroll from '@/lib/use-scroll'
import { cx } from '@/lib/utils'
import { HypanyLogo } from '@/public/brand/hypany-logo'
import { RiCloseFill, RiMenuFill } from '@remixicon/react'
import type { User } from 'better-auth'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function NavBar() {
  const t = useTranslations('nav')
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)
  const { data } = client.useSession()
  const isAuthenticated = Boolean(data?.session)
  const user = data?.user as User | null
  const initials = React.useMemo(() => {
    const src = (user?.name ?? undefined) || user?.email || ''
    const parts = src.replace(/@.*/, '').split(/\s|\./).filter(Boolean)
    const a = parts[0]?.[0] ?? ''
    const b = parts[1]?.[0] ?? ''
    return (a + b).toUpperCase() || (src[0]?.toUpperCase() ?? 'U')
  }, [user])

  return (
    <header
      className={cx(
        'fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg border border-transparent px-3 py-3 transition duration-300',
        scrolled || open
          ? 'border-gray-200/50 bg-white/80 shadow-2xl shadow-black/5 backdrop-blur-xs'
          : 'bg-white/0',
      )}
    >
      <div className='w-full md:my-auto'>
        <div className='relative flex items-center justify-between'>
          <Link href={siteConfig.baseLinks.home} aria-label={t('home-aria')}>
            <span className='sr-only'>{t('logo-sr')}</span>
            <HypanyLogo className='w-10 h-10' />
          </Link>
          <div className='flex items-center gap-2'>
            {isAuthenticated ? (
              <>
                <div className='hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 pr-3 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200'>
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || user.email}
                      className='h-7 w-7 rounded-full border border-gray-200 object-cover dark:border-gray-800'
                      width={28}
                      height={28}
                    />
                  ) : (
                    <span className='flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200'>
                      {initials}
                    </span>
                  )}
                  <span className='max-w-[12rem] truncate'>
                    {user?.name || user?.email}
                  </span>
                </div>
                <Link href='/app'>
                  <Button variant='primary' className='mr-0'>
                    {t('go-to-app')}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href='/sign-in'>
                  <Button variant='secondary' className='mr-2'>
                    {t('sign-in')}
                  </Button>
                </Link>
                <Link href='/sign-up'>
                  <Button variant='primary'>{t('sign-up')}</Button>
                </Link>
              </>
            )}
          </div>
          <Button
            onClick={() => setOpen(!open)}
            variant='secondary'
            className='p-1.5 sm:hidden'
            aria-label={open ? t('close-menu-aria') : t('open-menu-aria')}
          >
            {!open ? (
              <RiMenuFill
                className='size-6 shrink-0 text-gray-900'
                aria-hidden
              />
            ) : (
              <RiCloseFill
                className='size-6 shrink-0 text-gray-900'
                aria-hidden
              />
            )}
          </Button>
        </div>
        <nav
          className={cx(
            'mt-6 flex flex-col gap-6 text-lg ease-in-out will-change-transform sm:hidden',
            open ? '' : 'hidden',
          )}
        >
          {isAuthenticated ? (
            <>
              {user && (
                <div className='flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200'>
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || user.email}
                      className='h-8 w-8 rounded-full border border-gray-200 object-cover dark:border-gray-800'
                      width={32}
                      height={32}
                    />
                  ) : (
                    <span className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200'>
                      {initials}
                    </span>
                  )}
                  <div className='min-w-0'>
                    <div className='truncate font-medium'>
                      {user.name || user.email}
                    </div>
                    <div className='truncate text-xs text-gray-500 dark:text-gray-400'>
                      {user.email}
                    </div>
                  </div>
                </div>
              )}
              <Link href='/app' className='w-full'>
                <Button variant='primary' className='w-full'>
                  {t('go-to-app')}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href='/sign-in' className='w-full'>
                <Button variant='secondary' className='w-full'>
                  {t('sign-in')}
                </Button>
              </Link>
              <Link href='/sign-up' className='w-full'>
                <Button variant='primary' className='w-full'>
                  {t('sign-up')}
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
