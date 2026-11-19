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

## Holiday season booking setup (2026-11-12, late evening)

Missed call text back: André chose to keep the built-in one (after every call). The draft weekly-cap workflow was repurposed (see below).

**Done and PUBLISHED:**
- **Holiday Mini: Client Confirmation + Invoice Reminder** `c75275a0-6ebc-4ad8-bc3b-b89919d7d24a`. Trigger: booked, In calendar = Holiday Mini Session. Client email "Your Holiday Mini Session Is Booked!" (date/time, address, $50 deposit received, balance invoice ~1 week before, 14-day refund, call/text 343-314-4140) → Wait until 7 days before appointment (if passed: continue) → SMS "SEND MINI INVOICE…" (people, pet, balance formula) to André + 613.
- **Photo Sessions: Client Confirmation + Invoice Reminder** `9e802984-8a7f-4983-b2d4-cf2e2bff81ab`. 11 triggers (Family, Couple, Maternity, Portrait, Boudoir, Product, Headshots, Full Holiday, Group, Birthday, Newborn). Session email → same wait → SMS "SEND SESSION INVOICE…" (attendees, project scope) to André + 613.

**Also done (2026-11-12, later):**
- **Booking Confirmation & Contract Flow** `149ffca6…` (advanced builder) is now **rentals only**. The 2 catch-all triggers were replaced by 20: "Booked: Studio Rental - N Hour" + "Status new: Studio Rental - N Hour" (N = 1..10). Saved, reloaded and checked that all 20 connect to "Update appointment status". The opportunity name is now `{{contact.name}} - {{calendar.name}}` (was invalid firstName/lastName).
- **Andre Alerts: Rental Invoice Now** `2bfc2552-e913-4bdb-8921-794b58193149`, published: 10 rental triggers → SMS "SEND RENTAL INVOICE NOW: {{calendar.name}} for {{contact.name}} | time | People | Project | phone email" to André + 613.
- **Cancellations** now also removes the contact from the Holiday Mini and Photo Sessions workflows (no invoice reminder after a cancel).
- **GHL Form Submissions** trigger is now limited to Contact Us + Form 2. Booking-widget forms (Holiday Form, Studio Booking Intake) no longer double-alert.
- **New Bookings + Reminders** email now lists form answers (people, pet, attendees, project details).
- First live run confirmed: a booking at 8:55 pm on Nov 12 fired the SMS (André), SMS (613) and email.

**Still open:**
- Test-book a Holiday Mini and a photo session (check the client email, and the invoice text if the session is under 7 days out).
- Advanced-builder gotchas: trigger panels save immediately; clicking an edge's icon can **delete** the edge (undo with the top-left arrow); right-click canvas → Format tidies overlapping nodes.
- Opportunity value is still $0 (pipelines deferred to after the season).

---

## In-depth review: 2026-11-17 (evening)

Method: execution logs filtered to "All failed" (URL `…/logs?eventType=all_failed`, filter verified with "Skipped"), enrollment histories, and the payments/invoices/calendar-events APIs.

**Working**
- 0 failed steps in 60 days across: New Bookings + Reminders, Cancellations, GHL Form Submissions, Rental Invoice Now, Booking Confirmation & Contract Flow, Contact Form, Holiday Mini confirmation, Holiday Mini day-before, Invoice Paid.
- New-booking SMS x2 + email fired for every client self-booking (Stephanie Blais Nov 17 7:30 pm, Rose, Michelle, Rebecca, Fatou, Emilia).
- Payment-failed ("invalid") bookings do NOT alert (Michelle's and André's invalid attempts never enrolled). Good.
- Invoice Paid SMS x2 fired for real invoices (Gabriella, Gokeh, Nov 17).

