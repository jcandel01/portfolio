
export type DemoKey = 'sphere' | 'best365' | 'ideatracker' | 'storyforge' | 'ecovecinos'
export type FrameKind = 'phone' | 'browser'

export interface Project {
  key: DemoKey
  name: string
  subtitle: string
  description: string
  tech: string[]
  features: string[]
  frame: FrameKind
  accent: string // tailwind gradient classes for accents
  links?: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    key: 'sphere',
    name: 'Sphere',
    subtitle: 'Location-based social network',
    description:
      'A social app built around a live map of places and ephemeral events. Users share geotagged posts, follow each other, chat in real time and discover spots near them, powered by a recommendation layer.',
    tech: ['React Native', 'Expo Router', 'Supabase', 'Mapbox', 'Zustand', 'PostgreSQL'],
    features: [
      'Interactive map of places & 24h "pulse" posts',
      'Photo feed with likes and comments',
      'Real-time direct messages and notifications',
      'Follows, profiles and privacy controls',
    ],
    frame: 'phone',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    key: 'best365',
    name: 'best365',
    subtitle: 'Football value-betting & bankroll',
    description:
      'A data product that scrapes football odds from multiple bookmaker APIs, runs several AI models in consensus to estimate fair probabilities, and surfaces +EV betting opportunities with bankroll management built in. A Python backend orchestrates the scraping, model inference and API calls; results are stored in Supabase and consumed by the mobile app.',
    tech: ['React Native', 'Expo', 'Supabase', 'Python', 'GitHub Actions', 'AI Models', 'REST APIs'],
    features: [
      'Multi-model AI consensus to estimate fair odds and detect value',
      'Automated odds scraper hitting bookmaker APIs on a schedule',
      'Value bets ranked by expected value (EV%) with stake suggestions',
      'Bankroll tracker with full bet history and market vs. model comparison',
    ],
    frame: 'phone',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'ideatracker',
    name: 'IdeaTracker',
    subtitle: 'Spatial thinking canvas',
    description:
      'A spatial note-taking app where ideas live as nodes on an infinite "constellation" canvas. Branch ideas into children or bridge unrelated ones with quantum links — a more visual way to think.',
    tech: ['React Native', 'Expo', 'Supabase', 'Zustand', 'TypeScript'],
    features: [
      'Infinite pan & zoom constellation canvas',
      'Draggable idea nodes with mass & luminance',
      'Branch to create child ideas',
      'Bridge to link unrelated nodes',
    ],
    frame: 'phone',
    accent: 'from-sky-500 to-indigo-500',
  },
  {
    key: 'ecovecinos',
    name: 'EcoVecinos',
    subtitle: 'Gamified neighborhood recycling platform',
    description:
      'Web app developed as a Final Degree Project (TFG) for residential communities to track and gamify recycling. Residents photograph waste items and a custom AI pipeline — combining YOLO Mask instance segmentation, a C-RNN classifier and a generative AI model — identifies the object and determines the correct recycling container. A points-based leaderboard creates friendly competition between neighbors.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'YOLO Mask', 'C-RNN', 'Generative AI'],
    features: [
      'YOLO Mask + C-RNN + Generative AI pipeline for object detection and classification',
      'AI validates which recycling container the item belongs to',
      'Points system with neighborhood leaderboard',
      'Daily impact tracker showing kg recycled per day',
    ],
    frame: 'browser',
    accent: 'from-green-500 to-emerald-500',
  },
  {
    key: 'storyforge',
    name: 'Storyforge',
    subtitle: 'Writing workspace for novelists',
    description:
      'An editorial workspace for long-form fiction. Combines a scene-focused editor with a global narrative timeline, an event catalog and per-character arcs so authors can keep complex stories coherent.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Chapter & scene navigation for long drafts',
      'Scene editor linked to narrative events',
      'Global timeline ordering story beats',
      'Character profiles with individual arcs',
    ],
    frame: 'browser',
    accent: 'from-amber-500 to-orange-500',
  },
]
