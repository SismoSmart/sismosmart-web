import { enPages } from "@/lib/page-content/en";
import { esPages } from "@/lib/page-content/es";
import { idPages } from "@/lib/page-content/id";
import { itPages } from "@/lib/page-content/it";
import { ptPages } from "@/lib/page-content/pt";
import { trPages } from "@/lib/page-content/tr";
import type { BaseRoutePagesCopy, InfoPageCopy, RoutePagesCopy } from "@/lib/page-copy";
import type { Locale, SiteLink } from "@/lib/site";

export const routeSegments = {
  home: "/",
  product: "/product",
  technology: "/technology",
  howItWorks: "/how-it-works",
  pilotProgram: "/pilot-program",
  investors: "/investors",
  faq: "/faq",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
  press: "/press",
} as const;

export type PageKey = keyof typeof routeSegments;
export type StaticPageKey = Exclude<PageKey, "home">;

export const staticPageKeys: StaticPageKey[] = [
  "product",
  "technology",
  "howItWorks",
  "pilotProgram",
  "investors",
  "faq",
  "about",
  "contact",
  "privacy",
  "terms",
  "security",
  "press",
];

const pagesByLocale: Record<Locale, BaseRoutePagesCopy> = {
  tr: trPages,
  en: enPages,
  es: esPages,
  it: itPages,
  id: idPages,
  pt: ptPages,
};

type ExtraPageInput = {
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  sections: Array<[string, string]>;
};

type ExtraPagesInput = {
  technology: ExtraPageInput;
  pilotProgram: ExtraPageInput;
  investors: ExtraPageInput;
  faq: ExtraPageInput;
  security: ExtraPageInput;
};

function toInfoPage(page: ExtraPageInput): InfoPageCopy {
  return {
    meta: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
    eyebrow: page.eyebrow,
    title: page.title,
    description: page.description,
    sections: page.sections.map(([title, description]) => ({ title, description })),
  };
}

function makeExtraPages(input: ExtraPagesInput): Pick<
  RoutePagesCopy,
  "technology" | "pilotProgram" | "investors" | "faq" | "security"
> {
  return {
    technology: toInfoPage(input.technology),
    pilotProgram: toInfoPage(input.pilotProgram),
    investors: toInfoPage(input.investors),
    faq: toInfoPage(input.faq),
    security: toInfoPage(input.security),
  };
}

const extraPagesByLocale: Record<
  Locale,
  Pick<RoutePagesCopy, "technology" | "pilotProgram" | "investors" | "faq" | "security">
