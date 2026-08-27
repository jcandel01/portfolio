import { motion } from 'framer-motion'
import { Activity, Boxes, Crosshair, Cpu, MapPin, Route, Satellite } from 'lucide-react'
import { BrowserFrame } from '../device/BrowserFrame'

const detections = [
  { label: 'landing marker', confidence: 0.94, x: '68%', y: '26%' },
  { label: 'gate frame', confidence: 0.89, x: '28%', y: '62%' },
  { label: 'safe corridor', confidence: 0.91, x: '58%', y: '70%' },
]

const telemetry = [
  ['ROS2 graph', '11 nodes'],
  ['NetVLAD match', '0.87'],
  ['YOLO fps', '31.4'],
  ['Mission', 'AUTO'],
]

function Drone() {
  return (
    <motion.div
      className="absolute left-[18%] top-[42%] z-20 h-20 w-20"
      animate={{
        x: [0, 92, 182, 258, 198, 92, 0],
        y: [0, -56, -20, 42, 104, 74, 0],
        rotate: [0, 6, -5, 8, -4, 5, 0],
      }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-7 w-9 -translate-x-1/2 -translate-y-1/2 rounded-md bg-demo-drone-accent shadow-[0_0_30px_rgba(79,143,153,0.45)]" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-white/50" />
      <div className="absolute left-1/2 top-1/2 h-16 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-white/50" />
      {[
        ['left-0 top-0', 0],
        ['right-0 top-0', 0.2],
        ['bottom-0 left-0', 0.35],
        ['bottom-0 right-0', 0.55],
      ].map(([position, delay]) => (
        <motion.span
          key={position}
          className={`absolute ${position} h-6 w-6 rounded-full border-2 border-demo-drone-trace/80 bg-demo-drone-bg/80`}
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ rotate: { duration: 0.45, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.4, delay: Number(delay), repeat: Infinity } }}
        >
          <span className="absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-demo-drone-trace" />
        </motion.span>
      ))}
    </motion.div>
  )
}

export function RosDroneDemo() {
  return (
    <BrowserFrame url="ros2-drone.local/mission">
      <div className="grid h-full grid-cols-[1fr_210px] bg-demo-drone-bg text-white max-sm:grid-cols-1">
        <main className="relative overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute left-[12%] top-[24%] h-64 w-[72%] rounded-[42%] border border-demo-drone-accent/30" />
          <div className="absolute left-[23%] top-[34%] h-44 w-[58%] rounded-[45%] border border-demo-drone-trace/20" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 460" fill="none" aria-hidden="true">
            <path
              d="M112 245 C188 128 274 158 336 206 C402 258 512 220 538 338 C447 398 281 350 176 300 C138 282 118 264 112 245Z"
              stroke="#d6b465"
              strokeWidth="3"
              strokeDasharray="8 10"
              opacity="0.78"
            />
            <path d="M98 255 L176 300 L336 206 L538 338" stroke="#4f8f99" strokeWidth="2" opacity="0.45" />
          </svg>

          {detections.map((detection) => (
            <div
              key={detection.label}
              className="absolute z-10 w-28 rounded-sm border border-demo-drone-trace/80 bg-demo-drone-bg/75 p-1.5 text-micro-legal backdrop-blur"
              style={{ left: detection.x, top: detection.y }}
            >
              <span className="flex items-center gap-1 font-semibold text-demo-drone-trace">
                <Crosshair size={10} aria-hidden="true" />
                YOLO {Math.round(detection.confidence * 100)}%
              </span>
              <span className="mt-0.5 block truncate text-demo-drone-muted">{detection.label}</span>
            </div>
          ))}

          <Drone />

          <div className="absolute left-lg top-lg z-30 rounded-lg border border-white/10 bg-demo-drone-raised/90 p-sm backdrop-blur">
            <p className="flex items-center gap-xs text-caption-strong text-white">
              <Satellite size={15} className="text-demo-drone-accent" aria-hidden="true" />
              Autonomous ROS2 mission
            </p>
            <p className="mt-1 text-fine-print text-demo-drone-muted">Visual relocalization active</p>
          </div>

          <div className="absolute bottom-lg left-lg right-lg z-30 grid grid-cols-4 gap-xs max-sm:grid-cols-2">
            {telemetry.map(([label, value]) => (
              <div key={label} className="rounded-sm border border-white/10 bg-demo-drone-raised/90 p-sm backdrop-blur">
                <p className="text-micro-legal text-demo-drone-muted">{label}</p>
                <p className="mt-1 text-caption-strong text-white">{value}</p>
              </div>
            ))}
          </div>
        </main>

        <aside className="flex flex-col bg-demo-drone-raised p-lg max-sm:hidden">
          <div className="flex items-center gap-xs text-demo-drone-accent">
            <Cpu size={15} aria-hidden="true" />
            <span className="text-fine-print font-semibold">Perception stack</span>
          </div>

          <div className="mt-lg space-y-sm">
            {[
              ['Camera topic', '/front/image_raw', Activity],
              ['Place match', 'hangar-east-04', MapPin],
              ['Route planner', '7 waypoints', Route],
              ['Detector', 'YOLO scene cues', Boxes],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-sm bg-demo-drone-bg p-sm">
                <p className="flex items-center gap-xs text-micro-legal text-demo-drone-muted">
                  <Icon size={12} className="text-demo-drone-accent" aria-hidden="true" />
                  {label as string}
                </p>
                <p className="mt-1 text-caption-strong text-white">{value as string}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-sm border border-demo-drone-accent/35 bg-demo-drone-accent/10 p-sm">
            <p className="text-micro-legal text-demo-drone-muted">Localization confidence</p>
            <div className="mt-xs h-1.5 overflow-hidden rounded-pill bg-demo-drone-bg">
              <motion.div
                className="h-full rounded-pill bg-demo-drone-accent"
                animate={{ width: ['68%', '91%', '84%', '94%', '76%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="mt-xs text-caption-strong text-white">Stable lock</p>
          </div>
        </aside>
      </div>
    </BrowserFrame>
  )
}
