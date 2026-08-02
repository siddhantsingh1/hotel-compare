# Hotel Compare — Buyhatke

React Native (Expo) implementation of the Buyhatke Hotel Compare designs handed off from
Claude Design. The `project/` folder holds the original HTML prototypes; `src/` holds the app.

## Running

```bash
npm install
npm start          # Expo dev server — press i / a, or scan the QR code
npm run web        # browser preview (react-native-web)
npm run typecheck  # tsc --noEmit
```

## Web preview

`.github/workflows/deploy-web-preview.yml` exports the app for web and publishes it to
GitHub Pages on every push to `main` or `implement-hotel-compare`, giving a link that opens
on a phone or desktop browser with no local setup:

**https://siddhantsingh1.github.io/hotel-compare/**

`expo.experiments.baseUrl` in `app.json` is set to `/hotel-compare` so assets resolve under
that sub-path; change it if the repo is renamed. Build it yourself with `npx expo export
--platform web` (output in `dist/`).

## Layout

| Path | What's in it |
| --- | --- |
| `src/theme/tokens.ts` | Colour ramps, type scale, radius + spacing scales from the design foundation |
| `src/components/` | Shared UI: buttons, chips/pills, stepper, bottom sheet, header, icons, empty states |
| `src/screens/` | One file per screen, plus `screens/sheets/` for the filter, sort, date and guest sheets |
| `src/state/BookingContext.tsx` | Search, filters, sort and selection shared across the flow |
| `src/data/mock.ts` | Copy and pricing from the prototypes |
| `assets/fonts/` | Google Sans Flex, four static weights (SIL OFL — see `OFL.txt`) |

The flow runs Entry Search → Results → Hotel Detail → Price Comparison → Webview Checkout →
Booking Confirmation. The four empty states are wired to real conditions rather than being
standalone screens: search a destination with no stays (Zuluk), filter to a combination with
no matches, open a property with no reviews (Palm Grove Inn), or filter every package out.

---

# Handoff bundle notes

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Hotel Compare - Filter and Sort.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Hotels Compare UI` project files (HTML prototypes, assets, components)
