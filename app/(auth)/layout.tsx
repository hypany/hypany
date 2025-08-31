import { getTranslations } from 'next-intl/server'
import { SaaSPreview } from '@/components/molecules/landing/saas-preview'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tCommon = await getTranslations('common')
  const tAuth = await getTranslations('auth')

  return (
    <div className='flex min-h-screen w-full'>
      <main className='flex-1'>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='w-full px-4 sm:max-w-sm sm:px-0'>{children}</div>
        </div>
      </main>
      <aside
        className='hidden flex-1 overflow-hidden p-6 lg:flex'
        aria-label={tCommon('aria.product-showcase')}
      >
        <div className='flex h-full w-full items-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-32 dark:from-emerald-600 dark:to-emerald-500'>
          <div className='w-full'>
            <h2 className='text-2xl font-semibold leading-9 text-white'>
              {tAuth('aside.title')}
            </h2>
            <p className='mt-4 text-white/90 break-words'>
              {tAuth('aside.desc')}
            </p>
            <div className='mt-10 rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20'>
              <SaaSPreview />
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
