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
  // Interactive Cyber Simulator Carousel (Auto-rotation & Gesture Swipe)
  // ===================================================================
  const carouselTrack = document.getElementById('heroCarouselTrack');
  const carouselViewport = document.getElementById('heroCarouselViewport');
  const dotBtns = document.querySelectorAll('.js-carousel-dot');
  const prevBtn = document.querySelector('.js-carousel-prev');
  const nextBtn = document.querySelector('.js-carousel-next');

  if (carouselTrack && dotBtns.length > 0) {
    let currentSlide = 0;
    const totalSlides = dotBtns.length;
    let autoInterval = null;

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dotBtns.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoInterval = setInterval(nextSlide, 3500); // Otomatis bergeser setiap 3.5 detik
    }

    function stopAutoSlide() {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    dotBtns.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide-to'), 10);
        goToSlide(slideIdx);
        startAutoSlide();
      });
    });

    // Jeda auto-slide saat pointer/kursor berada di atas card simulasi
    if (carouselViewport) {
      carouselViewport.addEventListener('mouseenter', stopAutoSlide);
      carouselViewport.addEventListener('mouseleave', startAutoSlide);

      // Dukungan sentuhan / swipe geser di layar HP (Touch Gestures)
      let touchStartX = 0;
      let touchEndX = 0;

      carouselViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
      }, { passive: true });

      carouselViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 45) {
          nextSlide(); // Geser ke kiri -> lanjut slide
        } else if (touchEndX - touchStartX > 45) {
          prevSlide(); // Geser ke kanan -> mundur slide
        }
        startAutoSlide();
      }, { passive: true });
    }

    // Mulai animasi otomatis
    startAutoSlide();
  }
});

