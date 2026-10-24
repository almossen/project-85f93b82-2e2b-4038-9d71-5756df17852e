// Shared static-page adapter; canonical copy also imports into the React display.
(async () => {
  const hosts = document.querySelectorAll('[data-sama-medical-review]');
  if (!hosts.length) return;
  try {
    const response = await fetch('/medical-review.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const review = await response.json();
    if (!['heading', 'displayDate', 'reviewer', 'specialty', 'disclaimer'].every(key => typeof review[key] === 'string' && review[key].trim())) return;
    for (const host of hosts) {
      if (host.getAttribute('data-reviewed-revision') !== review.reviewedOn) continue;
      const title = document.createElement('strong');
      title.textContent = `${review.heading} · ${review.displayDate}`;
      const name = document.createElement('p');
      name.textContent = `${review.reviewer} — ${review.specialty}`;
      const details = document.createElement('a');
      details.href = '/about';
      details.textContent = 'تفاصيل المراجعة';
      const disclaimer = document.createElement('p');
      disclaimer.textContent = review.disclaimer;
      host.replaceChildren(title, name, details, disclaimer);
    }
  } catch {
    // Preserve the educational disclaimer when offline; never invent attribution.
  }
})();