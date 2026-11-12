# Session Notes — 2026-11-09

## Focus
Christmas 2026 rework: the holiday homepage hero, the `/holiday-minis` landing page (for ads and truck QR traffic, targeting families and couples), holiday sessions on Photo Sessions, Christmas set marketing on Rental and Tour, and a GHL calendar setup guide.

**Branch:** `holiday-2026`. **Nothing committed yet.** Dev server stopped.

## What Changed

### New Files
- `lib/holiday.ts`: season switch, offers, policy, mini days, FAQ, contact, Christmas set, routes
- `lib/holiday-tracking.ts`: GA4/Meta booking-intent events and the shared CTA actions
- `lib/arrival.ts`: utm_source eyebrow hook (returns null by decision)
- `components/ui/Christmas.tsx`: emblems, divider, scatter, snowfall
- `components/pages/sections/HolidayHero.tsx`: seasonal homepage hero
- `components/pages/HolidayMinisPage.tsx` + `app/holiday-minis/page.tsx`
- `app/christmas-truck/page.tsx`: Coming Soon placeholder
- `docs/plans/2026-11-09-ghl-holiday-calendars-setup.md`

### Files Modified
- `components/pages/HomePage.tsx`: hero swap via `isHolidaySeason()`
- `components/layout/Navigation.tsx`: holly on seasonal items, mini-page bottom-bar CTA opens the calendar
- `components/pages/PhotoshootPage.tsx`: holiday sessions, `cardTitle`, mini review
- `components/pages/RentalPage.tsx`: Christmas set / full-day section
- `components/pages/TourPage.tsx`: Christmas Set tour stop
- `lib/constants.ts`, `types/index.ts`: menu order, `seasonal` flag
- `next.config.js`: `/truck` redirect. `tailwind.config.js`: evergreen/gold. `app/globals.css`: snowfall. `app/sitemap.ts`

### Key Decisions
- **Manual season switch** (`HOLIDAY_SEASON_ENABLED`), not a date window. The static build would freeze a date check at deploy time.
- **"Holiday Minis"** on the site (not "Christmas Minis"); eyebrows say "Christmas 2026".
- **Surcharges** (+$15/person over 5, +$25 pet) appear as fine print on the landing page and in full on the GHL booking form.
- **Hero CTA scrolls to dates/booking; bottom bar opens the calendar directly.**
- **Same eyebrow for truck and ad visitors**. The `utm` tags are kept for GA4 attribution only.
- **Plain iframe for the GHL calendar.** `form_embed.js` hid it because the site uses slug URLs, not calendar IDs.
- **No fake sold-out days.** Honest scarcity plus a waitlist instead.
- "Christmas at Studio 404" is built as a section on `/holiday-minis`, not a separate page.

## Still Open

### Needed before launch
- [x] (Nov 12) All 7 site forms → GHL "Contact Form" workflow: contact + note + email to all users + SMS to André. Verified live. See `docs/plans/2026-11-12-website-forms-ghl-plan.md`
- [x] (Nov 12) GHL Full Holiday Session calendar is 1.5 h (90 min, 15-min interval), verified via API
- [ ] **NOTE:** Google Business Profile phone (250) 407-3530 → 343-314-4140 (the GHL number), for consistent local SEO
- [ ] Point the dynamic truck QR codes at `thestudio404.ca/truck` (initiative page) and `thestudio404.ca/minis` (Holiday Minis)
- [ ] Swap last year's set photos for the 2026 set: change the IDs in `SET_PHOTOS`, `lib/holiday.ts`
- [x] (Nov 12) Created both GHL calendars. Holiday Mini is an *event* calendar: 109 slots verified against the slot plan, $50 deposit. Full Holiday: $75 deposit. Status: `docs/plans/2026-11-09-ghl-holiday-calendars-setup.md`
- [x] (Nov 10) $50 deposit, refundable up to 14 days before; surcharges from the booking form, invoiced with the balance
- [x] (Nov 10) Real mini days in `MINI_DAYS`: 11 days, 104 slots (30 min + 15 min reset). Nov 12: added Nov 22 (2–6 pm), now 12 days, 109 slots
- [x] (Nov 12) `/booking-confirmation` variants: default = rental, `?type=session`, `?type=holiday-mini`. (Nov 12, after deploy) All 22 GHL calendars now redirect to their variant, including `?type=holiday-session` for Full Holiday. Script: `docs/plans/ghl-scripts/reapply_session_redirects.py`
- [x] (Nov 12) Mini windows are blocked on all 21 other calendars by Andre's user-level "Christmas reserve" blocked slots (verified). **Don't delete them.**
- [ ] Run the launch check: `docs/plans/2026-11-12-holiday-launch-e2e-checklist.md`, including one real $50 test booking (then refund it)
- [ ] Christmas set photos to replace the placeholders (`HOLIDAY_HERO_IMAGE`, `CHRISTMAS_SET.image`)
- [ ] Confirm the set description ("tree, lights, cozy décor" was a guess)
- [x] (Nov 10) Repointed the old Shopify redirect `/products/christmas-mini-session` → `/holiday-minis`
- [x] (Nov 10) `npm run build` passes (21 pages); committed on `holiday-2026`
- [ ] Merge to `main`, deploy, test both forms live against the GHL webhook
- [ ] Verify the Meta Pixel fires on the live site; tag Meta ad links with `utm_source=meta`
- [ ] Truck QR code → `thestudio404.ca/truck`
- [ ] GHL email spam issue (SMTP credential error, stalled warmup), carried over

