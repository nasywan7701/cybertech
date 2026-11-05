# Issue 2: Landing Page, Pop-up Pemilihan Role, & Alur Autentikasi (Login & Registrasi)

## 1. Deskripsi & Tujuan
Sebagai Pengguna Baru atau Pengguna Terdaftar (Siswa/Guru), saya ingin melihat halaman beranda publik **CyberTech** yang menarik, memahami garis besar pembelajaran keamanan jaringan, memilih peran (*role*), serta melakukan pendaftaran akun (khusus Siswa) atau login langsung (Siswa & Guru) agar dapat masuk ke portal belajar atau portal mengajar.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 4.1, 4.2, dan Bagian 5 (Layar 1 – 4).
- **Aset & Layar Terkait:**
  - `1. Landing Page/Halaman Utama.png`
  - `4. Pilih Role Pengguna.png` / `2. Pilih Role Pengguna.png`
  - `3. Login.png`
  - `2. Registrasi (Daftar Akun).png` / `4. Registrasi (Daftar Akun).png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 1: Landing Page (`index.html`)
- **Top Navigation Bar:**
  - Sebelah kiri: Logo / Brand teks **CyberTech** (`Poppins Bold`, `#0B2545`).
  - Sebelah kanan: Menu tautan **Beranda > Tentang > Modul > Login** (`Poppins Medium 16px`).
- **Hero Section:**
  - Judul Utama: `Poppins 60px Bold`, warna `#0B2545`.
  - Teks Pendukung: Deskripsi media pembelajaran interaktif keamanan jaringan SMK Negeri 1 Takalar (`Poppins 16px Regular`, `#1B2A41`).
  - Ilustrasi Grafis Keamanan Jaringan di sisi kanan.
  - Tombol Utama (CTA): **"Mulai Belajar"** (`#134074`, aksen `#00B4D8`).
- **Bagian Bawah (3 Kartu Pilihan Fitur):**
  1. **Materi Interaktif** (Sebelah Kiri)
  2. **Video Pembelajaran** (Bagian Tengah)
  3. **Kuis dan Simulasi** (Sebelah Kanan)
  - Desain kartu: Latar putih (`#FFFFFF`), border halus, hover efek bayangan, ikon tematik keamanan.
- **Section Tambahan (Tentang & Modul):**
  - Seksi *Tentang*: Menjelaskan tujuan media untuk SMK Negeri 1 Takalar (teori konstruktivisme & prinsip Mayer).
  - Seksi *Sekilas Modul*: Ringkasan Modul 1, 2, dan 3.

### 3.2 Layar 2: Pop-up Pilih Role Pengguna (Modal Dialog)
- Muncul sebagai modal *overlay* ketika:
  - Tombol **"Mulai Belajar"** diklik.
  - Salah satu dari **3 Kartu Fitur** diklik saat belum ada sesi login.
  - Menu navigasi **"Login"** diklik.
- Memuat 2 opsi kartu pilihan yang kontras dengan ikon & aksen Sian (`#00B4D8`):
  1. **Login sebagai Siswa** (mengarahkan ke login siswa).
  2. **Login sebagai Guru** (mengarahkan ke login guru).
- Tombol *close* (`×`) di sudut kanan atas untuk menutup pop-up.

### 3.3 Layar 3: Halaman / Form Login (`login.html` atau modal/page view)
- Input field:
  - **Username / Email**
  - **Password**
- Lencana role aktif (misal: "Login Siswa" atau "Login Guru").
- Tombol aksi utama: **"Login"** (`#134074`).
- Tautan bawah untuk Siswa: **"Belum punya akun? Buat Akun"**.
- Kredensial default Guru:
  - Username: `guru`
  - Password: `guru123cybertech`

### 3.4 Layar 4: Halaman / Form Registrasi Siswa (`register.html`)
- Formulir berurutan dari atas ke bawah:
  1. **Nama Lengkap**
  2. **Email**
  3. **Password**
  4. **Konfirmasi Password**
- Tombol aksi: **"Daftar Akun"**.
- Tautan kembali ke login: **"Sudah punya akun? Login di sini"**.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Rancang struktur semantic HTML pada `index.html` (Navbar, Hero Section, 3 Feature Cards, About Section, Footer).
- [x] Beri styling pada `assets/css/landing.css` sesuai palet `#0B2545`, `#134074`, `#00B4D8`, `#F3F7FB`.
- [x] Implementasikan Modal Pop-up Role Pengguna (HTML markup & interaksi toggle buka/tutup).
- [x] Hubungkan event listener klik tombol "Mulai Belajar", menu "Login", dan 3 kartu fitur agar membuka modal role jika belum ada sesi pengguna.
- [x] Buat halaman atau tampilan form `login.html` dan `register.html` lengkap dengan styling kartu tengah dan input label `Poppins 14px`.
- [x] Integrasikan `auth.js`:
  - Validasi form registrasi (cek format email, kecocokan konfirmasi password, nama tidak kosong).
  - Simpan akun siswa baru ke `cybertech_users` di `localStorage`.
  - Validasi login sesuai role: jika Siswa arahkan ke `student/dashboard.html`, jika Guru arahkan ke `teacher/dashboard.html`.
  - Tampilkan pesan kesalahan yang jelas jika username atau password salah.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Halaman Landing Page tampil responsif dan proporsional pada resolusi minimal 1366x768. [TERPENUHI]
2. Mengklik "Mulai Belajar", tombol "Login", atau salah satu dari 3 kartu fitur sukses memunculkan pop-up pemilihan role. [TERPENUHI]
3. Memilih "Login sebagai Guru" dan memasukkan kredensial default berhasil diarahkan ke Dashboard Guru. [TERPENUHI]
4. Siswa baru dapat mendaftarkan akun dengan 4 field input yang divalidasi, data tersimpan di storage, dan langsung diarahkan ke Dashboard Siswa. [TERPENUHI]
5. Tombol penutup modal role berfungsi dengan mulus. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `index.html` (Landing Page Layar 1 & Pop-up Modal Role Pengguna Layar 2)
  - `login.html` (Halaman Login Siswa & Guru Layar 3 dengan query parameter role support)
  - `register.html` (Halaman Registrasi Siswa Layar 4 dengan 4 isian wajib dan validasi instan)
  - `assets/css/landing.css` (Styling hero section, 3 feature cards, modul preview, modal role)
  - `assets/css/auth.css` (Styling kartu formulir autentikasi, role toggle tabs, demo hint)
  - `assets/js/landing.js` (Event listener modal role selector & auth gating pada tombol/kartu)

