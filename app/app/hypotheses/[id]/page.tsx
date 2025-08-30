import { redirect } from 'next/navigation'

export default async function HypothesisIndex({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/app/hypotheses/${id}/editor`)
}
