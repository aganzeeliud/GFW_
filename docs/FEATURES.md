# Portal Features Documentation

## 🏗️ Mining Cadastre Portal (Landing Page)

The landing page has been transformed into a full-scale **Mining Cadastre Portal**, prioritizing spatial intelligence and data accessibility.

### 1. **Cadastral Explorer Interface**
- **Dynamic Sidebar:** Toggleable panel providing quick stats (Active vs. Pending) and detailed metadata.
- **Search & Filter:** Instant search by CAMI Code or Titulaire (Company).
- **Interactive Legend:** CAMI-standard color coding for all mineral rights categories.
- **Source Attribution:** Clear identification of data providers (CAMI, IPIS, GFW, Sentinel-2).

### 2. **Real-Time Data Integration**
- **Live Statistics:** Real-time counts of concessions inside the reserve and its buffer zones.
- **Export Tools:** Direct access to processed GeoJSON and CSV datasets for researchers and policy makers.

---

## 🗺️ Advanced Mapping Engine

The mapping engine is the core of the platform, utilizing professional GIS standards.

### 1. **Satellite Layer Integration**
- **Esri World Imagery:** High-resolution optical imagery for detailed terrain analysis.
- **Sentinel-2 Cloudless (EOX):** Frequently updated, cloud-free optical mosaic for monitoring recent environmental changes.
- **OpenStreetMap Labels:** Optional overlay for geographic context and infrastructure.

### 2. **CAMI-Standard Visualization**
| Right Type | Color | Description |
| :--- | :--- | :--- |
| **PE (Exploitation)** | 🔴 Red | Active industrial mining operations. |
| **PR (Recherche)** | 🟢 Green | Active exploration licenses. |
| **AR (Autorisation)** | 🔵 Blue | Specialized research or quarry permits. |
| **ZEA (Artisanal)** | 🟡 Yellow | Reserved zones for artisanal activity. |
| **Applications** | 🏁 Dashed | Pending requests currently under review. |

### 3. **Site Metadata Lifecycle**
Every concession polygon supports deep interaction, showing:
- **CAMI Code:** Unique identification number.
- **Application Date:** When the permit was first requested.
- **Grant Date:** When the DRC Ministry officially approved the right.
- **Expiry Date:** The legal termination date of the permit.
- **Zone:** Precise location status (Inside Protected Area vs. Buffer).

### 4. **IPIS/Delve Artisanal Sites**
- **Layer:** Integrated WMS from the IPIS GeoServer.
- **Purpose:** Tracks artisanal and small-scale mining (ASM) sites that often operate outside industrial concession boundaries.

---

## 📈 Statistical Impact Analysis

The `/comparison` page provides the scientific backbone of the monitoring efforts.

### 1. **Mining-Deforestation Correlation**
- **Confidence:** 0.9398 positive correlation.
- **Visuals:** Composed charts comparing mining workforce growth with primary forest loss.
- **Scatter Plot:** Visual evidence of the direct relationship between industrial pressure and ecological damage.

### 2. **Multi-Source Evidence**
- **GFW Data:** Global Forest Watch satellite alerts.
- **UNESCO/IPIS Reports:** Qualitative data on "World Heritage in Danger" status and armed group involvement.

---

## 📦 Distribution Formats

### 1. **Static Next.js Web App**
- Optimized for performance and SEO.
- Fully responsive on mobile and desktop.

### 2. **Standalone Portable Map**
- **Location:** `public/standalone/map/index.html`
- **Use Case:** Can be hosted on any static server or shared as a single file.
- **Features:** Full map functionality with Leaflet.js and Tailwind CSS.

### 3. **Standalone Documentation Portal**
- **Location:** `public/standalone/portal/index.html`
- **Use Case:** Comprehensive offline documentation of the project's findings.

---

**Last Updated:** May 2026  
**Version:** 2.0 (Cadastre Edition)
