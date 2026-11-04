/**
 * ===================================================================
 * CyberTech - Quiz Engine Controller
 * Menangani pengambilan bank soal, timer hitung mundur, navigasi soal,
 * kalkulasi skor otomatis, dan penyimpanan hasil evaluasi
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const moduleId = urlParams.get('module') || '1';
  const currentUser = window.Auth ? window.Auth.getCurrentUser() : null;

  if (!currentUser) return;

  // Ambil metadata modul
  const moduleMeta = window.Storage.getModuleById(moduleId) || {
    id: moduleId,
    judul: `Modul ${moduleId}`,
    totalSoal: 5
  };

  // Ambil bank soal aktif untuk modul terkait
  const rawQuizzes = window.Storage.getQuizzes(moduleId);
  if (!rawQuizzes || rawQuizzes.length === 0) {
    alert('Bank soal untuk modul ini belum tersedia.');
    window.location.href = 'modules.html';
    return;
  }

  // State Pengerjaan Kuis
  let currentIndex = 0;
  let isQuizStarted = false;
  const userAnswers = {}; // { [quizId]: 'A' | 'B' | 'C' | 'D' }
  const totalQuestions = rawQuizzes.length;
  let remainingSeconds = 10 * 60; // 10 menit
  let timerInterval = null;

  // DOM Elements
  const quizTitle = document.getElementById('quizTitle');
  const quizSubtitle = document.getElementById('quizSubtitle');
  const timerText = document.getElementById('timerText');
  const timerBox = document.getElementById('timerBox');
  const questionNumBadge = document.getElementById('questionNumBadge');
  const questionText = document.getElementById('questionText');
  const optionsList = document.getElementById('optionsList');
  const paletteContainer = document.getElementById('paletteContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const answeredCountText = document.getElementById('answeredCountText');

  quizTitle.textContent = `Kuis Evaluasi Modul ${moduleId}`;
  quizSubtitle.textContent = moduleMeta.judul;

  // 1. Format Waktu Menit:Detik
  function formatTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // 2. Timer Countdown Engine
  function startTimer() {
    timerText.textContent = formatTimer(remainingSeconds);
    timerInterval = setInterval(() => {
      remainingSeconds--;
      timerText.textContent = formatTimer(remainingSeconds);

      if (remainingSeconds <= 120) {
        timerBox.classList.add('timer-warning');
      }

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        alert('Waktu pengerjaan kuis telah habis! Jawaban Anda akan otomatis dikirimkan.');
        submitQuiz(true);
      }
    }, 1000);
  }

  // Fungsi Mulai Sesi Kuis (Diaktifkan saat siswa klik tombol 'Mulai Kuis')
  function startQuizSession() {
    if (isQuizStarted) return;
    isQuizStarted = true;

    // Sembunyikan banner mulai kuis
    const startBanner = document.getElementById('quizStartBanner');
    if (startBanner) {
      startBanner.style.display = 'none';
    }

    // Ubah tombol di header
    const startBtn = document.getElementById('btnStartQuiz');
    if (startBtn) {
      startBtn.className = 'badge badge-success';
      startBtn.style.padding = '0.45rem 0.85rem';
      startBtn.style.fontSize = '0.85rem';
      startBtn.style.fontWeight = '600';
      startBtn.innerHTML = '✓ Kuis Berjalan';
      startBtn.disabled = true;
    }

    // Jalankan timer countdown
    startTimer();

    // Render ulang lembar soal agar opsi aktif dan bisa diklik
    renderQuestion(currentIndex);

    if (window.Utils) {
      window.Utils.showToast('Kuis dimulai! Waktu berjalan 10 menit. Selamat mengerjakan.', 'info');
    }
  }

  // 3. Render Soal Aktif
  function renderQuestion(index) {
    currentIndex = index;
    const q = rawQuizzes[currentIndex];

    questionNumBadge.textContent = `Soal No. ${currentIndex + 1} dari ${totalQuestions}`;
    questionText.textContent = q.pertanyaan;

    // Render 4 Opsi Pilihan Ganda (A, B, C, D)
    optionsList.innerHTML = '';
    ['A', 'B', 'C', 'D'].forEach(key => {
      const optionItem = document.createElement('div');
      optionItem.className = 'quiz-option-item';
      
      // Kunci opsi jika kuis belum dimulai
      if (!isQuizStarted) {
        optionItem.classList.add('locked');
      }

      if (userAnswers[q.id] === key) {
        optionItem.classList.add('selected');
      }

      optionItem.innerHTML = `
        <div class="option-key-badge">${key}</div>
        <div class="option-text-label">${q.opsi[key]}</div>
      `;

      optionItem.addEventListener('click', () => {
        if (!isQuizStarted) {
          if (window.Utils) {
            window.Utils.showToast('Silakan klik tombol "Mulai Kuis" terlebih dahulu untuk mengaktifkan pilihan jawaban.', 'warning');
          }
          return;
        }
        userAnswers[q.id] = key;
        renderQuestion(currentIndex);
        updatePalette();
      });

      optionsList.appendChild(optionItem);
    });

    // Perbarui status tombol navigasi
    prevBtn.disabled = !isQuizStarted || currentIndex === 0;
    if (currentIndex === totalQuestions - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'inline-flex';
    }
    nextBtn.disabled = !isQuizStarted;
    submitBtn.disabled = !isQuizStarted;

    updatePalette();
  }

  // 4. Update Tampilan Palet Nomor Soal
  function updatePalette() {
    paletteContainer.innerHTML = '';
    let answeredCount = 0;

    rawQuizzes.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;

      if (idx === currentIndex) {
        btn.classList.add('active');
      }

      if (userAnswers[q.id]) {
        btn.classList.add('answered');
        answeredCount++;
      }

      btn.addEventListener('click', () => {
        renderQuestion(idx);
      });

      paletteContainer.appendChild(btn);
    });

    answeredCountText.textContent = `${answeredCount} dari ${totalQuestions} soal terjawab`;
  }

  // 5. Submit Kuis & Kalkulasi Nilai
  function submitQuiz(force = false) {
    const answeredCount = Object.keys(userAnswers).length;
    if (!force && answeredCount < totalQuestions) {
      const confirmIncomplete = confirm(`Anda baru menjawab ${answeredCount} dari ${totalQuestions} soal. Tetap ingin mengakhiri dan mengirim jawaban sekarang?`);
      if (!confirmIncomplete) return;
    } else if (!force) {
      const confirmSubmit = confirm('Apakah Anda yakin ingin menyelesaikan kuis dan melihat hasil nilai Anda?');
      if (!confirmSubmit) return;
    }

    clearInterval(timerInterval);

    // Hitung Benar dan Salah
    let correctCount = 0;
    rawQuizzes.forEach(q => {
      if (userAnswers[q.id] && userAnswers[q.id] === q.kunci) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const durationSpent = (10 * 60) - remainingSeconds;

    const resultPayload = {
      studentId: currentUser.id,
      studentName: currentUser.nama,
      moduleId: String(moduleId),
      moduleTitle: moduleMeta.judul,
      score: score,
      correctCount: correctCount,
      wrongCount: totalQuestions - correctCount,
      totalQuestions: totalQuestions,
      userAnswers: userAnswers,
      durationSpent: durationSpent,
      kkm: 75
    };

    // Simpan ke storage dan sinkronkan progres siswa
    const savedResult = window.Storage.saveQuizResult(resultPayload);

    window.Utils.showToast('Jawaban berhasil diserahkan! Mengalihkan ke hasil...', 'success', 2000);
    setTimeout(() => {
      window.location.href = `quiz-result.html?id=${savedResult.id}`;
    }, 800);
  }

  // Event Listeners Tombol Mulai Kuis
  const btnStartQuiz = document.getElementById('btnStartQuiz');
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', startQuizSession);
  }

  const btnStartQuizInBanner = document.getElementById('btnStartQuizInBanner');
  if (btnStartQuizInBanner) {
    btnStartQuizInBanner.addEventListener('click', startQuizSession);
  }

  // Event Listeners Navigasi
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) renderQuestion(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalQuestions - 1) renderQuestion(currentIndex + 1);
  });

  submitBtn.addEventListener('click', () => {
    if (!isQuizStarted) {
      if (window.Utils) {
        window.Utils.showToast('Kuis belum dimulai.', 'warning');
      }
      return;
    }
    submitQuiz(false);
  });

  // Tampilkan soal pertama dalam keadaan Standby (waktu belum berjalan)
  renderQuestion(0);
  timerText.textContent = formatTimer(remainingSeconds);
});

