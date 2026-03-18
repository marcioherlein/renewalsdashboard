'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react'

const floatingCards = [
  {
    icon: Shield,
    label: 'Risk Score',
    value: '91',
    sub: 'RetailMax · Critical',
    color: 'text-red-400',
    bg: 'from-red-500/10 to-red-500/5',
    border: 'border-red-500/20',
    delay: 0,
  },
  {
    icon: TrendingUp,
    label: 'ARR at Risk',
    value: '$780K',
    sub: 'Nexus Enterprise',
    color: 'text-amber-400',
    bg: 'from-amber-500/10 to-amber-500/5',
    border: 'border-amber-500/20',
    delay: 0.15,
  },
  {
    icon: Zap,
    label: 'Expansion Ready',
    value: 'TechCorp',
    sub: '91% adoption · 124 days',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-500/20',
    delay: 0.3,
  },
]

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-zinc-950">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 60% at 15% 5%, rgba(77,140,98,0.08) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 90%, rgba(126,145,172,0.06) 0%, transparent 60%)',
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        {/* Logo / nav bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between pt-8 pb-4 mb-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Sage Assistant" className="h-12 w-auto" />
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 text-xs text-zinc-500 font-medium">
            Renewal Intelligence Platform
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[75vh]">
          {/* Left — Headline */}
          <div className="flex flex-col gap-8">
            {/* AI badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sage-500/25 bg-sage-500/8 px-4 py-1.5 text-sm text-sage-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by Sage Assistant
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-zinc-100">
                Win renewals
              </h1>
              <h1 className="text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight">
                <span className="gradient-text-sage">before they become</span>
              </h1>
              <h1 className="text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-zinc-100">
                negotiations.
              </h1>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              Give every account executive a complete renewal intelligence brief —
              risk scores, objection predictions, playbooks, and ranked actions —
              60 days before the conversation starts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToDemo}
                className="inline-flex items-center gap-2 rounded-xl bg-sage-600 hover:bg-sage-500 text-white px-6 py-3 text-sm font-semibold transition-all duration-200 hover:shadow-glow-sage hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4" />
                View Demo Account
              </button>
              <button
                onClick={scrollToFeatures}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-zinc-200 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              >
                Explore Features
                <ArrowDown className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {['JR', 'AM', 'SC', 'TK', 'DP'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-xs font-semibold text-zinc-400"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                <span className="text-zinc-300 font-medium">500+ teams</span> close more renewals with less scramble
              </p>
            </motion.div>
          </div>

          {/* Right — Floating Cards */}
          <div className="relative hidden lg:flex flex-col items-center justify-center h-full min-h-[480px]">
            {/* Central orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(77,140,98,0.10) 0%, transparent 70%)',
                boxShadow: '0 0 80px rgba(77,140,98,0.07)',
              }}
            />

            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 w-72 rounded-2xl border border-white/8 bg-zinc-900/80 backdrop-blur-xl p-5 shadow-glass"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Account Brief</p>
                  <p className="text-base font-semibold text-zinc-100 mt-0.5">Acme Financial</p>
                </div>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs text-amber-400 font-medium">
                  Medium Risk
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-white/4 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-100">61%</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Usage</p>
                </div>
                <div className="rounded-xl bg-white/4 p-3 text-center">
                  <p className="text-lg font-bold text-zinc-100">67d</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Renewal</p>
                </div>
                <div className="rounded-xl bg-white/4 p-3 text-center">
                  <p className="text-lg font-bold text-amber-400">62</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Risk</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">Risk Trend</span>
                  <span className="text-amber-400 font-medium">↑ Increasing</span>
                </div>
                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-amber-500 transition-all" style={{ boxShadow: '0 0 8px rgba(245,158,11,0.4)' }} />
                </div>
              </div>
            </motion.div>

            {/* Floating metric cards */}
            {floatingCards.map((card, i) => {
              const positions = ['top-8 right-0', 'bottom-24 right-4', 'bottom-8 left-4']
              const Icon = card.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + card.delay }}
                  className={`absolute ${positions[i]} z-20`}
                  style={{ animation: `float ${6 + i}s ease-in-out ${i * 0.7}s infinite` }}
                >
                  <div className={`rounded-xl border ${card.border} bg-gradient-to-br ${card.bg} backdrop-blur-xl p-3 flex items-center gap-3 min-w-[160px] shadow-glass`}>
                    <div className="rounded-lg bg-zinc-900/60 p-2">
                      <Icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-medium">{card.label}</p>
                      <p className={`text-sm font-bold ${card.color}`}>{card.value}</p>
                      <p className="text-[10px] text-zinc-600 leading-tight">{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* AI badge floating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-1/2 left-0 -translate-y-8 z-20"
              style={{ animation: 'float 7s ease-in-out 1s infinite' }}
            >
              <div className="rounded-xl border border-sage-500/25 bg-sage-500/8 backdrop-blur-xl p-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sage-400" />
                <span className="text-xs text-sage-400 font-medium">AI-Generated Brief</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 font-medium tracking-wider uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-zinc-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
