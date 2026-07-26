import type { GuideContent } from "@/lib/guides/types";

export const buildingNaturalFrequencyMonitoringTr: GuideContent = {
  translationKey: "building-natural-frequency-monitoring",
  locale: "tr",
  slug: "bina-dogal-frekansi-yapisal-izleme",
  title: "Bina Doğal Frekansı İzleme: Değişimlerin Anlamı",
  description:
    "Binalarda doğal frekansın ne anlama geldiğini, çevresel titreşim ve güçlü hareketin nasıl ortaya çıkardığını ve trend izlemenin ne zaman faydalı olduğunu öğrenin.",
  eyebrow: "Rehberler",
  h1: "Bina Doğal Frekansı İzleme: Değişimlerin Anlamı",
  summary:
    "Her bina, kütlesi, rijitliği ve geometrisi tarafından belirlenen titreşime eğilimli olduğu belirli doğal frekanslara sahiptir. Bu frekansları zaman içinde izlemek, yapısal davranışta değişiklikleri ortaya çıkarabilir, ancak değişimler hasardan kaynaklanabileceği gibi çevresel koşullar, yoğunluk, hareket şiddeti veya analiz seçeneklerinden de kaynaklanabilir. Ölçülen frekanstaki bir kayma, bir şeyin değişmiş olabileceğinin sinyalidir, yapısal durumun teşhisi değildir. Frekans verisini yorumlamak mühendislik değerlendirmesi ve bağlam bilgisi gerektirir.",
  keyTakeaways: [
    "Dinamik özellikler, çevresel titreşim veya güçlü hareket verilerinden ölçülen titreşimden çıkarılabilir.",
    "Frekans değişimleri hasardan kaynaklanabilir ancak çevre, yoğunluk, şiddet ve analiz yöntemlerinden de kaynaklanabilir.",
    "Frekanstaki bir değişiklik, bir inceleme sinyalidir, teşhis değildir; daha fazla araştırmaya yönlendirir.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "Doğal frekans izleme, bir binanın tercih ettiği frekanslarda nasıl titreştiğini ölçer. Bu frekansları zaman içinde takip ederek mühendisler yapının dinamik davranışındaki değişiklikleri tespit edebilir. Değişimler yapısal değişiklik, hasar veya basitçe çevresel veya yoğunluk koşullarındaki bir kaymayı gösterebilir.",
      ],
    },
    {
      heading: "Doğal frekans ne anlama gelir",
      paragraphs: [
        "Bir binanın doğal frekansı, serbestçe sallandığında titreştiği orandır. Kütle dağılımı, yapısal rijitlik ve geometri tarafından belirlenir. Daha kısa ve rijit binalar genellikle daha uzun ve esnek yapılardan daha yüksek doğal frekanslara sahiptir. Bu frekanslar, çevresel koşullar veya deprem olayları sırasında alınan titreşim ölçümlerinden çıkarılabilir.",
      ],
    },
    {
      heading: "Çevresel titreşim ve güçlü hareket",
      paragraphs: [
        "Çevresel titreşim izleme, rüzgar, trafik ve mekanik ekipman gibi günlük güçlerin binayı hareketlendirmesini kullanır. Elde edilen küçük genlikli titreşimler, deprem gerektirmeden doğal frekansları ortaya çıkarabilir. Güçlü hareket izleme, deprem olayları sırasında yapının tepkisini yakalar, bu farklı titreşim modlarını harekete geçirebilir ve daha yüksek genliklerde davranış hakkında bilgi sağlayabilir.",
      ],
    },
    {
      heading: "Frekans neden değişebilir",
      paragraphs: [
        "Ölçülen doğal frekans sabit bir sayı değildir. Sıcaklık malzeme rijitliğini etkiler. Yoğunluk kütle dağılımını değiştirir. Daha güçlü hareket, görünür frekansı kaydırmayan doğrusal olmayan yapısal davranışı devreye sokabilir. Analiz yöntemleri, pencere uzunlukları ve sinyal işleme seçenekleri de sonucu etkiler. Bu faktörler, frekans değişimlerinin beklenen olduğunu ve otomatik olarak hasar göstermediğini anlamına gelir.",
      ],
    },
    {
      heading: "Trend izleme",
      paragraphs: [
        "Frekansı haftalarca, aylarca ve yıllarca takip etmek, binanın normal davranışı için bir referans çizgisi oluşturur. Referans çizgisinden ani bir sapma veya kademeli bir eğilim daha yakından inceleme gerektirebilir. Trend izlemenin değeri, profesyonel inceleme gerektiren değişiklikleri tespit etmekte yatar, geçer veya geçersiz değerlendirmede değil.",
      ],
    },
    {
      heading: "Sınırlamalar",
      paragraphs: [
        "Frekans verisi tek başına bir değişikliğin nedenini belirleyemez. Birden fazla faktör benzer kaymalar üretebilir. Frekans trendlerini yorumlamak, binanın inşaatı, bakım geçmişi ve çevresel bağlamı hakkında ayrıntılı bilgi gerektirir. Tek bir frekans ölçümü veya bir dizi ölçüme bile yapısal sağlık teşhisi构成 etmez.",
      ],
    },
  ],
  limitations: [
    "Frekans değişimleri yalnızca yapısal hasardan değil, birçok nedenle oluşabilir.",
    "Çevresel ve yoğunluk koşulları, yapısal durumdan bağımsız olarak ölçülen frekansı etkiler.",
    "Trendleri yorumlamak, bina hakkında ayrıntılı bilgi ve profesyonel mühendislik değerlendirmesi gerektirir.",
    "Frekans verisi, belirli yapısal elemanların durumunu değil, dinamik davranışı tanımlar.",
  ],
  sismosmartFit: [
    "SismoSmart, zaman içinde bina doğal frekanslarının çıkarılmasında kullanılabilecek titreşim verisi kaydetmek için tasarlanmış bir ön lansman sistemidir.",
    "Bu trend izleme yeteneği, pilot doğrulama gerçek bina koşullarında güvenilir frekans tahminini onaylayana kadar tasarım hedefidir.",
  ],
  references: [
    {
      label: "NIST Tam Ölçekli Binaların Yapısal Tepki Özelliklerinin Ölçümü",
      organization: "NIST",
      url: "https://doi.org/10.6028/NIST.IR.4511",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Çevresel Titreşim ve Deprem Güçlü Hareket Veri Setleri",
      organization: "USGS",
      url: "https://pubs.usgs.gov/of/2004/1375/",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Binalarda Deprem Sarsıntısının İzlenmesi",
      organization: "USGS",
      url: "https://pubs.usgs.gov/fs/2003/fs068-03/",
    },
  ],
  relatedGuides: [
    "measuring-building-motion-after-earthquake",
    "mems-accelerometers-seismic-monitoring",
    "building-seismic-monitoring-device",
  ],
  relatedGlossaryTerms: ["doğal frekans", "çevresel titreşim", "modal analiz"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "Doğal frekans değişimleri profesyonel inceleme gerektiren bir sinyaldir. Binanın güvenli olduğunu belirlemez; yapısal değerlendirme için yetkili bir mühendise danışın.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart doğal frekans izleme yaklaşımını inceleyin.",
  },
};
