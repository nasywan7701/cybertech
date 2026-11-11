/**
 * ===================================================================
 * CyberTech - HOTS Evaluation Engine Controller (Bloom C4-C6)
 * Menggantikan Evaluasi Pilihan Ganda dengan Unjuk Kerja & Analisis HOTS:
 * - Modul 1 (C4): Drag & Drop Klasifikasi Insiden + Justifikasi Cara Kerja
 * - Modul 2 (C4-C5): Matriks Efektivitas 4 Sistem + Rekomendasi + Kriteria
 * - Modul 3 (C4-C6): Simulator Kebijakan Firewall + Penjelasan Hasil Log
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const moduleId = urlParams.get('module') || '1';
  const currentUser = window.Auth ? window.Auth.getCurrentUser() : null;

  if (!currentUser) return;

  const moduleMeta = window.Storage.getModuleById(moduleId) || {
    id: moduleId,
    judul: `Modul ${moduleId}`,
    totalSoal: 5
  };

  // Ambil bank kasus HOTS untuk modul terkait
  const allQuizzes = window.Storage.getQuizzes(moduleId);
  if (!allQuizzes || allQuizzes.length === 0) {
    alert('Bank kasus evaluasi untuk modul ini belum tersedia.');
    window.location.href = 'modules.html';
    return;
  }

  const QUESTIONS_PER_EVAL = 5;
  const EVAL_DURATION_SECONDS = 20 * 60; // 20 menit pengerjaan HOTS

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Ambil 5 kasus HOTS secara acak (Anti-Contek)
  const rawQuizzes = shuffleArray(allQuizzes).slice(0, Math.min(QUESTIONS_PER_EVAL, allQuizzes.length));

  // State Evaluasi
  let currentIndex = 0;
  let isQuizStarted = false;
  const userAnswers = {}; // { [caseId]: { ...structured HOTS response... } }
  const totalQuestions = rawQuizzes.length;
  let remainingSeconds = EVAL_DURATION_SECONDS;
  let timerInterval = null;

  const moduleInfoMap = {
    '1': {
      topik: 'Topik: Analisis & Klasifikasi Ancaman Jaringan',
      title: 'Modul 1: Evaluasi Klasifikasi Drag & Drop + Analisis',
      formatBadge: 'Evaluasi: Klasifikasi Drag & Drop & Justifikasi Teknis',
      steps: [
        { label: '✓ 1. Materi', href: 'module1-material.html' },
        { label: '✓ 2. Video', href: 'module1-video.html' },
        { label: '✓ 3. Latihan Drag & Drop', href: 'module1-activity.html' },
        { label: '4. Evaluasi', href: '#', active: true }
      ]
    },
    '2': {
      topik: 'Topik: Evaluasi Efektivitas & Rekomendasi Sistem',
      title: 'Modul 2: Evaluasi Matriks Studi Kasus & Rekomendasi',
      formatBadge: 'Evaluasi: Matriks Komparatif & Rekomendasi Berkriteria',
      steps: [
        { label: '✓ 1. Materi', href: 'module2-material.html' },
        { label: '✓ 2. Infografis Interaktif', href: 'module2-infografis.html' },
        { label: '✓ 3. Latihan Studi Kasus', href: 'module2-activity.html' },
        { label: '4. Evaluasi', href: '#', active: true }
      ]
    },
    '3': {
      topik: 'Topik: Konfigurasi Kebijakan Firewall & Analisis Log',
      title: 'Modul 3: Evaluasi Praktik Simulator Firewall & Penjelasan',
      formatBadge: 'Evaluasi: Uji Simulasi Allow/Block & Analisis Alasan',
      steps: [
        { label: '✓ 1. Materi', href: 'module3-material.html' },
        { label: '✓ 2. Animasi Firewall', href: 'module3-video.html' },
        { label: '✓ 3. Latihan Simulasi', href: 'module3-activity.html' },
        { label: '4. Evaluasi', href: '#', active: true }
      ]
    }
  };

  const modData = moduleInfoMap[moduleId] || moduleInfoMap['1'];

  // DOM Elements
  const quizTitle = document.getElementById('quizTitle');
  const timerText = document.getElementById('timerText');
  const timerBox = document.getElementById('timerBox');
  const questionNumBadge = document.getElementById('questionNumBadge');
  const questionText = document.getElementById('questionText');
  const workspaceEl = document.getElementById('optionsList');
  const paletteContainer = document.getElementById('paletteContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const answeredCountText = document.getElementById('answeredCountText');
  const quizTopicBadge = document.getElementById('quizTopicBadge');
  const quizModuleStepper = document.getElementById('quizModuleStepper');
  const quizBreadcrumbCurrent = document.getElementById('quizBreadcrumbCurrent');
  const evalFormatBadge = document.getElementById('evalFormatBadge');

  if (quizBreadcrumbCurrent) quizBreadcrumbCurrent.textContent = `Modul ${moduleId}: Evaluasi`;
  if (quizTitle) quizTitle.textContent = modData.title;
  if (quizTopicBadge) quizTopicBadge.textContent = modData.topik;
  if (evalFormatBadge) evalFormatBadge.textContent = modData.formatBadge;

  // Render Stepper Bar
  if (quizModuleStepper) {
    quizModuleStepper.innerHTML = modData.steps.map(step => {
      if (step.active) {
        return `<span class="stepper-item active">${step.label}</span>`;
      } else {
        return `<a href="${step.href}" class="stepper-item completed js-stepper-link">${step.label}</a>`;
      }
    }).join('');

    quizModuleStepper.querySelectorAll('.js-stepper-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (isQuizStarted) {
          const leave = confirm('Evaluasi sedang berlangsung. Jika meninggalkan halaman, progres belum tersimpan. Yakin keluar?');
          if (!leave) e.preventDefault();
        }
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function startTimer() {
    timerText.textContent = formatTimer(remainingSeconds);
    timerInterval = setInterval(() => {
      remainingSeconds--;
      timerText.textContent = formatTimer(remainingSeconds);

      if (remainingSeconds <= 180) {
        timerBox.classList.add('timer-warning');
      }

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        alert('Waktu pengerjaan evaluasi telah habis! Lembar kerja Anda akan otomatis dikirimkan.');
        submitQuiz(true);
      }
    }, 1000);
  }

  function startQuizSession() {
    if (isQuizStarted) return;
    isQuizStarted = true;

    const startBanner = document.getElementById('quizStartBanner');
    if (startBanner) startBanner.style.display = 'none';

    const startBtn = document.getElementById('btnStartQuiz');
    if (startBtn) {
      startBtn.className = 'badge badge-success';
      startBtn.style.padding = '0.45rem 0.85rem';
      startBtn.style.fontSize = '0.85rem';
      startBtn.style.fontWeight = '600';
      startBtn.innerHTML = '✓ Evaluasi Berjalan';
      startBtn.disabled = true;
    }

    startTimer();
    renderQuestion(currentIndex);

    if (window.Utils) {
      window.Utils.showToast('Evaluasi dimulai! Waktu 20 menit berjalan. Kerjakan setiap tahap analisis.', 'info');
    }
  }

  /* ===================================================================
     HELPER PENGECEKAN KELENGKAPAN JAWABAN PER ITEM
     =================================================================== */
  function isItemComplete(q) {
    const ans = userAnswers[q.id];
    if (!ans) return false;
    const type = q.questionType || (String(moduleId) === '1' ? 'hots_m1_dnd' : (String(moduleId) === '2' ? 'hots_m2_case' : 'hots_m3_firewall'));

    if (type === 'hots_m1_dnd') {
      return Boolean(ans.category) && Boolean(ans.reasoning && ans.reasoning.trim().length >= 15);
    }
    if (type === 'hots_m2_case') {
      const m = ans.matrix || {};
      const matrixDone = m.antivirus && m.firewall && m.vpn && m.auth;
      return Boolean(matrixDone && ans.recommended && ans.reasoning && ans.reasoning.trim().length >= 15);
    }
    if (type === 'hots_m3_firewall') {
      return Boolean(ans.selectedAction && ans.simulated && ans.reasoning && ans.reasoning.trim().length >= 15);
    }
    return false;
  }

  function getOrInitAnswer(q) {
    if (!userAnswers[q.id]) {
      const type = q.questionType || (String(moduleId) === '1' ? 'hots_m1_dnd' : (String(moduleId) === '2' ? 'hots_m2_case' : 'hots_m3_firewall'));
      if (type === 'hots_m1_dnd') {
        userAnswers[q.id] = { type, category: '', reasoning: '' };
      } else if (type === 'hots_m2_case') {
        userAnswers[q.id] = {
          type,
          matrix: { antivirus: '', firewall: '', vpn: '', auth: '' },
          recommended: '',
          reasoning: ''
        };
      } else {
        userAnswers[q.id] = { type: 'hots_m3_firewall', selectedAction: '', simulated: false, reasoning: '' };
      }
    }
    return userAnswers[q.id];
  }

  /* ===================================================================
     RENDER UTAMA LEMBAR KERJA HOTS SESUAI MODUL
     =================================================================== */
  function renderQuestion(index) {
    currentIndex = index;
    const q = rawQuizzes[currentIndex];
    const ans = getOrInitAnswer(q);
    const type = q.questionType || (String(moduleId) === '1' ? 'hots_m1_dnd' : (String(moduleId) === '2' ? 'hots_m2_case' : 'hots_m3_firewall'));
    const hotsData = q.hotsData || {};

    questionNumBadge.textContent = `Kasus No. ${currentIndex + 1} dari ${totalQuestions}`;

    if (type === 'hots_m1_dnd') {
      questionText.innerHTML = `<span class="hots-bloom-tag">Klasifikasi &amp; Analisis Ancaman Jaringan</span><div class="hots-scenario-box"><strong>Skenario Insiden #${currentIndex + 1}:</strong><br>${escapeHtml(q.pertanyaan)}</div>`;
      renderModule1Workspace(q, ans, hotsData);
    } else if (type === 'hots_m2_case') {
      questionText.innerHTML = `<span class="hots-bloom-tag">Evaluasi Efektivitas &amp; Rekomendasi Sistem</span><div class="hots-scenario-box"><strong>Studi Kasus #${currentIndex + 1}:</strong><br>${escapeHtml(q.pertanyaan)}</div>`;
      renderModule2Workspace(q, ans, hotsData);
    } else {
      questionText.innerHTML = `<span class="hots-bloom-tag">Konfigurasi Kebijakan Firewall &amp; Analisis Log</span><div class="hots-scenario-box"><strong>Tantangan Lalu Lintas #${currentIndex + 1}:</strong><br>${escapeHtml(q.pertanyaan)}</div>`;
      renderModule3Workspace(q, ans, hotsData);
    }

    prevBtn.disabled = currentIndex === 0;
    if (currentIndex === totalQuestions - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-flex';
    }

    renderPalette();
    updateAnsweredCount();
  }

  /* -------------------------------------------------------------------
     MODE 1: MODUL 1 - DRAG & DROP KLASIFIKASI + JUSTIFIKASI C4
     ------------------------------------------------------------------- */
  function renderModule1Workspace(q, ans, hotsData) {
    const categories = [
      { key: 'virus', label: 'Virus Komputer', desc: 'Menempel pada file inang & perlu klik/eksekusi' },
      { key: 'worm', label: 'Network Worm', desc: 'Menyebar mandiri via celah jaringan tanpa interaksi' },
      { key: 'phishing', label: 'Phishing / Social Eng.', desc: 'Penipuan identitas & tautan pencuri kredensial' },
      { key: 'ddos', label: 'DDoS Attack', desc: 'Banjir trafik masif pelumpuh ketersediaan layanan' }
    ];

    const categoryNames = { virus: 'Virus Komputer', worm: 'Network Worm', phishing: 'Phishing', ddos: 'DDoS Attack' };
    const lockedClass = !isQuizStarted ? 'hots-locked-overlay' : '';

    workspaceEl.innerHTML = `
      <div class="${lockedClass}">
        <div class="hots-section-label">1. Klasifikasikan Kasus (Tarik/Drag kartu ke zona target atau klik zona target):</div>
        <div class="hots-dnd-wrapper">
          <div class="hots-drag-card ${ans.category ? 'placed' : ''}" id="hotsDragCard" draggable="${isQuizStarted ? 'true' : 'false'}">
            <div>
              <span class="badge ${ans.category ? 'badge-success' : 'badge-info'}" style="margin-bottom: 0.4rem;">
                ${ans.category ? 'Sudah Diklasifikasikan: ' + categoryNames[ans.category] : 'Kartu Kasus Insiden (Tarik ke Kanan)'}
              </span>
              <div style="font-size: 0.88rem; color: var(--color-text-dark); line-height: 1.5;">
                "${escapeHtml(q.pertanyaan.slice(0, 125))}${q.pertanyaan.length > 125 ? '...' : ''}"
              </div>
            </div>
            <div style="font-size: 0.78rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.5rem;">
              ${ans.category ? 'Klik zona lain di kanan jika ingin mengubah klasifikasi.' : 'Seret (Drag) kartu ini atau klik langsung salah satu kategori di samping.'}
            </div>
          </div>

          <div class="hots-zones-grid" id="hotsZonesGrid">
            ${categories.map(cat => `
              <div class="hots-drop-zone ${ans.category === cat.key ? 'selected-zone' : ''}" data-cat="${cat.key}">
                <strong style="color: var(--color-primary); font-size: 0.92rem;">${cat.label}</strong>
                <span style="font-size: 0.76rem; color: var(--color-text-muted); line-height: 1.35;">${cat.desc}</span>
                ${ans.category === cat.key ? '<span class="badge badge-success" style="margin-top:0.25rem; font-size:0.72rem;">✓ Terpilih</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="hots-reasoning-box">
          <div class="hots-section-label" style="margin-bottom: 0.35rem;">2. Analisis Mekanisme &amp; Justifikasi Klasifikasi:</div>
          <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
            ${escapeHtml(hotsData.rubricHint || 'Jelaskan alasan teknis (cara kerja, media penyebaran, atau ciri bukti) mengapa skenario tersebut termasuk kategori pilihan Anda.')}
          </div>
          <textarea id="hotsReasoningInput" class="hots-reasoning-textarea" ${!isQuizStarted ? 'disabled' : ''} placeholder="Tuliskan analisis teknis Anda minimal 1-2 kalimat yang jelas...">${escapeHtml(ans.reasoning)}</textarea>
          <div style="font-size: 0.76rem; color: var(--color-text-muted); margin-top: 0.35rem; display: flex; justify-content: space-between;">
            <span>Penilaian otomatis memverifikasi klasifikasi &amp; kata kunci analisis konsep.</span>
            <span id="reasoningCharCount">${(ans.reasoning || '').trim().length} karakter</span>
          </div>
        </div>
      </div>
    `;

    if (!isQuizStarted) return;

    const dragCard = document.getElementById('hotsDragCard');
    const zones = workspaceEl.querySelectorAll('.hots-drop-zone');

    function assignCategory(catKey) {
      ans.category = catKey;
      renderQuestion(currentIndex);
    }

    if (dragCard) {
      dragCard.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', q.id);
        dragCard.classList.add('dragging');
      });
      dragCard.addEventListener('dragend', () => dragCard.classList.remove('dragging'));
    }

    zones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        assignCategory(zone.dataset.cat);
      });
      zone.addEventListener('click', () => {
        assignCategory(zone.dataset.cat);
      });
    });

    bindReasoningInput(ans);
  }

  /* -------------------------------------------------------------------
     MODE 2: MODUL 2 - MATRIKS EFEKTIVITAS + REKOMENDASI + KRITERIA C4-C5
     ------------------------------------------------------------------- */
  function renderModule2Workspace(q, ans, hotsData) {
    const systems = [
      { key: 'antivirus', label: 'Antivirus / Endpoint', desc: 'Memindai & mengkarantina file berbahaya pada perangkat lokal' },
      { key: 'firewall', label: 'Firewall (Packet Filter)', desc: 'Menyaring port, IP, & paket masuk/keluar jaringan' },
      { key: 'vpn', label: 'VPN (Virtual Private Net)', desc: 'Mengenkripsi jalur transmisi data di jaringan publik' },
      { key: 'auth', label: 'Autentikasi 2FA / MFA', desc: 'Verifikasi identitas lapis kedua (OTP) saat login' }
    ];

    const lockedClass = !isQuizStarted ? 'hots-locked-overlay' : '';

    workspaceEl.innerHTML = `
      <div class="${lockedClass}">
        <div class="hots-section-label">1. Matriks Analisis Efektivitas Keempat Sistem Keamanan:</div>
        <div class="table-responsive" style="margin-bottom: 1.25rem;">
          <table class="hots-matrix-table">
            <thead>
              <tr>
                <th style="width: 32%;">Komponen Sistem</th>
                <th style="width: 38%;">Fungsi Perlindungan</th>
                <th style="width: 30%;">Penilaian Efektivitas pada Kasus Ini</th>
              </tr>
            </thead>
            <tbody>
              ${systems.map(sys => {
                const val = (ans.matrix && ans.matrix[sys.key]) || '';
                return `
                  <tr>
                    <td><strong>${sys.label}</strong></td>
                    <td style="font-size: 0.82rem; color: var(--color-text-muted);">${sys.desc}</td>
                    <td>
                      <select class="hots-matrix-select js-matrix-select" data-sys="${sys.key}" ${!isQuizStarted ? 'disabled' : ''}>
                        <option value="">-- Pilih Efektivitas --</option>
                        <option value="sangat_efektif" ${val === 'sangat_efektif' ? 'selected' : ''}>Sangat Efektif (Solusi Inti)</option>
                        <option value="kurang_efektif" ${val === 'kurang_efektif' ? 'selected' : ''}>Kurang Efektif / Parsial</option>
                        <option value="tidak_relevan" ${val === 'tidak_relevan' ? 'selected' : ''}>Tidak Relevan / Tidak Mengatasi</option>
                      </select>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="hots-section-label">2. Rekomendasikan 1 Sistem Keamanan Paling Tepat Sesuai Kriteria Kasus:</div>
        <div class="hots-priority-grid">
          ${systems.map(sys => `
            <button type="button" class="hots-priority-btn ${ans.recommended === sys.key ? 'active' : ''}" data-rec="${sys.key}" ${!isQuizStarted ? 'disabled' : ''}>
              <span style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid ${ans.recommended === sys.key ? 'var(--color-secondary)' : '#cbd5e1'}; background: ${ans.recommended === sys.key ? 'var(--color-secondary)' : 'transparent'}; flex-shrink: 0;"></span>
              <span>${sys.label}</span>
            </button>
          `).join('')}
        </div>

        <div class="hots-reasoning-box">
          <div class="hots-section-label" style="margin-bottom: 0.35rem;">3. Argumentasi &amp; Kriteria Rekomendasi:</div>
          <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
            ${escapeHtml(hotsData.rubricHint || 'Jelaskan alasan mengapa sistem yang Anda rekomendasikan paling tepat untuk kriteria kasus tersebut dibanding 3 sistem lainnya.')}
          </div>
          <textarea id="hotsReasoningInput" class="hots-reasoning-textarea" ${!isQuizStarted ? 'disabled' : ''} placeholder="Uraikan argumen komparatif Anda minimal 1-2 kalimat yang jelas...">${escapeHtml(ans.reasoning)}</textarea>
          <div style="font-size: 0.76rem; color: var(--color-text-muted); margin-top: 0.35rem; display: flex; justify-content: space-between;">
            <span>Penilaian memverifikasi matriks 4 sistem, pilihan rekomendasi, dan argumen kriteria.</span>
            <span id="reasoningCharCount">${(ans.reasoning || '').trim().length} karakter</span>
          </div>
        </div>
      </div>
    `;

    if (!isQuizStarted) return;

    workspaceEl.querySelectorAll('.js-matrix-select').forEach(sel => {
      sel.addEventListener('change', () => {
        if (!ans.matrix) ans.matrix = {};
        ans.matrix[sel.dataset.sys] = sel.value;
        renderPalette();
        updateAnsweredCount();
      });
    });

    workspaceEl.querySelectorAll('.hots-priority-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ans.recommended = btn.dataset.rec;
        workspaceEl.querySelectorAll('.hots-priority-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderQuestion(currentIndex);
      });
    });

    bindReasoningInput(ans);
  }

  /* -------------------------------------------------------------------
     MODE 3: MODUL 3 - SIMULATOR KONFIGURASI FIREWALL + ANALISIS LOG C4-C6
     ------------------------------------------------------------------- */
  function renderModule3Workspace(q, ans, hotsData) {
    const trafficLabel = hotsData.trafficLabel || 'Lalu Lintas Jaringan';
    const protocol = hotsData.protocol || 'TCP';
    const port = hotsData.port || '80';
    const sourceIp = hotsData.sourceIp || '192.168.1.50';
    const destIp = hotsData.destIp || '10.0.0.10';
    const lockedClass = !isQuizStarted ? 'hots-locked-overlay' : '';

    let simLogText = '> Status Simulator: Siap menguji kebijakan aturan firewall.';
    let simLogClass = '';
    if (ans.simulated && ans.selectedAction) {
      if (ans.selectedAction === 'ALLOW') {
        simLogClass = 'allowed';
        simLogText = `[FIREWALL PASS] SRC=${sourceIp} -> DST=${destIp}:${port} (${protocol})\n> Kebijakan: ALLOW | Hasil Simulasi: PAKET DITERIMA & DITERUSKAN ke Server Tujuan.`;
      } else {
        simLogClass = 'blocked';
        simLogText = `[FIREWALL DROP] SRC=${sourceIp} -> DST=${destIp}:${port} (${protocol})\n> Kebijakan: BLOCK | Hasil Simulasi: PAKET DITOLAK & DIBUANG di gerbang Firewall.`;
      }
    }

    workspaceEl.innerHTML = `
      <div class="${lockedClass}">
        <div class="hots-section-label">1. Rancang Kebijakan Firewall &amp; Uji Simulasi Aliran Paket:</div>

        <!-- Info Header Paket -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem;">
          <span class="badge badge-info">Trafik: ${escapeHtml(trafficLabel)}</span>
          <span class="badge badge-secondary">Protokol: ${escapeHtml(protocol)}</span>
          <span class="badge badge-secondary">Port: ${escapeHtml(port)}</span>
          <span class="badge badge-secondary">Sumber: ${escapeHtml(sourceIp)} &rarr; Tujuan: ${escapeHtml(destIp)}</span>
        </div>

        <!-- Panggung Simulasi 3 Node -->
        <div class="hots-sim-stage" id="hotsSimStage">
          <div class="hots-sim-track"></div>
          <div class="hots-sim-packet" id="hotsSimPacket">PKT</div>

          <div class="hots-sim-node">
            <div style="font-weight: 700;">Sumber Paket</div>
            <div style="color: #cbd5e1; font-size: 0.74rem;">${escapeHtml(sourceIp)}</div>
          </div>
          <div class="hots-sim-node fw">
            <div style="font-weight: 700; color: #38bdf8;">FIREWALL ASJ</div>
            <div style="color: #e2e8f0; font-size: 0.74rem;">${ans.selectedAction ? 'Rule: ' + ans.selectedAction : 'Menunggu Aturan'}</div>
          </div>
          <div class="hots-sim-node">
            <div style="font-weight: 700;">Server Tujuan</div>
            <div style="color: #cbd5e1; font-size: 0.74rem;">${escapeHtml(destIp)}:${escapeHtml(port)}</div>
          </div>
        </div>

        <!-- Kontrol Allow / Block & Tombol Uji Simulasi -->
        <div class="hots-sim-controls">
          <button type="button" class="hots-fw-btn allow ${ans.selectedAction === 'ALLOW' ? 'active' : ''}" id="hotsBtnAllow" ${!isQuizStarted ? 'disabled' : ''}>
            ✓ Terapkan ALLOW (Izinkan)
          </button>
          <button type="button" class="hots-fw-btn block ${ans.selectedAction === 'BLOCK' ? 'active' : ''}" id="hotsBtnBlock" ${!isQuizStarted ? 'disabled' : ''}>
            ✕ Terapkan BLOCK (Tolak)
          </button>
          <button type="button" class="btn btn-primary" id="hotsBtnRunSim" ${!isQuizStarted ? 'disabled' : ''}>
            Jalankan Uji Simulasi
          </button>
        </div>

        <!-- Log Output Simulasi -->
        <div class="hots-sim-log ${simLogClass}" id="hotsSimLog" style="white-space: pre-line;">${escapeHtml(simLogText)}</div>

        <div class="hots-reasoning-box">
          <div class="hots-section-label" style="margin-bottom: 0.35rem;">2. Jelaskan Alasan Teknis Hasil Simulasi (Diterima / Ditolak):</div>
          <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
            ${escapeHtml(hotsData.rubricHint || 'Jelaskan alasan teknis mengapa lalu lintas jaringan tersebut harus diterima atau ditolak oleh firewall berdasarkan port, protokol, enkripsi, dan risikonya.')}
          </div>
          <textarea id="hotsReasoningInput" class="hots-reasoning-textarea" ${!isQuizStarted ? 'disabled' : ''} placeholder="Tuliskan penjelasan teknis hasil simulasi firewall Anda...">${escapeHtml(ans.reasoning)}</textarea>
          <div style="font-size: 0.76rem; color: var(--color-text-muted); margin-top: 0.35rem; display: flex; justify-content: space-between;">
            <span>Pastikan telah menekan "Jalankan Uji Simulasi" dan menjelaskan alasan teknisnya.</span>
            <span id="reasoningCharCount">${(ans.reasoning || '').trim().length} karakter</span>
          </div>
        </div>
      </div>
    `;

    if (!isQuizStarted) return;

    const btnAllow = document.getElementById('hotsBtnAllow');
    const btnBlock = document.getElementById('hotsBtnBlock');
    const btnRunSim = document.getElementById('hotsBtnRunSim');
    const pkt = document.getElementById('hotsSimPacket');
    const logEl = document.getElementById('hotsSimLog');

    btnAllow.addEventListener('click', () => {
      ans.selectedAction = 'ALLOW';
      ans.simulated = false;
      renderQuestion(currentIndex);
    });

    btnBlock.addEventListener('click', () => {
      ans.selectedAction = 'BLOCK';
      ans.simulated = false;
      renderQuestion(currentIndex);
    });

    btnRunSim.addEventListener('click', () => {
      if (!ans.selectedAction) {
        if (window.Utils) window.Utils.showToast('Pilih kebijakan ALLOW atau BLOCK terlebih dahulu.', 'warning');
        return;
      }

      btnRunSim.disabled = true;
      pkt.style.display = 'flex';
      pkt.style.left = '16%';
      pkt.style.background = '#38bdf8';
      pkt.style.transition = 'none';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          pkt.style.transition = 'left 0.55s ease-in-out, background 0.3s ease';
          pkt.style.left = '50%';

          setTimeout(() => {
            if (ans.selectedAction === 'ALLOW') {
              pkt.style.background = '#22c55e';
              pkt.style.left = '84%';
            } else {
              pkt.style.background = '#ef4444';
            }

            setTimeout(() => {
              ans.simulated = true;
              btnRunSim.disabled = false;
              logEl.className = `hots-sim-log ${ans.selectedAction === 'ALLOW' ? 'allowed' : 'blocked'}`;
              logEl.textContent = ans.selectedAction === 'ALLOW'
                ? `[FIREWALL PASS] SRC=${sourceIp} -> DST=${destIp}:${port} (${protocol})\n> Kebijakan: ALLOW | Hasil Simulasi: PAKET DITERIMA & DITERUSKAN ke Server Tujuan.`
                : `[FIREWALL DROP] SRC=${sourceIp} -> DST=${destIp}:${port} (${protocol})\n> Kebijakan: BLOCK | Hasil Simulasi: PAKET DITOLAK & DIBUANG di gerbang Firewall.`;
              renderPalette();
              updateAnsweredCount();
            }, 450);
          }, 580);
        });
      });
    });

    bindReasoningInput(ans);
  }

  function bindReasoningInput(ans) {
    const textarea = document.getElementById('hotsReasoningInput');
    const charCount = document.getElementById('reasoningCharCount');
    if (!textarea) return;

    textarea.addEventListener('input', () => {
      ans.reasoning = textarea.value;
      if (charCount) {
        charCount.textContent = `${ans.reasoning.trim().length} karakter`;
      }
      renderPalette();
      updateAnsweredCount();
    });
  }

  function renderPalette() {
    paletteContainer.innerHTML = '';
    rawQuizzes.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'palette-btn';
      btn.textContent = idx + 1;

      if (idx === currentIndex) btn.classList.add('current');
      if (isItemComplete(q)) btn.classList.add('answered');

      btn.addEventListener('click', () => renderQuestion(idx));
      paletteContainer.appendChild(btn);
    });
  }

  function updateAnsweredCount() {
    const completed = rawQuizzes.filter(q => isItemComplete(q)).length;
    answeredCountText.textContent = `${completed} dari ${totalQuestions} kasus lengkap`;
  }

  /* ===================================================================
     MESIN PENILAIAN HOTS OTOMATIS (HYBRID RUBRIK KATA KUNCI + AKURASI)
     =================================================================== */
  function evaluateReasoningText(text, expectedKeywords, maxPoints) {
    const clean = String(text || '').toLowerCase().trim();
    if (clean.length < 15) {
      return { points: 0, matchedKeywords: [] };
    }

    const words = clean.split(/\s+/).filter(Boolean);
    // Poin kelengkapan artikulasi kalimat (30% dari bobot uraian)
    const articulationPts = (clean.length >= 25 && words.length >= 5) ? (maxPoints * 0.3) : (maxPoints * 0.15);

    const synonymMap = {
      'mandiri': ['sendiri', 'otomatis', 'otonom'],
      'otomatis': ['sendiri', 'mandiri', 'tanpa klik'],
      'inang': ['host', 'induk', 'menempel', 'program lain'],
      'eksekusi': ['jalankan', 'buka', 'klik'],
      'palsu': ['tiruan', 'menipu', 'penyamaran', 'memalsukan', 'phishing'],
      'tautan': ['link', 'url', 'situs'],
      'kredensial': ['password', 'kata sandi', 'akun', 'username', 'login', 'sandi'],
      'banjir': ['membanjiri', 'flood', 'massal', 'ribuan', 'jutaan', 'ramai'],
      'lumpuh': ['down', 'mati', 'macet', 'tidak dapat diakses', 'lambat'],
      'enkripsi': ['terenkripsi', 'mengenkripsi', 'ssl', 'tls', 'acak', 'sandi'],
      'penyadapan': ['sadap', 'sniffing', 'mitm', 'intip', 'curi data'],
      'port': ['jalur', 'layanan', '21', '22', '23', '53', '80', '443', '445', '3306'],
      'blokir': ['tolak', 'block', 'drop', 'cegah', 'hentikan', 'ditolak'],
      'diterima': ['izinkan', 'allow', 'lolos', 'teruskan', 'aman'],
      'ditolak': ['blokir', 'block', 'drop', 'tolak', 'cegat', 'tidak aman'],
      'otp': ['kode', 'lapis kedua', '2fa', 'mfa', 'verifikasi'],
      'pindai': ['scan', 'deteksi', 'karantina', 'bersihkan'],
      'filter': ['saring', 'menyaring', 'pembatasan', 'aturan']
    };

    const keywords = Array.isArray(expectedKeywords) && expectedKeywords.length > 0
      ? expectedKeywords
      : ['aman', 'jaringan', 'sistem', 'data'];

    const matched = [];
    keywords.forEach(kw => {
      const kLower = String(kw).toLowerCase();
      const syns = synonymMap[kLower] || [];
      const found = clean.includes(kLower) || syns.some(s => clean.includes(s));
      if (found) matched.push(kw);
    });

    // Minimal 3 kata kunci cocok (atau separuh daftar kata kunci) = poin konsep penuh
    const targetMatchCount = Math.min(3, Math.max(2, Math.ceil(keywords.length * 0.35)));
    const conceptRatio = Math.min(1, matched.length / targetMatchCount);
    const conceptPts = conceptRatio * (maxPoints * 0.7);

    return {
      points: Math.round(articulationPts + conceptPts),
      matchedKeywords: matched
    };
  }

  function gradeHotsItem(q, ans) {
    const type = q.questionType || (String(moduleId) === '1' ? 'hots_m1_dnd' : (String(moduleId) === '2' ? 'hots_m2_case' : 'hots_m3_firewall'));
    const hotsData = q.hotsData || {};
    const expectedKeywords = hotsData.expectedKeywords || [];

    if (type === 'hots_m1_dnd') {
      const expectedCat = (hotsData.category || q.kunci || '').toLowerCase();
      const isCatCorrect = Boolean(ans.category && ans.category.toLowerCase() === expectedCat);
      const catPts = isCatCorrect ? 55 : 0;
      const reasonEval = evaluateReasoningText(ans.reasoning, expectedKeywords, 45);
      const itemScore = Math.min(100, catPts + reasonEval.points);
      return {
        ...ans,
        categoryCorrect: isCatCorrect,
        matchedKeywords: reasonEval.matchedKeywords,
        autoScore: itemScore
      };
    }

    if (type === 'hots_m2_case') {
      const targetMatrix = hotsData.matrix || {};
      const studentMatrix = ans.matrix || {};
      let matrixCorrectCount = 0;
      ['antivirus', 'firewall', 'vpn', 'auth'].forEach(k => {
        if (studentMatrix[k] && studentMatrix[k] === targetMatrix[k]) {
          matrixCorrectCount++;
        }
      });
      const matrixPts = matrixCorrectCount * 10; // maks 40
      const targetRec = (hotsData.recommended || q.kunci || '').toLowerCase();
      const isRecCorrect = Boolean(ans.recommended && ans.recommended.toLowerCase() === targetRec);
      const recPts = isRecCorrect ? 25 : 0;
      const reasonEval = evaluateReasoningText(ans.reasoning, expectedKeywords, 35);
      const itemScore = Math.min(100, matrixPts + recPts + reasonEval.points);
      return {
        ...ans,
        matrixCorrectCount,
        recommendedCorrect: isRecCorrect,
        matchedKeywords: reasonEval.matchedKeywords,
        autoScore: itemScore
      };
    }

    // hots_m3_firewall
    const expectedAction = (hotsData.action || q.kunci || '').toUpperCase();
    const isActionCorrect = Boolean(ans.selectedAction && ans.selectedAction.toUpperCase() === expectedAction);
    const actionPts = isActionCorrect ? (ans.simulated ? 50 : 40) : (ans.simulated ? 10 : 0);
    const reasonEval = evaluateReasoningText(ans.reasoning, expectedKeywords, 50);
    const itemScore = Math.min(100, actionPts + reasonEval.points);
    return {
      ...ans,
      actionCorrect: isActionCorrect,
      matchedKeywords: reasonEval.matchedKeywords,
      autoScore: itemScore
    };
  }

  /* ===================================================================
     SUBMIT EVALUASI HOTS
     =================================================================== */
  function submitQuiz(isAuto = false) {
    if (!isAuto) {
      const completedCount = rawQuizzes.filter(q => isItemComplete(q)).length;
      if (completedCount < totalQuestions) {
        const proceed = confirm(`Anda baru melengkapi ${completedCount} dari ${totalQuestions} kasus evaluasi (beserta alasan tertulisnya). Yakin ingin mengumpulkan evaluasi sekarang?`);
        if (!proceed) return;
      } else {
        const confirmSubmit = confirm('Semua kasus & alasan analisis sudah terisi. Kirim Evaluasi Anda sekarang?');
        if (!confirmSubmit) return;
      }
    }

    clearInterval(timerInterval);

    let totalScoreSum = 0;
    let passedCount = 0;

    rawQuizzes.forEach(q => {
      const rawAns = getOrInitAnswer(q);
      const graded = gradeHotsItem(q, rawAns);
      userAnswers[q.id] = graded;
      totalScoreSum += graded.autoScore;
      if (graded.autoScore >= 75) passedCount++;
    });

    const finalScore = Math.round(totalScoreSum / totalQuestions);
    const durationSpent = EVAL_DURATION_SECONDS - remainingSeconds;

    const resultPayload = {
      studentId: currentUser.id,
      studentName: currentUser.nama,
      moduleId: String(moduleId),
      moduleTitle: moduleMeta.judul,
      score: finalScore,
      correctCount: passedCount,
      wrongCount: totalQuestions - passedCount,
      totalQuestions: totalQuestions,
      userAnswers: userAnswers,
      assignedQuestionIds: rawQuizzes.map(q => q.id),
      durationSpent: durationSpent,
      kkm: 75,
      evalType: 'hots_c4_c6'
    };

    const savedResult = window.Storage.saveQuizResult(resultPayload);

    window.Utils.showToast('Evaluasi berhasil diserahkan! Menghitung capaian rubrik...', 'success', 2000);
    setTimeout(() => {
      window.location.href = `quiz-result.html?id=${savedResult.id}`;
    }, 800);
  }

  // Event Listeners
  const btnStartQuiz = document.getElementById('btnStartQuiz');
  if (btnStartQuiz) btnStartQuiz.addEventListener('click', startQuizSession);

  const btnStartQuizInBanner = document.getElementById('btnStartQuizInBanner');
  if (btnStartQuizInBanner) btnStartQuizInBanner.addEventListener('click', startQuizSession);

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) renderQuestion(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalQuestions - 1) renderQuestion(currentIndex + 1);
  });

  submitBtn.addEventListener('click', () => {
    if (!isQuizStarted) {
      if (window.Utils) window.Utils.showToast('Klik "Mulai Evaluasi" terlebih dahulu.', 'warning');
      return;
    }
    submitQuiz(false);
  });

  // Render awal standby
  renderQuestion(0);
  timerText.textContent = formatTimer(remainingSeconds);
});
