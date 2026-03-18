'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react'
import type { Account } from '@/data/accounts'
import { getPlaybookColor, getPlaybookLabel } from '@/lib/utils'

interface Props { account: Account }

export function Playbooks({ account }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const playbooks = account.playbooks
  const current = playbooks[currentIndex]

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }
  const prev = () => { if (currentIndex > 0) goTo(currentIndex - 1) }
  const next = () => { if (currentIndex < playbooks.length - 1) goTo(currentIndex + 1) }

  if (!current) {
    return (
      <div className="p-7 text-center text-zinc-600 text-sm">No playbooks available for this account.</div>
    )
  }

  const colors = getPlaybookColor(current.type)

  return (
    <div className="p-5 lg:p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">Recommended Playbooks</h3>
          <p className="text-sm text-zinc-500 mt-0.5">
            Context-aware playbooks built from {account.name}&apos;s current account state.
          </p>
        </div>
        {/* Pagination */}
        {playbooks.length > 1 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center text-zinc-500 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-zinc-600">{currentIndex + 1} / {playbooks.length}</span>
            <button
              onClick={next}
              disabled={currentIndex === playbooks.length - 1}
              className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center text-zinc-500 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Playbook card */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -32 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className={`rounded-2xl border ${colors.border} bg-gradient-to-b ${colors.bg} overflow-hidden`}
        >
          {/* Card header */}
          <div className={`px-6 py-5 border-b ${colors.border}`}>
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-9 h-9 rounded-xl bg-zinc-900/60 border ${colors.border} flex items-center justify-center`}>
                <BookOpen className={`w-4 h-4 ${colors.text}`} />
              </div>
              <div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${colors.badge}`}>
                  {getPlaybookLabel(current.type)}
                </span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-zinc-100 mt-3">{current.title}</h4>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{current.objective}</p>
          </div>

          <div className="p-6 grid lg:grid-cols-3 gap-6">
            {/* Steps */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Execution Steps</p>
              <div className="space-y-3">
                {current.steps.map((step) => (
                  <div key={step.step} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border ${colors.border} flex items-center justify-center flex-shrink-0 text-xs font-bold ${colors.text} bg-zinc-900/60 mt-0.5`}>
                      {step.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{step.action}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side: talking points + risks */}
            <div className="space-y-5">
              {/* Talking points */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className={`w-3.5 h-3.5 ${colors.text}`} />
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Talking Points</p>
                </div>
                <ul className="space-y-2.5">
                  {current.talkingPoints.map((tp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${colors.text}`} />
                      {tp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks to watch */}
              <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <p className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Risks to Watch</p>
                </div>
                <ul className="space-y-2">
                  {current.risksToWatch.map((risk, i) => (
                    <li key={i} className="text-xs text-zinc-500 leading-relaxed flex items-start gap-1.5">
                      <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-500" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Playbook type pills */}
      {playbooks.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {playbooks.map((pb, i) => {
            const c = getPlaybookColor(pb.type)
            return (
              <button
                key={pb.id}
                onClick={() => goTo(i)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  i === currentIndex ? c.badge : 'border-white/8 text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {getPlaybookLabel(pb.type)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
