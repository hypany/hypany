import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getSession } from '@/auth/server'
import { Divider } from '@/components/atoms/divider'
import { SignInForm } from '@/components/molecules/auth/sign-in-form'

export const metadata: Metadata = {
  description: 'Sign in to your Hypany account',
  title: 'Sign In - Hypany',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const session = await getSession()
  if (session) {
    redirect('/app')
  }
  const t = await getTranslations('auth.sign-in')
  const params = await searchParams
  const next = params?.next

  return (
    <>
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
        <SignInForm next={next} />
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
    </>
  )
}
