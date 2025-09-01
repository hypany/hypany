import { HypanyLogo } from '@/public/brand/hypany-logo'
import {
  RiGithubFill,
  RiSlackFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from '@remixicon/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LocaleSwitcher } from '../locale-switcher'
import { ThemeToggle } from './theme-toggle'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer = () => {
  const t = useTranslations('landing.footer')
  const tFooter = useTranslations('footer')
  const sections = {
    analytics: {
      items: [
        {
          href: '/app/analytics',
          label: t('sections.analytics.items.overview'),
        },
        {
          href: '/app/waitlists',
          label: t('sections.analytics.items.waitlists'),
        },
      ],
      title: t('sections.analytics.title'),
    },
    hypotheses: {
      items: [
        {
          href: '/app/hypotheses',
          label: t('sections.hypotheses.items.overview'),
        },
        { href: '/app/assets', label: t('sections.hypotheses.items.assets') },
      ],
      title: t('sections.hypotheses.title'),
    },
    settings: {
      items: [
        { href: '/app/settings', label: t('sections.settings.items.general') },
        {
          href: '/app/organizations',
          label: t('sections.settings.items.organizations'),
        },
      ],
      title: t('sections.settings.title'),
    },
  } as const

  return (
    <div className='px-4 xl:px-0'>
      <footer className='relative mx-auto flex max-w-6xl flex-wrap pt-4'>
        <div className='pointer-events-none inset-0'>
          {/* Left */}
          <div
            className='absolute inset-y-0 -my-20 w-px'
            style={{
              maskImage: 'linear-gradient(transparent, white 5rem)',
            }}
          >
            <svg className='h-full w-full' preserveAspectRatio='none'>
              <title>{tFooter('footer-pattern-alt')}</title>
              <line
                x1='0'
                y1='0'
                x2='0'
                y2='100%'
                className='stroke-gray-300 dark:stroke-gray-800'
                strokeWidth='2'
                strokeDasharray='3 3'
              />
            </svg>
          </div>

          {/* Right */}
          <div
            className='absolute inset-y-0 right-0 -my-20 w-px'
            style={{
              maskImage: 'linear-gradient(transparent, white 5rem)',
            }}
          >
            <svg className='h-full w-full' preserveAspectRatio='none'>
              <title>{tFooter('footer-pattern-alt')}</title>
              <line
                x1='0'
                y1='0'
                x2='0'
                y2='100%'
                className='stroke-gray-300 dark:stroke-gray-800'
                strokeWidth='2'
                strokeDasharray='3 3'
              />
            </svg>
          </div>
        </div>
        <svg className='mb-10 h-20 w-full border-y border-dashed border-gray-300 stroke-gray-300 dark:border-gray-800 dark:stroke-gray-800'>
          <title>{tFooter('footer-pattern-alt')}</title>
          <defs>
            <pattern patternUnits='userSpaceOnUse' width='64' height='64'>
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return (
                  <path
                    key={`${i}-${offset}`}
                    d={`M${-106 + offset} 110L${22 + offset} -18`}
                    stroke=''
                    strokeWidth='1'
                  />
                )
              })}
            </pattern>
          </defs>
          <rect
            stroke='none'
            width='100%'
            height='100%'
            fill='url(#diagonal-footer-pattern)'
          />
        </svg>
        <div className='mr-auto flex w-full justify-between lg:w-fit lg:flex-col'>
          <Link
            href='/'
            className='flex items-center font-medium text-gray-700 dark:text-gray-300 select-none sm:text-sm'
          >
            <HypanyLogo className='ml-2 w-10 h-10' />

            <span className='sr-only'>{t('logo-alt')}</span>
          </Link>
          <div>
            <div className='mt-4 flex items-center'>
              {/* Social Icons */}
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-xs p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <RiTwitterXFill className='size-5' />
              </Link>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-xs p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <RiYoutubeFill className='size-5' />
              </Link>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-xs p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <RiGithubFill className='size-5' />
              </Link>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-xs p-2 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              >
                <RiSlackFill className='size-5' />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Sections */}
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className='mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0'>
            <h3 className='mb-4 font-medium text-gray-900 dark:text-gray-50 sm:text-sm'>
              {section.title}
            </h3>
            <ul className='space-y-4'>
              {section.items.map((item) => (
                <li key={item.label} className='text-sm'>
                  <Link
                    href={item.href}
                    className='text-gray-600 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-50'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Bottom Bar */}
        <div className='mt-10 w-full border-t border-gray-200 py-3 dark:border-gray-800'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <div className='text-sm text-gray-700 dark:text-gray-400'>
              &copy; {CURRENT_YEAR} {tFooter('creator-label')}
            </div>
            <div className='flex items-center gap-2'>
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
