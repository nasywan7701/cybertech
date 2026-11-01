# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Sistem Multimedia Pembelajaran Interaktif: CyberTech

- **Nama Produk / Sistem:** CyberTech
- **Subjek Mata Pelajaran:** Administrasi Sistem Jaringan (Topik: Keamanan Jaringan)
- **Target Pengguna:** Siswa & Guru Jurusan TJKT (TKJ) Kelas XI / XII SMK Negeri 1 Takalar
- **Metodologi Pengembangan:** Multimedia Development Life Cycle (MDLC) Luther-Sutopo
- **Versi Dokumen:** 2.0 (Final Release Plan)
- **Tanggal Dokumen:** 26 Oktober 2026
- **Tim Pengembang (Kelompok 3 - PTIK UNM):**
  1. Nasywan Ahmad Irsyam Massompongan (`240209500057`)
  2. Nabilah Auliah Rahman (`240209500055`)
  3. Alfira Resky Pratiwi (`240209500073`)
  4. Andi Imam Ardiansyah (`240209501047`)

---

## 1. RINGKASAN EKSEKUTIF & OVERVIEW PROYEK

### 1.1 Latar Belakang Masalah
Pembelajaran materi Keamanan Jaringan pada jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT / TKJ) di SMK Negeri 1 Takalar selama ini masih didominasi oleh penjelasan konvensional menggunakan buku teks dan salindia PowerPoint. Hasil observasi laboratorium dan wawancara dengan guru mata pelajaran menunjukkan bahwa kemampuan awal siswa masih berada pada tingkat dasar. Siswa mengalami kendala utama dalam:
1. Memahami istilah teknis keamanan jaringan dan menghubungkan konsep teoretis dengan praktik.
2. Membedakan jenis-jenis ancaman dan serangan jaringan (*Virus, Worm, Phishing, DDoS*) beserta cara kerjanya.
3. Memahami mekanisme kerja sistem keamanan jaringan serta konfigurasi aturan (*Allow* / *Block*) pada *Firewall* karena proses penyaringan lalu lintas jaringan tidak terlihat secara langsung.

### 1.2 Visi & Tujuan Produk
**CyberTech** adalah website multimedia pembelajaran interaktif yang dirancang untuk memvisualisasikan konsep keamanan jaringan secara bertahap, interaktif, dan aplikatif berdasarkan Teori Konstruktivisme dan 5 Prinsip Multimedia Mayer (*Multimedia, Coherence, Signaling, Segmenting, Modality*).

**Tujuan Utama:**
1. Membantu siswa memahami materi ancaman jaringan, sistem keamanan jaringan, dan firewall secara visual dan interaktif.
2. Menyediakan latihan mandiri (*Drag and Drop*, *Studi Kasus*, *Simulasi Firewall*) dan evaluasi otomatis sebagai persiapan sebelum siswa melakukan praktikum langsung di laboratorium.
3. Menyediakan portal khusus bagi guru untuk mengelola soal kuis/evaluasi akhir, memantau data siswa, serta melihat dan mengolah hasil evaluasi siswa menjadi nilai.

### 1.3 Indikator Keberhasilan (Success Metrics / KPI)
- **Feature Completeness (Black Box Testing):** Mencapai $FC = 100\%$ pada seluruh fitur Siswa dan Guru menggunakan skala Guttman.
- **System Usability Scale (SUS):** Mencapai skor rata-rata minimal $\ge 68$ (*Acceptable / Good*) hingga $\ge 80,3$ (*Grade A / Excellent*) dari pengujian siswa.
- **Validasi Ahli (Materi & Media):** Mencapai nilai kelayakan $\ge 81\%$ (*Sangat Layak*) menggunakan instrumen skala Likert $1\text{--}5$.
- **Ketuntasan Belajar Siswa:** Siswa mampu mencapai skor KKM ($\ge 75$) pada kuis evaluasi di setiap modul.

---

## 2. PROFIL PENGGUNA & HAK AKSES (USER ROLES)

Website **CyberTech** dapat diakses oleh dua peran pengguna (*Siswa* dan *Guru*) yang masing-masing memiliki tampilan dashboard dan hak akses berbeda:

### 2.1 Siswa (Kelas XI / XII TJKT SMK Negeri 1 Takalar)
- **Karakteristik:** Memiliki kemampuan dasar penggunaan komputer dan internet di laboratorium sekolah, membutuhkan contoh kasus sehari-hari serta panduan langkah demi langkah (*scaffolding*).
- **Akses Akun:** Siswa yang belum memiliki akun wajib melakukan pendaftaran mandiri (*Buat Akun Baru*) terlebih dahulu sebelum masuk ke sistem.
- **Hak Akses & Fitur Siswa:**
  - Melihat **Dashboard Siswa** yang menampilkan ringkasan materi dan progres belajar.
  - Mengakses **Sidebar Navigasi** yang berurut dari atas ke bawah: **Beranda**, **Modul Pembelajaran**, **Aktivitas / Hasil Kuis**, dan **Profil**.
  - Mengakses **Modul Pembelajaran (Modul 1–3)**: membaca materi interaktif, menonton video pembelajaran / infografis / animasi, mengerjakan aktivitas tiap modul, dan mengerjakan kuis evaluasi.
  - Melihat **Riwayat Nilai / Hasil Kuis** beserta **Pembahasan Setiap Soal**.
  - Melihat dan memperbarui **Profil Siswa** (ubah foto profil, ubah password) serta melakukan **Logout**.

