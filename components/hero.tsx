import { MapPin, Trees, Shield, Radar } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with Okapi */}
      <div className="absolute inset-0">
        <Image
          src="/okapi.jpg"
          alt="Okapi in the Ituri Forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance">
          Okapi Wildlife Reserve
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Monitoring 25 years of forest health and conservation efforts in the heart of the Ituri Forest, DRC.
        </p>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <StatCard 
            icon={<Trees className="h-6 w-6" />}
            value="1.37M"
            label="Reserve Hectares"
          />
          <StatCard 
            icon={<Shield className="h-6 w-6" />}
            value="21,921"
            label="Reserve Loss (ha)"
          />
          <StatCard 
            icon={<MapPin className="h-6 w-6" />}
            value="433,399"
            label="Buffer Loss (ha)"
          />
          <StatCard 
            icon={<Radar className="h-6 w-6" />}
            value="50km"
            label="Monitoring Buffer"
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-5 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors">
      <div className="text-primary-foreground/80 mb-2 flex justify-center">{icon}</div>
      <div className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">{value}</div>
      <div className="text-xs sm:text-sm text-primary-foreground/70 uppercase tracking-wide font-medium">{label}</div>
    </div>
  )
}
