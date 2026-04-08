# STUDIO404 Website Review Fixes — Apr 8, 2026

> **Context:** André did a full page-by-page walkthrough of the live site (localhost:3000) and identified these issues. All items below are confirmed by the user and ready to implement.

---

## Prerequisites

Before starting, run `npm run dev` and open http://localhost:3000 to verify each fix visually.

---

## 1. Homepage — Rewrite "Inside Studio 404" Block

**File:** `components/pages/sections/InsideStudio.tsx`

**Problem:** The copy in the Inside Studio 404 section sounds AI-generated — too polished, too many buzzwords.

**Fix:** Rewrite the text to sound natural and human. Read the current copy, then rewrite in André's voice — direct, warm, confident. Keep it concise. Don't use words like "meticulously," "curated experience," "elevate," "unleash," etc.

---

## 2. Homepage — Speed Up Client Reviews Marquee

**File:** `components/pages/sections/Testimonials.tsx`

**Problem:** The testimonials ticker/marquee scrolls too slowly.

**Fix:** Find the `animate-marquee` CSS animation or the `animationDuration` value and reduce it. The current animation is defined in the CSS (likely `globals.css` or a Tailwind `@keyframes` block). Try cutting the duration roughly in half — e.g., if it's 40s, try 20s. Verify it still feels smooth and readable.

---

## 3. Homepage — Close Gap Between "What's Included" and "Common Questions"

**File:** Likely `components/pages/HomePage.tsx` or the section components rendered within it.

**Problem:** There's an excessively large vertical gap between the "What's Included" section and the "Common Questions" (FAQ) section on the homepage.

**Fix:** Inspect the padding/margin between these two sections and reduce it. Look for `py-24`, `py-32`, `mb-24`, or similar Tailwind spacing classes on the parent sections and tighten them.

---

## 4. Rental Page — Remove Bottom "Book Studio" CTA

**File:** `components/pages/RentalPage.tsx`

**Problem:** The bottom of the Rental page has a "Book Studio" CTA button. When users are still exploring, this feels premature. Only the "Tour the Studio" button should remain.

**Fix:** Find the bottom CTA section and remove the "Book Studio" / booking button. Keep only the "Tour the Studio" link/button.

---

## 5. Global — Fix Navbar Auto-Hide on Scroll

**File:** `components/layout/Navigation.tsx` (or wherever the navbar hide/show logic lives)

**Problem:** The menu bar disappears after ~5 seconds of the user not scrolling. This is disorienting — users lose access to navigation.

**Fix:** Change the behavior so the navbar:
- Hides on scroll **down** (to give more screen space)
- Reappears on scroll **up** (so the user can always get back to nav)
- Never auto-hides based on a timer

Look for a `setTimeout` or idle timer in the scroll handler and remove it. Implement a standard scroll-direction-based show/hide pattern instead.

---

## 6. Photoshoot Page — Fix Session Type Click Error

**File:** `components/pages/PhotoshootPage.tsx`

**Problem:** Clicking any session type card (Portrait, Family, Couple, etc.) triggers an error message instead of opening the session detail view.

**Fix:** This is likely a runtime error in the session detail/modal component. Run `npm run dev`, open the browser console, click a session card, and read the error. Common causes:
- A missing Cloudinary image causing a render error
- A state management bug in the selected session logic
- A missing component or import

The session images ARE confirmed uploaded (PORTRAIT-SESSION-01 through PRODUCT-SESSION-01 all return 200 from Cloudinary), so the issue is likely in the component logic, not missing assets.

---

## 7. Tour Page — Remove Emojis and Bold Text in Cyc Wall Section

**File:** `components/pages/TourPage.tsx`

**Problem:** The Cyclorama Experience section on the Tour page uses emojis (📸, 👥, 🎬, ✨) in the use cases grid and the text isn't bold enough.

**Fix:**
- Remove all emoji characters from the Cyc Wall / Cyclorama section
- Replace emojis with either nothing (text-only labels) or minimal Lucide icons
- Make the use case labels bolder — change from `text-cream/80` to `text-cream font-medium` or `font-semibold`

The emojis are around lines 286-294 in the use cases grid (`{ label: 'Facilitates Pro Portraiture', icon: '📸' }`, etc.).

---

## 8. Tour Page — Remove "Next Section" Buttons

