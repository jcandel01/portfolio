import { GraduationCap, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../layout/Reveal'

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="container-x grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 to-accent/20 blur-2xl" />
            {/* Avatar placeholder — drop your photo at public/avatar.jpg and swap the div for an <img> */}
            <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-accent text-6xl font-black text-white shadow-2xl">
              {profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-soft">About me</p>
          <h2 className="section-title">Developer who ships products end to end</h2>
          <p className="mt-4 whitespace-pre-line text-slate-300">{profile.bio}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="glass flex items-center gap-3 rounded-xl p-3">
              <MapPin className="text-brand-soft" size={18} />
              <span className="text-sm text-slate-300">{profile.location}</span>
            </div>
            <a href={`mailto:${profile.email}`} className="glass flex items-center gap-3 rounded-xl p-3 hover:border-white/30">
              <Mail className="text-brand-soft" size={18} />
              <span className="truncate text-sm text-slate-300">{profile.email}</span>
            </a>
          </div>

          {profile.education.length > 0 && (
            <div className="mt-4 space-y-2">
              {profile.education.map((e, i) => (
                <div key={i} className="glass flex items-start gap-3 rounded-xl p-3">
                  <GraduationCap className="mt-0.5 shrink-0 text-accent" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-white">{e.degree}</p>
                    <p className="text-xs text-slate-400">
                      {e.school}
                      {e.period ? ` · ${e.period}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
