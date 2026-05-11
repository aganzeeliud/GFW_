'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, AlertTriangle, Info, Download, BarChart2, Zap, TrendingDown, Globe, Maximize2 } from 'lucide-react'
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  AreaChart,
  Area
} from 'recharts'

const impactData = [
  { year: '2017', miners: 12500, deforestation: 0, notes: 'IPIS identifies 74 mining pits' },
  { year: '2018', miners: 15000, deforestation: 0, notes: 'Expansion in western border' },
  { year: '2019', miners: 17500, deforestation: 0, notes: '30 mines closed by ecoguards' },
  { year: '2020', miners: 20000, deforestation: 844, notes: 'Semi-industrial gold mining begins' },
  { year: '2021', miners: 22500, deforestation: 980, notes: 'Intensifies along Ituri River' },
  { year: '2022', miners: 25000, deforestation: 1635, notes: '18 major sites; mercury use reported' },
  { year: '2023', miners: 25000, deforestation: 1890, notes: 'Primary forest loss peaks' },
]

const historicalLossData = [
  { year: 2001, loss: 1200, cumulative: 1200 },
  { year: 2005, loss: 1500, cumulative: 2700 },
  { year: 2010, loss: 2100, cumulative: 4800 },
  { year: 2015, loss: 2800, cumulative: 7600 },
  { year: 2020, loss: 844, cumulative: 8444 },
  { year: 2023, loss: 1890, cumulative: 11450 },
  { year: 2026, loss: 1500, cumulative: 15000 },
]

export default function ComparisonPage() {
  const correlation = 0.9398;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portal
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Analyse d'Impact & Statistiques</h1>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Surveillance de l'Okapi • 2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Forest Loss</span>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">15,000 ha</p>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">Période 2001-2026</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mines Actives</span>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">83 Sites</p>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">À l'intérieur de la réserve</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <BarChart2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corrélation</span>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">94%</p>
            <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">Mines vs Déforestation</p>
          </div>
        </div>

        {/* Correlation Card */}
        <div className="bg-slate-900 rounded-[3rem] p-12 mb-12 text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full -mr-48 -mt-48"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                  Analyse Statistique
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">Corrélation Positive Forte: {correlation}</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Nos données confirment une corrélation quasi-parfaite entre l'afflux de mineurs et l'accélération de la perte de forêt primaire. Le passage à l'exploitation semi-industrielle en 2020 a marqué un tournant critique.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <p className="text-7xl font-black tracking-tighter text-emerald-400 mb-2">0.94</p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Indice R²</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Trends Chart */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-tighter">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Tendances Annuelles (2017-2023)
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="top" height={36} iconType="circle"/>
                  <Bar yAxisId="left" dataKey="miners" fill="#10b981" radius={[6, 6, 0, 0]} name="Mineurs Estimés" />
                  <Line yAxisId="right" type="monotone" dataKey="deforestation" stroke="#ef4444" strokeWidth={5} name="Déforestation (ha)" dot={{ r: 6, fill: '#ef4444', strokeWidth: 3, stroke: '#fff' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cumulative Loss Chart */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-tighter">
              <BarChart2 className="w-5 h-5 text-blue-600" /> Perte Cumulative (2001-2026)
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalLossData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="cumulative" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={4} name="Total ha" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Documentation Comparison */}
        <div className="bg-white p-16 rounded-[4rem] border border-slate-200 shadow-sm mb-12">
          <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4 tracking-tighter uppercase">
            <AlertTriangle className="w-8 h-8 text-amber-500" /> Preuves de Conservation
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest">Global Forest Watch (GFW)</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                Les images satellite confirment que la perte de forêt irradie des centres miniers. En 2023, environ 75% des 1,890 hectares perdus étaient de la **forêt primaire**, habitat essentiel pour l'Okapi.
              </p>
              <ul className="space-y-4 text-sm text-slate-600 font-bold uppercase tracking-wide">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Pollution au Mercure
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Fragmentation de l'Habitat
                </li>
              </ul>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-widest">UNESCO & IPIS Reports</h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                L'UNESCO a classé la RFO comme "En Péril". Les enquêtes de terrain de l'IPIS ont identifié au moins **18 sites semi-industriels majeurs** opérant souvent sous protection de groupes armés.
              </p>
              <ul className="space-y-4 text-sm text-slate-600 font-bold uppercase tracking-wide">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Commerce de viande de brousse
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Sites "Kimia Mining" protégés
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-emerald-600 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
          <Info className="w-16 h-16 text-white/40 mx-auto mb-8" />
          <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">Données Ouvertes</h3>
          <p className="text-emerald-50 text-xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            Accédez aux jeux de données complets ayant servi à cette analyse. La transparence est le premier pas vers une conservation efficace.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/public/data/OWR_Mining_Inside.csv" className="px-10 py-5 bg-white text-emerald-700 rounded-3xl font-black hover:bg-emerald-50 transition shadow-2xl flex items-center gap-3 group text-lg">
              <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Dataset CSV (Mines)
            </Link>
            <Link href="/map" className="px-10 py-5 bg-emerald-900 text-white rounded-3xl font-black hover:bg-emerald-950 transition shadow-2xl flex items-center gap-3 text-lg">
              <Maximize2 className="w-6 h-6" />
              Voir sur la Carte
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
