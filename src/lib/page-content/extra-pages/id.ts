import { makeExtraPages } from "@/lib/page-content/extra-pages/shared";

export const idExtraPages = makeExtraPages({
  technology: {
    eyebrow: "Teknologi",
    metaTitle: "Teknologi: bagaimana SismoSmart mengukur",
    metaDescription:
      "Apa isi perangkat, bagaimana ia membedakan guncangan asli dari derau, dan bagaimana pengukuran berubah menjadi laporan yang bisa dibaca.",
    title: "Apa yang ada di dalam perangkat, dan bagaimana datanya sampai ke Anda",
    description:
      "SismoSmart punya satu tugas: merekam bagaimana sebuah bangunan bergerak. Notifikasi cepat saat guncangan maupun laporan yang menyusul sesudahnya sama-sama lahir dari rekaman itu. Halaman ini menjelaskan bagaimana rekaman itu diambil.",
    sections: [
      ["Akselerometer MEMS", "Di dalamnya ada sensor MEMS kelas ADXL355, sekitar 100 kali lebih peka daripada akselerometer di ponsel. Ia mengambil sampel tiga sumbu 250 kali per detik dan mencapai noise floor sekitar 22 mikro-g. Sederhana di sebelah stasiun seismik profesional, tapi kelas laboratorium untuk perangkat konsumen."],
      ["Deteksi STA/LTA", "Perangkat membandingkan rata-rata setengah detik terakhir dengan rata-rata tiga puluh detik terakhir. Ketika rasio itu melonjak, berarti ada kejadian. Metodenya bernama STA/LTA dan itu standar dalam seismologi. Kalibrasi pilot ditujukan untuk membedakan kebisingan bangunan biasa dari guncangan, tetapi hasil positif palsu atau kejadian yang terlewat masih mungkin sampai validasi lapangan selesai."],
      ["Buffer kejadian lokal", "Begitu ambang terlewati, perangkat menulis jendela 40 detik ke memorinya: empat detik sebelum kejadian dan tiga puluh enam detik sesudahnya. Kalau saat itu internet mati, ia menyimpan rekamannya dan mengirim ketika koneksi kembali. Aplikasi di ponsel tidak bisa melakukan ini."],
      ["Konfirmasi cloud", "Satu perangkat yang terpicu bukan bukti kuat dengan sendirinya. Ketika tiga perangkat atau lebih di area yang sama terpicu dalam 60 detik, kejadian ditandai sebagai terkonfirmasi. Di titik inilah angka alarm palsu benar-benar turun. Sumber publik seperti AFAD dan USGS memberi pemeriksaan silang tambahan."],
      ["Pemantauan kesehatan struktur", "Setiap bangunan punya frekuensi alami, yaitu laju ia cenderung bergoyang dengan sendirinya. Kerusakan struktur menarik angka itu turun. Perangkat mengukurnya tiap minggu, mempelajari pola musimnya, lalu menandai penurunan yang tidak wajar. Nama teknis metode ini adalah analisis modal."],
      ["Laporan untuk insinyur", "Setelah kejadian, laporan memuat percepatan tanah puncak (PGA), kecepatan tanah puncak (PGV), estimasi intensitas Modified Mercalli, dan persentase pergeseran frekuensi alami bangunan Anda. Semuanya metrik standar teknik gempa. Kami tidak mengarang skala baru."],
      ["Konektivitas", "V1 berjalan di Wi-Fi 2.4 GHz. Versi korporat (V2) akan menambah koneksi seluler LTE-M dan LoRa mesh, supaya pengelola gedung tidak harus memasukkan perangkat ke Wi-Fi kantor."],
      ["Daya", "USB-C standar, 5V/2A. Superkapasitor 1 farad di dalamnya memberi 30 sampai 60 detik daya jembatan saat listrik padam, cukup untuk mengirim kejadian terakhir ke cloud. Tidak ada baterai yang harus diganti dan tidak ada jadwal perawatan."],
      ["Sertifikasi", "Sebelum V1 dikirim: CE RED (direktif radio Eropa), persetujuan frekuensi BTK Turki, kepatuhan RoHS dan WEEE. Semua aliran data didokumentasikan di bawah KVKK. Persetujuan FCC untuk pasar AS adalah langkah berikutnya."],
    ],
  },
  pilotProgram: {
    eyebrow: "Program pilot",
    metaTitle: "Pendaftaran program pilot",
    metaDescription:
      "Pilot enam bulan gratis untuk apartemen, kampus, pabrik, atau bangunan riset. Kami menyediakan perangkat dan dukungan, dan meminta masukan jujur sebagai gantinya.",
    title: "Kami ingin melihat perangkat ini dulu di bangunan Anda.",
    description:
      "Produk belum dijual luas. Yang kami cari pada tahap ini adalah sedikit lokasi yang serius dan orang yang mau bilang apa yang tidak jalan. Kalau Anda masuk salah satu dari empat kelompok di bawah, formulir di bagian bawah adalah pintu masuknya.",
    sections: [
      ["Apartemen", "Kami mulai dengan satu perangkat di satu unit. Kalau pengelola gedung ikut, kami menambah perangkat di lantai lain. Dukungan instalasi gratis, dan kami membantu berkoordinasi dengan pengelola."],
      ["Kampus dan pabrik", "Beberapa bangunan, satu dashboard terpusat. Setiap bangunan menyimpan rekamannya sendiri. Sebelum memasang, kami membahas topologi jaringan dan syarat keamanan bersama tim IT Anda."],
      ["Pilot kota", "Penyebaran skala lingkungan yang memperlihatkan di wilayah mana gempa yang sama terasa lebih kuat. Data pribadi sepenuhnya berada di luar alur ini. Hanya data agregat per bangunan atau per lokasi yang dibagikan."],
      ["Mitra riset", "Departemen teknik gempa di universitas. Kami membuka data mentah untuk analisis akademik, dan sebagai gantinya kami mendapat masukan serta peluang publikasi bersama. Perlu perjanjian kerahasiaan dan berbagi data."],
      ["Yang kami tawarkan", "Tiga sampai sepuluh perangkat gratis, dan kami tidak memintanya kembali saat pilot selesai. Enam bulan tanpa biaya. Akses langsung ke data Anda sendiri. Bantuan instalasi jarak jauh lewat video dan telepon. Melihat lebih dulu perubahan produk selama pilot berjalan."],
      ["Yang kami minta sebagai gantinya", "Anda mengoordinasikan instalasi dengan pengelola gedung atau staf. Kami mengadakan panggilan masukan sekitar lima belas menit sebulan. Kalau ada kejadian, kami minta catatan singkat. Di akhir kami ingin menerbitkan studi kasus pendek, dan kami senang hati tidak mencantumkan nama Anda."],
      ["Dari pendaftaran ke instalasi", "Anda mengisi formulir. Komite pilot meninjaunya dalam lima hari kerja. Panggilan video singkat membahas bangunan dan kesesuaiannya. Wi-Fi dan akses diselesaikan, lalu perjanjian sederhana empat halaman ditandatangani. Perangkat dikirim. Kami mengawal dekat di minggu pertama dan tetap berhubungan rutin sesudahnya."],
    ],
  },
  investors: {
    eyebrow: "Investor",
    metaTitle: "Investor: ringkasan putaran awal",
    metaDescription:
      "Masalah, pasar, tim, peta jalan produk, dan detail putaran pendanaan awal. Ringkasan singkat untuk persiapan percakapan.",
    title: "Ada satu jendela setelah gempa yang tidak diukur siapa pun.",
    description:
      "Setelah gempa besar di Turki, inspeksi struktur memakan waktu berminggu-minggu. Dalam minggu-minggu itu keluarga menebak-nebak, bisnis berhenti, dan asuransi mampat. SismoSmart adalah startup hardware yang mencoba menutup jendela itu dengan data bangunan itu sendiri.",
    sections: [
      ["Masalah", "Setelah gempa Kahramanmaraş 2023, penilaian bangunan di sebelas provinsi memakan waktu berbulan-bulan. Asuransi tersendat, biaya hunian sementara membengkak, dan warga tidak tahu kapan bisa pulang. Seluruh sistem bertumpu pada kunjungan insinyur, dan justru langkah itulah yang macet ketika kejadiannya besar."],
      ["Mengapa sekarang", "Akselerometer MEMS kelas laboratorium kini berharga seperlima dibanding sepuluh tahun lalu. Mikrokontroler radio ganda yang membawa Wi-Fi sekaligus BLE (ESP32-S3) sudah sampai di harga konsumen. Minat publik dan investor pada teknologi kebencanaan di Turki belum pernah setinggi ini sejak 2023. Tiga tahun lalu tak satu pun dari ketiga syarat itu terpenuhi."],
      ["Pasar", "Turki punya sekitar dua puluh juta rumah tangga dan sekitar 70% wilayahnya berada di zona risiko seismik. Target pertama kami adalah pemilik rumah yang sadar risiko gempa di Istanbul, Izmir, dan Ankara. Gelombang kedua adalah pengelola gedung, perusahaan asuransi, dan pemerintah kota. Gelombang ketiga di luar negeri: Chile, Indonesia, Jepang, dan Meksiko."],
      ["Produk", "V1 adalah perangkat konsumen seharga 79 dolar dengan Wi-Fi. V1.5 menambahkan microSD dan giroskop. V2 adalah versi korporat dengan koneksi seluler dan LoRa. Pendapatan datang dari dua jalur: penjualan perangkat dan langganan 5 dolar per bulan. Pada skala tertentu kami menargetkan rasio LTV/CAC sekitar tiga belas kali."],
      ["Tim", "Seorang penasihat akademik bergelar doktor teknik gempa, dua insinyur sipil bergelar master yang menggarap algoritma pemantauan kesehatan struktur dan kerja lapangan pilot, serta seorang pendiri yang menangani perangkat lunak tertanam dan cloud. Kami semua berada di Turki. Pembicaraan kemitraan akademik sedang berjalan."],
      ["Kompetisi", "Pemain domestik (EDIS, Multitek) bertahan di harga B2B dan pengalaman mobile mereka lemah. Peringatan gempa Android gratis dari Google mengisi ruang notifikasi, tapi sama sekali tidak menyentuh kesehatan bangunan. Grillo mulai dari konsumen lalu bergeser ke sektor publik, dan pelajarannya jelas bagi kami: perangkat konsumen saja tidak bertahan. Karena itu kami memasangkan perangkat dengan langganan sejak hari pertama."],
      ["Peta jalan", "Q2 2026: prototipe kerja dengan STA/LTA, MQTT, dan demo mobile. Q3 2026: lima sampai sepuluh instalasi pilot dan data lapangan nyata pertama. Q4 2026: penutupan putaran awal dan pendirian perusahaan. Q1 2027: sertifikasi CE dan produksi pertama 1.000 unit. Q2 2027: peluncuran dan revisi papan V1.5."],
      ["Putaran awal", "Kami mencari dana setara 250 ribu dolar, yang memberi kami umur kas delapan belas bulan. Alokasinya: 36% produksi, 32% tim, 12% pemasaran, 8% sertifikasi, 6% cloud, 6% legal dan cadangan. Secara paralel ada pengajuan TÜBİTAK BiGG (1,35 juta TL), program KOSGEB, serta kredit cloud dari AWS Activate, Google for Startups, dan Microsoft for Startups."],
      ["Yang kami cari", "Investor angel dan dana tahap awal yang pernah melihat startup hardware. Mitra dengan akses ke regulasi, manufaktur, dan jaringan asuransi di Turki lebih berharga bagi kami daripada uang cepat. Dokumen teknis rinci dan model keuangan kami bagikan di bawah perjanjian kerahasiaan."],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    metaTitle: "Pertanyaan yang sering diajukan",
    metaDescription:
      "Jawaban langsung tentang peringatan gempa, keamanan bangunan, data, privasi, instalasi, dan waktu peluncuran.",
    title: "Pertanyaan yang sering diajukan",
    description:
      "Produk gempa gampang sekali dijanjikan berlebihan. Kami berusaha menjaga batas perangkat ini tetap terlihat. Kalau pertanyaan Anda belum terjawab di sini, tulis ke info@sismosmart.com.",
    sections: [
      ["Apakah perangkat ini memperingatkan saya sebelum gempa?", "Kita bicara soal hitungan detik, bukan menit. Kalau gempa datang dari jauh, perangkat bisa menangkap gelombang P yang bergerak cepat dan mengirim notifikasi sebelum gelombang S yang merusak tiba. Kalau pusat gempanya dekat, jeda itu nyaris hilang. Kami tidak memasarkannya sebagai sistem peringatan dini, karena tidak berlaku untuk semua gempa."],
      ["Bisakah satu perangkat menyatakan bangunan saya aman?", "Tidak bisa. Yang berhak menyatakan sebuah bangunan aman atau tidak aman adalah insinyur, bukan perangkat. Yang dilakukan perangkat adalah meninggalkan data konkret untuk insinyur itu."],
      ["Data apa yang Anda kumpulkan?", "Pembacaan getaran, suhu, kelembapan, tekanan, dan status kerja perangkat itu sendiri. Kami tidak menautkan informasi pribadi ke perangkat dan tidak menjual data Anda kepada siapa pun. Rinciannya ada di halaman Privasi."],
      ["Apakah lokasi persis saya terbuka?", "Kami tahu lokasi perangkat Anda pada tingkat lingkungan, karena itu diperlukan untuk mencocokkan kejadian dengan perangkat di sekitarnya. Apa pun yang lebih rinci hanya dibagikan dengan perjanjian pilot yang eksplisit."],
      ["Bisakah peneliti mengakses data saya?", "Hanya setelah data dianonimkan dan hanya dengan perjanjian terpisah dengan Anda. Alur itu belum ada; masih ada di peta jalan."],
      ["Apa bedanya dari peringatan gempa Google?", "Google memakai akselerometer di ponsel. Gratis, sudah ada di semua orang, dan bekerja dengan baik. Tapi yang ia ukur adalah sumber gempanya, bukan bangunan Anda. Kami melakukan sebaliknya: bagaimana bangunan Anda bergetar, bagaimana ia berubah menurut musim, dan dalam kondisi apa ia setelah gempa. Ponsel tidak bisa menjawab itu."],
      ["Apa yang terjadi saat internet putus?", "Perangkat tetap mengukur dan menyimpan kejadian di memorinya sendiri. Ia tidak bisa mengirim notifikasi, karena itu butuh koneksi. Saat internet kembali, ia mengunggah apa pun yang menunggu."],
      ["Bagaimana saat listrik padam?", "Ada superkapasitor kecil di dalamnya. Ia memberi sekitar 30 sampai 60 detik daya jembatan, cukup untuk mengirim kejadian terakhir ke cloud. Kalau padamnya lebih lama, perangkat mati."],
      ["Seberapa sulit instalasinya?", "Anda colokkan kabel USB-C ke stopkontak, tempelkan perangkat ke dinding dengan perekat di belakangnya, lalu pasangkan lewat aplikasi. Tanpa bor dan tanpa teknisi. Lima menit selesai."],
      ["Berapa banyak yang sebaiknya dipasang dalam satu bangunan?", "Satu sudah bekerja. Tapi dengan dua atau tiga di lantai berbeda, terlihat bagaimana lantai-lantai bergerak relatif satu sama lain, dan itu jauh lebih berharga untuk pemantauan kesehatan struktur. Di pilot apartemen kami menargetkan minimal tiga per bangunan."],
      ["Apa arti PGA, PGV, dan MMI?", "PGA adalah percepatan maksimum yang dicapai tanah saat gempa, dalam m/s². PGV adalah kecepatan maksimumnya, dalam cm/s. MMI adalah skala intensitas Modified Mercalli, yang menggambarkan bagaimana guncangan terasa dari I sampai XII. Perangkat melaporkan ketiganya setelah kejadian."],
      ["Apa yang dikatakan frekuensi alami?", "Setiap bangunan punya frekuensi yang membuatnya cenderung bergoyang. Untuk bangunan beton bertulang lima lantai, angka tipikalnya sekitar 2 sampai 4 Hz. Kerusakan struktur menyeret frekuensi itu turun. Karena kami memantaunya secara rutin, kami bisa menangkap sinyal saat kerusakannya masih dini."],
      ["Ke arah mana perangkat harus menghadap?", "Ada panah ke atas di bagian belakang; arahkan ke langit-langit. Usahakan sumbu X dan Y perangkat sejajar dengan arah horizontal bangunan. Kalau terpasang meleset 90 derajat, datanya masih terpakai, hanya nilainya sedikit berkurang."],
      ["Apakah perangkat merekam suara?", "Tidak. Tidak ada mikrofon di dalamnya, hanya akselerometer yang mengukur getaran tanah. Merekam percakapan atau suara sekitar butuh sensor yang sama sekali berbeda."],
      ["Apakah data saya meninggalkan Turki?", "Lokasi data pilot belum final. Sebelum data perangkat dikumpulkan, setiap perjanjian pilot akan menjelaskan lokasi pemrosesan, transfer, masa simpan, dan dasar hukum yang berlaku."],
      ["Kapan mulai dijual?", "Pilot dimulai pada pertengahan 2026. Kami menargetkan penjualan luas pada akhir 2026 atau awal 2027. Sertifikasi dan manufaktur bisa menggeser tanggal itu. Daftar buletin dan Anda yang pertama tahu tanggal pastinya."],
    ],
  },
  security: {
    eyebrow: "Keamanan",
    metaTitle: "Keamanan",
    metaDescription:
      "Bagaimana kami menangani keamanan situs, persetujuan, data perangkat, pengiriman terenkripsi, dan privasi selama fase pilot.",
    title: "Data yang tidak pernah dikumpulkan adalah data yang tidak bisa bocor.",
    description:
      "Itu aturan dasar kami. Saat ini yang sudah berjalan hanyalah situs web, tapi sisi perangkat kami bangun dengan aturan yang sama.",
    sections: [
      ["Data minimal secara default", "Perangkat hanya mengirim yang diperlukan: gerakan, informasi lingkungan, status kerja, dan waktu kejadian. Di luar itu kami tidak mengumpulkan apa pun."],
      ["Persetujuan sebelum analitik", "Analitik web hanya dimuat setelah Anda memberi persetujuan. Anda bisa membatalkan pilihan itu kapan saja lewat tautan di bagian bawah halaman."],
      ["Pengiriman terenkripsi", "Situs berjalan di HTTPS dengan header keamanan. Lalu lintas perangkat dirancang terenkripsi dari ujung ke ujung."],
      ["Tidak ada rahasia yang sampai ke browser", "Kunci privat dan token layanan tidak pernah muncul di kode yang dikirim ke browser. Semuanya tetap di pengaturan server atau di GitHub Secrets."],
      ["Pelaporan kerentanan", "Kalau Anda menemukan masalah keamanan di situs atau di materi pra-peluncuran, tulis ke info@sismosmart.com. Kami berterima kasih kepada peneliti yang mengungkapkannya secara bertanggung jawab."],
      ["Rencana keamanan perangkat", "Sebelum perangkat dikirim, kami berkomitmen pada firmware bertanda tangan, flash terenkripsi, dua partisi OTA dengan rollback otomatis, dan kunci unik per perangkat yang ditanam di pabrik. Dokumentasi keamanan lengkap terbit bersama perangkatnya."],
    ],
  },
});
