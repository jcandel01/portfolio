import { Briefcase } from 'lucide-react'
import { profile } from '../../data/profile'
import { Reveal } from '../layout/Reveal'

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <div className="container-x">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-soft">Career</p>
          <h2 className="section-title">Experience</h2>
        </Reveal>

        <div className="relative mt-10">
          {/* Timeline vertical line */}
          <div className="absolute bottom-3 left-0 top-3 hidden w-px bg-gradient-to-b from-brand/60 via-accent/30 to-transparent sm:block" />

          <div className="space-y-5 sm:pl-8">
            {profile.experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08}>
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.125rem] top-[1.1rem] hidden h-3 w-3 rounded-full border-2 border-brand bg-ink-950 sm:block" />

                  <div className="glass rounded-2xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-accent/20">
                          <Briefcase size={16} className="text-brand-soft" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{job.role}</h3>
                          <p className="text-sm font-medium text-brand-soft">{job.company}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                        {job.period}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span key={s} className="chip text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
