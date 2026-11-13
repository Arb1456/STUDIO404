# GHL Notification Workflows: Review Brief

**Built:** 2026-11-12, in the GHL UI through Claude in Chrome. **Status:** all published.
**Purpose:** André never misses a booking, an upcoming session, a cancellation, a form fill-out, or a payment.
**For the next session:** review each workflow below in depth, run the test plan, and fix anything marked ⚠️.

Location: Studio 404 sub-account, `cDtp2a3Mcml7dTHdhndk`. Workflow URLs follow the pattern
`https://app.gohighlevel.com/v2/location/cDtp2a3Mcml7dTHdhndk/automation/workflow/<id>`

---

## Who receives what

| Recipient | How it's set in GHL | Gets |
|---|---|---|
| **André (cell on his GHL user profile, +1 250 407 …)** | Internal notification → "Particular User" → Andre Beaudin | All SMS alerts, plus all "Email: …" alerts (to his GHL user email) |
| **613-581-1134** | Internal notification → "Custom Number" → `+16135811134` | All SMS alerts: a duplicate step named "… (613 number)" after each André SMS |
| **All users (André + Andy Elahmar)** | Contact Form workflow's existing email only | Website form emails |

> Each SMS is a *separate step per recipient*. If you change a message, update **both** copies (André + 613).

---

## 1. Andre Alerts: New Bookings + Reminders
**ID:** `be08cef9-eeb0-477e-9ad4-9608cfd025bb` · **Created new**

**Trigger:** Customer Booked Appointment, no filters, so **all 24 calendars** (session, rental, Holiday Mini, Full Holiday, plus the personal calendars). Enrolls the contact only.

**Steps:**
1. **SMS: New Booking** → André
   `NEW BOOKING: {{calendar.name}} | When: {{appointment.start_time}} | Client: {{contact.name}} | {{contact.phone}} | {{contact.email}}`
2. **SMS: New Booking (613 number)** → +16135811134 (same text)
3. **Email: New Booking** → André. Subject `New booking: {{calendar.name}} on {{appointment.start_time}} ({{contact.name}})`. Body: session, when, client, phone, email, `{{appointment.title}}`, contact link `…/contacts/detail/{{contact.id}}`
4. **Wait: 1 day before session.** Wait until the scheduled appointment from the trigger, 1 day before. If already passed: *skip outbound communication until the next wait* (default), so bookings made less than 24h ahead skip the "tomorrow" text.
5. **SMS: Tomorrow reminder** → André: `TOMORROW: {{calendar.name}} at {{appointment.start_time}} with {{contact.name}} | {{contact.phone}}`
6. **SMS: Tomorrow reminder (613 number)** → +16135811134
7. **Wait: 2 hours before session** (same "if passed" rule)
8. **SMS: 2-hour reminder** → André: `IN 2 HOURS: …` (same fields)
9. **SMS: 2-hour reminder (613 number)** → +16135811134

**Settings:** Allow re-entry ON, allow multiple opportunities ON (defaults). Appointment triggers re-enroll for each booking.

**Review:**
- ⚠️ **Not yet tested with a real booking.** Make one test booking on any calendar with your own contact, then confirm the texts and email arrive and every field fills in.
- Check how `{{appointment.start_time}}` renders: format and timezone (location is America/Toronto).
- The personal calendars ("Andre Beaudin's Personal Calendar", "GHL Agent's Personal Calendar") also trigger this. Add a trigger filter if that's noisy.
- **Rental calendars already email the assigned user** through calendar-level notifications, so rental bookings may produce two emails. Decide whether to turn off the calendar-level ones in Calendars → settings → Notifications (avoid doing it via API `PUT /calendars/{id}`, which resets slot durations).
- Check what happens to waiting reminders when a booking is **rescheduled** (not covered; see Gaps).

## 2. Andre Alerts: Cancellations
**ID:** `214ea89b-a76f-4994-ae18-f8d4e120b0cf` · **Created new**

**Trigger:** Appointment Status. Filters: Event type = Normal, **Appointment status is = cancelled**.

**Steps:**
1. **SMS: Cancellation** → André: `CANCELLED: {{calendar.name}} on {{appointment.start_time}} | {{contact.name}} | {{contact.phone}} | {{contact.email}}`
2. **SMS: Cancellation (613 number)** → +16135811134
3. **Email: Cancellation** → André. Subject `CANCELLED: {{calendar.name}} on {{appointment.start_time}} ({{contact.name}})`. Body: slot is open, session, original time, client details, contact link, and a reminder: *"Holiday Mini? Add 1 back to that day's spotsLeft in lib/holiday.ts"*
4. **Remove from Workflow** → "Andre Alerts: New Bookings + Reminders" (stops the reminders for the cancelled session)

