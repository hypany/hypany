import { HypanyLogo } from '@/public/brand/hypany-logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <HypanyLogo />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Hypany is a platform for checking if your next startup will
              actually be successful.&rdquo;
            </p>
            <footer className='text-sm'>Alfred, Marketing Director</footer>
          </blockquote>
        </div>
      </div>

      {children}
    </div>
  )
}
