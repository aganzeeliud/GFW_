'use client'

import { MapContainer, TileLayer, GeoJSON, Popup, ScaleControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix Leaflet icon issue
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

interface MapProps {
  onSiteClick: (site: any) => void
}

export default function MapComponent({ onSiteClick }: MapProps) {
  const [insideData, setInsideData] = useState<any>(null)
  const [bufferData, setBufferData] = useState<any>(null)

  useEffect(() => {
    fixLeafletIcon()
    
    // Load GeoJSON data
    fetch('/GFW_/data/OWR_Mining_Inside.geojson')
      .then(res => res.json())
      .then(data => setInsideData(data))
      .catch(err => console.error('Error loading inside data:', err))

    fetch('/GFW_/data/Mining_Buffer.geojson')
      .then(res => res.json())
      .then(data => setBufferData(data))
      .catch(err => console.error('Error loading buffer data:', err))
  }, [])

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        onSiteClick(feature.properties)
      }
    })
  }

  const getStyle = (feature: any) => {
    const status = feature.properties.statut
    let color = '#9ca3af' // Default Gray

    if (status === 'Demande Approuvée' || status === 'Active') {
      color = '#ef4444' // Red
    } else if (status === 'En Instance' || status === 'Pending') {
      color = '#f59e0b' // Amber
    }

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.6
    }
  }

  return (
    <MapContainer 
      center={[1.5, 28.5]} 
      zoom={8} 
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-inner"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {insideData && (
        <GeoJSON 
          data={insideData} 
          style={getStyle}
          onEachFeature={onEachFeature}
        />
      )}
      {bufferData && (
        <GeoJSON 
          data={bufferData} 
          style={(f) => ({ ...getStyle(f), fillOpacity: 0.3 })}
          onEachFeature={onEachFeature}
        />
      )}
      <ScaleControl position="bottomleft" />
    </MapContainer>
  )
}
