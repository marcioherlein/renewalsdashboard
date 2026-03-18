'use client'

import { useEffect, useState } from 'react'
import { getRiskColor, getRiskLabel } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number
  size?: number
  strokeWidth?: number
  showLabel?: boolean
}

export function ScoreGauge({ score, size = 180, strokeWidth = 14, showLabel = true }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayScore(score), 80)
    return () => clearTimeout(timeout)
  }, [score])

  const r = (size - strokeWidth * 2) / 2
  const cx = size / 2
  const cy = size / 2
  const circ = 2 * Math.PI * r
  const arcFraction = 0.75
  const arcLength = circ * arcFraction
  const filled = (displayScore / 100) * arcLength
  const color = getRiskColor(displayScore)
  const label = getRiskLabel(displayScore)

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(0deg)' }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circ - arcLength}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135, ${cx}, ${cy})`}
        />
        {/* Score arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135, ${cx}, ${cy})`}
          style={{
            transition: 'stroke-dasharray 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.4s ease',
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold tabular-nums"
          style={{
            color,
            transition: 'color 0.4s ease',
          }}
        >
          {Math.round(displayScore)}
        </span>
        {showLabel && (
          <span className="text-xs text-zinc-500 mt-0.5 font-medium">{label}</span>
        )}
      </div>
    </div>
  )
}
