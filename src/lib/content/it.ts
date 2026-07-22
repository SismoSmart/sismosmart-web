import type { SiteCopy } from "@/lib/site";

export const itCopy: SiteCopy = {
  accessibility: { skipToContent: "Vai al contenuto" },
  meta: {
    title: "Monitoraggio sismico per il tuo edificio",
    description:
      "SismoSmart è un piccolo dispositivo di monitoraggio sismico da montare a parete. Misura come si muove il tuo edificio e avvisa il telefono quando la scossa è seria. Un ingegnere può leggere la registrazione dopo.",
  },
  navigation: {
    eyebrow: "Monitoraggio sismico per edifici",
    primaryCta: "Domanda pilota",
    links: [
      { label: "Tecnologia", href: "/technology" },
      { label: "Prodotto", href: "/product" },
      { label: "Pilota", href: "/pilot-program" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  hero: {
    badge: "Startup hardware in fase iniziale",
    title: "Come si è mosso il tuo edificio durante il terremoto? Abbiamo costruito un dispositivo che lo misura.",
    description:
      "SismoSmart si collega a una presa e si fissa alla parete. Misura di continuo il movimento dell'edificio e avvisa il telefono quando la scossa è seria. Il suo lavoro vero è la registrazione che conserva: quando arriva l'ingegnere, può leggere come si è comportato l'edificio in quel momento.",
    primaryCta: "Candidati al pilota",
    secondaryCta: "Nota per investitori",
    tertiaryCta: "Vedi la tecnologia",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montaggio", value: "Fisso a parete" },
      { label: "Rilevamento", value: "Nel dispositivo" },
      { label: "Campionamento", value: "250 Hz, 3 assi" },
      { label: "Ponte di energia", value: "30-60 s supercap" },
    ],
    deviceEyebrow: "Il dispositivo SismoSmart",
    deviceTitle: "100 × 100 mm. Si fissa alla parete e funziona dalla presa.",
    deviceDescription:
      "Lo attacchi al muro e lo colleghi alla presa. Lo abbini dall'app e gli dai il Wi-Fi. Da lì in poi lavora sullo sfondo: inizia a misurare la vibrazione dell'edificio e in una giornata normale non ti accorgi che c'è.",
    deviceSpecs: ["Misura del movimento su tre assi", "Registrazione locale durante gli eventi", "Dati Wi-Fi cifrati"],
    meterTopLabel: "Rilevamento",
    meterTopValue: "Nel dispositivo",
    meterBottomLabel: "Dati",
    meterBottomValue: "Cifrati",
    imageAlt: "Dispositivo SismoSmart di monitoraggio sismico con LED di stato",
  },
  trust: {
    eyebrow: "La nostra posizione",
    title: "Ci sono cose che questo dispositivo non sa fare.",
    description:
      "SismoSmart è ancora in fase pilota. Quello che fa è registrare cosa succede dentro il tuo edificio e trasformarlo in un dato che puoi rivedere dopo. Non gareggiamo con i sistemi ufficiali di allerta né con l'ispezione strutturale che segue il terremoto. Entrambi restano al loro posto. Noi copriamo lo spazio che rimane in mezzo.",
    items: [
      { label: "Fase", value: "Pilota" },
      { label: "Compito", value: "Registrare movimento" },
      { label: "Decisione strutturale", value: "Resta all'ingegnere" },
    ],
  },
  howItWorks: {
    eyebrow: "Come funziona",
    title: "L'installazione richiede pochi minuti, il resto avviene sullo sfondo.",
    description:
      "Una volta montato non devi più fare nulla. Passa i primi giorni a imparare il profilo di vibrazione normale dell'edificio, e dopo riesce a distinguere ciò che normale non è.",
    steps: [
      { title: "Montalo a parete", description: "Scegli una parete interna stabile. L'adesivo è già applicato e ci sono i fori per le viti se preferisci fissarlo meglio." },
      { title: "Abbinalo dall'app", description: "L'app trova il dispositivo via Bluetooth. Inserisci la password del Wi-Fi una volta sola e hai finito." },
      { title: "Impara l'edificio", description: "Per qualche giorno il dispositivo ascolta la vibrazione normale. Impara cosa succede quando passa un camion e cosa succede in una giornata di vento. Può riconoscere l'anomalia solo dopo aver conosciuto la normalità." },
      { title: "Avvisa quando inizia la scossa", description: "Quando rileva una vibrazione seria, arriva una notifica sul telefono. Se altri dispositivi vicini hanno visto la stessa scossa, l'avviso arriva marcato come confermato." },
      { title: "Registra l'evento", description: "I dati grezzi di durante e dopo la scossa restano sul dispositivo e vanno nel cloud. Da quella registrazione un ingegnere può leggere come ha risposto l'edificio." },
      { title: "Più dispositivi, risultati migliori", description: "Con più dispositivi nello stesso edificio si vede come si muovono i piani l'uno rispetto all'altro. Con più dispositivi nello stesso quartiere calano i falsi allarmi." },
    ],
  },
  features: {
    eyebrow: "Cosa fa",
    title: "In realtà fa più lavori diversi nello stesso momento.",
    description:
      "Avvisarti durante il terremoto è solo uno di questi. La parte di valore sta prima e dopo: segue la salute dell'edificio per mesi e registra cosa è successo mentre il terreno si muoveva.",
    items: [
      { accent: "01", title: "Rileva le scosse", description: "Un sensore MEMS sensibile legge la vibrazione del suolo 250 volte al secondo. Abbastanza fine da distinguere un camion di passaggio da una scossa vera." },
      { accent: "02", title: "Avvisa il telefono", description: "Quando rileva una scossa parte una notifica push. Dice cosa fare: abbassati, copriti, tieniti." },
      { accent: "03", title: "Segue la salute dell'edificio", description: "Ogni edificio ha una frequenza naturale. Il dispositivo la segue, insieme allo smorzamento, per mesi. Uno spostamento inatteso può essere il primo segnale di un problema strutturale." },
      { accent: "04", title: "Crea un report dopo il terremoto", description: "Accelerazione di picco, durata e risposta dell'edificio finiscono in un unico report. L'ingegnere arriva con un punto di partenza." },
      { accent: "05", title: "Legge anche temperatura e umidità", description: "Un edificio non si comporta d'inverno come d'estate. Senza dati ambientali non riesci a separare quella deriva stagionale da un danno reale." },
      { accent: "06", title: "Più forte insieme", description: "Ogni dispositivo del quartiere alimenta il segnale comune. Più dispositivi ci sono, più veloce è la conferma e più rari sono i falsi allarmi." },
    ],
  },
  demo: {
    eyebrow: "Flusso dati",
    title: "La misura parte dal dispositivo e finisce sul tuo telefono.",
    description:
      "Il dispositivo misura, cifra e invia. L'app trasforma tutto in qualcosa di leggibile: il dispositivo è vivo, qual è stato l'ultimo evento, in che direzione sta andando il tuo edificio.",
    previewLabel: "Registro edificio",
    networkLabel: "Rete di quartiere",
    sensorLabel: "Dispositivo",
    sensorValue: "Attivo",
    eventLabel: "Ultimo evento",
    eventValue: "Registrato, rivedibile",
    bullets: [
      "Il sensore MEMS fisso ha un rumore di fondo di 22 µg. Un telefono sta intorno ai 2.000 µg. La differenza è di circa cento volte.",
      "Puoi vedere i dati di vibrazione del tuo edificio senza consegnare informazioni personali.",
      "Il dispositivo non decide al posto dell'ingegnere. Gli dà dati migliori.",
    ],
    cta: "Vedi la tecnologia",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Percorso pilota",
    title: "Vogliamo prima provarlo in pochi edifici veri.",
    description:
      "Prima di far crescere il prodotto vogliamo vederlo sul campo. Il feedback dei primi pilota deciderà com'è il dispositivo finito. Per ora parliamo con tre gruppi.",
    cards: [
      { title: "Appartamenti", description: "Un dispositivo in qualche appartamento e uno nelle aree comuni. Ci accordiamo con l'amministratore e installiamo gratis per sei mesi.", highlight: "Pilota gratuito" },
      { title: "Campus e fabbriche", description: "Strutture con più di un edificio. Un dispositivo per edificio, tutti visibili da un'unica dashboard.", highlight: "Aziendale" },
      { title: "Università", description: "Condividiamo dati con i dipartimenti di ingegneria sismica. I ricercatori accedono a dati anonimi e noi riceviamo feedback accademico.", highlight: "Collaborazione accademica" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    description: "Se la tua domanda è qui, c'è anche la risposta. Se non c'è, scrivi a info@sismosmart.com e ti rispondiamo. L'elenco completo è nella pagina FAQ.",
    items: [
      { title: "Mi avvisa prima di un terremoto?", description: "Parliamo di secondi, non di minuti. Se il terremoto arriva da lontano, il dispositivo può cogliere l'onda P e avvisarti prima che arrivi l'onda S distruttiva. Se l'epicentro è vicino, quel margine si riduce quasi a zero. Non lo vendiamo come sistema di allerta precoce, perché non funziona per ogni terremoto." },
      { title: "Che differenza c'è con gli avvisi di Google?", description: "Google usa l'accelerometro dei telefoni. È gratis, ce l'hanno tutti e funziona bene. Ma quello che misura è l'origine del terremoto, non il tuo edificio. Noi facciamo l'opposto: come vibra il tuo edificio, come cambia con le stagioni, in che stato resta dopo il terremoto. A queste domande un telefono non risponde." },
      { title: "Un dispositivo può dirmi se il mio edificio è sicuro?", description: "Non può. Chi dichiara un edificio sicuro o non sicuro è un ingegnere, non un apparecchio. Quello che fa il dispositivo è lasciare a quell'ingegnere qualcosa di solido su cui lavorare." },
      { title: "L'installazione è difficile?", description: "Colleghi il cavo USB-C alla presa, attacchi il dispositivo al muro con l'adesivo sul retro e lo abbini dall'app. Niente trapano e niente tecnico. Cinque minuti." },
      { title: "Cosa succede se manca corrente o internet?", description: "Se salta internet, il dispositivo continua a misurare, salva l'evento nella propria memoria e lo carica quando la connessione torna. Se salta la corrente, il supercondensatore gli dà 30-60 secondi di energia ponte, abbastanza per mandare l'ultimo evento nel cloud. Se il blackout dura di più, si spegne." },
      { title: "Quando arriva sul mercato?", description: "I pilota partono nell'estate 2026 e puntiamo alla vendita ampia entro fine 2026. Certificazione e produzione possono spostare la data. Se ti iscrivi alla newsletter la saprai per primo." },
    ],
  },
  newsletter: {
    eyebrow: "Contattaci",
    title: "Parliamone prima del lancio.",
    description:
      "Se sei un amministratore di condominio che vuole un pilota, un investitore o qualcuno di un'organizzazione partner, raccontaci in breve cosa cerchi. Ti mettiamo in contatto con la persona giusta.",
    inputLabel: "Email",
    placeholder: "tu@azienda.com",
    button: "Invia",
    consent: "Accetto di ricevere email su lancio, pilota e notizie per investitori SismoSmart.",
    note: "Usiamo la tua email solo per questo.",
    loading: "Invio...",
    success: "Il tuo messaggio è arrivato. Ti rispondiamo a breve.",
    error: "Qualcosa non ha funzionato. Riprova.",
    missingEndpoint: "Il form non è ancora collegato. Puoi scrivere a info@sismosmart.com.",
    rateLimited:
      "Troppi tentativi. Riprova tra qualche minuto.",
  },
  footer: {
    legal: "© 2026 SismoSmart. Tutti i diritti riservati.",
  },
};
