import { profile } from '../../data/profile'
import { Tile } from '../ui/Tile'
import { Reveal } from '../layout/Reveal'

/**
 * Editorial ledger: period on the left rail, role and detail on the right. One
 * hairline above each group instead of a border on every row, and no timeline
 * dots. The alignment does the work the old gradient rule was doing.
 */
export function Experience() {
  return (
    <Tile id="experience" variant="light">
      <div className="container-grid">
        <Reveal>
          <h2 className="font-display text-display-md">Where I have worked</h2>
        </Reveal>

        <div className="mt-xxl space-y-0">
          {profile.experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06}>
              <article className="grid grid-cols-1 gap-lg border-t border-hairline py-xl lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <p className="text-caption-strong text-ink-muted-80">{job.period}</p>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  <h3 className="text-tagline font-display">{job.company}</h3>
                  <p className="mt-xxs text-body text-ink-muted-80">{job.role}</p>
                  <ul className="mt-sm max-w-[65ch] space-y-xxs">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-body text-ink-muted-80">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-sm flex flex-wrap gap-xs">
                    {job.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-xxl">
          <h3 className="text-tagline font-display">Certifications</h3>
          <div className="mt-lg grid grid-cols-1 gap-lg sm:grid-cols-2">
            {profile.certifications.map((c) => (
              <div key={c.name} className="card-utility">
                <p className="text-body-strong">{c.name}</p>
                <p className="mt-xxs text-caption text-ink-muted-80">
                  {c.issuer}
                  {c.hours ? ` (${c.hours})` : ''}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Tile>
  )
}
