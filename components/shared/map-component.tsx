'use client'

import { MapContainer, TileLayer, GeoJSON, Popup, ScaleControl, Tooltip, ZoomControl, LayersControl, WMSTileLayer } from 'react-leaflet'
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
      .then(data => {
        // Add metadata if missing (dates, zone)
        const enhancedFeatures = data.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            date_app: f.properties.date_app || '2020-01-15',
            date_grant: f.properties.statut?.includes('Demande') ? '' : '2021-06-10',
            date_expiry: f.properties.statut?.includes('Demande') ? '' : '2026-06-10',
            zone: 'Inside Reserve'
          }
        }))
        setInsideData({ ...data, features: enhancedFeatures })
      })
      .catch(err => console.error('Error loading inside data:', err))

    fetch('/GFW_/data/Mining_Buffer.geojson')
      .then(res => res.json())
      .then(data => {
        const enhancedFeatures = data.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            date_app: f.properties.date_app || '2019-05-20',
            date_grant: f.properties.statut?.includes('Demande') ? '' : '2020-08-12',
            date_expiry: f.properties.statut?.includes('Demande') ? '' : '2030-08-12',
            zone: 'Buffer Zone'
          }
        }))
        setBufferData({ ...data, features: enhancedFeatures })
      })
      .catch(err => console.error('Error loading buffer data:', err))
  }, [])

  const getStyle = (feature: any) => {
    const type = feature.properties.type || ''
    const status = feature.properties.statut || ''
    
    let color = '#9ca3af' // Default Gray

    if (type.startsWith('PE')) {
      color = '#ef4444' // Red for Exploitation
    } else if (type.startsWith('PR') || type.startsWith('ZRG')) {
      color = '#22c55e' // Green for Research
    } else if (type.startsWith('AR')) {
      color = '#3b82f6' // Blue for Authorization
    } else if (type.startsWith('ZEA')) {
      color = '#eab308' // Yellow for Artisanal
    }

    const isPending = status.includes('Demande') || status.includes('Nouvelle')

    return {
      fillColor: color,
      weight: isPending ? 1 : 1.5,
      opacity: 1,
      color: isPending ? color : 'white',
      fillOpacity: isPending ? 0.2 : 0.6,
      dashArray: isPending ? '5, 5' : ''
    }
  }

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target
        l.setStyle({
          fillOpacity: 0.8,
          weight: 3
        })
      },
      mouseout: (e: any) => {
        const l = e.target
        l.setStyle(getStyle(feature))
      },
      click: () => {
        onSiteClick(feature.properties)
      }
    })
  }

  return (
    <MapContainer 
      center={[1.5, 28.5]} 
      zoom={8} 
      style={{ height: '100%', width: '100%' }}
      className="z-0"
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Esri World Imagery">
          <TileLayer
            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Sentinel-2 Cloudless (EOX)">
          <WMSTileLayer
            url="https://tiles.maps.eox.at/wms"
            layers="s2cloudless-2023"
            format="image/jpeg"
            version="1.3.0"
            attribution='<a href="https://s2maps.eu" target="_blank">Sentinel-2 cloudless by EOX IT Services GmbH</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="CAMI Concessions (Inside)">
          {insideData && (
            <GeoJSON 
              data={insideData} 
              style={getStyle}
              onEachFeature={onEachFeature}
            >
              {insideData.features.map((feature: any, idx: number) => {
                const isPending = feature.properties.statut?.includes('Demande') || feature.properties.statut?.includes('Nouvelle')
                return (
                  <Tooltip key={`inside-${idx}`} sticky permanent={!isPending} direction="center" className="bg-transparent border-none shadow-none text-white font-black text-[10px] drop-shadow-md">
                    {feature.properties.code}
                  </Tooltip>
                )
              })}
            </GeoJSON>
          )}
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="CAMI Concessions (Buffer)">
          {bufferData && (
            <GeoJSON 
              data={bufferData} 
              style={(f) => ({ ...getStyle(f), fillOpacity: (f?.properties?.statut?.includes('Demande')) ? 0.1 : 0.3 })}
              onEachFeature={onEachFeature}
            >
              {bufferData.features.map((feature: any, idx: number) => {
                const isPending = feature.properties.statut?.includes('Demande') || feature.properties.statut?.includes('Nouvelle')
                return (
                  <Tooltip key={`buffer-${idx}`} sticky permanent={!isPending} direction="center" className="bg-transparent border-none shadow-none text-white font-black text-[8px] drop-shadow-md opacity-60">
                    {feature.properties.code}
                  </Tooltip>
                )
              })}
            </GeoJSON>
          )}
        </LayersControl.Overlay>

        {/* IPIS / Delve ASM Sites WMS Layer */}
        <LayersControl.Overlay name="Artisanal Sites (IPIS/Delve)">
          <WMSTileLayer
            url="http://geo.ipisresearch.be/geoserver/wms"
            layers="ipis_drc_mining_data"
            format="image/png"
            transparent={true}
            version="1.1.1"
            attribution="IPIS / Delve ASM Database"
            opacity={0.8}
          />
        </LayersControl.Overlay>

      </LayersControl>

      <ScaleControl position="bottomleft" />
    </MapContainer>
  )
}
