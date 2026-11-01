/**
 * ===================================================================
 * CyberTech - Local Storage Management & Seed Data Layer (with MySQL API Sync)
 * Menangani persistensi data akun, modul, bank soal, dan hasil kuis
 * Mendukung mode Offline (localStorage) & mode Online/Server (MySQL API via Laragon/XAMPP)
 * ===================================================================
 */

const STORAGE_KEYS = {
  USERS: 'cybertech_users',
  CURRENT_USER: 'cybertech_current_user',
  MODULES: 'cybertech_modules',
  PROGRESS: 'cybertech_student_progress',
  QUIZZES: 'cybertech_quizzes',
  RESULTS: 'cybertech_results'
};

const DEFAULT_USERS = [
  {
    id: 'user_guru_01',
    username: 'guru',
    email: 'guru@smkn1takalar.sch.id',
    nama: 'Guru Pembimbing TKJ',
    password: 'guru123cybertech',
    role: 'guru',
    nip: '198507152010011012',
    avatar: 'G',
    createdAt: '2026-10-26T08:00:00.000Z'
  },
  {
    id: 'user_siswa_01',
    username: 'siswa',
    email: 'siswa@smkn1takalar.sch.id',
    nama: 'Nasywan Siswa TKJ',
    password: 'siswa123cybertech',
    role: 'siswa',
    nisn: '0061234567',
    kelas: 'XI TJKT 1',
    sekolah: 'SMK Negeri 1 Takalar',
    avatar: 'N',
    createdAt: '2026-10-26T09:00:00.000Z'
  }
];

const DEFAULT_MODULES = [
  {
    id: '1',
    kode: 'MODUL-01',
    judul: 'Identifikasi Ancaman Jaringan',
    subjudul: 'Virus, Worm, Phishing, dan DDoS',
    deskripsi: 'Memahami pengertian keamanan jaringan, mengklasifikasikan 4 jenis ancaman siber, dan metode pencegahan preventif.',
    durasi: '45 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'shield-alert'
  },
  {
    id: '2',
    kode: 'MODUL-02',
    judul: 'Analisis Sistem Keamanan Jaringan',
    subjudul: 'Antivirus, Firewall, VPN, dan Autentikasi',
    deskripsi: 'Menganalisis efektivitas 4 komponen sistem pertahanan jaringan berlapis dalam mengatasi berbagai insiden keamanan.',
    durasi: '60 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'lock'
  },
  {
    id: '3',
    kode: 'MODUL-03',
    judul: 'Firewall & Penyaringan Paket Data',
    subjudul: 'Konfigurasi Aturan Allow dan Block',
    deskripsi: 'Menerapkan penyaringan paket lalu lintas data berdasarkan port/protokol serta menganalisis hasil simulasi firewall.',
    durasi: '60 Menit',
    totalSoal: 5,
    kkm: 75,
    icon: 'flame'
  }
];

