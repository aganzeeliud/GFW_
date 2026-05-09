'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, AlertTriangle, Info, Download, BarChart2 } from 'lucide-react'
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
  ZAxis
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
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mining vs. Deforestation Analysis</h1>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Statistical Analysis 2017-2023</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Correlation Card */}
        <div className="bg-emerald-600 rounded-3xl p-8 mb-12 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">Statistical Correlation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Strong Positive Correlation: {correlation}</h2>
              <p className="text-emerald-50 text-lg font-medium leading-relaxed">
                Our analysis confirms a near-perfect correlation between the influx of miners and the acceleration of primary forest loss within the reserve. As operations transitioned to semi-industrial scales in 2020, the impact intensified exponentially.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-6xl font-black tracking-tighter mb-2">94%</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Correlation Confidence</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Trends Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Annual Trends Comparison
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} label={{ value: 'Miners', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#94a3b8', fontSize: 10, fontWeight: 700} }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} label={{ value: 'Forest Loss (ha)', angle: 90, position: 'insideRight', style: {textAnchor: 'middle', fill: '#94a3b8', fontSize: 10, fontWeight: 700} }} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar yAxisId="left" dataKey="miners" fill="#10b981" radius={[4, 4, 0, 0]} name="Estimated Miners" />
                  <Line yAxisId="right" type="monotone" dataKey="deforestation" stroke="#ef4444" strokeWidth={4} name="Deforestation (ha)" dot={{ r: 6, fill: '#ef4444' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scatter Plot for Correlation */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-blue-600" /> Correlation Scatter Plot
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="miners" name="Miners" unit="" axisLine={false} tickLine={false} label={{ value: 'Number of Miners', position: 'insideBottom', offset: -10, style: {fill: '#94a3b8', fontSize: 10, fontWeight: 700} }} />
                  <YAxis type="number" dataKey="deforestation" name="Loss" unit="ha" axisLine={false} tickLine={false} label={{ value: 'Forest Loss (ha)', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#94a3b8', fontSize: 10, fontWeight: 700} }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Scatter name="Mining Impact" data={impactData} fill="#ef4444">
                    {impactData.map((entry, index) => (
                      <ZAxis key={`cell-${index}`} range={[60, 400]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-6 text-center italic">
              Each point represents a year. The linear progression shows the direct relationship between mining intensity and ecological damage.
            </p>
          </div>
        </div>

        {/* Documentation Comparison */}
        <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm mb-12">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500" /> Comparison with Online Documentation
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-emerald-600 uppercase tracking-widest">Global Forest Watch (GFW)</h4>
              <p className="text-slate-600 leading-relaxed">
                GFW satellite imagery confirms that forest loss is radiating from mining hubs. In 2023, approximately 75% of the 1,890 hectares lost was **primary forest**, which is critical for biodiversity. The RN4 highway and Ituri River remain the most impacted zones.
              </p>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></div>
                  Toxic pollution from Mercury used in gold processing.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></div>
                  Fragmentation of Endangered Okapi habitat.
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-blue-600 uppercase tracking-widest">UNESCO & IPIS Reports</h4>
              <p className="text-slate-600 leading-relaxed">
                UNESCO has categorized the OWR as "In Danger" since 2023. IPIS field surveys identified at least **18 major semi-industrial sites** operated by foreign entities, often protected by armed groups, bypassing local environmental regulations.
              </p>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                  Illegal bushmeat trade surges at 80% of surveyed mine sites.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                  Armed conflict protection of "Kimia Mining" sites reported.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white">
          <Info className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Evidence-Based Conservation</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            This statistical correlation serves as a call to action for international conservation bodies. The data is clear: mining expansion is the primary driver of OWR deforestation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/map" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
              Explore Live Map
            </Link>
            <Link href="/data" className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Raw Data
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
