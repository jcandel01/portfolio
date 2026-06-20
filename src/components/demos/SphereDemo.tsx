import { useState } from 'react'
import {
  Home,
  Map as MapIcon,
  PlusSquare,
  MessageCircle,
  User,
  Heart,
  MessageSquare,
  MapPin,
  Bell,
  Search,
} from 'lucide-react'
import { PhoneFrame, PhoneStatusBar } from '../device/PhoneFrame'
import { TabBar, type TabItem } from '../device/TabBar'

const tabs: TabItem[] = [
  { key: 'feed', label: 'Feed', icon: Home },
  { key: 'map', label: 'Map', icon: MapIcon },
  { key: 'add', label: 'Add', icon: PlusSquare },
  { key: 'chats', label: 'Chats', icon: MessageCircle },
  { key: 'profile', label: 'Me', icon: User },
]

const posts = [
  {
    id: 1,
    user: 'lucia.m',
    place: 'Marina Beach',
    grad: 'from-orange-400 via-pink-500 to-purple-600',
    caption: 'Golden hour pulse 🌅 only here for 24h',
    likes: 128,
    comments: 14,
    pulse: true,
  },
  {
    id: 2,
    user: 'dani_runs',
    place: 'Turia Park',
    grad: 'from-emerald-400 via-teal-500 to-cyan-600',
    caption: 'Morning loop done. Anyone up for tomorrow?',
    likes: 67,
    comments: 8,
    pulse: false,
  },
  {
    id: 3,
    user: 'carla.art',
    place: 'Ruzafa Gallery',
    grad: 'from-indigo-400 via-violet-500 to-fuchsia-600',
    caption: 'New exhibition opening tonight ✨',
    likes: 203,
    comments: 31,
    pulse: false,
  },
]

const pins = [
  { id: 1, name: 'Marina Beach', x: '24%', y: '38%', count: 12, grad: 'from-orange-400 to-pink-500' },
  { id: 2, name: 'Turia Park', x: '58%', y: '30%', count: 7, grad: 'from-emerald-400 to-teal-500' },
  { id: 3, name: 'Ruzafa Gallery', x: '46%', y: '62%', count: 24, grad: 'from-violet-400 to-fuchsia-500' },
]

const chats = [
  { id: 1, name: 'Lucía', msg: 'See you at the beach! 🏖️', time: '2m', unread: 2, grad: 'from-orange-400 to-pink-500' },
  { id: 2, name: 'Dani', msg: 'Tomorrow 7am works', time: '1h', unread: 0, grad: 'from-emerald-400 to-teal-500' },
  { id: 3, name: 'Carla', msg: 'Thanks for coming!', time: '3h', unread: 0, grad: 'from-violet-400 to-fuchsia-500' },
]

function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-12">
      <h3 className="text-lg font-extrabold text-white">{title}</h3>
      <div className="flex items-center gap-3 text-slate-300">
        <Search size={18} />
        <Bell size={18} />
      </div>
    </div>
  )
}