const DEFAULT_QUIZZES = [
  /* --- KUIS MODUL 1: Ancaman Jaringan --- */
  {
    id: 'q_m1_01',
    moduleId: '1',
    pertanyaan: 'Jenis malware yang dapat menggandakan dirinya secara mandiri dan menyebar ke komputer lain melalui celah jaringan tanpa memerlukan tindakan dari pengguna disebut...',
    opsi: {
      A: 'Virus',
      B: 'Worm',
      C: 'Trojan Horse',
      D: 'Spyware'
    },
    kunci: 'B',
    pembahasan: 'Worm adalah program berbahaya mandiri yang mampu mereplikasi dirinya dan menyebar otomatis melalui celah port/protokol jaringan tanpa perlu menempel pada program induk atau campur tangan pengguna.'
  },
  {
    id: 'q_m1_02',
    moduleId: '1',
    pertanyaan: 'Seorang staf sekolah menerima pesan email yang menyerupai tampilan resmi bank dan meminta login ulang pada tautan palsu untuk memperbarui password. Serangan ini merupakan bentuk...',
    opsi: {
      A: 'Phishing',
      B: 'DDoS Attack',
      C: 'SQL Injection',
      D: 'Man-in-the-Middle'
    },
    kunci: 'A',
    pembahasan: 'Phishing adalah bentuk rekayasa sosial (social engineering) di mana pelaku menyamar sebagai entitas tepercaya melalui pesan/email palsu guna mengelabui korban agar memberikan data kredensial rahasia.'
  },
  {
    id: 'q_m1_03',
    moduleId: '1',
    pertanyaan: 'Serangan siber yang dilakukan dengan cara membanjiri server target menggunakan ribuan atau jutaan permintaan palsu secara serentak dari banyak komputer hingga server tidak dapat diakses disebut...',
    opsi: {
      A: 'Brute Force Attack',
      B: 'Ransomware',
      C: 'DDoS (Distributed Denial of Service)',
      D: 'Eavesdropping'
    },
    kunci: 'C',
    pembahasan: 'DDoS (Distributed Denial of Service) memanfaatkan banyak komputer botnet untuk mengirim banjir lalu lintas (traffic flood) menuju server sasaran hingga bandwidth dan kapasitas pemrosesan server lumpuh.'
  },
  {
    id: 'q_m1_04',
    moduleId: '1',
    pertanyaan: 'Perbedaan mendasar antara Virus dan Worm dalam mekanisme penyebarannya pada komputer jaringan adalah...',
    opsi: {
      A: 'Virus menyebar otomatis lewat port jaringan, sedangkan Worm menempel pada file dokumen.',
      B: 'Virus membutuhkan file induk dan eksekusi pengguna untuk menyebar, sedangkan Worm menyebar mandiri melalui jaringan.',
      C: 'Virus tidak merusak sistem operasi, sedangkan Worm merusak perangkat keras.',
      D: 'Virus hanya menyerang komputer klien, sedangkan Worm hanya menyerang printer.'
    },
    kunci: 'B',
    pembahasan: 'Virus memerlukan program atau file inang (host) dan aksi eksekusi pengguna agar aktif, sedangkan Worm merupakan program independen yang aktif memanfaatkan celah kelemahan jaringan secara mandiri.'
  },
  {
    id: 'q_m1_05',
    moduleId: '1',
    pertanyaan: 'Langkah pencegahan preventif terbaik untuk meminimalisir risiko infeksi malware pada komputer laboratorium sekolah adalah...',
    opsi: {
      A: 'Mematikan koneksi internet secara permanen setiap hari.',
      B: 'Memasang antivirus berlisensi, mengaktifkan pembaruan otomatis, dan tidak membuka sembarang file lampiran email.',
      C: 'Menghapus seluruh file berekstensi .exe yang ada di dalam sistem Windows.',
      D: 'Mengganti kabel LAN dengan kabel telepon rumah.'
    },
    kunci: 'B',
    pembahasan: 'Pencegahan malware yang efektif melibatkan kombinasi perangkat lunak antivirus yang selalu diperbarui, penambalan celah keamanan sistem operasi, dan kehati-hatian pengguna dalam membuka file atau tautan tak dikenal.'
  },

  /* --- KUIS MODUL 2: Analisis Sistem Keamanan Jaringan --- */
  {
    id: 'q_m2_01',
    moduleId: '2',
    pertanyaan: 'Teknologi jaringan yang digunakan untuk menciptakan jalur komunikasi terenkripsi dan aman (terowongan privat) di atas jaringan internet publik adalah...',
    opsi: {
      A: 'NAT (Network Address Translation)',
      B: 'DHCP (Dynamic Host Configuration Protocol)',
      C: 'VPN (Virtual Private Network)',
      D: 'DNS (Domain Name System)'
    },
    kunci: 'C',
    pembahasan: 'VPN (Virtual Private Network) mengenkripsi seluruh paket pertukaran data antara perangkat klien dengan jaringan tujuan melalui mekanisme tunneling sehingga terlindung dari penyadapan pada Wi-Fi publik.'
  },
  {
    id: 'q_m2_02',
    moduleId: '2',
    pertanyaan: 'Sistem pertahanan keamanan jaringan yang bertindak sebagai dinding penyaring antara jaringan internal sekolah dan internet berdasarkan seperangkat aturan yang telah ditentukan adalah...',
    opsi: {
      A: 'Firewall',
      B: 'Switch Unmanaged',
      C: 'Repeater',
      D: 'Access Point'
    },
    kunci: 'A',
    pembahasan: 'Firewall bertugas memeriksa seluruh lalu lintas data yang masuk dan keluar berdasarkan aturan (ruleset) keamanan untuk mengizinkan (Allow) atau menolak (Block) lalu lintas mencurigakan.'
  },
  {
    id: 'q_m2_03',
    moduleId: '2',
    pertanyaan: 'Mengapa autentikasi dua faktor (2FA / Two-Factor Authentication) jauh lebih aman dibandingkan hanya menggunakan kata sandi biasa?',
    opsi: {
      A: 'Karena 2FA mempercepat proses transfer file di jaringan lokal.',
      B: 'Karena 2FA membutuhkan dua bentuk verifikasi berbeda (misal: password dan kode OTP ke ponsel), sehingga peretas tetap gagal jika hanya mengetahui password.',
      C: 'Karena 2FA dapat menggantikan fungsi dari perangkat keras router.',
      D: 'Karena 2FA menghapus seluruh virus yang ada di dalam server web.'
    },
    kunci: 'B',
    pembahasan: '2FA menambahkan lapisan perlindungan sekunder. Jika kata sandi (something you know) bocor, peretas tetap tidak bisa masuk tanpa faktor kedua seperti kode OTP dari ponsel (something you have).'
  },
  {
    id: 'q_m2_04',
    moduleId: '2',
    pertanyaan: 'Jika sebuah perusahaan mempekerjakan teknisi jaringan jarak jauh (*work from home*) yang harus membuka file sensitif di server internal kantor, kombinasi keamanan paling tepat yang harus diterapkan adalah...',
    opsi: {
      A: 'Cukup menggunakan kabel fiber optik tanpa password.',
      B: 'Membagikan folder publik di Google Drive tanpa enkripsi.',
      C: 'Koneksi melalui VPN terenkripsi dengan autentikasi multi-faktor (MFA).',
      D: 'Mematikan sistem firewall di kantor agar akses teknisi tidak lambat.'
    },
    kunci: 'C',
    pembahasan: 'Kombinasi VPN untuk mengenkripsi jalur komunikasi publik dan MFA untuk memastikan identitas teknisi adalah standar keamanan industri dalam pengaksesan sumber daya internal secara jarak jauh.'
  },
  {
    id: 'q_m2_05',
    moduleId: '2',
    pertanyaan: 'Perangkat lunak Antivirus pada komputer klien bekerja mendeteksi ancaman malware terutama menggunakan teknik...',
    opsi: {
      A: 'Mencocokkan tanda tangan file (Signature-based detection) dan analisis perilaku mencurigakan (Heuristic analysis).',
      B: 'Mengukur suhu panas dari processor dan harddisk secara terus-menerus.',
      C: 'Menghitung jumlah kata yang diketik oleh pengguna keyboard.',
      D: 'Mengganti kartu jaringan dengan kartu nirkabel secara berkala.'
    },
    kunci: 'A',
    pembahasan: 'Antivirus modern mengandalkan basis data signature virus yang diperbarui serta analisis heuristik untuk mengenali perilaku aplikasi yang abnormal atau berpotensi merusak sistem.'
  },

  /* --- KUIS MODUL 3: Firewall & Penyaringan Paket --- */
  {
    id: 'q_m3_01',
    moduleId: '3',
    pertanyaan: 'Pada metode penyaringan paket (*Packet Filtering Firewall*), kriteria data apa saja yang biasanya diperiksa dalam header paket data?',
    opsi: {
      A: 'Warna kabel jaringan dan merk kartu Ethernet.',
      B: 'IP Asal, IP Tujuan, Protokol (TCP/UDP), dan Port Tujuan.',
      C: 'Ukuran casing komputer dan kapasitas RAM server.',
      D: 'Nama lengkap pengguna dan tanggal lahir pembuat website.'
    },
    kunci: 'B',
    pembahasan: 'Packet filtering memeriksa informasi pada layer 3 dan layer 4 OSI, mencakup alamat IP sumber dan tujuan, jenis protokol transport (TCP/UDP), serta nomor port layanan yang dituju.'
  },
  {
    id: 'q_m3_02',
    moduleId: '3',
    pertanyaan: 'Protokol Telnet menggunakan port 23 dan mengirimkan data kredensial tanpa enkripsi (*plain text*). Tindakan konfigurasi firewall yang tepat untuk melindungi server sekolah adalah...',
    opsi: {
      A: 'Membuat aturan ALLOW untuk port 23 dari seluruh internet.',
      B: 'Membuat aturan BLOCK pada port 23 dan mengarahkan manajemen server ke SSH (Port 22).',
      C: 'Menonaktifkan firewall saat proses login berlangsung.',
      D: 'Mengubah nama server menjadi Telnet Server.'
    },
    kunci: 'B',
    pembahasan: 'Telnet sangat rentan terhadap sniffing karena tidak terenkripsi. Aturan firewall harus memblokir (BLOCK) port 23 dan menggantinya dengan SSH (Secure Shell) pada port 22 yang aman dan terenkripsi.'
  },
  {
    id: 'q_m3_03',
    moduleId: '3',
    pertanyaan: 'Jika sebuah firewall dikonfigurasi dengan aturan "ALLOW TCP Port 443", jenis lalu lintas data apa yang diizinkan melewati firewall menuju server web?',
    opsi: {
      A: 'Lalu lintas web terenkripsi yang aman (HTTPS).',
      B: 'Lalu lintas transfer file FTP tanpa sandi (Port 21).',
      C: 'Lalu lintas surat elektronik POP3 (Port 110).',
      D: 'Lalu lintas ping ICMP banjir DDoS.'
    },
    kunci: 'A',
    pembahasan: 'Port 443 adalah port standar untuk protokol HTTPS (Hypertext Transfer Protocol Secure) yang memanfaatkan enkripsi TLS/SSL untuk mengamankan pertukaran data web.'
  },
  {
    id: 'q_m3_04',
    moduleId: '3',
    pertanyaan: 'Prinsip keamanan firewall "Default Deny / Default Block" berarti...',
    opsi: {
      A: 'Semua lalu lintas diizinkan secara default, kecuali yang diblokir oleh administrator.',
      B: 'Semua lalu lintas ditolak secara default, hanya lalu lintas yang secara eksplisit diizinkan (Allow) yang dapat lewat.',
      C: 'Firewall menolak semua koneksi termasuk koneksi administrator secara permanen.',
      D: 'Firewall dimatikan secara otomatis setiap pergantian jam pelajaran.'
    },
    kunci: 'B',
    pembahasan: 'Prinsip Default Deny merupakan praktik terbaik keamanan siber: sistem memblokir semua lalu lintas data tak dikenal, dan hanya mengizinkan lalu lintas yang secara tegas didaftarkan pada aturan Allow.'
  },
  {
    id: 'q_m3_05',
    moduleId: '3',
    pertanyaan: 'Apa yang terjadi pada paket data di jaringan ketika firewall menerapkan tindakan "BLOCK / DROP" terhadap paket tersebut?',
    opsi: {
      A: 'Paket data digandakan lalu dikirim ke seluruh komputer di laboratorium.',
      B: 'Paket data dihentikan dan dibuang di gerbang firewall sehingga tidak sampai ke komputer target.',
      C: 'Paket data diubah menjadi video animasi.',
      D: 'Paket data dipercepat pengirimannya hingga 100 kali lipat.'
    },
    kunci: 'B',
    pembahasan: 'Tindakan Block/Drop menghentikan paket berbahaya di perimeter firewall dan membuangnya dari antrean transmisi, melindungi server di balik firewall dari potensi serangan atau eksploitasi.'
  }
];

