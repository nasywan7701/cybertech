-- ===================================================================
-- Database: cybertech_db
-- Sistem Multimedia Pembelajaran Interaktif: CyberTech
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
  `avatar` VARCHAR(255) DEFAULT 'S',
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

-- 3. Tabel Bank Soal Kuis (CRUD Guru)
CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `module_id` INT NOT NULL,
  `pertanyaan` TEXT NOT NULL,
  `opsi_a` TEXT NOT NULL,
  `opsi_b` TEXT NOT NULL,
  `opsi_c` TEXT NOT NULL,
  `opsi_d` TEXT NOT NULL,
  `kunci` VARCHAR(5) NOT NULL,
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

-- 5. Tabel Hasil Kuis Siswa
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

-- Metadata 3 Modul Pembelajaran
INSERT INTO `modules` (`id`, `kode`, `judul`, `subjudul`, `deskripsi`, `durasi`, `total_soal`, `kkm`, `icon`) VALUES
(1, 'MODUL-01', 'Identifikasi Ancaman Jaringan', 'Virus, Worm, Phishing, dan DDoS', 'Memahami pengertian keamanan jaringan, mengklasifikasikan 4 jenis ancaman siber, dan metode pencegahan preventif.', '45 Menit', 5, 75, 'shield-alert'),
(2, 'MODUL-02', 'Analisis Sistem Keamanan Jaringan', 'Antivirus, Firewall, VPN, dan Autentikasi', 'Menganalisis efektivitas 4 komponen sistem pertahanan jaringan berlapis dalam mengatasi berbagai insiden keamanan.', '60 Menit', 5, 75, 'lock'),
(3, 'MODUL-03', 'Firewall & Penyaringan Paket Data', 'Konfigurasi Aturan Allow dan Block', 'Menerapkan penyaringan paket lalu lintas data berdasarkan port/protokol serta menganalisis hasil simulasi firewall.', '60 Menit', 5, 75, 'flame')
ON DUPLICATE KEY UPDATE `judul` = VALUES(`judul`);

