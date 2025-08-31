import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getSession } from '@/auth/server'
import { Divider } from '@/components/atoms/divider'
import { SignUpForm } from '@/components/molecules/auth/sign-up-form'

export const metadata: Metadata = {
  description: 'Create a new Hypany account',
  title: 'Create an account - Hypany',
}

export default async function SignUpPage() {
  const session = await getSession()
  if (session) {
    redirect('/app')
  }
  const t = await getTranslations('auth.sign-up')

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

      <div className='mt-6'>
        <SignUpForm />
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
    </>
  )
}
