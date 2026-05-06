# Okapi Wildlife Reserve (OWR) - Forest Cover Analysis 2001-2025

A comprehensive geospatial and statistical analysis of forest cover and deforestation patterns within the Okapi Wildlife Reserve in the Democratic Republic of the Congo (DRC).

## 🚀 Quick Links

**Live Dashboard & Maps:**
- 🌐 **[Landing Page Dashboard](https://aganzeeliud.github.io/GFW_/)** - Main dashboard with spectral analysis
- 🗺️ **[Forest Cover Map 2025](https://aganzeeliud.github.io/GFW_/forest_map.html)** - Interactive map with buffer zone & spectral overlay
- 📊 **[Evolution Map (2001-2025)](https://aganzeeliud.github.io/GFW_/forest_map_evolution.html)** - Time-series visualization with slider

**Repository:**
- 📦 **[GitHub Repository](https://github.com/aganzeeliud/GFW_)** - Source code and data files

## 📋 Project Overview

This project analyzes forest loss trends and vegetation cover dynamics across the Okapi Wildlife Reserve using Global Forest Watch (GFW) data from 2001 to 2025. The reserve is divided into three management zones:

- **Core Zones** (5 zones): Protected primary forest areas - Mont Mbia, Enjewe, Forêt de Zoo, Lenda, Afarama
- **Agricultural Zones (ZAD)** (31 zones): Areas designated for sustainable use and aménagement durable
- **Hunting Zones (ZChasse)** (32 zones): Controlled hunting areas with managed wildlife

## 📁 Directory Structure

```
GFW_/
├── data/
│   ├── raw/                              # Original source files
│   │   ├── Couverture_db_original.xlsx   # Original Excel database
│   │   └── couver_forest_*.csv           # Legacy CSV files (archived)
│   └── processed/                        # Cleaned and organized data
│       ├── forest_cover_overall.csv      # Overall reserve forest loss (2001-2025)
│       ├── core_zones_data.csv           # Core zones annual loss by zone
│       ├── agricultural_zones_summary.csv # ZAD zones annual loss
│       └── hunting_zones_summary.csv     # ZChasse zones annual loss
│
├── maps/
│   ├── OWR_Limit_OWR_2024.json          # OWR boundary GeoJSON (UTM coordinates)
│   ├── forest_map.html                  # Interactive forest cover map 2025
│   ├── forest_map_evolution.html        # Time-series evolution map (2001-2025)
│   └── index.html                       # Landing page dashboard
│
└── docs/
    └── README.md                         # This file
```

## 📊 Data Files

### Processed Data (data/processed/)

#### forest_cover_overall.csv
Overall annual forest loss for the entire Okapi Wildlife Reserve.

**Columns:**
- `Year`: Year of measurement (2001-2025)
- `Annual_Loss_ha`: Annual forest loss in hectares
- `Loss_Percentage`: Annual loss as percentage of total forest cover

**Key Statistics:**
- Study Period: 2001-2025 (25 years)
- Total Forest Loss: ~24,925 ha
- Average Annual Loss: ~997 ha/year
- Peak Loss Year: 2003 (Badengaido Zone: 3,022.14 ha)

#### core_zones_data.csv
Forest loss data for the 5 core protected zones.

**Zones:**
1. Mont Mbia
2. Enjewe
3. Forêt de Zoo
4. Lenda
5. Afarama

#### agricultural_zones_summary.csv
Forest loss data for the 31 agricultural/sustainable use zones (ZAD - Zone d'Aménagement Durable).

**Highest Loss Zones:**
- Badengaido: 3,022.14 ha (2003)
- Bandisende: 2,410.70 ha (2005)

#### hunting_zones_summary.csv
Forest loss data for the 32 hunting zones (ZChasse).

**Highest Loss Zones:**
- Badengaido: 3,609.53 ha
- Seti Utama/Zunguluka: 1,397.09 ha

### Raw Data (data/raw/)

- **Couverture_db_original.xlsx**: Original Excel database with detailed multi-sheet analysis
- **couver_forest_*.csv**: Legacy CSV files from previous analysis (archived for reference)

## 🗺️ Geospatial Data

### OWR_Limit_OWR_2024.json
GeoJSON file containing the precise boundary polygon of the Okapi Wildlife Reserve.

**Format:** GeometryCollection with single Polygon
**Coordinate System:** UTM (projected coordinates)
**Source:** 2024 official OWR boundary data

## 🌐 Interactive Maps

### forest_map.html
**Static map displaying 2025 forest cover data with Landsat Spectral Analysis**
- Shows all three zone types with color-coded markers
- Circle size represents relative forest loss magnitude
- Interactive popups with zone details
- Layer toggle between OpenStreetMap and satellite imagery
- **NEW: 🎨 Interactive spectral overlay button** - Toggle Landsat band visualization
- **NEW: 50km Buffer Zone statistics** - Monitor surrounding area forest loss
- Located at: https://aganzeeliud.github.io/GFW_/forest_map.html

**Features:**
- Core zones (blue) - Primary protection areas
- Agricultural zones (green) - Sustainable management areas
- Hunting zones (orange) - Controlled hunting areas
- High-loss alert markers (red) - Areas requiring intervention
- Landsat spectral bands (Red/NIR/SWIR1/SWIR2) visualization
- Buffer zone loss tracking (2001-2025)

### forest_map_evolution.html
**Dynamic time-series map with year slider (2001-2025)**
- Play/pause animation of forest loss progression
- Year-by-year visualization of deforestation patterns
- Time slider for manual year navigation
- Statistical panel showing metrics for selected year
- **NEW: Buffer zone data timeline** - Track surrounding area changes over 25 years
- Located at: https://aganzeeliud.github.io/GFW_/forest_map_evolution.html

### index.html
**Main dashboard and landing page**
- Summary statistics and overview
- Links to interactive maps
- Chart visualizations of forest loss trends
- Zone-specific analysis and breakdown
- **NEW: Comparison chart** - Reserve vs. 50km Buffer Zone loss analysis
- Located at: https://aganzeeliud.github.io/GFW_/index.html

## 📈 Key Findings

### Forest Loss Summary (2001-2025)
- **Total Loss:** 24,925.38 hectares
- **Average Annual Loss:** 997.01 ha/year
- **Peak Loss Year:** 2003 (Badengaido Zone)
- **Reserve Area:** 13,726 km² (1,372,600 ha)
- **Cumulative Loss Rate:** ~1.82% of reserve area

### Buffer Zone Analysis (50km)
- **Total Buffer Loss (2001-2025):** ~407,600 hectares
- **2025 Buffer Loss:** 45,843.4 hectares
- **Average Annual Buffer Loss:** 16,384.5 ha/year
- **Impact:** Buffer zone experiences 16x higher deforestation than reserve
- **Concern:** Increased pressure from surrounding agricultural expansion

### Zone-Specific Insights

**Core Zones** (Protected Areas)
- Relatively stable with minimal loss
- Enjewe Zone: Primary area of concern (1,049.46 ha total loss)
- Other zones: <135 ha each

**Agricultural Zones (ZAD)**
- Higher variability in loss rates
- Badengaido and Bandisende are hotspots
- 31 zones managed for sustainable use

**Hunting Zones (ZChasse)**
- 32 designated hunting areas
- Badengaido Zone: Highest loss (3,609.53 ha)
- Mixed results with some zones showing stability

## 🛠️ Technologies Used

- **Data Analysis:** Python (Pandas)
- **Cartography:** Leaflet.js, OpenStreetMap, ESRI Satellite Imagery
- **Visualization:** Chart.js, HTML5/CSS3
- **Data Format:** GeoJSON, CSV, Excel (.xlsx)
- **Deployment:** GitHub Pages

## 📦 How to Use

### Accessing the Data
1. Download CSV files from `data/processed/` for analysis
2. Original Excel file available in `data/raw/` for detailed sheets
3. GeoJSON boundary available in `OWR_Limit_OWR_2024.json`

### Viewing Interactive Maps
1. Open `index.html` in a web browser for the dashboard
2. Click "Forest Cover Map 2025" to view current state
3. Click "Evolution Map" to explore time-series data with slider

### Data Integration
```python
import pandas as pd

# Load processed data
forest_loss = pd.read_csv('data/processed/forest_cover_overall.csv')
core_zones = pd.read_csv('data/processed/core_zones_data.csv')
ag_zones = pd.read_csv('data/processed/agricultural_zones_summary.csv')
hunt_zones = pd.read_csv('data/processed/hunting_zones_summary.csv')
```

## 🔗 Data Sources

- **Global Forest Watch (GFW):** Tree cover loss data
- **Okapi Wildlife Reserve Authority:** Boundary and management zone data
- **Year:** Analysis updated May 2026

## 📝 Citation

If using this data in research or publications, please cite:

```
Okapi Wildlife Reserve Forest Cover Analysis 2001-2025
Data Source: Global Forest Watch (GFW)
Analysis Date: May 2026
Repository: https://github.com/aganzeeliud/GFW_
```

## 📞 Contact & Support

For questions about this dataset or analysis, please refer to the repository issues or contact the project maintainer.

## ⚖️ License

This project uses public data from Global Forest Watch. Please refer to GFW's data use policy for publication and redistribution guidelines.

---

**Last Updated:** May 2026
**Data Period:** 2001-2025
**Status:** Active Monitoring
 use policy for publication and redistribution guidelines.

---

**Last Updated:** May 2026
**Data Period:** 2001-2025
**Status:** Active Monitoring
taset or analysis, please refer to the repository issues or contact the project maintainer.

## ⚖️ License

This project uses public data from Global Forest Watch. Please refer to GFW's data use policy for publication and redistribution guidelines.

---

**Last Updated:** May 2026
**Data Period:** 2001-2025
**Status:** Active Monitoring
 use policy for publication and redistribution guidelines.

---

**Last Updated:** May 2026
**Data Period:** 2001-2025
**Status:** Active Monitoring
