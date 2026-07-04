import { useEffect, useRef } from 'react'

/**
 * Cielo espacial oscuro y estrellado, estático.
 * Se pinta una sola vez en un <canvas> fijo detrás de todo el contenido.
 * Ligero (sin cientos de box-shadows) y nítido en pantallas retina.
 */
export function Starfield({ density = 0.00025 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const count = Math.round(w * h * density)
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const r = Math.random() * 1.2 + 0.2 // tamaños variados => profundidad
        const alpha = Math.random() * 0.6 + 0.2

        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        // Estrellas ligeramente azuladas/blancas
        ctx.fillStyle = Math.random() > 0.85 ? '#a78bfa' : '#ffffff'
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    draw()
    // Repintar (redistribuye estrellas) al cambiar tamaño de ventana.
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
    />
  )
}
