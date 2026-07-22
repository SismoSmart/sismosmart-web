import type {
  HowItWorksPageCopy,
  InfoPageCopy,
  PageCard,
  ProductPageCopy,
} from "@/lib/page-copy";
import { getPages, routeSegments } from "@/lib/pages";
import {
  type MarkdownPageKey,
} from "@/lib/agent-discovery";
import { siteConfig, type Locale } from "@/lib/site";

type StructureLabels = {
  canonical: string;
  comparisonColumns: [string, string, string, string];
  network: string;
  process: string;
  signals: string;
  specifications: string;
  useCases: string;
};

const structureLabels: Record<Locale, StructureLabels> = {
  en: {
    canonical: "Canonical HTML page",
    comparisonColumns: ["Item", "SismoSmart", "Traditional system", "Mobile app"],
    network: "Network",
    process: "Process",
    signals: "Signals",
    specifications: "Specifications",
    useCases: "Use cases",
  },
  tr: {
    canonical: "Kanonik HTML sayfası",
    comparisonColumns: ["Başlık", "SismoSmart", "Geleneksel sistem", "Mobil uygulama"],
    network: "Ağ",
    process: "Süreç",
    signals: "Sinyaller",
    specifications: "Teknik özellikler",
    useCases: "Kullanım alanları",
  },
  es: {
    canonical: "Página HTML canónica",
    comparisonColumns: ["Elemento", "SismoSmart", "Sistema tradicional", "Aplicación móvil"],
    network: "Red",
    process: "Proceso",
    signals: "Señales",
    specifications: "Especificaciones",
    useCases: "Casos de uso",
  },
  id: {
    canonical: "Halaman HTML kanonis",
    comparisonColumns: ["Item", "SismoSmart", "Sistem tradisional", "Aplikasi seluler"],
    network: "Jaringan",
    process: "Proses",
    signals: "Sinyal",
    specifications: "Spesifikasi",
    useCases: "Kasus penggunaan",
  },
  pt: {
    canonical: "Página HTML canónica",
    comparisonColumns: ["Item", "SismoSmart", "Sistema tradicional", "Aplicação móvel"],
    network: "Rede",
    process: "Processo",
    signals: "Sinais",
    specifications: "Especificações",
    useCases: "Casos de uso",
  },
  it: {
    canonical: "Pagina HTML canonica",
    comparisonColumns: ["Voce", "SismoSmart", "Sistema tradizionale", "App mobile"],
    network: "Rete",
    process: "Processo",
    signals: "Segnali",
    specifications: "Specifiche",
    useCases: "Casi d'uso",
  },
};

function escapeTableCell(value: string) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function renderCards(cards: PageCard[]) {
  return cards
    .map((card) => `### ${card.title}\n\n${card.description}`)
    .join("\n\n");
}

function renderInfoPage(page: InfoPageCopy) {
  const sections = page.sections
    .map((section) => `## ${section.title}\n\n${section.description}`)
    .join("\n\n");
  const links = page.links?.length
    ? `\n\n${page.links
        .map((link) => `- [${link.title}](${link.href}): ${link.description}`)
        .join("\n")}`
    : "";

  return `${sections}${links}`;
}

function renderProductPage(
  locale: Locale,
  page: ProductPageCopy,
) {
  const labels = structureLabels[locale];
  const specs = page.specs
    .map((spec) => `- **${spec.label}:** ${spec.value}`)
    .join("\n");
  const comparisons = page.comparisonRows
    .map((row) =>
      `| ${escapeTableCell(row.label)} | ${escapeTableCell(row.sismosmart)} | ${escapeTableCell(row.traditional)} | ${escapeTableCell(row.mobile)} |`,
    )
    .join("\n");
  const columns = labels.comparisonColumns;

  return `${page.deviceDescription}

## ${labels.specifications}

${specs}

## ${labels.useCases}

${renderCards(page.useCases)}

## ${page.comparisonTitle}

${page.comparisonDescription}

| ${columns.map(escapeTableCell).join(" | ")} |
| --- | --- | --- | --- |
${comparisons}`;
}

function renderHowItWorksPage(
  locale: Locale,
  page: HowItWorksPageCopy,
) {
  const labels = structureLabels[locale];

  return `## ${labels.process}

${renderCards(page.flow)}

## ${labels.signals}

${renderCards(page.signals)}

## ${labels.network}

${renderCards(page.network)}`;
}

export function renderPageMarkdown(
  locale: Locale,
  pageKey: MarkdownPageKey,
) {
  const page = getPages(locale)[pageKey];
  const labels = structureLabels[locale];
  const canonicalUrl = `${siteConfig.url}/${locale}${routeSegments[pageKey]}`;
  let content: string;

  if (pageKey === "product") {
    content = renderProductPage(locale, page as ProductPageCopy);
  } else if (pageKey === "howItWorks") {
    content = renderHowItWorksPage(locale, page as HowItWorksPageCopy);
  } else {
    content = renderInfoPage(page as InfoPageCopy);
  }

  return `# ${page.title}

> ${page.description}

${labels.canonical}: [${canonicalUrl}](${canonicalUrl})

${content}
`;
}
