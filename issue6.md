# Issue 6: Modul 3 - Firewall (Materi, Animasi Alur Paket, Animasi Interaktif Firewall, & Simulator Firewall)

## 1. Deskripsi & Tujuan
Sebagai Siswa, saya ingin mempelajari fungsi firewall dan konsep penyaringan paket data (*packet filtering*), melihat visualisasi animasi alur lalu lintas data, mengeksplorasi **Animasi Interaktif Firewall** (Video Animasi Visual & Simulasi Paket Interaktif), serta melakukan eksperimen mandiri melalui **Aktivitas Simulasi Firewall** (*Allow* / *Block*) untuk memahami cara kerja pengamanan jaringan secara langsung.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 3 (Tabel Modul 3), Bagian 4.3, dan Bagian 5 (Layar 7, 8, 9).
- **Aset & Layar Terkait:**
  - `7. Halaman Modul (Contoh Modul 1).png` (pola tata letak Modul 3)
  - `Main.png` & `Bottom Action Area.png`
  - `8. Video Pembelajaran.png` & `16_9 THEMATIC VIDEO PLAYER SIMULATOR.png`
  - `9. Aktivitas (Drag and Drop).png` (diadaptasi ke visual Simulator Firewall)

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 7: Halaman Materi Modul 3 (`student/module3-material.html`)
- **Breadcrumb:** `Beranda > Modul Pembelajaran > Modul 3: Firewall`.
- **Materi Teori (`Poppins 16px Regular`, `#1B2A41`):**
  - Pengertian dan Fungsi Utama Firewall (pembatas antara jaringan internal terpercaya dengan internet eksternal).
  - Mekanisme Pemeriksaan Paket Data (*Inspection / Packet Filtering*): IP Asal, IP Tujuan, Port Protokol (*HTTP 80*, *HTTPS 443*, *Telnet 23*, dll).
  - Konsep Aturan Kebijakan (*Ruleset*):
    - **Allow (Izinkan):** Membiarkan paket melewati firewall menuju server tujuan.
    - **Block / Deny (Tolak):** Menghentikan atau membuang paket mencurigakan/berbahaya.
- **Komponen Animasi Visual Alur Lalu Lintas Jaringan:**
  - Ilustrasi grafis bergerak/animasi CSS/Canvas yang memperlihatkan paket data bergerak menuju gerbang firewall, diperiksa, lalu dialirkan atau ditahan.
- **Kotak Catatan Penting:** Catatan semantik kuning `#F5A524` mengenai prinsip dasar *"Default Deny"* dalam konfigurasi firewall profesional.
- **Navigasi Bawah:**
  - `← Kembali ke Daftar Modul`
  - `Lanjut ke Animasi Firewall →`

### 3.2 Layar 8: Halaman Animasi Interaktif Firewall (`student/module3-video.html`)
- Mengganti konsep video konvensional menjadi **Animasi Pembelajaran** dengan **Bilah Pilihan (Toggle Switcher)**:
  1. **Mode 1 - Video Animasi Firewall (Motion Visual):** Memutar file video animasi visual firewall berformat MP4 (`animasi-firewall-modul-3.mp4`).
  2. **Mode 2 - Simulasi Animasi Paket Interaktif (Bawaan CyberTech):** Simulasi gerak 4 alur paket data (HTTP/HTTPS Allow, Telnet Block, DDoS Flood Drop, dan Default Deny) dengan slider timeline dan tombol kendali play/pause.
- Pilihan kecepatan putar (0.75x, 1.0x, 1.25x, 1.5x) dan tombol lompat 10 detik.
- Rangkuman intisari pemahaman mekanisme firewall.
- **Navigasi Bawah:**
  - `← Kembali ke Materi`
  - `Lanjut ke Simulasi Firewall →`

### 3.3 Layar 9: Aktivitas Interaktif Simulasi Firewall (`student/module3-activity.html`)
- **Diagram Skema Jaringan Interaktif:**
  - `[ Komputer Klien (Kiri) ]  ───>  [ FIREWALL (Tengah) ]  ───>  [ Server Lab (Kanan) ]`
