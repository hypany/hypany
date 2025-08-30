import { notFound, redirect } from 'next/navigation'
import { getClientApi } from '@/app/api/client'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const api = getClientApi()
  const res = await api.v1['landing-pages']
    .hypothesis({ hypothesisId: id })
    .get()
  const data = res.data
  if (!data || !data.landingPage) notFound()
  redirect(`/app/editor/${id}/${data.landingPage.id}`)
}
