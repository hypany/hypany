import {createNavigation} from 'next-intl/navigation'

export const locales = ['en', 'ko'] as const
export type Locale = (typeof locales)[number]

// No URL prefix for locales
export const localePrefix = 'never'

export const pathnames = {
  '/': '/',
} as const

export const {Link, redirect, usePathname, useRouter} = createNavigation({
  locales,
  localePrefix,
  pathnames,
})

