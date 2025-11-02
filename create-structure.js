// create-structure.js
// Node 14+ works; Node 16+ recommended.
// Run: node create-structure.js      (creates files, skips existing)
// Run: node create-structure.js --force   (will overwrite placeholders)
// Run from the directory where you want `wulkan-kibo/` to live,
// or run inside an existing wulkan-kibo/ directory to create files in-place.

const fs = require('fs');
const path = require('path');

const ARGV = process.argv.slice(2);
const FORCE = ARGV.includes('--force');

const rootName = 'wulkan-kibo';
const root = path.join(process.cwd(), rootName);

const files = [
  'index.html',
  'recipes/index.html',
  'recipes/african-jollof.html',
  'recipes/peanut-stew.html',
  'recipes/plantain-fritters.html',
  'about.html',
  'contact.html',
  'assets/css/styles.css',
  'assets/js/main.js',
  'assets/images/hero.jpg',
  'assets/images/jollof-thumb.jpg',
  'assets/images/peanut-thumb.jpg',
  'assets/images/plantain-thumb.jpg',
  'assets/icons/favicon.svg',
  'vercel.json',
  'robots.txt',
  'sitemap.xml',
  'README.md',
  'LICENSE',
  '.gitignore'
];

// Utility: ensure directory exists
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Basic placeholder content generators
function htmlPlaceholder(relPath, title = '') {
  const pageTitle = title || path.basename(relPath, path.extname(relPath)).replace(/[-_]/g, ' ');
  return `<!doctype html>
<!-- ${relPath} — placeholder. Replace with real content. -->
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Wulkan Kibo — ${pageTitle}</title>
  <meta name="description" content="Wulkan Kibo — African recipes and cooking videos (placeholder)" />
  <link rel="stylesheet" href="/${rootName}/assets/css/styles.css">
  <link rel="icon" href="/${rootName}/assets/icons/favicon.svg" type="image/svg+xml">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main</a>
  <header>
    <nav>
      <a href="/${rootName}/index.html">Home</a> |
      <a href="/${rootName}/recipes/index.html">Recipes</a> |
      <a href="/${rootName}/about.html">About</a> |
      <a href="/${rootName}/contact.html">Contact</a>
    </nav>
  </header>

  <main id="main">
    <h1>${pageTitle}</h1>
    <p>This is a generated placeholder for <code>${relPath}</code>. Paste your HTML here.</p>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} Wulkan Kibo — placeholder</p>
  </footer>

  <script src="/${rootName}/assets/js/main.js" defer></script>
</body>
</html>
`;
}

function cssPlaceholder() {
  return `/* assets/css/styles.css — basic variables and layout (placeholder) */
:root{
  --color-bg: #fff;
  --color-text: #111827;
  --color-accent: #c2410c;
  --space: 1rem;
  --container: 1100px;
  --radius: 8px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color:var(--color-text);
  background:var(--color-bg);
  line-height:1.45;
  padding:var(--space);
}
.container{max-width:var(--container);margin:0 auto;padding:0 1rem}
.header,header{padding:0.5rem 0}
nav a{color:var(--color-text);text-decoration:none;margin-right:0.75rem}
.skip-link{position:absolute;left:-999px;top:auto;width:1px;height:1px;overflow:hidden}
.skip-link:focus{left:0;top:0;width:auto;height:auto;background:#000;color:#fff;padding:0.5rem;border-radius:4px}

/* simple grid for recipes */
.recipe-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem}

/* buttons */
.btn{display:inline-block;padding:0.5rem 0.75rem;border-radius:6px;background:var(--color-accent);color:#fff;text-decoration:none}

/* media print */
@media print {
  nav, .btn { display: none !important; }
}
`;
}

function jsPlaceholder() {
  return `// assets/js/main.js — basic client behavior (placeholder)
// Wrap in DOMContentLoaded to be safe
document.addEventListener('DOMContentLoaded', function () {
  // Basic focus outline for accessibility
  (function initSkipLinks(){
    const skip = document.querySelector('.skip-link');
    if(skip){
      skip.addEventListener('click', (e) => {
        const main = document.getElementById('main');
        if(main) main.setAttribute('tabindex','-1'), main.focus();
      });
    }
  })();

  // Placeholder for search/filter + lightbox functions
  // Implement search/filter across recipe cards and a video modal here.
  console.log('Wulkan Kibo main.js loaded — replace with actual app code');
});
`;
}

function vercelJsonPlaceholder() {
  return `{
  "version": 2,
  "builds": [
    { "src": "**/*", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/", "dest": "/index.html" }
  ]
}
`;
}

