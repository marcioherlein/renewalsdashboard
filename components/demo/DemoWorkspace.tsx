'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileText, ShieldAlert, MessageSquareWarning,
  BookOpen, Users, Zap, Sparkles,
} from 'lucide-react'
import { accounts, defaultAccountId } from '@/data/accounts'
import { AccountSelector } from './AccountSelector'
import { RenewalBrief } from './RenewalBrief'
import { RiskRadar } from './RiskRadar'
import { ObjectionPredictor } from './ObjectionPredictor'
import { Playbooks } from './Playbooks'
import { StakeholderMap } from './StakeholderMap'
import { NextBestAction } from './NextBestAction'

type Tab = 'brief' | 'risk' | 'objections' | 'playbooks' | 'stakeholders' | 'actions'

const tabs: { id: Tab; label: string; icon: React.ElementType; shortLabel: string }[] = [
  { id: 'brief', label: 'Renewal Brief', shortLabel: 'Brief', icon: FileText },
  { id: 'risk', label: 'Risk Radar', shortLabel: 'Risk', icon: ShieldAlert },
  { id: 'objections', label: 'Objections', shortLabel: 'Objections', icon: MessageSquareWarning },
  { id: 'playbooks', label: 'Playbooks', shortLabel: 'Playbooks', icon: BookOpen },
  { id: 'stakeholders', label: 'Stakeholders', shortLabel: 'People', icon: Users },
  { id: 'actions', label: 'Next Actions', shortLabel: 'Actions', icon: Zap },
]

export function DemoWorkspace() {
  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccountId)
  const [activeTab, setActiveTab] = useState<Tab>('brief')
  const [prevTab, setPrevTab] = useState<Tab>('brief')

  const account = accounts.find(a => a.id === selectedAccountId) ?? accounts[0]

  const handleTabChange = (tab: Tab) => {
    setPrevTab(activeTab)
    setActiveTab(tab)
  }

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id)
  }

  const tabIndex = tabs.findIndex(t => t.id === activeTab)
  const prevTabIndex = tabs.findIndex(t => t.id === prevTab)
  const direction = tabIndex >= prevTabIndex ? 1 : -1

  return (
    <section id="demo" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Sage Assistant" className="h-16 w-auto mx-auto mb-5" />
          <span className="inline-flex items-center gap-2 rounded-full border border-sage-500/25 bg-sage-500/8 px-4 py-1.5 text-sm text-sage-400 font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Demo
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight mb-3">
            Renewal Command Center
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm">
            Select any account below to explore its full renewal intelligence brief.
            All data is illustrative.
          </p>
        </div>

        {/* Workspace shell */}
        <div className="rounded-3xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-glass">
          {/* Workspace header */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.05] bg-zinc-900/60">
            {/* Window chrome dots */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>

            <AccountSelector
              selectedId={selectedAccountId}
              onSelect={handleAccountChange}
            />

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sage-500/8 border border-sage-500/15 px-3 py-1 text-[11px] text-sage-400 font-medium">
                <Sparkles className="w-3 h-3" />
                Renewal Intelligence
              </span>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex items-center gap-0.5 px-4 pt-3 pb-0 border-b border-white/[0.04] overflow-x-auto scrollbar-none">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-zinc-100 bg-zinc-800/60'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-500 rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <div className="min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${selectedAccountId}-${activeTab}`}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                {activeTab === 'brief' && <RenewalBrief account={account} />}
                {activeTab === 'risk' && <RiskRadar account={account} />}
                {activeTab === 'objections' && <ObjectionPredictor account={account} />}
                {activeTab === 'playbooks' && <Playbooks account={account} />}
                {activeTab === 'stakeholders' && <StakeholderMap account={account} />}
                {activeTab === 'actions' && <NextBestAction account={account} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
