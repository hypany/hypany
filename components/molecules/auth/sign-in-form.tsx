'use client'

import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInFormData = z.infer<typeof signInSchema>

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
  const emailId = useId()
  const passwordId = useId()
  const router = useRouter()
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
    const resendPromise = (async () => {
      const { error } = await client.sendVerificationEmail({
        callbackURL: '/dashboard',
        email,
      })

      if (error) {
        throw new Error(error.message || 'Failed to send verification email')
      }
      return { email }
    })()

    toast.promise(resendPromise, {
      error: 'Failed to send verification email. Please try again.',
      loading: 'Sending verification email...',
      success: (data: { email: string }) => {
        return `Verification email sent to ${data.email}`
      },
    })
  }

  async function onSubmit(data: SignInFormData) {
    try {
      const { data: signInData, error } = await client.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        // Check for specific error types
        if (
          error.status === 403 ||
          error.message?.toLowerCase().includes('not verified') ||
          error.message?.toLowerCase().includes('verify')
        ) {
          toast.error('Verify your email before signing in.', {
            action: {
              label: 'Resend',
              onClick: () => resendVerificationEmail(),
            },
            description: 'Check your inbox for the verification link.',
          })
        } else if (
          error.status === 401 ||
          error.message?.toLowerCase().includes('invalid') ||
          error.message?.toLowerCase().includes('incorrect')
        ) {
          toast.error('Invalid email or password. Please try again.')
        } else if (
          error.message?.toLowerCase().includes('not found') ||
          error.message?.toLowerCase().includes('no user')
        ) {
          toast.error('No account found with this email. Please sign up first.')
        } else {
          toast.error(error.message || 'Failed to sign in. Please try again.')
        }
      } else if (signInData) {
        toast.success('Signed in successfully!')
        router.push('/dashboard')
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Sign-in error:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={cx('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isSubmitting}
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email.message}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor={passwordId}>Password</Label>
              <Link
                href='/auth/forgot-password'
                className='text-sm text-muted-foreground underline underline-offset-4 hover:text-primary'
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id={passwordId}
              placeholder='Enter your password'
              type='password'
              autoCapitalize='none'
              autoComplete='current-password'
              disabled={isSubmitting}
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-destructive'>
                {errors.password.message}
              </p>
            )}
          </div>
          <Button disabled={isSubmitting} className='w-full'>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or</span>
        </div>
      </div>

      <div className='text-center text-sm'>
        <span className='text-muted-foreground'>
          Don&apos;t have an account?{' '}
        </span>
        <Link
          href='/sign-up'
          className='text-primary underline underline-offset-4 hover:text-primary/80'
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
