import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Divider } from '@/components/atoms/divider'
import { ResetPasswordForm } from '@/components/molecules/auth/reset-password-form'
import { SaaSPreview } from '@/components/molecules/landing/saas-preview'

export const metadata: Metadata = {
  description: 'Set a new Hypany password',
  title: 'Reset Password - Hypany',
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const t = await getTranslations('auth.reset-password')
  const tCommon = await getTranslations('common')
  const params = await searchParams
  const token = params?.token

  return (
    <>
      <main className='flex-1'>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='w-full px-4 sm:max-w-sm sm:px-0'>
            <div className='space-y-1'>
              <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
                {t('title')}
              </h2>
              <p className='text-sm text-gray-700 dark:text-gray-400'>
                {t('subtitle')}
              </p>
            </div>

            <div className='mt-6'>
              <ResetPasswordForm token={token} />
            </div>

            <Divider />

            <p className='mt-2 text-sm text-gray-700 dark:text-gray-400'>
              <span>{t('footer-text')} </span>
              <Link
                href='/sign-in'
                className='font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 hover:dark:text-emerald-600'
              >
                {t('footer-link')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <aside
        className='hidden flex-1 overflow-hidden p-6 lg:flex'
        aria-label={tCommon('aria.product-showcase')}
      >
        <div className='flex h-full w-full items-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-32 dark:from-emerald-600 dark:to-emerald-500'>
          <div className='w-full'>
            <h2 className='text-2xl font-semibold leading-9 text-white'>
              {t('aside.title')}
            </h2>
            <p className='mt-4 text-white/90 break-words'>{t('aside.desc')}</p>
            <div className='mt-10 rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20'>
              <SaaSPreview />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
