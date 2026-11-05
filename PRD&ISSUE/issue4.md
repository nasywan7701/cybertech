# Issue 4: Modul 1 - Identifikasi Ancaman Jaringan (Materi, Video Pembelajaran, & Aktivitas Drag and Drop)

## 1. Deskripsi & Tujuan
Sebagai Siswa, saya ingin mempelajari materi Modul 1 mengenai pengertian keamanan jaringan dan 4 jenis ancaman jaringan (*Virus, Worm, Phishing, DDoS*), menonton video pembelajaran dengan pemutar interaktif, serta melatih pemahaman saya melalui aktivitas interaktif *Drag and Drop* sebelum melangkah ke kuis evaluasi.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 3 (Tabel Modul 1), Bagian 4.3, dan Bagian 5 (Layar 7, 8, 9).
- **Aset & Layar Terkait:**
  - `7. Halaman Modul (Contoh Modul 1).png`
  - `Main.png` & `Bottom Action Area.png`
  - `8. Video Pembelajaran.png` & `16_9 THEMATIC VIDEO PLAYER SIMULATOR.png`
  - `9. Aktivitas (Drag and Drop).png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 7: Halaman Materi Modul 1 (`student/module1-material.html`)
- **Struktur Halaman:**
  - Breadcrumb penunjuk arah: `Beranda > Modul Pembelajaran > Modul 1: Identifikasi Ancaman Jaringan`.
  - Judul Modul: `Poppins 32px Bold`, `#0B2545`.
  - Subjudul: `Poppins 20px SemiBold`, `#134074`.
  - Paragraf Konten Materi (`Poppins 16px Regular`, line-height `1.6`, `#1B2A41`):
    - Pengertian Keamanan Jaringan.
    - Pembahasan 4 Jenis Ancaman Jaringan:
      1. **Virus:** Program perusak yang menempel pada file induk dan butuh aksi pengguna untuk menyebar.
      2. **Worm:** Malware mandiri yang dapat menggandakan diri dan menyebar melalui celah jaringan tanpa campur tangan pengguna.
      3. **Phishing:** Teknik penipuan manipulasi psikologis (email/link palsu) untuk mencuri data rahasia/kredensial.
      4. **DDoS (Distributed Denial of Service):** Serangan membanjiri server dengan ribuan request palsu hingga server tumbang (*down*).
  - **Kotak Catatan Penting / Istilah Kunci:**
    - Background kuning lembut, border kiri tebal Kuning `#F5A524`, teks sorotan.
  - **Kartu Visual 4 Ancaman:**
    - Kartu berlatar putih `#FFFFFF` dengan ikon/ilustrasi tematik dan poin karakteristik masing-masing ancaman.
  - **Bottom Action Area:**
    - Tombol navigasi: `← Kembali ke Daftar Modul` dan `Lanjut ke Video Pembelajaran →` (`#134074`).

### 3.2 Layar 8: Halaman Video Pembelajaran (`student/module1-video.html`)
- **Komponen Video Player 16:9:**
  - Container responsif rasio 16:9 bertema *CyberTech*.
  - Pemutar video HTML5 dengan custom kontrol: Play/Pause, Seekbar, Durasi/Time display, Volume bar, dan Fullscreen toggle.
  - Fallback / embed video edukasi materi ancaman jaringan.
- Ringkasan materi video di bawah pemutar.
- **Navigasi Bawah:**
  - `← Kembali ke Materi`
  - `Lanjut ke Aktivitas Drag and Drop →`

### 3.3 Layar 9: Aktivitas Interaktif Drag and Drop (`student/module1-activity.html`)
- **Instruksi:** "Tarik dan tempatkan kartu skenario kasus ke dalam zona jenis ancaman yang sesuai!"
- **Zona Target (Drop Targets - 4 Kotak):**
  1. Zona **Virus**
  2. Zona **Worm**
  3. Zona **Phishing**
  4. Zona **DDoS**