**Review:**
- ⚠️ The remove step is **per contact, not per appointment**. A client with two upcoming bookings who cancels one loses reminders for both. Rare; consider an If/Else on appointment ID or accept it.
- Confirm that cancellations made by André in the GHL calendar (not only by the client) also fire this trigger.

## 3. Andre Alerts: GHL Form Submissions
**ID:** `f6b24055-2dfe-43d4-91b0-30a49f3cde11` · **Created new**

**Trigger:** Form Submitted, no filters, so all GHL-hosted forms: *Holiday Form* (`OilZNoyPhijXrjeYs1IY`), *Form 2*, *Contact Us* (`8NIye6C7fhT4uwtFlTA2`), *Studio Booking Intake* (`sZYcO8FQNYNyD9wFPTH8`). **Does not cover the website's own forms** (those use the inbound webhook, workflow 5).

**Steps:**
1. **SMS: Form submitted** → André: `GHL FORM SUBMITTED: {{contact.name}} | {{contact.phone}} | {{contact.email}}. Answers are on their contact in GHL.`
2. **SMS: Form submitted (613 number)** → +16135811134
3. **Email: Form submitted** → André. Name, phone, email, and a link to the contact.

**Review:**
- `{{form.name}}` and `{{submission.*}}` are **not valid** in this editor, so alerts don't say *which* form was filled out. Options: one workflow per form, or If/Else branches on the trigger's form filter, so each branch names its form.
- Consider adding the Facebook / TikTok lead-form triggers if Meta lead ads get used.
- ⚠️ Not yet tested. Submit a GHL form once to verify.

## 4. Invoice Paid (existing, modified)
**ID:** `3e988fff-0ff1-417d-9130-09151eaebea9`

**Trigger:** Invoice, status = Paid. **Existing step:** Add Tag (unchanged).
**Added:**
- **SMS: Invoice paid** → André: `PAID: ${{invoice.amount_paid}} from {{contact.name}} | {{invoice.name}} #{{invoice.number}}`
- **SMS: Invoice paid (613 number)** → +16135811134

**Review:**
- Does a **calendar booking deposit** (Stripe payment through the booking widget, e.g. the $50 mini deposit) create an "invoice paid" event, or only invoices sent from GHL? If not, add a "Payment Received" / order trigger.
- ⚠️ Not yet tested.

## 5. Contact Form (existing, website forms, modified)
**ID:** `2c22fc33-d65c-4aa0-aa3d-40852640f722` · `docs/plans/2026-11-12-website-forms-ghl-plan.md` has the details.

**Trigger:** Inbound Webhook (`GHL_WEBHOOK_URL`, posted by `app/api/contact/route.ts` for all 7 site forms).
**Steps:** Create Contact → Add Tag `from contact form` → **Email info** (Add Note: name, email, subject, message, page) → **Internal Notification** (email to *all users*) → **SMS Alert to Andre** → **SMS Alert (613 number)**.

**Changes made on 2026-11-12:**
- Notification email *From* was `{{contact.name}}` / `{{contact.email}}` (spoofed the visitor, which hurts deliverability). It now uses **GHL's default sender**.
- Subject: `Website form: {{inboundWebhookRequest.subject}} from {{contact.name}}`. Body and note now include `Page: {{inboundWebhookRequest.source}}`.
- Added both SMS steps.

**Verified:** three live tests on 2026-11-12. Every step executed, including the 613 SMS (19:00). Test contact "Website Form Test" (andre+formtest@thestudio404.ca) can be deleted.

---

## Other workflows seen (not changed)
- **Booking Confirmation & Contract Flow** `149ffca6-…`, published, **client-facing** (appointment status update, tag, "Client Booked Online" payment step, email, wait…). Deliberately untouched.
- **Contact Form Submitted** `cd193ac2-…`, published, old inbound-webhook workflow, **no executions in 60 days**. Candidate for deletion after confirming nothing posts to its webhook.
- Drafts: a second "Contact Form", Agreement Reminder, Booking Concluded, Payment Reminders, Pipeline Stage Automation, etc.

