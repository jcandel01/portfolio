import { useState, useEffect } from 'react'
import { ArrowLeft, Bell, Camera, Check, CheckCircle2, Leaf, X } from 'lucide-react'
import { BrowserFrame } from '../device/BrowserFrame'

/**
 * Simulated Valencian municipal recycling app. The UI copy stays in Spanish on
 * purpose: it is realism, not an inconsistency (see CLAUDE.md).
 *
 * The four bin colors are semantic data (real Spanish container colors), which is
 * why this demo is allowed more than one hue. They are rendered as swatches
 * rather than emoji.
 */

const containers = [
  { name: 'Amarillo', desc: 'Envases plásticos', swatch: 'bg-demo-eco-bin-yellow', object: 'botella de plástico' },
  { name: 'Verde', desc: 'Vidrio', swatch: 'bg-demo-eco-bin-green', object: 'botella de vidrio' },
  { name: 'Azul', desc: 'Papel y cartón', swatch: 'bg-demo-eco-bin-blue', object: 'caja de cartón' },
  { name: 'Marrón', desc: 'Orgánico', swatch: 'bg-demo-eco-bin-brown', object: 'cáscara de naranja' },
]

type Container = (typeof containers)[number]
type Stage = 'upload' | 'analyzing' | 'done'

const activity = [
  { id: 1, item: 'Botella de plástico', container: 'Amarillo', correct: true, date: '20 jun' },
  { id: 2, item: 'Caja de cartón', container: 'Azul', correct: true, date: '20 jun' },
  { id: 3, item: 'Lata de refresco', container: 'Marrón', correct: false, date: '19 jun' },
]

