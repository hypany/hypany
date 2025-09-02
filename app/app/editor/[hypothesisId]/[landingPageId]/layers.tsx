"use client"

import { useCallback, useMemo, useRef, useState } from 'react'
import { useEditorStore } from '@/lib/store/editor'
import type { Node as EditorNode, NodeType } from '@/lib/page-document'
import {
  Box,
  LayoutTemplate,
  Grid2X2,
  Heading1,
  Type,
  Image as ImageIcon,
  MousePointerSquareDashed,
  Minus,
  Circle,
  SquareDashed,
  FormInput,
  MoreHorizontal,
} from 'lucide-react'
import { Input } from '@/components/atoms/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import { ulid } from 'ulid'

function NodeIcon({ type }: { type: NodeType }) {
  switch (type) {
    case 'section':
      return <LayoutTemplate className='size-4' />
    case 'container':
      return <Box className='size-4' />
    case 'grid':
      return <Grid2X2 className='size-4' />
    case 'heading':
      return <Heading1 className='size-4' />
    case 'text':
      return <Type className='size-4' />
    case 'image':
      return <ImageIcon className='size-4' />
    case 'button':
      return <MousePointerSquareDashed className='size-4' />
    case 'divider':
      return <Minus className='size-4' />
    case 'spacer':
      return <SquareDashed className='size-4' />
    case 'icon':
      return <Circle className='size-4' />
    case 'form':
      return <FormInput className='size-4' />
    default:
      return <Box className='size-4' />
  }
}

function labelFor(node: EditorNode): string {
  if (node.name) return node.name
  switch (node.type) {
    case 'heading':
      return node.text?.slice(0, 40) || 'Heading'
    case 'text':
      return node.text?.slice(0, 40) || 'Text'
    case 'button':
      return node.label?.slice(0, 40) || 'Button'
    case 'image':
      return node.alt || node.src?.split('/').pop() || 'Image'
    case 'grid':
      return 'Grid'
    case 'container':
      return 'Container'
    case 'section':
      return 'Section'
    case 'divider':
      return 'Divider'
    case 'spacer':
      return 'Spacer'
    case 'icon':
      return 'Icon'
    case 'form':
      return 'Form'
    default:
      return 'Unknown'
  }
}

