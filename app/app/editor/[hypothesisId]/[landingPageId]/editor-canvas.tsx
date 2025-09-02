"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditorStore } from '@/lib/store/editor'
import type { Node } from '@/lib/page-document'
import { ICONS, isIconName } from '@/lib/icons'

function resolveResponsive<T>(v?: { base?: T } | undefined): T | undefined {
  return v?.base
}

function styleToInline(node: Node): React.CSSProperties | undefined {
  const s = node.style
  if (!s) return undefined
  const css: React.CSSProperties = {}
  // Layout
  const display = resolveResponsive(s.display)
  if (display) css.display = display
  const justify = resolveResponsive(s.justify)
  if (justify) css.justifyContent =
    justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify === 'between' ? 'space-between' : justify === 'around' ? 'space-around' : 'center'
  const items = resolveResponsive(s.items)
  if (items) css.alignItems = items === 'start' ? 'flex-start' : items === 'end' ? 'flex-end' : items === 'stretch' ? 'stretch' : 'center'
  const gap = resolveResponsive(s.gap)
  if (gap) css.gap = gap
  const width = resolveResponsive(s.width)
  if (width) css.width = width
  const height = resolveResponsive(s.height)
  if (height) css.height = height
  const self = resolveResponsive(s.self)
  if (self) {
    css.alignSelf = self === 'start' ? 'flex-start' : self === 'end' ? 'flex-end' : self
    // Fallback centering when not in flex/grid context
    if (self === 'center') {
      css.marginLeft = css.marginLeft ?? 'auto'
      css.marginRight = css.marginRight ?? 'auto'
    }
  }

  // Typography
  const font = resolveResponsive(s.font)
  if (font) css.fontFamily = font
  const size = resolveResponsive(s.size)
  if (size) css.fontSize = size
  const weight = resolveResponsive(s.weight)
  if (weight) css.fontWeight = weight
  const color = resolveResponsive(s.color)
  if (color) css.color = color
  const align = resolveResponsive(s.align)
  if (align) css.textAlign = align

  // Spacing
  const p = resolveResponsive(s.p)
  if (p) css.padding = p
  const px = resolveResponsive(s.px)
  if (px) {
    css.paddingLeft = px
    css.paddingRight = px
  }
  const py = resolveResponsive(s.py)
  if (py) {
    css.paddingTop = py
    css.paddingBottom = py
  }
  const pt = resolveResponsive(s.pt)
  if (pt) css.paddingTop = pt
  const pr = resolveResponsive(s.pr)
  if (pr) css.paddingRight = pr
  const pb = resolveResponsive(s.pb)
  if (pb) css.paddingBottom = pb
  const pl = resolveResponsive(s.pl)
  if (pl) css.paddingLeft = pl

  const m = resolveResponsive(s.m)
  if (m) css.margin = m
  const mx = resolveResponsive(s.mx)
  if (mx) {
    css.marginLeft = mx
    css.marginRight = mx
  }
  const my = resolveResponsive(s.my)
  if (my) {
    css.marginTop = my
    css.marginBottom = my
  }
  const mt = resolveResponsive(s.mt)
  if (mt) css.marginTop = mt
  const mr = resolveResponsive(s.mr)
  if (mr) css.marginRight = mr
  const mb = resolveResponsive(s.mb)
  if (mb) css.marginBottom = mb
  const ml = resolveResponsive(s.ml)
  if (ml) css.marginLeft = ml

  // Border & effects
  const radius = resolveResponsive(s.radius)
  if (radius) css.borderRadius = radius
  const borderColor = resolveResponsive(s.color)
  if (borderColor) css.borderColor = borderColor
  const borderWidth = resolveResponsive(s.width)
  if (borderWidth) css.borderWidth = borderWidth
  const bg = resolveResponsive(s.bg)
  if (bg) css.background = bg
  const shadow = resolveResponsive(s.shadow)
  if (shadow) css.boxShadow = shadow

  return css
}

