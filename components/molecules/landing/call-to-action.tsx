import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/atoms/button'

export async function CallToAction() {
  const t = await getTranslations('landing.cta-section')
  return (
    <section aria-labelledby='cta-title' className='mx-auto max-w-6xl'>
      <div className='flex flex-col items-center justify-center gap-8 text-center'>
        <div className='sm:col-span-2'>
          <h2 className='scroll-my-60 text-3xl font-semibold tracking-tighter text-balance text-gray-900 dark:text-gray-50 md:text-4xl'>
            {t('title')}
          </h2>
          <p className='mt-3 mb-8 text-lg text-gray-600 dark:text-gray-300'>
            {t('desc')}
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              className='inline-flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border-b-[1.5px] border-emerald-700 bg-linear-to-b from-emerald-400 to-emerald-500 px-5 py-3 leading-4 font-medium tracking-wide whitespace-nowrap text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-emerald-300'
              href='/sign-in'
            >
              {t('primary-cta')}
            </Link>
            <Button asChild className='text-md' variant='secondary'>
              <Link href='#'>{t('secondary-cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
