/**
 * ===================================================================
 * CyberTech - Drag and Drop Interactive Engine (Modul 1)
 * Mendukung HTML5 Drag & Drop API dan Click/Tap Selection
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const draggableCards = document.querySelectorAll('.draggable-card');
  const dropZones = document.querySelectorAll('.drop-zone');
  const draggablePool = document.getElementById('draggablePool');
  const checkBtn = document.getElementById('checkAnswerBtn');
  const resetBtn = document.getElementById('resetActivityBtn');
  const feedbackBanner = document.getElementById('feedbackBanner');
  const nextQuizBtn = document.getElementById('nextQuizBtn');

  let selectedTapCard = null;

  // 1. Inisialisasi Drag Events
  draggableCards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.id);
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });

    // Tap / Click Selection Fallback (Untuk fleksibilitas di lab sekolah)
    card.addEventListener('click', () => {
      if (selectedTapCard === card) {
        card.classList.remove('selected-tap');
        selectedTapCard = null;
      } else {
        draggableCards.forEach(c => c.classList.remove('selected-tap'));
        card.classList.add('selected-tap');
        selectedTapCard = card;
        window.Utils.showToast('Kartu dipilih. Sekarang klik salah satu zona target untuk meletakkannya.', 'info', 2000);
      }
    });
  });

  // 2. Inisialisasi Drop Zone Events
  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const cardId = e.dataTransfer.getData('text/plain');
      const card = document.getElementById(cardId);
      if (card) {
        placeCardInZone(card, zone);
      }
    });

    // Click handler untuk tap-to-select
    zone.addEventListener('click', () => {
      if (selectedTapCard) {
        placeCardInZone(selectedTapCard, zone);
        selectedTapCard.classList.remove('selected-tap');
        selectedTapCard = null;
      }
    });
  });

  // Helper untuk meletakkan kartu ke dalam zona
  function placeCardInZone(card, zone) {
    const targetSlot = zone.querySelector('.drop-zone-content');
    const placeholder = zone.querySelector('.drop-zone-placeholder');
    
    // Jika zona sudah memiliki kartu lain, kembalikan kartu lama ke pool
    const existingCard = targetSlot.querySelector('.draggable-card');
    if (existingCard && existingCard !== card) {
      draggablePool.appendChild(existingCard);
    }

    targetSlot.appendChild(card);
    if (placeholder) placeholder.style.display = 'none';

    // Bersihkan status validasi sebelumnya saat kartu dipindahkan
    zone.classList.remove('is-correct', 'is-wrong');
    const badge = zone.querySelector('.zone-status-badge');
    if (badge) badge.remove();
  }

  // 3. Tombol Cek Jawaban
  checkBtn.addEventListener('click', () => {
    let placedCount = 0;
    let correctCount = 0;

    dropZones.forEach(zone => {
      const expectedTarget = zone.getAttribute('data-target'); // virus, worm, phishing, ddos
      const card = zone.querySelector('.draggable-card');
      const header = zone.querySelector('.drop-zone-header');

      // Hapus badge status sebelumnya
      const oldBadge = header.querySelector('.zone-status-badge');
      if (oldBadge) oldBadge.remove();

      if (card) {
        placedCount++;
        const cardAnswer = card.getAttribute('data-answer');

        const statusBadge = document.createElement('span');
        statusBadge.className = 'zone-status-badge badge';

        if (cardAnswer === expectedTarget) {
          correctCount++;
          zone.classList.add('is-correct');
          zone.classList.remove('is-wrong');
          statusBadge.classList.add('badge-success');
          statusBadge.textContent = 'Benar ✓';
        } else {
          zone.classList.add('is-wrong');
          zone.classList.remove('is-correct');
          statusBadge.classList.add('badge-danger');
          statusBadge.textContent = 'Kurang Tepat ✗';
        }
        header.appendChild(statusBadge);
      } else {
        zone.classList.remove('is-correct', 'is-wrong');
      }
    });

    if (placedCount < 4) {
      window.Utils.showToast(`Anda baru menempatkan ${placedCount} dari 4 kartu. Lengkapi semua zona!`, 'warning');
      return;
    }

    if (correctCount === 4) {
      // Seluruh 4 kartu benar
      feedbackBanner.classList.add('show');
      nextQuizBtn.classList.remove('disabled');
      nextQuizBtn.removeAttribute('disabled');
      window.Utils.showToast('Luar biasa! Seluruh 4 klasifikasi ancaman tepat!', 'success', 3000);

      // Simpan progres ke storage
      window.ModuleHelper.markActivityDone('1');
    } else {
      window.Utils.showToast(`${correctCount} dari 4 tepat. Periksa kartu yang berbingkai merah dan coba lagi!`, 'error', 3500);
    }
  });

  // 4. Tombol Reset Aktivitas
  resetBtn.addEventListener('click', () => {
    draggableCards.forEach(card => {
      draggablePool.appendChild(card);
      card.classList.remove('selected-tap');
    });

    dropZones.forEach(zone => {
      zone.classList.remove('is-correct', 'is-wrong');
      const placeholder = zone.querySelector('.drop-zone-placeholder');
      if (placeholder) placeholder.style.display = 'flex';
      const badge = zone.querySelector('.zone-status-badge');
      if (badge) badge.remove();
    });

    feedbackBanner.classList.remove('show');
    selectedTapCard = null;
    window.Utils.showToast('Aktivitas di-reset. Silakan tempatkan kembali kartu skenario.', 'info', 2000);
  });
});