### Christmas marketing (added Nov 12, next up)

Claude drafts and sets everything up. **Andre approves every send, post and dollar of ad spend before it goes out.**

**Email campaigns** (GHL: 658 contacts, 0 campaigns so far)
- [ ] **Blocker first: fix the GHL email spam issue** (SMTP credential error, warmup stuck at Stage 1). A blast to 658 contacts on a cold domain will mostly land in spam and hurt the domain further. Send a test to Gmail/Outlook; if it's still spam, open a GHL support ticket.
- [ ] **CASL check**: only email contacts with consent (past clients and enquiries within 2 years, or opted in). Every email needs an unsubscribe link and the business address. Build a smart list or tag for eligible contacts.
- [ ] Draft the email sequence: (1) Holiday Minis announcement, (2) "spots filling" with real counts from `MINI_DAYS`, (3) last call before Dec 21. Optional: a Full Holiday Session and gift-card angle.
- [ ] Build the templates in GHL (Email Builder, API) and schedule the campaign (Marketing → Emails, in Chrome) after approval. Link to `/holiday-minis` with `utm_source=email`.

**Ads** (Meta Pixel `1480030709764047` is live; CAPI still blocked)
- [ ] Connect the ad account in GHL Ad Manager, or work directly in Meta Ads Manager through Chrome. Andre clicks the OAuth/permission grant.
- [ ] Verify the Pixel fires on `/holiday-minis` and on the `purchase` event from `/booking-confirmation?type=holiday-mini`
- [ ] Draft the Holiday Minis campaign: Ottawa radius, families and couples, set photos and reels, budget and dates. Andre approves budget and launch. Tag links `utm_source=meta`.
- [ ] Optional: Google Business Profile post and offer

**Social posts** (GHL Social Planner connected: Facebook page, Instagram `studio404inc`, Google Business Profile)
- [ ] **Check the connection expiry dates regularly** (GHL → Marketing → Social Planner → accounts, or ask Claude to check via API) and **reconnect before they lapse.** Google shows an expiry of Nov 12 (now); Facebook expires **Dec 15** and Instagram **Dec 16**, right in the middle of the last mini week. Posts scheduled after those dates will fail unless the accounts are reconnected.
- [ ] Draft a Christmas content calendar (Nov 16 – Dec 21): set reveal, mini-day announcements, behind-the-scenes, client results, Christmas truck, "last spots", final-week posts
- [ ] Andre approves the drafts and photos. Claude schedules them via the Social Planner API and checks they're queued.

### Christmas set on the site (added Nov 12, not urgent)

- [ ] **Set photos**: replace the placeholder and last-year images with real 2026 Christmas set photos (`HOLIDAY_HERO_IMAGE`, `CHRISTMAS_SET.image`, `SET_PHOTOS` in `lib/holiday.ts`), or build a dedicated "See the set" section/gallery.
- [ ] **Rental page notice**: say the Christmas set is now active. During the season, half of the studio is set up as the Christmas set and the **cyclorama side runs as normal**, so regular rental and shoot types aren't affected.
- [ ] **Rental page section** showing the current Christmas set (photos + short description, available to renters).
- [ ] **Studio tour page section** showing the Christmas set.
- [ ] After the season: remove or hide these with `HOLIDAY_SEASON_ENABLED = false`.

### Later / nice to have
- [ ] Holiday mini terms on the Policies page
- [ ] Christmas examples for the Families/Couples tabs
- [ ] GHL post-booking follow-up form (group size, ages, style)
- [ ] Christmas Truck Initiative page content
- [ ] Meta Conversions API (blocked on Business Account link)
- [ ] After the season: `HOLIDAY_SEASON_ENABLED = false`, repoint `/truck`
