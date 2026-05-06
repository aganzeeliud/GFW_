"use client"

import { useState } from "react"
import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const yearlyData = {
  buffer: [
    { year: 2001, loss: 4831, rate: 0.15 },
    { year: 2002, loss: 5926, rate: 0.18 },
    { year: 2003, loss: 2861, rate: 0.09 },
    { year: 2004, loss: 5008, rate: 0.15 },
    { year: 2005, loss: 6205, rate: 0.19 },
    { year: 2006, loss: 5213, rate: 0.16 },
    { year: 2007, loss: 14742, rate: 0.45 },
    { year: 2008, loss: 4109, rate: 0.13 },
    { year: 2009, loss: 8857, rate: 0.27 },
    { year: 2010, loss: 6413, rate: 0.20 },
    { year: 2011, loss: 10817, rate: 0.33 },
    { year: 2012, loss: 6210, rate: 0.19 },
    { year: 2013, loss: 9404, rate: 0.29 },
    { year: 2014, loss: 14131, rate: 0.44 },
    { year: 2015, loss: 14139, rate: 0.44 },
    { year: 2016, loss: 18571, rate: 0.58 },
    { year: 2017, loss: 26418, rate: 0.82 },
    { year: 2018, loss: 26032, rate: 0.81 },
    { year: 2019, loss: 25262, rate: 0.79 },
    { year: 2020, loss: 26543, rate: 0.83 },
    { year: 2021, loss: 26770, rate: 0.84 },
    { year: 2022, loss: 34523, rate: 1.08 },
    { year: 2023, loss: 32439, rate: 1.02 },
    { year: 2024, loss: 40235, rate: 1.26 },
    { year: 2025, loss: 45843, rate: 1.44 },
  ],
  reserve: [
    { year: 2001, loss: 466, rate: 0.03 },
    { year: 2002, loss: 589, rate: 0.04 },
    { year: 2003, loss: 141, rate: 0.01 },
    { year: 2004, loss: 354, rate: 0.03 },
    { year: 2005, loss: 605, rate: 0.04 },
    { year: 2006, loss: 356, rate: 0.03 },
    { year: 2007, loss: 1241, rate: 0.09 },
    { year: 2008, loss: 265, rate: 0.02 },
    { year: 2009, loss: 759, rate: 0.06 },
    { year: 2010, loss: 344, rate: 0.03 },
    { year: 2011, loss: 810, rate: 0.06 },
    { year: 2012, loss: 294, rate: 0.02 },
    { year: 2013, loss: 443, rate: 0.03 },
    { year: 2014, loss: 853, rate: 0.06 },
    { year: 2015, loss: 739, rate: 0.05 },
    { year: 2016, loss: 992, rate: 0.07 },
    { year: 2017, loss: 1071, rate: 0.08 },
    { year: 2018, loss: 1069, rate: 0.08 },
    { year: 2019, loss: 1167, rate: 0.09 },
    { year: 2020, loss: 1326, rate: 0.10 },
    { year: 2021, loss: 1445, rate: 0.11 },
    { year: 2022, loss: 1965, rate: 0.14 },
    { year: 2023, loss: 1904, rate: 0.14 },
    { year: 2024, loss: 1818, rate: 0.13 },
    { year: 2025, loss: 904, rate: 0.07 },
  ],
}

function getTrend(current: number, previous: number) {
  const change = ((current - previous) / previous) * 100
  if (change > 5) return { icon: TrendingUp, color: "text-accent", label: "up" }
  if (change < -5) return { icon: TrendingDown, color: "text-primary", label: "down" }
  return { icon: Minus, color: "text-muted-foreground", label: "stable" }
}

export function YearlyCards() {
  const [zone, setZone] = useState<"buffer" | "reserve">("buffer")
  const data = yearlyData[zone]

  return (
    <section id="yearly" className="mb-16 scroll-mt-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
          <Calendar className="h-7 w-7 text-primary" />
          Year-by-Year Forest Loss
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Explore annual deforestation data for each year from 2001 to 2025.
        </p>

        {/* Slicer Buttons */}
        <div className="inline-flex rounded-lg border border-border bg-muted p-1 gap-1">
          <Button
            variant={zone === "buffer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setZone("buffer")}
            className={cn(
              "px-6 transition-all",
              zone === "buffer" && "bg-accent text-accent-foreground hover:bg-accent/90"
            )}
          >
            Buffer Zone
          </Button>
          <Button
            variant={zone === "reserve" ? "default" : "ghost"}
            size="sm"
            onClick={() => setZone("reserve")}
            className={cn(
              "px-6 transition-all",
              zone === "reserve" && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            Inside Reserve
          </Button>
        </div>
      </div>

      {/* Year Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data.map((item, index) => {
          const previous = index > 0 ? data[index - 1].loss : item.loss
          const trend = getTrend(item.loss, previous)
          const TrendIcon = trend.icon

          return (
            <Card 
              key={item.year} 
              className={cn(
                "hover:shadow-lg transition-all hover:-translate-y-1 cursor-default overflow-hidden group",
                zone === "buffer" ? "hover:border-accent" : "hover:border-primary"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    zone === "buffer" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item.year}
                  </span>
                  <TrendIcon className={cn("h-4 w-4", trend.color)} />
                </div>
                
                <div className={cn(
                  "text-xl sm:text-2xl font-bold mb-1",
                  zone === "buffer" ? "text-accent" : "text-primary"
                )}>
                  {item.loss.toLocaleString()}
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">
                  hectares lost
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Rate</span>
                  <span className={cn(
                    "text-xs font-semibold px-1.5 py-0.5 rounded",
                    item.rate > 0.5 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item.rate.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <Card className={cn(
          "border-t-4",
          zone === "buffer" ? "border-t-accent" : "border-t-primary"
        )}>
          <CardContent className="p-5 text-center">
            <div className="text-sm text-muted-foreground mb-1">Total Loss (2001-2025)</div>
            <div className={cn(
              "text-2xl font-bold",
              zone === "buffer" ? "text-accent" : "text-primary"
            )}>
              {data.reduce((sum, d) => sum + d.loss, 0).toLocaleString()} ha
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(
          "border-t-4",
          zone === "buffer" ? "border-t-accent" : "border-t-primary"
        )}>
          <CardContent className="p-5 text-center">
            <div className="text-sm text-muted-foreground mb-1">Average Annual Loss</div>
            <div className={cn(
              "text-2xl font-bold",
              zone === "buffer" ? "text-accent" : "text-primary"
            )}>
              {Math.round(data.reduce((sum, d) => sum + d.loss, 0) / data.length).toLocaleString()} ha
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(
          "border-t-4",
          zone === "buffer" ? "border-t-accent" : "border-t-primary"
        )}>
          <CardContent className="p-5 text-center">
            <div className="text-sm text-muted-foreground mb-1">Peak Year</div>
            <div className={cn(
              "text-2xl font-bold",
              zone === "buffer" ? "text-accent" : "text-primary"
            )}>
              {data.reduce((max, d) => d.loss > max.loss ? d : max).year}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
