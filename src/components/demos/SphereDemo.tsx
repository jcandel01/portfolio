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

/**
 * Simulated location-based social app. Photography is real (Picsum, seeded per
 * place so the same place always renders the same shot) rather than gradient
 * rectangles standing in for images.
 */

const photo = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const tabs: TabItem[] = [
  { key: 'feed', label: 'Feed', icon: Home },
  { key: 'map', label: 'Map', icon: MapIcon },
  { key: 'add', label: 'Add', icon: PlusSquare },
  { key: 'chats', label: 'Chats', icon: MessageCircle },
  { key: 'profile', label: 'Me', icon: User },
]

// Mock engagement counts.
const posts = [
  {
    id: 1,
    user: 'lucia.m',
    place: 'Marina Beach',
    seed: 'sphere-marina-beach',
    caption: 'Golden hour pulse, only here for 24h',
    likes: 128,
    comments: 14,
    pulse: true,
  },
  {
    id: 2,
    user: 'dani_runs',
    place: 'Turia Park',
    seed: 'sphere-turia-park',
    caption: 'Morning loop done. Anyone up for tomorrow?',
    likes: 67,
    comments: 8,
    pulse: false,
  },
  {
    id: 3,
    user: 'carla.art',
    place: 'Ruzafa Gallery',
    seed: 'sphere-ruzafa-gallery',
    caption: 'New exhibition opening tonight',
    likes: 203,
    comments: 31,
    pulse: false,
  },
]

const pins = [
  { id: 1, name: 'Marina Beach', seed: 'sphere-marina-beach', count: 12 },
  { id: 2, name: 'Turia Park', seed: 'sphere-turia-park', count: 7 },
  { id: 3, name: 'Ruzafa Gallery', seed: 'sphere-ruzafa-gallery', count: 24 },
]

const chats = [
  { id: 1, name: 'Lucía', msg: 'See you at the beach!', time: '2m', unread: 2, seed: 'sphere-lucia' },
  { id: 2, name: 'Dani', msg: 'Tomorrow 7am works', time: '1h', unread: 0, seed: 'sphere-dani' },
  { id: 3, name: 'Carla', msg: 'Thanks for coming!', time: '3h', unread: 0, seed: 'sphere-carla' },
]

