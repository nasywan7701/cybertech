# Issue 1: Fondasi Proyek, Design System (CSS Tokens), & State Management (Local Data Layer)

## 1. Deskripsi & Tujuan
Sebagai Pengembang Sistem **CyberTech**, saya ingin menyiapkan arsitektur dasar proyek, struktur direktori, standardisasi desain sistem (warna, tipografi Poppins, komponen kartu), serta pustaka state management berbasis `localStorage`. Hal ini bertujuan agar seluruh modul antarmuka dan logika sistem memiliki fondasi yang konsisten, modular, dan siap dikembangkan secara bertahap.

---

## 2. Kaitan Spesifikasi PRD
- **Seksi PRD:** Bagian 6 (Design System Specification) & Bagian 7.1 (Spesifikasi Teknis).
- **Tipografi:** Google Font *Poppins* (Regular 400, Medium 500, SemiBold 600, Bold 700).
- **Palet Warna Utama & Semantik:**
  - Biru Malam (Primer): `#0B2545`
  - Biru Tua (Sekunder): `#134074`
  - Sian (Aksen): `#00B4D8`
  - Hijau (Semantik Benar/Allow): `#2BB673`
  - Merah (Semantik Salah/Block): `#E5484D`
  - Kuning (Semantik Catatan): `#F5A524`
  - Abu Biru Muda (Latar Belakang): `#F3F7FB`
  - Putih (Kartu/Panel): `#FFFFFF`
  - Teks Gelap (Isi): `#1B2A41`

---

## 3. Spesifikasi Teknis & Struktur File

### 3.1 Struktur Direktori Proyek
```text
cybertech-project/
├── index.html                      # Entry landing page
├── assets/
│   ├── css/
│   │   ├── variables.css           # CSS Variables (Warna, Tipografi, Shadow, Border-radius)
│   │   ├── base.css                # Reset, Typography & Layout Dasar
│   │   ├── components.css          # Tombol, Form, Modal, Card, Badge, Alert
│   │   └── layout.css              # Navbar, Sidebar, Topbar, Container
│   ├── js/
│   │   ├── storage.js              # Abstraksi localStorage & Seed Initial Data
│   │   ├── auth.js                 # Helper sesi user (Login, Logout, Guard)
│   │   └── utils.js                # Helper format waktu, notifikasi toast/modal
│   ├── images/
│   │   └── (placeholder aset gambar / ikon)
│   └── videos/
│       └── (placeholder video simulasi/materi)
```

### 3.2 Skema Data Awal (`storage.js`)
Sistem harus menginisialisasi seed data ke dalam `localStorage` bila belum ada:
- **`cybertech_users`**: Array pengguna.
  - Akun Guru *pre-provisioned*:
    ```json
    {
      "id": "guru-01",
      "username": "guru",
      "email": "guru@smkn1takalar.sch.id",
      "nama": "Guru Pembimbing TKJ",
      "password": "guru123cybertech",
      "role": "guru",
      "avatar": "assets/images/avatar-guru.png"
    }
    ```
- **`cybertech_modules`**: Data status progres 3 Modul.
- **`cybertech_quizzes`**: Bank soal bawaan untuk Modul 1, 2, dan 3 beserta kunci dan pembahasan.
- **`cybertech_results`**: Rekapitulasi hasil kuis siswa.
- **`cybertech_current_user`**: Sesi pengguna yang sedang aktif (null jika belum login).

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat struktur folder proyek (`assets/css`, `assets/js`, `assets/images`, `assets/videos`).
- [x] Buat file `assets/css/variables.css` mendefinisikan `:root` dengan hex code warna PRD dan font family Poppins.
- [x] Buat file `assets/css/base.css` untuk reset margin/box-sizing, import Google Fonts Poppins, konfigurasi ukuran heading (H1 60px, H2 32px, H3 20px, Body 16px line-height 1.6).
- [x] Buat file `assets/css/components.css` untuk styling tombol (Primary, Secondary, Success, Danger), form-group, input teks, modal overlay, card container, dan toast notifikasi.
- [x] Buat file `assets/js/storage.js` yang mencakup:
  - `initStorage()`: Inisialisasi akun guru default, bank soal default Modul 1–3, dan modul metadata.
  - Helper fungsi CRUD untuk `users`, `quizzes`, `results`, dan `moduleProgress`.
- [x] Buat file `assets/js/auth.js` yang menyediakan:
  - `login(usernameOrEmail, password, role)`
  - `registerStudent(nama, email, password)`
  - `logout()`
  - `getCurrentUser()`
  - `requireAuth(role)`: Proteksi halaman portal siswa/guru.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. CSS Variables mencakup seluruh kode warna yang tertera pada Bab 6.2 PRD tanpa perbedaan hex code. [TERPENUHI]
2. Tipografi memuat font Poppins dengan ukuran sesuai tabel 6.1 PRD. [TERPENUHI]
3. Saat web pertama kali dibuka, data akun guru *pre-provisioned* dan bank soal default otomatis tersimpan di `localStorage`. [TERPENUHI]
4. Fungsi `auth.js` dan `storage.js` dapat diakses dan diuji dengan sukses melalui konsol peramban (*developer tools*). [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `assets/css/variables.css` (Palet warna PRD & CSS design tokens)
  - `assets/css/base.css` (Font Poppins & global reset/typography)
  - `assets/css/components.css` (Tombol, kartu, form, modal, badge, alert kuning `#F5A524`, toast)
  - `assets/css/layout.css` (Navbar, sidebar portal siswa/guru, container)
  - `assets/js/storage.js` (State management, seed data guru/siswa, bank kuis Modul 1-3)
  - `assets/js/auth.js` (Otentikasi, registrasi siswa, login role guard)
  - `assets/js/utils.js` (Toast, modal helper, format tanggal)
  - `assets/images/logo.svg` (Aset visual brand CyberTech)

