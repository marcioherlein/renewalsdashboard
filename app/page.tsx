import { HeroSection } from '@/components/hero/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { FeaturesStory } from '@/components/sections/FeaturesStory'
import { DemoWorkspace } from '@/components/demo/DemoWorkspace'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <FeaturesStory />
      <DemoWorkspace />
      <CTASection />
    </main>
  )
}
