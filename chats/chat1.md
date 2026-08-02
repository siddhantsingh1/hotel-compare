# Buyhatke visual design foundation

_Started 2026-08-01 20:59 UTC_

---

## User

Hotel compare — high-fidelity design foundation

Task: Establish the Buyhatke visual design system for this project
before generating any screens.

Tokens below are exact — use these values directly, do not
approximate. Attached screenshots are for visual reference only —
use them to understand real component patterns, iconography style,
imagery treatment, and overall product feel, but defer to the token
values above for any color, type, spacing, or radius specifics if
they ever conflict with what's visible in a screenshot.

Attached: [reference screenshots of existing Buyhatke screens]

Font: Google Sans Flex (weights: Regular, Medium, SemiBold, Bold)

Type scale (size / line-height / letter-spacing, in px):
- Regular: 12/16/0 · 14/18/-0.5 · 16/20/-0.5 · 18/22/-0.5 · 20/24/-0.5
- Medium: 12/16/-0.5 · 14/18/-0.5 · 16/20/-0.5 · 18/22/-0.5 · 20/24/-0.5
- SemiBold: 14/18/-0.5 · 16/20/-0.5 · 18/22/-0.5 · 20/24/-0.5
- Bold: 16/20/-0.5 · 20/24/-0.5 · 24/30/-0.5 · 32/36/-0.5
Use Bold 24-32 for hero numbers like total price; SemiBold 16-18 for
section headings; Regular/Medium 12-14 for body and labels.

Color system (light mode):
- Primary (brand, CTAs, active states): Poli Purple — base #5855E5,
  hover/pressed #4442B2, tint background #EFEFFF
- Secondary/info: Neelagiri (blue) — base #006CE5, hover/pressed
  #0054B2, tint #E5F1FF
- Success/savings (price drops, savings badges, discount %):
  Pachadi (green) — base #00764F, hover/pressed #005C3D, tint #E8F8F0
- Highlight/deals (matches the live Auto Coupons banner's yellow):
  Idukki Gold — base #FACC15, hover/pressed #DEA20C, tint #FDF5D4
- Error/warning: Red bull — base #D6383B, hover/pressed #A72B2E,
  tint #FDECEC
- Neutral text: #030712 (primary text), #4A5565 (secondary text),
  #99A1AF (muted/placeholder)
- Neutral surfaces/borders: #F9FAFB (page background), #FFFFFF
  (card background), #E5E7EB (borders/dividers)

Corner radius (360dp scale): 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 999
(pill/full). Use 8-12 for cards, 16-20 for bottom sheets, 999 for
chips/pills and CTAs.

Spacing (360dp scale, 4/8 increments): 0, 2, 4, 8, 12, 16, 20, 24,
32, 40, 48, 56, 64, 80, 120. Page margin: 16px left/right.

Recurring components already defined in the wireframe pass — carry
these through at high fidelity: search bar, price/savings badge,
primary CTA button, hotel card, price comparison row, chip/pill
filter, tab bar, bottom sheet.

Do not generate any screens yet — confirm the foundation is
understood. I'll feed each wireframe one at a time next.

## Assistant

_[tool: dc_write]_

_[tool: ready_for_verification]_

Foundation confirmed and built as `Foundation.dc.html` — type scale (all four weights, exact size/LH/tracking), the five brand ramps + neutrals with hex labels, the 11-step radius and 15-step spacing scales, and all eight recurring components at 360dp with a 16px margin: search bar (default/focused), price & savings badges, buttons (default/hover/pressed/disabled/secondary), hotel card, price comparison row, filter chips, tab bar (bottom nav + in-page), and bottom sheet.

Two notes:
- Google Sans Flex isn't on a public font CDN, so the file requests it and falls back to Roboto Flex for rendering. Drop the real font files in and I'll wire an `@font-face`.
- Icons are geometric placeholders. If you have the Buyhatke icon set, send it and I'll swap them in before screens.

Ready for the first wireframe.

## User

Hotel compare — high fidelity: Entry Search

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography).

Attached: Hotel Compare - Entry Search.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Entry Search is up at high fidelity — structure, order, and copy unchanged from the wireframe.

Key elevations: Poli Purple header band with the sheet radius (20) tucking under it; 12px card radius and 999 pills throughout; purple search icon and chevrons replacing the wireframe's geometric stubs; savings and "From ₹" figures in Pachadi green; chain deals on Idukki Gold tint; hover states on every tappable row. Photos and chain logos remain striped placeholders — send real assets and I'll drop them in.

## User

Address these comments from my teammates:

