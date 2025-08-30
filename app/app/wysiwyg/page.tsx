import WysiwygEditor from '@/components/molecules/editor/wysiwyg-editor'

export default async function WysiwygPage() {
  return (
    <section className='px-4 py-6 sm:px-6'>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>
          WYSIWYG Editor
        </h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Compose rich text, add links and images, then export or copy the
          HTML. Your draft is autosaved locally.
        </p>
      </div>
      <WysiwygEditor />
    </section>
  )
}

