import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { Reveal } from '../layout/Reveal'

function LanguageBar({ name, level, pct, flag, delay }: {
  name: string; level: string; pct: number; flag: string; delay: number
}) {
  const [fill, setFill] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFill(pct), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pct, delay])

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="text-xl">{flag}</span>
      <div className="flex-1">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-sm font-bold text-white">{name}</span>
          <span className="text-xs text-slate-400">{level}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-700 ease-out"
            style={{ width: `${fill}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <div className="container-x">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-soft">Stack</p>
          <h2 className="section-title">Skills & technologies</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-5">
                <h3 className="mb-3 text-sm font-bold text-white">{group.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Languages */}
        <Reveal delay={0.2}>
          <div className="glass mt-5 rounded-2xl p-6">
            <h3 className="mb-5 text-sm font-bold text-white">Languages</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {profile.languages.map((lang, i) => (
                <LanguageBar key={lang.name} {...lang} delay={i * 120} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
