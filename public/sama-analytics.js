(function () {
  if (!/^(www\.)?t1d-ar\.com$/.test(location.hostname)) return;
  if (document.getElementById('ga-gtag-script')) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-35NPPR99PF', {send_page_view: false});
  gtag('event', 'page_view', {
    send_to: 'G-35NPPR99PF',
    page_path: location.pathname,
    page_location: location.origin + location.pathname,
    page_title: document.title
  });
  var script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-35NPPR99PF';
  document.head.appendChild(script);
})();
