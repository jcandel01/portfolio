import { useState } from 'react'
import { GitBranch, Workflow, Sparkles, Plus, RotateCcw } from 'lucide-react'
import { PhoneFrame, PhoneStatusBar } from '../device/PhoneFrame'

interface Node {
  id: number
  label: string
  x: number // percent
  y: number // percent
  tone: string // gradient
  size: number
}

interface Link {
  from: number
  to: number
  kind: 'branch' | 'bridge'
}

const tones = [
  'from-sky-400 to-indigo-500',
  'from-violet-400 to-fuchsia-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
]

const initialNodes: Node[] = [
  { id: 1, label: 'Portfolio', x: 50, y: 30, tone: tones[1], size: 56 },
  { id: 2, label: 'Demos', x: 26, y: 52, tone: tones[0], size: 44 },
  { id: 3, label: 'Design', x: 72, y: 50, tone: tones[2], size: 44 },
  { id: 4, label: 'Deploy', x: 50, y: 72, tone: tones[3], size: 40 },
]

const initialLinks: Link[] = [
  { from: 1, to: 2, kind: 'branch' },
  { from: 1, to: 3, kind: 'branch' },
  { from: 2, to: 4, kind: 'branch' },
  { from: 3, to: 4, kind: 'bridge' },
]

const childLabels = ['Idea', 'Spark', 'Thread', 'Note', 'Vision', 'Draft', 'Echo']

export function IdeaTrackerDemo() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [selectedId, setSelectedId] = useState<number>(1)
  const [counter, setCounter] = useState(0)

  const selected = nodes.find((n) => n.id === selectedId)!

  const clamp = (v: number) => Math.max(14, Math.min(86, v))

  function addNode(kind: 'branch' | 'bridge') {
    const id = Date.now()
    const angle = Math.random() * Math.PI * 2
    const dist = 18 + Math.random() * 8
    const newNode: Node = {
      id,
      label: childLabels[counter % childLabels.length],
      x: clamp(selected.x + Math.cos(angle) * dist),
      y: clamp(selected.y + Math.sin(angle) * dist * 0.8),
      tone: tones[(counter + 2) % tones.length],
      size: kind === 'branch' ? 38 : 34,
    }
    setNodes((n) => [...n, newNode])
    setLinks((l) => [...l, { from: selectedId, to: id, kind }])
    setSelectedId(id)
    setCounter((c) => c + 1)
  }

  function reset() {
    setNodes(initialNodes)
    setLinks(initialLinks)
    setSelectedId(1)
    setCounter(0)
  }

  const pos = (id: number) => nodes.find((n) => n.id === id)!

  return (
    <PhoneFrame screenClassName="bg-[#06070f]">
      <PhoneStatusBar />
      {/* Header */}
      <div className="absolute inset-x-0 top-11 z-10 flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <Sparkles size={15} className="text-sky-400" />
          <span className="text-sm font-bold text-white">Constellation</span>
        </div>
        <button onClick={reset} className="text-slate-500 active:text-slate-300">
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              opacity: 0.12 + ((i * 7) % 30) / 100,
            }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="absolute inset-0">
        {/* Links */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {links.map((link, i) => {
            const a = pos(link.from)
            const b = pos(link.to)
            return (
              <line
                key={i}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke={link.kind === 'bridge' ? 'rgba(34,211,238,0.5)' : 'rgba(124,92,255,0.45)'}
                strokeWidth={1.5}
                strokeDasharray={link.kind === 'bridge' ? '4 4' : undefined}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSel = node.id === selectedId
          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${node.tone} text-center transition-all duration-200 ${
                isSel ? 'ring-2 ring-white ring-offset-2 ring-offset-[#06070f] scale-110' : 'opacity-90'
              }`}
            >
              <span className="flex h-full w-full items-center justify-center px-1 text-[8px] font-bold leading-none text-white">
                {node.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected info + controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-7">
        <div className="rounded-2xl glass p-3">
          <p className="text-[10px] text-slate-400">Selected idea</p>
          <p className="text-sm font-bold text-white">{selected.label}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => addNode('branch')}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-brand/80 py-2 text-[11px] font-semibold text-white active:scale-95"
            >
              <GitBranch size={13} /> Branch
            </button>
            <button
              onClick={() => addNode('bridge')}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-accent/80 py-2 text-[11px] font-semibold text-ink-950 active:scale-95"
            >
              <Workflow size={13} /> Bridge
            </button>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1 text-[9px] text-slate-500">
            <Plus size={9} /> Tap a node, then branch or bridge
          </p>
        </div>
      </div>
    </PhoneFrame>
  )
}
