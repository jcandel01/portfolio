import type { ReactNode } from 'react'
import { OnDarkContext } from './tile-context'

/**
 * The central primitive of the system. Sections are full-bleed tiles with no
 * radius, no border and no shadow. The background color change IS the section
 * divider (DESIGN.md, "Elevation & Depth").
 */

export type TileVariant = 'light' | 'parchment' | 'dark' | 'dark-2' | 'dark-3'

const SURFACE: Record<TileVariant, string> = {
  light: 'bg-canvas text-ink',
  parchment: 'bg-canvas-parchment text-ink',
  dark: 'bg-surface-tile-1 text-on-dark',
  'dark-2': 'bg-surface-tile-2 text-on-dark',
  'dark-3': 'bg-surface-tile-3 text-on-dark',
}

const DARK_VARIANTS: TileVariant[] = ['dark', 'dark-2', 'dark-3']

interface TileProps {
  children: ReactNode
  variant?: TileVariant
  id?: string
  className?: string
  /** Escape hatch for tiles that manage their own vertical rhythm (nav, footer). */
  flush?: boolean
}

export function Tile({ children, variant = 'light', id, className = '', flush = false }: TileProps) {
  const isDark = DARK_VARIANTS.includes(variant)
  const padding = flush ? '' : 'py-section-tight sm:py-section'
  // Grain is the taste layer, dark tiles only. See CLAUDE.md.
  const grain = isDark ? 'grain' : ''

  return (
    <OnDarkContext.Provider value={isDark}>
      <section id={id} className={`relative rounded-none ${SURFACE[variant]} ${padding} ${grain} ${className}`}>
        {children}
      </section>
    </OnDarkContext.Provider>
  )
}
