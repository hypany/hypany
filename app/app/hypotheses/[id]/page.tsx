import { notFound } from 'next/navigation'
import { getServerApi } from '@/app/api/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'

export default async function HypothesisOverview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const api = await getServerApi()
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
              <TableCell className='capitalize'>
                {data.hypothesis.status}
              </TableCell>
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
