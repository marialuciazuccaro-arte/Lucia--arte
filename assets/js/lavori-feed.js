(() => {
  const DATA_URL = 'assets/data/lavori.json';

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const assetUrl = (value) => {
    const src = String(value ?? '').trim();
    if (!src) return '';
    if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:')) return src;
    return src.replace(/^\/(?:Lucia--arte\/)?/, '');
  };

  const workUrl = (item) => item.url || `lavoro.html?id=${encodeURIComponent(item.id || '')}`;

  const homeCard = (item) => {
    const rawSlides = Array.isArray(item.slides) && item.slides.length ? item.slides : [item.cover];
    const slides = rawSlides.map(assetUrl).filter(Boolean);
    const cover = assetUrl(item.cover);
    const slideAttr = esc(slides.join('|'));
    const counter = slides.length > 1 ? `<span class="latest-card__counter" aria-hidden="true">1/${slides.length}</span>` : '';
    const hint = slides.length > 1 ? '<span class="latest-card__hint">Passa il mouse per vedere i lavori</span>' : '';
    return `
      <a class="latest-card" href="${esc(workUrl(item))}">
        <span class="latest-card__visual" data-latest-slides="${slideAttr}">
          <img class="latest-card__image" src="${esc(cover)}" alt="${esc(item.alt || item.title)}">
          ${hint}${counter}
        </span>
        <span class="latest-card__copy">
          <small>${esc(item.classLabel)} • ${esc(item.category)}</small>
          <strong>${esc(item.title)}</strong>
          <span>Apri la raccolta →</span>
        </span>
      </a>`;
  };

  const archiveCard = (item) => {
    const cover = assetUrl(item.cover);
    return `
    <a class="archive-work-card" href="${esc(workUrl(item))}">
      <span class="archive-work-card__visual"><img src="${esc(cover)}" alt="${esc(item.alt || item.title)}"></span>
      <span class="archive-work-card__copy">
        <small>${esc(item.classLabel)} • ${esc(item.category)}</small>
        <strong>${esc(item.title)}</strong>
        <span class="archive-work-card__description">${esc(item.description || '')}</span>
        <span class="archive-work-card__link">Apri la raccolta →</span>
      </span>
    </a>`;
  };

  const setupRotation = () => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsHover || reducedMotion) return;
    document.querySelectorAll('[data-latest-slides]').forEach((visual) => {
      const slides = visual.dataset.latestSlides.split('|').map((s) => s.trim()).filter(Boolean);
      if (slides.length < 2) return;
      const image = visual.querySelector('.latest-card__image');
      const counter = visual.querySelector('.latest-card__counter');
      const card = visual.closest('.latest-card');
      if (!image || !counter || !card) return;
      let index = 0, startTimer = null, interval = null, transitionTimer = null, active = false;
      const preload = (src) => { const img = new Image(); img.src = src; };
      const show = (nextIndex) => {
        if (!active) return;
        index = nextIndex;
        const nextSrc = slides[index];
        preload(nextSrc);
        image.classList.add('is-fading');
        clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(() => {
          if (!active) return;
          image.src = nextSrc;
          image.alt = `Anteprima ${index + 1} di ${slides.length} della raccolta`;
          counter.textContent = `${index + 1}/${slides.length}`;
          image.classList.remove('is-fading');
          preload(slides[(index + 1) % slides.length]);
        }, 150);
      };
      const advance = () => show((index + 1) % slides.length);
      const start = () => {
        if (active) return;
        active = true;
        preload(slides[1]);
        startTimer = window.setTimeout(() => { advance(); interval = window.setInterval(advance, 1150); }, 550);
      };
      const stop = () => {
        active = false;
        clearTimeout(startTimer); clearTimeout(transitionTimer); clearInterval(interval);
        index = 0; image.classList.remove('is-fading'); image.src = slides[0]; counter.textContent = `1/${slides.length}`;
      };
      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
    });
  };

  fetch(DATA_URL, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const works = (Array.isArray(data) ? data : []).filter((item) => item.published !== false);
      const home = document.getElementById('latest-work-grid');
      const homeWorks = works.filter((item) => item.homeEligible !== false).slice(0, 4);
      if (home && homeWorks.length) {
        home.innerHTML = homeWorks.map(homeCard).join('');
        setupRotation();
      }
      const archive = document.getElementById('archive-work-grid');
      if (archive && works.length) archive.innerHTML = works.map(archiveCard).join('');
    })
    .catch((error) => console.warn('Impossibile caricare l’elenco lavori:', error));
})();