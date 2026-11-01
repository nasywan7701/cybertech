/**
 * ===================================================================
 * CyberTech - Landing Page Interactions & Auth Gate Trigger
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = window.Auth ? window.Auth.getCurrentUser() : null;

  // Jika sudah login, sesuaikan tombol Login pada Navbar
  const loginNavBtn = document.querySelector('.js-open-role-modal');
  if (currentUser && loginNavBtn) {
    const portalUrl = currentUser.role === 'guru' ? 'teacher/dashboard.html' : 'student/dashboard.html';
    loginNavBtn.textContent = `Dashboard (${currentUser.nama.split(' ')[0]})`;
    loginNavBtn.classList.remove('btn-outline-white');
    loginNavBtn.classList.add('btn-accent');
    loginNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = portalUrl;
    });
  } else {
    // Tangani seluruh tombol pemicu modal role pengguna
    document.querySelectorAll('.js-open-role-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.Utils.openModal('roleModal');
      });
    });
  }

  // Tangani klik pada 3 Kartu Fitur (Auth Gate)
  document.querySelectorAll('.js-feature-card').forEach(card => {
    card.addEventListener('click', () => {
      if (currentUser) {
        if (currentUser.role === 'guru') {
          window.location.href = 'teacher/dashboard.html';
        } else {
          window.location.href = 'student/modules.html';
        }
      } else {
        window.Utils.openModal('roleModal');
      }
    });
  });
});

