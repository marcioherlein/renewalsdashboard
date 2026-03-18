import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AccountScenario, Impact, Severity, Urgency } from '@/data/accounts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value}`
}

export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getRiskColor(score: number): string {
  if (score >= 70) return '#ef4444' // red-500
  if (score >= 40) return '#f59e0b' // amber-500
  return '#22c55e' // green-500
}

export function getRiskLabel(score: number): string {
  if (score >= 70) return 'High Risk'
  if (score >= 40) return 'Medium Risk'
  return 'Low Risk'
}

export function getRiskBgClass(score: number): string {
  if (score >= 70) return 'bg-red-500/10 border-red-500/20 text-red-400'
  if (score >= 40) return 'bg-amber-500/10 border-amber-500/20 text-amber-400'
  return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
}

export function getHealthColor(score: number): string {
  if (score >= 70) return '#22c55e'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

export function getSeverityClass(severity: Severity): string {
  switch (severity) {
    case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20'
    case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'low': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
}

export function getImpactClass(impact: Impact): string {
  switch (impact) {
    case 'high': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'medium': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    case 'low': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
}

export function getUrgencyClass(urgency: Urgency): string {
  switch (urgency) {
    case 'immediate': return 'bg-red-500/10 text-red-400 border-red-500/20'
    case 'this-week': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'this-month': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
}

export function getUrgencyLabel(urgency: Urgency): string {
  switch (urgency) {
    case 'immediate': return 'Immediate'
    case 'this-week': return 'This Week'
    case 'this-month': return 'This Month'
  }
}

export function getScenarioLabel(scenario: AccountScenario): string {
  switch (scenario) {
    case 'expansion': return 'Expansion'
    case 'medium-risk': return 'Medium Risk'
    case 'high-risk': return 'High Risk'
    case 'enterprise': return 'Enterprise'
    case 'cost-sensitive': return 'Cost Sensitive'
  }
}

export function getScenarioClass(scenario: AccountScenario): string {
  switch (scenario) {
    case 'expansion': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'medium-risk': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    case 'high-risk': return 'bg-red-500/10 text-red-400 border-red-500/20'
    case 'enterprise': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'cost-sensitive': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  }
}

export function getLikelihoodColor(likelihood: number): string {
  if (likelihood >= 70) return 'bg-red-500'
  if (likelihood >= 45) return 'bg-amber-500'
  return 'bg-blue-500'
}

export function getLikelihoodLabel(likelihood: number): string {
  if (likelihood >= 70) return 'High Likelihood'
  if (likelihood >= 45) return 'Moderate'
  return 'Low Likelihood'
}

export function getEngagementClass(engagement: string): string {
  switch (engagement) {
    case 'high': return 'bg-emerald-500'
    case 'medium': return 'bg-amber-500'
    case 'low': return 'bg-red-500'
    default: return 'bg-zinc-600'
  }
}

export function getPlaybookColor(type: string): { bg: string; text: string; border: string; badge: string } {
  switch (type) {
    case 'expansion':
      return { bg: 'from-blue-500/8 to-blue-500/3', text: 'text-blue-400', border: 'border-blue-500/20', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' }
    case 'rescue':
      return { bg: 'from-red-500/8 to-red-500/3', text: 'text-red-400', border: 'border-red-500/20', badge: 'bg-red-500/10 text-red-400 border-red-500/20' }
    case 'value-defense':
      return { bg: 'from-emerald-500/8 to-emerald-500/3', text: 'text-emerald-400', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
    default:
      return { bg: 'from-zinc-500/8 to-zinc-500/3', text: 'text-zinc-400', border: 'border-zinc-500/20', badge: 'bg-zinc-500/10 text-zinc-400' }
  }
}

export function getPlaybookLabel(type: string): string {
  switch (type) {
    case 'expansion': return 'Expansion Playbook'
    case 'rescue': return 'Rescue Playbook'
    case 'value-defense': return 'Value Defense'
    default: return 'Playbook'
  }
}
