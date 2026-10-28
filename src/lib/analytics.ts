// Google Analytics (GA4) — تحميل التاج مرة واحدة فقط على مستوى التطبيق.
// لا تُرسل أي بيانات شخصية أو صحية — فقط مسار الصفحة.

export const GA_MEASUREMENT_ID = "G-35NPPR99PF";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_HOST_PATTERN = /^(www\.)?t1d-ar\.com$/;

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  if (!GA_HOST_PATTERN.test(window.location.hostname)) return;
  if (document.getElementById("ga-gtag-script")) {
    initialized = true;
    return;
  }
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.id = "ga-gtag-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  // نعطّل إرسال page_view التلقائي ونتولّاه يدوياً مع تنقّل الراوتر
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
