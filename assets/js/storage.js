/**
 * ===================================================================
 * CyberTech - Local Storage Management & Seed Data Layer (with MySQL API Sync)
 * Mendukung Evaluasi HOTS Taksonomi Bloom C4-C6 (Non-Pilihan Ganda)
 * Mendukung mode Offline (localStorage) & mode Online/Server (MySQL API)
 * ===================================================================
 */

const STORAGE_KEYS = {
  USERS: 'cybertech_users',
  CURRENT_USER: 'cybertech_current_user',
  MODULES: 'cybertech_modules',
  PROGRESS: 'cybertech_student_progress',
  QUIZZES: 'cybertech_quizzes',
  RESULTS: 'cybertech_results'
};

const DEFAULT_USERS = [
  {
    id: 'user_guru_01',
    username: 'guru',
    email: 'guru@smkn1takalar.sch.id',
    nama: 'Guru Pembimbing TKJ',
    password: 'guru123cybertech',
    role: 'guru',
    nip: '198507152010011012',
    avatar: 'G',
    createdAt: '2026-10-26T08:00:00.000Z'
  },
  {
    id: 'user_siswa_01',
    username: 'siswa',
    email: 'siswa@smkn1takalar.sch.id',
    nama: 'Nasywan Siswa TKJ',
    password: 'siswa123cybertech',
    role: 'siswa',
    nisn: '0061234567',
    kelas: 'XI TJKT 1',
    sekolah: 'SMK Negeri 1 Takalar',
    avatar: 'N',
    createdAt: '2026-10-26T09:00:00.000Z'
  }
];

const DEFAULT_MODULES = [
  {
    id: '1',
    kode: 'MODUL-01',
    judul: 'Analisis & Klasifikasi Ancaman Jaringan',
    subjudul: 'Klasifikasi Kasus Virus, Worm, Phishing, & DDoS (C4)',
    deskripsi: 'Menganalisis mekanisme serangan siber dan mengklasifikasikan empat jenis ancaman jaringan secara tepat melalui aktivitas Drag & Drop beserta justifikasi teknis.',
    durasi: '20 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'shield-alert'
  },
  {
    id: '2',
    kode: 'MODUL-02',
    judul: 'Evaluasi & Rekomendasi Sistem Keamanan',
    subjudul: 'Matriks Efektivitas Antivirus, Firewall, VPN, & 2FA (C4-C5)',
    deskripsi: 'Menganalisis efektivitas komparatif empat sistem keamanan jaringan dalam mengatasi ancaman nyata dan merekomendasikan solusi paling tepat berbasis kriteria.',
    durasi: '20 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'lock'
  },
  {
    id: '3',
    kode: 'MODUL-03',
    judul: 'Perancangan Kebijakan Firewall & Analisis Log',
    subjudul: 'Simulasi Aturan Allow/Block & Justifikasi Lalu Lintas (C4-C6)',
    deskripsi: 'Merancang dan menerapkan aturan Allow atau Block pada simulasi firewall sesuai jenis lalu lintas serta menjelaskan alasan teknis paket diterima atau ditolak.',
    durasi: '20 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'flame'
  }
];

