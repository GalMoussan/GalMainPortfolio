# Brief: update galmoussan.com to WEBSITE_CONTENT.md v2

Repo: `galsportfolio`. Copy source of truth: `WEBSITE_CONTENT.md` (put it in the repo root next to this file).

Goal: the live site matches `WEBSITE_CONTENT.md` exactly, **with zero broken routes, embeds, APIs, analytics gating or builds**. This is a content update, not a redesign.

---

## Hard rules

1. **No route disappears.** These must all return 200 after the change: `/`, `/archive`, `/tools/snake`, `/tools/cinema-query`, `/ai-integration`, `/onepiece`, `/mrMiao`, `/resume.pdf`, `/privacy-policy`, `/terms`, `/cookie-policy`, plus `/api/onepiece-leaderboard`.
2. **No restyling.** Reuse existing components and styles. New sections (Training, Development, extra buttons) copy the pattern of the nearest existing section. Do not touch the theme, fonts or layout system.
3. **Do not invent content.** Anything marked `[FROM REPO]` comes from the repo itself. Anything marked `[TODO: …]` stops you — see "Stop and ask".
4. **Cookie consent stays as is.** Vercel Analytics loads only after Accept.
5. **Data in one place.** Projects, experience and services live in data files (whatever the repo already uses). Text copy is not duplicated across components.
6. **Small commits** on a branch `content-v2`, one per step below. Do not push to `main` and do not deploy. Gal reviews the preview.

---

## Step 0 — Baseline

- Create branch `content-v2`.
- Run install, lint, typecheck, unit tests, `next build`. Record what passes **before** you touch anything. Anything already failing is not yours to fix silently — list it in the final report.
- List every route in `src/app` and every file under `src/app/api`. Confirm the list matches the site map in `WEBSITE_CONTENT.md`. If there are extra routes, keep them and report them.

## Step 1 — Collect project data from GitHub

For each repo below use `gh` (it is authenticated):

- GalMoussan/Transcribe-god
- GalMoussan/KineticFlow
- GalMoussan/landingCourses
- GalMoussan/ayalimGame
- GalMoussan/connections-friends
- the `/onepiece` game source inside this repo (for Drop Merge tech)
- every previous project in the Archive list

From each one collect:
- **visibility** (public / private / missing)
- **creation year** (`gh repo view --json createdAt,visibility,description,primaryLanguage`)
- **README summary**
- **tech**: read `package.json` / `requirements.txt` / `pyproject.toml`. Pick at most 6 real items per card (frameworks and key libraries, not tooling noise).

Rules:
- A private or missing repo gets **no GitHub link** on the site.
- If a README contradicts a description in `WEBSITE_CONTENT.md`, follow the README and note the change in your report.

Write the results to a scratch table in your report before you edit any components.

## Step 2 — Screenshots

Use Playwright (already a dev dependency).

- Live sites: screenshot the main page at 1280×800, no cookie banners covering content, PNG.
  - https://iasanorth.com → `public/images/yassa-north.png`
  - https://ayalim-game.vercel.app → `public/images/ayalim-game.png`
  - https://connections-friends.vercel.app → `public/images/connections-friends.png`
  - local dev server `/onepiece` → `public/images/drop-merge.png` (only if the card design shows an image for "other" projects; otherwise skip)
- Local tools (no live URL):
  - Transcribe God → `public/images/transcribe-god.png`
  - KineticFlow → `public/images/kineticflow.png`

  Use an image from the repo README if one exists. Otherwise, try to run the tool locally and screenshot its main screen or output. If neither works in ~10 minutes, ask Gal for an image rather than shipping a blank card.
- Match the dimensions and aspect ratio of the existing `public/images/*.png` cards. Optimize file size.
- Keep the old images. Archive rows or `/tools` pages may still reference them. Delete an old image only if a grep proves nothing references it.

## Step 3 — Homepage

Apply the homepage section of `WEBSITE_CONTENT.md`:

