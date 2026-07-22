import type { BaseRoutePagesCopy } from "@/lib/page-copy";

export const itPages: BaseRoutePagesCopy = {
  product: {
    meta: {
      title: "Il dispositivo SismoSmart",
      description:
        "Un piccolo dispositivo di monitoraggio sismico per casa o ufficio. Rileva le scosse e registra come si comporta l'edificio dopo un terremoto.",
    },
    eyebrow: "Prodotto",
    title: "Il dispositivo",
    description:
      "Un dispositivo da parete, alimentato via USB-C, 100 x 100 x 27 mm. Pensato per misurare il movimento in modo fisso e attento, in case e piccoli edifici.",
    deviceDescription:
      "Nella scatola trovi il dispositivo, un cavo USB-C e una striscia biadesiva per il fissaggio. Non ti serve nessun altro attrezzo per montarlo.",
    meterTopLabel: "Sensore",
    meterTopValue: "MEMS preciso",
    meterBottomLabel: "Dati",
    meterBottomValue: "Cifrati, minimi",
    imageAlt: "Dispositivo SismoSmart, vista frontale",
    specs: [
      { label: "Sensore", value: "MEMS ad alta precisione" },
      { label: "Connessione", value: "Wi-Fi + Bluetooth" },
      { label: "Installazione", value: "Cinque minuti, via app" },
      { label: "Stato", value: "LED RGB + app" },
    ],
    useCases: [
      {
        title: "Case e appartamenti",
        description:
          "Un dispositivo per unità, oppure un pilota con più dispositivi insieme all'amministratore.",
      },
      {
        title: "Campus e fabbriche",
        description:
          "Organizzazioni con più edifici li seguono da una sola dashboard.",
      },
      {
        title: "Officine e uffici",
        description:
          "Monitoraggio accessibile e rapido da installare per piccole imprese.",
      },
      {
        title: "Università",
        description:
          "I gruppi di ricerca sui terremoti possono accedere a dati anonimi.",
      },
    ],
    comparisonTitle: "Come si confronta",
    comparisonDescription:
      "Sta tra un sismografo professionale e un'app per telefono. Non sostituiamo nessuno dei due: offriamo un dispositivo reale a scala domestica.",
    comparisonRows: [
      {
        label: "Installazione",
        sismosmart: "Cinque minuti, fai da te",
        traditional: "Serve un ingegnere",
        mobile: "Nessuna, solo app",
      },
      {
        label: "Dispositivo fisso",
        sismosmart: "Sì, montato sull'edificio",
        traditional: "Sì",
        mobile: "No, il telefono si muove",
      },
      {
        label: "Lettura strutturale",
        sismosmart: "Sì, report semplice",
        traditional: "Sì, report esperto",
        mobile: "No",
      },
      {
        label: "Prezzo",
        sismosmart: "Scala casa",
        traditional: "Scala enterprise",
        mobile: "Gratis",
      },
    ],
    ctaLabel: "Candidati al pilota",
    ctaHref: "/pilot-program",
  },
  howItWorks: {
    meta: {
      title: "Come funziona SismoSmart",
      description:
        "Monti il dispositivo, lo abbini al telefono, l'edificio viene riconosciuto. Ricevi una notifica quando arriva una scossa e un report dopo.",
    },
    eyebrow: "Come funziona",
    title: "Dispositivo, cloud, app: insieme.",
    description:
      "Tre parti. Il dispositivo misura le vibrazioni del tuo edificio. Il cloud riceve dati cifrati e li confronta con altri dispositivi. L'app mostra solo ciò che conta.",
    flow: [
      {
        title: "Monta il dispositivo",
        description:
          "Su una parete interna, meglio se vicina a un elemento strutturale.",
      },
      {
        title: "Abbinalo al telefono",
        description:
          "Lo trovi via Bluetooth dall'app. Condividi le credenziali Wi-Fi in modo sicuro.",
      },
      {
        title: "L'edificio viene imparato",
        description:
          "Nei primi giorni il dispositivo registra il profilo normale delle vibrazioni.",
      },
      {
        title: "Report quando succede qualcosa",
        description:
          "Ricevi una notifica quando rileva una scossa. Dopo, il report è pronto nell'app.",
      },
    ],
    signals: [
      {
        title: "Rilevamento nel dispositivo",
        description:
          "Il dispositivo non aspetta il cloud. Quando parte una vera scossa, agisce in locale. Poi conferma con il cloud.",
      },
      {
        title: "Report dopo il terremoto",
        description:
          "Un solo riepilogo: accelerazione di picco, durata, variazione della frequenza naturale dell'edificio.",
      },
      {
        title: "Solo i dati necessari",
        description:
          "Non monitoriamo la tua attività. Il dispositivo condivide vibrazioni, temperatura, umidità, pressione e stato.",
      },
    ],
    network: [
      {
        title: "Rete di quartiere",
        description:
          "Quando tre o più dispositivi nella stessa zona si attivano insieme, l'evento viene segnato come confermato. I falsi allarmi calano molto.",
      },
      {
        title: "Controllo della struttura",
        description:
          "Il profilo di vibrazione cambia in settimane e mesi. Un cambio improvviso può segnalare un problema.",
      },
      {
        title: "Interfaccia semplice",
        description:
          "Il dispositivo fa il lavoro complesso in background. Tu vedi solo lo stato: verde, giallo, rosso.",
      },
    ],
  },
  about: {
    meta: {
      title: "Chi siamo",
      description:
        "Chi costruisce SismoSmart e perché. Il team, il punto di vista, dove vogliamo arrivare.",
    },
    eyebrow: "Chi siamo",
    title: "Viviamo in Turchia. Vogliamo edifici solidi.",
    description:
      "Ci siamo riuniti dopo i terremoti di Kahramanmaraş del 2023 e le scosse recenti attorno a Istanbul. Volevamo capire come reagiscono le nostre case e la città. Così abbiamo costruito il dispositivo.",
    story: [
      "Dopo un grande terremoto in Turchia, i controlli degli edifici richiedono settimane, a volte mesi. Nel frattempo le famiglie non sanno se possono rientrare.",
      "Non elimineremo del tutto l'attesa. Alla fine serve una visita dell'ingegnere. Ma prima del suo arrivo vogliamo un dato che dica: questo edificio sembra a posto, oppure è prioritario.",
      "Nel team ci sono un consulente accademico in ingegneria civile, due ricercatori MSc in ingegneria civile e un fondatore su embedded e software. Siamo tutti in Turchia. Testiamo il dispositivo nelle nostre case.",
    ],
    principles: [
      {
        title: "Informare senza spaventare",
        description:
          "Niente marketing della paura. Il dispositivo crea preparazione, non panico.",
      },
      {
        title: "Dire i limiti",
        description:
          "Diremo chiaramente cosa non facciamo. Non siamo un sistema ufficiale. Non sostituiamo il report di un ingegnere.",
      },
      {
        title: "Restituire i dati al proprietario",
        description:
          "I dati del tuo edificio sono tuoi. Aggregati anonimi possono aiutare università o istituzioni. I dati personali non sono in vendita.",
      },
    ],
    timeline: [
      {
        period: "Q1 2026",
        title: "Team e visione prodotto",
        description:
          "Team iniziale formato, decisioni principali prese, architettura scritta.",
      },
      {
        period: "Q2 2026",
        title: "Prototipo e preparazione pilota",
        description:
          "Primo prototipo hardware, base dell'app mobile, prime conversazioni con siti pilota.",
      },
      {
        period: "Q3 2026",
        title: "Prime installazioni pilota",
        description:
          "Cinque-dieci edifici, tre mesi di dati, feedback, prodotto finale.",
      },
      {
        period: "Q4 2026 / Q1 2027",
        title: "Certificazione e produzione",
        description:
          "Certificazione CE, primi 1.000 dispositivi, lancio più ampio.",
      },
    ],
    team: [
      {
        name: "Fondatore",
        role: "Hardware, software, prodotto",
        bio: "Responsabile di sistemi embedded, IoT, cloud e prodotto.",
      },
      {
        name: "Consulente accademico",
        role: "Ingegneria dei terremoti",
        bio: "PhD in ingegneria civile. Validazione scientifica degli algoritmi strutturali.",
      },
      {
        name: "Ingegneri civili",
        role: "Struttura e siti pilota",
        bio: "Due ricercatori MSc in ingegneria civile. Guidano algoritmi lato edificio e validazione sul campo.",
      },
    ],
  },
  contact: {
    meta: {
      title: "Contatto",
      description:
        "Vuoi parlare con SismoSmart? Qui trovi il canale giusto. Prodotto, pilota, stampa o investitori.",
    },
    eyebrow: "Contatto",
    title: "Scrivi, rispondiamo.",
    description:
      "Al momento il canale più rapido è l'email. Un oggetto chiaro arriva alla persona giusta.",
    channels: [
      {
        title: "Generale",
        description: "Domande sul prodotto, candidature pilota, interesse all'acquisto",
        value: "info@sismosmart.com",
        href: "mailto:info@sismosmart.com",
      },
      {
        title: "Stampa",
        description: "Interviste, press kit, partnership",
        value: "press@sismosmart.com",
        href: "mailto:press@sismosmart.com",
      },
      {
        title: "LinkedIn",
        description: "Aggiornamenti professionali e notizie aziendali",
        value: "linkedin.com/company/sismosmart",
        href: "https://www.linkedin.com/company/sismosmart",
      },
    ],
    form: {
      nameLabel: "Il tuo nome",
      emailLabel: "Email",
      subjectLabel: "Oggetto",
      messageLabel: "Il tuo messaggio",
      buttonLabel: "Invia",
      consentLabel:
        "Accetto che queste informazioni vengano trattate per leggere e rispondere al mio messaggio.",
      note: "Usiamo queste informazioni solo per rispondere al messaggio.",
      loadingLabel: "Invio...",
      successMessage: "Messaggio inviato. Risponderemo appena possibile.",
      errorMessage: "Qualcosa non ha funzionato. Riprova tra poco.",
      missingEndpointMessage:
        "Il modulo non è ancora collegato. Scrivi a info@sismosmart.com.",
      rateLimitedMessage:
        "Troppi tentativi. Riprova tra qualche minuto.",
    },
  },
  privacy: {
    meta: {
      title: "Privacy",
      description:
        "Quali dati raccogliamo, perché li usiamo, con chi li condividiamo. Spiegato in modo semplice.",
    },
    eyebrow: "Privacy",
    title: "Informativa privacy",
    description:
      "Non raccogliamo dati che non servono. Usiamo ciò che raccogliamo solo per lo scopo dichiarato. Non li vendiamo.",
    sections: [
      {
        title: "Dati che raccogliamo",
        description:
          "Sul sito: email quando ti iscrivi, messaggi inviati dal modulo, preferenze cookie. Dal dispositivo dopo il lancio: vibrazioni, temperatura, umidità, pressione, stato del dispositivo, posizione approssimativa a livello di quartiere.",
      },
      {
        title: "Per cosa li usiamo",
        description:
          "Rispondere ai messaggi, gestire candidature pilota, inviare annunci, mantenere il dispositivo online, confrontare eventi tra dispositivi, migliorare il prodotto.",
      },
      {
        title: "Con chi li condividiamo",
        description:
          "Gli invii dei moduli possono passare da un provider di moduli. I dati del dispositivo sono elaborati nell'ambiente cloud scelto. Non vendiamo dati personali a terzi.",
      },
      {
        title: "I tuoi diritti",
        description:
          "Puoi accedere, correggere, cancellare o esportare i tuoi dati. Per KVKK e GDPR scrivi a info@sismosmart.com.",
      },
    ],
  },
  terms: {
    meta: {
      title: "Termini d'uso",
      description:
        "Termini base per usare il sito e le informazioni pre-lancio.",
    },
    eyebrow: "Termini",
    title: "Termini d'uso",
    description: "Il sito è pre-lancio. I termini sotto valgono per questa fase.",
    sections: [
      {
        title: "Informativo",
        description:
          "Questo sito informa su SismoSmart e accetta candidature pilota. Non è un servizio sismologico ufficiale o un canale di allerta terremoto.",
      },
      {
        title: "Non è una garanzia",
        description:
          "Il dispositivo è costruito per supportare la preparazione al terremoto dopo il lancio. Non sostituisce sistemi ufficiali, istruzioni di emergenza o il report di un ingegnere strutturale.",
      },
      {
        title: "Proprietà intellettuale",
        description:
          "Nome, logo, design prodotto e contenuti del sito appartengono a SismoSmart. Non possono essere riprodotti senza permesso.",
      },
      {
        title: "Contatto",
        description: "Domande a info@sismosmart.com.",
      },
    ],
  },
  press: {
    meta: {
      title: "Press kit",
      description: "Informazioni, immagini e contatti per la stampa.",
    },
    eyebrow: "Stampa",
    title: "Press kit",
    description:
      "Una pagina per media, partner e richieste di intervista.",
    sections: [
      {
        title: "Descrizione breve",
        description:
          "SismoSmart costruisce un dispositivo di monitoraggio sismico per case e piccoli edifici. Il dispositivo misura continuamente l'edificio, avvisa il telefono durante un terremoto e registra lo stato dopo l'evento. Piloti nel 2026, lancio nel 2027.",
      },
      {
        title: "Contatto stampa",
        description:
          "Per interviste, immagini stampa o demo: press@sismosmart.com.",
      },
    ],
    links: [
      {
        title: "Logo",
        description: "Logo vettoriale SVG",
        href: "/logo-symbol.svg",
      },
      {
        title: "Immagine prodotto",
        description: "Render del dispositivo ad alta risoluzione",
        href: "/images/device/sismosmart-device-front.png",
      },
      {
        title: "Immagine social",
        description: "Scheda di condivisione 1200x630",
        href: "/images/og/sismosmart-og.png",
      },
    ],
  },
};
