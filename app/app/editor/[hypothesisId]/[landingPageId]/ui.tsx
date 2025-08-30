'use client'

import { useId, useMemo, useRef, useState } from 'react'
import { api } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { Textarea } from '@/components/atoms/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { toast } from '@/lib/use-toast'
import type {
  Benefits,
  FinalCallToAction,
  FrequentlyAskedQuestions,
  Hero,
  Meta,
  Partners,
  Theme,
  Features,
  Footer,
  CallToAction,
} from '@/templates/types'

type BlockType =
  | 'meta'
  | 'theme'
  | 'hero'
  | 'partners'
  | 'features'
  | 'benefits'
  | 'faq'
  | 'finalCta'
  | 'footer'

type Block = { id: string; type: BlockType; order: string; content: string }

type BlockContent =
  | { type: 'meta'; value: Meta }
  | { type: 'theme'; value: Theme }
  | { type: 'hero'; value: Hero }
  | { type: 'partners'; value: Partners }
  | { type: 'features'; value: Features }
  | { type: 'benefits'; value: Benefits }
  | { type: 'faq'; value: FrequentlyAskedQuestions }
  | { type: 'finalCta'; value: FinalCallToAction }
  | { type: 'footer'; value: Footer }

const TYPES: BlockType[] = [
  'meta',
  'theme',
  'hero',
  'partners',
  'features',
  'benefits',
  'faq',
  'finalCta',
  'footer',
]

function pad(n: number, width = 4) {
  return String(n).padStart(width, '0')
}

function defaultContentFor(type: BlockType): BlockContent['value'] {
  switch (type) {
    case 'meta':
      return { title: 'Landing Page', description: 'Welcome to our landing page' }
    case 'theme':
      return {
        mode: 'light',
        colors: { brand: '#3b82f6', bg: '#ffffff', fg: '#000000', muted: '#6b7280', accent: '#111827' },
        typography: { body: 'Inter, system-ui, sans-serif', heading: 'Inter, system-ui, sans-serif' },
        containerMax: '1280px',
      }
    case 'hero':
      return { headline: 'Welcome', subhead: 'Get started today', alignment: 'left', ctas: [] }
    case 'partners':
      return { logos: [] }
    case 'features':
      return {
        heading: 'Features',
        primary: { title: 'Primary feature' },
        secondary: [],
      }
    case 'benefits':
      return { heading: 'Benefits', items: [] }
    case 'faq':
      return { heading: 'Frequently Asked Questions', items: [] }
    case 'finalCta':
      return { heading: 'Ready to start?', ctas: [] }
    case 'footer':
      return { legal: { copyright: '© Your Company' }, columns: [] }
  }
}

function parseContent(block: Block): BlockContent {
  const base = defaultContentFor(block.type) as unknown
  try {
    const parsed = JSON.parse(block.content)
    return { type: block.type, value: { ...(base as object), ...(parsed as object) } } as BlockContent
  } catch {
    return { type: block.type, value: base as never } as BlockContent
  }
}

function stringifyContent(content: BlockContent): string {
  return JSON.stringify(content.value, null, 2)
}

