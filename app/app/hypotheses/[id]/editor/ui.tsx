'use client'
import { useId, useState } from 'react'
import { api } from '@/app/api'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/atoms/table'
import { Textarea } from '@/components/atoms/textarea'
import { toast } from '@/lib/use-toast'

type BlockType = 'hero' | 'features' | 'cta' | 'faq' | 'pricing' | 'footer'
type Block = { id: string; type: BlockType; order: string; content: string }

export default function BlocksEditor({
  hypothesisId,
  initialBlocks,
}: {
  hypothesisId: string
  initialBlocks: Block[]
}) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [type, setType] = useState<BlockType>('hero')
  const [order, setOrder] = useState<string>('1000')
  const [content, setContent] = useState<string>(
    '{\n  "headline": "Welcome",\n  "subhead": "Get started today"\n}',
  )
  const typeId = useId()
  const orderId = useId()
  const contentId = useId()

  async function addBlock() {
    try {
      // basic JSON check
      JSON.parse(content)
      const r = await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .blocks.post({ content, order, type })
      const id =
        r.data && typeof r.data === 'object' && 'id' in r.data
          ? (r.data as { id: string }).id
          : undefined
      if (id) setBlocks((b) => [...b, { content, id, order, type }])
      toast({
        description: `Added a ${type} block to your page.`,
        title: 'Block added',
        variant: 'success',
      })
    } catch (_e) {
      toast({
        description: 'Provide valid JSON for the selected block type.',
        title: 'Invalid content or failed to add',
        variant: 'error',
      })
    }
  }

  async function removeBlock(id: string) {
    try {
      await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .blocks({ blockId: id })
        .delete()
      setBlocks((b) => b.filter((x) => x.id !== id))
      toast({
        description: 'The block was removed from your landing page.',
        title: 'Block removed',
        variant: 'success',
      })
    } catch {
      toast({
        description: 'Please try again.',
        title: 'Failed to remove block',
        variant: 'error',
      })
    }
  }

  async function updateBlock(
    id: string,
    next: Partial<Pick<Block, 'order' | 'content'>>,
  ) {
    try {
      if (next.content) JSON.parse(next.content)
      await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .blocks({ blockId: id })
        .patch({ ...next })
      setBlocks((b) => b.map((x) => (x.id === id ? { ...x, ...next } : x)))
      toast({
        description: 'Changes saved.',
        title: 'Block updated',
        variant: 'success',
      })
    } catch {
      toast({
        description: 'Check the content JSON and try again.',
        title: 'Failed to update block',
        variant: 'error',
      })
    }
  }

  async function reorder(next: Block[]) {
    try {
      await api.v1['landing-pages']
        .hypothesis({ hypothesisId })
        .blocks.reorder.post({
          blocks: next.map((b) => ({ id: b.id, order: b.order })),
        })
      toast({
        description: 'Block order saved.',
        title: 'Order updated',
        variant: 'success',
      })
    } catch {
      toast({
        description: 'Please try again.',
        title: 'Failed to update order',
        variant: 'error',
      })
    }
  }

  function move(id: string, dir: 'up' | 'down') {
    setBlocks((prev) => {
      const sorted = [...prev].sort((a, b) => a.order.localeCompare(b.order))
      const idx = sorted.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const swapWith = dir === 'up' ? idx - 1 : idx + 1
      if (swapWith < 0 || swapWith >= sorted.length) return prev
      const a = sorted[idx]
      const b = sorted[swapWith]
      const next = [...sorted]
      // swap order strings
      next[idx] = { ...a, order: b.order }
      next[swapWith] = { ...b, order: a.order }
      // persist
      reorder(next)
      return next
    })
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <div>
          <label
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={typeId}
          >
            Type
          </label>
          <Select value={type} onValueChange={(v) => setType(v as BlockType)}>
            <SelectTrigger id={typeId} className='py-1.5'>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              {['hero', 'features', 'cta', 'faq', 'pricing', 'footer'].map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={orderId}
          >
            Order
          </label>
          <Input
            id={orderId}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='py-1.5'
          />
        </div>
        <div className='flex items-end'>
          <Button onClick={addBlock} className='w-full'>
            Add Block
          </Button>
        </div>
        <div className='sm:col-span-3'>
          <label
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            htmlFor={contentId}
          >
            Content (JSON)
          </label>
          <Textarea
            id={contentId}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />
          <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
            Provide valid JSON matching the block type.
          </p>
        </div>
      </div>

      <TableRoot className='border-t border-gray-200 dark:border-gray-800'>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Order</TableHeaderCell>
              <TableHeaderCell>Content</TableHeaderCell>
              <TableHeaderCell className='text-right'>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blocks]
              .sort((a, b) => a.order.localeCompare(b.order))
              .map((b, i, arr) => (
                <TableRow key={b.id}>
                  <TableCell className='font-medium'>{b.type}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={b.order}
                      className='py-1.5'
                      onBlur={(e) =>
                        updateBlock(b.id, { order: e.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell className='align-top'>
                    <Textarea
                      defaultValue={b.content}
                      rows={4}
                      onBlur={(e) =>
                        updateBlock(b.id, { content: e.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='secondary'
                        disabled={i === 0}
                        onClick={() => move(b.id, 'up')}
                      >
                        Up
                      </Button>
                      <Button
                        variant='secondary'
                        disabled={i === arr.length - 1}
                        onClick={() => move(b.id, 'down')}
                      >
                        Down
                      </Button>
                      <Button
                        variant='secondary'
                        onClick={() => removeBlock(b.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  )
}
