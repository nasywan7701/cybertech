# Issue 3: Portal Siswa - Dashboard, Sidebar Navigasi, Katalog Daftar Modul, & Profil Siswa

## 1. Deskripsi & Tujuan
Sebagai Siswa, saya ingin memiliki area kerja (Dashboard) yang menyajikan identitas saya, ringkasan capaian belajar, sidebar navigasi yang konsisten, katalog lengkap 3 modul pembelajaran, serta halaman profil untuk memperbarui data diri dan kata sandi.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 2.1, 4.3, dan Bagian 5 (Layar 5 & Layar 6).
- **Aset & Layar Terkait:**
  - `5. Dashboard siswa.png`
  - `CARD 1_ Modul 1 (100% Selesai).png`
  - `6. Daftar Modul.png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 5: Dashboard Siswa (`student/dashboard.html`)
- **Sidebar Navigasi Kiri (`#0B2545`):**
  - Brand header: **CyberTech** (dengan aksen Sian `#00B4D8`).
  - Menu vertikal berurut dari atas ke bawah:
    1. **Beranda** (aktif: background `#134074`, border kiri `#00B4D8`)
    2. **Modul Pembelajaran** (`student/modules.html`)
    3. **Aktivitas** (Hasil Kuis & Riwayat Nilai) (`student/activity.html`)
    4. **Profil** (`student/profile.html`)
  - Tombol **Logout** di bagian bawah sidebar dengan dialog konfirmasi keluar.
- **Area Konten Utama (`#F3F7FB`):**
  - **Banner Sambutan:** Menyapa nama siswa aktif (misal: *"Selamat Datang, [Nama Siswa]! Siap mempelajari Keamanan Jaringan hari ini?"*).
  - **Bilah Progres Global:** Menghitung total persentase penyelesaian materi dan kuis dari ketiga modul ($0\%\text{--}100\%$).
  - **Kartu Ringkasan Modul:**
    - Modul 1: Identifikasi Ancaman Jaringan (Persentase, badge status "Belum Dimulai" / "Sedang Dipelajari" / "Selesai" `#2BB673`).
    - Modul 2: Analisis Sistem Keamanan Jaringan.
    - Modul 3: Firewall.
  - **Aktivitas Terakhir:** Menampilkan skor kuis terakhir atau modul yang baru saja diakses.

### 3.2 Layar 6: Daftar Modul Pembelajaran (`student/modules.html`)
- Menampilkan 3 kartu modul besar:
  - **Modul 1: Identifikasi Ancaman Jaringan**
    - Target: Mengklasifikasikan 4 ancaman (*Virus, Worm, Phishing, DDoS*).
    - Indikator: Video, Materi, Drag & Drop, Kuis.
  - **Modul 2: Analisis Sistem Keamanan Jaringan**
    - Target: Menganalisis 4 sistem keamanan (*Antivirus, Firewall, VPN, Autentikasi*).
    - Indikator: Infografis, Materi, Studi Kasus, Kuis.
  - **Modul 3: Firewall**
    - Target: Menerapkan aturan *Allow* / *Block* dan analisis lalu lintas data.
    - Indikator: Animasi Alur Paket, Simulasi Firewall, Kuis.
- Tiap kartu dilengkapi bilah progres per modul, lencana status ketuntasan, dan tombol aksi utama **"Mulai Belajar" / "Lanjutkan"**.

### 3.3 Halaman Profil Siswa (`student/profile.html`)
- Menampilkan informasi akun: Nama Lengkap, Email, Kelas (TJKT SMK Negeri 1 Takalar).
- Fitur ubah Avatar / Foto Profil (pilihan avatar preset atau upload gambar data URL).
- Formulir Ubah Password:
  - Password Lama
  - Password Baru
  - Konfirmasi Password Baru
- Tombol **"Simpan Perubahan"** yang langsung memperbarui record di `localStorage`.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat layout template dasar portal siswa dengan Sidebar Kiri dan Header Status Pengguna.
- [x] Tambahkan route guard di file JavaScript siswa: jika belum login atau role bukan `siswa`, alihkan otomatis ke `index.html`.
- [x] Implementasikan tampilan `student/dashboard.html` dengan kartu banner dan metrik progres dinamis dari `localStorage`.
- [x] Implementasikan tampilan `student/modules.html` dengan grid 3 kartu modul sesuai spesifikasi Hi-Fi.
- [x] Implementasikan halaman `student/profile.html` beserta logika pembaruan foto dan penggantian kata sandi.
- [x] Tambahkan logika fungsi **Logout** yang membersihkan sesi pengguna di `localStorage` dan meredirect kembali ke landing page.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Siswa yang login dapat melihat nama lengkap mereka di banner sambutan dan header profil. [TERPENUHI]
2. Sidebar memiliki 4 menu vertikal berurutan (Beranda, Modul Pembelajaran, Aktivitas, Profil) serta tombol Logout. [TERPENUHI]
3. Menu aktif memiliki sorotan warna yang sesuai panduan desain (`#134074` dan `#00B4D8`). [TERPENUHI]
4. Halaman Daftar Modul menampilkan 3 modul lengkap dengan deskripsi, status progres, dan tombol pengarah ke modul masing-masing. [TERPENUHI]
5. Perubahan password dan avatar pada halaman profil tersimpan dengan benar di `localStorage`. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `student/dashboard.html` (Layar 5: Banner sambutan, bilah progres global, status 3 modul, riwayat aktivitas kuis)
  - `student/modules.html` (Layar 6: Katalog 3 modul besar, rincian CP & TP, tag fitur, progress track)
  - `student/activity.html` (Daftar rekapitulasi nilai evaluasi kuis siswa & status kelulusan KKM $\ge 75$)
  - `student/profile.html` (Identitas siswa SMK Negeri 1 Takalar, selector avatar preset, ganti kata sandi)
  - `student/css/student.css` (Styling antarmuka portal siswa, status card selesai hijau `#2BB673`, katalog modul)
  - `student/js/student-common.js` (Route guard `siswa`, binding data profil, helper kalkulasi progres global, logout handler)

