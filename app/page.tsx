import { Hero } from "@/components/hero"
import { StatsOverview } from "@/components/stats-overview"
import { YearlyCards } from "@/components/yearly-cards"
import { ForestMap } from "@/components/forest-map"
import { ComparisonSection } from "@/components/comparison-section"
import { EcologicalSection } from "@/components/ecological-section"
import { DataDeepDive } from "@/components/data-deep-dive"
import { MethodologySection } from "@/components/methodology-section"
import { MiningMap } from "@/components/mining-map"
import { LeafletCSS } from "@/components/leaflet-css"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LeafletCSS />
      <Navigation />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsOverview />
        <YearlyCards />
        <ForestMap />
        <MiningMap />
        <ComparisonSection />
        <EcologicalSection />
        <DataDeepDive />
        <MethodologySection />
      </div>
      <Footer />
    </main>
  )
}