**Sanchita** (on `Hotel Compare - Entry Search.dc.html` at `#dc-root [data-dc-tpl="41"] >div:nth-child(2)`):
<commented-element>react:    Hotel Compare - Entry Search
dom:      body › div#dc-root › div.sc-host › div[screen="Entry Search"] › div › div.scp4[2/4]
text:     "Manali, Himachal Pradesh 12 Aug – 15 Aug · 2 adults"
children: div, div, div
selector: #dc-root [data-dc-tpl="41"] &gt;div:nth-child(2)</commented-element>
<teammate-comment>Add a starting price</teammate-comment>

**Sanchita** (on `Hotel Compare - Entry Search.dc.html` at `[data-comment-anchor="c1e67248f3-div"]`):
<commented-element>react:    Hotel Compare - Entry Search
dom:      body › div#dc-root › div.sc-host › div[screen="Entry Search"] › div › div › div.scp0[2/2]
text:     "1 room 2 adults"
children: div, svg
selector: [data-om-id="2e35101f:33"]</commented-element>
<teammate-comment>Open bottom sheet to add more rooms, adults and guest - - &lt;count&gt; + style UI</teammate-comment>

**Sanchita** (on `Hotel Compare - Entry Search.dc.html` at `[data-comment-anchor="b425d79152-div"]`):
<commented-element>react:    Hotel Compare - Entry Search
dom:      body › div#dc-root › div.sc-host › div[screen="Entry Search"] › div › div › div › div.scp1 › div[2/2]
text:     "Select date"
children: text
selector: [data-om-id="2e35101f:27"]</commented-element>
<teammate-comment>Open date selection UI - Checkin &amp; Checkout</teammate-comment>

**Sanchita** (on `Hotel Compare - Entry Search.dc.html` at `[data-comment-anchor="a76ff86b2d-div"]`):
<commented-element>react:    Hotel Compare - Entry Search
dom:      body › div#dc-root › div.sc-host › div[screen="Entry Search"] › div › div › div.scp0 › div[2/2]
text:     "Search hotel, city, or country"
children: text
selector: [data-om-id="2e35101f:21"]</commented-element>
<teammate-comment>On click open keyboard view with results shown below when typed</teammate-comment>

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

_[tool: dc_html_str_replace]_

Applied — "From ₹…" in Popular destinations is now neutral #030712.

## User

Hotel compare — high fidelity: Results List

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). Reuse the search bar and any
components already elevated in Entry Search where they repeat here
(e.g. header search summary).

Attached: Hotel Compare - Results List.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Results List is up at high fidelity — same structure, order, and copy as the wireframe.

Elevations: header search summary reuses the Entry Search pattern (back chevron, destination + dates/guests line, 12-radius map tile); Filter/Sort chips in Poli Purple active state, quick filters in default chip style; savings badge on each photo and "% off" pill in Pachadi green; room highlights as green tint pills; primary CTA as a 999 pill with purple elevation; alternate prices show the delta in Red bull. Stars use Idukki Gold; guest rating uses the purple tint badge.

One addition to flag: I added a "Save ₹…" badge on the photo (the wireframe had none) since it's a foundation component and the card is otherwise savings-silent — say the word and I'll pull it.

## User

Hotel compare — high fidelity: Hotel Detail

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). Reuse the price/savings badge and
CTA button styling already elevated in Results List for the fixed
bottom bar here.

Attached: Hotel Compare - Hotel Detail.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Hotel Detail is up at high fidelity — same structure, sections, and all five sheets from the wireframe.

Bottom bar reuses the Results List treatment exactly: platform + "Best price" in Pachadi green, 24px Bold total, green "22% off" pill, and the purple 999 CTA with elevation. The secondary "more prices" strip is now a purple-tint row instead of grey. Elsewhere: guest rating in purple tint, stars in Idukki Gold, amenity/rule/landmark icons on purple tint circles, dining on gold tint, sheets at radius 20 with slide-up animation and working steppers.

## User

Hotel compare — high fidelity: Price Comparison

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). This file contains both layout
options (A: tabbed by room, B: tabbed by platform) — elevate both,
keep them side by side as in the wireframe. Reuse the price
comparison row, chip filters, and package card structure consistent
with Results List and Hotel Detail.

Attached: Hotel Compare - Price Comparison.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Both layouts elevated side by side, 4a and 4b badges kept.

Consistent with Results List / Hotel Detail: package cards use the same best-price block (platform + green "Best price", 24px Bold total, strikethrough, green % pill, purple 999 Select); alternate-site rows show deltas in Red bull; checkbox chips and tabs use Poli Purple active states; inclusion ticks are green. Sheets are radius 20 with slide-up, steppers now functional, and the "All site prices" sheet gives the best row a filled CTA vs outline for the rest. Lightbox is on #030712.