function Feed() {
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-24">
      <Header title="Sphere" />
      {posts.map((p) => {
        const isLiked = liked[p.id]
        return (
          <div key={p.id} className="mb-3 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.grad}`} />
              <div className="flex-1 leading-tight">
                <p className="text-xs font-semibold text-white">{p.user}</p>
                <p className="flex items-center gap-1 text-[10px] text-slate-400">
                  <MapPin size={9} /> {p.place}
                </p>
              </div>
              {p.pulse && (
                <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[9px] font-semibold text-pink-300">
                  ● 24h pulse
                </span>
              )}
            </div>
            <div className={`mx-4 h-44 rounded-2xl bg-gradient-to-br ${p.grad}`} />
            <div className="flex items-center gap-4 px-4 pt-2 text-slate-300">
              <button
                onClick={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))}
                className="flex items-center gap-1 transition-transform active:scale-90"
              >
                <Heart
                  size={18}
                  className={isLiked ? 'fill-pink-500 text-pink-500' : ''}
                />
                <span className="text-xs">{p.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageSquare size={17} />
                <span className="text-xs">{p.comments}</span>
              </div>
            </div>
            <p className="px-4 pt-1 text-xs text-slate-300">
              <span className="font-semibold text-white">{p.user}</span> {p.caption}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const globePins = [
  { ...pins[0], λ: -22, φ: 28 },
  { ...pins[1], λ: 38, φ: -8 },
  { ...pins[2], λ: -48, φ: -18 },
]

function MapScreen() {
  const [selected, setSelected] = useState<(typeof pins)[number] | null>(null)

  const R = 80
  const cx = 100
  const cy = 100

  const project = (λDeg: number, φDeg: number) => {
    const λ = (λDeg * Math.PI) / 180
    const φ = (φDeg * Math.PI) / 180
    return {
      x: cx + R * Math.cos(φ) * Math.sin(λ),
      y: cy - R * Math.sin(φ),
      visible: Math.cos(φ) * Math.cos(λ) > 0,
    }
  }

  return (
    <div className="relative flex h-full flex-col pt-11">
      <div className="px-4 pb-1">
        <h3 className="text-lg font-extrabold text-white">Explore</h3>
        <p className="text-[11px] text-slate-400">See where people are connecting</p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative h-52 w-52">
          <div className="absolute inset-0 scale-110 rounded-full bg-violet-600/20 blur-2xl" />
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <radialGradient id="sGlobe" cx="38%" cy="32%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="60%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#0c0520" />
              </radialGradient>
              <radialGradient id="sShine" cx="32%" cy="28%">
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="55%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sRim" cx="50%" cy="50%">
                <stop offset="75%" stopColor="transparent" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.22" />
              </radialGradient>
              <clipPath id="sClip">
                <circle cx={cx} cy={cy} r={R} />
              </clipPath>
              <filter id="sDotGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx={cx} cy={cy} r={R} fill="url(#sGlobe)" />

            <g clipPath="url(#sClip)" fill="none" stroke="rgba(167,139,250,0.18)" strokeWidth="0.55">
              {[-60, -30, 0, 30, 60].map((lat) => {
                const rad = (lat * Math.PI) / 180
                const y = cy - R * Math.sin(rad)
                const rx = R * Math.cos(rad)
                return <ellipse key={lat} cx={cx} cy={y} rx={rx} ry={rx * 0.14} />
              })}
              {[30, 60].map((lon) => (
                <ellipse key={lon} cx={cx} cy={cy} rx={R * Math.sin((lon * Math.PI) / 180)} ry={R} />
              ))}
              <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} />
            </g>

            <circle cx={cx} cy={cy} r={R} fill="url(#sRim)" />
            <circle cx={cx} cy={cy} r={R} fill="url(#sShine)" />
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(167,139,250,0.35)" strokeWidth="1" />

            {globePins.map((pin) => {
              const { x, y, visible } = project(pin.λ, pin.φ)
              if (!visible) return null
              const isSelected = selected?.id === pin.id
              return (
                <g
                  key={pin.id}
                  filter="url(#sDotGlow)"
                  onClick={() => setSelected(isSelected ? null : pins.find((p) => p.id === pin.id) ?? null)}
                  className="cursor-pointer"
                >
                  <circle cx={x} cy={y} r={isSelected ? 9 : 6} fill="rgba(167,139,250,0.25)" />
                  <circle cx={x} cy={y} r={isSelected ? 5 : 3.5} fill="white" opacity="0.9" />
                  {isSelected && (
                    <circle cx={x} cy={y} r="12" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1" />
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="mx-auto mb-2 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300">
        📍 Near you · Valencia
      </div>

      {selected ? (
        <div className="mx-3 mb-24 rounded-2xl glass p-3">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${selected.grad}`} />
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{selected.name}</p>
              <p className="text-[11px] text-slate-400">{selected.count} people active now</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white"
            >
              View
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-3 mb-24 grid grid-cols-3 gap-2">
          {pins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setSelected(pin)}
              className="flex flex-col items-center gap-1 rounded-xl bg-white/[0.04] px-1 py-2"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${pin.grad} text-[10px] font-bold text-white`}
              >
                {pin.count}
              </div>
              <span className="text-center text-[9px] leading-tight text-slate-400">{pin.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function AddScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-12">
      <h3 className="text-lg font-extrabold text-white">New post</h3>
      <div className="mt-3 flex h-44 items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03]">
        <div className="text-center text-slate-400">
          <PlusSquare size={28} className="mx-auto" />
          <p className="mt-1 text-xs">Add a photo</p>
        </div>
      </div>
      <textarea
        placeholder="Write a caption…"
        className="mt-3 h-20 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
      />
      <button className="mt-2 flex items-center gap-2 self-start rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] text-slate-300">
        <MapPin size={12} /> Tag location
      </button>
      <label className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-slate-300">
        Make it a 24h pulse
        <span className="h-5 w-9 rounded-full bg-pink-500/30 p-0.5">
          <span className="block h-4 w-4 translate-x-4 rounded-full bg-pink-400" />
        </span>
      </label>
      <button className="mt-auto mb-24 rounded-xl bg-brand py-3 text-sm font-semibold text-white">
        Share
      </button>
    </div>
  )
}

function Chats() {
  return (
    <div className="h-full pt-1">
      <Header title="Messages" />
      <div className="px-2">
        {chats.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-xl px-2 py-2.5 active:bg-white/5">
            <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${c.grad}`} />
            <div className="flex-1 border-b border-white/5 pb-2.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <span className="text-[10px] text-slate-500">{c.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-xs text-slate-400">{c.msg}</p>
                {c.unread > 0 && (
                  <span className="ml-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Profile() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-24 pt-12">
      <div className="flex flex-col items-center px-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand to-accent" />
        <p className="mt-2 text-base font-bold text-white">Jaime · @jcandel</p>
        <p className="text-[11px] text-slate-400">Building places worth visiting 🌐</p>
        <div className="mt-3 flex w-full justify-around rounded-2xl glass py-2.5 text-center">
          {[
            ['48', 'Posts'],
            ['1.2k', 'Followers'],
            ['312', 'Following'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-sm font-bold text-white">{n}</p>
              <p className="text-[10px] text-slate-400">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1 px-1">
        {[
          'from-orange-400 to-pink-500',
          'from-emerald-400 to-teal-500',
          'from-violet-400 to-fuchsia-500',
          'from-sky-400 to-indigo-500',
          'from-rose-400 to-red-500',
          'from-amber-400 to-orange-500',
        ].map((g, i) => (
          <div key={i} className={`aspect-square rounded-md bg-gradient-to-br ${g}`} />
        ))}
      </div>
    </div>
  )
}

export function SphereDemo() {
  const [tab, setTab] = useState('map')
  return (
    <PhoneFrame>
      <PhoneStatusBar />
      <div className="h-full">
        {tab === 'feed' && <Feed />}
        {tab === 'map' && <MapScreen />}
        {tab === 'add' && <AddScreen />}
        {tab === 'chats' && <Chats />}
        {tab === 'profile' && <Profile />}
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab} accentClass="text-fuchsia-400" />
    </PhoneFrame>
  )
}
