import type { GuideLocale } from "@/lib/guides/types";

export interface GuideUiStrings {
  home: string;
  guides: string;
  published: string;
  updated: string;
  keyTakeaways: string;
  limitations: string;
  sismosmartFit: string;
  relatedGlossaryTerms: string;
  relatedGuides: string;
  references: string;
  product: string;
  technology: string;
  howItWorks: string;
  faq: string;
  glossary: string;
  pilotProgram: string;
}

const uiStringsByLocale: Record<GuideLocale, GuideUiStrings> = {
  en: {
    home: "Home",
    guides: "Guides",
    published: "Published",
    updated: "Updated",
    keyTakeaways: "Key takeaways",
    limitations: "Limitations",
    sismosmartFit: "SismoSmart fit",
    relatedGlossaryTerms: "Related glossary terms",
    relatedGuides: "Related guides",
    references: "References",
    product: "Product",
    technology: "Technology",
    howItWorks: "How it works",
    faq: "FAQ",
    glossary: "Glossary",
    pilotProgram: "Pilot program",
  },
  tr: {
    home: "Ana sayfa",
    guides: "Rehberler",
    published: "Yayınlandı",
    updated: "Güncellendi",
    keyTakeaways: "Temel çıkarımlar",
    limitations: "Sınırlamalar",
    sismosmartFit: "SismoSmart bu tabloda nerede?",
    relatedGlossaryTerms: "İlgili sözlük terimleri",
    relatedGuides: "İlgili rehberler",
    references: "Kaynaklar",
    product: "Ürün",
    technology: "Teknoloji",
    howItWorks: "Nasıl çalışır",
    faq: "SSS",
    glossary: "Sözlük",
    pilotProgram: "Pilot program",
  },
};

export function getGuideUiStrings(locale: GuideLocale): GuideUiStrings {
  return uiStringsByLocale[locale];
}
