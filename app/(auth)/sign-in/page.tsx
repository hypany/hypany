import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Divider } from '@/components/atoms/divider'
import { SignInForm } from '@/components/molecules/auth/sign-in-form'

export const metadata: Metadata = {
  description: 'Sign in to your Hypany account',
  title: 'Sign In - Hypany',
}

export default async function SignInPage() {
  const t = await getTranslations('auth.sign-in')
  const tCommon = await getTranslations('common')

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

            {/** Optional social logins could go here */}
            {/* <div className='mt-8 flex w-full gap-4'>...</div> */}
            {/* <Divider>or</Divider> */}

            <div className='mt-6'>
              <SignInForm />
            </div>

            <Divider />

            <p className='mt-2 text-sm text-gray-700 dark:text-gray-400'>
              <span>{t('footer-text')} </span>
              <Link
                href='/sign-up'
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
        <div className='flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-16 dark:from-emerald-600 dark:to-emerald-500'>
          <div>
            <h2 className='max-w-lg text-2xl font-semibold leading-9 text-white'>
              {t('aside.title')}
            </h2>
            <p className='mt-4 text-white/90'>
              {t('aside.desc')}
            </p>
            <div className='mt-10 rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20'>
              <div className='h-48 w-[28rem] rounded-md bg-white/5 shadow-2xl shadow-black/40 ring-1 ring-black/10' />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
