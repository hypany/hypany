import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getActiveOrganization } from '@/functions/organizations'
import { resolveEntityNameById } from '@/functions/resolve'
import { getLandingPageByIdForOrg } from '@/functions/landing-pages'
import { serviceUrl } from '@/lib/url'
import EditorHeaderActions from './header-actions.client'

export default async function EditorBreadcrumbs({
  params,
}: {
  params: Promise<{ hypothesisId: string; landingPageId: string }>
}) {
  const t = await getTranslations('app')
  const { hypothesisId, landingPageId } = await params
  const activeOrgRes = await getActiveOrganization()
  if (!activeOrgRes?.activeOrganizationId) notFound()
  const hypo = await resolveEntityNameById(
    hypothesisId,
    activeOrgRes.activeOrganizationId,
  )
  const lp = await resolveEntityNameById(
    landingPageId,
    activeOrgRes.activeOrganizationId,
  )
  if (!hypo) notFound()

  // Fetch landing page meta (customDomain + slug) for preview URL
  const lpMeta = await getLandingPageByIdForOrg(
    landingPageId,
    activeOrgRes.activeOrganizationId,
  )
  const cd = (lpMeta as any)?.landingPage?.customDomain as string | undefined
  const slug = (lpMeta as any)?.landingPage?.slug as string | undefined
  const previewUrl = cd ? `https://${cd}` : slug ? `${serviceUrl}/preview/${slug}` : null

  return (
    <div className='ml-2 flex w-full items-center'>
      <nav aria-label='Breadcrumb' className='flex-1'>
        <ol className='flex items-center space-x-3 text-sm'>
        <li className='flex'>
          <Link
            href='/app'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.home')}
          </Link>
        </li>
        <ChevronRight
          className='size-4 shrink-0 text-gray-600 dark:text-gray-400'
          aria-hidden='true'
        />
        <li className='flex'>
          <Link
            href='/app/hypotheses'
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('breadcrumbs.hypotheses')}
          </Link>
        </li>
        <ChevronRight
          className='size-4 shrink-0 text-gray-600 dark:text-gray-400'
          aria-hidden='true'
        />
        <li className='flex'>
          <Link
            href={`/app/hypotheses/${hypothesisId}`}
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {hypo.name}
          </Link>
        </li>
        <ChevronRight
          className='size-4 shrink-0 text-gray-600 dark:text-gray-400'
          aria-hidden='true'
        />
        <li className='flex'>
          <Link
            href={`/app/hypotheses/${hypothesisId}/landing-pages`}
            className='text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          >
            {t('pages.hypotheses.tabs.landing-pages')}
          </Link>
        </li>
        {lp ? (
          <>
            <ChevronRight
              className='size-4 shrink-0 text-gray-600 dark:text-gray-400'
              aria-hidden='true'
            />
            <li className='flex'>
              <Link
                href={`/app/editor/${hypothesisId}/${landingPageId}`}
                aria-current='page'
                className='text-gray-900 dark:text-gray-50'
              >
                {lp.name || 'Landing Page'}
              </Link>
            </li>
          </>
        ) : null}
        </ol>
      </nav>
      <EditorHeaderActions previewUrl={previewUrl} landingPageId={landingPageId} />
    </div>
  )
}