### 2.2 Guru (Pengampu Mata Pelajaran Administrasi Sistem Jaringan)
- **Karakteristik:** Guru pengajar yang berperan sebagai pengelola evaluasi dan pemantau capaian nilai siswa.
- **Akses Akun:** Akun Guru (*Username* dan *Password*) telah dibuatkan secara khusus dari awal (*pre-provisioned*), sehingga guru dapat langsung memilih *Login sebagai Guru* dan masuk ke sistem tanpa perlu registrasi akun baru.
- **Hak Akses & Fitur Guru:**
  - Melihat **Dashboard Guru** (ringkasan statistik kelas, modul, dan evaluasi).
  - Mengakses menu **Kelola Evaluasi Akhir / Kuis (Modul 1, 2, 3)**: guru dapat memilih modul, **Menambah Soal**, **Mengedit Soal**, dan **Menghapus Soal**.
  - Mengakses menu **Data Siswa**: melihat daftar siswa beserta detail informasi siswa.
  - Mengakses menu **Hasil Evaluasi / Kuis Siswa**: memfilter berdasarkan modul (1, 2, atau 3), melihat daftar nilai dan detail jawaban siswa untuk diolah menjadi nilai akhir.
  - Melihat dan memperbarui **Profil Guru** (ubah foto profil, ubah password) serta melakukan **Logout**.

---

## 3. STRUKTUR 3 MODUL PEMBELAJARAN (BERDASARKAN CP & TP)

Berdasarkan Capaian Pembelajaran (CP) mata pelajaran Administrasi Sistem Jaringan, materi dibagi menjadi 3 modul terstruktur (mengecualikan materi IDS/IPS tingkat lanjut, server autentikasi, dan kriptografi):

| Modul | Topik & Cakupan Materi | Rumusan Tujuan Pembelajaran (TP) | Media Pembelajaran Utama | Aktivitas Interaktif Modul | Evaluasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Modul 1** | **Identifikasi Ancaman Jaringan**<br>Pengertian keamanan jaringan; jenis ancaman (*Virus, Worm, Phishing, DDoS*); cara pencegahan ancaman. | Setelah mempelajari Modul 1, siswa mampu mengklasifikasikan empat jenis ancaman jaringan (*virus, worm, phishing, dan DDoS*) berdasarkan cara kerja dan contoh kasusnya secara tepat melalui aktivitas *drag and drop*. | **Video Pembelajaran** & Ilustrasi Visual | **Aktivitas Drag and Drop**<br>(Menarik dan mencocokkan jenis ancaman dengan ilustrasi/contoh kasus yang sesuai) | **Kuis Evaluasi Modul 1**<br>(Pilihan Ganda Otomatis + Pembahasan) |
| **Modul 2** | **Analisis Sistem Keamanan Jaringan**<br>Pengenalan fungsi dan cara kerja *Antivirus, Firewall, VPN,* dan *Autentikasi*. | Setelah mempelajari Modul 2, siswa mampu menganalisis efektivitas empat sistem keamanan jaringan (*antivirus, firewall, VPN, dan autentikasi*) dalam mengatasi ancaman pada suatu kasus dan merekomendasikan sistem yang paling tepat. | **Infografis Sistem Keamanan** & Video | **Studi Kasus**<br>(Menganalisis skenario kasus keamanan jaringan perusahaan/sekolah & memilih solusi yang tepat) | **Kuis Evaluasi Modul 2**<br>(Pilihan Ganda Otomatis + Pembahasan) |
| **Modul 3** | **Firewall**<br>Fungsi firewall, cara kerja penyaringan paket data, dan konfigurasi aturan *Allow* atau *Block* pada lalu lintas jaringan. | Setelah mempelajari Modul 3, siswa mampu menerapkan aturan *Allow* atau *Block* pada simulasi firewall sesuai jenis lalu lintas dan menjelaskan alasan hasil simulasi (diterima atau ditolak). | **Animasi Alur Lalu Lintas Jaringan** & Video | **Simulasi Firewall**<br>(Memilih jenis trafik jaringan, menentukan aturan *Allow* atau *Block*, dan menjalankan simulasi paket data) | **Kuis Evaluasi Modul 3**<br>(Pilihan Ganda Otomatis + Pembahasan) |

---

## 4. ALUR SISTEM & NAVIGASI PENGGUNA (USER FLOW)

### 4.1 Alur Saat Membuka Website Pertama Kali (Landing Page)
1. Pengguna membuka alamat website dan langsung melihat **Dashboard Utama (Landing Page)** yang memuat judul utama, teks pendukung, dan ikon-ikon pendukung sesuai materi keamanan jaringan.
2. **Top Navigation Bar (Bar Atas):**
   - **Sebelah Kiri:** Menampilkan judul web / nama sistem yaitu **CyberTech**.
   - **Sebelah Kanan (berurut dari kiri ke kanan):** **Beranda > Tentang > Modul > Login**.
3. **Bagian Tengah (Hero Section):** Menampilkan Judul Utama, teks pendukung, ilustrasi pendukung, dan tombol utama bertuliskan **"Mulai Belajar"**.
4. **Bagian Bawah (3 Pilihan Menu Fitur):**
   - **Sebelah Kiri:** Materi Interaktif
   - **Bagian Tengah:** Video Pembelajaran
   - **Sebelah Kanan:** Kuis dan Simulasi
5. **Pengarahan ke Menu Login (Auth Gate):** Ketika pengguna yang belum memiliki sesi login mengklik tombol **"Mulai Belajar"**, atau mengklik salah satu dari **ketiga pilihan menu di bagian bawah** (*Materi Interaktif*, *Video Pembelajaran*, *Kuis dan Simulasi*), ataupun mengklik menu **Login** di bar atas, sistem akan memunculkan **Pop-up Pilihan Role Login**.

### 4.2 Alur Pop-up Role, Login, dan Buat Akun Baru
1. **Pop-up Pilih Role:** Saat tombol Login / Mulai Belajar diklik, muncul *pop-up* berisi 2 pilihan:
   - **Login sebagai Siswa**
   - **Login sebagai Guru**
