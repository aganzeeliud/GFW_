# OWR Mining Monitoring Platform

Official geospatial monitoring and mining intelligence platform for the **Okapi Wildlife Reserve (OWR)** and its critical buffer zones.

## Core Features
- **CAMI Map Integration**: Direct integration with official DRC Mining Cadastre styling and visualization logic.
- **Advanced Explorer**: Interactive map with multi-criteria filtering (Year, Status, Company, Permit Type, Size).
- **Historical Timeline**: Temporal visualization of mining evolution from 2006 to present with automated playback.
- **Analytics Dashboard**: Deep-dive statistical analysis of mining expansion vs. primary forest loss.
- **Metadata Transparency**: Full tracking of dataset sources, update frequencies, and processing methodologies.

## Platform Architecture
- **Framework**: Next.js (App Router)
- **Mapping Engine**: Leaflet / React-Leaflet
- **Visualizations**: Recharts
- **Data Engine**: Automated CSV-to-GeoJSON spatial join and runtime synchronization.
- **Deployment**: Optimized for GitHub Pages with static export.

## Navigation
- `/`: Overview, high-level stats, and comparison charts.
- `/explorer`: Advanced spatial intelligence and concession details.
- `/timeline`: Historical concession playback and area growth trends.
- `/dashboard`: Environmental impact analysis and temporal growth deep-dive.
- `/methodology`: Data sources and GIS processing documentation.

## Spatial Intelligence Logic
The platform performs real-time data enrichment by joining official CAMI concession polygons with updated field metadata stored in CSV files. Spatial overlaps with the OWR core zone are automatically flagged for environmental monitoring.
