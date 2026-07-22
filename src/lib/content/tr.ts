import type { SiteCopy } from "@/lib/site";

export const trCopy: SiteCopy = {
  accessibility: {
    skipToContent: "İçeriğe geç",
  },
  meta: {
    title: "Binanız için sismik izleme cihazı",
    description:
      "SismoSmart, duvara taktığınız küçük bir sismik izleme cihazı. Binanızın hareketini sürekli ölçer, ciddi bir sarsıntıda telefonunuza haber verir. Deprem sırasında tuttuğu kaydı sonradan mühendisiniz okuyabilir.",
  },
  navigation: {
    eyebrow: "Bina için sismik izleme",
    primaryCta: "Pilot başvurusu",
    links: [
      { label: "Teknoloji", href: "/technology" },
      { label: "Ürün", href: "/product" },
      { label: "Pilot", href: "/pilot-program" },
      { label: "SSS", href: "/faq" },
    ],
  },
  hero: {
    badge: "Erken aşama donanım girişimi",
    title: "Binanız depremde nasıl sallandı? Bunu ölçen bir cihaz yaptık.",
    description:
      "SismoSmart, prize takılan ve duvara sabitlenen küçük bir cihaz. Binanızın hareketini sürekli ölçer, ciddi bir sarsıntıda telefonunuza haber verir. Asıl işi ise depremin kaydını tutmak: mühendis geldiğinde binanın o sırada nasıl davrandığını bu kayıttan okuyabilir.",
    primaryCta: "Pilot için başvur",
    secondaryCta: "Yatırımcı bilgi notu",
    tertiaryCta: "Teknolojiye bak",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montaj", value: "Duvara sabit" },
      { label: "Algılama", value: "Cihaz üzerinde" },
      { label: "Örnekleme", value: "250 Hz, 3 eksen" },
      { label: "Güç köprüsü", value: "30-60 sn süperkapasitör" },
    ],
    deviceEyebrow: "SismoSmart cihazı",
    deviceTitle: "100 × 100 mm. Duvara takılıyor, prizden besleniyor.",
    deviceDescription:
      "Cihazı duvara yapıştırıp prize takıyorsunuz. Uygulamadan eşleyip Wi-Fi'nizi tanımlıyorsunuz. Bundan sonrası arka planda: binanın titreşimini ölçmeye başlıyor ve normal bir günde varlığını hiç hissettirmiyor.",
    deviceSpecs: [
      "3 eksenli hareket ölçümü",
      "Olay anında yerel kayıt",
      "Wi-Fi ile şifreli veri",
    ],
    meterTopLabel: "Algılama",
    meterTopValue: "Cihaz üzerinde",
    meterBottomLabel: "Veri",
    meterBottomValue: "Şifreli",
    imageAlt: "SismoSmart sismik izleme cihazı, durum LED'i ile",
  },
  trust: {
    eyebrow: "Konumlandırma",
    title: "Bu cihazın yapamadığı şeyler de var.",
    description:
      "SismoSmart henüz pilot aşamasında. Yaptığı iş, binanızda olan biteni kaydetmek ve bunu sonradan inceleyebileceğiniz bir veriye dönüştürmek. AFAD'ın uyarı sistemiyle ya da deprem sonrası mühendis incelemesiyle yarışmıyoruz. İkisi de yerinde duruyor, biz aradaki boşluğu dolduruyoruz.",
    items: [
      { label: "Aşama", value: "Pilot" },
      { label: "Ana iş", value: "Hareket kaydı" },
      { label: "Yapısal karar", value: "Mühendiste" },
    ],
  },
  howItWorks: {
    eyebrow: "Nasıl çalışır",
    title: "Kurulumu birkaç dakika sürüyor, sonrası tamamen arka planda.",
    description:
      "Cihazı taktıktan sonra sizin bir şey yapmanız gerekmiyor. İlk birkaç gün binanızın normal titreşim profilini öğreniyor, sonrasında anormal olanı ayırt edebiliyor.",
    steps: [
      {
        title: "Cihazı duvara tak",
        description:
          "İç mekânda sabit bir duvara yapıştırıyorsunuz. Arkasında çift taraflı bant hazır geliyor, isterseniz vidayla da sabitleyebilirsiniz.",
      },
      {
        title: "Uygulamaya bağla",
        description:
          "Telefonunuzdaki SismoSmart uygulaması cihazı Bluetooth ile buluyor. Wi-Fi şifrenizi bir kez giriyorsunuz, o kadar.",
      },
      {
        title: "Binayı tanır",
        description:
          "Cihaz birkaç gün boyunca binanızın normal titreşimini dinliyor. Kamyon geçtiğinde ne olduğunu, rüzgârlı bir günde ne olduğunu öğreniyor. Anormali ancak normali bildikten sonra ayırt edebilir.",
      },
      {
        title: "Sarsıntıda haber verir",
        description:
          "Ciddi bir titreşim algıladığında telefonunuza bildirim düşüyor. Yakındaki başka cihazlar da aynı anda sarsıntı gördüyse bildirim doğrulanmış olarak geliyor.",
      },
      {
        title: "Olayı kaydeder",
        description:
          "Sarsıntı sırasındaki ve sonrasındaki ham veri hem cihazda tutuluyor hem buluta gidiyor. Mühendis bu kayıttan binanın nasıl tepki verdiğini okuyabilir.",
      },
      {
        title: "Birden fazla cihaz daha iyi",
        description:
          "Aynı binada birkaç cihaz varsa katların birbirine göre nasıl hareket ettiği görülebiliyor. Aynı mahallede birkaç cihaz varsa yanlış alarm ihtimali düşüyor.",
      },
    ],
  },
  features: {
    eyebrow: "Ne yapar",
    title: "Aslında birkaç ayrı işi aynı anda yapıyor.",
    description:
      "Deprem anında haber vermek yaptığı işlerden sadece biri. Asıl değerli kısmı öncesi ve sonrası: binanın sağlığını aylar boyunca takip ediyor ve sarsıntı sırasında ne olduğunu kaydediyor.",
    items: [
      {
        accent: "01",
        title: "Sarsıntıyı algılar",
        description:
          "Hassas bir MEMS sensörü zemin titreşimini saniyede 250 kez ölçüyor. Kamyon geçişini gerçek bir sarsıntıdan ayırt edebilecek kadar hassas.",
      },
      {
        accent: "02",
        title: "Telefonunuza bildirim gönderir",
        description:
          "Sarsıntı algıladığında uygulamadan push bildirim geliyor. Bildirimde ne yapmanız gerektiği yazıyor: Çök, Kapan, Tutun.",
      },
      {
        accent: "03",
        title: "Bina sağlığını izler",
        description:
          "Her binanın bir doğal frekansı var. Cihaz bunu ve sönümleme oranını aylar boyunca takip ediyor. Buradaki anormal bir kayma, yapısal bir sorunun erken işareti olabilir.",
      },
      {
        accent: "04",
        title: "Depremden sonra rapor üretir",
        description:
          "Sarsıntının şiddeti, süresi ve binanızın verdiği tepki tek bir raporda toplanıyor. Mühendis binaya gelmeden önce elinde bir başlangıç noktası oluyor.",
      },
      {
        accent: "05",
        title: "Sıcaklık ve nem de okur",
        description:
          "Bir binanın davranışı kışın ve yazın aynı değil. Çevresel veri olmadan bu mevsimsel kaymayı yapısal bir sorundan ayıramazsınız.",
      },
      {
        accent: "06",
        title: "Birlikte daha güçlü",
        description:
          "Mahallenizdeki her cihaz ortak sinyale katkı veriyor. Cihaz sayısı arttıkça doğrulama hızlanıyor ve yanlış alarm azalıyor.",
      },
    ],
  },
  demo: {
    eyebrow: "Veri akışı",
    title: "Ölçüm cihazda başlıyor, telefonunuzda bitiyor.",
    description:
      "Cihaz ölçüyor ve veriyi şifreleyip gönderiyor. Uygulamadaki ekranlar bunu okunur hale getiriyor: cihaz çalışıyor mu, son olay neydi, binanızın uzun vadeli eğilimi ne yönde.",
    previewLabel: "Bina kaydı",
    networkLabel: "Mahalle ağı",
    sensorLabel: "Cihaz",
    sensorValue: "Çalışıyor",
    eventLabel: "Son olay",
    eventValue: "Kayıtlı, incelenebilir",
    bullets: [
      "Duvara sabit MEMS sensörün gürültü tabanı 22 µg. Telefonunuzdakinin yaklaşık 2.000 µg. Aradaki fark yüz kat civarında.",
      "Binanızın titreşim verisini görmek için kişisel bilgi paylaşmanız gerekmiyor.",
      "Cihaz mühendisin yerine karar vermiyor, mühendise daha iyi veri veriyor.",
    ],
    cta: "Teknolojiye bak",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Pilot yolu",
    title: "Önce az sayıda gerçek binada denemek istiyoruz.",
    description:
      "Ürünü büyütmeden önce sahada görmek istiyoruz. İlk pilotlardan gelecek geri bildirim, cihazın son halini belirleyecek. Şimdilik üç grupla konuşuyoruz.",
    cards: [
      {
        title: "Apartmanlar",
        description:
          "Birkaç dairede ve ortak alanda birer cihaz. Bina yönetimiyle anlaşıp altı ay boyunca ücretsiz kuruyoruz.",
        highlight: "Ücretsiz pilot",
      },
      {
        title: "Kampüsler ve fabrikalar",
        description:
          "Birden fazla binası olan tesisler. Her binaya bir cihaz, hepsi tek bir panelden görünüyor.",
        highlight: "Kurumsal",
      },
      {
        title: "Üniversite ortaklıkları",
        description:
          "Deprem mühendisliği bölümleriyle veri paylaşıyoruz. Araştırmacılar anonim veriye erişiyor, biz de akademik geri bildirim alıyoruz.",
        highlight: "Akademik işbirliği",
      },
    ],
  },
  faq: {
    eyebrow: "SSS",
    title: "Sık sorulanlar",
    description:
      "Aklınıza takılan buradaysa cevabı da burada. Değilse info@sismosmart.com adresine yazın, cevaplayalım. Soruların tamamı SSS sayfasında.",
    items: [
      {
        title: "Bu cihaz beni depremden önce uyarır mı?",
        description:
          "Birkaç saniyeden söz ediyoruz, dakikalardan değil. Deprem uzaktan geliyorsa cihaz hızlı ilerleyen P dalgasını yakalayıp yıkıcı S dalgası gelmeden önce bildirim gönderebilir. Merkez üssü yakınsa bu süre neredeyse sıfıra iner. Cihazı bir erken uyarı sistemi olarak tanıtmıyoruz, çünkü her depremde işe yaramaz.",
      },
      {
        title: "Google'ın deprem uyarısından farkı ne?",
        description:
          "Google telefonların ivmeölçerini kullanıyor. Ücretsiz, herkeste var ve iyi de çalışıyor. Ama ölçtüğü şey depremin kaynağı, sizin binanız değil. Biz tam tersini yapıyoruz: binanız nasıl titreşiyor, mevsimle nasıl değişiyor, depremden sonra hangi durumda. Bu soruların cevabı telefondan çıkmaz.",
      },
      {
        title: "Tek cihaz binamın güvenli olduğunu söyleyebilir mi?",
        description:
          "Söyleyemez. Bir binaya güvenli ya da güvensiz diyecek olan mühendistir, cihaz değil. Cihazın yaptığı şey, mühendise elle tutulur bir veri bırakmak.",
      },
      {
        title: "Kurulumu zor mu?",
        description:
          "USB-C kabloyu prize takıyorsunuz, cihazı arkasındaki bantla duvara yapıştırıyorsunuz, uygulamadan eşliyorsunuz. Matkap ya da teknisyen gerekmiyor, beş dakikada bitiyor.",
      },
      {
        title: "Elektrik veya internet kesilirse ne olur?",
        description:
          "İnternet giderse cihaz ölçmeye devam eder, olayı kendi belleğine kaydeder ve bağlantı gelince gönderir. Elektrik giderse içindeki süperkapasitör 30-60 saniye köprü güç sağlar; bu süre son olayı buluta göndermeye yeter. Kesinti uzarsa cihaz kapanır.",
      },
      {
        title: "Ne zaman satışa çıkıyor?",
        description:
          "Pilotlar 2026 yazında başlıyor, geniş satışı 2026 sonunda hedefliyoruz. Sertifikasyon ve üretim takvimi bu tarihi öteleyebilir. Bültene kaydolursanız kesin tarihi ilk siz duyarsınız.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Bize ulaşın",
    title: "Lansmandan önce konuşalım.",
    description:
      "Pilot olmak isteyen bir bina yönetimi, yatırımcı ya da kurum temsilcisiyseniz kısaca ne yapmak istediğinizi yazın. Sizi doğru kişiye yönlendirelim.",
    inputLabel: "E-posta",
    placeholder: "ad@kurum.com",
    button: "Gönder",
    consent:
      "SismoSmart lansman, pilot ve yatırımcı duyuruları için e-posta almayı kabul ediyorum.",
    note: "E-posta adresinizi yalnızca bu amaçla kullanırız.",
    loading: "Gönderiliyor...",
    success: "Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.",
    error: "Bir sorun oluştu. Lütfen tekrar deneyin.",
    missingEndpoint:
      "Form henüz bağlanmadı. info@sismosmart.com adresine doğrudan yazabilirsiniz.",
    rateLimited:
      "Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.",
  },
  footer: {
    legal: "© 2026 SismoSmart. Tüm hakları saklıdır.",
  },
};
