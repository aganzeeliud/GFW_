"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  AlertTriangle, 
  Download, 
  Layers, 
  ChevronDown,
  ChevronUp,
  Building2,
  Pickaxe,
  FileText,
  AreaChart,
  ExternalLink,
  Filter,
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
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
)

interface MiningConcession {
  code: string
  titulaire: string
  type: string
  statut: string
  mapref: string
  ressource: string
  dateoctroi: string
  dateexpire: string
  areavalue: number
  region: string
  territoire: string
  latitude: number
  longitude: number
  notes: string
}

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

export function MiningMap() {
  const [concessions, setConcessions] = useState<MiningConcession[]>([])
  const [isClient, setIsClient] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | "research" | "artisanal">("all")
  const [showReserve, setShowReserve] = useState(true)
  const [showBuffer, setShowBuffer] = useState(true)
  const [expandedTable, setExpandedTable] = useState(false)
  const [selectedConcession, setSelectedConcession] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    fetch("/data/mining-concessions-okapi.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").slice(1)
        const data: MiningConcession[] = lines
          .filter((line) => line.trim())
          .map((line) => {
            const parts = line.split(",")
            return {
              code: parts[0],
              titulaire: parts[1],
              type: parts[2],
              statut: parts[3],
              mapref: parts[4],
              ressource: parts[5],
              dateoctroi: parts[6],
              dateexpire: parts[7],
              areavalue: parseInt(parts[8]) || 0,
              region: parts[9],
              territoire: parts[10],
              latitude: parseFloat(parts[11]) || 0,
              longitude: parseFloat(parts[12]) || 0,
              notes: parts[13] || "",
            }
          })
        setConcessions(data)
      })
  }, [])

  const filteredConcessions = useMemo(() => {
    return concessions.filter((c) => {
      if (activeFilter === "all") return true
      if (activeFilter === "research") return c.type.includes("Recherches")
      if (activeFilter === "artisanal") return c.type.includes("Artisanale")
      return true
    })
  }, [concessions, activeFilter])

  const stats = useMemo(() => {
    const totalArea = filteredConcessions.reduce((sum, c) => sum + c.areavalue, 0)
    const uniqueCompanies = new Set(filteredConcessions.map((c) => c.titulaire)).size
    const researchCount = concessions.filter(c => c.type.includes("Recherches")).length
    const artisanalCount = concessions.filter(c => c.type.includes("Artisanale")).length
    return { totalArea, uniqueCompanies, researchCount, artisanalCount }
  }, [filteredConcessions, concessions])

  const handleDownloadCSV = () => {
    const link = document.createElement("a")
    link.href = "/data/mining-concessions-okapi.csv"
    link.download = "mining-concessions-okapi-wildlife-reserve.csv"
    link.click()
  }

  if (!isClient) {
    return (
      <section id="mining" className="mb-16">
        <div className="h-[600px] bg-muted animate-pulse rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-bounce" />
            <span className="text-muted-foreground font-medium">Loading interactive map...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="mining" className="mb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-accent/10 rounded-xl">
            <AlertTriangle className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Mining Concessions in Protected Area
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Active mining permits from CAMI (Cadastre Minier de la RDC) overlapping with the Okapi Wildlife Reserve 
              and its buffer zone in Ituri Province, Mambasa Territory.
            </p>
          </div>
        </div>
        
        {/* Warning Banner */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-foreground">Conservation Alert:</span>
            <span className="text-muted-foreground ml-1">
              {filteredConcessions.length} mining concessions identified within the protected area boundary. 
              Mining activities pose significant risks to biodiversity and indigenous Mbuti communities.
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className="p-2.5 bg-accent/10 rounded-lg">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{filteredConcessions.length}</div>
                <div className="text-xs text-muted-foreground">Total Permits</div>
              </div>
            </div>
            <div className="h-1 bg-accent/20">
              <div className="h-full bg-accent" style={{ width: "100%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.uniqueCompanies}</div>
                <div className="text-xs text-muted-foreground">Companies</div>
              </div>
            </div>
            <div className="h-1 bg-primary/20">
              <div className="h-full bg-primary" style={{ width: `${(stats.uniqueCompanies / 10) * 100}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className="p-2.5 bg-secondary/10 rounded-lg">
                <Pickaxe className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.researchCount}</div>
                <div className="text-xs text-muted-foreground">Research Permits</div>
              </div>
            </div>
            <div className="h-1 bg-secondary/20">
              <div className="h-full bg-secondary" style={{ width: `${(stats.researchCount / concessions.length) * 100}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className="p-2.5 bg-accent/10 rounded-lg">
                <AreaChart className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{(stats.totalArea * 84.955).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Hectares</div>
              </div>
            </div>
            <div className="h-1 bg-accent/20">
              <div className="h-full bg-accent" style={{ width: "75%" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeFilter === "all" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All ({concessions.length})
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeFilter === "research" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveFilter("research")}
            >
              Research ({stats.researchCount})
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeFilter === "artisanal" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveFilter("artisanal")}
            >
              Artisanal ({stats.artisanalCount})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant={showReserve ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setShowReserve(!showReserve)}
            className="gap-1.5"
          >
            <Layers className="h-4 w-4" />
            Reserve
          </Button>
          <Button 
            variant={showBuffer ? "default" : "outline"} 
            size="sm" 
            onClick={() => setShowBuffer(!showBuffer)}
            className="gap-1.5"
          >
            <Layers className="h-4 w-4" />
            Buffer Zone
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadCSV} className="gap-1.5">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <Card className="overflow-hidden mb-6">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-[500px] lg:h-[550px]">
              <MapContainer
                center={[1.4, 28.5]}
                zoom={8}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {showBuffer && (
                  <Polygon
                    positions={bufferZoneBoundary}
                    pathOptions={{
                      color: "#ea580c",
                      fillColor: "#ea580c",
                      fillOpacity: 0.08,
                      weight: 2,
                      dashArray: "8, 8",
                    }}
                  />
                )}

                {showReserve && (
                  <Polygon
                    positions={okapiReserveBoundary}
                    pathOptions={{
                      color: "#16a34a",
                      fillColor: "#16a34a",
                      fillOpacity: 0.15,
                      weight: 3,
                    }}
                  />
                )}

                {filteredConcessions.map((concession) => (
                  <Marker
                    key={concession.code}
                    position={[concession.latitude, concession.longitude]}
                    eventHandlers={{
                      click: () => setSelectedConcession(concession.code)
                    }}
                  >
                    <Popup>
                      <div className="min-w-[240px] p-1">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">{concession.code}</h4>
                            <p className="text-xs text-gray-600">{concession.titulaire}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            concession.type.includes("Recherches") 
                              ? "bg-blue-100 text-blue-700" 
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {concession.type.includes("Recherches") ? "Research" : "Artisanal"}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="font-medium text-gray-900">{concession.statut}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Resource</span>
                            <span className="font-medium text-gray-900">{concession.ressource}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Area</span>
                            <span className="font-medium text-gray-900">{concession.areavalue.toLocaleString()} carrés</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Territory</span>
                            <span className="font-medium text-gray-900">{concession.territoire}</span>
                          </div>
                          {concession.notes && (
                            <div className="pt-2 mt-2 border-t border-gray-100 text-gray-500 italic">
                              {concession.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg p-3 text-xs z-[1000]">
              <div className="font-semibold text-foreground mb-2">Legend</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-green-600/40 border-2 border-green-600 rounded-sm" />
                  <span className="text-muted-foreground">Okapi Reserve</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-orange-600/20 border-2 border-dashed border-orange-600 rounded-sm" />
                  <span className="text-muted-foreground">Buffer Zone (50km)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">Mining Permit</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            onClick={() => setExpandedTable(!expandedTable)}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold text-foreground">Concession Details</span>
              <Badge variant="secondary" className="font-normal">
                {filteredConcessions.length} records
              </Badge>
            </div>
            {expandedTable ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedTable && (
            <div className="border-t border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Code</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Company</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Resource</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Area (ha)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConcessions.map((c, idx) => (
                    <tr 
                      key={c.code} 
                      className={`border-t border-border hover:bg-muted/30 transition-colors ${
                        selectedConcession === c.code ? "bg-primary/5" : ""
                      } ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
                    >
                      <td className="p-3 font-mono text-xs">{c.code}</td>
                      <td className="p-3 font-medium">{c.titulaire}</td>
                      <td className="p-3">
                        <Badge variant={c.type.includes("Recherches") ? "secondary" : "default"} className="font-normal">
                          {c.type.includes("Recherches") ? "Research" : "Artisanal"}
                        </Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{c.ressource}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          c.statut === "En cours" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {c.statut}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono text-xs">
                        {Math.round(c.areavalue * 84.955).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Source */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-muted/50 rounded-xl text-sm">
        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-muted-foreground">
          <span className="font-medium text-foreground">Data Source:</span> Cadastre Minier de la RDC (CAMI) — {" "}
          <a
            href="https://drclicences.cami.cd/fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            drclicences.cami.cd
          </a>
          . Artisanal mining sites mapped by IPIS (International Peace Information Service) in western Mambasa territory.
        </div>
      </div>
    </section>
  )
}
