# Verifica tecnica privacy – snapshot del 30 giugno 2026

## Esito sintetico

La copia corrente del sito non contiene nomi di studenti nei file HTML o nei nomi dei file. Non sono stati rilevati volti di studenti nelle immagini pubblicate. Le immagini degli elaborati non contengono metadati GPS o dati EXIF personali; gli unici metadati EXIF individuati appartenevano ad alcune icone e riguardavano esclusivamente risoluzione/orientamento.

## Correzioni applicate in questa copia

- oscurato il nome manoscritto presente sul bordo nero dell'immagine `galleria-02-gigli.jpg`;
- eliminati due file duplicati e non utilizzati: `galleria-03-gigli-variante.jpg` e `galleria-11-drago-rosa-variante.jpg`;
- creato `privacy.html` e collegato il footer di tutte le pagine;
- aggiunto `noimageindex` alle principali pagine contenenti elaborati degli studenti;
- creato `robots.txt` per scoraggiare la scansione diretta delle cartelle delle gallerie;
- aggiunto `referrerpolicy="no-referrer"` all'iframe Genially.

## Aspetti ancora da confermare con Dirigente e DPO/RPD

- titolare del trattamento e contatti del RPD/DPO;
- base giuridica della pubblicazione;
- testo e validità delle autorizzazioni alla pubblicazione degli elaborati;
- durata della pubblicazione e procedura di revoca/rimozione;
- eventuale necessità di consenso per i servizi esterni incorporati.

## Rischi residui

- le pagine indicano ancora classe, sezione, anno scolastico e istituto: non sono dati identificativi diretti, ma possono facilitare l'identificazione all'interno della comunità scolastica;
- GitHub, Google Fonts, WordPress mShots e Genially ricevono richieste tecniche dal browser;
- la cronologia Git non è inclusa nel file ZIP scaricato da GitHub e non è stata verificata: le vecchie versioni con nomi o immagini potrebbero ancora essere presenti nei commit precedenti;
- i collegamenti esterni a Canva e Google Drive vanno controllati separatamente, perché il loro contenuto non è contenuto nel repository.

## Valutazione tecnica

Il sito corrente presenta un rischio privacy diretto contenuto, perché le gallerie sono sostanzialmente anonime e non mostrano volti. Non può però essere definito pienamente conforme finché non vengono completati l'informativa istituzionale, la verifica delle autorizzazioni e la gestione della cronologia del repository.
