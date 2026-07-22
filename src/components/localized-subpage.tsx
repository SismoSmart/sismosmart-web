import { ContactForm } from "@/components/contact-form";
import { FrequencyTrend } from "@/components/frequency-trend";
import { PageHero } from "@/components/page-hero";
import { PilotProgramForm } from "@/components/pilot-program-form";
import { ProductVisual } from "@/components/product-visual";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { withBasePath } from "@/lib/base-path";
import {
  getPages,
  type StaticPageKey,
} from "@/lib/pages";
import { getLocalizedHref, isLocale, locales, type Locale } from "@/lib/site";
import Image from "next/image";

// Labels for the technology page's structural-health chart. Kept here as a
// small dict rather than threaded through every locale's page copy, since the
// chart is specific to one page.
const frequencyTrendLabels: Record<
  Locale,
  { eyebrow: string; title: string; caption: string; baseline: string; event: string }
> = {
  tr: {
    eyebrow: "Yapı sağlığı",
    title: "Doğal frekans, hasarın erken habercisi",
    caption:
      "Bir binanın doğal frekansı aylar boyunca küçük mevsimsel dalgalanmalarla sabit kalır. Ciddi bir sarsıntıdan sonra bu değer düşer ve eski seviyesine dönmez. Cihaz bu kaymayı yakalar.",
    baseline: "Sağlıklı taban",
    event: "Olay",
  },
  en: {
    eyebrow: "Structural health",
    title: "Natural frequency is an early sign of damage",
    caption:
      "A building's natural frequency holds steady for months, wobbling only with the seasons. After a serious tremor it drops and does not return to where it was. The device catches that shift.",
    baseline: "Healthy baseline",
    event: "Event",
  },
  es: {
    eyebrow: "Salud estructural",
    title: "La frecuencia natural es una señal temprana de daño",
    caption:
      "La frecuencia natural de un edificio se mantiene estable durante meses, oscilando solo con las estaciones. Tras un temblor serio baja y no vuelve a su valor anterior. El dispositivo detecta ese cambio.",
    baseline: "Base sana",
    event: "Evento",
  },
  it: {
    eyebrow: "Salute strutturale",
    title: "La frequenza naturale è un segnale precoce di danno",
    caption:
      "La frequenza naturale di un edificio resta stabile per mesi, oscillando solo con le stagioni. Dopo una scossa seria cala e non torna al valore di prima. Il dispositivo coglie quello spostamento.",
    baseline: "Base sana",
    event: "Evento",
  },
  id: {
    eyebrow: "Kesehatan struktur",
    title: "Frekuensi alami adalah tanda awal kerusakan",
    caption:
      "Frekuensi alami sebuah bangunan tetap stabil selama berbulan-bulan, hanya bergoyang mengikuti musim. Setelah guncangan serius, nilainya turun dan tidak kembali seperti semula. Perangkat menangkap pergeseran itu.",
    baseline: "Garis dasar sehat",
    event: "Kejadian",
  },
  pt: {
    eyebrow: "Saúde estrutural",
    title: "A frequência natural é um sinal precoce de dano",
    caption:
      "A frequência natural de um prédio se mantém estável por meses, oscilando só com as estações. Depois de um tremor sério ela cai e não volta ao valor anterior. O dispositivo capta essa mudança.",
    baseline: "Base saudável",
    event: "Evento",
  },
};

const productLabels: Record<
  Locale,
  {
    cloudTitle: string;
    detailDescriptions: [string, string, string, string];
    doesNotClaimTitle: string;
    installationTitle: string;
    measuresTitle: string;
    nonClaims: [string, string, string];
    overviewTitle: string;
    overviewDescription: string;
    pilotTitle: string;
    useCasesEyebrow: string;
    useCasesTitle: string;
    useCasesDescription: string;
    category: string;
    traditional: string;
    mobile: string;
    ctaTitle: string;
    ctaDescription: string;
  }
