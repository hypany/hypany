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
          <Button
            variant='secondary'
            className='hidden h-10 font-semibold sm:block'
          >
            Start Free
          </Button>
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
          <ul className='space-y-4 font-medium'>
            <li onClick={() => setOpen(false)}>
              <Link href='#solutions'>How It Works</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href='#features'>Features</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href='#alumni'>Alumni Network</Link>
            </li>
          </ul>
          <Button variant='secondary' className='text-lg'>
            Start Free
          </Button>
        </nav>
      </div>
    </header>
  )
}
