# Styling references

Reference: [ALU official website](https://www.alueducation.com/), inspected 8 October 2026.

The site uses Montserrat typography, navy navigation, white uppercase navigation text, and red call-to-action panels. The inspected Apply Now panel uses rgb(208, 13, 45), equivalent to #d00d2d, with 10px container padding. The planner adapts that direction using 14px 24px RSVP padding and at least 44px control targets. Its navy #002e6d is retained from the student's existing palette. These are adaptations, not a certified ALU design-system specification.

Icons are inline SVG geometry, so the search, dropdown, and bookmark do not depend on an external icon font. The native select remains keyboard accessible.

The recommended image fills its container with object-fit: cover; edges may be cropped. Check poster details before final submission. Bookmark currently lasts only for the page session. RSVP shows an availability message until a real organiser registration URL is supplied. Search/filter logic will be implemented in the planned JavaScript milestones.

main.css contains only student-page selectors. organizer.css holds the organiser's separate page styles.

## Luma layout adaptation (8 October 2026)
References: https://luma.com/ and https://luma.com/discover. Adapted the spacious landing introduction, compact navigation, rounded controls, understated cards, and muted supporting text. Retained ALU navy/red colours and Montserrat. Recommended posters now use width: 100% and height: auto in normal document flow; no fixed height or object-fit cropping. This supersedes the earlier cover treatment.

Card layout adapted from the student's supplied reference image: rounded rectangle with upper image and lower information panel, omitting the folder tab. Discovery thumbnails may crop; the recommended poster does not. Trending uses sample recent-interest scores, popularity uses sample total-interest scores, newest/oldest use created dates. Sorting is local demonstration data, not live campus statistics. Search currently matches plain text; assignment regex search remains an upcoming milestone.

My Events now shows bookmarked cards and persists bookmark IDs to browser storage. Unbookmarking removes the saved card and synchronises icons; hidden announcements and focus recovery support keyboard use. Organiser logos are original placeholder monograms and counts derive from the four sample event cards. About includes the student-provided GitHub profile and email. Footer uses the navy header palette. Storage checks cover round-trip saving, removal, unknown IDs, malformed JSON, invalid types, unavailable storage, and failed writes. Browser visual QA remains pending.

## Hugeicons table actions
Edit, delete, attendees, and close SVG paths sourced from @hugeicons/core-free-icons 4.3.5 (PencilEdit01Icon, Delete02Icon, UserGroupIcon, Cancel01Icon). https://github.com/hugeicons/hugeicons . MIT notice preserved in assets/hugeicons-LICENSE.txt. No framework or runtime icon dependency.
