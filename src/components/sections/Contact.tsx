import { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { Github, Linkedin } from '../icons/Brand'
import { profile } from '../../data/profile'
import { Reveal } from '../layout/Reveal'

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="container-x">
        <div className="glass overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-soft">
                Contact
              </p>
              <h2 className="section-title">Let&apos;s build something</h2>
              <p className="mt-3 text-slate-300">
                Have a role, a project or just want to say hi? Drop me a message and I&apos;ll get
                back to you.
              </p>

              <div className="mt-6 space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white">
                  <Mail size={18} className="text-brand-soft" /> {profile.email}
                </a>
                {profile.links.github && (
                  <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white">
                    <Github size={18} className="text-brand-soft" /> GitHub
                  </a>
                )}
                {profile.links.linkedin && (
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white">
                    <Linkedin size={18} className="text-brand-soft" /> LinkedIn
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-8 text-center">
                  <CheckCircle2 className="text-emerald-400" size={40} />
                  <p className="mt-3 font-semibold text-white">Thanks for reaching out!</p>
                  <p className="text-sm text-slate-400">I&apos;ll reply to you soon.</p>
                </div>
              ) : (
                /* Netlify Forms: works automatically once deployed to Netlify */
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={(e) => {
                    // Let Netlify handle it in production; show success state in dev.
                    if (import.meta.env.DEV) {
                      e.preventDefault()
                      setSent(true)
                    }
                  }}
                  className="space-y-3"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-brand/50 focus:outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-brand/50 focus:outline-none"
                  />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-brand/50 focus:outline-none"
                  />
                  <button type="submit" className="btn-primary w-full">
                    <Send size={16} /> Send message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