2. **Alur Siswa:**
   - Jika memilih **Login sebagai Siswa**, pengguna masuk ke halaman **Login** untuk memasukkan *Username* dan *Password*.
   - Apabila siswa belum memiliki akun, siswa mengklik tombol/tautan **"Buat Akun"** terlebih dahulu.
   - Pada halaman **Buat Akun (Registrasi)**, siswa mengisi formulir secara berurutan:
     1. **Nama Lengkap**
     2. **Email**
     3. **Password**
     4. **Konfirmasi Password**
   - Setelah menekan tombol daftar/login dan data tervalidasi, akun berhasil dibuat dan siswa langsung masuk ke **Dashboard Siswa**.
3. **Alur Guru:**
   - Jika memilih **Login sebagai Guru**, guru diarahkan ke halaman **Login Guru**.
   - Karena *Username* dan *Password* guru sudah dibuatkan secara khusus oleh pengembang, guru tinggal memasukkan kredensial tersebut dan langsung masuk ke **Dashboard Guru**.

### 4.3 Alur Penggunaan Siswa (Setelah Login)
1. Siswa melihat **Dashboard Siswa** yang menampilkan ringkasan materi dan capaian modul, dilengkapi **Sidebar Navigasi Kiri** yang berurut dari atas ke bawah:
   - **Beranda**
   - **Modul Pembelajaran**
   - **Aktivitas (Hasil Kuis / Riwayat Nilai)**
   - **Profil**
2. Pada menu **Modul Pembelajaran**, siswa memilih **Modul 1, Modul 2, atau Modul 3**. Di dalam setiap modul, siswa menjalani alur belajar terstruktur:
   - **Halaman Utama Modul (Materi):** Membaca teks materi dan mengamati visual pendukung (Modul 1: Ilustrasi Ancaman; Modul 2: Infografis Sistem Keamanan; Modul 3: Animasi Firewall).
   - **Halaman Video Pembelajaran:** Menonton video penjelasan tiap modul dengan kontrol pemutar video lengkap.
   - **Halaman Aktivitas Modul:** Mengerjakan latihan interaktif sesuai modul:
     - *Modul 1:* Aktivitas *Drag and Drop*.
     - *Modul 2:* Aktivitas *Studi Kasus*.
     - *Modul 3:* Aktivitas *Simulasi Firewall* (*Allow* / *Block*).
   - **Halaman Kuis Evaluasi:** Mengerjakan soal-soal pilihan ganda evaluasi modul.
3. Setelah mengirim jawaban kuis, siswa melihat halaman **Hasil Kuis** (Skor Nilai & status KKM) dan dapat mengklik tombol **Lihat Pembahasan** untuk mempelajari ulasan jawaban yang benar pada setiap soal.
4. Siswa juga dapat melihat **Riwayat Nilai**, mengelola **Profil Siswa** (ubah foto profil dan ubah password), serta melakukan **Logout**.

### 4.4 Alur Penggunaan Guru (Setelah Login)
1. Guru melihat **Dashboard Guru** yang menampilkan ringkasan data pembelajaran kelas.
2. Melalui menu **Kelola Evaluasi Akhir / Kuis**, guru memilih **Modul 1, Modul 2, atau Modul 3**, kemudian memilih aksi:
   - **Tambah Soal:** Menginput pertanyaan baru, opsi pilihan ganda A–D, kunci jawaban, dan pembahasan, lalu menyimpannya.
   - **Edit Soal:** Memperbarui isi soal, opsi, atau kunci jawaban yang sudah ada.
   - **Hapus Soal:** Menghapus butir soal setelah melakukan konfirmasi hapus.
3. Melalui menu **Data Siswa**, guru melihat tabel daftar siswa (nama lengkap, kelas, email) dan melihat detail data siswa.
4. Melalui menu **Hasil Evaluasi Siswa (Hasil Kuis Siswa)**, guru memilih modul (1, 2, atau 3) untuk melihat daftar nilai evaluasi seluruh siswa beserta detail hasil kuis dan pembahasannya yang kemudian diolah menjadi nilai.
5. Melalui menu **Profil Guru**, guru dapat melihat profil, mengubah foto profil atau password, serta melakukan **Logout**.

---

## 5. SPESIFIKASI LO-FI & HI-FI WIREFRAME (17 LAYAR LENGKAP)

Desain antarmuka dirancang dalam dua tahap: **Lo-Fi Wireframe** (rancangan struktur kerangka dasar *grayscale*) dan **Hi-Fi Wireframe** (rancangan visual penuh dengan penerapan font *Poppins*, palet warna *CyberTech*, ikon, dan komponen interaktif). Berikut adalah rincian spesifikasi ke-17 layar yang terdapat dalam paket desain:

### A. Layar Publik & Autentikasi (Layar 1 – 4)

#### 1. Landing Page / Halaman Utama (`1. Landing Page/Halaman Utama.png`)
- **Struktur Lo-Fi:** Kerangka *header* atas dengan tempat logo di kiri dan 4 tautan teks di kanan; blok *hero* 2 kolom (teks + tombol di kiri, kotak gambar silang di kanan); serta baris 3 kotak kartu fitur sejajar di bagian bawah.
- **Implementasi Hi-Fi:**
  - **Top Bar (`#0B2545` / `#FFFFFF`):** Sebelah kiri menampilkan nama sistem **CyberTech** (`Poppins Bold`). Sebelah kanan menampilkan menu berurut dari kiri ke kanan: **Beranda > Tentang > Modul > Login**.
  - **Hero Section:** Menampilkan Judul Utama (`Poppins 60px Bold`), teks pendukung (`Poppins 16px Regular`), ilustrasi grafis keamanan jaringan di kanan, serta tombol utama **"Mulai Belajar"** (`#134074` dengan aksen `#00B4D8`).
  - **Bagian Bawah (3 Kartu Pilihan):** Menampilkan 3 kartu interaktif berlatar putih (`#FFFFFF`) dengan ikon tematik:
    1. **Materi Interaktif** (Sebelah Kiri)
    2. **Video Pembelajaran** (Bagian Tengah)
    3. **Kuis dan Simulasi** (Sebelah Kanan)

