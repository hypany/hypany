// PageDocument schema for the WYSIWYG editor and public renderer
// Strict types, no any.

export type NodeType =
  | 'section'
  | 'container'
  | 'grid'
  | 'heading'
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'spacer'
  | 'icon'
  | 'form'

export type NodeId = string

export type Responsive<T> = {
  base?: T
  sm?: T
  md?: T
  lg?: T
}

export type Spacing = {
  p?: Responsive<string>
  px?: Responsive<string>
  py?: Responsive<string>
  pt?: Responsive<string>
  pr?: Responsive<string>
  pb?: Responsive<string>
  pl?: Responsive<string>
  m?: Responsive<string>
  mx?: Responsive<string>
  my?: Responsive<string>
  mt?: Responsive<string>
  mr?: Responsive<string>
  mb?: Responsive<string>
  ml?: Responsive<string>
}

export type Layout = {
  display?: Responsive<'block' | 'flex' | 'grid' | 'inline-block' | 'none'>
  flex?: Responsive<'row' | 'col'>
  justify?: Responsive<'start' | 'center' | 'end' | 'between' | 'around'>
  items?: Responsive<'start' | 'center' | 'end' | 'stretch'>
  gap?: Responsive<string>
  cols?: Responsive<number> // for grids
  width?: Responsive<string>
  height?: Responsive<string>
}

export type Typography = {
  font?: Responsive<string>
  size?: Responsive<string>
  weight?: Responsive<string>
  color?: Responsive<string>
  align?: Responsive<'left' | 'center' | 'right'>
}

export type Border = {
  radius?: Responsive<string>
  color?: Responsive<string>
  width?: Responsive<string>
}

export type Effects = {
  shadow?: Responsive<string>
  bg?: Responsive<string>
}

export type Style = Spacing & Layout & Typography & Border & Effects & {
  className?: string
}

export type BaseNode = {
  id: NodeId
  type: NodeType
  children?: Node[]
  style?: Style
}

export type HeadingNode = BaseNode & {
  type: 'heading'
  level?: 1 | 2 | 3 | 4 | 5 | 6
  text: string
}

export type TextNode = BaseNode & {
  type: 'text'
  text: string
}

export type ImageNode = BaseNode & {
  type: 'image'
  src: string
  alt?: string
}

export type ButtonNode = BaseNode & {
  type: 'button'
  label: string
  href?: string
  target?: '_self' | '_blank'
}

export type FormNode = BaseNode & {
  type: 'form'
  variant?: 'waitlist'
}

export type ContainerNode = BaseNode & { type: 'container' }
export type SectionNode = BaseNode & { type: 'section' }
export type GridNode = BaseNode & { type: 'grid' }
export type DividerNode = BaseNode & { type: 'divider' }
export type SpacerNode = BaseNode & { type: 'spacer' }
export type IconNode = BaseNode & { type: 'icon'; name: string }

export type Node =
  | SectionNode
  | ContainerNode
  | GridNode
  | HeadingNode
  | TextNode
  | ImageNode
  | ButtonNode
  | DividerNode
  | SpacerNode
  | IconNode
  | FormNode

export type ThemeTokens = {
  mode?: 'light' | 'dark' | 'system'
  colors?: {
    brand?: string
    bg?: string
    fg?: string
    muted?: string
    accent?: string
  }
  typography?: {
    body?: string
    heading?: string
  }
  containerMax?: string
}

export type PageMeta = {
  title?: string
  description?: string
  ogImage?: string
  favicon?: string
}

export type PageDocument = {
  version: 1
  meta?: PageMeta
  theme?: ThemeTokens
  nodes: Node[]
}

export function emptyDocument(): PageDocument {
  return {
    version: 1,
    meta: { title: 'Untitled', description: '' },
    nodes: [
      {
        id: 'root-hero',
        type: 'section',
        children: [
          { id: 'h1', type: 'heading', text: 'Welcome', level: 1 },
          { id: 'sub', type: 'text', text: 'Get started today' },
        ],
      },
    ],
  }
}

export function parseDocument(json: string | null | undefined): PageDocument | null {
  if (!json) return null
  try {
    const doc = JSON.parse(json) as PageDocument
    if (doc && typeof doc === 'object' && doc.version === 1 && Array.isArray(doc.nodes)) {
      return doc
    }
    return null
  } catch {
    return null
  }
}

