Volcano favicon sources and conversion instructions
===============================================

Files
- `volcano.svg` — high-detail stylized volcano favicon (scalable). Place this in `assets/icons/`.

Recommended conversions

1) Generate PNGs for older browsers / Apple touch icon (192 and 512 px):

   Using ImageMagick (Windows PowerShell):

   ```powershell
   magick convert assets/icons/volcano.svg -background none -resize 192x192 assets/icons/volcano-192.png
   magick convert assets/icons/volcano.svg -background none -resize 512x512 assets/icons/volcano-512.png
   ```

2) Create multi-size ICO (for legacy favicons):

   ```powershell
   magick convert assets/icons/volcano-16.png assets/icons/volcano-32.png assets/icons/volcano-48.png assets/icons/volcano.ico
   ```

Notes
- Modern browsers support `image/svg+xml` favicons. SVG remains crisp at all sizes and is preferred when available.
- If you need automatic generation in CI, install ImageMagick and run a small script to convert the SVG to PNG/ICO during the build.
