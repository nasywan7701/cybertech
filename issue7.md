# Issue 7: Mesin Kuis Evaluasi, Timer Real-time, Hero Scorecard, & Halaman Pembahasan Kuis

## 1. Deskripsi & Tujuan
Sebagai Siswa, saya ingin mengerjakan soal-soal evaluasi kuis pilihan ganda yang dilengkapi penghitung waktu (*timer*), melihat hasil perolehan skor dan status kelulusan KKM ($\ge 75$), mempelajari pembahasan rinci untuk setiap butir soal, serta meninjau riwayat nilai saya di menu Aktivitas.

---

## 2. Kaitan Spesifikasi PRD & Wireframe
- **Seksi PRD:** Bagian 1.3 (Ketuntasan KKM $\ge 75$), Bagian 4.3, dan Bagian 5 (Layar 10, 11, 12).
- **Aset & Layar Terkait:**
  - `10. Kuis Modul.png` & `Soal.png`
  - `11. Hasil Kuis.png` & `Section - HERO RESULT SCORECARD_margin.png`
  - `12. Pembahasan Kuis.png` & `Container.png`

---

## 3. Komponen & Detail Spesifikasi Antarmuka

### 3.1 Layar 10: Halaman Pengerjaan Kuis (`student/quiz.html?module=1|2|3`)
- **Header Kuis:**
  - Judul Kuis: *"Kuis Evaluasi Modul [X]: [Nama Modul]"*.
  - Indikator Progres Soal: misal *"Soal 3 dari 10"*.
  - **Penghitung Waktu Mundur (*Countdown Timer*):** Misal 15 menit (format `MM:SS`), berkedip oranye/merah saat sisa waktu $< 2$ menit. Jika waktu habis, sistem otomatis men-submit jawaban yang telah dipilih.
- **Kartu Pertanyaan (`Soal.png`):**
  - Teks Soal: `Poppins 16px Regular`, `#1B2A41`.
  - **4 Kartu Pilihan Jawaban (A, B, C, D):**
    - Desain kartu interaktif berlatar putih `#FFFFFF` dengan efek sorotan border dan latar Sian Muda (`#00B4D8`) saat dipilih.
    - Radio button yang sinkron dengan kartu opsi.
- **Bilah Navigasi Soal:**
  - Tombol **"← Sebelumnya"**
  - Tombol **"Selanjutnya →"**
  - Tombol **"Kirim Jawaban (Submit) ✓"** (muncul pada butir soal terakhir atau bila seluruh soal sudah terjawab) lengkap dengan modal dialog konfirmasi penyerahan kuis.

### 3.2 Layar 11: Halaman Hasil Kuis (`student/quiz-result.html`)
- **Komponen Hero Scorecard (`Section - HERO RESULT SCORECARD_margin.png`):**
  - Ikon Piala / Medali Kelulusan.
  - Teks Ucapan Selamat / Penyemangat.
  - **Tampilan Skor Besar:** misal `85 / 100`.
  - **Lencana Status KKM:**
    - Jika Skor $\ge 75$: Badge Hijau Semantik `#2BB673` bertuliskan **"TUNTAS (LULUS KKM)"**.
    - Jika Skor $< 75$: Badge Merah Semantik `#E5484D` bertuliskan **"BELUM TUNTAS (< KKM 75)"**.
  - **Statistik Hasil:** Jumlah Jawaban Benar, Jawaban Salah, dan Waktu Pengerjaan.
- **Tombol Aksi Bawah:**
  1. Tombol **"Lihat Pembahasan"** (`#134074`) -> mengarahkan ke halaman pembahasan soal.
  2. Tombol **"Ulangi Kuis"** (tampil jika siswa belum mencapai KKM atau ingin memperbaiki nilai).
  3. Tombol **"Kembali ke Dashboard"** (`#0B2545`).

