-- ===================================================================
-- Database: cybertech_db
-- Sistem Multimedia Pembelajaran Interaktif: CyberTech (HOTS C4-C6)
-- SMK Negeri 1 Takalar
-- ===================================================================

CREATE DATABASE IF NOT EXISTS `cybertech_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cybertech_db`;

-- 1. Tabel Users (Siswa & Guru)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `nama` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('siswa', 'guru') NOT NULL DEFAULT 'siswa',
  `nip` VARCHAR(50) NULL,
  `nisn` VARCHAR(50) NULL,
  `kelas` VARCHAR(50) DEFAULT 'XI TJKT 1',
  `sekolah` VARCHAR(150) DEFAULT 'SMK Negeri 1 Takalar',
  `avatar` LONGTEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabel Modul Pembelajaran
CREATE TABLE IF NOT EXISTS `modules` (
  `id` INT NOT NULL PRIMARY KEY,
  `kode` VARCHAR(20) NOT NULL,
  `judul` VARCHAR(150) NOT NULL,
  `subjudul` VARCHAR(150) NOT NULL,
  `deskripsi` TEXT NOT NULL,
  `durasi` VARCHAR(50) NOT NULL,
  `total_soal` INT DEFAULT 5,
  `kkm` INT DEFAULT 75,
  `icon` VARCHAR(50) DEFAULT 'shield'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Bank Kasus & Tantangan Evaluasi HOTS C4-C6 (CRUD Guru)
CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `module_id` INT NOT NULL,
  `question_type` VARCHAR(50) NOT NULL DEFAULT 'hots',
  `pertanyaan` TEXT NOT NULL,
  `opsi_a` TEXT NULL,
  `opsi_b` TEXT NULL,
  `opsi_c` TEXT NULL,
  `opsi_d` TEXT NULL,
  `kunci` VARCHAR(50) NOT NULL,
  `hots_data` LONGTEXT NULL,
  `pembahasan` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel Progres Belajar Siswa
CREATE TABLE IF NOT EXISTS `student_progress` (
  `student_id` VARCHAR(50) NOT NULL,
  `module_id` INT NOT NULL,
  `material_read` TINYINT(1) DEFAULT 0,
  `video_watched` TINYINT(1) DEFAULT 0,
  `activity_done` TINYINT(1) DEFAULT 0,
  `quiz_score` INT NULL,
  `completed` TINYINT(1) DEFAULT 0,
  `percentage` INT DEFAULT 0,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`, `module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Hasil Evaluasi HOTS Siswa & Tinjauan Guru
CREATE TABLE IF NOT EXISTS `quiz_results` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `student_id` VARCHAR(50) NOT NULL,
  `student_name` VARCHAR(150) NOT NULL,
  `module_id` INT NOT NULL,
  `module_title` VARCHAR(150) NOT NULL,
  `score` INT NOT NULL,
  `correct_count` INT NOT NULL,
  `wrong_count` INT NOT NULL,
  `total_questions` INT NOT NULL,
  `user_answers` LONGTEXT NOT NULL,
  `duration_spent` INT NOT NULL DEFAULT 0,
  `kkm` INT DEFAULT 75,
  `teacher_feedback` TEXT NULL,
  `graded_by_teacher` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`student_id`),
  INDEX (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================================================================
-- DATA AWAL (SEED INITIAL DATA)
-- ===================================================================

-- Akun Guru Pre-provisioned & Akun Siswa Demo
INSERT INTO `users` (`id`, `username`, `email`, `nama`, `password`, `role`, `nip`, `nisn`, `kelas`, `sekolah`, `avatar`) VALUES
('user_guru_01', 'guru', 'guru@smkn1takalar.sch.id', 'Guru Pembimbing TKJ', 'guru123cybertech', 'guru', '198507152010011012', NULL, NULL, 'SMK Negeri 1 Takalar', 'G'),
('user_siswa_01', 'siswa', 'siswa@smkn1takalar.sch.id', 'Nasywan Siswa TKJ', 'siswa123cybertech', 'siswa', NULL, '0061234567', 'XI TJKT 1', 'SMK Negeri 1 Takalar', 'N')
ON DUPLICATE KEY UPDATE `nama` = VALUES(`nama`);

-- Metadata 3 Modul Pembelajaran (Berbasis TP C4-C6)
INSERT INTO `modules` (`id`, `kode`, `judul`, `subjudul`, `deskripsi`, `durasi`, `total_soal`, `kkm`, `icon`) VALUES
(1, 'MODUL-01', 'Analisis & Klasifikasi Ancaman Jaringan', 'Klasifikasi Kasus Virus, Worm, Phishing, & DDoS (C4)', 'Menganalisis mekanisme serangan siber dan mengklasifikasikan empat jenis ancaman jaringan secara tepat melalui aktivitas Drag & Drop beserta justifikasi teknis.', '20 Menit', 5, 75, 'shield-alert'),
(2, 'MODUL-02', 'Evaluasi & Rekomendasi Sistem Keamanan', 'Matriks Efektivitas Antivirus, Firewall, VPN, & 2FA (C4-C5)', 'Menganalisis efektivitas komparatif empat sistem keamanan jaringan dalam mengatasi ancaman nyata dan merekomendasikan solusi paling tepat berbasis kriteria.', '20 Menit', 5, 75, 'lock'),
(3, 'MODUL-03', 'Perancangan Kebijakan Firewall & Analisis Log', 'Simulasi Aturan Allow/Block & Justifikasi Lalu Lintas (C4-C6)', 'Merancang dan menerapkan aturan Allow atau Block pada simulasi firewall sesuai jenis lalu lintas serta menjelaskan alasan teknis paket diterima atau ditolak.', '20 Menit', 5, 75, 'flame')
ON DUPLICATE KEY UPDATE `judul` = VALUES(`judul`), `subjudul` = VALUES(`subjudul`), `deskripsi` = VALUES(`deskripsi`), `total_soal` = VALUES(`total_soal`), `durasi` = VALUES(`durasi`);

-- Bank Kasus & Tantangan Evaluasi HOTS C4-C6 (24 Kasus: 8 Kasus per Modul)
INSERT INTO `quizzes` (`id`, `module_id`, `question_type`, `pertanyaan`, `opsi_a`, `opsi_b`, `opsi_c`, `opsi_d`, `kunci`, `hots_data`, `pembahasan`) VALUES
-- MODUL 1: Evaluasi Klasifikasi Drag & Drop + Analisis Alasan (C4)
('hots_m1_01', 1, 'hots_m1_dnd', 'Seorang siswa menancapkan flashdisk pribadi untuk menyalin installer editor video bajakan (setup_crack.exe). Setelah file dijalankan, seluruh file .docx dan .exe di komputer tersebut rusak, namun komputer lain di laboratorium yang tidak menjalankan file dari flashdisk tetap aman.', '', '', '', '', 'virus', '{"category":"virus","categoryLabel":"Virus Komputer","expectedKeywords":["inang","eksekusi","jalankan","klik","file","flashdisk","menempel","pengguna"],"rubricHint":"Jelaskan mengapa insiden ini memerlukan file inang dan eksekusi pengguna untuk menginfeksi."}', 'Insiden ini merupakan Virus Komputer karena program jahat menempel pada file executable inang (setup_crack.exe) dan baru aktif merusak berkas lokal ketika pengguna mengklik/menjalankannya.'),
('hots_m1_02', 1, 'hots_m1_dnd', 'Dalam waktu 10 menit, 24 PC di Lab TJKT mendadak melambat drastis dan membanjiri switch dengan lalu lintas SMB Port 445, padahal seluruh siswa sedang istirahat dan tidak ada satu pun yang membuka email atau menjalankan file lampiran.', '', '', '', '', 'worm', '{"category":"worm","categoryLabel":"Network Worm","expectedKeywords":["mandiri","otomatis","tanpa","celah","port","jaringan","replikasi","smb"],"rubricHint":"Analisis mekanisme replikasi otomatis Worm lewat jaringan tanpa campur tangan pengguna."}', 'Insiden ini adalah Network Worm karena mampu menggandakan diri secara mandiri dan menyebar otomatis ke 24 PC melalui celah port jaringan (SMB 445) tanpa interaksi pengguna.'),
('hots_m1_03', 1, 'hots_m1_dnd', 'Operator sekolah menerima email berlogo resmi Dinas Pendidikan dengan alamat pengirim admin@dinas-pendidikan-verif.xyz yang mendesak agar segera login ulang pada tautan terlampir agar akun Dapodik tidak diblokir dalam 2 jam.', '', '', '', '', 'phishing', '{"category":"phishing","categoryLabel":"Phishing (Rekayasa Sosial)","expectedKeywords":["palsu","tautan","penyamaran","kredensial","password","psikologis","rekayasa sosial","domain"],"rubricHint":"Uraikan teknik manipulasi psikologis dan pemalsuan identitas pada pesan tersebut."}', 'Ini adalah serangan Phishing (rekayasa sosial) yang menyamar sebagai instansi tepercaya dengan domain palsu dan urgensi semu untuk memancing korban memasukkan kredensial login ke situs tiruan.'),
('hots_m1_04', 1, 'hots_m1_dnd', 'Tepat pukul 08.00 WITA saat ujian berlangsung, portal CBT sekolah gagal diakses (503 Service Unavailable). Log firewall mencatat 450.000 permintaan HTTP SYN per detik berasal dari ribuan IP asing yang tersebar di berbagai negara secara serentak.', '', '', '', '', 'ddos', '{"category":"ddos","categoryLabel":"DDoS Attack","expectedKeywords":["banjir","traffic","ribuan","botnet","serentak","lumpuh","availability","ketersediaan"],"rubricHint":"Analisis bagaimana banjir paket serentak melumpuhkan pilar ketersediaan (Availability) server."}', 'Ini merupakan DDoS (Distributed Denial of Service) menggunakan jaringan botnet global untuk membanjiri server target dengan ratusan ribu permintaan per detik hingga kapasitas layanan lumpuh.'),
('hots_m1_05', 1, 'hots_m1_dnd', 'Staf TU mengunduh lampiran dokumen penawaran berjudul Rincian_Biaya.docm dan mengklik tombol "Enable Content/Macros". Seketika itu juga skrip VBA di dalam dokumen memodifikasi file sistem Windows dan menyisipkan kode perusak ke aplikasi lain di PC tersebut.', '', '', '', '', 'virus', '{"category":"virus","categoryLabel":"Virus Komputer (Macro)","expectedKeywords":["makro","dokumen","klik","eksekusi","inang","aktifkan","sistem","vba"],"rubricHint":"Jelaskan keterkaitan antara file dokumen inang dan aksi pengguna mengaktifkan makro."}', 'Kasus ini termasuk Virus (Macro Virus) karena kode berbahaya disisipkan di dalam dokumen inang (.docm) dan hanya tereksekusi setelah korban memberikan aksi mengaktifkan konten makro.'),
('hots_m1_06', 1, 'hots_m1_dnd', 'Sebuah laptop tamu yang terhubung ke Wi-Fi sekolah langsung memindai seluruh subnet IP 192.168.10.0/24 guna mengeksploitasi celah layanan jaringan yang belum di-patch, menggandakan salinannya ke server file tanpa campur tangan admin.', '', '', '', '', 'worm', '{"category":"worm","categoryLabel":"Network Worm","expectedKeywords":["memindai","celah","otomatis","mandiri","jaringan","subnet","patch","ganda"],"rubricHint":"Analisis bagaimana penyerang menyebar secara otonom dengan memindai kerentanan jaringan."}', 'Ini adalah karakteristik utama Worm, yaitu melakukan pemindaian (scanning) jaringan otomatis dan mengeksploitasi celah sistem yang belum ditambal untuk mereplikasi diri lintas subnet.'),
('hots_m1_07', 1, 'hots_m1_dnd', 'Seorang guru menerima pesan WhatsApp yang mengaku dari teknisi IT sekolah beserta tautan pemendek URL (bit.ly/reset-portal-guru) yang mendesak guru memasukkan NIP dan kata sandi e-Rapor agar akun tidak terhapus.', '', '', '', '', 'phishing', '{"category":"phishing","categoryLabel":"Phishing (Smishing/Social Engineering)","expectedKeywords":["penipuan","tautan","kredensial","password","sandi","nip","mendesak","manipulasi"],"rubricHint":"Jelaskan indikator penipuan identitas dan target pencurian data pada kasus pesan ini."}', 'Serangan ini tergolong Phishing karena memanfaatkan rekayasa sosial lewat pesan mendesak dan tautan tersamar untuk mencuri data kredensial sensitif (NIP dan kata sandi) milik guru.'),
('hots_m1_08', 1, 'hots_m1_dnd', 'Koneksi internet seluruh sekolah putus total saat jam belajar. Setelah diperiksa pada router gateway, antarmuka WAN dibanjiri 99% paket UDP sampah berukuran besar ke port acak yang dikirim bersamaan dari ratusan kamera CCTV IoT yang telah dibajak.', '', '', '', '', 'ddos', '{"category":"ddos","categoryLabel":"DDoS (UDP Flood Botnet)","expectedKeywords":["banjir","bandwidth","udp","iot","botnet","massal","lumpuh","putus"],"rubricHint":"Uraikan peran perangkat IoT terkompromi dalam melumpuhkan kapasitas bandwidth jaringan."}', 'Ini adalah serangan DDoS (UDP Flood) yang memanfaatkan ratusan perangkat IoT yang telah disusupi (botnet) untuk menghabiskan seluruh kapasitas bandwidth WAN gateway sekolah.'),

-- MODUL 2: Evaluasi Matriks Efektivitas & Rekomendasi Sistem Keamanan (C4-C5)
('hots_m2_01', 2, 'hots_m2_case', 'Seorang administrator sekolah sedang berada di luar kota dan harus mengakses server nilai internal melalui jaringan Wi-Fi publik kafe yang tidak terenkripsi. Kriteria utama kasus ini adalah melindungi kerahasiaan data selama transmisi di jaringan publik dari ancaman penyadapan (Man-in-the-Middle).', '', '', '', '', 'vpn', '{"matrix":{"antivirus":"kurang_efektif","firewall":"kurang_efektif","vpn":"sangat_efektif","auth":"kurang_efektif"},"recommended":"vpn","expectedKeywords":["enkripsi","tunnel","publik","penyadapan","mitm","vpn","terowongan","kerahasiaan"],"rubricHint":"Bandingkan efektivitas ke-4 sistem terhadap ancaman penyadapan Wi-Fi publik dan rekomendasikan solusi utamanya."}', 'VPN (Virtual Private Network) adalah rekomendasi paling tepat karena membentuk terowongan terenkripsi (encrypted tunnel) di atas Wi-Fi publik sehingga mencegah penyadapan MitM. Antivirus hanya melindungi endpoint lokal, sedangkan 2FA dan Firewall saja tidak mengenkripsi paket yang sedang melintas di Wi-Fi publik.'),
('hots_m2_02', 2, 'hots_m2_case', 'Kredensial username dan kata sandi akun admin portal e-Rapor diketahui bocor akibat salah satu staf tertipu situs phishing. Kriteria keamanan utama adalah mencegah penyerang masuk ke akun walaupun kata sandi utama sudah berada di tangan peretas.', '', '', '', '', 'auth', '{"matrix":{"antivirus":"tidak_relevan","firewall":"kurang_efektif","vpn":"tidak_relevan","auth":"sangat_efektif"},"recommended":"auth","expectedKeywords":["otp","lapis kedua","2fa","mfa","verifikasi","password bocor","identitas","login"],"rubricHint":"Jelaskan mengapa Autentikasi 2FA menjadi garis pertahanan utama saat password sudah diketahui peretas."}', 'Autentikasi 2FA/MFA paling efektif karena mewajibkan faktor verifikasi kedua (seperti kode OTP ponsel) saat login; penyerang yang hanya memiliki password tetap tertolak. Antivirus dan VPN tidak menghentikan login sah memakai password curian.'),
('hots_m2_03', 2, 'hots_m2_case', 'Server Web sekolah mengalami puluhan ribu percobaan koneksi asing dari internet ke port manajemen berisiko seperti Port 23 (Telnet) dan Port 3306 (Database). Kriteria utama adalah menyaring lalu lintas jaringan masuk dan menutup akses port yang tidak semestinya dibuka untuk publik.', '', '', '', '', 'firewall', '{"matrix":{"antivirus":"tidak_relevan","firewall":"sangat_efektif","vpn":"tidak_relevan","auth":"kurang_efektif"},"recommended":"firewall","expectedKeywords":["port","filter","saring","blokir","lalu lintas","paket","firewall","drop"],"rubricHint":"Analisis efektivitas ke-4 sistem untuk menyaring trafik port jaringan dan jelaskan mengapa Firewall paling tepat."}', 'Firewall adalah kontrol paling tepat karena secara spesifik memeriksa header paket jaringan (IP, protokol, nomor port) dan memblokir akses asing ke Port 23 maupun 3306 di perimeter jaringan sebelum menyentuh server.'),
('hots_m2_04', 2, 'hots_m2_case', 'Komputer di laboratorium sering mengalami kerusakan file dokumen akibat siswa bergantian menancapkan flashdisk pribadi untuk mencetak tugas. Kriteria utama kasus ini adalah mendeteksi, memblokir eksekusi, dan mengkarantina berkas malware lokal di perangkat komputer klien (endpoint).', '', '', '', '', 'antivirus', '{"matrix":{"antivirus":"sangat_efektif","firewall":"kurang_efektif","vpn":"tidak_relevan","auth":"tidak_relevan"},"recommended":"antivirus","expectedKeywords":["pindai","scan","file","flashdisk","karantina","signature","endpoint","antivirus"],"rubricHint":"Evaluasi efektivitas tiap sistem menghadapi infeksi media fisik flashdisk dan rekomendasikan pelindung endpoint terbaik."}', 'Antivirus paling efektif untuk memindai media eksternal USB (flashdisk) secara real-time melalui deteksi signature dan heuristik lalu mengkarantina malware sebelum dijalankan. Firewall jaringan tidak memeriksa file yang dipindah lewat port USB fisik.'),
('hots_m2_05', 2, 'hots_m2_case', 'Sekolah memiliki gedung kampus utama dan gedung unit produksi di kecamatan berbeda yang harus bertukar data transaksi keuangan setiap hari melintasi jaringan internet ISP umum. Kriteria utama adalah menciptakan jembatan koneksi privat antar-kantor (Site-to-Site) yang terenkripsi penuh.', '', '', '', '', 'vpn', '{"matrix":{"antivirus":"kurang_efektif","firewall":"kurang_efektif","vpn":"sangat_efektif","auth":"kurang_efektif"},"recommended":"vpn","expectedKeywords":["site-to-site","enkripsi","terowongan","tunnel","antar","cabang","publik","vpn"],"rubricHint":"Jelaskan efektivitas VPN dalam menghubungkan dua lokasi jaringan terpisah secara aman melalui internet publik."}', 'VPN (khususnya Site-to-Site VPN dengan IPsec) paling efektif membentuk jalur komunikasi privat terenkripsi antar dua gedung melewati internet ISP publik agar data transaksi keuangan tidak terbaca pihak luar.'),
('hots_m2_06', 2, 'hots_m2_case', 'Halaman login administrator router dan server portal siswa diserang menggunakan skrip otomatis Brute Force yang menebak ribuan kombinasi password. Kriteria utama adalah melindungi akses akun login meskipun kombinasi kata sandi berhasil ditebak oleh skrip.', '', '', '', '', 'auth', '{"matrix":{"antivirus":"tidak_relevan","firewall":"kurang_efektif","vpn":"tidak_relevan","auth":"sangat_efektif"},"recommended":"auth","expectedKeywords":["2fa","otp","token","verifikasi","brute force","login","lapis kedua","mfa"],"rubricHint":"Analisis perbandingan kontrol pertahanan terhadap serangan pembobolan akun login otomatis."}', 'Autentikasi 2FA/MFA merupakan pertahanan krusial untuk mencegah pembobolan akun meski skrip Brute Force berhasil menebak password, karena skrip penyerang tidak memiliki kode OTP dinamis di perangkat admin.'),
('hots_m2_07', 2, 'hots_m2_case', 'Siswa tidak sengaja mengunduh aplikasi gratis dari internet yang ternyata disisipi Trojan Backdoor di dalam sistem operasi Windows. Kriteria utama adalah mengenali perilaku mencurigakan file di dalam sistem operasi serta membersihkan proses jahat dari komputer klien.', '', '', '', '', 'antivirus', '{"matrix":{"antivirus":"sangat_efektif","firewall":"kurang_efektif","vpn":"tidak_relevan","auth":"tidak_relevan"},"recommended":"antivirus","expectedKeywords":["trojan","heuristik","karantina","deteksi","komputer","endpoint","file","malware"],"rubricHint":"Jelaskan bagaimana analisis heuristik Antivirus bekerja dibandingkan sistem jaringan lain pada kasus infeksi file lokal."}', 'Antivirus modern (dengan signature-based dan heuristic analysis) sangat efektif mendeteksi anomali perilaku file Trojan di memori/disk klien dan langsung mengkarantina file berbahaya tersebut.'),
('hots_m2_08', 2, 'hots_m2_case', 'Manajemen sekolah menetapkan kebijakan agar komputer siswa di jam praktikum tidak dapat mengakses port layanan ilegal serta diblokir dari segmen server administrasi guru. Kriteria utama adalah menerapkan segmentasi kebijakan lalu lintas antar-subnet dan penyaringan port keluar/masuk.', '', '', '', '', 'firewall', '{"matrix":{"antivirus":"tidak_relevan","firewall":"sangat_efektif","vpn":"tidak_relevan","auth":"tidak_relevan"},"recommended":"firewall","expectedKeywords":["blokir","aturan","port","ip","penyaringan","subnet","traffic","firewall"],"rubricHint":"Uraikan mengapa kontrol berbasis aturan jaringan (Firewall) jauh lebih relevan dibanding sistem lainnya."}', 'Firewall adalah solusi paling tepat untuk menerapkan segmentasi lalu lintas antar-subnet dan menyaring/memblokir akses berdasarkan alamat IP dan port layanan sesuai kebijakan jaringan sekolah.'),

-- MODUL 3: Evaluasi Konfigurasi Simulator Firewall & Penjelasan Alasan (C4-C6)
('hots_m3_01', 3, 'hots_m3_firewall', 'Portal E-Learning ujian siswa membutuhkan akses browser web terenkripsi SSL/TLS agar siswa di Lab Komputer (192.168.1.50) dapat mengirimkan lembar jawaban ujian ke Server Ujian (10.0.0.10:443) tanpa risiko penyadapan.', '', '', '', '', 'ALLOW', '{"trafficKey":"https","trafficLabel":"HTTPS (Port 443 TCP)","protocol":"TCP","port":"443","sourceIp":"192.168.1.50","destIp":"10.0.0.10","action":"ALLOW","expectedKeywords":["https","443","enkripsi","ssl","tls","diterima","allow","ujian"],"rubricHint":"Terapkan aturan pada simulator dan jelaskan alasan teknis mengapa lalu lintas Port 443 ini harus diterima atau ditolak."}', 'Aturan ALLOW wajib diterapkan untuk TCP Port 443 (HTTPS) karena lalu lintas ujian menggunakan enkripsi SSL/TLS yang aman untuk menjaga kerahasiaan dan kelancaran pengiriman jawaban ujian siswa ke server.'),
('hots_m3_02', 3, 'hots_m3_firewall', 'Terdeteksi upaya login remote terminal menggunakan protokol Telnet (TCP Port 23) dari jaringan eksternal (203.0.113.88) ke Server Utama Sekolah (10.0.0.10:23). Kebijakan keamanan sekolah melarang keras pengiriman kata sandi secara plain text tanpa enkripsi.', '', '', '', '', 'BLOCK', '{"trafficKey":"telnet","trafficLabel":"Telnet (Port 23 TCP)","protocol":"TCP","port":"23","sourceIp":"203.0.113.88","destIp":"10.0.0.10","action":"BLOCK","expectedKeywords":["telnet","23","plain","tidak terenkripsi","ditolak","block","sniffing","ssh"],"rubricHint":"Jalankan aturan pada simulator lalu jelaskan risiko keamanan Telnet dan alasan paket ditolak/diterima."}', 'Aturan BLOCK wajib diterapkan pada Port 23 (Telnet) karena Telnet mengirimkan username dan password dalam format teks polos (plain text) yang mudah disadap (sniffing); remote manajemen harus diarahkan ke SSH Port 22.'),
('hots_m3_03', 3, 'hots_m3_firewall', 'Firewall mendeteksi lonjakan 50.000 paket ICMP Echo Request per detik secara serentak dari jaringan botnet asing (198.51.100.77) menuju Gateway Server (10.0.0.1) yang membuat respons jaringan sekolah macet total.', '', '', '', '', 'BLOCK', '{"trafficKey":"ddos","trafficLabel":"ICMP Ping Flood (DDoS)","protocol":"ICMP","port":"N/A","sourceIp":"198.51.100.77","destIp":"10.0.0.1","action":"BLOCK","expectedKeywords":["ddos","icmp","banjir","lumpuh","ditolak","block","drop","bandwidth"],"rubricHint":"Uji simulasi trafik banjir ICMP ini dan jelaskan alasan hasil penyaringan firewall."}', 'Aturan BLOCK (DROP) harus diterapkan terhadap banjir paket ICMP Flood tersebut agar paket sampah DDoS dijatuhkan di perimeter firewall dan tidak menghabiskan bandwidth maupun CPU server gateway sekolah.'),
('hots_m3_04', 3, 'hots_m3_firewall', 'Seluruh PC klien laboratorium (192.168.1.25) tidak dapat menerjemahkan nama domain situs belajar (contoh: kemdikbud.go.id) karena kueri UDP Port 53 menuju DNS Resolver Internal (10.0.0.5:53) tertahan di firewall.', '', '', '', '', 'ALLOW', '{"trafficKey":"dns","trafficLabel":"DNS Query (Port 53 UDP)","protocol":"UDP","port":"53","sourceIp":"192.168.1.25","destIp":"10.0.0.5","action":"ALLOW","expectedKeywords":["dns","53","domain","ip","diterima","allow","resolusi","akses"],"rubricHint":"Terapkan kebijakan firewall yang tepat dan uraikan alasan mengapa trafik Port 53 ini harus lolos atau dibuang."}', 'Aturan ALLOW harus diterapkan pada UDP Port 53 (DNS) menuju DNS Resolver internal agar komputer klien dapat menerjemahkan nama domain menjadi alamat IP sehingga akses situs belajar berfungsi normal.'),
('hots_m3_05', 3, 'hots_m3_firewall', 'Sebuah IP publik tak dikenal dari internet (45.33.12.9) mencoba membuka koneksi transfer file menggunakan protokol FTP standar (TCP Port 21) tanpa enkripsi ke Server Keuangan Sekolah (10.0.0.20:21).', '', '', '', '', 'BLOCK', '{"trafficKey":"ftp","trafficLabel":"FTP Plain (Port 21 TCP)","protocol":"TCP","port":"21","sourceIp":"45.33.12.9","destIp":"10.0.0.20","action":"BLOCK","expectedKeywords":["ftp","21","plain","enkripsi","ditolak","block","keuangan","sftp"],"rubricHint":"Jalankan simulasi firewall untuk lalu lintas FTP eksternal ini dan jelaskan alasan teknis keputusannya."}', 'Aturan BLOCK wajib diterapkan pada TCP Port 21 dari IP publik karena FTP mengirimkan kredensial dan berkas sensitif keuangan tanpa enkripsi; transfer berkas aman wajib memakai SFTP (Port 22) dari IP terotorisasi.'),
('hots_m3_06', 3, 'hots_m3_firewall', 'Administrator jaringan resmi sekolah (IP terotorisasi: 192.168.10.2) perlu melakukan pemeliharaan darurat pada Server Linux (10.0.0.10:22) melalui saluran remote terenkripsi Secure Shell (SSH TCP Port 22).', '', '', '', '', 'ALLOW', '{"trafficKey":"ssh","trafficLabel":"SSH Admin (Port 22 TCP)","protocol":"TCP","port":"22","sourceIp":"192.168.10.2","destIp":"10.0.0.10","action":"ALLOW","expectedKeywords":["ssh","22","enkripsi","admin","diterima","allow","aman","remote"],"rubricHint":"Konfigurasikan simulasi untuk permintaan SSH admin resmi ini dan jelaskan alasan hasil simulasi."}', 'Aturan ALLOW diterapkan untuk koneksi SSH (TCP Port 22) karena berasal dari IP administrator terpercaya dan komunikasi SSH dienkripsi penuh dari ujung ke ujung sehingga aman untuk administrasi server.'),
('hots_m3_07', 3, 'hots_m3_firewall', 'Terdeteksi upaya koneksi langsung dari alamat IP internet publik (185.220.101.4) menuju layanan basis data MySQL (TCP Port 3306) di Server Database Nilai Siswa (10.0.0.50:3306).', '', '', '', '', 'BLOCK', '{"trafficKey":"mysql","trafficLabel":"MySQL Public (Port 3306 TCP)","protocol":"TCP","port":"3306","sourceIp":"185.220.101.4","destIp":"10.0.0.50","action":"BLOCK","expectedKeywords":["database","mysql","3306","publik","ditolak","block","kebocoran","internal"],"rubricHint":"Uji simulasi akses database publik ini dan jelaskan alasan mengapa lalu lintas diterima atau ditolak."}', 'Aturan BLOCK wajib diterapkan karena port database (MySQL 3306) tidak boleh diekspos langsung ke internet publik; membuka port database ke publik berisiko besar menyebabkan pencurian data dan serangan Brute Force.'),
('hots_m3_08', 3, 'hots_m3_firewall', 'Sistem pemantau jaringan mendeteksi lalu lintas eksploitasi protokol berbagi berkas SMB (TCP Port 445) mencoba menerobos masuk dari luar jaringan (203.0.113.99) menuju komputer Lab TJKT (192.168.1.0/24), pola yang identik dengan penyebaran Worm/Ransomware.', '', '', '', '', 'BLOCK', '{"trafficKey":"smb","trafficLabel":"SMB External (Port 445 TCP)","protocol":"TCP","port":"445","sourceIp":"203.0.113.99","destIp":"192.168.1.50","action":"BLOCK","expectedKeywords":["smb","445","worm","ransomware","ditolak","block","eksploitasi","eksternal"],"rubricHint":"Terapkan aturan simulasi yang aman terhadap trafik SMB eksternal dan jelaskan alasan teknisnya."}', 'Aturan BLOCK wajib diterapkan terhadap Port 445 (SMB) dari jaringan eksternal karena port tersebut merupakan vektor serangan paling umum bagi Network Worm dan Ransomware untuk menyebar secara otomatis.')
ON DUPLICATE KEY UPDATE `question_type` = VALUES(`question_type`), `pertanyaan` = VALUES(`pertanyaan`), `kunci` = VALUES(`kunci`), `hots_data` = VALUES(`hots_data`), `pembahasan` = VALUES(`pembahasan`);