> = {
  en: makeExtraPages({
    technology: {
      eyebrow: "Technology",
      metaTitle: "Technology: how SismoSmart measures",
      metaDescription:
        "What's inside the device, how it tells real shaking from noise, and how the data turns into a report you can read. Written for engineers and curious readers.",
      title: "What's inside the device, and how the data reaches you",
      description:
        "SismoSmart has one job: record how a building moves. Both the fast notification during the shaking and the report that follows come out of that same recording. This page explains how the recording is taken.",
      sections: [
        ["MEMS accelerometer", "Inside sits an ADXL355-class MEMS sensor, roughly 100 times more sensitive than the accelerometer in a phone. It samples three axes 250 times per second and reaches a noise floor around 22 micro-g. Modest next to a professional seismic station, but lab-grade for consumer hardware."],
        ["STA/LTA detection", "The device compares the average of the last half second against the average of the last thirty seconds. When that ratio jumps, there's an event. The method is called STA/LTA and it's a seismology standard. Pilot calibration is intended to separate common building noise from shaking, but false positives and missed events remain possible until field validation is complete."],
        ["Local event buffer", "Once the threshold is crossed, the device writes a 40-second window to memory: four seconds before the event and thirty-six after. If the internet happens to be down, it keeps the recording and sends it when the connection returns. A phone app can't do this."],
        ["Cloud confirmation", "One device triggering isn't strong evidence on its own. When three or more devices in the same area trigger within 60 seconds, the event gets marked as confirmed. This is where the false-alarm rate drops sharply. Public sources like AFAD and USGS provide an extra cross-check."],
        ["Structural health tracking", "Every building has a natural frequency, the rate at which it tends to sway on its own. Structural damage pulls that number down. The device measures it weekly, learns the seasonal pattern, and flags an unexpected drop. The technical name for this is modal analysis."],
        ["Engineer-facing report", "After an event, the report carries peak ground acceleration (PGA), peak ground velocity (PGV), a Modified Mercalli intensity estimate, and the percentage shift in your building's natural frequency. These are standard earthquake-engineering metrics. We aren't inventing a new scale."],
        ["Connectivity", "V1 runs on 2.4 GHz Wi-Fi. The enterprise version (V2) will add LTE-M cellular and LoRa mesh, so building managers won't have to bring the device onto the office Wi-Fi."],
        ["Power", "Standard USB-C, 5V/2A. A 1 farad supercapacitor inside gives 30 to 60 seconds of bridge power during an outage, which is enough to push the last event to the cloud. There's no battery to replace and no maintenance schedule."],
        ["Certification", "Before V1 ships: CE RED, Turkey's BTK frequency approval, RoHS and WEEE compliance. All data flows get documented under KVKK. FCC approval for the US market is a later step."],
      ],
    },
    pilotProgram: {
      eyebrow: "Pilot program",
      metaTitle: "Pilot program application",
      metaDescription:
        "A free six-month pilot for apartments, campuses, factories or research buildings. We supply the devices and the support; we ask for honest feedback in return.",
      title: "We want to see the device in your building first.",
      description:
        "The product isn't on broad sale yet. What we want at this stage is a small number of serious sites and people who'll tell us what doesn't work. If you fit one of the four groups below, the form at the bottom is the way in.",
      sections: [
        ["Apartments", "We start with one device in one flat. If the building management joins in, we add devices on other floors. Installation support is free and we help coordinate with the management."],
        ["Campuses and factories", "Several buildings, one central dashboard. Each building keeps its own recording. Before installing, we go through network topology and security requirements with your IT team."],
        ["Municipal pilots", "Neighborhood-scale rollouts that show where the same earthquake was felt more strongly. Personal data stays entirely out of this flow. Only aggregate per-building or per-location data is shared."],
        ["Research partners", "University earthquake engineering departments. We open the raw data to academic analysis, and in return we get feedback and the option of a co-authored paper. It requires a confidentiality and data-sharing agreement."],
        ["What we offer", "Three to ten devices, free, and we don't ask for them back when the pilot ends. Six months at no cost. Direct access to your own data. Remote installation help over video and phone. An early look at product changes while the pilot runs."],
        ["What we ask in return", "You coordinate installation with the building management or staff. We hold a feedback call of about fifteen minutes a month. If an event happens, we ask for a short note. At the end we'd like to publish a brief case study, and we're happy to leave your name out of it."],
        ["From application to install", "You fill in the form. The pilot committee reviews it within five business days. A short video call covers the building and whether it fits. Wi-Fi and access get settled, and a simple four-page agreement is signed. The devices ship. We stay close for the first week and keep in regular touch after that."],
      ],
    },
    investors: {
      eyebrow: "Investors",
      metaTitle: "Investors: SismoSmart seed brief",
      metaDescription:
        "Problem, market, team, product roadmap and seed round details. A short summary to prepare for a conversation.",
      title: "There's a window after an earthquake that nobody measures.",
      description:
        "After a major earthquake in Turkey, structural inspection takes weeks. During those weeks families guess, businesses pause and insurance seizes up. SismoSmart is a hardware startup trying to close that window using the building's own data.",
      sections: [
        ["Problem", "After the 2023 Kahramanmaraş earthquakes, building assessment across eleven provinces took months. Insurance backed up, displacement costs piled up, and residents had no idea when they could go home. The whole system rests on engineer visits, and that's exactly the step that jams under a large event."],
        ["Why now", "Lab-grade MEMS accelerometers cost a fifth of what they did ten years ago. Dual-radio microcontrollers carrying both Wi-Fi and BLE (ESP32-S3) have reached consumer prices. Public and investor interest in disaster tech in Turkey has never been higher than it's been since 2023. Three years ago none of those three conditions held."],
        ["Market", "Turkey has roughly twenty million households and about seventy percent of the country sits in a seismic risk zone. Our first target is earthquake-aware homeowners in Istanbul, Izmir and Ankara. The second wave is building managers, insurers and municipalities. The third wave is abroad: Chile, Indonesia, Japan and Mexico."],
        ["Product", "V1 is a $79 consumer device on Wi-Fi. V1.5 adds microSD and a gyroscope. V2 is the enterprise version with cellular and LoRa. Revenue comes from two lines: device sales and a $5 monthly subscription. At scale we're targeting an LTV/CAC ratio around thirteen times."],
        ["Team", "An academic advisor with a PhD in earthquake engineering, two MSc civil engineers working on structural health monitoring algorithms and pilot fieldwork, and a founder covering embedded software and cloud. All of us are in Turkey. Academic partnership talks are under way."],
        ["Competition", "Domestic players (EDIS, Multitek) stay priced at B2B and their mobile experience is weak. Google's free Android earthquake alerts fill the notification space but never touch building health. Grillo started consumer and moved toward the public sector, and the lesson we take from that is clear: consumer hardware alone doesn't stand up. We pair the device with a subscription from day one."],
        ["Roadmap", "Q2 2026: working prototype with STA/LTA, MQTT and a mobile demo. Q3 2026: five to ten pilot installations and the first real field data. Q4 2026: seed close and company formation. Q1 2027: CE certification and first production run of 1,000 units. Q2 2027: launch and the V1.5 board revision."],
        ["Seed round", "We're raising the equivalent of $250K, which gives us eighteen months of runway. Allocation: 36% production, 32% team, 12% marketing, 8% certification, 6% cloud, 6% legal and reserve. In parallel we have a TÜBİTAK BiGG application (1.35M TL), KOSGEB programs, and cloud credits from AWS Activate, Google for Startups and Microsoft for Startups."],
        ["What we're looking for", "Angels and seed funds who have seen a hardware startup before. Partners with access to Turkish regulation, manufacturing and insurance networks are worth more to us than fast money. We share the detailed technical document and the financial model under a confidentiality agreement."],
      ],
    },
    faq: {
      eyebrow: "FAQ",
      metaTitle: "Frequently asked questions",
      metaDescription:
        "Direct answers about earthquake warning, building safety, data, privacy, installation and launch timing.",
      title: "Frequently asked questions",
      description:
        "Earthquake products are easy to oversell. We try to keep the device's limits visible. If your question isn't answered here, write to info@sismosmart.com.",
      sections: [
        ["Will this device warn me before an earthquake?", "We're talking seconds, not minutes. If the earthquake comes from a distance, the device can catch the fast-moving P wave and send a notification before the destructive S wave arrives. If the epicenter is close, that window shrinks to almost nothing. We don't market this as an early warning system, because it won't work for every earthquake."],
        ["Can a single device tell me my building is safe?", "It can't. The person who gets to call a building safe or unsafe is an engineer, not a device. What the device does is leave that engineer something solid to work from."],
        ["What data do you collect?", "Vibration readings, temperature, humidity, pressure and the device's own operating status. We don't link personal information to your device and we don't sell your data to anyone. The Privacy page has the details."],
        ["Is my exact location exposed?", "We know your device's location at neighborhood level, because we need it to match an event against nearby devices. Anything more precise is only shared under an explicit pilot agreement."],
        ["Can researchers access my data?", "Only once the data is anonymized and only under a separate agreement with you. That flow doesn't exist yet; it's on the roadmap."],
        ["How is this different from Google's earthquake alerts?", "Google uses the accelerometer in people's phones. It's free, it's already on every handset, and it works well. But what it measures is the source of the earthquake, not your building. We do the opposite: how your building vibrates, how that changes with the season, what state it's in after an earthquake. A phone can't answer those questions."],
        ["What happens when the internet goes down?", "The device keeps measuring and saves the event to its own memory. It can't send a notification, because that needs a connection. When the internet comes back, it uploads whatever is waiting."],
        ["What happens during a power cut?", "There's a small supercapacitor inside. It gives about 30 to 60 seconds of bridge power, which is enough to send the last event to the cloud. A longer outage shuts the device down."],
        ["How hard is installation?", "You plug the USB-C cable into a socket, stick the device to the wall with the adhesive on the back, and pair it from the app. No drill and no technician. It takes five minutes."],
        ["How many devices should one building have?", "One will do the job. But with two or three on different floors you can see how the floors move relative to each other, and that's far more valuable for structural health tracking. In apartment pilots we aim for at least three per building."],
        ["What do PGA, PGV and MMI mean?", "PGA is the peak acceleration the ground reaches during an earthquake, in m/s². PGV is the peak velocity, in cm/s. MMI is the Modified Mercalli intensity scale, which describes how the shaking felt on a range from I to XII. The device reports all three after an event."],
        ["What does natural frequency tell you?", "Every building has a frequency it tends to sway at. For a five-storey reinforced concrete building that's typically around 2 to 4 Hz. Structural damage drags that frequency down. Because we track it regularly, we can catch a signal while the damage is still early."],
        ["Which way should the device face?", "There's an upward arrow on the back; point it at the ceiling. Try to align the device's X and Y axes with the building's horizontal directions. Mounted 90 degrees off, the data is still usable, though it carries a little less information."],
        ["Does the device record sound?", "No. There's no microphone inside, only an accelerometer that measures ground vibration. Recording speech or ambient sound would take an entirely different sensor."],
        ["Does my data leave Turkey?", "Pilot data residency is not final. Before device data is collected, each pilot agreement will identify processing locations, transfers, retention and the applicable legal basis."],
        ["When does it go on sale?", "Pilots start in summer 2026. We're aiming for broad availability by the end of 2026 or early 2027. Certification and manufacturing could push that back. Sign up for the newsletter and you'll hear the firm date first."],
      ],
    },
    security: {
      eyebrow: "Security",
      metaTitle: "Security",
      metaDescription:
        "How we handle website security, consent, device data, encrypted transport and privacy during the pilot phase.",
      title: "The data you never collect is the data you can't leak.",
      description:
        "That's our basic rule. The only thing live right now is the website, but we're building the device side on the same rule.",
      sections: [
        ["Minimal data by default", "The device sends only what's needed: motion, environment, operating status and the time of an event. We don't collect anything beyond that."],
        ["Consent before analytics", "Web analytics load only after you consent. You can reset that choice at any time from the link in the footer."],
        ["Encrypted transport", "The site runs on HTTPS with security headers. Device traffic is designed to be encrypted end to end."],
        ["No secrets reach the browser", "Private keys and service tokens never appear in code that ships to the browser. They stay in server settings or in GitHub Secrets."],
        ["Vulnerability reporting", "If you find a security issue on the site or in pre-launch materials, write to info@sismosmart.com. We're grateful to researchers who disclose responsibly."],
        ["Device security plan", "Before the device ships we're committing to signed firmware, encrypted flash, two OTA partitions with automatic rollback, and a unique per-device key provisioned at the factory. Full security documentation goes live with the device."],
      ],
    },
  }),
  tr: makeExtraPages({
    technology: {
      eyebrow: "Teknoloji",
      metaTitle: "Teknoloji: SismoSmart nasıl ölçer",
      metaDescription:
        "Cihazın içinde ne var, sarsıntıyı sıradan titreşimden nasıl ayırır, ölçüm nasıl okunabilir bir rapora döner. Mühendislere ve meraklılara açık dille.",
      title: "Cihazın içinde ne var, veri size nasıl ulaşıyor?",
      description:
        "SismoSmart'ın tek bir işi var: binanın nasıl hareket ettiğini kaydetmek. Sarsıntı sırasında gelen hızlı bildirim de, sarsıntı bittikten sonra çıkan rapor da bu kayıttan doğuyor. Bu sayfa, o kaydın nasıl alındığını anlatıyor.",
      sections: [
        ["MEMS ivmeölçer", "İçinde ADXL355 sınıfı bir MEMS sensör var. Bir telefonun ivmeölçerinden yaklaşık 100 kat daha hassas. Üç eksende saniyede 250 örnek alıyor ve yaklaşık 22 mikro-g'lik bir gürültü tabanına iniyor. Profesyonel bir sismik istasyonun yanında mütevazı kalır, ama tüketici elektroniği için laboratuvar sınıfı sayılır."],
        ["STA/LTA algılama", "Cihaz son yarım saniyenin ortalamasını son otuz saniyenin ortalamasıyla karşılaştırıyor. Bu oran aniden büyüdüğünde ortada bir olay var demektir. Yöntemin adı STA/LTA ve sismolojide standarttır. Pilot kalibrasyonunda sıradan bina gürültüsünü sarsıntıdan ayırmayı hedefliyoruz; saha doğrulaması tamamlanana kadar yanlış veya kaçırılmış algılama mümkündür."],
        ["Yerel olay tamponu", "Eşik aşıldığında cihaz 40 saniyelik bir pencereyi belleğine yazıyor: olaydan önceki dört saniye ve sonraki otuz altı saniye. İnternet o sırada yoksa kaydı tutar, bağlantı gelince gönderir. Telefondaki bir uygulama bunu yapamaz."],
        ["Bulut doğrulama", "Tek bir cihazın tetiklenmesi başlı başına güçlü bir kanıt değil. Aynı bölgedeki üç veya daha fazla cihaz 60 saniye içinde tetiklenirse olay doğrulanmış olarak işaretleniyor. Yanlış alarm oranı burada belirgin şekilde düşüyor. Ayrıca AFAD ve USGS gibi kamu kaynaklarıyla çapraz kontrol yapılıyor."],
        ["Yapı sağlığı takibi", "Her binanın bir doğal frekansı vardır, yani kendiliğinden salınmaya yatkın olduğu bir nokta. Yapısal hasar bu sayıyı aşağı çeker. Cihaz frekansı haftalık ölçüyor, mevsim örüntüsünü öğreniyor ve beklenmedik bir düşüş olduğunda işaretliyor. Yöntemin teknik adı modal analiz."],
        ["Mühendis tarafındaki rapor", "Bir olaydan sonra zirve yer ivmesi (PGA), zirve yer hızı (PGV), Modified Mercalli şiddet tahmini ve binanızın doğal frekansındaki kayma yüzdesi raporda yer alır. Bunlar deprem mühendisliğinin standart metrikleri, biz yeni bir ölçek uydurmuyoruz."],
        ["Bağlantı", "V1 sürümü 2.4 GHz Wi-Fi ile çalışıyor. Kurumsal sürüm (V2) LTE-M hücresel bağlantı ve LoRa mesh destekleyecek. Böylece bina yöneticileri cihazı ofis Wi-Fi'sine bağlamak zorunda kalmayacak."],
        ["Güç", "Standart USB-C, 5V/2A. İçindeki 1 farad süperkapasitör elektrik kesintisinde 30-60 saniye köprü güç sağlıyor, bu da son olayı buluta göndermeye yetiyor. Değiştirilecek pil ya da düzenli bakım gerekmiyor."],
        ["Sertifika", "V1 çıkmadan önce CE RED (Avrupa radyo direktifi), BTK frekans onayı, RoHS ve WEEE uyumluluğu tamamlanacak. KVKK kapsamında tüm veri akışları belgelenecek. ABD pazarı için gereken FCC onayı daha sonraki bir adım."],
      ],
    },
    pilotProgram: {
      eyebrow: "Pilot program",
      metaTitle: "Pilot programı başvurusu",
      metaDescription:
        "Apartman, kampüs, fabrika veya araştırma binası için altı aylık ücretsiz pilot. Cihazı ve desteği biz veriyoruz, karşılığında dürüst geri bildirim istiyoruz.",
      title: "Cihazı önce sizin binanızda görmek istiyoruz.",
      description:
        "Ürün henüz geniş satışta değil. Bu aşamada istediğimiz şey az sayıda ciddi saha ve dürüst geri bildirim. Aşağıdaki dört gruptan birine giriyorsanız sayfanın altındaki form giriş noktanız.",
      sections: [
        ["Apartmanlar", "Bir dairede bir cihazla başlıyoruz. Yönetim de katılırsa farklı katlara cihaz ekliyoruz. Kurulum desteği ücretsiz, yönetimle koordinasyonda da yardımcı oluyoruz."],
        ["Kampüsler ve fabrikalar", "Birden fazla bina, tek bir merkezi panel. Her bina kendi kaydını tutuyor. Kurulumdan önce bilgi işlem ekibinizle birlikte ağ topolojisini ve güvenlik gereksinimlerini gözden geçiriyoruz."],
        ["Belediye pilotları", "Mahalle ölçekli kurulum. Aynı depremin hangi bölgede daha şiddetli hissedildiğini gösteriyor. Kişisel veri bu akışın tamamen dışında kalıyor, yalnızca bina veya konum bazlı toplu veri paylaşılıyor."],
        ["Araştırma partnerleri", "Üniversitelerin deprem mühendisliği bölümleri. Ham veriyi akademik analize açıyoruz, karşılığında geri bildirim ve ortak yayın imkânı doğuyor. Gizlilik ve veri paylaşım anlaşması imzalamamız gerekiyor."],
        ["Size sunduğumuz", "Üç ila on cihazı ücretsiz veriyoruz ve pilot bitince geri istemiyoruz. Altı ay boyunca hiçbir ücret yok. Kendi verinize doğrudan erişiyorsunuz. Kurulumu video ve telefonla uzaktan destekliyoruz. Pilot süresince ürüne gelecek değişiklikleri önceden görüyorsunuz."],
        ["Sizden beklediğimiz", "Kurulumu bina yönetimi veya çalışanlarla koordine etmeniz gerekiyor. Ayda yaklaşık on beş dakikalık bir geri bildirim görüşmesi yapıyoruz. Bir olay yaşanırsa kısa bir not düşmenizi rica ediyoruz. Pilot bitiminde kısa bir vaka çalışması yayımlamak istiyoruz; isterseniz kurum adını yazmadan, anonim olarak."],
        ["Başvurudan kuruluma", "Formu dolduruyorsunuz. Pilot komitesi beş iş günü içinde değerlendiriyor. Kısa bir görüntülü görüşmede binayı ve uygunluğu konuşuyoruz. Wi-Fi ve erişim koşulları netleşiyor, dört sayfalık basit bir pilot anlaşması imzalanıyor. Cihazlar kargoya veriliyor. İlk hafta yakından takip ediyoruz, sonraki aylarda düzenli görüşmelerle devam ediyoruz."],
      ],
    },
    investors: {
      eyebrow: "Yatırımcılar",
      metaTitle: "Yatırımcılar: SismoSmart tohum turu bilgi notu",
      metaDescription:
        "Problem, pazar, ekip, ürün yol haritası ve tohum turu detayları. Görüşmeye hazırlık için kısa bir özet.",
      title: "Deprem sonrası hiç kimsenin ölçmediği bir aralık var.",
      description:
        "Türkiye'de büyük bir depremden sonra mühendis incelemesi haftalar sürüyor. O haftalarda aileler tahmin yürütüyor, işletmeler duruyor, sigorta süreçleri tıkanıyor. SismoSmart bu aralığı binanın kendi verisiyle kapatmaya çalışan bir donanım girişimi.",
      sections: [
        ["Problem", "2023 Kahramanmaraş depremlerinden sonra 11 ilde bina değerlendirmesi aylar sürdü. Sigorta süreçleri yığıldı, geçici barınma maliyetleri katlandı, insanlar evine ne zaman dönebileceğini bilemedi. Mevcut sistemin tamamı mühendis ziyaretine dayanıyor ve büyük olaylarda tam da bu adım tıkanıyor."],
        ["Neden şimdi", "Laboratuvar kalitesindeki MEMS ivmeölçerler on yıl öncesinin beşte biri fiyatına indi. Wi-Fi ve BLE'yi birlikte taşıyan çift radyolu mikrodenetleyiciler (ESP32-S3) tüketici fiyatına ulaştı. Türkiye'de afet teknolojilerine kamu ve yatırımcı ilgisi 2023'ten beri hiç bu kadar yüksek olmamıştı. Üç yıl önce bu üç şartın hiçbiri yerinde değildi."],
        ["Pazar", "Türkiye'de yaklaşık 20 milyon hane var ve ülkenin yüzde 70'i deprem bölgesinde. İlk hedefimiz İstanbul, İzmir ve Ankara'da deprem bilinci yüksek ev sahipleri. İkinci dalgada apartman yönetimleri, sigorta şirketleri ve belediyeler var. Üçüncü dalga yurt dışı: Şili, Endonezya, Japonya ve Meksika gibi yüksek riskli pazarlar."],
        ["Ürün", "V1, Wi-Fi bağlantılı 79 dolarlık tüketici cihazı. V1.5'te microSD ve jiroskop ekleniyor. V2 ise hücresel bağlantı ve LoRa destekli kurumsal sürüm. Gelir iki kalemden geliyor: cihaz satışı ve aylık 5 dolarlık abonelik. Ölçek büyüdüğünde hedeflediğimiz LTV/CAC oranı 13 katı civarında."],
        ["Ekip", "Deprem mühendisliği doktoralı bir akademik danışman, yapı sağlığı izleme algoritmaları ve pilot saha tarafında iki yüksek lisans inşaat mühendisi, gömülü yazılım ile bulut tarafını yürüten bir kurucu. Hepimiz Türkiye'deyiz. Akademik ortaklık görüşmeleri sürüyor."],
        ["Rekabet", "Yerli oyuncular (EDIS, Multitek) B2B fiyatlandırmada kalıyor ve mobil deneyimleri zayıf. Google'ın ücretsiz Android deprem uyarısı bildirim alanını dolduruyor ama bina sağlığını hiç ölçmüyor. Grillo tüketiciyle başlayıp kamu tarafına yöneldi; buradan çıkardığımız ders şu: tüketici donanımı tek başına ayakta kalmıyor. Biz de birinci günden itibaren cihazı bir abonelikle birlikte kurguluyoruz."],
        ["Yol haritası", "2026 Q2: STA/LTA, MQTT ve mobil demo ile çalışan prototip. 2026 Q3: 5-10 pilot kurulum ve ilk gerçek saha verisi. 2026 Q4: tohum turunun kapanışı ve şirketin anonim şirkete dönüşmesi. 2027 Q1: CE sertifikası ve ilk 1.000 cihazın üretimi. 2027 Q2: lansman ve V1.5 kart revizyonu."],
        ["Tohum turu", "250 bin dolar eşdeğeri arıyoruz, bu bize 18 aylık nakit ömrü veriyor. Dağılım: yüzde 36 üretim, yüzde 32 ekip, yüzde 12 pazarlama, yüzde 8 sertifikasyon, yüzde 6 bulut, yüzde 6 hukuk ve yedek. Paralelde TÜBİTAK BiGG başvurusu (1,35 milyon TL), KOSGEB programları ve AWS Activate, Google for Startups, Microsoft for Startups bulut kredileri var."],
        ["Aradığımız", "Donanım girişimi görmüş melek yatırımcılar ve tohum aşaması fonları. Türkiye'de regülasyon, üretim ve sigorta ağına erişimi olan ortaklar bizim için hızlı paradan daha değerli. Ayrıntılı teknik dokümanı ve mali modeli gizlilik anlaşması altında paylaşıyoruz."],
      ],
    },
    faq: {
      eyebrow: "SSS",
      metaTitle: "Sık sorulan sorular",
      metaDescription:
        "Deprem uyarısı, bina güvenliği, veri, gizlilik, kurulum ve lansman takvimi hakkında doğrudan cevaplar.",
      title: "Sık sorulan sorular",
      description:
        "Deprem ürünleri kolayca fazla iddia eder. Biz cihazın sınırlarını görünür tutmaya çalışıyoruz. Cevabını burada bulamadığınız bir soru varsa info@sismosmart.com adresine yazın.",
      sections: [
        ["Bu cihaz beni depremden önce uyarır mı?", "Birkaç saniyeden söz ediyoruz, dakikalardan değil. Deprem uzaktan geliyorsa cihaz hızlı ilerleyen P dalgasını yakalayıp yıkıcı S dalgası gelmeden önce bildirim gönderebilir. Merkez üssü yakınsa bu süre neredeyse sıfıra iner. Cihazı bir erken uyarı sistemi olarak tanıtmıyoruz, çünkü her depremde işe yaramaz."],
        ["Tek cihaz binamın güvenli olduğunu söyleyebilir mi?", "Söyleyemez. Bir binaya güvenli ya da güvensiz diyecek olan mühendistir, cihaz değil. Cihazın yaptığı şey, mühendise elle tutulur bir veri bırakmak."],
        ["Hangi verileri topluyorsunuz?", "Titreşim ölçümleri, sıcaklık, nem, basınç ve cihazın kendi çalışma durumu. Kişisel bilgilerinizi cihazla ilişkilendirmiyoruz ve verinizi kimseye satmıyoruz. Ayrıntılar Gizlilik sayfasında."],
        ["Kesin konumum ortaya çıkıyor mu?", "Cihazınızın yaklaşık konumunu mahalle seviyesinde biliyoruz, çünkü bir olayı yakındaki cihazlarla eşleştirmek için bu gerekli. Daha hassas konum yalnızca açık bir pilot anlaşmasıyla paylaşılır."],
        ["Araştırmacılar verime erişebilir mi?", "Yalnızca veri anonimleştirildiğinde ve sizinle ayrıca anlaştığımızda. Şu anda böyle bir akış yok, yol haritasında duruyor."],
        ["Google'ın deprem uyarısından farkı ne?", "Google telefonların ivmeölçerini kullanıyor. Ücretsiz, herkeste var ve iyi de çalışıyor. Ama ölçtüğü şey depremin kaynağı, sizin binanız değil. Biz tam tersini yapıyoruz: binanız nasıl titreşiyor, mevsimle nasıl değişiyor, depremden sonra hangi durumda. Bu soruların cevabı telefondan çıkmaz."],
        ["İnternet kesilince çalışmaya devam eder mi?", "Cihaz ölçmeye devam eder ve olayı kendi belleğine kaydeder. Bildirim gönderemez, çünkü bunun için bağlantı gerekli. İnternet geri geldiğinde bekleyen kayıtları gönderir."],
        ["Elektrik kesilince?", "Cihazın içinde küçük bir süperkapasitör var. Yaklaşık 30-60 saniye köprü güç sağlıyor, bu da son olayı buluta göndermeye yetiyor. Kesinti uzarsa cihaz kapanır."],
        ["Kurulumu zor mu?", "USB-C kabloyu prize takıyorsunuz, cihazı arkasındaki bantla duvara yapıştırıyorsunuz, uygulamadan eşliyorsunuz. Matkap ya da teknisyen gerekmiyor, beş dakikada bitiyor."],
        ["Bir binada kaç tane olmalı?", "Tek cihaz da iş görür. Ama farklı katlara iki veya üç cihaz konursa katların birbirine göre nasıl hareket ettiği görülebilir ve yapı sağlığı takibi için bu çok daha değerlidir. Apartman pilotlarında hedefimiz bina başına en az üç cihaz."],
        ["PGA, PGV, MMI ne demek?", "PGA, depremde yerin ulaştığı maksimum ivme (m/s²). PGV, yerin ulaştığı maksimum hız (cm/s). MMI ise Modified Mercalli şiddet ölçeği; sarsıntının nasıl hissedildiğini I ile XII arasında anlatır. Cihaz olaydan sonra üçünü de raporda gösterir."],
        ["Doğal frekans ne anlatır?", "Her binanın salınmaya yatkın olduğu bir frekans vardır. Beş katlı bir betonarme için tipik değer 2-4 Hz civarındadır. Yapısal hasar bu frekansı düşürür. Düzenli takip ettiğimiz için hasarın erken aşamasında bir işaret yakalayabiliyoruz."],
        ["Cihaz hangi yöne bakmalı?", "Arka yüzünde bir yukarı oku var, o ok tavana baksın. Cihazın X ve Y eksenlerini binanın yatay yönleriyle hizalamaya çalışın. 90 derece yanlış takılırsa veri yine kullanılabilir ama bilgi değeri bir miktar düşer."],
        ["Cihaz konuşma kaydı yapıyor mu?", "Hayır. İçinde mikrofon yok, yalnızca zemin titreşimini ölçen bir ivmeölçer var. Konuşma ya da çevre sesi kaydetmek tamamen farklı bir sensör gerektirir."],
        ["Verim Türkiye dışına gidiyor mu?", "Pilot veri yerleşimi henüz kesinleşmedi. Cihaz verisi toplanmadan önce her pilot sözleşmesinde işleme konumları, aktarımlar, saklama süresi ve hukuki dayanak açıkça belirtilecek."],
        ["Ne zaman satışa çıkıyor?", "Pilotlar 2026 yazında başlıyor. Geniş satışı 2026 sonu ya da 2027 başı olarak hedefliyoruz. Sertifikasyon ve üretim takvimi bu tarihi öteleyebilir. Bültene kaydolursanız kesin tarihi ilk siz duyarsınız."],
      ],
    },
    security: {
      eyebrow: "Güvenlik",
      metaTitle: "Güvenlik",
      metaDescription:
        "Web sitesi güvenliği, çerez onayı, cihaz verisi, şifreli aktarım ve pilot aşamasındaki gizlilik yaklaşımımız.",
      title: "Gerekmeyen veriyi hiç toplamamak en iyi koruma.",
      description:
        "Temel kuralımız bu. Şu anda yayında olan tek şey web sitesi, ama cihaz tarafında da aynı kuralla ilerliyoruz.",
      sections: [
        ["Varsayılan olarak az veri", "Cihaz yalnızca gerekli olanı gönderiyor: hareket, çevre bilgisi, çalışma durumu ve olayın zamanı. Bunların dışında bir şey toplamıyoruz."],
        ["Analitikten önce onay", "Web analitiği yalnızca siz onay verdikten sonra yükleniyor. Bu tercihi alt bilgideki bağlantıdan istediğiniz zaman sıfırlayabilirsiniz."],
        ["Şifreli aktarım", "Site HTTPS ve güvenlik başlıklarıyla çalışıyor. Cihaz trafiğini de uçtan uca şifreli olacak şekilde tasarlıyoruz."],
        ["Tarayıcıya gizli anahtar gitmez", "Özel anahtarlar ve servis jetonları tarayıcıya inen kodda yer almaz. Sunucu ayarlarında veya GitHub Secrets içinde tutulur."],
        ["Güvenlik açığı bildirimi", "Sitede ya da lansman öncesi materyallerde bir güvenlik sorunu bulursanız info@sismosmart.com adresine yazın. Sorumlu açıklama yapan araştırmacılara teşekkür ederiz."],
        ["Cihaz güvenlik planı", "Cihaz çıkmadan önce şunları taahhüt ediyoruz: imzalı ürün yazılımı, şifreli flash bellek, otomatik geri alma destekli iki OTA bölümü ve fabrikada her cihaza özel anahtar. Cihaz piyasaya çıktığında güvenlik belgelerinin tamamını yayımlayacağız."],
      ],
    },
  }),
  es: makeExtraPages({
    technology: {
      eyebrow: "Tecnología",
      metaTitle: "Tecnología: cómo mide SismoSmart",
      metaDescription:
        "Qué hay dentro del dispositivo, cómo distingue un temblor real del ruido y cómo la medición se convierte en un informe legible.",
      title: "Qué hay dentro del dispositivo y cómo te llega el dato",
      description:
        "SismoSmart tiene un solo trabajo: registrar cómo se mueve un edificio. Tanto el aviso rápido durante el temblor como el informe posterior salen de ese mismo registro. Esta página explica cómo se toma.",
      sections: [
        ["Acelerómetro MEMS", "Dentro hay un sensor MEMS de clase ADXL355, alrededor de cien veces más sensible que el acelerómetro de un teléfono. Toma muestras en tres ejes 250 veces por segundo y llega a un piso de ruido cercano a 22 micro-g. Modesto al lado de una estación sísmica profesional, pero de calidad de laboratorio para hardware de consumo."],
        ["Detección STA/LTA", "El dispositivo compara el promedio del último medio segundo con el de los últimos treinta segundos. Cuando esa razón salta, hay un evento. El método se llama STA/LTA y es un estándar en sismología. La calibración piloto busca separar el ruido habitual del edificio de una sacudida, pero puede haber falsos positivos o eventos no detectados hasta completar la validación de campo."],
        ["Búfer local de eventos", "Al superarse el umbral, el dispositivo escribe en memoria una ventana de cuarenta segundos: cuatro antes del evento y treinta y seis después. Si en ese momento no hay internet, guarda la grabación y la envía cuando vuelve la conexión. Una app de teléfono no puede hacer esto."],
        ["Confirmación en la nube", "Que un solo dispositivo se dispare no es evidencia fuerte por sí misma. Cuando tres o más dispositivos de la misma zona se disparan en 60 segundos, el evento queda marcado como confirmado. Ahí es donde cae de verdad la tasa de falsas alarmas. Fuentes públicas como AFAD y USGS aportan una verificación cruzada extra."],
        ["Seguimiento de salud estructural", "Cada edificio tiene una frecuencia natural, el ritmo al que tiende a oscilar por su cuenta. El daño estructural empuja ese número hacia abajo. El dispositivo lo mide cada semana, aprende el patrón estacional y marca una caída inesperada. El nombre técnico del método es análisis modal."],
        ["Informe para el ingeniero", "Tras un evento, el informe trae la aceleración pico del suelo (PGA), la velocidad pico (PGV), una estimación de intensidad Modified Mercalli y el porcentaje de desplazamiento en la frecuencia natural de tu edificio. Son métricas estándar de la ingeniería sísmica. No estamos inventando una escala nueva."],
        ["Conectividad", "V1 funciona con Wi-Fi de 2.4 GHz. La versión empresarial (V2) sumará conectividad celular LTE-M y LoRa mesh, para que los administradores no tengan que meter el dispositivo en el Wi-Fi de la oficina."],
        ["Energía", "USB-C estándar, 5V/2A. Un supercondensador de 1 faradio da entre 30 y 60 segundos de energía puente durante un corte, suficiente para enviar el último evento a la nube. No hay batería que cambiar ni mantenimiento periódico."],
        ["Certificación", "Antes de que salga V1: CE RED (directiva europea de radio), aprobación de frecuencia BTK en Turquía, RoHS y WEEE. Todos los flujos de datos quedan documentados bajo KVKK. La aprobación FCC para el mercado estadounidense es un paso posterior."],
      ],
    },
    pilotProgram: {
      eyebrow: "Programa piloto",
      metaTitle: "Solicitud del programa piloto",
      metaDescription:
        "Piloto gratuito de seis meses para apartamentos, campus, fábricas o edificios de investigación. Ponemos los dispositivos y el soporte; pedimos feedback honesto a cambio.",
      title: "Queremos ver el dispositivo primero en tu edificio.",
      description:
        "El producto aún no está en venta amplia. Lo que buscamos en esta etapa son pocos sitios serios y gente que nos diga qué no funciona. Si encajas en uno de los cuatro grupos de abajo, el formulario al pie es la entrada.",
      sections: [
        ["Apartamentos", "Empezamos con un dispositivo en una vivienda. Si la administración se suma, añadimos equipos en otros pisos. El soporte de instalación es gratuito y ayudamos a coordinar con la administración."],
        ["Campus y fábricas", "Varios edificios, un único panel central. Cada edificio guarda su propio registro. Antes de instalar repasamos la topología de red y los requisitos de seguridad con tu equipo de TI."],
        ["Pilotos municipales", "Despliegues a escala de barrio que muestran dónde se sintió con más fuerza el mismo terremoto. Los datos personales quedan completamente fuera de este flujo. Solo se comparte el agregado por edificio o por ubicación."],
        ["Socios de investigación", "Departamentos universitarios de ingeniería sísmica. Abrimos los datos crudos al análisis académico y a cambio recibimos feedback y la opción de una publicación conjunta. Requiere un acuerdo de confidencialidad y uso de datos."],
        ["Lo que ofrecemos", "Entre tres y diez dispositivos gratis, y no te los pedimos de vuelta cuando termina el piloto. Seis meses sin coste. Acceso directo a tus propios datos. Soporte remoto de instalación por video y teléfono. Ver antes que nadie los cambios del producto mientras dura el piloto."],
        ["Lo que pedimos a cambio", "Que coordines la instalación con la administración o el personal del edificio. Hacemos una llamada de feedback de unos quince minutos al mes. Si ocurre un evento, te pedimos una nota breve. Al final nos gustaría publicar un caso de estudio corto, y con gusto dejamos tu nombre fuera."],
        ["De la solicitud a la instalación", "Rellenas el formulario. El comité piloto lo revisa en cinco días hábiles. Una llamada corta cubre el edificio y si encaja. Se cierran el Wi-Fi y los accesos, y se firma un acuerdo sencillo de cuatro páginas. Los dispositivos se envían. Estamos encima la primera semana y seguimos en contacto regular después."],
      ],
    },
    investors: {
      eyebrow: "Inversores",
      metaTitle: "Inversores: resumen de la ronda semilla",
      metaDescription:
        "Problema, mercado, equipo, hoja de ruta del producto y detalles de la ronda semilla. Un resumen breve para preparar una conversación.",
      title: "Hay una ventana después del terremoto que nadie mide.",
      description:
        "Tras un terremoto fuerte en Turquía, la inspección estructural tarda semanas. En esas semanas las familias adivinan, los negocios se paran y los seguros se atascan. SismoSmart es una startup de hardware que intenta cerrar esa ventana con los datos del propio edificio.",
      sections: [
        ["Problema", "Tras los terremotos de Kahramanmaraş en 2023, la evaluación de edificios en once provincias tardó meses. Los seguros se atascaron, los costes de realojo se dispararon y los vecinos no sabían cuándo podrían volver a casa. Todo el sistema descansa sobre las visitas de ingeniero, y ese es justo el paso que se bloquea en un evento grande."],
        ["Por qué ahora", "Los acelerómetros MEMS de calidad de laboratorio cuestan una quinta parte de lo que costaban hace diez años. Los microcontroladores de doble radio con Wi-Fi y BLE (ESP32-S3) han llegado a precio de consumo. El interés público e inversor por la tecnología de desastres en Turquía nunca ha sido tan alto como desde 2023. Hace tres años no se cumplía ninguna de las tres condiciones."],
        ["Mercado", "Turquía tiene unos veinte millones de hogares y cerca del 70% del país está en zona de riesgo sísmico. Nuestro primer objetivo son propietarios conscientes del riesgo en Estambul, Esmirna y Ankara. La segunda ola son administradores de fincas, aseguradoras y municipios. La tercera es el exterior: Chile, Indonesia, Japón y México."],
        ["Producto", "V1 es un dispositivo de consumo de 79 dólares con Wi-Fi. V1.5 añade microSD y giroscopio. V2 es la versión empresarial con conectividad celular y LoRa. Los ingresos vienen de dos líneas: venta de dispositivos y una suscripción de 5 dólares al mes. A escala apuntamos a una relación LTV/CAC en torno a trece veces."],
        ["Equipo", "Un asesor académico con doctorado en ingeniería sísmica, dos ingenieros civiles con máster trabajando en algoritmos de monitoreo de salud estructural y en el trabajo de campo del piloto, y un fundador que cubre el software embebido y la nube. Todos estamos en Turquía. Las conversaciones de colaboración académica están en marcha."],
        ["Competencia", "Los actores locales (EDIS, Multitek) se quedan en precios B2B y su experiencia móvil es floja. Las alertas gratuitas de Google en Android ocupan el espacio de la notificación, pero no tocan la salud del edificio. Grillo empezó en consumo y se movió hacia el sector público; la lección que sacamos es clara: el hardware de consumo por sí solo no se sostiene. Nosotros acompañamos el dispositivo con una suscripción desde el primer día."],
        ["Hoja de ruta", "Q2 2026: prototipo funcional con STA/LTA, MQTT y demo móvil. Q3 2026: entre cinco y diez instalaciones piloto y los primeros datos reales de campo. Q4 2026: cierre de la ronda semilla y constitución de la sociedad. Q1 2027: certificación CE y primera producción de 1.000 unidades. Q2 2027: lanzamiento y revisión de la placa V1.5."],
        ["Ronda semilla", "Buscamos el equivalente a 250 mil dólares, que nos dan dieciocho meses de margen de caja. Reparto: 36% producción, 32% equipo, 12% marketing, 8% certificación, 6% nube, 6% legal y reserva. En paralelo tenemos una solicitud a TÜBİTAK BiGG (1,35 millones de TL), programas de KOSGEB y créditos de AWS Activate, Google for Startups y Microsoft for Startups."],
        ["A quién buscamos", "Inversores ángel y fondos semilla que hayan visto antes una startup de hardware. Los socios con acceso a la regulación, la fabricación y las redes de seguros en Turquía valen más para nosotros que el dinero rápido. Compartimos la documentación técnica detallada y el modelo financiero bajo acuerdo de confidencialidad."],
      ],
    },
    faq: {
      eyebrow: "FAQ",
      metaTitle: "Preguntas frecuentes",
      metaDescription:
        "Respuestas directas sobre alertas, seguridad del edificio, datos, privacidad, instalación y fechas de lanzamiento.",
      title: "Preguntas frecuentes",
      description:
        "Los productos de terremotos se prometen de más con facilidad. Nosotros intentamos dejar los límites del dispositivo a la vista. Si tu pregunta no está respondida aquí, escribe a info@sismosmart.com.",
      sections: [
        ["¿Este dispositivo me avisará antes del terremoto?", "Hablamos de segundos, no de minutos. Si el terremoto viene de lejos, el dispositivo puede captar la onda P, que viaja más rápido, y avisarte antes de que llegue la onda S destructiva. Si el epicentro está cerca, ese margen se reduce casi a cero. No lo vendemos como sistema de alerta temprana, porque no funciona en todos los terremotos."],
        ["¿Un solo dispositivo puede decirme si mi edificio es seguro?", "No puede. Quien declara un edificio seguro o inseguro es un ingeniero, no un aparato. Lo que hace el dispositivo es dejarle a ese ingeniero algo sólido con lo que trabajar."],
        ["¿Qué datos recogen?", "Lecturas de vibración, temperatura, humedad, presión y el estado de funcionamiento del propio dispositivo. No vinculamos información personal al dispositivo y no vendemos tus datos a nadie. La página de Privacidad tiene el detalle."],
        ["¿Se expone mi ubicación exacta?", "Conocemos la ubicación de tu dispositivo a nivel de barrio, porque la necesitamos para cruzar un evento con los dispositivos cercanos. Cualquier cosa más precisa solo se comparte con un acuerdo piloto explícito."],
        ["¿Pueden los investigadores acceder a mis datos?", "Solo una vez anonimizados y solo bajo un acuerdo separado contigo. Ese flujo todavía no existe; está en la hoja de ruta."],
        ["¿En qué se diferencia de las alertas de Google?", "Google usa el acelerómetro de los teléfonos. Es gratis, ya está en todos los móviles y funciona bien. Pero lo que mide es el origen del terremoto, no tu edificio. Nosotros hacemos lo contrario: cómo vibra tu edificio, cómo cambia con la estación y en qué estado queda después. Un teléfono no responde a eso."],
        ["¿Qué pasa cuando se cae internet?", "El dispositivo sigue midiendo y guarda el evento en su propia memoria. No puede enviar una notificación, porque eso necesita conexión. Cuando internet vuelve, sube lo que estaba esperando."],
        ["¿Y si se corta la luz?", "Dentro hay un pequeño supercondensador. Da entre 30 y 60 segundos de energía puente, suficiente para enviar el último evento a la nube. Si el corte dura más, el dispositivo se apaga."],
        ["¿Es difícil instalarlo?", "Enchufas el cable USB-C, pegas el dispositivo a la pared con el adhesivo de atrás y lo emparejas desde la app. Sin taladro y sin técnico. Cinco minutos."],
        ["¿Cuántos debería tener un edificio?", "Con uno funciona. Pero con dos o tres en pisos distintos se ve cómo se mueven los pisos entre sí, y eso vale mucho más para el seguimiento de la salud estructural. En pilotos de apartamentos apuntamos a tres como mínimo por edificio."],
        ["¿Qué significan PGA, PGV y MMI?", "PGA es la aceleración máxima que alcanza el suelo durante un terremoto, en m/s². PGV es la velocidad máxima, en cm/s. MMI es la escala de intensidad Modified Mercalli, que describe cómo se sintió la sacudida de I a XII. El dispositivo reporta las tres tras un evento."],
        ["¿Qué dice la frecuencia natural?", "Cada edificio tiene una frecuencia a la que tiende a oscilar. Para un edificio de hormigón armado de cinco plantas suele estar entre 2 y 4 Hz. El daño estructural arrastra esa frecuencia hacia abajo. Como la seguimos con regularidad, podemos captar una señal cuando el daño todavía es temprano."],
        ["¿En qué dirección debe ir el dispositivo?", "Hay una flecha hacia arriba en la parte trasera; que apunte al techo. Intenta alinear los ejes X e Y del dispositivo con las direcciones horizontales del edificio. Montado a 90 grados los datos siguen sirviendo, aunque aportan algo menos de información."],
        ["¿El dispositivo graba sonido?", "No. No lleva micrófono, solo un acelerómetro que mide la vibración del suelo. Grabar voz o sonido ambiente exigiría un sensor completamente distinto."],
        ["¿Mis datos salen de Turquía?", "La residencia de datos del piloto aún no es definitiva. Antes de recoger datos del dispositivo, cada acuerdo indicará lugares de tratamiento, transferencias, conservación y base jurídica aplicable."],
        ["¿Cuándo sale a la venta?", "Los pilotos empiezan en verano de 2026. Apuntamos a la venta amplia para finales de 2026 o principios de 2027. La certificación y la fabricación pueden retrasarlo. Si te apuntas al boletín, te enterarás primero de la fecha firme."],
      ],
    },
    security: {
      eyebrow: "Seguridad",
      metaTitle: "Seguridad",
      metaDescription:
        "Cómo manejamos la seguridad del sitio, el consentimiento, los datos del dispositivo, el transporte cifrado y la privacidad durante la fase piloto.",
      title: "El dato que nunca recoges es el dato que no puedes filtrar.",
      description:
        "Esa es nuestra regla básica. Ahora mismo lo único en producción es el sitio web, pero el lado del dispositivo lo construimos con la misma regla.",
      sections: [
        ["Mínimo dato por defecto", "El dispositivo envía solo lo necesario: movimiento, información ambiental, estado de funcionamiento y la hora del evento. No recogemos nada más allá de eso."],
        ["Consentimiento antes de la analítica", "La analítica web se carga solo después de que des tu consentimiento. Puedes revertir esa elección cuando quieras desde el enlace del pie de página."],
        ["Transporte cifrado", "El sitio corre sobre HTTPS con cabeceras de seguridad. El tráfico del dispositivo está diseñado para ir cifrado de extremo a extremo."],
        ["Ningún secreto llega al navegador", "Las claves privadas y los tokens de servicio nunca aparecen en el código que llega al navegador. Se quedan en los ajustes del servidor o en GitHub Secrets."],
        ["Reporte de vulnerabilidades", "Si encuentras un problema de seguridad en el sitio o en materiales previos al lanzamiento, escribe a info@sismosmart.com. Agradecemos a quienes divulgan de forma responsable."],
        ["Plan de seguridad del dispositivo", "Antes de que salga el dispositivo nos comprometemos a: firmware firmado, flash cifrado, dos particiones OTA con reversión automática y una clave única por dispositivo provisionada en fábrica. La documentación de seguridad completa se publica junto con el dispositivo."],
      ],
    },
  }),
  id: makeExtraPages({
    technology: {
      eyebrow: "Teknologi",
      metaTitle: "Teknologi: bagaimana SismoSmart mengukur",
      metaDescription:
        "Apa isi perangkat, bagaimana ia membedakan guncangan asli dari derau, dan bagaimana pengukuran berubah menjadi laporan yang bisa dibaca.",
      title: "Apa yang ada di dalam perangkat, dan bagaimana datanya sampai ke Anda",
      description:
        "SismoSmart punya satu tugas: merekam bagaimana sebuah bangunan bergerak. Notifikasi cepat saat guncangan maupun laporan yang menyusul sesudahnya sama-sama lahir dari rekaman itu. Halaman ini menjelaskan bagaimana rekaman itu diambil.",
      sections: [
        ["Akselerometer MEMS", "Di dalamnya ada sensor MEMS kelas ADXL355, sekitar 100 kali lebih peka daripada akselerometer di ponsel. Ia mengambil sampel tiga sumbu 250 kali per detik dan mencapai noise floor sekitar 22 mikro-g. Sederhana di sebelah stasiun seismik profesional, tapi kelas laboratorium untuk perangkat konsumen."],
        ["Deteksi STA/LTA", "Perangkat membandingkan rata-rata setengah detik terakhir dengan rata-rata tiga puluh detik terakhir. Ketika rasio itu melonjak, berarti ada kejadian. Metodenya bernama STA/LTA dan itu standar dalam seismologi. Kalibrasi pilot ditujukan untuk membedakan kebisingan bangunan biasa dari guncangan, tetapi hasil positif palsu atau kejadian yang terlewat masih mungkin sampai validasi lapangan selesai."],
        ["Buffer kejadian lokal", "Begitu ambang terlewati, perangkat menulis jendela 40 detik ke memorinya: empat detik sebelum kejadian dan tiga puluh enam detik sesudahnya. Kalau saat itu internet mati, ia menyimpan rekamannya dan mengirim ketika koneksi kembali. Aplikasi di ponsel tidak bisa melakukan ini."],
        ["Konfirmasi cloud", "Satu perangkat yang terpicu bukan bukti kuat dengan sendirinya. Ketika tiga perangkat atau lebih di area yang sama terpicu dalam 60 detik, kejadian ditandai sebagai terkonfirmasi. Di titik inilah angka alarm palsu benar-benar turun. Sumber publik seperti AFAD dan USGS memberi pemeriksaan silang tambahan."],
        ["Pemantauan kesehatan struktur", "Setiap bangunan punya frekuensi alami, yaitu laju ia cenderung bergoyang dengan sendirinya. Kerusakan struktur menarik angka itu turun. Perangkat mengukurnya tiap minggu, mempelajari pola musimnya, lalu menandai penurunan yang tidak wajar. Nama teknis metode ini adalah analisis modal."],
        ["Laporan untuk insinyur", "Setelah kejadian, laporan memuat percepatan tanah puncak (PGA), kecepatan tanah puncak (PGV), estimasi intensitas Modified Mercalli, dan persentase pergeseran frekuensi alami bangunan Anda. Semuanya metrik standar teknik gempa. Kami tidak mengarang skala baru."],
        ["Konektivitas", "V1 berjalan di Wi-Fi 2.4 GHz. Versi korporat (V2) akan menambah koneksi seluler LTE-M dan LoRa mesh, supaya pengelola gedung tidak harus memasukkan perangkat ke Wi-Fi kantor."],
        ["Daya", "USB-C standar, 5V/2A. Superkapasitor 1 farad di dalamnya memberi 30 sampai 60 detik daya jembatan saat listrik padam, cukup untuk mengirim kejadian terakhir ke cloud. Tidak ada baterai yang harus diganti dan tidak ada jadwal perawatan."],
        ["Sertifikasi", "Sebelum V1 dikirim: CE RED (direktif radio Eropa), persetujuan frekuensi BTK Turki, kepatuhan RoHS dan WEEE. Semua aliran data didokumentasikan di bawah KVKK. Persetujuan FCC untuk pasar AS adalah langkah berikutnya."],
      ],
    },
    pilotProgram: {
      eyebrow: "Program pilot",
      metaTitle: "Pendaftaran program pilot",
      metaDescription:
        "Pilot enam bulan gratis untuk apartemen, kampus, pabrik, atau bangunan riset. Kami menyediakan perangkat dan dukungan, dan meminta masukan jujur sebagai gantinya.",
      title: "Kami ingin melihat perangkat ini dulu di bangunan Anda.",
      description:
        "Produk belum dijual luas. Yang kami cari pada tahap ini adalah sedikit lokasi yang serius dan orang yang mau bilang apa yang tidak jalan. Kalau Anda masuk salah satu dari empat kelompok di bawah, formulir di bagian bawah adalah pintu masuknya.",
      sections: [
        ["Apartemen", "Kami mulai dengan satu perangkat di satu unit. Kalau pengelola gedung ikut, kami menambah perangkat di lantai lain. Dukungan instalasi gratis, dan kami membantu berkoordinasi dengan pengelola."],
        ["Kampus dan pabrik", "Beberapa bangunan, satu dashboard terpusat. Setiap bangunan menyimpan rekamannya sendiri. Sebelum memasang, kami membahas topologi jaringan dan syarat keamanan bersama tim IT Anda."],
        ["Pilot kota", "Penyebaran skala lingkungan yang memperlihatkan di wilayah mana gempa yang sama terasa lebih kuat. Data pribadi sepenuhnya berada di luar alur ini. Hanya data agregat per bangunan atau per lokasi yang dibagikan."],
        ["Mitra riset", "Departemen teknik gempa di universitas. Kami membuka data mentah untuk analisis akademik, dan sebagai gantinya kami mendapat masukan serta peluang publikasi bersama. Perlu perjanjian kerahasiaan dan berbagi data."],
        ["Yang kami tawarkan", "Tiga sampai sepuluh perangkat gratis, dan kami tidak memintanya kembali saat pilot selesai. Enam bulan tanpa biaya. Akses langsung ke data Anda sendiri. Bantuan instalasi jarak jauh lewat video dan telepon. Melihat lebih dulu perubahan produk selama pilot berjalan."],
        ["Yang kami minta sebagai gantinya", "Anda mengoordinasikan instalasi dengan pengelola gedung atau staf. Kami mengadakan panggilan masukan sekitar lima belas menit sebulan. Kalau ada kejadian, kami minta catatan singkat. Di akhir kami ingin menerbitkan studi kasus pendek, dan kami senang hati tidak mencantumkan nama Anda."],
        ["Dari pendaftaran ke instalasi", "Anda mengisi formulir. Komite pilot meninjaunya dalam lima hari kerja. Panggilan video singkat membahas bangunan dan kesesuaiannya. Wi-Fi dan akses diselesaikan, lalu perjanjian sederhana empat halaman ditandatangani. Perangkat dikirim. Kami mengawal dekat di minggu pertama dan tetap berhubungan rutin sesudahnya."],
      ],
    },
    investors: {
      eyebrow: "Investor",
      metaTitle: "Investor: ringkasan putaran awal",
      metaDescription:
        "Masalah, pasar, tim, peta jalan produk, dan detail putaran pendanaan awal. Ringkasan singkat untuk persiapan percakapan.",
      title: "Ada satu jendela setelah gempa yang tidak diukur siapa pun.",
      description:
        "Setelah gempa besar di Turki, inspeksi struktur memakan waktu berminggu-minggu. Dalam minggu-minggu itu keluarga menebak-nebak, bisnis berhenti, dan asuransi mampat. SismoSmart adalah startup hardware yang mencoba menutup jendela itu dengan data bangunan itu sendiri.",
      sections: [
        ["Masalah", "Setelah gempa Kahramanmaraş 2023, penilaian bangunan di sebelas provinsi memakan waktu berbulan-bulan. Asuransi tersendat, biaya hunian sementara membengkak, dan warga tidak tahu kapan bisa pulang. Seluruh sistem bertumpu pada kunjungan insinyur, dan justru langkah itulah yang macet ketika kejadiannya besar."],
        ["Mengapa sekarang", "Akselerometer MEMS kelas laboratorium kini berharga seperlima dibanding sepuluh tahun lalu. Mikrokontroler radio ganda yang membawa Wi-Fi sekaligus BLE (ESP32-S3) sudah sampai di harga konsumen. Minat publik dan investor pada teknologi kebencanaan di Turki belum pernah setinggi ini sejak 2023. Tiga tahun lalu tak satu pun dari ketiga syarat itu terpenuhi."],
        ["Pasar", "Turki punya sekitar dua puluh juta rumah tangga dan sekitar 70% wilayahnya berada di zona risiko seismik. Target pertama kami adalah pemilik rumah yang sadar risiko gempa di Istanbul, Izmir, dan Ankara. Gelombang kedua adalah pengelola gedung, perusahaan asuransi, dan pemerintah kota. Gelombang ketiga di luar negeri: Chile, Indonesia, Jepang, dan Meksiko."],
        ["Produk", "V1 adalah perangkat konsumen seharga 79 dolar dengan Wi-Fi. V1.5 menambahkan microSD dan giroskop. V2 adalah versi korporat dengan koneksi seluler dan LoRa. Pendapatan datang dari dua jalur: penjualan perangkat dan langganan 5 dolar per bulan. Pada skala tertentu kami menargetkan rasio LTV/CAC sekitar tiga belas kali."],
        ["Tim", "Seorang penasihat akademik bergelar doktor teknik gempa, dua insinyur sipil bergelar master yang menggarap algoritma pemantauan kesehatan struktur dan kerja lapangan pilot, serta seorang pendiri yang menangani perangkat lunak tertanam dan cloud. Kami semua berada di Turki. Pembicaraan kemitraan akademik sedang berjalan."],
        ["Kompetisi", "Pemain domestik (EDIS, Multitek) bertahan di harga B2B dan pengalaman mobile mereka lemah. Peringatan gempa Android gratis dari Google mengisi ruang notifikasi, tapi sama sekali tidak menyentuh kesehatan bangunan. Grillo mulai dari konsumen lalu bergeser ke sektor publik, dan pelajarannya jelas bagi kami: perangkat konsumen saja tidak bertahan. Karena itu kami memasangkan perangkat dengan langganan sejak hari pertama."],
        ["Peta jalan", "Q2 2026: prototipe kerja dengan STA/LTA, MQTT, dan demo mobile. Q3 2026: lima sampai sepuluh instalasi pilot dan data lapangan nyata pertama. Q4 2026: penutupan putaran awal dan pendirian perusahaan. Q1 2027: sertifikasi CE dan produksi pertama 1.000 unit. Q2 2027: peluncuran dan revisi papan V1.5."],
        ["Putaran awal", "Kami mencari dana setara 250 ribu dolar, yang memberi kami umur kas delapan belas bulan. Alokasinya: 36% produksi, 32% tim, 12% pemasaran, 8% sertifikasi, 6% cloud, 6% legal dan cadangan. Secara paralel ada pengajuan TÜBİTAK BiGG (1,35 juta TL), program KOSGEB, serta kredit cloud dari AWS Activate, Google for Startups, dan Microsoft for Startups."],
        ["Yang kami cari", "Investor angel dan dana tahap awal yang pernah melihat startup hardware. Mitra dengan akses ke regulasi, manufaktur, dan jaringan asuransi di Turki lebih berharga bagi kami daripada uang cepat. Dokumen teknis rinci dan model keuangan kami bagikan di bawah perjanjian kerahasiaan."],
      ],
    },
    faq: {
      eyebrow: "FAQ",
      metaTitle: "Pertanyaan yang sering diajukan",
      metaDescription:
        "Jawaban langsung tentang peringatan gempa, keamanan bangunan, data, privasi, instalasi, dan waktu peluncuran.",
      title: "Pertanyaan yang sering diajukan",
      description:
        "Produk gempa gampang sekali dijanjikan berlebihan. Kami berusaha menjaga batas perangkat ini tetap terlihat. Kalau pertanyaan Anda belum terjawab di sini, tulis ke info@sismosmart.com.",
      sections: [
        ["Apakah perangkat ini memperingatkan saya sebelum gempa?", "Kita bicara soal hitungan detik, bukan menit. Kalau gempa datang dari jauh, perangkat bisa menangkap gelombang P yang bergerak cepat dan mengirim notifikasi sebelum gelombang S yang merusak tiba. Kalau pusat gempanya dekat, jeda itu nyaris hilang. Kami tidak memasarkannya sebagai sistem peringatan dini, karena tidak berlaku untuk semua gempa."],
        ["Bisakah satu perangkat menyatakan bangunan saya aman?", "Tidak bisa. Yang berhak menyatakan sebuah bangunan aman atau tidak aman adalah insinyur, bukan perangkat. Yang dilakukan perangkat adalah meninggalkan data konkret untuk insinyur itu."],
        ["Data apa yang Anda kumpulkan?", "Pembacaan getaran, suhu, kelembapan, tekanan, dan status kerja perangkat itu sendiri. Kami tidak menautkan informasi pribadi ke perangkat dan tidak menjual data Anda kepada siapa pun. Rinciannya ada di halaman Privasi."],
        ["Apakah lokasi persis saya terbuka?", "Kami tahu lokasi perangkat Anda pada tingkat lingkungan, karena itu diperlukan untuk mencocokkan kejadian dengan perangkat di sekitarnya. Apa pun yang lebih rinci hanya dibagikan dengan perjanjian pilot yang eksplisit."],
        ["Bisakah peneliti mengakses data saya?", "Hanya setelah data dianonimkan dan hanya dengan perjanjian terpisah dengan Anda. Alur itu belum ada; masih ada di peta jalan."],
        ["Apa bedanya dari peringatan gempa Google?", "Google memakai akselerometer di ponsel. Gratis, sudah ada di semua orang, dan bekerja dengan baik. Tapi yang ia ukur adalah sumber gempanya, bukan bangunan Anda. Kami melakukan sebaliknya: bagaimana bangunan Anda bergetar, bagaimana ia berubah menurut musim, dan dalam kondisi apa ia setelah gempa. Ponsel tidak bisa menjawab itu."],
        ["Apa yang terjadi saat internet putus?", "Perangkat tetap mengukur dan menyimpan kejadian di memorinya sendiri. Ia tidak bisa mengirim notifikasi, karena itu butuh koneksi. Saat internet kembali, ia mengunggah apa pun yang menunggu."],
        ["Bagaimana saat listrik padam?", "Ada superkapasitor kecil di dalamnya. Ia memberi sekitar 30 sampai 60 detik daya jembatan, cukup untuk mengirim kejadian terakhir ke cloud. Kalau padamnya lebih lama, perangkat mati."],
        ["Seberapa sulit instalasinya?", "Anda colokkan kabel USB-C ke stopkontak, tempelkan perangkat ke dinding dengan perekat di belakangnya, lalu pasangkan lewat aplikasi. Tanpa bor dan tanpa teknisi. Lima menit selesai."],
        ["Berapa banyak yang sebaiknya dipasang dalam satu bangunan?", "Satu sudah bekerja. Tapi dengan dua atau tiga di lantai berbeda, terlihat bagaimana lantai-lantai bergerak relatif satu sama lain, dan itu jauh lebih berharga untuk pemantauan kesehatan struktur. Di pilot apartemen kami menargetkan minimal tiga per bangunan."],
        ["Apa arti PGA, PGV, dan MMI?", "PGA adalah percepatan maksimum yang dicapai tanah saat gempa, dalam m/s². PGV adalah kecepatan maksimumnya, dalam cm/s. MMI adalah skala intensitas Modified Mercalli, yang menggambarkan bagaimana guncangan terasa dari I sampai XII. Perangkat melaporkan ketiganya setelah kejadian."],
        ["Apa yang dikatakan frekuensi alami?", "Setiap bangunan punya frekuensi yang membuatnya cenderung bergoyang. Untuk bangunan beton bertulang lima lantai, angka tipikalnya sekitar 2 sampai 4 Hz. Kerusakan struktur menyeret frekuensi itu turun. Karena kami memantaunya secara rutin, kami bisa menangkap sinyal saat kerusakannya masih dini."],
        ["Ke arah mana perangkat harus menghadap?", "Ada panah ke atas di bagian belakang; arahkan ke langit-langit. Usahakan sumbu X dan Y perangkat sejajar dengan arah horizontal bangunan. Kalau terpasang meleset 90 derajat, datanya masih terpakai, hanya nilainya sedikit berkurang."],
        ["Apakah perangkat merekam suara?", "Tidak. Tidak ada mikrofon di dalamnya, hanya akselerometer yang mengukur getaran tanah. Merekam percakapan atau suara sekitar butuh sensor yang sama sekali berbeda."],
        ["Apakah data saya meninggalkan Turki?", "Lokasi data pilot belum final. Sebelum data perangkat dikumpulkan, setiap perjanjian pilot akan menjelaskan lokasi pemrosesan, transfer, masa simpan, dan dasar hukum yang berlaku."],
        ["Kapan mulai dijual?", "Pilot dimulai pada pertengahan 2026. Kami menargetkan penjualan luas pada akhir 2026 atau awal 2027. Sertifikasi dan manufaktur bisa menggeser tanggal itu. Daftar buletin dan Anda yang pertama tahu tanggal pastinya."],
      ],
    },
    security: {
      eyebrow: "Keamanan",
      metaTitle: "Keamanan",
      metaDescription:
        "Bagaimana kami menangani keamanan situs, persetujuan, data perangkat, pengiriman terenkripsi, dan privasi selama fase pilot.",
      title: "Data yang tidak pernah dikumpulkan adalah data yang tidak bisa bocor.",
      description:
        "Itu aturan dasar kami. Saat ini yang sudah berjalan hanyalah situs web, tapi sisi perangkat kami bangun dengan aturan yang sama.",
      sections: [
        ["Data minimal secara default", "Perangkat hanya mengirim yang diperlukan: gerakan, informasi lingkungan, status kerja, dan waktu kejadian. Di luar itu kami tidak mengumpulkan apa pun."],
        ["Persetujuan sebelum analitik", "Analitik web hanya dimuat setelah Anda memberi persetujuan. Anda bisa membatalkan pilihan itu kapan saja lewat tautan di bagian bawah halaman."],
        ["Pengiriman terenkripsi", "Situs berjalan di HTTPS dengan header keamanan. Lalu lintas perangkat dirancang terenkripsi dari ujung ke ujung."],
        ["Tidak ada rahasia yang sampai ke browser", "Kunci privat dan token layanan tidak pernah muncul di kode yang dikirim ke browser. Semuanya tetap di pengaturan server atau di GitHub Secrets."],
        ["Pelaporan kerentanan", "Kalau Anda menemukan masalah keamanan di situs atau di materi pra-peluncuran, tulis ke info@sismosmart.com. Kami berterima kasih kepada peneliti yang mengungkapkannya secara bertanggung jawab."],
        ["Rencana keamanan perangkat", "Sebelum perangkat dikirim, kami berkomitmen pada firmware bertanda tangan, flash terenkripsi, dua partisi OTA dengan rollback otomatis, dan kunci unik per perangkat yang ditanam di pabrik. Dokumentasi keamanan lengkap terbit bersama perangkatnya."],
      ],
    },
  }),
  it: makeExtraPages({
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
  }),
  pt: makeExtraPages({
    technology: {
      eyebrow: "Tecnologia",
      metaTitle: "Tecnologia: como o SismoSmart mede",
      metaDescription:
        "O que tem dentro do dispositivo, como ele separa um tremor real do ruído e como a medição vira um relatório legível.",
      title: "O que tem dentro do dispositivo e como o dado chega até você",
      description:
        "O SismoSmart tem um único trabalho: registrar como um prédio se move. Tanto a notificação rápida durante o tremor quanto o relatório que vem depois saem desse mesmo registro. Esta página explica como ele é feito.",
      sections: [
        ["Acelerômetro MEMS", "Dentro há um sensor MEMS classe ADXL355, cerca de 100 vezes mais sensível que o acelerômetro de um celular. Ele amostra três eixos 250 vezes por segundo e chega a um piso de ruído perto de 22 micro-g. Modesto ao lado de uma estação sísmica profissional, mas de qualidade de laboratório para eletrônica de consumo."],
        ["Detecção STA/LTA", "O dispositivo compara a média do último meio segundo com a média dos últimos trinta segundos. Quando essa razão pula, há um evento. O método se chama STA/LTA e é padrão em sismologia. A calibração piloto busca separar o ruído comum do prédio de uma vibração, mas falsos positivos ou eventos não detectados continuam possíveis até a validação de campo."],
        ["Buffer local de eventos", "Cruzado o limiar, o dispositivo escreve na memória uma janela de 40 segundos: quatro segundos antes do evento e trinta e seis depois. Se a internet estiver fora nesse momento, ele guarda a gravação e envia quando a conexão volta. Um app de celular não consegue fazer isso."],
        ["Confirmação na nuvem", "Um dispositivo disparando sozinho não é prova forte. Quando três ou mais dispositivos da mesma área disparam em 60 segundos, o evento é marcado como confirmado. É aí que a taxa de alarme falso cai de verdade. Fontes públicas como AFAD e USGS dão uma checagem cruzada a mais."],
        ["Acompanhamento de saúde estrutural", "Todo prédio tem uma frequência natural, ou seja, o ritmo em que ele tende a oscilar sozinho. O dano estrutural puxa esse número para baixo. O dispositivo mede toda semana, aprende o padrão sazonal e sinaliza uma queda inesperada. O nome técnico do método é análise modal."],
        ["Relatório para o engenheiro", "Depois de um evento, o relatório traz a aceleração máxima do solo (PGA), a velocidade máxima (PGV), uma estimativa de intensidade Modified Mercalli e a porcentagem de deslocamento na frequência natural do seu prédio. São métricas padrão da engenharia sísmica. Não estamos inventando escala nova."],
        ["Conectividade", "V1 roda em Wi-Fi de 2,4 GHz. A versão corporativa (V2) vai somar conexão celular LTE-M e LoRa mesh, para que síndicos não precisem colocar o dispositivo no Wi-Fi do escritório."],
        ["Energia", "USB-C padrão, 5V/2A. Um supercapacitor de 1 farad dá de 30 a 60 segundos de energia ponte durante uma queda, o bastante para mandar o último evento para a nuvem. Não há bateria para trocar nem manutenção periódica."],
        ["Certificação", "Antes de o V1 sair: CE RED (diretiva europeia de rádio), aprovação de frequência BTK na Turquia, conformidade RoHS e WEEE. Todos os fluxos de dados ficam documentados sob a KVKK. A aprovação FCC para o mercado americano é um passo posterior."],
      ],
    },
    pilotProgram: {
      eyebrow: "Programa piloto",
      metaTitle: "Inscrição no programa piloto",
      metaDescription:
        "Piloto gratuito de seis meses para apartamentos, campi, fábricas ou prédios de pesquisa. Nós damos os dispositivos e o suporte, e pedimos feedback honesto em troca.",
      title: "Queremos ver o dispositivo primeiro no seu prédio.",
      description:
        "O produto ainda não está em venda ampla. O que buscamos nesta fase são poucos locais sérios e gente disposta a dizer o que não funciona. Se você se encaixa em um dos quatro grupos abaixo, o formulário no fim é a porta de entrada.",
      sections: [
        ["Apartamentos", "Começamos com um dispositivo em uma unidade. Se a administração entrar junto, acrescentamos dispositivos em outros andares. O suporte de instalação é gratuito e ajudamos na coordenação com o síndico."],
        ["Campi e fábricas", "Vários prédios, um único painel central. Cada prédio guarda o próprio registro. Antes de instalar, revisamos a topologia de rede e os requisitos de segurança com o seu time de TI."],
        ["Pilotos municipais", "Implantações em escala de bairro que mostram em qual região o mesmo terremoto foi sentido com mais força. Dados pessoais ficam totalmente fora desse fluxo. Só o agregado por prédio ou por local é compartilhado."],
        ["Parceiros de pesquisa", "Departamentos universitários de engenharia sísmica. Abrimos os dados brutos para análise acadêmica e, em troca, recebemos feedback e a chance de uma publicação conjunta. Exige acordo de confidencialidade e de compartilhamento de dados."],
        ["O que oferecemos", "De três a dez dispositivos grátis, e não pedimos de volta quando o piloto acaba. Seis meses sem custo. Acesso direto aos seus próprios dados. Suporte remoto de instalação por vídeo e telefone. Ver antes as mudanças do produto enquanto o piloto corre."],
        ["O que pedimos em troca", "Que você coordene a instalação com a administração ou a equipe do prédio. Fazemos uma chamada de feedback de uns quinze minutos por mês. Se acontecer um evento, pedimos uma nota curta. No fim gostaríamos de publicar um pequeno estudo de caso, e de bom grado deixamos seu nome de fora."],
        ["Da inscrição à instalação", "Você preenche o formulário. O comitê piloto avalia em cinco dias úteis. Uma chamada curta cobre o prédio e se ele se encaixa. Wi-Fi e acessos são acertados, e um acordo simples de quatro páginas é assinado. Os dispositivos são enviados. Acompanhamos de perto na primeira semana e seguimos em contato regular depois."],
      ],
    },
    investors: {
      eyebrow: "Investidores",
      metaTitle: "Investidores: resumo da rodada inicial",
      metaDescription:
        "Problema, mercado, equipe, roteiro do produto e detalhes da rodada inicial. Um resumo curto para preparar uma conversa.",
      title: "Existe uma janela depois do terremoto que ninguém mede.",
      description:
        "Depois de um grande terremoto na Turquia, a inspeção estrutural leva semanas. Nessas semanas as famílias adivinham, os negócios param e os seguros travam. A SismoSmart é uma startup de hardware tentando fechar essa janela com os dados do próprio prédio.",
      sections: [
        ["Problema", "Depois dos terremotos de Kahramanmaraş em 2023, a avaliação de prédios em onze províncias levou meses. Os seguros travaram, os custos de moradia temporária dispararam e os moradores não sabiam quando poderiam voltar. O sistema inteiro depende de visitas de engenheiro, e é exatamente esse passo que entope quando o evento é grande."],
        ["Por que agora", "Acelerômetros MEMS de qualidade de laboratório custam um quinto do que custavam há dez anos. Microcontroladores de rádio duplo que trazem Wi-Fi e BLE juntos (ESP32-S3) chegaram a preço de consumo. O interesse público e de investidores por tecnologia de desastres na Turquia nunca esteve tão alto quanto desde 2023. Há três anos nenhuma dessas três condições existia."],
        ["Mercado", "A Turquia tem cerca de vinte milhões de domicílios e cerca de 70% do país fica em zona de risco sísmico. Nosso primeiro alvo são proprietários conscientes do risco em Istambul, Esmirna e Ancara. A segunda onda são síndicos, seguradoras e prefeituras. A terceira é o exterior: Chile, Indonésia, Japão e México."],
        ["Produto", "O V1 é um dispositivo de consumo de 79 dólares com Wi-Fi. O V1.5 acrescenta microSD e giroscópio. O V2 é a versão corporativa, com conexão celular e LoRa. A receita vem de duas linhas: venda do dispositivo e uma assinatura de 5 dólares por mês. Em escala, miramos uma relação LTV/CAC em torno de treze vezes."],
        ["Equipe", "Um consultor acadêmico com doutorado em engenharia sísmica, dois engenheiros civis com mestrado trabalhando nos algoritmos de monitoramento de saúde estrutural e no campo dos pilotos, e um fundador cuidando do software embarcado e da nuvem. Estamos todos na Turquia. As conversas de parceria acadêmica estão em andamento."],
        ["Concorrência", "Os players domésticos (EDIS, Multitek) ficam em preço B2B e a experiência mobile deles é fraca. Os alertas gratuitos do Google no Android ocupam o espaço da notificação, mas não tocam na saúde do prédio. A Grillo começou no consumo e migrou para o setor público; a lição que tiramos é clara: hardware de consumo sozinho não se sustenta. Por isso acoplamos o dispositivo a uma assinatura desde o primeiro dia."],
        ["Roteiro", "Q2 2026: protótipo funcionando com STA/LTA, MQTT e demo mobile. Q3 2026: cinco a dez instalações piloto e os primeiros dados reais de campo. Q4 2026: fechamento da rodada e constituição da empresa. Q1 2027: certificação CE e primeira produção de 1.000 unidades. Q2 2027: lançamento e revisão da placa V1.5."],
        ["A rodada", "Buscamos o equivalente a 250 mil dólares, o que nos dá dezoito meses de fôlego de caixa. Alocação: 36% produção, 32% equipe, 12% marketing, 8% certificação, 6% nuvem, 6% jurídico e reserva. Em paralelo temos uma inscrição no TÜBİTAK BiGG (1,35 milhão de TL), programas do KOSGEB e créditos de nuvem da AWS Activate, Google for Startups e Microsoft for Startups."],
        ["O que buscamos", "Investidores anjo e fundos de estágio inicial que já tenham visto uma startup de hardware. Parceiros com acesso à regulação, à manufatura e às redes de seguro na Turquia valem mais para nós do que dinheiro rápido. A documentação técnica detalhada e o modelo financeiro compartilhamos sob acordo de confidencialidade."],
      ],
    },
    faq: {
      eyebrow: "FAQ",
      metaTitle: "Perguntas frequentes",
      metaDescription:
        "Respostas diretas sobre alerta de terremoto, segurança do prédio, dados, privacidade, instalação e prazos de lançamento.",
      title: "Perguntas frequentes",
      description:
        "Produtos de terremoto prometem demais com facilidade. Nós tentamos manter os limites do dispositivo à vista. Se a sua pergunta não estiver respondida aqui, escreva para info@sismosmart.com.",
      sections: [
        ["Esse dispositivo vai me avisar antes do terremoto?", "Estamos falando de segundos, não de minutos. Se o terremoto vem de longe, o dispositivo pode pegar a onda P, que corre mais rápido, e avisar antes de a onda S destrutiva chegar. Se o epicentro é perto, essa margem some. Não vendemos isso como sistema de alerta precoce, porque não funciona em todo terremoto."],
        ["Um dispositivo pode dizer se meu prédio é seguro?", "Não pode. Quem declara um prédio seguro ou inseguro é um engenheiro, não um aparelho. O que o dispositivo faz é deixar para esse engenheiro algo concreto com que trabalhar."],
        ["Quais dados vocês coletam?", "Leituras de vibração, temperatura, umidade, pressão e o estado de funcionamento do próprio dispositivo. Não associamos informação pessoal ao dispositivo e não vendemos seus dados para ninguém. Os detalhes estão na página de Privacidade."],
        ["Minha localização exata fica exposta?", "Sabemos a localização do seu dispositivo em nível de bairro, porque precisamos dela para cruzar um evento com os dispositivos próximos. Qualquer coisa mais precisa só é compartilhada com um acordo piloto explícito."],
        ["Pesquisadores podem acessar meus dados?", "Só depois de anonimizados e só com um acordo separado com você. Esse fluxo ainda não existe; está no roteiro."],
        ["Qual a diferença para os alertas do Google?", "O Google usa o acelerômetro dos celulares. É grátis, já está em todo mundo e funciona bem. Mas o que ele mede é a origem do terremoto, não o seu prédio. Nós fazemos o contrário: como seu prédio vibra, como isso muda com a estação e em que estado ele fica depois do terremoto. Um celular não responde a essas perguntas."],
        ["O que acontece quando cai a internet?", "O dispositivo continua medindo e grava o evento na própria memória. Ele não consegue mandar notificação, porque isso exige conexão. Quando a internet volta, ele envia o que estava esperando."],
        ["E se cair a luz?", "Há um pequeno supercapacitor dentro. Ele dá de 30 a 60 segundos de energia ponte, o suficiente para enviar o último evento para a nuvem. Se a queda durar mais, o dispositivo desliga."],
        ["Instalar é difícil?", "Você liga o cabo USB-C na tomada, cola o dispositivo na parede com o adesivo de trás e pareia pelo app. Sem furadeira e sem técnico. Cinco minutos."],
        ["Quantos um prédio deveria ter?", "Um já resolve. Mas com dois ou três em andares diferentes dá para ver como os andares se movem entre si, e isso vale muito mais para o acompanhamento da saúde estrutural. Em pilotos de apartamento miramos pelo menos três por prédio."],
        ["O que significam PGA, PGV e MMI?", "PGA é a aceleração máxima que o solo atinge durante um terremoto, em m/s². PGV é a velocidade máxima, em cm/s. MMI é a escala de intensidade Modified Mercalli, que descreve como o tremor foi sentido, de I a XII. O dispositivo reporta os três depois de um evento."],
        ["O que a frequência natural diz?", "Todo prédio tem uma frequência em que tende a oscilar. Para um prédio de concreto armado de cinco andares, o valor típico fica entre 2 e 4 Hz. O dano estrutural arrasta essa frequência para baixo. Como acompanhamos com regularidade, conseguimos captar um sinal enquanto o dano ainda é inicial."],
        ["Para qual lado o dispositivo deve apontar?", "Há uma seta para cima nas costas; aponte para o teto. Tente alinhar os eixos X e Y do dispositivo com as direções horizontais do prédio. Montado 90 graus torto, os dados ainda servem, embora carreguem um pouco menos de informação."],
        ["O dispositivo grava som?", "Não. Não tem microfone, só um acelerômetro que mede a vibração do solo. Gravar conversa ou som ambiente exigiria um sensor completamente diferente."],
        ["Meus dados saem da Turquia?", "A residência dos dados do piloto ainda não é definitiva. Antes da coleta, cada acordo indicará locais de tratamento, transferências, retenção e a base jurídica aplicável."],
        ["Quando entra à venda?", "Os pilotos começam no meio de 2026. Miramos a venda ampla para o fim de 2026 ou começo de 2027. Certificação e fabricação podem empurrar a data. Assine a newsletter e você saberá a data definitiva primeiro."],
      ],
    },
    security: {
      eyebrow: "Segurança",
      metaTitle: "Segurança",
      metaDescription:
        "Como lidamos com a segurança do site, o consentimento, os dados do dispositivo, o transporte criptografado e a privacidade durante a fase piloto.",
      title: "O dado que você nunca coleta é o dado que não vaza.",
      description:
        "Essa é a nossa regra básica. No momento a única coisa no ar é o site, mas o lado do dispositivo estamos construindo com a mesma regra.",
      sections: [
        ["Pouco dado por padrão", "O dispositivo envia só o necessário: movimento, informação ambiental, estado de funcionamento e a hora do evento. Fora isso, não coletamos nada."],
        ["Consentimento antes da analítica", "A analítica web só carrega depois que você consente. Você pode desfazer essa escolha quando quiser pelo link no rodapé."],
        ["Transporte criptografado", "O site roda em HTTPS com cabeçalhos de segurança. O tráfego do dispositivo é desenhado para ser criptografado ponta a ponta."],
        ["Nenhum segredo chega ao navegador", "Chaves privadas e tokens de serviço nunca aparecem no código que vai para o navegador. Eles ficam nas configurações do servidor ou no GitHub Secrets."],
        ["Relato de vulnerabilidades", "Se encontrar um problema de segurança no site ou em materiais pré-lançamento, escreva para info@sismosmart.com. Somos gratos a quem divulga de forma responsável."],
        ["Plano de segurança do dispositivo", "Antes de o dispositivo sair, nos comprometemos com firmware assinado, flash criptografado, duas partições OTA com rollback automático e uma chave única por dispositivo gravada na fábrica. A documentação de segurança completa sai junto com o dispositivo."],
      ],
    },
  }),
};

