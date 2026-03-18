'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, TrendingDown, AlertTriangle } from 'lucide-react'

const stats = [
  {
    icon: TrendingDown,
    value: '23%',
    label: 'avg churn rate on reactive renewals',
    color: 'text-red-400',
    bg: 'from-red-500/8 to-transparent',
    border: 'border-red-500/15',
  },
  {
    icon: Clock,
    value: '14 hrs',
    label: 'wasted per renewal on manual prep',
    color: 'text-amber-400',
    bg: 'from-amber-500/8 to-transparent',
    border: 'border-amber-500/15',
  },
  {
    icon: AlertTriangle,
    value: '$2.3M',
    label: 'lost annually to no-action accounts',
    color: 'text-orange-400',
    bg: 'from-orange-500/8 to-transparent',
    border: 'border-orange-500/15',
  },
]

const painPoints = [
  'Rep gets a renewal alert 30 days out with no context',
  'Scrambles through Salesforce, Gainsight, email threads, and Slack',
  'Walks into the call with a generic deck and no account-specific data',
  'Customer asks about ROI — rep has no answer',
  'Deal stalls. Competitor gets 3 weeks to plant doubt.',
]

function StatCard({ icon: Icon, value, label, color, bg, border, index }: typeof stats[0] & { index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`rounded-2xl border ${border} bg-gradient-to-b ${bg} p-6 flex flex-col gap-4`}
    >
      <div className={`w-10 h-10 rounded-xl bg-zinc-900 border border-white/6 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className={`text-4xl font-extrabold ${color} tabular-nums`}>{value}</p>
        <p className="text-sm text-zinc-400 mt-1 leading-snug">{label}</p>
      </div>
    </motion.div>
  )
}

export function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(239,68,68,0.04) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5 text-sm text-red-400 font-medium mb-6">
            The Problem
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight mb-5">
            Most reps walk into renewals blind.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Your best account executives are losing winnable renewals — not because they lack skill,
            but because they lack intelligence. The data exists. It just lives in 12 different systems.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {stats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
        </div>

        {/* The old way */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, x: -24 }}
            animate={listInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-zinc-100 mb-2">The reactive playbook.</h3>
            <p className="text-zinc-500 mb-8">What renewal prep looks like today for most teams.</p>
            <div className="space-y-3">
              {painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={listInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.09 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02]"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-zinc-400">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={listInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Typical Account Status</span>
            </div>
            {/* Mock account health visual */}
            <div className="space-y-4">
              {[
                { name: 'Last exec touchpoint', value: '4 months ago', bad: true },
                { name: 'Champion status', value: 'Left company', bad: true },
                { name: 'Seat utilization', value: '24%', bad: true },
                { name: 'Open support tickets', value: '14 unresolved', bad: true },
                { name: 'Competitor awareness', value: 'Unknown', bad: true },
                { name: 'ROI documented', value: 'None on file', bad: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-sm text-zinc-500">{item.name}</span>
                  <span className="text-sm font-medium text-red-400">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-red-500/15 bg-red-500/6 p-4 text-sm text-red-300">
              ⚠ Renewal in <span className="font-bold">31 days</span>. No prep initiated. No account brief. No strategy.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
