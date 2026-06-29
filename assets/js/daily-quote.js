(() => {
  const quotes = [
    {
      text: "L’arte non riproduce ciò che è visibile, ma rende visibile.",
      author: "Paul Klee",
      source: "https://archive.zpk.org/en/exhibitions/review/2017/paul-klee-make-visible-1414.html"
    },
    {
      text: "Ho scoperto che potevo dire con i colori e le forme cose per le quali non avevo parole.",
      author: "Georgia O’Keeffe",
      source: "https://www.okeeffemuseum.org/creative-activities-for-all-ages/"
    },
    {
      text: "Poiché non so cantare, dipingo.",
      author: "Georgia O’Keeffe",
      source: "https://access-ok.okeeffemuseum.org/in-her-words/"
    },
    {
      text: "Nulla è meno reale del realismo.",
      author: "Georgia O’Keeffe",
      source: "https://access-ok.okeeffemuseum.org/in-her-words/"
    },
    {
      text: "Un certo blu penetra nell’anima.",
      author: "Henri Matisse",
      source: "https://store.moma.org/products/henri-matisse-blue-quote-magnet"
    },
    {
      text: "Sogno un’arte di equilibrio, purezza e serenità.",
      author: "Henri Matisse",
      source: "https://www.moma.org/artists/3832-henri-matisse"
    },
    {
      text: "Le grandi cose non accadono solo per impulso: sono una successione di piccole cose messe insieme.",
      author: "Vincent van Gogh",
      source: "https://vangoghletters.org/vg/letters/let274/letter.html"
    },
    {
      text: "È importante cercare di sviluppare le proprie capacità di pensiero e di volontà.",
      author: "Vincent van Gogh",
      source: "https://vangoghletters.org/vg/letters/let274/letter.html"
    },
    {
      text: "La musica esprime la vita spirituale dell’artista e crea una vita propria dei suoni.",
      author: "Vassily Kandinsky",
      source: "https://www.centrepompidou.fr/fr/pompidou-plus/magazine/article/kandinsky-ou-la-musique-comme-systeme"
    },
    {
      text: "Sono del mio tempo.",
      author: "Honoré Daumier",
      source: "https://www.metmuseum.org/fr/art/collection/search/265276"
    },
    {
      text: "Non credo che qualcosa muoia davvero. Tutto ritorna, seguendo un movimento circolare.",
      author: "Keith Haring",
      source: "https://foundationblog.haring.com/news/i-dont-believe-anything-dies-it-all-goes-in-circles"
    },
    {
      text: "Il colore è una delle grandi cose che rendono la vita degna di essere vissuta.",
      author: "Georgia O’Keeffe",
      source: "https://www.okeeffemuseum.org/wp-content/uploads/2022/05/Teacher-Resources-for-Gallery-Experience.pdf"
    }
  ];

  const quoteCard = document.querySelector(".quote-card");
  const quoteText = document.getElementById("daily-quote");
  const quoteAuthor = document.getElementById("daily-author");
  const quoteSource = document.getElementById("daily-source");

  if (!quoteCard || !quoteText || !quoteAuthor || !quoteSource) return;

  const now = new Date();
  const localDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayNumber = Math.floor(localDay.getTime() / 86400000);
  const quote = quotes[((dayNumber % quotes.length) + quotes.length) % quotes.length];

  quoteCard.classList.add("is-loading");

  window.requestAnimationFrame(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
    quoteSource.href = quote.source;

    window.requestAnimationFrame(() => {
      quoteCard.classList.remove("is-loading");
    });
  });
})();
