'use client'

import Link from 'next/link'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowLeft, TrendingDown, TrendingUp, Zap, Download } from 'lucide-react'

const forestLossData = [
  { year: 2001, loss: 1200, cumulative: 1200 },
  { year: 2005, loss: 1500, cumulative: 2700 },
  { year: 2010, loss: 2100, cumulative: 4800 },
  { year: 2015, loss: 2800, cumulative: 7600 },
  { year: 2020, loss: 844, cumulative: 8444 },
  { year: 2023, loss: 1890, cumulative: 11450 },
  { year: 2026, loss: 1500, cumulative: 15000 },
]

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

const miningStatusData = [
  { status: 'Active', count: 156, fill: '#ef4444' },
  { status: 'Pending', count: 78, fill: '#f59e0b' },
  { status: 'Inactive', count: 34, fill: '#9ca3af' },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Portal Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Conservation Analytics Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Time-series analysis of forest loss, mining activity status, and conservation indicators (2001-2025)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Total Forest Loss</h3>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900">15,000 ha</p>
            <p className="text-sm text-slate-600 mt-2">Cumulative loss (2001-2026)</p>
            <p className="text-xs text-red-600 mt-2 font-medium">↑ 1,890 ha peak in 2023</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Active Mining Operations</h3>
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900">156</p>
            <p className="text-sm text-slate-600 mt-2">Actively mining concessions</p>
            <p className="text-xs text-slate-600 mt-2">Inside reserve and buffer zone</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Pending Applications</h3>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900">78</p>
            <p className="text-sm text-slate-600 mt-2">Awaiting DRC approval</p>
            <p className="text-xs text-amber-600 mt-2 font-medium">Potential future expansion</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Mining Surge Impact */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mining Surge: Workforce vs. Deforestation (2017-2026)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={miningSurgeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="miners" fill="#10b981" name="Estimated Miners" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="deforestation" fill="#3b82f6" name="Deforestation (ha)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-4">
              ⚠️ The transition to semi-industrial mining in 2020 triggered a sharp increase in deforestation despite workforce stability.
            </p>
          </div>

          {/* Forest Loss Over Time */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Cumulative Forest Loss (2001-2026)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forestLossData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#dc2626"
                  name="Cumulative Loss (ha)"
                  strokeWidth={2}
                  dot={{ fill: '#dc2626', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-4">
              📈 Annual forest loss shows acceleration trend, indicating increased pressure on the reserve ecosystem.
            </p>
          </div>

          {/* Mining Concession Status */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mining Concession Status Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={miningStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" name="Concessions" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-slate-600 mt-4">
              🔴 156 Active + 🟠 78 Pending + ⚫ 34 Inactive = 268 total mining concessions tracked.
            </p>
          </div>
        </div>

        {/* Mining Activity Types Info */}
        <div className="bg-white p-8 rounded-lg border border-slate-200 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Mining Activity Types & Key Metrics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔴',
                title: 'Active Operations',
                count: '156',
                color: 'text-red-600',
                description: 'Concessions with current mining activity and valid permits',
              },
              {
                icon: '🟠',
                title: 'Pending Approvals',
                count: '78',
                color: 'text-amber-600',
                description: 'Applications awaiting DRC Mining Ministry decision',
              },
              {
                icon: '⚫',
                title: 'Inactive/Expired',
                count: '34',
                color: 'text-slate-600',
                description: 'Historical or terminated mining concessions',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-slate-50 rounded-lg">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className={`text-3xl font-bold ${item.color} mb-3`}>{item.count}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Methodology */}
        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Methodology & Sources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">🌳 Forest Cover Analysis</h3>
              <p className="text-slate-700 mb-4">
                Sourced from Global Forest Watch (GFW) v1.11 using the Hansen et al. (2013) methodology. We analyze
                forest loss within the OWR administrative boundary and a 50km external buffer zone to monitor edge
                effects and agricultural pressure.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Data from MODIS satellite imagery (Hansen Lab, UMD)</li>
                <li>✓ Annual forest loss classification since 2001</li>
                <li>✓ 30-meter resolution spatial data</li>
                <li>✓ Updated through 2025</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">⛏️ Mining Concessions Data</h3>
              <p className="text-slate-700 mb-4">
                Synchronized with the DRC Mining Cadastre (CAMI) and IPIS industrial monitoring. Concessions are
                categorized by status (Active vs. Pending vs. Inactive) and resource type using spatial join operations.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Official DRC Mining Cadastre polygons</li>
                <li>✓ IPIS industrial activity monitoring</li>
                <li>✓ UNESCO World Heritage monitoring reports</li>
                <li>✓ Resource type classification & Permit lifecycle</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Download Center */}
        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Download className="w-6 h-6 text-emerald-400" /> Download Center
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Mining Surge (2017-26)', file: 'mining_activities_2017_2026.csv' },
              { label: 'Impact Details', file: 'industrial_mining_impact_details.csv' },
              { label: 'Historical Concessions', file: 'mining_concessions_evolution_2006_2012.csv' },
              { label: 'Site Summaries', file: 'owr_mining_site_summaries_2018_2023.csv' },
              { label: 'Inside Reserve Data', file: 'OWR_Mining_Inside.csv' },
              { label: 'Buffer Zone Data', file: 'OWR_Mining_Buffer.csv' },
              { label: 'Forest Loss (ZAD)', file: 'ZAD forest cover.csv' },
              { label: 'Hunting Zones', file: 'hunting_zones.csv' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={`/data/${item.file}`}
                download
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg text-slate-300 hover:bg-emerald-600 hover:text-white transition-all group"
              >
                <span className="text-sm font-semibold">{item.label}</span>
                <Download className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