#### 2. Pop-up Pilih Role Pengguna (`4. Pilih Role Pengguna.png` / `2. Pilih Role Pengguna.png`)
- **Struktur Lo-Fi:** Kotak modal di tengah layar di atas latar redup (*overlay*) yang memuat judul modal dan 2 kotak pilihan peran berdampingan/berurutan.
- **Implementasi Hi-Fi:**
  - Muncul otomatis saat pengguna mengklik tombol *Login*, *Mulai Belajar*, atau ketiga kartu fitur di Landing Page.
  - Menampilkan 2 tombol/kartu pilihan yang jelas: **Login sebagai Siswa** dan **Login sebagai Guru** lengkap dengan ikon representatif dan efek sorotan warna Sian (`#00B4D8`).

#### 3. Halaman Login (`3. Login.png`)
- **Struktur Lo-Fi:** Kartu formulir di tengah halaman berisi judul, 2 kolom input teks (*Username* dan *Password*), 1 tombol aksi utama, dan tautan teks di bagian bawah.
- **Implementasi Hi-Fi:**
  - Menampilkan form input **Username** dan **Password** dengan label `Poppins 14px Regular`.
  - Tombol utama **"Login"** (`Poppins 16px SemiBold`, warna `#134074`).
  - Untuk role Siswa, terdapat tombol/tautan **"Buat Akun"** bagi siswa yang belum memiliki akun.

#### 4. Halaman Registrasi / Daftar Akun (`2. Registrasi (Daftar Akun).png` / `4. Registrasi (Daftar Akun).png`)
- **Struktur Lo-Fi:** Kartu formulir pendaftaran berisi 4 kolom input berurutan dari atas ke bawah dan tombol aksi pendaftaran.
- **Implementasi Hi-Fi:**
  - Menampilkan kolom isian wajib bagi siswa baru:
    1. **Nama Lengkap**
    2. **Email**
    3. **Password**
    4. **Konfirmasi Password**
  - Dilengkapi tombol **"Daftar Akun" / "Login"** untuk memproses pembuatan akun dan masuk ke sistem.

---

### B. Layar Portal Siswa (Layar 5 – 12)

#### 5. Dashboard Siswa (`5. Dashboard siswa.png`)
- **Struktur Lo-Fi:** Tata letak 2 kolom permanen: *Sidebar* navigasi di sisi kiri dan area kerja utama di sisi kanan yang memuat kartu banner atas serta deretan kartu ringkasan modul.
- **Implementasi Hi-Fi:**
  - **Sidebar Kiri (`#0B2545`):** Menampilkan identitas **CyberTech** di atas, diikuti menu vertikal berurut dari atas ke bawah:
    1. **Beranda** (status aktif ditandai aksen `#00B4D8` / `#134074`)
    2. **Modul Pembelajaran**
    3. **Aktivitas** (termasuk akses Hasil Kuis / Riwayat Nilai)
    4. **Profil** (beserta tombol **Logout** di bagian bawah)
  - **Area Konten Utama (`#F3F7FB`):** Menampilkan banner sambutan nama siswa, indikator progres belajar global, serta kartu status penyelesaian modul (termasuk komponen `CARD 1_ Modul 1 (100% Selesai).png` dengan indikator hijau `#2BB673`).

#### 6. Daftar Modul (`6. Daftar Modul.png`)
- **Struktur Lo-Fi:** Sidebar di sisi kiri dan 3 kartu modul berukuran besar di area tengah yang memuat judul modul, deskripsi, bilah progres, dan tombol mulai.
- **Implementasi Hi-Fi:**
  - Menampilkan katalog lengkap 3 modul pembelajaran:
    - **Modul 1: Identifikasi Ancaman Jaringan**
    - **Modul 2: Analisis Sistem Keamanan Jaringan**
    - **Modul 3: Firewall**
  - Setiap kartu menampilkan tujuan singkat, persentase capaian, lencana status, dan tombol **"Mulai Modul" / "Pelajari"**.

#### 7. Halaman Modul - Materi (`7. Halaman Modul (Contoh Modul 1).png`)
- **Struktur Lo-Fi:** Sidebar modul di kiri, panel bacaan materi di tengah (judul H2, subjudul H3, paragraf, placeholder gambar/infografis/animasi), serta bilah tombol navigasi di bagian bawah.
- **Implementasi Hi-Fi:**
  - **Area Konten Materi (`Main.png`):**
    - Judul Modul (`Poppins 32px Bold`, `#0B2545`) dan Subjudul bagian materi (`Poppins 20px SemiBold`, `#134074`).
    - Paragraf penjelasan materi (`Poppins 16px Regular`, line-height `1.6`, warna `#1B2A41`).
    - Kotak catatan penting / istilah kunci beraksen Kuning (`#F5A524`).
    - Elemen visual spesifik modul:
      - *Modul 1:* Kartu visual 4 jenis ancaman (*Virus, Worm, Phishing, DDoS*).
      - *Modul 2:* **Infografis** fungsi 4 sistem keamanan (*Antivirus, Firewall, VPN, Autentikasi*).
      - *Modul 3:* **Animasi** visual alur pemeriksaan paket data pada *Firewall*.
  - **Bottom Action Area (`Bottom Action Area.png`):** Bilah bawah yang memuat tombol **← Sebelumnya** dan **Lanjut Materi / Video →**.

#### 8. Video Pembelajaran (`8. Video Pembelajaran.png`)
- **Struktur Lo-Fi:** Bingkai pemutar video rasio 16:9 di tengah halaman dengan ikon *play*, bilah durasi, serta tombol navigasi halaman di bawahnya.
- **Implementasi Hi-Fi:**
  - Menampilkan komponen **`16_9 THEMATIC VIDEO PLAYER SIMULATOR.png`** yang mendukung pemutaran video pembelajaran tiap modul (kontrol *Play/Pause*, *timeline seekbar*, durasi, kontrol volume, dan *fullscreen*).
  - Dilengkapi deskripsi ringkas isi video serta tombol navigasi **← Sebelumnya** dan **Lanjut ke Aktivitas →**.