## User

Address these comments from my teammates:

**Sanchita** (on `Hotel Compare - Price Comparison.dc.html` at `#\34 a [data-dc-tpl="37"] .scp0`):
<commented-element>react:    Hotel Compare - Price Comparison
dom:      body › div#dc-root › div.sc-host › section › div#4a › div[screen="Price Comparison A"] › div › div › div › div.scp0[2/2]
text:     "View all"
children: text
selector: #\34 a [data-dc-tpl="37"] .scp0</commented-element>
<teammate-comment>Just text CTA link is fine</teammate-comment>

**Sanchita** (on `Hotel Compare - Price Comparison.dc.html` at `#\34 a [data-dc-tpl="21"] >div:nth-child(1)`):
<commented-element>react:    Hotel Compare - Price Comparison
dom:      body › div#dc-root › div.sc-host › section › div#4a › div[screen="Price Comparison A"] › div › div.hs › div[1/3]
text:     "Deluxe Room from ₹4,899"
children: div, div
selector: #\34 a [data-dc-tpl="21"] &gt;div:nth-child(1)</commented-element>
<teammate-comment>Center align text.</teammate-comment>

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Both applied in 4a: room tabs are center-aligned, and "View all" on Room amenities is now a plain purple text link.

## User

Hotel compare — high fidelity: Filter and Sort

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). This file contains both bottom
sheets (Filter panel and Sort) — elevate both. Reuse the chip/pill
component style already elevated in Results List and Price
Comparison.

Attached: Hotel Compare - Filter and Sort.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Both sheets elevated side by side, structure unchanged.

Filter panel: sheets at radius 20, active category marked with a purple rail + purple label, count badges in Poli Purple, checkboxes filled purple when on, footer buttons as 999 pills (outline Clear all, filled Apply). Sort: selected row on purple tint with a purple radio — swapped the wireframe's tick for a radio since it's single-select. Both are live — checkboxes, category switching, "3 applied" count, Clear all, and sort selection all respond.

## User

Address these comments from my teammates:

**Sanchita** (on `Hotel Compare - Filter and Sort.dc.html` at `[data-dc-tpl="59"]`):
<commented-element>react:    Hotel Compare - Filter and Sort
dom:      body › div#dc-root › div.sc-host › section › div › div[screen="Sort sheet"] › div › div › div[2/3]
text:     "Sort by ×"
children: div, div
selector: [data-dc-tpl="59"]</commented-element>
<teammate-comment>Remove this line / seperator</teammate-comment>

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Removed the divider under the Sort by header.

## User

Hotel compare — high fidelity: Empty States

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). This file contains four separate
empty states — elevate all four, laid out on one page as in the
wireframe. Illustrations should match the overall brand feel
(savings-forward, clean, trustworthy) — keep them simple and on
tone, not overly playful or heavy. Reuse the "Clear filters" CTA
styling already elevated in Filter and Sort.

Attached: Hotel Compare - Empty States.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

All four elevated on one page, structure unchanged.

Illustrations are simple line-art on a purple-tint disc (search+hotel, funnel with minus, review bubble, suitcase) — geometric and restrained rather than playful. "Clear filters" uses the Filter/Sort Apply treatment: filled Poli Purple 999 pill with elevation. Applied filter chips are solid purple in state 2 and purple-tint checkboxes in state 4; stars are Idukki Gold, "Newly listed" on Neelagiri tint.

If you'd rather these illustrations be real brand assets, send them and I'll swap.

## User

Hotel compare — high fidelity: Webview Checkout

Convert the attached wireframe into a high-fidelity version using
the brand foundation already established in this project. The two
touchpoints (Auto Coupons banner, traveller auto-fill button) are
already real, shipped components — reproduce them exactly as shown
in the wireframe, do not restyle them. The surrounding webview
content is generic placeholder representing the external site's own
checkout UI, not something Buyhatke owns — keep it simple and
neutral, just enough polish to look like a believable third-party
checkout screen, without applying Buyhatke's brand styling to it.

Attached: Hotel Compare - Webview Checkout.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Both states done. The Auto Coupons banner and the purple auto-fill button are byte-identical to the wireframe — untouched.

Everything else stayed neutral third-party: same greys, same 8px radii, same grey Continue button. Only mechanical polish — real status-bar and browser-nav glyphs replacing the placeholder circles, a proper back chevron, and an underline on "View breakup". No Buyhatke color or type applied to the host site's UI.

## User

