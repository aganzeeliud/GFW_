'use client';

import Link from 'next/link';
import { 
  MapPin, 
  BarChart3, 
  Database, 
  Calendar, 
  Shield, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Info,
  ChevronRight,
  Lock,
  Layers,
  Activity,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Precise data for charts
const evolutionData = [
  { year: '2006', inside: 7469, buffer: 283678, insideCount: 4, bufferCount: 20 },
  { year: '2007', inside: 206524, buffer: 304131, insideCount: 27, bufferCount: 15 },
  { year: '2008', inside: 11032, buffer: 159369, insideCount: 2, bufferCount: 15 },
  { year: '2009', inside: 4160, buffer: 265360, insideCount: 1, bufferCount: 17 },
  { year: '2010', inside: 0, buffer: 173545, insideCount: 0, bufferCount: 6 },
  { year: '2011', inside: 9589, buffer: 57782, insideCount: 1, bufferCount: 7 },
  { year: '2012', inside: 0, buffer: 221313, insideCount: 0, bufferCount: 14 },
];

// Recent mining surge data (2017-2026)
const miningSurgeData = [
  { year: '2017', miners: 12500, deforestation: 0 },
  { year: '2018', miners: 15000, deforestation: 0 },
  { year: '2019', miners: 17500, deforestation: 0 },
  { year: '2020', miners: 20000, deforestation: 844 },
  { year: '2021', miners: 22500, deforestation: 980 },
  { year: '2022', miners: 25000, deforestation: 1635 },
  { year: '2023', miners: 25000, deforestation: 1890 },
  { year: '2024', miners: 25000, deforestation: 480 },
  { year: '2025', miners: 25000, deforestation: 1200 },
  { year: '2026', miners: 25000, deforestation: 1500 },
];

const datasets = [
  {
    name: 'Mining Activities (2017-2026)',
    source: 'IPIS, GFW & UNESCO',
    format: 'CSV Time-Series',
    icon: <Database className="w-5 h-5" />,
    description: 'Comprehensive tracking of artisanal and semi-industrial mining activities, deforestation, and workforce estimates.',
    downloadUrl: '/data/mining_activities_2017_2026.csv'
  },
  {
    name: 'Industrial Mining Impact',
    source: 'IPIS & Field Reports',
    format: 'CSV Analysis',
    icon: <Activity className="w-5 h-5" />,
    description: 'Detailed site-specific metrics for major semi-industrial operations like Muchacha and Bandisende.',
    downloadUrl: '/data/industrial_mining_impact_details.csv'
  },
  {
    name: 'Concessions Evolution',
    source: 'CAMI & IPIS',
    format: 'CSV History',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Historical timeline (2006-2012) of mining permit distribution inside and around the reserve.',
    downloadUrl: '/data/mining_concessions_evolution_2006_2012.csv'
  },
  {
    name: 'Mining Sites Summary',
    source: 'IPIS Field Surveys',
    format: 'CSV Summary',
    icon: <MapPin className="w-5 h-5" />,
    description: 'Qualitative results from thousands of geolocated site visits and illegal sourcing observations.',
    downloadUrl: '/data/owr_mining_site_summaries_2018_2023.csv'
  },
  {
    name: 'Mining Concessions (Inside)',
    source: 'CAMI & IPIS',
    format: 'GeoJSON + CSV',
    icon: <Lock className="w-5 h-5" />,
    description: 'High-precision spatial boundaries of mining activity within the OWR protection zones.',
    downloadUrl: '/data/OWR_Mining_Inside.csv'
  },
  {
    name: 'Forest Cover (ZAD)',
    source: 'Global Forest Watch',
    format: 'CSV Time-Series',
    icon: <Layers className="w-5 h-5" />,
    description: '25-year annual satellite-derived forest loss analysis (2001-2025) for ecological impact.',
    downloadUrl: '/data/ZAD forest cover.csv'
  }
];

export default function Home() {
  const totalInsideHa = 813652;
  const totalBufferHa = 2435916;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">OWR PORTAL</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#metrics" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">Metrics</a>
            <Link href="/comparison" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">Impact Analysis</Link>
            <a href="#data" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">Data</a>
            <Link href="/map" className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition shadow-md">
              Launch Map
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-emerald-50/50 to-transparent rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-black uppercase tracking-widest mb-8 border border-emerald-200">
            <Activity className="w-3.5 h-3.5" /> Conservation Intelligence Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Monitoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Okapi Wildlife</span> Reserve.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
            Bridging the gap between industrial activity and conservation. We track 268 mining concessions across 3.2M hectares in the DRC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-2xl shadow-emerald-200 flex items-center justify-center gap-2"
            >
              Interactive Map <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/comparison"
              className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2"
            >
              Mining Impact Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section id="metrics" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Inside Reserve</p>
            <h2 className="text-4xl font-black text-slate-900">{totalInsideHa.toLocaleString()} <span className="text-base font-medium text-slate-400">ha</span></h2>
            <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <TrendingUp className="w-4 h-4" /> 83 Active Concessions
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Buffer Zone</p>
            <h2 className="text-4xl font-black text-slate-900">{totalBufferHa.toLocaleString()} <span className="text-base font-medium text-slate-400">ha</span></h2>
            <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
              <TrendingUp className="w-4 h-4" /> 185 External Permits
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Shield className="w-24 h-24 text-white" />
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Monitoring Span</p>
            <h2 className="text-4xl font-black text-white">25 <span className="text-base font-medium text-slate-500">Years</span></h2>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Info className="w-4 h-4" /> Satellite Data 2001-2025
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section id="evolution" className="bg-white py-32 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                Industrial <br /> Expansion <br /> Timeline.
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                Tracking the rapid acceleration of mining interest. Our data reveals peak permit approval years and spatial distribution trends that define the Reserve's current threat landscape.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-sm font-bold text-emerald-900">Inside Core Zone (Hectares)</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-bold text-blue-900">External Buffer Zone (Hectares)</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 h-[500px] bg-[#fdfdfd] rounded-[3rem] p-10 border border-slate-100 shadow-inner relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorInside" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBuffer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="inside" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorInside)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="buffer" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorBuffer)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Mining Surge Section */}
      <section id="surge" className="bg-[#fafafa] py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              The Mining Surge <span className="text-emerald-600">(2017-2026)</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Analyzing the critical transition from artisanal pits to semi-industrial operations. 
              The data highlights a significant escalation in both workforce and environmental impact.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-emerald-600" /> Miner Workforce Growth
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={miningSurgeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="miners" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" /> Deforestation Impact (ha)
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miningSurgeData}>
                    <defs>
                      <linearGradient id="colorDeforest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="deforestation" 
                      stroke="#3b82f6" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorDeforest)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section id="data" className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Data Architecture.</h2>
          <p className="text-xl text-slate-500 font-medium">Official sources, rigorously processed for spatial integrity.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {datasets.map((ds, idx) => (
            <div key={idx} className="group bg-white rounded-[2.5rem] p-10 border border-slate-200 hover:border-emerald-500 transition-all duration-500 hover:shadow-2xl flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-2xl flex items-center justify-center transition-colors">
                  {ds.icon}
                </div>
                {ds.downloadUrl && (
                  <a 
                    href={ds.downloadUrl} 
                    download 
                    className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <Download className="w-4 h-4" /> CSV
                  </a>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{ds.name}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{ds.description}</p>
              <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase text-slate-400 pt-6 border-t border-slate-100 mt-auto">
                <span>Source</span>
                <span className="text-slate-900">{ds.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-emerald-600 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
            <Globe className="w-96 h-96 text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            Ready to explore the <br /> Okapi Wildlife Reserve?
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/map" className="px-10 py-5 bg-white text-emerald-600 rounded-3xl font-black hover:bg-slate-50 transition shadow-xl text-lg flex items-center justify-center gap-3">
              Open Map <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="/dashboard" className="px-10 py-5 bg-emerald-700 text-white rounded-3xl font-black hover:bg-emerald-800 transition text-lg">
              Launch Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-slate-900">OWR PORTAL</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-900 font-black text-xl mb-1">Conservation Data Science 2026</p>
              <p className="text-slate-400 font-bold text-sm tracking-[0.2em] uppercase leading-none">University of Applied Sciences</p>
            </div>
          </div>
          <div className="mt-16 pt-16 border-t border-slate-100 text-center text-slate-400 text-xs font-black tracking-widest uppercase">
            © 2026 Okapi Wildlife Reserve Intelligence Portal • DRC Monitoring Group
          </div>
        </div>
      </footer>
    </div>
  );
}
