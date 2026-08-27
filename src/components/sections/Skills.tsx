import { profile } from '../../data/profile'
import { Tile } from '../ui/Tile'
import { Reveal } from '../layout/Reveal'

/**
 * Dark tile, so the surface change carries the divider into the footer. Groups
 * are separated by hairlines and alignment, not cards: five boxed cards would be
 * chrome the system does not need.
 *
 * Language proficiency is stated, not bar-charted. A filled progress track is
 * dashboard clutter on a portfolio.
 */
export function Skills() {
  return (
    <Tile id="skills" variant="dark">
      <div className="container-grid">
        <Reveal>
          <h2 className="font-display text-display-md">Stack</h2>
        </Reveal>

        <div className="mt-xxl grid grid-cols-1 gap-x-xl gap-y-xl md:grid-cols-2 xl:grid-cols-3">
          {profile.skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <h3 className="text-caption-strong text-body-muted">{group.group}</h3>
              <ul className="mt-sm flex flex-wrap gap-xs">
                {group.items.map((item) => (
                  <li key={item} className="chip-on-dark">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <h3 className="text-caption-strong text-body-muted">Languages</h3>
            <ul className="mt-sm space-y-xxs">
              {profile.languages.map((l) => (
                <li key={l.name} className="text-body">
                  {l.name}
                  <span className="text-body-muted"> ({l.level})</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Tile>
  )
}
