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

### Today (Nov 15)
- [x] (Nov 17, published) **Day-before email + calendar text** workflow "Holiday Mini: Day-Before Email + Calendar Text" `ea201b37-1690-4eba-a987-b4eb30b24a6d` (trigger: booked in Holiday Mini → SMS to Andre "📅 Add to your calendar…" → wait 1 day before (skips if booked <24h out) → client email). Test email sent to Andre's Gmail. Awaiting Andre's review. On publish: add "remove from this workflow" to Andre Alerts: Cancellations; send Michelle Bowie (Nov 22) + Rose Purification (Dec 6) the email by hand (booked before the workflow existed).
- [x] (Nov 17) "What to wear" removed (Andre's call): both FAQ entries in `lib/holiday.ts`, the "Plan your outfits" step on `/booking-confirmation`, and the day-before email draft. Christmas campaign emails only list outfit counts, kept. Build passes; **not committed/deployed yet**.
- [x] (Nov 17) Live mini confirmation email: removed broken "Date: {{appointment.start_date}}" (invalid field, rendered blank); line now "When: {{appointment.start_time}}".
- [x] (Nov 17) Andre Alerts reminder SMS (both numbers): "TOMORROW:" -> "UPCOMING:" so late/re-triggered reminders aren't wrong. Cause of the wrong "tomorrow" text today: Claude's API update to Andre's test booking at 2:47 pm re-fired all booking workflows.
- [x] (Nov 17) **Branded HTML client emails LIVE (Andre approved)**: mini + session confirmations swapped to templates, Photo Sessions workflow now ends with wait 1 day before + `Sessions: Day-before reminder`, mini day-before workflow `ea201b37` PUBLISHED, Cancellations removes from all four. All four templates say "parking lot C, Unit B8b". Rental Pre Booking email (workflow `149ffca6` step copy) now says park in lot C / Unit B8b and to place a hand on the keypad on the door handle to wake it before entering 4449. Michelle (Nov 21) + Rose (Dec 5) day-before emails: send by hand (reminders in Andre's Google Calendar). Was: (GHL templates, made via API): `XMAS26 mini: Booking confirmation` 6afcb7a2975818c3a1094232, `XMAS26 mini: Day-before reminder` 6afcb7a1e08bbf563900e9d8 (already linked in the draft day-before workflow), `Sessions: Booking confirmation` 6afcb9d5cc2a4ec04de28ba0, `Sessions: Day-before reminder` 6afcb9d708d3f7b89ef43167 (all 11 photo-session calendars incl. Full Holiday). Scope per Andre: minis + photo sessions only, NOT rentals/invoices/payments/contracts. On approval: swap the confirmation step in `c75275a0` (minis) and `9e802984` (sessions) to "Select existing template"; add wait-1-day + day-before email to the end of `9e802984`; publish the mini draft; add both to the Cancellations removal step. Note: every session + mini confirmation sent before Nov 17 had a blank "Date:" line (invalid {{appointment.start_date}}); the new templates use "When" only.
- [x] (Nov 17) Mini bookings don't sync to Andre's Google calendar (event calendar, no host). Linking it via External sync zeroed all slots (Christmas reserve blocks are in Gmail); reverted, 161 slots back. Existing bookings added to Gmail by hand; future ones via the calendar text above.
- [x] Booking confirmation page: only the Return Home button now on every variant (`c79957f`).
- [ ] Calendar logo: skipped for now (upload app/apple-icon.png by hand in each calendar's Basic details if wanted).
- [x] Minis: 30-min back-to-back slots, 2 per hour, no buffer (GHL slotInterval 45 -> 30). 163 slots.
- [x] Mini add-ons live: 4 More Edited Photos +$40, Full Proof Album +$35. GHL "Holiday Mini Form" `s10hT3DfmHFKgCDnDKxL` on the mini calendar; add-ons shown in the client confirmation email, Andre's booking alert email and both SEND MINI INVOICE texts. Full Holiday Session now 12 edited photos. Site committed `46a4c05`, pushed to main.
- [x] (Nov 15, passed) **Test booking**: one Holiday Mini with an add-on ticked. Check the client email, Andre's alert email + texts, and the SEND MINI INVOICE text (if the session is under 7 days out).
- [x] Rental door-code SMS: "Send Pre Booking SMS (door code)" added right after "Send Pre Booking Email" in "Booking Confirmation & Contract Flow" `149ffca6…` (code 4449 is typed into the SMS; update it there too if the door code changes).
- [x] (Nov 15) Test cleanup done: 8:00 + 8:30 pm test bookings cancelled; Andre's 9:00 pm Tue Nov 17 booking KEPT on purpose (to receive every email/reminder); Nov 17 availability narrowed to 9:00–9:30 so nothing else is open; deposits left as is (Andre's own card). Was: **TEST SLOTS TO REMOVE after testing:** Holiday Mini availability Tue Nov 17, 8:00–10:00 pm (added via API for Andre's tests). Remove that date from the mini calendar, cancel the test bookings and refund the $50 deposits (keep the 8 pm one until the Mon 8 pm reminder fires).
- [x] (Nov 15, fixed + final check passed) **Mini deposit payment intermittently hangs** after "Schedule meeting" + card (Andre Nov 15 attempt 1 on the website, saved card typed in; Michelle Bowie 2 of 3 attempts). Booking becomes "invalid" ~10 min later, no charge. Attempt 2 worked end to end. Root cause found: Stripe Link's saved-card code prompt hangs inside the embedded calendar (Apple Pay also missing there). Fixed in `3dbf720`: holiday pages open the calendar in a new tab (no iframes). Apple Pay/Link domains registered in GHL Stripe. Mini + Full Holiday booking pages styled evergreen/cream. Final check: book from the site with the saved card (Link) in the new tab.
- [x] (not needed, Andre's own card) Refund test deposits: $50 (Nov 15 6:33 pm, 8:00 pm slot) and $50 (Nov 15 7:46 pm, 8:30 pm Apple Pay slot), plus any from the final check.
- [ ] Later (not now): add-ons for the Full Holiday Session and all photo sessions.

### Needed before launch
- [x] (Nov 12) GHL alerts to André by SMS + email: new bookings (all 24 calendars, including Holiday Mini, which had none), 24h and 2h session reminders, cancellations, GHL form submissions, and paid invoices (SMS). Website forms: SMS + email. **Next real booking = first live test of the booking alert.** All SMS also go to 613-581-1134.
- [ ] **(NEXT SESSION) In-depth review of all GHL notification workflows**: `docs/plans/2026-11-12-ghl-notification-workflows.md` (IDs, messages, gaps, test plan)
- [x] (Nov 12) All 7 site forms → GHL "Contact Form" workflow: contact + note + email to all users + SMS to André. Verified live. See `docs/plans/2026-11-12-website-forms-ghl-plan.md`
- [x] (Nov 12) GHL Full Holiday Session calendar is 1.5 h (90 min, 15-min interval), verified via API
- [x] (Nov 12) Google Business Profile phone (250) 407-3530 → 343-314-4140 (the GHL number), for consistent local SEO
- [x] (Nov 12) Pointed the dynamic truck QR codes at `thestudio404.ca/truck` (initiative page) and `thestudio404.ca/minis` (Holiday Minis)
- [ ] Swap last year's set photos for the 2026 set: change the IDs in `SET_PHOTOS`, `lib/holiday.ts`
- [x] (Nov 12) Created both GHL calendars. Holiday Mini is an *event* calendar: 109 slots verified against the slot plan, $50 deposit. Full Holiday: $75 deposit. Status: `docs/plans/2026-11-09-ghl-holiday-calendars-setup.md`
- [x] (Nov 10) $50 deposit, refundable up to 14 days before; surcharges from the booking form, invoiced with the balance
- [x] (Nov 10) Real mini days in `MINI_DAYS`: 11 days, 104 slots (30 min + 15 min reset). Nov 12: added Nov 22 (2–6 pm), now 12 days, 109 slots
- [x] (Nov 12) `/booking-confirmation` variants: default = rental, `?type=session`, `?type=holiday-mini`. (Nov 12, after deploy) All 22 GHL calendars now redirect to their variant, including `?type=holiday-session` for Full Holiday. Script: `docs/plans/ghl-scripts/reapply_session_redirects.py`
- [x] (Nov 12) Mini windows are blocked on all 21 other calendars by Andre's user-level "Christmas reserve" blocked slots (verified). **Don't delete them.**
- [~] Run the launch check: `docs/plans/2026-11-12-holiday-launch-e2e-checklist.md`. (Nov 12) Sections 0–3 PASSED (redirects, live pages, confirmation variants, customer-view calendars). **Section 4 (real $50 test booking) on hold** until the other session finishes its GHL workflow changes; then build a **master booking-flow verification** (website → GHL booking → payment → confirmation page → GA4/Meta → client + owner alerts → reminders → cancel/refund → slot returns on the live site) and run it once end to end.
- [ ] Christmas set photos to replace the placeholders (`HOLIDAY_HERO_IMAGE`, `CHRISTMAS_SET.image`)
- [ ] Confirm the set description ("tree, lights, cozy décor" was a guess)
- [x] (Nov 10) Repointed the old Shopify redirect `/products/christmas-mini-session` → `/holiday-minis`
- [x] (Nov 10) `npm run build` passes (21 pages); committed on `holiday-2026`
- [x] (Nov 15) Merged to `main` and deployed (holiday-2026 is live). Website forms verified live Nov 12.
- [ ] Verify the Meta Pixel fires on the live site; tag Meta ad links with `utm_source=meta`
- [~] GHL email spam issue: (Nov 13) Gmail gets everything. andre@thestudio404.ca is **Microsoft 365**: the Emilia Salomon booking alert + form alert (Nov 12, 8:55 pm) **failed** (Outlook 4.3.2 throttling Mailgun; the SMS alert for it arrived fine), and "delivered" emails don't show (likely Junk/quarantine; no DMARC). **Fix 1 handed to the GHL session:** owner email alerts also go to Andre's Gmail. Optional later: DMARC `p=none` record + M365 allow for `lc.thestudio404.ca`.

### Christmas marketing (added Nov 12, next up)

Claude drafts and sets everything up. **Andre approves every send, post and dollar of ad spend before it goes out.**

**Email campaigns** (GHL: 658 contacts, 0 campaigns so far)
- [x] (Nov 12) Deliverability test: Gmail inbox, SPF/DKIM pass. Volume is still low (Mailgun "low volume" shared pool), so keep sends small; the eligible list is small anyway.
- [ ] **Audience = past photo-session clients only** (family, couple, portrait, general shoots). No rental-only clients.
  - (Nov 12, recount) Anyone who booked or was invoiced for a photo shoot in GHL (Jan 2026 onward, any status): **30 emailable**. 23 family/couple/portrait/general, 4 business-only (headshot/product/branding), 3 only cancelled/invalid bookings. GHL holds just ~25 photo-shoot bookings in total; the business there is mostly rentals.
  - **247 contacts tagged `shopify`** are pre-GHL customers, and GHL doesn't record what they bought. Export Shopify orders (products like `christmas-mini-session`, family/portrait sessions) to find which were photo-session clients, then tag them.
  - Tag the final list (e.g. `xmas26-past-client`) for the campaign. CASL: past paying clients within 2 years count as implied consent; every email needs an unsubscribe link and the address (GHL adds unsubscribe).
- [x] (Nov 12) **Email 1, priority minis** → 22 past photo clients, tag `xmas26-priority-mini`. GHL template `6af64df670957623488d47b0`. Subject: "You're first: Christmas Minis at Studio 404". Excluded: Wassim, Anu Rai, Ajmer, Maad, Isha, Salwa, Justin Lafrance, Jaye Recoskie.
- [x] (Nov 12) **Email 2, "Christmas is live"** → 181 past rental clients (minus the 2 already on Email 1), tag `xmas26-general`. GHL template `6af64df86019801c7f525484`. CTAs: Book a Mini / Book a Session (`/holiday-session`) / Rent the Studio (`/rental`).
- [x] (Nov 15) **Both emails approved and SCHEDULED** in GHL (Marketing > Emails > Campaigns): Email 1 priority (22 contacts) Mon Nov 16 10:00 am; Email 2 general (181) Wed Nov 18 10:00 am, before the Nov 18 7 pm "Holiday Minis Are Open" social post. Templates updated first: mini add-ons (+$40 4 more edits, +$35 Full Proof Album) and Full Holiday = 1.5 h, 2 outfits, 12 edited photos, $250. From "Andre at Studio 404" <andre@lc.thestudio404.ca>, reply-to andre@thestudio404.ca, click tracking on. Was: **REVIEW BOTH EMAILS BEFORE SENDING (on hold, Nov 12).** Andre reviews the `[PREVIEW]` emails in Gmail: wording, buttons, the unsubscribe link, "Hi there" vs first names. Then he approves both previews (sent to Gmail, landed in **Promotions**), then Claude schedules both as GHL bulk email campaigns (Chrome). Send Email 1 a day or two before Email 2 so priority is real.
- [ ] Draft the email sequence: (1) Holiday Minis announcement, (2) "spots filling" with real counts from `MINI_DAYS`, (3) last call before Dec 21. Optional: a Full Holiday Session and gift-card angle.
- [ ] Build the templates in GHL (Email Builder, API) and schedule the campaign (Marketing → Emails, in Chrome) after approval. Link to `/holiday-minis` with `utm_source=email`.

**Ads** (Meta Pixel `1480030709764047` is live; CAPI still blocked)
- [ ] Connect the ad account in GHL Ad Manager, or work directly in Meta Ads Manager through Chrome. Andre clicks the OAuth/permission grant.
- [ ] Verify the Pixel fires on `/holiday-minis` and on the `purchase` event from `/booking-confirmation?type=holiday-mini`
- [ ] Draft the Holiday Minis campaign: Ottawa radius, families and couples, set photos and reels, budget and dates. Andre approves budget and launch. Tag links `utm_source=meta`.
- [ ] Optional: Google Business Profile post and offer

**Social posts** (GHL Social Planner connected: Facebook page, Instagram `studio404inc`, Google Business Profile)
- [~] (Nov 15) **Social media moved to its own folder: `~/Desktop/STUDIO404-Social Media`** (open that folder for anything social). Week 1 = 7 drafts awaiting Andre's approval; shot list #1 there; `thestudio404.ca/links` to paste into the IG bio.
- [ ] **Check the connection expiry dates regularly** (GHL → Marketing → Social Planner → accounts, or ask Claude to check via API) and **reconnect before they lapse.** (Nov 12) Google Business Profile: connected, no expiry (auto-renews). Facebook expires **Dec 15** and Instagram **Dec 16**, right in the middle of the last mini week. Posts scheduled after those dates will fail unless the accounts are reconnected.
- [ ] Draft a Christmas content calendar (Nov 16 – Dec 21): set reveal, mini-day announcements, behind-the-scenes, client results, Christmas truck, "last spots", final-week posts
- [ ] Andre approves the drafts and photos. Claude schedules them via the Social Planner API and checks they're queued.

### Christmas set on the site (added Nov 12, not urgent)

- [ ] **Set photos**: replace the placeholder and last-year images with real 2026 Christmas set photos (`HOLIDAY_HERO_IMAGE`, `CHRISTMAS_SET.image`, `SET_PHOTOS` in `lib/holiday.ts`), or build a dedicated "See the set" section/gallery.
- [ ] **Rental page notice**: say the Christmas set is now active. During the season, half of the studio is set up as the Christmas set and the **cyclorama side runs as normal**, so regular rental and shoot types aren't affected.
- [ ] **Rental page section** showing the current Christmas set (photos + short description, available to renters).
- [ ] **Studio tour page section** showing the Christmas set.
- [ ] After the season: remove or hide these with `HOLIDAY_SEASON_ENABLED = false`.

### Later / nice to have
- [ ] **(PLAN LATER, Andre Nov 17) Session options form for every full photo session** (not minis), sent right after booking or before the shoot. Confirms the 1 included outfit or adds more outfits, more photos (e.g. 8 photos) and other add-ons, each with its price. Replaces/extends the old "GHL post-booking follow-up form" idea below.
- [ ] Holiday mini terms on the Policies page
- [ ] Christmas examples for the Families/Couples tabs
- [ ] GHL post-booking follow-up form (group size, ages, style)
- [ ] Christmas Truck Initiative page content
- [ ] Meta Conversions API (blocked on Business Account link)
- [ ] After the season: `HOLIDAY_SEASON_ENABLED = false`, repoint `/truck`
