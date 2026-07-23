import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const itExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Tecnologia",
    metaTitle: "Tecnologia: come misura SismoSmart",
    metaDescription:
      "Cosa c'è dentro il dispositivo, come distingue una scossa reale dal rumore, e come la misura diventa un report leggibile.",
    title: "Cosa c'è dentro il dispositivo e come il dato arriva fino a te",
    description:
      "SismoSmart ha un solo compito: registrare come si muove un edificio. Sia la notifica rapida durante la scossa sia il report che arriva dopo nascono da quella stessa registrazione. Questa pagina spiega come viene presa.",
    sections: [
      ["Accelerometro MEMS", "Dentro c'è un sensore MEMS classe ADXL355, circa 100 volte più sensibile dell'accelerometro di un telefono. Campiona tre assi 250 volte al secondo e raggiunge un rumore di fondo intorno ai 22 micro-g. Modesto accanto a una stazione sismica professionale, ma di livello laboratorio per l'elettronica di consumo."],
      ["Rilevamento STA/LTA", "Il dispositivo confronta la media dell'ultimo mezzo secondo con quella degli ultimi trenta secondi. Quando quel rapporto salta, c'è un evento. Il metodo si chiama STA/LTA ed è uno standard in sismologia. La calibrazione pilota mira a distinguere il normale rumore dell'edificio da una scossa, ma sono possibili falsi positivi o eventi mancati finché la validazione sul campo non è completa."],
      ["Buffer evento locale", "Superata la soglia, il dispositivo scrive in memoria una finestra di 40 secondi: quattro secondi prima dell'evento e trentasei dopo. Se in quel momento internet manca, conserva la registrazione e la invia quando la connessione torna. Un'app per telefono non può farlo."],
      ["Conferma cloud", "Un singolo dispositivo che si attiva non è di per sé una prova forte. Quando tre o più dispositivi della stessa zona si attivano entro 60 secondi, l'evento viene marcato come confermato. È qui che il tasso di falsi allarmi cala davvero. Fonti pubbliche come AFAD e USGS forniscono un controllo incrociato in più."],
      ["Monitoraggio della salute strutturale", "Ogni edificio ha una frequenza naturale, cioè il ritmo con cui tende a oscillare da solo. Il danno strutturale tira quel numero verso il basso. Il dispositivo lo misura ogni settimana, impara l'andamento stagionale e segnala un calo inatteso. Il nome tecnico del metodo è analisi modale."],
      ["Report per l'ingegnere", "Dopo un evento il report riporta la massima accelerazione del suolo (PGA), la massima velocità (PGV), una stima dell'intensità Modified Mercalli e la percentuale di spostamento della frequenza naturale del tuo edificio. Sono metriche standard dell'ingegneria sismica. Non stiamo inventando una scala nuova."],
      ["Connettività", "V1 funziona su Wi-Fi a 2.4 GHz. La versione aziendale (V2) aggiungerà connettività cellulare LTE-M e LoRa mesh, così gli amministratori non dovranno portare il dispositivo sul Wi-Fi dell'ufficio."],
      ["Alimentazione", "USB-C standard, 5V/2A. Un supercondensatore da 1 farad fornisce dai 30 ai 60 secondi di alimentazione ponte durante un blackout, quanto basta per mandare l'ultimo evento nel cloud. Non c'è una batteria da sostituire né una manutenzione periodica."],
      ["Certificazione", "Prima che V1 esca: CE RED (direttiva europea sulle apparecchiature radio), approvazione frequenze BTK in Turchia, conformità RoHS e WEEE. Tutti i flussi di dati vengono documentati sotto KVKK. L'approvazione FCC per il mercato statunitense è un passo successivo."],
    ],
  },
  pilotProgram: {
    eyebrow: "Programma pilota",
    metaTitle: "Candidatura al programma pilota",
    metaDescription:
      "Pilota gratuito di sei mesi per appartamenti, campus, fabbriche o edifici di ricerca. Mettiamo noi i dispositivi e il supporto, e chiediamo in cambio un feedback onesto.",
    title: "Vogliamo vedere il dispositivo prima nel tuo edificio.",
    description:
      "Il prodotto non è ancora in vendita ampia. Quello che cerchiamo in questa fase sono pochi siti seri e persone disposte a dirci cosa non funziona. Se rientri in uno dei quattro gruppi qui sotto, il modulo in fondo è la porta d'ingresso.",
    sections: [
      ["Appartamenti", "Partiamo con un dispositivo in un appartamento. Se l'amministratore partecipa, ne aggiungiamo altri su piani diversi. Il supporto all'installazione è gratuito e aiutiamo a coordinarci con l'amministrazione."],
      ["Campus e fabbriche", "Più edifici, un'unica dashboard centrale. Ogni edificio conserva la propria registrazione. Prima di installare rivediamo insieme al tuo team IT la topologia di rete e i requisiti di sicurezza."],
      ["Piloti comunali", "Distribuzioni a scala di quartiere che mostrano dove lo stesso terremoto è stato avvertito più forte. I dati personali restano completamente fuori da questo flusso. Viene condiviso solo l'aggregato per edificio o per area."],
      ["Partner di ricerca", "Dipartimenti universitari di ingegneria sismica. Apriamo i dati grezzi all'analisi accademica e in cambio riceviamo feedback e la possibilità di una pubblicazione congiunta. Servono un accordo di riservatezza e uno di condivisione dati."],
      ["Cosa offriamo", "Da tre a dieci dispositivi gratuiti, e non li richiediamo indietro quando il pilota finisce. Sei mesi senza costi. Accesso diretto ai tuoi dati. Supporto remoto all'installazione via video e telefono. Vedere in anticipo i cambiamenti del prodotto mentre il pilota è in corso."],
      ["Cosa chiediamo in cambio", "Che tu coordini l'installazione con l'amministrazione o con lo staff dell'edificio. Facciamo una chiamata di feedback di circa quindici minuti al mese. Se capita un evento, ti chiediamo una nota breve. Alla fine ci piacerebbe pubblicare un breve case study, e volentieri lasciamo fuori il tuo nome."],
      ["Dalla candidatura all'installazione", "Compili il modulo. Il comitato pilota lo esamina entro cinque giorni lavorativi. Una breve videochiamata copre l'edificio e se è adatto. Si definiscono Wi-Fi e accessi e si firma un semplice accordo di quattro pagine. I dispositivi vengono spediti. Seguiamo da vicino la prima settimana e restiamo in contatto regolare dopo."],
    ],
  },
  investors: {
    eyebrow: "Investitori",
    metaTitle: "Investitori: brief del round pre-seed",
    metaDescription:
      "Problema, mercato, team, roadmap di prodotto e dettagli del round. Un riassunto breve per preparare una conversazione.",
    title: "Dopo un terremoto c'è una finestra che nessuno misura.",
    description:
      "Dopo un terremoto importante in Turchia l'ispezione strutturale richiede settimane. In quelle settimane le famiglie tirano a indovinare, le aziende si fermano e le assicurazioni si ingolfano. SismoSmart è una startup hardware che prova a chiudere quella finestra usando i dati dell'edificio stesso.",
    sections: [
      ["Problema", "Dopo i terremoti di Kahramanmaraş del 2023, la valutazione degli edifici in undici province ha richiesto mesi. Le assicurazioni si sono ingolfate, i costi di sistemazione temporanea sono lievitati e gli abitanti non sapevano quando sarebbero potuti rientrare. L'intero sistema poggia sulle visite degli ingegneri, ed è proprio quel passaggio a bloccarsi quando l'evento è grande."],
      ["Perché ora", "Gli accelerometri MEMS di livello laboratorio costano un quinto di dieci anni fa. I microcontrollori a doppia radio che portano insieme Wi-Fi e BLE (ESP32-S3) hanno raggiunto prezzi da elettronica di consumo. In Turchia l'interesse pubblico e degli investitori per la tecnologia legata ai disastri non è mai stato così alto come dal 2023. Tre anni fa nessuna di queste tre condizioni era soddisfatta."],
      ["Mercato", "La Turchia ha circa venti milioni di famiglie e circa il 70% del paese si trova in zona a rischio sismico. Il primo obiettivo sono i proprietari sensibili al rischio a Istanbul, Smirne e Ankara. La seconda ondata è fatta di amministratori di condominio, assicurazioni e comuni. La terza è l'estero: Cile, Indonesia, Giappone e Messico."],
      ["Prodotto", "V1 è un dispositivo consumer da 79 dollari con Wi-Fi. V1.5 aggiunge microSD e giroscopio. V2 è la versione aziendale con connettività cellulare e LoRa. I ricavi arrivano da due voci: vendita del dispositivo e abbonamento da 5 dollari al mese. A volume puntiamo a un rapporto LTV/CAC intorno a tredici volte."],
      ["Team", "Un consulente accademico con dottorato in ingegneria sismica, due ingegneri civili con laurea magistrale che lavorano sugli algoritmi di monitoraggio della salute strutturale e sul campo dei piloti, e un founder che copre software embedded e cloud. Siamo tutti in Turchia. Le collaborazioni accademiche sono in corso di definizione."],
      ["Concorrenza", "I player domestici (EDIS, Multitek) restano su prezzi B2B e la loro esperienza mobile è debole. Gli avvisi Android gratuiti di Google occupano lo spazio della notifica, ma non toccano la salute dell'edificio. Grillo è partita dal consumer e si è spostata verso il settore pubblico; la lezione che ne traiamo è chiara: l'hardware consumer da solo non regge. Per questo affianchiamo il dispositivo a un abbonamento fin dal primo giorno."],
      ["Roadmap", "Q2 2026: prototipo funzionante con STA/LTA, MQTT e demo mobile. Q3 2026: da cinque a dieci installazioni pilota e i primi dati reali sul campo. Q4 2026: chiusura del round e costituzione della società. Q1 2027: certificazione CE e prima produzione di 1.000 unità. Q2 2027: lancio e revisione della scheda V1.5."],
      ["Il round", "Cerchiamo l'equivalente di 250 mila dollari, che ci danno diciotto mesi di autonomia di cassa. Ripartizione: 36% produzione, 32% team, 12% marketing, 8% certificazione, 6% cloud, 6% legale e riserva. In parallelo abbiamo una domanda TÜBİTAK BiGG (1,35 milioni di TL), programmi KOSGEB e crediti cloud da AWS Activate, Google for Startups e Microsoft for Startups."],
      ["Cosa cerchiamo", "Business angel e fondi in fase iniziale che abbiano già visto una startup hardware. I partner con accesso alla regolamentazione, alla manifattura e alle reti assicurative in Turchia valgono per noi più del denaro veloce. La documentazione tecnica dettagliata e il modello finanziario li condividiamo sotto accordo di riservatezza."],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    metaTitle: "Domande frequenti",
    metaDescription:
      "Risposte dirette su avvisi terremoto, sicurezza dell'edificio, dati, privacy, installazione e tempi di lancio.",
    title: "Domande frequenti",
    description:
      "I prodotti per terremoti rischiano facilmente di promettere troppo. Noi proviamo a tenere ben visibili i limiti del dispositivo. Se non trovi qui la risposta alla tua domanda, scrivi a info@sismosmart.com.",
    sections: [
      ["Questo dispositivo mi avviserà prima del terremoto?", "Parliamo di secondi, non di minuti. Se il terremoto arriva da lontano, il dispositivo può cogliere l'onda P, che viaggia più veloce, e avvisarti prima che arrivi l'onda S distruttiva. Se l'epicentro è vicino, quel margine si riduce quasi a zero. Non lo vendiamo come sistema di allerta precoce, perché non funziona per ogni terremoto."],
      ["Un singolo dispositivo può dirmi se il mio edificio è sicuro?", "Non può. Chi dichiara un edificio sicuro o non sicuro è un ingegnere, non un apparecchio. Quello che fa il dispositivo è lasciare a quell'ingegnere qualcosa di solido su cui lavorare."],
      ["Quali dati raccogliete?", "Letture di vibrazione, temperatura, umidità, pressione e lo stato di funzionamento del dispositivo stesso. Non colleghiamo informazioni personali al dispositivo e non vendiamo i tuoi dati a nessuno. I dettagli sono nella pagina Privacy."],
      ["La mia posizione esatta è esposta?", "Conosciamo la posizione del tuo dispositivo a livello di quartiere, perché ci serve per incrociare un evento con i dispositivi vicini. Qualsiasi cosa più precisa viene condivisa solo con un accordo pilota esplicito."],
      ["I ricercatori possono accedere ai miei dati?", "Solo una volta anonimizzati e solo con un accordo separato con te. Quel flusso non esiste ancora; è in roadmap."],
      ["Che differenza c'è con gli avvisi di Google?", "Google usa l'accelerometro dei telefoni. È gratis, ce l'hanno tutti e funziona bene. Ma quello che misura è l'origine del terremoto, non il tuo edificio. Noi facciamo l'opposto: come vibra il tuo edificio, come cambia con le stagioni, in che stato resta dopo il terremoto. A queste domande un telefono non risponde."],
      ["Cosa succede quando salta internet?", "Il dispositivo continua a misurare e salva l'evento nella propria memoria. Non può inviare una notifica, perché serve una connessione. Quando internet torna, carica ciò che era in attesa."],
      ["E se manca la corrente?", "Dentro c'è un piccolo supercondensatore. Dà circa 30-60 secondi di alimentazione ponte, abbastanza per mandare l'ultimo evento nel cloud. Se il blackout dura di più, il dispositivo si spegne."],
      ["Quanto è difficile installarlo?", "Colleghi il cavo USB-C alla presa, attacchi il dispositivo al muro con l'adesivo sul retro e lo abbini dall'app. Niente trapano e niente tecnico. Cinque minuti."],
      ["Quanti dovrebbero esserci in un edificio?", "Uno fa già il suo lavoro. Ma con due o tre su piani diversi si vede come i piani si muovono l'uno rispetto all'altro, e questo vale molto di più per il monitoraggio della salute strutturale. Nei piloti condominiali puntiamo ad almeno tre per edificio."],
      ["Cosa significano PGA, PGV e MMI?", "PGA è la massima accelerazione raggiunta dal suolo durante un terremoto, in m/s². PGV è la massima velocità, in cm/s. MMI è la scala di intensità Modified Mercalli, che descrive come è stata avvertita la scossa da I a XII. Il dispositivo le riporta tutte e tre dopo un evento."],
      ["Cosa dice la frequenza naturale?", "Ogni edificio ha una frequenza alla quale tende a oscillare. Per un edificio in cemento armato di cinque piani il valore tipico è intorno ai 2-4 Hz. Il danno strutturale trascina quella frequenza verso il basso. Poiché la seguiamo con regolarità, riusciamo a cogliere un segnale quando il danno è ancora agli inizi."],
      ["In che direzione deve andare il dispositivo?", "Sul retro c'è una freccia verso l'alto: puntala verso il soffitto. Cerca di allineare gli assi X e Y del dispositivo alle direzioni orizzontali dell'edificio. Montato girato di 90 gradi i dati restano utilizzabili, anche se portano un po' meno informazione."],
      ["Il dispositivo registra suoni?", "No. Non c'è microfono, solo un accelerometro che misura la vibrazione del suolo. Registrare voci o suoni ambientali richiederebbe un sensore completamente diverso."],
      ["I miei dati lasciano la Turchia?", "La residenza dei dati del pilota non è ancora definitiva. Prima della raccolta, ogni accordo indicherà luoghi di trattamento, trasferimenti, conservazione e base giuridica applicabile."],
      ["Quando esce sul mercato?", "I piloti partono nell'estate 2026. Puntiamo alla vendita ampia entro fine 2026 o inizio 2027. Certificazione e produzione possono spostare la data. Iscriviti alla newsletter e saprai per primo la data definitiva."],
    ],
  },
  security: {
    eyebrow: "Sicurezza",
    metaTitle: "Sicurezza",
    metaDescription:
      "Come gestiamo la sicurezza del sito, il consenso, i dati del dispositivo, il trasporto cifrato e la privacy durante la fase pilota.",
    title: "Il dato che non raccogli è il dato che non puoi perdere.",
    description:
      "È la nostra regola di base. Al momento l'unica cosa online è il sito, ma il lato dispositivo lo stiamo costruendo con la stessa regola.",
    sections: [
      ["Pochi dati per impostazione predefinita", "Il dispositivo invia solo ciò che serve: movimento, informazioni ambientali, stato di funzionamento e orario dell'evento. Oltre a questo non raccogliamo nulla."],
      ["Consenso prima dell'analitica", "L'analitica web si carica solo dopo il tuo consenso. Puoi revocare quella scelta in qualsiasi momento dal link nel piè di pagina."],
      ["Trasporto cifrato", "Il sito gira su HTTPS con header di sicurezza. Il traffico del dispositivo è progettato per essere cifrato end-to-end."],
      ["Nessun segreto arriva al browser", "Chiavi private e token di servizio non compaiono mai nel codice che arriva al browser. Restano nelle impostazioni del server o in GitHub Secrets."],
      ["Segnalazione vulnerabilità", "Se trovi un problema di sicurezza nel sito o nei materiali pre-lancio, scrivi a info@sismosmart.com. Siamo grati a chi divulga in modo responsabile."],
      ["Piano di sicurezza del dispositivo", "Prima che il dispositivo esca ci impegniamo su firmware firmato, flash cifrato, due partizioni OTA con rollback automatico e una chiave unica per dispositivo fornita in fabbrica. La documentazione di sicurezza completa esce insieme al dispositivo."],
    ],
  },
});
