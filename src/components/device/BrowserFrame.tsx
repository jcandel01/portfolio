import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  url?: string
}

/**
 * A desktop browser frame. Like PhoneFrame this is a product render: it rests on
 * the tile surface and carries `shadow-product`. Traffic-light dots are the one
 * sanctioned use of colored dots in the system (they are real macOS chrome, not
 * decoration).
 */
export function BrowserFrame({ children, url = 'storyforge.app' }: BrowserFrameProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl select-none">
      <div className="overflow-hidden rounded-lg bg-canvas shadow-product">
        {/* Title bar */}
        <div className="flex items-center gap-xs border-b border-hairline bg-canvas-parchment px-lg py-sm">
          <span className="h-3 w-3 rounded-full bg-traffic-close" />
          <span className="h-3 w-3 rounded-full bg-traffic-min" />
          <span className="h-3 w-3 rounded-full bg-traffic-max" />
          <div className="ml-sm flex-1">
            <div className="mx-auto w-full max-w-xs truncate rounded-sm bg-canvas px-sm py-1 text-center text-fine-print text-ink-muted-48">
              {url}
            </div>
          </div>
        </div>
        {/* Viewport */}
        <div className="h-[460px] overflow-hidden bg-canvas">{children}</div>
      </div>
    </div>
  )
}
