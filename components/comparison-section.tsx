"use client"

import { Scale, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const comparisonData = [
  { year: "2001", reserve: 466, buffer: 4831 },
  { year: "2003", reserve: 141, buffer: 2861 },
  { year: "2005", reserve: 605, buffer: 6205 },
  { year: "2007", reserve: 1241, buffer: 14742 },
  { year: "2009", reserve: 759, buffer: 8857 },
  { year: "2011", reserve: 810, buffer: 10817 },
  { year: "2013", reserve: 443, buffer: 9404 },
  { year: "2015", reserve: 739, buffer: 14139 },
  { year: "2017", reserve: 1071, buffer: 26418 },
  { year: "2019", reserve: 1167, buffer: 25262 },
  { year: "2021", reserve: 1445, buffer: 26770 },
  { year: "2023", reserve: 1904, buffer: 32439 },
  { year: "2025", reserve: 904, buffer: 45843 },
]

export function ComparisonSection() {
  return (
    <section id="comparison" className="mb-16 scroll-mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
          <Scale className="h-7 w-7 text-primary" />
          Reserve vs. Buffer Zone
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comparing forest loss inside the protected Okapi Wildlife Reserve versus the surrounding 50km buffer zone since 2001.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Annual Forest Loss Comparison (Hectares)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} ha`, ""]}
                  labelFormatter={(label) => `Year ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="reserve" 
                  name="Inside Reserve" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="buffer" 
                  name="Buffer Zone" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Inside Reserve</h3>
                <p className="text-3xl font-bold text-primary mb-2">21,921 ha</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cumulative loss since 2001. Protected status significantly limits deforestation within reserve boundaries.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">50km Buffer Zone</h3>
                <p className="text-3xl font-bold text-accent mb-2">433,399 ha</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cumulative loss since 2001. Area under high human pressure and agricultural expansion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
