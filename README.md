# Campus Life Planner

Campus Life Planner helps students find campus events without searching through emails. Students can browse events, while administrators have a workspace for managing event listings.

Built with HTML, CSS, and vanilla JavaScript for the **Campus Life Planner** theme of the Building Responsive UI assignment.

## Links

- [Repository](https://github.com/Ismael-Nd/Student-Life-Planner)
- GitHub Pages: deployment pending. Expected URL: https://ismael-nd.github.io/Student-Life-Planner/
- Demo video: coming soon.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Event discovery, recommendations, and About |
| `my-events.html` | Event statistics, time cap, and seven-day chart |
| `organizer.html` | Administration dashboard and event forms |
| `login.html` | Student login |
| `organizer-login.html` | Organizer login |
| `settings.html` | Time target, duration units, and data backup controls |

## Features

- Ten demo events can be loaded from Settings; existing records are kept.
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

M2 and M3 are implemented. M4 rendering, filtering, sorting, regex search, and create/edit/delete are implemented; final Live Server checks are pending.

Create and Edit validate the form before saving. New records receive unique IDs and timestamps. Editing preserves the creation timestamp and updates updatedAt. Deletion requires confirmation. Records are saved in localStorage and shared by Discover and the administration page on the same origin. Initial events, RSVP counts, attendee names, and the chart use sample data.

Regex search, category/entry filters, and date/title/duration sorting are connected. Search highlights all matches in event titles, descriptions, categories, and venues. Calculated statistics, time caps, duration units, and validated JSON import/export are available. Settings includes a Load demo events button that adds missing sample events without replacing existing records. Login and Logout are navigation previews without authentication. `tests.html` and a ten-record `seed.json` are included.

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
  state.js             Shared event records and add/update/delete
  storage.js           Browser record save/load
  sorting.js           Event ordering
  search.js            Regex compilation and safe highlighting
  discovery.js         Discovery rendering and filters
  admin.js             Administration table and record actions
assets/                Event posters, textures, and icon license
docs/                  Specifications, milestone reviews, and references
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
8. Complete all required fields and submit. The event appears in the administration table; open Discover on the same origin to see it. Edit its title and save, then check Discover again. Use Delete and confirm to remove it.

Open `tests.html` through Live Server. Its 16 assertions cover validation, calendar dates, case handling, invalid regex, numeric sorting, and safe highlighting. The page shows when execution finishes; inspect the Console for any assertion errors.

## Milestones

| Milestone | Weight | Status |
| --- | --- | --- |
| M1 — Specification & Wireframes | 10% | Specification and design planning established |
| M2 — Semantic HTML & Base CSS | 10% | Complete |
| M3 — Forms & Regex Validation | 15% | Complete |
| M4 — Rendering, Sorting & Regex Search | 20% | Complete |
| M5 — Statistics & Targets | 15% | Complete |
| M6 — Persistence, Import/Export & Settings | 15% | Layouts ready; integration In progress |
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
- Deploy to GitHub Pages and confirm public access.
- Include a 2–3 minute demo video.
- Confirm that the repository has only the author's GitHub account in its contribution history.
