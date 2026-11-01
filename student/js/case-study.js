/**
 * ===================================================================
 * CyberTech - Case Study Interactive Engine (Modul 2)
 * Evaluasi skenario masalah keamanan jaringan & rekomendasi solusi
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const caseScenarios = [
    {
      id: 1,
      badge: 'Kasus 1 dari 3: Pengamanan Jaringan Jarak Jauh',
      title: 'Akses Data Nilai dari Wi-Fi Publik Kafe',
      desc: 'Seorang guru ASJ SMK Negeri 1 Takalar sedang bertugas dinas di luar kota dan perlu mengirimkan rekap nilai siswa ke server internal sekolah melalui jaringan Wi-Fi publik di kafe. Guru khawatir lalu lintas datanya dapat disadap (sniffing) oleh peretas yang berada di jaringan Wi-Fi yang sama.',
      correctSolution: 'vpn',
      explanationCorrect: 'Tepat Sekali! VPN (Virtual Private Network) membungkus seluruh paket data dalam terowongan terenkripsi (encrypted tunnel). Siapapun di jaringan Wi-Fi publik tidak akan bisa membaca atau menyadap transmisi data nilai sekolah.',
      explanationWrong: 'Kurang tepat. Meskipun Antivirus atau Firewall melindungi perangkat, hanya VPN yang mampu mengenkripsi seluruh saluran komunikasi saat melintasi jaringan internet publik tanpa izin.'
    },
    {
      id: 2,
      badge: 'Kasus 2 dari 3: Keamanan Akun Pengguna',
      title: 'Pencegahan Pembobolan Kata Sandi Lemah Siswa',
      desc: 'Banyak akun portal pembelajaran siswa yang rentan disusupi karena sebagian siswa menggunakan kata sandi sederhana yang mudah ditebak. Pihak sekolah memerlukan solusi agar akun siswa tetap terlindungi dan tidak bisa dimasuki peretas sekalipun kata sandi mereka bocor.',
      correctSolution: 'auth',
      explanationCorrect: 'Tepat Sekali! Autentikasi Dua Faktor (2FA / Multi-Factor Authentication) mewajibkan verifikasi lapis kedua (misalnya kode OTP ke ponsel siswa). Meskipun peretas berhasil menebak kata sandi, peretas tetap gagal login tanpa kode verifikasi fisik tersebut.',
      explanationWrong: 'Kurang tepat. Firewall dan Antivirus tidak mengatur proses verifikasi identitas pengguna. Autentikasi 2FA adalah solusi spesifik untuk mencegah pengambilalihan akun akibat kata sandi yang lemah.'
    },
    {
      id: 3,
      badge: 'Kasus 3 dari 3: Pertahanan Gerbang Jaringan',
      title: 'Pemblokiran Pemindaian Port Berbahaya',
      desc: 'Komputer laboratorium sekolah mendeteksi adanya upaya pemindaian (port scanning) yang terus-menerus mencoba mengakses layanan Telnet (port 23) yang tidak terenkripsi dari alamat IP luar. Teknisi harus mencegah paket tersebut masuk ke jaringan lab.',
      correctSolution: 'firewall',
      explanationCorrect: 'Tepat Sekali! Firewall bertugas memeriksa header paket data di perimeter jaringan dan dapat dikonfigurasi dengan aturan BLOCK/DROP untuk menutup port Telnet 23 agar paket mencurigakan segera dibuang.',
      explanationWrong: 'Kurang tepat. VPN dan Antivirus tidak berfungsi sebagai pos penyaring port lalu lintas jaringan. Firewall adalah sistem utama yang bertugas mengatur aturan Allow atau Block pada port komunikasi data.'
    }
  ];

  let currentCaseIndex = 0;
  let selectedOption = null;
  const solvedCases = new Set();

  const caseBadge = document.getElementById('caseBadge');
  const caseTitle = document.getElementById('caseTitle');
  const caseDesc = document.getElementById('caseDesc');
  const optionCards = document.querySelectorAll('.case-option-card');
  const submitBtn = document.getElementById('submitCaseBtn');
  const feedbackBox = document.getElementById('caseFeedbackBox');
  const feedbackStatus = document.getElementById('feedbackStatus');
  const feedbackText = document.getElementById('feedbackText');
  const nextCaseBtn = document.getElementById('nextCaseBtn');
  const finalBanner = document.getElementById('finalSuccessBanner');
  const nextQuizBtn = document.getElementById('nextQuizBtn');

  function renderCurrentCase() {
    const activeCase = caseScenarios[currentCaseIndex];
    caseBadge.textContent = activeCase.badge;
    caseTitle.textContent = activeCase.title;
    caseDesc.textContent = activeCase.desc;

    // Reset pilihan kartu dan feedback
    optionCards.forEach(card => {
      card.classList.remove('selected', 'is-correct', 'is-wrong');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = false;
    });
    selectedOption = null;
    feedbackBox.style.display = 'none';
    submitBtn.style.display = 'inline-flex';
    nextCaseBtn.style.display = 'none';

    // Update stepper dot
    document.querySelectorAll('.case-step-dot').forEach((dot, idx) => {
      dot.classList.remove('active');
      if (idx === currentCaseIndex) dot.classList.add('active');
      if (solvedCases.has(idx)) dot.classList.add('done');
    });
  }

  // Pilih kartu opsi solusi
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      optionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      selectedOption = card.getAttribute('data-solution');
    });
  });

  // Tombol Kirim Analisis
  submitBtn.addEventListener('click', () => {
    if (!selectedOption) {
      window.Utils.showToast('Pilih salah satu sistem keamanan terlebih dahulu!', 'warning');
      return;
    }

    const activeCase = caseScenarios[currentCaseIndex];
    feedbackBox.style.display = 'block';

    const selectedCard = document.querySelector(`.case-option-card[data-solution="${selectedOption}"]`);

    if (selectedOption === activeCase.correctSolution) {
      // Jawaban Benar
      solvedCases.add(currentCaseIndex);
      selectedCard.classList.add('is-correct');
      feedbackBox.className = 'note-box';
      feedbackBox.style.borderLeftColor = 'var(--color-success)';
      feedbackBox.style.background = 'var(--color-success-bg)';
      feedbackStatus.innerHTML = '<span style="color: var(--color-success); font-weight: bold;">✓ Rekomendasi Solusi Tepat!</span>';
      feedbackText.textContent = activeCase.explanationCorrect;
      
      submitBtn.style.display = 'none';

      if (currentCaseIndex < caseScenarios.length - 1) {
        nextCaseBtn.style.display = 'inline-flex';
        nextCaseBtn.textContent = `Lanjut ke Kasus ${currentCaseIndex + 2} →`;
      } else {
        // Seluruh 3 kasus selesai
        finalBanner.style.display = 'flex';
        nextQuizBtn.classList.remove('disabled');
        nextQuizBtn.removeAttribute('disabled');
        nextQuizBtn.style.pointerEvents = 'auto';
        nextQuizBtn.style.opacity = '1';
        window.Utils.showToast('Luar biasa! Seluruh 3 studi kasus keamanan berhasil Anda selesaikan!', 'success', 3500);

        // Catat progres aktivitas ke storage
        window.ModuleHelper.markActivityDone('2');
      }
    } else {
      // Jawaban Salah
      selectedCard.classList.add('is-wrong');
      feedbackBox.className = 'note-box';
      feedbackBox.style.borderLeftColor = 'var(--color-danger)';
      feedbackBox.style.background = 'var(--color-danger-bg)';
      feedbackStatus.innerHTML = '<span style="color: var(--color-danger); font-weight: bold;">✗ Kurang Tepat, Coba Analisis Kembali</span>';
      feedbackText.textContent = activeCase.explanationWrong;
    }
  });

  // Tombol Lanjut ke Kasus Berikutnya
  nextCaseBtn.addEventListener('click', () => {
    currentCaseIndex++;
    if (currentCaseIndex < caseScenarios.length) {
      renderCurrentCase();
    }
  });

  // Render awal kasus 1
  renderCurrentCase();
});

