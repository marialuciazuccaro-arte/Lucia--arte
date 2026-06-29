(() => {
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsHover || reducedMotion) return;

  document.querySelectorAll("[data-latest-slides]").forEach((visual) => {
    const slides = visual.dataset.latestSlides
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    if (slides.length < 2) return;

    const image = visual.querySelector(".latest-card__image");
    const counter = visual.querySelector(".latest-card__counter");
    let index = 0;
    let startTimer = null;
    let interval = null;
    let transitionTimer = null;
    let active = false;

    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };

    const show = (nextIndex) => {
      if (!active) return;

      index = nextIndex;
      const nextSrc = slides[index];
      preload(nextSrc);

      image.classList.add("is-fading");
      clearTimeout(transitionTimer);

      transitionTimer = window.setTimeout(() => {
        if (!active) return;
        image.src = nextSrc;
        image.alt = `Anteprima ${index + 1} di ${slides.length} della raccolta`;
        counter.textContent = `${index + 1}/${slides.length}`;
        image.classList.remove("is-fading");
        preload(slides[(index + 1) % slides.length]);
      }, 150);
    };

    const advance = () => show((index + 1) % slides.length);

    const start = () => {
      if (active) return;
      active = true;
      preload(slides[1]);

      startTimer = window.setTimeout(() => {
        advance();
        interval = window.setInterval(advance, 1150);
      }, 550);
    };

    const stop = () => {
      active = false;
      clearTimeout(startTimer);
      clearTimeout(transitionTimer);
      clearInterval(interval);
      index = 0;
      image.classList.remove("is-fading");
      image.src = slides[0];
      counter.textContent = `1/${slides.length}`;
    };

    visual.closest(".latest-card").addEventListener("mouseenter", start);
    visual.closest(".latest-card").addEventListener("mouseleave", stop);
  });
})();
