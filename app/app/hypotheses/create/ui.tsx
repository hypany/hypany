'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/api'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { toast } from 'sonner'

export default function CreateHypothesisForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [checking, setChecking] = useState(false)
  const [creating, setCreating] = useState(false)
  const [slugStatus, setSlugStatus] = useState<
    | null
    | {
        available: boolean
        normalizedSlug: string
        error?: string
      }
  >(null)

  async function checkSlug() {
    const s = slug.trim()
    if (!s) {
      setSlugStatus(null)
      toast('Enter a subdomain to check')
      return
    }
    setChecking(true)
    try {
      const res = await api.v1.landing_pages['check-slug'].post({ body: { slug: s } })
      if (res.data) setSlugStatus(res.data)
      if (res.data?.available) toast('Subdomain is available')
      else toast(res.data?.error || 'Subdomain unavailable')
    } finally {
      setChecking(false)
    }
  }

  async function submit() {
    const n = name.trim()
    const s = slug.trim()
    if (!n) {
      toast('Please enter a name')
      return
    }
    if (s) {
      // Ensure slug ok before creating
      if (!slugStatus || slugStatus.normalizedSlug !== s) {
        await checkSlug()
      }
      if (slugStatus && !slugStatus.available) return
    }
    setCreating(true)
    try {
      const res = await api.v1.hypotheses.post({
        body: {
          name: n,
          description: description.trim() || undefined,
          slug: s || undefined,
        },
      })
      const id = res.data?.hypothesis?.id
      if (id) {
        toast('Hypothesis created')
        router.push(`/app/hypotheses/${id}/editor`)
      } else {
        toast('Failed to create hypothesis')
      }
    } catch {
      toast('Failed to create hypothesis')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className='grid max-w-2xl grid-cols-1 gap-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Awesome Idea'
          className='py-1.5'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Description (optional)</label>
        <Textarea
          value={description}
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Brief pitch or notes…'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Subdomain (optional)</label>
        <div className='mt-1 flex gap-2'>
          <Input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
              setSlugStatus(null)
            }}
            placeholder='idea-name'
            className='py-1.5'
          />
          <Button variant='secondary' onClick={checkSlug} disabled={checking}>
            {checking ? 'Checking…' : 'Check'}
          </Button>
        </div>
        {slugStatus && (
          <p className='mt-1 text-xs'>
            {slugStatus.available ? (
              <span className='text-emerald-600'>Available as {slugStatus.normalizedSlug}.hypany.app</span>
            ) : (
              <span className='text-rose-600'>{slugStatus.error || 'Not available'}</span>
            )}
          </p>
        )}
      </div>
      <div>
        <Button onClick={submit} disabled={creating}>
          {creating ? 'Creating…' : 'Create Hypothesis'}
        </Button>
      </div>
    </div>
  )
}