function robotsPlaceholder() {
  return `User-agent: *
Allow: /
Sitemap: /${rootName}/sitemap.xml
`;
}

function sitemapPlaceholder() {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- sitemap.xml — generated placeholder -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.example/${rootName}/index.html</loc>
    <lastmod>${now}</lastmod>
  </url>
  <url>
    <loc>https://your-domain.example/${rootName}/recipes/index.html</loc>
    <lastmod>${now}</lastmod>
  </url>
</urlset>
`;
}

function readmePlaceholder() {
  return `# Wulkan Kibo (static scaffold)

This folder was generated by \`create-structure.js\`.  
Replace the placeholder files with your real HTML/CSS/JS and assets.

## Quick local test

Install a simple static server (pick one):

\`\`\`bash
# option A: http-server (npm)
npm i -g http-server
http-server ./ -p 3000

# option B: Python 3
python -m http.server 3000
\`\`\`

Then open http://localhost:3000/${rootName}/index.html

## Deploy to Vercel

1. Create a GitHub repository and push this folder.
2. In Vercel, import the repository.
3. Vercel will detect a static site; no build command is necessary. Set the output directory to \`/\` (root).
4. Deploy.

## Notes

- Replace image placeholders in assets/images with actual .jpg/.png files.
- Edit \`assets/css/styles.css\` and \`assets/js/main.js\` to implement styling and interactions.
- You can add recipe content under \`recipes/*.html\`.

`;
}

function licensePlaceholder() {
  return `MIT License

Copyright (c) ${new Date().getFullYear()} Wulkan Kibo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software...
`;
}

function gitignorePlaceholder() {
  return `node_modules/
.DS_Store
.env
.idea
.vscode/*.code-workspace
`;
}

function faviconPlaceholder() {
  // simple tiny SVG content
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c2410c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="#fff"/>
  <path d="M7 14c1.5-3 4.5-3 6 0" />
  <circle cx="12" cy="9" r="1.2" />
</svg>
`;
}

// For binary-like placeholders (images), we'll create small README placeholders instead of fake binaries.
// This avoids creating invalid image files but makes it obvious where to paste images.
function imagePlaceholderTxt(name) {
  return `PLACEHOLDER: add the real image file here with filename "${name}".
Recommended: replace with a JPG/PNG under 300kb for hero images, thumbnails ~80-150kb.
Path: /${rootName}/assets/images/${name}
`;
}

// build files with content selection
function contentFor(rel) {
  if (rel.endsWith('.html')) {
    return htmlPlaceholder(rel);
  }
  if (rel.endsWith('styles.css')) {
    return cssPlaceholder();
  }
  if (rel.endsWith('main.js')) {
    return jsPlaceholder();
  }
  if (rel === 'vercel.json') {
    return vercelJsonPlaceholder();
  }
  if (rel === 'robots.txt') {
    return robotsPlaceholder();
  }
  if (rel === 'sitemap.xml') {
    return sitemapPlaceholder();
  }
  if (rel === 'README.md') {
    return readmePlaceholder();
  }
  if (rel === 'LICENSE') {
    return licensePlaceholder();
  }
  if (rel === '.gitignore') {
    return gitignorePlaceholder();
  }
  if (rel.endsWith('favicon.svg')) {
    return faviconPlaceholder();
  }
  if (rel.startsWith('assets/images/')) {
    return imagePlaceholderTxt(path.basename(rel));
  }
  // default empty placeholder
  return `<!-- ${rel} — placeholder file. Paste real content here. -->\n`;
}

// Create project root folder
if (!fs.existsSync(root)) {
  fs.mkdirSync(root, { recursive: true });
  console.log('CREATED ROOT:', rootName);
} else {
  console.log('Using existing folder:', rootName);
}

console.log('Creating files...');

files.forEach(rel => {
  const fp = path.join(root, rel);
  ensureDir(fp);

  // skip if exists and not forcing
  if (fs.existsSync(fp) && !FORCE) {
    console.log('SKIP (exists):', rel);
    return;
  }

  const content = contentFor(rel);
  fs.writeFileSync(fp, content, 'utf8');
  console.log((fs.existsSync(fp) ? 'CREATED' : 'WRITTEN') , rel);
});

console.log('\nDone. Next steps:');
console.log(`1) cd ${rootName}`);
console.log('2) Replace placeholder files with your real HTML/CSS/JS and assets.');
console.log('3) Test locally via `http-server` or `python -m http.server`.');
console.log('Tip: run `node create-structure.js --force` to regenerate placeholders (will overwrite).');
