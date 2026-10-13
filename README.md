# Campus Life Planner

A responsive campus event discovery website built with vanilla HTML, CSS, and JavaScript for the **Building Responsive UI** assignment.

**Chosen theme:** Campus Life Planner.

Students often miss events buried in email. This project brings campus events into one place, with a student discovery interface and an administration workspace for event organizers.

## Project links

- Repository: [Student-Life-Planner](https://github.com/Ismael-Nd/Student-Life-Planner)
- Intended GitHub Pages URL: https://ismael-nd.github.io/Student-Life-Planner/ — deployment and public accessibility still need to be verified.
- Demo video: pending; add an accessible unlisted 2–3 minute video link before submission.

## Current progress

M2 layouts are complete. M3 form validation is in progress; the dedicated assertion test page remains to be built.

### Implemented

- Student discovery page with nine sample event cards and recommended-event layout.
- Separate My Events, organizer profiles, administration dashboard, and student/organizer login pages.
- Compact administration event table with sample RSVP counts and attendee names.
- Native HTML pop-ups for create/edit forms, attendees, and delete confirmation.
- Settings and planning dashboard layouts, including duration units, a weekly time target, and a sample seven-day chart.
- Four create-form validators: title, duration, category/tag, and date.
- Advanced regex using a back-reference to detect consecutive repeated words.
- Repeated title spaces collapse on blur and submission.
- Inline validation feedback on input/blur, plus submission validation and focus on the first invalid field.
- Mobile-first CSS with breakpoints at 360px, 768px, and 1024px.

### Still to implement

- Dynamic record creation, editing, deletion, IDs, and timestamps.
- Search, regex compilation/error handling, safe match highlighting, and working filtering/sorting.
- Saved-event/bookmark behaviour connected to the current pages.
- Calculated statistics, seven-day trend, time target announcements, and minutes/hours conversion.
- Connected localStorage persistence and validated JSON import/export.
- `tests.html`, final `seed.json` with at least ten diverse records, final accessibility audit, demo video, and verified GitHub Pages deployment.

Dropdowns allow selection and Reset restores defaults, but do not yet filter or sort the event cards. Several controls remain disabled placeholders. Earlier bookmark/UI scripts are retained in the repository but are not evidence that the current layouts support those features.

## Account and RSVP prototype limits

Login pages are UI previews, and Logout links return to the corresponding login page. There is no authentication or secure role enforcement. Event creation controls appear in the administration interface only.

RSVP counts and attendees are sample data, not real registrations. Future registration links can open an organizer's external registration page, but this website cannot infer attendee counts from an external service without an integration.

localStorage is scoped to a browser and origin. Pages on the same origin can share it, but students and organizers using different devices cannot share records through it. A production application needs a backend, authentication, shared storage, and permission checks for administration actions. Passwords will not be stored in localStorage.

## Run locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Use the Live Server extension to serve `index.html`.
4. Open `organizer.html` to try create-form validation.

Serve the project over HTTP rather than opening files directly: JavaScript uses ES modules. No framework, build step, or API key is required.

## Pages and source structure

```text
index.html                 Student discovery and About
my-events.html             Saved-event and planning dashboard layouts
organizers.html            Organizer profiles visible to students
organizer.html             Administration dashboard and pop-up forms
login.html                 Student login layout
organizer-login.html       Organizer login layout
settings.html              Preferences and import/export layouts
styles/main.css            Shared visual styling and student layouts
styles/organizer.css       Administration and login layout styling
scripts/validators.js      Reusable validation functions
scripts/form-validation.js Create-form events and error feedback
scripts/events-data.js     Sample event data
scripts/bookmarks.js       Earlier bookmark storage helper
scripts/student-ui.js      Earlier UI code, currently disconnected
assets/                    Posters, textures, and icon license
docs/                     Milestone notes and styling references
```

`organizers.html` and `organizer.html` have different purposes: the plural filename contains profiles; the singular filename is the administration workspace.

## Regex catalog

Patterns are implemented in `scripts/validators.js`.

| Purpose | Pattern | Examples |
| --- | --- | --- |
| Title edges | `/^\S(?:.*\S)?$/` | Accept `Campus Fair`; reject an empty string or ` Campus Fair` |
| Duration | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Accept `0`, `90`, `45.50`; reject `012.92`, `100.943`, `90abc` |
| Category/tag | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Accept `Careers`, `Campus Life`, `Student-Life`; reject `Sports2`, double spaces, leading/trailing separators |
| Date format | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | Accept `2026-10-13`; reject `2026-13-13` and `2026-1-13` |
| Duplicate words — advanced | `/\b(\w+)\s+\1\b/i` | Detect `Campus campus` and `Join the the workshop`; allow `Campus Careers Fair` |
| Collapse spaces | `/ {2,}/g` replaced with one space | Convert `Campus  Careers   Fair` to `Campus Careers Fair` |

The date regex checks format only. `isValidDate()` also compares UTC calendar components to reject impossible dates such as `2026-02-30` and handle leap years. The duplicate-word function returns `true` when a problem is found; the `isValid...` functions return `true` when a value passes.

## Keyboard map

| Key/action | Behaviour |
| --- | --- |
| Tab / Shift+Tab | Move forward/backward through enabled controls |
| First Tab, then Enter | Activate the skip-to-content link |
| Enter | Follow a focused link or activate a focused button |
| Space | Activate a focused button |
| Arrow keys | Change options in native dropdowns, following browser behaviour |
| Escape | Close an open native event pop-up |
| Submit an invalid create form | Move focus to the first invalid validated field |

The administration table has a focusable scrolling region for narrow screens. Disabled placeholder buttons are excluded from the keyboard sequence.

## Accessibility notes

- Semantic header, navigation, main, section, and footer landmarks with headings.
- Labels bound to inputs and meaningful accessible names for icon buttons.
- Help/error text linked through `aria-describedby`.
- Invalid create-form fields marked with `aria-invalid`.
- Inline errors use polite live announcements; form status uses `role="status"`.
- Skip link and visible 1px focus outlines.
- Navy/red palette, text feedback alongside colour, and reduced-motion styling.
- Decorative posters/icons use empty alt text or `aria-hidden`; event names remain available as text.

M2 browser checks covered all seven pages at 360px, 768px, and 1024px, with no page-wide horizontal overflow. Labels, duplicate IDs, skip-link focus, and native pop-up keyboard controls were checked. This is not a claim of a full screen-reader or contrast audit; that remains part of M7.

## Testing

`tests.html` is not yet available. Small assertions will be added during M3 and documented here once runnable.

Current manual create-form checks:

1. Serve the project and open `organizer.html`, then select **Create event**.
2. Enter `90abc` as duration: an inline error should appear. Change it to `90`: the error should clear.
3. Enter ` Campus Fair` as title: expect an edge-space error.
4. Enter `Campus campus Fair`: expect a repeated-word error.
5. Enter `Campus  Fair` and leave the field: expect `Campus Fair`.
6. Enter `Sports2` as category: expect an error. Change it to `Campus Life`: expect no error.
7. Leave the date empty and blur: expect an error; choosing a valid date clears it.
8. Submit with invalid required validation fields: expect errors and focus on the first invalid field.
9. Use valid title, duration, category, and date: expect a validation-passed message. Saving is not connected yet.

Calendar edge cases to cover in the assertion page: `2024-02-29` passes, `2026-02-29` and `2026-04-31` fail.

## Milestone roadmap

| Milestone | Weight | Status |
| --- | --- | --- |
| M1 — Spec & Wireframes | 10% | Specification/design decisions established; review final submission evidence |
| M2 — Semantic HTML & Base CSS | 10% | Layout stage complete; see `docs/M2-review.md` |
| M3 — Forms & Regex Validation | 15% | In progress; validators and create-form feedback added, assertions pending |
| M4 — Render, Sort & Regex Search | 20% | Pending |
| M5 — Stats & Cap/Targets | 15% | Layout only; logic pending |
| M6 — Persistence, Import/Export & Settings | 15% | Layout only; integration pending |
| M7 — Polish & Accessibility Audit | 15% | Pending |

## Credits and references

- Assignment-provided validation patterns and back-reference example adapted into reusable functions.
- [ALU](https://www.alueducation.com/) inspired the navy/red visual palette.
- [Luma](https://luma.com/) and [Luma Discover](https://luma.com/discover) informed layout decisions.
- Student-supplied card reference informed rounded image/content panels.
- [Hugeicons](https://github.com/hugeicons/hugeicons): free SVG paths from `@hugeicons/core-free-icons` 4.3.5 for administration actions. MIT license preserved in `assets/hugeicons-LICENSE.txt`.
- Montserrat served through Google Fonts.

See `docs/styling-references.md` for historical design notes; some earlier implementation notes there are superseded by the current progress described in this README.

## Author and submission checklist

Contact: n.ismael@alustudent.com.

Before submitting:

- Finish required functionality and tests.
- Include `seed.json` with at least ten diverse records.
- Enable GitHub Pages and verify the live URL above works publicly.
- Add and verify the 2–3 minute demo video link.
- Confirm the repository contribution history lists only your own GitHub account, as required by the assignment. This has not been independently verified here.