> = {
  tr: {
    cloudTitle: "Bulut ve uygulama",
    detailDescriptions: [
      "Üç eksenli hareket, LED durumu, yerel kayıt ve cihaz sağlığı.",
      "Takın, eşleyin, durumu kontrol edin, gerekirse cihaz ekleyin.",
      "Wi-Fi ile şifreli veri, uygulama ekranları ve yazılım güncellemeleri.",
      "Evler, apartmanlar, kampüsler, fabrikalar, belediyeler ve araştırma ekipleri.",
    ],
    doesNotClaimTitle: "Ne iddia etmez",
    installationTitle: "Kurulum",
    measuresTitle: "Ne ölçer",
    nonClaims: [
      "Resmi bir deprem uyarı sistemi değildir.",
      "Tek cihaz bir binaya güvenli veya güvensiz diyemez.",
      "Acil durum talimatlarının veya mühendis incelemesinin yerine geçmez.",
    ],
    overviewTitle: "Cihaz özeti",
    overviewDescription:
      "Cihazın ne ölçtüğü, nasıl kurulduğu, veriyi nereye gönderdiği ve hangi binalarda denenebileceği tek bakışta.",
    pilotTitle: "Nerede denenebilir",
    useCasesEyebrow: "Kullanım alanları",
    useCasesTitle: "Aynı cihaz, farklı binalar",
    useCasesDescription:
      "Donanım her yerde aynı. Değişen tek şey kaç cihaz taktığınız ve binanın neresine taktığınız.",
    category: "Kategori",
    traditional: "Profesyonel cihaz",
    mobile: "Telefon uygulaması",
    ctaTitle: "Gerçek bir binada denemek ister misiniz?",
    ctaDescription:
      "Bize binayı anlatın. İlk pilotlar için uygun olup olmadığına birlikte bakalım.",
  },
  en: {
    cloudTitle: "Cloud and app",
    detailDescriptions: [
      "Three-axis motion, LED status, local recording and device health.",
      "Mount it, pair it, check status, add more devices when needed.",
      "Encrypted Wi-Fi data, app review screens and software updates.",
      "Homes, apartments, campuses, factories, municipalities and research teams.",
    ],
    doesNotClaimTitle: "What it does not claim",
    installationTitle: "Installation",
    measuresTitle: "What it measures",
    nonClaims: [
      "It is not an official earthquake warning system.",
      "One device cannot call a building safe or unsafe.",
      "It does not replace emergency instructions or an engineer's inspection.",
    ],
    overviewTitle: "Device overview",
    overviewDescription:
      "What the device measures, how it goes up, where the data lands, and which buildings it suits.",
    pilotTitle: "Where it can be tested",
    useCasesEyebrow: "Use cases",
    useCasesTitle: "Same device, different buildings",
    useCasesDescription:
      "The hardware is identical everywhere. What changes is how many you install and where in the building they go.",
    category: "Category",
    traditional: "Professional device",
    mobile: "Phone app",
    ctaTitle: "Want to test it in a real building?",
    ctaDescription:
      "Tell us about the building. We will see if it fits the first pilots.",
  },
  es: {
    cloudTitle: "Nube y app",
    detailDescriptions: [
      "Movimiento en tres ejes, estado LED, registro local y salud del dispositivo.",
      "Móntalo, emparéjalo, revisa el estado y agrega dispositivos si hace falta.",
      "Datos Wi-Fi cifrados, pantallas de revisión y actualizaciones de software.",
      "Casas, apartamentos, campus, fábricas, municipios y equipos de investigación.",
    ],
    doesNotClaimTitle: "Lo que no afirma",
    installationTitle: "Instalación",
    measuresTitle: "Qué mide",
    nonClaims: [
      "No es un sistema oficial de alerta sísmica.",
      "Un dispositivo no puede declarar un edificio seguro o inseguro.",
      "No sustituye instrucciones de emergencia ni revisión de un ingeniero.",
    ],
    overviewTitle: "Resumen del dispositivo",
    overviewDescription:
      "Qué mide el dispositivo, cómo se instala, adónde va el dato y en qué edificios encaja.",
    pilotTitle: "Dónde puede probarse",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Mismo dispositivo, edificios distintos",
    useCasesDescription:
      "El hardware es el mismo en todas partes. Lo que cambia es cuántos instalas y en qué punto del edificio.",
    category: "Categoría",
    traditional: "Dispositivo profesional",
    mobile: "App móvil",
    ctaTitle: "¿Quieres probarlo en un edificio real?",
    ctaDescription:
      "Cuéntanos sobre el edificio. Veremos si encaja con los primeros pilotos.",
  },
  it: {
    cloudTitle: "Cloud e app",
    detailDescriptions: [
      "Movimento su tre assi, stato LED, registrazione locale e salute del dispositivo.",
      "Montalo, abbinalo, controlla lo stato e aggiungi dispositivi se serve.",
      "Dati Wi-Fi cifrati, schermate di revisione e aggiornamenti software.",
      "Case, appartamenti, campus, fabbriche, comuni e team di ricerca.",
    ],
    doesNotClaimTitle: "Cosa non dichiara",
    installationTitle: "Installazione",
    measuresTitle: "Cosa misura",
    nonClaims: [
      "Non è un sistema ufficiale di allerta terremoto.",
      "Un dispositivo non può dire che un edificio è sicuro o non sicuro.",
      "Non sostituisce istruzioni di emergenza o ispezione di un ingegnere.",
    ],
    overviewTitle: "Panoramica dispositivo",
    overviewDescription:
      "Cosa misura il dispositivo, come si installa, dove finiscono i dati e per quali edifici è adatto.",
    pilotTitle: "Dove si può testare",
    useCasesEyebrow: "Casi d'uso",
    useCasesTitle: "Stesso dispositivo, edifici diversi",
    useCasesDescription:
      "L'hardware è identico ovunque. Cambia solo quanti ne installi e in che punto dell'edificio.",
    category: "Categoria",
    traditional: "Dispositivo professionale",
    mobile: "App telefono",
    ctaTitle: "Vuoi provarlo in un edificio reale?",
    ctaDescription:
      "Raccontaci l'edificio. Vedremo se è adatto ai primi piloti.",
  },
  id: {
    cloudTitle: "Cloud dan app",
    detailDescriptions: [
      "Gerakan tiga sumbu, status LED, rekaman lokal, dan kondisi perangkat.",
      "Pasang, hubungkan, cek status, tambah perangkat jika perlu.",
      "Data Wi-Fi terenkripsi, layar tinjauan app, dan pembaruan software.",
      "Rumah, apartemen, kampus, pabrik, kota, dan tim riset.",
    ],
    doesNotClaimTitle: "Yang tidak diklaim",
    installationTitle: "Pemasangan",
    measuresTitle: "Apa yang diukur",
    nonClaims: [
      "Ini bukan sistem peringatan gempa resmi.",
      "Satu perangkat tidak bisa menyatakan bangunan aman atau tidak aman.",
      "Ini tidak menggantikan instruksi darurat atau inspeksi engineer.",
    ],
    overviewTitle: "Ringkasan perangkat",
    overviewDescription:
      "Apa yang diukur perangkat, cara memasangnya, ke mana datanya pergi, dan bangunan mana yang cocok.",
    pilotTitle: "Tempat uji",
    useCasesEyebrow: "Skenario penggunaan",
    useCasesTitle: "Perangkat sama, bangunan berbeda",
    useCasesDescription:
      "Perangkatnya sama di mana pun. Yang berbeda hanya berapa banyak yang dipasang dan di titik mana.",
    category: "Kategori",
    traditional: "Perangkat profesional",
    mobile: "App ponsel",
    ctaTitle: "Ingin mengujinya di bangunan nyata?",
    ctaDescription:
      "Ceritakan bangunannya. Kami akan melihat apakah cocok untuk pilot pertama.",
  },
  pt: {
    cloudTitle: "Cloud e app",
    detailDescriptions: [
      "Movimento em três eixos, estado do LED, registro local e saúde do dispositivo.",
      "Instale, pareie, confira o status e adicione dispositivos se precisar.",
      "Dados Wi-Fi criptografados, telas de revisão e atualizações de software.",
      "Casas, apartamentos, campi, fábricas, municípios e equipes de pesquisa.",
    ],
    doesNotClaimTitle: "O que não afirma",
    installationTitle: "Instalação",
    measuresTitle: "O que mede",
    nonClaims: [
      "Não é um sistema oficial de alerta de terremoto.",
      "Um dispositivo não pode declarar um prédio seguro ou inseguro.",
      "Não substitui instruções de emergência nem inspeção de engenheiro.",
    ],
    overviewTitle: "Visão geral do dispositivo",
    overviewDescription:
      "O que o dispositivo mede, como é instalado, para onde vai o dado e em que prédios ele se encaixa.",
    pilotTitle: "Onde pode ser testado",
    useCasesEyebrow: "Casos de uso",
    useCasesTitle: "Mesmo dispositivo, prédios diferentes",
    useCasesDescription:
      "O hardware é o mesmo em todo lugar. O que muda é quantos você instala e em que ponto do prédio.",
    category: "Categoria",
    traditional: "Dispositivo profissional",
    mobile: "App de celular",
    ctaTitle: "Quer testar em um prédio real?",
    ctaDescription:
      "Conte sobre o prédio. Vamos ver se ele combina com os primeiros pilotos.",
  },
};