-- Bank Soal Bawaan Modul 1, 2, dan 3
INSERT INTO `quizzes` (`id`, `module_id`, `pertanyaan`, `opsi_a`, `opsi_b`, `opsi_c`, `opsi_d`, `kunci`, `pembahasan`) VALUES
-- Modul 1
('q_m1_01', 1, 'Jenis malware yang dapat menggandakan dirinya secara mandiri dan menyebar ke komputer lain melalui celah jaringan tanpa memerlukan tindakan dari pengguna disebut...', 'Virus', 'Worm', 'Trojan Horse', 'Spyware', 'B', 'Worm adalah program berbahaya mandiri yang mampu mereplikasi dirinya dan menyebar otomatis melalui celah port/protokol jaringan tanpa perlu menempel pada program induk atau campur tangan pengguna.'),
('q_m1_02', 1, 'Seorang staf sekolah menerima pesan email yang menyerupai tampilan resmi bank dan meminta login ulang pada tautan palsu untuk memperbarui password. Serangan ini merupakan bentuk...', 'Phishing', 'DDoS Attack', 'SQL Injection', 'Man-in-the-Middle', 'A', 'Phishing adalah bentuk rekayasa sosial (social engineering) di mana pelaku menyamar sebagai entitas tepercaya melalui pesan/email palsu guna mengelabui korban agar memberikan data kredensial rahasia.'),
('q_m1_03', 1, 'Serangan siber yang dilakukan dengan cara membanjiri server target menggunakan ribuan atau jutaan permintaan palsu secara serentak dari banyak komputer hingga server tidak dapat diakses disebut...', 'Brute Force Attack', 'Ransomware', 'DDoS (Distributed Denial of Service)', 'Eavesdropping', 'C', 'DDoS (Distributed Denial of Service) memanfaatkan banyak komputer botnet untuk mengirim banjir lalu lintas (traffic flood) menuju server sasaran hingga bandwidth dan kapasitas pemrosesan server lumpuh.'),
('q_m1_04', 1, 'Perbedaan mendasar antara Virus dan Worm dalam mekanisme penyebarannya pada komputer jaringan adalah...', 'Virus menyebar otomatis lewat port jaringan, sedangkan Worm menempel pada file dokumen.', 'Virus membutuhkan file induk dan eksekusi pengguna untuk menyebar, sedangkan Worm menyebar mandiri melalui jaringan.', 'Virus tidak merusak sistem operasi, sedangkan Worm merusak perangkat keras.', 'Virus hanya menyerang komputer klien, sedangkan Worm hanya menyerang printer.', 'B', 'Virus memerlukan program atau file inang (host) dan aksi eksekusi pengguna agar aktif, sedangkan Worm merupakan program independen yang aktif memanfaatkan celah kelemahan jaringan secara mandiri.'),
('q_m1_05', 1, 'Langkah pencegahan preventif terbaik untuk meminimalisir risiko infeksi malware pada komputer laboratorium sekolah adalah...', 'Mematikan koneksi internet secara permanen setiap hari.', 'Memasang antivirus berlisensi, mengaktifkan pembaruan otomatis, dan tidak membuka sembarang file lampiran email.', 'Menghapus seluruh file berekstensi .exe yang ada di dalam sistem Windows.', 'Mengganti kabel LAN dengan kabel telepon rumah.', 'B', 'Pencegahan malware yang efektif melibatkan kombinasi perangkat lunak antivirus yang selalu diperbarui, penambalan celah keamanan sistem operasi, dan kehati-hatian pengguna dalam membuka file atau tautan tak dikenal.'),
('q_m1_06', 1, 'Malware yang menyamar sebagai perangkat lunak resmi atau game yang sah, namun ketika dipasang diam-diam membuka pintu belakang (backdoor) ke sistem komputer disebut...', 'Trojan Horse', 'Adware', 'Worm', 'Ransomware', 'A', 'Trojan Horse adalah program jahat yang disamarkan sebagai file atau aplikasi yang tampak sah untuk menipu pengguna agar menginstalnya, lalu membuka celah akses jarak jauh (backdoor).'),
('q_m1_07', 1, 'Jenis serangan siber di mana pelaku menyusup di antara komunikasi dua pihak (misalnya antara komputer klien dan server perbankan) untuk menguping atau mengubah data tanpa disadari disebut...', 'Denial of Service', 'Man-in-the-Middle (MitM)', 'Brute Force Attack', 'Cross-Site Scripting', 'B', 'Serangan Man-in-the-Middle (MitM) terjadi ketika pihak ketiga secara diam-diam memotong dan memanipulasi lalu lintas data antara dua pihak yang berkomunikasi di jaringan tanpa sepengetahuan mereka.'),
('q_m1_08', 1, 'Serangan berbahaya yang mengunci atau mengenkripsi seluruh file penting di komputer korban dan menuntut tebusan uang untuk mendapatkan kunci pembukanya disebut...', 'Spyware', 'Ransomware', 'Keylogger', 'Rootkit', 'B', 'Ransomware adalah varian malware pemerasan yang mengenkripsi data berharga milik korban dan meminta pembayaran tebusan (biasanya mata uang kripto) agar file dapat dipulihkan.'),
('q_m1_09', 1, 'Program pengintai yang dipasang tanpa persetujuan pengguna untuk merekam ketikan keyboard, riwayat peramban, dan kata sandi lalu mengirimkannya ke server penyerang disebut...', 'Spyware / Keylogger', 'Firmware', 'Adware ramah', 'Patch sistem', 'A', 'Spyware (termasuk modul Keylogger) dirancang untuk memata-matai seluruh kegiatan pengguna, terutama masukan ketikan keyboard dan kata sandi rahasia.'),
('q_m1_10', 1, 'Metode serangan peretasan akun yang mencoba menebak kata sandi secara berulang-ulang dengan menguji jutaan kombinasi karakter secara otomatis disebut...', 'Phishing', 'Brute Force Attack', 'Social Engineering', 'DNS Poisoning', 'B', 'Brute Force Attack adalah metode tebakan sistematis yang mencoba seluruh kemungkinan kombinasi huruf, angka, dan simbol sampai kata sandi yang valid berhasil ditemukan.'),
('q_m1_11', 1, 'Taktik manipulasi psikologis di mana pelaku menghubungi korban sambil mengaku sebagai petugas teknis IT dan meminta kata sandi darurat secara lisan termasuk teknik...', 'Social Engineering', 'Port Scanning', 'Packet Sniffing', 'SQL Injection', 'A', 'Social Engineering (rekayasa sosial) mengeksploitasi kelemahan psikologis manusia, seperti rasa percaya atau panik, untuk membocorkan informasi rahasia tanpa melalui celah teknis perangkat lunak.'),
('q_m1_12', 1, 'Perangkat lunak berbahaya tingkat lanjut yang menyembunyikan keberadaannya di dalam inti sistem operasi (kernel) agar tidak terdeteksi oleh antivirus konvensional disebut...', 'Rootkit', 'Bloatware', 'Dialer', 'Spam', 'A', 'Rootkit adalah sekumpulan program jahat yang memodifikasi kernel atau komponen internal OS untuk menyembunyikan proses, file, dan backdoor dari deteksi alat keamanan.'),
('q_m1_13', 1, 'Apa yang dimaksud dengan kerentanan "Zero-Day Exploit" dalam dunia keamanan jaringan?', 'Serangan yang hanya membutuhkan waktu nol detik untuk mematikan komputer.', 'Celah keamanan baru pada aplikasi yang belum diketahui oleh pengembang dan belum ada patch perbaikannya.', 'Antivirus gratis yang kedaluwarsa dalam nol hari.', 'Pencurian kabel jaringan di laboratorium komputer.', 'B', 'Zero-day exploit menargetkan celah keamanan perangkat lunak yang belum dirilis tambalannya (patch) oleh pengembang, sehingga sistem rentan terhadap serangan langsung.'),
('q_m1_14', 1, 'Pemberian izin akses aplikasi berbahaya melalui jendela peringatan UAC (User Account Control) yang sering diabaikan pengguna Windows berisiko menyebabkan...', 'Layar monitor menjadi lebih jernih.', 'Malware memperoleh hak akses administrator penuh ke sistem komputer.', 'Kecepatan internet otomatis bertambah.', 'Keyboard tidak membutuhkan arus listrik.', 'B', 'Ketika peringatan hak akses administrator disetujui sembarangan, malware mendapatkan privilege level tertinggi untuk memodifikasi registry, file sistem, dan menonaktifkan pertahanan Windows.'),
('q_m1_15', 1, 'Teknik penipuan identitas di mana penyerang memalsukan alamat IP asal pada header paket untuk menyamar sebagai perangkat terpercaya disebut...', 'IP Spoofing', 'MAC Binding', 'DHCP Snooping', 'NAT Forwarding', 'A', 'IP Spoofing adalah pembuatan paket IP dengan alamat sumber palsu untuk mengelabui filter penerima atau menyembunyikan identitas asli mesin penyerang dalam serangan DoS.'),

