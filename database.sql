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

-- Modul 2
('q_m2_01', 2, 'Teknologi jaringan yang digunakan untuk menciptakan jalur komunikasi terenkripsi dan aman (terowongan privat) di atas jaringan internet publik adalah...', 'NAT (Network Address Translation)', 'DHCP (Dynamic Host Configuration Protocol)', 'VPN (Virtual Private Network)', 'DNS (Domain Name System)', 'C', 'VPN (Virtual Private Network) mengenkripsi seluruh paket pertukaran data antara perangkat klien dengan jaringan tujuan melalui mekanisme tunneling sehingga terlindung dari penyadapan pada Wi-Fi publik.'),
('q_m2_02', 2, 'Sistem pertahanan keamanan jaringan yang bertindak sebagai dinding penyaring antara jaringan internal sekolah dan internet berdasarkan seperangkat aturan yang telah ditentukan adalah...', 'Firewall', 'Switch Unmanaged', 'Repeater', 'Access Point', 'A', 'Firewall bertugas memeriksa seluruh lalu lintas data yang masuk dan keluar berdasarkan aturan (ruleset) keamanan untuk mengizinkan (Allow) atau menolak (Block) lalu lintas mencurigakan.'),
('q_m2_03', 2, 'Mengapa autentikasi dua faktor (2FA / Two-Factor Authentication) jauh lebih aman dibandingkan hanya menggunakan kata sandi biasa?', 'Karena 2FA mempercepat proses transfer file di jaringan lokal.', 'Karena 2FA membutuhkan dua bentuk verifikasi berbeda (misal: password dan kode OTP ke ponsel), sehingga peretas tetap gagal jika hanya mengetahui password.', 'Karena 2FA dapat menggantikan fungsi dari perangkat keras router.', 'Karena 2FA menghapus seluruh virus yang ada di dalam server web.', 'B', '2FA menambahkan lapisan perlindungan sekunder. Jika kata sandi (something you know) bocor, peretas tetap tidak bisa masuk tanpa faktor kedua seperti kode OTP dari ponsel (something you have).'),
('q_m2_04', 2, 'Jika sebuah perusahaan mempekerjakan teknisi jaringan jarak jauh (*work from home*) yang harus membuka file sensitif di server internal kantor, kombinasi keamanan paling tepat yang harus diterapkan adalah...', 'Cukup menggunakan kabel fiber optik tanpa password.', 'Membagikan folder publik di Google Drive tanpa enkripsi.', 'Koneksi melalui VPN terenkripsi dengan autentikasi multi-faktor (MFA).', 'Mematikan sistem firewall di kantor agar akses teknisi tidak lambat.', 'C', 'Kombinasi VPN untuk mengenkripsi jalur komunikasi publik dan MFA untuk memastikan identitas teknisi adalah standar keamanan industri dalam pengaksesan sumber daya internal secara jarak jauh.'),
('q_m2_05', 2, 'Perangkat lunak Antivirus pada komputer klien bekerja mendeteksi ancaman malware terutama menggunakan teknik...', 'Mencocokkan tanda tangan file (Signature-based detection) dan analisis perilaku mencurigakan (Heuristic analysis).', 'Mengukur suhu panas dari processor dan harddisk secara terus-menerus.', 'Menghitung jumlah kata yang diketik oleh pengguna keyboard.', 'Mengganti kartu jaringan dengan kartu nirkabel secara berkala.', 'A', 'Antivirus modern mengandalkan basis data signature virus yang diperbarui serta analisis heuristik untuk mengenali perilaku aplikasi yang abnormal atau berpotensi merusak sistem.'),

-- Modul 3
('q_m3_01', 3, 'Pada metode penyaringan paket (*Packet Filtering Firewall*), kriteria data apa saja yang biasanya diperiksa dalam header paket data?', 'Warna kabel jaringan dan merk kartu Ethernet.', 'IP Asal, IP Tujuan, Protokol (TCP/UDP), dan Port Tujuan.', 'Ukuran casing komputer dan kapasitas RAM server.', 'Nama lengkap pengguna dan tanggal lahir pembuat website.', 'B', 'Packet filtering memeriksa informasi pada layer 3 dan layer 4 OSI, mencakup alamat IP sumber dan tujuan, jenis protokol transport (TCP/UDP), serta nomor port layanan yang dituju.'),
('q_m3_02', 3, 'Protokol Telnet menggunakan port 23 dan mengirimkan data kredensial tanpa enkripsi (*plain text*). Tindakan konfigurasi firewall yang tepat untuk melindungi server sekolah adalah...', 'Membuat aturan ALLOW untuk port 23 dari seluruh internet.', 'Membuat aturan BLOCK pada port 23 dan mengarahkan manajemen server ke SSH (Port 22).', 'Menonaktifkan firewall saat proses login berlangsung.', 'Mengubah nama server menjadi Telnet Server.', 'B', 'Telnet sangat rentan terhadap sniffing karena tidak terenkripsi. Aturan firewall harus memblokir (BLOCK) port 23 dan menggantinya dengan SSH (Secure Shell) pada port 22 yang aman dan terenkripsi.'),
('q_m3_03', 3, 'Jika sebuah firewall dikonfigurasi dengan aturan "ALLOW TCP Port 443", jenis lalu lintas data apa yang diizinkan melewati firewall menuju server web?', 'Lalu lintas web terenkripsi yang aman (HTTPS).', 'Lalu lintas transfer file FTP tanpa sandi (Port 21).', 'Lalu lintas surat elektronik POP3 (Port 110).', 'Lalu lintas ping ICMP banjir DDoS.', 'A', 'Port 443 adalah port standar untuk protokol HTTPS (Hypertext Transfer Protocol Secure) yang memanfaatkan enkripsi TLS/SSL untuk mengamankan pertukaran data web.'),
('q_m3_04', 3, 'Prinsip keamanan firewall "Default Deny / Default Block" berarti...', 'Semua lalu lintas diizinkan secara default, kecuali yang diblokir oleh administrator.', 'Semua lalu lintas ditolak secara default, hanya lalu lintas yang secara eksplisit diizinkan (Allow) yang dapat lewat.', 'Firewall menolak semua koneksi termasuk koneksi administrator secara permanen.', 'Firewall dimatikan secara otomatis setiap pergantian jam pelajaran.', 'B', 'Prinsip Default Deny merupakan praktik terbaik keamanan siber: sistem memblokir semua lalu lintas data tak dikenal, dan hanya mengizinkan lalu lintas yang secara tegas didaftarkan pada aturan Allow.'),
('q_m3_05', 3, 'Apa yang terjadi pada paket data di jaringan ketika firewall menerapkan tindakan "BLOCK / DROP" terhadap paket tersebut?', 'Paket data digandakan lalu dikirim ke seluruh komputer di laboratorium.', 'Paket data dihentikan dan dibuang di gerbang firewall sehingga tidak sampai ke komputer target.', 'Paket data diubah menjadi video animasi.', 'Paket data dipercepat pengirimannya hingga 100 kali lipat.', 'B', 'Tindakan Block/Drop menghentikan paket berbahaya di perimeter firewall dan membuangnya dari antrean transmisi, melindungi server di balik firewall dari potensi serangan atau eksploitasi.')
ON DUPLICATE KEY UPDATE `pertanyaan` = VALUES(`pertanyaan`);

