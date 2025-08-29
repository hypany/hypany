import { api } from '@/app/api'
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from '@/components/atoms/table'

function f(date: string | Date) {
  try {
    return new Date(date).toLocaleString()
  } catch {
    return String(date)
  }
}

export default async function WaitlistPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [{ data: wl }, { data: ent }] = await Promise.all([
    api.v1.waitlists.hypothesis({ hypothesisId: id }).get(),
    api.v1.waitlists.hypothesis({ hypothesisId: id }).entries.get({
      query: { limit: 50 },
    }),
  ])

  const stats = wl?.stats
  const entries = ent?.entries ?? []
  const exportCsvHref = `/api/v1/waitlists/hypothesis/${id}/export?format=csv`

  return (
    <section className='px-4 py-6 sm:px-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>Waitlist</h1>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {stats ? (
              <span>
                {stats.totalEntries} total • {stats.verifiedEntries} verified
              </span>
            ) : (
              <span>Loading…</span>
            )}
          </p>
        </div>
        <a
          className='text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400'
          href={exportCsvHref}
        >
          Export CSV
        </a>
      </div>

      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Verified</TableHeaderCell>
              <TableHeaderCell>Source</TableHeaderCell>
              <TableHeaderCell>Signed up</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.id}>
                <TableCell className='font-medium'>{e.email}</TableCell>
                <TableCell>{e.name ?? ''}</TableCell>
                <TableCell>{e.emailVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>{e.source ?? 'direct'}</TableCell>
                <TableCell>{f(e.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </section>
  )
}