-- Modul 2
('q_m2_01', 2, 'Teknologi jaringan yang digunakan untuk menciptakan jalur komunikasi terenkripsi dan aman (terowongan privat) di atas jaringan internet publik adalah...', 'NAT (Network Address Translation)', 'DHCP (Dynamic Host Configuration Protocol)', 'VPN (Virtual Private Network)', 'DNS (Domain Name System)', 'C', 'VPN (Virtual Private Network) mengenkripsi seluruh paket pertukaran data antara perangkat klien dengan jaringan tujuan melalui mekanisme tunneling sehingga terlindung dari penyadapan pada Wi-Fi publik.'),
('q_m2_02', 2, 'Sistem pertahanan keamanan jaringan yang bertindak sebagai dinding penyaring antara jaringan internal sekolah dan internet berdasarkan seperangkat aturan yang telah ditentukan adalah...', 'Firewall', 'Switch Unmanaged', 'Repeater', 'Access Point', 'A', 'Firewall bertugas memeriksa seluruh lalu lintas data yang masuk dan keluar berdasarkan aturan (ruleset) keamanan untuk mengizinkan (Allow) atau menolak (Block) lalu lintas mencurigakan.'),
('q_m2_03', 2, 'Mengapa autentikasi dua faktor (2FA / Two-Factor Authentication) jauh lebih aman dibandingkan hanya menggunakan kata sandi biasa?', 'Karena 2FA mempercepat proses transfer file di jaringan lokal.', 'Karena 2FA membutuhkan dua bentuk verifikasi berbeda (misal: password dan kode OTP ke ponsel), sehingga peretas tetap gagal jika hanya mengetahui password.', 'Karena 2FA dapat menggantikan fungsi dari perangkat keras router.', 'Karena 2FA menghapus seluruh virus yang ada di dalam server web.', 'B', '2FA menambahkan lapisan perlindungan sekunder. Jika kata sandi (something you know) bocor, peretas tetap tidak bisa masuk tanpa faktor kedua seperti kode OTP dari ponsel (something you have).'),
('q_m2_04', 2, 'Jika sebuah perusahaan mempekerjakan teknisi jaringan jarak jauh (*work from home*) yang harus membuka file sensitif di server internal kantor, kombinasi keamanan paling tepat yang harus diterapkan adalah...', 'Cukup menggunakan kabel fiber optik tanpa password.', 'Membagikan folder publik di Google Drive tanpa enkripsi.', 'Koneksi melalui VPN terenkripsi dengan autentikasi multi-faktor (MFA).', 'Mematikan sistem firewall di kantor agar akses teknisi tidak lambat.', 'C', 'Kombinasi VPN untuk mengenkripsi jalur komunikasi publik dan MFA untuk memastikan identitas teknisi adalah standar keamanan industri dalam pengaksesan sumber daya internal secara jarak jauh.'),
('q_m2_05', 2, 'Perangkat lunak Antivirus pada komputer klien bekerja mendeteksi ancaman malware terutama menggunakan teknik...', 'Mencocokkan tanda tangan file (Signature-based detection) dan analisis perilaku mencurigakan (Heuristic analysis).', 'Mengukur suhu panas dari processor dan harddisk secara terus-menerus.', 'Menghitung jumlah kata yang diketik oleh pengguna keyboard.', 'Mengganti kartu jaringan dengan kartu nirkabel secara berkala.', 'A', 'Antivirus modern mengandalkan basis data signature virus yang diperbarui serta analisis heuristik untuk mengenali perilaku aplikasi yang abnormal atau berpotensi merusak sistem.'),
('q_m2_06', 2, 'Tiga pilar utama dalam keamanan informasi yang dikenal dengan singkatan CIA Triad adalah...', 'Control, Internet, Access', 'Confidentiality, Integrity, Availability', 'Computer, Identity, Authentication', 'Cables, Interface, Application', 'B', 'CIA Triad (Kerahasiaan, Integritas, dan Ketersediaan) adalah model fondasi keamanan informasi untuk melindungi data dari akses tanpa izin, perubahan tidak sah, dan gangguan ketersediaan.'),
('q_m2_07', 2, 'Perbedaan utama antara IDS (Intrusion Detection System) dan IPS (Intrusion Prevention System) pada jaringan adalah...', 'IDS hanya memonitor dan memberi peringatan (alert), sedangkan IPS dapat langsung memblokir ancaman secara aktif.', 'IDS dipasang di kabel Wi-Fi, sedangkan IPS di kabel LAN.', 'IDS mempercepat download, sedangkan IPS menghapus file.', 'IDS hanya untuk sistem operasi Linux, sedangkan IPS untuk Windows.', 'A', 'IDS bersifat pasif yang menganalisis lalu lintas dan mengirimkan notifikasi saat ancaman terdeteksi, sedangkan IPS bertindak aktif di jalur transmisi (inline) dan langsung menjatuhkan (drop) paket jahat.'),
('q_m2_08', 2, 'Prinsip keamanan "Least Privilege" (Hak Akses Minimum) dalam manajemen akun sistem jaringan bermakna bahwa...', 'Semua siswa harus diberikan hak Administrator tertinggi.', 'Setiap pengguna hanya diberikan hak akses yang benar-benar dibutuhkan untuk menyelesaikan tugas pekerjaannya.', 'Password akun tidak boleh diubah selamanya.', 'Semua file di server harus bisa dibaca oleh siapapun tanpa login.', 'B', 'Prinsip Least Privilege membatasi hak akses pengguna ke tingkat minimum yang diperlukan untuk mencegah potensi kerusakan atau penyalahgunaan jika akun tersebut disusupi.'),
('q_m2_09', 2, 'Protokol keamanan nirkabel yang paling kuat dan mutakhir untuk mengamankan jaringan Wi-Fi modern terhadap serangan offline dictionary attack adalah...', 'WEP (Wired Equivalent Privacy)', 'WPA (Wi-Fi Protected Access)', 'WPA3 dengan protokol SAE', 'Open System tanpa sandi', 'C', 'WPA3 menggunakan Simultaneous Authentication of Equals (SAE) yang tahan terhadap serangan kamus offline (offline dictionary attacks) dan menyediakan enkripsi yang lebih tangguh dibanding WPA2.'),
('q_m2_10', 2, 'Alat bantu baris perintah (CLI) yang sangat populer digunakan oleh administrator jaringan untuk melakukan audit keamanan dan pemindaian port aktif (port scanning) adalah...', 'Nmap', 'Notepad', 'Winamp', 'Paint', 'A', 'Nmap (Network Mapper) adalah utilitas open-source standar industri untuk eksplorasi jaringan, pemindaian port terbuka, inventarisasi perangkat, dan audit keamanan sistem.'),
('q_m2_11', 2, 'Mekanisme kriptografi yang menggunakan sepasang kunci berbeda, yaitu kunci publik (Public Key) untuk enkripsi dan kunci privat (Private Key) untuk dekripsi disebut...', 'Kriptografi Asimetris (Public-key Cryptography)', 'Kriptografi Simetris (Secret-key)', 'Encoding Base64', 'Hashing MD5', 'A', 'Kriptografi Asimetris menggunakan pasangan kunci matematis yang berbeda: kunci publik disebarkan secara terbuka untuk mengenkripsi pesan, sedangkan kunci privat disimpan rahasia oleh pemilik untuk membukanya.'),
('q_m2_12', 2, 'Mengapa salinan cadangan data (Data Backup) harus menerapkan aturan 3-2-1 untuk menjamin pemulihan bencana (Disaster Recovery)?', 'Agar media penyimpanan cepat penuh.', 'Menyimpan 3 salinan data, pada 2 jenis media berbeda, dengan 1 salinan disimpan di lokasi terpisah (off-site/cloud).', 'Melakukan backup 3 kali sehari selama 2 jam dengan 1 teknisi.', 'Menghapus data asli setelah 3 hari disimpan.', 'B', 'Aturan 3-2-1 menjamin ketahanan data: miliki minimal 3 salinan, simpan di 2 media berbeda (misal: NAS dan Hard Drive), dan 1 di lokasi luar (cloud/offsite) untuk mengantisipasi kebakaran atau ransomware.'),
('q_m2_13', 2, 'Fungsi Hash Satu Arah (Cryptographic Hash Function seperti SHA-256) dalam verifikasi integritas data file unduhan adalah...', 'Menghasilkan checksum unik untuk memastikan file tidak mengalami modifikasi atau sisipan malware selama transfer.', 'Mengompres ukuran file menjadi nol kilobyte.', 'Menghapus password dari file terenkripsi.', 'Mengubah format file dokumen menjadi video.', 'A', 'Fungsi hash menghasilkan nilai digest berukuran tetap unik. Jika satu bit saja dalam file berubah akibat kerusakan atau serangan malware, nilai hash yang dihasilkan akan berubah secara drastis (avalanche effect).'),
('q_m2_14', 2, 'Sertifikat Digital SSL/TLS yang terpasang pada sebuah server web diverifikasi keabsahannya oleh pihak ketiga tepercaya yang disebut...', 'Certificate Authority (CA)', 'Internet Service Provider (ISP)', 'Search Engine Robot', 'Domain Registrar', 'A', 'Certificate Authority (CA) adalah otoritas pihak ketiga terpercaya yang menerbitkan dan menandatangani sertifikat digital untuk memvalidasi kepemilikan domain dan mengaktifkan koneksi HTTPS.'),
('q_m2_15', 2, 'Teknik pertahanan keamanan jaringan yang sengaja menyiapkan server umpan palsu untuk memancing dan mempelajari perilaku penyerang disebut...', 'Honeypot', 'Proxy Server', 'DNS Resolver', 'Gateway Server', 'A', 'Honeypot adalah sistem keamanan jebakan yang sengaja dibiarkan rentan agar peretas masuk, memungkinkan tim keamanan mengisolasi dan mempelajari teknik penyerang tanpa membahayakan sistem produksi.'),