const navigationLabels: Record<Locale, Record<Exclude<PageKey, "home">, string>> = {
  tr: {
    product: "Ürün",
    technology: "Teknoloji",
    howItWorks: "Nasıl çalışır",
    pilotProgram: "Pilot program",
    investors: "Yatırımcılar",
    faq: "SSS",
    about: "Hakkımızda",
    contact: "İletişim",
    privacy: "Gizlilik",
    terms: "Şartlar",
    security: "Güvenlik",
    press: "Basın",
  },
  en: {
    product: "Product",
    technology: "Technology",
    howItWorks: "How it works",
    pilotProgram: "Pilot program",
    investors: "Investors",
    faq: "FAQ",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    security: "Security",
    press: "Press",
  },
  es: {
    product: "Producto",
    technology: "Tecnología",
    howItWorks: "Cómo funciona",
    pilotProgram: "Programa piloto",
    investors: "Inversores",
    faq: "FAQ",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
    security: "Seguridad",
    press: "Prensa",
  },
  it: {
    product: "Prodotto",
    technology: "Tecnologia",
    howItWorks: "Come funziona",
    pilotProgram: "Programma pilota",
    investors: "Investitori",
    faq: "FAQ",
    about: "Chi siamo",
    contact: "Contatto",
    privacy: "Privacy",
    terms: "Termini",
    security: "Sicurezza",
    press: "Stampa",
  },
  id: {
    product: "Produk",
    technology: "Teknologi",
    howItWorks: "Cara kerja",
    pilotProgram: "Program pilot",
    investors: "Investor",
    faq: "FAQ",
    about: "Tentang",
    contact: "Kontak",
    privacy: "Privasi",
    terms: "Syarat",
    security: "Keamanan",
    press: "Media",
  },
  pt: {
    product: "Produto",
    technology: "Tecnologia",
    howItWorks: "Como funciona",
    pilotProgram: "Programa piloto",
    investors: "Investidores",
    faq: "FAQ",
    about: "Sobre",
    contact: "Contato",
    privacy: "Privacidade",
    terms: "Termos",
    security: "Segurança",
    press: "Imprensa",
  },
};

