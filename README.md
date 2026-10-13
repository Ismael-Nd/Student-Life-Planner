# Campus Life Planner

Campus Life Planner helps students find campus events without searching through emails. Students can browse events and organizer profiles, while administrators have a workspace for managing event listings.

Built with HTML, CSS, and vanilla JavaScript for the **Campus Life Planner** theme of the Building Responsive UI assignment.

## Links

- [Repository](https://github.com/Ismael-Nd/Student-Life-Planner)
- GitHub Pages: deployment pending. Expected URL: https://ismael-nd.github.io/Student-Life-Planner/
- Demo video: coming soon.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Event discovery, recommendations, and About |
| `my-events.html` | Saved events and planning overview |
| `organizers.html` | Organizer profiles |
| `organizer.html` | Administration dashboard and event forms |
| `login.html` | Student login |
| `organizer-login.html` | Organizer login |
| `settings.html` | Time target, duration units, and data backup controls |

## Features

- Nine sample campus events with posters, categories, dates, durations, and venues.
- Recommended-event carousel layout.
- Category, entry, and sort dropdowns with a reset control.
- Compact administration table with RSVP counts and icon actions.
- Pop-ups for creating and editing events, viewing attendees, and confirming deletion.
- Separate student and organizer login forms.
- Planning dashboard layout with duration totals, top category, weekly target, and seven-day chart.
- Create-form validation for title, duration, category, and date.
- Repeated-word detection and automatic collapse of repeated title spaces.
- Inline error messages and focus on the first invalid field during submission.
- Responsive layouts at mobile, tablet, and desktop sizes.

## Current status

M2 HTML/CSS layouts are complete. M3 form validation is in progress.

The create form validates its title, duration, category, and date fields. Event saving is not connected. Event listings, RSVP counts, attendee names, and the chart use sample data.

Search, filtering, sorting, bookmarks, calculated statistics, time conversions, localStorage integration, and JSON import/export are still in development. Login and Logout are navigation previews without authentication. The dedicated `tests.html` page and final `seed.json` are not yet included.

Only the administration interface contains event creation controls. A production version needs backend authentication, permission checks, and shared storage. localStorage works within one browser and origin; it does not share data between different users' devices. External registration links alone cannot provide RSVP counts or attendee lists.

## Run locally

1. Clone or download the repository.
2. Open the folder in VS Code.
3. Start Live Server on `index.html`.
4. Open `organizer.html` to try the create form.

Use a local HTTP server because the JavaScript uses ES modules. No framework, build step, or API key is required.

## Project structure

```text
styles/
  main.css             Shared styling and student layouts
  organizer.css        Administration and login layouts
scripts/
  validators.js        Field validation rules
  form-validation.js   Create-form validation and feedback
  events-data.js       Sample event data
  bookmarks.js         Bookmark storage helper
  student-ui.js        UI module
assets/                Event posters, textures, and icon license
docs/                  Specifications, milestone reviews, and references
```

The bookmark storage helper and UI module are not currently connected to the page layouts.

## Validation rules

| Field / purpose | Regex | Examples |
| --- | --- | --- |
| Title | `/^\S(?:.*\S)?$/` | `Campus Fair` passes; an empty title or ` Campus Fair` fails |
| Duration | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | `90` and `45.50` pass; `012.92`, `100.943`, and `90abc` fail |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | `Campus Life` and `Student-Life` pass; `Sports2` and double spaces fail |
| Date format | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | `2026-10-13` passes; `2026-13-13` fails |
| Duplicate words | `/\b(\w+)\s+\1\b/i` | Detects `Campus campus` and `Join the the workshop` |
| Repeated spaces | `/ {2,}/g` | Replaces runs of spaces with one space |

The duplicate-word rule uses a **back-reference** (`\1`) to match the captured word again. Matching is case-insensitive.

Date validation also checks calendar components, so dates such as `2026-02-30` are rejected. Title spaces collapse when the field loses focus and when the form is submitted.

## Keyboard controls

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move between enabled links, buttons, and fields |
| Enter | Follow a link or activate a button |
| Space | Activate a button |
| Arrow keys | Navigate native dropdown options |
| Escape | Close an event pop-up |

The first focusable link skips to the main content. Submitting invalid fields moves focus to the first invalid field. The administration table has a focusable horizontal scroll region on narrow screens.

## Accessibility

- Semantic landmarks and headings.
- Labels linked to form inputs.
- Accessible names for icon-only buttons.
- Error and help text connected through `aria-describedby`.
- `aria-invalid` identifies invalid fields.
- Polite live regions announce errors; form feedback uses `role="status"`.
- Visible focus outlines and reduced-motion styling.
- Decorative images and icons are excluded from screen-reader output.

All seven pages were checked at 360px, 768px, and 1024px for page overflow. Field labels, duplicate IDs, skip-link focus, and pop-up keyboard controls were also checked. A full contrast and screen-reader audit is planned for M7.

## Testing

Manual checks are available in the Create event form on `organizer.html`:

1. Enter `90abc` as duration, then change it to `90`. The error appears and clears.
2. Enter ` Campus Fair` as title. An edge-space error appears.
3. Enter `Campus campus Fair`. A repeated-word error appears.
4. Enter `Campus  Fair` and leave the field. It becomes `Campus Fair`.
5. Enter `Sports2` as category, then change it to `Campus Life`. The error appears and clears.
6. Clear the date and leave the field, then select a valid date. The error appears and clears.
7. Submit invalid fields. Errors appear and the first invalid field receives focus.
8. Submit valid title, duration, category, and date values. A validation confirmation appears; no event is saved.

Automated assertions in `tests.html` are planned for M3, including leap-year and impossible-date cases.

## Milestones

| Milestone | Weight | Status |
| --- | --- | --- |
| M1 — Specification & Wireframes | 10% | Specification and design planning established |
| M2 — Semantic HTML & Base CSS | 10% | Complete |
| M3 — Forms & Regex Validation | 15% | Complete |
| M4 — Rendering, Sorting & Regex Search | 20% | Pending |
| M5 — Statistics & Targets | 15% | Layouts ready; calculations pending |
| M6 — Persistence, Import/Export & Settings | 15% | Layouts ready; integration pending |
| M7 — Polish & Accessibility Audit | 15% | Pending |

## Credits

- Validation patterns adapted from the assignment's starter examples.
- [ALU](https://www.alueducation.com/) for colour and branding inspiration.
- [Luma](https://luma.com/) for event-discovery layout inspiration.
- [Hugeicons](https://github.com/hugeicons/hugeicons) free SVG icons for administration actions. MIT license included in `assets/hugeicons-LICENSE.txt`.
- Montserrat from Google Fonts.

## Contact

Ismail — n.ismael@alustudent.com

## Submission requirements remaining

- Complete the required functionality and assertion tests.
- Include `seed.json` with at least ten diverse records.
- Deploy to GitHub Pages and confirm public access.
- Include a 2–3 minute demo video.
- Confirm that the repository has only the author's GitHub account in its contribution history.
