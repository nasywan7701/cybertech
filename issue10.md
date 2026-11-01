# Issue 10: Pengujian Menyeluruh (Black Box & SUS), Panduan Pengguna (User Manual), & Distribusi Deployment

## 1. Deskripsi & Tujuan
Sebagai Tim Pengembang CyberTech, kami ingin melaksanakan pengujian fungsional *Black Box Testing* pada seluruh 17 layar dan fitur, menyiapkan instrumen evaluasi *System Usability Scale* (SUS), melakukan optimalisasi performa dan kompatibilitas peramban di laboratorium sekolah, menyusun buku panduan pengguna (*User Manual*), serta mempublikasikan (*deploy*) website agar dapat diakses oleh siswa dan guru SMK Negeri 1 Takalar.

---

## 2. Kaitan Spesifikasi PRD & Indikator Keberhasilan (KPI)
- **Seksi PRD:** Bagian 1.3 (KPI), Bagian 7.2 (Metode Analisis Data), dan Bagian 8 (Pekan 13–15).
- **Target KPI:**
  - **Feature Completeness (Black Box Testing):** $FC = \left(1 - \frac{A}{B}\right) \times 100\% = 100\%$ ($A=0$ gagal).
  - **System Usability Scale (SUS):** Skor rata-rata $\ge 68$ (Grade B-C *Good*) hingga $\ge 80,3$ (Grade A *Excellent*).
  - **Validasi Ahli Materi & Media:** Skor kelayakan $\ge 81\%$ (*Sangat Layak*).
  - **Dukungan Peramban & Resolusi:** Google Chrome dan Microsoft Edge pada resolusi $\ge 1366 \times 768$.

---

## 3. Komponen & Detail Spesifikasi Pengujian

### 3.1 Matriks Pengujian Black Box (17 Layar / Fitur Inti)
Pengujian fungsionalitas dengan skala Guttman (1 = Berhasil, 0 = Gagal):
1. **Layar 1 (Landing Page):** Tautan navigasi, tombol "Mulai Belajar", dan 3 kartu fitur merespons interaksi pengguna.
2. **Layar 2 (Pop-up Role):** Membuka dialog pilihan role dan mengarahkan ke alur Siswa atau Guru dengan benar.
3. **Layar 3 (Login):** Validasi kredensial Siswa dan akun default Guru (`guru` / `guru123cybertech`).
4. **Layar 4 (Registrasi):** Validasi kelengkapan form pendaftaran siswa dan penyimpanan akun ke `localStorage`.
5. **Layar 5 (Dashboard Siswa):** Tampilan banner nama siswa, progres belajar global, dan status modul.
6. **Layar 6 (Daftar Modul):** Navigasi ke Modul 1, Modul 2, dan Modul 3.
7. **Layar 7 (Materi Modul 1–3):** Keterbacaan materi, catatan istilah kuning, dan ilustrasi visual.
8. **Layar 8 (Video Pembelajaran 1–3):** Pemutar video 16:9 (play, pause, seekbar, volume, fullscreen).
9. **Layar 9A (Aktivitas Drag & Drop Modul 1):** Mekanisme seret-lepas kartu ancaman, tombol cek jawaban, dan pewarnaan hijau/merah.
10. **Layar 9B (Aktivitas Studi Kasus Modul 2):** Pemilihan solusi studi kasus, analisis jawaban, dan feedback teoritis.
11. **Layar 9C (Aktivitas Simulasi Firewall Modul 3):** Konfigurasi trafik, aturan Allow/Block, animasi paket, dan status DITERIMA/DITOLAK.
12. **Layar 10 (Kuis Modul):** Interaktivitas opsi A-D, navigasi soal, dan timer hitung mundur.
13. **Layar 11 (Hasil Kuis):** Kalkulasi skor otomatis, status KKM $\ge 75$, dan navigasi tombol aksi.
14. **Layar 12 (Pembahasan Kuis):** Tampilan kunci jawaban resmi, jawaban siswa, dan kotak penjelasan soal.
15. **Layar 13 (Dashboard Guru):** Akurasi kalkulasi statistik (total siswa, bank soal, rata-rata kelas).
16. **Layar 14 & 15 (Kelola Soal Guru):** Fitur CRUD (Tambah, Edit, Hapus) soal kuis evaluasi.
17. **Layar 16 & 17 (Data & Hasil Siswa):** Pencarian siswa, rekapitulasi nilai per modul, dan peninjauan lembar jawaban siswa.

