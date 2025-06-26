import { EnhancedHeroSection } from '@/components/enhanced/enhanced-hero-section'
import { EnhancedFeaturesSection } from '@/components/enhanced/enhanced-features-section'
import { EnhancedDemoSection } from '@/components/enhanced/enhanced-demo-section'
import { AutopilotSection } from '@/components/landing/autopilot-section'

export default function Home() {
  return (
    <main>
      <EnhancedHeroSection />
      <EnhancedFeaturesSection />
      <AutopilotSection />
      <EnhancedDemoSection />
    </main>
  )
}