'use client'

import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'
import { getClientApi } from '@/app/api/client'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { toast } from '@/lib/use-toast'

export function HypothesisEditButton({
  hypothesisId,
  initialName,
  initialDescription,
}: {
  hypothesisId: string
  initialName: string
  initialDescription: string | null
}) {
  const api = getClientApi()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription ?? '')
  const nameId = useId()
  const descId = useId()

  async function save() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      toast({
        description: 'Please enter a name.',
        title: 'Name required',
        variant: 'error',
      })
      return
    }
    try {
      setSaving(true)
      const r = await api.v1.hypotheses({ id: hypothesisId }).patch({
        description: description.trim() || undefined,
        name: trimmedName,
      })
      const ok =
        (r as any)?.status === 200 || Boolean((r as any)?.data?.hypothesis?.id)
      if (ok) {
        toast({ description: 'Hypothesis updated.', title: 'Saved' })
        setOpen(false)
        router.refresh()
      } else {
        const errObj = (r as any)?.error as
          | { error?: string; reason?: string }
          | undefined
        const message = errObj?.reason
          ? `${errObj.error || 'Error'}: ${errObj.reason}`
          : errObj?.error || 'Failed to update hypothesis'
        toast({ description: message, title: 'Error', variant: 'error' })
      }
    } catch (e) {
      toast({
        description:
          e instanceof Error ? e.message : 'Failed to update hypothesis',
        title: 'Error',
        variant: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Edit hypothesis</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              htmlFor={nameId}
            >
              Name
            </label>
            <Input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 py-1.5'
              disabled={saving}
            />
          </div>
          <div>
            <label
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              htmlFor={descId}
            >
              Description
            </label>
            <Textarea
              id={descId}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className='mt-1'
              disabled={saving}
            />
          </div>
        </div>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant='secondary' disabled={saving}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default HypothesisEditButton
