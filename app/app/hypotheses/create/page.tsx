import CreateHypothesisForm from './ui'

export default async function CreateHypothesisPage() {
  return (
    <section className='p-6'>
      <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
        Create Hypothesis
      </h1>
      <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
        Give it a name, optional description, and a subdomain if you want.
        We&apos;ll create a landing page and waitlist automatically.
      </p>
      <CreateHypothesisForm />
    </section>
  )
}
