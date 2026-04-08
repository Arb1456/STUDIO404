# STUDIO404 Website — Changelog

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