- Navigation, including the new **Services** link and the mobile menu.
- Hero, including the new secondary button.
- About copy and tech list. **Remove the `#` placeholder links.**
- Experience tabs, in order, with the new Yassa North and Shamir entries. Lagoonads ends January 2025.
- Featured work: 5 cards in the specified order.
- Other projects: Drop Merge and Snake only.
- Contact copy and the second button.

Remove the old project cards from the homepage. The `/tools/cinema-query` page stays.

## Step 4 — Archive

- Rows as listed in `WEBSITE_CONTENT.md`.
- Year comes from the repo creation year.
- "Made at" follows the rule in the content file.
- Sort by year, newest first.
- No hardcoded 2019/2020 values.

## Step 5 — Services page (`/ai-integration`)

- Hero, badge, trust line, CTAs.
- WhatsApp number `972558859702` and the new prefilled messages. Search for `972500000000` and replace **every** occurrence via one shared constant.
- Demo: add the "Illustrative example" label and remove all "0 errors" / "Last error: never" strings.
- New **Training** section (`id="training"`) and **Development** section (`id="development"`), placed as listed. Add the nav item.
- Case studies:
  - replace reelSearch with Transcribe God
  - remove the dead "View case study →" links
  - no link may point at `#case-studies`
- About and FAQ edits, including the new Training FAQ group.
- **Remove "Coming soon"**:
  - Delete the section and its form component.
  - Delete the early-access API route.
  - Remove the Resend usage and env vars from `.env.example`.
  - Grep first. Delete a file or dependency only if nothing else imports it. Remove the `resend` package only if it is now unused.
- Metadata, keywords, OG alt and JSON-LD per the content file. Remove any `Tel Aviv` locality.

## Step 6 — Root metadata and structured data

- Root title and description.
- Person / Organization JSON-LD:
  - jobTitle and address are updated.
  - Validate the JSON-LD against schema.org. No `Tel Aviv` anywhere.

## Step 7 — Legal pages

- Apply the Privacy, Terms and Cookie changes from the content file.
- Set "Last updated" to today's date on all three pages.
- Keep all unchanged sections exactly as they are.

## Step 8 — Resume PDF

- Build the resume from the "Resume" section of the content file as an HTML template in `scripts/resume/`. It is **not** a public route.
- Render it to `public/resume.pdf` with Playwright `page.pdf()`. Use a two-column layout, A4, and text that can be selected.
- Add an npm script `resume:build` so it can be regenerated later.
- Open the PDF and check that it is exactly 1 page, unless the content cannot fit at 10pt. Check that nothing is cut off and that no `[TODO` remains.

## Step 9 — Verify (do not skip)

1. Lint, typecheck, unit tests and `next build` all pass. Nothing that passed in Step 0 may fail now.
2. Playwright smoke test over every route in Hard rule 1:
   - status 200
   - no console errors
   - images load (no 404s in network)
3. Grep the built output and `src` — each must return nothing:
   - `Tel Aviv`
   - `972500000000`
   - `gal@example.com`
   - `onboarding@resend.dev`
   - `0 errors`
   - `Last error: never`
   - `not currently looking`
   - `Australia` in the resume summary
   - `href="#"`
   - `[TODO`
   - `[FROM REPO]`
4. Link check: every external link on `/`, `/archive` and `/ai-integration` returns 2xx/3xx.
5. Visual check: screenshot `/` and `/ai-integration` at 390px and 1280px. Confirm there is no horizontal scroll and the new sections match the existing style.
6. Analytics: with consent declined, no Vercel Analytics request fires.

## Stop and ask Gal

Stop and ask Gal, do not guess, when:

- Any `[TODO: …]` is still in the content: the Yassa North start date, the Shamir dates, the freelance start date on the resume.
- A repo is private, missing, or its README describes something very different.
- A screenshot can't be produced.
- `/onepiece` (Drop Merge) uses characters, art or names from an existing franchise (the route name suggests One Piece). If it does, flag it before linking it from the portfolio — showcasing third-party IP publicly is a risk.
- Deleting anything would affect a route in Hard rule 1.

## Final report

Keep it short:
- what changed, per step
- repo facts you used
- anything that differs from `WEBSITE_CONTENT.md`, and why
- tests before and after
- the preview URL
