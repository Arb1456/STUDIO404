# Website Forms → GHL: Hook-Up and Notification Plan

**Priority: HIGH.** Not started. Do this before (or right after) the holiday pages go live.
**Goal:** every form on the site lands in GHL as a contact, is tagged by where it came from, and André gets notified within a minute.

## How forms work today

Every form posts JSON to the site's own route `app/api/contact/route.ts`, which forwards it to **one GHL inbound webhook** (`GHL_WEBHOOK_URL`, in `.env.local` and Vercel env).

Payload sent to GHL:

```json
{ "name": "", "email": "", "subject": "", "message": "", "source": "", "timestamp": "" }
```

The route needs `name`, `email` and `message`. If the webhook URL is missing or GHL returns an error, the visitor sees "Something went wrong".

## Form inventory

| # | Form | Page | `subject` | `source` | Extra data (currently folded into `message`) |
|---|---|---|---|---|---|
| 1 | Contact page form | `/contact` | visitor's choice / General Inquiry | Contact Page | none |
| 2 | Homepage contact section | `/` | (form value) | Homepage Contact Section | none |
| 3 | "Have questions?" | `/photoshoot` | (form value) | Photoshoot Page — Have Questions Form | none |
| 4 | Policy question | `/policies` | Policy Question | Policies Page | none |
| 5 | **Holiday Minis waitlist** | `/holiday-minis` | Holiday Minis Waitlist | Holiday Minis Page — Waitlist | **Preferred days / times** (new text box) |
| 6 | Christmas inquiry | `/holiday-minis` | Christmas at Studio 404 — Inquiry | Holiday Minis Page — Christmas at Studio 404 | phone |
| 7 | Christmas inquiry | `/holiday-session` | Christmas at Studio 404 — Inquiry | Full Holiday Session Page — Christmas at Studio 404 | phone |

Not forms, no work needed: the truck page's "Email André" buttons (`mailto:` with a pre-filled template), and the GHL calendar iframes (bookings go straight into GHL).

## Steps

### 1. Confirm the pipe works end to end
- [ ] Check that `GHL_WEBHOOK_URL` is set in **Vercel Production and Preview** env, not only `.env.local`.
- [ ] In GHL, open the workflow whose trigger is that **Inbound Webhook**. Confirm it's **published**, and that the trigger has a sample payload with the fields above (re-send one if the mapping is stale).
- [ ] Send one test from each of the 7 forms on a Vercel preview deploy. For each, record: contact created? fields mapped? notification arrived?

### 2. Map fields in the workflow
- [ ] **Create/Update Contact:** name → full name, email → email.
- [ ] Save `message`, `subject` and `source` to the contact (custom fields or a contact note), so the submission is visible on the contact record.
- [ ] **Tags by `source`** (If/Else on source contains…): `web-contact`, `web-photoshoot-question`, `web-policy-question`, `holiday-waitlist`, `holiday-inquiry`. The waitlist tag gives you a ready list to message when a mini spot opens.

### 3. Notify André
- [ ] **Internal notification:** SMS and/or GHL mobile-app push to André, with subject, source, name, email and the first part of the message. Prefer SMS or app over email until the GHL email deliverability issue (SMTP credential error, stalled warmup) is fixed, or notifications may land in spam.
- [ ] Optional: an auto-reply to the visitor ("Got it, we'll get back to you within X hours"). Only after email deliverability is fixed.

### 4. Optional code improvements (small, do with step 1)
- [ ] Send `phone` and `availability` as **separate payload fields** instead of folding them into `message`, so GHL can map phone onto the contact. The API route would accept and forward them (keep `message` required).
- [ ] The waitlist form sends `availability` as `Preferred days / times: …` at the top of `message`, so it's readable in GHL even before this change.

### 5. Verify
- [ ] All 7 forms: contact in GHL, correct tag, notification on André's phone within a minute.
- [ ] Error path: temporarily point the webhook at a bad URL on a preview deploy and confirm the visitor sees the error message (not a fake success).

## Related open items (not forms)
- **Full Holiday Session calendar duration → 1.5 hours (90 min).** It currently shows 30 min. When editing via the API, always re-send `slotDuration` **and** `slotInterval`; a PUT that omits them resets both to 30 min.
- **Google Business Profile phone** shows (250) 407-3530. Change it to **343-314-4140** (the GHL number, which the site already uses) so the name, address and phone match everywhere for local SEO.
