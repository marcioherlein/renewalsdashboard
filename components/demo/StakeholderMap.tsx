'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock } from 'lucide-react'
import type { Account, Stakeholder } from '@/data/accounts'
import { getEngagementClass } from '@/lib/utils'

interface Props { account: Account }

const roleConfig: Record<string, { label: string; color: string; border: string; badge: string }> = {
  'champion': { label: 'Champion', color: 'text-blue-400', border: 'border-blue-500/20', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  'decision-maker': { label: 'Decision Maker', color: 'text-violet-400', border: 'border-violet-500/20', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  'economic-buyer': { label: 'Economic Buyer', color: 'text-amber-400', border: 'border-amber-500/20', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'power-user': { label: 'Power User', color: 'text-emerald-400', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'blocker': { label: 'Blocker', color: 'text-red-400', border: 'border-red-500/20', badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

function StakeholderCard({ stakeholder, index }: { stakeholder: Stakeholder; index: number }) {
  const role = roleConfig[stakeholder.role]
  const engagementDot = getEngagementClass(stakeholder.engagement)

  if (stakeholder.isGap) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.07 }}
        className="rounded-2xl border border-dashed border-red-500/25 bg-red-500/4 p-5 flex flex-col items-center justify-center gap-3 text-center min-h-[180px]"
      >
        <div className="w-10 h-10 rounded-2xl border border-dashed border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400/60" />
        </div>
        <div>
          <p className="text-xs font-semibold text-red-400 mb-0.5">Gap Identified</p>
          <p className="text-sm font-semibold text-zinc-300">{stakeholder.title}</p>
          <p className="text-xs text-zinc-600 mt-1 leading-snug">{stakeholder.notes}</p>
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${role.badge}`}>
          {role.label}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-5 flex flex-col gap-4 hover:border-white/10 transition-all duration-200`}
    >
      {/* Avatar row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold bg-zinc-800 border ${role.border} flex-shrink-0`}>
            <span className={role.color}>{stakeholder.initials}</span>
            {/* Engagement dot */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900 ${engagementDot}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{stakeholder.name}</p>
            <p className="text-xs text-zinc-500">{stakeholder.title}</p>
          </div>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium flex-shrink-0 ${role.badge}`}>
          {role.label}
        </span>
      </div>

      {/* Relationship strength */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-600">
          <span>Relationship Strength</span>
          <span className="font-medium">{stakeholder.strength}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stakeholder.strength}%` }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.07 }}
            className={`h-full rounded-full ${
              stakeholder.strength >= 70 ? 'bg-emerald-500' :
              stakeholder.strength >= 40 ? 'bg-amber-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Engagement + last contact */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${engagementDot}`} />
          <span className="text-xs text-zinc-500 capitalize">{stakeholder.engagement} engagement</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-zinc-600">
          <Clock className="w-3 h-3" />
          {stakeholder.lastContact}
        </div>
      </div>

      {/* Notes */}
      <p className="text-xs text-zinc-600 leading-relaxed border-t border-white/[0.04] pt-3">
        {stakeholder.notes}
      </p>
    </motion.div>
  )
}

export function StakeholderMap({ account }: Props) {
  const hasGaps = account.stakeholders.some(s => s.isGap)

  return (
    <div className="p-5 lg:p-7 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">Stakeholder Map</h3>
          <p className="text-sm text-zinc-500 mt-0.5">
            {account.stakeholders.length} stakeholders mapped · {account.stakeholders.filter(s => s.isGap).length} gaps identified
          </p>
        </div>
      </div>

      {/* Warning banner if gaps */}
      {hasGaps && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/7 px-4 py-3"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-300">
            Critical stakeholder gaps detected. Missing roles create renewal risk. Fill these gaps before the renewal conversation.
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
        <span className="font-medium text-zinc-500">Engagement:</span>
        {[
          { color: 'bg-emerald-500', label: 'High' },
          { color: 'bg-amber-500', label: 'Medium' },
          { color: 'bg-red-500', label: 'Low' },
          { color: 'bg-zinc-600', label: 'Unknown' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {account.stakeholders.map((s, i) => (
          <StakeholderCard key={s.id} stakeholder={s} index={i} />
        ))}
      </div>
    </div>
  )
}
