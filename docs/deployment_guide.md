# PANDUAN DISTRIBUSI & DEPLOYMENT (HOSTING GUIDE)
## Sistem Multimedia Pembelajaran: CyberTech

Dokumen ini memuat prosedur publikasi (*deployment*) website **CyberTech** agar dapat diakses secara langsung oleh siswa dan guru SMK Negeri 1 Takalar melalui tautan URL publik.

---

## 1. Arsitektur Teknis Sistem
Website **CyberTech** dibangun menggunakan arsitektur web modern tanpa ketergantungan server runtime khusus (*Jamstack / Static Single Page System*):
- **Bahasa & Standar:** Semantic HTML5, CSS3 Variables (Design Tokens), Vanilla JavaScript (ES6+).
- **Penyimpanan State:** `window.localStorage` (Data akun, riwayat modul, bank soal kuis CRUD, dan nilai siswa tersimpan secara persisten pada browser klien).
- **Kelebihan Arsitektur:**
  - Kecepatan pemuatan (*loading speed*) sangat tinggi.
  - Bebas biaya server (*zero hosting cost*).
  - Sangat aman (*secure*) karena tidak ada kerentanan database SQL eksternal.
  - Dapat dihosting pada penyedia layanan hosting statis manapun secara instan.

---

## 2. Opsi 1: Publikasi melalui GitHub Pages (Sangat Direkomendasikan)

GitHub Pages adalah opsi resmi dan paling mudah untuk proyek pendidikan:
1. **Inisialisasi Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: CyberTech complete release v2.0"
   ```
2. **Push ke GitHub:**
   - Buat repositori baru di GitHub (misal: `cybertech-multimedia`).
   - Hubungkan remote dan push branch `main`:
     ```bash
     git remote add origin https://github.com/username/cybertech-multimedia.git
     git branch -M main
     git push -u origin main
     ```
3. **Aktifkan Fitur GitHub Pages:**
   - Buka menu **Settings** pada repositori GitHub Anda.
   - Pilih tab **Pages** pada menu sisi kiri.
   - Pada bagian **Build and deployment > Source**, pilih **Deploy from a branch**.
   - Pada dropdown Branch, pilih **`main`** dan folder **`/(root)`**, lalu klik **Save**.
4. **Hasil Akses Publik:**
   - Dalam 1–2 menit, website live pada URL:  
     `https://username.github.io/cybertech-multimedia/`

---

## 3. Opsi 2: Publikasi melalui Vercel

1. Buka situs [vercel.com](https://vercel.com) dan login menggunakan akun GitHub.
2. Klik tombol **"Add New..."** > **"Project"**.
3. Import repositori GitHub `cybertech-multimedia`.
4. Pada bagian **Framework Preset**, biarkan bernilai **Other** (karena murni HTML/CSS/JS statis).
5. Klik tombol **"Deploy"**.
6. Dalam hitungan detik, tautan live Vercel akan tersedia (contoh: `https://cybertech-learning.vercel.app`).

---

## 4. Opsi 3: Publikasi melalui Netlify

1. Buka situs [netlify.com](https://netlify.com) dan login ke dasbor.
2. Pada tab **Sites**, Anda dapat langsung melakukan *Drag and Drop* seluruh folder proyek `Project` ke area unggah Netlify Drop.
3. Netlify akan langsung mempublikasikan website dengan alamat URL publik yang aman (HTTPS aktif secara otomatis).

---

## 5. Pengujian Kompatibilitas di Laboratorium Komputer

Untuk memastikan kenyamanan belajar siswa SMK Negeri 1 Takalar, pastikan komputer laboratorium memenuhi rekomendasi berikut:
- **Peramban (Browser):** Google Chrome versi $\ge 110$ atau Microsoft Edge versi $\ge 110$.
- **Resolusi Layar:** Resolusi minimum $1366 \times 768$ (Tata letak telah diuji responsif hingga resolusi $1920 \times 1080$ Full HD).
- **Perangkat Keras:** Komputer / laptop dengan RAM minimal 4 GB dan monitor dengan pengaturan zoom browser $100\%$.
- **Aksesoris:** Headset atau speaker untuk mendengarkan audio pemutar video modul.

