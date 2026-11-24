# Studio 404 Website

This repo is the Studio 404 website (Next.js, deployed on Vercel from `main`; day-to-day branch `holiday-2026`, fast-forwarded into `main` to deploy).

## Two folders: what belongs where (agreed with André, Nov 20 2026)

### Social Media folder (`~/Desktop/STUDIO404-Social Media`): NOT done here

- Instagram, Facebook and Google Business Profile **posts**: captions, post graphics and templates, rendering, the "spots left" refresh
- The content calendar, weekly preview and approval, GHL Social Planner scheduling
- Sunday routine: "what's new" questions, shot lists, video briefs (McGuire editing agent), the `inbox/` photo drop
- Reels, TikTok and YouTube Shorts; reference-post formats; bilingual captions
- Reconnecting Facebook and Instagram in GHL Social Planner (they expire Dec 15 / Dec 16)
- **Paid ads:** Meta ads (creatives, Ads Manager, ads log), Google Ads (campaign, keywords, search terms, advertiser verification), Microsoft Ads
- **Email marketing campaigns** (Christmas emails, "spots filling", "last call", gift-card emails, audience lists and tags such as finding past photo clients among the Shopify contacts)
- **Marketplaces and press:** Peerspace, Giggster, CTV/CBC/French media pitches, community newsletters, micro-creators, giveaways

### This folder (website): done here

- Website code and deploys, holiday mode, offer wording and prices in `lib/holiday.ts`, redirects and QR links (`/truck`, `/minis`), the bio link page `app/links/page.tsx`
- Site tracking: GA4, Meta Pixel, GA4 key events, Meta Conversions API (sent from GHL)
- GHL booking setup (calendars, slots, deposits, forms, add-ons) and GHL automations (client emails/texts that belong to a booking, André's alerts, reminders, rental workflows, door code)
- Invoicing: rental and session auto-invoices, draft/send switches, GHL invoice settings
- Contact-form inbox and replies; email deliverability (spam, Outlook, DMARC)
- Local SEO and listings: directory cleanup (old 250 number), the Facebook page's contact info, Search Console, the Shopify domain, the **Google Business Profile listing** (services, prices, booking link; GBP *posts* are social)
- **Review requests** (GHL automation) and the **review QR card**
- Website content (photos, testimonials, Christmas examples on the site)

### When André asks for a Social Media folder job here

Don't do it here. Instead:

1. Say in one line that this belongs to the Social Media folder.
2. Write a handoff file in `~/Desktop/STUDIO404-Social Media/handoffs/` named `YYYY-MM-DD-<short-slug>.md` (format in that folder's `handoffs/README.md`): what André asked for in his words, every fact and ID gathered so far, relevant website facts (prices, dates, links from `lib/holiday.ts`), open questions, and what "done" looks like. Gather what's needed from this repo and memory first so the other session doesn't have to.
3. Tell André: open `~/Desktop/STUDIO404-Social Media` in a new session and say **"pick up the handoff <file name>"**.

If a request is mixed (e.g. a price change on the site plus captions), do the website part here and hand off the social part. If website changes affect social content (prices, mini days, offer wording in `lib/holiday.ts`), write a handoff so captions, ads and emails get the same update.

The shared to-do page (https://claude.ai/artifact/XVzJBArB44NMv3HUX2YWpa) tags Social Media folder items "Social folder".
