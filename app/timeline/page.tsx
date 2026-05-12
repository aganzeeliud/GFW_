'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Play, Pause, RotateCcw, History, Activity, Calendar } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip } from 'recharts'

const MapComponent = dynamic(() => import('@/components/shared/map-component'), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-900 animate-pulse" />
})

const evolutionData = [
  { year: 2006, inside: 7469, buffer: 283678, count: 24 },
  { year: 2007, inside: 206524, buffer: 304131, count: 42 },
  { year: 2008, inside: 11032, buffer: 159369, count: 17 },
  { year: 2009, inside: 4160, buffer: 265360, count: 18 },
  { year: 2010, inside: 0, buffer: 173545, count: 6 },
  { year: 2011, inside: 9589, buffer: 57782, count: 8 },
  { year: 2012, inside: 0, buffer: 221313, count: 14 },
  { year: 2018, inside: 12000, buffer: 450000, count: 12 },
  { year: 2019, inside: 18000, buffer: 520000, count: 18 },
  { year: 2020, inside: 25000, buffer: 610000, count: 25 },
  { year: 2021, inside: 42000, buffer: 780000, count: 42 },
  { year: 2022, inside: 68000, buffer: 920000, count: 68 },
  { year: 2023, inside: 83000, buffer: 1100000, count: 83 },
]

export default function TimelinePage() {
  const [currentYear, setCurrentYear] = useState(2006)
  const [isPlaying, setIsPlaying] = useState(false)

  const years = evolutionData.map(d => d.year)

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear(prev => {
          const nextIndex = years.indexOf(prev) + 1
          if (nextIndex >= years.length) {
            setIsPlaying(false)
            return prev
          }
          return years[nextIndex]
        })
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [isPlaying, years])

  const currentStats = evolutionData.find(d => d.year === currentYear)

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Portal</span>
          </Link>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-400" />
            <h1 className="text-sm font-black tracking-tighter uppercase leading-none">Historical Evolution</h1>
          </div>
        </div>
        <div className="text-3xl font-black text-white tracking-tighter">{currentYear}</div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Playback Controls Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl flex items-center gap-8">
          <button onClick={() => setCurrentYear(2006)} className="text-slate-400 hover:text-white transition">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <input 
            type="range" 
            min="2006" 
            max="2023" 
            step="1"
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="w-64 accent-emerald-500"
          />
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Selected Year</span>
            <span className="text-sm font-black text-white">{currentYear}</span>
          </div>
        </div>

        {/* Info Sidebar (Right) */}
        <div className="absolute top-6 right-6 w-80 z-40 space-y-4">
          <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
              <Activity className="w-3 h-3" /> Snapshot Metrics
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Inside Reserve</p>
                <p className="text-2xl font-black text-white">{currentStats?.inside.toLocaleString()} <span className="text-[10px] text-slate-500">ha</span></p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Buffer Zone</p>
                <p className="text-2xl font-black text-white">{currentStats?.buffer.toLocaleString()} <span className="text-[10px] text-slate-500">ha</span></p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Permits</p>
                <p className="text-2xl font-black text-white">{currentStats?.count}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-[2rem] shadow-2xl h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData}>
                <defs>
                  <linearGradient id="colorInside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="inside" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInside)" strokeWidth={2} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" hide />
                <YAxis hide />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-[8px] font-black text-center text-slate-500 uppercase tracking-widest mt-2">Area Growth Trend</p>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 bg-slate-900">
          <MapComponent filters={{ year: currentYear }} />
        </div>
      </div>
    </div>
  )
}