**File:** `components/pages/TourPage.tsx`

**Problem:** The Tour page has "Next Section" navigation buttons throughout. Navigation should be done by scrolling or clicking contextual "Learn More" links — not explicit next/prev buttons.

**Fix:** Search for "Next Section" or similar navigation buttons in TourPage.tsx and remove them. Keep any "Learn More" links or "Explore Equipment" / "View Amenities" type buttons — those are contextual and useful. Only remove the generic section-navigation buttons.

---

## 9. Contact Page — Voice Modal Should Open Widget Directly

**File:** `components/ui/VoiceAgentBlock.tsx`

**Problem:** The "Start Conversation" button on the Contact page opens a modal that contains the ElevenLabs widget embed, but the widget doesn't surface properly inside the modal.

**Fix:** Instead of opening a modal, clicking "Start Conversation" should directly trigger/show the ElevenLabs widget that lives at the top of the screen (`components/layout/VoiceWidget.tsx`). Options:
- **Option A:** Dispatch a custom event or use a shared state (context/zustand) so clicking the button tells the VoiceWidget to become visible and start
- **Option B:** Scroll to top and programmatically show the widget
- Remove the modal entirely from VoiceAgentBlock — the button should be the only UI, and it triggers the top-of-page widget

The top-of-page widget is in `components/layout/VoiceWidget.tsx` and uses `isVisible` state with a toggle button.

---

## 10. Policies Page — Update Studio Assistance Text

**File:** `components/pages/PoliciesPage.tsx`

**Problem:** The Studio Assistance section text doesn't accurately describe the service.

**Fix:** Find the Studio Assistance / Studio Assistant block and replace the body text with exactly:

> "A site manager will be present to introduce the space and answer basic questions. Fulfill basic needs. If dedicated support and assistance are required throughout the session, please contact us ahead of time."

Search for "Studio Assist" or "assistant" in PoliciesPage.tsx to find the exact location.

---

## 11. Config — Set Up GA4 Measurement ID

**User action required — not a code fix.**

1. Create a GA4 property at https://analytics.google.com
2. Get the Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Also review `app/booking-confirmation/BookingConfirmationContent.tsx` — it fires a `purchase` GA event with a hardcoded `value: 100.00`. Update to use real booking values or remove if not needed yet.

---

## Verification

After all fixes, run through this checklist:

- [x] `npm run build` — zero errors
- [x] Homepage: Inside Studio block reads naturally
- [x] Homepage: Testimonials marquee scrolls at a comfortable reading pace
- [x] Homepage: No excessive gap between What's Included and FAQ
- [x] Rental page: Bottom only shows "Tour the Studio," no "Book Studio"
- [x] Navbar: Hides on scroll down, shows on scroll up, reappears after 4s idle
- [x] Photoshoot: All 10 session types clickable without errors
- [x] Tour: No emojis in Cyc Wall section, text is bold
- [x] Tour: No "Next Section" buttons anywhere
- [x] Contact: "Start Conversation" opens the ElevenLabs widget directly
- [x] Policies: Studio Assistance text matches the new copy exactly
- [ ] All pages: Navigation works, booking modal works, forms submit (visual verification pending)

---

## Already Completed (This Session)

For context, these were already fixed and committed before this plan was created:

- ✅ Next.js upgraded 14.2.18 → 14.2.35 (13 CVEs closed)
- ✅ All 11 pages converted to server components with per-page SEO metadata
- ✅ BookingProvider wrapper + client component extraction
- ✅ JSON-LD structured data (LocalBusiness + BreadcrumbList)
- ✅ sitemap.ts, robots.txt, error.tsx, not-found.tsx
- ✅ ElevenLabs agent ID moved to env var
- ✅ picsum.photos removed from next.config.js
- ✅ Gallery fake brands replaced with generic community labels
- ✅ Deposit policy updated to 30% at booking, remainder 3 days prior
- ✅ All emails standardized to andre@thestudio404.ca
- ✅ OG image added (Cyc Wall hero, 1200×630 via Cloudinary)
- ✅ Policies page contact form wired up to /api/contact
- ✅ @next/third-parties pinned to v14
- ✅ GHL webhook URL configured and tested
- ✅ All 10 photoshoot session images confirmed in Cloudinary
