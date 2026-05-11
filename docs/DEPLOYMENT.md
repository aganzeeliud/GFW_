# Deployment & CI/CD Guide

## 📦 Static Export for GitHub Pages

The portal is optimized for static hosting. This guide covers the process of building and deploying the site using GitHub Actions.

### 1. **Configuration Setup**
Ensure `next.config.mjs` is configured for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  basePath: '/GFW_', // Matches the repository name
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

### 2. **Build Process**
To generate the static site locally:

```bash
# Install dependencies
npm install

# Build and export
npm run build
```

This creates an `out/` directory containing the production-ready HTML, CSS, and JavaScript files.

### 3. **Automated Deployment (GitHub Actions)**
The repository includes an automated workflow in `.github/workflows/deploy.yml`. 

**How it works:**
1. Every push to the `main` branch triggers the workflow.
2. The runner installs dependencies and executes `npm run build`.
3. The resulting `out/` directory is uploaded as an artifact.
4. The artifact is deployed to the `gh-pages` branch or directly to the GitHub Pages environment.

### 4. **GitHub Repository Settings**
To enable the live site:
1. Go to **Settings > Pages** in your GitHub repository.
2. Under **Build and deployment**, set **Source** to "GitHub Actions".
3. The site will be available at: `https://<username>.github.io/GFW_/`

---

## 🛠️ Maintenance & Updates

### **Updating Datasets**
To update the mining concessions or forest loss data:
1. Replace the files in `public/data/`.
2. Commit and push the changes.
3. The CI/CD pipeline will automatically rebuild and redeploy the portal.

### **Local Preview**
To preview the production build locally:

```bash
# After building
npm install -g serve
serve out
```

---

## ✅ Post-Deployment Checklist
- [ ] Verify SSL/HTTPS is active.
- [ ] Check all map layers (Sentinel-2, IPIS) for connectivity.
- [ ] Ensure dataset download links are functional.
- [ ] Test responsive layout on mobile devices.

---

**Last Updated:** May 2026  
**Status:** Automated Deployment Active
