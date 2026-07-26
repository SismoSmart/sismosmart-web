import type { GuideContent } from "@/lib/guides/types";

export const memsAccelerometersSeismicMonitoringTr: GuideContent = {
  translationKey: "mems-accelerometers-seismic-monitoring",
  locale: "tr",
  slug: "mems-ivmeolcer-sismik-izleme",
  title: "MEMS İvmeölçerler ile Sismik İzleme: Temel Kavramlar",
  description:
    "MEMS ivmeölçerlerin sismik izlemede nasıl çalıştığını, çözünürlük, aralık, gürültü, örnekleme ve zamanlama dahil olmak üzere öğrenin.",
  eyebrow: "Rehberler",
  h1: "MEMS İvmeölçerler ile Sismik İzleme: Temel Kavramlar",
  summary:
    "MEMS ivmeölçerler, silikon çip üzerindeki mikroskobik bir mekanik yapı kullanarak ivmelenmeyi ölçen kompakt ve düşük maliyetli sensörlerdir. Aralık, gürültü zemin değeri, örnekleme hızı, zamanlama doğruluğu, montaj ve kalibrasyon ölçüm hedefine uygun olduğunda sismik ve yapısal izleme için destekleyici olabilirler. Düşük maliyet tek başına mühendislik kalitesinde veri garantisi vermez. Çözünürlük, dinamik aralık ve gürültü arasındaki fedakarlıkları anlamak, bir MEMS tabanlı cihazın belirli bir uygulama için uygun olup olmadığını değerlendirmeye yardımcı olur.",
  keyTakeaways: [
    "MEMS cihazları, aralık, gürültü, örnekleme ve zamanlama hedefe uygun olduğunda yapısal ve güçlü hareket uygulamalarını destekleyebilir.",
    "Düşük maliyet tek başına mühendislik kalitesinde veri garantisi vermez; tam spesifikasyon önemlidir.",
    "Çözünürlük, aralık, gürültü zemin değeri ve kalibrasyon birlikte değerlendirilmelidir.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "MEMS ivmeölçerler, silikon substrat üzerinde süspansiyonlu küçük bir kanıt kütlesi kullanır. Sensör hareket ettiğinde kanıt kütlesi yer değiştirir ve bu değişim elektriksel olarak ölçülür. Bu ilke, ivmelenmeye orantılı bir voltaj veya dijital sinyal üretir. MEMS teknolojisi, binalarda, köprülerde ve diğer yapılarda konuşlandırılabilecek küçük ve uygun maliyetli sensörleri mümkün kılar.",
      ],
    },
    {
      heading: "MEMS ivme ölçümü nasıl çalışır",
      paragraphs: [
        "MEMS elemanının içinde, kanıt kütlesi silikon substrat üzerindeki küçük elektrotlarla süspansiyona alınmıştır. İvme, kütlenin substrata göre hareket etmesine neden olur ve bu da elektroslar arasındaki kapasitansı değiştirir. Bu kapasitans değişimi kalibre edilmiş bir ivme okumasına dönüştürülür. Üç eksenli yapı, dikey ve iki yatay yönde eş zamanlı ölçüm sağlar.",
      ],
    },
    {
      heading: "Çözünürlük, aralık ve gürültü",
      paragraphs: [
        "Çözünürlük, sensörün algılayabileceği en küçük ivme değişimini tanımlar. Aralık, doyuma ulaşmadan önce ölçebileceği maksimum ivmeyi belirler. Gürültü zemin değeri, arka plan elektriksel gürültüsünün üzerine çıkabilen en küçük sinyali belirler. Güçlü hareket uygulamaları için aralık, yüksek ivme seviyelerini kırpılma olmadan karşılamalıdır. Çevresel titreşim izleme için düşük gürültü zemin değeri daha önemlidir.",
      ],
      bullets: [
        "Güçlü hareket izlemesi için artı eksi birkaç g aralığı tipiktir.",
        "Mikro-g aralığındaki gürültü zemin değeri çevresel titreşim çalışmalarını destekler.",
        "Çözünürlük ve aralık dengelenmelidir; birini artırmak diğerini azaltabilir.",
      ],
    },
    {
      heading: "Örnekleme ve zamanlama",
      paragraphs: [
        "MEMS ivmeölçerler saniyede onlarca ila yüzlerce örnekleme yapar. Daha yüksek örnekleme hızları daha yüksek frekanslı hareketi yakalar. Zamanlama doğruluğu, birden fazla sensörden veri birleştirilirken veya kayıtlar harici sismik verilerle karşılaştırılırken önemlidir. Saat kayması ve senkronizasyon hataları, analizi karmaşık hale getirebilecek zaman farkları üretebilir.",
      ],
    },
    {
      heading: "Düşük maliyetli ölçümden yararlı veriye",
      paragraphs: [
        "Düşük maliyetli bir MEMS sensörü, doğru şekilde monte edildiğinde, kalibre edildiğinde ve güvenilir zamanlamayla eşleştirildiğinde yararlı veri üretebilir. Ham sensör çıktısından mühendislik düzeyinde bilgiye giden yol, kurulum kalitesine, doğrulamaya ve bilinen referanslara karşı kalibrasyona dikkat gerektirir. Bu adımlar olmadan, yetenekli bir sensör bile yorumlaması zor sonuçlar üretebilir.",
      ],
    },
    {
      heading: "Sınırlamalar",
      paragraphs: [
        "MEMS sensörleri, araştırma düzeyindeki özel enstrümanlara kıyasla sınırlılıklara sahiptir. Daha yüksek gürültü zeminleri, daha dar bant genişliği veya daha az hassas zamanlama içerebilirler. Sıcaklık gibi çevresel faktörler okumaları etkileyebilir. Dikkatli spesifikasyon seçimi ve montaj uygulamaları yardımcı olur ancak bu içsel farklılıkları ortadan kaldırmaz.",
      ],
    },
  ],
  limitations: [
    "MEMS sensörleri genellikle araştırma düzeyindeki enstrümanlardan daha yüksek gürültü zeminlerine sahiptir.",
    "Sıcaklık ve çevresel koşullar MEMS sensör çıkışını etkileyebilir.",
    "Zamanlama doğruluğu, özellikle çok sensörlü dizilerde dikkatli senkronizasyon gerektirir.",
    "Yararlı mühendislik verisi elde etmek için uygun kalibrasyon ve montaj uygulamaları gereklidir.",
  ],
  sismosmartFit: [
    "SismoSmart, aralık, gürültü ve örnekleme için hedef spesifikasyonlarla üç eksenli MEMS ivmeölçerler etrafında tasarlanmış bir ön lansman sistemidir.",
    "Bu tasarım hedefleri, seçilen MEMS bileşenlerinin yerleşik binalarda gerçek dünya izleme gereksinimlerini karşıladığını pilot doğrulama onaylayana kadar bekler.",
  ],
  references: [
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Çevresel Titreşim ve Deprem Güçlü Hareket Veri Setleri",
      organization: "USGS",
      url: "https://pubs.usgs.gov/of/2004/1375/",
    },
    {
      label: "NIST Tam Ölçekli Binaların Yapısal Tepki Özelliklerinin Ölçümü",
      organization: "NIST",
      url: "https://doi.org/10.6028/NIST.IR.4511",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü ShakeNet taşınabilir kablosuz yapısal sensör ağı",
      organization: "USGS",
      url: "https://pubs.usgs.gov/publication/ofr20151134",
    },
  ],
  relatedGuides: [
    "building-seismic-monitoring-device",
    "seismic-sensor-placement",
    "building-natural-frequency-monitoring",
  ],
  relatedGlossaryTerms: ["MEMS", "ivmeölçer", "gürültü zemin değeri"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "MEMS ivmeölçer verisi binanın güvenli olduğunu belirlemez. Sonuçlar yetkili bir mühendis tarafından yorumlanmalıdır.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart MEMS tabanlı izleme yaklaşımını inceleyin.",
  },
};