/**
 * Storage Class Controller (Hybrid: Local Cache + MySQL Sync)
 */
const Storage = {
  /**
   * Mendapatkan Base URL API backend MySQL jika web berjalan di server HTTP
   */
  getApiBaseUrl() {
    if (!window.location.protocol.startsWith('http')) return null;
    const path = window.location.pathname;
    const projectIdx = path.indexOf('/cybertech');
    if (projectIdx !== -1) {
      return '/cybertech/api';
    }
    return '/api';
  },

  /**
   * Inisialisasi storage awal jika belum tersedia
   */
  initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MODULES)) {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(DEFAULT_MODULES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({}));
    }

    // Lakukan background sync dengan MySQL jika API tersedia
    this.syncWithApi();
  },

  /**
   * Melakukan sinkronisasi data dari MySQL ke LocalStorage agar tampilan selalu terbarui
   */
  async syncWithApi() {
    const api = this.getApiBaseUrl();
    if (!api) return;

    try {
      // 1. Sync Bank Soal dari MySQL
      const p1 = fetch(`${api}/quizzes.php`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(res.data));
          }
        }).catch(() => {});

      // 2. Sync Rekap Hasil Kuis dari MySQL
      const p2 = fetch(`${api}/results.php`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data)) {
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(res.data));
          }
        }).catch(() => {});

      // 3. Sync Daftar Siswa & Progres dari MySQL
      const p3 = fetch(`${api}/students.php?action=list`)
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data)) {
            const users = this.getUsers();
            const teachers = users.filter(u => u.role === 'guru');
            const studentUsers = res.data.map(s => ({
              id: s.id,
              username: s.username,
              email: s.email,
              nama: s.nama,
              role: 'siswa',
              kelas: s.kelas,
              sekolah: s.sekolah,
              avatar: s.avatar,
              password: 'siswa123cybertech'
            }));
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...teachers, ...studentUsers]));

            // Sync progress
            const allProg = this.getAllProgress();
            res.data.forEach(s => {
              if (s.progress) allProg[s.id] = s.progress;
            });
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProg));
          }
        }).catch(() => {});

      await Promise.allSettled([p1, p2, p3]);
      window.dispatchEvent(new CustomEvent('cybertech:synced'));
    } catch (err) {
      console.warn('[CyberTech] Offline mode / MySQL API unreachable:', err);
    }
  },

  /* --- MANAJEMEN USERS --- */
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || JSON.stringify(DEFAULT_USERS));
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByUsernameOrEmail(identifier) {
    const users = this.getUsers();
    const query = String(identifier).trim().toLowerCase();
    return users.find(u => 
      (u.username && u.username.toLowerCase() === query) || 
      (u.email && u.email.toLowerCase() === query) ||
      (u.nama && u.nama.toLowerCase() === query)
    ) || null;
  },

  saveUser(user) {
    const users = this.getUsers();
    const existingIdx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
    if (existingIdx !== -1) {
      users[existingIdx] = { ...users[existingIdx], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Sinkronisasi ke MySQL API jika online
    const api = this.getApiBaseUrl();
    if (api && user.role === 'siswa') {
      fetch(`${api}/auth.php?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: user.nama,
          email: user.email,
          password: user.password || 'siswa123cybertech',
          confirmPassword: user.password || 'siswa123cybertech',
          kelas: user.kelas || 'XI TJKT 1'
        })
      }).catch(() => {});
    }

    return user;
  },

  updateUser(id, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === id) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[index]));
      }

      // Sinkronisasi ke MySQL API jika online
      const api = this.getApiBaseUrl();
      if (api) {
        fetch(`${api}/auth.php?action=profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            nama: users[index].nama,
            kelas: users[index].kelas || '',
            nip: users[index].nip || '',
            avatar: users[index].avatar || ''
          })
        }).catch(() => {});
      }

      return users[index];
    }
    return null;
  },

  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  },

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  /* --- MANAJEMEN MODUL & PROGRES SISWA --- */
  getModules() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MODULES) || JSON.stringify(DEFAULT_MODULES));
  },

  getModuleById(id) {
    const modules = this.getModules();
    return modules.find(m => String(m.id) === String(id)) || null;
  },

  getAllProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '{}');
  },

  getStudentProgress(studentId) {
    const all = this.getAllProgress();
    return all[studentId] || {
      '1': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 },
      '2': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 },
      '3': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 }
    };
  },

  updateStudentProgress(studentId, moduleId, stepUpdates) {
    const all = this.getAllProgress();
    if (!all[studentId]) {
      all[studentId] = this.getStudentProgress(studentId);
    }

    const currentModProgress = all[studentId][String(moduleId)] || {
      materialRead: false,
      videoWatched: false,
      activityDone: false,
      quizScore: null,
      completed: false,
      percentage: 0
    };

    const updated = { ...currentModProgress, ...stepUpdates };

    let percentage = 0;
    if (updated.materialRead) percentage += 20;
    if (updated.videoWatched) percentage += 20;
    if (updated.activityDone) percentage += 30;
    if (updated.quizScore !== null && updated.quizScore >= 75) {
      percentage += 30;
      updated.completed = true;
    }

    updated.percentage = Math.min(100, percentage);
    all[studentId][String(moduleId)] = updated;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));

    // Kirim update ke MySQL backend jika online
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/students.php?action=progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentId,
          moduleId: moduleId,
          materialRead: updated.materialRead ? 1 : 0,
          videoWatched: updated.videoWatched ? 1 : 0,
          activityDone: updated.activityDone ? 1 : 0,
          quizScore: updated.quizScore
        })
      }).catch(() => {});
    }

    return updated;
  },

  /* --- MANAJEMEN BANK SOAL (CRUD GURU) --- */
  getQuizzes(moduleId = null) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || JSON.stringify(DEFAULT_QUIZZES));
    if (moduleId !== null && moduleId !== undefined && moduleId !== 'all') {
      return all.filter(q => String(q.moduleId) === String(moduleId));
    }
    return all;
  },

  getQuizById(id) {
    const all = this.getQuizzes();
    return all.find(q => q.id === id) || null;
  },

  addQuiz(quizData) {
    const all = this.getQuizzes();
    const newQuiz = {
      id: `q_m${quizData.moduleId}_${Date.now()}`,
      ...quizData
    };
    all.push(newQuiz);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(all));

    // Simpan ke MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/quizzes.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz)
      }).catch(() => {});
    }

    return newQuiz;
  },

  updateQuiz(id, quizData) {
    const all = this.getQuizzes();
    const index = all.findIndex(q => q.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...quizData };
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(all));

      // Update di MySQL API
      const api = this.getApiBaseUrl();
      if (api) {
        fetch(`${api}/quizzes.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...quizData })
        }).catch(() => {});
      }

      return all[index];
    }
    return null;
  },

  deleteQuiz(id) {
    const all = this.getQuizzes();
    const filtered = all.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(filtered));

    // Hapus dari MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/quizzes.php?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(() => {});
    }

    return filtered.length !== all.length;
  },

  /* --- MANAJEMEN HASIL EVALUASI / KUIS --- */
  getAllResults() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || '[]');
  },

  getResultById(id) {
    const all = this.getAllResults();
    return all.find(r => r.id === id) || null;
  },

  getResultsByStudent(studentId) {
    const all = this.getAllResults();
    return all.filter(r => r.studentId === studentId);
  },

  getResultsByModule(moduleId) {
    const all = this.getAllResults();
    if (moduleId === 'all' || !moduleId) return all;
    return all.filter(r => String(r.moduleId) === String(moduleId));
  },

  saveQuizResult(resultData) {
    const all = this.getAllResults();
    const newResult = {
      id: `res_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...resultData
    };
    all.unshift(newResult);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(all));

    // Update progres kuis siswa pada modul terkait di local
    this.updateStudentProgress(resultData.studentId, resultData.moduleId, {
      quizScore: resultData.score,
      completed: resultData.score >= 75
    });

    // Simpan ke MySQL API
    const api = this.getApiBaseUrl();
    if (api) {
      fetch(`${api}/results.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      }).catch(() => {});
    }

    return newResult;
  }
};

// Inisialisasi storage & sinkronisasi MySQL saat skrip dimuat
Storage.initStorage();
window.Storage = Storage;