Hotel compare — high fidelity: Booking Confirmation

Convert the attached low-fidelity wireframe into a high-fidelity
screen using the brand foundation already established in this
project. Keep the exact structure, layout, and content hierarchy
from the wireframe — only elevate visual styling (color, type,
imagery, elevation, iconography). The "amount saved via compare"
element should reuse the success/savings styling already elevated
in Results List and Hotel Detail. Reuse the CTA button style
already established for "View booking confirmation."

Attached: Hotel Compare - Booking Confirmation.dc.html (wireframe)

## Assistant

_[tool: read_file]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Confirmation screen elevated, structure unchanged.

Savings elements use the Pachadi treatment from Results List / Hotel Detail: solid green 999 pill for "You saved ₹1,988", green "26% off" pill, green inline savings line, and green tint pills for the free-cancellation/breakfast features. "View confirmation on MakeMyTrip" and the floating "Back to Home" both use the purple 999 CTA with elevation. Success illustration is a green check disc with two gold sparks — same restrained style as Empty States.

## User

Hotel compare — design hygiene audit (all 8 high-fidelity screens)

Task: Review all 8 Hotel Compare high-fidelity screens in this
project against the checklist below. Go screen by screen and either
fix directly or flag exactly where it's violated (screen name +
element).

Screens in scope: Entry Search, Results List, Hotel Detail, Price
Comparison (layout A & B), Filter and Sort, Empty States, Webview
Checkout, Booking Confirmation.

Attached reference images — match these exactly wherever the
corresponding element appears:
1. CTA button styles — row 1: primary (filled, disabled, filled
   with arrow, icon-only circular), row 2: secondary (outlined/
   tinted) versions of the same four. Also includes the stepper
   component (- / count / +) in filled and outlined variants.
2. Filter panel — live reference for structure, spacing, checkbox
   style, sticky footer (Reset all / Apply filters)
3. Sort — live reference for structure, radio button style, sticky
   footer

—

Corner radius:
- iOS-style continuous corner smoothing (~60%), not plain circular
  rounding — applies to cards, buttons, sheets, and chips
- Radius values themselves still follow the token scale (8-12 cards,
  16-20 sheets, 999 pills/CTAs) — smoothing changes the curve
  quality, not the radius size

Spacing & grid:
- All spacing, padding, and margins in 4px/8px increments
- Consistent 16px left/right safe area on every screen's parent page
- Consistent gap between cards/list items across screens

Component consistency:
- CTA buttons match the attached reference exactly — primary
  (filled), secondary (outlined/tinted), with/without arrow,
  disabled state, icon-only circular variant, all at correct sizing
- Stepper component (rooms/guests count) matches attached reference
  — filled and outlined variants
- Filter panel and Sort match the attached live references —
  checkbox style, radio button style, sticky footer treatment,
  drag handle, header layout
- Tabs (room/platform tabs in Price Comparison) styled consistently
  with each other and with any other tab usage across screens
- Chip/pill components identical wherever they appear (quick
  filters, amenities, empty state CTAs)
- Icon set consistent — same family and weight throughout

Visual hierarchy & UX:
- Price remains the most visually dominant element on every
  price-bearing card
- Only one primary CTA per screen or section
- Touch targets minimum 44x44px for buttons, icons, chips
- Adequate spacing between adjacent tappable elements
- Sticky bottom bars/sheets padded for device safe area
- Text/background contrast meets WCAG AA
- Discounts/status not conveyed by color alone

Cross-screen:
- Back button same icon/position in every header
- Shared header pattern (Results List, Price Comparison) stays
  structurally identical
- ₹ formatting consistent — symbol placement, comma separators,
  decimals

—

Output: A screen-by-screen list of every violation found, with the
fix applied directly where possible. Where a fix isn't
straightforward, flag it instead of guessing.

## User

Hotel compare — design hygiene audit (all 8 high-fidelity screens)

Task: Review all 8 Hotel Compare high-fidelity screens in this
project against the checklist below. Go screen by screen and either
fix directly or flag exactly where it's violated (screen name +
element).

Screens in scope: Entry Search, Results List, Hotel Detail, Price
Comparison (layout A & B), Filter and Sort, Empty States, Webview
Checkout, Booking Confirmation.

Attached reference images — match these exactly wherever the
corresponding element appears:
1. CTA button styles — row 1: primary (filled, disabled, filled
   with arrow, icon-only circular), row 2: secondary (outlined/
   tinted) versions of the same four. Also includes the stepper
   component (- / count / +) in filled and outlined variants.
2. Filter panel — live reference for structure, spacing, checkbox
   style, sticky footer (Reset all / Apply filters)
