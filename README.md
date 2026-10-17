# Campus Life Planner

Campus Life Planner helps students find campus events without searching through emails. Students can browse events, while administrators have a workspace for managing event listings.

Built with HTML, CSS, and vanilla JavaScript for the **Campus Life Planner** theme of the Building Responsive UI assignment.

## Links

- GitHub Pages: URL: https://ismael-nd.github.io/Student-Life-Planner/
- Demo video: [Campus-Planner](https://www.loom.com/share/1d34a315d51c44a9b9e758882e08f7cd).

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Shared event dashboard with discovery, administrator controls, and About |
| `my-events.html` | Event statistics, time cap, and seven-day chart |
| `login.html` | Student login |
| `organizer-login.html` | Organizer login |
| `settings.html` | Duration units, JSON backups, and demo events |

## Features

- Create, edit, and delete events through administrator controls on the shared dashboard.
- Event cards with titles, descriptions, categories, dates, durations, venues, and registration links.
- Live regex search with case sensitivity control, invalid-pattern feedback, and highlighted matches.
- Category and free/paid filters, sorting by date, title, or duration, and a reset control.
- Form validation for title, duration, category, and calendar date, including repeated-word detection.
- Inline error messages and focus on the first invalid field during submission.
- Statistics for total records, total duration, top category, and activity over the last seven days.
- A saved time cap with remaining-time and overage announcements.
- Duration display in minutes or hours.
- Automatic record saving in localStorage and validated JSON import/export.
- Ten demo events loaded on demand from Settings without replacing existing events.
- Separate student and organizer login forms with email and password format validation.
- Responsive layouts, visible keyboard focus, a skip link, and reduced-motion styling.

## Current status

New records receive unique IDs and creation/update timestamps. Editing preserves the ID and creation timestamp and updates `updatedAt`. Deletion requires confirmation. Discover and Overview use the same records saved in localStorage on the same origin. Overview calculates statistics from those records.

Login validates email and password format and selects a browser-session role. It does not authenticate accounts. Administrator controls appear when the organizer role is selected. Logout currently links to the student login page; it does not clear the session role. These controls are a prototype and are not secure permission checks.

localStorage is limited to one browser and origin. A production version needs backend authentication, permission checks, and shared storage. RSVP opens an organizer's registration link when provided; external registration links do not provide attendee lists or RSVP counts to this app.

## Run locally

1. Clone or download the repository.
2. Open the folder in VS Code.
3. Start Live Server on `index.html`.
4. Open `organizer-login.html`, complete the form, then use **Create event** on the dashboard.
5. To try sample content, open **Settings → Load demo events**, then return to Discover.

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
  state.js             Shared event records and add/update/delete
  storage.js           Browser record save/load
  sorting.js           Event ordering
  search.js            Regex compilation and safe highlighting
  discovery.js         Discovery rendering and filters
  stats.js             Statistics, seven-day chart call, and time cap
  settings.js          Duration preferences, JSON backups, and demo loading
  login.js             Login format validation and session role selection
assets/                Event posters, textures, and icon license
docs/                  Specification and learning roadmap
seed.json              Ten demo event records
tests.html             Validation, search, sorting, and highlighting checks
```


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

The first focusable link skips to the main content. Submitting invalid fields moves focus to the first invalid field. Native dropdowns can be operated with the keyboard.

## Accessibility

- Semantic landmarks and headings.
- Labels linked to form inputs.
- Accessible names for icon-only buttons.
- Error and help text connected through `aria-describedby`.
- `aria-invalid` identifies invalid fields.
- Status regions announce saved changes and remaining time; alert regions announce invalid regex and time-cap overages.
- Visible focus outlines and reduced-motion styling.
- Decorative images and icons are excluded from screen-reader output.

The five application pages were manually checked at 360px, 768px, and 1024px. Keyboard navigation was also checked. A full contrast and screen-reader audit remains pending.

## Testing

Open `organizer-login.html`, complete the login form, then select **Create event** on the shared dashboard for these manual checks:

1. Enter `90abc` as duration, then change it to `90`. The error appears and clears.
2. Enter ` Campus Fair` as title. An edge-space error appears.
3. Enter `Campus campus Fair`. A repeated-word error appears.
4. Enter `Campus  Fair` and leave the field. It becomes `Campus Fair`.
5. Enter `Sports2` as category, then change it to `Campus Life`. The error appears and clears.
6. Clear the date and leave the field, then select a valid date. The error appears and clears.
7. Submit invalid fields. Errors appear and the first invalid field receives focus.
8. Complete all required fields and submit. The event appears in Discover. Edit its title and save, then refresh to check persistence. Use Delete and confirm to remove it.
9. In Settings, export the records and import the exported file. Refresh Discover and confirm the records remain. Try malformed JSON and confirm the error leaves existing records intact.
10. Change the duration unit in Settings and the time cap in Overview. Refresh and check that both preferences remain saved.
11. Load demo events twice. Existing events should remain, and the second load should add no duplicate demo records.

Open `tests.html` through Live Server. Its 16 assertions cover validation, calendar dates, case handling, invalid regex, numeric sorting, and safe highlighting. The page shows when execution finishes; inspect the Console for any assertion errors.

## Milestones

| Milestone | Weight | Status |
| --- | --- | --- |
| M1 — Specification & Wireframes | 10% | Specification and design planning established |
| M2 — Semantic HTML & Base CSS | 10% | Complete |
| M3 — Forms & Regex Validation | 15% | Complete |
| M4 — Rendering, Sorting & Regex Search | 20% | Complete |
| M5 — Statistics & Targets | 15% | Complete |
| M6 — Persistence, Import/Export & Settings | 15% | Complete |
| M7 — Polish & Accessibility Audit | 15% | Complete |

## Credits

- Validation patterns adapted from the assignment's starter examples.
- [ALU](https://www.alueducation.com/) for colour and branding inspiration.
- [Luma](https://luma.com/) for event-discovery layout inspiration.
- [Hugeicons](https://github.com/hugeicons/hugeicons) for the form close icon. MIT license included in `assets/hugeicons-LICENSE.txt`.
- Montserrat from Google Fonts.

## Contact

Ismail — n.ismael@alustudent.com
