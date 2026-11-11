/**
 * ===================================================================
 * CyberTech - Module Step Helper & Sequential Access Control
 * Memperbarui progres modul siswa, mengunci akses bertahap antar menu,
 * dan menyinkronkan tampilan stepper di setiap halaman modul.
 * ===================================================================
 */

window.ModuleHelper = {
  _activeModuleId: null,
  _activeStage: null,
  _stepOrderByModule: {
    '1': ['material', 'activity', 'quiz'],
    '2': ['material', 'video', 'activity', 'quiz'],
    '3': ['material', 'video', 'activity', 'quiz']
  },
  _stageRoutes: {
    '1': {
      material: { url: 'module1-material.html', label: 'Materi & Video' },
      video: { url: 'module1-material.html?tab=video', label: 'Materi & Video' },
      activity: { url: 'module1-activity.html', label: 'Latihan Drag & Drop' },
      quiz: { url: 'quiz.html?module=1', label: 'Evaluasi' }
    },
    '2': {
      material: { url: 'module2-material.html', label: 'Materi' },
      video: { url: 'module2-infografis.html', label: 'Infografis Interaktif' },
      activity: { url: 'module2-activity.html', label: 'Studi Kasus' },
      quiz: { url: 'quiz.html?module=2', label: 'Evaluasi' }
    },
    '3': {
      material: { url: 'module3-material.html', label: 'Materi' },
      video: { url: 'module3-video.html', label: 'Animasi Firewall' },
      activity: { url: 'module3-activity.html', label: 'Simulasi Firewall' },
      quiz: { url: 'quiz.html?module=3', label: 'Evaluasi' }
    }
  },

  /**
   * Ambil progres modul milik user aktif dari Storage
   */
  getModuleProgress(moduleId) {
    const empty = { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, completed: false, percentage: 0 };
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (!user || !window.Storage) return empty;
    const allProg = window.Storage.getStudentProgress(user.id) || {};
    return allProg[String(moduleId)] || empty;
  },

  /**
   * Cek apakah suatu tahap spesifik pada modul sudah selesai
   */
  isStageComplete(moduleId, stage, prog = null) {
    const mId = String(moduleId);
    const p = prog || this.getModuleProgress(mId);
    if (mId === '1') {
      if (stage === 'material' || stage === 'video') return Boolean(p.materialRead || p.videoWatched);
      if (stage === 'activity') return Boolean(p.activityDone);
      if (stage === 'quiz') return Boolean(p.completed || (p.quizScore !== null && p.quizScore >= 75));
      return false;
    }
    if (stage === 'material') return Boolean(p.materialRead);
    if (stage === 'video') return Boolean(p.videoWatched);
    if (stage === 'activity') return Boolean(p.activityDone);
    if (stage === 'quiz') return Boolean(p.completed || (p.quizScore !== null && p.quizScore >= 75));
    return false;
  },

  /**
   * Cek apakah suatu tahap boleh dibuka (seluruh tahap sebelumnya sudah selesai)
   */
  isStageUnlocked(moduleId, stage, prog = null) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && user.role === 'guru') return true;

    const mId = String(moduleId);
    const order = this._stepOrderByModule[mId] || ['material', 'video', 'activity', 'quiz'];
    const normalizedStage = (mId === '1' && stage === 'video') ? 'material' : stage;
    const idx = order.indexOf(normalizedStage);
    if (idx <= 0) return true;

    const p = prog || this.getModuleProgress(mId);
    for (let i = 0; i < idx; i++) {
      if (!this.isStageComplete(mId, order[i], p)) {
        return false;
      }
    }
    return true;
  },

  /**
   * Cari tahap prasyarat pertama yang belum selesai untuk pengalihan / pesan kunci
   */
  getBlockingPrereq(moduleId, targetStage, prog = null) {
    const mId = String(moduleId);
    const order = this._stepOrderByModule[mId] || ['material', 'video', 'activity', 'quiz'];
    const routes = this._stageRoutes[mId] || this._stageRoutes['1'];
    const normalizedStage = (mId === '1' && targetStage === 'video') ? 'material' : targetStage;
    const idx = order.indexOf(normalizedStage);
    const p = prog || this.getModuleProgress(mId);

    for (let i = 0; i < idx; i++) {
      const reqStage = order[i];
      if (!this.isStageComplete(mId, reqStage, p)) {
        const info = routes[reqStage];
        return {
          stage: reqStage,
          url: info.url,
          label: info.label,
          message: `Selesaikan tahap "${info.label}" terlebih dahulu sebelum mengakses ${routes[normalizedStage].label}.`
        };
      }
    }
    return null;
  },

  /**
   * Paksa validasi akses saat halaman dimuat; alihkan jika tahap sebelumnya belum selesai
   */
  enforceStepAccess(moduleId, currentStage) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (!user || user.role === 'guru') return true;

    if (this.isStageUnlocked(moduleId, currentStage)) {
      return true;
    }

    const blocker = this.getBlockingPrereq(moduleId, currentStage);
    if (blocker) {
      const sep = blocker.url.includes('?') ? '&' : '?';
      window.location.replace(`${blocker.url}${sep}locked_msg=${encodeURIComponent(blocker.message)}`);
      return false;
    }
    return true;
  },

  /**
   * Identifikasi stage target dari href atau posisi stepper
   */
  _inferStageFromEl(el) {
    if (el.dataset.stage) return el.dataset.stage;
    const href = (el.getAttribute('href') || '').toLowerCase();
    if (href.includes('quiz.html')) return 'quiz';
    if (href.includes('activity.html')) return 'activity';
    if (href.includes('video.html') || href.includes('infografis.html')) return 'video';
    if (href.includes('material.html')) return 'material';
    return null;
  },

  /**
   * Sinkronkan status completed / locked pada menu stepper di halaman modul
   */
  refreshStepper(moduleId, currentStage) {
    const mId = String(moduleId);
    const stepper = document.querySelector('.module-stepper');
    if (!stepper) return;

    const prog = this.getModuleProgress(mId);
    const items = stepper.querySelectorAll('.stepper-item');

    items.forEach(item => {
      // Simpan teks label bersih tanpa prefix ✓ atau ikon gembok
      if (!item.dataset.baseLabel) {
        item.dataset.baseLabel = item.textContent.replace(/^[\u2713\u{1F512}\s]+/u, '').trim();
      }
      const baseLabel = item.dataset.baseLabel;
      const itemStage = this._inferStageFromEl(item) || (item.classList.contains('active') ? currentStage : null);
      if (!itemStage) return;

      const isCurrent = itemStage === currentStage || item.classList.contains('active');
      const isDone = this.isStageComplete(mId, itemStage, prog);
      const isUnlocked = this.isStageUnlocked(mId, itemStage, prog);

      item.classList.remove('completed', 'locked');
      item.removeAttribute('aria-disabled');

      // Pasang interceptor klik sekali per elemen
      if (!item.dataset.gateBound) {
        item.dataset.gateBound = '1';
        item.addEventListener('click', (e) => {
          if (item.classList.contains('locked')) {
            e.preventDefault();
            const msg = item.dataset.lockMessage || 'Selesaikan aktivitas sebelumnya terlebih dahulu!';
            if (window.Utils) {
              window.Utils.showToast(msg, 'warning', 3500);
            } else {
              alert(msg);
            }
          }
        });
      }

      if (isCurrent) {
        item.textContent = baseLabel;
        item.title = 'Tahap sedang dibuka';
      } else if (!isUnlocked) {
        const blocker = this.getBlockingPrereq(mId, itemStage, prog);
        const lockMsg = blocker ? blocker.message : 'Selesaikan tahap sebelumnya terlebih dahulu!';
        item.classList.add('locked');
        item.setAttribute('aria-disabled', 'true');
        item.dataset.lockMessage = lockMsg;
        item.title = lockMsg;
        item.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>${baseLabel}</span>`;
      } else if (isDone) {
        item.classList.add('completed');
        item.title = 'Tahap sudah diselesaikan';
        item.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${baseLabel}</span>`;
      } else {
        item.title = `Buka ${baseLabel}`;
        item.textContent = baseLabel;
      }
    });
  },

  /**
   * Kunci atau buka tombol aksi navigasi bawah (misal tombol "Lanjut ke Evaluasi")
   */
  setActionButtonLocked(btnEl, isLocked, lockMsg = 'Selesaikan aktivitas pada tahap ini terlebih dahulu!') {
    if (!btnEl) return;

    if (!btnEl.dataset.lockGateBound) {
      btnEl.dataset.lockGateBound = '1';
      btnEl.addEventListener('click', (e) => {
        if (btnEl.dataset.isLocked === '1') {
          e.preventDefault();
          const msg = btnEl.dataset.lockMsg || lockMsg;
          if (window.Utils) {
            window.Utils.showToast(msg, 'warning', 3500);
          } else {
            alert(msg);
          }
        }
      });
    }

    btnEl.dataset.isLocked = isLocked ? '1' : '0';
    btnEl.dataset.lockMsg = lockMsg;

    if (isLocked) {
      btnEl.classList.add('disabled', 'btn-step-locked');
      btnEl.setAttribute('aria-disabled', 'true');
      btnEl.style.pointerEvents = 'auto';
      btnEl.style.opacity = '';
      btnEl.title = lockMsg;
    } else {
      btnEl.classList.remove('disabled', 'btn-step-locked');
      btnEl.removeAttribute('disabled');
      btnEl.removeAttribute('aria-disabled');
      btnEl.style.pointerEvents = 'auto';
      btnEl.style.opacity = '1';
      btnEl.title = '';
    }
  },

  /**
   * Inisialisasi halaman tahap modul: cek izin akses, tampilkan pesan pengalihan jika ada, & render stepper
   */
  initStage(moduleId, currentStage) {
    this._activeModuleId = String(moduleId);
    this._activeStage = currentStage;

    // Tampilkan toast jika siswa baru saja dialihkan dari tahap yang masih terkunci
    const params = new URLSearchParams(window.location.search);
    const lockedMsg = params.get('locked_msg');
    if (lockedMsg) {
      if (window.Utils) {
        window.Utils.showToast(lockedMsg, 'warning', 4500);
      }
      params.delete('locked_msg');
      const cleanQuery = params.toString();
      const newUrl = window.location.pathname + (cleanQuery ? `?${cleanQuery}` : '') + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }

    if (!this.enforceStepAccess(moduleId, currentStage)) {
      return false;
    }

    this.refreshStepper(moduleId, currentStage);
    return true;
  },

  /**
   * Tandai bahwa materi telah dibaca oleh siswa
   */
  markMaterialRead(moduleId) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && window.Storage) {
      window.Storage.updateStudentProgress(user.id, moduleId, {
        materialRead: true
      });
    }
    if (this._activeModuleId === String(moduleId)) {
      this.refreshStepper(this._activeModuleId, this._activeStage);
    }
  },

  /**
   * Tandai bahwa video / infografis pembelajaran telah ditonton/diselesaikan
   */
  markVideoWatched(moduleId) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && window.Storage) {
      window.Storage.updateStudentProgress(user.id, moduleId, {
        videoWatched: true
      });
    }
    if (this._activeModuleId === String(moduleId)) {
      this.refreshStepper(this._activeModuleId, this._activeStage);
    }
  },

  /**
   * Tandai bahwa aktivitas modul telah diselesaikan
   */
  markActivityDone(moduleId) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && window.Storage) {
      window.Storage.updateStudentProgress(user.id, moduleId, {
        activityDone: true
      });
    }
    if (this._activeModuleId === String(moduleId)) {
      this.refreshStepper(this._activeModuleId, this._activeStage);
    }
  }
};
