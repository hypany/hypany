"use client"

import { ulid } from 'ulid'
import { Button } from '@/components/atoms/button'
import { useEditorStore } from '@/lib/store/editor'
import type { Node } from '@/lib/page-document'
import { faqTemplate, featuresTemplate, footerTemplate, heroTemplate } from './templates'

export default function LibraryPanel() {
  const insert = useEditorStore((s) => s.insertChild)
  const selectedId = useEditorStore((s) => s.selectedId)
  const startPaletteDrag = useEditorStore((s) => s.startPaletteDrag)
  const clearPaletteDrag = useEditorStore((s) => s.clearPaletteDrag)

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

  function nodeForType(
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
  ): Node {
    const id = ulid()
    switch (type) {
      case 'section':
        return { id, type: 'section', children: [] }
      case 'container':
        return { id, type: 'container', children: [] }
      case 'heading':
        return { id, type: 'heading', text: 'New Heading', level: 1 }
      case 'text':
        return { id, type: 'text', text: 'Paragraph text' }
      case 'button':
        return { id, type: 'button', label: 'Button', href: '#' }
      case 'image':
        return { id, type: 'image', src: '/placeholder.svg', alt: 'Image' }
      case 'icon':
        return { id, type: 'icon', name: 'ArrowRight' }
      case 'grid':
        return { id, type: 'grid', children: [], style: { cols: { base: 2 }, gap: { base: '1rem' } } }
      case 'divider':
        return { id, type: 'divider' }
      case 'spacer':
        return { id, type: 'spacer' }
    }
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
    insertNode(nodeForType(type))
  }

  return (
    <div>
      <div className='mb-2 text-sm font-semibold'>Library</div>
      <div className='grid grid-cols-2 gap-2'>
        {([
          'section',
          'container',
          'heading',
          'text',
          'button',
          'image',
          'icon',
          'grid',
          'divider',
          'spacer',
        ] as const).map((t) => (
          <Button
            key={t}
            variant='secondary'
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copyMove'
              startPaletteDrag(nodeForType(t))
            }}
            onDragEnd={() => clearPaletteDrag()}
            onClick={() => add(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </Button>
        ))}
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
