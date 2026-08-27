import type { LucideIcon } from 'lucide-react'

export interface TabItem {
  key: string
  label: string
  icon: LucideIcon
}

interface TabBarProps {
  tabs: TabItem[]
  active: string
  onChange: (key: string) => void
  /** Text color class for the active tab, e.g. 'text-demo-sphere-accent'. */
  accentClass?: string
  /** Background class for the bar. Solid, not frosted. */
  surfaceClass?: string
  inactiveClass?: string
}

/**
 * Bottom tab bar used inside the mobile demos. Solid surface rather than a
 * blurred translucent one: backdrop-filter is reserved for the site's sticky nav.
 */
export function TabBar({
  tabs,
  active,
  onChange,
  accentClass = 'text-white',
  surfaceClass = 'bg-surface-black',
  inactiveClass = 'text-white/40',
}: TabBarProps) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-white/10 px-2 pb-5 pt-2 ${surfaceClass}`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-sm py-1 transition-transform active:scale-[0.95] ${
              isActive ? accentClass : inactiveClass
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span className="text-micro-legal font-semibold">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
