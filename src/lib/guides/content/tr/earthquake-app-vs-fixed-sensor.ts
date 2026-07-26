import type { GuideContent } from "@/lib/guides/types";

export const earthquakeAppVsFixedSensorTr: GuideContent = {
  translationKey: "earthquake-app-vs-fixed-sensor",
  locale: "tr",
  slug: "deprem-uygulamasi-sabit-sensor-farki",
  title: "Deprem Uygulaması ile Sabit Sensör: Temel Farklar",
  description:
    "Deprem uygulamaları ve sabit bina sensörlerini karşılaştırarak her birinin ne yaptığını, sabit referansın önemini ve uyarılar ile bina kayıtlarının farkını öğrenin.",
  eyebrow: "Rehberler",
  h1: "Deprem Uygulaması ile Sabit Sensör: Temel Farklar",
  summary:
    "Deprem uygulamaları ve sabit bina sensörleri her ikisi de sismik olaylarla ilişkilidir ancak farklı amaçlara hizmet eder. Telefon uygulamaları yoğun algılama ağlarına katılabilir ve bildirim sağlayabilir, ancak kullanıcıyla birlikte hareket eder, cihaz modeline göre değişir ve binaya sabitlenmez. Kalıcı olarak monte edilmiş bir sensör, bilinen bir konumda sabit kalır, hareketi tutarlı bir şekilde kaydeder ve kullanıcının değil, binanın deneyimini tanımlayan veri üretir. Bu ayrımı anlamak, sakinlerin ve yöneticilerin her ihtiyacı için doğru aracı seçmesine yardımcı olur.",
  keyTakeaways: [
    "Telefonlar yoğun algılama ağlarına katılabilir ancak kullanıcıyla birlikte hareket eder ve cihaza göre değişir.",
    "Sabit sensör, tutarlı bina ölçümleri için sabit bir konum referansı sağlar.",
    "Resmi uyarılar ve sabit bina kayıtları farklı sorunları ele alır ve birbirine karıştırılmamalıdır.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "Deprem uygulaması, bir akıllı telefon üzerinde çalışır ve telefonun sensörlerini, kalabalık kaynaklı verilerini veya sunucu tabanlı algılamayı kullanarak bildirim sağlar. Sabit bina sensörü ise belirli bir binanın belirli bir noktasına monte edilmiş özel bir ivmeölçerdir. Uygulama taşınabilir ve kullanıcıya yöneliktir; sensör sabittir ve yapıya yöneliktir.",
      ],
    },
    {
      heading: "Telefon uygulamalarının iyi yaptığı şeyler",
      paragraphs: [
        "Telefon tabanlı deprem uygulamaları hızlı bildirimler verebilir, araştırma ağlarına veri katkıda bulunabilir ve farkındalık yaratabilir. Milyonlarca telefon geniş bir alana dağıldığı için, geleneksel enstrümanların seyrek olduğu yerlerde sarsıntıyı algılamaya yardımcı olabilir. Güçlü yönleri erişilebilirlik ve kapsamdır.",
      ],
    },
    {
      heading: "Neden sabit referans önemlidir",
      paragraphs: [
        "Sabit sensör, aynı koordinatlarda ve binanın aynı noktasında kalır. Bu tutarlılık, sensör konumu değişmediği için her kaydın doğrudan karşılaştırılabilir olduğu anlamına gelir. Mühendislerin zaman içinde yapı davranışını analiz etmesi veya olayları karşılaştırması gerektiğinde sabit bir referans noktası gereklidir.",
      ],
    },
    {
      heading: "Uyarılar ile bina kayıtları",
      paragraphs: [
        "Uyarılar, bir depremin olduğunu veya yaklaştığını insanlara bildirir. Bina kayıtları ise yapının aslında ne yaşadığını tanımlar. İkisi tamamlayıcıdır: biri doğrudan koruyucu eylem için, diğeri ise olay sonrası anlayış ve inceleme kararları için destek sağlar.",
      ],
    },
  ],
  limitations: [
    "Telefon sensörleri yapı izleme için kalibre edilmemiştir ve cihazlar arasında farklılık gösterir.",
    "Sabit sensör, dizi kurulmadıkça tüm binayı kapsamaz.",
    "Uygulamalar ve tekil sensörler, tanınmış ajansların resmi uyarılarının yerini almaz.",
    "Kayıt cihazından bağımsız olarak veri yorumlaması profesyonel değerlendirme gerektirir.",
  ],
  sismosmartFit: [
    "SismoSmart, bina bazlı hareket kayıtları sağlamak için sabit MEMS ivmeölçerler kullanan bir ön lansman sistemidir.",
    "Bu sabit konum yaklaşımı, pilot doğrulama gerçek dünya koşullarında mobil alternatiflerle karşılaştırmalı performansı onaylayana kadar tasarım hedefidir.",
  ],
  references: [
    {
      label: "UC Berkeley MyShake projesi ve araştırma referansları",
      organization: "UC Berkeley",
      url: "https://myshake.berkeley.edu/about-us",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Sismograflar: Depremleri Takip Etmek",
      organization: "USGS",
      url: "https://www.usgs.gov/programs/earthquake-hazards/seismographs-keeping-track-earthquakes",
    },
    {
      label: "UC Berkeley Mobil Telefonlar Sismolojik Sensör Olarak",
      organization: "UC Berkeley",
      url: "https://doi.org/10.1109/TASE.2013.2245121",
    },
  ],
  relatedGuides: [
    "building-seismic-monitoring-device",
    "seismic-sensor-placement",
    "measuring-building-motion-after-earthquake",
  ],
  relatedGlossaryTerms: ["ivmeölçer", "sismik ağ", "güçlü hareket"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "Ne bir telefon uygulaması ne de sabit sensör binanın güvenli olup olmadığını belirler. Resmi uyarıları takip edin ve yapısal değerlendirme için yetkili bir mühendise danışın.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart sabit bina izleme yaklaşımını inceleyin.",
  },
};
