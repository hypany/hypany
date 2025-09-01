import { ulid } from 'ulid'
import type { Node } from '@/lib/page-document'

function id() {
  return ulid()
}

export function heroTemplate(): Node {
  return {
    id: id(),
    type: 'section',
    style: { p: { base: '48px' } },
    children: [
      {
        id: id(),
        type: 'container',
        children: [
          { id: id(), type: 'heading', level: 1, text: 'Welcome to your new page' },
          {
            id: id(),
            type: 'text',
            text: 'Tell people what you do in one clear sentence.',
            style: { color: { base: '#6b7280' } },
          },
          { id: id(), type: 'button', label: 'Get Started', href: '#' },
        ],
      },
    ],
  }
}

export function featuresTemplate(): Node {
  const feature = (title: string, body: string): Node => ({
    id: id(),
    type: 'container',
    children: [
      { id: id(), type: 'heading', level: 3, text: title },
      { id: id(), type: 'text', text: body },
    ],
  })
  return {
    id: id(),
    type: 'section',
    style: { p: { base: '40px' } },
    children: [
      { id: id(), type: 'heading', level: 2, text: 'Features' },
      {
        id: id(),
        type: 'grid',
        style: { cols: { base: 2 }, gap: { base: '16px' } },
        children: [
          feature('Fast', 'Optimized for quick iteration and learning.'),
          feature('Flexible', 'Compose sections, edit styles, and publish.'),
          feature('Accessible', 'Built with a11y considerations by default.'),
          feature('Server-first', 'Render pages efficiently with RSC.'),
        ],
      },
    ],
  }
}

export function faqTemplate(): Node {
  const qa = (q: string, a: string): Node => ({
    id: id(),
    type: 'container',
    children: [
      { id: id(), type: 'heading', level: 3, text: q },
      { id: id(), type: 'text', text: a },
    ],
  })
  return {
    id: id(),
    type: 'section',
    style: { p: { base: '40px' } },
    children: [
      { id: id(), type: 'heading', level: 2, text: 'Frequently Asked Questions' },
      {
        id: id(),
        type: 'grid',
        style: { cols: { base: 2 }, gap: { base: '16px' } },
        children: [
          qa('What is this?', 'A WYSIWYG editor for landing pages.'),
          qa('How do I publish?', 'Click Publish to snapshot your draft.'),
          qa('Can I customize styles?', 'Yes, adjust layout and style in the inspector.'),
          qa('Is it accessible?', 'We aim for sensible defaults and controls.'),
        ],
      },
    ],
  }
}

export function footerTemplate(): Node {
  return {
    id: id(),
    type: 'section',
    style: { p: { base: '24px' }, bg: { base: '#f3f4f6' } },
    children: [
      {
        id: id(),
        type: 'container',
        children: [
          {
            id: id(),
            type: 'grid',
            style: { cols: { base: 3 }, gap: { base: '16px' } },
            children: [
              { id: id(), type: 'text', text: 'About' },
              { id: id(), type: 'text', text: 'Privacy' },
              { id: id(), type: 'text', text: 'Contact' },
            ],
          },
        ],
      },
    ],
  }
}
