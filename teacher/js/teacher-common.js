/**
 * ===================================================================
 * CyberTech - Teacher Portal Common Script
 * Route guarding, render profil header/sidebar guru, dan logout handler
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Route Guard: Pastikan hanya pengguna bertipe 'guru' yang dapat mengakses
  if (!window.Auth || !window.Auth.requireAuth('guru', '../login.html?role=guru')) {
    return;
  }

  const currentUser = window.Auth.getCurrentUser();
  if (!currentUser) return;

  // 2. Render Nama & Avatar Guru di Header Topbar dan Sidebar
  document.querySelectorAll('.js-teacher-name').forEach(el => {
    el.textContent = currentUser.nama;
  });

  document.querySelectorAll('.js-teacher-firstname').forEach(el => {
    el.textContent = currentUser.nama.split(' ')[0];
  });

  document.querySelectorAll('.js-teacher-nip').forEach(el => {
    el.textContent = currentUser.nip ? `NIP: ${currentUser.nip}` : 'Pengampu Mata Pelajaran ASJ';
  });

  document.querySelectorAll('.js-teacher-avatar').forEach(el => {
    el.textContent = currentUser.avatar || 'G';
  });

  // 3. Pasang Event Listener Logout
  const logoutBtns = document.querySelectorAll('.js-logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Apakah Anda yakin ingin keluar dari Portal Guru CyberTech?')) {
        window.Auth.logout('../index.html');
      }
    });
  });

  // 4. Perbarui menu aktif di sidebar
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

