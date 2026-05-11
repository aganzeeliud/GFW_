'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, Calendar, AlertCircle, ChevronDown, Info, BarChart3, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

// Data from evolution analysis
const evolutionData = [
  { year: '2006', inside: 7469, buffer: 283678, insideCount: 4, bufferCount: 20 },
  { year: '2007', inside: 206524, buffer: 304131, insideCount: 27, bufferCount: 15 },
  { year: '2008', inside: 11032, buffer: 159369, insideCount: 2, bufferCount: 15 },
  { year: '2009', inside: 4160, buffer: 265360, insideCount: 1, bufferCount: 17 },
  { year: '2010', inside: 0, buffer: 173545, insideCount: 0, bufferCount: 6 },
  { year: '2011', inside: 9589, buffer: 57782, insideCount: 1, bufferCount: 7 },
  { year: '2012', inside: 0, buffer: 221313, insideCount: 0, bufferCount: 14 },
];

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/shared/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-100 animate-pulse">
      <p className="text-slate-500 font-medium">Initializing Spatial Engine...</p>
    </div>
  )
})

export default function Map() {
  const [selectedSiteData, setSelectedSiteData] = useState<any>(null)
  const [showEvolution, setShowEvolution] = useState(false)

  const getStatusDisplay = (status: string) => {
    if (status === 'Demande Approuvée' || status === 'Active') {
      return { label: 'Active', bg: 'bg-red-100', text: 'text-red-900', dot: 'bg-red-500' }
    } else if (status === 'En Instance' || status === 'Pending') {
      return { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-900', dot: 'bg-amber-500' }
    }
    return { label: 'Inactive', bg: 'bg-slate-100', text: 'text-slate-900', dot: 'bg-slate-400' }
  }

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Portal
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Mining Concessions Explorer</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowEvolution(!showEvolution)}
                className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Evolution Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Sidebar - Site Details */}
          <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-shrink-0">
              <h2 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Spatial Context</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Visualizing overlapping mining interests within the Okapi Wildlife Reserve (OWR) and its critical buffer zones.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div> Active Concessions
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div> Pending Applications
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-y-auto">
              {!selectedSiteData ? (
                <div className="p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Info className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">No Site Selected</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-4">Click on a polygon on the map</p>
                </div>
              ) : (
                <div className="p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="mb-6">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-3 ${getStatusDisplay(selectedSiteData.statut).bg} ${getStatusDisplay(selectedSiteData.statut).text}`}>
                      {selectedSiteData.statut || 'Unknown Status'}
                    </span>
                    <h2 className="text-xl font-black text-slate-900 leading-tight">{selectedSiteData.parties || 'Unnamed Entity'}</h2>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">CAMI Code: {selectedSiteData.code}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Permit Type</p>
                      <p className="text-sm font-bold text-slate-700">{selectedSiteData.type || 'Not specified'}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resources</p>
                      <p className="text-sm font-bold text-slate-700">{selectedSiteData.resource || 'Not specified'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Area</p>
                        <p className="text-sm font-bold text-slate-700">{Math.round(selectedSiteData.sup_sig_ha || 0).toLocaleString()} ha</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Zone</p>
                        <p className="text-sm font-bold text-slate-700">{selectedSiteData.zone || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Application Date</span>
                        <span className="text-slate-900 font-bold">{selectedSiteData.date_app || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Grant Date</span>
                        <span className="text-slate-900 font-bold">{selectedSiteData.date_grant || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Expiry Date</span>
                        <span className="text-slate-900 font-bold">{selectedSiteData.date_expiry || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
            <MapComponent onSiteClick={(data) => setSelectedSiteData(data)} />
            
            {/* Evolution Data Overlay */}
            {showEvolution && (
              <div className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-white/95 backdrop-blur-xl z-[400] border-l border-slate-200 shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Mining Evolution</h3>
                  <button 
                    onClick={() => setShowEvolution(false)}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Area Expansion (Hectares)</p>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={evolutionData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                          <Area type="monotone" dataKey="inside" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="buffer" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Permit Count Progress</p>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={evolutionData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                          <Legend verticalAlign="top" height={36}/>
                          <Bar dataKey="insideCount" fill="#ef4444" name="Inside" radius={[4,4,0,0]} />
                          <Bar dataKey="bufferCount" fill="#3b82f6" name="Buffer" radius={[4,4,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
