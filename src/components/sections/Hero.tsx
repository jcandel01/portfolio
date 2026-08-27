import { profile } from '../../data/profile'
import { Tile } from '../ui/Tile'
import { Button } from '../ui/Button'

/**
 * Three text elements only: name, role, actions. The asymmetric left-aligned
 * composition (content in 7 of 12 columns, the rest deliberate air) is the taste
 * layer's variance allowance for editorial sections. Product tiles stay centered.
 */
export function Hero() {
  return (
    <Tile id="top" variant="light" flush className="pb-section pt-xxl">
      <div className="container-grid grid grid-cols-1 gap-lg lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-display-md font-display sm:text-display-lg xl:text-hero-display">
            {profile.name}
          </h1>
          <p className="mt-lg max-w-[24ch] text-lead-airy text-ink-muted-80 sm:text-lead">
            {profile.title}
          </p>
          <div className="mt-xl flex flex-wrap items-center gap-sm">
            <Button href="#projects">View projects</Button>
            <Button href={`mailto:${profile.email}`} variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </Tile>
  )
}
