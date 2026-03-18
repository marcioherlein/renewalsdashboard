'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileText, Users, Wrench, CheckCircle2, Sparkles } from 'lucide-react'
import type { Account } from '@/data/accounts'
import { getImpactClass, getUrgencyClass, getUrgencyLabel } from '@/lib/utils'

interface Props { account: Account }

const categoryIcon: Record<string, React.ElementType> = {
  meeting: Calendar,
  content: FileText,
  engagement: Users,
  internal: Wrench,
}

const categoryLabel: Record<string, string> = {
  meeting: 'Schedule Meeting',
  content: 'Send Content',
  engagement: 'Engagement',
  internal: 'Internal Action',
}

export function NextBestAction({ account }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sortedActions = [...account.actions].sort((a, b) => a.rank - b.rank)
  const completedCount = completed.size
  const totalCount = sortedActions.length

  return (
    <div className="p-5 lg:p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">Next Best Actions</h3>
          <p className="text-sm text-zinc-500 mt-0.5">
            Ranked recommendations for {account.name} — {account.brief.daysUntilRenewal} days to renewal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/8 border border-blue-500/15 px-3 py-1 text-[11px] text-blue-400 font-medium">
            <Sparkles className="w-3 h-3" />
            AI Prioritized
          </span>
          {completedCount > 0 && (
            <span className="text-xs text-emerald-400 font-medium">
              {completedCount}/{totalCount} completed
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
          <motion.div
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>
        <p className="text-xs text-zinc-700">{completedCount} of {totalCount} actions completed</p>
      </div>

      {/* Action list */}
      <div className="space-y-3">
        {sortedActions.map((action, i) => {
          const Icon = categoryIcon[action.category] ?? Calendar
          const isDone = completed.has(action.id)

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isDone
                  ? 'border-emerald-500/15 bg-emerald-500/4 opacity-60'
                  : 'border-white/[0.06] bg-zinc-900/30 hover:border-white/10'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Rank badge */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200 ${
                    isDone ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : action.rank}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                      <h4 className={`text-sm font-semibold transition-all duration-200 ${isDone ? 'line-through text-zinc-600' : 'text-zinc-100'}`}>
                        {action.title}
                      </h4>
                      <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getUrgencyClass(action.urgency)}`}>
                          {getUrgencyLabel(action.urgency)}
                        </span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getImpactClass(action.impact)} capitalize`}>
                          {action.impact} impact
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">{action.description}</p>

                    {/* Reason */}
                    <div className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/[0.04] p-3 mb-3">
                      <Icon className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-zinc-700 font-medium uppercase tracking-wider">
                          {categoryLabel[action.category]} · Why this
                        </span>
                        <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{action.reason}</p>
                      </div>
                    </div>

                    {/* Mark complete button */}
                    <button
                      onClick={() => toggle(action.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        isDone
                          ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/8 hover:bg-emerald-500/12'
                          : 'border-white/8 text-zinc-500 hover:text-zinc-300 hover:border-white/12 bg-white/3'
                      }`}
                    >
                      {isDone ? '✓ Completed — undo' : 'Mark as complete'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
