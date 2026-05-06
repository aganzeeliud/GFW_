import { Satellite, RefreshCw, Globe } from "lucide-react"

export function MethodologySection() {
  return (
    <section className="bg-primary text-primary-foreground rounded-2xl p-8 sm:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
        <Globe className="h-7 w-7" />
        Methodology
      </h2>
      <p className="text-primary-foreground/80 mb-8 max-w-3xl leading-relaxed">
        Our analysis utilizes Global Forest Watch (GFW) satellite monitoring data. The statistics presented here are specific to the Okapi Wildlife Reserve administrative boundaries and its surrounding 50km buffer zone.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-foreground/10 rounded-xl">
            <Satellite className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Satellite Imagery</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Using Landsat and Sentinel-2 data to track changes in tree cover canopy with 30m resolution.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-foreground/10 rounded-xl">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Annual Processing</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Data is processed annually to identify deforestation hotspots and evaluate conservation impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