const DEFAULT_QUIZZES = [
  /* ===================================================================
     MODUL 1: Evaluasi Klasifikasi Drag & Drop + Analisis Alasan (C4)
     =================================================================== */
  {
    id: 'hots_m1_01',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Seorang siswa menancapkan flashdisk pribadi untuk menyalin installer editor video bajakan (setup_crack.exe). Setelah file dijalankan, seluruh file .docx dan .exe di komputer tersebut rusak, namun komputer lain di laboratorium yang tidak menjalankan file dari flashdisk tetap aman.',
    kunci: 'virus',
    hotsData: {
      category: 'virus',
      categoryLabel: 'Virus Komputer',
      expectedKeywords: ['inang', 'eksekusi', 'jalankan', 'klik', 'file', 'flashdisk', 'menempel', 'pengguna'],
      rubricHint: 'Jelaskan mengapa insiden ini memerlukan file inang dan eksekusi pengguna untuk menginfeksi.'
    },
    pembahasan: 'Insiden ini merupakan Virus Komputer karena program jahat menempel pada file executable inang (setup_crack.exe) dan baru aktif merusak berkas lokal ketika pengguna mengklik/menjalankannya.'
  },
  {
    id: 'hots_m1_02',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Dalam waktu 10 menit, 24 PC di Lab TJKT mendadak melambat drastis dan membanjiri switch dengan lalu lintas SMB Port 445, padahal seluruh siswa sedang istirahat dan tidak ada satu pun yang membuka email atau menjalankan file lampiran.',
    kunci: 'worm',
    hotsData: {
      category: 'worm',
      categoryLabel: 'Network Worm',
      expectedKeywords: ['mandiri', 'otomatis', 'tanpa', 'celah', 'port', 'jaringan', 'replikasi', 'smb'],
      rubricHint: 'Analisis mekanisme replikasi otomatis Worm lewat jaringan tanpa campur tangan pengguna.'
    },
    pembahasan: 'Insiden ini adalah Network Worm karena mampu menggandakan diri secara mandiri dan menyebar otomatis ke 24 PC melalui celah port jaringan (SMB 445) tanpa interaksi pengguna.'
  },
  {
    id: 'hots_m1_03',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Operator sekolah menerima email berlogo resmi Dinas Pendidikan dengan alamat pengirim admin@dinas-pendidikan-verif.xyz yang mendesak agar segera login ulang pada tautan terlampir agar akun Dapodik tidak diblokir dalam 2 jam.',
    kunci: 'phishing',
    hotsData: {
      category: 'phishing',
      categoryLabel: 'Phishing (Rekayasa Sosial)',
      expectedKeywords: ['palsu', 'tautan', 'penyamaran', 'kredensial', 'password', 'psikologis', 'rekayasa sosial', 'domain'],
      rubricHint: 'Uraikan teknik manipulasi psikologis dan pemalsuan identitas pada pesan tersebut.'
    },
    pembahasan: 'Ini adalah serangan Phishing (rekayasa sosial) yang menyamar sebagai instansi tepercaya dengan domain palsu dan urgensi semu untuk memancing korban memasukkan kredensial login ke situs tiruan.'
  },
  {
    id: 'hots_m1_04',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Tepat pukul 08.00 WITA saat ujian berlangsung, portal CBT sekolah gagal diakses (503 Service Unavailable). Log firewall mencatat 450.000 permintaan HTTP SYN per detik berasal dari ribuan IP asing yang tersebar di berbagai negara secara serentak.',
    kunci: 'ddos',
    hotsData: {
      category: 'ddos',
      categoryLabel: 'DDoS Attack',
      expectedKeywords: ['banjir', 'traffic', 'ribuan', 'botnet', 'serentak', 'lumpuh', 'availability', 'ketersediaan'],
      rubricHint: 'Analisis bagaimana banjir paket serentak melumpuhkan pilar ketersediaan (Availability) server.'
    },
    pembahasan: 'Ini merupakan DDoS (Distributed Denial of Service) menggunakan jaringan botnet global untuk membanjiri server target dengan ratusan ribu permintaan per detik hingga kapasitas layanan lumpuh.'
  },
  {
    id: 'hots_m1_05',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Staf TU mengunduh lampiran dokumen penawaran berjudul Rincian_Biaya.docm dan mengklik tombol "Enable Content/Macros". Seketika itu juga skrip VBA di dalam dokumen memodifikasi file sistem Windows dan menyisipkan kode perusak ke aplikasi lain di PC tersebut.',
    kunci: 'virus',
    hotsData: {
      category: 'virus',
      categoryLabel: 'Virus Komputer (Macro)',
      expectedKeywords: ['makro', 'dokumen', 'klik', 'eksekusi', 'inang', 'aktifkan', 'sistem', 'vba'],
      rubricHint: 'Jelaskan keterkaitan antara file dokumen inang dan aksi pengguna mengaktifkan makro.'
    },
    pembahasan: 'Kasus ini termasuk Virus (Macro Virus) karena kode berbahaya disisipkan di dalam dokumen inang (.docm) dan hanya tereksekusi setelah korban memberikan aksi mengaktifkan konten makro.'
  },
  {
    id: 'hots_m1_06',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Sebuah laptop tamu yang terhubung ke Wi-Fi sekolah langsung memindai seluruh subnet IP 192.168.10.0/24 guna mengeksploitasi celah layanan jaringan yang belum di-patch, menggandakan salinannya ke server file tanpa campur tangan admin.',
    kunci: 'worm',
    hotsData: {
      category: 'worm',
      categoryLabel: 'Network Worm',
      expectedKeywords: ['memindai', 'celah', 'otomatis', 'mandiri', 'jaringan', 'subnet', 'patch', 'ganda'],
      rubricHint: 'Analisis bagaimana penyerang menyebar secara otonom dengan memindai kerentanan jaringan.'
    },
    pembahasan: 'Ini adalah karakteristik utama Worm, yaitu melakukan pemindaian (scanning) jaringan otomatis dan mengeksploitasi celah sistem yang belum ditambal untuk mereplikasi diri lintas subnet.'
  },
  {
    id: 'hots_m1_07',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Seorang guru menerima pesan WhatsApp yang mengaku dari teknisi IT sekolah beserta tautan pemendek URL (bit.ly/reset-portal-guru) yang mendesak guru memasukkan NIP dan kata sandi e-Rapor agar akun tidak terhapus.',
    kunci: 'phishing',
    hotsData: {
      category: 'phishing',
      categoryLabel: 'Phishing (Smishing/Social Engineering)',
      expectedKeywords: ['penipuan', 'tautan', 'kredensial', 'password', 'sandi', 'nip', 'mendesak', 'manipulasi'],
      rubricHint: 'Jelaskan indikator penipuan identitas dan target pencurian data pada kasus pesan ini.'
    },
    pembahasan: 'Serangan ini tergolong Phishing karena memanfaatkan rekayasa sosial lewat pesan mendesak dan tautan tersamar untuk mencuri data kredensial sensitif (NIP dan kata sandi) milik guru.'
  },
  {
    id: 'hots_m1_08',
    moduleId: '1',
    questionType: 'hots_m1_dnd',
    pertanyaan: 'Koneksi internet seluruh sekolah putus total saat jam belajar. Setelah diperiksa pada router gateway, antarmuka WAN dibanjiri 99% paket UDP sampah berukuran besar ke port acak yang dikirim bersamaan dari ratusan kamera CCTV IoT yang telah dibajak.',
    kunci: 'ddos',
    hotsData: {
      category: 'ddos',
      categoryLabel: 'DDoS (UDP Flood Botnet)',
      expectedKeywords: ['banjir', 'bandwidth', 'udp', 'iot', 'botnet', 'massal', 'lumpuh', 'putus'],
      rubricHint: 'Uraikan peran perangkat IoT terkompromi dalam melumpuhkan kapasitas bandwidth jaringan.'
    },
    pembahasan: 'Ini adalah serangan DDoS (UDP Flood) yang memanfaatkan ratusan perangkat IoT yang telah disusupi (botnet) untuk menghabiskan seluruh kapasitas bandwidth WAN gateway sekolah.'
  },

  /* ===================================================================
     MODUL 2: Evaluasi Matriks Efektivitas & Rekomendasi Sistem (C4-C5)
     =================================================================== */
  {
    id: 'hots_m2_01',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Seorang administrator sekolah sedang berada di luar kota dan harus mengakses server nilai internal melalui jaringan Wi-Fi publik kafe yang tidak terenkripsi. Kriteria utama kasus ini adalah melindungi kerahasiaan data selama transmisi di jaringan publik dari ancaman penyadapan (Man-in-the-Middle).',
    kunci: 'vpn',
    hotsData: {
      matrix: {
        antivirus: 'kurang_efektif',
        firewall: 'kurang_efektif',
        vpn: 'sangat_efektif',
        auth: 'kurang_efektif'
      },
      recommended: 'vpn',
      expectedKeywords: ['enkripsi', 'tunnel', 'publik', 'penyadapan', 'mitm', 'vpn', 'terowongan', 'kerahasiaan'],
      rubricHint: 'Bandingkan efektivitas ke-4 sistem terhadap ancaman penyadapan Wi-Fi publik dan rekomendasikan solusi utamanya.'
    },
    pembahasan: 'VPN (Virtual Private Network) adalah rekomendasi paling tepat karena membentuk terowongan terenkripsi (encrypted tunnel) di atas Wi-Fi publik sehingga mencegah penyadapan MitM. Antivirus hanya melindungi endpoint lokal, sedangkan 2FA dan Firewall saja tidak mengenkripsi paket yang sedang melintas di Wi-Fi publik.'
  },
  {
    id: 'hots_m2_02',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Kredensial username dan kata sandi akun admin portal e-Rapor diketahui bocor akibat salah satu staf tertipu situs phishing. Kriteria keamanan utama adalah mencegah penyerang masuk ke akun walaupun kata sandi utama sudah berada di tangan peretas.',
    kunci: 'auth',
    hotsData: {
      matrix: {
        antivirus: 'tidak_relevan',
        firewall: 'kurang_efektif',
        vpn: 'tidak_relevan',
        auth: 'sangat_efektif'
      },
      recommended: 'auth',
      expectedKeywords: ['otp', 'lapis kedua', '2fa', 'mfa', 'verifikasi', 'password bocor', 'identitas', 'login'],
      rubricHint: 'Jelaskan mengapa Autentikasi 2FA menjadi garis pertahanan utama saat password sudah diketahui peretas.'
    },
    pembahasan: 'Autentikasi 2FA/MFA paling efektif karena mewajibkan faktor verifikasi kedua (seperti kode OTP ponsel) saat login; penyerang yang hanya memiliki password tetap tertolak. Antivirus dan VPN tidak menghentikan login sah memakai password curian.'
  },
  {
    id: 'hots_m2_03',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Server Web sekolah mengalami puluhan ribu percobaan koneksi asing dari internet ke port manajemen berisiko seperti Port 23 (Telnet) dan Port 3306 (Database). Kriteria utama adalah menyaring lalu lintas jaringan masuk dan menutup akses port yang tidak semestinya dibuka untuk publik.',
    kunci: 'firewall',
    hotsData: {
      matrix: {
        antivirus: 'tidak_relevan',
        firewall: 'sangat_efektif',
        vpn: 'tidak_relevan',
        auth: 'kurang_efektif'
      },
      recommended: 'firewall',
      expectedKeywords: ['port', 'filter', 'saring', 'blokir', 'lalu lintas', 'paket', 'firewall', 'drop'],
      rubricHint: 'Analisis efektivitas ke-4 sistem untuk menyaring trafik port jaringan dan jelaskan mengapa Firewall paling tepat.'
    },
    pembahasan: 'Firewall adalah kontrol paling tepat karena secara spesifik memeriksa header paket jaringan (IP, protokol, nomor port) dan memblokir akses asing ke Port 23 maupun 3306 di perimeter jaringan sebelum menyentuh server.'
  },
  {
    id: 'hots_m2_04',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Komputer di laboratorium sering mengalami kerusakan file dokumen akibat siswa bergantian menancapkan flashdisk pribadi untuk mencetak tugas. Kriteria utama kasus ini adalah mendeteksi, memblokir eksekusi, dan mengkarantina berkas malware lokal di perangkat komputer klien (endpoint).',
    kunci: 'antivirus',
    hotsData: {
      matrix: {
        antivirus: 'sangat_efektif',
        firewall: 'kurang_efektif',
        vpn: 'tidak_relevan',
        auth: 'tidak_relevan'
      },
      recommended: 'antivirus',
      expectedKeywords: ['pindai', 'scan', 'file', 'flashdisk', 'karantina', 'signature', 'endpoint', 'antivirus'],
      rubricHint: 'Evaluasi efektivitas tiap sistem menghadapi infeksi media fisik flashdisk dan rekomendasikan pelindung endpoint terbaik.'
    },
    pembahasan: 'Antivirus paling efektif untuk memindai media eksternal USB (flashdisk) secara real-time melalui deteksi signature dan heuristik lalu mengkarantina malware sebelum dijalankan. Firewall jaringan tidak memeriksa file yang dipindah lewat port USB fisik.'
  },
  {
    id: 'hots_m2_05',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Sekolah memiliki gedung kampus utama dan gedung unit produksi di kecamatan berbeda yang harus bertukar data transaksi keuangan setiap hari melintasi jaringan internet ISP umum. Kriteria utama adalah menciptakan jembatan koneksi privat antar-kantor (Site-to-Site) yang terenkripsi penuh.',
    kunci: 'vpn',
    hotsData: {
      matrix: {
        antivirus: 'kurang_efektif',
        firewall: 'kurang_efektif',
        vpn: 'sangat_efektif',
        auth: 'kurang_efektif'
      },
      recommended: 'vpn',
      expectedKeywords: ['site-to-site', 'enkripsi', 'terowongan', 'tunnel', 'antar', 'cabang', 'publik', 'vpn'],
      rubricHint: 'Jelaskan efektivitas VPN dalam menghubungkan dua lokasi jaringan terpisah secara aman melalui internet publik.'
    },
    pembahasan: 'VPN (khususnya Site-to-Site VPN dengan IPsec) paling efektif membentuk jalur komunikasi privat terenkripsi antar dua gedung melewati internet ISP publik agar data transaksi keuangan tidak terbaca pihak luar.'
  },
  {
    id: 'hots_m2_06',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Halaman login administrator router dan server portal siswa diserang menggunakan skrip otomatis Brute Force yang menebak ribuan kombinasi password. Kriteria utama adalah melindungi akses akun login meskipun kombinasi kata sandi berhasil ditebak oleh skrip.',
    kunci: 'auth',
    hotsData: {
      matrix: {
        antivirus: 'tidak_relevan',
        firewall: 'kurang_efektif',
        vpn: 'tidak_relevan',
        auth: 'sangat_efektif'
      },
      recommended: 'auth',
      expectedKeywords: ['2fa', 'otp', 'token', 'verifikasi', 'brute force', 'login', 'lapis kedua', 'mfa'],
      rubricHint: 'Analisis perbandingan kontrol pertahanan terhadap serangan pembobolan akun login otomatis.'
    },
    pembahasan: 'Autentikasi 2FA/MFA merupakan pertahanan krusial untuk mencegah pembobolan akun meski skrip Brute Force berhasil menebak password, karena skrip penyerang tidak memiliki kode OTP dinamis di perangkat admin.'
  },
  {
    id: 'hots_m2_07',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Siswa tidak sengaja mengunduh aplikasi gratis dari internet yang ternyata disisipi Trojan Backdoor di dalam sistem operasi Windows. Kriteria utama adalah mengenali perilaku mencurigakan file di dalam sistem operasi serta membersihkan proses jahat dari komputer klien.',
    kunci: 'antivirus',
    hotsData: {
      matrix: {
        antivirus: 'sangat_efektif',
        firewall: 'kurang_efektif',
        vpn: 'tidak_relevan',
        auth: 'tidak_relevan'
      },
      recommended: 'antivirus',
      expectedKeywords: ['trojan', 'heuristik', 'karantina', 'deteksi', 'komputer', 'endpoint', 'file', 'malware'],
      rubricHint: 'Jelaskan bagaimana analisis heuristik Antivirus bekerja dibandingkan sistem jaringan lain pada kasus infeksi file lokal.'
    },
    pembahasan: 'Antivirus modern (dengan signature-based dan heuristic analysis) sangat efektif mendeteksi anomali perilaku file Trojan di memori/disk klien dan langsung mengkarantina file berbahaya tersebut.'
  },
  {
    id: 'hots_m2_08',
    moduleId: '2',
    questionType: 'hots_m2_case',
    pertanyaan: 'Manajemen sekolah menetapkan kebijakan agar komputer siswa di jam praktikum tidak dapat mengakses port layanan ilegal serta diblokir dari segmen server administrasi guru. Kriteria utama adalah menerapkan segmentasi kebijakan lalu lintas antar-subnet dan penyaringan port keluar/masuk.',
    kunci: 'firewall',
    hotsData: {
      matrix: {
        antivirus: 'tidak_relevan',
        firewall: 'sangat_efektif',
        vpn: 'tidak_relevan',
        auth: 'tidak_relevan'
      },
      recommended: 'firewall',
      expectedKeywords: ['blokir', 'aturan', 'port', 'ip', 'penyaringan', 'subnet', 'traffic', 'firewall'],
      rubricHint: 'Uraikan mengapa kontrol berbasis aturan jaringan (Firewall) jauh lebih relevan dibanding sistem lainnya.'
    },
    pembahasan: 'Firewall adalah solusi paling tepat untuk menerapkan segmentasi lalu lintas antar-subnet dan menyaring/memblokir akses berdasarkan alamat IP dan port layanan sesuai kebijakan jaringan sekolah.'
  },

  /* ===================================================================
     MODUL 3: Evaluasi Konfigurasi Simulator Firewall & Penjelasan (C4-C6)
     =================================================================== */
  {
    id: 'hots_m3_01',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Portal E-Learning ujian siswa membutuhkan akses browser web terenkripsi SSL/TLS agar siswa di Lab Komputer (192.168.1.50) dapat mengirimkan lembar jawaban ujian ke Server Ujian (10.0.0.10:443) tanpa risiko penyadapan.',
    kunci: 'ALLOW',
    hotsData: {
      trafficKey: 'https',
      trafficLabel: 'HTTPS (Port 443 TCP)',
      protocol: 'TCP',
      port: '443',
      sourceIp: '192.168.1.50',
      destIp: '10.0.0.10',
      action: 'ALLOW',
      expectedKeywords: ['https', '443', 'enkripsi', 'ssl', 'tls', 'diterima', 'allow', 'ujian'],
      rubricHint: 'Terapkan aturan pada simulator dan jelaskan alasan teknis mengapa lalu lintas Port 443 ini harus diterima atau ditolak.'
    },
    pembahasan: 'Aturan ALLOW wajib diterapkan untuk TCP Port 443 (HTTPS) karena lalu lintas ujian menggunakan enkripsi SSL/TLS yang aman untuk menjaga kerahasiaan dan kelancaran pengiriman jawaban ujian siswa ke server.'
  },
  {
    id: 'hots_m3_02',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Terdeteksi upaya login remote terminal menggunakan protokol Telnet (TCP Port 23) dari jaringan eksternal (203.0.113.88) ke Server Utama Sekolah (10.0.0.10:23). Kebijakan keamanan sekolah melarang keras pengiriman kata sandi secara plain text tanpa enkripsi.',
    kunci: 'BLOCK',
    hotsData: {
      trafficKey: 'telnet',
      trafficLabel: 'Telnet (Port 23 TCP)',
      protocol: 'TCP',
      port: '23',
      sourceIp: '203.0.113.88',
      destIp: '10.0.0.10',
      action: 'BLOCK',
      expectedKeywords: ['telnet', '23', 'plain', 'tidak terenkripsi', 'ditolak', 'block', 'sniffing', 'ssh'],
      rubricHint: 'Jalankan aturan pada simulator lalu jelaskan risiko keamanan Telnet dan alasan paket ditolak/diterima.'
    },
    pembahasan: 'Aturan BLOCK wajib diterapkan pada Port 23 (Telnet) karena Telnet mengirimkan username dan password dalam format teks polos (plain text) yang mudah disadap (sniffing); remote manajemen harus diarahkan ke SSH Port 22.'
  },
  {
    id: 'hots_m3_03',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Firewall mendeteksi lonjakan 50.000 paket ICMP Echo Request per detik secara serentak dari jaringan botnet asing (198.51.100.77) menuju Gateway Server (10.0.0.1) yang membuat respons jaringan sekolah macet total.',
    kunci: 'BLOCK',
    hotsData: {
      trafficKey: 'ddos',
      trafficLabel: 'ICMP Ping Flood (DDoS)',
      protocol: 'ICMP',
      port: 'N/A',
      sourceIp: '198.51.100.77',
      destIp: '10.0.0.1',
      action: 'BLOCK',
      expectedKeywords: ['ddos', 'icmp', 'banjir', 'lumpuh', 'ditolak', 'block', 'drop', 'bandwidth'],
      rubricHint: 'Uji simulasi trafik banjir ICMP ini dan jelaskan alasan hasil penyaringan firewall.'
    },
    pembahasan: 'Aturan BLOCK (DROP) harus diterapkan terhadap banjir paket ICMP Flood tersebut agar paket sampah DDoS dijatuhkan di perimeter firewall dan tidak menghabiskan bandwidth maupun CPU server gateway sekolah.'
  },
  {
    id: 'hots_m3_04',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Seluruh PC klien laboratorium (192.168.1.25) tidak dapat menerjemahkan nama domain situs belajar (contoh: kemdikbud.go.id) karena kueri UDP Port 53 menuju DNS Resolver Internal (10.0.0.5:53) tertahan di firewall.',
    kunci: 'ALLOW',
    hotsData: {
      trafficKey: 'dns',
      trafficLabel: 'DNS Query (Port 53 UDP)',
      protocol: 'UDP',
      port: '53',
      sourceIp: '192.168.1.25',
      destIp: '10.0.0.5',
      action: 'ALLOW',
      expectedKeywords: ['dns', '53', 'domain', 'ip', 'diterima', 'allow', 'resolusi', 'akses'],
      rubricHint: 'Terapkan kebijakan firewall yang tepat dan uraikan alasan mengapa trafik Port 53 ini harus lolos atau dibuang.'
    },
    pembahasan: 'Aturan ALLOW harus diterapkan pada UDP Port 53 (DNS) menuju DNS Resolver internal agar komputer klien dapat menerjemahkan nama domain menjadi alamat IP sehingga akses situs belajar berfungsi normal.'
  },
  {
    id: 'hots_m3_05',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Sebuah IP publik tak dikenal dari internet (45.33.12.9) mencoba membuka koneksi transfer file menggunakan protokol FTP standar (TCP Port 21) tanpa enkripsi ke Server Keuangan Sekolah (10.0.0.20:21).',
    kunci: 'BLOCK',
    hotsData: {
      trafficKey: 'ftp',
      trafficLabel: 'FTP Plain (Port 21 TCP)',
      protocol: 'TCP',
      port: '21',
      sourceIp: '45.33.12.9',
      destIp: '10.0.0.20',
      action: 'BLOCK',
      expectedKeywords: ['ftp', '21', 'plain', 'enkripsi', 'ditolak', 'block', 'keuangan', 'sftp'],
      rubricHint: 'Jalankan simulasi firewall untuk lalu lintas FTP eksternal ini dan jelaskan alasan teknis keputusannya.'
    },
    pembahasan: 'Aturan BLOCK wajib diterapkan pada TCP Port 21 dari IP publik karena FTP mengirimkan kredensial dan berkas sensitif keuangan tanpa enkripsi; transfer berkas aman wajib memakai SFTP (Port 22) dari IP terotorisasi.'
  },
  {
    id: 'hots_m3_06',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Administrator jaringan resmi sekolah (IP terotorisasi: 192.168.10.2) perlu melakukan pemeliharaan darurat pada Server Linux (10.0.0.10:22) melalui saluran remote terenkripsi Secure Shell (SSH TCP Port 22).',
    kunci: 'ALLOW',
    hotsData: {
      trafficKey: 'ssh',
      trafficLabel: 'SSH Admin (Port 22 TCP)',
      protocol: 'TCP',
      port: '22',
      sourceIp: '192.168.10.2',
      destIp: '10.0.0.10',
      action: 'ALLOW',
      expectedKeywords: ['ssh', '22', 'enkripsi', 'admin', 'diterima', 'allow', 'aman', 'remote'],
      rubricHint: 'Konfigurasikan simulasi untuk permintaan SSH admin resmi ini dan jelaskan alasan hasil simulasi.'
    },
    pembahasan: 'Aturan ALLOW diterapkan untuk koneksi SSH (TCP Port 22) karena berasal dari IP administrator terpercaya dan komunikasi SSH dienkripsi penuh dari ujung ke ujung sehingga aman untuk administrasi server.'
  },
  {
    id: 'hots_m3_07',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Terdeteksi upaya koneksi langsung dari alamat IP internet publik (185.220.101.4) menuju layanan basis data MySQL (TCP Port 3306) di Server Database Nilai Siswa (10.0.0.50:3306).',
    kunci: 'BLOCK',
    hotsData: {
      trafficKey: 'mysql',
      trafficLabel: 'MySQL Public (Port 3306 TCP)',
      protocol: 'TCP',
      port: '3306',
      sourceIp: '185.220.101.4',
      destIp: '10.0.0.50',
      action: 'BLOCK',
      expectedKeywords: ['database', 'mysql', '3306', 'publik', 'ditolak', 'block', 'kebocoran', 'internal'],
      rubricHint: 'Uji simulasi akses database publik ini dan jelaskan alasan mengapa lalu lintas diterima atau ditolak.'
    },
    pembahasan: 'Aturan BLOCK wajib diterapkan karena port database (MySQL 3306) tidak boleh diekspos langsung ke internet publik; membuka port database ke publik berisiko besar menyebabkan pencurian data dan serangan Brute Force.'
  },
  {
    id: 'hots_m3_08',
    moduleId: '3',
    questionType: 'hots_m3_firewall',
    pertanyaan: 'Sistem pemantau jaringan mendeteksi lalu lintas eksploitasi protokol berbagi berkas SMB (TCP Port 445) mencoba menerobos masuk dari luar jaringan (203.0.113.99) menuju komputer Lab TJKT (192.168.1.0/24), pola yang identik dengan penyebaran Worm/Ransomware.',
    kunci: 'BLOCK',
    hotsData: {
      trafficKey: 'smb',
      trafficLabel: 'SMB External (Port 445 TCP)',
      protocol: 'TCP',
      port: '445',
      sourceIp: '203.0.113.99',
      destIp: '192.168.1.50',
      action: 'BLOCK',
      expectedKeywords: ['smb', '445', 'worm', 'ransomware', 'ditolak', 'block', 'eksploitasi', 'eksternal'],
      rubricHint: 'Terapkan aturan simulasi yang aman terhadap trafik SMB eksternal dan jelaskan alasan teknisnya.'
    },
    pembahasan: 'Aturan BLOCK wajib diterapkan terhadap Port 445 (SMB) dari jaringan eksternal karena port tersebut merupakan vektor serangan paling umum bagi Network Worm dan Ransomware untuk menyebar secara otomatis.'
  }
];

