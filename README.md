# Okapi Wildlife Reserve (OWR) - Mining Cadastre Portal
## Portail du Cadastre Minier - RDC

**Live URL:** [https://aganzeeliud.github.io/GFW_/](https://aganzeeliud.github.io/GFW_/)

A high-fidelity spatial intelligence platform modeled after the official DRC Mining Cadastre (CAMI). This portal provides transparent monitoring of mining concessions within and around the Okapi Wildlife Reserve, integrating real-time satellite imagery and artisanal mining data.

### 🌟 Key Features
- 🏗️ **Cadastral Explorer** - Professional map interface with CAMI-standard color coding and permanent site labeling.
- 🛰️ **Sentinel-2 Integration** - Switch between high-resolution Esri Satellite and real-time Sentinel-2 cloudless mosaics.
- ⚒️ **Artisanal Monitoring** - Integrated IPIS/Delve ASM database tracking small-scale mining activity.
- 📈 **Impact Analytics** - Statistical correlation (0.94) between industrial pressure and primary forest loss.
- 📅 **Lifecycle Tracking** - Full metadata for each concession: Application, Grant, and Expiry dates.

---

### 🗺️ Cadastral Legend
The portal follows the official DRC ministerial standards for mining rights visualization:
- 🟢 **Permis de Recherche (PR)** - Active exploration licenses.
- 🔴 **Permis d'Exploitation (PE)** - Active industrial mining licenses.
- 🔵 **Autorisation (AR)** - Specific research or quarry authorizations.
- 🟡 **Sites Artisanaux (IPIS/Delve)** - Monitored artisanal and small-scale mining locations.
- 🏁 **Applications** - Areas with pending requests (dashed borders, transparent fill).

---

### 📊 Vital Statistics (2026)
| Metric | Value |
|--------|-------|
| **Total Concessions** | 268 |
| **Active Licenses** | 83 (Inside) / 185 (Buffer) |
| **Protected Area** | 3.2 Million Hectares |
| **Forest Loss Correlation** | 0.9398 (Mining vs. Deforestation) |
| **Data Sources** | CAMI, IPIS, Delve, GFW, Sentinel-2 |

---

### 📁 Directory Structure
```
GFW_/
├── app/                  # Next.js Application Core
├── components/           # UI & Map Logic
├── docs/                 # Project Documentation
├── public/               # Static Assets & Cadastre Data
│   ├── data/             # GeoJSON & CSV datasets
│   ├── standalone-map/   # Portable HTML map version
│   └── standalone-portal/# Portable HTML portal version
└── research-data/        # Raw research & processed CSVs
```

---

### 🚀 Technical Overview
- **Framework:** Next.js 16+ (Static Export)
- **Mapping:** Leaflet.js with WMS support (Sentinel-2, IPIS GeoServer)
- **Styling:** Tailwind CSS 4.0
- **Deployment:** GitHub Pages (Automated via Actions)

### 📚 Documentation
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Feature Breakdown](./docs/FEATURES.md)
- [Directory Structure](./docs/STRUCTURE.md)

---
**Course:** Conservation Data Science 2026  
**Status:** Active Monitoring  
**Institution:** University of Applied Sciences  
✨ *Promoting transparency and biodiversity protection in the heart of the Congo.* ✨