export default function LayersPanel() {
  const doc = useEditorStore((s) => s.doc)
  const selectedId = useEditorStore((s) => s.selectedId)
  const select = useEditorStore((s) => s.select)
  const removeNode = useEditorStore((s) => s.removeNode)
  const duplicateNode = useEditorStore((s) => s.duplicateNode)
  const updateNode = useEditorStore((s) => s.updateNode)
  const setDoc = useEditorStore((s) => s.setDoc)
  const dragStartStore = useEditorStore((s) => s.dragStart)
  const dragHoverStore = useEditorStore((s) => s.dragHover)
  const dragClearStore = useEditorStore((s) => s.dragClear)
  const moveNodeStore = useEditorStore((s) => s.moveNode)
  const draggingId = useEditorStore((s) => s.draggingId)
  const dropTargetId = useEditorStore((s) => s.dropTargetId)
  const dropPosition = useEditorStore((s) => s.dropPosition)

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] }))

  const rows = useMemo(() => doc.nodes as EditorNode[], [doc.nodes])

  const flattenVisible = useCallback(
    (nodes: EditorNode[], out: EditorNode[] = []) => {
      for (const n of nodes) {
        out.push(n)
        if (n.children && !collapsed[n.id]) flattenVisible(n.children, out)
      }
      return out
    },
    [collapsed],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      e.preventDefault()
      const flat = flattenVisible(rows, [])
      if (flat.length === 0) return
      const currentIndex = selectedId ? flat.findIndex((n) => n.id === selectedId) : -1
      if (e.key === 'ArrowUp') {
        const nextIndex = currentIndex <= 0 ? 0 : currentIndex - 1
        select(flat[nextIndex].id)
      } else if (e.key === 'ArrowDown') {
        const nextIndex = currentIndex < 0 ? 0 : Math.min(flat.length - 1, currentIndex + 1)
        select(flat[nextIndex].id)
      }
    },
    [flattenVisible, rows, selectedId, select],
  )

  function findParentAndIndex(nodes: EditorNode[], id: string, parent: EditorNode | null = null): { parent: EditorNode | null; index: number } | null {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      if (n.id === id) return { parent, index: i }
      if (n.children && n.children.length > 0) {
        const res = findParentAndIndex(n.children, id, n)
        if (res) return res
      }
    }
    return null
  }

  function replaceNode(nodes: EditorNode[], id: string, replacer: (node: EditorNode) => EditorNode): EditorNode[] {
    return nodes.map((n) => {
      if (n.id === id) return replacer(n)
      if (n.children && n.children.length > 0) return { ...n, children: replaceNode(n.children, id, replacer) }
      return n
    })
  }

  function wrapInContainer(id: string) {
    const newId = ulid()
    const nextNodes = replaceNode(rows, id, (node) => ({ id: newId, type: 'container', children: [node] }))
    setDoc({ ...doc, nodes: nextNodes })
    select(newId)
  }

  function moveUp(id: string) {
    const place = findParentAndIndex(rows, id, null)
    if (!place) return
    const { parent, index } = place
    if (index <= 0) return
    const siblings = parent ? parent.children || [] : rows
    const prev = siblings[index - 1]
    useEditorStore.getState().moveNode(id, prev.id, 'before')
  }

  function moveDown(id: string) {
    const place = findParentAndIndex(rows, id, null)
    if (!place) return
    const { parent, index } = place
    const siblings = parent ? parent.children || [] : rows
    if (index >= siblings.length - 1) return
    const next = siblings[index + 1]
    useEditorStore.getState().moveNode(id, next.id, 'after')
  }

  const Row = ({ node, depth }: { node: EditorNode; depth: number }) => {
    const isSelected = selectedId === node.id
    const hasChildren = (node.children?.length || 0) > 0
    const isCollapsed = collapsed[node.id]
    const [editing, setEditing] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const startRename = () => {
      setEditing(true)
      setTimeout(() => inputRef.current?.select(), 0)
    }
    const commitRename = () => setEditing(false)
    const canDropInside = node.type === 'section' || node.type === 'container' || node.type === 'grid'
    const isDropBefore = dropTargetId === node.id && dropPosition === 'before'
    const isDropAfter = dropTargetId === node.id && dropPosition === 'after'
    const isDropInside = dropTargetId === node.id && dropPosition === 'inside'
    return (
      <div>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{ paddingLeft: 8 + depth * 12 }}
              onClick={(e) => {
                e.stopPropagation()
                select(node.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                startRename()
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                select(node.id)
                setMenuOpen(true)
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move'
                dragStartStore(node.id)
              }}
              onDragEnd={() => {
                dragClearStore()
              }}
              onDragOver={(e) => {
                e.preventDefault()
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                const y = e.clientY - rect.top
                let pos: 'before' | 'after' | 'inside' = 'after'
                const canInside = canDropInside && rect.height >= 24
                if (canInside && y > rect.height * 0.3 && y < rect.height * 0.7) pos = 'inside'
                else pos = y < rect.height / 2 ? 'before' : 'after'
                dragHoverStore(node.id, pos)
                e.dataTransfer.dropEffect = 'move'
              }}
              onDrop={(e) => {
                e.preventDefault()
                if (draggingId && dropPosition) {
                  moveNodeStore(draggingId, node.id, dropPosition)
                }
                dragClearStore()
              }}
              role='treeitem'
              aria-selected={isSelected}
              aria-level={depth + 1}
              aria-expanded={hasChildren ? !isCollapsed : undefined}
              className={'relative ' + (
                'group flex items-center justify-between rounded-sm px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-900 ' +
                (isSelected ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-400 dark:bg-emerald-900/20 dark:text-emerald-200' : 'text-gray-700 dark:text-gray-300')
              )}
            >
              {/* Drop indicators */}
              {isDropBefore ? (
                <div className='pointer-events-none absolute inset-x-0 -top-px h-0.5 bg-emerald-500' />
              ) : null}
              {isDropAfter ? (
                <div className='pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-emerald-500' />
              ) : null}
              {isDropInside ? (
                <div className='pointer-events-none absolute inset-0 rounded-sm ring-2 ring-emerald-500/60 bg-emerald-500/5' />
              ) : null}
              <div className='flex min-w-0 items-center gap-2'>
                {hasChildren ? (
                  <button
                    type='button'
                    className='rounded p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(node.id)
                }}
                aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              >
                <svg className='size-3' viewBox='0 0 20 20' fill='currentColor'>
                  <path d='M6 8l4 4 4-4' className={isCollapsed ? '' : 'rotate-90 origin-center'} />
                </svg>
              </button>
            ) : (
              <span className='ml-4' />
            )}
            <NodeIcon type={node.type} />
            {editing ? (
              <Input
                ref={inputRef}
                defaultValue={node.name || ''}
                className='h-6 py-0 text-[11px]'
                onBlur={() => commitRename()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitRename()
                  if (e.key === 'Escape') {
                    ;(e.currentTarget as HTMLInputElement).value = node.name || ''
                    commitRename()
                  }
                }}
                onChange={(e) => updateNode(node.id, (n) => ({ ...n, name: e.target.value }))}
              />
            ) : (
              <span className='truncate'>{labelFor(node)}</span>
            )}
          </div>
              <div className='flex items-center gap-1 opacity-0 transition group-hover:opacity-100'>
            <button
              type='button'
              className='rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen((v) => !v)
              }}
              aria-label='More'
            >
              <MoreHorizontal className='size-3.5' />
            </button>
          </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => startRename()}>Rename</DropdownMenuItem>
            <DropdownMenuItem onClick={() => moveUp(node.id)}>Move up</DropdownMenuItem>
            <DropdownMenuItem onClick={() => moveDown(node.id)}>Move down</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateNode(node.id, (n) => ({ ...n, locked: !n.locked }))}>
              {node.locked ? 'Unlock' : 'Lock'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateNode(node.id, (n) => ({ ...n, hidden: !n.hidden }))}>
              {node.hidden ? 'Show' : 'Hide'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateNode(node.id)}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeNode(node.id)}>Delete</DropdownMenuItem>
            <DropdownMenuItem onClick={() => wrapInContainer(node.id)}>
              Wrap in Container
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {hasChildren && !isCollapsed ? (
          <div>
            {(node.children || []).map((c) => (
              <Row key={c.id} node={c} depth={depth + 1} />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className='min-h-0 overflow-auto' tabIndex={0} onKeyDown={onKeyDown}>
      <div className='text-xs text-gray-500 mb-2'>Layers</div>
      <div className='space-y-0.5'>
        {rows.map((n) => (
          <Row key={n.id} node={n} depth={0} />
        ))}
      </div>
    </div>
  )
}
