import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // Get locale from cookie, default to 'en' if not set
  const store = await cookies()
  const locale = store.get('locale')?.value || 'en'

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  }
})
