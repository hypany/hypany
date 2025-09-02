import 'server-only'
import type { PageDocument, Node } from '@/lib/page-document'
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
  if (justify)
    css.justifyContent =
      justify === 'start'
        ? 'flex-start'
        : justify === 'end'
          ? 'flex-end'
          : justify === 'between'
            ? 'space-between'
            : justify === 'around'
              ? 'space-around'
              : 'center'
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
  // Note: for border colors/widths use dedicated keys if added; avoid conflicting with layout width/color.
  const bg = resolveResponsive(s.bg)
  if (bg) css.background = bg
  const shadow = resolveResponsive(s.shadow)
  if (shadow) css.boxShadow = shadow

  return css
}

function renderNode(node: Node) {
  const inlineStyle = styleToInline(node)
  switch (node.type) {
    case 'section':
      return (
        <section key={node.id} className='mb-10 space-y-4 md:space-y-6' style={inlineStyle}>
          {(node.children || []).map((c) => renderNode(c))}
        </section>
      )
    case 'container':
      return (
        <div key={node.id} className='mx-auto max-w-5xl px-4 space-y-4 md:space-y-6' style={inlineStyle}>
          {(node.children || []).map((c) => renderNode(c))}
        </div>
      )
    case 'grid':
      {
        const cols = resolveResponsive(node.style?.cols)
        const gap = resolveResponsive(node.style?.gap)
        const gridStyle: React.CSSProperties = {
          ...inlineStyle,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols && cols > 0 ? cols : 2}, minmax(0, 1fr))`,
          gap: gap || '1rem',
        }
        return (
          <div key={node.id} className='grid' style={gridStyle}>
            {(node.children || []).map((c) => renderNode(c))}
          </div>
        )
      }
    case 'heading':
      return (
        <h1 key={node.id} className='text-3xl font-bold' style={inlineStyle}>
          {node.text}
        </h1>
      )
    case 'text':
      return (
        <p key={node.id} className='text-gray-600 dark:text-gray-300' style={inlineStyle}>
          {node.text}
        </p>
      )
    case 'image':
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={node.id} src={node.src} alt={node.alt || ''} style={inlineStyle} />
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
          key={node.id}
          href={node.href || '#'}
          className='inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white dark:bg-gray-100 dark:text-gray-900'
          style={btnStyle}
        >
          {node.label}
        </a>
      )
    }
    case 'divider':
      return <hr key={node.id} className='my-6 border-gray-200 dark:border-gray-800' style={inlineStyle} />
    case 'spacer':
      return <div key={node.id} className='h-6' style={inlineStyle} />
    case 'icon': {
      const name = node.name
      if (name && isIconName(name)) {
        const IconComp = ICONS[name]
        const iw = resolveResponsive(node.style?.width)
        const ih = resolveResponsive(node.style?.height)
        const wrapperStyle: React.CSSProperties = { ...(inlineStyle || {}), width: undefined, height: undefined }
        return (
          <span key={node.id} style={wrapperStyle} className='inline-flex items-center'>
            <IconComp style={{ width: iw, height: ih }} />
          </span>
        )
      }
      return <span key={node.id} aria-hidden className='inline-block' />
    }
    case 'form':
      return null
    default:
      return null
  }
}

export function DocumentRenderer({ doc, customCss }: { doc: PageDocument; customCss?: string | null }) {
  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      {customCss ? <style>{customCss}</style> : null}
      <main className='mx-auto max-w-5xl px-4 py-10'>
        {doc.nodes.map((n) => renderNode(n))}
      </main>
    </div>
  )
}
