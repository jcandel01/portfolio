import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { Github, Linkedin } from '../icons/Brand'
import { profile } from '../../data/profile'

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-float rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 animate-float rounded-full bg-accent/10 blur-3xl [animation-delay:2s]" />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="chip mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for work
          </span>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m {profile.name.split(' ')[0]}.
            <br />
            <span className="gradient-text">{profile.title}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">{profile.tagline}</p>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin size={15} /> {profile.location}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View projects <ArrowDown size={16} />
            </a>
            <a href={profile.cvUrl} download className="btn-ghost">
              <Download size={16} /> Download CV
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              {profile.links.github && (
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5 hover:text-white" aria-label="GitHub">
                  <Github size={20} />
                </a>
              )}
              {profile.links.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5 hover:text-white" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="rounded-lg p-2.5 text-slate-300 hover:bg-white/5 hover:text-white" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white"
        aria-label="Scroll down"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </a>
    </section>
  )
}