export default function BlocksEditor({
  landingPageId,
  initialBlocks,
}: {
  landingPageId: string
  initialBlocks: Block[]
}) {
  const [blocks, setBlocks] = useState<Block[]>([...initialBlocks].sort((a, b) => a.order.localeCompare(b.order)))
  const [newType, setNewType] = useState<BlockType>('hero')
  const draggingId = useRef<string | null>(null)

  async function addBlock() {
    try {
      const order = pad(blocks.length + 1)
      const content = JSON.stringify(defaultContentFor(newType))
      const r = await api.v1['landing-pages']['by-id']({ landingPageId }).blocks.post({ content, order, type: newType })
      const id = r.data && typeof r.data === 'object' && 'id' in r.data ? (r.data as { id: string }).id : undefined
      if (id) {
        const next = [...blocks, { id, type: newType, order, content }]
        setBlocks(next)
      }
      toast({ title: 'Block added', description: `Added ${newType}.`, variant: 'success' })
    } catch {
      toast({ title: 'Failed to add block', description: 'Please try again.', variant: 'error' })
    }
  }

  async function removeBlock(id: string) {
    try {
      await api.v1['landing-pages']['by-id']({ landingPageId }).blocks({ blockId: id }).delete()
      const next = blocks.filter((x) => x.id !== id)
      const normalized = next.map((b, i) => ({ ...b, order: pad(i + 1) }))
      setBlocks(normalized)
      await persistOrder(normalized)
      toast({ title: 'Block removed', description: 'The block was removed.', variant: 'success' })
    } catch {
      toast({ title: 'Failed to remove block', description: 'Please try again.', variant: 'error' })
    }
  }

  async function updateBlockContent(id: string, content: string) {
    try {
      JSON.parse(content)
      await api.v1['landing-pages']['by-id']({ landingPageId }).blocks({ blockId: id }).patch({ content })
      setBlocks((b) => b.map((x) => (x.id === id ? { ...x, content } : x)))
      toast({ title: 'Block updated', description: 'Changes saved.', variant: 'success' })
    } catch {
      toast({ title: 'Failed to update block', description: 'Check field values.', variant: 'error' })
    }
  }

  async function persistOrder(next: Block[]) {
    try {
      await api.v1['landing-pages']['by-id']({ landingPageId }).blocks.reorder.post({
        blocks: next.map((b) => ({ id: b.id, order: b.order })),
      })
    } catch {
      toast({ title: 'Failed to save order', description: 'Please retry.', variant: 'error' })
    }
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    draggingId.current = id
    e.dataTransfer.effectAllowed = 'move'
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  async function onDrop(e: React.DragEvent<HTMLDivElement>, overId: string) {
    e.preventDefault()
    const sourceId = draggingId.current
    draggingId.current = null
    if (!sourceId || sourceId === overId) return

    const current = [...blocks]
    const from = current.findIndex((b) => b.id === sourceId)
    const to = current.findIndex((b) => b.id === overId)
    if (from === -1 || to === -1) return
    const [moved] = current.splice(from, 1)
    current.splice(to, 0, moved)
    const normalized = current.map((b, i) => ({ ...b, order: pad(i + 1) }))
    setBlocks(normalized)
    await persistOrder(normalized)
    toast({ title: 'Order updated', description: 'Block order saved.', variant: 'success' })
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Type</label>
          <Select value={newType} onValueChange={(v) => setNewType(v as BlockType)}>
            <SelectTrigger className='py-1.5'>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-end sm:col-span-2'>
          <Button onClick={addBlock} className='w-full'>
            Add Block
          </Button>
        </div>
      </div>

      <div className='space-y-3'>
        {blocks.map((b) => (
          <BlockCard
            key={b.id}
            block={b}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDelete={() => removeBlock(b.id)}
            onSave={(content) => updateBlockContent(b.id, content)}
          />
        ))}
      </div>
    </div>
  )
}

function BlockCard({
  block,
  onDragStart,
  onDragOver,
  onDrop,
  onDelete,
  onSave,
}: {
  block: Block
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: string) => void
  onDelete: () => void
  onSave: (content: string) => void
}) {
  const parsed = useMemo(() => parseContent(block), [block])
  const [content, setContent] = useState<BlockContent>(parsed)
  const [showJson, setShowJson] = useState(false)
  const jsonId = useId()

  return (
    <div
      role='group'
      aria-label={`${block.type} block`}
      className='rounded-lg border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-800 dark:bg-gray-950'
      draggable
      onDragStart={(e) => onDragStart(e, block.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, block.id)}
    >
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <span className='cursor-grab select-none rounded border px-2 py-1 text-xs text-gray-500 dark:border-gray-700'>
            Drag
          </span>
          <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
            {block.type}
          </span>
          <span className='text-xs text-gray-500'>#{block.order}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='secondary' onClick={() => setShowJson((s) => !s)}>
            {showJson ? 'Hide JSON' : 'Advanced JSON'}
          </Button>
          <Button variant='secondary' onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div className='mt-3'>
        <Accordion type='single' collapsible defaultValue='open'>
          <AccordionItem value='open'>
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <BlockForm content={content} onChange={setContent} />
              <div className='mt-3 flex justify-end'>
                <Button onClick={() => onSave(stringifyContent(content))}>Save</Button>
              </div>
              {showJson && (
                <div className='mt-4'>
                  <label
                    className='mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300'
                    htmlFor={jsonId}
                  >
                    Raw JSON
                  </label>
                  <Textarea
                    id={jsonId}
                    rows={10}
                    defaultValue={JSON.stringify(content.value, null, 2)}
                    onBlur={(e) => {
                      try {
                        const val = JSON.parse(e.target.value)
                        setContent({ type: content.type, value: val } as BlockContent)
                      } catch {
                        // noop; leave invalid json in textarea, user can fix
                      }
                    }}
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className='grid gap-1 text-sm'>
      <span className='text-gray-700 dark:text-gray-300'>{label}</span>
      {children}
    </label>
  )
}

function CTAListEditor({ value, onChange }: { value: CallToAction[] | undefined; onChange: (v: CallToAction[]) => void }) {
  const list = value ?? []
  return (
    <div className='space-y-2'>
      {list.map((cta, idx) => (
        <div key={idx} className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
          <Input
            placeholder='Label'
            defaultValue={cta.label}
            onChange={(e) => {
              const next = [...list]
              next[idx] = { ...cta, label: e.target.value }
              onChange(next)
            }}
          />
          <Input
            placeholder='Href'
            defaultValue={cta.href}
            onChange={(e) => {
              const next = [...list]
              next[idx] = { ...cta, href: e.target.value }
              onChange(next)
            }}
          />
          <Select
            defaultValue={cta.style || 'primary'}
            onValueChange={(v) => {
              const next = [...list]
              next[idx] = { ...cta, style: v as CallToAction['style'] }
              onChange(next)
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['primary', 'secondary', 'link', 'store-apple', 'store-google'].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button
        variant='secondary'
        onClick={() => onChange([...list, { label: 'Get started', href: '#', style: 'primary' }])}
      >
        Add CTA
      </Button>
    </div>
  )
}

function BlockForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  const id1 = useId()
  const id2 = useId()
  switch (content.type) {
    case 'meta': {
      const v = content.value as Meta
      return (
        <div className='grid gap-3 sm:grid-cols-2'>
          <Field label='Title'>
            <Input
              id={id1}
              defaultValue={v.title}
              onChange={(e) => onChange({ type: 'meta', value: { ...v, title: e.target.value } })}
            />
          </Field>
          <Field label='Description'>
            <Textarea
              id={id2}
              rows={3}
              defaultValue={v.description || ''}
              onChange={(e) => onChange({ type: 'meta', value: { ...v, description: e.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'theme': {
      const v = content.value as Theme
      return (
        <div className='grid gap-3 sm:grid-cols-3'>
          <Field label='Mode'>
            <Select
              defaultValue={v.mode || 'light'}
              onValueChange={(m) => onChange({ type: 'theme', value: { ...v, mode: m as Theme['mode'] } })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['light', 'dark', 'system'].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label='Brand Color'>
            <Input
              defaultValue={v.colors?.brand || ''}
              onChange={(e) => onChange({ type: 'theme', value: { ...v, colors: { ...v.colors, brand: e.target.value } } })}
            />
          </Field>
          <Field label='Container Max'>
            <Input
              defaultValue={v.containerMax || ''}
              onChange={(e) => onChange({ type: 'theme', value: { ...v, containerMax: e.target.value } })}
            />
          </Field>
        </div>
      )
    }
    case 'hero': {
      const v = content.value as Hero
      return (
        <div className='space-y-3'>
          <div className='grid gap-3 sm:grid-cols-2'>
            <Field label='Headline'>
              <Input
                defaultValue={v.headline}
                onChange={(e) => onChange({ type: 'hero', value: { ...v, headline: e.target.value } })}
              />
            </Field>
            <Field label='Subhead'>
              <Input
                defaultValue={v.subhead || ''}
                onChange={(e) => onChange({ type: 'hero', value: { ...v, subhead: e.target.value } })}
              />
            </Field>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            <Field label='Alignment'>
              <Select
                defaultValue={v.alignment || 'left'}
                onValueChange={(al) => onChange({ type: 'hero', value: { ...v, alignment: al as Hero['alignment'] } })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['left', 'center'].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div>
            <div className='mb-1 text-sm font-medium'>CTAs</div>
            <CTAListEditor
              value={v.ctas}
              onChange={(ctas) => onChange({ type: 'hero', value: { ...v, ctas } })}
            />
          </div>
        </div>
      )
    }
    case 'partners': {
      const v = content.value as Partners
      const logos = v.logos || []
      return (
        <div className='space-y-2'>
          {logos.map((logo, idx) => (
            <div key={idx} className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
              <Input
                placeholder='Name'
                defaultValue={logo.name}
                onChange={(e) => {
                  const next = [...logos]
                  next[idx] = { ...logo, name: e.target.value }
                  onChange({ type: 'partners', value: { ...v, logos: next } })
                }}
              />
              <Input
                placeholder='Logo URL'
                defaultValue={logo.logoSrc}
                onChange={(e) => {
                  const next = [...logos]
                  next[idx] = { ...logo, logoSrc: e.target.value }
                  onChange({ type: 'partners', value: { ...v, logos: next } })
                }}
              />
              <Input
                placeholder='Link (optional)'
                defaultValue={logo.href || ''}
                onChange={(e) => {
                  const next = [...logos]
                  next[idx] = { ...logo, href: e.target.value }
                  onChange({ type: 'partners', value: { ...v, logos: next } })
                }}
              />
            </div>
          ))}
          <Button
            variant='secondary'
            onClick={() => onChange({ type: 'partners', value: { ...v, logos: [...logos, { name: 'Logo', logoSrc: '/logo.svg' }] } })}
          >
            Add Logo
          </Button>
        </div>
      )
    }
    case 'features': {
      const v = content.value as Features
      const secondary = v.secondary || []
      return (
        <div className='space-y-3'>
          <Field label='Heading'>
            <Input
              defaultValue={v.heading || ''}
              onChange={(e) => onChange({ type: 'features', value: { ...v, heading: e.target.value } })}
            />
          </Field>
          <div className='grid gap-2 sm:grid-cols-2'>
            <Field label='Primary title'>
              <Input
                defaultValue={v.primary.title}
                onChange={(e) => onChange({ type: 'features', value: { ...v, primary: { ...v.primary, title: e.target.value } } })}
              />
            </Field>
            <Field label='Primary summary'>
              <Input
                defaultValue={v.primary.summary || ''}
                onChange={(e) => onChange({ type: 'features', value: { ...v, primary: { ...v.primary, summary: e.target.value } } })}
              />
            </Field>
          </div>
          <div>
            <div className='mb-1 text-sm font-medium'>Secondary features</div>
            {secondary.map((f, idx) => (
              <div key={idx} className='mb-2 grid gap-2 sm:grid-cols-2'>
                <Input
                  placeholder='Title'
                  defaultValue={f.title}
                  onChange={(e) => {
                    const next = [...secondary]
                    next[idx] = { ...f, title: e.target.value }
                    onChange({ type: 'features', value: { ...v, secondary: next } })
                  }}
                />
                <Input
                  placeholder='Summary'
                  defaultValue={f.summary || ''}
                  onChange={(e) => {
                    const next = [...secondary]
                    next[idx] = { ...f, summary: e.target.value }
                    onChange({ type: 'features', value: { ...v, secondary: next } })
                  }}
                />
              </div>
            ))}
            <Button
              variant='secondary'
              onClick={() => onChange({ type: 'features', value: { ...v, secondary: [...secondary, { title: 'Feature' }] } })}
            >
              Add secondary
            </Button>
          </div>
        </div>
      )
    }
    case 'benefits': {
      const v = content.value as Benefits
      const items = v.items || []
      return (
        <div>
          <Field label='Heading'>
            <Input
              defaultValue={v.heading || ''}
              onChange={(e) => onChange({ type: 'benefits', value: { ...v, heading: e.target.value } })}
            />
          </Field>
          <div className='mt-2 space-y-2'>
            {items.map((it, idx) => (
              <div key={idx} className='grid gap-2 sm:grid-cols-2'>
                <Input
                  placeholder='Title'
                  defaultValue={it.title}
                  onChange={(e) => {
                    const next = [...items]
                    next[idx] = { ...it, title: e.target.value }
                    onChange({ type: 'benefits', value: { ...v, items: next } })
                  }}
                />
                <Input
                  placeholder='Description'
                  defaultValue={it.description || ''}
                  onChange={(e) => {
                    const next = [...items]
                    next[idx] = { ...it, description: e.target.value }
                    onChange({ type: 'benefits', value: { ...v, items: next } })
                  }}
                />
              </div>
            ))}
            <Button
              variant='secondary'
              onClick={() => onChange({ type: 'benefits', value: { ...v, items: [...items, { title: 'Benefit' }] } })}
            >
              Add benefit
            </Button>
          </div>
        </div>
      )
    }
    case 'faq': {
      const v = content.value as FrequentlyAskedQuestions
      const items = v.items || []
      return (
        <div>
          <Field label='Heading'>
            <Input
              defaultValue={v.heading || ''}
              onChange={(e) => onChange({ type: 'faq', value: { ...v, heading: e.target.value } })}
            />
          </Field>
          <div className='mt-2 space-y-2'>
            {items.map((it, idx) => (
              <div key={idx} className='grid gap-2 sm:grid-cols-2'>
                <Input
                  placeholder='Question'
                  defaultValue={it.question}
                  onChange={(e) => {
                    const next = [...items]
                    next[idx] = { ...it, question: e.target.value }
                    onChange({ type: 'faq', value: { ...v, items: next } })
                  }}
                />
                <Input
                  placeholder='Answer'
                  defaultValue={it.answer}
                  onChange={(e) => {
                    const next = [...items]
                    next[idx] = { ...it, answer: e.target.value }
                    onChange({ type: 'faq', value: { ...v, items: next } })
                  }}
                />
              </div>
            ))}
            <Button
              variant='secondary'
              onClick={() => onChange({ type: 'faq', value: { ...v, items: [...items, { question: 'Question?', answer: 'Answer.' }] } })}
            >
              Add question
            </Button>
          </div>
        </div>
      )
    }
    case 'finalCta': {
      const v = content.value as FinalCallToAction
      return (
        <div className='space-y-3'>
          <div className='grid gap-3 sm:grid-cols-2'>
            <Field label='Heading'>
              <Input
                defaultValue={v.heading}
                onChange={(e) => onChange({ type: 'finalCta', value: { ...v, heading: e.target.value } })}
              />
            </Field>
            <Field label='Subhead'>
              <Input
                defaultValue={v.subhead || ''}
                onChange={(e) => onChange({ type: 'finalCta', value: { ...v, subhead: e.target.value } })}
              />
            </Field>
          </div>
          <div>
            <div className='mb-1 text-sm font-medium'>CTAs</div>
            <CTAListEditor
              value={v.ctas}
              onChange={(ctas) => onChange({ type: 'finalCta', value: { ...v, ctas } })}
            />
          </div>
        </div>
      )
    }
    case 'footer': {
      const v = content.value as Footer
      const columns = v.columns || []
      return (
        <div className='space-y-3'>
          <Field label='Copyright'>
            <Input
              defaultValue={v.legal?.copyright || ''}
              onChange={(e) => onChange({ type: 'footer', value: { ...v, legal: { ...v.legal, copyright: e.target.value } } })}
            />
          </Field>
          <div>
            <div className='mb-1 text-sm font-medium'>Columns</div>
            {columns.map((col, idx) => (
              <div key={idx} className='rounded border p-2 dark:border-gray-800'>
                <Field label='Heading'>
                  <Input
                    defaultValue={col.heading || ''}
                    onChange={(e) => {
                      const next = [...columns]
                      next[idx] = { ...col, heading: e.target.value }
                      onChange({ type: 'footer', value: { ...v, columns: next } })
                    }}
                  />
                </Field>
                <div className='mt-2 space-y-2'>
                  {(col.links || []).map((link, j) => (
                    <div key={j} className='grid gap-2 sm:grid-cols-2'>
                      <Input
                        placeholder='Label'
                        defaultValue={link.label}
                        onChange={(e) => {
                          const nextCols = [...columns]
                          const nextLinks = [...(col.links || [])]
                          nextLinks[j] = { ...link, label: e.target.value }
                          nextCols[idx] = { ...col, links: nextLinks }
                          onChange({ type: 'footer', value: { ...v, columns: nextCols } })
                        }}
                      />
                      <Input
                        placeholder='Href'
                        defaultValue={link.href}
                        onChange={(e) => {
                          const nextCols = [...columns]
                          const nextLinks = [...(col.links || [])]
                          nextLinks[j] = { ...link, href: e.target.value }
                          nextCols[idx] = { ...col, links: nextLinks }
                          onChange({ type: 'footer', value: { ...v, columns: nextCols } })
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    variant='secondary'
                    onClick={() => {
                      const nextCols = [...columns]
                      const nextLinks = [...(col.links || []), { label: 'Link', href: '#' }]
                      nextCols[idx] = { ...col, links: nextLinks }
                      onChange({ type: 'footer', value: { ...v, columns: nextCols } })
                    }}
                  >
                    Add link
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='secondary'
              onClick={() => onChange({ type: 'footer', value: { ...v, columns: [...columns, { heading: 'Resources', links: [] }] } })}
            >
              Add column
            </Button>
          </div>
        </div>
      )
    }
  }
}
