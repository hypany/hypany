'use client'

import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { cx } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const signUpSchema = z.object({
  email: z.email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      const { data: signUpData, error } = await client.signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
      })

      if (error) {
        // Check for specific error types
        if (
          error.status === 422 ||
          error.message?.toLowerCase().includes('already exists') ||
          error.message?.toLowerCase().includes('already registered')
        ) {
          toast.error(
            'An account with this email already exists. Please sign in instead.',
          )
        } else if (error.message?.toLowerCase().includes('password')) {
          toast.error('Password must be at least 8 characters long.')
        } else if (error.message?.toLowerCase().includes('email')) {
          toast.error('Please enter a valid email address.')
        } else {
          toast.error(
            error.message || 'Failed to create account. Please try again.',
          )
        }
      } else if (signUpData) {
        toast.success(
          'Account created! Please check your email to verify your account.',
        )
        router.push('/sign-in')
      }
    } catch (error) {
      // Handle network or unexpected errors
      const errorMessage = error instanceof Error ? error.message : ''
      if (
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('already registered')
      ) {
        toast.error(
          'An account with this email already exists. Please sign in instead.',
        )
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className={cx('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor={nameId}>Name</Label>
            <Input
              id={nameId}
              placeholder='John Doe'
              type='text'
              autoCapitalize='words'
              autoComplete='name'
              autoCorrect='off'
              disabled={isSubmitting}
              {...register('name')}
            />
            {errors.name && (
              <p className='text-sm text-destructive'>{errors.name.message}</p>
            )}
          </div>
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
            <Label htmlFor={passwordId}>Password</Label>
            <Input
              id={passwordId}
              placeholder='Create a password'
              type='password'
              autoCapitalize='none'
              autoComplete='new-password'
              disabled={isSubmitting}
              {...register('password')}
            />
            {errors.password ? (
              <p className='text-sm text-destructive'>
                {errors.password.message}
              </p>
            ) : (
              <p className='text-xs text-muted-foreground'>
                Must be at least 8 characters
              </p>
            )}
          </div>
          <Button disabled={isSubmitting} className='w-full'>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
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
        <span className='text-muted-foreground'>Already have an account? </span>
        <Link
          href='/sign-in'
          className='text-primary underline underline-offset-4 hover:text-primary/80'
        >
          Sign in
        </Link>
      </div>

      <p className='text-xs text-center text-muted-foreground'>
        By creating an account, you agree to our{' '}
        <Link
          href='/terms'
          className='underline underline-offset-4 hover:text-primary'
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href='/privacy'
          className='underline underline-offset-4 hover:text-primary'
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
