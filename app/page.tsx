'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Map as MapIcon, 
  Search, 
  AlertCircle, 
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const evolutionData = [
  { year: '2006', inside: 7469, buffer: 283678 },
  { year: '2007', inside: 206524, buffer: 304131 },
  { year: '2008', inside: 11032, buffer: 159369 },
  { year: '2009', inside: 4160, buffer: 265360 },
  { year: '2010', inside: 0, buffer: 173545 },
  { year: '2011', inside: 9589, buffer: 57782 },
  { year: '2012', inside: 0, buffer: 221313 },
];

export default function LandingPage() {
  const [concessions, setConcessions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/all_concessions.json')
      .then(res => res.json())
      .then(data => {
        setConcessions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading concessions:", err);
        setLoading(false);
      });
  }, []);

  const filteredConcessions = concessions.filter(c => 
    c.parties?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.resource?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-emerald-100 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl px-8 py-4 flex items-center justify-between shadow-xl shadow-slate-200/20 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">OWR Portal</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#metrics" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition">Insights</Link>
            <Link href="/comparison" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition">Impact Analysis</Link>
            <Link href="/explorer" className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition">Explorer</Link>
            <Link href="/map" className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/20">
              Launch Map
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-52 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-emerald-100 shadow-sm mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            World Heritage In Danger Status: ACTIVE
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-slate-900">
            Data for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-emerald-600 to-blue-600">Preservation.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed mb-14">
            The Okapi Wildlife Reserve (OWR) faces an existential threat from industrial expansion. Our platform provides the spatial evidence needed for policy intervention, donor reporting, and global advocacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/map" className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-600 transition shadow-2xl flex items-center justify-center gap-3 group">
              Explore Evidence Map 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/standalone-portal/index.html" className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2">
              Static Version
            </Link>
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <section id="metrics" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col justify-between hover:border-red-500 transition-all group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Okapi Population</p>
            <div>
              <h4 className="text-5xl font-black text-red-600 tracking-tighter mb-2">-50%</h4>
              <p className="text-sm font-bold text-slate-500">Decline since 1995 due to habitat loss and mining incursions.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col justify-between hover:border-emerald-500 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Primary Forest</p>
            <div>
              <h4 className="text-5xl font-black text-emerald-600 tracking-tighter mb-2">75%</h4>
              <p className="text-sm font-bold text-slate-500">Of 2023 deforestation occurred in critical primary forest zones.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col justify-between hover:border-blue-500 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Active Miners</p>
            <div>
              <h4 className="text-5xl font-black text-blue-600 tracking-tighter mb-2">25K+</h4>
              <p className="text-sm font-bold text-slate-500">Estimated workforce operating within or adjacent to the reserve.</p>
            </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-2xl shadow-emerald-900/20 group">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-8 text-center">Threat Level</p>
            <div className="text-center">
              <h4 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase italic">Critical</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">UNESCO "In Danger" Listing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spatial Conflict Analysis */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white rounded-[4rem] border border-slate-100 shadow-sm my-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center px-6 md:px-12">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-8 text-slate-900 leading-[0.9]">Spatial Conflict <br/>Analysis.</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              While the reserve is legally protected, the DRC Mining Cadastre (CAMI) has granted 83 concessions inside the core zone. This chart demonstrates the direct pressure on protected land compared to the surrounding buffer zones.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-red-50 border border-red-100">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-sm font-black text-red-900 uppercase tracking-widest">Inside Reserve (High Risk)</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm font-black text-blue-900 uppercase tracking-widest">Buffer Zone (Pressure Points)</span>
              </div>
            </div>
          </div>
          <div className="relative bg-slate-50 p-6 md:p-10 rounded-[3rem] border border-slate-100 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 700, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600, fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="inside" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="buffer" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Bento Stats */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Reserve Insights.</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Critical data metrics at a glance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Forest Loss */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group hover:border-emerald-500 transition-all shadow-sm">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Forest Loss</p>
              <h3 className="text-7xl font-black text-slate-900 tracking-tighter">15,000<span className="text-3xl text-slate-300 ml-2">ha</span></h3>
              <div className="mt-6 flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest bg-red-50 w-fit px-4 py-2 rounded-full">
                <AlertCircle className="w-4 h-4" />
                Critical Trend
              </div>
            </div>
            <div className="mt-12 flex items-end gap-2 h-40">
              {[20, 35, 45, 60, 75, 90].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-emerald-600 rounded-t-2xl transition-all duration-500 group-hover:mb-2"
                  style={{ height: `${h}%`, opacity: (i + 1) / 6 }}
                ></div>
              ))}
            </div>
          </div>

          {/* Sites */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-sm hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-8 mb-6">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center shadow-inner">
                <MapIcon className="w-10 h-10" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Inside Reserve</p>
                <h4 className="text-5xl font-black text-slate-900 tracking-tighter">83 <span className="text-xl font-medium text-slate-300">Concessions</span></h4>
              </div>
            </div>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">813,652 hectares under direct mining pressure within core protection zones.</p>
          </div>

          {/* Buffer */}
          <div className="md:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm hover:border-blue-500 transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter">185</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Buffer Sites</p>
            </div>
          </div>

          {/* Correlation */}
          <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between group shadow-xl">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-4xl font-black text-white tracking-tighter">94%</h4>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Correlation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concession Directory */}
      <section id="directory" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">Concession Directory.</h2>
            <p className="text-slate-500 font-medium">Detailed database of mining permits.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, code or resource..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto p-4 md:p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Concession Data...</p>
            </div>
          ) : filteredConcessions.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-400 font-bold tracking-widest uppercase">
              No concessions found matching your search.
            </div>
          ) : (
            filteredConcessions.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black uppercase tracking-wider text-slate-500">{item.type}</span>
                  <span className="text-xs font-bold text-slate-400">#{item.code}</span>
                </div>
                <h4 className="font-black text-slate-900 leading-tight mb-2 truncate" title={item.parties}>{item.parties}</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <p className="text-xs font-bold text-slate-600 truncate">{item.resource}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Area</p>
                    <p className="text-xs font-black text-slate-900">{parseInt(item.sup_sig_ha || 0).toLocaleString()} ha</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${item.statut?.includes('Approuv') ? 'text-emerald-600' : 'text-amber-500'}`}>{item.statut}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 pb-24 mt-20">
        <div className="bg-slate-900 rounded-[5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter">Protect the Reserve.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/map" className="px-14 py-6 bg-white text-slate-900 rounded-full font-black text-xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group">
              Open Map 
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <p className="mt-20 text-slate-500 font-bold text-xs tracking-[0.5em] uppercase">
            © 2026 Okapi Wildlife Reserve Intelligence Portal
          </p>
        </div>
      </footer>
    </div>
  );
}
