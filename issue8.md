# Issue 8: Portal Guru - Dashboard Statistik, Direktori Data Siswa, & Rekapitulasi Hasil Evaluasi

## 1. Deskripsi & Tujuan
Sebagai Guru Mata Pelajaran Administrasi Sistem Jaringan, saya ingin mengakses Dashboard Guru yang menampilkan ringkasan performa kelas, mengelola direktori data siswa terdaftar, memfilter serta meninjau rekapitulasi hasil evaluasi siswa untuk diolah menjadi nilai akhir, dan memperbarui profil akun guru.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 2.2, 4.4, dan Bagian 5 (Layar 13, 16, 17).
- **Aset & Layar Terkait:**
  - `13. Dashboard Guru.png`
  - `16. Data Siswa.png`
  - `17. Hasil Kuis Siswa.png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 13: Dashboard Guru (`teacher/dashboard.html`)
- **Sidebar Guru (`#0B2545`):**
  - Brand header: **CyberTech - Portal Guru**.
  - Menu vertikal berurut:
    1. **Dashboard** (Aktif)
    2. **Kelola Kuis** (`teacher/manage-quizzes.html`)
    3. **Data Siswa** (`teacher/students.html`)
    4. **Hasil Kuis Siswa** (`teacher/results.html`)
    5. **Profil Guru** (`teacher/profile.html`)
  - Tombol **Logout** di bagian bawah.
- **Area Konten Utama (`#F3F7FB`):**
  - Banner informasi guru pengampu.
  - **4 Kartu Metrik / Statistik:**
    1. *Total Siswa Terdaftar* (dihitung otomatis dari `cybertech_users` bertipe siswa).
    2. *Total Soal Aktif* (dihitung dari seluruh soal di Modul 1, 2, dan 3).
    3. *Rata-rata Nilai Kelas* (dihitung dari seluruh hasil kuis siswa yang telah diserahkan).
    4. *Tingkat Ketuntasan Kelas* (persentase siswa yang mencapai skor $\ge 75$).
  - **Tabel Pengerjaan Kuis Terbaru:** Menampilkan 5 aktivitas submit kuis terakhir oleh siswa.

### 3.2 Layar 16: Halaman Direktori Data Siswa (`teacher/students.html`)
- **Bilah Kontrol Atas:**
  - Kotak pencarian (*Search Bar*) siswa berdasarkan Nama atau Email secara *real-time*.
  - Indikator total siswa terdaftar.
- **Tabel Data Siswa:**
  - Kolom: No, Nama Lengkap Siswa, Email/Username, Kelas (XI/XII TJKT SMK Negeri 1 Takalar), Status Progres Modul (M1, M2, M3), dan Kolom Aksi.
  - Tombol Aksi **"Lihat Detail"**:
    - Membuka modal informasi lengkap profil siswa, riwayat nilai kuis, dan tanggal pendaftaran.

### 3.3 Layar 17: Halaman Rekapitulasi Hasil Kuis Siswa (`teacher/results.html`)
- **Filter Pilihan Modul:**
  - Tab / Dropdown filter: **Semua Modul**, **Modul 1 (Ancaman Jaringan)**, **Modul 2 (Sistem Keamanan)**, **Modul 3 (Firewall)**.
- **Tabel Rekapitulasi Nilai Siswa:**
  - Kolom:
    1. No
    2. Nama Siswa
    3. Modul
    4. Skor Nilai (0 - 100)
    5. Status KKM (Badge Hijau `Tuntas` jika $\ge 75$, Merah `Belum Tuntas` jika $< 75$)
    6. Tanggal & Waktu Submit
    7. Aksi: Tombol **"Lihat Lembar Jawaban"**
- **Modal Lembar Jawaban Siswa:**
  - Menampilkan lembar jawaban yang dikirim oleh siswa bersangkutan beserta kunci jawaban dan pembahasan untuk diverifikasi oleh guru.
- Fitur pendukung: Tombol **"Cetak / Ekspor Rekap Nilai"** (fitur cetak via window.print atau download CSV sederhana untuk kebutuhan administrasi nilai guru).

### 3.4 Halaman Profil Guru (`teacher/profile.html`)
- Informasi akun guru: Nama Lengkap, NIP/Identitas Guru, Email.
- Form ubah avatar foto profil.
- Form ubah password akun guru.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat layout template dasar portal guru dengan Sidebar khusus peran Guru.
- [x] Pasang route guard di file JavaScript guru: jika sesi tidak ada atau role bukan `guru`, tolak akses dan arahkan ke `index.html`.
- [x] Implementasikan `teacher/dashboard.html` dengan kartu-kartu ringkasan metrik statistik yang dihitung dinamis dari `localStorage`.
- [x] Implementasikan `teacher/students.html` dengan fitur pencarian dan modal detail profil capaian siswa.
- [x] Implementasikan `teacher/results.html` dengan filter modul, tabel rekapitulasi, dan modal peninjauan lembar jawaban siswa.
- [x] Buat fungsi ekspor / cetak rekap nilai siswa ke format cetak bersih.
- [x] Implementasikan halaman `teacher/profile.html` untuk pembaruan profil dan kata sandi guru.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Guru yang login dapat melihat statistik riil jumlah siswa, total soal, dan rata-rata skor kelas. [TERPENUHI]
2. Fitur pencarian data siswa bekerja secara cepat dan menyaring tabel tanpa perlu memuat ulang halaman. [TERPENUHI]
3. Guru dapat memfilter hasil kuis berdasarkan Modul 1, Modul 2, atau Modul 3. [TERPENUHI]
4. Guru dapat membuka modal lembar jawaban siswa untuk meninjau butir-butir jawaban yang dipilih. [TERPENUHI]
5. Perubahan profil dan password guru berhasil disimpan di `localStorage`. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `teacher/dashboard.html` (Layar 13: 4 Kartu metrik total siswa, bank soal, rata-rata kelas, tingkat ketuntasan KKM, tabel pengerjaan kuis terbaru)
  - `teacher/students.html` (Layar 16: Direktori data siswa SMK Negeri 1 Takalar, real-time search bar, modal profil & riwayat capaian siswa)
  - `teacher/results.html` (Layar 17: Filter modul 1-3, tabel rekapitulasi nilai evaluasi siswa, modal peninjauan lembar jawaban, fitur print/ekspor PDF)
  - `teacher/profile.html` (Identitas guru pengampu ASJ, NIP, pembaruan kata sandi)
  - `teacher/css/teacher.css` (Styling khusus portal guru, kartu metrik, print view)
  - `teacher/js/teacher-common.js` (Route guard `guru`, binding nama/NIP guru di header, konfirmasi logout)

