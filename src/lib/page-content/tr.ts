import type { BaseRoutePagesCopy } from "@/lib/page-copy";

export const trPages: BaseRoutePagesCopy = {
  product: {
    meta: {
      title: "SismoSmart cihazı",
      description:
        "Evinize veya iş yerinize taktığınız küçük bir sismik izleme cihazı. Binanın hareketini ölçer, deprem sırasında ne olduğunu kaydeder.",
    },
    eyebrow: "Ürün",
    title: "Cihaz",
    description:
      "Duvara sabitlenen, USB-C ile beslenen, 100 x 100 x 27 mm boyutunda bir cihaz. Ev ve küçük bina ölçeğinde sürekli hareket ölçümü yapmak için tasarladık.",
    deviceDescription:
      "Kutunun içinden cihaz, USB-C kablo ve çift taraflı montaj bandı çıkıyor. Kurulum için başka bir alete ihtiyacınız olmuyor.",
    meterTopLabel: "Sensör",
    meterTopValue: "Hassas MEMS",
    meterBottomLabel: "Veri",
    meterBottomValue: "Şifreli, sade",
    imageAlt: "SismoSmart cihazı, ön yüz",
    specs: [
      { label: "Sensör", value: "Yüksek hassasiyetli MEMS" },
      { label: "Bağlantı", value: "Wi-Fi + Bluetooth" },
      { label: "Kurulum", value: "5 dakika, mobil uygulama ile" },
      { label: "Durum göstergesi", value: "RGB LED + uygulama" },
    ],
    useCases: [
      {
        title: "Evler ve apartmanlar",
        description:
          "Tek daire için bir cihaz yeter. Apartman yönetimiyle anlaşırsanız binanın farklı katlarına birden fazla cihaz koyabiliriz.",
      },
      {
        title: "Kampüsler ve fabrikalar",
        description:
          "Birden fazla binası olan kuruluşlar her binaya ayrı cihaz takıp hepsini tek panelden izliyor.",
      },
      {
        title: "Atölyeler ve ofisler",
        description:
          "Küçük işletmeler için hızlı kurulan ve bütçeyi zorlamayan bir izleme yolu.",
      },
      {
        title: "Üniversite ortaklıkları",
        description:
          "Deprem araştırma grupları anonimleştirilmiş ölçüm verisine erişebiliyor.",
      },
    ],
    comparisonTitle: "Diğer çözümlerle karşılaştırma",
    comparisonDescription:
      "Profesyonel bir sismografla telefonunuzun arasında bir yerde duruyor. Bu aralık şimdiye kadar boştu: eve takılabilecek fiyatta, ama telefondan çok daha hassas, sabit bir cihaz.",
    comparisonRows: [
      {
        label: "Kurulum",
        sismosmart: "5 dakika, kendiniz",
        traditional: "Mühendis gerekir",
        mobile: "Yok, uygulama yeterli",
      },
      {
        label: "Sabit cihaz",
        sismosmart: "Var, binaya bağlı",
        traditional: "Var",
        mobile: "Yok, telefon hareket eder",
      },
      {
        label: "Bina sağlığı takibi",
        sismosmart: "Var, sade rapor",
        traditional: "Var, uzman raporu",
        mobile: "Yok",
      },
      {
        label: "Fiyat",
        sismosmart: "~$79 / cihaz",
        traditional: "$2.000-10.000+",
        mobile: "Ücretsiz",
      },
    ],
    ctaLabel: "Pilot için başvur",
    ctaHref: "/pilot-program",
  },
  howItWorks: {
    meta: {
      title: "SismoSmart nasıl çalışır",
      description:
        "Cihazı duvara takıyor, telefonunuza bağlıyorsunuz. Cihaz binanızı tanıyor, sarsıntıda haber veriyor ve deprem sonrası rapor üretiyor.",
    },
    eyebrow: "Nasıl çalışır",
    title: "Sistem üç parçadan oluşuyor.",
    description:
      "Cihaz binanın titreşimini ölçer. Bulut bu veriyi şifreli olarak alır ve yakındaki diğer cihazlarla karşılaştırır. Uygulama size sadece anlamlı olanı gösterir.",
    flow: [
      {
        title: "Cihazı yerleştir",
        description:
          "Bina içinde sabit bir yere takıyorsunuz. Kolona yakın bir nokta ya da taşıyıcı bir duvar en iyisi.",
      },
      {
        title: "Telefonla eşle",
        description:
          "Uygulama cihazı Bluetooth ile buluyor. Wi-Fi bilgileriniz cihaza şifreli olarak aktarılıyor.",
      },
      {
        title: "Bina öğrenir",
        description:
          "İlk birkaç gün cihaz binanızın normal titreşim profilini kaydediyor. Sonradan anormali bu referansa bakarak ayırt ediyor.",
      },
      {
        title: "Olay olunca rapor",
        description:
          "Sarsıntı algılandığında bildirim geliyor. Olay bittikten sonra detaylı rapor uygulamada hazır oluyor.",
      },
    ],
    signals: [
      {
        title: "Sarsıntı tespiti cihazda",
        description:
          "Cihaz buluttan cevap beklemez. Anlamlı bir titreşim algıladığı anda kendi kararını verir, doğrulamayı sonra yapar. İnternet yavaşsa ya da yoksa da bildirim üretilir.",
      },
      {
        title: "Deprem sonrası rapor",
        description:
          "Sarsıntının PGA değerini, süresini ve binanızın doğal frekansındaki kaymayı tek bir özet raporda alırsınız.",
      },
      {
        title: "Sadece gerekli veri",
        description:
          "Evdeki hareketinizi izlemiyoruz. Cihaz yalnızca titreşim, sıcaklık, nem, basınç ve kendi çalışma durumunu paylaşır.",
      },
    ],
    network: [
      {
        title: "Mahalle ağı",
        description:
          "Aynı mahallede üç veya daha fazla cihaz aynı anda tetiklendiğinde olay doğrulanmış olarak işaretlenir. Yanlış alarm ihtimali belirgin şekilde düşer.",
      },
      {
        title: "Bina sağlığı takibi",
        description:
          "Binanızın titreşim profili haftalar ve aylar içinde yavaşça değişir. Ani bir değişim yapısal bir sorunun habercisi olabilir.",
      },
      {
        title: "Sade arayüz",
        description:
          "Karmaşık iş arka planda dönüyor. Uygulamada sizin gördüğünüz tek şey bir durum göstergesi: yeşil, sarı, kırmızı.",
      },
    ],
  },
  about: {
    meta: {
      title: "SismoSmart Hakkında",
      description:
        "SismoSmart'ı kim, neden geliştiriyor. 2023 depremlerinden sonra Türkiye'de kurulan ekip, pilot yolculuğu ve lansman takvimi. Cihazı kendi evimizde test ediyoruz.",
    },
    eyebrow: "Hakkımızda",
    title: "Biz de bu binalarda oturuyoruz.",
    description:
      "2023 Kahramanmaraş depremlerinden ve İstanbul çevresindeki son sarsıntılardan sonra bir araya geldik. Kendi evimizin depreme nasıl tepki verdiğini bilmek istedik. Bunu ölçen bir cihaz bulamayınca yapmaya karar verdik.",
    story: [
      "Türkiye'de büyük bir depremden sonra binaların kontrol edilmesi haftalar, bazen aylar sürüyor. O süre boyunca aileler evlerine girip giremeyeceklerini bilmiyor.",
      "Bu süreyi tamamen ortadan kaldıramayız, sonunda binaya bir mühendisin girmesi şart. Ama mühendis gelmeden önce hangi binanın öncelikli olduğunu gösteren bir veri katmanı kurulabilir. Uğraştığımız şey bu.",
      "Ekipte bir inşaat mühendisi akademik danışman, iki yüksek lisans inşaat mühendisi ve gömülü yazılım tarafıyla ilgilenen kurucu var. Hepimiz Türkiye'de oturuyoruz ve cihazı önce kendi evimizde deniyoruz.",
    ],
    principles: [
      {
        title: "Korkutmadan bilgi ver",
        description:
          "Afet pazarlaması yapmıyoruz. Amacımız panik değil hazırlık üretmek, o yüzden metinlerde büyük harfli uyarılar ya da geri sayımlar göremezsiniz.",
      },
      {
        title: "Sınırlarımızı söyle",
        description:
          "Cihazın neyi ölçemediğini de yazıyoruz. Bir özelliği abartmaktansa eksik olduğunu söylemeyi tercih ediyoruz.",
      },
      {
        title: "Veriyi sahibine geri ver",
        description:
          "Kendi binanızın verisi sizindir. Anonimleştirilmiş toplu veriyi akademiyle veya kamu kurumlarıyla paylaşabiliriz. Kişisel veriyi satmıyoruz.",
      },
    ],
    timeline: [
      {
        period: "2026 Q1",
        title: "Ekip ve ürün vizyonu",
        description:
          "Çekirdek ekip toplandı, ana ürün kararları verildi, sistem mimarisi yazıldı.",
      },
      {
        period: "2026 Q2",
        title: "Prototip ve pilot hazırlığı",
        description:
          "İlk donanım prototipi, mobil uygulama iskeleti ve ilk pilot saha görüşmeleri.",
      },
      {
        period: "2026 Q3",
        title: "İlk pilot kurulumlar",
        description:
          "5-10 binada kurulum ve üç aylık veri toplama. Gelen geri bildirim ürünün son halini belirleyecek.",
      },
      {
        period: "2026 Q4 / 2027 Q1",
        title: "Sertifika ve üretim",
        description:
          "CE sertifikasyonu, ilk 1.000 cihazın üretimi ve geniş lansman.",
      },
    ],
    team: [
      {
        name: "Kurucu",
        role: "Donanım, yazılım, ürün",
        bio: "Gömülü sistemler, IoT, bulut altyapısı ve ürün tarafından sorumlu.",
      },
      {
        name: "Akademik danışman",
        role: "Deprem mühendisliği",
        bio: "İnşaat mühendisliği doktoralı. Yapı sağlığı izleme (SHM) algoritmalarının bilimsel doğrulamasını yürütüyor.",
      },
      {
        name: "İnşaat mühendisleri",
        role: "Yapı sağlığı ve pilot saha",
        bio: "İki yüksek lisans inşaat mühendisi. Algoritmaların yapı tarafını ve pilot sahadaki doğrulamayı üstleniyorlar.",
      },
    ],
  },
  contact: {
    meta: {
      title: "SismoSmart İletişim",
      description:
        "Ürün soruları, pilot başvurusu, basın veya yatırımcı görüşmeleri için SismoSmart ekibine ulaşın. En hızlı kanal e-posta.",
    },
    eyebrow: "İletişim",
    title: "Yazın, döneriz.",
    description:
      "Bu aşamada en hızlı kanal e-posta. Konu başlığını net yazarsanız mesajınız doğru kişiye ulaşır.",
    channels: [
      {
        title: "Genel",
        description: "Ürün hakkında sorular, pilot başvurusu, satın alma ilgisi",
        value: "info@sismosmart.com",
        href: "mailto:info@sismosmart.com",
      },
      {
        title: "Basın",
        description: "Röportaj, basın kiti, kurum işbirliği",
        value: "press@sismosmart.com",
        href: "mailto:press@sismosmart.com",
      },
      {
        title: "LinkedIn",
        description: "Profesyonel takip ve şirket güncellemeleri",
        value: "linkedin.com/company/sismosmart",
        href: "https://www.linkedin.com/company/sismosmart",
      },
    ],
    form: {
      nameLabel: "Adınız",
      emailLabel: "E-posta",
      subjectLabel: "Konu",
      messageLabel: "Mesajınız",
      buttonLabel: "Gönder",
      consentLabel:
        "Mesajımı değerlendirebilmeniz için bu bilgilerin işlenmesini kabul ediyorum.",
      note: "Bilgileriniz sadece bu mesaja yanıt vermek için kullanılır.",
      loadingLabel: "Gönderiliyor...",
      successMessage: "Mesajınız gönderildi. En kısa sürede dönüş yaparız.",
      errorMessage: "Bir sorun oluştu. Lütfen tekrar deneyin.",
      missingEndpointMessage:
        "Form henüz bağlı değil. Lütfen info@sismosmart.com adresine yazın.",
      rateLimitedMessage:
        "Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.",
    },
  },
  privacy: {
    meta: {
      title: "Gizlilik",
      description:
        "Hangi veriyi topluyoruz, ne için kullanıyoruz, kimlerle paylaşıyoruz. Hepsi bu sayfada yazıyor.",
    },
    eyebrow: "Gizlilik",
    title: "Gizlilik politikası",
    description:
      "İhtiyacımız olmayan veriyi toplamıyoruz. Topladığımızı da yalnızca burada yazdığımız amaçlar için kullanıyoruz ve kimseye satmıyoruz.",
    sections: [
      {
        title: "Topladığımız veriler",
        description:
          "Web sitesinde: bültene kaydolduğunuzda e-posta adresiniz, iletişim formunu doldurduğunuzda verdiğiniz bilgiler ve çerez tercihleriniz. Cihazdan (lansmandan sonra): titreşim ölçümleri, sıcaklık, nem, basınç, cihazın çalışma durumu ve mahalle seviyesinde yaklaşık konum.",
      },
      {
        title: "Ne için kullanıyoruz",
        description:
          "Mesajlarınıza yanıt vermek, pilot başvurularını değerlendirmek ve lansman duyurularını göndermek için. Cihaz tarafında ise bağlantıyı sürdürmek, bir sarsıntı olayını yakındaki cihazlarla doğrulamak ve ürünü geliştirmek için.",
      },
      {
        title: "Kimlerle paylaşıyoruz",
        description:
          "Form gönderimleri bir form sağlayıcısından geçebilir. Cihaz verisi seçtiğimiz bulut altyapısında işlenir. Kişisel veriyi reklam veya satış amacıyla üçüncü taraflara aktarmıyoruz.",
      },
      {
        title: "Haklarınız",
        description:
          "Verilerinize erişme, düzeltme, silme ve taşıma haklarınız var. KVKK ve GDPR kapsamındaki talepleriniz için info@sismosmart.com adresine yazabilirsiniz.",
      },
    ],
  },
  terms: {
    meta: {
      title: "Kullanım koşulları",
      description:
        "Web sitesinin ve lansman öncesi paylaşılan bilgilerin kullanımına dair temel koşullar.",
    },
    eyebrow: "Koşullar",
    title: "Kullanım koşulları",
    description:
      "Site henüz lansman öncesi. Aşağıdaki maddeler bu aşama için geçerli.",
    sections: [
      {
        title: "Bilgi amaçlı",
        description:
          "Bu site SismoSmart ürünü hakkında bilgi verir ve pilot başvurusu kabul eder. Resmî bir sismolojik hizmet ya da deprem uyarı kanalı değildir.",
      },
      {
        title: "Garanti değildir",
        description:
          "Cihazı, lansmandan sonra deprem hazırlığını desteklemek için geliştiriyoruz. Resmî uyarı sistemlerinin, acil durum talimatlarının veya yapı mühendisi raporunun yerine geçmez.",
      },
      {
        title: "Fikri mülkiyet",
        description:
          "SismoSmart adı, logosu, ürün tasarımı ve site içeriği SismoSmart'a aittir. İzinsiz çoğaltılamaz.",
      },
      {
        title: "İletişim",
        description: "Sorularınız için info@sismosmart.com.",
      },
    ],
  },
  press: {
    meta: {
      title: "Basın kiti",
      description: "SismoSmart hakkında basın için bilgiler, görseller ve iletişim.",
    },
    eyebrow: "Basın",
    title: "Basın kiti",
    description:
      "Medya, partner kurumlar ve röportaj talepleri için tek sayfalık kaynak.",
    sections: [
      {
        title: "Kısa tanım",
        description:
          "SismoSmart, evlere ve küçük binalara takılan bir sismik izleme cihazı geliştiriyor. Cihaz binayı sürekli ölçer, deprem olduğunda telefona bildirim gönderir ve binanın deprem sırasında nasıl davrandığını kaydeder. Pilotlar 2026'da, lansman 2027'de.",
      },
      {
        title: "Basın iletişimi",
        description:
          "Röportaj, basın görseli ve demo talepleri için press@sismosmart.com.",
      },
    ],
    links: [
      {
        title: "Logo",
        description: "SVG vektör logo",
        href: "/logo-symbol.svg",
      },
      {
        title: "Ürün fotoğrafı",
        description: "Cihazın yüksek çözünürlüklü görseli",
        href: "/images/device/sismosmart-device-front.png",
      },
      {
        title: "Sosyal medya görseli",
        description: "1200x630 paylaşım kartı",
        href: "/images/og/sismosmart-og.png",
      },
    ],
  },
};
