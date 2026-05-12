'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Map as MapIcon, 
  Activity, 
  History, 
  BarChart3, 
  FileText, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ChevronRight
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts'
import { fetchMiningStats, MiningStats } from '@/lib/data-utils'

export default function LandingPage() {
  const [stats, setStats] = useState<MiningStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMiningStats().then(data => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  const COLORS = ['#ef4444', '#3b82f6', '#eab308', '#22c55e']

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const pieData = [
    { name: 'Active', value: stats?.activeCount || 0 },
    { name: 'Pending', value: stats?.pendingCount || 0 },
  ]

  const areaData = [
    { name: 'Inside', value: stats?.insideHectares || 0 },
    { name: 'Buffer', value: stats?.bufferHectares || 0 },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-emerald-100 font-sans pb-20">
      
      {/* Hero Header */}
      <header className="bg-slate-950 text-white pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">OWR Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
            Okapi Wildlife Reserve <br/>
            <span className="text-emerald-500">Mining Monitoring.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl font-medium leading-relaxed mb-12">
            A comprehensive geospatial intelligence system dedicated to tracking mining concessions and environmental impact within the Okapi Wildlife Reserve (DRC) and its critical buffer zones.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/explorer" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-500 transition shadow-xl flex items-center gap-3 group">
              Launch Interactive Map
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/methodology" className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-black hover:bg-white/20 transition backdrop-blur-md">
              View Methodology
            </Link>
          </div>
        </div>
      </header>

      {/* Statistics Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Inside Reserve</p>
            <h4 className="text-4xl font-black text-red-600 tracking-tighter">{(stats?.insideHectares || 0).toLocaleString()} <span className="text-sm text-slate-400">ha</span></h4>
            <p className="text-xs font-bold text-slate-500 mt-2">Total concession area</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Buffer Zone</p>
            <h4 className="text-4xl font-black text-blue-600 tracking-tighter">{(stats?.bufferHectares || 0).toLocaleString()} <span className="text-sm text-slate-400">ha</span></h4>
            <p className="text-xs font-bold text-slate-500 mt-2">Area under pressure</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Permits</p>
            <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{stats?.activeCount}</h4>
            <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Valid Concessions
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pending Apps</p>
            <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{stats?.pendingCount}</h4>
            <p className="text-xs font-bold text-amber-500 mt-2">In process at CAMI</p>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/explorer" className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-emerald-500 transition-all shadow-sm">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black mb-2">Interactive Map</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">Explore detailed mining layers, concessions, and spatial overlaps.</p>
            <span className="text-xs font-black uppercase text-emerald-600 flex items-center gap-1">
              Open Explorer <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          <Link href="/timeline" className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-blue-500 transition-all shadow-sm">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black mb-2">Historical Timeline</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">Visualize the temporal evolution of mining interests since 2006.</p>
            <span className="text-xs font-black uppercase text-blue-600 flex items-center gap-1">
              View History <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          <Link href="/dashboard" className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-amber-500 transition-all shadow-sm">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">In-depth statistical analysis and environmental impact charts.</p>
            <span className="text-xs font-black uppercase text-amber-600 flex items-center gap-1">
              View Analytics <ChevronRight className="w-4 h-4" />
            </span>
          </Link>

          <Link href="/methodology" className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-purple-500 transition-all shadow-sm">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black mb-2">Documentation</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">Learn about our data sources, workflows, and spatial methodology.</p>
            <span className="text-xs font-black uppercase text-purple-600 flex items-center gap-1">
              Read Docs <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Comparison Charts */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-[4rem] border border-slate-100 shadow-sm mb-24">
        <div className="px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Impact Analysis & Evolution</h2>
            <p className="text-slate-500 font-medium">Comparative data across zones and temporal trends.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mining Area: Inside vs Buffer</p>
              <div className="h-[300px] bg-slate-50 rounded-3xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <ChartTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Permit Status: Active vs Pending</p>
              <div className="h-[300px] bg-slate-50 rounded-3xl p-6 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historical Evolution (Permit Count)</p>
              <div className="h-[300px] bg-slate-50 rounded-3xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.evolutionData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <ChartTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Forest Loss Trends (Buffer Zone - ha)</p>
              <div className="h-[300px] bg-slate-50 rounded-3xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.forestLossData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700}} />
                    <ChartTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', r: 6}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Summary */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-900 text-white rounded-[4rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Activity className="w-full h-full text-emerald-500 rotate-12" />
        </div>
        <div className="relative z-10 px-6 md:px-12">
          <h2 className="text-4xl font-black tracking-tighter mb-8">Methodology & Transparency</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-8">
                We integrate official data from the DRC Mining Cadastre (CAMI) with satellite-derived environmental monitoring. Our spatial analysis workflow automatically detects overlaps between mining concessions and primary forest cover.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Spatial Join Automation</h4>
                    <p className="text-xs text-slate-500">Auto-synchronizing CSV records into GeoJSON layers.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500 mb-6">Core Data Pipeline</h4>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Primary Source</span>
                  <span className="font-black">CAMI Cadastre Minier</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Remote Sensing</span>
                  <span className="font-black">Sentinel-2 / GEE</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Update Frequency</span>
                  <span className="font-black">Monthly Synchronization</span>
                </li>
              </ul>
              <Link href="/methodology" className="mt-8 block text-center py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-emerald-500 hover:text-white transition">
                Detailed Methodology
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
