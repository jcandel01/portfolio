import { Check } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import { Tile } from '../ui/Tile'
import { useOnDark } from '../ui/tile-context'
import type { TileVariant } from '../ui/Tile'
import { Reveal } from '../layout/Reveal'
import { demoComponents } from '../demos'

/**
 * Product tiles. These stay centered and symmetric: DESIGN.md owns this
 * structure, so the taste layer's asymmetry allowance does not apply here.
 *
 * The tile rhythm repeats deliberately. The alternating surface color is the
 * section divider, which is the whole point of the Apple tile system.
 */

const RHYTHM: TileVariant[] = ['dark', 'light', 'dark-2', 'parchment', 'dark-3']

function ProjectBody({ project }: { project: Project }) {
  const onDark = useOnDark()
  const Demo = demoComponents[project.key]

  const muted = onDark ? 'text-body-muted' : 'text-ink-muted-80'
  const chip = onDark ? 'chip-on-dark' : 'chip'
  // Action Blue disappears on a near-black tile: switch to Sky Link Blue.
  const accent = onDark ? 'text-primary-on-dark' : 'text-primary'

  return (
    <div className="container-grid">
      <Reveal className="mx-auto max-w-prose text-center">
        <h3 className="font-display text-display-md sm:text-display-lg">{project.name}</h3>
        <p className={`mt-sm text-lead-airy sm:text-lead ${muted}`}>{project.subtitle}</p>
        <p className={`mx-auto mt-lg max-w-[65ch] text-body ${muted}`}>{project.description}</p>
      </Reveal>

      {/* Each demo brings its own device frame and URL. The frame is the product
          render resting on the tile surface: the one place shadow lives. */}
      <Reveal delay={0.08} className="mt-xxl flex justify-center">
        <Demo />
      </Reveal>

      <Reveal delay={0.12} className="mx-auto mt-xxl max-w-prose">
        <p className={`text-caption-strong ${muted}`}>Try it above. It is running, not a screenshot.</p>
        <ul className="mt-lg grid grid-cols-1 gap-sm sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-xs">
              <Check size={16} className={`mt-1 shrink-0 ${accent}`} aria-hidden="true" />
              <span className={`text-body ${muted}`}>{f}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-lg flex flex-wrap gap-xs">
          {project.tech.map((t) => (
            <li key={t} className={chip}>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

export function Projects() {
  return (
    <div id="projects">
      {projects.map((project, i) => (
        <Tile key={project.key} variant={RHYTHM[i % RHYTHM.length]}>
          <ProjectBody project={project} />
        </Tile>
      ))}
    </div>
  )
}
