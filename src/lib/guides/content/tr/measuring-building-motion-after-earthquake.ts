import type { GuideContent } from "@/lib/guides/types";

export const measuringBuildingMotionAfterEarthquakeTr: GuideContent = {
  translationKey: "measuring-building-motion-after-earthquake",
  locale: "tr",
  slug: "deprem-sonrasi-bina-hareketi-olcumu",
  title: "Deprem Sonrası Bina Hareketi Ölçümü: Kayıttan İncelemeye",
  description:
    "Deprem sonrası bina hareketinin nasıl ölçüldüğünü, ivme ve zaman serisi verisinin ne anlama geldiğini ve sonuçların mühendis incelemesini nasıl desteklediğini öğrenin.",
  eyebrow: "Rehberler",
  h1: "Deprem Sonrası Bina Hareketi Ölçümü: Kayıttan İncelemeye",
  summary:
    "Deprem sonrasında sabit sensör veya taşınabilir ivmeölçer, yapının olay sırasında nasıl hareket ettiğini ölçebilir. Elde edilen kayıt, bilinen bir konumda ivmelenmenin zamana göre değişimini göstererek mühendislerin tepe değerleri, frekans içeriğini ve sarsıntı süresini belirlemesini sağlar. Bu ölçümler, inceleme önceliklendirme kararlarını destekler ancak yapının durumunu değil, tepkisini tanımlar. Tek başına bir kayıt, binanın güvenli veya hasarlı olduğunu doğrulamaz ve yorumlama, bina tipi, saha koşulları ve depremin özellikleriyle ilişkilidir.",
  keyTakeaways: [
    "Olay sonrası kayıtlar belirli bir konumda ölçülen hareketi tanımlar, yapının yapısal durumunu değil.",
    "İvme ve zaman serisi verileri tepe değerleri, frekans içeriğini ve sarsıntı süresini gösterir.",
    "Veriler profesyonel incelemenin önceliklendirilmesini destekler ancak onun yerini almaz.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "Deprem sonrası bina hareketini ölçmek, yapı içindeki bir veya daha fazla noktada ivmelenme ve yer değiştirmeyi kaydetmek demektir. Elde edilen veri, yapının olay sırasında ne kadar şiddetli ve ne kadar süre hareket ettiğinin bir resmini oluşturur. Bu bilgi, mühendislerin yapının maruz kaldığı kuvvetleri anlamasına ve daha fazla araştırmanın uygun olup olmadığına karar vermesine yardımcı olur.",
      ],
    },
    {
      heading: "İvme ve zaman serisi",
      paragraphs: [
        "Bir ivmeölçer, saniyede birçok kez örnekleme yaparak ivme değerlerinin bir zaman serisini üretir. Bu kayıttan analistler tepe ivmeyi, hareketin frekans içeriğini ve önemli sarsıntının süresini çıkarır. Bu özellikler, olayın binanın konumundaki şiddetini tanımlamaya yardımcı olur.",
      ],
    },
    {
      heading: "Konumları karşılaştırma",
      paragraphs: [
        "Birden fazla kata sensör yerleştirildiğinde, veri hareketin yapı boyunca nasıl değiştiğini ortaya koyar. Alt katlar genellikle zemin hareketini daha yakından takip ederken, üst katlar belirli frekansları güçlendirebilir. Seviyeler arası okumaları karşılaştırmak, mühendislerin yapının tüm bir sistem olarak nasıl tepki verdiğini anlamasına yardımcı olur.",
      ],
    },
    {
      heading: "Kayıttan mühendis incelemesine",
      paragraphs: [
        "Ham ivme verisi, analizin başlangıç noktasıdır, sonucu değil. Yetkili bir yapı mühendisi, ölçümleri binanın tasarımı, inşaatı, yaşı ve bilinen kusurlarıyla ilgili bilgilerle birlikte değerlendirir. Sensör verisi ve mühendislik değerlendirmesinin birleşimi, her birinin tek başına sağlayacağından daha eksiksiz bir resim üretir.",
      ],
    },
    {
      heading: "Sınırlamalar",
      paragraphs: [
        "Hareket kayıtları, belirli bir olay sırasında ne olduğunu tanımlar, binanın uzun vadeli durumunu değil. Sıcaklık, rüzgar ve ekipman titreşimi gibi çevresel faktörler okumaları etkileyebilir. Bir kattaki tek bir sensör, çok katlı bir yapının tüm tepkisini yakalayamaz ve veri yorumlaması profesyonel uzmanlık gerektirir.",
      ],
    },
  ],
  limitations: [
    "Ölçülen hareket, belirli olay ve sensör konumunu yansıtır, genel bina durumunu değil.",
    "Sıcaklık, rüzgar ve ekipman titreşimi gibi çevresel faktörler okumaları etkileyebilir.",
    "Tek bir sensör, çok katlı bir yapının tam tepkisini yakalayamaz.",
    "Yorumlama, binanın bilgisiyle birlikte profesyonel mühendislik uzmanlığı gerektirir.",
  ],
  sismosmartFit: [
    "SismoSmart, binadaki sabit noktalarda zaman damgalı verilerle üç eksenli ivmelenme kaydetmeyi hedefleyen bir ön lansman sistemidir.",
    "Bu yetenekler, pilot doğrulama gerçek bina koşullarında gerçek dünya performansını onaylayana kadar tasarım hedefidir.",
  ],
  references: [
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Binalarda Deprem Sarsıntısının İzlenmesi",
      organization: "USGS",
      url: "https://pubs.usgs.gov/fs/2003/fs068-03/",
    },
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
  ],
  relatedGuides: [
    "building-seismic-monitoring-device",
    "seismic-sensor-placement",
    "building-natural-frequency-monitoring",
  ],
  relatedGlossaryTerms: ["güçlü hareket", "zaman serisi", "ivmeölçer"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "Deprem sonrası hareket verisi, yetkili mühendis incelemesini destekler ancak onun yerini almaz. Bina güvenliği konusunda her zaman resmi yönergeleri takip edin ve yapısal mühendise danışın.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart olay sonrası hareket kaydı yaklaşımını inceleyin.",
  },
};
