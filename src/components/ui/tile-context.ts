import { createContext, useContext } from 'react'

/**
 * Lets descendants of a <Tile> pick the right blue: Action Blue (#0066cc) on
 * light surfaces, Sky Link Blue (#2997ff) on dark tiles.
 *
 * Lives in its own module so Tile.tsx only exports components (react-refresh).
 */
export const OnDarkContext = createContext(false)

export function useOnDark() {
  return useContext(OnDarkContext)
}