#### 9. Aktivitas Modul (`9. Aktivitas (Drag and Drop).png`)
- **Struktur Lo-Fi:** Area latihan interaktif di tengah halaman dengan instruksi pengerjaan, komponen objek interaktif, kotak target/opsi, dan tombol verifikasi jawaban.
- **Implementasi Hi-Fi (Menyesuaikan Modul 1, 2, dan 3):**
  - **Modul 1 — Aktivitas Drag and Drop:** Menampilkan 4 zona target (*Virus, Worm, Phishing, DDoS*) dan kartu-kartu kasus/ilustrasi yang dapat ditarik (*drag and drop*). Ketika tombol **Cek Jawaban** diklik, sistem memberikan umpan balik visual Hijau (`#2BB673`) untuk pasangan yang tepat dan Merah (`#E5484D`) untuk pasangan yang salah.
  - **Modul 2 — Aktivitas Studi Kasus:** Menampilkan kartu skenario kasus nyata (misalnya perusahaan yang membutuhkan pengamanan koneksi jarak jauh bagi karyawan) dan 4 opsi kartu sistem keamanan (*Antivirus, Firewall, VPN, Autentikasi*) beserta umpan balik analisis alasan pemilihan solusi.
  - **Modul 3 — Aktivitas Simulasi Firewall:** Menampilkan skema interaktif **Komputer Klien ↔ Firewall ↔ Server**, *dropdown* pemilih **Jenis Trafik** (misal: *HTTP Port 80, HTTPS Port 443, Telnet, Serangan DDoS*), pilihan tombol aturan **Allow** (`#2BB673`) dan **Block** (`#E5484D`), serta tombol **Jalankan**. Panel hasil menampilkan simulasi pergerakan paket dan status akhir apakah paket **DITERIMA** atau **DITOLAK** beserta penjelasan logikanya.

#### 10. Kuis Modul (`10. Kuis Modul.png`)
- **Struktur Lo-Fi:** Header kuis dengan indikator waktu (*timer*) di kanan atas, kotak teks soal nomor aktif, 4 baris opsi pilihan ganda (radio button A, B, C, D), serta tombol navigasi soal.
- **Implementasi Hi-Fi (`Soal.png`):**
  - Menampilkan judul **Kuis Evaluasi Modul**, nomor butir soal, dan penghitung waktu mundur (*timer*).
  - Menampilkan teks pertanyaan (`Poppins 16px`) dan 4 kartu opsi jawaban (**A, B, C, D**) yang berubah warna sorotan (`#00B4D8` / `#134074`) saat dipilih siswa.
  - Tombol **← Sebelumnya** dan tombol **Submit / Kirim Jawaban →** di kanan bawah.

#### 11. Hasil Kuis (`11. Hasil Kuis.png`)
- **Struktur Lo-Fi:** Kartu hasil di tengah layar berisi ikon piala/bintang, teks ucapan selamat, angka skor besar (`90 / 100`), dan 2 tombol aksi berdampingan.
- **Implementasi Hi-Fi (`Section - HERO RESULT SCORECARD_margin.png`):**
  - Menampilkan skor perolehan siswa secara menonjol (misal: `85 / 100`), indikator bintang/trofi, status kelulusan KKM (Hijau `#2BB673` jika $\ge \text{KKM}$, Merah `#E5484D` jika $<\text{KKM}$), serta rincian jumlah jawaban benar dan salah.
  - Memuat tombol **Lihat Pembahasan**, **Ulangi Kuis** (jika belum mencapai KKM), dan **Kembali ke Beranda**.

#### 12. Pembahasan Kuis (`12. Pembahasan Kuis.png`)
- **Struktur Lo-Fi:** Daftar kartu vertikal berisi soal, pilihan jawaban siswa, status benar/salah, dan kotak teks penjelasan di bawah tiap soal.
- **Implementasi Hi-Fi (`Container.png`):**
  - Menampilkan rincian setiap soal kuis yang telah dikerjakan siswa.
  - Menandai jawaban siswa dengan lencana **Benar** (`#2BB673`) atau **Salah** (`#E5484D`), menampilkan **Kunci Jawaban Resmi**, serta menyajikan kotak **Penjelasan / Pembahasan Soal** agar siswa memahami konsep yang tepat.

---

### C. Layar Portal Guru (Layar 13 – 17)

#### 13. Dashboard Guru (`13. Dashboard Guru.png`)
- **Struktur Lo-Fi:** Sidebar navigasi guru di sisi kiri dan area ringkasan metrik/statistik di bagian tengah.
- **Implementasi Hi-Fi:**
  - **Sidebar Kiri Guru (`#0B2545`):** Memuat menu **Dashboard**, **Kelola Kuis (Evaluasi)**, **Data Siswa**, **Hasil Kuis Siswa**, **Profil Guru**, dan **Logout**.
  - **Area Konten Utama:** Menampilkan kartu ringkasan jumlah siswa terdaftar, total bank soal pada Modul 1–3, rata-rata nilai evaluasi kelas, serta aktivitas pengerjaan kuis terbaru.

#### 14. Kelola Kuis / Evaluasi (`14. Kelola Kuis.png`)
- **Struktur Lo-Fi:** Pemilih modul di bagian atas, tombol tambah di kanan atas, dan tabel daftar soal dengan kolom aksi di sebelah kanan.
- **Implementasi Hi-Fi:**
  - Guru dapat memilih **Modul 1, Modul 2, atau Modul 3**.
  - Menampilkan tombol utama **+ Tambah Soal** (`#134074`).
  - Tabel daftar soal menampilkan nomor, teks pertanyaan, opsi, kunci jawaban, serta tombol aksi **Edit Soal** (`#00B4D8`) dan **Hapus Soal** (`#E5484D`) yang dilengkapi dialog konfirmasi hapus.

