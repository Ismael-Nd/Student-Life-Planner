# Learning roadmap — Campus Life Planner

We are building this together, with HTML/CSS first and small explained JavaScript steps. Do not treat the styled layout as a completed assignment.

## Current stage: M2 (10%) — layout in progress

- Discover dashboard: compact action bar, recommended carousel layout, nine sample event cards.
- Full-width layout: 16px side padding on mobile, 24px on wider screens.
- Separate my-events.html and organizers.html pages; accessible headings and navigation.
- Navy header/footer, red actions, light-grey cards, page-wide fading texture.
- Current carousel, RSVP, bookmark, search, and filter controls are disabled HTML placeholders. JavaScript source from earlier work is retained, but not loaded into the redesigned pages until we learn to wire it correctly.
- Nine demo records exist in scripts/events-data.js. The final seed.json must contain at least TEN diverse records; it is not delivered yet.

## Next lessons, in milestone order

| Milestone | Weight | Work still needed |
|---|---:|---|
| M1 | 10% | Review/update specification and wireframes for the agreed multi-page design |
| M2 | 10% | Finish organiser form, dashboard/stat and settings layouts; check phone/tablet/desktop |
| M3 | 15% | Input values, functions, regex rules, inline errors, valid calendar dates, tests.html |
| M4 | 20% | Arrays and state, DOM rendering, add/edit/delete, date/title/duration sorting, regex compiler and safe highlights |
| M5 | 15% | Count, duration total, top tag, seven-day chart, time budget, polite/assertive live updates |
| M6 | 15% | Auto-save records/settings, validated import/export, minutes/hours conversions, bookmark persistence |
| M7 | 15% | Keyboard and contrast audit, README, 10+ seed records, GitHub Pages, video and contributor check |

Automatic carousel rotation is additional polish, not a required grading feature. Implement it last, with a pause button, arrows/dots, reduced-motion support, and paused rotation while users interact. Event-details dialog is also an optional convenience.

Trending and popularity are sample metrics; the required sorts are date, title, and duration in both directions. These required sorts take priority during M4.

Each JS lesson: explain one concept, write a small part, try it in the browser, then review it together. Keep commits authentic and use the student's Git identity. Do not claim completed tests, accessibility checks, deployment or production registrations until verified.

### Organizer and account layout preview
Added organizer.html with sample listings, RSVP counts, native details/summary attendee previews, and a create/edit form. Added login.html with student and organizer form layouts and explicit dashboard preview links. Logout links return to the login layout; authentication and session clearing are not implemented. Edit links navigate to the form; loading, saving, deletion, and real attendee data remain for later lessons. No JavaScript was added.

Organizer layout now uses a compact event table and native HTML popovers for create, edit, attendees, and delete confirmation. Saves/deletes remain disabled. Sample start times added for display. Student hosting links removed; role enforcement will require later authentication logic.

## M2 completed — 9 October 2026
Required semantic sections and responsive HTML/CSS layouts are present, including Settings and the planning dashboard skeleton. Browser checks at 360/768/1024, field labels, IDs, keyboard skip link, and native event popover verified. See M2-review.md for evidence and limitations. Next milestone is M3 validation; no new JavaScript was introduced.
