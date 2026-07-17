/* سما — Service Worker
 * الهدف: عمل المنصة دون اتصال بعد أول زيارة،
 * وبالأخص صفحة الطوارئ «ماذا أفعل الآن؟».
 * الاستراتيجية: network-first للصفحات، cache-first للأصول الثابتة.
 */
const CACHE_NAME = "sama-cache-v1";
const CRITICAL_PAGES = ["/", "/what-to-do-now", "/simplified-guide"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CRITICAL_PAGES).catch(() => {}))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // نفس النطاق فقط

  const isStaticAsset =
    /\.(js|css|webp|png|jpg|svg|mp3|wav|woff2?)$/.test(url.pathname) ||
    url.pathname.startsWith("/_build/") ||
    url.pathname.startsWith("/assets/");

  if (isStaticAsset) {
    // cache-first: الأصول الثابتة لا تتغير بين النشرات
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
  } else {
    // network-first للصفحات: أحدث نسخة عند توفر الشبكة،
    // ونسخة الكاش عند انقطاعها (وضع الطوارئ)
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((cached) => cached || caches.match("/what-to-do-now"))
            .then((fallback) => fallback || Response.error()),
        ),
    );
  }
});
