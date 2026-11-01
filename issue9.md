# Issue 9: Portal Guru - Manajemen Bank Soal Kuis (Fitur CRUD Soal, Kunci, & Pembahasan)

## 1. Deskripsi & Tujuan
Sebagai Guru Mata Pelajaran, saya ingin memiliki antarmuka pengelolaan evaluasi kuis untuk Modul 1, Modul 2, dan Modul 3 yang memungkinkan saya melihat daftar soal, menambah soal baru, mengubah soal yang sudah ada, serta menghapus butir soal agar materi evaluasi dapat disesuaikan dengan kebutuhan pembelajaran siswa SMK.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 2.2, 4.4, dan Bagian 5 (Layar 14 & Layar 15).
- **Aset & Layar Terkait:**
  - `14. Kelola Kuis.png`
  - `15. Tambah/Edit Soal.png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 14: Halaman Kelola Kuis / Bank Soal (`teacher/manage-quizzes.html`)
- **Bilah Kontrol Atas:**
  - **Pemilih Modul (Tab / Dropdown):**
    - Modul 1: Identifikasi Ancaman Jaringan
    - Modul 2: Analisis Sistem Keamanan Jaringan
    - Modul 3: Firewall
  - **Tombol Aksi Utama:**
    - **"+ Tambah Soal Baru"** (Warna `#134074` dengan aksen `#00B4D8`).
  - Indikator Jumlah Soal Aktif pada modul terpilih (misal: *"Total: 10 Soal"*).
- **Tabel Daftar Soal:**
  - Kolom:
    1. No
    2. Pertanyaan (ringkasan teks soal)
    3. Pilihan Opsi (A, B, C, D)
    4. Kunci Jawaban Resmi (Badge Hijau `#2BB673`)
    5. Aksi:
       - Tombol **"Edit Soal"** (Ikon pensil, warna aksen Sian `#00B4D8`).
       - Tombol **"Hapus Soal"** (Ikon tempat sampah, warna Semantik Merah `#E5484D`).
- **Modal Konfirmasi Hapus Soal:**
  - Peringatan: *"Apakah Anda yakin ingin menghapus butir soal ini? Tindakan ini tidak dapat dibatalkan."*
  - Tombol **Batal** dan Tombol **Hapus Permanen** (`#E5484D`).

### 3.2 Layar 15: Halaman / Modal Tambah & Edit Soal (`teacher/quiz-editor.html` atau Modal Dialog)
- **Formulir Isian Lengkap:**
  1. **Pilihan Target Modul:** Dropdown (Modul 1, Modul 2, Modul 3) — terkunci otomatis jika dibuka dari konteks modul tertentu.
  2. **Kolom Teks Pertanyaan:** Textarea berukuran proporsional (`Poppins 16px`), wajib diisi.
  3. **Kolom Pilihan Jawaban (A, B, C, D):**
     - Input Teks Opsi A
     - Input Teks Opsi B
     - Input Teks Opsi C
     - Input Teks Opsi D
  4. **Pemilih Kunci Jawaban Benar:** Radio button atau Dropdown pilihan (A / B / C / D).
  5. **Kolom Input Pembahasan Soal:**
     - Textarea untuk memasukkan penjelasan teoritis mengapa kunci jawaban tersebut benar. Penjelasan ini yang akan dibaca siswa di Halaman Pembahasan Kuis.
- **Tombol Aksi Bawah:**
  - Tombol **"Simpan Soal"** (atau **"Update Perubahan"** jika dalam mode edit) warna `#2BB673` / `#134074`.
  - Tombol **"Batal"** (menutup form dan kembali ke tabel daftar soal).

### 3.3 Sinkronisasi Data & Validasi Input
- Validasi form memastikan:
  - Teks soal tidak boleh kosong.
  - Seluruh opsi A, B, C, D harus terisi.
  - Kunci jawaban wajib dipilih.
  - Pembahasan wajib diisi.
- Perubahan langsung disimpan ke koleksi `cybertech_quizzes` di `localStorage`.
- Setiap butir soal memiliki ID unik (`quiz_m{moduleId}_{timestamp}`).
- Ketika siswa membuka kuis evaluasi, soal yang ditampilkan langsung mengacu pada bank data yang telah diperbarui oleh guru.

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Buat file `teacher/manage-quizzes.html` dengan tata letak tab pemilihan modul dan tabel daftar soal.
- [x] Buat file modul script `teacher/js/quiz-manager.js` untuk menangani logika CRUD bank soal.
- [x] Implementasikan alur **Tambah Soal**: menampilkan form kosong, memvalidasi input, dan menambahkan data baru ke `localStorage`.
- [x] Implementasikan alur **Edit Soal**: mengisi otomatis (*pre-fill*) form dengan data soal terpilih, lalu memperbarui item di `localStorage`.
- [x] Implementasikan alur **Hapus Soal**: memicu modal konfirmasi sebelum menghapus item dari array soal.
- [x] Berikan notifikasi toast umpan balik (berhasil tambah, berhasil update, berhasil hapus).
- [x] Pastikan mesin kuis siswa (`student/quiz.html`) secara instan merefleksikan perubahan soal yang dilakukan oleh guru.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Guru dapat memfilter tabel soal berdasarkan Modul 1, 2, atau 3. [TERPENUHI]
2. Form Tambah Soal memvalidasi seluruh input (pertanyaan, 4 opsi, kunci jawaban, dan pembahasan). [TERPENUHI]
3. Guru dapat mengedit butir soal yang sudah ada tanpa merusak urutan atau ID soal lainnya. [TERPENUHI]
4. Fitur Hapus Soal dilengkapi konfirmasi pencegahan ketidaksengajaan. [TERPENUHI]
5. Soal yang baru ditambahkan atau diubah oleh guru langsung tampil saat siswa mengerjakan kuis evaluasi pada modul terkait. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `teacher/manage-quizzes.html` (Layar 14: Pemilih modul 1-3, tabel butir soal aktif, tombol Tambah Soal, modal editor soal Layar 15, modal konfirmasi hapus permanen)
  - `teacher/js/quiz-manager.js` (Engine CRUD bank soal kuis, validasi kelengkapan pertanyaan & 4 opsi A-D, update sinkronisasi instan ke `localStorage`)