## Gaps / ideas for the review session
1. **Reschedules:** no alert yet. Check whether the Appointment Status trigger or a "rescheduled" event exists, and whether reminders follow the new time.
2. **No-shows:** an Appointment Status = no-show alert, and perhaps a rebook nudge.
3. **Daily agenda:** a morning text listing today's sessions (GHL has no native digest; would need a scheduled workflow or a small script using the calendar events API).
4. **Which form** in GHL form alerts (see workflow 3).
5. **Email deliverability:** internal emails go to André's own inbox through GHL's default sender. Watch for spam until the SMTP/warm-up issue (memory: `ghl_email_deliverability`) is fixed. SMS is the reliable channel.
6. **SMS cost/limits:** every event now sends 2 SMS (André + 613). Check the LC Phone balance and the A2P registration status for internal texts.

## Test plan
| # | Action | Expect |
|---|---|---|
| 1 | Book any calendar as yourself | 2 SMS + 1 email "NEW BOOKING" |
| 2 | Book something ~25h out, leave it | "TOMORROW" SMS ×2 around 24h before, "IN 2 HOURS" ×2 |
| 3 | Cancel the test booking | 2 SMS + 1 email "CANCELLED", no further reminders |
| 4 | Submit a GHL form (e.g. Contact Us) | 2 SMS + 1 email "GHL FORM SUBMITTED" |
| 5 | Submit a website form | 2 SMS + email to all users (already verified) |
| 6 | Mark a test invoice paid | 2 SMS "PAID" |

Check each run in the workflow's **Execution logs** tab.

## GHL editor tips (learned the hard way)
- Typing `{{field}}` into an editor turns it into a **blue chip if valid, red if invalid**: a quick way to check field names.
- Valid: `{{calendar.name}}`, `{{appointment.start_time}}`, `{{appointment.title}}`, `{{contact.name|phone|email|id}}`, `{{invoice.amount_paid|name|number}}`, `{{inboundWebhookRequest.subject|message|source}}`.
- Invalid: `{{appointment.calendar_name}}`, `{{form.name}}`, `{{submission.form_name}}`, `{{invoice.total}}`.
- Step menu (⋯) → **Copy action** → ⋯ → **Paste below** duplicates a step with its message.
- The email notification needs both *From Name* and *From Email*, or neither (GHL rejects a name without an email).
- The workflow API can list workflows but can't read or edit steps, so all changes are made in the UI.

---

## Review pass: 2026-11-12 (evening)

Checked in the GHL UI (trigger, settings, step contents):
- **1. New Bookings + Reminders:** trigger, recipients, SMS/email merge fields (all valid chips), both waits ("before" 1 day / 2 h, appointment from trigger, "skip outbound until next wait" if passed). Settings: re-entry ON, stop-on-response OFF, account timezone. **0 enrollments so far.**
- **2. Cancellations:** trigger (Normal + cancelled), SMS fields valid, Remove-from-workflow targets workflow 1. **0 enrollments.**
- **4. Invoice Paid:** steps in place. It fires often (10+ paid invoices Nov 3–12), but all of those ran before the SMS steps were added, so the next real payment is the first live test. Note that a second published workflow, **"Invoice Paid (Tag Tracker)"** `8230749b-…`, also exists. Check for overlap.
- Not re-opened this pass: 3 (GHL Form Submissions), 5 (Contact Form; already verified live).

## Missed Call Text Back: limited to 1 per contact per week

- Previously: built-in **Settings → Phone System → Voice → Voicemail & Missed Call TextBack** was ON (default GHL text). It has no frequency cap.
- New workflow **"Missed Call Text Back (max 1 per week)"** `c75275a0-6ebc-4ad8-bc3b-b89919d7d24a`:
  Trigger *Call details*: direction = Incoming, status any of busy / canceled / no-answer / voicemail → **Send SMS** (same text as the built-in: `Hi this is {{location.name}}, I saw that we just missed your call how can I help?`) → **Wait 7 days**.
  How the cap works: GHL skips a contact who triggers a workflow they're still enrolled in, so repeat calls during the 7-day wait don't re-send. Re-entry ON lets them get it again after the week. **Keep "Stop on response" OFF**, or a reply would end the wait early.
- ⚠️ **Status: saved as DRAFT.** Still to do, in this order:
  1. Publish the workflow.
  2. Untick *Enable Missed call textback* in the Phone System setting above (otherwise callers get two texts).
  3. Test: call 343-314-4140 from a phone that isn't in the team, don't answer → 1 text. Call again → no text. Check Enrollment history.
