'use client';

import Link from 'next/link';
import { 
  Shield, 
  MapPin, 
  Layers, 
  Activity, 
  Info, 
  ArrowRight,
  BarChart2,
  Globe,
  Search,
  Filter,
  Download,
  Menu,
  X,
  Maximize2,
  Languages
} from 'lucide-react';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/shared/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-900 animate-pulse">
      <p className="text-emerald-500 font-black tracking-widest uppercase">Initializing Cadastral Engine...</p>
    </div>
  )
})

const translations = {
  fr: {
    portal_title: "PORTAIL DU CADASTRE MINIER",
    portal_subtitle: "RDC - Réserve de Faune à Okapis",
    impact_analysis: "Analyse d'Impact",
    export_data: "Exporter Données",
    cadastral_nav: "Navigation Cadastrale",
    search_placeholder: "Rechercher code CAMI, Titulaire...",
    active_mines: "Mines Actives",
    pending_apps: "En Demande",
    details_title: "Détails du Titre Sélectionné",
    click_prompt: "Cliquez sur un polygone pour voir les détails",
    cami_code: "Code CAMI",
    type: "Type",
    zone: "Zone",
    app_date: "Demande",
    grant_date: "Octroi",
    expiry_date: "Expiration",
    legend: "Légende",
    pe_label: "Permis d'Exploitation (PE)",
    pr_label: "Permis de Recherche (PR)",
    ar_label: "Autorisation (AR)",
    asm_label: "Sites Artisanaux (IPIS/Delve)",
    pending_label: "Demande en cours",
    fullscreen_exp: "Explorateur Full-Screen",
    sources: "Sources",
    init_engine: "Initialisation du Moteur Cadastral..."
  },
  en: {
    portal_title: "MINING CADASTRE PORTAL",
    portal_subtitle: "DRC - Okapi Wildlife Reserve",
    impact_analysis: "Impact Analysis",
    export_data: "Export Data",
    cadastral_nav: "Cadastral Navigation",
    search_placeholder: "Search CAMI code, Holder...",
    active_mines: "Active Mines",
    pending_apps: "Pending",
    details_title: "Selected Title Details",
    click_prompt: "Click on a polygon to see details",
    cami_code: "CAMI Code",
    type: "Type",
    zone: "Zone",
    app_date: "Application",
    grant_date: "Grant",
    expiry_date: "Expiration",
    legend: "Legend",
    pe_label: "Exploitation Permit (PE)",
    pr_label: "Research Permit (PR)",
    ar_label: "Authorization (AR)",
    asm_label: "Artisanal Sites (IPIS/Delve)",
    pending_label: "Pending Application",
    fullscreen_exp: "Full-Screen Explorer",
    sources: "Sources",
    init_engine: "Initializing Cadastral Engine..."
  }
};

export default function Home() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [selectedSiteData, setSelectedSiteData] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const t = translations[lang];

  const getStatusDisplay = (status: string) => {
    if (status?.includes('Approuv') || status === 'Actif' || status === 'Active' || status?.includes('Force Majeure')) {
      return { label: lang === 'fr' ? 'Actif' : 'Active', bg: 'bg-emerald-500', text: 'text-white' }
    } else if (status?.includes('Demande') || status?.includes('Nouvelle') || status === 'Pending') {
      return { label: lang === 'fr' ? 'En attente' : 'Pending', bg: 'bg-amber-500', text: 'text-white' }
    }
    return { label: lang === 'fr' ? 'Inactif' : 'Inactive', bg: 'bg-slate-500', text: 'text-white' }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-slate-950 text-white overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Top Navbar - CAMI Style */}
      <nav className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none uppercase">{t.portal_title}</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{t.portal_subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/comparison" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition">{t.impact_analysis}</Link>
            <div className="h-4 w-px bg-slate-800"></div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black uppercase tracking-widest transition flex items-center gap-2">
              <Download className="w-4 h-4" /> {t.export_data}
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
          </div>
          
          <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setLang('fr')}
              className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${lang === 'fr' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${lang === 'en' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              EN
            </button>
          </div>

          <button className="md:hidden text-slate-400">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar - Statistics and Search */}
        <aside className={`${isSidebarOpen ? 'w-96' : 'w-0'} bg-slate-900 border-r border-slate-800 transition-all duration-300 overflow-hidden flex flex-col z-40`}>
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">{t.cadastral_nav}</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-600 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder={t.search_placeholder} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-emerald-500 transition shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.active_mines}</p>
                <h3 className="text-2xl font-black text-emerald-400">83</h3>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.pending_apps}</p>
                <h3 className="text-2xl font-black text-amber-400">185</h3>
              </div>
            </div>

            {/* Selected Site Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{t.details_title}</h3>
              
              {!selectedSiteData ? (
                <div className="py-12 text-center bg-slate-950/50 rounded-3xl border border-dashed border-slate-800">
                  <Info className="w-8 h-8 text-slate-800 mx-auto mb-4" />
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-widest px-8">{t.click_prompt}</p>
                </div>
              ) : (
                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-3 ${getStatusDisplay(selectedSiteData.statut).bg} ${getStatusDisplay(selectedSiteData.statut).text}`}>
                      {getStatusDisplay(selectedSiteData.statut).label}
                    </span>
                    <h4 className="text-xl font-black leading-tight text-white mb-1">{selectedSiteData.parties}</h4>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t.cami_code}: {selectedSiteData.code}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.type}</p>
                        <p className="text-sm font-bold">{selectedSiteData.type}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.zone}</p>
                        <p className="text-sm font-bold">{selectedSiteData.zone}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase">{t.app_date}</span>
                        <span className="text-xs font-bold">{selectedSiteData.date_app || '---'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase">{t.grant_date}</span>
                        <span className="text-xs font-bold">{selectedSiteData.date_grant || '---'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase">{t.expiry_date}</span>
                        <span className="text-xs font-bold text-red-400">{selectedSiteData.date_expiry || '---'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="p-4 bg-slate-950/30 rounded-2xl border border-slate-800">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{t.legend}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.pe_label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-emerald-500 rounded-sm"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.pr_label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.ar_label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-400 bg-emerald-400/20"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.asm_label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-dashed border-slate-400"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.pending_label}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-800 bg-slate-950/50">
            <Link href="/map" className="w-full flex items-center justify-between p-4 bg-emerald-600/10 border border-emerald-600/20 rounded-2xl text-emerald-400 font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600/20 transition group">
              {t.fullscreen_exp} 
              <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 relative">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-6 left-6 z-[1000] p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl text-emerald-400 hover:bg-slate-800 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          <MapComponent onSiteClick={(data) => setSelectedSiteData(data)} />

          {/* Map Controls Floating Overlay */}
          <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
            <button className="p-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl shadow-2xl text-slate-400 hover:text-white transition">
              <Layers className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl shadow-2xl text-slate-400 hover:text-white transition">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Source Attribution Badge */}
          <div className="absolute top-6 right-6 z-[1000] bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3 shadow-2xl">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t.sources}:</span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">CAMI • IPIS • GFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
