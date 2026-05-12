# CAMI Cadastre Integration Documentation

## Overview

This documentation describes the integration of CAMI (Cadastre Minier - Mining Cadastre) permit data into the GFW Mining Explorer. The explorer now supports comprehensive permit categorization from the Portail du Cadastre Minier (https://drclicences.cami.cd/fr/).

## Permit Categories

The system categorizes all mining permits into 5 main categories:

### 1. **Active Research Rights** 🔍
Permits for active mineral exploration and geological research.
- **PR** - Permis de Recherches (Research Permit)
- **ARC** - Autorisation de Recherches des Produits de Carrières (Quarry Products Research Authorization)

**Color Code**: #00d5ff (Cyan)

### 2. **Active Exploitation Rights** ⛏️
Permits for active mining and resource extraction operations.
- **PE** - Permis d'Exploitation (Exploitation Permit)
- **PEM** - Permis d'Exploitation de Petite Mine (Small-Scale Mining Permit)
- **PER** - Permis d'Exploitation des Rejets (Tailings Exploitation Permit)
- **AECP** - Autorisation d'Exploitation de Carrières Permanente (Permanent Quarry Exploitation Authorization)
- **CUP** - Carrière d'Utilité Publique (Public Utility Quarry)

**Color Code**: #ff0055 (Red/Pink)

### 3. **Applications** 📋
Pending applications for various permits.
- **PR_APP** - Research Permit Application
- **ARC_APP** - Quarry Products Research Application
- **PE_APP** - Exploitation Permit Application
- **PEM_APP** - Small-Scale Mining Application
- **PER_APP** - Tailings Exploitation Application
- **AECP_APP** - Permanent Quarry Exploitation Application
- **CUP_APP** - Public Utility Quarry Application

**Color Code**: #ffd500 (Yellow/Gold)

### 4. **Other** 📍
Miscellaneous zones and designations.
- **ZEA** - Zone d'Exploitation Artisanale (Artisanal Exploitation Zone)
- **ATE** - Amodiation Totale Enregistrée (Registered Total Farming)
- **APE** - Amodiation Partielle Enregistrée (Registered Partial Farming)
- **ZRG** - Zone de Recherches Géologiques (Geological Research Zone)
- **ZI** - Zone Interdite (Prohibited Zone)

**Color Code**: #8b5cf6 (Purple)

### 5. **Administration** 🏛️
Administrative divisions and protected zones.
- **PROV** - Provinces (Provinces)
- **TERR** - Territoires (Territories)
- **ZP** - Zones protégées (Protected Zones)

**Color Code**: #06b6d4 (Teal)

## Approval Status Categories

The system tracks permit approval status:

| Status | Name | Badge |
|--------|------|-------|
| Approuv | Approved | Green |
| Demande | Requested | Blue |
| Instance | Under Review | Yellow |
| Suspendu | Suspended | Orange |
| Expiré | Expired | Gray |
| Rejet | Rejected | Red |

## Data Files

### Public Data Files

- **`public/data/all_concessions.json`** - Main concessions database with 268+ records
  - Each record includes `category_id` field for permit categorization
  - Updated with CAMI permit enrichment

- **`public/data/permit_categories.json`** - Permit taxonomy reference
  - All permit types and categories
  - Status mappings
  - Color codes and icons

### Utility Files

- **`lib/permit-utils.ts`** - TypeScript utilities for permit data handling
  - `getPermitCategory()` - Get category info for a permit type
  - `getStatusBadge()` - Get status display info
  - `enrichConcessionData()` - Enrich record with category info
  - `getAllPermitTypes()` - Get all permit types
  - `getPermitsByCategory()` - Filter permits by category
  - `filterConcessions()` - Advanced filtering

## UI Features

### Explorer Interface

The Mining Concessions Explorer provides:

1. **Permit Category Filter** (Expandable)
   - Browse 5 main categories
   - Expand each category to see all permit types
   - Single-click filtering

2. **Status Filter**
   - Filter by approval status
   - Options: All, Approved, Requested, Under Review, Suspended, Expired

3. **Other Filters**
   - Company/Operator search
   - Target Resource search
   - Year range selection
   - Zone selection

4. **Dynamic Map Legend**
   - Shows all 5 permit categories with icons
   - Color-coded for easy identification
   - Expandable for detailed permit types

5. **Site Details Panel**
   - Shows selected concession metadata
   - Status badge with dynamic coloring
   - Permit type and category info
   - Area, dates, and location data

## API Integration

### CAMI Portal

The system is designed to support integration with the CAMI portal:

**Portal URL**: https://drclicences.cami.cd/fr/

**Data Source**: The CAMI portal maintains comprehensive mining cadastre records for DRC. The explorer can be updated with live CAMI data using:

```bash
# Update data from CAMI source
npm run update-cami-data
```

### Data Enrichment

Run the enrichment script to add permit categories to concessions:

```bash
node scripts/fetch-cami-data.js
```

This will:
1. Read all concessions
2. Map permit types to categories
3. Add `category_id` field to each record
4. Display distribution statistics

## Current Data Distribution

As of the latest enrichment:

- **Active Research Rights**: 172 records (64.2%)
- **Other**: 84 records (31.3%)
- **Active Exploitation**: 12 records (4.5%)

## Development

### Adding New Permits

To add new permit types:

1. Update `permit_categories.json`:
```json
{
  "code": "NEW_CODE",
  "name_fr": "French Name",
  "name_en": "English Name",
  "short": "SHORT"
}
```

2. Update `PERMIT_CATEGORIES` in `scripts/fetch-cami-data.js`:
```javascript
'NEW_CODE': 'category_id'
```

3. Run enrichment:
```bash
node scripts/fetch-cami-data.js
```

### Updating from CAMI

To sync with latest CAMI data:

1. Ensure data is available from CAMI portal
2. Run the enrichment script
3. Rebuild the application:
```bash
npm run build
```

## References

- **CAMI Portail**: https://drclicences.cami.cd/fr/
- **Explorer URL**: https://aganzeeliud.github.io/GFW_/explorer
- **Main Portal**: https://aganzeeliud.github.io/GFW_/

## Notes

- All permit codes are case-sensitive
- Categories are derived from DRC mining regulations
- Colors are standardized across CAMI systems
- The system supports both French and English labels
- Zones are related to Okapi Wildlife Reserve (OWR) or general regions
