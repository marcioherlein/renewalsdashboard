'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'
import { accounts } from '@/data/accounts'
import { formatCurrency, getScenarioClass, getScenarioLabel, getHealthColor } from '@/lib/utils'

interface AccountSelectorProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function AccountSelector({ selectedId, onSelect }: AccountSelectorProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = accounts.find(a => a.id === selectedId) ?? accounts[0]

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 rounded-xl border border-white/8 bg-zinc-900/80 hover:bg-zinc-800/80 px-4 py-2.5 transition-all duration-200"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ backgroundColor: `${getHealthColor(selected.healthScore)}20`, border: `1px solid ${getHealthColor(selected.healthScore)}30` }}
        >
          <span style={{ color: getHealthColor(selected.healthScore) }}>{selected.initials}</span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-semibold text-zinc-100 leading-none">{selected.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{formatCurrency(selected.arr)} · {selected.brief.daysUntilRenewal}d to renewal</p>
        </div>
        <span className={`hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${getScenarioClass(selected.scenario)}`}>
          {getScenarioLabel(selected.scenario)}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-white/8 bg-zinc-900/95 backdrop-blur-xl shadow-glass z-50 overflow-hidden">
          <div className="p-2 border-b border-white/[0.05]">
            <p className="text-[11px] text-zinc-600 font-medium uppercase tracking-wider px-3 py-2">Select Account</p>
          </div>
          <div className="p-2 max-h-80 overflow-y-auto">
            {accounts.map(account => {
              const healthColor = getHealthColor(account.healthScore)
              const isSelected = account.id === selectedId
              return (
                <button
                  key={account.id}
                  onClick={() => { onSelect(account.id); setOpen(false) }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150 ${
                    isSelected ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-white/4 border border-transparent'
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: `${healthColor}15`, border: `1px solid ${healthColor}25` }}
                  >
                    <span style={{ color: healthColor }}>{account.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-zinc-100 truncate">{account.name}</p>
                      <span className={`flex-shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${getScenarioClass(account.scenario)}`}>
                        {getScenarioLabel(account.scenario)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-zinc-500">{formatCurrency(account.arr)}</span>
                      <span className="text-[11px] text-zinc-600">{account.brief.daysUntilRenewal}d</span>
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: healthColor }}>
                        <Building2 className="w-2.5 h-2.5" />
                        {account.healthScore}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
