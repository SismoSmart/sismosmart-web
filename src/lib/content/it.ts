import type { SiteCopy } from "@/lib/site";

export const itCopy: SiteCopy = {
  accessibility: { skipToContent: "Vai al contenuto" },
  meta: {
    title: "Monitoraggio sismico per il tuo edificio",
    description:
      "SismoSmart è un monitor sismico per edifici in fase pre-lancio, progettato per registrare il movimento durante una scossa e fornire dati alla revisione successiva di tecnici qualificati.",
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
      "SismoSmart è un dispositivo a parete in fase pre-lancio, progettato per misurare e registrare il movimento dell'edificio. Rilevamento, notifiche, connettività e prestazioni restano soggetti a validazione pilota.",
    primaryCta: "Candidati al pilota",
    secondaryCta: "Nota per investitori",
    tertiaryCta: "Vedi la tecnologia",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montaggio", value: "Fisso a parete" },
      { label: "Rilevamento", value: "Nel dispositivo" },
      { label: "Target campionamento", value: "250 Hz, 3 assi" },
      { label: "Target energia", value: "30-60 s supercap" },
    ],
    deviceEyebrow: "Il dispositivo SismoSmart",
    deviceTitle: "100 × 100 mm. Si fissa alla parete e funziona dalla presa.",
    deviceDescription:
      "Lo attacchi al muro e lo colleghi alla presa. Lo abbini dall'app e gli dai il Wi-Fi. Da lì in poi lavora sullo sfondo: inizia a misurare la vibrazione dell'edificio e in una giornata normale non ti accorgi che c'è.",
    deviceSpecs: ["Target di misura su tre assi", "Target di registrazione locale", "Target di cifratura dei dati del dispositivo"],
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
      "La calibrazione pilota mira a imparare il profilo di vibrazione normale dell'edificio e a verificare se i movimenti insoliti possono essere separati dal rumore quotidiano. Restano possibili falsi positivi ed eventi mancati.",
    steps: [
      { title: "Montalo a parete", description: "Scegli una parete interna stabile. L'adesivo è già applicato e ci sono i fori per le viti se preferisci fissarlo meglio." },
      { title: "Abbinalo dall'app", description: "L'app trova il dispositivo via Bluetooth. Inserisci la password del Wi-Fi una volta sola e hai finito." },
      { title: "Impara l'edificio", description: "Per qualche giorno il dispositivo ascolta la vibrazione normale. Impara cosa succede quando passa un camion e cosa succede in una giornata di vento. Può riconoscere l'anomalia solo dopo aver conosciuto la normalità." },
      { title: "Valuta notifiche durante la scossa", description: "Il progetto può emettere una notifica dopo il rilevamento locale. Tempi e logica di conferma tra dispositivi restano soggetti a validazione pilota." },
      { title: "Registra l'evento", description: "I dati grezzi di durante e dopo la scossa restano sul dispositivo e vanno nel cloud. Da quella registrazione un ingegnere può leggere come ha risposto l'edificio." },
      { title: "Più dispositivi, risultati migliori", description: "Con più dispositivi nello stesso edificio si vede come si muovono i piani l'uno rispetto all'altro. Con più dispositivi nello stesso quartiere calano i falsi allarmi." },
    ],
  },
  features: {
    eyebrow: "Cosa fa",
    title: "In realtà fa più lavori diversi nello stesso momento.",
    description:
      "Il prodotto è progettato attorno alla registrazione degli eventi e a evidenze di movimento dell'edificio nel tempo. Notifiche e interpretazione strutturale sono obiettivi di validazione, non risultati garantiti.",
    items: [
      { accent: "01", title: "Target di rilevamento", description: "Il progetto attuale mira a un sensore MEMS classe ADXL355 e campionamento triassiale a 250 Hz. Le affermazioni su rilevamento e prestazioni richiedono prove di banco e pilota." },
      { accent: "02", title: "Target di notifica", description: "Il comportamento delle notifiche resta un obiettivo di validazione pilota. SismoSmart non è un servizio di emergenza né un sistema ufficiale di allerta; segui gli avvisi ufficiali." },
      { accent: "03", title: "Evidenza strutturale", description: "Un cambiamento nelle caratteristiche di vibrazione misurate può fornire ulteriori elementi a un ingegnere. Non è una diagnosi e non determina se un edificio è sicuro." },
      { accent: "04", title: "Crea un report dopo il terremoto", description: "Accelerazione di picco, durata e risposta dell'edificio finiscono in un unico report. L'ingegnere arriva con un punto di partenza." },
      { accent: "05", title: "Legge anche temperatura e umidità", description: "Un edificio non si comporta d'inverno come d'estate. Senza dati ambientali non riesci a separare quella deriva stagionale da un danno reale." },
      { accent: "06", title: "Correlazione tra dispositivi", description: "La correlazione tra più dispositivi è un obiettivo di progetto. L'effetto su tempi di conferma e falsi allarmi non è ancora dimostrato da evidenza pilota." },
    ],
  },
  demo: {
    eyebrow: "Flusso dati",
    title: "La misura parte dal dispositivo e finisce sul tuo telefono.",
    description:
      "Il progetto attuale misura localmente e mira a trasferire i dati del dispositivo in modo sicuro quando c'è connettività. Sicurezza del dispositivo, report e trend restano da validare in pilota.",
    previewLabel: "Registro edificio",
    networkLabel: "Rete di quartiere",
    sensorLabel: "Dispositivo",
    sensorValue: "Attivo",
    eventLabel: "Ultimo evento",
    eventValue: "Registrato, rivedibile",
    bullets: [
      "Il progetto attuale mira a un sensore classe ADXL355, campionamento triassiale a 250 Hz e un obiettivo di rumore documentato; le prestazioni finali richiedono BOM congelata e prove di banco.",
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
      { title: "Appartamenti", description: "Numero di dispositivi, durata, proprietà e condizioni commerciali vengono concordati caso per caso. Questa pagina non promette hardware gratuito né una durata fissa.", highlight: "Termini concordati" },
      { title: "Campus e fabbriche", description: "Strutture con più di un edificio. Un dispositivo per edificio, tutti visibili da un'unica dashboard.", highlight: "Aziendale" },
      { title: "Università", description: "L'accesso alla ricerca richiederebbe termini pilota espliciti, controlli privacy e un accordo separato di condivisione dati. Non è il flusso predefinito.", highlight: "Collaborazione accademica" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    description: "Se la tua domanda è qui, c'è anche la risposta. Se non c'è, scrivi a info@sismosmart.com e ti rispondiamo. L'elenco completo è nella pagina FAQ.",
    items: [
      { title: "Mi avvisa prima di un terremoto?", description: "No. SismoSmart non è un servizio di allerta precoce e non promette un avviso anticipato. Il pilota può valutare notifiche a bassa latenza dopo il rilevamento locale; per le emergenze segui gli avvisi ufficiali." },
      { title: "Che differenza c'è con gli avvisi di Google?", description: "Google usa l'accelerometro dei telefoni. È gratis, ce l'hanno tutti e funziona bene. Ma quello che misura è l'origine del terremoto, non il tuo edificio. Noi facciamo l'opposto: come vibra il tuo edificio, come cambia con le stagioni, in che stato resta dopo il terremoto. A queste domande un telefono non risponde." },
      { title: "Un dispositivo può dirmi se il mio edificio è sicuro?", description: "Non può. Chi dichiara un edificio sicuro o non sicuro è un ingegnere, non un apparecchio. Quello che fa il dispositivo è lasciare a quell'ingegnere qualcosa di solido su cui lavorare." },
      { title: "L'installazione è difficile?", description: "Colleghi il cavo USB-C alla presa, attacchi il dispositivo al muro con l'adesivo sul retro e lo abbini dall'app. Niente trapano e niente tecnico. Cinque minuti." },
      { title: "Cosa succede se manca corrente o internet?", description: "Il progetto attuale mira al buffering locale durante la perdita di rete e a un breve ponte con supercondensatore durante un blackout. Durata esatta e invio end-to-end restano da validare." },
      { title: "Quando arriva sul mercato?", description: "Non c'è una data pubblica definitiva di vendita. SismoSmart resta in pre-lancio; evidenza pilota, maturità hardware, certificazione e produzione determineranno il calendario." },
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
