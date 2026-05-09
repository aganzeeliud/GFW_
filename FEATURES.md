# Portal Features Documentation

## 🎯 Landing Page Features

### 1. **Hero Section**
- **Compelling Title:** "Conservation Intelligence Platform"
- **One-Paragraph Description:** Comprehensive overview of the portal's purpose and data integration
- **Key Statistics:** Quick view of 268 mining concessions, 813K inside reserve, 2.4M buffer zone, 25 years of data
- **Call-to-Action Buttons:** "Explore Interactive Map" and "View Analytics Dashboard"

### 2. **Datasets & Metadata Section**
- **4 Featured Datasets:**
  1. Mining Concessions Inside Reserve (83 records, GeoJSON/CSV, DRC CAMI & IPIS)
  2. Forest Cover Analysis 2001-2025 (25 annual layers, Global Forest Watch)
  3. Mining Buffer Zone (186 records, DRC Cadastre)
  4. Agricultural Activity Zones (25 zones, OWR Admin Data)

- **Metadata Transparency:**
  - Source attribution for each dataset
  - File format information
  - Record counts
  - Retrieval dates
  - Click to expand for full descriptions

### 3. **Mining Activity Classification**
- **Three Categories with Color Coding:**
  - 🔴 **Active Operations** (Red) - Currently mining with valid permits
  - 🟠 **Pending Approvals** (Amber) - Awaiting DRC Ministry decision
  - ⚫ **Inactive/Expired** (Slate) - Historical or terminated permits

- **Detailed Info Box:** Explains what each field shows (Application Date, Grant Date, Expiry Date, Permits, Zone)

### 4. **Platform Features Section**
- 🗺️ Interactive Mining Map with color coding
- 📊 Forest Loss Analytics and time-series data
- 📅 Temporal Analysis with permit lifecycle tracking
- 📍 Spatial Coverage with hectare calculations

### 5. **Professional Footer**
- **About Section:** Portal description
- **Resources Links:** Direct access to map and dashboard
- **Data Sources:** Official attribution (GFW, CAMI, IPIS)
- **Course Information:** "Conservation Data Science 2026" with institution name
- **Copyright & Status:** Last updated, active monitoring status

---

## 🗺️ Interactive Mining Map Features

### 1. **Color-Coded Concessions**
```
🔴 Active Operations    (156 sites) - Red (#ef4444)
🟠 Pending Applications (78 sites)  - Amber (#f59e0b)
⚫ Inactive/Expired     (34 sites)  - Slate (#9ca3af)
```

### 2. **Click-to-View Details**
When users click on a mining site, they see:

| Field | Example | Purpose |
|-------|---------|---------|
| 📅 Application Date | 2015-03-15 | When permit was requested |
| ✅ Grant Date | 2017-06-20 | When DRC approved permit |
| ⏱️ Expiry Date | 2027-06-20 | When permit expires/expired |
| 🔐 Permits | Au, Diamant, Nb-Ta | Resource types allowed |
| 📍 Zone | Core Zone/Buffer | Location classification |
| 📐 Area (hectares) | 4,582 | Concession size |

### 3. **Map Legend**
- Real-time counts for each status category
- Color-coded indicators
- Quick reference guide

### 4. **Sites List Panel**
- Scrollable list of all 268 mining sites
- Status badges with color coding
- Zone information
- Expandable details on click
- Search and filter ready

### 5. **Data Transparency Box**
- Explains data sources (DRC CAMI, IPIS)
- Highlights importance of permit date tracking
- Notes spatial boundary accuracy

---

## 📊 Analytics Dashboard Features

### 1. **Key Metrics Cards**
- **Total Forest Loss:** 14,600 ha cumulative (2001-2025)
- **Active Mining Operations:** 156 concessions
- **Pending Applications:** 78 awaiting DRC approval

### 2. **Cumulative Forest Loss Chart**
- Line graph showing 25-year trend (2001-2025)
- Annual data points
- Interactive tooltip on hover
- Clear upward trend visualization
- Context: "↑ 3,800 ha in 2025 alone"

### 3. **Mining Status Breakdown**
- Bar chart comparing Active/Pending/Inactive counts
- Color-coded by status type
- Visual representation of concession distribution

### 4. **Mining Activity Types Summary**
- Card layout with emoji indicators
- 🔴 Active (156) - Current operations
- 🟠 Pending (78) - Under review
- ⚫ Inactive (34) - No activity
- Descriptions for each type

