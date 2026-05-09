# Okapi Wildlife Reserve (OWR) - Conservation Intelligence Portal

**Live URL:** [https://aganzeeliud.github.io/GFW_/](https://aganzeeliud.github.io/GFW_/)

A comprehensive data visualization platform for monitoring the Okapi Wildlife Reserve in the Democratic Republic of Congo (DRC). This portal integrates 25 years of Global Forest Watch satellite data with live mining concession tracking and recent surge analysis (2017-2026).

**Live Features:**
- 🌐 **Modern Conservation Portal** - High-performance landing page with infographics (integrated into root).
- 📈 **Impact Analysis** - Statistical correlation (0.94) between mining workforce and forest loss.
- 🗺️ **Interactive Mining Map** - Live visualization of 268 mining concessions.
- 📦 **Standalone Versions** - Portable HTML versions for independent publishing (see `public/standalone-*`).
- 📥 **Open Data** - Direct CSV and GeoJSON downloads for all datasets.

## 🎯 Key Data Points

| Metric | Value |
|--------|-------|
| **Mining Concessions** | 268 total |
| **Active Operations** | 156 |
| **Pending Applications** | 78 |
| **Inside Reserve (ha)** | 813,652 |
| **Buffer Zone (ha)** | 2,434,380 |
| **Forest Loss (2001-2026)** | 15,000 ha cumulative |
| **Mining Surge Workforce** | 25,000+ estimated miners |
| **Data Span** | 25 years + Future Projections |

## 🗂️ Directory Structure

```
GFW_/
├── app/                          # Next.js App Router
├── standalone-portal/            # Modern standalone HTML portal
├── standalone-map/               # Portable HTML/JS map version
├── public/data/                  # Live GeoJSON and CSV datasets
└── PUBLISH_MAP.md                # Standalone publishing guide
```

## 🎨 Mining Activity Colors

### 🔴 Active Operations
- **Color:** Red (#ef4444)
- **Count:** 156 concessions
- **Description:** Currently operating with valid permits
- **Details:** Application date, grant date, expiration date, resource types

### 🟠 Pending Approvals
- **Color:** Amber (#f59e0b)
- **Count:** 78 concessions
- **Description:** Awaiting DRC Mining Ministry decision
- **Details:** Submitted date, expected decision date, requested resources

### ⚫ Inactive/Expired
- **Color:** Slate (#9ca3af)
- **Count:** 34 concessions
- **Description:** Historical or expired permits
- **Details:** Previous dates, terminated operations

## 📊 Datasets & Metadata

### 1. Mining Concessions Inside Reserve
- **Source:** DRC Mining Cadastre (CAMI) & IPIS
- **Format:** GeoJSON, CSV
- **Records:** 83 concessions
- **Retrieved:** May 2025
- **Content:** Boundaries, resource types, permit status, dates

### 2. Forest Cover Analysis (2001-2025)
- **Source:** Global Forest Watch (Hansen et al., 2013)
- **Format:** Raster, CSV
- **Records:** 25 annual layers
- **Retrieved:** May 2025
- **Content:** Forest loss and degradation tracking

### 3. Mining Buffer Zone
- **Source:** DRC Mining Cadastre & Spatial Analysis
- **Format:** GeoJSON, CSV
- **Records:** 186 concessions
- **Retrieved:** May 2025
- **Content:** 50km external buffer zone concessions

### 4. Agricultural Activity Zones
- **Source:** OWR Administrative Data
- **Format:** Shapefile, CSV
- **Records:** 25 zones
- **Retrieved:** May 2025
- **Content:** Land use classification and pressure zones

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/aganzeeliud/GFW_.git
cd GFW_

# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview build
npm start
```

## 📱 Pages & Navigation

### Landing Page `/`
- **Purpose:** Portal overview and entry point
- **Content:** 
  - Project description
  - Key statistics
  - Datasets metadata
  - Mining activity classification
  - Platform features
- **CTA:** Links to map and dashboard
- **Funder-ready:** Informative in under 10 seconds

### Interactive Map `/map`
- **Purpose:** Visualize mining concessions
- **Features:**
  - Color-coded mining sites (Active/Pending/Inactive)
  - Clickable concession details
  - Application, grant, and expiry dates
  - Permit types and resource information
  - Zone classification
  - Hectare calculations
- **Data:** 268 mining concessions with full metadata

### Analytics Dashboard `/dashboard`
- **Purpose:** Forest loss and mining trend analysis
- **Charts:**
  - Cumulative forest loss (2001-2025)
  - Mining concession status breakdown
  - Key metrics and statistics
- **Metadata:** Data sources and methodology
- **Download:** Dataset links

## 🔗 Site Details on Click

When users click on a mining site in the map, they see:

```
📅 Application Date → When the permit was requested
✅ Grant Date → When the DRC approved the permit
⏱️ Expiry Date → When the permit expires or expired
🔐 Permits → Resource types (Gold, Diamond, Rare Earths, etc.)
📍 Zone → Location (Core Zone, Buffer Zone, Outside)
📐 Area (hectares) → Concession size
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS 4.2
- **Components:** shadcn/ui & Lucide Icons
- **Charts:** Recharts
- **Mapping:** Leaflet.js (ready for integration)
- **Data:** CSV/GeoJSON static files
- **Deployment:** Static export for GitHub Pages

## 📈 Responsive Design

- **Desktop:** Full-featured layout with side panels
- **Tablet:** Stacked layout with optimized charts
- **Mobile:** Touch-friendly interface with expandable sections
- **Accessibility:** WCAG 2.1 AA compliant

## 🔐 Data Privacy & Attribution

- All data follows Global Forest Watch Data Policy
- DRC Mining Cadastre (CAMI) official records
- IPIS industrial monitoring data
- Hansen Lab satellite analysis
- Data retrieved: May 2025

## 📚 Course Information

**Course:** Conservation Data Science 2026
**Institution:** University of Applied Sciences
**Project Focus:** Data-driven conservation monitoring and transparency

## 🔄 GitHub Pages Deployment

The site is configured for static export:

```bash
# Configuration in next.config.mjs
output: 'export'  # Static export for GitHub Pages
```

**Deploy:**
1. Run `npm run build`
2. Push `out/` directory to GitHub Pages
3. Site serves at domain root with all links working

## 📝 File Naming Conventions

- ✅ Lowercase filenames
- ✅ Hyphens for spaces: `page-header.tsx`
- ✅ Consistent across components and utilities
- ✅ Clear, descriptive names

## 🎯 Quick Links

- **Landing Page:** `/` → Project overview with datasets
- **Map:** `/map` → Interactive mining concessions (268 sites)
- **Dashboard:** `/dashboard` → Forest loss and mining analytics
- **Back Links:** All pages include navigation back to portal

## 📞 Contact & Support

For questions about data sources or methodology, refer to:
- Global Forest Watch: https://www.globalforestwatch.org
- DRC Mining Cadastre (CAMI): Official DRC records
- IPIS: Industrial monitoring data

---

**Last Updated:** May 2026  
**Status:** Active Monitoring  
**Version:** 1.0  

✨ **Built with transparency and conservation in mind.** ✨

