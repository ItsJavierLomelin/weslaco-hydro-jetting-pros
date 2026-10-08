# Webflow Plumbry Site Template

One Astro template for every single-city home-services site. All city-specific
copy lives in one data file per city. Layout, design, components and page
structure are shared and never edited per city.

Design direction follows the "Plumbry" Webflow marketplace template the user
picked (blue hero with white type, yellow pill buttons, Manrope, service cards
with "Read more" links, about split with a stat badge, feature strip, FAQ
accordion). All code here is original Astro/CSS/JS: no Webflow markup,
scripts, assets, watermarks or promotion badges. Animations (scroll reveals,
pointer parallax on the circle decorations, count-up stats, accordion, hover
zooms) are recreated with our own CSS and `src/scripts/fx.js`, and all respect
`prefers-reduced-motion`. The original template's reviews, team, pricing and
appointment/ecommerce pieces are intentionally not recreated: invented
reviews, people and price content are banned by the copy rules.

## How a new city gets built

1. Duplicate `src/data/cities/_placeholder.json` as `src/data/cities/<city-slug>.json`
   (example: `dayton-oh.json`).
2. Fill every slot with that city's unique copy. `riverside-oh.json` is a filled
   reference from the hydro build - copy its shape, not its words.
3. Set `ACTIVE_CITY` in `city.config.mjs` (root) to the new slug. That is the
   only code edit per city. The template repo itself keeps
   `ACTIVE_CITY = '_placeholder'` so the preview shows the variable slots.
4. Build: `npm install && npm run build`.
   For a GitHub Pages preview: `BASE=/<repo-name> npm run build`.

## Tokens in the placeholder file

The GitHub Pages preview builds `_placeholder.json`, so the slots show as
literal variables: {Biz Name}, {Main Service}, {City, ST}, {Service One}
through {Service Three}, {Location One} through {Location Three}, {Guide One}
and {Guide Two}. Riverside (`riverside-oh.json`) stays in the repo as the
filled example.

## What the slots are

- `site` - city, state, brand, domain, phone, tracker ID, niche. Phone is
  single-sourced here: swapping a renting plumber's number is one edit.
- `ui` - eyebrow, status strip, form band, callout, form success wording.
- `home` - homepage headline, intro, four sections, FAQs, steps, band and
  dispatch card copy.
- `services` / `guides` - page lists. `name` is the full page name,
  `shortName` + `note` feed the neighborhood service cards. Add or remove
  entries freely; the nav, hubs, sitemap and cards follow the data.
- `pages` - full copy per service/guide slug, plus `privacy` and `terms`.
- `indexPages` - hub pages (services, guides, neighborhoods, contact).
- `neighborhoods` - one entry per local area page: hero, body sections,
  planning steps, map embed, FAQs, closing CTA, plus `intro` for the hub card.

## Copy rules for whoever fills a data file

These come from the checklist and Javier's standing style rules:

- Every prose slot holds genuinely city-specific copy. Never a sentence with
  the city name swapped in. One supportable local angle threaded through hero,
  sections and FAQs.
- No em dashes anywhere, including data file copy.
- No cost or price content. No invented facts: no years in business, licenses,
  reviews, jobs completed, guarantees or stats without a source.
- Permits: mention them only if research on this specific service in this city
  shows one is required. If not, or if you cannot confirm, leave permits out.
- Outbound links sit inside a sentence, wrap words already in it, open in a new
  tab, and point at authority sources (city, county, utility, EPA, gov/edu).
  Never competitors or price sources.
- Never say the site is lead gen or that calls are routed.
- Satellite sites never mention their main city.
- No placeholder lines left in launch copy (privacy/terms must be final).

## Notes

- The hero carries the request form on every page (Javier's standing
  layout), so the shared form band is disabled sitewide. Neighborhood pages
  keep the photo hero with the form in its own column beside it.
- Previews ship `noindex`; canonical and schema point at the planned domain
  from `site.origin`.
- Desktop nav dropdowns open on hover (CSS `:hover`/`:focus-within`); mobile
  uses the tap menu. Do not regress this to click-only.
- GA4: `site.ga4MeasurementId` is held in the data file; previews do not emit
  a GA4 tag. Add the tag at launch when the real ID exists.
- Images live in `public/images/library` and are shared across cities; add
  only non-city-specific images.
