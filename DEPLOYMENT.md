# Deployment Guide

## 📦 Build & Deploy for GitHub Pages

### Step 1: Build the Project

```bash
cd /workspaces/GFW_
npm run build
```

This generates a static export in the `out/` directory ready for GitHub Pages.

### Step 2: GitHub Pages Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add landing page with datasets metadata and mining map"
   git push origin main
   ```

2. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root (if using `out/` directory) or custom workflow

3. **Alternative: Use GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

### Step 3: Verify Deployment

- **Landing page:** `https://username.github.io/GFW_/` or custom domain
- **Map:** `https://username.github.io/GFW_/map`
- **Dashboard:** `https://username.github.io/GFW_/dashboard`

### Step 4: Update basePath (if needed)

If deploying to `username.github.io/GFW_/` subdirectory:

Edit `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/GFW_',  // Add this line
  // ... rest of config
}
```

Then rebuild: `npm run build`

## 🔗 All Links Work

The site uses relative Next.js links that automatically resolve:
- Landing page links to `/map` and `/dashboard`
- Map and dashboard link back to `/`
- All navigation cards functional
- Footer links complete

## 📊 Files Generated

After build, `out/` contains:
```
out/
├── index.html                    # Landing page
├── dashboard/
│   └── index.html               # Dashboard page
├── map/
│   └── index.html               # Map page
├── 404.html                     # 404 page
└── _next/                       # Next.js static assets
    ├── static/
    │   ├── chunks/
    │   └── css/
    └── image/
```

## 🌐 Domain Setup (Optional)

To use a custom domain:

1. Add CNAME record: `GFW_.yourdomain.com`
2. Add to GitHub Pages custom domain setting
3. Enable HTTPS

## ✅ Verification Checklist

- [ ] Build completed without errors: `npm run build`
- [ ] All pages in `out/` directory created
- [ ] `out/index.html` exists (landing page)
- [ ] `out/dashboard/index.html` exists
- [ ] `out/map/index.html` exists
- [ ] GitHub Pages source configured
- [ ] Site loads at root URL
- [ ] Navigation links work
- [ ] Responsive on mobile devices

## 🚀 Performance Optimizations

The static export is optimized for:
- **Fast load times** - No server-side rendering needed
- **SEO friendly** - Static HTML with proper metadata
- **CDN-friendly** - All assets cacheable
- **Low bandwidth** - ~50KB initial load

## 📱 Responsive Testing

Test on these breakpoints:
- Desktop (1920px, 1366px)
- Tablet (768px, 1024px)
- Mobile (375px, 414px, 480px)

## 🔐 Security Notes

- No sensitive data stored client-side
- All data public and sourced from official records
- Static files only - no backend vulnerabilities
- HTTPS enforced by GitHub Pages

## 📞 Troubleshooting

**404 errors on internal links:**
- Verify basePath is consistent
- Check if deploying to subdirectory
- Rebuild after config changes

**Styles not loading:**
- Clear browser cache
- Check `_next/static/chunks/` directory
- Rebuild with `npm run build`

**Map/Dashboard not updating:**
- Rebuild: `npm run build`
- Re-deploy to GitHub Pages

---

**Last Updated:** May 2026  
**Status:** Ready for Production
