import { useState, useEffect } from 'react'
import { BrowserFrame } from '../device/BrowserFrame'

const containers = [
  { name: 'Amarillo', desc: 'Envases plásticos', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', btn: 'bg-yellow-400', icon: '🟡', object: 'botella de plástico' },
  { name: 'Verde',    desc: 'Vidrio',            bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  btn: 'bg-green-500',  icon: '🟢', object: 'botella de vidrio' },
  { name: 'Azul',    desc: 'Papel y Cartón',     bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   btn: 'bg-blue-500',   icon: '🔵', object: 'caja de cartón' },
  { name: 'Marrón',  desc: 'Orgánico',           bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', btn: 'bg-orange-500', icon: '🟤', object: 'cáscara de naranja' },
]

type Container = typeof containers[number]
type Stage = 'upload' | 'analyzing' | 'done'

const activity = [
  { id: 1, item: 'Botella de plástico', container: 'Amarillo', correct: true,  date: '20 jun' },
  { id: 2, item: 'Caja de cartón',      container: 'Azul',     correct: true,  date: '20 jun' },
  { id: 3, item: 'Lata de refresco',    container: 'Marrón',   correct: false, date: '19 jun' },
]

function HomeScreen({ onOpen }: { onOpen: (c: Container) => void }) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-[#f6f8f6] pb-6 font-sans text-[#1E293B]">
      <header className="flex items-center justify-between border-b border-slate-100 bg-white px-5 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-400 bg-yellow-200 text-sm font-black text-green-800">
            JC
          </div>
          <div>
            <h2 className="text-sm font-black text-[#1E293B]">¡Hola, Jaime!</h2>
            <p className="text-[11px] font-bold text-green-500">✪ 1.284 Puntos</p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base">🔔</div>
      </header>

      <div className="space-y-5 px-5 pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-green-100 bg-[#F0FDF4] p-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-green-300">Tu impacto hoy</p>
            <p className="text-2xl font-black text-green-800">2.3 kg</p>
            <p className="mt-0.5 text-[11px] font-medium text-green-600">Histórico total: 48.6 kg</p>
          </div>
          <span className="text-3xl">🍃</span>
        </div>

        <div>
          <h3 className="mb-3 text-base font-black text-[#1E293B]">Registra tu reciclaje</h3>
          <div className="grid grid-cols-2 gap-3">
            {containers.map((c) => (
              <div key={c.name} className={`${c.bg} flex flex-col items-center rounded-2xl border-2 ${c.border} p-4 text-center`}>
                <span className="mb-1 text-3xl">{c.icon}</span>
                <h4 className={`text-sm font-black ${c.text}`}>{c.name}</h4>
                <p className="mb-3 text-[10px] text-gray-400">{c.desc}</p>
                <button
                  onClick={() => onOpen(c)}
                  className={`rounded-xl px-3 py-1.5 text-[10px] font-black text-white transition-all ${c.btn} hover:brightness-110`}
                >
                  📸 Añadir Foto
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-end justify-between">
            <h3 className="text-base font-black text-[#1E293B]">Actividad Reciente</h3>
            <span className="text-xs font-bold text-green-500">Ver todo</span>
          </div>
          <div className="space-y-2">
            {activity.map((log) => (
              <div key={log.id} className={`flex items-center gap-3 rounded-xl border-l-4 bg-white p-3 ${log.correct ? 'border-green-400' : 'border-red-400'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${log.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                  {log.correct ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-black ${log.correct ? 'text-green-700' : 'text-red-600'}`}>
                    {log.correct ? '¡Acierto! +1 punto' : 'Fallo −1 punto'}
                  </p>
                  <p className="text-[10px] text-gray-400">{log.item} · Contenedor {log.container}</p>
                </div>
                <span className="text-[10px] text-gray-400">{log.date}</span>
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

  useEffect(() => {
    if (stage !== 'analyzing') return
    setProgress(0)
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
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [stage])

  return (
    <div className="flex h-full flex-col bg-white font-sans text-[#1E293B]">
      <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700 hover:bg-green-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <h2 className="font-bold text-[#1E293B]">Escáner IA</h2>
        <div className="h-9 w-9" />
      </header>

      <div className="flex flex-1 flex-col overflow-hidden px-4 py-3">
        {/* Camera zone */}
        <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border-4 border-green-200 bg-[#f8faf8]">
          {stage === 'upload' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-white p-4 text-green-500 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="currentColor">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 4h3l2-2h6l2 2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-500">Contenedor {container.name} {container.icon}</p>
              <button
                onClick={() => setStage('analyzing')}
                className="rounded-full bg-green-500 px-6 py-2 text-sm font-bold text-white shadow hover:brightness-105"
              >
                Simular análisis
              </button>
            </div>
          )}

          {stage === 'analyzing' && (
            <>
              <img src="/yolo-demo.png" alt="Analizando" className="absolute inset-0 h-full w-full object-contain opacity-60" />
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-green-600 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                PROCESANDO...
              </div>
            </>
          )}

          {stage === 'done' && (
            <>
              <img src="/yolo-demo.png" alt="Resultado YOLO" className="absolute inset-0 h-full w-full object-contain" />
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-[10px] font-bold text-white">
                DETECTADO
              </div>
            </>
          )}
        </div>

        {/* Analyzing progress */}
        {stage === 'analyzing' && (
          <div className="mt-3 space-y-1.5">
            <p className="text-sm font-semibold text-slate-600">La IA está pensando...</p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Result */}
        {stage === 'done' && (
          <div className="mt-3 flex flex-1 flex-col">
            <div className="text-center">
              <h3 className="text-lg font-extrabold text-[#1E293B]">¡Objeto detectado!</h3>
              <p className="text-sm capitalize text-slate-400">{container.object}</p>
            </div>
            <div className="mt-3 flex flex-col items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
              <div className="rounded-full bg-green-200 p-2 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="currentColor">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p className="text-2xl font-black text-green-700">+1 Punto</p>
              <p className="text-xs text-green-600">¡Contenedor correcto!</p>
            </div>
            <div className="mt-auto space-y-2 pt-3">
              <button onClick={onBack} className="w-full rounded-xl bg-green-500 py-3 text-sm font-bold text-white">
                Continuar al Inicio
              </button>
              <button onClick={() => setStage('upload')} className="w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600">
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
      {screen === 'home'
        ? <HomeScreen onOpen={openScanner} />
        : <ScannerScreen container={activeContainer!} onBack={() => setScreen('home')} />
      }
    </BrowserFrame>
  )
}