function HomeScreen({ onOpen }: { onOpen: (c: Container) => void }) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-demo-eco-bg pb-lg text-demo-eco-ink">
      <header className="flex items-center justify-between border-b border-hairline bg-demo-eco-raised px-lg pb-sm pt-lg">
        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-demo-eco-accent text-caption-strong text-white">
            JC
          </div>
          <div>
            <h2 className="text-caption-strong">¡Hola, Jaime!</h2>
            <p className="text-fine-print font-semibold text-demo-eco-accent">1.284 puntos</p>
          </div>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-demo-eco-bg text-demo-eco-muted">
          <Bell size={15} aria-hidden="true" />
        </span>
      </header>

      <div className="space-y-lg px-lg pt-lg">
        {/* Mock impact figures. */}
        <div className="flex items-center justify-between rounded-lg border border-hairline bg-demo-eco-raised p-lg">
          <div>
            <p className="text-micro-legal font-semibold uppercase tracking-widest text-demo-eco-muted">
              Tu impacto hoy
            </p>
            <p className="text-tagline font-display text-demo-eco-accent">2.3 kg</p>
            <p className="mt-0.5 text-fine-print text-demo-eco-muted">Histórico total: 48.6 kg</p>
          </div>
          <Leaf size={28} className="text-demo-eco-accent" aria-hidden="true" />
        </div>

        <div>
          <h3 className="mb-sm text-body-strong">Registra tu reciclaje</h3>
          <div className="grid grid-cols-2 gap-sm">
            {containers.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-start rounded-lg border border-hairline bg-demo-eco-raised p-sm"
              >
                <span className={`h-5 w-5 rounded-full ${c.swatch}`} aria-hidden="true" />
                <h4 className="mt-xs text-caption-strong">{c.name}</h4>
                <p className="text-micro-legal text-demo-eco-muted">{c.desc}</p>
                <button
                  onClick={() => onOpen(c)}
                  className="mt-xs inline-flex items-center gap-1 rounded-sm bg-demo-eco-accent px-2 py-1 text-micro-legal font-semibold text-white active:scale-[0.95]"
                >
                  <Camera size={11} aria-hidden="true" /> Añadir foto
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-sm flex items-end justify-between">
            <h3 className="text-body-strong">Actividad reciente</h3>
            <button className="text-caption font-semibold text-demo-eco-accent active:scale-[0.95]">
              Ver todo
            </button>
          </div>
          <div className="space-y-xs">
            {activity.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-sm rounded-sm border border-hairline bg-demo-eco-raised p-sm"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    log.correct ? 'bg-demo-eco-accent text-white' : 'bg-demo-eco-bg text-demo-eco-muted'
                  }`}
                >
                  {log.correct ? <Check size={14} /> : <X size={14} />}
                </span>
                <div className="flex-1">
                  <p className="text-caption-strong">
                    {log.correct ? '¡Acierto! +1 punto' : 'Fallo, −1 punto'}
                  </p>
                  <p className="text-micro-legal text-demo-eco-muted">
                    {log.item}, contenedor {log.container}
                  </p>
                </div>
                <span className="text-micro-legal text-demo-eco-muted">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScannerScreen({ container, onBack }: { container: Container; onBack: () => void }) {
  const [stage, setStage] = useState<Stage>('upload')
  const [progress, setProgress] = useState(0)

  // Progress is reset by the transition that starts the run, not inside the
  // effect, so the effect only owns the timers.
  const startAnalysis = () => {
    setProgress(0)
    setStage('analyzing')
  }

  const restart = () => {
    setProgress(0)
    setStage('upload')
  }

  useEffect(() => {
    if (stage !== 'analyzing') return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 4
      })
    }, 50)
    const timeout = setTimeout(() => setStage('done'), 1500)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [stage])

  return (
    <div className="flex h-full flex-col bg-demo-eco-raised text-demo-eco-ink">
      <header className="flex items-center justify-between border-b border-hairline px-lg py-sm">
        <button
          onClick={onBack}
          aria-label="Volver"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-demo-eco-bg text-demo-eco-accent active:scale-[0.95]"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-body-strong">Escáner IA</h2>
        <div className="h-9 w-9" />
      </header>

      <div className="flex flex-1 flex-col overflow-hidden px-lg py-sm">
        {/* Camera zone */}
        <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-lg border border-hairline bg-demo-eco-bg">
          {stage === 'upload' && (
            <div className="flex flex-col items-center gap-sm text-center">
              <span className="rounded-full bg-demo-eco-raised p-lg text-demo-eco-accent">
                <Camera size={36} aria-hidden="true" />
              </span>
              <p className="flex items-center gap-xs text-caption text-demo-eco-muted">
                Contenedor {container.name}
                <span className={`h-3 w-3 rounded-full ${container.swatch}`} aria-hidden="true" />
              </p>
              <button
                onClick={startAnalysis}
                className="rounded-pill bg-demo-eco-accent px-lg py-xs text-caption font-semibold text-white active:scale-[0.95]"
              >
                Simular análisis
              </button>
            </div>
          )}

          {stage !== 'upload' && (
            <>
              <img
                src="/yolo-demo.webp"
                alt="Segmentación YOLO del objeto fotografiado"
                width={1400}
                height={1050}
                className={`absolute inset-0 h-full w-full object-contain ${
                  stage === 'analyzing' ? 'opacity-60' : ''
                }`}
              />
              <div className="absolute right-3 top-3 rounded-pill bg-demo-eco-accent px-sm py-1 text-micro-legal font-semibold uppercase tracking-wide text-white">
                {stage === 'analyzing' ? 'Procesando' : 'Detectado'}
              </div>
            </>
          )}
        </div>

        {/* Determinate progress. Real loading feedback, not a comparison bar. */}
        {stage === 'analyzing' && (
          <div className="mt-sm space-y-1.5">
            <p className="text-caption text-demo-eco-muted">La IA está pensando...</p>
            <div
              className="h-1 overflow-hidden rounded-pill bg-demo-eco-bg"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso del análisis"
            >
              <div
                className="h-full rounded-pill bg-demo-eco-accent transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Result */}
        {stage === 'done' && (
          <div className="mt-sm flex flex-1 flex-col">
            <div className="text-center">
              <h3 className="text-body-strong">¡Objeto detectado!</h3>
              <p className="text-caption capitalize text-demo-eco-muted">{container.object}</p>
            </div>
            <div className="mt-sm flex flex-col items-center gap-xs rounded-lg border border-hairline bg-demo-eco-bg p-lg text-center">
              <CheckCircle2 size={26} className="text-demo-eco-accent" aria-hidden="true" />
              <p className="text-tagline font-display text-demo-eco-accent">+1 punto</p>
              <p className="text-caption text-demo-eco-muted">¡Contenedor correcto!</p>
            </div>
            <div className="mt-auto space-y-xs pt-sm">
              <button
                onClick={onBack}
                className="w-full rounded-sm bg-demo-eco-accent py-xs text-caption font-semibold text-white active:scale-[0.95]"
              >
                Continuar al inicio
              </button>
              <button
                onClick={restart}
                className="w-full rounded-sm border border-demo-eco-accent py-xs text-caption font-semibold text-demo-eco-accent active:scale-[0.95]"
              >
                Subir otra foto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function EcoVecinosDemo() {
  const [screen, setScreen] = useState<'home' | 'scanner'>('home')
  const [activeContainer, setActiveContainer] = useState<Container | null>(null)

  const openScanner = (c: Container) => {
    setActiveContainer(c)
    setScreen('scanner')
  }

  return (
    <BrowserFrame url={screen === 'home' ? 'ecovecinos.app' : 'ecovecinos.app/analisis'}>
      {screen === 'home' ? (
        <HomeScreen onOpen={openScanner} />
      ) : (
        <ScannerScreen container={activeContainer!} onBack={() => setScreen('home')} />
      )}
    </BrowserFrame>
  )
}
