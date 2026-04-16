# STUDIO404 Website — Changelog

---

## 2026-04-16 — Mobile UX Polish & Animation Tuning

### Mobile Section Positioning
- Fixed Availability, InsideStudio, and Testimonials sections sitting too high on mobile Chrome
- Availability: adjusted to `pt-20 pb-nav-safe` so heading sits lower and cards end right above the nav bar
- InsideStudio: replaced scroll-margin offset with `pt-40` so background image fills to viewport top while text card stays in the lower-center area
- Testimonials: added `pt-20` to push text elements lower in the section
- Removed duplicate `snap-start snap-always` from `SectionWrapper` to eliminate competing snap targets on Chrome

### Animation & Scroll Tuning
- Reveal fade-in duration: 0.6s → 0.9s, slide distance: 20px → 30px
- Availability card slide-in animations: 0.7s → 1.2s
- Snap scroll cooldown between sections: 1s → 1.5s
- Replaced native `scrollTo({ behavior: 'smooth' })` with custom easeOutQuart animation (1.2s) for heavier deceleration at the end of each snap

### Testimonials Marquee
- Fixed marquee only showing ~2 reviews before looping — root cause: flex container defaulted to viewport width, so `translateX(-50%)` only moved ~187px. Added `w-max` so container spans all cards.
- All 10 reviews now scroll continuously in a seamless loop
- Mobile cycle time: 40s (desktop: 20s)

### Testimonials — Five-Star Callout
- Added "Over 100 five-star reviews" badge with five amber stars below the review ticker
- Centered on screen with a small gap above the "Read All Our Reviews" CTA

### Commits
- `f942e9c` — Initial mobile snap fix (pt-[12vh] approach)
- `7567198` — Switch to scroll-margin-top approach
- `231fe22` — Revert to internal padding for Availability/Testimonials
- `b2d7923` — InsideStudio bg fix, marquee w-max fix
- `97c10a1` — Marquee timing adjustment
- `ccd1f60` — Slow down animations across the board
- `c69a71a` — Custom easeOutQuart snap scroll, marquee to 30s
- `90de8c0` — Faster text fade-in (0.9s), marquee to 40s
- `f4e189f` — Five-star callout badge
- `71d9757` — Move callout below ticker, centered

---

## 2026-04-15 — Domain Migration, Analytics & Tracking

