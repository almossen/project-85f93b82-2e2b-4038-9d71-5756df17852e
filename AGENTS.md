# Project architecture

- One Sama logo everywhere (user-approved global scope): `src/assets/sama-logo-white.png` is the white-background `SiteHeader` default, print-sheet logo, and source for favicon/app icons/OG card; the original black-background pointer and old `sama-logo-icon` pointer are unused backups kept so older deployments still resolve.
- Guide images with baked-in old branding are covered at render time by `GuideSectionHero` brand overlays (boxes in native-pixel percentages in `guideSectionHeroes[].brandBox`), never by editing the illustration pixels.