#### 15. Tambah / Edit Soal (`15. Tambah/Edit Soal.png`)
- **Struktur Lo-Fi:** Formulir vertikal berisi kolom teks pertanyaan, 4 kolom input pilihan jawaban (A–D), pilihan kunci jawaban, dan tombol simpan.
- **Implementasi Hi-Fi:**
  - Formulir lengkap bagi guru untuk menginput atau memperbarui soal:
    - Pilihan Modul (Modul 1 / Modul 2 / Modul 3)
    - Kolom Input **Pertanyaan Soal**
    - Kolom Input **Pilihan A, Pilihan B, Pilihan C, dan Pilihan D**
    - Pemilih **Kunci Jawaban Benar**
    - Kolom Input **Pembahasan Soal**
  - Tombol **Simpan / Update Soal** (`#2BB673` / `#134074`) dan tombol **Batal**.

#### 16. Data Siswa (`16. Data Siswa.png`)
- **Struktur Lo-Fi:** Bilah pencarian di atas dan tabel direktori data siswa di bagian tengah.
- **Implementasi Hi-Fi:**
  - Menampilkan daftar seluruh siswa yang telah membuat akun di sistem **CyberTech** (Nama Lengkap, Email/Username, Kelas XI/XII TJKT, dan progres modul).
  - Dilengkapi fitur pencarian siswa dan tombol aksi **Lihat Detail** untuk melihat profil lengkap masing-masing siswa.

#### 17. Hasil Kuis Siswa (`17. Hasil Kuis Siswa.png`)
- **Struktur Lo-Fi:** Filter pilihan modul di bagian atas dan tabel rekapitulasi nilai kuis seluruh siswa.
- **Implementasi Hi-Fi:**
  - Guru dapat memfilter hasil evaluasi berdasarkan **Modul 1, Modul 2, atau Modul 3**.
  - Menampilkan tabel rekapitulasi nilai siswa (Nama Siswa, Modul, Skor Nilai, Status Ketuntasan KKM, serta tombol **Lihat Detail** untuk meninjau nilai kuis dan pembahasan soal tiap siswa guna diolah menjadi nilai akhir).

---

## 6. ATRIBUT DESAIN SISTEM (DESIGN SYSTEM SPECIFICATION)

Seluruh aset Hi-Fi Wireframe dan implementasi kode CSS menggunakan standar tipografi dan palet warna yang telah ditetapkan dalam dokumen rancangan:

### 6.1 Tipografi (Font: Poppins)
Jenis huruf yang digunakan pada seluruh elemen antarmuka adalah **Poppins** karena memiliki keterbacaan tinggi di layar komputer laboratorium:

| Elemen Antarmuka | Jenis Huruf | Ukuran (Size) | Gaya (Weight) | Penggunaan pada Sistem |
| :--- | :--- | :--- | :--- | :--- |
| **Judul Beranda (H1)** | Poppins | `60 px` | Bold (`700`) | Nama produk **CyberTech** / Judul utama pada Beranda (Landing Page). |
| **Judul Halaman (H2)** | Poppins | `32 px` | Bold (`700`) | Judul modul pembelajaran dan judul halaman utama. |
| **Subjudul (H3)** | Poppins | `20 px` | SemiBold (`600`) | Subbagian materi (misalnya *"A. Pengertian"*), judul kartu fitur/modul. |
| **Teks Isi (Body)** | Poppins | `16 px` | Regular (`400`) | Paragraf materi pembelajaran dan teks soal, dengan tinggi baris (*line-height*) `1,6`. |
| **Menu dan Tombol** | Poppins | `16 px` | Medium (`500`) & SemiBold (`600`) | Medium untuk item menu navigasi; SemiBold untuk teks di dalam tombol. |
| **Keterangan dan Label** | Poppins | `13–14 px` | Regular (`400`) | Label formulir login/registrasi, keterangan kartu, dan penanda jejak halaman (*breadcrumbs*). |

### 6.2 Palet Warna (Color Palette)
Palet warna mengambil nuansa biru tua dan sian yang identik dengan keamanan siber dan teknologi, dipadukan dengan warna semantik untuk umpan balik interaktif:

| Nama Warna | Kode HEX | Penggunaan pada Komponen Antarmuka |
| :--- | :--- | :--- |
| **Biru Malam (Primer)** | `#0B2545` | Bilah navigasi utama (Navbar & Sidebar), judul utama, dan teks penekanan. |
| **Biru Tua (Sekunder)** | `#134074` | Tombol utama (*Primary CTA*), menu modul aktif, dan subjudul. |
| **Sian (Aksen)** | `#00B4D8` | Penanda menu aktif, bilah progres (*progress bar*), ikon pendukung, dan sorotan (*highlight*). |
| **Hijau (Semantik Benar/Allow)** | `#2BB673` | Indikator hasil jawaban benar, tombol aksi *Allow* pada firewall, dan status trafik diterima / lulus KKM. |
| **Merah (Semantik Salah/Block)** | `#E5484D` | Indikator hasil jawaban salah, tombol aksi *Block* pada firewall, hapus soal, dan indikator ancaman jaringan. |
| **Kuning (Semantik Catatan)** | `#F5A524` | Kotak catatan penting dan penanda istilah kunci pada materi. |
| **Abu Biru Muda (Latar)** | `#F3F7FB` | Latar belakang utama halaman (*page background*). |
| **Putih (Kartu/Panel)** | `#FFFFFF` | Latar kartu (*card*), panel konten materi, tabel data, dan *modal pop-up*. |
| **Teks Gelap (Isi)** | `#1B2A41` | Warna teks isi paragraf agar memiliki kontras tinggi di atas latar terang dan nyaman dibaca. |

---

