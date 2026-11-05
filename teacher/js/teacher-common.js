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

  // 5. Inisialisasi Hamburger Sidebar untuk Tampilan Mobile Guru
  const topbar = document.querySelector('.app-topbar');
  if (topbar) {
    let sidebarToggleBtn = topbar.querySelector('.js-sidebar-toggle');
    if (!sidebarToggleBtn) {
      sidebarToggleBtn = document.createElement('button');
      sidebarToggleBtn.type = 'button';
      sidebarToggleBtn.className = 'sidebar-toggle-btn js-sidebar-toggle';
      sidebarToggleBtn.setAttribute('aria-label', 'Buka Menu Navigasi');
      sidebarToggleBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
      topbar.prepend(sidebarToggleBtn);
    }
  }

  // Siapkan backdrop sidebar jika belum ada
  let sidebarBackdrop = document.querySelector('.sidebar-backdrop');
  if (!sidebarBackdrop) {
    sidebarBackdrop = document.createElement('div');
    sidebarBackdrop.className = 'sidebar-backdrop';
    document.body.appendChild(sidebarBackdrop);
  }

  const sidebar = document.querySelector('.app-sidebar');
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.js-sidebar-toggle');
    if (toggle && sidebar) {
      sidebar.classList.toggle('show');
      sidebarBackdrop.classList.toggle('show');
    } else if (e.target.classList.contains('sidebar-backdrop') && sidebar) {
      sidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
    }
  });

  if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove('show');
          sidebarBackdrop.classList.remove('show');
        }
      });
    });
  }
});

