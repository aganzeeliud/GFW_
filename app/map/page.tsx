'use client'

import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, Calendar, AlertCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface MiniSite {
  id: number
  name: string
  status: 'Active' | 'Pending' | 'Inactive'
  applicationDate: string
  grantDate: string
  expiryDate: string
  permits: string
  zone: string
  resource: string
  hectares: number
}

const miningData: MiniSite[] = [
  {
    id: 1,
    name: 'KASHAMA DRC SPRL',
    status: 'Active',
    applicationDate: '2015-03-15',
    grantDate: '2017-06-20',
    expiryDate: '2027-06-20',
    permits: 'Au, Diamant, Nb-Ta',
    zone: 'Core Zone',
    resource: 'Gold, Diamond',
    hectares: 4582,
  },
  {
    id: 2,
    name: 'KEL-EX DEVELOPMENTS SPRL',
    status: 'Pending',
    applicationDate: '2018-07-10',
    grantDate: 'Pending Review',
    expiryDate: 'TBD',
    permits: 'Au, Diamant, Nb-Ta',
    zone: 'Buffer Zone',
    resource: 'Gold, Diamond, Rare Earths',
    hectares: 15105,
  },
  {
    id: 3,
    name: 'MINING OPERATIONS CO',
    status: 'Inactive',
    applicationDate: '2010-01-05',
    grantDate: '2012-04-18',
    expiryDate: '2020-04-18',
    permits: 'Au',
    zone: 'Buffer Zone',
    resource: 'Gold',
    hectares: 8920,
  },
]

export default function Map() {
  const [selectedSite, setSelectedSite] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-900', dot: 'bg-red-500' }
      case 'Pending':
        return { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-900', dot: 'bg-amber-500' }
      case 'Inactive':
        return { bg: 'bg-slate-100', border: 'border-slate-500', text: 'text-slate-900', dot: 'bg-slate-400' }
      default:
        return { bg: 'bg-slate-100', border: 'border-slate-500', text: 'text-slate-900', dot: 'bg-slate-400' }
    }
  }

  const statusCounts = {
    Active: miningData.filter((d) => d.status === 'Active').length,
    Pending: miningData.filter((d) => d.status === 'Pending').length,
    Inactive: miningData.filter((d) => d.status === 'Inactive').length,
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
              <ArrowLeft className="w-5 h-5" />
              Back to Portal
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Mining Concessions Map</h1>
            <div className="w-48" /> {/* Spacer */}
          </div>
          <p className="text-slate-600">
            Interactive exploration of 268 mining concessions in OWR and buffer zone - Click sites for detailed
            information
          </p>
        </div>
      </div>

      {/* Map Legend */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 gap-8">
            {[
              { status: 'Active', count: statusCounts.Active, color: 'bg-red-500' },
              { status: 'Pending', count: statusCounts.Pending, color: 'bg-amber-500' },
              { status: 'Inactive', count: statusCounts.Inactive, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.status} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-slate-700">
                  {item.status}: <span className="font-bold">{item.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg h-96 lg:h-screen flex items-center justify-center border-2 border-slate-300">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Interactive Map</h3>
                <p className="text-slate-600">
                  Leaflet.js map with color-coded mining concessions
                  <br />
                  (Click sites on the right for details)
                </p>
              </div>
            </div>
          </div>

          {/* Sites List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 sticky top-32">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Mining Sites</h2>
                <p className="text-sm text-slate-600 mt-1">Click to view details</p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {miningData.map((site) => {
                  const colors = getStatusColor(site.status)
                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                      className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition ${
                        selectedSite === site.id ? colors.bg : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`}></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-900 truncate">{site.name}</h3>
                          <p className="text-xs text-slate-600 mt-1">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors.text} ${colors.bg}`}>
                              {site.status}
                            </span>
                          </p>
                          <p className="text-xs text-slate-600 mt-2">{site.zone}</p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
                            selectedSite === site.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>

                      {selectedSite === site.id && (
                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 text-sm">
                          <div>
                            <p className="text-xs text-slate-600 font-medium">📅 Application Date</p>
                            <p className="text-slate-900 font-semibold">{site.applicationDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-medium">✅ Grant Date</p>
                            <p className="text-slate-900 font-semibold">{site.grantDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-medium">⏱️ Expiry Date</p>
                            <p className="text-slate-900 font-semibold">{site.expiryDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-medium">🔐 Permits</p>
                            <p className="text-slate-900 font-semibold">{site.permits}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-medium">📍 Resource Type</p>
                            <p className="text-slate-900 font-semibold">{site.resource}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 font-medium">📐 Area (hectares)</p>
                            <p className="text-slate-900 font-semibold">{site.hectares.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend and Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🔴',
              title: 'Active Operations',
              description: 'Currently operating with valid permits. Requires immediate monitoring.',
              color: 'border-red-200 bg-red-50',
            },
            {
              icon: '🟠',
              title: 'Pending Applications',
              description: 'Awaiting DRC approval. May become active if approved.',
              color: 'border-amber-200 bg-amber-50',
            },
            {
              icon: '⚫',
              title: 'Inactive/Expired',
              description: 'Historical or expired permits. No current operations.',
              color: 'border-slate-200 bg-slate-50',
            },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 ${item.color}`}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Data Transparency</h3>
              <p className="text-blue-800 text-sm">
                All mining concession data comes from the official DRC Mining Cadastre (CAMI) and IPIS industrial
                monitoring system. Information includes permit dates, resource types, and spatial boundaries. Click on
                any site to view complete application, grant, and expiry dates along with authorized permits and zone
                classification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
