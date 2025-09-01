import 'server-only'
import type { PageDocument, Node } from '@/lib/page-document'
import { ICONS, isIconName } from '@/lib/icons'

function renderNode(node: Node) {
  switch (node.type) {
    case 'section':
      return (
        <section key={node.id} className='mb-10'>
          {(node.children || []).map((c) => renderNode(c))}
        </section>
      )
    case 'container':
      return (
        <div key={node.id} className='mx-auto max-w-5xl px-4'>
          {(node.children || []).map((c) => renderNode(c))}
        </div>
      )
    case 'grid':
      return (
        <div key={node.id} className='grid gap-4 sm:grid-cols-2'>
          {(node.children || []).map((c) => renderNode(c))}
        </div>
      )
    case 'heading':
      return (
        <h1 key={node.id} className='text-3xl font-bold'>
          {node.text}
        </h1>
      )
    case 'text':
      return (
        <p key={node.id} className='text-gray-600 dark:text-gray-300'>
          {node.text}
        </p>
      )
    case 'image':
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={node.id} src={node.src} alt={node.alt || ''} />
    case 'button':
      return (
        <a
          key={node.id}
          href={node.href || '#'}
          className='inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900'
        >
          {node.label}
        </a>
      )
    case 'divider':
      return <hr key={node.id} className='my-6 border-gray-200 dark:border-gray-800' />
    case 'spacer':
      return <div key={node.id} className='h-6' />
    case 'icon':
      if ('name' in node && (node as any).name && isIconName((node as any).name as string)) {
        const IconComp = ICONS[(node as any).name as keyof typeof ICONS]
        return <IconComp key={node.id} />
      }
      return <span key={node.id} aria-hidden className='inline-block' />
    case 'form':
      return null
    default:
      return null
  }
}

export function DocumentRenderer({ doc, customCss }: { doc: PageDocument; customCss?: string | null }) {
  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      {customCss ? <style>{customCss}</style> : null}
      <main className='mx-auto max-w-5xl px-4 py-10'>
        {doc.nodes.map((n) => renderNode(n))}
      </main>
    </div>
  )
}
