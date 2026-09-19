(function () {
  const header = document.querySelector('.site-header');
  const nav = header && header.querySelector('.main-nav');
  if (!header || !nav) return;

  let search = header.querySelector('.icon-button');
  if (search && search.tagName.toLowerCase() !== 'a') {
    const link = document.createElement('a');
    link.className = search.className;
    link.href = 'cerca.html';
    link.setAttribute('aria-label', search.getAttribute('aria-label') || 'Cerca nel sito');
    link.textContent = search.textContent || '⌕';
    search.replaceWith(link);
    search = link;
  }

  if (!header.querySelector('.nav-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Apri il menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(toggle, search || null);

    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Apri il menu');
    };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1100) closeMenu(); });
  }

  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const sectionMap = [
    [/^esplora\.html$|^unita-/, 'esplora.html'],
    [/^laboratori\.html$|^laboratorio-/, 'laboratori.html'],
    [/^strumenti\.html$/, 'strumenti.html'],
    [/^mappe\.html$/, 'mappe.html'],
    [/^archivio\.html$|^lavori-esame-/, 'archivio.html'],
    [/^area-riservata\.html$/, 'area-riservata.html'],
    [/^chi-sono\.html$/, 'chi-sono.html']
  ];
  const match = sectionMap.find(([rx]) => rx.test(file));
  if (match) {
    const active = nav.querySelector(`a[href="${match[1]}"]`);
    if (active) {
      active.classList.add('is-active');
      active.setAttribute('aria-current', 'page');
    }
  }
})();
