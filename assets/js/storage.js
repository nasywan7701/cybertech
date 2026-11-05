/**
 * ===================================================================
 * CyberTech - Local Storage Management & Seed Data Layer (with MySQL API Sync)
 * Menangani persistensi data akun, modul, bank soal, dan hasil kuis
 * Mendukung mode Offline (localStorage) & mode Online/Server (MySQL API via Laragon/XAMPP)
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
    judul: 'Identifikasi Ancaman Jaringan',
    subjudul: 'Virus, Worm, Phishing, dan DDoS',
    deskripsi: 'Memahami pengertian keamanan jaringan, mengklasifikasikan 4 jenis ancaman siber, dan metode pencegahan preventif.',
    durasi: '45 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'shield-alert'
  },
  {
    id: '2',
    kode: 'MODUL-02',
    judul: 'Analisis Sistem Keamanan Jaringan',
    subjudul: 'Antivirus, Firewall, VPN, dan Autentikasi',
    deskripsi: 'Menganalisis efektivitas 4 komponen sistem pertahanan jaringan berlapis dalam mengatasi berbagai insiden keamanan.',
    durasi: '60 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'lock'
  },
  {
    id: '3',
    kode: 'MODUL-03',
    judul: 'Firewall & Penyaringan Paket Data',
    subjudul: 'Konfigurasi Aturan Allow dan Block',
    deskripsi: 'Menerapkan penyaringan paket lalu lintas data berdasarkan port/protokol serta menganalisis hasil simulasi firewall.',
    durasi: '60 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'flame'
  }
];

const DEFAULT_QUIZZES = [
  /* --- KUIS MODUL 1: Ancaman Jaringan --- */
  {
    id: 'q_m1_01',
    moduleId: '1',
    pertanyaan: 'Jenis malware yang dapat menggandakan dirinya secara mandiri dan menyebar ke komputer lain melalui celah jaringan tanpa memerlukan tindakan dari pengguna disebut...',
    opsi: {
      A: 'Virus',
      B: 'Worm',
      C: 'Trojan Horse',
      D: 'Spyware'
    },
    kunci: 'B',
    pembahasan: 'Worm adalah program berbahaya mandiri yang mampu mereplikasi dirinya dan menyebar otomatis melalui celah port/protokol jaringan tanpa perlu menempel pada program induk atau campur tangan pengguna.'
  },
  {
    id: 'q_m1_02',
    moduleId: '1',
    pertanyaan: 'Seorang staf sekolah menerima pesan email yang menyerupai tampilan resmi bank dan meminta login ulang pada tautan palsu untuk memperbarui password. Serangan ini merupakan bentuk...',
    opsi: {
      A: 'Phishing',
      B: 'DDoS Attack',
      C: 'SQL Injection',
      D: 'Man-in-the-Middle'
    },
    kunci: 'A',
    pembahasan: 'Phishing adalah bentuk rekayasa sosial (social engineering) di mana pelaku menyamar sebagai entitas tepercaya melalui pesan/email palsu guna mengelabui korban agar memberikan data kredensial rahasia.'
  },
  {
    id: 'q_m1_03',
    moduleId: '1',
    pertanyaan: 'Serangan siber yang dilakukan dengan cara membanjiri server target menggunakan ribuan atau jutaan permintaan palsu secara serentak dari banyak komputer hingga server tidak dapat diakses disebut...',
    opsi: {
      A: 'Brute Force Attack',
      B: 'Ransomware',
      C: 'DDoS (Distributed Denial of Service)',
      D: 'Eavesdropping'
    },
    kunci: 'C',
    pembahasan: 'DDoS (Distributed Denial of Service) memanfaatkan banyak komputer botnet untuk mengirim banjir lalu lintas (traffic flood) menuju server sasaran hingga bandwidth dan kapasitas pemrosesan server lumpuh.'
  },
  {
    id: 'q_m1_04',
    moduleId: '1',
    pertanyaan: 'Perbedaan mendasar antara Virus dan Worm dalam mekanisme penyebarannya pada komputer jaringan adalah...',
    opsi: {
      A: 'Virus menyebar otomatis lewat port jaringan, sedangkan Worm menempel pada file dokumen.',
      B: 'Virus membutuhkan file induk dan eksekusi pengguna untuk menyebar, sedangkan Worm menyebar mandiri melalui jaringan.',
      C: 'Virus tidak merusak sistem operasi, sedangkan Worm merusak perangkat keras.',
      D: 'Virus hanya menyerang komputer klien, sedangkan Worm hanya menyerang printer.'
    },
    kunci: 'B',
    pembahasan: 'Virus memerlukan program atau file inang (host) dan aksi eksekusi pengguna agar aktif, sedangkan Worm merupakan program independen yang aktif memanfaatkan celah kelemahan jaringan secara mandiri.'
  },
  {
    id: 'q_m1_05',
    moduleId: '1',
    pertanyaan: 'Langkah pencegahan preventif terbaik untuk meminimalisir risiko infeksi malware pada komputer laboratorium sekolah adalah...',
    opsi: {
      A: 'Mematikan koneksi internet secara permanen setiap hari.',
      B: 'Memasang antivirus berlisensi, mengaktifkan pembaruan otomatis, dan tidak membuka sembarang file lampiran email.',
      C: 'Menghapus seluruh file berekstensi .exe yang ada di dalam sistem Windows.',
      D: 'Mengganti kabel LAN dengan kabel telepon rumah.'
    },
    kunci: 'B',
    pembahasan: 'Pencegahan malware yang efektif melibatkan kombinasi perangkat lunak antivirus yang selalu diperbarui, penambalan celah keamanan sistem operasi, dan kehati-hatian pengguna dalam membuka file atau tautan tak dikenal.'
  },
  {
    id: 'q_m1_06',
    moduleId: '1',
    pertanyaan: 'Malware yang menyamar sebagai perangkat lunak resmi atau game yang sah, namun ketika dipasang diam-diam membuka pintu belakang (backdoor) ke sistem komputer disebut...',
    opsi: {
      A: 'Trojan Horse',
      B: 'Adware',
      C: 'Worm',
      D: 'Ransomware'
    },
    kunci: 'A',
    pembahasan: 'Trojan Horse adalah program jahat yang disamarkan sebagai file atau aplikasi yang tampak sah untuk menipu pengguna agar menginstalnya, lalu membuka celah akses jarak jauh (backdoor).'
  },
  {
    id: 'q_m1_07',
    moduleId: '1',
    pertanyaan: 'Jenis serangan siber di mana pelaku menyusup di antara komunikasi dua pihak (misalnya antara komputer klien dan server perbankan) untuk menguping atau mengubah data tanpa disadari disebut...',
    opsi: {
      A: 'Denial of Service',
      B: 'Man-in-the-Middle (MitM)',
      C: 'Brute Force Attack',
      D: 'Cross-Site Scripting'
    },
    kunci: 'B',
    pembahasan: 'Serangan Man-in-the-Middle (MitM) terjadi ketika pihak ketiga secara diam-diam memotong dan memanipulasi lalu lintas data antara dua pihak yang berkomunikasi di jaringan tanpa sepengetahuan mereka.'
  },
  {
    id: 'q_m1_08',
    moduleId: '1',
    pertanyaan: 'Serangan berbahaya yang mengunci atau mengenkripsi seluruh file penting di komputer korban dan menuntut tebusan uang untuk mendapatkan kunci pembukanya disebut...',
    opsi: {
      A: 'Spyware',
      B: 'Ransomware',
      C: 'Keylogger',
      D: 'Rootkit'
    },
    kunci: 'B',
    pembahasan: 'Ransomware adalah varian malware pemerasan yang mengenkripsi data berharga milik korban dan meminta pembayaran tebusan (biasanya mata uang kripto) agar file dapat dipulihkan.'
  },
  {
    id: 'q_m1_09',
    moduleId: '1',
    pertanyaan: 'Program pengintai yang dipasang tanpa persetujuan pengguna untuk merekam ketikan keyboard, riwayat peramban, dan kata sandi lalu mengirimkannya ke server penyerang disebut...',
    opsi: {
      A: 'Spyware / Keylogger',
      B: 'Firmware',
      C: 'Adware ramah',
      D: 'Patch sistem'
    },
    kunci: 'A',
    pembahasan: 'Spyware (termasuk modul Keylogger) dirancang untuk memata-matai seluruh kegiatan pengguna, terutama masukan ketikan keyboard dan kata sandi rahasia.'
  },
  {
    id: 'q_m1_10',
    moduleId: '1',
    pertanyaan: 'Metode serangan peretasan akun yang mencoba menebak kata sandi secara berulang-ulang dengan menguji jutaan kombinasi karakter secara otomatis disebut...',
    opsi: {
      A: 'Phishing',
      B: 'Brute Force Attack',
      C: 'Social Engineering',
      D: 'DNS Poisoning'
    },
    kunci: 'B',
    pembahasan: 'Brute Force Attack adalah metode tebakan sistematis yang mencoba seluruh kemungkinan kombinasi huruf, angka, dan simbol sampai kata sandi yang valid berhasil ditemukan.'
  },
  {
    id: 'q_m1_11',
    moduleId: '1',
    pertanyaan: 'Taktik manipulasi psikologis di mana pelaku menghubungi korban sambil mengaku sebagai petugas teknis IT dan meminta kata sandi darurat secara lisan termasuk teknik...',
    opsi: {
      A: 'Social Engineering',
      B: 'Port Scanning',
      C: 'Packet Sniffing',
      D: 'SQL Injection'
    },
    kunci: 'A',
    pembahasan: 'Social Engineering (rekayasa sosial) mengeksploitasi kelemahan psikologis manusia, seperti rasa percaya atau panik, untuk membocorkan informasi rahasia tanpa melalui celah teknis perangkat lunak.'
  },
  {
    id: 'q_m1_12',
    moduleId: '1',
    pertanyaan: 'Perangkat lunak berbahaya tingkat lanjut yang menyembunyikan keberadaannya di dalam inti sistem operasi (kernel) agar tidak terdeteksi oleh antivirus konvensional disebut...',
    opsi: {
      A: 'Rootkit',
      B: 'Bloatware',
      C: 'Dialer',
      D: 'Spam'
    },
    kunci: 'A',
    pembahasan: 'Rootkit adalah sekumpulan program jahat yang memodifikasi kernel atau komponen internal OS untuk menyembunyikan proses, file, dan backdoor dari deteksi alat keamanan.'
  },
  {
    id: 'q_m1_13',
    moduleId: '1',
    pertanyaan: 'Apa yang dimaksud dengan kerentanan "Zero-Day Exploit" dalam dunia keamanan jaringan?',
    opsi: {
      A: 'Serangan yang hanya membutuhkan waktu nol detik untuk mematikan komputer.',
      B: 'Celah keamanan baru pada aplikasi yang belum diketahui oleh pengembang dan belum ada patch perbaikannya.',
      C: 'Antivirus gratis yang kedaluwarsa dalam nol hari.',
      D: 'Pencurian kabel jaringan di laboratorium komputer.'
    },
    kunci: 'B',
    pembahasan: 'Zero-day exploit menargetkan celah keamanan perangkat lunak yang belum dirilis tambalannya (patch) oleh pengembang, sehingga sistem rentan terhadap serangan langsung.'
  },
  {
    id: 'q_m1_14',
    moduleId: '1',
    pertanyaan: 'Pemberian izin akses aplikasi berbahaya melalui jendela peringatan UAC (User Account Control) yang sering diabaikan pengguna Windows berisiko menyebabkan...',
    opsi: {
      A: 'Layar monitor menjadi lebih jernih.',
      B: 'Malware memperoleh hak akses administrator penuh ke sistem komputer.',
      C: 'Kecepatan internet otomatis bertambah.',
      D: 'Keyboard tidak membutuhkan arus listrik.'
    },
    kunci: 'B',
    pembahasan: 'Ketika peringatan hak akses administrator disetujui sembarangan, malware mendapatkan privilege level tertinggi untuk memodifikasi registry, file sistem, dan menonaktifkan pertahanan Windows.'
  },
  {
    id: 'q_m1_15',
    moduleId: '1',
    pertanyaan: 'Teknik penipuan identitas di mana penyerang memalsukan alamat IP asal pada header paket untuk menyamar sebagai perangkat terpercaya disebut...',
    opsi: {
      A: 'IP Spoofing',
      B: 'MAC Binding',
      C: 'DHCP Snooping',
      D: 'NAT Forwarding'
    },
    kunci: 'A',
    pembahasan: 'IP Spoofing adalah pembuatan paket IP dengan alamat sumber palsu untuk mengelabui filter penerima atau menyembunyikan identitas asli mesin penyerang dalam serangan DoS.'
  },

  /* --- KUIS MODUL 2: Analisis Sistem Keamanan Jaringan --- */
  {
    id: 'q_m2_01',
    moduleId: '2',
    pertanyaan: 'Teknologi jaringan yang digunakan untuk menciptakan jalur komunikasi terenkripsi dan aman (terowongan privat) di atas jaringan internet publik adalah...',
    opsi: {
      A: 'NAT (Network Address Translation)',
      B: 'DHCP (Dynamic Host Configuration Protocol)',
      C: 'VPN (Virtual Private Network)',
      D: 'DNS (Domain Name System)'
    },
    kunci: 'C',
    pembahasan: 'VPN (Virtual Private Network) mengenkripsi seluruh paket pertukaran data antara perangkat klien dengan jaringan tujuan melalui mekanisme tunneling sehingga terlindung dari penyadapan pada Wi-Fi publik.'
  },
  {
    id: 'q_m2_02',
    moduleId: '2',
    pertanyaan: 'Sistem pertahanan keamanan jaringan yang bertindak sebagai dinding penyaring antara jaringan internal sekolah dan internet berdasarkan seperangkat aturan yang telah ditentukan adalah...',
    opsi: {
      A: 'Firewall',
      B: 'Switch Unmanaged',
      C: 'Repeater',
      D: 'Access Point'
    },
    kunci: 'A',
    pembahasan: 'Firewall bertugas memeriksa seluruh lalu lintas data yang masuk dan keluar berdasarkan aturan (ruleset) keamanan untuk mengizinkan (Allow) atau menolak (Block) lalu lintas mencurigakan.'
  },
  {
    id: 'q_m2_03',
    moduleId: '2',
    pertanyaan: 'Mengapa autentikasi dua faktor (2FA / Two-Factor Authentication) jauh lebih aman dibandingkan hanya menggunakan kata sandi biasa?',
    opsi: {
      A: 'Karena 2FA mempercepat proses transfer file di jaringan lokal.',
      B: 'Karena 2FA membutuhkan dua bentuk verifikasi berbeda (misal: password dan kode OTP ke ponsel), sehingga peretas tetap gagal jika hanya mengetahui password.',
      C: 'Karena 2FA dapat menggantikan fungsi dari perangkat keras router.',
      D: 'Karena 2FA menghapus seluruh virus yang ada di dalam server web.'
    },
    kunci: 'B',
    pembahasan: '2FA menambahkan lapisan perlindungan sekunder. Jika kata sandi (something you know) bocor, peretas tetap tidak bisa masuk tanpa faktor kedua seperti kode OTP dari ponsel (something you have).'
  },
  {
    id: 'q_m2_04',
    moduleId: '2',
    pertanyaan: 'Jika sebuah perusahaan mempekerjakan teknisi jaringan jarak jauh (*work from home*) yang harus membuka file sensitif di server internal kantor, kombinasi keamanan paling tepat yang harus diterapkan adalah...',
    opsi: {
      A: 'Cukup menggunakan kabel fiber optik tanpa password.',
      B: 'Membagikan folder publik di Google Drive tanpa enkripsi.',
      C: 'Koneksi melalui VPN terenkripsi dengan autentikasi multi-faktor (MFA).',
      D: 'Mematikan sistem firewall di kantor agar akses teknisi tidak lambat.'
    },
    kunci: 'C',
    pembahasan: 'Kombinasi VPN untuk mengenkripsi jalur komunikasi publik dan MFA untuk memastikan identitas teknisi adalah standar keamanan industri dalam pengaksesan sumber daya internal secara jarak jauh.'
  },
  {
    id: 'q_m2_05',
    moduleId: '2',
    pertanyaan: 'Perangkat lunak Antivirus pada komputer klien bekerja mendeteksi ancaman malware terutama menggunakan teknik...',
    opsi: {
      A: 'Mencocokkan tanda tangan file (Signature-based detection) dan analisis perilaku mencurigakan (Heuristic analysis).',
      B: 'Mengukur suhu panas dari processor dan harddisk secara terus-menerus.',
      C: 'Menghitung jumlah kata yang diketik oleh pengguna keyboard.',
      D: 'Mengganti kartu jaringan dengan kartu nirkabel secara berkala.'
    },
    kunci: 'A',
    pembahasan: 'Antivirus modern mengandalkan basis data signature virus yang diperbarui serta analisis heuristik untuk mengenali perilaku aplikasi yang abnormal atau berpotensi merusak sistem.'
  },
  {
    id: 'q_m2_06',
    moduleId: '2',
    pertanyaan: 'Tiga pilar utama dalam keamanan informasi yang dikenal dengan singkatan CIA Triad adalah...',
    opsi: {
      A: 'Control, Internet, Access',
      B: 'Confidentiality, Integrity, Availability',
      C: 'Computer, Identity, Authentication',
      D: 'Cables, Interface, Application'
    },
    kunci: 'B',
    pembahasan: 'CIA Triad (Kerahasiaan, Integritas, dan Ketersediaan) adalah model fondasi keamanan informasi untuk melindungi data dari akses tanpa izin, perubahan tidak sah, dan gangguan ketersediaan.'
  },
  {
    id: 'q_m2_07',
    moduleId: '2',
    pertanyaan: 'Perbedaan utama antara IDS (Intrusion Detection System) dan IPS (Intrusion Prevention System) pada jaringan adalah...',
    opsi: {
      A: 'IDS hanya memonitor dan memberi peringatan (alert), sedangkan IPS dapat langsung memblokir ancaman secara aktif.',
      B: 'IDS dipasang di kabel Wi-Fi, sedangkan IPS di kabel LAN.',
      C: 'IDS mempercepat download, sedangkan IPS menghapus file.',
      D: 'IDS hanya untuk sistem operasi Linux, sedangkan IPS untuk Windows.'
    },
    kunci: 'A',
    pembahasan: 'IDS bersifat pasif yang menganalisis lalu lintas dan mengirimkan notifikasi saat ancaman terdeteksi, sedangkan IPS bertindak aktif di jalur transmisi (inline) dan langsung menjatuhkan (drop) paket jahat.'
  },
  {
    id: 'q_m2_08',
    moduleId: '2',
    pertanyaan: 'Prinsip keamanan "Least Privilege" (Hak Akses Minimum) dalam manajemen akun sistem jaringan bermakna bahwa...',
    opsi: {
      A: 'Semua siswa harus diberikan hak Administrator tertinggi.',
      B: 'Setiap pengguna hanya diberikan hak akses yang benar-benar dibutuhkan untuk menyelesaikan tugas pekerjaannya.',
      C: 'Password akun tidak boleh diubah selamanya.',
      D: 'Semua file di server harus bisa dibaca oleh siapapun tanpa login.'
    },
    kunci: 'B',
    pembahasan: 'Prinsip Least Privilege membatasi hak akses pengguna ke tingkat minimum yang diperlukan untuk mencegah potensi kerusakan atau penyalahgunaan jika akun tersebut disusupi.'
  },
  {
    id: 'q_m2_09',
    moduleId: '2',
    pertanyaan: 'Protokol keamanan nirkabel yang paling kuat dan mutakhir untuk mengamankan jaringan Wi-Fi modern terhadap serangan offline dictionary attack adalah...',
    opsi: {
      A: 'WEP (Wired Equivalent Privacy)',
      B: 'WPA (Wi-Fi Protected Access)',
      C: 'WPA3 dengan protokol SAE',
      D: 'Open System tanpa sandi'
    },
    kunci: 'C',
    pembahasan: 'WPA3 menggunakan Simultaneous Authentication of Equals (SAE) yang tahan terhadap serangan kamus offline (offline dictionary attacks) dan menyediakan enkripsi yang lebih tangguh dibanding WPA2.'
  },
  {
    id: 'q_m2_10',
    moduleId: '2',
    pertanyaan: 'Alat bantu baris perintah (CLI) yang sangat populer digunakan oleh administrator jaringan untuk melakukan audit keamanan dan pemindaian port aktif (port scanning) adalah...',
    opsi: {
      A: 'Nmap',
      B: 'Notepad',
      C: 'Winamp',
      D: 'Paint'
    },
    kunci: 'A',
    pembahasan: 'Nmap (Network Mapper) adalah utilitas open-source standar industri untuk eksplorasi jaringan, pemindaian port terbuka, inventarisasi perangkat, dan audit keamanan sistem.'
  },
  {
    id: 'q_m2_11',
    moduleId: '2',
    pertanyaan: 'Mekanisme kriptografi yang menggunakan sepasang kunci berbeda, yaitu kunci publik (Public Key) untuk enkripsi dan kunci privat (Private Key) untuk dekripsi disebut...',
    opsi: {
      A: 'Kriptografi Asimetris (Public-key Cryptography)',
      B: 'Kriptografi Simetris (Secret-key)',
      C: 'Encoding Base64',
      D: 'Hashing MD5'
    },
    kunci: 'A',
    pembahasan: 'Kriptografi Asimetris menggunakan pasangan kunci matematis yang berbeda: kunci publik disebarkan secara terbuka untuk mengenkripsi pesan, sedangkan kunci privat disimpan rahasia oleh pemilik untuk membukanya.'
  },
  {
    id: 'q_m2_12',
    moduleId: '2',
    pertanyaan: 'Mengapa salinan cadangan data (Data Backup) harus menerapkan aturan 3-2-1 untuk menjamin pemulihan bencana (Disaster Recovery)?',
    opsi: {
      A: 'Agar media penyimpanan cepat penuh.',
      B: 'Menyimpan 3 salinan data, pada 2 jenis media berbeda, dengan 1 salinan disimpan di lokasi terpisah (off-site/cloud).',
      C: 'Melakukan backup 3 kali sehari selama 2 jam dengan 1 teknisi.',
      D: 'Menghapus data asli setelah 3 hari disimpan.'
    },
    kunci: 'B',
    pembahasan: 'Aturan 3-2-1 menjamin ketahanan data: miliki minimal 3 salinan, simpan di 2 media berbeda (misal: NAS dan Hard Drive), dan 1 di lokasi luar (cloud/offsite) untuk mengantisipasi kebakaran atau ransomware.'
  },
  {
    id: 'q_m2_13',
    moduleId: '2',
    pertanyaan: 'Fungsi Hash Satu Arah (Cryptographic Hash Function seperti SHA-256) dalam verifikasi integritas data file unduhan adalah...',
    opsi: {
      A: 'Menghasilkan checksum unik untuk memastikan file tidak mengalami modifikasi atau sisipan malware selama transfer.',
      B: 'Mengompres ukuran file menjadi nol kilobyte.',
      C: 'Menghapus password dari file terenkripsi.',
      D: 'Mengubah format file dokumen menjadi video.'
    },
    kunci: 'A',
    pembahasan: 'Fungsi hash menghasilkan nilai digest berukuran tetap unik. Jika satu bit saja dalam file berubah akibat kerusakan atau serangan malware, nilai hash yang dihasilkan akan berubah secara drastis (avalanche effect).'
  },
  {
    id: 'q_m2_14',
    moduleId: '2',
    pertanyaan: 'Sertifikat Digital SSL/TLS yang terpasang pada sebuah server web diverifikasi keabsahannya oleh pihak ketiga tepercaya yang disebut...',
    opsi: {
      A: 'Certificate Authority (CA)',
      B: 'Internet Service Provider (ISP)',
      C: 'Search Engine Robot',
      D: 'Domain Registrar'
    },
    kunci: 'A',
    pembahasan: 'Certificate Authority (CA) adalah otoritas pihak ketiga terpercaya yang menerbitkan dan menandatangani sertifikat digital untuk memvalidasi kepemilikan domain dan mengaktifkan koneksi HTTPS.'
  },
  {
    id: 'q_m2_15',
    moduleId: '2',
    pertanyaan: 'Teknik pertahanan keamanan jaringan yang sengaja menyiapkan server umpan palsu untuk memancing dan mempelajari perilaku penyerang disebut...',
    opsi: {
      A: 'Honeypot',
      B: 'Proxy Server',
      C: 'DNS Resolver',
      D: 'Gateway Server'
    },
    kunci: 'A',
    pembahasan: 'Honeypot adalah sistem keamanan jebakan yang sengaja dibiarkan rentan agar peretas masuk, memungkinkan tim keamanan mengisolasi dan mempelajari teknik penyerang tanpa membahayakan sistem produksi.'
  },

  /* --- KUIS MODUL 3: Firewall & Penyaringan Paket --- */
  {
    id: 'q_m3_01',
    moduleId: '3',
    pertanyaan: 'Pada metode penyaringan paket (*Packet Filtering Firewall*), kriteria data apa saja yang biasanya diperiksa dalam header paket data?',
    opsi: {
      A: 'Warna kabel jaringan dan merk kartu Ethernet.',
      B: 'IP Asal, IP Tujuan, Protokol (TCP/UDP), dan Port Tujuan.',
      C: 'Ukuran casing komputer dan kapasitas RAM server.',
      D: 'Nama lengkap pengguna dan tanggal lahir pembuat website.'
    },
    kunci: 'B',
    pembahasan: 'Packet filtering memeriksa informasi pada layer 3 dan layer 4 OSI, mencakup alamat IP sumber dan tujuan, jenis protokol transport (TCP/UDP), serta nomor port layanan yang dituju.'
  },
  {
    id: 'q_m3_02',
    moduleId: '3',
    pertanyaan: 'Protokol Telnet menggunakan port 23 dan mengirimkan data kredensial tanpa enkripsi (*plain text*). Tindakan konfigurasi firewall yang tepat untuk melindungi server sekolah adalah...',
    opsi: {
      A: 'Membuat aturan ALLOW untuk port 23 dari seluruh internet.',
      B: 'Membuat aturan BLOCK pada port 23 dan mengarahkan manajemen server ke SSH (Port 22).',
      C: 'Menonaktifkan firewall saat proses login berlangsung.',
      D: 'Mengubah nama server menjadi Telnet Server.'
    },
    kunci: 'B',
    pembahasan: 'Telnet sangat rentan terhadap sniffing karena tidak terenkripsi. Aturan firewall harus memblokir (BLOCK) port 23 dan menggantinya dengan SSH (Secure Shell) pada port 22 yang aman dan terenkripsi.'
  },
  {
    id: 'q_m3_03',
    moduleId: '3',
    pertanyaan: 'Jika sebuah firewall dikonfigurasi dengan aturan "ALLOW TCP Port 443", jenis lalu lintas data apa yang diizinkan melewati firewall menuju server web?',
    opsi: {
      A: 'Lalu lintas web terenkripsi yang aman (HTTPS).',
      B: 'Lalu lintas transfer file FTP tanpa sandi (Port 21).',
      C: 'Lalu lintas surat elektronik POP3 (Port 110).',
      D: 'Lalu lintas ping ICMP banjir DDoS.'
    },
    kunci: 'A',
    pembahasan: 'Port 443 adalah port standar untuk protokol HTTPS (Hypertext Transfer Protocol Secure) yang memanfaatkan enkripsi TLS/SSL untuk mengamankan pertukaran data web.'
  },
  {
    id: 'q_m3_04',
    moduleId: '3',
    pertanyaan: 'Prinsip keamanan firewall "Default Deny / Default Block" berarti...',
    opsi: {
      A: 'Semua lalu lintas diizinkan secara default, kecuali yang diblokir oleh administrator.',
      B: 'Semua lalu lintas ditolak secara default, hanya lalu lintas yang secara eksplisit diizinkan (Allow) yang dapat lewat.',
      C: 'Firewall menolak semua koneksi termasuk koneksi administrator secara permanen.',
      D: 'Firewall dimatikan secara otomatis setiap pergantian jam pelajaran.'
    },
    kunci: 'B',
    pembahasan: 'Prinsip Default Deny merupakan praktik terbaik keamanan siber: sistem memblokir semua lalu lintas data tak dikenal, dan hanya mengizinkan lalu lintas yang secara tegas didaftarkan pada aturan Allow.'
  },
  {
    id: 'q_m3_05',
    moduleId: '3',
    pertanyaan: 'Apa yang terjadi pada paket data di jaringan ketika firewall menerapkan tindakan "BLOCK / DROP" terhadap paket tersebut?',
    opsi: {
      A: 'Paket data digandakan lalu dikirim ke seluruh komputer di laboratorium.',
      B: 'Paket data dihentikan dan dibuang di gerbang firewall sehingga tidak sampai ke komputer target.',
      C: 'Paket data diubah menjadi video animasi.',
      D: 'Paket data dipercepat pengirimannya hingga 100 kali lipat.'
    },
    kunci: 'B',
    pembahasan: 'Tindakan Block/Drop menghentikan paket berbahaya di perimeter firewall dan membuangnya dari antrean transmisi, melindungi server di balik firewall dari potensi serangan atau eksploitasi.'
  },
  {
    id: 'q_m3_06',
    moduleId: '3',
    pertanyaan: 'Firewall generasi mutakhir yang tidak hanya memeriksa port dan IP, namun mampu menginspeksi isi konten aplikasi pada Layer 7 OSI serta dilengkapi IPS terintegrasi disebut...',
    opsi: {
      A: 'Next-Generation Firewall (NGFW)',
      B: 'Hub Pasif',
      C: 'Modem Dial-up',
      D: 'Kabel Coaxial'
    },
    kunci: 'A',
    pembahasan: 'Next-Generation Firewall (NGFW) menggabungkan inspeksi paket mendalam (DPI), kontrol aplikasi Layer 7, deteksi ancaman berbasis cloud, dan pencegahan intrusi terintegrasi.'
  },
  {
    id: 'q_m3_07',
    moduleId: '3',
    pertanyaan: 'Zona jaringan khusus yang memisahkan server publik (seperti Web Server dan Mail Server) dari jaringan internal lokal sekolah guna membatasi risiko kebocoran disebut...',
    opsi: {
      A: 'DMZ (Demilitarized Zone)',
      B: 'Intranet Murni',
      C: 'Localhost Loopback',
      D: 'Broadcast Domain'
    },
    kunci: 'A',
    pembahasan: 'DMZ (Demilitarized Zone) adalah subnet terisolasi perimeter jaringan tempat server layanan publik ditempatkan. Jika server DMZ diretas, penyerang tidak dapat langsung mengakses jaringan internal privat.'
  },
  {
    id: 'q_m3_08',
    moduleId: '3',
    pertanyaan: 'Pada sistem operasi Linux, utilitas firewall berbasis tabel filter paket yang sangat umum dikonfigurasi melalui baris perintah adalah...',
    opsi: {
      A: 'iptables / nftables',
      B: 'apt-get install',
      C: 'mkdir & rmdir',
      D: 'ping & traceroute'
    },
    kunci: 'A',
    pembahasan: 'iptables dan penggantinya (nftables) adalah kerangka kerja firewall bawaan kernel Linux (Netfilter) yang mengelola aturan penyaringan, pengalihan, dan modifikasi paket jaringan.'
  },
  {
    id: 'q_m3_09',
    moduleId: '3',
    pertanyaan: 'Pada konfigurasi iptables Linux, rantai (chain) aturan yang bertugas menyaring paket data yang masuk dan ditujukan khusus untuk mesin server itu sendiri adalah...',
    opsi: {
      A: 'Chain INPUT',
      B: 'Chain OUTPUT',
      C: 'Chain FORWARD',
      D: 'Chain PREROUTING'
    },
    kunci: 'A',
    pembahasan: 'Chain INPUT menangani paket yang memiliki alamat tujuan IP mesin lokal server tersebut, Chain FORWARD menangani paket yang dilewatkan/dirutekan, dan Chain OUTPUT untuk paket yang keluar dari server.'
  },
  {
    id: 'q_m3_10',
    moduleId: '3',
    pertanyaan: 'Perbedaan utama antara tindakan DROP dan REJECT pada firewall ketika menolak paket data yang tidak sah adalah...',
    opsi: {
      A: 'DROP membuang paket secara diam-diam tanpa balasan ke pengirim, sedangkan REJECT membuang paket dan mengirim pesan kesalahan (ICMP) ke pengirim.',
      B: 'DROP merusak kabel jaringan, sedangkan REJECT mematikan router.',
      C: 'DROP mengizinkan paket lewat, sedangkan REJECT menggandakan paket.',
      D: 'DROP hanya berlaku untuk protokol HTTP, sedangkan REJECT untuk SSH.'
    },
    kunci: 'A',
    pembahasan: 'DROP membuang paket seketika (silent discard) sehingga penyerang mengalami timeout dan sulit mendeteksi keberadaan target. REJECT membuang paket namun mengembalikan paket penolakan (ICMP unreachable/TCP RST).'
  },
  {
    id: 'q_m3_11',
    moduleId: '3',
    pertanyaan: 'Firewall tipe Stateful Inspection memiliki keunggulan dibandingkan Stateless Packet Filtering biasa karena...',
    opsi: {
      A: 'Mengingat dan melacak status tabel koneksi (State Table) aktif dari awal hingga akhir sesi transmisi.',
      B: 'Tidak membutuhkan listrik untuk beroperasi.',
      C: 'Bisa membaca file PDF tanpa Adobe Acrobat.',
      D: 'Hanya bisa dipakai pada satu komputer klien saja.'
    },
    kunci: 'A',
    pembahasan: 'Stateful firewall memelihara tabel status koneksi (SYN, ESTABLISHED, RELATED), sehingga paket balasan dari sesi yang sah diizinkan masuk otomatis tanpa perlu membuka port secara manual dari arah luar.'
  },
  {
    id: 'q_m3_12',
    moduleId: '3',
    pertanyaan: 'Port standar jaringan yang digunakan oleh layanan Domain Name System (DNS) untuk menerjemahkan nama domain website menjadi alamat IP adalah port...',
    opsi: {
      A: 'Port 53 (UDP/TCP)',
      B: 'Port 80 (HTTP)',
      C: 'Port 21 (FTP)',
      D: 'Port 25 (SMTP)'
    },
    kunci: 'A',
    pembahasan: 'Port 53 adalah port baku protokol DNS yang menangani penerjemahan alamat hostname/domain ke alamat IP numerik yang dapat dipahami perangkat jaringan.'
  },
  {
    id: 'q_m3_13',
    moduleId: '3',
    pertanyaan: 'Fitur NAT (Network Address Translation) jenis Masquerading pada router gateway firewall berfungsi untuk...',
    opsi: {
      A: 'Menerjemahkan banyak alamat IP privat jaringan lokal ke satu alamat IP publik agar semua klien dapat mengakses internet.',
      B: 'Memperbanyak virus di komputer siswa.',
      C: 'Menghapus konfigurasi router saat terjadi mati lampu.',
      D: 'Mengubah sinyal Wi-Fi menjadi frekuensi radio FM.'
    },
    kunci: 'A',
    pembahasan: 'IP Masquerade (Source NAT) menyamarkan alamat IP privat klien internal di balik satu alamat IP publik gateway ketika paket melintasi perbatasan ke jaringan internet.'
  },
  {
    id: 'q_m3_14',
    moduleId: '3',
    pertanyaan: 'Layanan Secure Shell (SSH) untuk remote administrasi server menggunakan port default nomor...',
    opsi: {
      A: 'Port 22',
      B: 'Port 23',
      C: 'Port 80',
      D: 'Port 443'
    },
    kunci: 'A',
    pembahasan: 'SSH (Secure Shell) secara default beroperasi pada port 22, menggantikan protokol Telnet yang tidak aman dengan menyediakan saluran komunikasi terenkripsi penuh.'
  },
  {
    id: 'q_m3_15',
    moduleId: '3',
    pertanyaan: 'Sebuah server web di laboratorium sekolah hanya boleh diakses menggunakan peramban web aman HTTPS. Aturan firewall paling tepat yang harus diterapkan adalah...',
    opsi: {
      A: 'ALLOW TCP Port 443 dan BLOCK port layanan lain yang tidak digunakan (Default Deny).',
      B: 'ALLOW semua port dari 1 sampai 65535.',
      C: 'BLOCK Port 443 dan buka Port 23 Telnet.',
      D: 'Matikan router setiap kali ada akses masuk.'
    },
    kunci: 'A',
    pembahasan: 'Konfigurasi paling aman adalah membuka hanya port yang dibutuhkan (Port 443 TCP untuk HTTPS) dan menerapkan kebijakan default block untuk seluruh port layanan lainnya guna mempersempit bidang serangan (attack surface).'
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
   * Inisialisasi storage awal jika belum tersedia
   */
  initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MODULES)) {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(DEFAULT_MODULES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
    } else {
      // Pastikan butir soal baru terintegrasi ke dalam localStorage yang sudah ada
      try {
        const storedQuizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
        const storedIds = new Set(storedQuizzes.map(q => q.id));
        let hasNew = false;
        DEFAULT_QUIZZES.forEach(dq => {
          if (!storedIds.has(dq.id)) {
            storedQuizzes.push(dq);
            hasNew = true;
          }
        });
        if (hasNew) {
          localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(storedQuizzes));
        }
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
      // 1. Sync Bank Soal dari MySQL (merging dengan DEFAULT_QUIZZES)
      const p1 = fetch(`${api}/quizzes.php`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            const currentQuizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
            const map = new Map();
            DEFAULT_QUIZZES.forEach(q => map.set(q.id, q));
            currentQuizzes.forEach(q => map.set(q.id, q));
            res.data.forEach(q => map.set(q.id, q));
            localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(Array.from(map.values())));
          }
        }).catch(() => {});

      // 2. Sync Rekap Hasil Kuis dari MySQL (merging agar data lokal tidak terhapus)
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

  /* --- MANAJEMEN BANK SOAL (CRUD GURU) --- */
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
    const newQuiz = {
      id: `q_m${quizData.moduleId}_${Date.now()}`,
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
          body: JSON.stringify({ id, ...quizData })
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

  /* --- MANAJEMEN HASIL EVALUASI / KUIS --- */
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
      ...resultData
    };
    all.unshift(newResult);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(all));

    // Update progres kuis siswa pada modul terkait di local
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
  }
};

// Inisialisasi storage & sinkronisasi MySQL saat skrip dimuat
Storage.initStorage();
window.Storage = Storage;
