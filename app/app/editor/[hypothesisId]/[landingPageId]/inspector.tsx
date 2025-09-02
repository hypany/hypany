"use client"

import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import { useEditorStore } from '@/lib/store/editor'
import type { Node } from '@/lib/page-document'
import { useMemo, useState } from 'react'
import { ICON_NAMES, ICONS, isIconName } from '@/lib/icons'

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

  // Tailwind-like scales and tokens (Shadcn tokens for colors)
  const spacingOptions = useMemo(
    () => [
      { k: '0', v: '0rem' },
      { k: '0.5', v: '0.125rem' }, // 2px
      { k: '1', v: '0.25rem' }, // 4px
      { k: '1.5', v: '0.375rem' }, // 6px
      { k: '2', v: '0.5rem' }, // 8px
      { k: '2.5', v: '0.625rem' }, // 10px
      { k: '3', v: '0.75rem' }, // 12px
      { k: '3.5', v: '0.875rem' }, // 14px
      { k: '4', v: '1rem' }, // 16px
      { k: '5', v: '1.25rem' }, // 20px
      { k: '6', v: '1.5rem' }, // 24px
      { k: '8', v: '2rem' }, // 32px
      { k: '10', v: '2.5rem' }, // 40px
      { k: '12', v: '3rem' }, // 48px
      { k: '16', v: '4rem' }, // 64px
      { k: '20', v: '5rem' }, // 80px
      { k: '24', v: '6rem' }, // 96px
      { k: '32', v: '8rem' }, // 128px
      { k: '40', v: '10rem' }, // 160px
      { k: '48', v: '12rem' }, // 192px
      { k: '56', v: '14rem' }, // 224px
      { k: '64', v: '16rem' }, // 256px
      { k: '80', v: '20rem' }, // 320px
      { k: '96', v: '24rem' }, // 384px
    ],
    [],
  )

  const radiusOptions = [
    { k: 'none', v: '0rem' },
    { k: 'sm', v: '0.125rem' },
    { k: 'md', v: '0.375rem' },
    { k: 'lg', v: '0.5rem' },
    { k: 'xl', v: '0.75rem' },
    { k: '2xl', v: '1rem' },
    { k: '3xl', v: '1.5rem' },
    { k: 'full', v: '9999px' },
  ] as const

  const iconSizeOptions = [
    { k: '4 (1rem)', v: '1rem' },
    { k: '5 (1.25rem)', v: '1.25rem' },
    { k: '6 (1.5rem)', v: '1.5rem' },
    { k: '8 (2rem)', v: '2rem' },
    { k: '10 (2.5rem)', v: '2.5rem' },
    { k: '12 (3rem)', v: '3rem' },
  ] as const

  const colorTokenOptions = [
    { k: 'foreground', v: 'hsl(var(--foreground))' },
    { k: 'muted-foreground', v: 'hsl(var(--muted-foreground))' },
    { k: 'primary', v: 'hsl(var(--primary))' },
    { k: 'secondary', v: 'hsl(var(--secondary))' },
    { k: 'accent', v: 'hsl(var(--accent))' },
    { k: 'destructive', v: 'hsl(var(--destructive))' },
  ] as const

  const bgTokenOptions = [
    { k: 'background', v: 'hsl(var(--background))' },
    { k: 'muted', v: 'hsl(var(--muted))' },
    { k: 'primary', v: 'hsl(var(--primary))' },
    { k: 'secondary', v: 'hsl(var(--secondary))' },
    { k: 'accent', v: 'hsl(var(--accent))' },
    { k: 'destructive', v: 'hsl(var(--destructive))' },
    { k: 'transparent', v: 'transparent' },
  ] as const

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
            <Select
              value={node.style?.align?.base}
              onValueChange={(al: 'left' | 'center' | 'right') =>
                updateNode(node.id, (n) => {
                  const baseStyle = n.style ?? {}
                  const nextAlign = { ...(baseStyle.align ?? {}), base: al }
                  return { ...n, style: { ...baseStyle, align: nextAlign } }
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select alignment' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(['left', 'center', 'right'] as const).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
            <Select
              value={node.style?.align?.base}
              onValueChange={(al: 'left' | 'center' | 'right') =>
                updateNode(node.id, (n) => {
                  const baseStyle = n.style ?? {}
                  const nextAlign = { ...(baseStyle.align ?? {}), base: al }
                  return { ...n, style: { ...baseStyle, align: nextAlign } }
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select alignment' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(['left', 'center', 'right'] as const).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
          <div className='pt-2'>
            <div className='mb-1 text-xs text-gray-500'>Align</div>
            <Select
              value={(node.style?.self?.base as 'start' | 'center' | 'end' | undefined) || undefined}
              onValueChange={(al: 'start' | 'center' | 'end') =>
                updateNode(node.id, (n) => {
                  const baseStyle = n.style ?? {}
                  const nextSelf = { ...(baseStyle.self ?? {}), base: al }
                  return { ...n, style: { ...baseStyle, self: nextSelf } }
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select alignment' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(['start', 'center', 'end'] as const).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <label className='text-xs text-gray-500'>Radius</label>
          <Select
            value={radiusOptions.find((o) => o.v === node.style?.radius?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextRadius = { ...(baseStyle.radius ?? {}), base: val }
                return { ...n, style: { ...baseStyle, radius: nextRadius } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select radius' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {radiusOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          {(() => {
            const name = (node as any).name as string | undefined
            if (name && isIconName(name)) {
              const IconComp = ICONS[name]
              const size = (node.style?.width?.base as string | undefined) || '1.5rem'
              const color = (node.style?.color?.base as string | undefined) || 'currentColor'
              return (
                <div className='flex items-center justify-center rounded border p-3 dark:border-gray-800'>
                  <IconComp style={{ width: size, height: size, color }} />
                </div>
              )
            }
            return null
          })()}
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
          <label className='text-xs text-gray-500'>Size</label>
          <Select
            value={iconSizeOptions.find((o) => o.v === node.style?.width?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => ({
                ...n,
                style: {
                  ...(n.style || {}),
                  width: { ...(n.style?.width || {}), base: val },
                  height: { ...(n.style?.height || {}), base: val },
                } as any,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select size' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {iconSizeOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className='text-xs text-gray-500'>Color</label>
          <Select
            value={colorTokenOptions.find((o) => o.v === node.style?.color?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => ({
                ...n,
                style: { ...(n.style || {}), color: { ...(n.style?.color || {}), base: val } } as any,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select color' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {colorTokenOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <Select
            value={String((node.style?.cols?.base as number | undefined) ?? '2')}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextCols = { ...(baseStyle.cols ?? {}), base: parseInt(val, 10) }
                return { ...n, style: { ...baseStyle, cols: nextCols } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select columns' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[1, 2, 3, 4, 5, 6].map((c) => (
                  <SelectItem key={c} value={String(c)}>
                    {c}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className='text-xs text-gray-500'>Gap</label>
          <Select
            value={spacingOptions.find((o) => o.v === node.style?.gap?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextGap = { ...(baseStyle.gap ?? {}), base: val }
                return { ...n, style: { ...baseStyle, gap: nextGap } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select gap (Tailwind scale)' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {spacingOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <Select
            value={spacingOptions.find((o) => o.v === node.style?.p?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextP = { ...(baseStyle.p ?? {}), base: val }
                return { ...n, style: { ...baseStyle, p: nextP } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select padding (Tailwind scale)' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {spacingOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className='text-xs text-gray-500'>Margin</label>
          <Select
            value={spacingOptions.find((o) => o.v === node.style?.m?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextM = { ...(baseStyle.m ?? {}), base: val }
                return { ...n, style: { ...baseStyle, m: nextM } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select margin (Tailwind scale)' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {spacingOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className='text-xs text-gray-500'>Background</label>
          <Select
            value={bgTokenOptions.find((o) => o.v === node.style?.bg?.base)?.v}
            onValueChange={(val) =>
              updateNode(node.id, (n) => {
                const baseStyle = n.style ?? {}
                const nextBg = { ...(baseStyle.bg ?? {}), base: val }
                return { ...n, style: { ...baseStyle, bg: nextBg } }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select background' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bgTokenOptions.map((o) => (
                  <SelectItem key={o.k} value={o.v}>
                    {o.k}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='pt-2'>
            <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
          </div>
        </div>
      )
    }
    default:
      return (
        <div className='space-y-2'>
          <div className='text-xs text-gray-500'>No editable fields. You can still delete it.</div>
          <Button variant='destructive' onClick={() => removeNode(node.id)}>Delete component</Button>
        </div>
      )
  }
}
