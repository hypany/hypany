"use client"

import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { useEditorStore } from '@/lib/store/editor'
import type { Node } from '@/lib/page-document'
import { useState } from 'react'
import { ICON_NAMES } from '@/lib/icons'

function findNode(nodes: Node[], id: string | null): Node | null {
  if (!id) return null
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children) {
      const f = findNode(n.children, id)
      if (f) return f
    }
  }
  return null
}

export default function InspectorPanel({ hypothesisId }: { hypothesisId: string }) {
  const doc = useEditorStore((s) => s.doc)
  const selectedId = useEditorStore((s) => s.selectedId)
  const updateNode = useEditorStore((s) => s.updateNode)
  const removeNode = useEditorStore((s) => s.removeNode)
  const [uploading, setUploading] = useState(false)

  const node = findNode(doc.nodes, selectedId)
  if (!node) return <p className='text-xs text-gray-500'>Select an element to edit.</p>

  switch (node.type) {
    case 'heading': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Heading</div>
          <Input
            defaultValue={node.text}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, text: e.target.value }))}
          />
          <div className='pt-2'>
            <div className='mb-1 text-xs text-gray-500'>Align</div>
            <div className='flex gap-1'>
              {(['left', 'center', 'right'] as const).map((al) => (
                <Button
                  key={al}
                  variant='secondary'
                  onClick={() =>
                    updateNode(node.id, (n) => {
                      const baseStyle = n.style ?? {}
                      const nextAlign = { ...(baseStyle.align ?? {}), base: al }
                      return { ...n, style: { ...baseStyle, align: nextAlign } }
                    })
                  }
                >
                  {al}
                </Button>
              ))}
            </div>
          </div>
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'text': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Text</div>
          <Input
            defaultValue={node.text}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, text: e.target.value }))}
          />
          <div className='pt-2'>
            <div className='mb-1 text-xs text-gray-500'>Align</div>
            <div className='flex gap-1'>
              {(['left', 'center', 'right'] as const).map((al) => (
                <Button
                  key={al}
                  variant='secondary'
                  onClick={() =>
                    updateNode(node.id, (n) => {
                      const baseStyle = n.style ?? {}
                      const nextAlign = { ...(baseStyle.align ?? {}), base: al }
                      return { ...n, style: { ...baseStyle, align: nextAlign } }
                    })
                  }
                >
                  {al}
                </Button>
              ))}
            </div>
          </div>
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'button': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Button</div>
          <label className='text-xs text-gray-500'>Label</label>
          <Input
            defaultValue={node.label}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, label: e.target.value }))}
          />
          <label className='text-xs text-gray-500'>Href</label>
          <Input
            defaultValue={node.href || ''}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, href: e.target.value }))}
          />
          <label className='text-xs text-gray-500'>Radius</label>
          <Input
            placeholder='e.g. 8px'
            defaultValue={node.style?.radius?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextRadius = { ...(baseStyle.radius ?? {}), base: e.target.value }
                return { ...n, style: { ...baseStyle, radius: nextRadius } }
              })
            }
          />
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'image': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Image</div>
          <label className='text-xs text-gray-500'>Src</label>
          <Input
            defaultValue={node.src}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, src: e.target.value }))}
          />
          <label className='text-xs text-gray-500'>Alt</label>
          <Input
            defaultValue={node.alt || ''}
            onChange={(e) => updateNode(node.id, (n) => ({ ...n, alt: e.target.value }))}
          />
          <div className='pt-1'>
            <Button
              variant='secondary'
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = async () => {
                  const file = input.files && input.files[0]
                  if (!file) return
                  setUploading(true)
                  try {
                    const form = new FormData()
                    form.append('file', file)
                    if (hypothesisId) form.append('hypothesisId', hypothesisId)
                    const res = await fetch('/api/v1/uploads/image', {
                      method: 'POST',
                      body: form,
                    })
                    if (!res.ok) throw new Error('Upload failed')
                    const json = (await res.json()) as { url?: string }
                    if (json.url)
                      updateNode(node.id, (n) => ({ ...n, src: json.url as string }))
                  } finally {
                    setUploading(false)
                  }
                }
                input.click()
              }}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload image'}
            </Button>
          </div>
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'icon': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Icon</div>
          <div className='grid grid-cols-5 gap-2'>
            {ICON_NAMES.map((n) => (
              <button
                key={n}
                type='button'
                className='rounded border p-2 text-xs hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900'
                onClick={() => updateNode(node.id, (v) => ({ ...v, name: n }))}
              >
                {n}
              </button>
            ))}
          </div>
          <label className='text-xs text-gray-500'>Width</label>
          <Input
            placeholder='e.g. 24px'
            defaultValue={node.style?.width?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => ({
                ...n,
                style: { ...(n.style || {}), width: { ...(n.style?.width || {}), base: e.target.value } } as any,
              }))
            }
          />
          <label className='text-xs text-gray-500'>Color</label>
          <Input
            placeholder='#111827'
            defaultValue={node.style?.color?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => ({
                ...n,
                style: { ...(n.style || {}), color: { ...(n.style?.color || {}), base: e.target.value } } as any,
              }))
            }
          />
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'grid': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Grid</div>
          <label className='text-xs text-gray-500'>Columns</label>
          <Input
            type='number'
            min={1}
            max={6}
            defaultValue={node.style?.cols?.base || 2}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const val = parseInt(e.target.value, 10)
                const nextCols = { ...(baseStyle.cols ?? {}), base: isNaN(val) ? 2 : val }
                return { ...n, style: { ...baseStyle, cols: nextCols } }
              })
            }
          />
          <label className='text-xs text-gray-500'>Gap</label>
          <Input
            placeholder='e.g. 16px'
            defaultValue={node.style?.gap?.base || '16px'}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextGap = { ...(baseStyle.gap ?? {}), base: e.target.value }
                return { ...n, style: { ...baseStyle, gap: nextGap } }
              })
            }
          />
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    case 'section':
    case 'container': {
      return (
        <div className='space-y-2'>
          <div className='text-sm font-semibold'>Layout</div>
          <label className='text-xs text-gray-500'>Padding</label>
          <Input
            placeholder='e.g. 24px'
            defaultValue={node.style?.p?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextP = { ...(baseStyle.p ?? {}), base: e.target.value }
                return { ...n, style: { ...baseStyle, p: nextP } }
              })
            }
          />
          <label className='text-xs text-gray-500'>Margin</label>
          <Input
            placeholder='e.g. 16px'
            defaultValue={node.style?.m?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextM = { ...(baseStyle.m ?? {}), base: e.target.value }
                return { ...n, style: { ...baseStyle, m: nextM } }
              })
            }
          />
          <label className='text-xs text-gray-500'>Background</label>
          <Input
            placeholder='#ffffff or rgb()'
            defaultValue={node.style?.bg?.base || ''}
            onChange={(e) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextBg = { ...(baseStyle.bg ?? {}), base: e.target.value }
                return { ...n, style: { ...baseStyle, bg: nextBg } }
              })
            }
          />
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    default:
      return <p className='text-xs text-gray-500'>No editable content for this element.</p>
  }
}
