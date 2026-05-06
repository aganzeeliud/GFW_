"use client"

import { Leaf, PawPrint, Users, TreePine } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const coverData = [
  { year: "2001", cover: 1372134 },
  { year: "2003", cover: 1372459 },
  { year: "2005", cover: 1371995 },
  { year: "2007", cover: 1371360 },
  { year: "2009", cover: 1371841 },
  { year: "2011", cover: 1371790 },
  { year: "2013", cover: 1372157 },
  { year: "2015", cover: 1371861 },
  { year: "2017", cover: 1371529 },
  { year: "2019", cover: 1371434 },
  { year: "2021", cover: 1371155 },
  { year: "2023", cover: 1370696 },
  { year: "2025", cover: 1371697 },
]

export function EcologicalSection() {
  return (
    <section className="mb-16">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Ecological Significance */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
              <Leaf className="h-7 w-7 text-primary" />
              Ecological Significance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Okapi Wildlife Reserve occupies about one-fifth of the Ituri Forest. It protects a rich diversity of wildlife and provides a crucial carbon sink for the planet.
            </p>
          </div>

          <div className="space-y-6">
            <FeatureItem
              icon={<PawPrint className="h-6 w-6" />}
              title="Endemic Species"
              description="Home to one of the largest remaining populations of okapi, forest elephants, and chimpanzees."
            />
            <FeatureItem
              icon={<Users className="h-6 w-6" />}
              title="Indigenous Culture"
              description="Supporting the traditional nomadic Mbuti and Efe hunters who have lived here for millennia."
            />
            <FeatureItem
              icon={<TreePine className="h-6 w-6" />}
              title="Carbon Storage"
              description="The dense rainforest stores millions of tons of carbon, critical for climate regulation."
            />
          </div>
        </div>

        {/* Right: Forest Cover Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              Forest Cover Stability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coverData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[1368000, 1374000]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(2)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} ha`, "Forest Cover"]}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cover" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Forest cover has remained relatively stable inside the reserve boundaries over 25 years.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-secondary/10 rounded-xl text-secondary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
