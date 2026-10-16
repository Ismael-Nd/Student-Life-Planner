# Learning roadmap — Campus Life Planner

## Current stage: M4 implemented; final browser check next

HTML/CSS layouts, form validation, record rendering, filtering, sorting, regex search, and create/edit/delete are implemented. Final browser verification is next, followed by M5 statistics and targets.

| Milestone | Weight | Status |
| --- | --- | --- |
| M1 — Specification & Wireframes | 10% | Theme, roles, and design planning established; review final specification and sketches |
| M2 — Semantic HTML & Base CSS | 10% | Complete |
| M3 — Forms & Regex Validation | 15% | Implementation complete; run the assertion page before committing |
| M4 — Rendering, Sorting & Regex Search | 20% | Implemented; final Live Server verification pending |
| M5 — Statistics & Targets | 15% | Layout ready; calculations pending |
| M6 — Persistence, Import/Export & Settings | 15% | Layout ready; integration pending |
| M7 — Polish & Accessibility Audit | 15% | Pending |

## M2 — Completed layouts

- Discovery page with recommended events and nine sample cards.
- My Events, organizer profiles, Settings, and separate student/organizer login pages.
- Administration table with RSVP counts, attendee previews, and event-form pop-ups.
- About/contact, navigation, footer, skip links, input labels, and visible focus outlines.
- Mobile-first styling checked at 360px, 768px, and 1024px.

## M3 — Completed validation

- Title, duration, category/tag, and date regex rules.
- Calendar check for impossible dates and leap years.
- Advanced back-reference pattern for consecutive repeated words.
- Repeated title-space cleanup.
- Inline error messages, aria-describedby, aria-invalid, and live status feedback.
- Input/blur and submission checks shared by Create and all three Edit forms.
- tests.html with essential validator assertions. Run it through Live Server and check the console for assertion errors.

Validation does not save an event. The forms currently report whether the four connected fields pass.

## M4 — Implemented

- Records render through DOM methods from a shared data module.
- Category and Free/Paid filters combine with regex search.
- Date, title, and duration sorting work in both directions; sample trending/popularity and creation-date sorts remain available.
- Invalid regex reports an error and preserves previous results; case-insensitive search is optional.
- All non-empty matches in titles, descriptions, tags, and venues use safe mark elements.
- Empty-result and record-count feedback update with filters.
- Administration records create/edit/delete with unique IDs, preserved createdAt, updated timestamps, and delete confirmation.
- A minimal localStorage helper shares changes between the separate pages. Full import/export and settings persistence remain M6.
- tests.html now includes 16 essential validation/search/sorting assertions.

Code-level checks passed for filter combinations, six required sort directions, case/error/reset handling, multiple safe highlights, valid/invalid submissions, create/edit/delete, cross-page reload, and failed storage writes. The automated browser could not reach the local server; final browser checks must be run through Live Server.

Build each part in small steps: explain the concept, add the code, and test the behaviour.

## M5 — Statistics and targets

Calculate record count, duration total, top tag, and the last-seven-days trend. Connect the weekly time target and announce remaining time politely or overage assertively.

## M6 — Persistence and settings

Auto-save records and settings to localStorage. Validate JSON imports before loading, support export, convert minutes/hours, and persist bookmarks. Handle malformed data and unavailable storage.

localStorage is shared only within one browser and origin. Real accounts, shared event data, and administration permissions require a backend.

## M7 — Submission and polish

- Complete keyboard, contrast, and screen-reader checks.
- Add seed.json with at least ten diverse records.
- Update README with working features and test instructions.
- Deploy on GitHub Pages and verify public access.
- Record an accessible 2–3 minute demo video.
- Confirm only the author's GitHub account appears in the contribution history.

## Optional features

Automatic carousel rotation and event-detail dialogs can follow the required features. Carousel rotation needs pause controls and reduced-motion support. Trending/popularity sorts use sample metrics; required date/title/duration sorts take priority.
