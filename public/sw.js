/* سما — Service Worker
 * الهدف: عمل المنصة دون اتصال بعد أول زيارة،
 * وبالأخص صفحة الطوارئ «ماذا أفعل الآن؟».
 * الاستراتيجية:
 *  - الصفحات: network-first مع fallback للكاش.
 *  - الأصول المُبصَمة (/assets, /_build): cache-first.
 *  - الصور ذات الأسماء الثابتة: cache-first.
 *  - ملفات الصوت (mp3/wav): stale-while-revalidate — تعمل دون اتصال،
 *    وتتحدث في الخلفية حتى لا يبقى تسجيل قديم بعد استبدال الملفات
 *    على نفس المسار. لا precache لها: 46 ملفًا ≈ 37MB لا تُحمَّل مسبقًا.
 *  - الأصول ذات الأسماء الثابتة (favicon, icon-512, og-image, manifest):
 *    stale-while-revalidate حتى لا تبقى قديمة بعد الإصدارات.
 *
 * عند استبدال أي صوت أو أصل ثابت: ارفع رقم النسخة أدناه.
 * حذف النسخ القديمة يتم في حدث activate.
 */
const CACHE_NAME = "sama-cache-v3";
const CRITICAL_PAGES = ["/", "/what-to-do-now", "/simplified-guide"];

// أصول بأسماء ثابتة قد تتغير بين الإصدارات
const MUTABLE_NAMED_ASSETS = [
  "/favicon.png",
  "/icon-512.png",
  "/og-image.png",
  "/manifest.json",
];

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

function putInCache(req, res) {
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(CACHE_NAME).then((c) => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // نفس النطاق فقط

  const isNamedMutable = MUTABLE_NAMED_ASSETS.includes(url.pathname);
  const isHashedAsset =
    url.pathname.startsWith("/_build/") ||
    url.pathname.startsWith("/assets/") ||
    /\.(js|css|woff2?)$/.test(url.pathname);
  const isAudioAsset = /\.(mp3|wav)$/.test(url.pathname);
  const isMediaAsset = /\.(webp|png|jpg|jpeg|svg)$/.test(url.pathname);

  if (isNamedMutable || isAudioAsset) {
    // stale-while-revalidate: نعرض النسخة المخزنة ونحدثها في الخلفية
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => putInCache(req, res))
          .catch(() => cached);
        return cached || network;
      }),
    );
  } else if (isHashedAsset || isMediaAsset) {
    // cache-first: أسماء مُبصَمة أو وسائط لا تتغير
    event.respondWith(
      caches
        .match(req)
        .then((cached) => cached || fetch(req).then((res) => putInCache(req, res))),
    );
  } else {
    // network-first للصفحات: أحدث نسخة عند توفر الشبكة،
    // ونسخة الكاش عند انقطاعها (وضع الطوارئ)
    event.respondWith(
      fetch(req)
        .then((res) => putInCache(req, res))
        .catch(() =>
          caches
            .match(req)
            .then((cached) => cached || caches.match("/what-to-do-now"))
            .then((fallback) => fallback || Response.error()),
        ),
    );
  }
});
