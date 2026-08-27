import { profile } from '../../data/profile'
import { Tile } from '../ui/Tile'

/**
 * The one place in the system that is deliberately dense: link columns at
 * `dense-link` (17px / 2.41 leading), then a fine-print legal row.
 */
export function Footer() {
  return (
    <Tile variant="parchment" flush className="py-16">
      <footer className="container-grid">
        <div className="grid grid-cols-1 gap-lg sm:grid-cols-3">
          <div>
            <h2 className="text-caption-strong text-ink">Sections</h2>
            <ul className="text-dense-link">
              <li>
                <a href="#projects" className="link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="link">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="link">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="link">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-caption-strong text-ink">Elsewhere</h2>
            <ul className="text-dense-link">
              <li>
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="link">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="link">
                  CV (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-caption-strong text-ink">Contact</h2>
            <ul className="text-dense-link">
              <li>
                <a href={`mailto:${profile.email}`} className="link">
                  Get in touch
                </a>
              </li>
              <li className="text-ink-muted-80">{profile.location}</li>
            </ul>
          </div>
        </div>

        <p className="mt-xl border-t border-hairline pt-lg text-fine-print text-ink-muted-80">
          Copyright {new Date().getFullYear()} {profile.name}. Built with React, Vite and Tailwind CSS.
        </p>
      </footer>
    </Tile>
  )
}
