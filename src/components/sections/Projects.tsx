import { Check, Hand, ExternalLink } from 'lucide-react'
import { projects } from '../../data/projects'
import { demoComponents } from '../demos'
import { Reveal } from '../layout/Reveal'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <div className="container-x">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-soft">Work</p>
          <h2 className="section-title">Projects you can actually try</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Each project below ships with a live, interactive demo. Tap around the screens — it&apos;s
            a hands-on preview of the real apps, no install required.
          </p>
        </Reveal>

        <div className="mt-14 space-y-24">
          {projects.map((project, i) => {
            const Demo = demoComponents[project.key]
            const reversed = i % 2 === 1
            return (
              <div
                key={project.key}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                  reversed ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Info */}
                <Reveal>
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className={`inline-block h-10 w-1.5 rounded-full bg-gradient-to-b ${project.accent}`}
                      />
                      <div>
                        <h3 className="text-2xl font-extrabold text-white">{project.name}</h3>
                        <p className="text-sm text-slate-400">{project.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-slate-300">{project.description}</p>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1.5 text-xs font-semibold text-brand-soft">
                        <Hand size={14} /> Interactive demo — try it
                      </span>
                      {project.links?.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white"
                        >
                          {link.label} <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Demo */}
                <Reveal delay={0.1} className="flex justify-center">
                  <Demo />
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
