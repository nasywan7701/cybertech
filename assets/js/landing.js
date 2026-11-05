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

  // Toggle Menu Navigasi Mobile pada Landing Page
  const mobileToggle = document.querySelector('.js-navbar-mobile-toggle');
  const navbarNav = document.querySelector('.site-navbar .navbar-nav');
  if (mobileToggle && navbarNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarNav.classList.toggle('show');
    });

    // Tutup menu saat salah satu link diklik
    navbarNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('show');
      });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
      if (!navbarNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        navbarNav.classList.remove('show');
      }
    });
  }

  // ===================================================================
  // Interactive Cyber Simulator Carousel (Berpindah Otomatis Penuh)
  // ===================================================================
  const carouselTrack = document.getElementById('heroCarouselTrack');
  const dotIndicators = document.querySelectorAll('.js-carousel-dot');

  if (carouselTrack) {
    let currentSlide = 0;
    const totalSlides = carouselTrack.children.length || 4;

    function autoAdvanceSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (dotIndicators.length > 0) {
        dotIndicators.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }
    }

    // Berputar otomatis setiap 3 detik secara mandiri tanpa perlu klik tombol
    setInterval(autoAdvanceSlide, 3000);
  }
});

