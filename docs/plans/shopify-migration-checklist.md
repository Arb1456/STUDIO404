# Shopify → Next.js Migration Checklist

**Domain:** thestudio404.ca (same domain — no Change of Address needed)
**Old platform:** Shopify
**New platform:** Next.js 14 on Vercel

---

## Phase 1: Before the Switch (do while Shopify is still live)

### Google Search Console Baseline
- [ ] Sign in to [Google Search Console](https://search.google.com/search-console)
- [ ] If `thestudio404.ca` is not already a property, add it (URL prefix method)
- [ ] Verify ownership via HTML tag in Shopify theme `<head>`, or DNS TXT record
- [ ] Go to **Performance → Pages tab** → set date range to **Last 6 months** → **Export** (CSV)
- [ ] Go to **Performance → Queries tab** → **Export** (CSV)
- [ ] Go to **Indexing → Pages** → **Export** (CSV)
- [ ] Save all 3 exports — this is your "before" baseline

### Verify New Site is Ready
- [ ] Confirm Vercel deployment is live and accessible (via Vercel preview URL)
- [ ] Confirm all 10 pages load correctly
- [ ] Confirm booking modal works
- [ ] Confirm contact form submits
- [ ] Confirm 301 redirects are configured in `next.config.js` (36 rules — done)
- [ ] Confirm sitemap.xml serves all pages
- [ ] Confirm robots.txt is correct

### Optional but Recommended
- [ ] Check backlinks to old Shopify URLs using a free tool (Ahrefs Webmaster, Ubersuggest)
- [ ] Note any external sites linking to specific `/pages/` or `/products/` URLs

---

## Phase 2: The Switch (15-minute process)

### Step 1: Remove Domain from Shopify
- [ ] Go to **Shopify Admin → Settings → Domains**
- [ ] Remove `thestudio404.ca` as the primary/custom domain
- [ ] Do NOT cancel your Shopify subscription yet

### Step 2: Add Domain to Vercel
- [ ] Go to **Vercel Dashboard → your project → Settings → Domains**
- [ ] Add `thestudio404.ca`
- [ ] Vercel will show you the DNS records needed (typically an A record and/or CNAME)

### Step 3: Update DNS Records
- [ ] Go to your **domain registrar** (wherever you bought the domain — GoDaddy, Namecheap, Cloudflare, etc.)
- [ ] Update DNS records to point to Vercel:
  - A record: `76.76.21.21` (Vercel's IP)
  - Or CNAME: `cname.vercel-dns.com` (for www subdomain)
- [ ] Vercel auto-provisions SSL — no manual certificate needed

### Step 4: Verify the Switch
- [ ] Wait 5-15 minutes for DNS propagation
- [ ] Visit `https://thestudio404.ca` — confirm the new Next.js site loads
- [ ] Test 3-5 old Shopify URLs to confirm 301 redirects work:
  - `https://thestudio404.ca/pages/studio-tour` → should redirect to `/tour`
  - `https://thestudio404.ca/pages/photoshoots` → should redirect to `/photoshoot`
  - `https://thestudio404.ca/products/family-session` → should redirect to `/photoshoot`
  - `https://thestudio404.ca/pages/about-us` → should redirect to `/about`
  - `https://thestudio404.ca/collections/photo-sessions` → should redirect to `/photoshoot`

---

## Phase 3: Post-Switch (same day)

### Google Search Console
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify `thestudio404.ca` property still shows (same domain, should persist)
- [ ] Go to **Sitemaps** → submit `https://thestudio404.ca/sitemap.xml`
- [ ] Use **URL Inspection** to test 3-5 key pages — confirm they are indexable

### Google Business Profile
- [ ] Go to your [Google Business Profile](https://business.google.com)
- [ ] Verify website URL still points to `https://thestudio404.ca` (it should — same domain)
- [ ] No changes needed unless the link was to a specific Shopify page

### Analytics
- [ ] Confirm GA4 is receiving data (if GA4 is set up — measurement ID still pending)

---

## Phase 4: Monitoring (weeks 1-4 after switch)

### Week 1
- [ ] Check GSC **Indexing → Pages** daily — watch for 404 spikes
- [ ] If new 404s appear, add missing redirects to `next.config.js` and redeploy
- [ ] Verify Google is crawling the new sitemap (check "Sitemaps" for last read date)

### Week 2
- [ ] Compare GSC **Performance** (clicks, impressions) against your baseline export
- [ ] Some fluctuation is normal — look for sustained drops on specific pages
- [ ] Check **Core Web Vitals** report — confirm scores are green

### Weeks 3-4
- [ ] Traffic should stabilize or improve
- [ ] If any pages dropped significantly, check:
  - Is the redirect working? (test the old URL)
  - Is the new page indexed? (URL Inspection tool)
  - Is the content equivalent? (similar keywords, headings)

### After 4 Weeks
- [ ] If everything is stable, you can downgrade or cancel Shopify
- [ ] Keep monitoring GSC monthly as part of normal SEO maintenance

---

## Quick Reference: What's Already Done

| SEO Element | Status |
|---|---|
| 301 redirects (36 rules) | Configured in next.config.js |
| Per-page metadata (titles, descriptions, OG) | All 11 pages |
| LocalBusiness JSON-LD (address, phone, hours) | Homepage |
| FAQPage JSON-LD | Homepage |
| BreadcrumbList JSON-LD | All 9 subpages |
| Canonical URLs | All pages |
| Sitemap.xml | Dynamic, all pages |
| Robots.txt | Configured |
| Viewport meta | Configured |
| Web app manifest | Configured |
| noindex on booking-confirmation | Configured |
| Image alt texts | All images |
| SSL/HTTPS | Auto via Vercel |

## Still Pending

| Item | Notes |
|---|---|
| GA4 Measurement ID | Need property ID to activate analytics |
| Favicon / app icon | Need a logo file to add as `app/icon.png` |
