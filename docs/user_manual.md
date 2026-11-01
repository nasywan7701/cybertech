# BUKU PANDUAN PENGGUNA (USER MANUAL)
# Website Multimedia Pembelajaran Interaktif: CyberTech

Platform Pembelajaran Administrasi Sistem Jaringan (Topik: Keamanan Jaringan)  
SMK Negeri 1 Takalar &bull; Kelompok 3 PTIK UNM (2026)

---

## 1. PANDUAN PENGGUNAAN UNTUK SISWA

### 1.1 Membuka Website & Memilih Peran
1. Buka peramban (*Google Chrome* atau *Microsoft Edge*) pada komputer laboratorium atau laptop Anda.
2. Akses halaman utama website **CyberTech** (`index.html`).
3. Klik tombol **"Mulai Belajar"** di bagian tengah halaman, atau klik salah satu dari **3 Kartu Fitur** di bawah (*Materi Interaktif, Video Pembelajaran, Kuis dan Simulasi*).
4. Pada jendela *Pop-up Pemilihan Peran*, pilih **"Masuk sebagai Siswa"**.

### 1.2 Pendaftaran Akun Baru (Registrasi Siswa)
1. Jika Anda belum memiliki akun, klik tautan **"Buat Akun Baru"** pada halaman login.
2. Isi formulir pendaftaran secara berurutan:
   - **Nama Lengkap Siswa** (Contoh: *Andi Pratama*)
   - **Alamat Email** (Contoh: *andi@smkn1takalar.sch.id*)
   - **Kata Sandi** (Minimal 6 karakter)
   - **Konfirmasi Kata Sandi** (Ketik ulang kata sandi yang sama)
3. Klik tombol **"Daftar Akun Sekarang"**. Sistem akan otomatis membuatkan akun Anda dan mengarahkan langsung ke **Dashboard Siswa**.

### 1.3 Menjelajahi Dashboard & Katalog Modul
- **Dashboard Siswa (`dashboard.html`):**
  - Melihat banner selamat datang yang menyapa nama Anda.
  - Memantau bilah progres belajar global (rata-rata ketuntasan 3 modul).
  - Mengamati kartu status penyelesaian Modul 1, Modul 2, dan Modul 3 (kartu akan berubah warna menjadi **Hijau Sukses** bila tuntas $100\%$).
- **Sidebar Navigasi Kiri:**
  - **Beranda:** Kembali ke Dashboard utama siswa.
  - **Modul Pembelajaran:** Membuka katalog lengkap 3 modul.
  - **Aktivitas & Hasil Kuis:** Meninjau daftar riwayat nilai kuis yang pernah Anda kerjakan.
  - **Profil:** Mengubah foto avatar karakter dan memperbarui kata sandi Anda.
  - **Logout:** Keluar dari sesi akun siswa dengan aman.

### 1.4 Alur Belajar Terstruktur Tiap Modul
Di setiap modul, Anda disarankan menjalani 4 tahapan belajar berurutan:
1. **Tahap 1: Membaca Materi Teori (`material.html`):**
   - Baca penjelasan teks terstruktur dan amati kartu visual jenis ancaman atau sistem keamanan.
   - Perhatikan kotak semantik kuning bertuliskan **Catatan Penting** untuk mengingat poin kunci.
   - Klik tombol **"Lanjut ke Video Pembelajaran →"**.
2. **Tahap 2: Menonton Video Pembelajaran (`video.html`):**
   - Tekan tombol **Play** pada pemutar video bertema 16:9.
   - Amati visualisasi animasi pergerakan paket data dan skenario insiden keamanan.
   - Klik tombol **"Lanjut ke Aktivitas Interaktif →"**.
3. **Tahap 3: Mengerjakan Latihan Aktivitas Interaktif (`activity.html`):**
   - **Modul 1 (Drag & Drop):** Tarik kartu skenario kasus ke dalam zona target (*Virus, Worm, Phishing, DDoS*), lalu tekan **"Cek Jawaban Saya"**.
   - **Modul 2 (Studi Kasus):** Baca 3 skenario nyata secara berurutan, pilih kartu solusi keamanan (*Antivirus, Firewall, VPN, Autentikasi*), lalu tekan **"Analisis & Kirim Solusi"**.
   - **Modul 3 (Simulasi Firewall):** Pilih jenis trafik data, tentukan aturan **ALLOW** (hijau) atau **BLOCK** (merah), lalu tekan **"Jalankan Simulasi Paket Data"**. Selesaikan ke-4 misi trafik.
   - Setelah aktivitas tuntas $100\%$ benar, tombol menuju Kuis Evaluasi akan otomatis terbuka.
