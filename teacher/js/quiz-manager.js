/**
 * ===================================================================
 * CyberTech - HOTS C4–C6 Case Bank Manager (Portal Guru)
 * CRUD Bank Kasus Evaluasi Non-Pilihan Ganda (Modul 1, 2, 3)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const moduleSelect = document.getElementById('manageModuleSelect');
  const addQuestionBtn = document.getElementById('addQuestionBtn');
  const tbody = document.getElementById('quizzesTableBody');
  const questionCountBadge = document.getElementById('questionCountBadge');

  // Modal Form Editor Elements
  const editorModalTitle = document.getElementById('editorModalTitle');
  const quizForm = document.getElementById('quizForm');
  const quizIdInput = document.getElementById('formQuizId');
  const quizModuleSelect = document.getElementById('formModuleSelect');
  const questionInput = document.getElementById('formQuestion');
  const keywordsInput = document.getElementById('formKeywords');
  const rubricHintInput = document.getElementById('formRubricHint');
  const explanationInput = document.getElementById('formExplanation');

  // Module-specific field containers & controls
  const hotsFieldsM1 = document.getElementById('hotsFieldsM1');
  const hotsFieldsM2 = document.getElementById('hotsFieldsM2');
  const hotsFieldsM3 = document.getElementById('hotsFieldsM3');

  const m1Category = document.getElementById('formM1Category');

  const m2Antivirus = document.getElementById('formM2Antivirus');
  const m2Firewall = document.getElementById('formM2Firewall');
  const m2Vpn = document.getElementById('formM2Vpn');
  const m2Auth = document.getElementById('formM2Auth');
  const m2Recommended = document.getElementById('formM2Recommended');

  const m3TrafficLabel = document.getElementById('formM3TrafficLabel');
  const m3Protocol = document.getElementById('formM3Protocol');
  const m3Port = document.getElementById('formM3Port');
  const m3SourceIp = document.getElementById('formM3SourceIp');
  const m3DestIp = document.getElementById('formM3DestIp');
  const m3Action = document.getElementById('formM3Action');

  // Modal Delete Elements
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const deleteQuestionSnippet = document.getElementById('deleteQuestionSnippet');
  let quizIdToDelete = null;

  const TYPE_LABELS = {
    hots_m1_dnd: 'Drag & Drop',
    hots_m2_case: 'Matriks Kasus',
    hots_m3_firewall: 'Simulasi Firewall'
  };

  function esc(str) {
    if (window.Utils && typeof window.Utils.escapeHtml === 'function') {
      return window.Utils.escapeHtml(str || '');
    }
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function toggleModuleSpecificFields(modId) {
    const idStr = String(modId);
    hotsFieldsM1.style.display = idStr === '1' ? 'block' : 'none';
    hotsFieldsM2.style.display = idStr === '2' ? 'block' : 'none';
    hotsFieldsM3.style.display = idStr === '3' ? 'block' : 'none';
  }

  quizModuleSelect.addEventListener('change', () => {
    toggleModuleSpecificFields(quizModuleSelect.value);
  });

  // 1. Render Tabel Kasus HOTS Berdasarkan Modul
  function renderQuizzesTable() {
    const selectedModId = moduleSelect.value;
    const quizzes = window.Storage.getQuizzes(selectedModId) || [];

    questionCountBadge.textContent = `${quizzes.length} Kasus Aktif`;

    if (quizzes.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 2.5rem; color: var(--color-text-muted);">
            Belum ada skenario kasus evaluasi pada modul ini. Klik tombol <strong>"+ Tambah Kasus Baru"</strong> untuk menambahkan studi kasus evaluasi.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = quizzes.map((q, idx) => {
      const hots = q.hotsData || {};
      const keywords = Array.isArray(hots.expectedKeywords) ? hots.expectedKeywords : [];
      const snippet = q.pertanyaan.length > 95 ? `${q.pertanyaan.substring(0, 95)}...` : q.pertanyaan;
      const typeLabel = TYPE_LABELS[q.questionType] || `Modul ${q.moduleId}`;

      let keyDisplay = String(q.kunci || '-').toUpperCase();
      if (q.questionType === 'hots_m3_firewall' && hots.port) {
        keyDisplay = `${hots.action || q.kunci} (${hots.protocol || 'TCP'}:${hots.port})`;
      } else if (q.questionType === 'hots_m2_case') {
        keyDisplay = `Prioritas: ${String(hots.recommended || q.kunci).toUpperCase()}`;
      } else if (q.questionType === 'hots_m1_dnd') {
        keyDisplay = String(hots.category || q.kunci).toUpperCase();
      }

      return `
        <tr>
          <td style="font-weight: 700; text-align: center;">${idx + 1}</td>
          <td>
            <div style="font-weight: 600; color: var(--color-primary); margin-bottom: 0.35rem; line-height: 1.4;">
              ${esc(snippet)}
            </div>
            <div style="font-size: 0.78rem; color: var(--color-text-muted);">
              <strong>Kata Kunci Rubrik:</strong> ${keywords.length ? esc(keywords.join(', ')) : '-'}
            </div>
          </td>
          <td style="text-align: center;">
            <span class="badge badge-info" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.28rem 0.6rem; border-radius: 9999px; font-weight: 600; font-size: 0.78rem; white-space: nowrap;">
              M${q.moduleId} &bull; ${esc(typeLabel)}
            </span>
          </td>
          <td style="text-align: center;">
            <span class="badge badge-success" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.28rem 0.65rem; border-radius: 9999px; font-weight: 700; font-size: 0.78rem; white-space: nowrap;">
              ${esc(keyDisplay)}
            </span>
          </td>
          <td>
            <div style="font-size: 0.8rem; color: #475569; line-height: 1.45;">
              ${q.pembahasan ? esc(q.pembahasan.length > 70 ? q.pembahasan.substring(0, 70) + '...' : q.pembahasan) : '-'}
            </div>
          </td>
          <td style="text-align: center; white-space: nowrap;">
            <div style="display: inline-flex; gap: 6px; justify-content: center; align-items: center;">
              <button type="button" class="btn btn-outline btn-sm js-edit-quiz" data-id="${esc(q.id)}" title="Edit Kasus" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <span>Edit</span>
              </button>
              <button type="button" class="btn btn-danger btn-sm js-delete-quiz" data-id="${esc(q.id)}" title="Hapus Kasus" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                <span>Hapus</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelectorAll('.js-edit-quiz').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.getAttribute('data-id')));
    });

    document.querySelectorAll('.js-delete-quiz').forEach(btn => {
      btn.addEventListener('click', () => openDeleteModal(btn.getAttribute('data-id')));
    });
  }

  // 2. Buka Modal Tambah Kasus Baru
  addQuestionBtn.addEventListener('click', () => {
    quizForm.reset();
    quizIdInput.value = '';
    editorModalTitle.textContent = 'Tambah Kasus Evaluasi Baru';
    quizModuleSelect.value = moduleSelect.value;
    toggleModuleSpecificFields(quizModuleSelect.value);
    window.Utils.openModal('quizEditorModal');
  });

  // 3. Buka Modal Edit Kasus
  function openEditModal(quizId) {
    const quiz = window.Storage.getQuizById(quizId);
    if (!quiz) return;

    const hots = quiz.hotsData || {};
    const modId = String(quiz.moduleId);

    quizIdInput.value = quiz.id;
    editorModalTitle.textContent = `Edit Kasus Evaluasi (Modul ${modId})`;
    quizModuleSelect.value = modId;
    toggleModuleSpecificFields(modId);

    questionInput.value = quiz.pertanyaan || '';
    keywordsInput.value = Array.isArray(hots.expectedKeywords) ? hots.expectedKeywords.join(', ') : '';
    rubricHintInput.value = hots.rubricHint || '';
    explanationInput.value = quiz.pembahasan || '';

    if (modId === '1') {
      m1Category.value = hots.category || quiz.kunci || 'virus';
    } else if (modId === '2') {
      const m = hots.matrix || {};
      m2Antivirus.value = m.antivirus || 'kurang_efektif';
      m2Firewall.value = m.firewall || 'kurang_efektif';
      m2Vpn.value = m.vpn || 'tidak_relevan';
      m2Auth.value = m.auth || 'tidak_relevan';
      m2Recommended.value = hots.recommended || quiz.kunci || 'firewall';
    } else if (modId === '3') {
      m3TrafficLabel.value = hots.trafficLabel || '';
      m3Protocol.value = hots.protocol || 'TCP';
      m3Port.value = hots.port || '';
      m3SourceIp.value = hots.sourceIp || '';
      m3DestIp.value = hots.destIp || '';
      m3Action.value = hots.action || quiz.kunci || 'ALLOW';
    }

    window.Utils.openModal('quizEditorModal');
  }

  // 4. Submit Formulir (Tambah / Update)
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = quizIdInput.value.trim();
    const targetModule = String(quizModuleSelect.value);
    const questionText = questionInput.value.trim();
    const expectedKeywords = keywordsInput.value
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
    const rubricHint = rubricHintInput.value.trim();
    const explanation = explanationInput.value.trim();

    if (!questionText || expectedKeywords.length === 0 || !rubricHint || !explanation) {
      window.Utils.showToast('Narasi kasus, kata kunci rubrik, pemandu siswa, dan pembahasan wajib diisi!', 'warning');
      return;
    }

    let questionType = 'hots_m1_dnd';
    let kunci = '';
    let hotsData = {
      expectedKeywords,
      rubricHint
    };

    if (targetModule === '1') {
      questionType = 'hots_m1_dnd';
      kunci = m1Category.value;
      hotsData.category = m1Category.value;
    } else if (targetModule === '2') {
      questionType = 'hots_m2_case';
      kunci = m2Recommended.value;
      hotsData.matrix = {
        antivirus: m2Antivirus.value,
        firewall: m2Firewall.value,
        vpn: m2Vpn.value,
        auth: m2Auth.value
      };
      hotsData.recommended = m2Recommended.value;
    } else if (targetModule === '3') {
      const trafficLabel = m3TrafficLabel.value.trim();
      const protocol = m3Protocol.value.trim();
      const port = m3Port.value.trim();
      const sourceIp = m3SourceIp.value.trim();
      const destIp = m3DestIp.value.trim();
      if (!trafficLabel || !protocol || !port || !sourceIp || !destIp) {
        window.Utils.showToast('Seluruh parameter paket lalu lintas Modul 3 wajib diisi!', 'warning');
        return;
      }
      questionType = 'hots_m3_firewall';
      kunci = m3Action.value;
      hotsData.trafficLabel = trafficLabel;
      hotsData.protocol = protocol;
      hotsData.port = port;
      hotsData.sourceIp = sourceIp;
      hotsData.destIp = destIp;
      hotsData.action = m3Action.value;
    }

    const payload = {
      moduleId: targetModule,
      questionType,
      pertanyaan: questionText,
      kunci,
      hotsData,
      pembahasan: explanation
    };

    if (id) {
      window.Storage.updateQuiz(id, payload);
      window.Utils.showToast('Kasus evaluasi berhasil diperbarui!', 'success');
    } else {
      window.Storage.addQuiz(payload);
      window.Utils.showToast('Kasus evaluasi baru berhasil ditambahkan ke bank soal!', 'success');
    }

    window.Utils.closeModal('quizEditorModal');
    moduleSelect.value = targetModule;
    renderQuizzesTable();
  });

  // 5. Buka Modal Konfirmasi Hapus
  function openDeleteModal(quizId) {
    const quiz = window.Storage.getQuizById(quizId);
    if (!quiz) return;

    quizIdToDelete = quizId;
    deleteQuestionSnippet.textContent = `"${quiz.pertanyaan}"`;
    window.Utils.openModal('deleteConfirmModal');
  }

  confirmDeleteBtn.addEventListener('click', () => {
    if (quizIdToDelete) {
      window.Storage.deleteQuiz(quizIdToDelete);
      window.Utils.showToast('Kasus evaluasi berhasil dihapus dari bank evaluasi.', 'info');
      quizIdToDelete = null;
      window.Utils.closeModal('deleteConfirmModal');
      renderQuizzesTable();
    }
  });

  moduleSelect.addEventListener('change', renderQuizzesTable);

  renderQuizzesTable();
  window.addEventListener('cybertech:synced', renderQuizzesTable);
});
