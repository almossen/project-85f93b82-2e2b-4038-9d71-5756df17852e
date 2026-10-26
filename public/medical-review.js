// Shared static-page adapter: shows a name-free review line linking to the About review section.
(async () => {
  const hosts = document.querySelectorAll('[data-sama-medical-review]');
  if (!hosts.length) return;
  try {
    const response = await fetch('/medical-review.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const review = await response.json();
    if (!['summary', 'anchor', 'reviewedOn', 'disclaimer'].every(key => typeof review[key] === 'string' && review[key].trim())) return;
    for (const host of hosts) {
      if (host.getAttribute('data-reviewed-revision') !== review.reviewedOn) continue;
      const title = document.createElement('strong');
      title.textContent = review.summary;
      const details = document.createElement('a');
      details.href = `/about#${review.anchor}`;
      details.textContent = 'تفاصيل المراجعة';
      const disclaimer = document.createElement('p');
      disclaimer.textContent = review.disclaimer;
      host.replaceChildren(title, document.createTextNode(' '), details, disclaimer);
    }
  } catch {
    // Preserve the educational disclaimer when offline; never invent attribution.
  }
})();
