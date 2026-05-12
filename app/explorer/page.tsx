'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ChevronRight, 
  X, 
  Calendar, 
  Building2, 
  Layers, 
  Maximize2,
  AlertTriangle,
  Info,
  ChevronDown
} from 'lucide-react'
import { MapFilters } from '@/components/shared/map-component'
import { fetchUniqueCompanies } from '@/lib/data-utils'
import { permitCategoriesData, getPermitCategory, getStatusBadge } from '@/lib/permit-utils'

const MapComponent = dynamic(() => import('@/components/shared/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-900 animate-pulse">
      <p className="text-emerald-500 font-black uppercase tracking-widest text-xs">Initializing CAMI Spatial Engine...</p>
    </div>
  )
})

export default function ExplorerPage() {
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [filters, setFilters] = useState<MapFilters & { category?: string; status?: string }>({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [companies, setCompanies] = useState<string[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchUniqueCompanies().then(setCompanies)
  }, [])

  const handleFilterChange = (key: keyof MapFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }))
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Portal</span>
          </Link>
          <div className="h-4 w-px bg-white/10"></div>
          <div>
            <h1 className="text-sm font-black tracking-tighter uppercase leading-none">Mining Concessions Explorer</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Spatial Intelligence Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition flex items-center gap-2"
          >
            <Filter className="w-3 h-3" />
            {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar - Filters & Details */}
        <div className={`transition-all duration-300 ease-in-out border-r border-white/5 bg-slate-950 z-40 flex flex-col ${sidebarOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Active Filters */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Advanced Filtering
                </h2>
                {Object.keys(filters).length > 0 && (
                  <button 
                    onClick={() => setFilters({})}
                    className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operator / Company</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-3 h-3" />
                    <input 
                      type="text" 
                      list="company-list"
                      placeholder="Search company..." 
                      className="w-full pl-9 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-medium"
                      value={filters.company || ''}
                      onChange={(e) => handleFilterChange('company', e.target.value)}
                    />
                    {filters.company && (
                      <button 
                        onClick={() => handleFilterChange('company', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    <datalist id="company-list">
                      {companies.map(company => (
                        <option key={company} value={company} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Resource</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-3 h-3" />
                    <input 
                      type="text" 
                      placeholder="Search resource (Au, Cu, etc...)" 
                      className="w-full pl-9 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-medium"
                      value={filters.resource || ''}
                      onChange={(e) => handleFilterChange('resource', e.target.value)}
                    />
                    {filters.resource && (
                      <button 
                        onClick={() => handleFilterChange('resource', '')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Year</label>
                    <select 
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-medium appearance-none"
                      value={filters.year || ''}
                      onChange={(e) => handleFilterChange('year', parseInt(e.target.value))}
                    >
                      <option value="">All Years</option>
                      {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Approval Status</label>
                    <select 
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-medium appearance-none"
                      value={filters.status || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value || undefined }))}
                    >
                      <option value="">All Status</option>
                      <option value="Approuv">Approved</option>
                      <option value="Demande">Requested</option>
                      <option value="Instance">In Review</option>
                      <option value="Suspendu">Suspended</option>
                      <option value="Expiré">Expired</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Zone</label>
                  <select 
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs font-medium appearance-none"
                    value={filters.zone || ''}
                    onChange={(e) => handleFilterChange('zone', e.target.value)}
                  >
                    <option value="">All Zones</option>
                    <option value="Inside Reserve">Inside Reserve</option>
                    <option value="Buffer Zone">Buffer Zone</option>
                    <option value="OWR Region">OWR Region</option>
                  </select>
                </div>

                <hr className="border-white/10" />

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Permit Categories</label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {permitCategoriesData.categories.map(category => (
                      <div key={category.id}>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                          className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-xs font-bold uppercase tracking-widest transition ${
                            filters.category === category.id 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                              : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span text-lg>{category.icon}</span>
                            {category.name_en.split(' ').slice(0, 2).join(' ')}
                          </span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCategory === category.id && (
                          <div className="mt-1 bg-black/30 rounded-lg p-2 space-y-1 border border-white/5">
                            {category.permits.map(permit => (
                              <button
                                key={permit.code}
                                onClick={() => {
                                  setFilters(prev => ({ ...prev, category: category.id, type: permit.code }))
                                }}
                                className={`w-full text-left px-2 py-1.5 rounded text-[8px] font-medium leading-tight transition truncate ${
                                  filters.type === permit.code
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                }`}
                                title={permit.name_en}
                              >
                                {permit.short}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* Selection Details */}
            <section className="flex-1">
              {!selectedSite ? (
                <div className="text-center py-12 px-6 border-2 border-dashed border-white/5 rounded-[2rem]">
                  <Info className="w-8 h-8 text-slate-700 mx-auto mb-4" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Select a concession on the map to view detailed metadata.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-wider mb-2 inline-block">
                        {selectedSite.statut || 'Unknown Status'}
                      </span>
                      <h2 className="text-2xl font-black text-white leading-none tracking-tight mb-1">{selectedSite.parties || 'Unnamed Entity'}</h2>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Permit: {selectedSite.code}</p>
                    </div>
                    <button onClick={() => setSelectedSite(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Company / Operator</p>
                      </div>
                      <p className="text-sm font-bold text-white">{selectedSite.parties || 'N/A'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Layers className="w-4 h-4 text-blue-400" />
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</p>
                        </div>
                        <p className="text-sm font-bold text-white">{selectedSite.type || 'N/A'}</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Maximize2 className="w-4 h-4 text-amber-400" />
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Size (ha)</p>
                        </div>
                        <p className="text-sm font-bold text-white">{Math.round(selectedSite.sup_sig_ha || 0).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> Application
                        </span>
                        <span className="text-xs font-bold text-slate-300">{selectedSite.date_app || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> Grant Date
                        </span>
                        <span className="text-xs font-bold text-slate-300">{selectedSite.date_grant || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> Expiry Date
                        </span>
                        <span className="text-xs font-bold text-slate-300">{selectedSite.date_expiry || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {selectedSite.zone === 'Inside Reserve' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Spatial Conflict</p>
                      </div>
                      <p className="text-[10px] text-red-200/70 font-medium leading-relaxed">
                        This concession directly overlaps with the OWR Core Protection Zone. Industrial activity in this area is prohibited under DRC conservation laws.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-slate-900">
          <MapComponent 
            filters={filters} 
            onSiteClick={(data) => {
              setSelectedSite(data)
              setSidebarOpen(true)
            }} 
          />

          {/* Map Legend (Floating) */}
          <div className="absolute bottom-6 right-6 z-40 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xs pointer-events-none max-h-[400px] overflow-y-auto">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 sticky top-0 bg-slate-950/90">Map Legend (CAMI Categories)</h4>
            <div className="space-y-3">
              {permitCategoriesData.categories.map(category => (
                <div key={category.id} className="border-l-2 pl-3" style={{ borderColor: category.color }}>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <span>{category.icon}</span>
                    {category.name_en}
                  </p>
                  <div className="space-y-0.5">
                    {category.permits.slice(0, 2).map(permit => (
                      <div key={permit.code} className="text-[7px] text-slate-500 font-medium">
                        • {permit.short}
                      </div>
                    ))}
                    {category.permits.length > 2 && (
                      <div className="text-[7px] text-slate-600 font-medium italic">
                        + {category.permits.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
