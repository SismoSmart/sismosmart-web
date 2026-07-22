import { ContactForm } from "@/components/contact-form";
import { AboutPage } from "@/components/localized-pages/about-page";
import { HowItWorksPage } from "@/components/localized-pages/how-it-works-page";
import { ProductPage } from "@/components/localized-pages/product-page";
import { FrequencyTrend } from "@/components/frequency-trend";
import { PageHero } from "@/components/page-hero";
import { PilotProgramForm } from "@/components/pilot-program-form";
import { SectionHeading } from "@/components/section-heading";
import { withBasePath } from "@/lib/base-path";
import {
  getPages,
  type StaticPageKey,
} from "@/lib/pages";
import { isLocale, locales, type Locale } from "@/lib/site";
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

export function renderStaticPage(locale: Locale, pageKey: StaticPageKey) {
  if (!isLocale(locale) || !locales.includes(locale)) {
    return null;
  }

  switch (pageKey) {
    case "product":
      return <ProductPage locale={locale} />;
    case "technology":
    case "investors":
    case "security":
      return renderInfoPage(locale, pageKey);
    case "howItWorks":
      return <HowItWorksPage locale={locale} />;
    case "pilotProgram":
      return renderPilotProgramPage(locale);
    case "faq":
      return renderFaqPage(locale);
    case "about":
      return <AboutPage locale={locale} />;
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