const layoutLabels: Record<
  Locale,
  {
    explore: string;
    note: string;
    menu: string;
    close: string;
    privacy: string;
    notFoundTitle: string;
    notFoundDescription: string;
    notFoundHomeCta: string;
    theme: string;
    nav: string;
  }
> = {
  tr: {
    explore: "Keşfet",
    note: "Depremden sonra binanızda ne olduğunu ölçmek için.",
    menu: "Menüyü aç",
    close: "Menüyü kapat",
    privacy: "Gizlilik tercihleri",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundDescription:
      "Aradığınız adres burada yok. Bir dil seçip ana sayfaya dönebilirsiniz.",
    notFoundHomeCta: "Türkçe ana sayfa",
    theme: "Koyu ve açık tema arasında geçiş yap",
    nav: "Ana gezinme",
  },
  en: {
    explore: "Explore",
    note: "Measure what happened inside your building after an earthquake.",
    menu: "Open menu",
    close: "Close menu",
    privacy: "Privacy preferences",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This address does not exist. Pick a language below to get back to the site.",
    notFoundHomeCta: "English home",
    theme: "Switch between dark and light theme",
    nav: "Primary navigation",
  },
  es: {
    explore: "Explorar",
    note: "Medir qué pasó en tu edificio después de un terremoto.",
    menu: "Abrir menú",
    close: "Cerrar menú",
    privacy: "Preferencias de privacidad",
    notFoundTitle: "Página no encontrada",
    notFoundDescription:
      "Esta dirección no existe. Elige un idioma para volver al sitio.",
    notFoundHomeCta: "Inicio en español",
    theme: "Cambiar entre tema oscuro y claro",
    nav: "Navegación principal",
  },
  it: {
    explore: "Esplora",
    note: "Misurare cosa è successo nel tuo edificio dopo un terremoto.",
    menu: "Apri menu",
    close: "Chiudi menu",
    privacy: "Preferenze privacy",
    notFoundTitle: "Pagina non trovata",
    notFoundDescription:
      "Questo indirizzo non esiste. Scegli una lingua per tornare al sito.",
    notFoundHomeCta: "Home in italiano",
    theme: "Passa dal tema scuro a quello chiaro",
    nav: "Navigazione principale",
  },
  id: {
    explore: "Jelajahi",
    note: "Mengukur apa yang terjadi di bangunan Anda setelah gempa.",
    menu: "Buka menu",
    close: "Tutup menu",
    privacy: "Preferensi privasi",
    notFoundTitle: "Halaman tidak ditemukan",
    notFoundDescription:
      "Alamat ini tidak ada. Pilih bahasa untuk kembali ke situs.",
    notFoundHomeCta: "Beranda Bahasa Indonesia",
    theme: "Beralih antara tema gelap dan terang",
    nav: "Navigasi utama",
  },
  pt: {
    explore: "Explorar",
    note: "Medir o que aconteceu no seu prédio depois de um terremoto.",
    menu: "Abrir menu",
    close: "Fechar menu",
    privacy: "Preferências de privacidade",
    notFoundTitle: "Página não encontrada",
    notFoundDescription:
      "Este endereço não existe. Escolha um idioma para voltar ao site.",
    notFoundHomeCta: "Início em português",
    theme: "Alternar entre tema escuro e claro",
    nav: "Navegação principal",
  },
};