- **Panel Kontrol Konfigurasi Simulasi:**
  1. **Dropdown / Pilihan Jenis Trafik Jaringan:**
     - `HTTP - Port 80 (Browsing Web Biasa)`
     - `HTTPS - Port 443 (Akses Terenkripsi Aman)`
     - `Telnet - Port 23 (Protokol Komunikasi Tidak Terenkripsi / Berbahaya)`
     - `Serangan Banjir Paket (DDoS Ping Flood)`
  2. **Pemilih Aturan Firewall (Rule Action):**
     - Tombol **ALLOW** (Warna Hijau Semantik `#2BB673`).
     - Tombol **BLOCK** (Warna Merah Semantik `#E5484D`).
  3. **Tombol Aksi Utama:**
     - **"Jalankan Simulasi"** (`#134074`).
- **Visualisasi & Logika Simulasi:**
  - Saat tombol "Jalankan Simulasi" ditekan:
    - Muncul elemen paket data (lingkaran/kartu berkedip) yang bergerak dari Klien menuju Firewall.
    - Firewall melakukan inspeksi selama 1 detik (animasi scanning radar).
    - **Jika Keputusan Tepat:**
      - Contoh A: Telnet Port 23 diatur **BLOCK** -> Paket dicegat di gerbang firewall dengan efek silang merah (`#E5484D`), muncul status: **"STATUS: DITOLAK (SUKSES DIBLOKIR)"**, serta keterangan edukatif: *"Tepat! Port Telnet berbahaya karena teks sandi terkirim tanpa enkripsi. Firewall berhasil melindungi server!"*
      - Contoh B: HTTPS Port 443 diatur **ALLOW** -> Paket lolos melewati firewall menuju Server dengan efek centang hijau (`#2BB673`), muncul status: **"STATUS: DITERIMA (LALU LINTAS AMAN)"**, serta keterangan edukatif: *"Tepat! Lalu lintas web terenkripsi SSL/TLS aman dan diizinkan menuju server."*
    - **Jika Keputusan Kurang Tepat:**
      - Contoh C: Telnet diatur **ALLOW** -> Server menerima paket berbahaya dan memunculkan status peringatan: *"BAHAYA! Server rentan terserang sniffing karena mengizinkan port tidak aman."*
- **Sistem Tantangan (Mission Challenge):**
  - Siswa diberikan 4 skenario trafik berurutan yang harus diselesaikan dengan aturan yang benar.
  - Setelah menyelesaikan seluruh misi simulasi dengan benar, tombol **"Lanjut ke Kuis Evaluasi Modul 3 →"** terbuka.
  - Progres Modul 3 diperbarui di `localStorage`.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat file `student/module3-material.html` lengkap dengan materi teori firewall dan visual alur paket.
- [x] Buat file `student/module3-video.html` dengan integrasi video player 16:9.
- [x] Buat file `student/module3-activity.html` dan skrip interaktif `student/js/firewall-sim.js`.
- [x] Rancang antarmuka skema jaringan 3 node (Client, Firewall, Server) dengan animasi transisi paket CSS.
- [x] Implementasikan logika aturan *Allow* / *Block*, validasi keputusan, status DITERIMA / DITOLAK, dan kotak penjelasan teoritis.
- [x] Buat sistem pelacakan keberhasilan 4 skenario simulasi sebelum membuka kunci kuis evaluasi.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Animasi atau skema alur firewall pada materi tampil jelas dan mudah dipahami oleh siswa SMK. [TERPENUHI]
2. Simulator firewall dapat merespons pemilihan jenis trafik dan tombol Allow / Block. [TERPENUHI]
3. Animasi pergerakan paket data berjalan mulus dari Client ke Firewall dan berhenti atau berlanjut sesuai aturan. [TERPENUHI]
4. Muncul status DITERIMA (hijau `#2BB673`) atau DITOLAK (merah `#E5484D`) beserta penjelasan logis yang akurat. [TERPENUHI]
5. Tombol menuju kuis Modul 3 aktif setelah siswa menyelesaikan simulasi dengan benar. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `student/module3-material.html` (Layar 7: Teori firewall, mekanisme packet filtering layer 3/4, diagram alur animasi transmisi paket, prinsip Default Deny, aksi Allow/Block)
  - `student/module3-video.html` (Layar 8: Video Player 16:9 Thematic Simulator, visualisasi animasi inspeksi paket data HTTP/HTTPS/Telnet/DDoS)
  - `student/module3-activity.html` (Layar 9: Panggung grafis simulator 3 node Klien <-> Firewall <-> Server, panel kontrol konfigurasi aturan, pelacak 4 skenario misi)
  - `student/js/firewall-sim.js` (Engine simulator firewall, animasi pergerakan paket CSS, validasi ruleset, status DITERIMA/DITOLAK, auto-unlock kuis Modul 3)

