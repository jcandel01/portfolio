import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  url?: string
}


export function BrowserFrame({ children, url = 'storyforge.app' }: BrowserFrameProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl select-none">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-amber-500/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-ink-900 shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-3 flex-1">
            <div className="mx-auto w-full max-w-xs truncate rounded-md bg-black/30 px-3 py-1 text-center text-[11px] text-slate-400">
              {url}
            </div>
          </div>
        </div>
        {/* Viewport */}
        <div className="h-[460px] overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
