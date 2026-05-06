import { TrendingDown, TrendingUp, Calendar, BarChart3, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const bufferZoneData = [
  { year: "2025", loss: "45,843 ha", change: "+14.4%" },
  { year: "2024", loss: "40,074 ha", change: "+23.5%" },
  { year: "2023", loss: "32,439 ha", change: "-19.6%" },
  { year: "2022", loss: "40,364 ha", change: "+50.8%" },
  { year: "2021", loss: "26,770 ha", change: "-11.7%" },
]

const insideReserveData = [
  { year: "2025", loss: "903.5 ha", change: "-50.3%" },
  { year: "2024", loss: "1,818.0 ha", change: "-4.5%" },
  { year: "2023", loss: "1,904.4 ha", change: "-3.1%" },
  { year: "2022", loss: "1,964.8 ha", change: "+35.9%" },
  { year: "2021", loss: "1,445.4 ha", change: "+8.9%" },
]

export function StatsOverview() {
  return (
    <section className="mb-16 space-y-12">
      {/* Buffer Zone Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Calendar className="h-7 w-7 text-accent" />
            Recent Buffer Zone Forest Loss
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Annual deforestation tracking in the 50km buffer zone surrounding the Okapi Wildlife Reserve (2021-2025).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {bufferZoneData.map((item) => (
            <Card key={item.year} className="border-t-4 border-t-accent overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-foreground">{item.year}</span>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-2">{item.loss}</div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.change.startsWith("+") ? "text-accent" : "text-secondary"
                }`}>
                  {item.change.startsWith("+") ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {item.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inside Reserve Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Shield className="h-7 w-7 text-primary" />
            Inside the Reserve Forest Loss
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Annual deforestation tracking within the protected boundaries of the Okapi Wildlife Reserve (2021-2025).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {insideReserveData.map((item) => (
            <Card key={item.year} className="border-t-4 border-t-primary overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-foreground">{item.year}</span>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-2">{item.loss}</div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.change.startsWith("+") ? "text-accent" : "text-secondary"
                }`}>
                  {item.change.startsWith("+") ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {item.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
