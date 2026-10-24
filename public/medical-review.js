// Shared static-page adapter; canonical copy also imports into the React display.
(async () => {
  const hosts = document.querySelectorAll('[data-sama-medical-review]');
  if (!hosts.length) return;
  try {
    const response = await fetch('/medical-review.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const review = await response.json();
    for (const host of hosts) {
      const title = document.createElement('strong');
      title.textContent = `${review.heading} · ${review.displayDate}`;
      const name = document.createElement('p');
      name.textContent = `${review.reviewer} — ${review.specialty}`;
      const scope = document.createElement('p');
      scope.textContent = review.scope;
      const limits = document.createElement('p');
      limits.textContent = review.futureChanges;
      const disclaimer = document.createElement('p');
      disclaimer.textContent = review.disclaimer;
      host.replaceChildren(title, name, scope, limits, disclaimer);
    }
  } catch {
    // Preserve the educational disclaimer when offline; never invent attribution.
  }
})();