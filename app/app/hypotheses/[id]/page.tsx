import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { treaty } from '@elysiajs/eden'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { serviceUrl } from '@/lib/url'
import type { App } from '@/app/api/[[...slugs]]/route'

export default async function HypothesisOverview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hdrs = await headers()
  const cookie = hdrs.get('cookie') ?? ''
  const { api } = treaty<App>(serviceUrl, {
    fetcher: (url, init) => fetch(url, { ...init, headers: { ...init?.headers, cookie } }),
  })
  const res = await api.v1.hypotheses({ id }).get()
  const data = res.data
  if (!data || !data.hypothesis) notFound()

  return (
    <section>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Field</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Status</TableCell>
              <TableCell className='capitalize'>{data.hypothesis.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Signups</TableCell>
              <TableCell>{data.signupCount ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Subdomain</TableCell>
              <TableCell>
                {(data.hypothesis as { slug?: string | null }).slug ?? '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}
