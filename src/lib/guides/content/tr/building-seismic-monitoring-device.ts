import type { GuideContent } from "@/lib/guides/types";

export const buildingSeismicMonitoringDeviceTr: GuideContent = {
  translationKey: "building-seismic-monitoring-device",
  locale: "tr",
  slug: "bina-deprem-sensoru-sismik-izleme",
  title: "Bina Deprem Sensörü: Ne Ölçer ve Neden Önemlidir",
  description:
    "Sabit bir bina deprem sensörünün ne ölçtüğünü, alarm veya telefondan nasıl farklandığını ve ne zaman faydalı olduğunu öğrenin.",
  eyebrow: "Rehberler",
  h1: "Bina Deprem Sensörü: Ne Ölçer ve Neden Önemlidir",
  summary:
    "Bina deprem sensörü, sabit bir ivmeölçerdir ve belirli bir yapının deprem ile günlük titreşim sırasındaki hareketini kaydeder. Sahibiyle birlikte hareket eden bir telefonun aksine, kalıcı olarak monte edilmiş bir sensör, kurulum noktasında sabit bir referans noktası sağlar. Elde edilen veri, mühendislerin yapının farklı bölümlerinin sarsıntılara nasıl tepki verdiğini anlamasına yardımcı olabilir ancak cihazın kendisi bir güvenlik sertifikası veya resmi alarm sistemi değil, bir ölçüm aracıdır.",
  keyTakeaways: [
    "Sabit ivmeölçerler, monte edildikleri noktada hareketi kaydederek mühendislere güvenilir bir konum referansı sağlar.",
    "Birçok katlı binalarda sensör dizileri, yapının farklı noktalarındaki hareketi karşılaştırmaya yardımcı olur.",
    "Tüketici tipi bir izleme cihazı, yetkili bir yapı mühendisinin veya resmi incelemenin yerine geçmez.",
  ],
  sections: [
    {
      heading: "Doğrudan cevap",
      paragraphs: [
        "Bina deprem sensörü, kurulum noktasında ivmelenme, titreşim ve zamanı kalıcı olarak ölçer. Sabit kaldığı için ürettiği veri, genel bir bölgeyi değil, o montaj noktasının davranışını tanımlar. Bu nedenle sabit sensörler, bir deprem veya rüzgar ile mekanik ekipman gibi çevresel kuvvetler sırasında yapının tepkisini anlamada faydalıdır.",
      ],
    },
    {
      heading: "Cihaz ne ölçer",
      paragraphs: [
        "Cihaz içindeki sensör, dikey ve iki yatay olmak üzere üç eksende ivmelenmeyi kaydeder. Her okumayı zaman damgasıyla işaretleyerek mühendislerin bir olay sırasında hareketin zaman serisini yeniden oluşturmasını sağlar. Frekans içeriği, tepe ivme ve süre, bu kayıtlardan çıkarılarak yapının ne kadar şiddetli ve ne kadar süre hareket ettiği tanımlanır.",
      ],
      bullets: [
        "Montaj noktasında tepe zemin veya kat ivmesi.",
        "Frekans içeriği ve baskın titreşim modları.",
        "Önemli sarsıntının süresi.",
        "Dizi kurulduğunda sensörler arası karşılaştırma.",
      ],
    },
    {
      heading: "Sabit izlemenin alarmdan farkı",
      paragraphs: [
        "Bir alarm veya bildirim sistemi, saptandığında veya tahmin edildiğinde insanları uyarmak için tasarlanmıştır. Sabit izleme cihazı ise belirli bir konumda ne olduğunu kaydederek verinin sonradan incelenmesini sağlar. İkisinin amacı farklıdır: biri doğrudan eylem için bilgi sağlar, diğeri ise olay sonrası anlayış için destek verir.",
      ],
    },
    {
      heading: "Nerede faydalıdır",
      paragraphs: [
        "Sabit izleme, çok katlı konut binalarında, referans titreşim davranışı henüz bilinmeyen eski yapılarda, küçük ticari mülklerde ve sismik aktiviteye yakın konumlarda faydalıdır. Elde edilen veri, yöneticilerin bir olay sonrasında profesyonel inceleme gerekip gerekmediğine karar vermesine yardımcı olur. Şeffaf ve doğrulanabilir kayıtlar, sakinlerin binanın ne yaşadığını anlamasını sağlar.",
      ],
    },
    {
      heading: "Sınırlamalar",
      paragraphs: [
        "Bir kattaki tek bir sensör, tüm binanın davranışını temsil etmez. İvmeölçerler hasarı doğrudan ölçmez, sadece hareketi ölçer. Veriler, yapısal güvenlik hakkında sonuç çıkarabilmek için yetkili bir profesyonel tarafından yorumlanmalıdır. Hava koşulları, zemin ve ekipman titreşimi de okumaları etkileyebilir.",
      ],
    },
  ],
  limitations: [
    "Bir kattaki tek bir sensör, tüm binanın davranışını temsil etmez.",
    "Hareket verisi hareketi tanımlar, yapısal hasarı değil, bu nedenle binanın güvenli olduğunu doğrulayamaz.",
    "Yorumlama, yapının inşaat bilgisiyle birlikte profesyonel mühendislik değerlendirmesi gerektirir.",
    "Rüzgar, sıcaklık ve ekipman gibi çevresel faktörler ölçülen titreşimi etkileyebilir.",
  ],
  sismosmartFit: [
    "SismoSmart, binalara sabit MEMS ivmeölçerler yerleştirmeyi hedefleyen bir ön lansman ürünüdür. Mevcut tasarım hedefleri arasında üç eksenli kayıt, zaman damgalı veri ve uzaktan erişim bulunur.",
    "Bu yetenekler, pilot doğrulama yerleşik binalarda gerçek dünya performansını onaylayana kadar tasarım hedefidir.",
  ],
  references: [
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Ulusal Güçlü Hareket Projesi",
      organization: "USGS",
      url: "https://earthquake.usgs.gov/monitoring/nsmp/",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Binalarda Deprem İzleme",
      organization: "USGS",
      url: "https://earthquake.usgs.gov/monitoring/nsmp/buildings/",
    },
    {
      label: "ABD Jeolojik Araştırmalar Enstitüsü Binalarda Deprem Sarsıntısının İzlenmesi",
      organization: "USGS",
      url: "https://pubs.usgs.gov/fs/2003/fs068-03/",
    },
  ],
  relatedGuides: [
    "measuring-building-motion-after-earthquake",
    "seismic-sensor-placement",
    "earthquake-app-vs-fixed-sensor",
  ],
  relatedGlossaryTerms: ["ivmeölçer", "güçlü hareket", "MEMS"],
  publishedAt: "2026-07-26",
  updatedAt: "2026-07-26",
  safetyNotice:
    "Bina izleme cihazı hareket verisi kaydeder. Binanın güvenli olduğunu sertifikalandırmaz ve deprem sonrasında yetkili bir mühendisin incelemesinin yerini almaz.",
  cta: {
    label: "SismoSmart hakkında bilgi alın",
    href: "/product",
    description: "SismoSmart sabit bina izleme yaklaşımını inceleyin.",
  },
};
