import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { DemoSection } from '@/components/landing/demo-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
    </main>
  )
}