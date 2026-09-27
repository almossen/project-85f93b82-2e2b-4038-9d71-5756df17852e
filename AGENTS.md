# Project architecture

- One Sama logo everywhere (user-approved global scope): `src/assets/sama-home-logo-original.png.asset.json` is the `SiteHeader` default, print-sheet logo, and source for favicon/app icons/OG card; the old `sama-logo-icon` pointer is an unused backup kept so older deployments still resolve.
- Guide images with baked-in old branding are covered at render time by `GuideSectionHero` brand overlays (boxes in native-pixel percentages in `guideSectionHeroes[].brandBox`), never by editing the illustration pixels.
