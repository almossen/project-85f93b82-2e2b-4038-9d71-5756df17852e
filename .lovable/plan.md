# GA4 audit: t1d-ar.com (G-35NPPR99PF)

## What was found

Only one Measurement ID is in the project: `G-35NPPR99PF`. There is no Google Tag Manager container (GTM-...) and no hard-coded gtag snippet in any HTML head. There are two loaders.

| Loader | Where it is used | How it sends page_view |
|---|---|---|
| `src/lib/analytics.ts` | The React app, called from `src/routes/__root.tsx` lines 147-153 | `initAnalytics()` runs once with `send_page_view:false`. `trackPageView(pathname)` runs every time `pathname` changes. |
| `public/sama-analytics.js` | All 16 `public/teens/*.html` pages (line 15) and all 10 `public/kids/*.html` pages (`<script defer src="/sama-analytics.js">`) | Sends one manual page_view per HTML page load |

## Root cause: the React pages are never measured

`src/lib/analytics.ts` line 17:
```ts
if (!/^(www\\.)?t1d-ar\\.com$/.test(window.location.hostname)) return;
```
This regex is a literal, so `\\.` means "a backslash, then any character". It can never match `t1d-ar.com`. I tested it: `false` for `t1d-ar.com`, and `true` once the pattern uses a single `\.`.

So `initAnalytics()` stops before loading gtag. `window.gtag` is never created, and `trackPageView` exits silently. That is why `/`, the parents' pages, the guide, the tools and `/about` send nothing.

The static file `public/sama-analytics.js` line 2 uses the correct `\.`. That is why only `kids/*.html` and `teens/*.html` show up in GA4.

## Duplicate tags and route changes

- **Duplicate tags:** none. Each page has one loader. Kids and teens are separate full-page HTML documents with no React. Both loaders also skip loading if `#ga-gtag-script` already exists.
- **Page views on navigation:** the app uses TanStack Router, not React Router. The code is set up correctly to send page_view on each `pathname` change, but currently it sends nothing because of the bug above.
- **Once fixed:** the first page_view may run before `initAnalytics` in the same commit. Effects run in order (init first, then track), so the first view is sent and queued in dataLayer. No double count, because `send_page_view:false` is set.
- **Minor:** `page_title` is read during the route change, so it may sometimes be the previous page's title. This does not block reporting.

## Smallest safe fix (after approval)

1. In `src/lib/analytics.ts` line 17, change only the regex to `/^(www\.)?t1d-ar\.com$/`.
2. Add a small test in `src/lib/analytics.test.ts` that the regex accepts `t1d-ar.com` and `www.t1d-ar.com` and rejects `id-preview--...lovable.app`. This stops the bug coming back.
3. Do not touch `public/sama-analytics.js`, the kids/teens HTML or the Measurement ID.

## What can only be checked after you publish

The preview domain is deliberately excluded, so tracking can only be checked on the live site. Open GA4 Realtime or DebugView, visit `/`, then go to `/simplified-guide` without reloading. You should see two page_view events.

I will not publish.
