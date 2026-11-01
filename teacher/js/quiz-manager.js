/**
 * ===================================================================
 * CyberTech - Quiz Manager Controller (Portal Guru)
 * Logika CRUD Bank Soal Kuis (Tambah, Edit, Hapus, Filter Modul)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const moduleSelect = document.getElementById('manageModuleSelect');
  const addQuestionBtn = document.getElementById('addQuestionBtn');
  const tbody = document.getElementById('quizzesTableBody');
  const questionCountBadge = document.getElementById('questionCountBadge');

  // Modal Form Editor Elements
  const editorModal = document.getElementById('quizEditorModal');
  const editorModalTitle = document.getElementById('editorModalTitle');
  const quizForm = document.getElementById('quizForm');
  const quizIdInput = document.getElementById('formQuizId');
  const quizModuleSelect = document.getElementById('formModuleSelect');
  const questionInput = document.getElementById('formQuestion');
  const optAInput = document.getElementById('formOptA');
  const optBInput = document.getElementById('formOptB');
  const optCInput = document.getElementById('formOptC');
  const optDInput = document.getElementById('formOptD');
  const correctKeySelect = document.getElementById('formCorrectKey');
  const explanationInput = document.getElementById('formExplanation');

  // Modal Delete Elements
  const deleteModal = document.getElementById('deleteConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const deleteQuestionSnippet = document.getElementById('deleteQuestionSnippet');
  let quizIdToDelete = null;

  // 1. Render Tabel Soal Berdasarkan Modul
  function renderQuizzesTable() {
    const selectedModId = moduleSelect.value;
    const quizzes = window.Storage.getQuizzes(selectedModId);

    questionCountBadge.textContent = `${quizzes.length} Butir Soal Aktif`;

    if (quizzes.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 2.5rem; color: var(--color-text-muted);">
            Belum ada butir soal pada modul ini. Klik tombol <strong>"+ Tambah Soal Baru"</strong> untuk menambahkan soal evaluasi.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = quizzes.map((q, idx) => {
      const questionSnippet = q.pertanyaan.length > 90 
        ? `${q.pertanyaan.substring(0, 90)}...` 
        : q.pertanyaan;

      return `
        <tr>
          <td style="font-weight: 700;">${idx + 1}</td>
          <td>
            <div style="font-weight: 600; color: var(--color-primary); margin-bottom: 0.35rem;">
              ${questionSnippet}
            </div>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">
              <strong>A:</strong> ${q.opsi.A.substring(0, 30)}... &bull; 
              <strong>B:</strong> ${q.opsi.B.substring(0, 30)}...
            </div>
          </td>
          <td><span class="badge badge-info">Modul ${q.moduleId}</span></td>
          <td>
            <span class="badge badge-success" style="font-weight: 800; font-size: 0.95rem;">
              Kunci: ${q.kunci}
            </span>
          </td>
          <td>
            <div style="font-size: 0.8rem; color: #475569; max-width: 250px;">
              ${q.pembahasan ? q.pembahasan.substring(0, 60) + '...' : '-'}
            </div>
          </td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-outline btn-sm js-edit-quiz" data-id="${q.id}" title="Edit Soal">
                ✏️ Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm js-delete-quiz" data-id="${q.id}" title="Hapus Soal">
                🗑️ Hapus
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Event Listeners Edit & Delete
    document.querySelectorAll('.js-edit-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditModal(id);
      });
    });

    document.querySelectorAll('.js-delete-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openDeleteModal(id);
      });
    });
  }

  // 2. Buka Modal Tambah Soal Baru
  addQuestionBtn.addEventListener('click', () => {
    quizForm.reset();
    quizIdInput.value = '';
    editorModalTitle.textContent = 'Tambah Butir Soal Kuis Baru';
    // Otomatis pilih modul yang sedang aktif difilter
    quizModuleSelect.value = moduleSelect.value;
    window.Utils.openModal('quizEditorModal');
  });

  // 3. Buka Modal Edit Soal
  function openEditModal(quizId) {
    const quiz = window.Storage.getQuizById(quizId);
    if (!quiz) return;

    quizIdInput.value = quiz.id;
    editorModalTitle.textContent = 'Edit Butir Soal Kuis';
    quizModuleSelect.value = String(quiz.moduleId);
    questionInput.value = quiz.pertanyaan;
    optAInput.value = quiz.opsi.A;
    optBInput.value = quiz.opsi.B;
    optCInput.value = quiz.opsi.C;
    optDInput.value = quiz.opsi.D;
    correctKeySelect.value = quiz.kunci;
    explanationInput.value = quiz.pembahasan || '';

    window.Utils.openModal('quizEditorModal');
  }

  // 4. Submit Formulir (Tambah / Update)
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = quizIdInput.value.trim();
    const targetModule = quizModuleSelect.value;
    const questionText = questionInput.value.trim();
    const optA = optAInput.value.trim();
    const optB = optBInput.value.trim();
    const optC = optCInput.value.trim();
    const optD = optDInput.value.trim();
    const correctKey = correctKeySelect.value;
    const explanation = explanationInput.value.trim();

    if (!questionText || !optA || !optB || !optC || !optD || !correctKey || !explanation) {
      window.Utils.showToast('Seluruh kolom isian formulir soal wajib diisi!', 'warning');
      return;
    }

    const payload = {
      moduleId: targetModule,
      pertanyaan: questionText,
      opsi: {
        A: optA,
        B: optB,
        C: optC,
        D: optD
      },
      kunci: correctKey,
      pembahasan: explanation
    };

    if (id) {
      // Mode Update
      window.Storage.updateQuiz(id, payload);
      window.Utils.showToast('Butir soal berhasil diperbarui!', 'success');
    } else {
      // Mode Tambah Baru
      window.Storage.addQuiz(payload);
      window.Utils.showToast('Butir soal baru berhasil ditambahkan ke bank soal!', 'success');
    }

    window.Utils.closeModal('quizEditorModal');
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

  // Eksekusi Hapus Permanen
  confirmDeleteBtn.addEventListener('click', () => {
    if (quizIdToDelete) {
      window.Storage.deleteQuiz(quizIdToDelete);
      window.Utils.showToast('Butir soal berhasil dihapus dari bank kuis.', 'info');
      quizIdToDelete = null;
      window.Utils.closeModal('deleteConfirmModal');
      renderQuizzesTable();
    }
  });

  // Filter Modul Change Event
  moduleSelect.addEventListener('change', renderQuizzesTable);

  // Render awal & listen API sync
  renderQuizzesTable();
  window.addEventListener('cybertech:synced', renderQuizzesTable);
});

