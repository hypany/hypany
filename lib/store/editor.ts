'use client'

import { create } from 'zustand'
import type { Node, NodeId, PageDocument } from '@/lib/page-document'
import { ulid } from 'ulid'

type Breakpoint = 'base' | 'sm' | 'md' | 'lg'

type EditorState = {
  doc: PageDocument
  dirty: boolean
  selectedId: NodeId | null
  draggingId: NodeId | null
  dropTargetId: NodeId | null
  dropPosition: 'before' | 'after' | 'inside' | null
  zoom: number
  breakpoint: Breakpoint
  setDoc: (doc: PageDocument) => void
  markSaved: () => void
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
  breakpoint: 'base',
  doc: { version: 1, nodes: [] },
  dirty: false,
  draggingId: null,
  dropPosition: null,
  dropTargetId: null,
  insertChild: (parentId, node, index) =>
    set((s) => ({ dirty: true, doc: { ...s.doc, nodes: insertChildInTree(s.doc.nodes, parentId, node, index) } })),
  dragStart: (id) => set({ draggingId: id }),
  dragHover: (targetId, pos) => set({ dropTargetId: targetId, dropPosition: pos }),
  dragClear: () => set({ draggingId: null, dropTargetId: null, dropPosition: null }),
  select: (id) => set({ selectedId: id }),
  selectedId: null,
  setBreakpoint: (bp) => set({ breakpoint: bp }),
  setDoc: (doc) => set({ doc }),
  markSaved: () => set({ dirty: false }),
  setZoom: (z) => set({ zoom: Math.min(2, Math.max(0.5, z)) }),
  updateNode: (id, updater) => set((s) => ({ dirty: true, doc: { ...s.doc, nodes: updateNodeInTree(s.doc.nodes, id, updater) } })),
  removeNode: (id) => set((s) => ({
    dirty: true,
    doc: { ...s.doc, nodes: removeNodeFromTree(s.doc.nodes, id) },
    selectedId: s.selectedId === id ? null : s.selectedId,
  })),
  duplicateNode: (id) =>
    set((s) => {
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
      return { dirty: true, doc: { ...s.doc, nodes } }
    }),
  moveNode: (dragId, targetId, pos) =>
    set((s) => {
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
      return { dirty: true, doc: { ...s.doc, nodes } }
    }),
  zoom: 1,
}))
