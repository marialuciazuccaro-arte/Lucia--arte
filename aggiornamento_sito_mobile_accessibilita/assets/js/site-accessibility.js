(() => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");
  const main = document.querySelector("main");

  if (main) {
    if (!main.id) main.id = "contenuto-principale";
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = `#${main.id}`;
    skipLink.textContent = "Salta al contenuto";
    document.body.prepend(skipLink);
  }

  if (header && nav) {
    nav.id = "navigazione-principale";
    nav.setAttribute("aria-label", "Navigazione principale");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((link) => {
      const destination = (link.getAttribute("href") || "").split("#")[0];
      if (destination === currentPage) link.setAttribute("aria-current", "page");
    });

    let menuButton = header.querySelector(".menu-toggle");
    if (!menuButton) {
      menuButton = document.createElement("button");
      menuButton.className = "menu-toggle";
      menuButton.type = "button";
      menuButton.innerHTML = '<span aria-hidden="true" class="menu-toggle__icon"></span><span class="menu-toggle__label">Menu</span>';
      header.append(menuButton);
    }
    menuButton.setAttribute("aria-controls", nav.id);
    menuButton.setAttribute("aria-expanded", "false");

    const closeMenu = () => {
      header.classList.remove("menu-is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);
  }

  document.querySelectorAll(".socials").forEach((socials) => socials.remove());
  document.querySelectorAll(".footer-rights").forEach((rights) => rights.remove());
  document.querySelectorAll(".footer-project").forEach((project) => {
    project.textContent = "Progetto didattico di Arte e Immagine a cura della docente Maria Lucia Zuccaro — I.C. Piero Angela, Roma.";
  });
})();
