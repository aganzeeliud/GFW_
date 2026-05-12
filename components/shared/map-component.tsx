'use client'

import { MapContainer, TileLayer, GeoJSON, Popup, ScaleControl, Tooltip, ZoomControl, LayersControl, WMSTileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState, useMemo } from 'react'

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

const CAMI_COLORS = {
  PE: '#ff0055',
  PER: '#ff0055',
  PR: '#00d5ff',
  AR: '#00d5ff',
  ZEA: '#ffd500',
  DEFAULT: '#94a3b8'
}

export default function MapComponent({ onSiteClick }: MapProps) {
  const [insideData, setInsideData] = useState<any>(null)
  const [bufferData, setBufferData] = useState<any>(null)

  useEffect(() => {
    fixLeafletIcon()
    const path = window.location.pathname.includes('/GFW_') ? '/GFW_' : ''
    
    Promise.all([
      fetch(`${path}/data/OWR_Mining_Inside.geojson`).then(res => res.json()),
      fetch(`${path}/data/Mining_Buffer.geojson`).then(res => res.json())
    ]).then(([inside, buffer]) => {
      setInsideData({
        ...inside,
        features: inside.features.map((f: any) => ({
          ...f,
          properties: { ...f.properties, zone: 'Inside Reserve', exploitation_status: f.properties.statut?.includes('Approuv') ? 'Active' : 'Pending', active_count: f.properties.statut?.includes('Approuv') ? 1 : 0 }
        }))
      })
      setBufferData({
        ...buffer,
        features: buffer.features.map((f: any) => ({
          ...f,
          properties: { ...f.properties, zone: 'Buffer Zone', exploitation_status: f.properties.statut?.includes('Approuv') ? 'Active' : 'Pending' }
        }))
      })
    }).catch(err => console.error('Error loading data:', err))
  }, [])

  const getStyle = (feature: any) => {
    const type = feature.properties.type || ''
    const status = feature.properties.statut || ''
    const isPending = status.toLowerCase().includes('demande') || status.toLowerCase().includes('instance')
    let color = CAMI_COLORS.DEFAULT
    if (type.startsWith('PE')) color = CAMI_COLORS.PE
    else if (type.startsWith('PR') || type.startsWith('AR')) color = CAMI_COLORS.PR
    else if (type.startsWith('ZEA')) color = CAMI_COLORS.ZEA

    return { fillColor: color, weight: isPending ? 1 : 2, opacity: 1, color: isPending ? color : 'white', fillOpacity: isPending ? 0.2 : 0.7, dashArray: isPending ? '5, 10' : '' }
  }

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => e.target.setStyle({ fillOpacity: 0.9, weight: 4, color: '#ffffff' }),
      mouseout: (e: any) => e.target.setStyle(getStyle(feature)),
      click: () => onSiteClick(feature.properties)
    })
  }

  return (
    <MapContainer center={[1.5, 28.5]} zoom={8} style={{ height: '100%', width: '100%' }} className="z-0 bg-slate-900" zoomControl={false}>
      <ZoomControl position="bottomright" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite (Esri)">
          <TileLayer attribution='&copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="CAMI Concessions (Live Source)">
          <WMSTileLayer url="https://drclicences.cami.cd/arcgis/rest/services/DRC_Public/MapServer/export" layers="0,1,2,3,4,5,6,7" format="image/png" transparent={true} version="1.3.0" opacity={0.5} />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="OWR Mining Filter (Inside)">
          {insideData && (
            <>
              <GeoJSON data={insideData} style={getStyle} onEachFeature={onEachFeature} />
              {insideData.features.map((feature: any, idx: number) => {
                if (feature.properties.exploitation_status === 'Active' && feature.geometry.type === 'Polygon') {
                   const polygon = L.polygon(feature.geometry.coordinates as any);
                   const center = polygon.getBounds().getCenter();
                   return (
                     <Marker key={`marker-inside-${idx}`} position={center} icon={L.divIcon({ className: 'bg-transparent', html: '' })}>
                       <Tooltip permanent direction="center" className="bg-emerald-500 border-none shadow-none text-white font-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center p-0 opacity-100 ring-2 ring-white z-[1000]">
                         {feature.properties.active_count}
                       </Tooltip>
                     </Marker>
                   )
                }
                return null
              })}
            </>
          )}
        </LayersControl.Overlay>
        <LayersControl.Overlay name="IPIS Artisanal Mapping">
          <WMSTileLayer url="https://geo.ipisresearch.be/geoserver/wms" layers="ipis_drc:ipis_drc_mining_data" format="image/png" transparent={true} version="1.1.1" />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="USGS Copperbelt Mining">
          <WMSTileLayer url="https://www.sciencebase.gov/catalog/item/64dfd268d34e5f6cd553c2cf/wms" layers="sb:sb" format="image/png" transparent={true} version="1.3.0" />
        </LayersControl.Overlay>
      </LayersControl>
      <ScaleControl position="bottomleft" />
    </MapContainer>
  )
}
