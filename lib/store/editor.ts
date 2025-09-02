'use client'

import { create } from 'zustand'
import type { Node, NodeId, PageDocument } from '@/lib/page-document'
import { ulid } from 'ulid'

type Breakpoint = 'base' | 'sm' | 'md' | 'lg'

type EditorState = {
  doc: PageDocument
  fitMode: boolean
  dirty: boolean
  editingId: NodeId | null
  paletteNode: Node | null
  // History
  past: Array<{ doc: PageDocument; timestamp: number; action: 'update' | 'insert' | 'remove' | 'move' | 'duplicate' | 'set'; targetId?: NodeId | null }>
  future: Array<{ doc: PageDocument; timestamp: number; action: 'update' | 'insert' | 'remove' | 'move' | 'duplicate' | 'set'; targetId?: NodeId | null }>
  lastHistory?: { timestamp: number; action: 'update' | 'insert' | 'remove' | 'move' | 'duplicate' | 'set'; targetId?: NodeId | null } | null
  isRestoring: boolean
  selectedId: NodeId | null
  draggingId: NodeId | null
  dropTargetId: NodeId | null
  dropPosition: 'before' | 'after' | 'inside' | null
  zoom: number
  breakpoint: Breakpoint
  setDoc: (doc: PageDocument) => void
  setFitMode: (fit: boolean) => void
  markSaved: () => void
  setEditingId: (id: NodeId | null) => void
  startPaletteDrag: (node: Node) => void
  clearPaletteDrag: () => void
  undo: () => void
  redo: () => void
  select: (id: NodeId | null) => void
  dragStart: (id: NodeId) => void
  dragHover: (targetId: NodeId, pos: 'before' | 'after' | 'inside') => void
  dragClear: () => void
  setZoom: (z: number) => void
  setBreakpoint: (bp: Breakpoint) => void
  insertChild: (parentId: NodeId | null, node: Node, index?: number) => void
  updateNode: (id: NodeId, updater: (n: Node) => Node) => void
  removeNode: (id: NodeId) => void
  duplicateNode: (id: NodeId) => void
  moveNode: (dragId: NodeId, targetId: NodeId, pos: 'before' | 'after' | 'inside') => void
}

function updateNodeInTree(nodes: Node[], id: NodeId, updater: (n: Node) => Node): Node[] {
  return nodes.map((n) => {
    if (n.id === id) return updater(n)
    if (n.children && n.children.length > 0) {
      return { ...n, children: updateNodeInTree(n.children, id, updater) }
    }
    return n
  })
}

function insertChildInTree(nodes: Node[], parentId: NodeId | null, node: Node, index?: number): Node[] {
  if (parentId === null) {
    const clone = nodes.slice()
    if (typeof index === 'number' && index >= 0 && index <= clone.length) clone.splice(index, 0, node)
    else clone.push(node)
    return clone
  }
  return nodes.map((n) => {
    if (n.id === parentId) {
      const children = n.children ? n.children.slice() : []
      if (typeof index === 'number' && index >= 0 && index <= children.length) children.splice(index, 0, node)
      else children.push(node)
      return { ...n, children }
    }
    if (n.children && n.children.length > 0) {
      return { ...n, children: insertChildInTree(n.children, parentId, node, index) }
    }
    return n
  })
}

function removeNodeFromTree(nodes: Node[], id: NodeId): Node[] {
  const next: Node[] = []
  for (const n of nodes) {
    if (n.id === id) continue
    if (n.children && n.children.length > 0) {
      next.push({ ...n, children: removeNodeFromTree(n.children, id) })
    } else {
      next.push(n)
    }
  }
  return next
}

function findParentAndIndex(nodes: Node[], id: NodeId, parent: Node | null = null): { parent: Node | null; index: number } | null {
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

function cloneWithNewIds(node: Node): Node {
  const newId = ulid()
  const base = { ...node, id: newId } as Node
  if (node.children && node.children.length > 0) {
    base.children = node.children.map((c) => cloneWithNewIds(c))
  }
  return base
}

function findNode(nodes: Node[], id: NodeId): Node | null {
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children && n.children.length > 0) {
      const r = findNode(n.children, id)
      if (r) return r
    }
  }
  return null
}

