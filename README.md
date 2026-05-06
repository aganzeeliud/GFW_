# Okapi Wildlife Reserve (OWR) - Conservation Intelligence Dashboard

A modern, high-performance monitoring platform for tracking forest health and industrial activity within the Okapi Wildlife Reserve, DRC. This project integrates 25 years of Global Forest Watch (GFW) data with industrial mining concession tracking to provide a comprehensive view of conservation challenges.

## 🌟 Live Features

- **Interactive Mining Map:** Real-time visualization of 268 mining concessions (813,652 ha inside the reserve and 2.43M ha in the buffer zone).
- **Time-Series Analysis:** Year-by-year forest loss tracking from 2001 to 2025 for both the Reserve and the 50km Buffer Zone.
- **Ecological Indicators:** Monitoring of primary forest cover and annual deforestation rates.
- **Methodology Transparency:** Detailed explanation of data sources and geospatial processing workflows.

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) & Lucide Icons
- **Mapping:** [Leaflet.js](https://leafletjs.com/) with React-Leaflet
- **Data:** CSV-based lightweight state management for high-performance geospatial rendering.

## 📁 Directory Structure

```text
GFW_/
├── app/                  # Next.js App Router (Pages & Layouts)
├── components/           # UI Components (Hero, Maps, Stats, Cards)
│   ├── ui/               # Reusable shadcn/ui components
│   └── mining-map.tsx    # Interactive Leaflet map component
├── data/                 # Raw and processed geospatial data (Source of Truth)
├── public/               # Static assets
│   └── data/             # Optimized CSVs for application consumption
├── styles/               # Global CSS and Tailwind configuration
├── README.md             # Project documentation
└── package.json          # Dependency management
```

## 📊 Data Methodology

### Forest Cover Analysis
Data is sourced from **Global Forest Watch (v1.11)** using the Hansen et al. (2013) methodology. We calculate forest loss within the administrative OWR boundary and a 50km external buffer zone to monitor "edge effects" and external agricultural pressure.

### Mining Concessions
Industrial data is synchronized with the **DRC Mining Cadastre (CAMI)** and **IPIS**. Concessions are categorized by status (Active vs. Pending) and resource type (Gold, Diamond, Rare Earths) using a spatial join pipeline.

## 🛠️ Development

To run the dashboard locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/aganzeeliud/GFW_.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛡️ License

This project is dedicated to the open-source monitoring of the Okapi Wildlife Reserve. Data usage follows the [Global Forest Watch Data Policy](https://www.globalforestwatch.org/about/data-policy/).

---
**Last Updated:** May 2026
**Status:** Active Monitoring