const howItWorksLabels: Record<
  Locale,
  {
    flowEyebrow: string;
    flowTitle: string;
    flowDescription: string;
    signalsEyebrow: string;
    signalsTitle: string;
    signalsDescription: string;
    networkEyebrow: string;
    networkTitle: string;
    networkDescription: string;
  }
> = {
  tr: {
    flowEyebrow: "Kurulum",
    flowTitle: "Duvardan rapora giden yol",
    flowDescription:
      "Sizin yapmanız gereken kısım birkaç dakika sürüyor, ağır işi bundan sonra cihaz üstleniyor.",
    signalsEyebrow: "Sarsıntı",
    signalsTitle: "Cihaz önce kendi kararını verir, doğrulamayı sonra yapar",
    signalsDescription:
      "Sarsıntı anındaki hızlı tespit kadar, sarsıntı bittikten sonra elde kalan kayıt da değerli.",
    networkEyebrow: "Birlikte kullanım",
    networkTitle: "Cihaz sayısı arttıkça veri güvenilirleşiyor",
    networkDescription:
      "Yakındaki cihazlar aynı olayı görünce kayıt doğrulanmış sayılıyor ve yanlış alarm ihtimali düşüyor.",
  },
  en: {
    flowEyebrow: "Setup",
    flowTitle: "From wall to report",
    flowDescription:
      "The setup is simple. The device does the heavy work after that.",
    signalsEyebrow: "Shaking",
    signalsTitle: "The device acts first, then checks nearby signals",
    signalsDescription:
      "Fast local detection matters. So does the report after the shaking stops.",
    networkEyebrow: "Together",
    networkTitle: "One device is useful. Several are better.",
    networkDescription:
      "Nearby devices help confirm the same event and reduce false alarms.",
  },
  es: {
    flowEyebrow: "Instalación",
    flowTitle: "De la pared al informe",
    flowDescription:
      "La instalación es simple. Después, el dispositivo hace el trabajo pesado.",
    signalsEyebrow: "Temblor",
    signalsTitle: "El dispositivo actúa primero y luego revisa señales cercanas",
    signalsDescription:
      "La detección local rápida importa. También el informe después del temblor.",
    networkEyebrow: "Juntos",
    networkTitle: "Un dispositivo ayuda. Varios ayudan más.",
    networkDescription:
      "Los dispositivos cercanos confirman el mismo evento y reducen falsas alarmas.",
  },
  it: {
    flowEyebrow: "Installazione",
    flowTitle: "Dalla parete al report",
    flowDescription:
      "L'installazione è semplice. Dopo, il dispositivo fa il lavoro pesante.",
    signalsEyebrow: "Scossa",
    signalsTitle: "Il dispositivo agisce prima, poi controlla i segnali vicini",
    signalsDescription:
      "Il rilevamento locale rapido conta. Conta anche il report dopo la scossa.",
    networkEyebrow: "Insieme",
    networkTitle: "Un dispositivo è utile. Più dispositivi sono meglio.",
    networkDescription:
      "I dispositivi vicini confermano lo stesso evento e riducono i falsi allarmi.",
  },
  id: {
    flowEyebrow: "Pemasangan",
    flowTitle: "Dari dinding ke laporan",
    flowDescription:
      "Pemasangannya sederhana. Setelah itu perangkat yang bekerja keras.",
    signalsEyebrow: "Guncangan",
    signalsTitle: "Perangkat bertindak dulu, lalu memeriksa sinyal sekitar",
    signalsDescription:
      "Deteksi lokal yang cepat penting. Laporan setelah guncangan berhenti juga penting.",
    networkEyebrow: "Bersama",
    networkTitle: "Satu perangkat berguna. Beberapa lebih baik.",
    networkDescription:
      "Perangkat sekitar membantu mengonfirmasi kejadian yang sama dan mengurangi alarm salah.",
  },
  pt: {
    flowEyebrow: "Instalação",
    flowTitle: "Da parede ao relatório",
    flowDescription:
      "A instalação é simples. Depois disso, o dispositivo faz o trabalho pesado.",
    signalsEyebrow: "Tremor",
    signalsTitle: "O dispositivo age primeiro e depois confere sinais próximos",
    signalsDescription:
      "Detecção local rápida importa. O relatório depois do tremor também.",
    networkEyebrow: "Juntos",
    networkTitle: "Um dispositivo é útil. Vários são melhores.",
    networkDescription:
      "Dispositivos próximos confirmam o mesmo evento e reduzem falsos alarmes.",
  },
};

