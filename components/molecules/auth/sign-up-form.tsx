'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type * as React from 'react'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { client } from '@/auth/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { toast } from '@/lib/use-toast'
import { cx } from '@/lib/utils'

const signUpSchema = z.object({
  email: z.email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultEmail?: string
  next?: string
}

export function SignUpForm({
  className,
  defaultEmail,
  next,
  ...props
}: SignUpFormProps) {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: { email: defaultEmail ?? '' },
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
          toast({
            description: 'Try signing in or reset your password to continue.',
            title:
              'An account with this email already exists. Please sign in instead.',
            variant: 'error',
          })
        } else if (error.message?.toLowerCase().includes('password')) {
          toast({
            description: 'Use at least 8 characters for your password.',
            title: 'Password must be at least 8 characters long.',
            variant: 'error',
          })
        } else if (error.message?.toLowerCase().includes('email')) {
          toast({
            description: 'Double-check the email format and try again.',
            title: 'Please enter a valid email address.',
            variant: 'error',
          })
        } else {
          toast({
            description: 'Please try again in a moment.',
            title:
              error.message || 'Failed to create account. Please try again.',
            variant: 'error',
          })
        }
      } else if (signUpData) {
        toast({
          description:
            'Please check your email to verify your account before signing in.',
          duration: 5000,
          title: 'Account created successfully!',
          variant: 'success',
        })
        const dest = next
          ? `/sign-in?next=${encodeURIComponent(next)}`
          : '/sign-in'
        router.push(dest)
      }
    } catch (error) {
      // Handle network or unexpected errors
      const errorMessage = error instanceof Error ? error.message : ''
      if (
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('already registered')
      ) {
        toast({
          description: 'Try signing in or reset your password to continue.',
          title:
            'An account with this email already exists. Please sign in instead.',
          variant: 'error',
        })
      } else {
        toast({
          description: 'Please try again in a moment.',
          title: 'Something went wrong. Please try again.',
          variant: 'error',
        })
      }
    }
  }

  return (
    <div className={cx('w-full', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
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
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
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
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
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
            <p className='text-sm text-red-600 dark:text-red-500'>
              {errors.password.message}
            </p>
          ) : (
            <p className='text-xs text-gray-500 dark:text-gray-500'>
              Must be at least 8 characters
            </p>
          )}
        </div>
        <Button disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  )
}