## 7. SPESIFIKASI TEKNIS & METODE PENGUJIAN

### 7.1 Spesifikasi Teknis Pengembangan
- **Platform:** Website interaktif yang diakses langsung melalui peramban (*browser*) pada komputer atau laptop di laboratorium sekolah tanpa instalasi aplikasi tambahan.
- **Bahasa & Teknologi:**
  - **HTML5:** Struktur semantik seluruh 17 layar antarmuka.
  - **CSS3:** Pengaturan tata letak responsif, tipografi *Poppins*, dan skema palet warna *CyberTech*.
  - **JavaScript:** Logika navigasi halaman, *pop-up role selection*, autentikasi Siswa & Guru, aktivitas *Drag and Drop* (Modul 1), *Studi Kasus* (Modul 2), *Simulasi Firewall Allow/Block* (Modul 3), penilaian kuis otomatis beserta *timer*, serta fungsi CRUD *Kelola Soal* pada akun Guru.
- **Alat Pengembangan:** Visual Studio Code (kode program), Figma & Canva (Lo-Fi/Hi-Fi Wireframe & Infografis), aplikasi penyunting video/audio, serta Google Chrome dan Microsoft Edge untuk pengujian.
- **Format Aset Media:** Gambar (`PNG`, `JPG`, `SVG`), Video & Animasi (`MP4`), Audio (`MP3`).
- **Distribusi / Hosting:** Layanan hosting web (seperti GitHub Pages, Netlify, atau Vercel) agar dapat diakses melalui tautan URL di laboratorium komputer SMK Negeri 1 Takalar.
- **Kebutuhan Perangkat Pengguna:** Komputer/laptop dengan RAM minimal 4 GB, resolusi layar minimal $1366 \times 768$, peramban versi terbaru, koneksi internet stabil, serta *speaker/headset*.

### 7.2 Metode Analisis Data Pengujian
1. **Analisis Black Box Testing (Skala Guttman):**
   Menggunakan skor $1$ (berhasil/sesuai harapan) dan $0$ (tidak berhasil). Kelengkapan fitur dihitung menggunakan rumus *Feature Completeness* (ISO/IEC 25010):
   $$FC = \left(1 - \frac{A}{B}\right) \times 100\%$$
   Di mana $A$ adalah jumlah fitur yang gagal dan $B$ adalah total seluruh fitur yang diuji. Target akhir tim adalah $FC = 100\%$.

2. **Analisis System Usability Scale (SUS):**
   Menggunakan 10 pernyataan baku berskala $1\text{--}5$. Untuk pernyataan bernomor ganjil, skor kontribusi adalah $(\text{skor jawaban} - 1)$; untuk pernyataan bernomor genap, skor kontribusi adalah $(5 - \text{skor jawaban})$. Jumlah skor kontribusi dikalikan $2,5$:
   $$\text{Skor SUS} = \left(\sum_{i=1}^{10} \text{Kontribusi}_i\right) \times 2,5$$
   - $\ge 80,3$: Grade A (*Excellent* / *Acceptable*)
   - $68\text{--}80,2$: Grade B–C (*Good* / *Acceptable*)
   - $51\text{--}67,9$: Grade D (*OK* / *Marginal*)
   - $< 51$: Grade F (*Poor* / *Not Acceptable*)

3. **Analisis Validasi Ahli (Materi & Media):**
   Menggunakan angket skala Likert $1\text{--}5$ dengan rumus persentase kelayakan:
   $$\text{Persentase} = \left(\frac{\text{Skor Perolehan}}{\text{Skor Maksimal}}\right) \times 100\%$$
   - $81\%\text{--}100\%$: Sangat Layak
   - $61\%\text{--}80\%$: Layak
   - $41\%\text{--}60\%$: Cukup Layak
   - $21\%\text{--}40\%$: Kurang Layak
   - $0\%\text{--}20\%$: Tidak Layak

---

## 8. ROADMAP & TIMELINE EKSEKUSI PROYEK (DARI AWAL SAMPAI AKHIR)

Seluruh tahapan pengembangan produk dilaksanakan secara terstruktur dari **Pekan 8 hingga Pekan 15** mengikuti 6 tahapan **MDLC Luther-Sutopo** (*Concept, Design, Material Collecting, Assembly, Testing, Distribution*):

