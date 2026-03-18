'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, MessageSquare, Sparkles } from 'lucide-react'

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      {/* Gradient accent */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 60%)',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/[0.07] bg-zinc-900/50 backdrop-blur-xl p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Inner gradient */}
          <div className="absolute inset-0 rounded-3xl" style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)',
          }} />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex justify-center mb-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Sage Assistant" className="h-20 w-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sage-500/25 bg-sage-500/8 px-4 py-1.5 text-sm text-sage-400 font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Ready to transform your renewals?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight mb-5 leading-tight"
            >
              Stop reacting.<br />
              <span className="gradient-text-sage">Start winning.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Deploy Renewal Command Center across your CS and sales team in days —
              not quarters. Every account. Every rep. Complete renewal intelligence,
              60 days before the conversation starts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button className="inline-flex items-center gap-2 rounded-xl bg-sage-600 hover:bg-sage-500 text-white px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:shadow-glow-sage hover:-translate-y-0.5">
                <Calendar className="w-4 h-4" />
                Book a Demo
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-zinc-200 px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5">
                <MessageSquare className="w-4 h-4" />
                Talk to Sales
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-white/[0.05]"
            >
              {[
                'SOC 2 Type II',
                'GDPR Compliant',
                'SSO / SAML',
                '99.9% Uptime SLA',
                'Dedicated CSM',
              ].map((badge) => (
                <span key={badge} className="text-xs text-zinc-600 font-medium">
                  ✓ {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 text-xs text-zinc-700"
        >
          Renewal Command Center · Built for enterprise CS and sales teams
        </motion.div>
      </div>
    </section>
  )
}
