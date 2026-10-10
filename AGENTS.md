# Project architecture

- One Sama logo everywhere (user-approved global scope): `src/assets/sama-logo-white.png` is the white-background `SiteHeader` default, print-sheet logo, and source for favicon/app icons; the original black-background pointer and old `sama-logo-icon` pointer are unused backups kept so older deployments still resolve.
- The homepage social preview uses the dedicated 1200×630 `public/sama-social-preview.jpg`, keeping share metadata independent from visible page imagery and legacy OG artwork.
- Guide images with baked-in old branding are covered at render time by `GuideSectionHero` brand overlays (boxes in native-pixel percentages in `guideSectionHeroes[].brandBox`), never by editing the illustration pixels.
- The children’s experience is the source-preserved static package under `public/kids`; `/kids` redirects to its `index.html` so relative HTML navigation stays inside that package.
- Kids-world presentation uses an additive shared `public/kids/adventure-world.css` loaded after legacy styles; preserve original inline scripts and embedded media to avoid story and game regressions.