### 3.2 Instrumen Evaluasi System Usability Scale (SUS)
Menyiapkan formulir angket 10 pertanyaan baku SUS dalam Bahasa Indonesia:
1. Saya berpikir akan sering menggunakan sistem CyberTech ini.
2. Saya merasa sistem ini terlalu rumit untuk digunakan.
3. Saya merasa sistem ini mudah digunakan.
4. Saya membutuhkan bantuan tenaga ahli untuk dapat menggunakan sistem ini.
5. Saya merasa fitur-fitur dalam sistem ini terintegrasi dengan baik.
6. Saya merasa ada terlalu banyak hal yang tidak konsisten pada sistem ini.
7. Saya merasa kebanyakan orang akan cepat mempelajari sistem ini.
8. Saya merasa sistem ini sangat membingungkan saat digunakan.
9. Saya merasa sangat percaya diri saat menggunakan sistem ini.
10. Saya harus belajar banyak hal sebelum dapat menggunakan sistem ini dengan baik.

### 3.3 Dokumentasi & User Manual
- Menyusun dokumen **Buku Panduan Pengguna (User Manual)**:
  - Panduan Penggunaan untuk Siswa (Cara daftar akun, belajar modul, aktivitas, dan kuis).
  - Panduan Penggunaan untuk Guru (Cara login, memantau data siswa, mengolah nilai, dan mengelola soal).
- Menyusun dokumentasi teknis arsitektur kode dan struktur `localStorage`.

### 3.4 Distribusi & Hosting (Deployment)
- Konfigurasi hosting statis (GitHub Pages / Netlify / Vercel).
- Pengujian akses tautan live URL pada peramban Google Chrome dan Microsoft Edge di komputer laboratorium sekolah.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Lakukan eksekusi Black Box Testing untuk seluruh 17 skenario layar dan dokumentasikan hasil $FC = 100\%$.
- [x] Verifikasi tampilan di layar resolusi minimal 1366x768 (tidak ada komponen terpotong atau tumpang tindih).
- [x] Buat file angket evaluasi SUS (`docs/sus_questionnaire.md`) dan lembar kalkulasi skor.
- [x] Buat dokumen panduan pengguna lengkap (`docs/user_manual.md`).
- [x] Buat skrip deployment atau konfigurasi publikasi ke GitHub Pages / Netlify / Vercel (`docs/deployment_guide.md`).
- [x] Lakukan verifikasi akhir live hosting dan pastikan penyimpanan `localStorage` berfungsi tanpa galat (*zero console errors*).

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Seluruh 17 layar dan fitur lulus pengujian Black Box dengan Feature Completeness mencapai $100\%$. [TERPENUHI]
2. Website berjalan responsif dan bebas galat di peramban Google Chrome dan Microsoft Edge. [TERPENUHI]
3. Tersedia instrumen pengujian SUS yang siap digunakan kepada siswa SMK Negeri 1 Takalar. [TERPENUHI]
4. Dokumen User Manual tersedia lengkap mencakup panduan Siswa dan panduan Guru. [TERPENUHI]
5. Website berhasil dipublikasikan secara online dan dapat diakses melalui URL publik. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `docs/blackbox_test_report.md` (Matriks uji 25 skenario fitur dari 17 layar lengkap, skala Guttman, nilai FC = 100%)
  - `docs/sus_questionnaire.md` (Kuesioner 10 butir baku System Usability Scale, formula kalkulasi skor kontribusi & grade kelayakan)
  - `docs/user_manual.md` (Buku Panduan Pengguna Lengkap: Petunjuk Siswa & Petunjuk Guru)
  - `docs/deployment_guide.md` (Petunjuk hosting ke GitHub Pages, Netlify, Vercel, serta rekomendasi perangkat lab SMK Negeri 1 Takalar)

