'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FileText, ShieldAlert, MessageSquareWarning,
  BookOpen, Users, Zap, ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Renewal Brief',
    description:
      'Auto-generated account intelligence — ARR, adoption metrics, value highlights, key risks, and a recommended strategy, surfaced 60 days before renewal.',
    color: 'text-sage-400',
    bg: 'from-sage-500/8 to-sage-500/3',
    border: 'border-sage-500/15',
    tab: 'brief',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Radar',
    description:
      'A 0–100 risk score backed by real signals: usage trends, champion status, support escalations, and competitor activity. Know before it\'s too late.',
    color: 'text-red-400',
    bg: 'from-red-500/8 to-red-500/3',
    border: 'border-red-500/15',
    tab: 'risk',
  },
  {
    icon: MessageSquareWarning,
    title: 'Objection Predictor',
    description:
      'Know which objections are coming before the call. Get account-specific talking points and proof points ready for every scenario.',
    color: 'text-amber-400',
    bg: 'from-amber-500/8 to-amber-500/3',
    border: 'border-amber-500/15',
    tab: 'objections',
  },
  {
    icon: BookOpen,
    title: 'Dynamic Playbooks',
    description:
      'Context-aware playbooks — Expansion, Rescue, or Value Defense — built from account state, complete with steps, talking points, and risk flags.',
    color: 'text-violet-400',
    bg: 'from-violet-500/8 to-violet-500/3',
    border: 'border-violet-500/15',
    tab: 'playbooks',
  },
  {
    icon: Users,
    title: 'Stakeholder Map',
    description:
      'See every stakeholder, their role, engagement level, and relationship strength. Surface gaps like missing executive sponsors before they cost you the deal.',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/8 to-emerald-500/3',
    border: 'border-emerald-500/15',
    tab: 'stakeholders',
  },
  {
    icon: Zap,
    title: 'Next Best Actions',
    description:
      'Ranked, prioritized recommendations — schedule the EBR, send the ROI deck, engage procurement — each with expected impact and urgency.',
    color: 'text-cyan-400',
    bg: 'from-cyan-500/8 to-cyan-500/3',
    border: 'border-cyan-500/15',
    tab: 'actions',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = feature.icon

  const scrollToTab = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onClick={scrollToTab}
      className={`group relative rounded-2xl border ${feature.border} bg-gradient-to-b ${feature.bg} p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/10`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className={`w-11 h-11 rounded-xl bg-zinc-900/80 border border-white/6 flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${feature.color}`} />
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 mt-1" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-zinc-100 mb-2">{feature.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sage-500/25 bg-sage-500/8 px-4 py-1.5 text-sm text-sage-400 font-medium mb-6">
            The Platform
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight mb-5">
            Everything you need to win the renewal.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Six intelligent modules that turn scattered account data into a
            complete pre-renewal command brief — ready for every rep, on every account.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.tab} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA to demo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/8 text-zinc-200 px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            See it in action
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
