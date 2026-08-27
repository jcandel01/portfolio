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
    <Tile id="top" variant="light" flush className="min-h-[680px] overflow-hidden pb-section pt-xxl sm:min-h-[720px]">
      <img
        src="/hero-photo.jpg"
        alt="Jaime Candel overlooking a mountain landscape at sunrise"
        className="absolute inset-0 h-full w-full object-cover object-[63%_50%] sm:object-[70%_50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/45 to-white/0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/55 to-transparent" />

      <div className="container-grid relative z-10 grid grid-cols-1 gap-lg lg:grid-cols-12">
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
