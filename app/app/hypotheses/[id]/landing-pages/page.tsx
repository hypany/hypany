import { Button } from '@/components/atoms/button'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '@/components/atoms/table'
import { getServerApi } from '@/app/api/server'
import Link from 'next/link'
import { CreateLandingPageButton, DuplicateLandingPageButton, RenameLandingPageInline } from './ui'
import { notFound } from 'next/navigation'

export default async function LandingPagesGallery({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const api = await getServerApi()

  const hypRes = await api.v1.hypotheses({ id }).get()
  const hypData = hypRes.data
  if (!hypData || !hypData.hypothesis) notFound()

  const pagesRes = await api.v1['landing-pages'].hypothesis({ hypothesisId: id })['list'].get()
  const pages = pagesRes.data?.pages ?? []
  const hyp = {
    customDomain: null as string | null,
    id: hypData.hypothesis.id,
    name: hypData.hypothesis.name,
    slug: (hypData.hypothesis as { slug?: string | null }).slug ?? null,
  }

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
                      {(hyp.customDomain || hyp.slug) && (
                        <div className='text-xs text-gray-500'>
                          {hyp.customDomain || (hyp.slug ? `${hyp.slug}.hypany.app` : '')}
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
                      {hyp.slug && (
                        <Button asChild variant='secondary' className='py-1.5'>
                          <Link href={`/${hyp.slug}`} target='_blank' rel='noopener noreferrer'>View</Link>
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
