// ─── TypeScript Types ─────────────────────────────────────────────────────────

export type Severity = 'low' | 'medium' | 'high'
export type Engagement = 'high' | 'medium' | 'low' | 'unknown'
export type Impact = 'high' | 'medium' | 'low'
export type Urgency = 'immediate' | 'this-week' | 'this-month'
export type PlaybookType = 'expansion' | 'rescue' | 'value-defense'
export type StakeholderRole = 'champion' | 'decision-maker' | 'economic-buyer' | 'power-user' | 'blocker'
export type ActionCategory = 'meeting' | 'content' | 'engagement' | 'internal'
export type AccountScenario = 'expansion' | 'medium-risk' | 'high-risk' | 'enterprise' | 'cost-sensitive'

export interface RiskDriver {
  id: string
  name: string
  severity: Severity
  description: string
  icon: string
}

export interface RiskTrend {
  month: string
  score: number
}

export interface Objection {
  id: string
  title: string
  likelihood: number
  reason: string
  talkingPoints: string[]
  proofPoints: string[]
}

export interface PlaybookStep {
  step: number
  action: string
  detail: string
}

export interface Playbook {
  id: string
  type: PlaybookType
  title: string
  objective: string
  steps: PlaybookStep[]
  talkingPoints: string[]
  risksToWatch: string[]
}

export interface Stakeholder {
  id: string
  name: string
  title: string
  role: StakeholderRole
  engagement: Engagement
  strength: number
  lastContact: string
  notes: string
  initials: string
  isGap?: boolean
}

export interface Action {
  id: string
  rank: number
  title: string
  description: string
  impact: Impact
  urgency: Urgency
  reason: string
  category: ActionCategory
}

export interface AccountBrief {
  adoptionSummary: string
  valueHighlights: string[]
  keyRisks: string[]
  recommendedStrategy: string
  usageRate: number
  seatsUsed: number
  seatsTotal: number
  lastLoginDaysAgo: number
  npsScore: number
  supportTickets: number
  daysUntilRenewal: number
}

export interface Account {
  id: string
  name: string
  initials: string
  industry: string
  arr: number
  renewalDate: string
  contractTerm: string
  plan: string
  scenario: AccountScenario
  healthScore: number
  brief: AccountBrief
  risk: {
    score: number
    trend: RiskTrend[]
    drivers: RiskDriver[]
  }
  objections: Objection[]
  playbooks: Playbook[]
  stakeholders: Stakeholder[]
  actions: Action[]
}

// ─── Mock Accounts ─────────────────────────────────────────────────────────────

