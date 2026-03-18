'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Sparkles, Calendar, TrendingUp, Users } from 'lucide-react'
import type { Account } from '@/data/accounts'
import { formatCurrency, getScenarioClass, getScenarioLabel, getHealthColor, getRiskBgClass } from '@/lib/utils'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface Props { account: Account }

export function RenewalBrief({ account }: Props) {
  const { brief } = account
  const healthColor = getHealthColor(account.healthScore)
  const renewalPct = Math.max(0, Math.min(100, 100 - (brief.daysUntilRenewal / 180) * 100))

  return (
    <div className="p-5 lg:p-7 space-y-6">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: `${healthColor}18`, border: `1px solid ${healthColor}30`, color: healthColor }}
          >
            {account.initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-zinc-100">{account.name}</h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getScenarioClass(account.scenario)}`}>
                {getScenarioLabel(account.scenario)}
              </span>
            </div>
            <p className="text-sm text-zinc-500 mt-0.5">{account.industry} · {account.plan} Plan · {account.contractTerm}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/8 border border-blue-500/15 px-3 py-1 text-[11px] text-blue-400 font-medium">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Annual Recurring Revenue',
            value: formatCurrency(account.arr),
            sub: account.plan + ' Plan',
            icon: TrendingUp,
            color: 'text-emerald-400',
          },
          {
            label: 'Days to Renewal',
            value: <AnimatedCounter value={brief.daysUntilRenewal} suffix=" days" className="text-2xl font-bold text-zinc-100 tabular-nums" />,
            sub: account.renewalDate,
            icon: Calendar,
            color: brief.daysUntilRenewal < 45 ? 'text-red-400' : brief.daysUntilRenewal < 90 ? 'text-amber-400' : 'text-zinc-300',
          },
          {
            label: 'Seat Utilization',
            value: <AnimatedCounter value={brief.usageRate} suffix="%" className="text-2xl font-bold text-zinc-100 tabular-nums" />,
            sub: `${brief.seatsUsed} / ${brief.seatsTotal} seats`,
            icon: Users,
            color: brief.usageRate > 70 ? 'text-emerald-400' : brief.usageRate > 40 ? 'text-amber-400' : 'text-red-400',
          },
          {
            label: 'NPS Score',
            value: <AnimatedCounter value={brief.npsScore} className="text-2xl font-bold text-zinc-100 tabular-nums" />,
            sub: brief.npsScore > 50 ? 'Promoter territory' : brief.npsScore > 20 ? 'Passive territory' : 'Detractor risk',
            icon: TrendingUp,
            color: brief.npsScore > 50 ? 'text-emerald-400' : brief.npsScore > 20 ? 'text-amber-400' : 'text-red-400',
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                <span className="text-[11px] text-zinc-600 font-medium uppercase tracking-wide">{kpi.label}</span>
              </div>
              <div className="text-2xl font-bold text-zinc-100">{kpi.value}</div>
              <p className="text-xs text-zinc-600 mt-0.5">{kpi.sub}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Renewal timeline bar */}
      <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-zinc-500 font-medium">Renewal Timeline</span>
          <span className={`text-xs font-semibold ${brief.daysUntilRenewal < 45 ? 'text-red-400' : 'text-amber-400'}`}>
            {brief.daysUntilRenewal} days remaining — {account.renewalDate}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${renewalPct}%` }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-full rounded-full"
            style={{
              background: brief.daysUntilRenewal < 45
                ? 'linear-gradient(90deg, #ef4444, #f87171)'
                : brief.daysUntilRenewal < 90
                  ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                  : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-zinc-700">
          <span>Contract Start</span>
          <span>Today</span>
          <span>Renewal — {account.renewalDate}</span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Adoption summary */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5"
        >
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Adoption Summary</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">{brief.adoptionSummary}</p>

          {/* Usage bar */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-zinc-600">
              <span>Platform Usage Rate</span>
              <span className="font-medium">{brief.usageRate}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${brief.usageRate}%` }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="h-full rounded-full"
                style={{
                  background: brief.usageRate > 70 ? '#22c55e' : brief.usageRate > 40 ? '#f59e0b' : '#ef4444',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Recommended strategy */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <h4 className="text-sm font-semibold text-blue-300">Recommended Strategy</h4>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">{brief.recommendedStrategy}</p>
        </motion.div>
      </div>

      {/* Value highlights & Key risks */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-emerald-500/12 bg-emerald-500/4 p-5"
        >
          <h4 className="text-sm font-semibold text-emerald-300 mb-3">Value Highlights</h4>
          <ul className="space-y-2.5">
            {brief.valueHighlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`rounded-xl border p-5 ${getRiskBgClass(account.risk.score)}`}
        >
          <h4 className="text-sm font-semibold mb-3" style={{
            color: account.risk.score >= 70 ? '#fca5a5' : account.risk.score >= 40 ? '#fcd34d' : '#6ee7b7'
          }}>
            Key Risks
          </h4>
          <ul className="space-y-2.5">
            {brief.keyRisks.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{
                  color: account.risk.score >= 70 ? '#ef4444' : account.risk.score >= 40 ? '#f59e0b' : '#22c55e'
                }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
