# Professional Directory Structure

The project follows a standard Next.js 16+ structure, optimized for static export and professional maintenance.

## 📁 Repository Map

```
GFW_/
├── app/                  # Application Layer (Next.js App Router)
│   ├── layout.tsx        # Root layout with global styles
│   ├── page.tsx          # Cadastre Portal Home Page
│   ├── map/              # Full-Screen Map Explorer
│   └── comparison/       # Impact Analysis Dashboard
│
├── components/           # Presentation Layer
│   └── shared/           # Core reusable components
│       ├── map-component.tsx  # Leaflet mapping engine
│       └── page-header.tsx    # Standardized headers
│
├── public/               # Static Asset Layer
│   ├── data/             # Spatial & Tabular Datasets (GeoJSON/CSV)
│   └── standalone/       # Self-contained HTML/JS versions
│       ├── map/          # Portable Cadastre Map
│       └── portal/       # Portable Documentation Site
│
├── docs/                 # Documentation Layer
│   ├── DEPLOYMENT.md     # GitHub Pages & CI/CD guide
│   ├── FEATURES.md       # Platform feature breakdown
│   └── STRUCTURE.md      # This architectural overview
│
├── research-data/        # Data Science Layer
│   └── (Processed CSVs and raw research artifacts)
│
├── lib/                  # Utility Layer
│   └── utils.ts          # Tailwind & formatting helpers
│
└── Configuration:
    ├── next.config.mjs   # Next.js & static export settings
    ├── package.json      # Dependencies and build scripts
    ├── tailwind.config.ts # Design system configuration
    └── tsconfig.json     # TypeScript environment
```

## 🏗️ Architectural Principles

### 1. **Static First**
The entire application is designed to be exported as a static site (`output: 'export'`), ensuring maximum performance, security, and low-cost hosting on platforms like GitHub Pages.

### 2. **Component-Based Mapping**
The mapping logic is encapsulated within `components/shared/map-component.tsx`, allowing it to be easily reused or upgraded without affecting the overall application structure.

### 3. **Data Independence**
Datasets are stored as flat files in `public/data/`. This enables the portal to function without a backend database and makes the data easily downloadable for external verification.

### 4. **Professional Documentation**
All technical and feature-related information is centralized in the `docs/` folder, following industry best practices for open-source and professional projects.

---

**Last Updated:** May 2026  
**Status:** Restructured for Production Excellence
