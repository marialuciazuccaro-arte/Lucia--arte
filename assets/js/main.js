const quotes = [
  { text: "L’arte non riproduce ciò che è visibile, ma rende visibile ciò che non sempre lo è.", author: "Paul Klee" },
  { text: "Ogni bambino è un artista. Il problema è poi come rimanere artisti quando si cresce.", author: "Pablo Picasso" },
  { text: "Non dipingo ciò che vedo, ma ciò che ho visto.", author: "Edvard Munch" },
  { text: "Il colore è un mezzo per esercitare sull’anima un’influenza diretta.", author: "Vasilij Kandinskij" }
];
const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
const quote = quotes[dayIndex];
const quoteEl = document.getElementById('daily-quote');
const authorEl = document.getElementById('daily-author');
if (quoteEl && authorEl) {
  quoteEl.textContent = quote.text;
  authorEl.textContent = quote.author;
}
