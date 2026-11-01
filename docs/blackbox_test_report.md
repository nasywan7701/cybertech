# LAPORAN PENGUJIAN SISTEM (BLACK BOX TESTING)
## Sistem Multimedia Pembelajaran Interaktif: CyberTech

- **Produk:** Website Multimedia Pembelajaran CyberTech
- **Target Pengguna:** Siswa & Guru Jurusan TJKT (TKJ) SMK Negeri 1 Takalar
- **Metode Pengujian:** Black Box Testing (Skala Guttman: 1 = Berhasil / Sesuai, 0 = Gagal)
- **Standar Pengujian:** ISO/IEC 25010 (Feature Completeness)
- **Lingkungan Pengujian:** Google Chrome 128 & Microsoft Edge 128 (Resolusi Layar $1366 \times 768$ & $1920 \times 1080$)
- **Tanggal Pengujian:** 29 Oktober 2026

---

## 1. Rumus Kalkulasi Feature Completeness (FC)

Berdasarkan dokumen Product Requirements Document (PRD) Seksi 7.2:
$$FC = \left(1 - \frac{A}{B}\right) \times 100\%$$

Di mana:
- $A$ = Jumlah fitur / skenario yang gagal atau tidak sesuai
- $B$ = Total seluruh butir fitur / skenario yang diuji
- Target Keberhasilan = $FC = 100\%$

---

## 2. Matriks Hasil Pengujian Fungsional (17 Layar Lengkap)