function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-lg pb-xs pt-12">
      <h3 className="text-tagline font-display text-white">{title}</h3>
      <div className="flex items-center gap-sm text-white/60">
        <Search size={18} aria-hidden="true" />
        <Bell size={18} aria-hidden="true" />
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
          <div key={p.id} className="mb-sm border-b border-white/10 pb-sm">
            <div className="flex items-center gap-xs px-lg py-xs">
              <img
                src={photo(`${p.seed}-avatar`, 80, 80)}
                alt=""
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1 leading-tight">
                <p className="text-caption-strong text-white">{p.user}</p>
                <p className="flex items-center gap-1 text-micro-legal text-demo-sphere-muted">
                  <MapPin size={9} aria-hidden="true" /> {p.place}
                </p>
              </div>
              {p.pulse && (
                <span className="rounded-pill bg-demo-sphere-accent/25 px-2 py-0.5 text-micro-legal font-semibold text-white">
                  24h pulse
                </span>
              )}
            </div>
            <img
              src={photo(p.seed, 600, 440)}
              alt={p.place}
              width={600}
              height={440}
              loading="lazy"
              className="mx-lg h-44 w-[calc(100%-2*theme(spacing.lg))] rounded-lg object-cover"
            />
            <div className="flex items-center gap-lg px-lg pt-xs text-white/70">
              <button
                onClick={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                aria-pressed={isLiked}
                className="flex items-center gap-1 transition-transform active:scale-[0.9]"
              >
                <Heart
                  size={18}
                  className={isLiked ? 'fill-demo-sphere-accent text-demo-sphere-accent' : ''}
                />
                <span className="text-caption">{p.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageSquare size={17} aria-hidden="true" />
                <span className="text-caption">{p.comments}</span>
              </div>
            </div>
            <p className="px-lg pt-1 text-caption text-white/70">
              <span className="font-semibold text-white">{p.user}</span> {p.caption}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const globePins = [
  { ...pins[0], lon: -22, lat: 28 },
  { ...pins[1], lon: 38, lat: -8 },
  { ...pins[2], lon: -48, lat: -18 },
]

function MapScreen() {
  const [selected, setSelected] = useState<(typeof pins)[number] | null>(null)

  const R = 80
  const cx = 100
  const cy = 100

  const project = (lonDeg: number, latDeg: number) => {
    const lon = (lonDeg * Math.PI) / 180
    const lat = (latDeg * Math.PI) / 180
    return {
      x: cx + R * Math.cos(lat) * Math.sin(lon),
      y: cy - R * Math.sin(lat),
      visible: Math.cos(lat) * Math.cos(lon) > 0,
    }
  }

  return (
    <div className="relative flex h-full flex-col pt-11">
      <div className="px-lg pb-1">
        <h3 className="text-tagline font-display text-white">Explore</h3>
        <p className="text-fine-print text-demo-sphere-muted">See where people are connecting</p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="globe-shading relative h-52 w-52">
          <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Globe of active places">
            <defs>
              <radialGradient id="sGlobe" cx="38%" cy="32%">
                <stop offset="0%" stopColor="var(--globe-core)" />
                <stop offset="60%" stopColor="var(--globe-mid)" />
                <stop offset="100%" stopColor="var(--globe-edge)" />
              </radialGradient>
              <radialGradient id="sShine" cx="32%" cy="28%">
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="55%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <clipPath id="sClip">
                <circle cx={cx} cy={cy} r={R} />
              </clipPath>
            </defs>

            <circle cx={cx} cy={cy} r={R} fill="url(#sGlobe)" />

            <g clipPath="url(#sClip)" fill="none" className="stroke-white/20" strokeWidth="0.55">
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

            <circle cx={cx} cy={cy} r={R} fill="url(#sShine)" />
            <circle cx={cx} cy={cy} r={R} fill="none" className="stroke-white/30" strokeWidth="1" />

            {globePins.map((pin) => {
              const { x, y, visible } = project(pin.lon, pin.lat)
              if (!visible) return null
              const isSelected = selected?.id === pin.id
              return (
                <g
                  key={pin.id}
                  onClick={() => setSelected(isSelected ? null : pins.find((p) => p.id === pin.id) ?? null)}
                  className="cursor-pointer"
                >
                  <circle cx={x} cy={y} r={isSelected ? 9 : 6} className="fill-white/25" />
                  <circle cx={x} cy={y} r={isSelected ? 5 : 3.5} className="fill-white" />
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="mx-auto mb-xs flex items-center gap-1 rounded-pill bg-demo-sphere-raised px-sm py-1.5 text-fine-print font-semibold text-white/70">
        <MapPin size={11} aria-hidden="true" /> Near you, Valencia
      </div>

      {selected ? (
        <div className="mx-sm mb-24 rounded-lg bg-demo-sphere-raised p-sm">
          <div className="flex items-center gap-sm">
            <img
              src={photo(selected.seed, 120, 120)}
              alt={selected.name}
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-sm object-cover"
            />
            <div className="flex-1">
              <p className="text-caption-strong text-white">{selected.name}</p>
              <p className="text-fine-print text-demo-sphere-muted">{selected.count} people active now</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-sm bg-demo-sphere-accent px-sm py-1.5 text-fine-print font-semibold text-white active:scale-[0.95]"
            >
              View
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-sm mb-24 grid grid-cols-3 gap-xs">
          {pins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setSelected(pin)}
              className="flex flex-col items-center gap-1 rounded-sm bg-demo-sphere-raised px-1 py-xs active:scale-[0.95]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-demo-sphere-accent text-micro-legal font-semibold text-white">
                {pin.count}
              </span>
              <span className="text-center text-micro-legal leading-tight text-demo-sphere-muted">
                {pin.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function AddScreen() {
  return (
    <div className="flex h-full flex-col px-lg pt-12">
      <h3 className="text-tagline font-display text-white">New post</h3>
      <div className="mt-sm flex h-44 items-center justify-center rounded-lg border border-dashed border-white/20 bg-demo-sphere-raised">
        <div className="text-center text-demo-sphere-muted">
          <PlusSquare size={28} className="mx-auto" aria-hidden="true" />
          <p className="mt-1 text-caption">Add a photo</p>
        </div>
      </div>

      <label htmlFor="sphere-caption" className="mt-sm block text-micro-legal text-demo-sphere-muted">
        Caption
      </label>
      <textarea
        id="sphere-caption"
        className="mt-1 h-20 w-full resize-none rounded-sm border border-white/10 bg-demo-sphere-raised p-sm text-caption text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-demo-sphere-accent"
      />

      <button className="mt-xs flex items-center gap-xs self-start rounded-pill bg-demo-sphere-raised px-sm py-1.5 text-fine-print text-white/70 active:scale-[0.95]">
        <MapPin size={12} aria-hidden="true" /> Tag location
      </button>

      <label className="mt-sm flex items-center justify-between rounded-sm border border-white/10 bg-demo-sphere-raised px-sm py-2.5 text-caption text-white/70">
        Make it a 24h pulse
        <span className="h-5 w-9 rounded-pill bg-demo-sphere-accent p-0.5">
          <span className="block h-4 w-4 translate-x-4 rounded-full bg-white" />
        </span>
      </label>

      <button className="mb-24 mt-auto rounded-sm bg-demo-sphere-accent py-xs text-caption font-semibold text-white active:scale-[0.95]">
        Share
      </button>
    </div>
  )
}

function Chats() {
  return (
    <div className="h-full pt-1">
      <Header title="Messages" />
      <div className="px-xs">
        {chats.map((c) => (
          <div key={c.id} className="flex items-center gap-sm rounded-sm px-xs py-2.5">
            <img
              src={photo(`${c.seed}-avatar`, 88, 88)}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="flex-1 border-b border-white/10 pb-2.5">
              <div className="flex items-center justify-between">
                <p className="text-caption-strong text-white">{c.name}</p>
                <span className="text-micro-legal text-demo-sphere-muted">{c.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-caption text-demo-sphere-muted">{c.msg}</p>
                {c.unread > 0 && (
                  <span className="ml-2 flex h-4 min-w-4 items-center justify-center rounded-pill bg-demo-sphere-accent px-1 text-micro-legal font-semibold text-white">
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

// Mock profile counts.
const profileStats = [
  ['48', 'Posts'],
  ['1.2k', 'Followers'],
  ['312', 'Following'],
]

const gridSeeds = [
  'sphere-grid-albufera',
  'sphere-grid-ciutat',
  'sphere-grid-cabanyal',
  'sphere-grid-mercat',
  'sphere-grid-malvarrosa',
  'sphere-grid-jardi',
]

function Profile() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-24 pt-12">
      <div className="flex flex-col items-center px-lg">
        <img
          src={photo('sphere-jaime-avatar', 160, 160)}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-xs text-body-strong text-white">Jaime, @jcandel</p>
        <p className="text-fine-print text-demo-sphere-muted">Building places worth visiting</p>
        <div className="mt-sm flex w-full justify-around rounded-lg bg-demo-sphere-raised py-2.5 text-center">
          {profileStats.map(([n, l]) => (
            <div key={l}>
              <p className="text-caption-strong text-white">{n}</p>
              <p className="text-micro-legal text-demo-sphere-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-sm grid grid-cols-3 gap-1 px-1">
        {gridSeeds.map((seed) => (
          <img
            key={seed}
            src={photo(seed, 240, 240)}
            alt=""
            width={120}
            height={120}
            loading="lazy"
            className="aspect-square w-full rounded-sm object-cover"
          />
        ))}
      </div>
    </div>
  )
}

export function SphereDemo() {
  const [tab, setTab] = useState('map')
  return (
    <PhoneFrame screenClassName="bg-demo-sphere-bg">
      <PhoneStatusBar />
      <div className="h-full">
        {tab === 'feed' && <Feed />}
        {tab === 'map' && <MapScreen />}
        {tab === 'add' && <AddScreen />}
        {tab === 'chats' && <Chats />}
        {tab === 'profile' && <Profile />}
      </div>
      <TabBar
        tabs={tabs}
        active={tab}
        onChange={setTab}
        accentClass="text-demo-sphere-accent"
        surfaceClass="bg-demo-sphere-bg"
      />
    </PhoneFrame>
  )
}
