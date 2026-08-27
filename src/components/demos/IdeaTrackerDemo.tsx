import { useState } from 'react'
import { GitBranch, Workflow, Sparkles, Plus, RotateCcw } from 'lucide-react'
import { PhoneFrame, PhoneStatusBar } from '../device/PhoneFrame'

interface Node {
  id: number
  label: string
  x: number // percent
  y: number // percent
  /** Luminance step, a real feature of the app rather than decoration. */
  lum: number
  size: number
}

interface Link {
  from: number
  to: number
  kind: 'branch' | 'bridge'
}

/** One accent, five luminance steps. Node brightness encodes idea mass. */
const LUMS = [1, 0.82, 0.66, 0.52, 0.4]

const initialNodes: Node[] = [
  { id: 1, label: 'Portfolio', x: 50, y: 30, lum: LUMS[0], size: 56 },
  { id: 2, label: 'Demos', x: 26, y: 52, lum: LUMS[1], size: 44 },
  { id: 3, label: 'Design', x: 72, y: 50, lum: LUMS[2], size: 44 },
  { id: 4, label: 'Deploy', x: 50, y: 72, lum: LUMS[3], size: 40 },
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
      lum: LUMS[(counter + 2) % LUMS.length],
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
    <PhoneFrame screenClassName="bg-demo-idea-bg">
      <PhoneStatusBar />
      {/* Header */}
      <div className="absolute inset-x-0 top-11 z-10 flex items-center justify-between px-lg py-xs">
        <div className="flex items-center gap-1.5">
          <Sparkles size={15} className="text-demo-idea-accent" />
          <span className="text-caption-strong text-white">Constellation</span>
        </div>
        <button
          onClick={reset}
          aria-label="Reset canvas"
          className="text-demo-idea-muted active:scale-[0.95] active:text-white"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Star field. Deterministic positions, painted once, no animation. */}
      <div className="absolute inset-0" aria-hidden="true">
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
        {/* Links: solid for a branch, dashed for a bridge. Shape carries the
            meaning so a second color is not needed. */}
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
                className="stroke-demo-idea-accent"
                strokeOpacity={link.kind === 'bridge' ? 0.45 : 0.7}
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
                opacity: node.lum,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-demo-idea-accent text-center transition-transform duration-200 ${
                isSel ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-demo-idea-bg' : ''
              }`}
            >
              <span className="flex h-full w-full items-center justify-center px-1 text-micro-legal font-semibold leading-none text-white">
                {node.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected info + controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-sm pb-7">
        <div className="rounded-lg bg-demo-idea-raised p-sm">
          <p className="text-micro-legal text-demo-idea-muted">Selected idea</p>
          <p className="text-caption-strong text-white">{selected.label}</p>
          <div className="mt-xs grid grid-cols-2 gap-xs">
            <button
              onClick={() => addNode('branch')}
              className="flex items-center justify-center gap-1.5 rounded-sm bg-demo-idea-accent py-xs text-fine-print font-semibold text-white active:scale-[0.95]"
            >
              <GitBranch size={13} /> Branch
            </button>
            <button
              onClick={() => addNode('bridge')}
              className="flex items-center justify-center gap-1.5 rounded-sm border border-demo-idea-accent py-xs text-fine-print font-semibold text-demo-idea-accent active:scale-[0.95]"
            >
              <Workflow size={13} /> Bridge
            </button>
          </div>
          <p className="mt-xs flex items-center justify-center gap-1 text-micro-legal text-demo-idea-muted">
            <Plus size={9} /> Tap a node, then branch or bridge
          </p>
        </div>
      </div>
    </PhoneFrame>
  )
}
