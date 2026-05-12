'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  Shield, 
  Info, 
  Layers, 
  Map as MapIcon, 
  Activity, 
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Calendar,
  Building2,
  Maximize2
} from 'lucide-react'

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/shared/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-950 animate-pulse">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-emerald-500/70 font-black uppercase tracking-widest text-xs">Initializing CAMI Spatial Engine...</p>
      </div>
    </div>
  )
})

export default function LandingPage() {
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusInfo = (status: string) => {
    const s = status?.toLowerCase() || ''
    if (s.includes('approuv') || s.includes('octroy') || s.includes('valide')) {
      return { label: 'Active', color: 'text-emerald-400', bg: 'bg-emerald-400/10', dot: 'bg-emerald-500' }
    }
    if (s.includes('demande') || s.includes('instance')) {
      return { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-500' }
    }
    return { label: 'Expired/Other', color: 'text-slate-400', bg: 'bg-slate-400/10', dot: 'bg-slate-500' }
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase leading-none">OWR Mining Intelligence</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Geospatial Dashboard</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Status: UNESCO "In Danger"
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <nav className="flex items-center gap-4">
            <button className="text-xs font-bold text-slate-400 hover:text-white transition uppercase tracking-widest">About</button>
            <button className="text-xs font-bold text-slate-400 hover:text-white transition uppercase tracking-widest">Data Sources</button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-black hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 uppercase tracking-widest">
              Export Report
            </button>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`transition-all duration-300 ease-in-out border-r border-white/5 bg-slate-950 z-40 flex flex-col ${sidebarOpen ? 'w-96' : 'w-0 overflow-hidden'}`}>
          <div className="p-6 border-b border-white/5 shrink-0">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Spatial Explorer</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search permit code or company..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!selectedSite ? (
              <div className="space-y-6">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Context Summary</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    This platform integrates official CAMI data with satellite monitoring to track industrial incursions within the Okapi Wildlife Reserve. 
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Inside OWR</p>
                    <p className="text-xl font-black text-white">83</p>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-tighter mt-1">Critical Risk</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Buffer Zone</p>
                    <p className="text-xl font-black text-white">185</p>
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-tighter mt-1">High Pressure</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Quick Navigation</h4>
                  <div className="space-y-2">
                    {['Epulu Station', 'Ituri River Crossing', 'Mambasa Junction'].map((place) => (
                      <button key={place} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition group">
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white">{place}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                <button 
                  onClick={() => setSelectedSite(null)}
                  className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] mb-4 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Overview
                </button>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${getStatusInfo(selectedSite.statut).bg} ${getStatusInfo(selectedSite.statut).color}`}>
                      {selectedSite.statut || 'Unknown'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {selectedSite.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white leading-none tracking-tight mb-1">{selectedSite.parties || 'Unnamed Entity'}</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Permit: {selectedSite.code}</p>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Operator</p>
                    <p className="text-sm font-bold text-white">{selectedSite.parties || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Resources</p>
                    <p className="text-sm font-bold text-white">{selectedSite.resource || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Area</p>
                      <p className="text-sm font-bold text-white">{Math.round(selectedSite.sup_sig_ha || 0).toLocaleString()} ha</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Zone</p>
                      <p className="text-sm font-bold text-white">{selectedSite.zone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-white/5 shrink-0 bg-slate-950/50">
            <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              <span>Data Sync: 2026-05-12</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                CAMI Linked
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative bg-slate-900">
          <MapComponent onSiteClick={(data) => {
            setSelectedSite(data)
            setSidebarOpen(true)
          }} />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute left-4 top-4 z-40 w-10 h-10 bg-slate-950 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition shadow-2xl"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          <div className="absolute bottom-6 right-6 z-40 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xs">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Map Legend (CAMI Standard)</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#ff0055]"></div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Exploitation (PE/PER)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#00d5ff]"></div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Research (PR/AR)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm bg-[#ffd500]"></div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Artisanal (ZEA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
