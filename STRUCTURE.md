# Repository Structure

## 📁 Directory Organization

```
GFW_/
├── app/                          # Next.js App Router (all pages and layouts)
│   ├── layout.tsx                # Root layout wrapper
│   ├── page.tsx                  # Landing page (index.html equivalent)
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── dashboard/                # Dashboard feature directory
│   │   └── page.tsx              # Dashboard page (/dashboard)
│   ├── map/                      # Interactive map feature directory
│   │   └── page.tsx              # Map page (/map)
│   └── api/                      # API routes (for future use)
│
├── components/                   # Reusable React components
│   ├── shared/                   # Shared components across pages
│   │   └── page-header.tsx       # Reusable page header component
│   └── ui/                       # UI component library (shadcn/ui)
│
├── lib/                          # Utility functions and helpers
│   └── utils.ts                  # Common formatting and utility functions
│
├── public/                       # Static assets
│   └── images/                   # Image files
│
├── data/                         # Geospatial data (CSV, GeoJSON)
│   └── processed/                # Processed data files
│       ├── Agriculture.csv
│       ├── Mining_*.geojson
│       └── ... (other data files)
│
├── styles/                       # Additional CSS files (if needed)
│
├── utils/                        # Additional utilities
│
├── Configuration Files:
│   ├── next.config.mjs           # Next.js configuration (export: true for static)
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── components.json           # shadcn/ui components configuration
│   ├── package.json              # Dependencies and scripts
│   └── .gitignore                # Git ignore patterns
│
└── Documentation:
    ├── README.md                 # Project overview
    └── STRUCTURE.md              # This file
```

## 🔗 Routing Structure

- `/` → Landing page (home)
- `/dashboard` → Conservation dashboard with charts and analytics
- `/map` → Interactive mining map and forest cover visualization

## 📝 Naming Conventions

All files use **lowercase, hyphens-separated names** for consistency:
- ✅ `page-header.tsx` (components)
- ✅ `page.tsx` (Next.js pages)
- ✅ `globals.css` (styles)
- ❌ `PageHeader.tsx` (avoid PascalCase filenames)
- ❌ `Page Header.tsx` (avoid spaces)

## 🔄 Internal Links

All links use Next.js `<Link>` component with relative paths:

```tsx
// From any page to home
<Link href="/">Home</Link>

// From any page to dashboard
<Link href="/dashboard">Dashboard</Link>

// From any page to map
<Link href="/map">Map</Link>
```

## 📦 GitHub Pages Deployment

**Configuration:**
- `output: 'export'` in `next.config.mjs` enables static export
- Landing page is `index.html` at the root
- All paths are relative to domain root
- Run `npm run build` to generate static files in `./out/` directory

**Deploy to GitHub Pages:**
1. Build: `npm run build`
2. Publish `./out/` directory as GitHub Pages source
3. Landing page will be served at domain root
4. Dashboard at `/dashboard`
5. Map at `/map`

## ✨ Features

- **Landing Page**: Hero section with quick access to dashboard and map
- **Dashboard**: Time-series analysis with charts (forest loss trends, mining status)
- **Map**: Interactive Leaflet.js visualization (placeholder ready for implementation)
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Consistent Styling**: Unified color scheme and typography

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📖 Quick Reference

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Landing page with hero and features |
| `/dashboard` | `app/dashboard/page.tsx` | Analytics dashboard |
| `/map` | `app/map/page.tsx` | Interactive map visualization |
| `app/layout.tsx` | Root layout | Global layout wrapper |
| `app/globals.css` | Global styles | Tailwind and base styles |

---

**Last Updated:** May 2026
**Status:** Clean structure ready for development