export function getPages(locale: Locale) {
  return {
    ...pagesByLocale[locale],
    ...extraPagesByLocale[locale],
  };
}

export function resolveStaticPageKey(segment: string): StaticPageKey | null {
  return (
    staticPageKeys.find((key) => routeSegments[key].slice(1) === segment) ?? null
  );
}

export function getPrimaryNavigation(locale: Locale): SiteLink[] {
  const labels = navigationLabels[locale];

  return [
    { label: labels.product, href: routeSegments.product },
    { label: labels.technology, href: routeSegments.technology },
    { label: labels.howItWorks, href: routeSegments.howItWorks },
    { label: labels.pilotProgram, href: routeSegments.pilotProgram },
    { label: labels.investors, href: routeSegments.investors },
    { label: labels.contact, href: routeSegments.contact },
  ];
}

export function getFooterNavigation(locale: Locale): SiteLink[] {
  const labels = navigationLabels[locale];

  return [
    { label: labels.product, href: routeSegments.product },
    { label: labels.technology, href: routeSegments.technology },
    { label: labels.howItWorks, href: routeSegments.howItWorks },
    { label: labels.pilotProgram, href: routeSegments.pilotProgram },
    { label: labels.investors, href: routeSegments.investors },
    { label: labels.faq, href: routeSegments.faq },
    { label: labels.about, href: routeSegments.about },
    { label: labels.press, href: routeSegments.press },
    { label: labels.privacy, href: routeSegments.privacy },
    { label: labels.terms, href: routeSegments.terms },
    { label: labels.security, href: routeSegments.security },
    { label: labels.contact, href: routeSegments.contact },
  ];
}

export function getLayoutChromeLabels(locale: Locale) {
  // "contact" is intentionally the same string already defined in
  // navigationLabels for this locale, reused here instead of duplicated.
  return {
    ...layoutLabels[locale],
    contact: navigationLabels[locale].contact,
  };
}
