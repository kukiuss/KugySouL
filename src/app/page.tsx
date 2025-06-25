import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { DemoSection } from '@/components/landing/demo-section'
import { AutopilotSection } from '@/components/landing/autopilot-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <AutopilotSection />
      <DemoSection />
    </main>
  )
}