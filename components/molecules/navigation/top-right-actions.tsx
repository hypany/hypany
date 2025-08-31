'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { CreateOrganizationForm } from '@/components/molecules/organization/create-organization-form'

export function TopRightActions() {
  const pathname = usePathname()
  const t = useTranslations('app')

  // Show actions per page
  const onDashboard = pathname === '/app'
  const onHypotheses = pathname === '/app/hypotheses'
  const onOrganizations = pathname === '/app/organizations'
  if (!onDashboard && !onHypotheses && !onOrganizations) return null

  return (
    <div className='ml-auto flex items-center gap-2'>
      {onDashboard ? (
        <Button asChild variant='secondary'>
          <Link href='/app/assets'>{t('pages.root.actions.upload-asset')}</Link>
        </Button>
      ) : null}
      {onHypotheses && (
        <Button asChild>
          <Link href='/app/hypotheses/create'>
            {t('pages.root.actions.create-hypothesis')}
          </Link>
        </Button>
      )}
      {onOrganizations && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create organization</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Create organization</DialogTitle>
            </DialogHeader>
            <CreateOrganizationForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
