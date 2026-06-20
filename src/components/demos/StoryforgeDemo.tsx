import { useState } from 'react'
import { BookOpen, Clock, Users, FileText, ChevronRight } from 'lucide-react'
import { BrowserFrame } from '../device/BrowserFrame'

interface Scene {
  id: string
  chapter: string
  title: string
  body: string
  events: string[]
  characters: string[]
}

const scenes: Scene[] = [
  {
    id: 's1',
    chapter: 'Chapter 1 — Arrival',
    title: 'The Harbor at Dusk',
    body: `Mara stepped off the gangplank as the last light bled from the sky. The harbor of Velissa smelled of salt and tar, and somewhere beyond the warehouses a bell tolled the close of trade.\n\nShe had not meant to come back. Yet the letter in her coat — three lines, no signature — had pulled her across two seas.`,
    events: ['Mara returns to Velissa', 'The anonymous letter'],
    characters: ['Mara', 'Harbormaster'],
  },
  {
    id: 's2',
    chapter: 'Chapter 1 — Arrival',
    title: 'A Familiar Stranger',
    body: `The inn was louder than she remembered. At the far table sat a man she knew and did not know — older now, a scar where his easy smile used to be.\n\n"You read it, then," Corin said, not turning around.`,
    events: ['Mara meets Corin', 'First mention of the Pact'],
    characters: ['Mara', 'Corin'],
  },
  {
    id: 's3',
    chapter: 'Chapter 2 — The Pact',
    title: 'Terms in the Dark',
    body: `They spoke in the cellar where the wine had long gone to vinegar. Corin laid the map flat and weighted its corners with coins that bore a dead king's face.\n\n"Everything north of the river," he said, "still answers to the old oath."`,
    events: ['The Pact revealed', 'The northern map'],
    characters: ['Mara', 'Corin', 'Lady Venn'],
  },
]

const timeline = [
  { id: 'e1', label: 'Mara returns to Velissa', day: 'Day 1' },
  { id: 'e2', label: 'The anonymous letter', day: 'Day 1' },
  { id: 'e3', label: 'Mara meets Corin', day: 'Day 1' },
  { id: 'e4', label: 'First mention of the Pact', day: 'Day 2' },
  { id: 'e5', label: 'The Pact revealed', day: 'Day 3' },
  { id: 'e6', label: 'The northern map', day: 'Day 3' },
]

export function StoryforgeDemo() {
  const [activeId, setActiveId] = useState('s1')
  const active = scenes.find((s) => s.id === activeId)!

  const chapters = Array.from(new Set(scenes.map((s) => s.chapter)))

  return (
    <BrowserFrame url="storyforge.app/project/the-northern-oath">
      <div className="flex h-full bg-[#14110d] text-amber-50">
        {/* Left: chapters & scenes */}
        <aside className="hidden w-44 shrink-0 flex-col border-r border-amber-100/10 bg-black/20 sm:flex">
          <div className="flex items-center gap-1.5 border-b border-amber-100/10 px-3 py-2.5">
            <BookOpen size={14} className="text-amber-400" />
            <span className="text-xs font-bold">The Northern Oath</span>
          </div>
          <div className="no-scrollbar overflow-y-auto py-2">
            {chapters.map((ch) => (
              <div key={ch} className="mb-1">
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200/50">
                  {ch}
                </p>
                {scenes
                  .filter((s) => s.chapter === ch)
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveId(s.id)}
                      className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-left text-[11px] transition-colors ${
                        s.id === activeId
                          ? 'bg-amber-500/15 text-amber-100'
                          : 'text-amber-100/60 hover:bg-white/5'
                      }`}
                    >
                      <FileText size={11} className="shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Center: editor */}
        <main className="no-scrollbar flex-1 overflow-y-auto px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-amber-200/50">{active.chapter}</p>
          <h3 className="mb-3 text-xl font-bold text-amber-50">{active.title}</h3>
          {active.body.split('\n\n').map((para, i) => (
            <p key={i} className="mb-3 text-[13px] leading-relaxed text-amber-100/80">
              {para}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {active.characters.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-200"
              >
                <Users size={9} /> {c}
              </span>
            ))}
          </div>
        </main>

        {/* Right: timeline */}
        <aside className="hidden w-44 shrink-0 flex-col border-l border-amber-100/10 bg-black/20 lg:flex">
          <div className="flex items-center gap-1.5 border-b border-amber-100/10 px-3 py-2.5">
            <Clock size={14} className="text-amber-400" />
            <span className="text-xs font-bold">Timeline</span>
          </div>
          <div className="no-scrollbar overflow-y-auto px-3 py-2">
            {timeline.map((e) => {
              const inScene = active.events.includes(e.label)
              return (
                <div key={e.id} className="relative pl-4">
                  <span
                    className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ${
                      inScene ? 'bg-amber-400' : 'bg-amber-100/20'
                    }`}
                  />
                  <span className="absolute left-[3px] top-3 h-full w-px bg-amber-100/10" />
                  <div className={`mb-2.5 ${inScene ? '' : 'opacity-50'}`}>
                    <p className="text-[9px] text-amber-200/50">{e.day}</p>
                    <p className="flex items-center gap-0.5 text-[11px] text-amber-100/80">
                      {inScene && <ChevronRight size={10} className="text-amber-400" />}
                      {e.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </BrowserFrame>
  )
}