### 3.3 Layar 12: Halaman Pembahasan Kuis (`student/quiz-review.html`)
- **Komponen Container Pembahasan (`Container.png`):**
  - Menampilkan daftar berurut seluruh butir soal yang telah dikerjakan.
  - Pada setiap butir kartu soal memuat:
    1. Nomor dan teks pertanyaan.
    2. Opsi jawaban yang dipilih oleh siswa (diberi tanda khusus).
    3. **Lencana Status:** Lencana Hijau **"Jawaban Anda Benar"** (`#2BB673`) atau Merah **"Jawaban Anda Salah"** (`#E5484D`).
    4. **Kunci Jawaban Resmi:** Ditampilkan secara jelas dengan warna teks hijau tegas.
    5. **Kotak Penjelasan / Pembahasan Soal:** Kotak berlatar abu-biru muda dengan penjelasan konsep materi mengapa kunci jawaban tersebut benar.
- Tombol navigasi kembali ke Dashboard Siswa atau Riwayat Nilai.

### 3.4 Halaman Riwayat Aktivitas & Nilai (`student/activity.html`)
- Tabel rekapitulasi kuis yang pernah dikerjakan oleh siswa:
  - Kolom: Modul, Tanggal Pengerjaan, Skor, Status KKM, Aksi (Lihat Pembahasan).

---

## 4. Rincian Pekerjaan (Checklist Task)
- [x] Rancang skrip mesin kuis terpusat di `student/js/quiz-engine.js`.
- [x] Buat file `student/quiz.html` yang merender soal dinamis berdasarkan parameter modul dari bank soal `localStorage`.
- [x] Implementasikan timer hitung mundur dengan auto-submit saat waktu habis.
- [x] Implementasikan algoritma penilaian skor otomatis (skor dihitung berbasis bobot atau $\frac{\text{Benar}}{\text{Total}} \times 100$).
- [x] Buat file `student/quiz-result.html` dengan tata letak scorecard heroik sesuai wireframe.
- [x] Buat file `student/quiz-review.html` yang merender analisis jawaban siswa vs kunci jawaban resmi dan pembahasan lengkap.
- [x] Simpan riwayat pengerjaan ke dalam koleksi `cybertech_results` di `localStorage`.
- [x] Buat file `student/activity.html` untuk melihat daftar riwayat capaian nilai siswa.
- [x] Perbarui status modul di Dashboard siswa menjadi $100\%$ selesai dengan badge hijau `#2BB673` bila siswa mencapai skor $\ge 75$.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
1. Siswa dapat berpindah antarsoal dengan mulus dan opsi yang dipilih tetap tersimpan sebelum dikirim. [TERPENUHI]
2. Timer mundur berjalan akurat dan otomatis men-submit jika waktu habis. [TERPENUHI]
3. Halaman hasil kuis menghitung skor secara tepat dan menampilkan status KKM (lulus jika $\ge 75$). [TERPENUHI]
4. Halaman pembahasan secara transparan menyajikan jawaban siswa, kunci jawaban, dan kotak ulasan materi. [TERPENUHI]
5. Hasil evaluasi otomatis terekam di riwayat aktivitas siswa dan dapat diakses oleh guru. [TERPENUHI]

---

## 6. Status Eksekusi
- **Status:** **SELESAI (COMPLETED)**
- **Aset & File Dihasilkan:**
  - `student/quiz.html` (Layar 10: Antarmuka pengerjaan kuis, countdown timer 10 menit, 4 opsi pilihan ganda A-D, palet navigasi nomor soal)
  - `student/quiz-result.html` (Layar 11: Hero Scorecard trofi, angka skor besar, status kelulusan KKM $\ge 75$, rincian jawaban benar/salah, tombol aksi)
  - `student/quiz-review.html` (Layar 12: Container pembahasan seluruh butir soal, pencocokan pilihan siswa vs kunci jawaban resmi, kotak penjelasan konsep)
  - `student/css/quiz.css` (Styling kuis, scorecard hasil heroik, palet nomor, kartu review)
  - `student/js/quiz-engine.js` (Engine kuis evaluasi, countdown timer, auto-submit, kalkulasi skor, auto-update status kelulusan modul ke `localStorage`)

