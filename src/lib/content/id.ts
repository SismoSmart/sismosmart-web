import type { SiteCopy } from "@/lib/site";

export const idCopy: SiteCopy = {
  accessibility: { skipToContent: "Lewati ke konten" },
  meta: {
    title: "Pemantauan seismik untuk bangunan Anda",
    description:
      "SismoSmart adalah perangkat pemantauan seismik kecil yang dipasang di dinding. Ia mengukur gerakan bangunan Anda dan memberi notifikasi ke ponsel saat guncangannya serius. Rekamannya bisa dibaca insinyur setelah kejadian.",
  },
  navigation: {
    eyebrow: "Pemantauan seismik untuk bangunan",
    primaryCta: "Daftar pilot",
    links: [
      { label: "Teknologi", href: "/technology" },
      { label: "Produk", href: "/product" },
      { label: "Pilot", href: "/pilot-program" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  hero: {
    badge: "Startup hardware tahap awal",
    title: "Bagaimana bangunan Anda bergoyang saat gempa? Kami membuat perangkat yang mengukurnya.",
    description:
      "SismoSmart dicolokkan ke stopkontak dan ditempel di dinding. Ia mengukur gerakan bangunan Anda terus-menerus dan memberi notifikasi ke ponsel saat guncangannya serius. Tugas utamanya justru rekaman yang ia simpan: saat insinyur datang, ia bisa membaca bagaimana bangunan berperilaku saat itu.",
    primaryCta: "Daftar pilot",
    secondaryCta: "Ringkasan investor",
    tertiaryCta: "Lihat teknologi",
    primaryHref: "/pilot-program",
    secondaryHref: "/investors",
    tertiaryHref: "/technology",
    stats: [
      { label: "Pemasangan", value: "Tetap di dinding" },
      { label: "Deteksi", value: "Di perangkat" },
      { label: "Sampling", value: "250 Hz, 3 sumbu" },
      { label: "Cadangan daya", value: "30-60 dtk superkapasitor" },
    ],
    deviceEyebrow: "Perangkat SismoSmart",
    deviceTitle: "100 × 100 mm. Ditempel di dinding, ditenagai dari stopkontak.",
    deviceDescription:
      "Anda menempelkannya ke dinding lalu mencolokkannya. Pasangkan lewat aplikasi dan berikan Wi-Fi Anda. Setelah itu semuanya berjalan di belakang layar: ia mulai mengukur getaran bangunan dan pada hari biasa Anda tidak akan menyadarinya.",
    deviceSpecs: ["Sensor gerak tiga sumbu", "Rekaman lokal saat kejadian", "Data Wi-Fi terenkripsi"],
    meterTopLabel: "Deteksi",
    meterTopValue: "Di perangkat",
    meterBottomLabel: "Data",
    meterBottomValue: "Terenkripsi",
    imageAlt: "Perangkat pemantauan seismik SismoSmart dengan LED status",
  },
  trust: {
    eyebrow: "Posisi kami",
    title: "Ada hal-hal yang tidak bisa dilakukan perangkat ini.",
    description:
      "SismoSmart masih dalam fase pilot. Yang ia lakukan adalah merekam apa yang terjadi di dalam bangunan Anda dan mengubahnya menjadi data yang bisa Anda tinjau nanti. Kami tidak bersaing dengan sistem peringatan resmi atau dengan inspeksi struktur setelah gempa. Keduanya tetap pada tempatnya. Kami mengisi celah di antaranya.",
    items: [
      { label: "Tahap", value: "Pilot" },
      { label: "Tugas utama", value: "Merekam gerakan" },
      { label: "Keputusan struktural", value: "Tetap di insinyur" },
    ],
  },
  howItWorks: {
    eyebrow: "Cara kerja",
    title: "Pemasangan hanya beberapa menit, sisanya berjalan di belakang layar.",
    description:
      "Begitu terpasang, Anda tidak perlu melakukan apa pun lagi. Beberapa hari pertama ia mempelajari profil getaran normal bangunan Anda, dan setelah itu ia bisa mengenali yang tidak normal.",
    steps: [
      { title: "Pasang di dinding", description: "Pilih dinding dalam ruangan yang stabil. Perekatnya sudah terpasang, dan ada lubang sekrup kalau Anda ingin memasangnya lebih kokoh." },
      { title: "Pasangkan dari aplikasi", description: "Aplikasi menemukan perangkat lewat Bluetooth. Anda memasukkan sandi Wi-Fi satu kali saja, selesai." },
      { title: "Ia mempelajari bangunan", description: "Selama beberapa hari perangkat mendengarkan getaran normal. Ia belajar apa yang terjadi saat truk lewat dan saat angin kencang. Ia baru bisa mengenali yang tidak normal setelah tahu yang normal." },
      { title: "Memberi tahu saat guncangan mulai", description: "Saat mendeteksi getaran serius, notifikasi masuk ke ponsel Anda. Jika perangkat di dekatnya melihat guncangan yang sama, notifikasi datang dengan tanda terkonfirmasi." },
      { title: "Merekam kejadiannya", description: "Data mentah saat dan sesudah guncangan disimpan di perangkat sekaligus dikirim ke cloud. Dari rekaman itu insinyur bisa membaca bagaimana bangunan merespons." },
      { title: "Lebih banyak perangkat, lebih baik", description: "Dengan beberapa perangkat di satu gedung, terlihat bagaimana tiap lantai bergerak relatif satu sama lain. Dengan beberapa perangkat di satu lingkungan, peluang alarm palsu menurun." },
    ],
  },
  features: {
    eyebrow: "Apa fungsinya",
    title: "Sebenarnya ia mengerjakan beberapa tugas berbeda sekaligus.",
    description:
      "Memberi notifikasi saat gempa hanyalah salah satunya. Bagian yang berharga justru sebelum dan sesudahnya: ia memantau kesehatan bangunan selama berbulan-bulan dan merekam apa yang terjadi saat tanah bergerak.",
    items: [
      { accent: "01", title: "Mendeteksi guncangan", description: "Sensor MEMS yang peka membaca getaran tanah 250 kali per detik. Cukup peka untuk membedakan truk yang lewat dari guncangan sungguhan." },
      { accent: "02", title: "Memberi notifikasi ke ponsel", description: "Saat mendeteksi guncangan, notifikasi push langsung dikirim. Isinya jelas: merunduk, berlindung, bertahan." },
      { accent: "03", title: "Memantau kesehatan bangunan", description: "Setiap bangunan punya frekuensi alami. Perangkat memantaunya bersama rasio redaman selama berbulan-bulan. Pergeseran yang tak terduga di situ bisa jadi tanda awal masalah struktur." },
      { accent: "04", title: "Membuat laporan setelah gempa", description: "Percepatan puncak, durasi, dan respons bangunan Anda berakhir dalam satu laporan. Insinyur sudah punya titik awal sebelum tiba di lokasi." },
      { accent: "05", title: "Membaca suhu dan kelembapan", description: "Perilaku bangunan tidak sama antara musim hujan dan musim kemarau. Tanpa data lingkungan, pergeseran musiman itu tidak bisa dipisahkan dari kerusakan nyata." },
      { accent: "06", title: "Lebih kuat bersama", description: "Setiap perangkat di lingkungan Anda menyumbang ke sinyal bersama. Semakin banyak perangkat, konfirmasi makin cepat dan alarm palsu makin jarang." },
    ],
  },
  demo: {
    eyebrow: "Alur data",
    title: "Pengukuran dimulai di perangkat dan berakhir di ponsel Anda.",
    description:
      "Perangkat mengukur, mengenkripsi, lalu mengirim. Aplikasi mengubahnya jadi sesuatu yang bisa dibaca: apakah perangkat hidup, apa kejadian terakhir, dan ke mana arah tren bangunan Anda.",
    previewLabel: "Rekaman bangunan",
    networkLabel: "Jaringan lingkungan",
    sensorLabel: "Perangkat",
    sensorValue: "Aktif",
    eventLabel: "Kejadian terakhir",
    eventValue: "Terekam, bisa ditinjau",
    bullets: [
      "Sensor MEMS yang menempel di dinding punya noise floor 22 µg. Ponsel Anda ada di kisaran 2.000 µg. Selisihnya sekitar seratus kali lipat.",
      "Anda bisa melihat data getaran bangunan tanpa menyerahkan informasi pribadi.",
      "Perangkat tidak mengambil keputusan menggantikan insinyur. Ia memberi insinyur data yang lebih baik.",
    ],
    cta: "Lihat teknologi",
    ctaHref: "/technology",
  },
  proof: {
    eyebrow: "Jalur pilot",
    title: "Kami ingin mencobanya dulu di segelintir bangunan nyata.",
    description:
      "Sebelum produk ini dibesarkan, kami ingin melihatnya di lapangan. Masukan dari pilot pertama akan menentukan bentuk akhir perangkatnya. Untuk sekarang kami berbicara dengan tiga kelompok.",
    cards: [
      { title: "Apartemen", description: "Satu perangkat di beberapa unit dan satu lagi di area bersama. Kami sepakati dengan pengelola gedung dan pasang gratis selama enam bulan.", highlight: "Pilot gratis" },
      { title: "Kampus dan pabrik", description: "Fasilitas dengan lebih dari satu gedung. Satu perangkat per gedung, semuanya terlihat dari satu dashboard.", highlight: "Korporat" },
      { title: "Kemitraan universitas", description: "Kami berbagi data dengan departemen teknik gempa. Peneliti mendapat akses anonim dan kami mendapat masukan akademik.", highlight: "Kolaborasi akademik" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang sering diajukan",
    description: "Kalau pertanyaan Anda ada di sini, jawabannya juga ada. Kalau tidak, tulis ke info@sismosmart.com dan kami jawab. Daftar lengkapnya ada di halaman FAQ.",
    items: [
      { title: "Apakah perangkat ini memperingatkan sebelum gempa?", description: "Kita bicara soal hitungan detik, bukan menit. Kalau gempa datang dari jauh, perangkat bisa menangkap gelombang P yang bergerak cepat dan mengirim notifikasi sebelum gelombang S yang merusak tiba. Kalau pusat gempanya dekat, jeda itu nyaris hilang. Kami tidak memasarkannya sebagai sistem peringatan dini, karena tidak berlaku untuk semua gempa." },
      { title: "Apa bedanya dengan peringatan gempa Google?", description: "Google memakai akselerometer di ponsel. Gratis, sudah ada di semua orang, dan bekerja dengan baik. Tapi yang ia ukur adalah sumber gempanya, bukan bangunan Anda. Kami melakukan sebaliknya: bagaimana bangunan Anda bergetar, bagaimana ia berubah menurut musim, dan dalam kondisi apa ia setelah gempa. Ponsel tidak bisa menjawab itu." },
      { title: "Bisakah satu perangkat menyatakan bangunan saya aman?", description: "Tidak bisa. Yang berhak menyatakan sebuah bangunan aman atau tidak aman adalah insinyur, bukan perangkat. Yang dilakukan perangkat adalah meninggalkan data konkret untuk insinyur itu." },
      { title: "Apakah pemasangannya sulit?", description: "Anda colokkan kabel USB-C ke stopkontak, tempelkan perangkat ke dinding dengan perekat di belakangnya, lalu pasangkan lewat aplikasi. Tanpa bor dan tanpa teknisi. Lima menit selesai." },
      { title: "Bagaimana jika listrik atau internet padam?", description: "Kalau internet putus, perangkat tetap mengukur, menyimpan kejadian di memorinya sendiri, dan mengirimkannya saat koneksi kembali. Kalau listrik padam, superkapasitor di dalamnya memberi daya 30 sampai 60 detik, cukup untuk mengirim kejadian terakhir ke cloud. Kalau padamnya lebih lama, perangkat mati." },
      { title: "Kapan mulai dijual?", description: "Pilot dimulai pada pertengahan 2026 dan kami menargetkan penjualan luas pada akhir 2026. Sertifikasi dan produksi bisa menggeser tanggal itu. Daftar buletin dan Anda yang pertama tahu tanggal pastinya." },
    ],
  },
  newsletter: {
    eyebrow: "Hubungi kami",
    title: "Mari bicara sebelum peluncuran.",
    description:
      "Kalau Anda pengelola gedung yang ingin ikut pilot, investor, atau perwakilan organisasi mitra, ceritakan singkat apa yang Anda cari. Kami arahkan ke orang yang tepat.",
    inputLabel: "Email",
    placeholder: "anda@perusahaan.com",
    button: "Kirim",
    consent: "Saya setuju menerima email tentang peluncuran, pilot, dan kabar investor SismoSmart.",
    note: "Kami memakai email Anda hanya untuk tujuan ini.",
    loading: "Mengirim...",
    success: "Pesan Anda sudah sampai. Kami segera menghubungi Anda.",
    error: "Ada masalah. Coba lagi.",
    missingEndpoint: "Form belum terhubung. Anda bisa email langsung ke info@sismosmart.com.",
    rateLimited:
      "Terlalu banyak percobaan. Silakan coba lagi beberapa menit lagi.",
  },
  footer: {
    legal: "© 2026 SismoSmart. Semua hak dilindungi.",
  },
};
