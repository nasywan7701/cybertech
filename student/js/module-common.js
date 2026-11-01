/**
 * ===================================================================
 * CyberTech - Module Step Helper
 * Memperbarui progres modul siswa dan sinkronisasi stepper
 * ===================================================================
 */

window.ModuleHelper = {
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
  },

  /**
   * Tandai bahwa video pembelajaran telah ditonton
   */
  markVideoWatched(moduleId) {
    const user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && window.Storage) {
      window.Storage.updateStudentProgress(user.id, moduleId, {
        videoWatched: true
      });
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
  }
};

