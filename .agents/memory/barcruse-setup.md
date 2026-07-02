---
name: Barcruse Outpatient Clinic static site setup
description: Key decisions made converting the HTTrack mirror to a functional static site.
---

## The Rule
Remove ALL `<script src="_next/static/chunks/...">` tags. Keep only `<link rel="stylesheet" href="_next/static/css/...">`. Add AOS and Swiper via CDN.

**Why:** The Next.js React hydration bundles try to run React on the pre-rendered HTML and fail silently, producing a blank white page. The static CSS works fine since it's plain CSS.

## How to apply
- On every HTML page (index.html, about-us.html, blog/*.html), strip `_next/static/chunks` script tags.
- Also strip `self.__next_f.push(...)` RSC payload script tags (they embed broken strapiapp image URLs).
- Add at end of `<head>`: Swiper CSS + AOS CSS CDN links.
- Add before `</body>`: Swiper JS + AOS JS CDN + init script.

## Image strategy
- Broken strapiapp.com URLs → Unsplash free URLs (no API key needed, format: `https://images.unsplash.com/photo-{id}?w=800&q=80`)
- Local files (pic38.jpg, pic40.jpg, etc.) work fine — server serves from project root.
- Logo: `logo1.png` in project root, referenced as `logo1.png` (relative) on index.html, `../logo1.png` on blog pages.

## Server
- `server.js` plain Node http, serves from `__dirname`, port 5000.
- Workflow "Start application" → `node server.js`, waitForPort 5000.
