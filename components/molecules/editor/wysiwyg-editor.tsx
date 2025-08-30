'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'

type HeadingLevel = 'p' | 'h1' | 'h2' | 'h3'

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function WysiwygEditor({ storageKey = 'wysiwyg:draft' }: { storageKey?: string }) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [html, setHtml] = useState<string>('')
  const [heading, setHeading] = useState<HeadingLevel>('p')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setHtml(saved)
    } catch {}
  }, [storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, html)
    } catch {}
  }, [html, storageKey])

  function exec(cmd: string, value?: string) {
    // Using execCommand for broad browser support
    document.execCommand(cmd, false, value)
    editorRef.current?.focus()
  }

  function onHeadingChange(level: HeadingLevel) {
    setHeading(level)
    if (level === 'p') exec('formatBlock', 'P')
    if (level === 'h1') exec('formatBlock', 'H1')
    if (level === 'h2') exec('formatBlock', 'H2')
    if (level === 'h3') exec('formatBlock', 'H3')
  }

  function insertLink() {
    const url = prompt('Enter URL')?.trim()
    if (!url) return
    exec('createLink', url)
  }

  function insertImage() {
    const url = prompt('Enter image URL')?.trim()
    if (!url) return
    exec('insertImage', url)
  }

  function copyHtml() {
    const el = editorRef.current
    if (!el) return
    const content = el.innerHTML
    navigator.clipboard.writeText(content)
  }

  const toolbar = useMemo(
    () => (
      <div className='flex flex-wrap items-center gap-2 rounded-md border border-gray-200 bg-white p-2 shadow-xs dark:border-gray-800 dark:bg-gray-950'>
        <Select value={heading} onValueChange={(v) => onHeadingChange(v as HeadingLevel)}>
          <SelectTrigger className='h-8 w-32 py-0.5'>
            <SelectValue placeholder='Paragraph' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='p'>Paragraph</SelectItem>
            <SelectItem value='h1'>Heading 1</SelectItem>
            <SelectItem value='h2'>Heading 2</SelectItem>
            <SelectItem value='h3'>Heading 3</SelectItem>
          </SelectContent>
        </Select>
        <div className='mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800' />
        <Button variant='secondary' className='h-8 px-2' onClick={() => exec('bold')}>
          <strong>B</strong>
        </Button>
        <Button variant='secondary' className='h-8 px-2 italic' onClick={() => exec('italic')}>
          I
        </Button>
        <Button variant='secondary' className='h-8 px-2 underline' onClick={() => exec('underline')}>
          U
        </Button>
        <div className='mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800' />
        <Button variant='secondary' className='h-8 px-2' onClick={() => exec('insertUnorderedList')}>
          • List
        </Button>
        <Button variant='secondary' className='h-8 px-2' onClick={() => exec('insertOrderedList')}>
          1. List
        </Button>
        <div className='mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800' />
        <Button variant='secondary' className='h-8 px-2 gap-1' onClick={insertLink}>
          <LinkIcon className='size-3.5' aria-hidden /> Link
        </Button>
        <Button variant='secondary' className='h-8 px-2 gap-1' onClick={insertImage}>
          <ImageIcon className='size-3.5' aria-hidden /> Image
        </Button>
        <div className='mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800' />
        <Button variant='secondary' className='h-8 px-2' onClick={() => exec('removeFormat')}>
          Clear
        </Button>
        <Button
          variant='secondary'
          className='h-8 px-2'
          onClick={() => download('document.html', editorRef.current?.innerHTML || '')}
        >
          Export HTML
        </Button>
        <Button variant='secondary' className='h-8 px-2' onClick={copyHtml}>
          Copy HTML
        </Button>
      </div>
    ),
    [heading],
  )

  return (
    <div className='space-y-3'>
      {toolbar}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setHtml((e.target as HTMLDivElement).innerHTML)}
        className='min-h-[400px] w-full rounded-md border border-gray-200 bg-white p-4 text-gray-900 outline-none ring-0 focus:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50'
        dangerouslySetInnerHTML={{ __html: html || '<p>Start writing…</p>' }}
        aria-label='Rich text editor'
      />
      <div className='text-xs text-gray-500 dark:text-gray-500'>
        Draft autosaved locally.
      </div>
    </div>
  )
}

export default WysiwygEditor
