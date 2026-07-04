import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { Starfield } from '../effects/Starfield'

gsap.registerPlugin(ScrollTrigger)

/**
 * Intro "salida del hiperespacio" con tres vídeos encadenados por scroll:
 *
 *  1. Entrada: el vídeo de la NAVE ocupa toda la pantalla (100vh).
 *  2. Al deslizar: entra el vídeo de TRANSICIÓN (crossfade) mientras la nave se aleja.
 *  3. Al llegar a los proyectos: la transición cede paso al vídeo FINAL (Untitled),
 *     que queda fijo de fondo mientras se ven los proyectos y lo demás.
 *
 * Cada vídeo se reproduce solo cuando empieza a aparecer (ni antes ni después),
 * y se pausa/reinicia si rebobinas. El scroll está ligado a la página (scrub).
 */
export function HyperspaceIntro({
  children,
  overlay,
}: {
  children?: ReactNode
  /** Contenido mostrado sobre la nave al inicio (p. ej. tu About). */
  overlay?: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<HTMLVideoElement>(null)
  const finalRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Arranca el vídeo justo al aparecer; lo pausa y reinicia al rebobinar.
    const lazyPlay = (ref: RefObject<HTMLVideoElement | null>) => ({
      onStart: () => ref.current?.play(),
      onReverseComplete: () => {
        const v = ref.current
        if (v) {
          v.pause()
          v.currentTime = 0
        }
      },
    })

    // gsap.context scopea los selectores string a `root` y permite
    // limpiar todo (timelines + ScrollTriggers) con un solo revert().
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Sin animación: dejamos visible el vídeo final de fondo y el contenido.
        gsap.set(['.hs-video', '.hs-transition'], { autoAlpha: 0 })
        gsap.set('.hs-final', { autoAlpha: 1 })
        gsap.set('.hs-content', { autoAlpha: 1, clearProps: 'transform' })
        finalRef.current?.play()
        return
      }

      // Las capas de fondo arrancan ocultas y pausadas.
      gsap.set(['.hs-transition', '.hs-final'], { autoAlpha: 0 })

      // --- Viaje anclado ---
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.hs-stage',
            start: 'top top',
            end: '+=260%', // longitud del "viaje"
            scrub: 1, // ligado a la barra de scroll
            pin: true, // ancla la escena mientras dura el efecto
            anticipatePin: 1,
          },
        })
        // 1) Zoom de la nave hacia el centro
        .to('.hs-video', { scale: 2, ease: 'power2.in' }, 0)
        // El About (sobre la nave) se desvanece al empezar a deslizar
        .to('.hs-intro', { autoAlpha: 0, y: -50, ease: 'power1.in', duration: 0.25 }, 0)
        // 2) Entra la TRANSICIÓN (empieza a reproducirse aquí)
        .to('.hs-transition', { autoAlpha: 1, ease: 'power1.out', duration: 0.2, ...lazyPlay(transitionRef) }, 0.32)
        .to('.hs-transition', { scale: 1.1, ease: 'power1.out' }, 0.32)
        // La nave se desvanece dejando ver la transición
        .to('.hs-video', { autoAlpha: 0, ease: 'power1.out', duration: 0.2 }, 0.42)
        // 3) La transición cede paso al vídeo FINAL (crossfade)
        .to(
          '.hs-transition',
          {
            autoAlpha: 0,
            ease: 'power1.out',
            duration: 0.2,
            onComplete: () => transitionRef.current?.pause(), // libera CPU al ocultarse
            onReverseComplete: () => transitionRef.current?.play(),
          },
          0.72,
        )
        // El FINAL entra y se reproduce justo cuando empieza a verse
        .to('.hs-final', { autoAlpha: 1, ease: 'power1.out', duration: 0.2, ...lazyPlay(finalRef) }, 0.72)
        // El indicador de scroll desaparece pronto
        .to('.hs-hint', { autoAlpha: 0, duration: 0.1 }, 0.04)

      // --- Entrada elegante del contenido, encima del vídeo final ---
      gsap.from('.hs-content', {
        autoAlpha: 0,
        y: 90,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hs-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* Fondo estrellado fijo, presente detrás de todo desde el inicio */}
      <Starfield />

      {/* Vídeo FINAL: fondo fijo sobre el que se ven los proyectos y lo demás.
          Detrás de la transición; se reproduce solo al empezar a aparecer. */}
      <video
        ref={finalRef}
        className="hs-final pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover opacity-0"
        src="/Untitled.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Vídeo de TRANSICIÓN: fondo fijo intermedio, encima del final.
          Sin autoPlay: se reproduce solo cuando empieza a aparecer. */}
      <video
        ref={transitionRef}
        className="hs-transition pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover opacity-0 will-change-transform"
        src="/ahora_quiero_que_me_generes_un.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Escena que se ancla (pin) durante el efecto */}
      <section className="hs-stage relative h-screen w-full overflow-hidden">
        <video
          className="hs-video absolute inset-0 h-full w-full object-cover will-change-transform"
          src="/haz_que_las_rallas_blancas_se.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Scrim para legibilidad del About sobre el vídeo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/50 via-ink-950/30 to-ink-950/80" />

        {/* About superpuesto sobre la nave */}
        {overlay && (
          <div className="hs-intro absolute inset-0 z-10 flex items-center overflow-y-auto">
            <div className="w-full">{overlay}</div>
          </div>
        )}

        <div className="hs-hint absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-300">
          <span className="text-xs uppercase tracking-[0.25em]">Scroll to jump</span>
          <ArrowDown className="animate-bounce" size={20} />
        </div>
      </section>

      {/* Contenido revelado, encima del vídeo final */}
      <div className="hs-content relative">{children}</div>
    </div>
  )
}
