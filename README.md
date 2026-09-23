# NAVA Maritime Transport — Website

Marketing website for **NAVA**, a fictional international maritime transport and logistics company.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, **Framer Motion** and **Lucide** icons.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static homepage)
npm start          # serve the production build
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/
  layout.tsx            Fonts, SEO metadata, JSON-LD, providers
  page.tsx              Homepage composition
  icon.svg              Favicon (anchor mark)
  apple-icon.tsx        Generated 180×180 touch icon
  opengraph-image.tsx   Generated social share image
  robots.ts / sitemap.ts / manifest.ts
components/
  sections/             Navbar, Hero, About, Services, GlobalNetwork, Tracking,
                        WhyNava, Sustainability, CallToAction, Footer
  quote/                "Request a Quote" dialog + provider + trigger button
  ui/                   Logo, Button, Reveal, Counter, Photo, SectionHeading, SocialIcons
lib/
  content.ts            All copy: navigation, stats, services, offices…
  geo.ts                Map projection, ports and sea-lane routes
  world-dots.ts         Generated dotted world map (see below)
  tracking.ts           Front-end shipment tracking simulation
  images.ts             Photography sources
scripts/
  generate-world-dots.mjs
```

## Brand

- **Mark:** a geometric anchor (ring, stem, stock and a horizon arc) on a deep-navy tile; the arc carries an ocean-blue → turquoise gradient.
- **Palette:** navy `#020a18`–`#10306a`, ocean `#0a58b8`/`#1570e0`, turquoise accent `#1fd8c8`, mist greys `#f5f8fc`–`#d8e2ee`. Defined as Tailwind theme tokens in `app/globals.css`.
- **Type:** Manrope (display) and Inter (text), self-hosted via Fontsource.

## Notes

- **Photography** is loaded from Unsplash via `next/image` (see `lib/images.ts`). Every photo sits on a designed gradient / illustrated fallback, so the layout stays intact if an image is unavailable. To self-host, drop files into `public/images/` and point the entries in `lib/images.ts` at them.
- **Global Network map** is a dotted SVG generated from Natural Earth data (`world-atlas`). Re-run `npm run generate:map` only if you change the grid density or map bounds.
- **Shipment tracking** and the **quote form** are front-end simulations with no backend. Try `NAVU4827316`, or any reference shaped like `ABCD1234567` / `NV12345678`.
- Animations respect the OS "reduce motion" setting.
