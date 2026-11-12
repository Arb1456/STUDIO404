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
- [ ] **(HIGH) Hook up all 7 site forms to GHL with notifications.** Plan: `docs/plans/2026-11-12-website-forms-ghl-plan.md`
- [ ] GHL Full Holiday Session calendar: 30 min → 1.5 h (re-send slotDuration + slotInterval)
- [ ] Google Business Profile phone (250) 407-3530 → 343-314-4140
- [ ] Point the dynamic truck QR codes at `thestudio404.ca/truck` (initiative page) and `thestudio404.ca/minis` (Holiday Minis)
- [ ] Swap last year's set photos for the 2026 set: change the IDs in `SET_PHOTOS`, `lib/holiday.ts`
- [ ] Create both GHL calendars (`404holiday-mini-session`, `404holiday-session`). See the setup guide and `docs/plans/2026-11-10-holiday-mini-slot-plan.md` (slot interval 45 min).
- [x] (Nov 10) $50 deposit, refundable up to 14 days before; surcharges from the booking form, invoiced with the balance
- [x] (Nov 10) Real mini days in `MINI_DAYS`: 11 days, 104 slots (30 min + 15 min reset). Nov 12: added Nov 22 (2–6 pm), now 12 days, 109 slots
- [x] (Nov 12) `/booking-confirmation` variants: default = rental, `?type=session`, `?type=holiday-mini`. **Update the GHL redirect URLs on the photo session calendars.**
- [ ] Block mini time windows on the rental + photo session calendars (Full Holiday = normal photoshoot hours, any day)
- [ ] Christmas set photos to replace the placeholders (`HOLIDAY_HERO_IMAGE`, `CHRISTMAS_SET.image`)
- [ ] Confirm the set description ("tree, lights, cozy décor" was a guess)
- [x] (Nov 10) Repointed the old Shopify redirect `/products/christmas-mini-session` → `/holiday-minis`
- [x] (Nov 10) `npm run build` passes (21 pages); committed on `holiday-2026`
- [ ] Merge to `main`, deploy, test both forms live against the GHL webhook
- [ ] Verify the Meta Pixel fires on the live site; tag Meta ad links with `utm_source=meta`
- [ ] Truck QR code → `thestudio404.ca/truck`
- [ ] GHL email spam issue (SMTP credential error, stalled warmup), carried over

### Later / nice to have
- [ ] Holiday mini terms on the Policies page
- [ ] Christmas examples for the Families/Couples tabs
- [ ] GHL post-booking follow-up form (group size, ages, style)
- [ ] Christmas Truck Initiative page content
- [ ] Meta Conversions API (blocked on Business Account link)
- [ ] After the season: `HOLIDAY_SEASON_ENABLED = false`, repoint `/truck`
