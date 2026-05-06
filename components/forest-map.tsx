"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  TreePine, 
  History, 
  Play, 
  Pause, 
  RotateCcw,
  ShieldAlert,
  Info
} from "lucide-react"
import dynamic from "next/dynamic"

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
)
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

const yearlyData: Record<number, {loss: number, cover: number, rate: number, bufferLoss: number}> = {
  2001: {loss: 465.61, cover: 1372134.39, rate: 0.03, bufferLoss: 4831.4},
  2002: {loss: 589.10, cover: 1372010.90, rate: 0.04, bufferLoss: 8866.6},
  2003: {loss: 141.21, cover: 1372458.79, rate: 0.01, bufferLoss: 2860.6},
  2004: {loss: 353.86, cover: 1372246.14, rate: 0.03, bufferLoss: 4945.1},
  2005: {loss: 604.96, cover: 1371995.04, rate: 0.04, bufferLoss: 6204.8},
  2006: {loss: 356.42, cover: 1372243.58, rate: 0.03, bufferLoss: 3387.8},
  2007: {loss: 1240.54, cover: 1371359.46, rate: 0.09, bufferLoss: 14742.2},
  2008: {loss: 265.24, cover: 1372334.76, rate: 0.02, bufferLoss: 2357.0},
  2009: {loss: 759.31, cover: 1371840.69, rate: 0.06, bufferLoss: 8857.2},
  2010: {loss: 344.20, cover: 1372255.80, rate: 0.03, bufferLoss: 4629.2},
  2011: {loss: 810.00, cover: 1371790.04, rate: 0.06, bufferLoss: 10817.0},
  2012: {loss: 293.93, cover: 1372306.07, rate: 0.02, bufferLoss: 4755.1},
  2013: {loss: 443.34, cover: 1372156.66, rate: 0.03, bufferLoss: 9403.7},
  2014: {loss: 853.03, cover: 1371746.97, rate: 0.06, bufferLoss: 18345.2},
  2015: {loss: 738.58, cover: 1371861.42, rate: 0.05, bufferLoss: 14138.8},
  2016: {loss: 992.31, cover: 1371607.69, rate: 0.07, bufferLoss: 22422.5},
  2017: {loss: 1070.95, cover: 1371529.05, rate: 0.08, bufferLoss: 26417.9},
  2018: {loss: 1069.17, cover: 1371530.83, rate: 0.08, bufferLoss: 24351.8},
  2019: {loss: 1166.53, cover: 1371433.47, rate: 0.09, bufferLoss: 25262.3},
  2020: {loss: 1326.37, cover: 1371273.63, rate: 0.10, bufferLoss: 30312.2},
  2021: {loss: 1445.38, cover: 1371154.62, rate: 0.11, bufferLoss: 26770.0},
  2022: {loss: 1964.81, cover: 1370635.19, rate: 0.14, bufferLoss: 40363.9},
  2023: {loss: 1904.42, cover: 1370695.58, rate: 0.14, bufferLoss: 32438.9},
  2024: {loss: 1818.04, cover: 1370781.96, rate: 0.13, bufferLoss: 40074.4},
  2025: {loss: 903.45, cover: 1371696.55, rate: 0.07, bufferLoss: 45843.4}
};

const coreZones = [
  {name: 'Mont Mbia', lat: -0.8, lng: 27.5, base: 1.0},
  {name: 'Enjewe', lat: -1.2, lng: 27.8, base: 1050},
  {name: 'Forêt de Zoo', lat: -1.5, lng: 28.2, base: 10},
  {name: 'Lenda', lat: -1.0, lng: 28.0, base: 5},
  {name: 'Afarama', lat: -1.3, lng: 27.2, base: 135}
];

// Simplified boundaries based on the ones in mining-map.tsx
const okapiReserveBoundary: [number, number][] = [
  [2.15, 28.1],
  [2.15, 29.0],
  [1.85, 29.2],
  [1.4, 29.1],
  [1.0, 28.8],
  [0.9, 28.4],
  [1.1, 28.0],
  [1.5, 27.9],
  [1.9, 28.0],
  [2.15, 28.1],
]

const bufferZoneBoundary: [number, number][] = [
  [2.6, 27.5],
  [2.6, 29.5],
  [2.2, 29.8],
  [1.5, 29.7],
  [0.8, 29.3],
  [0.4, 28.8],
  [0.4, 28.0],
  [0.7, 27.5],
  [1.3, 27.3],
  [2.0, 27.3],
  [2.6, 27.5],
]

