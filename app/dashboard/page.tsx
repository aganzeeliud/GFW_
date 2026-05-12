'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, TrendingUp, AlertTriangle, Activity, Download } from 'lucide-react'
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend,
  LineChart,
  Line,
  ComposedChart
} from 'recharts'
import { fetchMiningStats, MiningStats } from '@/lib/data-utils'

const comparisonData = [
  { year: '2018', miningArea: 45000, forestLoss: 450 },
  { year: '2019', miningArea: 58000, forestLoss: 620 },
  { year: '2020', miningArea: 72000, forestLoss: 890 },
  { year: '2021', miningArea: 95000, forestLoss: 1200 },
  { year: '2022', miningArea: 124000, forestLoss: 950 },
  { year: '2023', miningArea: 156000, forestLoss: 1400 },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<MiningStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMiningStats().then(data => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center animate-pulse" />

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Portal</span>
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              <h1 className="text-lg font-black tracking-tighter uppercase">Analytics Dashboard</h1>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition shadow-lg">
            <Download className="w-3 h-3" />
            Export Data
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Core Metrics Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-1">Mining Expansion vs Forest Loss</h2>
                <p className="text-sm text-slate-500 font-medium">Correlation between concession growth and deforestation (Buffer Zone).</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Mining Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400">Forest Loss</span>
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#ef4444', fontWeight: 700, fontSize: 12}} />
                  <ChartTooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}} />
                  <Bar yAxisId="left" dataKey="miningArea" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="forestLoss" stroke="#ef4444" strokeWidth={4} dot={{r: 6, fill: '#ef4444'}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <AlertTriangle className="w-24 h-24 text-red-500" />
              </div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Impact Score</p>
              <h4 className="text-6xl font-black tracking-tighter mb-4 italic">High</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">94% correlation between new permit grants and primary forest clearing in the southern buffer sector.</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">Risk Level</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full font-black">Critical</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Yearly Change in Area</p>
              <div className="space-y-6">
                {[
                  { year: '2023', change: '+32,000 ha', trend: 'up' },
                  { year: '2022', change: '+29,000 ha', trend: 'up' },
                  { year: '2021', change: '+23,000 ha', trend: 'up' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-900">{item.year} Growth</span>
                    <span className="text-sm font-black text-emerald-600">{item.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Temporal Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black tracking-tight mb-8">Concession Count by Year</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <ChartTooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center flex flex-col justify-center items-center">
            <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6">
              <Activity className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black mb-2">Automated Alerting</h3>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto mb-8">
              Our system generates monthly reports on any new mining applications that spatially intersect with the OWR boundary.
            </p>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition">
              Download Latest Report
            </button>
          </div>
        </div>

      </main>

    </div>
  )
}
