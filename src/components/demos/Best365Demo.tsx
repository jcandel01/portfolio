import { useState } from 'react'
import { TrendingUp, Wallet, ChevronLeft, ArrowUpRight, Lock, CheckCircle2, LogOut } from 'lucide-react'
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

// Mock fixtures and mock figures. Illustrative of the real app's output shape,
// not real model predictions.
const bets: Bet[] = [
  { id: 1, match: 'Valencia vs Sevilla', league: 'LaLiga', pick: 'Over 2.5 goals', odds: 2.1, fair: 1.85, ev: 13.5, stake: 24 },
  { id: 2, match: 'Arsenal vs Chelsea', league: 'Premier League', pick: 'Arsenal win', odds: 1.95, fair: 1.78, ev: 9.6, stake: 18 },
  { id: 3, match: 'Bayern vs Dortmund', league: 'Bundesliga', pick: 'BTTS', odds: 1.72, fair: 1.6, ev: 7.5, stake: 14 },
  { id: 4, match: 'Inter vs Milan', league: 'Serie A', pick: 'Under 3.5', odds: 1.66, fair: 1.55, ev: 7.1, stake: 12 },
]

/** One accent, three luminance steps. EV tier is data, so it earns the variation. */
function evTone(ev: number) {
  if (ev >= 12) return 'text-demo-best365-accent'
  if (ev >= 9) return 'text-demo-best365-accent/80'
  return 'text-demo-best365-accent/60'
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex h-full flex-col justify-center px-lg pt-11">
      <div className="mx-auto mb-lg flex h-16 w-16 items-center justify-center rounded-lg bg-demo-best365-accent">
        <TrendingUp className="text-white" size={30} />
      </div>
      <h3 className="text-center text-tagline font-display text-white">best365</h3>
      <p className="mb-lg text-center text-fine-print text-demo-best365-muted">Value betting, quantified.</p>
      <label className="mb-1 block text-micro-legal text-demo-best365-muted" htmlFor="b365-email">
        Email
      </label>
      <input
        id="b365-email"
        defaultValue="jaime@best365.app"
        className="mb-sm w-full rounded-sm border border-white/10 bg-demo-best365-raised px-sm py-xs text-caption text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-demo-best365-accent"
      />
      <label className="mb-1 block text-micro-legal text-demo-best365-muted" htmlFor="b365-pass">
        Password
      </label>
      <div className="mb-lg flex items-center rounded-sm border border-white/10 bg-demo-best365-raised px-sm">
        <input
          id="b365-pass"
          type="password"
          defaultValue="demo1234"
          className="w-full bg-transparent py-xs text-caption text-white focus:outline-none"
        />
        <Lock size={15} className="text-demo-best365-muted" />
      </div>
      <button
        onClick={onLogin}
        className="w-full rounded-sm bg-demo-best365-accent py-xs text-caption font-semibold text-white active:scale-[0.95]"
      >
        Log in
      </button>
      <p className="mt-lg text-center text-micro-legal text-demo-best365-muted">
        Demo, any credentials work
      </p>
    </div>
  )
}

function BetList({ onSelect, onLogout }: { onSelect: (b: Bet) => void; onLogout: () => void }) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto px-lg pb-lg pt-12">
      {/* Bankroll card. Mock figures. */}
      <div className="rounded-lg bg-demo-best365-raised p-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-xs text-demo-best365-accent">
            <Wallet size={15} />
            <span className="text-fine-print font-semibold">Bankroll</span>
          </div>
          <button
            onClick={onLogout}
            aria-label="Log out"
            className="text-demo-best365-muted active:scale-[0.95] active:text-white"
          >
            <LogOut size={13} />
          </button>
        </div>
        <p className="mt-1 text-tagline font-display text-white">€1,284.50</p>
        <p className="flex items-center gap-1 text-fine-print font-semibold text-demo-best365-accent">
          <ArrowUpRight size={12} /> +8.4% this month
        </p>
      </div>

      <div className="mb-xs mt-lg flex items-center justify-between">
        <h3 className="text-caption-strong text-white">Today&apos;s value bets</h3>
        <span className="rounded-pill bg-white/5 px-2 py-0.5 text-micro-legal text-demo-best365-muted">
          {bets.length} found
        </span>
      </div>

      {bets.map((b) => (
        <button
          key={b.id}
          onClick={() => onSelect(b)}
          className="mb-xs w-full rounded-sm border border-white/10 bg-demo-best365-raised p-sm text-left transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <span className="text-micro-legal font-semibold text-demo-best365-muted">{b.league}</span>
            <span className={`text-fine-print font-semibold ${evTone(b.ev)}`}>+{b.ev}% EV</span>
          </div>
          <p className="mt-0.5 text-caption-strong text-white">{b.match}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-caption text-white/70">{b.pick}</span>
            <span className="rounded-sm bg-demo-best365-accent/20 px-2 py-0.5 text-caption font-semibold text-demo-best365-accent">
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
    <div className="flex h-full flex-col px-lg pb-lg pt-12">
      <button
        onClick={onBack}
        className="mb-sm flex items-center gap-1 text-caption text-demo-best365-muted active:scale-[0.95]"
      >
        <ChevronLeft size={15} /> Back
      </button>
      <span className="text-micro-legal font-semibold text-demo-best365-muted">{bet.league}</span>
      <h3 className="text-tagline font-display text-white">{bet.match}</h3>
      <div className="mt-1 inline-flex w-fit rounded-sm bg-demo-best365-accent/20 px-2 py-0.5 text-caption font-semibold text-demo-best365-accent">
        {bet.pick}
      </div>

      <div className="mt-lg grid grid-cols-2 gap-xs">
        {[
          ['Bookmaker odds', bet.odds.toFixed(2)],
          ['Model fair odds', bet.fair.toFixed(2)],
          ['Expected value', `+${bet.ev}%`],
          ['Suggested stake', `€${bet.stake}`],
        ].map(([l, v], i) => (
          <div key={i} className="rounded-sm border border-white/10 bg-demo-best365-raised p-sm">
            <p className="text-micro-legal text-demo-best365-muted">{l}</p>
            <p
              className={`text-caption-strong ${i === 2 ? 'text-demo-best365-accent' : 'text-white'}`}
            >
              {v}
            </p>
          </div>
        ))}
      </div>

      {/* Model edge. A bare bar with no filled background track: the number is
          the message, the bar is only a nudge. */}
      <div className="mt-lg">
        <div className="mb-1 flex justify-between text-micro-legal text-demo-best365-muted">
          <span>Market</span>
          <span>Model edge</span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div
            className="h-px bg-demo-best365-accent"
            style={{ width: `${Math.min(bet.ev * 5, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setPlaced(true)}
        disabled={placed}
        className={`mt-auto rounded-sm py-xs text-caption font-semibold text-white transition-transform ${
          placed ? 'bg-demo-best365-accent/40' : 'bg-demo-best365-accent active:scale-[0.95]'
        }`}
      >
        {placed ? (
          <span className="flex items-center justify-center gap-xs">
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
    <PhoneFrame screenClassName="bg-demo-best365-bg">
      <PhoneStatusBar />
      {screen === 'login' && <Login onLogin={() => setScreen('list')} />}
      {screen === 'list' && (
        <BetList
          onLogout={() => setScreen('login')}
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