- **Kartu Skenario Draggable (4 Kartu Acak):**
  - Skenario A: *"Sebuah email masuk mengatasnamakan bank sekolah meminta guru memasukkan password akun segera melalui tautan terlampir."* -> Phishing
  - Skenario B: *"Server website sekolah tiba-tiba tidak dapat diakses setelah menerima jutaan permintaan koneksi palsu secara bersamaan dari ribuan komputer."* -> DDoS
  - Skenario C: *"Sebuah komputer terinfeksi setelah pengguna menjalankan file .exe bajakan, lalu file dokumen di sekitarnya ikut rusak."* -> Virus
  - Skenario D: *"Tanpa ada file yang dibuka oleh siswa, satu ruangan lab terinfeksi secara otomatis melalui celah port jaringan yang terbuka."* -> Worm
- **Logika & Umpan Balik:**
  - Drag and Drop API native HTML5 (mendukung desktop mouse drag dan touch/click fallback).
  - Tombol **"Cek Jawaban"**:
    - Memberi border dan badge Hijau (`#2BB673`) pada pasangan yang benar.
    - Memberi border dan badge Merah (`#E5484D`) pada pasangan yang salah beserta pesan petunjuk perbaikan.
  - Tombol **"Reset Aktivitas"** untuk mengulang latihan.
  - Jika seluruh 4 kartu dijawab dengan benar:
    - Muncul modal/pesan selamat kelulusan aktivitas.
    - Tombol **"Lanjut ke Kuis Evaluasi Modul 1 →"** terbuka dan aktif.
  - Progres modul diperbarui menjadi minimal $50\%$ di `localStorage`.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat file `student/module1-material.html` dan susun struktur materi lengkap dengan visual kartu ancaman dan kotak catatan kuning `#F5A524`.
- [x] Buat file `student/module1-video.html` dengan custom video player 16:9 yang responsif dan kontrol navigasi.
- [x] Buat file `student/module1-activity.html` dan skrip interaktif `student/js/drag-drop.js`.
- [x] Implementasikan event dragstart, dragover, drop, dan dragend untuk desktop serta opsi klik pilih target untuk fleksibilitas.
- [x] Terapkan visual evaluasi: border hijau `#2BB673` jika benar, merah `#E5484D` jika salah saat tombol "Cek Jawaban" ditekan.
- [x] Sinkronkan penyelesaian aktivitas Modul 1 ke data progres siswa di `localStorage`.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Seluruh materi teks Modul 1 tersaji lengkap, rapi, dan mudah dibaca dengan tipografi Poppins. [TERPENUHI]
2. Pemutar video 16:9 dapat memutar media serta responsif pada resolusi 1366x768. [TERPENUHI]
3. Keempat kartu skenario dapat ditarik (*dragged*) dan diletakkan (*dropped*) ke dalam 4 kotak target yang sesuai. [TERPENUHI]
4. Tombol "Cek Jawaban" memberikan indikasi warna hijau untuk jawaban yang tepat dan warna merah untuk jawaban yang salah. [TERPENUHI]
5. Tombol lanjut ke Kuis Evaluasi hanya dapat diakses atau menjadi aktif setelah siswa menyelesaikan aktivitas dengan benar. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `student/module1-material.html` (Layar 7: Pengertian keamanan jaringan, 4 kartu ancaman Virus, Worm, Phishing, DDoS, kotak catatan semantik kuning `#F5A524`, bottom action area)
  - `student/module1-video.html` (Layar 8: Pemutar video 16:9 thematic edukasi dengan play/pause, seekbar, timer real-time, ulasan materi)
  - `student/module1-activity.html` (Layar 9: Board interaktif drag and drop 4 zona ancaman, validasi feedback hijau/merah, banner kelulusan)
  - `student/css/module.css` (Styling materi, video player 16:9, drop zones, draggable cards)
  - `student/js/module-common.js` (Helper pencatatan progres modul ke `localStorage`)
  - `student/js/drag-drop.js` (Engine drag and drop native HTML5 + tap-selection fallback)

