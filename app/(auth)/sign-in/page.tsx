import type { Metadata } from 'next'
import Link from 'next/link'
import { SignInForm } from '@/components/molecules/auth/sign-in-form'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  description: 'Sign in to your Hypany account',
  title: 'Sign In - Hypany',
}

export default async function SignInPage() {
  const tCommon = await getTranslations('auth.common')
  const t = await getTranslations('auth.sign-in')
  return (
    <div className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0'>
      <Link
        href='/'
        className='absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
      >
        {tCommon('back')}
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold'>{t('title')}</h1>
          <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