-- Modul 3
('q_m3_01', 3, 'Pada metode penyaringan paket (*Packet Filtering Firewall*), kriteria data apa saja yang biasanya diperiksa dalam header paket data?', 'Warna kabel jaringan dan merk kartu Ethernet.', 'IP Asal, IP Tujuan, Protokol (TCP/UDP), dan Port Tujuan.', 'Ukuran casing komputer dan kapasitas RAM server.', 'Nama lengkap pengguna dan tanggal lahir pembuat website.', 'B', 'Packet filtering memeriksa informasi pada layer 3 dan layer 4 OSI, mencakup alamat IP sumber dan tujuan, jenis protokol transport (TCP/UDP), serta nomor port layanan yang dituju.'),
('q_m3_02', 3, 'Protokol Telnet menggunakan port 23 dan mengirimkan data kredensial tanpa enkripsi (*plain text*). Tindakan konfigurasi firewall yang tepat untuk melindungi server sekolah adalah...', 'Membuat aturan ALLOW untuk port 23 dari seluruh internet.', 'Membuat aturan BLOCK pada port 23 dan mengarahkan manajemen server ke SSH (Port 22).', 'Menonaktifkan firewall saat proses login berlangsung.', 'Mengubah nama server menjadi Telnet Server.', 'B', 'Telnet sangat rentan terhadap sniffing karena tidak terenkripsi. Aturan firewall harus memblokir (BLOCK) port 23 dan menggantinya dengan SSH (Secure Shell) pada port 22 yang aman dan terenkripsi.'),
('q_m3_03', 3, 'Jika sebuah firewall dikonfigurasi dengan aturan "ALLOW TCP Port 443", jenis lalu lintas data apa yang diizinkan melewati firewall menuju server web?', 'Lalu lintas web terenkripsi yang aman (HTTPS).', 'Lalu lintas transfer file FTP tanpa sandi (Port 21).', 'Lalu lintas surat elektronik POP3 (Port 110).', 'Lalu lintas ping ICMP banjir DDoS.', 'A', 'Port 443 adalah port standar untuk protokol HTTPS (Hypertext Transfer Protocol Secure) yang memanfaatkan enkripsi TLS/SSL untuk mengamankan pertukaran data web.'),
('q_m3_04', 3, 'Prinsip keamanan firewall "Default Deny / Default Block" berarti...', 'Semua lalu lintas diizinkan secara default, kecuali yang diblokir oleh administrator.', 'Semua lalu lintas ditolak secara default, hanya lalu lintas yang secara eksplisit diizinkan (Allow) yang dapat lewat.', 'Firewall menolak semua koneksi termasuk koneksi administrator secara permanen.', 'Firewall dimatikan secara otomatis setiap pergantian jam pelajaran.', 'B', 'Prinsip Default Deny merupakan praktik terbaik keamanan siber: sistem memblokir semua lalu lintas data tak dikenal, dan hanya mengizinkan lalu lintas yang secara tegas didaftarkan pada aturan Allow.'),
('q_m3_05', 3, 'Apa yang terjadi pada paket data di jaringan ketika firewall menerapkan tindakan "BLOCK / DROP" terhadap paket tersebut?', 'Paket data digandakan lalu dikirim ke seluruh komputer di laboratorium.', 'Paket data dihentikan dan dibuang di gerbang firewall sehingga tidak sampai ke komputer target.', 'Paket data diubah menjadi video animasi.', 'Paket data dipercepat pengirimannya hingga 100 kali lipat.', 'B', 'Tindakan Block/Drop menghentikan paket berbahaya di perimeter firewall dan membuangnya dari antrean transmisi, melindungi server di balik firewall dari potensi serangan atau eksploitasi.'),
('q_m3_06', 3, 'Firewall generasi mutakhir yang tidak hanya memeriksa port dan IP, namun mampu menginspeksi isi konten aplikasi pada Layer 7 OSI serta dilengkapi IPS terintegrasi disebut...', 'Next-Generation Firewall (NGFW)', 'Hub Pasif', 'Modem Dial-up', 'Kabel Coaxial', 'A', 'Next-Generation Firewall (NGFW) menggabungkan inspeksi paket mendalam (DPI), kontrol aplikasi Layer 7, deteksi ancaman berbasis cloud, dan pencegahan intrusi terintegrasi.'),
('q_m3_07', 3, 'Zona jaringan khusus yang memisahkan server publik (seperti Web Server dan Mail Server) dari jaringan internal lokal sekolah guna membatasi risiko kebocoran disebut...', 'DMZ (Demilitarized Zone)', 'Intranet Murni', 'Localhost Loopback', 'Broadcast Domain', 'A', 'DMZ (Demilitarized Zone) adalah subnet terisolasi perimeter jaringan tempat server layanan publik ditempatkan. Jika server DMZ diretas, penyerang tidak dapat langsung mengakses jaringan internal privat.'),
('q_m3_08', 3, 'Pada sistem operasi Linux, utilitas firewall berbasis tabel filter paket yang sangat umum dikonfigurasi melalui baris perintah adalah...', 'iptables / nftables', 'apt-get install', 'mkdir & rmdir', 'ping & traceroute', 'A', 'iptables dan penggantinya (nftables) adalah kerangka kerja firewall bawaan kernel Linux (Netfilter) yang mengelola aturan penyaringan, pengalihan, dan modifikasi paket jaringan.'),
('q_m3_09', 3, 'Pada konfigurasi iptables Linux, rantai (chain) aturan yang bertugas menyaring paket data yang masuk dan ditujukan khusus untuk mesin server itu sendiri adalah...', 'Chain INPUT', 'Chain OUTPUT', 'Chain FORWARD', 'Chain PREROUTING', 'A', 'Chain INPUT menangani paket yang memiliki alamat tujuan IP mesin lokal server tersebut, Chain FORWARD menangani paket yang dilewatkan/dirutekan, dan Chain OUTPUT untuk paket yang keluar dari server.'),
('q_m3_10', 3, 'Perbedaan utama antara tindakan DROP dan REJECT pada firewall ketika menolak paket data yang tidak sah adalah...', 'DROP membuang paket secara diam-diam tanpa balasan ke pengirim, sedangkan REJECT membuang paket dan mengirim pesan kesalahan (ICMP) ke pengirim.', 'DROP merusak kabel jaringan, sedangkan REJECT mematikan router.', 'DROP mengizinkan paket lewat, sedangkan REJECT menggandakan paket.', 'DROP hanya berlaku untuk protokol HTTP, sedangkan REJECT untuk SSH.', 'A', 'DROP membuang paket seketika (silent discard) sehingga penyerang mengalami timeout dan sulit mendeteksi keberadaan target. REJECT membuang paket namun mengembalikan paket penolakan (ICMP unreachable/TCP RST).'),
('q_m3_11', 3, 'Firewall tipe Stateful Inspection memiliki keunggulan dibandingkan Stateless Packet Filtering biasa karena...', 'Mengingat dan melacak status tabel koneksi (State Table) aktif dari awal hingga akhir sesi transmisi.', 'Tidak membutuhkan listrik untuk beroperasi.', 'Bisa membaca file PDF tanpa Adobe Acrobat.', 'Hanya bisa dipakai pada satu komputer klien saja.', 'A', 'Stateful firewall memelihara tabel status koneksi (SYN, ESTABLISHED, RELATED), sehingga paket balasan dari sesi yang sah diizinkan masuk otomatis tanpa perlu membuka port secara manual dari arah luar.'),
('q_m3_12', 3, 'Port standar jaringan yang digunakan oleh layanan Domain Name System (DNS) untuk menerjemahkan nama domain website menjadi alamat IP adalah port...', 'Port 53 (UDP/TCP)', 'Port 80 (HTTP)', 'Port 21 (FTP)', 'Port 25 (SMTP)', 'A', 'Port 53 adalah port baku protokol DNS yang menangani penerjemahan alamat hostname/domain ke alamat IP numerik yang dapat dipahami perangkat jaringan.'),
('q_m3_13', 3, 'Fitur NAT (Network Address Translation) jenis Masquerading pada router gateway firewall berfungsi untuk...', 'Menerjemahkan banyak alamat IP privat jaringan lokal ke satu alamat IP publik agar semua klien dapat mengakses internet.', 'Memperbanyak virus di komputer siswa.', 'Menghapus konfigurasi router saat terjadi mati lampu.', 'Mengubah sinyal Wi-Fi menjadi frekuensi radio FM.', 'A', 'IP Masquerade (Source NAT) menyamarkan alamat IP privat klien internal di balik satu alamat IP publik gateway ketika paket melintasi perbatasan ke jaringan internet.'),
('q_m3_14', 3, 'Layanan Secure Shell (SSH) untuk remote administrasi server menggunakan port default nomor...', 'Port 22', 'Port 23', 'Port 80', 'Port 443', 'A', 'SSH (Secure Shell) secara default beroperasi pada port 22, menggantikan protokol Telnet yang tidak aman dengan menyediakan saluran komunikasi terenkripsi penuh.'),
('q_m3_15', 3, 'Sebuah server web di laboratorium sekolah hanya boleh diakses menggunakan peramban web aman HTTPS. Aturan firewall paling tepat yang harus diterapkan adalah...', 'ALLOW TCP Port 443 dan BLOCK port layanan lain yang tidak digunakan (Default Deny).', 'ALLOW semua port dari 1 sampai 65535.', 'BLOCK Port 443 dan buka Port 23 Telnet.', 'Matikan router setiap kali ada akses masuk.', 'A', 'Konfigurasi paling aman adalah membuka hanya port yang dibutuhkan (Port 443 TCP untuk HTTPS) dan menerapkan kebijakan default block untuk seluruh port layanan lainnya guna mempersempit bidang serangan (attack surface).')
ON DUPLICATE KEY UPDATE `pertanyaan` = VALUES(`pertanyaan`);

