import { profile } from '../../data/profile'
import { Tile } from '../ui/Tile'
import { Reveal } from '../layout/Reveal'

/**
 * Editorial two-column: prose on the left at reading width, a meta rail on the
 * right offset downward. The offset is the taste layer's asymmetry allowance.
 */
export function About() {
  return (
    <Tile id="about" variant="parchment">
      <div className="container-grid grid grid-cols-1 gap-xl lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-display-md">{profile.tagline}</h2>
          <p className="mt-lg max-w-[65ch] text-body text-ink-muted-80">{profile.bio}</p>
          <p className="mt-lg">
            <a href={profile.cvUrl} className="link" target="_blank" rel="noreferrer">
              Download CV (PDF)
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:mt-xxl">
          <dl className="space-y-lg">
            <div>
              <dt className="text-caption-strong text-ink-muted-80">Based in</dt>
              <dd className="mt-xxs text-body">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-caption-strong text-ink-muted-80">Email</dt>
              <dd className="mt-xxs">
                <a href={`mailto:${profile.email}`} className="link break-all">
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.education.map((e) => (
              <div key={e.degree}>
                <dt className="text-caption-strong text-ink-muted-80">{e.period}</dt>
                <dd className="mt-xxs text-body">{e.degree}</dd>
                <dd className="text-caption text-ink-muted-80">{e.school}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Tile>
  )
}