function isDescendant(nodes: Node[], ancestorId: NodeId, childId: NodeId): boolean {
  const node = findNode(nodes, ancestorId)
  if (!node) return false
  const stack = [...(node.children || [])]
  while (stack.length) {
    const n = stack.pop() as Node
    if (n.id === childId) return true
    if (n.children) stack.push(...n.children)
  }
  return false
}

export const useEditorStore = create<EditorState>((set) => ({
  breakpoint: 'md',
  doc: { version: 1, nodes: [] },
  fitMode: true,
  dirty: false,
  editingId: null,
  paletteNode: null,
  past: [],
  future: [],
  lastHistory: null,
  isRestoring: false,
  draggingId: null,
  dropPosition: null,
  dropTargetId: null,
  insertChild: (parentId, node, index) =>
    set((s) => {
      if (!s.isRestoring) {
        const snapshot = JSON.parse(JSON.stringify(s.doc)) as PageDocument
        const ts = Date.now()
        const past = [...s.past, { doc: snapshot, timestamp: ts, action: 'insert', targetId: node.id }]
        return {
          dirty: true,
          future: [],
          lastHistory: { timestamp: ts, action: 'insert', targetId: node.id },
          doc: { ...s.doc, nodes: insertChildInTree(s.doc.nodes, parentId, node, index) },
          past,
        }
      }
      return { dirty: true, doc: { ...s.doc, nodes: insertChildInTree(s.doc.nodes, parentId, node, index) } }
    }),
  dragStart: (id) => set({ draggingId: id }),
  dragHover: (targetId, pos) => set({ dropTargetId: targetId, dropPosition: pos }),
  dragClear: () => set({ draggingId: null, dropTargetId: null, dropPosition: null }),
  select: (id) => set({ selectedId: id }),
  selectedId: null,
  setBreakpoint: (bp) => set({ breakpoint: bp }),
  setDoc: (doc) => set({ doc }),
  setFitMode: (fit) => set({ fitMode: fit }),
  markSaved: () => set({ dirty: false }),
  setEditingId: (id) => set({ editingId: id }),
  startPaletteDrag: (node) => set({ paletteNode: node }),
  clearPaletteDrag: () => set({ paletteNode: null, dropTargetId: null, dropPosition: null }),
  undo: () =>
    set((s) => {
      if (s.past.length === 0) return s
      const prev = s.past[s.past.length - 1]
      const rest = s.past.slice(0, -1)
      const current: PageDocument = s.doc
      const ts = Date.now()
      const future = [...s.future, { doc: current, timestamp: ts, action: 'set', targetId: null }]
      return { doc: prev.doc, dirty: true, past: rest, future, isRestoring: true, lastHistory: { timestamp: ts, action: 'set', targetId: null } }
    }),
  redo: () =>
    set((s) => {
      if (s.future.length === 0) return s
      const next = s.future[s.future.length - 1]
      const rest = s.future.slice(0, -1)
      const current: PageDocument = s.doc
      const ts = Date.now()
      const past = [...s.past, { doc: current, timestamp: ts, action: 'set', targetId: null }]
      return { doc: next.doc, dirty: true, future: rest, past, isRestoring: true, lastHistory: { timestamp: ts, action: 'set', targetId: null } }
    }),
  setZoom: (z) => set({ fitMode: false, zoom: Math.min(2, Math.max(0.5, z)) }),
  updateNode: (id, updater) =>
    set((s) => {
      const now = Date.now()
      const canMerge =
        !s.isRestoring &&
        s.lastHistory &&
        s.lastHistory.action === 'update' &&
        s.lastHistory.targetId === id &&
        now - s.lastHistory.timestamp < 500
      let past = s.past
      let lastHistory = s.lastHistory
      if (!s.isRestoring && !canMerge) {
        const snapshot = JSON.parse(JSON.stringify(s.doc)) as PageDocument
        past = [...past, { doc: snapshot, timestamp: now, action: 'update', targetId: id }]
        lastHistory = { timestamp: now, action: 'update', targetId: id }
      }
      return {
        dirty: true,
        future: s.isRestoring ? s.future : canMerge ? s.future : [],
        lastHistory,
        doc: { ...s.doc, nodes: updateNodeInTree(s.doc.nodes, id, updater) },
        past,
        isRestoring: false,
      }
    }),
  removeNode: (id) =>
    set((s) => {
      if (!s.isRestoring) {
        const snapshot = JSON.parse(JSON.stringify(s.doc)) as PageDocument
        const ts = Date.now()
        const past = [...s.past, { doc: snapshot, timestamp: ts, action: 'remove', targetId: id }]
        return {
          dirty: true,
          doc: { ...s.doc, nodes: removeNodeFromTree(s.doc.nodes, id) },
          selectedId: s.selectedId === id ? null : s.selectedId,
          future: [],
          past,
          lastHistory: { timestamp: ts, action: 'remove', targetId: id },
          isRestoring: false,
        }
      }
      return {
        dirty: true,
        doc: { ...s.doc, nodes: removeNodeFromTree(s.doc.nodes, id) },
        selectedId: s.selectedId === id ? null : s.selectedId,
        isRestoring: false,
      }
    }),
  duplicateNode: (id) =>
    set((s) => {
      if (!s.isRestoring) {
        const snapshot = JSON.parse(JSON.stringify(s.doc)) as PageDocument
        const ts = Date.now()
        s.past = [...s.past, { doc: snapshot, timestamp: ts, action: 'duplicate', targetId: id }]
        s.future = []
        s.lastHistory = { timestamp: ts, action: 'duplicate', targetId: id }
      }
      // Find parent and index
      const place = findParentAndIndex(s.doc.nodes, id, null)
      if (!place) return s
      const { parent, index } = place
      let nodes = s.doc.nodes
      // Find the original node to clone
      const findNode = (arr: Node[], target: NodeId): Node | null => {
        for (const n of arr) {
          if (n.id === target) return n
          if (n.children) {
            const r = findNode(n.children, target)
            if (r) return r
          }
        }
        return null
      }
      const original = findNode(nodes, id)
      if (!original) return s
      const cloned = cloneWithNewIds(original)
      // Insert after original within the same parent
      if (parent === null) {
        const arr = nodes.slice()
        arr.splice(index + 1, 0, cloned)
        nodes = arr
      } else {
        const insertChild = (arr: Node[], p: Node, at: number, child: Node): Node[] => {
          return arr.map((n) => {
            if (n.id === p.id) {
              const ch = (n.children || []).slice()
              ch.splice(at + 1, 0, child)
              return { ...n, children: ch }
            }
            if (n.children) return { ...n, children: insertChild(n.children, p, at, child) }
            return n
          })
        }
        nodes = insertChild(nodes, parent, index, cloned)
      }
      return { dirty: true, doc: { ...s.doc, nodes }, isRestoring: false }
    }),
  moveNode: (dragId, targetId, pos) =>
    set((s) => {
      if (!s.isRestoring) {
        const snapshot = JSON.parse(JSON.stringify(s.doc)) as PageDocument
        const ts = Date.now()
        s.past = [...s.past, { doc: snapshot, timestamp: ts, action: 'move', targetId: dragId }]
        s.future = []
        s.lastHistory = { timestamp: ts, action: 'move', targetId: dragId }
      }
      if (dragId === targetId) return s
      // Prevent dropping into own descendant
      if (pos === 'inside' && isDescendant(s.doc.nodes, dragId, targetId)) return s
      let nodes = s.doc.nodes
      // Extract dragged node
      const nodeToMove = findNode(nodes, dragId)
      if (!nodeToMove) return s
      nodes = removeNodeFromTree(nodes, dragId)

      if (pos === 'inside') {
        // Insert as last child of target
        nodes = insertChildInTree(nodes, targetId, nodeToMove)
      } else {
        // Find parent and index of target
        const place = findParentAndIndex(nodes, targetId, null)
        if (!place) return s
        const { parent, index } = place
        const parentId = parent ? parent.id : null
        const insertIndex = pos === 'before' ? index : index + 1
        nodes = insertChildInTree(nodes, parentId, nodeToMove, insertIndex)
      }
      return { dirty: true, doc: { ...s.doc, nodes }, isRestoring: false }
    }),
  zoom: 1,
}))