const aboutLabels: Record<
  Locale,
  {
    storyEyebrow: string;
    storyTitle: string;
    storyDescription: string;
    timelineEyebrow: string;
    timelineTitle: string;
    timelineDescription: string;
    teamEyebrow: string;
    teamTitle: string;
    teamDescription: string;
  }
> = {
  tr: {
    storyEyebrow: "Hikaye",
    storyTitle: "Bunu neden yaptık",
    storyDescription:
      "Depremden sonra mühendisin gelmesini beklerken insanların elinde hiçbir bilgi olmuyor. Başlangıç noktamız bu boşluktu.",
    timelineEyebrow: "Yol",
    timelineTitle: "Sırada ne var",
    timelineDescription:
      "Prototipi bitirdikten sonra sırada pilot kurulumlar, saha verisi ve sertifikasyon var.",
    teamEyebrow: "Ekip",
    teamTitle: "Probleme yakın küçük bir ekip",
    teamDescription:
      "Ürünü mühendislik çalışması ve gerçek evlerden gelen geri bildirim şekillendiriyor.",
  },
  en: {
    storyEyebrow: "Story",
    storyTitle: "Why we built this",
    storyDescription:
      "After earthquakes, people need clear information before the engineer arrives.",
    timelineEyebrow: "Path",
    timelineTitle: "What happens next",
    timelineDescription:
      "Prototype, pilots, field data and certification.",
    teamEyebrow: "Team",
    teamTitle: "A small team close to the problem",
    teamDescription:
      "The product is shaped by engineering work and feedback from real homes.",
  },
  es: {
    storyEyebrow: "Historia",
    storyTitle: "Por qué construimos esto",
    storyDescription:
      "Después de un terremoto, la gente necesita información clara antes de que llegue el ingeniero.",
    timelineEyebrow: "Camino",
    timelineTitle: "Qué viene después",
    timelineDescription:
      "Prototipo, pilotos, datos de campo y certificación.",
    teamEyebrow: "Equipo",
    teamTitle: "Un equipo pequeño cerca del problema",
    teamDescription:
      "El producto se forma con trabajo de ingeniería y feedback de hogares reales.",
  },
  it: {
    storyEyebrow: "Storia",
    storyTitle: "Perché lo abbiamo costruito",
    storyDescription:
      "Dopo un terremoto, le persone hanno bisogno di informazioni chiare prima che arrivi l'ingegnere.",
    timelineEyebrow: "Percorso",
    timelineTitle: "Cosa succede dopo",
    timelineDescription:
      "Prototipo, piloti, dati sul campo e certificazione.",
    teamEyebrow: "Team",
    teamTitle: "Un piccolo team vicino al problema",
    teamDescription:
      "Il prodotto prende forma dal lavoro ingegneristico e dai feedback di case reali.",
  },
  id: {
    storyEyebrow: "Cerita",
    storyTitle: "Mengapa kami membangunnya",
    storyDescription:
      "Setelah gempa, orang butuh informasi jelas sebelum engineer datang.",
    timelineEyebrow: "Jalur",
    timelineTitle: "Langkah berikutnya",
    timelineDescription:
      "Prototipe, pilot, data lapangan, dan sertifikasi.",
    teamEyebrow: "Tim",
    teamTitle: "Tim kecil yang dekat dengan masalah",
    teamDescription:
      "Produk dibentuk oleh kerja engineering dan masukan dari rumah nyata.",
  },
  pt: {
    storyEyebrow: "História",
    storyTitle: "Por que construímos isso",
    storyDescription:
      "Depois de terremotos, as pessoas precisam de informação clara antes do engenheiro chegar.",
    timelineEyebrow: "Caminho",
    timelineTitle: "O que vem depois",
    timelineDescription:
      "Protótipo, pilotos, dados de campo e certificação.",
    teamEyebrow: "Time",
    teamTitle: "Um time pequeno perto do problema",
    teamDescription:
      "O produto é moldado por engenharia e feedback de casas reais.",
  },
};

