/**
 * ===================================================================
 * CyberTech - Student Portal Common Script
 * Route guarding, render profil header/sidebar, dan logout handler
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Route Guard: Pastikan hanya pengguna bertipe 'siswa' yang dapat mengakses
  if (!window.Auth || !window.Auth.requireAuth('siswa', '../login.html?role=siswa')) {
    return;
  }

  const currentUser = window.Auth.getCurrentUser();
  if (!currentUser) return;

  // 2. Render Nama & Avatar Siswa di Header Topbar dan Sidebar
  document.querySelectorAll('.js-student-name').forEach(el => {
    el.textContent = currentUser.nama;
  });

  document.querySelectorAll('.js-student-firstname').forEach(el => {
    el.textContent = currentUser.nama.split(' ')[0];
  });

  document.querySelectorAll('.js-student-email').forEach(el => {
    el.textContent = currentUser.email;
  });

  document.querySelectorAll('.js-student-class').forEach(el => {
    el.textContent = currentUser.kelas || 'XI TJKT';
  });

  document.querySelectorAll('.js-student-avatar').forEach(el => {
    el.textContent = currentUser.avatar || currentUser.nama.charAt(0).toUpperCase();
  });

  // 3. Pasang Event Listener Logout
  const logoutBtns = document.querySelectorAll('.js-logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Apakah Anda yakin ingin keluar dari akun CyberTech?')) {
        window.Auth.logout('../index.html');
      }
    });
  });

  // 4. Perbarui indikator menu sidebar yang aktif sesuai URL saat ini
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('href') === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});

/**
 * Utility khusus portal siswa untuk menghitung progres global
 */
window.StudentHelper = {
  getGlobalProgress(studentId) {
    if (!window.Storage) return { percentage: 0, completedCount: 0, totalModules: 3 };
    const progress = window.Storage.getStudentProgress(studentId);
    let totalPct = 0;
    let completedCount = 0;

    ['1', '2', '3'].forEach(mId => {
      const p = progress[mId] || { percentage: 0, completed: false };
      totalPct += p.percentage || 0;
      if (p.completed || (p.quizScore !== null && p.quizScore >= 75)) {
        completedCount++;
      }
    });

    const averagePct = Math.round(totalPct / 3);
    return {
      percentage: averagePct,
      completedCount: completedCount,
      totalModules: 3,
      modules: progress
    };
  }
};