| Pekan | Tahap MDLC | Rincian Kegiatan (Dari Awal Hingga Akhir) | Penanggung Jawab (PJ) | Luaran (Deliverables) |
| :--- | :--- | :--- | :--- | :--- |
| **Pekan 8** | **1. Concept** | • Observasi lapangan ke laboratorium komputer & jaringan internet SMK Negeri 1 Takalar.<br>• Wawancara guru mata pelajaran Administrasi Sistem Jaringan (30 September & 2 Oktober 2026).<br>• Dokumentasi kegiatan pengambilan data. | **Nasywan** | • Hasil wawancara guru.<br>• Lembar observasi.<br>• Dokumentasi lapangan. |
| **Pekan 9** | **1. Concept** | • Analisis kebutuhan pengguna dan analisis tingkat kesulitan materi.<br>• Penyusunan Proposal Bab I, Bab II, Bab III, serta Kanvas Analisis Kebutuhan. | • **Bab I:** Nabilah<br>• **Bab II:** Andi Imam<br>• **Bab III:** Alfira | • Dokumen Bab I–III.<br>• Kanvas Analisis Kebutuhan. |
| **Pekan 9** | **2. Design** | • Penyusunan Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP).<br>• Perancangan **Flowchart** alur navigasi lengkap (Siswa & Guru).<br>• Perancangan **Use Case Diagram**.<br>• Pembuatan **Lo-Fi Wireframe**, **Storyboard** (12 Halaman), dan **Hi-Fi Wireframe** (17 Layar). | • **CP & TP:** Nabilah<br>• **Flowchart:** Alfira<br>• **Use Case:** Nasywan<br>• **Lo-Fi & Hi-Fi Wireframe:**<br>  - Hal 1–2: Andi Imam<br>  - Hal 3–4: Nabilah<br>  - Hal 5–6: Alfira<br>  - Hal 7–8+: Nasywan<br>• **Storyboard:**<br>  - Hal 1–3: Nabilah<br>  - Hal 4–6: Andi Imam<br>  - Hal 7–9: Nasywan<br>  - Hal 10–12: Alfira | • Dokumen CP dan TP.<br>• Desain Flowchart & Use Case.<br>• Desain Lo-Fi Wireframe.<br>• Desain Storyboard 12 adegan.<br>• Desain Hi-Fi Wireframe lengkap. |
| **Pekan 10** | **3. Material Collecting** | • Pengumpulan dan penyusunan bahan materi untuk ketiga modul pembelajaran serta daftar referensi rujukan. | • **Modul 1:** Alfira<br>• **Modul 2:** Andi Imam<br>• **Modul 3:** Nabilah<br>• **Referensi dari Guru:** Nasywan | • Draf bahan materi Modul 1, Modul 2, dan Modul 3.<br>• Daftar referensi dari guru dan sumber pendukung. |
| **Pekan 11** | **3. Material Collecting** | • Pembuatan ilustrasi materi & infografis.<br>• Pembuatan video pembelajaran & animasi.<br>• Perekaman/penyiapan audio pembelajaran.<br>• Penyusunan bank soal kuis & evaluasi akhir beserta pembahasannya. | • **Ilustrasi Materi:** Nasywan<br>• **Video Pembelajaran:** Alfira<br>• **Audio Pembelajaran:** Nabilah<br>• **Soal Evaluasi:** Andi Imam | • Aset ilustrasi & infografis.<br>• Video & animasi pembelajaran.<br>• Audio pembelajaran.<br>• Bank soal evaluasi & kunci jawaban. |
| **Pekan 12** | **4. Assembly** | • Pemrograman struktur halaman (**HTML5**) dan tampilan antarmuka (**CSS3**) untuk seluruh halaman Siswa dan Guru sesuai Hi-Fi Wireframe. | • **HTML:** Nabilah, Andi Imam<br>• **CSS:** Nasywan, Alfira | • Halaman website lengkap dengan struktur HTML dan tampilan CSS. |
| **Pekan 12–13** | **4. Assembly** | • Pemrograman logika interaktif (**JavaScript**):<br>  1. Navigasi, pop-up role, registrasi, & login Siswa/Guru.<br>  2. Aktivitas *Drag and Drop* (Modul 1) & *Studi Kasus* (Modul 2).<br>  3. Aktivitas *Simulasi Firewall* (Modul 3).<br>  4. Mesin Kuis Evaluasi, Riwayat Nilai, & Panel CRUD Guru (Tambah/Edit/Hapus Soal, Data Siswa, Nilai Siswa). | • **Navigasi & Auth:** Alfira<br>• **Drag and Drop:** Nabilah<br>• **Simulasi Firewall:** Nasywan<br>• **Kuis, Evaluasi & Panel Guru:** Andi Imam | • Fitur navigasi & autentikasi.<br>• Fitur *Drag and Drop* & *Studi Kasus*.<br>• Fitur *Simulasi Firewall*.<br>• Fitur Kuis Evaluasi & Manajemen Guru. |
| **Pekan 13–14** | **5. Testing** | • Pelaksanaan **Black Box Testing** pada seluruh fitur sistem.<br>• Pelaksanaan **Validasi Ahli Materi** dan **Validasi Ahli Media**.<br>• Pengerjaan **Revisi Produk** berdasarkan hasil pengujian Black Box dan saran validator ahli. | • **Black Box Testing:**<br>  - Drag & Drop: Alfira<br>  - Simulasi Firewall: Nabilah<br>  - Kuis & Evaluasi: Nasywan<br>  - Navigasi: Andi Imam<br>• **Validasi Ahli:** Nasywan & Pihak Sekolah<br>• **Revisi Produk:**<br>  - Revisi Navigasi: Alfira<br>  - Revisi Drag & Drop: Nabilah<br>  - Revisi Simulasi Firewall: Nasywan<br>  - Revisi Kuis & Evaluasi: Andi Imam | • Laporan hasil Black Box Testing ($FC = 100\%$).<br>• Lembar validasi & saran perbaikan dari ahli materi dan ahli media.<br>• Produk hasil revisi beserta catatan revisi. |
| **Pekan 15** *(13–15 Nov 2026)* | **5. Testing & 6. Distribution** | • Uji pengguna kepada siswa menggunakan **System Usability Scale (SUS)**.<br>• Publikasi (*hosting*) website **CyberTech**.<br>• Penyusunan buku panduan pengguna (*User Manual*) dan dokumentasi teknis.<br>• Penyusunan laporan akhir (Bab V–VI) dan tabel pelaporan penggunaan AI.<br>• Finalisasi slide presentasi dan latihan demo untuk Seminar Akhir (Pertemuan 15–16). | • **Uji Pengguna (SUS):** Nasywan<br>• **Publikasi Website:** Andi Imam<br>• **User Manual:** Nabilah<br>• **Dokumentasi Teknis:** Alfira<br>• **Pengecekan Akhir Manual & Dok:** Nasywan<br>• **Laporan Bab V:** Nasywan<br>• **Laporan Bab VI:** Nabilah<br>• **Tabel Pelaporan AI:** Alfira, Andi Imam<br>• **Slide & Demo Seminar Akhir:** Semua Anggota | • Hasil uji pengguna (Skor SUS).<br>• Tautan akses website yang telah dipublikasikan.<br>• Buku panduan pengguna (*User Manual*) & Dokumentasi Teknis.<br>• Laporan akhir Bab V–VI & Tabel penggunaan AI.<br>• Slide presentasi final & kesiapan demo produk. |