export function ForestMap() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear((prev) => {
          if (prev >= 2025) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 800)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const stats = useMemo(() => {
    let cumulative = 0
    for (let y = 2001; y <= currentYear; y++) {
      cumulative += yearlyData[y].loss
    }
    return { ...yearlyData[currentYear], cumulative }
  }, [currentYear])

  if (!isClient) return <div className="h-[600px] bg-muted animate-pulse rounded-xl" />

  return (
    <section id="forest-map" className="mb-16">
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <TreePine className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Forest Cover Evolution (2001-2025)
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Tracking deforestation patterns and primary forest health over 25 years. 
              Use the timeline slider to visualize the progression of forest loss.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Timeline Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-black text-primary mb-2 tracking-tighter">
                  {currentYear}
                </div>
                <Badge variant="outline" className="text-xs uppercase tracking-widest">
                  Selected Year
                </Badge>
              </div>

              <div className="space-y-4">
                <Slider
                  value={[currentYear]}
                  min={2001}
                  max={2025}
                  step={1}
                  onValueChange={(val) => {
                    setIsPlaying(false)
                    setCurrentYear(val[0])
                  }}
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-bold px-1">
                  <span>2001</span>
                  <span>2013</span>
                  <span>2025</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={isPlaying ? "destructive" : "default"}
                  className="w-full gap-2"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? "Pause" : "Play Evolution"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => {
                    setIsPlaying(false)
                    setCurrentYear(2001)
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                  Annual Loss
                </div>
                <div className="text-xl font-bold text-primary">
                  {stats.loss.toLocaleString()} <span className="text-xs font-normal">ha</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                  Buffer Loss
                </div>
                <div className="text-xl font-bold text-accent">
                  {stats.bufferLoss.toLocaleString()} <span className="text-xs font-normal">ha</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    Cumulative Loss (since 2001)
                  </div>
                  <div className="text-2xl font-bold text-destructive">
                    {stats.cumulative.toLocaleString()} <span className="text-sm font-normal">ha</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-muted/50 rounded-xl border border-border text-xs text-muted-foreground leading-relaxed">
            <div className="flex gap-2 mb-2">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span className="font-bold text-foreground">Map Note:</span>
            </div>
            Circle markers represent core management zones. Size indicates the relative intensity 
            of conservation pressure and habitat loss alerts in that specific sector for the selected year.
          </div>
        </div>

        {/* Map View */}
        <Card className="lg:col-span-8 overflow-hidden min-h-[500px]">
          <CardContent className="p-0 h-full relative">
            <div className="h-[500px] lg:h-full min-h-[500px]">
              <MapContainer
                center={[1.4, 28.5]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Polygon
                  positions={bufferZoneBoundary}
                  pathOptions={{
                    color: "#ea580c",
                    fillColor: "#ea580c",
                    fillOpacity: 0.05,
                    weight: 1,
                    dashArray: "5, 5",
                  }}
                />

                <Polygon
                  positions={okapiReserveBoundary}
                  pathOptions={{
                    color: "#16a34a",
                    fillColor: "#16a34a",
                    fillOpacity: 0.1,
                    weight: 2,
                  }}
                />

                {coreZones.map((zone) => {
                  const progress = (currentYear - 2001) / 24;
                  const radius = Math.sqrt(zone.base) * (progress * 1.5 + 0.5) + 5;
                  
                  return (
                    <CircleMarker
                      key={zone.name}
                      center={[zone.lat, zone.lng]}
                      radius={Math.min(radius, 40)}
                      pathOptions={{
                        fillColor: "#1e40af",
                        color: "#fff",
                        weight: 2,
                        fillOpacity: 0.6
                      }}
                    >
                      <Popup>
                        <div className="p-1">
                          <h4 className="font-bold text-sm">{zone.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pressure Index: {(zone.base * progress).toFixed(1)}
                          </p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  )
                })}

                {/* Hotspot indicator for high loss years */}
                {stats.loss > 1200 && (
                  <CircleMarker
                    center={[-1.3, 27.8]}
                    radius={50}
                    pathOptions={{
                      fillColor: "#dc2626",
                      color: "#fff",
                      weight: 3,
                      dashArray: "5, 10",
                      fillOpacity: 0.15
                    }}
                  />
                )}
              </MapContainer>
            </div>
            
            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 right-4 z-[1000] bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg text-[10px] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-800 opacity-60" />
                <span className="font-medium">Core Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-600 opacity-20 border border-green-600" />
                <span className="font-medium">OWR Boundary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border border-orange-600 border-dashed bg-orange-600/10" />
                <span className="font-medium">50km Buffer</span>
              </div>
              {stats.loss > 1200 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600 opacity-40 animate-pulse" />
                  <span className="font-medium text-red-600">High Loss Alert</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
