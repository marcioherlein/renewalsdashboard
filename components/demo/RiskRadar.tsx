'use client'

import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import type { Account } from '@/data/accounts'
import { ScoreGauge } from '@/components/ui/ScoreGauge'
import { getSeverityClass, getRiskColor, getRiskLabel } from '@/lib/utils'
import {
  TrendingDown, UserX, Shield, AlertTriangle,
  Globe, DollarSign, Link, Layers, Map, Users, Building,
  AlertCircle, Clock, Swords
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  TrendingDown, UserX, Shield, AlertTriangle, Globe,
  DollarSign, Link, Layers, Map, Users, Building,
  AlertCircle, Clock, Swords,
}

interface Props { account: Account }

interface TooltipProps { active?: boolean; payload?: { value: number }[]; label?: string }
function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  const score = payload[0].value as number
  const color = getRiskColor(score)
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl px-3 py-2.5 shadow-glass">
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="text-sm font-bold" style={{ color }}>{score} — {getRiskLabel(score)}</p>
    </div>
  )
}

export function RiskRadar({ account }: Props) {
  const { risk } = account
  const riskColor = getRiskColor(risk.score)
  const isHighRisk = risk.score >= 70

  return (
    <div className="p-5 lg:p-7 space-y-6">
      {/* High risk banner */}
      {isHighRisk && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
          <p className="text-sm text-red-300 font-medium">
            Critical risk detected — immediate action required. Renewal at risk within {account.brief.daysUntilRenewal} days.
          </p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Gauge — left */}
        <div className="lg:col-span-2 flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 w-full flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-zinc-300">Renewal Risk Score</h3>
              <p className="text-xs text-zinc-600 mt-0.5">{account.name}</p>
            </div>
            <ScoreGauge score={risk.score} size={200} />
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs text-zinc-600 border-t border-white/[0.04] pt-4">
              <div>
                <p className="text-emerald-400 font-semibold">0–39</p>
                <p>Low</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold">40–69</p>
                <p>Medium</p>
              </div>
              <div>
                <p className="text-red-400 font-semibold">70–100</p>
                <p>High</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk drivers — right */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-sm font-semibold text-zinc-300">Risk Drivers</h3>
          {risk.drivers.map((driver, i) => {
            const Icon = iconMap[driver.icon] ?? AlertTriangle
            return (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityClass(driver.severity)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-200">{driver.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${getSeverityClass(driver.severity)}`}>
                      {driver.severity} severity
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{driver.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Trend chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300">6-Month Risk Trend</h3>
            <p className="text-xs text-zinc-600 mt-0.5">Risk score over time</p>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color: riskColor,
              backgroundColor: `${riskColor}15`,
              borderColor: `${riskColor}30`,
            }}
          >
            {risk.trend.at(-1)!.score > risk.trend[0].score ? '↑ Rising' : '↓ Improving'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={risk.trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={riskColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={riskColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke={riskColor}
              strokeWidth={2}
              fill="url(#riskGrad)"
              dot={{ fill: riskColor, strokeWidth: 0, r: 3 }}
              activeDot={{ fill: riskColor, r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
