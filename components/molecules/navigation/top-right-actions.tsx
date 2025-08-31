'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/atoms/button'

export function TopRightActions() {
  const pathname = usePathname()
  const t = useTranslations('app.pages.root')

  // Show actions per page
  const onDashboard = pathname === '/app'
  const onHypotheses = pathname === '/app/hypotheses'
  if (!onDashboard && !onHypotheses) return null

  return (
    <div className='ml-auto flex items-center gap-2'>
      {onDashboard ? (
        <Button asChild variant='secondary'>
          <Link href='/app/assets'>{t('actions.upload-asset')}</Link>
        </Button>
      ) : null}
      <Button asChild>
        <Link href='/app/hypotheses/create'>{t('actions.create-hypothesis')}</Link>
      </Button>
    </div>
  )
}
