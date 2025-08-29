'use client'

import { RiCloseFill, RiMenuFill } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'
import { siteConfig } from '@/app/site-config'
import { Button } from '@/components/atoms/button'
import useScroll from '@/lib/use-scroll'
import { cx } from '@/lib/utils'
import { HypanyLogo } from '@/public/brand/hypany-logo'

export function NavBar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)

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
          <Link href={siteConfig.baseLinks.home} aria-label='Home'>
            <span className='sr-only'>Hypany Logo</span>
            <HypanyLogo className='w-10 h-10' />
          </Link>
          <div className='flex items-center gap-2'>
            <Link href='/app'>
              <Button variant='primary' className='mr-2'>
                Go to App
              </Button>
            </Link>
          </div>
          <Button
            onClick={() => setOpen(!open)}
            variant='secondary'
            className='p-1.5 sm:hidden'
            aria-label={open ? 'CloseNavigation Menu' : 'Open Navigation Menu'}
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
          <Link href='/app' className='w-full'>
            <Button variant='primary' className='w-full mb-2'>
              Go to App
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