4. **Tahap 4: Mengerjakan Kuis Evaluasi (`quiz.html`):**
   - Perhatikan penghitung waktu mundur (*timer*) 10 menit di kanan atas.
   - Klik kartu opsi jawaban (**A, B, C, atau D**) pada setiap nomor soal.
   - Gunakan palet nomor soal di sebelah kanan untuk melompat ke nomor yang ingin diperiksa kembali.
   - Klik **"Kirim Jawaban (Submit) ✓"** untuk menyelesaikan kuis.
5. **Melihat Hasil Skor & Pembahasan (`quiz-result.html` & `quiz-review.html`):**
   - Amati perolehan nilai Anda. Batas KKM kelulusan adalah **Nilai $\ge 75$**.
   - Klik **"Lihat Pembahasan Soal"** untuk melihat kunci jawaban resmi beserta penjelasan konsep teoritis pada setiap butir soal.
   - Jika nilai Anda masih di bawah KKM ($< 75$), klik tombol **"Ulangi Kuis"** untuk melakukan remedial mandiri.

---

## 2. PANDUAN PENGGUNAAN UNTUK GURU

### 2.1 Masuk ke Portal Guru (Login Guru)
1. Buka halaman utama website **CyberTech** (`index.html`).
2. Klik tombol **"Login"** di pojok kanan atas navbar, lalu pilih **"Masuk sebagai Guru"**.
3. Masukkan kredensial resmi bawaan pengembang (*pre-provisioned*):
   - **Username:** `guru`
   - **Kata Sandi:** `guru123cybertech`
4. Klik tombol **"Login Sekarang"**. Sistem akan mengarahkan Anda ke **Dashboard Guru**.

### 2.2 Memantau Metrik Dashboard Kelas (`teacher/dashboard.html`)
- Memantau 4 kartu indikator utama kelas ASJ:
  1. *Total Siswa Terdaftar:* Jumlah akun siswa yang aktif di sekolah.
  2. *Total Bank Soal:* Akumulasi butir soal evaluasi aktif pada Modul 1, 2, dan 3.
  3. *Rata-rata Nilai Kelas:* Rata-rata perolehan skor kuis seluruh siswa.
  4. *Ketuntasan KKM:* Persentase pengerjaan kuis siswa yang telah lulus KKM ($\ge 75$).
- Memantau tabel aktivitas penyerahan kuis terbaru oleh siswa secara *real-time*.

### 2.3 Mengelola Direktori Siswa (`teacher/students.html`)
1. Gunakan kotak pencarian (*Search Bar*) untuk menyaring siswa berdasarkan nama lengkap atau alamat email.
2. Lihat kolom *Capaian Modul* untuk memantau apakah siswa bersangkutan telah menuntaskan Modul 1, 2, atau 3.
3. Klik tombol **"Lihat Detail 👁️"** pada baris siswa untuk membuka modal profil lengkap, mencakup NISN, progres belajar per modul, dan riwayat seluruh nilai kuis yang pernah dikerjakan.

### 2.4 Mengolah Rekapitulasi Nilai & Cetak Rapor (`teacher/results.html`)
1. Pilih filter modul melalui dropdown (*Semua Modul*, *Modul 1*, *Modul 2*, atau *Modul 3*).
2. Periksa skor nilai, status kelulusan KKM, serta waktu submit siswa.
3. Klik tombol **"Periksa Jawaban 📋"** untuk meninjau lembar jawaban siswa butir demi butir guna memverifikasi pemahaman siswa.
4. Klik tombol **"🖨️ Cetak / Ekspor PDF"** untuk mencetak rekapitulasi nilai kelas dalam format lembar kerja fisik yang bersih tanpa elemen navigasi website.

### 2.5 Mengelola Bank Soal Evaluasi / CRUD Soal (`teacher/manage-quizzes.html`)
1. **Memilih Modul:** Gunakan pemilih modul untuk memilih Modul 1, 2, atau 3.
2. **Menambah Soal Baru:**
   - Klik tombol **"+ Tambah Soal Baru"**.
   - Isi teks pertanyaan soal, masukkan teks opsi **A, B, C, dan D**, tentukan **Kunci Jawaban Resmi**, serta ketikkan **Pembahasan / Ulasan Konsep**.
   - Klik **"Simpan Butir Soal"**. Soal baru otomatis aktif dan langsung tampil saat siswa mengerjakan kuis.
3. **Mengedit Soal:**
   - Klik tombol **"✏️ Edit"** pada butir soal yang ingin diperbarui.
   - Ubah teks pertanyaan, opsi, kunci, atau pembahasannya, lalu klik simpan.
4. **Menghapus Soal:**
   - Klik tombol **"🗑️ Hapus"** pada soal yang ingin dihilangkan.
   - Konfirmasi pada modal peringatan untuk menghapus soal secara permanen.

### 2.6 Mengatur Profil Guru (`teacher/profile.html`)
- Mengubah nama lengkap beserta gelar pengajar dan NIP.
- Memperbarui kata sandi akun guru demi menjaga keamanan bank soal dan nilai siswa.

