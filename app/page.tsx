'use client';

import Link from 'next/link';
import { MapPin, BarChart3, Database, Calendar, Info, ArrowRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

// Data extracted from OWR_Mining_Inside.csv and OWR_Mining_Buffer.csv
const evolutionData = [
  { year: '2006', inside: 7469, buffer: 283678 },
  { year: '2007', inside: 206524, buffer: 304131 },
  { year: '2008', inside: 11032, buffer: 159369 },
  { year: '2009', inside: 4160, buffer: 265360 },
  { year: '2010', inside: 0, buffer: 173545 },
  { year: '2011', inside: 9589, buffer: 57782 },
  { year: '2012', inside: 0, buffer: 221313 },
];

const datasets = [
  {
    name: 'OWR Mining Inside',
    source: 'DRC Mining Cadastre (CAMI) & IPIS',
    format: 'CSV, GeoJSON',
    dateRetrieved: 'May 2025',
    description: 'Mining concessions located within the official boundaries of the Okapi Wildlife Reserve.'
  },
  {
    name: 'OWR Mining Buffer',
    source: 'DRC Mining Cadastre (CAMI) & IPIS',
    format: 'CSV, GeoJSON',
    dateRetrieved: 'May 2025',
    description: 'Mining activity in the 50km buffer zone surrounding the reserve.'
  },
  {
    name: 'Forest Cover (ZAD)',
    source: 'Global Forest Watch (Hansen et al.)',
    format: 'CSV',
    dateRetrieved: 'May 2025',
    description: 'Time-series forest loss and cover data for the Okapi Wildlife Reserve region.'
  }
];

export default function Home() {
  const totalInsideHa = 813652;
  const totalBufferHa = 2435916;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <Info className="w-4 h-4" /> Monitoring Conservation Impact
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Okapi Wildlife Reserve <br />
            <span className="text-emerald-600">Conservation Intelligence Portal</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            A comprehensive data-driven platform for monitoring mining concessions and forest cover evolution 
            within the Okapi Wildlife Reserve (OWR) and its surrounding buffer zones in the DRC. 
            This portal integrates high-resolution satellite analysis with official mining records 
            to provide transparency and evidence for conservation funding and policy decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" /> Explore Interactive Map
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" /> View Data Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1">Inside Reserve</p>
              <h2 className="text-4xl font-black text-slate-900">{totalInsideHa.toLocaleString()} <span className="text-lg font-medium text-slate-500">ha</span></h2>
              <p className="text-slate-500 mt-2">Total area under mining concessions inside OWR</p>
            </div>
            <div className="hidden sm:block p-4 bg-emerald-50 rounded-full text-emerald-600">
              <div className="w-12 h-12 flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Buffer Zone</p>
              <h2 className="text-4xl font-black text-slate-900">{totalBufferHa.toLocaleString()} <span className="text-lg font-medium text-slate-500">ha</span></h2>
              <p className="text-slate-500 mt-2">Concessions in the 50km surrounding buffer</p>
            </div>
            <div className="hidden sm:block p-4 bg-blue-50 rounded-full text-blue-600">
              <div className="w-12 h-12 flex items-center justify-center">
                <TrendingUpIcon className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Chart Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-8 h-8 text-emerald-600" /> Mining Evolution Over Years
              </h2>
              <p className="text-slate-600 mt-2">Hectares granted per year within the Reserve vs the Buffer Zone</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium">Inside Reserve</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Buffer Zone</span>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 14 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="inside" 
                  name="Inside Reserve (ha)" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
                <Bar 
                  dataKey="buffer" 
                  name="Buffer Zone (ha)" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Data Transparency</h2>
            <p className="text-slate-400 max-w-2xl">Official datasets used for this analysis. All data is processed for spatial accuracy and temporal consistency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datasets.map((ds, idx) => (
              <div key={idx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500 transition">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{ds.name}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{ds.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs border-b border-slate-700 pb-2">
                    <span className="text-slate-500 font-semibold uppercase">Source</span>
                    <span className="text-slate-300">{ds.source}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-700 pb-2">
                    <span className="text-slate-500 font-semibold uppercase">Format</span>
                    <span className="text-slate-300">{ds.format}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-700 pb-2">
                    <span className="text-slate-500 font-semibold uppercase">Retrieved</span>
                    <span className="text-slate-300">{ds.dateRetrieved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center text-balance">Explore the Full Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/map" className="group">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Interactive Mining Map</h3>
              <p className="text-slate-600 mb-8 flex-grow">
                Visualize every mining concession with high-resolution spatial boundaries. 
                Filter by permit status, resource type, and zone.
              </p>
              <div className="flex items-center text-emerald-600 font-bold group-hover:gap-2 transition-all">
                Open Map <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>
          <Link href="/dashboard" className="group">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col h-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Analytics Dashboard</h3>
              <p className="text-slate-600 mb-8 flex-grow">
                Deep dive into forest loss trends from 2001 to 2025. 
                Compare mining pressure against historical ecological data.
              </p>
              <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                View Charts <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold text-slate-900">OWR Portal</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-900 font-bold">Conservation Data Science 2026</p>
              <p className="text-slate-500 text-sm mt-1">Building digital evidence for African conservation.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
            <p>© 2026 Okapi Wildlife Reserve Data Portal. Developed for educational and conservation research purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple placeholder for TrendingUp icon as Lucide might not have it or I want a custom one
function TrendingUpIcon(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
