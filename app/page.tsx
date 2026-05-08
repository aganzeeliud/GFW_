'use client';

import Link from 'next/link';
import { MapPin, BarChart3, Database, Calendar, Info, ArrowRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

// Precise data from OWR_Mining_Inside.csv and OWR_Mining_Buffer.csv
const evolutionData = [
  { year: '2006', inside: 7469, buffer: 283678, insideCount: 4, bufferCount: 20 },
  { year: '2007', inside: 206524, buffer: 304131, insideCount: 27, bufferCount: 15 },
  { year: '2008', inside: 11032, buffer: 159369, insideCount: 2, bufferCount: 15 },
  { year: '2009', inside: 4160, buffer: 265360, insideCount: 1, bufferCount: 17 },
  { year: '2010', inside: 0, buffer: 173545, insideCount: 0, bufferCount: 6 },
  { year: '2011', inside: 9589, buffer: 57782, insideCount: 1, bufferCount: 7 },
  { year: '2012', inside: 0, buffer: 221313, insideCount: 0, bufferCount: 14 },
];

const datasets = [
  {
    name: 'OWR Mining Concessions (Inside)',
    source: 'DRC Mining Cadastre (CAMI) & IPIS',
    format: 'CSV + GeoJSON (Joined)',
    dateRetrieved: 'May 2025',
    description: 'High-precision spatial boundaries of 83 mining concessions located directly within the Okapi Wildlife Reserve protection zones.'
  },
  {
    name: 'OWR Mining Buffer Zone',
    source: 'DRC Mining Cadastre (CAMI) & IPIS',
    format: 'CSV + GeoJSON (Joined)',
    dateRetrieved: 'May 2025',
    description: '185 mining applications and permits within the critical 50km external buffer zone, monitoring industrial pressure on the reserve borders.'
  },
  {
    name: 'Forest Cover (ZAD)',
    source: 'Global Forest Watch (Hansen Lab)',
    format: 'CSV (Annual Time-Series)',
    dateRetrieved: 'May 2025',
    description: '25-year satellite-derived forest loss analysis (2001-2025) used to correlate industrial activity with ecological impact.'
  }
];

export default function Home() {
  const totalInsideHa = 813652;
  const totalBufferHa = 2435916;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
      {/* Hero Section - Optimized for 10-second impact */}
      <header className="bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-8 border border-emerald-100">
              <Shield className="w-4 h-4" /> Evidence-Based Conservation
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              Okapi Wildlife Reserve <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Intelligence Portal</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
              Monitoring the intersection of industry and nature. Our platform tracks 268 mining concessions across 
              3.2M hectares in the DRC, providing real-time transparency for funders and conservationists.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-lg">
              <Link
                href="/map"
                className="flex-1 px-8 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 text-lg"
              >
                <Globe className="w-6 h-6" /> Explore Map
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200 flex items-center justify-center gap-3 text-lg"
              >
                <BarChart3 className="w-6 h-6" /> View Analytics
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Primary Metrics */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100 group hover:border-emerald-500 transition-all duration-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Reserve Core Impact</p>
                <h2 className="text-5xl font-black text-slate-900 tabular-nums">{totalInsideHa.toLocaleString()} <span className="text-xl font-medium text-slate-400">ha</span></h2>
                <p className="text-slate-500 mt-4 font-medium">Industrial footprint inside the OWR boundaries</p>
              </div>
              <div className="p-5 bg-emerald-50 rounded-3xl text-emerald-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100 group hover:border-blue-500 transition-all duration-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Buffer Zone Pressure</p>
                <h2 className="text-5xl font-black text-slate-900 tabular-nums">{totalBufferHa.toLocaleString()} <span className="text-xl font-medium text-slate-400">ha</span></h2>
                <p className="text-slate-500 mt-4 font-medium">Industrial activity within 50km of Reserve borders</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-3xl text-blue-600 group-hover:scale-110 transition-transform">
                <TrendingUpIcon className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">25 Years of Monitoring</h3>
            <p className="text-slate-600 leading-relaxed">Continuous forest cover tracking from 2001 to 2025, identifying high-risk deforestation zones.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Integrated Datasets</h3>
            <p className="text-slate-600 leading-relaxed">Official mining cadastre data joined with spatial attributes for 100% transparency on permit status.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Lifecycle Tracking</h3>
            <p className="text-slate-600 leading-relaxed">Every concession tracked from application to expiry, allowing for proactive conservation planning.</p>
          </div>
        </div>
      </section>

      {/* Evolution Chart */}
      <section className="bg-white border-t border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-4">
                <Calendar className="w-10 h-10 text-emerald-600" /> Mining Evolution
              </h2>
              <p className="text-xl text-slate-600">Comparison of newly granted hectares per year. Tracking the rapid expansion of industrial interest between 2006 and 2012.</p>
            </div>
            <div className="flex gap-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-sm"></div>
                <span className="text-sm font-bold text-slate-700">Inside Reserve</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                <span className="text-sm font-bold text-slate-700">Buffer Zone</span>
              </div>
            </div>
          </div>
          
          <div className="h-[500px] w-full bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff', opacity: 0.4 }}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    padding: '20px',
                    fontWeight: 600
                  }}
                  formatter={(value: any, name: any, props: any) => {
                    const { insideCount, bufferCount } = props.payload;
                    const count = name === "Inside Reserve" ? insideCount : bufferCount;
                    return [`${value.toLocaleString()} ha (${count} permits)`, name];
                  }}
                />
                <Bar 
                  dataKey="inside" 
                  name="Inside Reserve" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                />
                <Bar 
                  dataKey="buffer" 
                  name="Buffer Zone" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 text-center text-sm text-slate-400 font-medium italic">
            * Data points represent the official hectares granted per year based on CAMI records.
          </div>
        </div>
      </section>

      {/* Dataset Transparency */}
      <section className="bg-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Data Pipeline Transparency</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Verified sources and consistent processing ensure the integrity of our conservation intelligence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {datasets.map((ds, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-[2rem] p-10 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{ds.name}</h3>
                <p className="text-slate-400 text-base mb-10 leading-relaxed font-medium">{ds.description}</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs tracking-widest font-bold border-b border-slate-700/50 pb-4">
                    <span className="text-slate-500 uppercase">Official Source</span>
                    <span className="text-emerald-400">{ds.source}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs tracking-widest font-bold border-b border-slate-700/50 pb-4">
                    <span className="text-slate-500 uppercase">Data Format</span>
                    <span className="text-slate-300">{ds.format}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs tracking-widest font-bold pb-2">
                    <span className="text-slate-500 uppercase">Last Updated</span>
                    <span className="text-slate-300">{ds.dateRetrieved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Navigation CTA */}
      <footer className="bg-white border-t border-slate-200 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-12">Ready to explore?</h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-24">
            <Link href="/map" className="group">
              <div className="flex items-center gap-4 text-2xl font-black text-emerald-600 group-hover:translate-x-2 transition-transform">
                Open Map <ArrowRight className="w-8 h-8" />
              </div>
            </Link>
            <Link href="/dashboard" className="group">
              <div className="flex items-center gap-4 text-2xl font-black text-blue-600 group-hover:translate-x-2 transition-transform">
                View Charts <ArrowRight className="w-8 h-8" />
              </div>
            </Link>
          </div>
          
          <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">OWR PORTAL</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-900 font-black text-lg">Conservation Data Science 2026</p>
              <p className="text-slate-400 font-bold text-sm tracking-wide mt-1 uppercase">University of Applied Sciences</p>
            </div>
          </div>
          <div className="mt-16 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
            © 2026 Okapi Wildlife Reserve Intelligence Portal • Built for Transparency
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom TrendingUpIcon
function TrendingUpIcon(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
