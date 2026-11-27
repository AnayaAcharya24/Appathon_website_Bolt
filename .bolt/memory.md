# Project memory

## Product intent & audience

- Appathon (hackathon/competition) website supporting participants, organizers, and admins.
- Multi-page public site with registration, submission, rules, prizes, schedule, FAQ, contact, and privacy sections.
- Admin area for managing registrations/submissions and tracking email status.

## Brand personality & voice

- Hackathon/event tone: energetic, welcoming, informative. Inference is limited pending design review.

## Visual design & UX direction

- Framework: Vite + React (JSX), Tailwind CSS, Lucide React icons. No additional UI/icon packages unless explicitly requested.
- Multi-route navigation across Home, About, Register, Submit, Rules, Prizes, Schedule, FAQ, Contact, Privacy, Admin.
- Project media includes images and videos bundled with the site.
- `@/` path alias maps to `src/` for imports.

## Decisions, constraints & rationale

- Git unavailable in workspace; GitHub repo was fetched via downloaded archive and unpacked into the project.
- Deploys a backend edge function `send-confirmation` for confirmation emails on registration.
- Email delivery via Resend; until a Resend account is connected, emails remain "queued" (by design) and Admin reflects that status.
- Packages installed as needed to run the cloned site; no UI theme/icon libraries added beyond the template defaults.

## Open questions & assumptions

- Resend API credentials not yet connected; real email sending is pending.
- Site's original design/aesthetic is inherited from the cloned repo and may need verification against the user's "beautiful, production-worthy" expectation.
- Exact routing library, state management, and styling details come from the cloned source and should be confirmed as the project evolves.