export const accounts: Account[] = [
  // ── 1. Acme Financial — Medium-Risk Renewal ──────────────────────────────
  {
    id: 'acme-financial',
    name: 'Acme Financial',
    initials: 'AF',
    industry: 'Financial Services',
    arr: 285000,
    renewalDate: 'May 24, 2026',
    contractTerm: '12 months',
    plan: 'Enterprise',
    scenario: 'medium-risk',
    healthScore: 58,
    brief: {
      adoptionSummary:
        'Acme Financial has deployed the platform across 3 of 5 business units. Core workflows are in use by the finance and ops teams, but adoption in risk management remains low. DAU/MAU ratio has declined 18% over the past quarter.',
      valueHighlights: [
        'Automated $1.4M in manual reconciliation workflows',
        'Reduced month-end close from 9 days to 4 days',
        'Finance team NPS jumped from 31 to 67 post-onboarding',
        '94% uptime maintained across all integrations',
      ],
      keyRisks: [
        'Usage declining in risk management unit (–38% MAU)',
        'Original champion Sarah Chen promoted — new contact unestablished',
        'Competitor pilot rumored in compliance department',
        'No executive sponsor engagement in 4 months',
      ],
      recommendedStrategy:
        'Execute a multi-threaded executive re-engagement strategy. Lead with ROI data and deliver a joint success plan for the risk management unit. Proactively address the champion transition and neutralize the competitor evaluation before QBR.',
      usageRate: 61,
      seatsUsed: 87,
      seatsTotal: 150,
      lastLoginDaysAgo: 3,
      npsScore: 52,
      supportTickets: 7,
      daysUntilRenewal: 67,
    },
    risk: {
      score: 62,
      trend: [
        { month: 'Oct', score: 28 },
        { month: 'Nov', score: 31 },
        { month: 'Dec', score: 40 },
        { month: 'Jan', score: 49 },
        { month: 'Feb', score: 57 },
        { month: 'Mar', score: 62 },
      ],
      drivers: [
        {
          id: 'r1',
          name: 'Declining Usage',
          severity: 'high',
          description: 'DAU/MAU ratio dropped 18% over 90 days. Risk management unit at 22% active seat utilization.',
          icon: 'TrendingDown',
        },
        {
          id: 'r2',
          name: 'Champion Transition',
          severity: 'high',
          description: 'Sarah Chen (primary champion) moved to a VP role. No formal handoff to a new champion completed.',
          icon: 'UserX',
        },
        {
          id: 'r3',
          name: 'No Executive Sponsor',
          severity: 'medium',
          description: 'Last exec-level touchpoint was 4 months ago. No C-suite advocate identified for renewal.',
          icon: 'Shield',
        },
        {
          id: 'r4',
          name: 'Competitor Evaluation',
          severity: 'medium',
          description: 'Intelligence suggests a competing platform is being piloted in the compliance org.',
          icon: 'Swords',
        },
        {
          id: 'r5',
          name: 'Support Escalations',
          severity: 'low',
          description: '7 open support tickets, 2 aged beyond SLA. Overall sentiment neutral.',
          icon: 'AlertTriangle',
        },
      ],
    },
    objections: [
      {
        id: 'o1',
        title: "We're not seeing enough ROI",
        likelihood: 78,
        reason:
          'Usage has declined and the risk management unit never fully adopted the platform. Without visible outcomes in that BU, ROI justification is thin.',
        talkingPoints: [
          'Highlight the $1.4M saved in reconciliation — quantified and defensible',
          'Propose a 90-day adoption sprint for risk management with dedicated CSM support',
          'Offer a success plan with measurable milestones tied to their business goals',
        ],
        proofPoints: [
          'Month-end close reduced from 9 to 4 days — 55% improvement',
          'Finance team NPS improved by 36 points post-deployment',
          'Risk management low adoption tracked to lack of onboarding, not product fit',
        ],
      },
      {
        id: 'o2',
        title: "We're evaluating alternatives",
        likelihood: 65,
        reason:
          'Competitor pilot in compliance department signals dissatisfaction or opportunistic shopping. Champion gap leaves us exposed.',
        talkingPoints: [
          'Ask directly: what would need to be true for us to remain the clear choice?',
          'Quantify switching costs — data migration, retraining, integration rebuild',
          'Offer an executive briefing with product roadmap covering their stated gaps',
        ],
        proofPoints: [
          'Average migration cost to a competitor platform: 6 months, $180K+ services',
          'Our compliance module roadmap ships Q3 — directly addresses their gap',
          '94% of customers who evaluated competitors chose to stay with us in 2024',
        ],
      },
      {
        id: 'o3',
        title: "The price is too high for current usage",
        likelihood: 52,
        reason:
          'With 58% seat utilization, procurement will question paying for unused licenses. A cost-per-outcome framing is needed.',
        talkingPoints: [
          'Reframe from cost-per-seat to cost-per-outcome: $285K for $1.4M in savings = 4.9x ROI',
          'Offer a temporary right-size with a growth commitment tied to the risk management rollout',
          'Introduce a success-based milestone plan to demonstrate value before full renewal',
        ],
        proofPoints: [
          'Current ROI documented at 4.9x — benchmark for FS sector is 2.8x',
          'Unused seats are earmarked for risk management rollout starting next month',
        ],
      },
    ],
    playbooks: [
      {
        id: 'pb1',
        type: 'value-defense',
        title: 'Value Defense Playbook',
        objective:
          'Re-establish clear ROI narrative and secure executive sponsorship before renewal conversation begins.',
        steps: [
          { step: 1, action: 'ROI Report Delivery', detail: 'Send personalized ROI summary with quantified outcomes from finance and ops teams. Include benchmarks vs. industry.' },
          { step: 2, action: 'Executive Re-engagement', detail: 'Request 30-min call with CFO or COO. Use ROI data as the hook. Do not lead with renewal.' },
          { step: 3, action: 'Champion Mapping', detail: 'Identify and build relationship with new champion in Sarah Chen\'s team. Schedule onboarding coffee chat.' },
          { step: 4, action: 'Risk Management Blitz', detail: 'Run a focused 2-week activation sprint in the risk management unit. Assign dedicated CSM.' },
          { step: 5, action: 'Renewal QBR', detail: 'Host an executive business review. Present success plan for next 12 months. Close on renewal terms.' },
        ],
        talkingPoints: [
          'Your finance team cut close time by 55% — that\'s 5 extra days of analyst capacity every month.',
          'We\'ve identified a $600K opportunity in the risk management unit — we want to help you capture it.',
          'Our team is committed to a dedicated activation sprint. We own the outcome together.',
        ],
        risksToWatch: [
          'Competitor evaluation accelerating in compliance',
          'New champion may not have budget authority',
          'Procurement may push for right-sizing before renewal',
        ],
      },
      {
        id: 'pb2',
        type: 'rescue',
        title: 'Rescue Playbook',
        objective: 'Prevent churn by rapidly addressing adoption gaps and neutralizing competitor threat.',
        steps: [
          { step: 1, action: 'Churn Signal Audit', detail: 'Review all usage signals, support tickets, and sentiment data. Identify the single biggest blocker to renewal.' },
          { step: 2, action: 'Emergency EBR', detail: 'Request urgent executive business review. Frame as "partnership health check", not renewal pitch.' },
          { step: 3, action: 'Competitive Counter Brief', detail: 'Prepare a factual comparison of switching costs and our roadmap vs. the competitor.' },
          { step: 4, action: 'Concession Package', detail: 'Work with leadership to prepare a concession package if needed — extended terms, additional support hours, or temporary right-size.' },
          { step: 5, action: 'Closed-Won or Close', detail: 'Secure a signed renewal or a clear commitment within 30 days.' },
        ],
        talkingPoints: [
          'We know adoption in risk management hasn\'t met your expectations — and we want to own that.',
          'Before you make a decision, let\'s put the switching cost on the table — it\'s significant.',
          'I can personally commit a dedicated resource to your risk management rollout.',
        ],
        risksToWatch: [
          'Deal may require leadership-level escalation and approval',
          'Concessions set a pricing precedent — document carefully',
        ],
      },
    ],
    stakeholders: [
      {
        id: 's1',
        name: 'Sarah Chen',
        title: 'VP of Finance Operations',
        role: 'champion',
        engagement: 'medium',
        strength: 62,
        lastContact: '18 days ago',
        notes: 'Recently promoted. Less hands-on with the platform. Key reference — do not lose relationship.',
        initials: 'SC',
      },
      {
        id: 's2',
        name: 'David Park',
        title: 'CFO',
        role: 'economic-buyer',
        engagement: 'low',
        strength: 30,
        lastContact: '4 months ago',
        notes: 'Last touchpoint was the original contract signing. Needs re-engagement before renewal.',
        initials: 'DP',
      },
      {
        id: 's3',
        name: 'Marcus Webb',
        title: 'Director of Risk Management',
        role: 'decision-maker',
        engagement: 'unknown',
        strength: 15,
        lastContact: 'Never',
        notes: 'Runs the underperforming unit. Critical to engage. May be driving the competitor evaluation.',
        initials: 'MW',
      },
      {
        id: 's4',
        name: 'Priya Nair',
        title: 'Senior Finance Analyst',
        role: 'power-user',
        engagement: 'high',
        strength: 88,
        lastContact: '2 days ago',
        notes: 'Power user and internal advocate. Great reference for finance use case. Possible new champion.',
        initials: 'PN',
      },
    ],
    actions: [
      {
        id: 'a1',
        rank: 1,
        title: 'Schedule Executive Business Review',
        description: 'Request a 30-min call with CFO David Park. Lead with ROI data, not renewal. Present the risk management activation plan.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'No exec engagement in 4 months with 67 days to renewal. This is the single highest-leverage action.',
        category: 'meeting',
      },
      {
        id: 'a2',
        rank: 2,
        title: 'Send Personalized ROI Summary',
        description: 'Deliver a 2-page ROI brief quantifying finance team outcomes. Include industry benchmarks and forward-looking value map.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'Customer will question ROI given low seat utilization. Proactive data delivery shifts the narrative.',
        category: 'content',
      },
      {
        id: 'a3',
        rank: 3,
        title: 'Engage Marcus Webb in Risk Management',
        description: 'Reach out to Director of Risk Management for a discovery call. Understand blockers to adoption and present a 90-day success plan.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'Risk management unit is the source of declining usage and possible competitor pilot. Must neutralize.',
        category: 'engagement',
      },
      {
        id: 'a4',
        rank: 4,
        title: 'Activate Priya Nair as New Champion',
        description: 'Invest in Priya as an internal advocate. Brief her on renewal timeline and equip her with ROI talking points for internal conversations.',
        impact: 'medium',
        urgency: 'this-week',
        reason: 'Champion gap is a major risk. Priya is already highly engaged and credible within the finance team.',
        category: 'engagement',
      },
      {
        id: 'a5',
        rank: 5,
        title: 'Prepare Competitive Counter-Brief',
        description: 'Create a factual document comparing switching costs, migration timelines, and our roadmap vs. the rumored competitor.',
        impact: 'medium',
        urgency: 'this-week',
        reason: 'Intelligence suggests competitor evaluation in compliance. Arm the team before it escalates.',
        category: 'internal',
      },
    ],
  },

  // ── 2. TechCorp Global — Healthy Expansion Candidate ─────────────────────
  {
    id: 'techcorp-global',
    name: 'TechCorp Global',
    initials: 'TG',
    industry: 'Technology',
    arr: 420000,
    renewalDate: 'Jul 20, 2026',
    contractTerm: '24 months',
    plan: 'Business',
    scenario: 'expansion',
    healthScore: 87,
    brief: {
      adoptionSummary:
        'TechCorp Global has achieved exceptional platform adoption with 91% seat utilization across all 6 business units. Usage is growing month-over-month and the engineering team has built 4 custom integrations via the API.',
      valueHighlights: [
        'Reduced sprint planning time by 40% across 12 product teams',
        '$2.1M in productivity gains estimated by their internal audit',
        'API platform used to build 4 proprietary integrations',
        '91% seat utilization — highest in their industry peer group',
        'NPS of 74 — strong executive and end-user satisfaction',
      ],
      keyRisks: [
        'Engineering team requesting features not yet on roadmap',
        'Growing faster than their current plan supports',
        'Procurement renewal cycle is long — start early',
      ],
      recommendedStrategy:
        'Lead with an expansion conversation, not a renewal. They have outgrown their current plan. Present an Enterprise upgrade path with volume pricing and a dedicated technical account manager.',
      usageRate: 91,
      seatsUsed: 182,
      seatsTotal: 200,
      lastLoginDaysAgo: 1,
      npsScore: 74,
      supportTickets: 2,
      daysUntilRenewal: 124,
    },
    risk: {
      score: 18,
      trend: [
        { month: 'Oct', score: 42 },
        { month: 'Nov', score: 35 },
        { month: 'Dec', score: 28 },
        { month: 'Jan', score: 22 },
        { month: 'Feb', score: 19 },
        { month: 'Mar', score: 18 },
      ],
      drivers: [
        {
          id: 'r1',
          name: 'Roadmap Gap',
          severity: 'low',
          description: 'Engineering team has requested 3 features not on the near-term roadmap. Manageable with clear communication.',
          icon: 'Map',
        },
        {
          id: 'r2',
          name: 'Plan Capacity',
          severity: 'low',
          description: 'At 91% seat utilization, they will hit their limit within 60 days. Expansion opportunity or capacity risk.',
          icon: 'Users',
        },
      ],
    },
    objections: [
      {
        id: 'o1',
        title: "We need features that aren't on your roadmap",
        likelihood: 45,
        reason:
          'Engineering team is power-using the API and pushing platform limits. Feature gaps could stall adoption or drive a custom build.',
        talkingPoints: [
          'Walk through our 12-month roadmap and show how their top 2 requests are already scoped',
          'Offer early access to the Developer Preview program for the third request',
          'Propose a co-development partnership for the most strategic gap',
        ],
        proofPoints: [
          'Two of their three feature requests are slated for Q4 release',
          'API usage is top 5% of our customer base — they qualify for Developer Partner status',
        ],
      },
      {
        id: 'o2',
        title: "We want better pricing at this scale",
        likelihood: 38,
        reason:
          'At 200 seats and growing, procurement will expect volume pricing. This is a negotiating posture, not a churn signal.',
        talkingPoints: [
          'Acknowledge the scale they\'ve achieved and show appreciation for their growth',
          'Present the Enterprise tier pricing which unlocks volume discounts at 250+ seats',
          'Frame the upgrade as a value-add, not just more seats',
        ],
        proofPoints: [
          'Enterprise tier adds dedicated TAM, SLA upgrade, and API rate limit increase',
          'Volume pricing at 250 seats represents a 12% cost reduction per seat vs. current plan',
        ],
      },
    ],
    playbooks: [
      {
        id: 'pb1',
        type: 'expansion',
        title: 'Expansion Playbook',
        objective: 'Convert TechCorp to Enterprise tier and expand ARR by 40–60% through seat expansion and premium add-ons.',
        steps: [
          { step: 1, action: 'Expansion Discovery Call', detail: 'Meet with VP of Engineering and head of IT to understand growth plans and team roadmap for next 18 months.' },
          { step: 2, action: 'Enterprise Tier Proposal', detail: 'Present a tailored Enterprise proposal: 300 seats, dedicated TAM, SLA upgrade, API rate limit increase.' },
          { step: 3, action: 'Executive Alignment', detail: 'Loop in CTO for a strategic roadmap briefing. Position as a long-term technology partnership.' },
          { step: 4, action: 'Commercial Negotiation', detail: 'Work with procurement on multi-year pricing. Target a 2-year Enterprise commitment.' },
          { step: 5, action: 'Expansion Close', detail: 'Close expansion deal 60 days before original renewal. Begin onboarding additional teams.' },
        ],
        talkingPoints: [
          'You\'ve achieved 91% adoption — that\'s world-class. Let\'s build on that momentum.',
          'The Enterprise tier was designed for exactly where TechCorp is going.',
          'A 2-year commitment unlocks our best pricing and a dedicated technical partner.',
        ],
        risksToWatch: [
          'Procurement cycle can be long — initiate 90+ days before renewal',
          'Engineering leadership may want roadmap commitments in writing',
        ],
      },
    ],
    stakeholders: [
      {
        id: 's1',
        name: 'Jenna Rodriguez',
        title: 'VP of Engineering',
        role: 'champion',
        engagement: 'high',
        strength: 92,
        lastContact: '5 days ago',
        notes: 'Highly engaged advocate. Wants Enterprise features. Will champion internal expansion.',
        initials: 'JR',
      },
      {
        id: 's2',
        name: 'Alan Xu',
        title: 'CTO',
        role: 'economic-buyer',
        engagement: 'medium',
        strength: 71,
        lastContact: '6 weeks ago',
        notes: 'Supportive but focused on strategic value. Needs a roadmap briefing before signing off on expansion.',
        initials: 'AX',
      },
      {
        id: 's3',
        name: 'Taylor Kim',
        title: 'IT Operations Lead',
        role: 'decision-maker',
        engagement: 'high',
        strength: 84,
        lastContact: '1 week ago',
        notes: 'Manages integrations and API usage. Strong advocate. Useful for technical proof points.',
        initials: 'TK',
      },
      {
        id: 's4',
        name: 'Chris Patel',
        title: 'Senior Product Manager',
        role: 'power-user',
        engagement: 'high',
        strength: 90,
        lastContact: '3 days ago',
        notes: 'Top power user. Runs weekly team standups in-platform. Excellent for case study.',
        initials: 'CP',
      },
    ],
    actions: [
      {
        id: 'a1',
        rank: 1,
        title: 'Initiate Expansion Discovery Call',
        description: 'Schedule a joint call with VP Engineering and IT Ops to map 18-month growth plans and introduce Enterprise tier benefits.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'At 91% seat capacity, expansion is inevitable. Getting ahead of it with a structured conversation maximizes ARR.',
        category: 'meeting',
      },
      {
        id: 'a2',
        rank: 2,
        title: 'Deliver Product Roadmap Briefing to CTO',
        description: 'Host a 45-min roadmap briefing with Alan Xu. Cover Q3–Q4 releases and show how Engineering\'s feature requests are addressed.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'CTO alignment is essential before expansion proposal. Roadmap reassurance removes the biggest objection.',
        category: 'meeting',
      },
      {
        id: 'a3',
        rank: 3,
        title: 'Submit Enterprise Tier Proposal',
        description: 'Prepare and deliver a tailored Enterprise proposal: 300 seats, dedicated TAM, upgraded SLA, volume pricing model.',
        impact: 'high',
        urgency: 'this-month',
        reason: 'With 124 days to renewal, submitting a proposal now gives time for procurement to move without last-minute pressure.',
        category: 'content',
      },
      {
        id: 'a4',
        rank: 4,
        title: 'Nominate for Customer Advisory Board',
        description: 'Invite Jenna Rodriguez and Chris Patel to join our Customer Advisory Board. Deepens partnership and earns roadmap influence.',
        impact: 'medium',
        urgency: 'this-month',
        reason: 'Formalizing advocacy creates internal stickiness and gives them ownership in our roadmap direction.',
        category: 'engagement',
      },
    ],
  },

  // ── 3. RetailMax — High-Risk Rescue Account ───────────────────────────────
  {
    id: 'retailmax',
    name: 'RetailMax',
    initials: 'RM',
    industry: 'Retail & eCommerce',
    arr: 165000,
    renewalDate: 'Apr 18, 2026',
    contractTerm: '12 months',
    plan: 'Professional',
    scenario: 'high-risk',
    healthScore: 24,
    brief: {
      adoptionSummary:
        'RetailMax is critically under-adopted. Only 2 of 8 intended teams are using the platform. The original champion left the company 6 weeks ago, and the account has had zero CSM touchpoints in the last 45 days. A renewal conversation has not yet been initiated.',
      valueHighlights: [
        'Inventory reconciliation team reports 30% time savings',
        'API integration with Shopify has been stable for 8 months',
      ],
      keyRisks: [
        'Champion departed company 6 weeks ago — account unmanaged',
        'Only 2 of 8 business units actively using the platform',
        'No CSM engagement in 45 days',
        '31 days to renewal with no renewal conversation started',
        'Multiple unresolved support tickets — sentiment declining',
      ],
      recommendedStrategy:
        'This is a rescue situation requiring immediate executive escalation. Assign a senior CSM, schedule an emergency EBR, and lead with acknowledgment of the gaps. Offer a concrete activation plan with success milestones. Be prepared to negotiate.',
      usageRate: 24,
      seatsUsed: 19,
      seatsTotal: 80,
      lastLoginDaysAgo: 12,
      npsScore: 18,
      supportTickets: 14,
      daysUntilRenewal: 31,
    },
    risk: {
      score: 91,
      trend: [
        { month: 'Oct', score: 34 },
        { month: 'Nov', score: 45 },
        { month: 'Dec', score: 58 },
        { month: 'Jan', score: 71 },
        { month: 'Feb', score: 84 },
        { month: 'Mar', score: 91 },
      ],
      drivers: [
        {
          id: 'r1',
          name: 'Champion Departed',
          severity: 'high',
          description: 'Primary champion left the company 6 weeks ago. No replacement identified. Account is effectively unmanaged.',
          icon: 'UserX',
        },
        {
          id: 'r2',
          name: 'Critical Under-Adoption',
          severity: 'high',
          description: 'Only 24% seat utilization. 6 of 8 intended teams have never logged in. Core use case is not being realized.',
          icon: 'TrendingDown',
        },
        {
          id: 'r3',
          name: 'Support Escalations',
          severity: 'high',
          description: '14 open tickets, 5 beyond SLA. NPS has dropped to 18. Customer sentiment is actively negative.',
          icon: 'AlertTriangle',
        },
        {
          id: 'r4',
          name: 'No Renewal Engagement',
          severity: 'high',
          description: '31 days to renewal with zero renewal conversation initiated. This is a critical timeline miss.',
          icon: 'Clock',
        },
        {
          id: 'r5',
          name: 'No Executive Sponsor',
          severity: 'high',
          description: 'No C-level or VP touchpoint exists. Budget authority and renewal sign-off is unclear.',
          icon: 'Shield',
        },
      ],
    },
    objections: [
      {
        id: 'o1',
        title: "We haven't seen enough value to justify renewing",
        likelihood: 95,
        reason: 'Only 2 of 8 teams adopted. Original champion gone. No quantified outcomes documented. ROI is genuinely questionable.',
        talkingPoints: [
          'Acknowledge the adoption gap directly and own the CSM engagement failure',
          'Lead with the 30% time savings from the inventory team as a proof of value',
          'Propose a 90-day rescue plan with weekly check-ins and dedicated support',
          'Offer to co-define success metrics for the next contract year',
        ],
        proofPoints: [
          'Inventory reconciliation team: 30% time savings documented',
          'Shopify integration: 8 months stable, zero downtime incidents',
          'Other retail customers at full adoption realize $400K avg. annual savings',
        ],
      },
      {
        id: 'o2',
        title: "The timing isn't right — we're going through changes",
        likelihood: 72,
        reason: 'Champion departure signals broader internal instability. Renewal may be deprioritized or caught in organizational change.',
        talkingPoints: [
          'Express flexibility on renewal timing — offer a short-term bridge if needed',
          'Position the platform as a stability tool during organizational transitions',
          'Offer to brief the new champion candidate directly and handle their onboarding personally',
        ],
        proofPoints: [
          'Platforms deployed during organizational change show 2x faster time-to-value once leadership stabilizes',
        ],
      },
      {
        id: 'o3',
        title: "We need to right-size before renewing at full price",
        likelihood: 68,
        reason: 'At 24% utilization, procurement will push hard to pay only for what they\'re using.',
        talkingPoints: [
          'Acknowledge the utilization gap and offer a temporary right-size with a growth ramp',
          'Frame right-sizing as shared accountability — we own adoption, they own engagement',
          'Ensure any right-size includes minimum commitments to activate remaining teams',
        ],
        proofPoints: [
          'Similar accounts that right-sized and ran activation sprints expanded 1.8x within 12 months',
        ],
      },
    ],
    playbooks: [
      {
        id: 'pb1',
        type: 'rescue',
        title: 'Emergency Rescue Playbook',
        objective: 'Prevent churn within 31 days. Secure a renewal commitment even if right-sized. Establish a new champion and begin activation.',
        steps: [
          { step: 1, action: 'Immediate Escalation', detail: 'CSM and AE escalate to VP/Director level internally. Identify current decision-maker at RetailMax. Call today.' },
          { step: 2, action: 'Emergency EBR — 48 Hours', detail: 'Request an urgent EBR framed as a "partnership health check". Bring VP-level executive from our side.' },
          { step: 3, action: 'Own the Failure', detail: 'Acknowledge the CSM engagement gap. Present what went wrong and a clear remediation plan with commitments.' },
          { step: 4, action: 'Rescue Package', detail: 'Offer a right-sized renewal with an activation guarantee: reach X% adoption in 90 days or receive credit.' },
          { step: 5, action: 'New Champion Onboarding', detail: 'Identify and begin onboarding the new champion within 2 weeks of renewal close.' },
        ],
        talkingPoints: [
          'We haven\'t shown up for you the way we should have, and I want to fix that personally.',
          'I\'m willing to put our commitment in writing — if we don\'t hit adoption targets, you\'ll receive a credit.',
          'The inventory team has already seen 30% time savings. Let\'s replicate that across all 8 units.',
        ],
        risksToWatch: [
          'Decision-maker may already be in procurement process with a competitor',
          'Right-size offer may not be enough if they\'ve already decided to churn',
          'Internal escalation may slow down if new leadership is still being onboarded',
        ],
      },
    ],
    stakeholders: [
      {
        id: 's1',
        name: 'Jordan Mills',
        title: 'Head of Inventory Operations',
        role: 'power-user',
        engagement: 'medium',
        strength: 55,
        lastContact: '3 weeks ago',
        notes: 'Runs the only successful use case. Positive about the platform but not empowered to champion renewal.',
        initials: 'JM',
      },
      {
        id: 's2',
        name: 'Unknown',
        title: 'CTO / VP of Technology',
        role: 'economic-buyer',
        engagement: 'unknown',
        strength: 0,
        lastContact: 'Never',
        notes: 'Must identify and engage immediately. This person controls the renewal budget.',
        initials: '?',
        isGap: true,
      },
      {
        id: 's3',
        name: 'Unknown',
        title: 'New Champion (Post-departure)',
        role: 'champion',
        engagement: 'unknown',
        strength: 0,
        lastContact: 'Never',
        notes: 'Previous champion departed. New champion must be identified and onboarded immediately.',
        initials: '?',
        isGap: true,
      },
    ],
    actions: [
      {
        id: 'a1',
        rank: 1,
        title: 'Escalate Internally — Today',
        description: 'Flag this account to VP of CS and AE leadership. Assign a senior CSM immediately. This account is at critical risk in 31 days.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'Without immediate escalation, this account churns. No time to wait for the standard process.',
        category: 'internal',
      },
      {
        id: 'a2',
        rank: 2,
        title: 'Identify & Contact New Decision-Maker',
        description: 'Use LinkedIn, our internal notes, and Jordan Mills as a source to identify the new point of contact with budget authority.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'No known economic buyer = no path to renewal. This must be resolved in the next 24 hours.',
        category: 'engagement',
      },
      {
        id: 'a3',
        rank: 3,
        title: 'Request Emergency Business Review',
        description: 'Contact the new decision-maker for an urgent EBR. Frame as partnership health check. Bring executive from our side.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'With 31 days to renewal, an EBR is the only path to understand their intent and present the rescue plan.',
        category: 'meeting',
      },
      {
        id: 'a4',
        rank: 4,
        title: 'Resolve All Open Support Tickets',
        description: 'Fast-track all 14 open support tickets. Assign senior support engineer. Deliver resolution summary to the account contact.',
        impact: 'medium',
        urgency: 'immediate',
        reason: 'NPS of 18 signals active frustration. Unresolved tickets undermine any renewal conversation.',
        category: 'engagement',
      },
      {
        id: 'a5',
        rank: 5,
        title: 'Prepare Right-Size Rescue Package',
        description: 'Work with leadership on a rescue package: right-sized contract + adoption guarantee + dedicated success resources.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'At 24% utilization, a full-price renewal is nearly impossible to justify. A flexible package is needed to close.',
        category: 'internal',
      },
    ],
  },

  // ── 4. Nexus Enterprise — Multi-Stakeholder Enterprise ───────────────────
  {
    id: 'nexus-enterprise',
    name: 'Nexus Enterprise',
    initials: 'NE',
    industry: 'Healthcare Technology',
    arr: 780000,
    renewalDate: 'Jun 12, 2026',
    contractTerm: '36 months',
    plan: 'Enterprise Plus',
    scenario: 'enterprise',
    healthScore: 71,
    brief: {
      adoptionSummary:
        'Nexus Enterprise is a strategic account with a complex stakeholder environment spanning 11 business units and 3 regions. Adoption is solid in clinical operations but lagging in corporate finance and the EMEA region. Executive sponsorship is strong at the C-suite level but fragmented at VP layer.',
      valueHighlights: [
        'Clinical operations team cut documentation time by 35%',
        'Compliance reporting cycle reduced from 3 weeks to 4 days',
        'Platform integrated with 6 existing enterprise systems',
        '$4.2M in projected savings over the contract term',
        'Executive sponsor (CISO) is a public reference customer',
      ],
      keyRisks: [
        'EMEA adoption is 41% — significantly below global average',
        'VP of Finance is actively skeptical — blocking budget approval',
        'Renewal requires board-level sign-off due to ARR threshold',
        'Competitive threat from entrenched ERP vendor expanding features',
      ],
      recommendedStrategy:
        'Build a multi-threaded renewal coalition. Leverage the CISO as an executive sponsor to neutralize the VP of Finance objection. Launch a focused EMEA activation sprint. Present a board-ready ROI summary 60 days before renewal.',
      usageRate: 74,
      seatsUsed: 370,
      seatsTotal: 500,
      lastLoginDaysAgo: 1,
      npsScore: 61,
      supportTickets: 9,
      daysUntilRenewal: 89,
    },
    risk: {
      score: 41,
      trend: [
        { month: 'Oct', score: 52 },
        { month: 'Nov', score: 48 },
        { month: 'Dec', score: 44 },
        { month: 'Jan', score: 43 },
        { month: 'Feb', score: 42 },
        { month: 'Mar', score: 41 },
      ],
      drivers: [
        {
          id: 'r1',
          name: 'EMEA Adoption Gap',
          severity: 'medium',
          description: 'EMEA region at 41% utilization vs. 84% in AMER. Language localization and regional rollout gaps are primary causes.',
          icon: 'Globe',
        },
        {
          id: 'r2',
          name: 'Internal Stakeholder Risk',
          severity: 'medium',
          description: 'VP of Finance is actively skeptical and may block renewal budget approval at the board level.',
          icon: 'AlertCircle',
        },
        {
          id: 'r3',
          name: 'Board-Level Approval Required',
          severity: 'medium',
          description: 'ARR threshold triggers board review. Renewal must pass board finance committee — adds 6–8 weeks to process.',
          icon: 'Building',
        },
        {
          id: 'r4',
          name: 'Competitive ERP Expansion',
          severity: 'low',
          description: 'Incumbent ERP vendor (Oracle) has announced feature expansion that overlaps with 2 of our key use cases.',
          icon: 'Swords',
        },
      ],
    },
    objections: [
      {
        id: 'o1',
        title: "The EMEA rollout hasn't delivered",
        likelihood: 71,
        reason: 'EMEA regional performance is weak and board members from the EMEA region will raise this during budget review.',
        talkingPoints: [
          'Acknowledge the EMEA gap and present a funded activation plan with regional resources',
          'Show AMER benchmarks as proof of what\'s possible with proper rollout support',
          'Commit to EMEA-specific localization milestones in the renewal contract',
        ],
        proofPoints: [
          'AMER clinical operations: 84% utilization, 35% doc time reduction',
          'EMEA activation plan includes dedicated regional CSM and localized training materials',
        ],
      },
      {
        id: 'o2',
        title: "We're not sure this is better than upgrading our ERP",
        likelihood: 58,
        reason: 'Oracle\'s feature expansion creates doubt, especially with the VP of Finance who has an existing Oracle relationship.',
        talkingPoints: [
          'Best-of-breed vs. monolithic ERP: depth of function vs. jack-of-all-trades',
          'Integration with Oracle is a feature, not a conflict — we make Oracle more powerful',
          'Switching cost to Oracle\'s competing feature: 12+ months of disruption and re-training',
        ],
        proofPoints: [
          'Our clinical workflow depth is 7 years ahead of Oracle\'s newly announced features',
          'All 6 of our current enterprise system integrations include Oracle — we are complementary',
          '3 of our top 10 customers also use Oracle as their ERP with zero conflict',
        ],
      },
    ],
    playbooks: [
      {
        id: 'pb1',
        type: 'value-defense',
        title: 'Enterprise Renewal Coalition Playbook',
        objective: 'Build a multi-threaded renewal coalition across all stakeholder tiers. Secure board-level approval with a compelling ROI narrative.',
        steps: [
          { step: 1, action: 'CISO Sponsor Briefing', detail: 'Brief CISO on renewal timeline and stakeholder map. Ask for active sponsorship in internal conversations.' },
          { step: 2, action: 'VP Finance Engagement', detail: 'Request 1:1 with VP Finance. Lead with ROI data, not features. Understand their specific concerns and reframe them.' },
          { step: 3, action: 'EMEA Activation Sprint', detail: 'Launch a 45-day EMEA activation with a dedicated regional CSM and localized materials.' },
          { step: 4, action: 'Board-Ready ROI Summary', detail: 'Deliver a board-ready executive summary 60 days before renewal: $4.2M savings, compliance outcomes, EMEA plan.' },
          { step: 5, action: 'Board Presentation Support', detail: 'Offer to present alongside the internal team at the board finance committee meeting if appropriate.' },
        ],
        talkingPoints: [
          'Your CISO has made you a public reference. That\'s the strongest signal we have.',
          'The EMEA gap is real, and I\'m bringing resources to solve it — not to explain it away.',
          'At $780K ARR against $4.2M in projected savings, this is a 5.4x ROI story for the board.',
        ],
        risksToWatch: [
          'Board approval process can take 6–8 weeks — must initiate 90 days before renewal',
          'VP Finance remains a blocker if CISO cannot influence them directly',
        ],
      },
      {
        id: 'pb2',
        type: 'expansion',
        title: 'EMEA Expansion Playbook',
        objective: 'Convert EMEA adoption gap into an expansion opportunity by adding regional seats and support.',
        steps: [
          { step: 1, action: 'EMEA Regional Assessment', detail: 'Conduct a usage audit of all EMEA sites. Identify top 3 activation blockers.' },
          { step: 2, action: 'Localization Plan', detail: 'Present a localization roadmap: language support, regional training, GDPR compliance documentation.' },
          { step: 3, action: 'EMEA Pilot Team', detail: 'Identify 2–3 EMEA power users to seed internal adoption. Build their case study.' },
          { step: 4, action: 'EMEA Expansion Proposal', detail: 'Propose an EMEA seat expansion of 100+ seats with regional pricing as part of the renewal.' },
        ],
        talkingPoints: [
          'EMEA has the same potential as AMER — we just need the right regional support model.',
          'Let\'s add 100 EMEA seats to the renewal at regional pricing and give you a proper activation plan.',
        ],
        risksToWatch: [
          'EMEA expansion adds complexity to board approval process',
          'GDPR compliance must be documented before EMEA expansion can proceed',
        ],
      },
    ],
    stakeholders: [
      {
        id: 's1',
        name: 'Dr. Rachel Kim',
        title: 'CISO',
        role: 'champion',
        engagement: 'high',
        strength: 91,
        lastContact: '1 week ago',
        notes: 'Executive sponsor and public reference. Highly engaged. Will advocate internally for renewal.',
        initials: 'RK',
      },
      {
        id: 's2',
        name: 'Thomas Brennan',
        title: 'CFO',
        role: 'economic-buyer',
        engagement: 'medium',
        strength: 68,
        lastContact: '3 weeks ago',
        notes: 'Board member. Neutral on the platform. Will require a strong ROI narrative to approve budget.',
        initials: 'TB',
      },
      {
        id: 's3',
        name: 'Claudia Ferreira',
        title: 'VP of Finance',
        role: 'blocker',
        engagement: 'low',
        strength: 22,
        lastContact: '2 months ago',
        notes: 'Skeptical of the platform. Has an existing relationship with Oracle. Must be engaged and neutralized.',
        initials: 'CF',
      },
      {
        id: 's4',
        name: 'Amit Sharma',
        title: 'Head of Clinical Operations',
        role: 'power-user',
        engagement: 'high',
        strength: 88,
        lastContact: '3 days ago',
        notes: 'Best internal advocate. Has the strongest use case. Useful for board presentations.',
        initials: 'AS',
      },
      {
        id: 's5',
        name: 'Lena Hoffmann',
        title: 'EMEA Regional Director',
        role: 'decision-maker',
        engagement: 'low',
        strength: 35,
        lastContact: '6 weeks ago',
        notes: 'Controls EMEA rollout. Must be engaged to unblock EMEA adoption and support regional expansion.',
        initials: 'LH',
      },
    ],
    actions: [
      {
        id: 'a1',
        rank: 1,
        title: 'Brief CISO on Renewal Strategy',
        description: 'Align with Dr. Rachel Kim on renewal timeline and internal dynamics. Ask her to informally socialize the ROI story with Thomas Brennan and neutralize Claudia Ferreira.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'CISO is the strongest asset in this renewal. Activating her internal influence now is the highest-leverage action.',
        category: 'engagement',
      },
      {
        id: 'a2',
        rank: 2,
        title: 'Schedule 1:1 with VP Finance',
        description: 'Request a direct meeting with Claudia Ferreira. Lead with ROI framing and address Oracle concerns head-on with complementary positioning.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'Claudia is the primary internal blocker. Neutralizing her objections before the board review is critical.',
        category: 'meeting',
      },
      {
        id: 'a3',
        rank: 3,
        title: 'Launch EMEA Activation Sprint',
        description: 'Assign a dedicated EMEA CSM. Begin localization and identify 2–3 EMEA power users for a 45-day activation program.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'EMEA adoption gap is a board-level narrative risk. Showing progress before renewal review significantly strengthens the case.',
        category: 'engagement',
      },
      {
        id: 'a4',
        rank: 4,
        title: 'Deliver Board-Ready ROI Executive Summary',
        description: 'Prepare a 3-slide board-ready summary: $4.2M savings, compliance outcomes, EMEA activation plan, 5.4x ROI.',
        impact: 'high',
        urgency: 'this-month',
        reason: 'Board approval process requires 6–8 weeks. Delivering the ROI narrative 60 days before renewal is essential.',
        category: 'content',
      },
    ],
  },

  // ── 5. SmallBiz Pro — Cost-Sensitive Low Usage ────────────────────────────
  {
    id: 'smallbiz-pro',
    name: 'SmallBiz Pro',
    initials: 'SP',
    industry: 'Professional Services',
    arr: 48000,
    renewalDate: 'May 2, 2026',
    contractTerm: '12 months',
    plan: 'Professional',
    scenario: 'cost-sensitive',
    healthScore: 43,
    brief: {
      adoptionSummary:
        'SmallBiz Pro is a cost-sensitive SMB account with low seat utilization and inconsistent engagement. The owner-operator uses the platform personally but has not expanded usage to the wider 15-person team. Pricing pressure is expected at renewal.',
      valueHighlights: [
        'Owner saves ~6 hours/week on reporting and client updates',
        'Client portal used actively by 4 enterprise clients',
        'Zero support escalations in 12 months — reliable and stable platform',
      ],
      keyRisks: [
        'Only 3 of 15 seats actively used',
        'Owner evaluating cheaper alternatives to cut costs',
        'No team-wide adoption — single-threaded on the owner',
        'Annual budget review in progress — all software subscriptions under scrutiny',
      ],
      recommendedStrategy:
        'Lead with a right-size offer that acknowledges current usage, then present a team activation plan to demonstrate forward value. Avoid losing the account — even at a reduced ARR — to preserve the relationship and future expansion potential.',
      usageRate: 28,
      seatsUsed: 3,
      seatsTotal: 15,
      lastLoginDaysAgo: 4,
      npsScore: 44,
      supportTickets: 0,
      daysUntilRenewal: 45,
    },
    risk: {
      score: 71,
      trend: [
        { month: 'Oct', score: 40 },
        { month: 'Nov', score: 48 },
        { month: 'Dec', score: 54 },
        { month: 'Jan', score: 61 },
        { month: 'Feb', score: 66 },
        { month: 'Mar', score: 71 },
      ],
      drivers: [
        {
          id: 'r1',
          name: 'Low Seat Utilization',
          severity: 'high',
          description: 'Only 3 of 15 seats in use. Team has never been onboarded. Owner uses it as a personal productivity tool.',
          icon: 'Users',
        },
        {
          id: 'r2',
          name: 'Cost Scrutiny',
          severity: 'high',
          description: 'Annual budget review flagged all software subscriptions. Owner is evaluating lower-cost alternatives.',
          icon: 'DollarSign',
        },
        {
          id: 'r3',
          name: 'Single-Threaded Relationship',
          severity: 'medium',
          description: 'All platform value is tied to the owner. If they leave or deprioritize, the account has no remaining advocates.',
          icon: 'Link',
        },
        {
          id: 'r4',
          name: 'Low Feature Adoption',
          severity: 'low',
          description: 'Using ~20% of available features. Collaboration, automation, and analytics features untouched.',
          icon: 'Layers',
        },
      ],
    },
    objections: [
      {
        id: 'o1',
        title: "It's too expensive for what we're getting",
        likelihood: 88,
        reason: 'Paying for 15 seats, using 3. Owner has done the math. Cost per active user is hard to justify in a tight budget environment.',
        talkingPoints: [
          'Offer a right-size to 5 seats to match current usage — reduce friction on cost immediately',
          'Show what team activation would look like: at 15 active seats, cost-per-user drops to industry-low',
          'Reframe: the client portal alone saves 6 hours/week — at owner\'s hourly rate, ROI is already positive',
        ],
        proofPoints: [
          '6 hours/week saved × 48 weeks = 288 hours × $150/hr = $43,200 in recovered owner time',
          '$48K ARR for $43K+ in measurable time value = essentially break-even at current usage',
          'Right-sized to 5 seats = $18K ARR — strong value for the active use case',
        ],
      },
      {
        id: 'o2',
        title: "We found a cheaper alternative",
        likelihood: 61,
        reason: 'Budget review prompted comparison shopping. Several lower-cost SMB tools exist in this category.',
        talkingPoints: [
          'Ask: what features is the alternative offering that we\'re not? Often the answer is "it\'s just cheaper"',
          'Switching cost: data migration, retraining, rebuilding client portal integrations — quantify this',
          'Offer a loyalty pricing adjustment to close the cost gap without losing the account',
        ],
        proofPoints: [
          'Average SMB switching cost: 40–60 hours of owner time + 3 months of reduced productivity',
          'Client portal built on our platform would require complete rebuild on any alternative',
        ],
      },
    ],
    playbooks: [
      {
        id: 'pb1',
        type: 'value-defense',
        title: 'SMB Value Defense & Right-Size Playbook',
        objective: 'Retain the account by offering a right-sized package while presenting a credible team activation roadmap.',
        steps: [
          { step: 1, action: 'Proactive Right-Size Offer', detail: 'Reach out proactively before the owner raises cost concerns. Offer a 5-seat package at reduced ARR.' },
          { step: 2, action: 'ROI Conversation', detail: 'Walk through the time-savings math. 6 hours/week recovered = positive ROI at current usage.' },
          { step: 3, action: 'Team Activation Demo', detail: 'Show a 30-min demo of team collaboration features. Paint a picture of what full adoption looks like for their business.' },
          { step: 4, action: 'Loyalty Pricing Lock', detail: 'Offer locked annual pricing for 2 years as an incentive for early renewal commitment.' },
          { step: 5, action: 'Close on Retained ARR', detail: 'Secure a signed renewal at right-sized ARR. Schedule a 90-day check-in to measure adoption growth.' },
        ],
        talkingPoints: [
          'You\'re already getting value — 6 hours a week back is real money at your rate.',
          'Let\'s right-size today and build a plan to activate the full team over the next quarter.',
          'I\'d rather earn your full business over time than lose you over a pricing mismatch.',
        ],
        risksToWatch: [
          'Right-sizing reduces ARR — ensure any right-size includes a growth commitment',
          'If owner has already signed with a competitor, recovery is unlikely',
        ],
      },
    ],
    stakeholders: [
      {
        id: 's1',
        name: 'Alex Morrison',
        title: 'Founder & CEO',
        role: 'champion',
        engagement: 'medium',
        strength: 58,
        lastContact: '2 weeks ago',
        notes: 'Owner-operator. Only user driving real engagement. Pragmatic and cost-conscious. Needs a quick ROI story.',
        initials: 'AM',
      },
      {
        id: 's2',
        name: 'Alex Morrison',
        title: 'Founder & CEO',
        role: 'economic-buyer',
        engagement: 'medium',
        strength: 58,
        lastContact: '2 weeks ago',
        notes: 'Same person as champion — single-threaded. Sole decision-maker for renewal.',
        initials: 'AM',
      },
    ],
    actions: [
      {
        id: 'a1',
        rank: 1,
        title: 'Proactive Right-Size Outreach',
        description: 'Email Alex Morrison this week with a right-size offer before they raise it. Frame as a partnership gesture, not a reaction to churn risk.',
        impact: 'high',
        urgency: 'immediate',
        reason: 'Getting ahead of the cost conversation builds trust and preserves the relationship. Waiting gives competitors time to fill the gap.',
        category: 'engagement',
      },
      {
        id: 'a2',
        rank: 2,
        title: 'Send Personal ROI Summary',
        description: 'Deliver a simple 1-pager: time saved, client portal value, cost-per-hour recovered. Keep it practical and grounded in their business.',
        impact: 'high',
        urgency: 'this-week',
        reason: 'Owner thinks in practical terms. A clear ROI story in their language is the strongest retention tool available.',
        category: 'content',
      },
      {
        id: 'a3',
        rank: 3,
        title: 'Schedule Team Activation Demo',
        description: 'Offer a free 30-min session to show Alex what team collaboration would look like at full adoption.',
        impact: 'medium',
        urgency: 'this-week',
        reason: 'Alex has never seen the platform\'s team features. Seeing the future value may change the cost calculus.',
        category: 'meeting',
      },
      {
        id: 'a4',
        rank: 4,
        title: 'Offer 2-Year Loyalty Pricing',
        description: 'Present a 2-year renewal at locked annual pricing — provides budget certainty and reduces churn risk.',
        impact: 'medium',
        urgency: 'this-month',
        reason: 'Cost-sensitive customers respond well to pricing predictability. A 2-year lock creates stickiness.',
        category: 'content',
      },
    ],
  },
]

export const defaultAccountId = 'acme-financial'
