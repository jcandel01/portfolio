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
  accentClass?: string // text color class for active tab, e.g. 'text-violet-400'
}

/**
 * Bottom tab bar used inside mobile demos.
 */
export function TabBar({ tabs, active, onChange, accentClass = 'text-brand-soft' }: TabBarProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-white/10 bg-black/60 px-2 pb-5 pt-2 backdrop-blur-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 transition-colors ${
              isActive ? accentClass : 'text-slate-500'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span className="text-[9px] font-medium">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
