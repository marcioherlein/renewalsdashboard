# Renewal Command Center

> Win renewals before they become negotiations.

A premium, motion-rich product demo for a B2B SaaS renewal management platform. Built to showcase how sales and customer success teams can prepare for customer renewals with AI-generated account intelligence, risk scoring, objection prediction, playbooks, stakeholder mapping, and ranked next-best actions.

---

## Overview

**Renewal Command Center** is a frontend-only demo app — no backend, no auth, no database. It uses realistic mocked data to deliver a cinematic, interactive product experience that feels like a live enterprise SaaS tool.

### What's Inside

| Module | Description |
|---|---|
| **Renewal Brief** | Auto-generated executive account summary — ARR, adoption, risks, strategy |
| **Risk Radar** | 0–100 animated risk score gauge, trend chart, and named risk drivers |
| **Objection Predictor** | Predicted objections with talking points and proof points |
| **Playbooks** | Expansion, Rescue, and Value Defense playbooks with steps and talking points |
| **Stakeholder Map** | Stakeholder cards by role with engagement levels and gap detection |
| **Next Best Actions** | Ranked, prioritized action recommendations with impact and urgency |

### Demo Accounts

| Account | Scenario | ARR | Days to Renewal | Health |
|---|---|---|---|---|
| Acme Financial | Medium Risk | $285K | 67 | 58 |
| TechCorp Global | Expansion | $420K | 124 | 87 |
| RetailMax | High Risk 🔴 | $165K | 31 | 24 |
| Nexus Enterprise | Enterprise | $780K | 89 | 71 |
| SmallBiz Pro | Cost Sensitive | $48K | 45 | 43 |

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer-motion.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/marcioherlein/renewalsdashboard.git
cd renewalsdashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Project Structure

```
renewal-command-center/
├── app/
│   ├── globals.css          # Global styles, Tailwind base, custom scrollbar
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page — assembles all sections
│
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── Badge.tsx
│   │   ├── GlassCard.tsx
│   │   ├── ScoreGauge.tsx   # Custom SVG arc gauge
│   │   └── AnimatedCounter.tsx
│   ├── hero/
│   │   └── HeroSection.tsx  # Full-screen landing hero
│   ├── sections/
│   │   ├── ProblemSection.tsx
│   │   ├── FeaturesStory.tsx
│   │   └── CTASection.tsx
│   └── demo/
│       ├── DemoWorkspace.tsx     # Main interactive workspace shell
│       ├── AccountSelector.tsx   # Account picker dropdown
│       ├── RenewalBrief.tsx      # Account brief panel
│       ├── RiskRadar.tsx         # Risk score + trend chart
│       ├── ObjectionPredictor.tsx # Expandable objection cards
│       ├── Playbooks.tsx         # Sliding playbook panels
│       ├── StakeholderMap.tsx    # Stakeholder grid with gaps
│       └── NextBestAction.tsx    # Ranked action recommendations
│
├── data/
│   └── accounts.ts          # TypeScript types + all 5 mock accounts
│
├── lib/
│   └── utils.ts             # cn(), formatCurrency(), color helpers
│
├── public/
│   └── favicon.svg
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Deploying to Vercel

### Option 1 — Import from GitHub (Recommended)

1. Push this repo to GitHub (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New → Project**
4. Import your GitHub repository
5. Vercel will auto-detect Next.js — click **Deploy**
6. Your app is live in ~60 seconds

### Option 2 — Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow the prompts:
# Set up and deploy? Y
# Link to existing project? N (first time)
# Project name: renewal-command-center

# Deploy to production
vercel --prod
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#09090B` (zinc-950) |
| Surface | `#18181B` (zinc-900) |
| Border | `rgba(255,255,255,0.06)` |
| Text Primary | `#F4F4F5` (zinc-100) |
| Text Secondary | `#A1A1AA` (zinc-400) |
| Accent | `#3B82F6` (blue-500) |
| Success | `#22C55E` (emerald-500) |
| Warning | `#F59E0B` (amber-500) |
| Danger | `#EF4444` (red-500) |
| Glass | `bg-white/5 backdrop-blur-xl border border-white/8` |

---

## License

MIT — free to use for demos, prototypes, and internal tooling.

---

Built with Next.js · Deployed on Vercel