### 5. **Data Methodology Section**
- **Forest Cover Analysis:**
  - Source: Global Forest Watch (v1.11)
  - Method: Hansen et al. (2013)
  - Coverage: OWR boundary + 50km buffer
  - Resolution: 30-meter satellite data
  - Updated through 2025

- **Mining Data:**
  - Source: DRC Mining Cadastre (CAMI) & IPIS
  - Categories: Status and resource type
  - Lifecycle: Application → Grant → Expiry
  - Spatial: Concession boundaries and zones

---

## 📦 Standalone Map Publishing

### 1. **Portable HTML Version**
- **Location:** `standalone-map/index.html`
*   **Tech:** Pure HTML5, Tailwind CSS (via CDN), Leaflet.js
*   **Independence:** Fully functional without the Next.js framework
*   **Performance:** ~10KB initial load, zero build time

### 2. **Separate URL Hosting**
- Designed for publishing to a dedicated GitHub repository (e.g., `github.com/user/owr-mining-map`)
- Simple directory structure: `index.html` + `data/`
- Full instructions provided in `PUBLISH_MAP.md`

---

## 🎨 Design & UX Features

### 1. **Responsive Layout**
- **Desktop:** Full-width maps, side panels, multi-column layouts
- **Tablet:** Stacked sections, optimized charts
- **Mobile:** Touch-friendly buttons, expandable sections

### 2. **Color Scheme**
- Primary: Emerald (conservation/growth)
- Secondary: Blue (water/data)
- Status Colors:
  - Red: Active/alert
  - Amber: Caution/pending
  - Slate: Inactive/archived
- Backgrounds: Light slate for hierarchy

### 3. **Navigation**
- **Sticky Header:** Always accessible navigation
- **Breadcrumbs:** "Back to Portal" links on all pages
- **Footer Links:** Quick access to all sections
- **CTA Buttons:** Large, color-coded action buttons

### 4. **Information Hierarchy**
- **Hero Section:** Immediate impact (under 10 seconds)
- **Datasets:** Transparent methodology
- **Details:** Click to expand information
- **Footer:** Credits and legal information

---

## 📈 Data Transparency Features

### 1. **Dataset Metadata**
Each dataset shows:
- Official source organization
- File format (.geojson, .csv, etc.)
- Record count
- Retrieval date
- Brief description
- Download links

### 2. **Data Provenance**
- Global Forest Watch (v1.11) - Forest loss
- DRC Mining Cadastre (CAMI) - Official permits
- IPIS - Industrial monitoring
- Hansen Lab - Satellite analysis
- All data publicly available and citable

### 3. **Permit Lifecycle Transparency**
- Application Date: Transparency on initial request
- Grant Date: When DRC officially approved
- Expiry Date: When permit terminates
- Resource Types: What's being mined
- Zone Classification: Where exactly it's located

---

## 🔄 Navigation Flow

```
Landing Page (/)
├── Explore Interactive Map → /map
│   └── See color-coded 268 mining sites
│   └── Click for detailed permit info
│   └── Back to Portal link
│
├── View Analytics Dashboard → /dashboard
│   └── Forest loss trends (2001-2025)
│   └── Mining status breakdown
│   └── Data methodology
│   └── Back to Portal link
│
└── Quick Stats/Datasets
    └── Click dataset cards for details
    └── Learn about data sources
```

---

## 📱 Accessibility Features

- **Semantic HTML:** Proper heading hierarchy, alt text
- **Color Coding:** Works with color blindness (patterns + text)
- **Keyboard Navigation:** Tab through all interactive elements
- **Mobile Optimized:** Touch-friendly buttons and spacing
- **WCAG 2.1 AA:** Compliant contrast ratios and font sizes

---

## 🎯 Funder-Ready Presentation

✅ **Quick Understanding:** Hero section conveys purpose in <10 seconds  
✅ **Data Credibility:** Official sources cited throughout  
✅ **Professional Design:** Modern, clean interface  
✅ **Comprehensive Coverage:** 268 mining sites fully documented  
✅ **Transparent Methodology:** Data sources and methods explained  
✅ **Interactive Engagement:** Click-to-explore design  
✅ **Mobile Responsive:** Works on all devices  
✅ **Educational Value:** Learn about conservation challenges  

---

**Status:** Production Ready  
**Version:** 1.0  
**Last Updated:** May 2026
