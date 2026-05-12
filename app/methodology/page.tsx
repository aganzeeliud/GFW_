'use client'

import Link from 'next/link'
import { ArrowLeft, FileText, Database, Info, RefreshCw, Github, Shield } from 'lucide-react'

const datasets = [
  {
    name: 'CAMI Cadastre Minier',
    source: 'RDC Ministry of Mines',
    format: 'ArcGIS REST / CSV',
    retrieved: '2026-05-10',
    updated: 'Monthly',
    description: 'Official database of mining concessions, including permits (PR, PE, ZEA, AR).'
  },
  {
    name: 'IPIS DRC Mining Map',
    source: 'IPIS Research',
    format: 'WMS / GeoJSON',
    retrieved: '2026-04-15',
    updated: 'Quarterly',
    description: 'Artisanal mining site locations and armed group interference data.'
  },
  {
    name: 'USGS Copperbelt Dataset',
    source: 'ScienceBase / USGS',
    format: 'WMS',
    retrieved: '2024-02-01',
    updated: 'Fixed Publication',
    description: 'A database of artisanal and large-scale mining in the Copperbelt region.'
  },
  {
    name: 'Sentinel-2 Monitoring',
    source: 'Copernicus / EOX',
    format: 'WMS (Cloudless Mosaic)',
    retrieved: 'Live',
    updated: 'Annual Mosaic',
    description: 'High-resolution satellite imagery used for forest loss detection and site monitoring.'
  },
  {
    name: 'Forest Loss (GFC)',
    source: 'Hansen/UMD/GLAD',
    format: 'CSV / GeoJSON',
    retrieved: '2025-01-20',
    updated: 'Annual',
    description: 'Annual primary forest loss data used to correlate mining activity with environmental impact.'
  }
]

export default function MethodologyPage() {
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
              <FileText className="w-5 h-5 text-emerald-600" />
              <h1 className="text-lg font-black tracking-tighter uppercase">Methodology & Documentation</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/aganzeeliud/GFW_" target="_blank" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition">
              <Github className="w-4 h-4" />
              Repository
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Core Methodology */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Project Overview</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8">
            The OWR Mining Monitoring Platform is designed to provide real-time spatial evidence of industrial incursions within protected areas. By combining official government data with remote sensing, we create a transparent record of how mining permits overlap with the Okapi Wildlife Reserve's core and buffer zones.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-4">Spatial Analysis</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                We perform spatial joins between the official CAMI concession polygons and the OWR boundary (buffered at 10km). Any permit intersecting these zones is flagged for manual verification and forest loss analysis.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4">Data Synchronization</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our pipeline auto-synchronizes CSV records from field reports and CAMI exports into GeoJSON layers. This ensures that metadata like Application Date and Grant Status is always current.
              </p>
            </div>
          </div>
        </section>

        {/* Dataset Transparency */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Dataset Transparency</h2>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Dataset</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Source</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Format</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {datasets.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-900">{d.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">{d.description}</p>
                      </td>
                      <td className="px-6 py-5 text-xs font-bold text-slate-600">{d.source}</td>
                      <td className="px-6 py-5 text-xs font-medium text-slate-500">{d.format}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-3 h-3 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">{d.updated}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1">Retrieved: {d.retrieved}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* GIS Processing Workflow */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">Processing Workflow</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black shrink-0">1</div>
              <div>
                <h4 className="text-lg font-black mb-2 uppercase tracking-tight">Collection & Scraping</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Concession data is retrieved monthly from the CAMI portal. We focus on the Ituri and Haut-Uélé provinces to ensure full coverage of the OWR ecosystem.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black shrink-0">2</div>
              <div>
                <h4 className="text-lg font-black mb-2 uppercase tracking-tight">Geospatial Join</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Raw polygons are cleaned and joined with metadata using Python-based GIS scripts. Hectares are recalculated using a projection-aware algorithm (WGS 84 / UTM zone 35N).</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black shrink-0">3</div>
              <div>
                <h4 className="text-lg font-black mb-2 uppercase tracking-tight">Environmental Correlation</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Concession boundaries are overlaid with the GLAD Forest Loss datasets to calculate exact impact metrics for the current reporting year.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
          <h2 className="text-3xl font-black mb-6">Need raw data access?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">Datasets are available for download in CSV and GeoJSON formats for academic and non-profit use.</p>
          <div className="flex justify-center gap-4">
            <Link href="/explorer" className="px-8 py-4 bg-emerald-600 rounded-2xl font-black hover:bg-emerald-500 transition shadow-xl">
              Explorer
            </Link>
            <button className="px-8 py-4 bg-white/10 border border-white/10 rounded-2xl font-black hover:bg-white/20 transition backdrop-blur-md">
              Download Portal
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
