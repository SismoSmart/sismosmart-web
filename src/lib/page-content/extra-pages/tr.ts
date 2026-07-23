import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const trExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Teknoloji",
    metaTitle: "Teknoloji: SismoSmart nasıl ölçer",
    metaDescription:
      "Cihazın içinde ne var, sarsıntıyı sıradan titreşimden nasıl ayırır, ölçüm nasıl okunabilir bir rapora döner. Mühendislere ve meraklılara açık dille.",
    title: "Cihazın içinde ne var, veri size nasıl ulaşıyor?",
    description:
      "SismoSmart'ın tek bir işi var: binanın nasıl hareket ettiğini kaydetmek. Sarsıntı sırasında gelen hızlı bildirim de, sarsıntı bittikten sonra çıkan rapor da bu kayıttan doğuyor. Bu sayfa, o kaydın nasıl alındığını anlatıyor.",
    sections: [
      ["MEMS ivmeölçer", "İçinde ADXL355 sınıfı bir MEMS sensör var. Bir telefonun ivmeölçerinden yaklaşık 100 kat daha hassas. Üç eksende saniyede 250 örnek alıyor ve yaklaşık 22 mikro-g'lik bir gürültü tabanına iniyor. Profesyonel bir sismik istasyonun yanında mütevazı kalır, ama tüketici elektroniği için laboratuvar sınıfı sayılır."],
      ["STA/LTA algılama", "Cihaz son yarım saniyenin ortalamasını son otuz saniyenin ortalamasıyla karşılaştırıyor. Bu oran aniden büyüdüğünde ortada bir olay var demektir. Yöntemin adı STA/LTA ve sismolojide standarttır. Pilot kalibrasyonunda sıradan bina gürültüsünü sarsıntıdan ayırmayı hedefliyoruz; saha doğrulaması tamamlanana kadar yanlış veya kaçırılmış algılama mümkündür."],
      ["Yerel olay tamponu", "Eşik aşıldığında cihaz 40 saniyelik bir pencereyi belleğine yazıyor: olaydan önceki dört saniye ve sonraki otuz altı saniye. İnternet o sırada yoksa kaydı tutar, bağlantı gelince gönderir. Telefondaki bir uygulama bunu yapamaz."],
      ["Bulut doğrulama", "Tek bir cihazın tetiklenmesi başlı başına güçlü bir kanıt değil. Aynı bölgedeki üç veya daha fazla cihaz 60 saniye içinde tetiklenirse olay doğrulanmış olarak işaretleniyor. Yanlış alarm oranı burada belirgin şekilde düşüyor. Ayrıca AFAD ve USGS gibi kamu kaynaklarıyla çapraz kontrol yapılıyor."],
      ["Yapı sağlığı takibi", "Her binanın bir doğal frekansı vardır, yani kendiliğinden salınmaya yatkın olduğu bir nokta. Yapısal hasar bu sayıyı aşağı çeker. Cihaz frekansı haftalık ölçüyor, mevsim örüntüsünü öğreniyor ve beklenmedik bir düşüş olduğunda işaretliyor. Yöntemin teknik adı modal analiz."],
      ["Mühendis tarafındaki rapor", "Bir olaydan sonra zirve yer ivmesi (PGA), zirve yer hızı (PGV), Modified Mercalli şiddet tahmini ve binanızın doğal frekansındaki kayma yüzdesi raporda yer alır. Bunlar deprem mühendisliğinin standart metrikleri, biz yeni bir ölçek uydurmuyoruz."],
      ["Bağlantı", "V1 sürümü 2.4 GHz Wi-Fi ile çalışıyor. Kurumsal sürüm (V2) LTE-M hücresel bağlantı ve LoRa mesh destekleyecek. Böylece bina yöneticileri cihazı ofis Wi-Fi'sine bağlamak zorunda kalmayacak."],
      ["Güç", "Standart USB-C, 5V/2A. İçindeki 1 farad süperkapasitör elektrik kesintisinde 30-60 saniye köprü güç sağlıyor, bu da son olayı buluta göndermeye yetiyor. Değiştirilecek pil ya da düzenli bakım gerekmiyor."],
      ["Sertifika", "V1 çıkmadan önce CE RED (Avrupa radyo direktifi), BTK frekans onayı, RoHS ve WEEE uyumluluğu tamamlanacak. KVKK kapsamında tüm veri akışları belgelenecek. ABD pazarı için gereken FCC onayı daha sonraki bir adım."],
    ],
  },
  pilotProgram: {
    eyebrow: "Pilot program",
    metaTitle: "Pilot programı başvurusu",
    metaDescription:
      "Apartman, kampüs, fabrika veya araştırma binası için altı aylık ücretsiz pilot. Cihazı ve desteği biz veriyoruz, karşılığında dürüst geri bildirim istiyoruz.",
    title: "Cihazı önce sizin binanızda görmek istiyoruz.",
    description:
      "Ürün henüz geniş satışta değil. Bu aşamada istediğimiz şey az sayıda ciddi saha ve dürüst geri bildirim. Aşağıdaki dört gruptan birine giriyorsanız sayfanın altındaki form giriş noktanız.",
    sections: [
      ["Apartmanlar", "Bir dairede bir cihazla başlıyoruz. Yönetim de katılırsa farklı katlara cihaz ekliyoruz. Kurulum desteği ücretsiz, yönetimle koordinasyonda da yardımcı oluyoruz."],
      ["Kampüsler ve fabrikalar", "Birden fazla bina, tek bir merkezi panel. Her bina kendi kaydını tutuyor. Kurulumdan önce bilgi işlem ekibinizle birlikte ağ topolojisini ve güvenlik gereksinimlerini gözden geçiriyoruz."],
      ["Belediye pilotları", "Mahalle ölçekli kurulum. Aynı depremin hangi bölgede daha şiddetli hissedildiğini gösteriyor. Kişisel veri bu akışın tamamen dışında kalıyor, yalnızca bina veya konum bazlı toplu veri paylaşılıyor."],
      ["Araştırma partnerleri", "Üniversitelerin deprem mühendisliği bölümleri. Ham veriyi akademik analize açıyoruz, karşılığında geri bildirim ve ortak yayın imkânı doğuyor. Gizlilik ve veri paylaşım anlaşması imzalamamız gerekiyor."],
      ["Size sunduğumuz", "Üç ila on cihazı ücretsiz veriyoruz ve pilot bitince geri istemiyoruz. Altı ay boyunca hiçbir ücret yok. Kendi verinize doğrudan erişiyorsunuz. Kurulumu video ve telefonla uzaktan destekliyoruz. Pilot süresince ürüne gelecek değişiklikleri önceden görüyorsunuz."],
      ["Sizden beklediğimiz", "Kurulumu bina yönetimi veya çalışanlarla koordine etmeniz gerekiyor. Ayda yaklaşık on beş dakikalık bir geri bildirim görüşmesi yapıyoruz. Bir olay yaşanırsa kısa bir not düşmenizi rica ediyoruz. Pilot bitiminde kısa bir vaka çalışması yayımlamak istiyoruz; isterseniz kurum adını yazmadan, anonim olarak."],
      ["Başvurudan kuruluma", "Formu dolduruyorsunuz. Pilot komitesi beş iş günü içinde değerlendiriyor. Kısa bir görüntülü görüşmede binayı ve uygunluğu konuşuyoruz. Wi-Fi ve erişim koşulları netleşiyor, dört sayfalık basit bir pilot anlaşması imzalanıyor. Cihazlar kargoya veriliyor. İlk hafta yakından takip ediyoruz, sonraki aylarda düzenli görüşmelerle devam ediyoruz."],
    ],
  },
  investors: {
    eyebrow: "Yatırımcılar",
    metaTitle: "Yatırımcılar: SismoSmart tohum turu bilgi notu",
    metaDescription:
      "Problem, pazar, ekip, ürün yol haritası ve tohum turu detayları. Görüşmeye hazırlık için kısa bir özet.",
    title: "Deprem sonrası hiç kimsenin ölçmediği bir aralık var.",
    description:
      "Türkiye'de büyük bir depremden sonra mühendis incelemesi haftalar sürüyor. O haftalarda aileler tahmin yürütüyor, işletmeler duruyor, sigorta süreçleri tıkanıyor. SismoSmart bu aralığı binanın kendi verisiyle kapatmaya çalışan bir donanım girişimi.",
    sections: [
      ["Problem", "2023 Kahramanmaraş depremlerinden sonra 11 ilde bina değerlendirmesi aylar sürdü. Sigorta süreçleri yığıldı, geçici barınma maliyetleri katlandı, insanlar evine ne zaman dönebileceğini bilemedi. Mevcut sistemin tamamı mühendis ziyaretine dayanıyor ve büyük olaylarda tam da bu adım tıkanıyor."],
      ["Neden şimdi", "Laboratuvar kalitesindeki MEMS ivmeölçerler on yıl öncesinin beşte biri fiyatına indi. Wi-Fi ve BLE'yi birlikte taşıyan çift radyolu mikrodenetleyiciler (ESP32-S3) tüketici fiyatına ulaştı. Türkiye'de afet teknolojilerine kamu ve yatırımcı ilgisi 2023'ten beri hiç bu kadar yüksek olmamıştı. Üç yıl önce bu üç şartın hiçbiri yerinde değildi."],
      ["Pazar", "Türkiye'de yaklaşık 20 milyon hane var ve ülkenin yüzde 70'i deprem bölgesinde. İlk hedefimiz İstanbul, İzmir ve Ankara'da deprem bilinci yüksek ev sahipleri. İkinci dalgada apartman yönetimleri, sigorta şirketleri ve belediyeler var. Üçüncü dalga yurt dışı: Şili, Endonezya, Japonya ve Meksika gibi yüksek riskli pazarlar."],
      ["Ürün", "V1, Wi-Fi bağlantılı 79 dolarlık tüketici cihazı. V1.5'te microSD ve jiroskop ekleniyor. V2 ise hücresel bağlantı ve LoRa destekli kurumsal sürüm. Gelir iki kalemden geliyor: cihaz satışı ve aylık 5 dolarlık abonelik. Ölçek büyüdüğünde hedeflediğimiz LTV/CAC oranı 13 katı civarında."],
      ["Ekip", "Deprem mühendisliği doktoralı bir akademik danışman, yapı sağlığı izleme algoritmaları ve pilot saha tarafında iki yüksek lisans inşaat mühendisi, gömülü yazılım ile bulut tarafını yürüten bir kurucu. Hepimiz Türkiye'deyiz. Akademik ortaklık görüşmeleri sürüyor."],
      ["Rekabet", "Yerli oyuncular (EDIS, Multitek) B2B fiyatlandırmada kalıyor ve mobil deneyimleri zayıf. Google'ın ücretsiz Android deprem uyarısı bildirim alanını dolduruyor ama bina sağlığını hiç ölçmüyor. Grillo tüketiciyle başlayıp kamu tarafına yöneldi; buradan çıkardığımız ders şu: tüketici donanımı tek başına ayakta kalmıyor. Biz de birinci günden itibaren cihazı bir abonelikle birlikte kurguluyoruz."],
      ["Yol haritası", "2026 Q2: STA/LTA, MQTT ve mobil demo ile çalışan prototip. 2026 Q3: 5-10 pilot kurulum ve ilk gerçek saha verisi. 2026 Q4: tohum turunun kapanışı ve şirketin anonim şirkete dönüşmesi. 2027 Q1: CE sertifikası ve ilk 1.000 cihazın üretimi. 2027 Q2: lansman ve V1.5 kart revizyonu."],
      ["Tohum turu", "250 bin dolar eşdeğeri arıyoruz, bu bize 18 aylık nakit ömrü veriyor. Dağılım: yüzde 36 üretim, yüzde 32 ekip, yüzde 12 pazarlama, yüzde 8 sertifikasyon, yüzde 6 bulut, yüzde 6 hukuk ve yedek. Paralelde TÜBİTAK BiGG başvurusu (1,35 milyon TL), KOSGEB programları ve AWS Activate, Google for Startups, Microsoft for Startups bulut kredileri var."],
      ["Aradığımız", "Donanım girişimi görmüş melek yatırımcılar ve tohum aşaması fonları. Türkiye'de regülasyon, üretim ve sigorta ağına erişimi olan ortaklar bizim için hızlı paradan daha değerli. Ayrıntılı teknik dokümanı ve mali modeli gizlilik anlaşması altında paylaşıyoruz."],
    ],
  },
  faq: {
    eyebrow: "SSS",
    metaTitle: "Sık sorulan sorular",
    metaDescription:
      "Deprem uyarısı, bina güvenliği, veri, gizlilik, kurulum ve lansman takvimi hakkında doğrudan cevaplar.",
    title: "Sık sorulan sorular",
    description:
      "Deprem ürünleri kolayca fazla iddia eder. Biz cihazın sınırlarını görünür tutmaya çalışıyoruz. Cevabını burada bulamadığınız bir soru varsa info@sismosmart.com adresine yazın.",
    sections: [
      ["Bu cihaz beni depremden önce uyarır mı?", "Birkaç saniyeden söz ediyoruz, dakikalardan değil. Deprem uzaktan geliyorsa cihaz hızlı ilerleyen P dalgasını yakalayıp yıkıcı S dalgası gelmeden önce bildirim gönderebilir. Merkez üssü yakınsa bu süre neredeyse sıfıra iner. Cihazı bir erken uyarı sistemi olarak tanıtmıyoruz, çünkü her depremde işe yaramaz."],
      ["Tek cihaz binamın güvenli olduğunu söyleyebilir mi?", "Söyleyemez. Bir binaya güvenli ya da güvensiz diyecek olan mühendistir, cihaz değil. Cihazın yaptığı şey, mühendise elle tutulur bir veri bırakmak."],
      ["Hangi verileri topluyorsunuz?", "Titreşim ölçümleri, sıcaklık, nem, basınç ve cihazın kendi çalışma durumu. Kişisel bilgilerinizi cihazla ilişkilendirmiyoruz ve verinizi kimseye satmıyoruz. Ayrıntılar Gizlilik sayfasında."],
      ["Kesin konumum ortaya çıkıyor mu?", "Cihazınızın yaklaşık konumunu mahalle seviyesinde biliyoruz, çünkü bir olayı yakındaki cihazlarla eşleştirmek için bu gerekli. Daha hassas konum yalnızca açık bir pilot anlaşmasıyla paylaşılır."],
      ["Araştırmacılar verime erişebilir mi?", "Yalnızca veri anonimleştirildiğinde ve sizinle ayrıca anlaştığımızda. Şu anda böyle bir akış yok, yol haritasında duruyor."],
      ["Google'ın deprem uyarısından farkı ne?", "Google telefonların ivmeölçerini kullanıyor. Ücretsiz, herkeste var ve iyi de çalışıyor. Ama ölçtüğü şey depremin kaynağı, sizin binanız değil. Biz tam tersini yapıyoruz: binanız nasıl titreşiyor, mevsimle nasıl değişiyor, depremden sonra hangi durumda. Bu soruların cevabı telefondan çıkmaz."],
      ["İnternet kesilince çalışmaya devam eder mi?", "Cihaz ölçmeye devam eder ve olayı kendi belleğine kaydeder. Bildirim gönderemez, çünkü bunun için bağlantı gerekli. İnternet geri geldiğinde bekleyen kayıtları gönderir."],
      ["Elektrik kesilince?", "Cihazın içinde küçük bir süperkapasitör var. Yaklaşık 30-60 saniye köprü güç sağlıyor, bu da son olayı buluta göndermeye yetiyor. Kesinti uzarsa cihaz kapanır."],
      ["Kurulumu zor mu?", "USB-C kabloyu prize takıyorsunuz, cihazı arkasındaki bantla duvara yapıştırıyorsunuz, uygulamadan eşliyorsunuz. Matkap ya da teknisyen gerekmiyor, beş dakikada bitiyor."],
      ["Bir binada kaç tane olmalı?", "Tek cihaz da iş görür. Ama farklı katlara iki veya üç cihaz konursa katların birbirine göre nasıl hareket ettiği görülebilir ve yapı sağlığı takibi için bu çok daha değerlidir. Apartman pilotlarında hedefimiz bina başına en az üç cihaz."],
      ["PGA, PGV, MMI ne demek?", "PGA, depremde yerin ulaştığı maksimum ivme (m/s²). PGV, yerin ulaştığı maksimum hız (cm/s). MMI ise Modified Mercalli şiddet ölçeği; sarsıntının nasıl hissedildiğini I ile XII arasında anlatır. Cihaz olaydan sonra üçünü de raporda gösterir."],
      ["Doğal frekans ne anlatır?", "Her binanın salınmaya yatkın olduğu bir frekans vardır. Beş katlı bir betonarme için tipik değer 2-4 Hz civarındadır. Yapısal hasar bu frekansı düşürür. Düzenli takip ettiğimiz için hasarın erken aşamasında bir işaret yakalayabiliyoruz."],
      ["Cihaz hangi yöne bakmalı?", "Arka yüzünde bir yukarı oku var, o ok tavana baksın. Cihazın X ve Y eksenlerini binanın yatay yönleriyle hizalamaya çalışın. 90 derece yanlış takılırsa veri yine kullanılabilir ama bilgi değeri bir miktar düşer."],
      ["Cihaz konuşma kaydı yapıyor mu?", "Hayır. İçinde mikrofon yok, yalnızca zemin titreşimini ölçen bir ivmeölçer var. Konuşma ya da çevre sesi kaydetmek tamamen farklı bir sensör gerektirir."],
      ["Verim Türkiye dışına gidiyor mu?", "Pilot veri yerleşimi henüz kesinleşmedi. Cihaz verisi toplanmadan önce her pilot sözleşmesinde işleme konumları, aktarımlar, saklama süresi ve hukuki dayanak açıkça belirtilecek."],
      ["Ne zaman satışa çıkıyor?", "Pilotlar 2026 yazında başlıyor. Geniş satışı 2026 sonu ya da 2027 başı olarak hedefliyoruz. Sertifikasyon ve üretim takvimi bu tarihi öteleyebilir. Bültene kaydolursanız kesin tarihi ilk siz duyarsınız."],
    ],
  },
  security: {
    eyebrow: "Güvenlik",
    metaTitle: "Güvenlik",
    metaDescription:
      "Web sitesi güvenliği, çerez onayı, cihaz verisi, şifreli aktarım ve pilot aşamasındaki gizlilik yaklaşımımız.",
    title: "Gerekmeyen veriyi hiç toplamamak en iyi koruma.",
    description:
      "Temel kuralımız bu. Şu anda yayında olan tek şey web sitesi, ama cihaz tarafında da aynı kuralla ilerliyoruz.",
    sections: [
      ["Varsayılan olarak az veri", "Cihaz yalnızca gerekli olanı gönderiyor: hareket, çevre bilgisi, çalışma durumu ve olayın zamanı. Bunların dışında bir şey toplamıyoruz."],
      ["Analitikten önce onay", "Web analitiği yalnızca siz onay verdikten sonra yükleniyor. Bu tercihi alt bilgideki bağlantıdan istediğiniz zaman sıfırlayabilirsiniz."],
      ["Şifreli aktarım", "Site HTTPS ve güvenlik başlıklarıyla çalışıyor. Cihaz trafiğini de uçtan uca şifreli olacak şekilde tasarlıyoruz."],
      ["Tarayıcıya gizli anahtar gitmez", "Özel anahtarlar ve servis jetonları tarayıcıya inen kodda yer almaz. Sunucu ayarlarında veya GitHub Secrets içinde tutulur."],
      ["Güvenlik açığı bildirimi", "Sitede ya da lansman öncesi materyallerde bir güvenlik sorunu bulursanız info@sismosmart.com adresine yazın. Sorumlu açıklama yapan araştırmacılara teşekkür ederiz."],
      ["Cihaz güvenlik planı", "Cihaz çıkmadan önce şunları taahhüt ediyoruz: imzalı ürün yazılımı, şifreli flash bellek, otomatik geri alma destekli iki OTA bölümü ve fabrikada her cihaza özel anahtar. Cihaz piyasaya çıktığında güvenlik belgelerinin tamamını yayımlayacağız."],
    ],
  },
});
