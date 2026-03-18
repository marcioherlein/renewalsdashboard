'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquareWarning, Sparkles, CheckCircle2, Quote } from 'lucide-react'
import type { Account } from '@/data/accounts'
import { getLikelihoodColor, getLikelihoodLabel } from '@/lib/utils'

interface Props { account: Account }

export function ObjectionPredictor({ account }: Props) {
  const [expanded, setExpanded] = useState<string | null>(account.objections[0]?.id ?? null)

  return (
    <div className="p-5 lg:p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">Predicted Objections</h3>
          <p className="text-sm text-zinc-500 mt-0.5">
            Likely objections for {account.name} based on account signals and usage patterns.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/8 border border-blue-500/15 px-3 py-1 text-[11px] text-blue-400 font-medium flex-shrink-0">
          <Sparkles className="w-3 h-3" />
          AI Predicted
        </span>
      </div>

      {/* Objection cards */}
      <div className="space-y-3">
        {account.objections.map((obj, i) => {
          const isOpen = expanded === obj.id
          const barColor = getLikelihoodColor(obj.likelihood)
          const barLabel = getLikelihoodLabel(obj.likelihood)

          return (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-white/10 bg-zinc-800/40' : 'border-white/[0.05] bg-white/[0.02] hover:border-white/8'
              }`}
            >
              {/* Card header — always visible */}
              <button
                onClick={() => setExpanded(isOpen ? null : obj.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquareWarning className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-200 mb-2">
                      &ldquo;{obj.title}&rdquo;
                    </p>
                    {/* Likelihood bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${obj.likelihood}%` }}
                          transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                          className={`h-full rounded-full ${barColor}`}
                        />
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 tabular-nums flex-shrink-0">
                        {obj.likelihood}%
                      </span>
                      <span className="text-[10px] text-zinc-600 flex-shrink-0">{barLabel}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.05] pt-4 space-y-5">
                      {/* Why this objection */}
                      <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
                        <Quote className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-zinc-600 font-medium mb-1 uppercase tracking-wider">Why This May Come Up</p>
                          <p className="text-sm text-zinc-400 leading-relaxed">{obj.reason}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Talking points */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Recommended Talking Points</p>
                          </div>
                          <ul className="space-y-2">
                            {obj.talkingPoints.map((point, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                                <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-500" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Proof points */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Supporting Proof Points</p>
                          </div>
                          <ul className="space-y-2">
                            {obj.proofPoints.map((point, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-2 text-xs text-zinc-700">
        <Sparkles className="w-3 h-3" />
        Predictions are based on usage signals, support history, engagement patterns, and similar account outcomes.
      </div>
    </div>
  )
}
