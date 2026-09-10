# Sheh — Premium Skincare Website V6

A bright, editorial skincare and wellness experience built around the Sheh visual system: light, water, glass, botanicals and quiet ritual.

## V6 polish
- stabilized the Watch our story play control so it returns cleanly after hover
- prevented arrow clipping on Our philosophy, View the full collection and Read our story
- improved readability of the small vertical hero message
- replaced abrupt italic hover switches in Journal and Rituals with smooth transform-based editorial tilts
- lifted the Shop intro so the first product row enters the initial viewport while preserving later scroll reveals
- Search and Bag now animate smoothly both when opening and when closing

## V5 foundation
- browser-extension hydration attribute mismatches are suppressed at the root layout
- Next Image custom quality values are explicitly configured
- the large botanical laboratory editorial image is rendered from a higher-resolution 2400px source and requested at full quality
- Journal stories begin higher in the viewport and include richer hover interactions
- each Journal article now has distinct, longer editorial copy
- Ritual step rails and key homepage links use refined hover motion

## Visual asset system
- 41 custom Sheh campaign images integrated across the site
- 9 product families with matching square collection imagery and 4:5 product-detail imagery
- dedicated Renewal Serum botanical + macro storytelling assets
- dedicated cream and cleansing-gel texture macros
- ingredient macro photography, botanical laboratory scene and four material studies
- morning/evening ritual campaign imagery
- About, Contact, Journal and newsletter/footer campaign imagery
- homepage hero uses the wide Renewal Serum campaign image as a full-width art-directed background

### Image optimization
The site uses two image tiers so large screens stay crisp without making every asset unnecessarily heavy.

- homepage/product cards: lightweight responsive WebP sources
- texture studies: kept at the lighter optimized settings
- large hero / campaign backgrounds: original pixel dimensions preserved with high-quality WebP compression
- product-detail portraits: original 1122×1402 dimensions preserved at high WebP quality
- Next.js `<Image>` handles responsive widths, lazy loading below the fold and AVIF/WebP delivery

The homepage hero is prioritized; below-the-fold campaign assets remain lazy-loaded.

## Functionality
- responsive editorial homepage
- 9 Sheh products
- instant product search
- persistent bag/cart drawer
  - add products
  - increase/decrease quantity
  - remove items
  - subtotal
  - localStorage persistence
- checkout flow with delivery details, shipping selection, order summary and confirmation
- Home, Shop, Product Detail, About, Ingredients, Rituals, Journal, Journal Article, Contact and custom 404
- Express API + MySQL schema/seed data

## Stack
- Next.js + React + Tailwind CSS
- GSAP
- Node.js + Express
- MySQL via `mysql2` direct SQL
- npm only — no Docker, Prisma or Supabase

## Quick start
From the project root:

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`

API health: `http://localhost:5001/api/health`

If MySQL is not configured, the read-only catalog endpoints use the included local catalog data so the storefront remains usable during local development.

## MySQL setup
1. Install/start MySQL locally.
2. Copy `server/.env.example` to `server/.env` and enter your credentials.
3. Run:
   - `server/src/db/schema.sql`
   - `server/src/db/seed.sql`
4. Start with `npm run dev`.

### API routes
- GET `/api/products`
- GET `/api/products/:slug`
- GET `/api/categories`
- GET `/api/ingredients`
- GET `/api/journal`
- GET `/api/journal/:slug`
- POST `/api/contact`
