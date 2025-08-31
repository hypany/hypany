import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Divider } from '@/components/atoms/divider'
import { ResetPasswordForm } from '@/components/molecules/auth/reset-password-form'

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
  const params = await searchParams
  const token = params?.token

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
    </>
  )
}