function NodeView({ node }: { node: Node }) {
  const selectedId = useEditorStore((s) => s.selectedId)
  const select = useEditorStore((s) => s.select)
  const editingId = useEditorStore((s) => s.editingId)
  const setEditingId = useEditorStore((s) => s.setEditingId)
  const dragStart = useEditorStore((s) => s.dragStart)
  const dragHover = useEditorStore((s) => s.dragHover)
  const dragClear = useEditorStore((s) => s.dragClear)
  const moveNode = useEditorStore((s) => s.moveNode)
  const draggingId = useEditorStore((s) => s.draggingId)
  const dropTargetId = useEditorStore((s) => s.dropTargetId)
  const dropPosition = useEditorStore((s) => s.dropPosition)
  const insertChild = useEditorStore((s) => s.insertChild)
  const paletteNode = useEditorStore((s) => s.paletteNode)
  const clearPaletteDrag = useEditorStore((s) => s.clearPaletteDrag)
  const isSelected = selectedId === node.id

  const baseClass = 'relative group/node outline outline-0 outline-transparent hover:outline-1 hover:outline-sky-300 outline-offset-0 rounded-md'
  const selectedClass = isSelected ? 'ring-2 ring-emerald-500' : ''
  const inlineStyle = styleToInline(node)

  const label = (() => {
    const t = node.type
    return t.charAt(0).toUpperCase() + t.slice(1)
  })()

  const isLocked = Boolean(node.locked)
  const isHidden = Boolean(node.hidden)
  const commonProps = {
    className: `${baseClass} ${selectedClass}`,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      select(node.id)
    },
    draggable: !isLocked,
    onDragStart: (e: React.DragEvent) => {
      dragStart(node.id)
      e.dataTransfer.effectAllowed = 'move'
    },
    onDragEnd: () => {
      dragClear()
    },
    onDragOver: (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      const rect = e.currentTarget.getBoundingClientRect()
      const y = e.clientY - rect.top
      const isContainer = node.type === 'section' || node.type === 'container' || node.type === 'grid'
      let pos: 'before' | 'after' | 'inside' = 'after'
      const canInside = isContainer && rect.height >= 48
      if (canInside && y > rect.height * 0.3 && y < rect.height * 0.7) pos = 'inside'
      else pos = y < rect.height / 2 ? 'before' : 'after'
      dragHover(node.id, pos)
      e.dataTransfer.dropEffect = 'move'
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (dropPosition) {
        if (draggingId) {
          moveNode(draggingId, node.id, dropPosition)
        } else if (paletteNode) {
          if (dropPosition === 'inside') {
            insertChild(node.id, paletteNode)
            select(paletteNode.id)
          } else {
            // find parent and index of target
            const findParentAndIndex = (nodes: Node[], id: string, parent: Node | null = null): { parent: Node | null; index: number } | null => {
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
            const doc = useEditorStore.getState().doc
            const place = findParentAndIndex(doc.nodes, node.id, null)
            const parentId = place?.parent ? place.parent.id : null
            const index = place ? place.index : 0
            const insertIndex = dropPosition === 'before' ? index : index + 1
            insertChild(parentId, paletteNode, insertIndex)
            select(paletteNode.id)
          }
        }
      }
      dragClear()
      clearPaletteDrag()
    },
  }

  const indicatorBefore = dropTargetId === node.id && dropPosition === 'before'
  const indicatorAfter = dropTargetId === node.id && dropPosition === 'after'
  const indicatorInside = dropTargetId === node.id && dropPosition === 'inside'
  const indicatorTop = indicatorBefore ? (
    <div className='pointer-events-none absolute inset-x-0 -top-px h-0.5 bg-emerald-500'></div>
  ) : null
  const indicatorBottom = indicatorAfter ? (
    <div className='pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-emerald-500'></div>
  ) : null

  if (isHidden) {
    return (
      <div
        {...commonProps}
        className={`${commonProps.className} pointer-events-none opacity-40`}
        aria-hidden
      />
    )
  }

  switch (node.type) {
    case 'section':
      return (
        <section {...commonProps} style={inlineStyle} className={`${commonProps.className} min-h-10`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          {indicatorInside ? (
            <div className='pointer-events-none absolute inset-0 rounded-md ring-2 ring-emerald-500/60 bg-emerald-500/5' />
          ) : null}
          <div className='space-y-4 md:space-y-6'>
            {(node.children || []).map((c) => (
              <NodeView key={c.id} node={c} />
            ))}
          </div>
          {indicatorBottom}
        </section>
      )
    case 'container':
      return (
        <div {...commonProps} style={inlineStyle} className={`${commonProps.className} min-h-10`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          {indicatorInside ? (
            <div className='pointer-events-none absolute inset-0 rounded-md ring-2 ring-emerald-500/60 bg-emerald-500/5' />
          ) : null}
          <div className='mx-auto max-w-5xl px-4 space-y-4 md:space-y-6'>
            {(node.children || []).map((c) => (
              <NodeView key={c.id} node={c} />
            ))}
          </div>
          {indicatorBottom}
        </div>
      )
    case 'grid': {
      const cols = resolveResponsive(node.style?.cols)
      const gap = resolveResponsive(node.style?.gap)
      const gridStyle: React.CSSProperties = {
        ...inlineStyle,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols && cols > 0 ? cols : 2}, minmax(0, 1fr))`,
        gap: gap || '1rem',
      }
      return (
        <div {...commonProps} style={gridStyle} className={`${commonProps.className} min-h-10`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          {indicatorInside ? (
            <div className='pointer-events-none absolute inset-0 rounded-md ring-2 ring-emerald-500/60 bg-emerald-500/5' />
          ) : null}
          {(node.children || []).map((c) => (
            <NodeView key={c.id} node={c} />
          ))}
          {indicatorBottom}
        </div>
      )
    }
    case 'heading': {
      const contentRef = useRef<HTMLHeadingElement | null>(null)
      useEffect(() => {
        if (editingId === node.id) return
        if (contentRef.current && contentRef.current.textContent !== node.text) {
          contentRef.current.textContent = node.text || ''
        }
      }, [editingId, node])
      return (
        <div {...commonProps} style={inlineStyle} className={`${commonProps.className}`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          <h1
            className='text-3xl font-bold'
            contentEditable={!isLocked}
            suppressContentEditableWarning
            ref={contentRef}
            onFocus={() => {
              select(node.id)
              setEditingId(node.id)
            }}
            onBlur={() => {
              const txt = (contentRef.current?.textContent || '').replace(/\s+/g, ' ').trim()
              useEditorStore.getState().updateNode(node.id, (n) => ({ ...n, text: txt }))
              setEditingId(null)
            }}
          >
            {node.text}
          </h1>
          {indicatorBottom}
        </div>
      )
    }
    case 'text': {
      const contentRef = useRef<HTMLParagraphElement | null>(null)
      useEffect(() => {
        if (editingId === node.id) return
        if (contentRef.current && contentRef.current.textContent !== (node as any).text) {
          contentRef.current.textContent = (node as any).text || ''
        }
      }, [editingId, node])
      return (
        <div {...commonProps} style={inlineStyle} className={`${commonProps.className}`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          <p
            className='text-gray-600 dark:text-gray-300'
            contentEditable={!isLocked}
            suppressContentEditableWarning
            ref={contentRef}
            onFocus={() => {
              select(node.id)
              setEditingId(node.id)
            }}
            onBlur={() => {
              const txt = (contentRef.current?.textContent || '').replace(/\s+/g, ' ').trim()
              useEditorStore.getState().updateNode(node.id, (n) => ({ ...n, text: txt }))
              setEditingId(null)
            }}
          >
            {node.text}
          </p>
          {indicatorBottom}
        </div>
      )
    }
    case 'button': {
      const self = resolveResponsive(node.style?.self)
      const btnStyle: React.CSSProperties = { ...inlineStyle }
      if (self === 'center') {
        btnStyle.marginLeft = 'auto'
        btnStyle.marginRight = 'auto'
        btnStyle.display = 'flex'
        btnStyle.alignItems = 'center'
        btnStyle.width = btnStyle.width || 'fit-content'
      } else if (self === 'end') {
        btnStyle.marginLeft = 'auto'
        btnStyle.display = 'flex'
        btnStyle.alignItems = 'center'
        btnStyle.width = btnStyle.width || 'fit-content'
      } else if (self === 'start') {
        btnStyle.marginRight = 'auto'
        btnStyle.display = 'flex'
        btnStyle.alignItems = 'center'
        btnStyle.width = btnStyle.width || 'fit-content'
      }
      return (
        <a
          {...commonProps}
          style={btnStyle}
          className={`${commonProps.className} inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900`}
          href={node.href || '#'}
        >
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          {node.label}
          {indicatorBottom}
        </a>
      )
    }
    case 'image':
      // biome-ignore lint/a11y/useAltText: placeholder
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <div {...commonProps} style={inlineStyle}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          <img src={node.src} alt={node.alt || ''} />
          {indicatorBottom}
        </div>
      )
    case 'divider':
      return (
        <div {...commonProps} style={inlineStyle} className={`${commonProps.className} my-2`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          <hr className='border-gray-200 dark:border-gray-800' />
          {indicatorBottom}
        </div>
      )
    case 'spacer':
      return (
        <div {...commonProps} style={inlineStyle} className={`${commonProps.className} h-6`}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          {indicatorBottom}
        </div>
      )
    case 'icon': {
      const name = node.name
      const IconComp = name && isIconName(name) ? ICONS[name] : null
      if (!IconComp) {
        return (
          <span
            {...commonProps}
            style={inlineStyle}
            aria-hidden
            className={`${commonProps.className} inline-block`}
          />
        )
      }
      const iw = resolveResponsive(node.style?.width)
      const ih = resolveResponsive(node.style?.height)
      // Ensure container does not consume width/height meant for the icon
      const wrapperStyle: React.CSSProperties = { ...(inlineStyle || {}), width: undefined, height: undefined }
      return (
        <div {...commonProps} style={wrapperStyle}>
          {indicatorTop}
          <div className='pointer-events-none absolute -top-2 left-2 z-10 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800 shadow-sm ring-1 ring-sky-200 opacity-0 group-hover/node:opacity-100 transition dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-800'>
            {label}
          </div>
          <IconComp style={{ width: iw, height: ih }} />
          {indicatorBottom}
        </div>
      )
    }
    case 'form':
      return <div {...commonProps} style={inlineStyle} className={`${commonProps.className} rounded border p-4 text-sm dark:border-gray-800`}>Form (coming soon)</div>
    default:
      return null
  }
}

export default function EditorCanvas() {
  const doc = useEditorStore((s) => s.doc)
  const select = useEditorStore((s) => s.select)
  const zoom = useEditorStore((s) => s.zoom)
  const breakpoint = useEditorStore((s) => s.breakpoint)
  const fitMode = useEditorStore((s) => s.fitMode)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [fitScale, setFitScale] = useState(1)

  const width = useMemo(() => {
    switch (breakpoint) {
      case 'sm':
        return 375
      case 'md':
        return 768
      case 'lg':
        return 1024
      case 'base':
      default:
        return 1280
    }
  }, [breakpoint])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const available = el.clientWidth - 32 // p-4 padding on container
      if (available > 0) {
        const scale = Math.min(1, available / width)
        setFitScale(scale)
      }
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={containerRef} className='flex-1 overflow-auto bg-gray-50 p-4 dark:bg-gray-950' onClick={() => select(null)}>
      <div
        className='mx-auto rounded bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800'
        style={{ width, transform: `scale(${fitMode ? fitScale : zoom})`, transformOrigin: 'top center' }}
      >
        <div className='p-6 space-y-4'>
          {doc.nodes.map((n) => (
            <NodeView key={n.id} node={n} />
          ))}
        </div>
      </div>
    </div>
  )
}
