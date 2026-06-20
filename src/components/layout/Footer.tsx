import { Mail } from 'lucide-react'
import { Github, Linkedin } from '../icons/Brand'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind.
        </p>
        <div className="flex items-center gap-3">
          {profile.links.github && (
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="GitHub">
              <Github size={18} />
            </a>
          )}
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="hover:text-white" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
