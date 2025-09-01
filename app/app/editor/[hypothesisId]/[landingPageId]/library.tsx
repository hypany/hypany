"use client"

import { ulid } from 'ulid'
import { Button } from '@/components/atoms/button'
import { useEditorStore } from '@/lib/store/editor'
import type { Node } from '@/lib/page-document'
import { faqTemplate, featuresTemplate, footerTemplate, heroTemplate } from './templates'

export default function LibraryPanel() {
  const insert = useEditorStore((s) => s.insertChild)
  const selectedId = useEditorStore((s) => s.selectedId)

  function canHaveChildren(node: Node | null): boolean {
    if (!node) return true
    return node.type === 'section' || node.type === 'container' || node.type === 'grid'
  }

  function resolveParentId(node: Node | null): string | null {
    return canHaveChildren(node) ? (node ? node.id : null) : null
  }

  function insertNode(node: Node) {
    const state = useEditorStore.getState()
    const find = (nodes: Node[], id: string | null): Node | null => {
      if (!id) return null
      for (const n of nodes) {
        if (n.id === id) return n
        if (n.children) {
          const r = find(n.children, id)
          if (r) return r
        }
      }
      return null
    }
    const current = find(state.doc.nodes, selectedId)
    const parentId = resolveParentId(current)
    insert(parentId, node)
  }

  function add(
    type:
      | 'section'
      | 'container'
      | 'heading'
      | 'text'
      | 'button'
      | 'image'
      | 'icon'
      | 'grid'
      | 'divider'
      | 'spacer',
  ) {
    const id = ulid()
    if (type === 'section') {
      insertNode({ id, type: 'section', children: [] })
    } else if (type === 'container') {
      insertNode({ id, type: 'container', children: [] })
    } else if (type === 'heading') {
      insertNode({ id, type: 'heading', text: 'New Heading', level: 1 })
    } else if (type === 'text') {
      insertNode({ id, type: 'text', text: 'Paragraph text' })
    } else if (type === 'button') {
      insertNode({ id, type: 'button', label: 'Button', href: '#' })
    } else if (type === 'image') {
      insertNode({ id, type: 'image', src: '/placeholder.svg', alt: 'Image' })
    } else if (type === 'grid') {
      insertNode({ id, type: 'grid', children: [], style: { cols: { base: 2 }, gap: { base: '16px' } } })
    } else if (type === 'divider') {
      insertNode({ id, type: 'divider' })
    } else if (type === 'spacer') {
      insertNode({ id, type: 'spacer' })
    } else if (type === 'icon') {
      insertNode({ id, type: 'icon', name: 'ArrowRight' })
    }
  }

  return (
    <div>
      <div className='mb-2 text-sm font-semibold'>Library</div>
      <div className='grid grid-cols-2 gap-2'>
        <Button variant='secondary' onClick={() => add('section')}>Section</Button>
        <Button variant='secondary' onClick={() => add('container')}>Container</Button>
        <Button variant='secondary' onClick={() => add('heading')}>Heading</Button>
        <Button variant='secondary' onClick={() => add('text')}>Text</Button>
        <Button variant='secondary' onClick={() => add('button')}>Button</Button>
        <Button variant='secondary' onClick={() => add('image')}>Image</Button>
        <Button variant='secondary' onClick={() => add('icon')}>Icon</Button>
        <Button variant='secondary' onClick={() => add('grid')}>Grid</Button>
        <Button variant='secondary' onClick={() => add('divider')}>Divider</Button>
        <Button variant='secondary' onClick={() => add('spacer')}>Spacer</Button>
      </div>
      <div className='mt-4 mb-2 text-sm font-semibold'>Blocks</div>
      <div className='grid grid-cols-2 gap-2'>
        <Button variant='secondary' onClick={() => insertNode(heroTemplate())}>Hero</Button>
        <Button variant='secondary' onClick={() => insertNode(featuresTemplate())}>Features</Button>
        <Button variant='secondary' onClick={() => insertNode(faqTemplate())}>FAQ</Button>
        <Button variant='secondary' onClick={() => insertNode(footerTemplate())}>Footer</Button>
      </div>
      <p className='mt-3 text-xs text-gray-500'>Inserts under current selection. Click canvas background to deselect.</p>
    </div>
  )
}
