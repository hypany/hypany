'use client'

import { RiCloseFill, RiMenuFill } from '@remixicon/react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import useScroll from '@/lib/use-scroll'
import { cx } from '@/lib/utils'
import { HypanyLogo } from '@/public/brand/hypany-logo'

export function NavBar() {
  const t = useTranslations('nav')
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)
  const { data } = client.useSession()
  const isAuthenticated = Boolean(data?.session)

  return (
    <header
      className={cx(
        'fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg border border-transparent px-3 py-3 transition duration-300',
        scrolled || open
          ? 'border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 shadow-2xl shadow-black/5 backdrop-blur-xs'
          : 'bg-white/0 dark:bg-gray-950/0',
      )}
    >
      <div className='w-full md:my-auto'>
        <div className='relative flex items-center justify-between'>
          <Link href='/' aria-label={t('home-aria')}>
            <span className='sr-only'>{t('logo-sr')}</span>
            <span className='flex items-center gap-2'>
              <HypanyLogo className='w-10 h-10' />
              <span className='hidden text-lg font-semibold text-gray-900 sm:inline dark:text-gray-50'>
                {t('brand')}
              </span>
            </span>
          </Link>
          {/* Hide auth buttons on mobile; keep only mobile menu button */}
          <div className='hidden items-center gap-2 sm:flex'>
            {isAuthenticated ? (
              <Link href='/app'>
                <Button variant='primary' className='mr-0'>
                  {t('go-to-app')}
                </Button>
              </Link>
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
                className='size-6 shrink-0 text-gray-900 dark:text-gray-50'
                aria-hidden
              />
            ) : (
              <RiCloseFill
                className='size-6 shrink-0 text-gray-900 dark:text-gray-50'
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
            <Link href='/app' className='w-full'>
              <Button variant='primary' className='w-full'>
                {t('go-to-app')}
              </Button>
            </Link>
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
