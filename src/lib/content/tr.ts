import type { SiteCopy } from "@/lib/site";

export const trCopy: SiteCopy = {
  accessibility: {
    skipToContent: "İçeriğe geç",
  },
  meta: {
    title: "Binanız için sismik izleme cihazı",
    description:
      "SismoSmart, sarsıntı sırasında bina hareketini kaydetmek ve nitelikli mühendislerin olay sonrası incelemesine veri sağlamak için geliştirilen lansman öncesi bir sismik izleme cihazıdır.",
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
      "SismoSmart, bina hareketini ölçmek ve kaydetmek için geliştirilen lansman öncesi, duvara sabit bir cihazdır. Algılama, bildirim, bağlantı ve performans davranışı pilot doğrulamasına tabidir. Amaç, sarsıntı sonrasında nitelikli mühendise inceleyebileceği bir hareket kaydı bırakmaktır.",
    primaryCta: "Pilot için başvur",
    secondaryCta: "Yatırımcı bilgi notu",
    tertiaryCta: "Teknolojiye bak",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Montaj", value: "Duvara sabit" },
      { label: "Algılama", value: "Cihaz üzerinde" },
      { label: "Örnekleme hedefi", value: "250 Hz, 3 eksen" },
      { label: "Güç hedefi", value: "30-60 sn süperkapasitör" },
    ],
    deviceEyebrow: "SismoSmart cihazı",
    deviceTitle: "100 × 100 mm. Duvara takılıyor, prizden besleniyor.",
    deviceDescription:
      "Cihazı duvara yapıştırıp prize takıyorsunuz. Uygulamadan eşleyip Wi-Fi'nizi tanımlıyorsunuz. Bundan sonrası arka planda: binanın titreşimini ölçmeye başlıyor ve normal bir günde varlığını hiç hissettirmiyor.",
    deviceSpecs: [
      "3 eksenli hareket ölçümü hedefi",
      "Yerel olay kaydı hedefi",
      "Cihaz verisi şifreleme hedefi",
    ],
    meterTopLabel: "Algılama",
    meterTopValue: "Doğrulama bekliyor",
    meterBottomLabel: "Veri",
    meterBottomValue: "Şifreleme hedefi",
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
      "Pilot kalibrasyonunda binanın normal titreşim profilini öğrenmeyi ve gündelik gürültüden farklı hareketleri ayırmayı test ediyoruz. Saha doğrulaması tamamlanana kadar yanlış veya kaçırılmış algılama mümkündür.",
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
          "Pilot kalibrasyonu trafik ve rüzgâr gibi gündelik titreşimlerden bir taban çizgisi çıkarmayı hedefliyor. Yöntemin güvenilirliği saha verisiyle doğrulanmadan kesin sonuç olarak sunulmuyor.",
      },
      {
        title: "Sarsıntıda haber verir",
        description:
          "Tasarım, cihaz üzerindeki algılama sonrasında bildirim üretebilmeyi hedefliyor. Bildirim süresi ve çoklu cihaz doğrulaması pilot doğrulamasına tabidir.",
      },
      {
        title: "Olayı kaydeder",
        description:
          "Tasarımda yerel olay tamponu ve bağlantı olduğunda buluta aktarım bulunuyor. Bu akışın tamamı pilot testleriyle doğrulanmadan devrede bir cihaz özelliği olarak sunulmuyor.",
      },
      {
        title: "Birden fazla cihaz daha iyi",
        description:
          "Birden fazla cihazın göreli kat hareketi ve olay korelasyonu için ek kanıt sağlayabileceğini test ediyoruz. Doğruluk ve yanlış alarm etkisi pilot verisi gerektiriyor.",
      },
    ],
  },
  features: {
    eyebrow: "Ne yapar",
    title: "Aslında birkaç ayrı işi aynı anda yapıyor.",
    description:
      "Ürünü olay kaydı ve daha uzun dönemli bina hareketi verisi etrafında geliştiriyoruz. Bildirim, yapı sağlığı yorumu ve diğer cihaz özellikleri doğrulama hedefidir; garanti edilen sonuçlar değildir.",
    items: [
      {
        accent: "01",
        title: "Sarsıntıyı algılar",
        description:
          "Mevcut tasarım ADXL355 sınıfı MEMS sensörü ve üç eksende 250 Hz örneklemeyi hedefliyor. Algılama ve performans iddiaları için tezgâh ve pilot kanıtı gerekiyor.",
      },
      {
        accent: "02",
        title: "Telefonunuza bildirim gönderir",
        description:
          "Bildirim davranışı pilot doğrulaması gereken bir tasarım hedefidir. SismoSmart acil durum servisi veya resmî uyarı sistemi değildir; resmî uyarıları ve acil durum talimatlarını izleyin.",
      },
      {
        accent: "03",
        title: "Bina sağlığını izler",
        description:
          "Ölçülen titreşim özelliklerindeki değişim zaman içinde mühendise ek kanıt sağlayabilir. Bu bir teşhis değildir ve binanın güvenli olup olmadığını belirlemez.",
      },
      {
        accent: "04",
        title: "Depremden sonra rapor üretir",
        description:
          "Planlanan olay sonrası rapor, ölçülen hareketi nitelikli inceleme için özetlemeyi hedefliyor. Rapor alanları ve yorumlama pilot doğrulamasına tabidir.",
      },
      {
        accent: "05",
        title: "Sıcaklık ve nem de okur",
        description:
          "Çevresel ölçüm, mevsimsel etkileri diğer değişimlerden ayırmaya yardımcı olması için tasarım hedefidir. Tek başına hasar tespiti yapmaz.",
      },
      {
        accent: "06",
        title: "Birlikte daha güçlü",
        description:
          "Çoklu cihaz korelasyonu bir tasarım hedefidir. Doğrulama süresi ve yanlış alarm üzerindeki etkisi henüz pilot kanıtıyla gösterilmedi.",
      },
    ],
  },
  demo: {
    eyebrow: "Veri akışı",
    title: "Ölçüm cihazda başlıyor, telefonunuzda bitiyor.",
    description:
      "Mevcut tasarım ölçümü cihazda başlatıyor ve bağlantı olduğunda veriyi güvenli biçimde aktarmayı hedefliyor. Cihaz güvenliği, raporlama ve uzun dönem eğilim ekranları pilot doğrulaması bekliyor.",
    previewLabel: "Bina kaydı",
    networkLabel: "Mahalle ağı",
    sensorLabel: "Cihaz",
    sensorValue: "Çalışıyor",
    eventLabel: "Son olay",
    eventValue: "Kayıtlı, incelenebilir",
    bullets: [
      "Mevcut tasarım ADXL355 sınıfı sensör, üç eksende 250 Hz örnekleme ve belgelenmiş bir gürültü hedefi kullanıyor; nihai performans için dondurulmuş BOM ve tezgâh ölçümü gerekiyor.",
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
          "Pilot cihaz sayısı, süre, mülkiyet ve ticari koşullar her saha için ayrıca belirlenir. Bu sayfa ücretsiz donanım veya sabit pilot süresi taahhüt etmez.",
        highlight: "Pilot koşulları görüşülür",
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
          "Araştırma erişimi için açık pilot koşulları, gizlilik kontrolleri ve ayrı veri paylaşım anlaşması gerekir. Bu, varsayılan veri akışı değildir.",
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
          "Hayır. SismoSmart bir deprem erken uyarı servisi değildir ve önceden uyarı sözü vermez. Pilot çalışmaları cihaz üzerindeki algılama sonrasında düşük gecikmeli bildirimi değerlendirebilir; acil uyarılar için resmî kaynakları izleyin.",
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
          "Mevcut tasarım, internet kesintisinde yerel tamponlama ve elektrik kesintisinde kısa süreli süperkapasitör köprüsü hedefliyor. Kesin süre ve uçtan uca aktarım davranışı donanım ve pilot doğrulamasına tabidir.",
      },
      {
        title: "Ne zaman satışa çıkıyor?",
        description:
          "Kesinleşmiş bir genel satış tarihi yok. SismoSmart lansman öncesi aşamada; pilot kanıtı, donanım hazırlığı, sertifikasyon ve üretim takvimi tarihi belirleyecek. Onaylanmış güncellemeler için bültene kaydolabilirsiniz.",
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
