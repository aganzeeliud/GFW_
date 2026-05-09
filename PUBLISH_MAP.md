# Publishing the Mapping Portal as a Separate URL

## Option 1: Standalone HTML (Recommended for separate URLs)
I have created a **pure HTML/JS version** of the map that doesn't require any Node.js or build process. You can find it in the `standalone-map/` directory.

To publish this as a separate URL:
1. **Create a new GitHub repository** (e.g., `owr-mining-map`).
2. **Upload these files** to that repository:
   - `standalone-map/index.html` -> Rename to **`index.html`** in the new repo's root.
   - All GeoJSON files from `public/data/` -> Put them in a folder named **`data/`** in the new repo.
3. **Enable GitHub Pages** in the repository settings.
4. Your map will be live at `https://yourusername.github.io/owr-mining-map/`.

## Option 2: Next.js Subfolder (Current Setup)
Your map is already available as part of your main site at:
`https://aganzeeliud.github.io/GFW_/map`

This version is built using Next.js and is part of the `GFW_` repository.

## Option 3: Custom Domain
If you want the map at a unique domain like `map.yourdomain.com`:
1. Use the files from **Option 1**.
2. Point your subdomain's CNAME to GitHub Pages.
3. Add the custom domain in GitHub repository settings.
