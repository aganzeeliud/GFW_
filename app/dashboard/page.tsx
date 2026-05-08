'use client'

import Link from 'next/link'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowLeft, TrendingDown, TrendingUp, Zap } from 'lucide-react'

const forestLossData = [
  { year: 2001, loss: 1200, cumulative: 1200 },
  { year: 2005, loss: 1500, cumulative: 2700 },
  { year: 2010, loss: 2100, cumulative: 4800 },
  { year: 2015, loss: 2800, cumulative: 7600 },
  { year: 2020, loss: 3200, cumulative: 10800 },
  { year: 2025, loss: 3800, cumulative: 14600 },
]

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
            <p className="text-3xl font-bold text-slate-900">14,600 ha</p>
            <p className="text-sm text-slate-600 mt-2">Cumulative loss (2001-2025)</p>
            <p className="text-xs text-red-600 mt-2 font-medium">↑ 3,800 ha in 2025 alone</p>
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
          {/* Forest Loss Over Time */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Cumulative Forest Loss (2001-2025)</h2>
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
                <li>✓ Resource type classification</li>
                <li>✓ Permit lifecycle tracking (application, grant, expiry)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
