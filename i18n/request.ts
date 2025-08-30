import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, localeCookieName } from './config'

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'en' if not set
  const store = await cookies()
  const locale = store.get(localeCookieName)?.value || defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  }
})