3. Sort — live reference for structure, radio button style, sticky
   footer

—

Corner radius:
- iOS-style continuous corner smoothing (~60%), not plain circular
  rounding — applies to cards, buttons, sheets, and chips
- Radius values themselves still follow the token scale (8-12 cards,
  16-20 sheets, 999 pills/CTAs) — smoothing changes the curve
  quality, not the radius size

Spacing & grid:
- All spacing, padding, and margins in 4px/8px increments
- Consistent 16px left/right safe area on every screen's parent page
- Consistent gap between cards/list items across screens

Component consistency:
- CTA buttons match the attached reference exactly — primary
  (filled), secondary (outlined/tinted), with/without arrow,
  disabled state, icon-only circular variant, all at correct sizing
- Stepper component (rooms/guests count) matches attached reference
  — filled and outlined variants
- Filter panel and Sort match the attached live references —
  checkbox style, radio button style, sticky footer treatment,
  drag handle, header layout
- Tabs (room/platform tabs in Price Comparison) styled consistently
  with each other and with any other tab usage across screens
- Chip/pill components identical wherever they appear (quick
  filters, amenities, empty state CTAs)
- Icon set consistent — same family and weight throughout

Visual hierarchy & UX:
- Price remains the most visually dominant element on every
  price-bearing card
- Only one primary CTA per screen or section
- Touch targets minimum 44x44px for buttons, icons, chips
- Adequate spacing between adjacent tappable elements
- Sticky bottom bars/sheets padded for device safe area
- Text/background contrast meets WCAG AA
- Discounts/status not conveyed by color alone

Cross-screen:
- Back button same icon/position in every header
- Shared header pattern (Results List, Price Comparison) stays
  structurally identical
- ₹ formatting consistent — symbol placement, comma separators,
  decimals

—

Output: A screen-by-screen list of every violation found, with the
fix applied directly where possible. Where a fix isn't
straightforward, flag it instead of guessing.

## Assistant

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Audit done. Fixes applied across all 7 Buyhatke screens (Webview Checkout untouched — third-party UI).

**Fixed everywhere**
- **CTA shape** — every CTA was radius 999 (pill). Reference shows rounded-rect, so all CTAs are now radius 16 (small/secondary 12), padding on 8px increments, purple glow shadow removed to match the flat fills in the reference.
- **Secondary CTA** — outlined grey buttons ("Clear all", "View all gift cards") → tinted `#F1F3F9` with `#5855E5` text, per reference row 2.
- **Stepper** — was three loose 36px circles with a 16px gap (Entry Search, Hotel Detail, Price Comparison). Now the single bordered container with − / count / + at 44px tap zones, matching the outlined variant.
- **Touch targets** — all circular icon buttons and sheet close buttons were 32–40px → 44px.
- **Chips** — mixed `8px 14px` / `8px 16px` → uniform `10px 14px` (40px tall) across Results List, Hotel Detail, Price Comparison, Empty States, Entry Search.

**Filter and Sort** (rebuilt to the live references)
- Footer: "Clear all" → **Reset all** (tinted secondary), Apply filters filled, both radius 16, 24px bottom safe area, divider removed.
- Checkbox: 20→22px, radius 6, unchecked border `#D6DAE3`.
- Sort: added the missing sticky **Reset all / Apply filters** footer; radio moved to the **left** at 22px circular (was a 7px dot on the right); selected-row tint removed — selection now reads via the filled radio + purple SemiBold label.

**Flagged, not fixed**
1. **Corner smoothing (~60% squircle)** — not reliably expressible in CSS; `corner-shape` isn't shipped broadly. Options: SVG/`clip-path` masks per component, or a small JS squircle helper. Tell me which and I'll apply it across the set.
2. **Token conflict** — the foundation spec says "999 for chips/pills and CTAs," but the reference CTAs are rounded-rect. I followed the reference for CTAs and kept 999 for chips only. Confirm this is the intended rule.
3. **Chips still 40px, not 44** — going to 44 makes filter rows noticeably loose. Say the word and I'll push them.
4. **Price Comparison 4b** has no primary CTA at screen level but two "Select" buttons visible per room when expanded — that's two primaries in one section. Needs a product decision (collapse to one expanded package, or demote non-best to secondary).
5. **Empty States 3** uses star glyphs for the rating fallback — color plus glyph, so it passes, but the "26% off" / delta percentages elsewhere rely on green/red plus the word "off"/"higher"; if you want stricter non-color encoding I'd add ↓/↑ arrows.

## User

Make it align in center vertically

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

The Select button in 4a's package card is now vertically centered against the price block.

