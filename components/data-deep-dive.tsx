"use client"

import { BarChart3, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const lossData = [
  { year: "01", loss: 466 },
  { year: "02", loss: 589 },
  { year: "03", loss: 141 },
  { year: "04", loss: 354 },
  { year: "05", loss: 605 },
  { year: "06", loss: 356 },
  { year: "07", loss: 1241 },
  { year: "08", loss: 265 },
  { year: "09", loss: 759 },
  { year: "10", loss: 344 },
  { year: "11", loss: 810 },
  { year: "12", loss: 294 },
  { year: "13", loss: 443 },
  { year: "14", loss: 853 },
  { year: "15", loss: 739 },
  { year: "16", loss: 992 },
  { year: "17", loss: 1071 },
  { year: "18", loss: 1069 },
  { year: "19", loss: 1167 },
  { year: "20", loss: 1326 },
  { year: "21", loss: 1445 },
  { year: "22", loss: 1965 },
  { year: "23", loss: 1904 },
  { year: "24", loss: 1818 },
  { year: "25", loss: 904 },
]

const rateData = [
  { year: "01", rate: 0.03 },
  { year: "02", rate: 0.04 },
  { year: "03", rate: 0.01 },
  { year: "04", rate: 0.03 },
  { year: "05", rate: 0.04 },
  { year: "06", rate: 0.03 },
  { year: "07", rate: 0.09 },
  { year: "08", rate: 0.02 },
  { year: "09", rate: 0.06 },
  { year: "10", rate: 0.03 },
  { year: "11", rate: 0.06 },
  { year: "12", rate: 0.02 },
  { year: "13", rate: 0.03 },
  { year: "14", rate: 0.06 },
  { year: "15", rate: 0.05 },
  { year: "16", rate: 0.07 },
  { year: "17", rate: 0.08 },
  { year: "18", rate: 0.08 },
  { year: "19", rate: 0.09 },
  { year: "20", rate: 0.10 },
  { year: "21", rate: 0.11 },
  { year: "22", rate: 0.14 },
  { year: "23", rate: 0.14 },
  { year: "24", rate: 0.13 },
  { year: "25", rate: 0.07 },
]

export function DataDeepDive() {
  return (
    <section id="data" className="mb-16 scroll-mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
          <BarChart3 className="h-7 w-7 text-primary" />
          2001-2025 Data Analysis
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Detailed analysis of annual forest loss and deforestation rates within the reserve boundaries over 25 years.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Annual Loss Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <TrendingUp className="h-5 w-5" />
              Annual Forest Loss (ha)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lossData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    tickFormatter={(value) => `'${value}`}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} ha`, "Annual Loss"]}
                    labelFormatter={(label) => `Year 20${label}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="loss" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deforestation Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <BarChart3 className="h-5 w-5" />
              Deforestation Rate (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    tickFormatter={(value) => `'${value}`}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, "Deforestation Rate"]}
                    labelFormatter={(label) => `Year 20${label}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar 
                    dataKey="rate" 
                    fill="hsl(var(--secondary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
