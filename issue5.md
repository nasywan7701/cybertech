# Issue 5: Modul 2 - Analisis Sistem Keamanan Jaringan (Materi, Galeri Infografis Interaktif, & Aktivitas Studi Kasus)

## 1. Deskripsi & Tujuan
Sebagai Siswa, saya ingin mempelajari materi Modul 2 mengenai fungsi dan mekanisme kerja dari 4 sistem keamanan jaringan (*Antivirus, Firewall, VPN, dan Autentikasi*), mengeksplorasi galeri infografis visual interaktif bertema sistem keamanan berlapis, serta melatih kemampuan berpikir kritis melalui aktivitas interaktif *Studi Kasus* sebelum mengikuti kuis evaluasi.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 3 (Tabel Modul 2), Bagian 4.3, dan Bagian 5 (Layar 7, 8, 9).
- **Aset & Layar Terkait:**
  - `7. Halaman Modul (Contoh Modul 1).png` (pola tata letak materi Modul 2)
  - `Main.png` & `Bottom Action Area.png`
  - `8. Video Pembelajaran.png` & `16_9 THEMATIC VIDEO PLAYER SIMULATOR.png`
  - `9. Aktivitas (Drag and Drop).png` (adaptasi ke bentuk Aktivitas Studi Kasus Modul 2)

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 7: Halaman Materi Modul 2 (`student/module2-material.html`)
- **Breadcrumb:** `Beranda > Modul Pembelajaran > Modul 2: Analisis Sistem Keamanan Jaringan`.
- **Judul & Teks Materi (`Poppins 16px Regular`, `#1B2A41`):**
  - Pengantar Sistem Keamanan Jaringan Berlapis (*Defense in Depth*).
  - Pembahasan 4 Komponen Sistem Keamanan:
    1. **Antivirus / Anti-malware:** Mendeteksi, mengisolasi, dan menghapus kode jahat di perangkat *endpoint*.
    2. **Firewall:** Memfilter dan mengontrol paket data yang keluar-masuk jaringan berdasarkan *ruleset*.
    3. **VPN (Virtual Private Network):** Mengenkripsi saluran komunikasi data melalui terowongan aman (*tunneling*) di jaringan publik.
    4. **Autentikasi (2FA / Multi-Factor Authentication):** Memverifikasi keabsahan identitas pengguna sebelum memberikan izin akses ke sistem.
- **Komponen Visual Infografis Interaktif:**
  - Diagram visual 4 sistem keamanan yang dapat diklik untuk melihat penjelasan rinci tiap komponen secara interaktif.
- **Kotak Catatan Penting:** Aksen border kuning `#F5A524` mengenai pentingnya kombinasi beberapa sistem keamanan secara bersamaan.
- **Navigasi Bawah:**
  - `← Kembali ke Daftar Modul`
  - `Lanjut ke Video Pembelajaran →`

### 3.2 Layar 8: Galeri Infografis Interaktif Sistem Keamanan (`student/module2-video.html`)
- **Galeri 5 Infografis Interaktif:**
  1. **Piramida Defense in Depth:** Lapisan perimeter, jaringan internal, host/endpoint, dan data/identitas yang dapat diklik untuk eksplorasi detail teknis.
  2. **Anatomi Antivirus & Endpoint Detection:** Komparasi interaktif *Signature-Based* vs *Heuristic/Behavioral Detection* dan alur 4 tahap karantina.
  3. **Matriks Penyaringan Gerbang Firewall:** Visualisasi keputusan paket (*ALLOW, DROP, REJECT*) dan matriks port keamanan (HTTPS, SSH, Telnet, SMB).
  4. **Terowongan Enkripsi VPN:** Fitur interaktif toggle *Tanpa VPN (Plaintext Bocor)* vs *Dengan VPN (Terowongan AES-256)*.
  5. **Ekosistem 2FA / Multifaktor:** 3 Pilar identitas keamanan (*Something You Know, Have, Are*) dan statistik mitigasi serangan.
- **Interaktivitas & Gamifikasi:** Tombol *"✓ Tandai Sudah Dipahami"* per infografis dengan counter progres visual.
- **Navigasi Bawah:**
  - `← Kembali ke Materi Modul 2`
  - `Lanjut ke Aktivitas Studi Kasus →`

