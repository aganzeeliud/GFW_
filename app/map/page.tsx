'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, Calendar, AlertCircle, ChevronDown, Info } from 'lucide-react'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

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

  const getStatusDisplay = (status: string) => {
    if (status === 'Demande Approuvée' || status === 'Active') {
      return { label: 'Active', bg: 'bg-red-100', text: 'text-red-900', dot: 'bg-red-500' }
    } else if (status === 'En Instance' || status === 'Pending') {
      return { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-900', dot: 'bg-amber-500' }
    }
    return { label: 'Inactive', bg: 'bg-slate-100', text: 'text-slate-900', dot: 'bg-slate-400' }
  }

  return (
    <main className="min-h-screen bg-slate-50">
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
            <div className="hidden md:block">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Monitoring 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Sidebar - Site Details */}
          <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-shrink-0">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Spatial Context</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Visualizing overlapping mining interests within the Okapi Wildlife Reserve (OWR) and its critical buffer zones.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> Active Concessions
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div> Pending Applications
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div> Inactive/Historical
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-y-auto">
              {!selectedSiteData ? (
                <div className="p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Info className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">No Site Selected</h3>
                  <p className="text-sm text-slate-400">Click on a polygon on the map to view detailed concession metadata.</p>
                </div>
              ) : (
                <div className="p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="mb-6">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-3 ${getStatusDisplay(selectedSiteData.statut).bg} ${getStatusDisplay(selectedSiteData.statut).text}`}>
                      {selectedSiteData.statut || 'Unknown Status'}
                    </span>
                    <h2 className="text-xl font-black text-slate-900 leading-tight">{selectedSiteData.parties || 'Unnamed Entity'}</h2>
                    <p className="text-sm text-slate-400 font-bold mt-1">Code: {selectedSiteData.code}</p>
                  </div>

                  <div className="space-y-4">
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
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</p>
                        <p className="text-sm font-bold text-slate-700">{selectedSiteData.type || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Application Date</p>
                          <p className="text-xs font-bold text-slate-600">{selectedSiteData.date_do || 'TBD'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grant Date</p>
                          <p className="text-xs font-bold text-slate-600">{selectedSiteData.date_de1 || 'Pending Approval'}</p>
                        </div>
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
            
            {/* Map Overlay Info */}
            <div className="absolute bottom-6 right-6 z-[400] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-2xl max-w-xs pointer-events-none">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-1">Data Source</h4>
                  <p className="text-[10px] leading-relaxed text-slate-600 font-medium">
                    CAMI DRC & IPIS (2025). Spatial accuracy varies by site classification. Coordinates are in WGS84.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
