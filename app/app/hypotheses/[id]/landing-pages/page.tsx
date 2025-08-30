import { auth } from '@/auth'
import { Button } from '@/components/atoms/button'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '@/components/atoms/table'
import { db } from '@/drizzle'
import { hypotheses, landingPages } from '@/schema'
import { and, eq, isNull } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'
import { CreateLandingPageButton, DuplicateLandingPageButton } from './ui'
import { notFound } from 'next/navigation'

export default async function LandingPagesGallery({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const hdrs = await headers()
  const session = await auth.api.getSession({ headers: hdrs })
  const orgId = session?.session?.activeOrganizationId
  if (!orgId) notFound()

  // Ensure hypothesis belongs to org
  const [hyp] = await db
    .select({ id: hypotheses.id, name: hypotheses.name, slug: hypotheses.slug })
    .from(hypotheses)
    .where(
      and(
        eq(hypotheses.id, id),
        eq(hypotheses.organizationId, orgId),
        isNull(hypotheses.deletedAt),
      ),
    )
    .limit(1)
  if (!hyp) notFound()

  const pages = await db
    .select({
      customDomain: landingPages.customDomain,
      id: landingPages.id,
      name: landingPages.name,
      publishedAt: landingPages.publishedAt,
      template: landingPages.template,
      updatedAt: landingPages.updatedAt,
    })
    .from(landingPages)
    .where(and(eq(landingPages.hypothesisId, id), isNull(landingPages.deletedAt)))

  return (
    <section>
      <div className='mb-4 flex justify-end'>
        <CreateLandingPageButton hypothesisId={id} />
      </div>

      {pages.length === 0 ? (
        <div className='rounded-md border border-dashed p-6 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400'>
          No landing pages yet. Use the Domains tab to configure your first page.
        </div>
      ) : (
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Template</TableHeaderCell>
                <TableHeaderCell>Published</TableHeaderCell>
                <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className='font-medium'>
                    <div className='max-w-xs'>
                      <RenameLandingPageInline landingPageId={p.id} initialName={p.name || null} />
                      <div className='mt-1 text-xs text-gray-500'>
                        ID: {p.id}
                      </div>
                      {(p.customDomain || p.slug) && (
                        <div className='text-xs text-gray-500'>
                          {p.customDomain || (p.slug ? `${p.slug}.hypany.app` : '')}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{p.template}</TableCell>
                  <TableCell>{p.publishedAt ? 'Yes' : 'No'}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button asChild variant='secondary' className='py-1.5'>
                        <Link href={`/app/editor/${id}/${p.id}`}>Open Editor</Link>
                      </Button>
                      <DuplicateLandingPageButton hypothesisId={id} landingPageId={p.id} />
                      {p.slug && (
                        <Button asChild variant='secondary' className='py-1.5'>
                          <Link href={`/${p.slug}`} target='_blank' rel='noopener noreferrer'>View</Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      )}
    </section>
  )
}