### Domain Migration (Shopify → Cloudflare → Vercel)
- Transferred DNS hosting from Shopify to Cloudflare (free plan)
- Configured all DNS records in Cloudflare: A, CNAME, MX, TXT (Microsoft 365, SPF, GSC, LeadConnector, DKIM)
- Pointed `thestudio404.ca` A record to Vercel (`216.198.79.1`)
- Pointed `www` CNAME to Vercel (`4c1b00de5d6bb118.vercel-dns-017.com.`)
- Added domain in Vercel dashboard (bare domain redirects to `www`)
- Domain is now live on Cloudflare nameservers → Vercel
- Shopify domain transfer initiated but not needed — nameserver change was sufficient
- Note: domain registration stays with Shopify until transferred to another registrar (Cloudflare doesn't support `.ca` transfers)

### Analytics — Google Analytics 4
- GA4 measurement ID configured: `G-YYP2J2XGKJ`
- Added `NEXT_PUBLIC_GA_ID` to `.env.local` and `.env.example`
- Code was already wired up in `layout.tsx` via `@next/third-parties/google`

### Tracking — Meta Pixel
- Added Meta Pixel base code to `app/layout.tsx` via Next.js `<Script>` component
- Pixel ID: `1480030709764047` (conditionally loaded via env var)
- Fires `PageView` on every page load, includes `<noscript>` fallback
- Added `NEXT_PUBLIC_META_PIXEL_ID` to `.env.local` and `.env.example`

### Voice Widget
- ElevenLabs voice widget now starts **closed** by default (was open)
- Users click the `MessageCircle` button to open it

### Commits
- `360fa4b` — Meta Pixel, GA4 env config, voice widget starts closed

### Still Open
- [ ] Verify GA4 and Meta Pixel firing on live site (need Vercel env vars + redeploy)
- [ ] Meta Conversions API — blocked until pixel is linked to Meta Business Account
- [ ] Transfer domain registration away from Shopify before cancelling subscription (Cloudflare doesn't support `.ca` — try Namecheap or GoDaddy)
- [ ] Content: About photos, Gallery photos, Photoshoot session photos, real testimonials, YouTube links

---

## 2026-04-09 — SEO Migration Prep & Fixes

### LocalBusiness Structured Data
- Filled in real business details in homepage JSON-LD: address (2285 St. Laurent Blvd Unit B8b, K1G 4Z7), phone (+1-250-407-3530), hours (9am–8pm daily)
- Added Google Business Profile link via `sameAs`
- Added Instagram (`@studio404inc`) to `sameAs` for entity recognition

### Shopify → Next.js Migration Redirects
- Added 36 permanent (301) redirect rules to `next.config.js`
- Covers all old Shopify URLs: 23 `/pages/*`, 9 `/products/*`, 2 `/collections/*`, 1 `/blogs/*` + wildcard
- Every indexed Shopify URL now maps to its closest Next.js equivalent

### SEO Improvements
- Added explicit `viewport` meta export to `layout.tsx`
- Added `FAQPage` JSON-LD structured data to homepage (4 FAQ items → rich snippets)
- Created web app manifest (`app/manifest.ts`) with brand colors
- Added favicon (32×32) and Apple touch icon (180×180) from 404 logo

### Migration Checklist
- Created `docs/plans/shopify-migration-checklist.md` — 4-phase step-by-step guide
  - Phase 1: GSC baseline export (before switch)
  - Phase 2: Domain switch (Shopify → Vercel DNS)
  - Phase 3: Post-switch verification (sitemap, redirects, GSC)
  - Phase 4: 4-week monitoring cadence

### Bug Fix — Voice Widget (Contact Page)
- Removed broken modal approach in `VoiceAgentBlock` that embedded a second ElevenLabs widget
- "Start Conversation" button now triggers the global ElevenLabs widget directly
- Reduced contact page bundle size (5.31KB → 4.92KB)

### Tour Page — Amenities Mobile Layout
- Redesigned Kitchenette & Client Lounge section for mobile to fit one screen
- Kitchenette card: image on top, compact text below, bordered container
- Client Lounge card: text on top, image below, bordered container
- Desktop layout unchanged (side-by-side panels)

### Commits
- `db0902c` — LocalBusiness details
- `c27fbac` — Migration redirects, FAQ schema, favicon, manifest, checklist
- `b988cf9` — Voice widget fix, tour amenities mobile layout

### Still Open
- [ ] GA4 Measurement ID — deferred, needs property ID
- [ ] ElevenLabs env var on Vercel — André adding manually
- [ ] Shopify domain switch — checklist ready at `docs/plans/shopify-migration-checklist.md`

---

## 2026-04-08 (Session 2) — Website Review Fixes

### UX & Layout
- Removed "Book Studio" CTA from Rental page bottom — only "Tour The Studio" remains
- Removed empty Gallery `SectionWrapper` from HomePage — was creating a phantom full-viewport gap between "What's Included" and FAQ
- Sped up testimonials marquee animation (40s → 20s)
- Navbar now reappears after 4 seconds of no scroll activity when hidden

### Copy & Content
- Rewrote InsideStudio section copy — removed AI-sounding language ("curated," "elevate," "engineered"), replaced with direct, natural tone
- Updated Policies page Studio Assistance text to André's exact copy

### Tour Page — Emoji Cleanup
- Replaced emojis with Lucide icons in Cyc Wall use-cases grid (Camera, Users, Video, Sparkles)
- Replaced emojis with Lucide icons in equipment category buttons (Lightbulb, Video, Wrench)
- Made use-case labels bolder (`text-cream font-medium` instead of `text-cream/80`)

### Bug Fix — Photoshoot Page
- Fixed "Rendered fewer hooks than expected" crash when clicking any session type card
- Root cause: `useState` was called inside an IIFE within JSX — violates React rules of hooks
- Fix: extracted inline form into `PhotoshootContactForm` component

### Checklist Status (from `docs/plans/2026-04-08-website-review-fixes.md`)
- [x] 1. InsideStudio copy rewrite
- [x] 2. Testimonials marquee speed
- [x] 3. Section gap fix
- [x] 4. Rental "Book Studio" removal
- [x] 5. Navbar idle reappear (4s)
- [x] 6. Photoshoot session click error
- [x] 7. Tour emojis → Lucide icons
- [x] 8. "Next Section" buttons (already done prior)
- [x] 9. Voice modal widget (already done prior)
- [x] 10. Policies Studio Assistance text
- [ ] 11. GA4 Measurement ID — needs André's GA4 property ID

---

## 2026-04-08

### Security — Dependency upgrades
- Upgraded Next.js `14.2.18` → `14.2.35` — closes 9 CVEs (DoS, SSRF, cache poisoning, auth bypass)
- Fixed picomatch ReDoS vulnerability via `npm audit fix`
- Fixed lodash prototype pollution vulnerability via `npm audit fix`
- 4 remaining advisories require Next.js 16.x (major version); accepted risk for Vercel-hosted deployment

### SEO — Per-page metadata
- Created `BookingProvider.tsx` — context-based client wrapper enabling server component pages
- Converted all 11 `app/*/page.tsx` from `'use client'` to server components with `metadata` exports
- Created 8 client bridge components (`*PageClient.tsx`) for pages needing `onBook` prop
- Every page now has unique `<title>`, `<meta description>`, `<meta og:*>`, and `<link rel="canonical">`
- Added `metadataBase` (`https://thestudio404.ca`) to `app/layout.tsx` for absolute URL resolution
- Added `twitter:card`, `robots`, `siteName`, `locale` to global metadata
- Set `booking-confirmation` page to `noindex, nofollow`
- Split `booking-confirmation/page.tsx` into server component (metadata) + `BookingConfirmationContent.tsx` (client)

### SEO — Structured data (JSON-LD)
- Added `LocalBusiness` schema to homepage (`app/page.tsx`) with name, description, URL, areaServed
- Created `lib/structured-data.ts` — shared `breadcrumbJsonLd()` helper
- Added `BreadcrumbList` schema to all 9 subpages (tour, photoshoot, rental, equipment, rates, gallery, about, contact, policies)
- LocalBusiness address/phone/hours left as TODO — requires real business data

### Code cleanup
- Removed `picsum.photos` placeholder URLs from `TourPage.tsx` (in commented-out "Current Sets" section)
- Moved ElevenLabs agent ID from hardcoded string to `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` env var
- Updated `.env.example` with ElevenLabs env var documentation

### Plan documentation
- Created `docs/plans/2026-04-08-production-remediation-plan.md` — formal 4-phase remediation plan covering all 11 open issues from Mar 28 audit + Apr 7 SEO audit

---

## 2026-03-28

### Gallery ordering & image cleanup
- `EQUIPMENT_IMAGES` (TourPage + EquipmentPage): moved `all_lights` and `studio_setup` to positions 1 & 2
- `PROPS_IMAGES` (TourPage + EquipmentPage): removed 2 placeholder entries (Stools & Seats, Podiums) — 3 real photos remain
- `FURNITURE_IMAGES` (TourPage + EquipmentPage): `beige_couch` moved to position 1
- Removed unused `PLACEHOLDER` constant from both files

### Kitchenette & Client Lounge layout — TourPage
- Replaced `flex-1` / absolute-fill image pattern with `aspect-[3/2]` containers
- Both landscape images now display fully without cropping
- Desktop: two panels side by side (image + text per column)
- Mobile: vertical stack — image → text → image → text
- Added `overflow-y-auto` wrapper for short-screen safety

### Home page "Shot in Our Space" carousel
- Removed all placeholder-generated images from `Gallery.tsx`
- Carousel hidden when no images present; add real Cloudinary IDs to `GALLERY_IMAGES` to restore
- GalleryPage color block placeholders unchanged

---

## 2026-03-28 (earlier)

### Photo upload pass — 20 images to Cloudinary
- Uploaded: 8 individual light photos, strip softbox, full rig overview, studio setup overview
- Uploaded: 3 props photos (newborn, vintage, small props)
- Uploaded: 7 furniture photos (director's chair, ottoman stools ×2, wood stool, standard stools, beige couch, black couch)
- Uploaded: studio space photos (kitchenette, client lounge, change room, cyc_full)

### EQUIPMENT_IMAGES — both pages
- Replaced 6 placeholder slots with 11 real Cloudinary photos

### FURNITURE_IMAGES — both pages
- All placeholders replaced; 7 real photos

### PROPS_IMAGES — both pages
- Added `small_props`; 3 real photos

### Tour page — The Space sections
- Kitchenette, Client Lounge, Change Room: gradients → real photos with correct aspect ratios

### Equipment page — Amenities accordions
- Client Lounge, Change Room, Kitchenette: all updated with real photos and matching aspect ratios

### Equipment page — Lighting section
- Added "View Equipment Photos" gallery button
- Fixed broken hero image (`EQUIPMENT-HERO` → `Pro_Lighting_Grid_q90xds`)

---

## Pre-2026-03-28

### Cloudinary integration
- Upload script: `scripts/upload-to-cloudinary.mjs`
- Cloudinary helper: `lib/cloudinary.ts`

### Tour page
- PhotoGalleryModal: full-screen viewer with arrows, keyboard nav, swipe
- GalleryStripModal: thumbnail scroll strip
- HorizontalScrollGallery component
- Browse Props / Browse Furniture / View Equipment Photos buttons

### Home page
- Testimonials section (marquee ticker, 3 real + 7 placeholder reviews)
- InsideStudio section redesign
- Phone call button

### Photoshoot page
- Contact form wired to `/api/contact` → GHL webhook

### Infrastructure
- Scroll-snap fixes across pages
- Framer Motion animations throughout
