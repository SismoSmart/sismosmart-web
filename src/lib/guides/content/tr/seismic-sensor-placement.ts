import type { GuideContent } from "@/lib/guides/types";

export const seismicSensorPlacementTr: GuideContent = {
  translationKey: "seismic-sensor-placement",
  locale: "tr",
  slug: "binada-sismik-sensor-yerlesimi",
  title: "Binada Sismik Sensör Yerleşimi: Sabit Montaj ve Pratik Rehberlik",
  description:
    "Binada sismik sensör yerleşimi konusunda sabit montaj, tek sensör vs dizi kararı ve kurulum öncesi pratik kontrol listesini öğrenin.",
  eyebrow: "Rehberler",
  h1: "Binada Sismik Sensör Yerleşimi: Sabit Montaj ve Pratik Rehberlik",
  summary:
    "Binada sismik sensör yerleşimi, ölçüm hedefiyle başlar. Sağlam bir yüzeye güvenli şekilde monte edilmiş sensör güvenilir bir referans noktası sağlarken, birden fazla kata yerleştirilmiş sensörler yapının farklı noktalarındaki hareketi ortaya koyar. Yerleşim veri kalitesini etkiler: gevşek montaj gürültü üretir ve ağır makinelerin yakınında bulunan bir sensör, mühendislerin aslında ihtiyaç duyduğu sinyalleri gizleyebilir. Binayı sertifikalandıran evrensel bir yerleşim yoktur; hedef, sorulan sorulara anlamlı hareket yakalayabilecek noktalara sensör yerleştirmektir.",
  keyTakeaways: [
    "Yerleşim, ölçüm hedefine bağlıdır: nereye monte edeceğinize karar vermeden önce neyi öğrenmek istediğinizi belirleyin.",
    "Sağlam bina yüzeyine güvenli şekilde tutturulması güvenilir veri için gereklidir.",
    "Yapısal tepkiyi karşılaştırmak için birden fazla kata ihtiyaç vardır; tek noktanın sınırları vardır.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "Binada sismik sensör yerleşimi, ivmeölçerlerin nereye ve nasıl monte edileceğini seçmek demektir. İyi yerleşim tutarlı ve yorumlanabilir sonuçlar üretir; kötü yerleşim gürültü ekler veya önemli davranışları kaçırır. Süreç, izlemenin cevaplaması gereken soruyu tanımlamakla başlar.",
      ],
    },
    {
      heading: "Sabit montaj",
      paragraphs: [
        "Bir sensör, mobilya, bölmeler veya gevşek kaplamalarla değil, yapıyla birlikte hareket eden yapısal bir elemana sağlam şekilde tutturulmalıdır. Beton, çelik veya sağlam duvar yüzeyleri tercih edilir. Montaj yöntemi bina hareketini sensöre doğru biçimde aktarmalı; kendi rezonansını, gevşemeyi veya kaymayı ölçüme eklememelidir.",
      ],
      bullets: [
        "Yapısal elemanlara monte edin, yapısal olmayan bölmelere değil.",
        "Motor, havalandırma ünitesi veya diğer titreşim kaynaklarının yakınındaki yerlerden kaçının.",
        "Montajın sıkı olduğunu ve zamanla gevşemeyeceğini doğrulayın.",
      ],
    },
    {
      heading: "Tek sensör ile dizi karşılaştırması",
      paragraphs: [
        "Referans noktasındaki tek sensör, o konumdaki hareketi tanımlar. Farklı katlardaki sensörlerden oluşan dizi, hareketin yapı boyunca nasıl güçlendiğini veya azaldığını ortaya koyar. Diziler daha bilgilidir ancak daha fazla planlama, kurulum çabası ve veri yönetimi gerektirir.",
      ],
    },
    {
      heading: "Giriş ve üst kat hareketi",
      paragraphs: [
        "Zemin kat sensörleri topraktan gelen giriş hareketini yakalar. Üst kat sensörleri yapının bu girişi nasıl dönüştürdüğünü kaydeder. İkisini karşılaştırmak, mühendislerin yapının dinamik davranışını ve bazı katların diğerlerinden daha güçlü hareket yaşayıp yaşamadığını anlamasına yardımcı olur.",
      ],
    },
    {
      heading: "Pratik kurulum öncesi kontrol listesi",
      paragraphs: [
        "Kurulumdan önce ölçüm hedefini, yapısal montaj noktalarını, erişimi ve gücü doğrulayın ve veri depolamayı ve almayı planlayın. Sensör konumunu, yönünü ve montaj türünü belgeleyin ki gelecekteki analiz kurulum ayrıntılarını hesaba katabilsin.",
      ],
    },
    {
      heading: "Sınırlamalar",
      paragraphs: [
        "Yerleşim kararları her bina ve her hedef için özeldir. Tek bir yerleşim stratejisi her yapıya uymaz. Sensör verisi, montaj noktasındaki davranışı yansıtır ve ek sensörler olmadan diğer konumları temsil etmeyebilir.",
      ],
    },
  ],
  limitations: [
    "Evrensel bir yerleşim stratejisi her binaya veya her ölçüm hedefine uymaz.",
    "Sensör, kendi konumundaki hareketi kaydeder, bu diğer katları veya alanları temsil etmeyebilir.",
    "Çevresel faktörler ve yakındaki ekipman her yerleşimde okumaları etkileyebilir.",
    "Kurulum ayrıntılarının, doğru analiz için belgelenmesi gerekir, bu da planlama çabası ekler.",
  ],
  sismosmartFit: [
    "SismoSmart, net montaj rehberliği ve çok katlı kurulum ile sabit kurulum için tasarlanmış bir ön lansman sistemidir.",
    "Bu yaklaşım, pilot doğrulama yerleşik binalarda gerçek dünya yerleşimini ve veri kalitesini onaylayana kadar tasarım hedefidir.",
  ],
  references: [
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Federal Binalarda Deprem Sarsıntısının İzlenmesi",
      organization: "USGS",
      url: "https://pubs.usgs.gov/fs/2005/3052/",
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
    "mems-accelerometers-seismic-monitoring",
    "measuring-building-motion-after-earthquake",
  ],
  relatedGlossaryTerms: ["sensör yerleşimi", "dizi", "montaj"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "Sensör yerleşimi binanın güvenli olduğunu sertifikalandırmaz. Uygun ölçüm hedeflerini belirlemek ve sonuçları yorumlamak için yetkili bir mühendise danışın.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart sensör yerleşimi rehberliğini inceleyin.",
  },
};
