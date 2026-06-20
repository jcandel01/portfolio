import { useState } from 'react'
import {
  TrendingUp,
  Wallet,
  ChevronLeft,
  ArrowUpRight,
  Lock,
  CheckCircle2,
} from 'lucide-react'
import { PhoneFrame, PhoneStatusBar } from '../device/PhoneFrame'

interface Bet {
  id: number
  match: string
  league: string
  pick: string
  odds: number
  fair: number
  ev: number
  stake: number
}

const bets: Bet[] = [
  { id: 1, match: 'Valencia — Sevilla', league: 'LaLiga', pick: 'Over 2.5 goals', odds: 2.1, fair: 1.85, ev: 13.5, stake: 24 },
  { id: 2, match: 'Arsenal — Chelsea', league: 'Premier League', pick: 'Arsenal win', odds: 1.95, fair: 1.78, ev: 9.6, stake: 18 },
  { id: 3, match: 'Bayern — Dortmund', league: 'Bundesliga', pick: 'BTTS', odds: 1.72, fair: 1.6, ev: 7.5, stake: 14 },
  { id: 4, match: 'Inter — Milan', league: 'Serie A', pick: 'Under 3.5', odds: 1.66, fair: 1.55, ev: 7.1, stake: 12 },
]

function evColor(ev: number) {
  if (ev >= 12) return 'text-emerald-400'
  if (ev >= 9) return 'text-teal-400'
  return 'text-lime-400'
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex h-full flex-col justify-center px-6 pt-11">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500">
        <TrendingUp className="text-white" size={30} />
      </div>
      <h3 className="text-center text-xl font-extrabold text-white">best365</h3>
      <p className="mb-6 text-center text-xs text-slate-400">Value betting, quantified.</p>
      <input
        defaultValue="jaime@best365.app"
        className="mb-3 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 focus:outline-none"
      />
      <div className="mb-4 flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-4">
        <input
          type="password"
          defaultValue="demo1234"
          className="w-full bg-transparent py-3 text-sm text-slate-200 focus:outline-none"
        />
        <Lock size={15} className="text-slate-500" />
      </div>
      <button
        onClick={onLogin}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white active:scale-[0.98]"
      >
        Log in
      </button>
      <p className="mt-4 text-center text-[10px] text-slate-500">Demo — any credentials work</p>
    </div>
  )
}

function BetList({ onSelect }: { onSelect: (b: Bet) => void }) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto px-4 pb-6 pt-12">
      {/* Bankroll card */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600/30 to-teal-600/20 p-4 ring-1 ring-emerald-400/20">
        <div className="flex items-center gap-2 text-emerald-300">
          <Wallet size={15} />
          <span className="text-[11px] font-medium">Bankroll</span>
        </div>
        <p className="mt-1 text-2xl font-extrabold text-white">€1,284.50</p>
        <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <ArrowUpRight size={12} /> +8.4% this month
        </p>
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Today&apos;s value bets</h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
          {bets.length} found
        </span>
      </div>

      {bets.map((b) => (
        <button
          key={b.id}
          onClick={() => onSelect(b)}
          className="mb-2 w-full rounded-xl border border-white/8 bg-white/[0.03] p-3 text-left transition-colors active:bg-white/[0.06]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-500">{b.league}</span>
            <span className={`text-[11px] font-bold ${evColor(b.ev)}`}>+{b.ev}% EV</span>
          </div>
          <p className="mt-0.5 text-sm font-semibold text-white">{b.match}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-slate-300">{b.pick}</span>
            <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
              {b.odds.toFixed(2)}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

function BetDetail({ bet, onBack }: { bet: Bet; onBack: () => void }) {
  const [placed, setPlaced] = useState(false)
  return (
    <div className="flex h-full flex-col px-4 pb-6 pt-12">
      <button onClick={onBack} className="mb-3 flex items-center gap-1 text-xs text-slate-400">
        <ChevronLeft size={15} /> Back
      </button>
      <span className="text-[10px] font-medium text-slate-500">{bet.league}</span>
      <h3 className="text-lg font-extrabold text-white">{bet.match}</h3>
      <div className="mt-1 inline-flex w-fit rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
        {bet.pick}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ['Bookmaker odds', bet.odds.toFixed(2)],
          ['Model fair odds', bet.fair.toFixed(2)],
          ['Expected value', `+${bet.ev}%`],
          ['Suggested stake', `€${bet.stake}`],
        ].map(([l, v], i) => (
          <div key={i} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] text-slate-500">{l}</p>
            <p className={`text-base font-bold ${i === 2 ? 'text-emerald-400' : 'text-white'}`}>{v}</p>
          </div>
        ))}
      </div>

      {/* edge bar */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[10px] text-slate-500">
          <span>Market</span>
          <span>Model edge</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            style={{ width: `${Math.min(bet.ev * 5, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setPlaced(true)}
        disabled={placed}
        className={`mt-auto rounded-xl py-3 text-sm font-semibold text-white transition-all ${
          placed ? 'bg-emerald-600/40' : 'bg-gradient-to-r from-emerald-500 to-teal-500 active:scale-[0.98]'
        }`}
      >
        {placed ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> Added to bet slip
          </span>
        ) : (
          `Add €${bet.stake} bet`
        )}
      </button>
    </div>
  )
}

export function Best365Demo() {
  const [screen, setScreen] = useState<'login' | 'list' | 'detail'>('list')
  const [bet, setBet] = useState<Bet | null>(null)

  return (
    <PhoneFrame screenClassName="bg-ink-950">
      <PhoneStatusBar />
      {screen === 'login' && <Login onLogin={() => setScreen('list')} />}
      {screen === 'list' && (
        <BetList
          onSelect={(b) => {
            setBet(b)
            setScreen('detail')
          }}
        />
      )}
      {screen === 'detail' && bet && <BetDetail bet={bet} onBack={() => setScreen('list')} />}
    </PhoneFrame>
  )
}
