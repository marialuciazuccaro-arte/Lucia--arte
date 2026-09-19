(() => {
  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const page = document.getElementById('work-page');
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!page || !id) {
    if (page) page.innerHTML += '<div class="work-empty">Lavoro non specificato. <a href="archivio.html">Apri l’archivio</a>.</div>';
    return;
  }

  fetch('assets/data/lavori.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const works = Array.isArray(data) ? data : [];
      const item = works.find((work) => String(work.id) === id && work.published !== false);
      if (!item) throw new Error('not-found');

      const slides = Array.isArray(item.slides) ? item.slides.filter(Boolean) : [];
      const gallery = slides.length
        ? `<section class="work-gallery-section"><h2>Galleria dei lavori</h2><div class="work-gallery">${slides.map((src, index) => `<a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(item.title)} – elaborato ${index + 1}" loading="lazy"></a>`).join('')}</div></section>`
        : '';
      const canva = item.canvaUrl
        ? `<div class="work-actions"><a href="${esc(item.canvaUrl)}" target="_blank" rel="noopener noreferrer">Apri il materiale collegato ↗</a></div>`
        : '';

      document.title = `${item.title} – Arte e Immagine`;
      page.innerHTML = `
        <a class="work-back" href="archivio.html">← Torna all’archivio</a>
        <section class="work-hero">
          <div class="work-copy">
            <p class="work-meta">${esc(item.classLabel)} • ${esc(item.category)}</p>
            <h1>${esc(item.title)}</h1>
            <span class="short-line"></span>
            <p class="work-description">${esc(item.description || '')}</p>
            ${canva}
          </div>
          <figure class="work-cover"><img src="${esc(item.cover)}" alt="${esc(item.alt || item.title)}"></figure>
        </section>
        ${gallery}`;
    })
    .catch(() => {
      page.innerHTML = '<a class="work-back" href="archivio.html">← Torna all’archivio</a><div class="work-empty">Questo lavoro non è disponibile. Potrebbe essere stato spostato o temporaneamente nascosto.</div>';
    });
})();
