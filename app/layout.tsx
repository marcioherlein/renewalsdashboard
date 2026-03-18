import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Renewal Command Center — Win Renewals Before They Become Negotiations',
  description:
    'AI-powered renewal intelligence for enterprise sales teams. Surface risks, predict objections, and execute winning renewal strategies — weeks before the conversation starts.',
  keywords: ['renewal management', 'customer success', 'churn prevention', 'revenue retention', 'B2B SaaS'],
  authors: [{ name: 'Renewal Command Center' }],
  openGraph: {
    title: 'Renewal Command Center',
    description: 'Win renewals before they become negotiations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renewal Command Center',
    description: 'Win renewals before they become negotiations.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  )
}
