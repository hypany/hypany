import { getTranslations } from 'next-intl/server'
export default async function Page() {
  await getTranslations('app.pages.root')
  return <div>Page</div>
}
