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

export interface MapFilters {
  year?: number;
  status?: string;
  company?: string;
  type?: string;
  zone?: string;
  minSize?: number;
}

interface MapProps {
  filters?: MapFilters;
  onSiteClick?: (site: any) => void;
}

const CAMI_COLORS = {
  PE: '#ff0055',    // Permis d'Exploitation (Magenta)
  PER: '#ff0055',
  PR: '#00d5ff',    // Permis de Recherches (Cyan)
  AR: '#00d5ff',
  ZEA: '#ffd500',   // Zone d'Exploitation Artisanale (Yellow)
  DEFAULT: '#94a3b8'
}

export default function MapComponent({ filters, onSiteClick }: MapProps) {
  const [insideData, setInsideData] = useState<any>(null)
  const [bufferData, setBufferData] = useState<any>(null)
  const [csvData, setCsvData] = useState<any[]>([])

  useEffect(() => {
    fixLeafletIcon()
    const path = window.location.pathname.includes('/GFW_') ? '/GFW_' : ''
    
    // Load CSV and GeoJSON
    const loadData = async () => {
      try {
        const [insideCsvRes, bufferCsvRes, insideGeoRes, bufferGeoRes] = await Promise.all([
          fetch(`${path}/data/OWR_Mining_Inside.csv`),
          fetch(`${path}/data/OWR_Mining_Buffer.csv`),
          fetch(`${path}/data/OWR_Mining_Inside.geojson`),
          fetch(`${path}/data/Mining_Buffer.geojson`)
        ]);

        const insideCsvText = await insideCsvRes.text();
        const bufferCsvText = await bufferCsvRes.text();
        
        const parseCSV = (text: string) => {
          const lines = text.split('\n');
          const headers = lines[0].split(',');
          return lines.slice(1).filter(l => l.trim()).map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((h, i) => { obj[h.trim()] = values[i]?.trim(); });
            return obj;
          });
        };

        const mergedCsv = [...parseCSV(insideCsvText), ...parseCSV(bufferCsvText)];
        setCsvData(mergedCsv);

        const insideGeo = await insideGeoRes.json();
        const bufferGeo = await bufferGeoRes.json();

        // Join logic: Enrich GeoJSON properties with CSV data
        const enrichGeo = (geo: any, zoneName: string) => {
          return {
            ...geo,
            features: geo.features.map((f: any) => {
              const csvMatch = mergedCsv.find(c => c.code === f.properties.code);
              return {
                ...f,
                properties: {
                  ...f.properties,
                  ...csvMatch,
                  zone: zoneName,
                  // Ensure year is extractable
                  year: csvMatch?.date_app ? new Date(csvMatch.date_app).getFullYear() : (f.properties.year || 2020)
                }
              };
            })
          };
        };

        setInsideData(enrichGeo(insideGeo, 'Inside Reserve'));
        setBufferData(enrichGeo(bufferGeo, 'Buffer Zone'));
      } catch (err) {
        console.error('Error loading geospatial data:', err);
      }
    };

    loadData();
  }, [])

  const filterFeatures = (data: any) => {
    if (!data || !filters) return data;
    return {
      ...data,
      features: data.features.filter((f: any) => {
        const p = f.properties;
        if (filters.year && p.year && p.year !== filters.year) return false;
        if (filters.status && !p.statut?.toLowerCase().includes(filters.status.toLowerCase())) return false;
        if (filters.company && !p.parties?.toLowerCase().includes(filters.company.toLowerCase())) return false;
        if (filters.type && !p.type?.toLowerCase().includes(filters.type.toLowerCase())) return false;
        if (filters.zone && p.zone !== filters.zone) return false;
        if (filters.minSize && (parseFloat(p.sup_sig_ha) || 0) < filters.minSize) return false;
        return true;
      })
    };
  };

  const filteredInside = useMemo(() => filterFeatures(insideData), [insideData, filters]);
  const filteredBuffer = useMemo(() => filterFeatures(bufferData), [bufferData, filters]);

  const getStyle = (feature: any) => {
    const type = feature.properties.type || ''
    const status = feature.properties.statut || ''
    const isPending = status.toLowerCase().includes('demande') || status.toLowerCase().includes('instance')
    
    let color = CAMI_COLORS.DEFAULT
    if (type.startsWith('PE')) color = CAMI_COLORS.PE
    else if (type.startsWith('PR') || type.startsWith('AR')) color = CAMI_COLORS.PR
    else if (type.startsWith('ZEA')) color = CAMI_COLORS.ZEA

    return {
      fillColor: color,
      weight: isPending ? 1 : 2,
      opacity: 1,
      color: isPending ? color : 'white',
      fillOpacity: isPending ? 0.2 : 0.7,
      dashArray: isPending ? '5, 10' : ''
    }
  }

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target
        l.setStyle({ fillOpacity: 0.9, weight: 4, color: '#ffffff' })
      },
      mouseout: (e: any) => {
        const l = e.target
        l.setStyle(getStyle(feature))
      },
      click: () => {
        if (onSiteClick) onSiteClick(feature.properties)
      }
    })
  }

  return (
    <MapContainer center={[1.5, 28.5]} zoom={8} style={{ height: '100%', width: '100%' }} className="z-0 bg-slate-900" zoomControl={false}>
      <ZoomControl position="bottomright" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite (Esri)">
          <TileLayer attribution='&copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        
        <LayersControl.Overlay checked name="CAMI Concessions (Inside)">
          {filteredInside && (
            <GeoJSON data={filteredInside} style={getStyle} onEachFeature={onEachFeature}>
              {filteredInside.features.map((f: any, i: number) => (
                <Tooltip key={`inside-${i}`} sticky>
                  <div className="p-2 font-sans">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.properties.type}</p>
                    <p className="text-sm font-black">{f.properties.parties}</p>
                    <div className="mt-1 pt-1 border-t border-slate-100 flex justify-between gap-4">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Code: {f.properties.code}</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase">{Math.round(f.properties.sup_sig_ha)} ha</span>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </GeoJSON>
          )}
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="CAMI Concessions (Buffer)">
          {filteredBuffer && (
            <GeoJSON data={filteredBuffer} style={getStyle} onEachFeature={onEachFeature}>
              {filteredBuffer.features.map((f: any, i: number) => (
                <Tooltip key={`buffer-${i}`} sticky>
                  <div className="p-2 font-sans">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.properties.type}</p>
                    <p className="text-sm font-black">{f.properties.parties}</p>
                    <p className="text-[9px] font-black text-blue-600 uppercase">Buffer Zone</p>
                  </div>
                </Tooltip>
              ))}
            </GeoJSON>
          )}
        </LayersControl.Overlay>

        <LayersControl.Overlay name="IPIS Artisanal Mapping">
          <WMSTileLayer url="https://geo.ipisresearch.be/geoserver/wms" layers="ipis_drc:ipis_drc_mining_data" format="image/png" transparent={true} version="1.1.1" />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Sentinel-2 (EOX Cloudless)">
          <WMSTileLayer url="https://tiles.maps.eox.at/wms" layers="s2cloudless-2023" format="image/jpeg" version="1.3.0" />
        </LayersControl.Overlay>
      </LayersControl>
      <ScaleControl position="bottomleft" />
    </MapContainer>
  )
}