### 3.3 Layar 9: Aktivitas Interaktif Studi Kasus (`student/module2-activity.html`)
- **Format Aktivitas:**
  - Menyajikan 3 skenario masalah keamanan nyata di lingkungan SMK / perusahaan.
- **Skenario Contoh:**
  1. **Kasus 1:** *"Seorang guru sedang bertugas di luar kota dan harus mengakses server nilai sekolah melalui jaringan Wi-Fi publik di kafe secara aman tanpa takut disadap."*
     - Pilihan Solusi: Antivirus, Firewall, **VPN (Benar)**, Autentikasi.
  2. **Kasus 2:** *"Banyak akun email siswa yang dibobol peretas karena siswa menggunakan kata sandi sederhana yang mudah ditebak."*
     - Pilihan Solusi: Antivirus, Firewall, VPN, **Autentikasi (2FA/MFA) (Benar)**.
  3. **Kasus 3:** *"Laboratorium komputer sering mengalami kendala lalu lintas jaringan tidak dikenal yang mencoba memindai port Telnet yang tidak aman dari luar."*
     - Pilihan Solusi: Antivirus, **Firewall (Benar)**, VPN, Autentikasi.
- **Mekanisme Interaksi & Analisis:**
  - Siswa membaca studi kasus, memilih satu solusi kartu sistem keamanan, dan mengklik tombol **"Analisis & Kirim Solusi"**.
  - **Umpan Balik Instan:**
    - Jika benar: Kartu berubah hijau `#2BB673`, muncul kotak penjelasan *"Tepat Sekali! VPN mengenkripsi seluruh pertukaran data sehingga aman dari intersepsi/penyadapan pada Wi-Fi publik."*
    - Jika salah: Kartu berubah merah `#E5484D`, muncul kotak petunjuk edukatif mengapa solusi tersebut kurang tepat untuk kasus tersebut.
  - Siswa harus menyelesaikan ketiga skenario kasus dengan benar.
- Setelah ketiga kasus tuntas:
  - Tombol **"Lanjut ke Kuis Evaluasi Modul 2 →"** aktif.
  - Data progres Modul 2 diperbarui di `localStorage`.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat file `student/module2-material.html` lengkap dengan konten materi sistem keamanan dan komponen infografis interaktif.
- [x] Buat file `student/module2-video.html` dengan video player 16:9 terintegrasi.
- [x] Buat file `student/module2-activity.html` dan skrip `student/js/case-study.js`.
- [x] Rancang kartu opsi 4 sistem keamanan (*Antivirus, Firewall, VPN, Autentikasi*) dengan state hover dan selected.
- [x] Implementasikan mesin validasi studi kasus (penilaian jawaban, penjelasan alasan, tracking skor studi kasus).
- [x] Tambahkan logika pembukaan kunci (*unlock*) tombol lanjut ke kuis evaluasi Modul 2.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Materi Modul 2 dan komponen infografis sistem keamanan tampil rapi dan informatif. [TERPENUHI]
2. Video pembelajaran dapat diputar dengan lancar dengan tata letak 16:9 yang konsisten. [TERPENUHI]
3. Aktivitas Studi Kasus menampilkan skenario bergantian/berurutan dan mengevaluasi pilihan siswa secara objektif. [TERPENUHI]
4. Umpan balik analisis menyajikan penjelasan teoritis yang memperkuat pemahaman siswa. [TERPENUHI]
5. Status progres Modul 2 di `localStorage` bertambah setelah studi kasus terselesaikan. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `student/module2-material.html` (Layar 7: Pertahanan berlapis Defense in Depth, 4 pilar Antivirus, Firewall, VPN, Autentikasi 2FA, diagram infografis interaktif, tabel perbandingan sistem)
  - `student/module2-video.html` (Layar 8: Video Player 16:9 Thematic Simulator, visualisasi animasi enkripsi VPN, verifikasi OTP 2FA, filtering firewall)
  - `student/module2-activity.html` (Layar 9: Aktivitas interaktif 3 skenario studi kasus nyata, 4 kartu sistem pertahanan, feedback analisis teoritis)
  - `student/js/case-study.js` (Engine studi kasus interaktif, penanganan seleksi kartu opsi, validasi alasan, stepper kasus 1-3, auto-unlock kuis evaluasi)

