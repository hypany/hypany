import { createNavigation } from 'next-intl/navigation'
import { locales } from './config'
export type Locale = (typeof locales)[number]

// No URL prefix for locales
export const localePrefix = 'never'

export const pathnames = {
  '/': '/',
} as const

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  localePrefix,
  locales,
  pathnames,
})
