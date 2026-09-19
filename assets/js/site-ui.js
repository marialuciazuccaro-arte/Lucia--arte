(function () {
  const header = document.querySelector('.site-header');
  const nav = header && header.querySelector('.main-nav');

  if (header && nav) {
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
      [/^archivio\.html$|^lavori-esame-|^lavoro\.html$/, 'archivio.html'],
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

    if (file === 'strumenti.html' && !document.getElementById('gestione-classe')) {
      const interactiveTitle = document.getElementById('interattiva-title');
      const interactiveSection = interactiveTitle && interactiveTitle.closest('.resource-section');

      if (interactiveSection) {
        const section = document.createElement('section');
        section.id = 'gestione-classe';
        section.className = 'resource-section';
        section.setAttribute('aria-labelledby', 'gestione-classe-title');
        section.innerHTML = `
          <div class="resource-section__head">
            <div>
              <p class="eyebrow">Organizzare l’aula</p>
              <h2 id="gestione-classe-title">Gestione della classe</h2>
            </div>
            <p>Strumenti pratici per organizzare spazi, posti e attività quotidiane in aula.</p>
          </div>
          <div class="resource-grid">
            <article class="resource-card resource-card--wide">
              <span class="resource-tag">Disposizione dei banchi</span>
              <span class="resource-preview">
                <span class="preview-fallback">Gynzy • Mappa dei posti e pianta dell’aula</span>
                <img src="assets/img/strumenti/gynzy-copertina.png"
                     alt="Gynzy: lavagna interattiva e gestione della classe, disposizione dei banchi"
                     loading="lazy">
              </span>
              <h3>Gynzy</h3>
              <p>Lavagna interattiva con strumenti per la gestione della classe. La funzione Classroom Seating Chart permette di creare la pianta dell’aula, trascinare e ruotare i banchi, assegnare i posti agli studenti, salvare più configurazioni e stamparle.</p>
              <div class="resource-links">
                <a class="resource-link" href="https://www.gynzy.com/" target="_blank" rel="noopener noreferrer">Apri Gynzy ↗</a>
                <a class="resource-link" href="https://www.gynzy.com/en/library/items/classroom-seating-chart" target="_blank" rel="noopener noreferrer">Mappa dei posti ↗</a>
              </div>
            </article>
          </div>
        `;
        interactiveSection.parentNode.insertBefore(section, interactiveSection);
      }
    }
  }

  const footerNav = document.querySelector('.site-footer nav');
  if (footerNav && !footerNav.querySelector('[data-area-docente]')) {
    const teacherLink = document.createElement('a');
    teacherLink.href = 'admin/';
    teacherLink.textContent = '🔒 Area docente';
    teacherLink.setAttribute('data-area-docente', 'true');
    teacherLink.setAttribute('aria-label', 'Apri l’Area docente');
    footerNav.appendChild(teacherLink);
  }
})();
