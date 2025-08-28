import type { Metadata } from 'next'

import { SignUpForm } from '@/components/molecules/auth/sign-up-form'
import Link from 'next/link'

export const metadata: Metadata = {
  description: 'Create a new Hypany account',
  title: 'Create an account - Hypany',
}

export default function SignUpPage() {
  return (
    <div className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0'>
      <Link
        href='/'
        className='absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
      >
        ← Back
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold'>Create an account</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your information to get started
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
