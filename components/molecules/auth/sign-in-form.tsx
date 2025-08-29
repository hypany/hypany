'use client'

import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { cx } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@/lib/use-toast'
import * as z from 'zod'

const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInFormData = z.infer<typeof signInSchema>

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  next?: string
}

export function SignInForm({ className, next, ...props }: SignInFormProps) {
  const emailId = useId()
  const passwordId = useId()
  const router = useRouter()
  const t = useTranslations('auth.form')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  async function resendVerificationEmail() {
    const email = getValues('email')
    const t = toast({
      title: 'Sending verification email...',
      variant: 'loading',
    })
    try {
      const { error } = await client.sendVerificationEmail({
        callbackURL: '/dashboard',
        email,
      })
      if (error) {
        throw new Error(
          error.message || 'Failed to send verification email',
        )
      }
      t.update({
        title: `Verification email sent to ${email}`,
        variant: 'success',
      })
    } catch {
      t.update({
        title: 'Failed to send verification email. Please try again.',
        variant: 'error',
      })
    }
  }

  async function onSubmit(data: SignInFormData) {
    try {
      const { data: signInData, error } = await client.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        // Check for EMAIL_NOT_VERIFIED error specifically
        if (
          error.code === 'EMAIL_NOT_VERIFIED' ||
          error.status === 403 ||
          error.message?.toLowerCase().includes('not verified') ||
          error.message?.toLowerCase().includes('verify')
        ) {
          toast({
            title: 'Email not verified',
            description: 'Please verify your email before signing in.',
            duration: 10000,
            variant: 'error',
            action: {
              label: 'Resend verification email',
              altText: 'Resend verification email',
              onClick: () => resendVerificationEmail(),
            },
          })
        } else if (
          error.status === 401 ||
          error.message?.toLowerCase().includes('invalid') ||
          error.message?.toLowerCase().includes('incorrect')
        ) {
          toast({
            title: 'Invalid email or password. Please try again.',
            variant: 'error',
          })
        } else if (
          error.message?.toLowerCase().includes('not found') ||
          error.message?.toLowerCase().includes('no user')
        ) {
          toast({
            title: 'No account found with this email. Please sign up first.',
            variant: 'error',
          })
        } else {
          toast({
            title: error.message || 'Failed to sign in. Please try again.',
            variant: 'error',
          })
        }
      } else if (signInData) {
        toast({ title: 'Signed in successfully!', variant: 'success' })
        router.push(next || '/app')
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Sign-in error:', error)
      toast({ title: 'Something went wrong. Please try again.', variant: 'error' })
    }
  }

  return (
    <div className={cx('w-full', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor={emailId}>{t('email.label')}</Label>
          <Input
            id={emailId}
            placeholder={t('email.placeholder')}
            type='email'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
            disabled={isSubmitting}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor={passwordId}>{t('password.label')}</Label>
            <Link
              href='/forgot-password'
              className='text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 hover:dark:text-emerald-600'
            >
              {t('forgot-password')}
            </Link>
          </div>
          <Input
            id={passwordId}
            placeholder={t('password.placeholder')}
            type='password'
            autoCapitalize='none'
            autoComplete='current-password'
            disabled={isSubmitting}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>
        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? t('actions.signing-in') : t('actions.continue')}
        </Button>
      </form>
    </div>
  )
}