/**
 * Storage Class Controller (Hybrid: Local Cache + MySQL Sync)
 */
const Storage = {
  /**
   * Mendapatkan Base URL API backend MySQL jika web berjalan di server HTTP
   */
  getApiBaseUrl() {
    if (!window.location.protocol.startsWith('http')) return null;

    // Jika dibuka lewat Live Server (Port 5500, dsb), hubungkan ke server Apache Laragon
    if (window.location.port && window.location.port !== '80' && window.location.port !== '443') {
      return 'http://localhost/cybertech/api';
    }

    const path = window.location.pathname;
    const projectIdx = path.indexOf('/cybertech');
    if (projectIdx !== -1) {
      return '/cybertech/api';
    }
    return '/api';
  },

  /**
   * Inisialisasi storage awal & migrasi otomatis ke format HOTS C4-C6
   */
  initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }

    // Selalu sinkronkan metadata 3 modul dengan rumusan TP C4-C6 terbaru
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(DEFAULT_MODULES));

    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
    } else {
      try {
        let storedQuizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
        // Hapus soal Pilihan Ganda lama (q_m...) saat beralih ke Evaluasi HOTS C4-C6
        storedQuizzes = storedQuizzes.filter(q => q && q.id && !String(q.id).startsWith('q_m'));
        const storedMap = new Map(storedQuizzes.map(q => [q.id, q]));
        DEFAULT_QUIZZES.forEach(dq => {
          if (!storedMap.has(dq.id)) {
            storedMap.set(dq.id, dq);
          }
        });
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(Array.from(storedMap.values())));
      } catch (e) {
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
      }
    }

    if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({}));
    }

    // Lakukan background sync dengan MySQL jika API tersedia
    this.syncWithApi();
  },

  /**
   * Melakukan sinkronisasi data dari MySQL ke LocalStorage agar tampilan selalu terbarui
   */
  async syncWithApi() {
    const api = this.getApiBaseUrl();
    if (!api) return;

    try {
      // 1. Sync Bank Kasus HOTS dari MySQL (merging dengan DEFAULT_QUIZZES, filter legacy q_m...)
      const p1 = fetch(`${api}/quizzes.php`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            const currentQuizzes = (JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]'))
              .filter(q => q && q.id && !String(q.id).startsWith('q_m'));
            const map = new Map();
            DEFAULT_QUIZZES.forEach(q => map.set(q.id, q));
            currentQuizzes.forEach(q => map.set(q.id, q));
            res.data.forEach(q => {
              if (q && q.id && !String(q.id).startsWith('q_m')) {
                map.set(q.id, q);
              }
            });
            localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(Array.from(map.values())));
          }
        }).catch(() => {});

      // 2. Sync Rekap Hasil Evaluasi HOTS dari MySQL
      const p2 = fetch(`${api}/results.php`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data)) {
            const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || '[]');
            const map = new Map();
            current.forEach(r => map.set(r.id, r));
            res.data.forEach(r => map.set(r.id, r));
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(Array.from(map.values())));
          }
        }).catch(() => {});

      // 3. Sync Daftar Siswa & Progres dari MySQL
      const p3 = fetch(`${api}/students.php?action=list`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data)) {
            const users = this.getUsers();
            const teachers = users.filter(u => u.role === 'guru');
            const studentUsers = res.data.map(s => ({
              id: s.id,
              username: s.username,
              email: s.email,
              nama: s.nama,
              role: 'siswa',
              kelas: s.kelas,
              sekolah: s.sekolah,
              avatar: s.avatar,
              password: 'siswa123cybertech'
            }));
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...teachers, ...studentUsers]));

            // Sync progress
            const allProg = this.getAllProgress();
            res.data.forEach(s => {
              if (s.progress) allProg[s.id] = s.progress;
            });
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProg));
          }
        }).catch(() => {});

      await Promise.allSettled([p1, p2, p3]);
      window.dispatchEvent(new CustomEvent('cybertech:synced'));
    } catch (err) {
      console.warn('[CyberTech] Offline mode / MySQL API unreachable:', err);
    }
  },

  /* --- MANAJEMEN USERS --- */
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || JSON.stringify(DEFAULT_USERS));
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByUsernameOrEmail(identifier) {
    const users = this.getUsers();
    const query = String(identifier).trim().toLowerCase();
    return users.find(u => 
      (u.username && u.username.toLowerCase() === query) || 
      (u.email && u.email.toLowerCase() === query) ||
      (u.nama && u.nama.toLowerCase() === query)
    ) || null;
  },

  saveUser(user) {
    const users = this.getUsers();
    const existingIdx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
    if (existingIdx !== -1) {
      users[existingIdx] = { ...users[existingIdx], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Sinkronisasi ke MySQL API jika online
    const api = this.getApiBaseUrl();
    if (api && user.role === 'siswa') {
      fetch(`${api}/auth.php?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: user.nama,
          email: user.email,
          password: user.password || 'siswa123cybertech',
          confirmPassword: user.password || 'siswa123cybertech',
          kelas: user.kelas || 'XI TJKT 1'
        })
      }).catch(() => {});
    }

    return user;
  },

  updateUser(id, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === id) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[index]));
      }

      // Sinkronisasi ke MySQL API jika online
      const api = this.getApiBaseUrl();
      if (api) {
        fetch(`${api}/auth.php?action=profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            nama: users[index].nama,
            email: users[index].email,
            kelas: users[index].kelas || '',
            nip: users[index].nip || '',
            avatar: users[index].avatar || ''
          })
        }).catch(() => {});
      }

      return users[index];
    }
    return null;
  },

  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  /* --- MANAJEMEN MODUL & PROGRES SISWA --- */
  getModules() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MODULES) || JSON.stringify(DEFAULT_MODULES));
  },

  getModuleById(id) {
    const modules = this.getModules();
    return modules.find(m => String(m.id) === String(id)) || null;
  },

  getAllProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '{}');
  },

  getStudentProgress(studentId) {
    const all = this.getAllProgress();
    return all[studentId] || {
      '1': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 },
      '2': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 },
      '3': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 }
    };
  },

  updateStudentProgress(studentId, moduleId, stepUpdates) {
    const all = this.getAllProgress();
    if (!all[studentId]) {
      all[studentId] = this.getStudentProgress(studentId);
    }

    const currentModProgress = all[studentId][String(moduleId)] || {
      materialRead: false,
      videoWatched: false,
      activityDone: false,
      quizScore: null,
      completed: false,
      percentage: 0
    };

    const updated = { ...currentModProgress, ...stepUpdates };

    let percentage = 0;
    if (updated.materialRead) percentage += 20;
    if (updated.videoWatched) percentage += 20;
    if (updated.activityDone) percentage += 30;
    if (updated.quizScore !== null && updated.quizScore >= 75) {
      percentage += 30;
      updated.completed = true;
    }

    updated.percentage = Math.min(100, percentage);
    all[studentId][String(moduleId)] = updated;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));

    // Kirim update ke MySQL backend jika online
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/students.php?action=progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentId,
          moduleId: moduleId,
          materialRead: updated.materialRead ? 1 : 0,
          videoWatched: updated.videoWatched ? 1 : 0,
          activityDone: updated.activityDone ? 1 : 0,
          quizScore: updated.quizScore
        })
      }).catch(() => {});
    }

    return updated;
  },

  /* --- MANAJEMEN BANK KASUS HOTS (CRUD GURU) --- */
  getQuizzes(moduleId = null) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || JSON.stringify(DEFAULT_QUIZZES));
    if (moduleId !== null && moduleId !== undefined && moduleId !== 'all') {
      return all.filter(q => String(q.moduleId) === String(moduleId));
    }
    return all;
  },

  getQuizById(id) {
    const all = this.getQuizzes();
    return all.find(q => q.id === id) || null;
  },

  addQuiz(quizData) {
    const all = this.getQuizzes();
    const defaultType = String(quizData.moduleId) === '1'
      ? 'hots_m1_dnd'
      : (String(quizData.moduleId) === '2' ? 'hots_m2_case' : 'hots_m3_firewall');
    const newQuiz = {
      id: `hots_m${quizData.moduleId}_${Date.now()}`,
      questionType: quizData.questionType || defaultType,
      ...quizData
    };
    all.push(newQuiz);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(all));

    // Simpan ke MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/quizzes.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz)
      }).catch(() => {});
    }

    return newQuiz;
  },

  updateQuiz(id, quizData) {
    const all = this.getQuizzes();
    const index = all.findIndex(q => q.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...quizData };
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(all));

      // Update di MySQL API
      const api = this.getApiBaseUrl();
      if (api) {
        fetch(`${api}/quizzes.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...all[index] })
        }).catch(() => {});
      }

      return all[index];
    }
    return null;
  },

  deleteQuiz(id) {
    const all = this.getQuizzes();
    const filtered = all.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(filtered));

    // Hapus dari MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/quizzes.php?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(() => {});
    }

    return filtered.length !== all.length;
  },

  /* --- MANAJEMEN HASIL EVALUASI HOTS & PENILAIAN GURU --- */
  getAllResults() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || '[]');
  },

  getResultById(id) {
    const all = this.getAllResults();
    let found = all.find(r => r.id === id);
    if (!found && id) {
      const targetDigits = String(id).replace(/\D/g, '');
      if (targetDigits.length >= 6) {
        found = all.find(r => {
          const rDigits = String(r.id).replace(/\D/g, '');
          return Math.abs(parseInt(rDigits.slice(-6)) - parseInt(targetDigits.slice(-6))) < 60000;
        });
      }
    }
    return found || null;
  },

  getResultsByStudent(studentId) {
    const all = this.getAllResults();
    return all.filter(r => r.studentId === studentId);
  },

  getResultsByModule(moduleId) {
    const all = this.getAllResults();
    if (moduleId === 'all' || !moduleId) return all;
    return all.filter(r => String(r.moduleId) === String(moduleId));
  },

  saveQuizResult(resultData) {
    const all = this.getAllResults();
    const newResult = {
      id: `res_${Date.now()}`,
      timestamp: new Date().toISOString(),
      teacherFeedback: '',
      gradedByTeacher: false,
      ...resultData
    };
    all.unshift(newResult);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(all));

    // Update progres evaluasi siswa pada modul terkait di local
    this.updateStudentProgress(resultData.studentId, resultData.moduleId, {
      quizScore: resultData.score,
      completed: resultData.score >= 75
    });

    // Simpan ke MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/results.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      }).catch(() => {});
    }

    return newResult;
  },

  /**
   * Memperbarui nilai dan umpan balik guru untuk evaluasi HOTS siswa
   */
  updateResultGrade(resultId, newScore, teacherFeedback = '') {
    const all = this.getAllResults();
    const index = all.findIndex(r => r.id === resultId);
    if (index === -1) return null;

    const cleanScore = Math.max(0, Math.min(100, Math.round(Number(newScore) || 0)));
    all[index].score = cleanScore;
    all[index].teacherFeedback = String(teacherFeedback || '').trim();
    all[index].gradedByTeacher = true;
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(all));

    // Sinkronkan progres kelulusan modul siswa
    const target = all[index];
    this.updateStudentProgress(target.studentId, target.moduleId, {
      quizScore: cleanScore,
      completed: cleanScore >= (target.kkm || 75)
    });

    // Simpan ke MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/results.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: resultId,
          score: cleanScore,
          teacherFeedback: all[index].teacherFeedback
        })
      }).catch(() => {});
    }

    return all[index];
  }
};

// Inisialisasi storage & sinkronisasi MySQL saat skrip dimuat
Storage.initStorage();
window.Storage = Storage;
