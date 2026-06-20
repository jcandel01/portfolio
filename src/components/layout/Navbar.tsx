import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : ''
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-accent text-sm">
            JC
          </span>
          <span className="hidden sm:block">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a href={profile.cvUrl} download className="btn-primary ml-2 px-4 py-2 text-xs">
            <Download size={14} /> CV
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-5 py-3 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.cvUrl}
            download
            className="btn-primary mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            <Download size={14} /> Download CV
          </a>
        </div>
      )}
    </header>
  )
}