| No | Kode Layar | Fitur / Skenario yang Diuji | Hasil yang Diharapkan | Status | Skor |
| :---: | :--- | :--- | :--- | :---: | :---: |
| 1 | **Layar 1** | Navigasi Navbar & Hero Landing Page (`index.html`) | Tautan Beranda, Tentang, Modul merespons mulus. Hero section tampil proporsional pada resolusi $1366 \times 768$. | Berhasil | 1 |
| 2 | **Layar 1** | Auth Gate pada Tombol "Mulai Belajar" & 3 Kartu Fitur | Mengklik CTA atau kartu fitur saat belum login langsung memunculkan pop-up modal role pengguna. | Berhasil | 1 |
| 3 | **Layar 2** | Pop-up Modal Pilih Role Pengguna (`#roleModal`) | Muncul modal dengan opsi "Login sebagai Siswa" dan "Login sebagai Guru", tombol close (×) berfungsi. | Berhasil | 1 |
| 4 | **Layar 3** | Login Siswa & Role Switching (`login.html`) | Siswa dapat login dengan username/password yang valid, tab switch antara siswa/guru merespons. | Berhasil | 1 |
| 5 | **Layar 3** | Login Guru *Pre-provisioned* (`login.html?role=guru`) | Guru dapat login langsung menggunakan kredensial default (`guru` / `guru123cybertech`) ke Dashboard Guru. | Berhasil | 1 |
| 6 | **Layar 4** | Registrasi Siswa Baru Mandiri (`register.html`) | Form 4 isian wajib (Nama, Email, Password, Konfirmasi) tervalidasi dengan benar dan data tersimpan di storage. | Berhasil | 1 |
| 7 | **Layar 5** | Dashboard Siswa (`student/dashboard.html`) | Menampilkan banner selamat datang nama siswa, bilah progres belajar global, dan kartu status 3 modul. | Berhasil | 1 |
| 8 | **Layar 5** | Sidebar Navigasi Portal Siswa | Sidebar kiri `#0B2545` memuat 4 menu berurut (Beranda, Modul, Aktivitas, Profil) dan tombol Logout. | Berhasil | 1 |
| 9 | **Layar 6** | Katalog Daftar Modul (`student/modules.html`) | Menampilkan 3 kartu modul besar lengkap dengan deskripsi TP, indikator media, dan tombol mulai belajar. | Berhasil | 1 |
| 10 | **Layar 7** | Modul 1: Materi Ancaman Jaringan (`module1-material.html`) | Materi 4 ancaman (Virus, Worm, Phishing, DDoS), kotak catatan kuning `#F5A524`, dan otomatis catat progres baca. | Berhasil | 1 |
| 11 | **Layar 8** | Modul 1: Pemutar Video 16:9 (`module1-video.html`) | Pemutar video bertema CyberTech (play/pause, seekbar, timer, reset) berjalan lancar dan catat progres tonton. | Berhasil | 1 |
| 12 | **Layar 9A** | Modul 1: Aktivitas Drag & Drop (`module1-activity.html`) | Kartu skenario dapat diseret-lepas ke 4 target, tombol Cek Jawaban memberi feedback hijau/merah, unlock kuis. | Berhasil | 1 |
| 13 | **Layar 7** | Modul 2: Materi Sistem Keamanan (`module2-material.html`) | Penjelasan Defense in Depth, tab infografis interaktif 4 sistem keamanan, tabel perbandingan spesifikasi. | Berhasil | 1 |
| 14 | **Layar 8** | Modul 2: Video Sistem Keamanan (`module2-video.html`) | Pemutar 16:9 visualisasi alur VPN, 2FA, firewall, dan antivirus berjalan mulus. | Berhasil | 1 |
| 15 | **Layar 9B** | Modul 2: Aktivitas Studi Kasus (`module2-activity.html`) | Menampilkan 3 skenario kasus nyata, validasi solusi dan feedback teoritis objektif, auto-unlock kuis. | Berhasil | 1 |
| 16 | **Layar 7** | Modul 3: Materi Firewall (`module3-material.html`) | Penjelasan packet filtering, prinsip Default Deny, dan diagram animasi transmisi paket bergerak. | Berhasil | 1 |
| 17 | **Layar 8** | Modul 3: Video Alur Firewall (`module3-video.html`) | Video simulasi alur pemeriksaan paket port 80, 443, 23, dan DDoS flood. | Berhasil | 1 |
| 18 | **Layar 9C** | Modul 3: Simulator Firewall Interaktif (`module3-activity.html`) | Skema 3 node (Client-Firewall-Server), seleksi trafik, tombol Allow/Block, animasi paket, pelacak 4 misi. | Berhasil | 1 |
| 19 | **Layar 10** | Mesin Kuis Evaluasi Modul (`student/quiz.html`) | Render soal dinamis, kartu opsi A-D interaktif, countdown timer 10 menit berkedip merah saat &lt; 2 menit. | Berhasil | 1 |
| 20 | **Layar 11** | Hero Scorecard Hasil Kuis (`student/quiz-result.html`) | Perhitungan skor otomatis, lencana status KKM (&ge; 75 hijau / &lt; 75 merah), statistik benar/salah. | Berhasil | 1 |
| 21 | **Layar 12** | Lembar Pembahasan Kuis (`student/quiz-review.html`) | Menampilkan ulasan per butir soal, penanda jawaban siswa (benar/salah), kunci resmi, dan kotak pembahasan. | Berhasil | 1 |
| 22 | **Layar 13** | Dashboard Guru (`teacher/dashboard.html`) | 4 Kartu metrik (total siswa, bank soal, rata-rata kelas, ketuntasan KKM) dan tabel aktivitas kuis terbaru. | Berhasil | 1 |
| 23 | **Layar 14-15** | Kelola Kuis & Editor Soal (`teacher/manage-quizzes.html`) | Fitur CRUD lengkap: Filter modul, Tambah Soal, Edit Soal, Hapus Soal dengan modal konfirmasi permanen. | Berhasil | 1 |
| 24 | **Layar 16** | Direktori Data Siswa (`teacher/students.html`) | Pencarian real-time nama/email, tabel siswa TJKT, modal profil detail & riwayat nilai per siswa. | Berhasil | 1 |
| 25 | **Layar 17** | Rekapitulasi Nilai & Print (`teacher/results.html`) | Filter nilai per modul, modal peninjauan lembar jawaban siswa, dan fitur cetak/ekspor PDF bersih. | Berhasil | 1 |

---

## 3. Kesimpulan Feature Completeness

- **Total Skenario Diuji ($B$):** $25$ butir pengujian
- **Jumlah Skenario Gagal ($A$):** $0$ butir
- **Hasil Perhitungan:**
  $$FC = \left(1 - \frac{0}{25}\right) \times 100\% = 100\%$$

> **Hasil Uji:** Seluruh 17 layar dan fitur aplikasi **CyberTech** lulus $100\%$ pengujian Black Box Testing sesuai rancangan PRD tanpa ada fungsionalitas yang gagal atau terputus.