**Gaps found**
1. Calendar deposits are payment *orders*, not invoices, so "Invoice Paid" never texts for the $50 mini or rental booking deposits. Low impact: the booking alert only fires after the deposit succeeds.
2. Bookings created by hand in GHL never enter "New Bookings + Reminders" (trigger = Customer Booked Appointment only) or the Photo Sessions client flow: Jennifer Pierre (Full Holiday, Dec 2 3:15 pm, status still `new`, invoice partially paid $84.75/$282.50, no client confirmation or day-before email), Kheyi Isichei (rental Dec 13 4 pm).
3. Bookings made before the alert workflow went live (Nov 12 evening) have no André reminders: Gabriella Izzo Nov 18 4:30 pm, Kyle Ellis Nov 21 12:30, Gokeh Annor Nov 28 3:30 + Dec 19 1 pm, Amira Coulibaly Nov 28 6 pm, Miko Gloriani Dec 4 5 pm, Genya Webster Dec 12 10:30.
4. Kheyi: rental flow ran end to end in 3 minutes on Nov 17 (contracts, pre-booking email, DOOR-CODE SMS) because its appointment wait resolved to a past time (2026-11-17T15:00Z, apparently the appointment's first time before it was moved to Dec 13). Flow then "Removed by Appointment Change" at 3:36 pm, so nothing else goes out before Dec 13.
5. Cancellation email still says to update `spotsLeft` in lib/holiday.ts; counts are live from GHL now, so that line is obsolete.
6. Photo Sessions: Client Confirmation + Invoice Reminder has 0 enrollments ever (no online photo-session booking since Nov 12). Untested, not broken.
7. Still untested from the original brief: GHL form alert, reschedule behaviour.

**Fixed 2026-11-17 (André approved A, B, C)**
- A: "Andre Alerts: New Bookings + Reminders" got 2 more triggers (Appointment status, Event type Normal, status = new): "Made by hand: Rentals (status new)" (group Studio 404 Booking Center) and "Made by hand: Photoshoots + Minis (status new)" (group Studio Photoshoots). All calendars autoConfirm, so online bookings arrive as confirmed and don't double-fire. Personal calendars are in no group, so they're excluded. Caveat: a hand-made booking saved with the wrong time and then moved still computes its waits from the first time (the Kheyi problem). Not covered: bookings made before Nov 12 evening (list in gap 3).
- B: Google Calendar reminders (André's primary): Jennifer confirmation Nov 18 10 am, Jennifer day-before Dec 1 10 am, Kheyi door code + parking Dec 12 10 am.
- C: Cancellation email: removed the obsolete "add 1 back to spotsLeft in lib/holiday.ts" line.

**Reschedule test 2026-11-17 (evening)**
- Hand-made bookings default to status **Confirmed** (Book appointment dialog) and the date defaults to today. The "status new" triggers alone missed them.
- Fix: 4 "Made by hand" triggers on New Bookings + Reminders: {new, confirmed} x {Studio 404 Booking Center, Studio Photoshoots}, each with "Created by/modified by = User". Verified: a hand-made confirmed Headshots booking enrolled, wait timed to the right day.
- Moving a booking in GHL (drag): old run ends, a new run starts via the "Made by hand (confirmed)" trigger, timed to the NEW time; NEW BOOKING texts/email re-send. Verified.
- Client self-reschedule: not offered (client emails say call/text 343-314-4140; no reschedule link), so all reschedules go through André moving the booking.
- Still open: client-facing flows (Photo Sessions / Holiday Mini confirmations, rental contract flow) do NOT run for hand-made bookings, and a move of an online booking doesn't re-run them either.
- Test bookings "TEST reschedule test (Claude)" + "TEST 2 …" on Headshots, Thu Dec 10 (contact andre beaudin / theorganization250): cancelled Nov 17, reminders ended (verified).

**Client emails for hand-made / moved bookings (2026-11-17, late)**
- New templates: "XMAS26 mini: Booking confirmation (by hand or moved)" 6afd08d85973f95b07e7efc0, "Sessions: Booking confirmation (by hand or moved)" 6afd08da0b0e27b63ab19295 (payment line: "If you've already paid your deposit, you're all set. If not, we'll send you an invoice for it shortly.").
- Holiday Mini calendar moved OUT of the Studio Photoshoots group (now no group; 151 slots still open, settings intact).
- New Bookings alerts: +2 triggers Made by hand: Holiday Mini (new/confirmed, In calendar Holiday Mini, Created by User).
- Holiday Mini day-before ea201b37: +2 same triggers.
- NEW published: "Holiday Mini (by hand or moved): Client Confirmation + Invoice Reminder" 9c466b19 (subject "Your Holiday Mini Session Is Confirmed").
- NEW published: "Photo Sessions (by hand or moved): Client Confirmation + Invoice Reminder" 547a2f56 (triggers: Studio Photoshoots group, new/confirmed, User; subject "Your Studio 404 Session Is Confirmed").
- Cancellations removes from both new workflows too (verified after reload).
- VERIFIED end to end (Nov 17, 9:34 pm): hand-made confirmed Headshots booking -> Photo Sessions (by hand or moved) enrolled, email "Your Studio 404 Session Is Confirmed" arrived with new payment line; cancel ended the run. Test booking cancelled.
- STILL OPEN: rentals decision (moved rental loses door-code text; restarting would re-send contract).

## NEXT SESSION: rentals flow (André approved the direction, build with fresh context)
Problem: a MOVED rental is removed from "Booking Confirmation & Contract Flow" 149ffca6 and never re-enters (loses pre-booking email + door-code SMS). A hand-made rental left at the default status "confirmed" never enters the flow at all (only "Status new: Studio Rental - N Hour" triggers exist).
Plan:
1. New workflow "Rental (by hand or moved): Pre-booking email + door code": triggers = Appointment status {new, confirmed} + Created by/modified by = User + In calendar group = Studio 404 Booking Center. Steps copied from 149ffca6 AFTER the contract step: appointment wait -> Send Pre Booking Email -> Send Pre Booking SMS (door code 4449, lot C, Unit B8b, hand on keypad). NO contract step.
2. Hand-made rentals at "confirmed" get no contract automatically: André sends it from GHL or sets status "new" (which runs 149ffca6 incl. contract). Confirm with André whether 149ffca6's "Status new" triggers should also get Created by = User.
3. Add the new workflow to the Cancellations "Remove from workflow" step.
4. Test: hand-made rental by hand (test contact), check enrollment + timing; drag it; cancel. Use window.confirm=()=>true before cancelling in Chrome.
5. Kheyi (Dec 13) door-code resend reminder stays in Google Calendar (Dec 12 10 am).

**Rentals (by hand or moved) built 2026-11-17 (night), PUBLISHED + tested**
- "Rental (by hand or moved): Pre-booking email + door code" `a6496779-5dde-43aa-8537-474425d417c1`, duplicated from 149ffca6 so the email/SMS content is identical.
- Trigger (1): "Rental made by hand or moved (confirmed)": Appointment status, Event type Normal, status = confirmed, In calendar group = Studio 404 Booking Center, Created by/modified by = User.
- Steps: Wait until 6 h before appointment (if passed: continue) -> Send Pre Booking Email -> Send Pre Booking SMS (door code 4449) -> Wait until 5 min after appointment -> Update appointment status = Showed.
- Removed from the copy: Update status confirmed, appointment-booked tag, Create opportunity, confirmation email, 1-min wait, Send Documents & Contracts.
- Status "new" deliberately NOT a trigger: a hand-made "new" rental already runs 149ffca6 (contract + door code); adding it would double the door code.
- In the advanced builder, "In calendar group" only shows in Add filters when no "In calendar" filter is on the trigger.
- Grace period: a 15-min "Grace period (15 min to fix a wrong date)" wait sits between the 6-h-before wait and Send Pre Booking Email in BOTH a6496779 and 149ffca6. A booking saved at the wrong (today) date and fixed within 15 min sends nothing early: the fix counts as an appointment change and ends the run.
- Cancellations "Remove from workflow" now also lists a6496779 (Photo Sessions (by hand or moved) re-checked, still listed).
- TESTED Nov 17 ~10:25 pm on test contact (Studio Rental - 2 Hour, Confirmed, tonight 10:30 pm): enrolled, 6-h wait passed instantly, held in grace; moved to Dec 15 10 am -> old run "Removed by Appointment Change" with no email/SMS, new run waiting until Dec 15 4:00 am; cancelled -> run finished. 149ffca6 did not enroll it.
- STILL OPEN: a hand-made rental left at Confirmed gets no contract (book at New, or build the "contract sent" tag; needs answer on one contract per rental vs per client).

**One contract per rental (2026-11-18, ~3 am) — built + tested**
- Contact field "Rental Contracts Sent" (`{{contact.rental_contracts_sent}}`, id I6mDNk2vhH8VXPKDSqL6): space-separated appointment IDs that already got a contract.
- a6496779 "Rental (by hand or moved)": If/Else "Contract already sent for this rental?" (field contains {{appointment.id}}). Moved → 6 h wait → door code as before. New rental → 15-min grace → confirmation email (template "Studio 404 Confirmation") → Send Documents & Contracts (Studio Client Agreement, email + SMS) → record ID → Go To the 6 h wait.
- 149ffca6: "Record contract sent for this rental" step right after its contract step.
- Hand bookings: the Book dialog shows only Confirmed / Unconfirmed. "Unconfirmed" = status new → runs 149ffca6. Confirmed → runs a6496779's new-rental branch. Both now send exactly one contract.
- Tested on André's 613 contact: new Confirmed rental (1 contract), move (none), 2nd rental moved inside grace (1 contract, append kept), Unconfirmed rental (149ffca6 only, append kept), cancel (all runs end).
- Real online booking Néhémie Chery (Nov 17 23:42) got her contract before the record step existed; she is in the backfill list.
- PENDING André's OK: backfill IDs for 11 upcoming rentals (Gabriella, Rebecca, Kyle, Néhémie, Gokeh x2, Amira, Fatou, Miko, Genya, Kheyi). Until then, moving one of them would re-send its contract.

### Backfill done (2026-11-18, ~7 PM, André OK'd)
- Wrote each upcoming rental's appointment ID into "Rental Contracts Sent" via `PUT /contacts/{id}` for 10 clients / 11 rentals (Gabriella Izzo, Rebecca Nagrodski, Kyle Ellis, Néhémie Chery, Gokeh Annor x2, Amira Coulibaly, Fatou Kamara, Miko Gloriani, Genya Webster, Kheyi Isichei). All fields were empty before; all PUTs 200; re-read matches exactly.
- Pre-check: every appointment still active and owned by the right contact. Gabriella's (Nov 18 4:30 PM) was already "showed" (set 4:35 PM by the workflow, as designed).
- Post-check: no message sent to any of these contacts after the write (latest ~20 min before), so no workflow reacted to the field change.
- Effect: moving any of these rentals now takes the Moved branch (door code re-timed, no second contract).