export function renderStaticPage(locale: Locale, pageKey: StaticPageKey) {
  if (!isLocale(locale) || !locales.includes(locale)) {
    return null;
  }

  switch (pageKey) {
    case "product":
      return renderProductPage(locale);
    case "technology":
    case "investors":
    case "security":
      return renderInfoPage(locale, pageKey);
    case "howItWorks":
      return renderHowItWorksPage(locale);
    case "pilotProgram":
      return renderPilotProgramPage(locale);
    case "faq":
      return renderFaqPage(locale);
    case "about":
      return renderAboutPage(locale);
    case "contact":
      return renderContactPage(locale);
    case "press":
    case "privacy":
    case "terms":
      return renderInfoPage(locale, pageKey);
    default:
      return null;
  }
}

function renderProductPage(locale: Locale) {
  const labels = productLabels[locale];
  const page = getPages(locale).product;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        actions={
          <ButtonLink href={getLocalizedHref(locale, page.ctaHref)} size="lg">
            {page.ctaLabel}
          </ButtonLink>
        }
        aside={
          <ProductVisual
            altText={page.imageAlt}
            bullets={page.specs.map((item) => `${item.label}: ${item.value}`)}
            compact
            description={page.deviceDescription}
            eyebrow={page.eyebrow}
            meterBottomLabel={page.meterBottomLabel}
            meterBottomValue={page.meterBottomValue}
            meterTopLabel={page.meterTopLabel}
            meterTopValue={page.meterTopValue}
            priority
            title={page.title}
          />
        }
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {page.specs.map((spec) => (
          <article
            key={spec.label}
            className="rounded-lg border border-border bg-surface px-6 py-6 shadow-3"
          >
            <p className="text-sm text-fg-subtle">{spec.label}</p>
            <p className="mt-3 font-heading text-2xl tracking-normal text-fg">
              {spec.value}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeading
          description={labels.useCasesDescription}
          eyebrow={labels.useCasesEyebrow}
          title={labels.useCasesTitle}
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {page.useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-[var(--surface-2)] px-6 py-6 shadow-2"
            >
              <h3 className="font-heading text-2xl tracking-normal text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-fg-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)]">
        <div className="rounded-xl border border-border bg-surface px-6 py-8 shadow-3 sm:px-8">
          <SectionHeading
            description={labels.overviewDescription}
            eyebrow={page.eyebrow}
            title={labels.overviewTitle}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              labels.measuresTitle,
              labels.installationTitle,
              labels.cloudTitle,
              labels.pilotTitle,
            ].map((title, index) => (
              <article key={title} className="rounded-xl border border-border bg-surface-2 p-5">
                <span className="text-sm font-semibold text-brand">0{index + 1}</span>
                <h3 className="mt-2 font-heading text-xl text-fg">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-fg-muted">
                  {labels.detailDescriptions[index]}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 p-6 shadow-[var(--shadow-inverse)]">
          <Image
            alt={page.imageAlt}
            className="h-auto w-full object-contain"
            height={1309}
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={withBasePath("/images/device/sismosmart-device-low-profile.webp")}
            width={2400}
          />
        </div>
      </section>

      <section className="rounded-xl border border-amber/40 bg-surface-2 px-6 py-8 shadow-3 sm:px-8">
        <h2 className="font-heading text-2xl text-fg">{labels.doesNotClaimTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {labels.nonClaims.map((claim) => (
            <p key={claim} className="rounded-xl border border-amber/30 bg-surface p-5 text-sm leading-6 text-fg-muted">
              {claim}
            </p>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface px-6 py-10 shadow-3 sm:px-8">
        <SectionHeading
          description={page.comparisonDescription}
          eyebrow={page.eyebrow}
          title={page.comparisonTitle}
        />

        <div
          aria-label={page.comparisonTitle}
          className="mt-8 overflow-x-auto"
          tabIndex={0}
        >
          <table className="min-w-full border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-sm uppercase tracking-normal text-fg-subtle">
                <th className="px-4 py-2">{labels.category}</th>
                <th className="px-4 py-2 text-primary-600">SismoSmart</th>
                <th className="px-4 py-2">{labels.traditional}</th>
                <th className="px-4 py-2">{labels.mobile}</th>
              </tr>
            </thead>
            <tbody>
              {page.comparisonRows.map((row) => (
                <tr key={row.label}>
                  <td className="rounded-l-2xl border border-r-0 border-border bg-[var(--surface-2)] px-4 py-4 font-semibold text-fg">
                    {row.label}
                  </td>
                  <td className="border-y border-primary-300/60 bg-[color-mix(in_srgb,var(--primary-500)_12%,var(--surface))] px-4 py-4 font-medium text-fg">
                    {row.sismosmart}
                  </td>
                  <td className="border border-r-0 border-border bg-surface px-4 py-4 text-fg-muted">
                    {row.traditional}
                  </td>
                  <td className="rounded-r-2xl border border-border bg-surface px-4 py-4 text-fg-muted">
                    {row.mobile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 px-6 py-10 shadow-[var(--shadow-inverse)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            description={labels.ctaDescription}
            eyebrow={page.eyebrow}
            invert
            title={labels.ctaTitle}
          />
          <ButtonLink
            href={getLocalizedHref(locale, page.ctaHref)}
            size="lg"
            variant="signal"
          >
            {page.ctaLabel}
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

function renderHowItWorksPage(locale: Locale) {
  const labels = howItWorksLabels[locale];
  const page = getPages(locale).howItWorks;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="space-y-6">
        <SectionHeading
          description={labels.flowDescription}
          eyebrow={labels.flowEyebrow}
          title={labels.flowTitle}
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {page.flow.map((step, index) => (
            <article
              key={step.title}
              className="rounded-lg border border-border bg-surface px-6 py-6 shadow-[0_16px_32px_rgba(5,23,12,0.06)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-heading text-sm text-fg-on-primary">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-heading text-2xl tracking-normal text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-fg-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 px-6 py-10 shadow-[var(--shadow-inverse)] sm:px-8">
        <SectionHeading
          description={labels.signalsDescription}
          eyebrow={labels.signalsEyebrow}
          invert
          title={labels.signalsTitle}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {page.signals.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-white/10 bg-black/20 px-6 py-6"
            >
              <h3 className="font-heading text-2xl tracking-normal text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-emerald-50/78">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative overflow-hidden rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 p-6 shadow-[var(--shadow-inverse)]">
          <Image
            alt={page.title}
            className="h-auto w-full object-contain"
            height={1424}
            sizes="(min-width: 1024px) 38vw, 100vw"
            src={withBasePath("/images/device/sismosmart-device-installation.webp")}
            width={1228}
          />
        </div>
        <div className="rounded-xl border border-border bg-surface px-6 py-8 shadow-3 sm:px-8">
          <SectionHeading
            description={labels.networkDescription}
            eyebrow={labels.networkEyebrow}
            title={labels.networkTitle}
          />
          <div className="mt-6 grid gap-4">
            {page.network.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-border bg-surface-2 p-5"
              >
                <h3 className="font-heading text-xl text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-fg-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

function renderPilotProgramPage(locale: Locale) {
  const page = getPages(locale).pilotProgram;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {page.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-border bg-surface px-6 py-6 shadow-3"
          >
            <h2 className="font-heading text-2xl text-fg">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-fg-muted">
              {section.description}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
        <div className="relative overflow-hidden rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 p-6 shadow-[var(--shadow-inverse)]">
          <Image
            alt={page.title}
            className="h-auto w-full object-contain"
            height={1176}
            sizes="(min-width: 1024px) 38vw, 100vw"
            src={withBasePath("/images/device/sismosmart-device-front.webp")}
            width={1131}
          />
        </div>

        <section className="rounded-xl border border-border bg-surface-2 p-6 shadow-3 sm:p-8">
          <PilotProgramForm locale={locale} />
        </section>
      </section>
    </main>
  );
}

function renderFaqPage(locale: Locale) {
  const page = getPages(locale).faq;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="grid gap-4">
        {page.sections.map((section) => (
          <details
            key={section.title}
            className="group rounded-lg border border-border bg-surface px-6 py-5 shadow-[0_14px_30px_rgba(5,23,12,0.05)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg text-fg">
              {section.title}
              <span aria-hidden="true" className="text-2xl text-brand group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-base leading-7 text-fg-muted">
              {section.description}
            </p>
          </details>
        ))}
      </section>
    </main>
  );
}

function renderAboutPage(locale: Locale) {
  const labels = aboutLabels[locale];
  const page = getPages(locale).about;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="rounded-xl border border-border bg-surface px-6 py-10 shadow-3 sm:px-8">
        <SectionHeading
          description={labels.storyDescription}
          eyebrow={labels.storyEyebrow}
          title={labels.storyTitle}
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="space-y-5 text-lg leading-8 text-fg-muted">
            {page.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="grid gap-4">
            {page.principles.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-border bg-[var(--surface-2)] px-5 py-5"
              >
                <h3 className="font-heading text-xl tracking-normal text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-fg-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          description={labels.timelineDescription}
          eyebrow={labels.timelineEyebrow}
          title={labels.timelineTitle}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {page.timeline.map((item) => (
            <article
              key={`${item.period}-${item.title}`}
              className="rounded-lg border border-border bg-[var(--surface-2)] px-6 py-6 shadow-2"
            >
              <p className="text-sm font-semibold uppercase tracking-normal text-[var(--primary-600)]">
                {item.period}
              </p>
              <h3 className="mt-4 font-heading text-2xl tracking-normal text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-fg-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 px-6 py-10 shadow-[var(--shadow-inverse)] sm:px-8">
        <SectionHeading
          description={labels.teamDescription}
          eyebrow={labels.teamEyebrow}
          invert
          title={labels.teamTitle}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {page.team.map((member) => (
            <article
              key={member.name}
              className="rounded-lg border border-white/10 bg-black/20 px-6 py-6"
            >
              <h3 className="font-heading text-2xl tracking-normal text-white">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-normal text-[var(--signal)]">
                {member.role}
              </p>
              <p className="mt-4 text-base leading-7 text-emerald-50/78">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function renderContactPage(locale: Locale) {
  const page = getPages(locale).contact;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
        <div className="space-y-6">
          <SectionHeading
            description={page.description}
            eyebrow={page.eyebrow}
            title={page.title}
          />
          <div className="grid gap-4">
            {page.channels.map((channel) => (
              <a
                key={channel.title}
                className="rounded-lg border border-border bg-surface px-6 py-6 shadow-3 hover:-translate-y-1"
                href={withBasePath(channel.href)}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
              >
                <p className="text-sm font-semibold uppercase tracking-normal text-[var(--primary-600)]">
                  {channel.title}
                </p>
                <h2 className="mt-3 font-heading text-2xl tracking-normal text-fg">
                  {channel.value}
                </h2>
                <p className="mt-3 text-base leading-7 text-fg-muted">
                  {channel.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        <section className="rounded-xl border border-border bg-[var(--surface-2)] p-6 shadow-3 sm:p-8">
          <ContactForm copy={page.form} locale={locale} />
        </section>
      </section>
    </main>
  );
}

function renderInfoPage(
  locale: Locale,
  pageKey: "investors" | "press" | "privacy" | "security" | "technology" | "terms",
) {
  const page = getPages(locale)[pageKey];
  const trend = pageKey === "technology" ? frequencyTrendLabels[locale] : null;

  return (
    <main className="flex flex-1 flex-col gap-8 pb-16 pt-8 sm:gap-10 sm:pt-10" id="content">
      <PageHero
        description={page.description}
        eyebrow={page.eyebrow}
        title={page.title}
      />

      {trend ? (
        <section
          className="overflow-hidden rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 px-6 py-10 shadow-[var(--shadow-inverse)] sm:px-8"
          data-reveal
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-normal text-[var(--signal)]">
                {trend.eyebrow}
              </p>
              <h2 className="font-heading text-2xl tracking-normal text-white sm:text-3xl">
                {trend.title}
              </h2>
              <p className="text-base leading-7 text-emerald-50/80">{trend.caption}</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-[rgba(114,174,127,0.22)] bg-black/25 p-3 text-emerald-50/40">
              <FrequencyTrend
                baselineLabel={trend.baseline}
                className="h-52 w-full sm:h-64"
                eventLabel={trend.event}
                title={trend.title}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-2">
        {page.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border border-border bg-surface px-6 py-6 shadow-3"
          >
            <h2 className="font-heading text-2xl tracking-normal text-fg">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-fg-muted">
              {section.description}
            </p>
          </article>
        ))}
      </section>

      {page.links ? (
        <section className="rounded-xl border border-[rgba(114,174,127,0.2)] bg-primary-950 px-6 py-10 shadow-[var(--shadow-inverse)] sm:px-8">
          <SectionHeading
            description={page.description}
            eyebrow={page.eyebrow}
            invert
            title={page.title}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.links.map((link) => (
              <a
                key={link.href}
                className="rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-5 text-white hover:-translate-y-1 hover:border-brand-bright/40"
                href={withBasePath(link.href)}
              >
                <span className="font-heading text-xl tracking-normal">
                  {link.title}
                </span>
                <span className="mt-3 block text-sm leading-6 text-emerald-50/78">
                  {link.description}
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
