# Project architecture

- Family-tools topic grouping and contextual presentation of `DeepDiveEnrichment` live in the family-tools route; keep the reusable tool component and downloadable originals unchanged to preserve existing functions and printing.

- One Sama logo everywhere (user-approved global scope): `src/assets/sama-logo-white.png` is the white-background `SiteHeader` default, print-sheet logo, and source for favicon/app icons; the original black-background pointer and old `sama-logo-icon` pointer are unused backups kept so older deployments still resolve.
- The homepage social preview uses the dedicated 1200×630 `public/sama-social-preview.jpg`, keeping share metadata independent from visible page imagery and legacy OG artwork.
- Guide images with baked-in old branding are covered at render time by `GuideSectionHero` brand overlays (boxes in native-pixel percentages in `guideSectionHeroes[].brandBox`), never by editing the illustration pixels.
- The children’s experience is the source-preserved static package under `public/kids`; `/kids` redirects to its `index.html` so relative HTML navigation stays inside that package.
- Kids-world presentation uses `public/kids/adventure-world.css` as the canonical source, embedded verbatim in the final head style of all ten HTML pages; sync every embedded copy when it changes to avoid external stylesheet loading failures, and preserve original scripts and embedded media.
- Lesson supplementary blocks are declared in the guide section's `closing` field, with optional paragraph position and link hash, and rendered by `ClosingBlock` inside the print scope; keeping copy and placement in data preserves consistent single-lesson, continuous-reading and print output.
- The diabetes-bag lesson renders its original downloadable infographic and preview after its checklist in `SectionCard`; keep these separate from the lesson print scope so both reading modes share the download without altering other print functions.

- Medical review metadata and attribution limits have one canonical source in `public/medical-review.json`, consumed by React variants and a static-page DOM adapter; keep original kids/teens scripts and media untouched. In the static kids/teens pages the review block belongs in the page footer, not the top of the document (teens additionally keep a print-only copy because their footer is print-hidden). Attribution fails closed and requires an explicit reviewed-snapshot date at each current-content call site; later changed content must not reuse that declaration without independent review.
