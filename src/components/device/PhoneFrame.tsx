import type { ReactNode } from 'react'

interface PhoneFrameStatusProps {
  /** Color of the status bar text/icons */
  dark?: boolean
}

export function PhoneStatusBar({ dark = false }: PhoneFrameStatusProps) {
  const color = dark ? 'text-slate-900' : 'text-white'
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-6 pt-1 text-[11px] font-semibold ${color}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        {/* signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* battery */}
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
          <rect x="21.5" y="3.5" width="1.8" height="5" rx="1" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    </div>
  )
}

interface PhoneFrameProps {
  children: ReactNode
  /** Background of the screen behind content (defaults to dark) */
  screenClassName?: string
}

/**
 * A reusable iPhone-style frame. Renders children inside a fixed-aspect
 * screen with a notch and home indicator. Demos provide their own status bar.
 */
export function PhoneFrame({ children, screenClassName = 'bg-ink-900' }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[300px] max-w-full select-none">
      {/* Glow */}
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand/20 blur-3xl" />
      {/* Body */}
      <div className="rounded-[2.8rem] border border-white/15 bg-gradient-to-b from-zinc-800 to-zinc-900 p-2.5 shadow-2xl shadow-black/60">
        {/* Screen */}
        <div
          className={`relative h-[620px] w-full overflow-hidden rounded-[2.3rem] ${screenClassName}`}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-30 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />
          {children}
          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  )
}
