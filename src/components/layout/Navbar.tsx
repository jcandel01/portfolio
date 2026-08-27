import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'
import { Github, Linkedin } from '../icons/Brand'

/**
 * Two rows, per DESIGN.md: a 44px true-black global nav pinned to the top, and a
 * 52px frosted sub-nav sticking below it with a persistent primary CTA.
 */

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40">
      {/* global-nav: the only place pure black appears */}
      <div className="h-nav-global bg-surface-black">
        <div className="container-grid flex h-full items-center justify-between">
          <a
            href="#top"
            className="text-nav-link text-on-dark/80 transition-opacity duration-150 active:opacity-60"
          >
            {profile.name}
          </a>
          <div className="flex items-center gap-lg">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-on-dark/80 transition-opacity duration-150 active:opacity-60"
            >
              <Github size={14} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-on-dark/80 transition-opacity duration-150 active:opacity-60"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* sub-nav-frosted */}
      <div className="frosted">
        <div className="container-grid flex h-nav-sub items-center justify-between">
          <a href="#top" className="text-tagline text-ink">
            Portfolio
          </a>

          <div className="hidden items-center gap-xl lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-button-utility text-ink transition-opacity duration-150 active:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
              >
                {l.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="btn-primary">
              Get in touch
            </a>
          </div>

          {/* Collapses to a tray at 833px, keeping the primary CTA visible */}
          <div className="flex items-center gap-sm lg:hidden">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              Get in touch
            </a>
            <button
              type="button"
              className="rounded-sm p-1 text-ink active:scale-[0.95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-hairline bg-canvas-parchment px-lg pb-lg lg:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-sm text-body text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
