# M2 — Semantic HTML and base CSS

Completed 9 October 2026. HTML/CSS layout milestone only; JavaScript milestones remain unfinished.

## Page map
- index.html: discovery, recommended events, filters, event cards, About/contact.
- my-events.html: saved-event empty state and planning statistics layout.
- organizers.html: organizer profiles for students.
- organizer.html: administration listings table, attendee preview, create/edit/delete popovers.
- login.html: student account layout.
- organizer-login.html: administration account layout.
- settings.html: weekly time target, duration units, JSON import/export layout.

## Checks completed
- All seven pages checked in the browser at 360, 768, and 1024 CSS pixels: no page-wide horizontal overflow.
- Administration table scrolls within its own region on small screens.
- Every input/select/textarea has a bound label; no duplicate IDs; one main landmark per page.
- Skip link moves focus to main.
- Create popover opens with Enter and closes with Escape; mobile width 328px at a 360px viewport, with internal vertical scrolling.
- Visible focus remains 1px as requested. Navy/red palette, reduced-motion support, and CSS transitions retained.
- Required section layouts present: About, dashboard/stats, records, add/edit, Settings.

## Limits and next milestone
Controls that need data changes remain disabled. Figures, start times, attendee names, and charts are sample content. Popovers are native HTML and do not implement authentication or secure role enforcement. Full assistive-technology and contrast audit remains part of M7.

Next: M3, build validators.js together, implement four field regex rules plus an advanced pattern, connect inline error messages, and create tests.html.
