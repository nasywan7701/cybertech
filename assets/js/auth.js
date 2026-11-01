/**
 * ===================================================================
 * CyberTech - Authentication & Session Helper
 * Mengelola alur login, registrasi siswa, sesi, dan route guard
 * ===================================================================
 */

const Auth = {
  /**
   * Mengambil sesi pengguna saat ini
   */
  getCurrentUser() {
    return window.Storage ? window.Storage.getCurrentUser() : null;
  },

  /**
   * Memeriksa apakah ada pengguna yang sedang login
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Melakukan login berdasarkan identifier (username / email) dan password
   * Mendukung koneksi live MySQL backend dengan fallback ke LocalStorage
   */
  async login(usernameOrEmail, password, expectedRole = null) {
    if (!usernameOrEmail || !password) {
      return { success: false, message: 'Harap isi Username/Email dan Password.' };
    }

    const api = window.Storage ? window.Storage.getApiBaseUrl() : null;
    if (api) {
      try {
        const response = await fetch(`${api}/auth.php?action=login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: usernameOrEmail,
            password: password,
            role: expectedRole
          })
        });
        const data = await response.json();
        if (data.success && data.user) {
          const loggedInUser = {
            ...data.user,
            password: password
          };
          window.Storage.setCurrentUser(loggedInUser);
          return { success: true, user: loggedInUser, message: data.message };
        } else if (response.ok) {
          return { success: false, message: data.message || 'Login gagal.' };
        }
      } catch (err) {
        console.warn('[CyberTech Auth] Gagal memanggil API login MySQL, beralih ke cache lokal:', err);
      }
    }

    // Fallback: LocalStorage
    const user = window.Storage.getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return { success: false, message: 'Akun dengan Username atau Email tersebut tidak ditemukan.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Kata sandi yang Anda masukkan salah.' };
    }

    if (expectedRole && user.role !== expectedRole) {
      const roleLabel = expectedRole === 'guru' ? 'Guru' : 'Siswa';
      return { 
        success: false, 
        message: `Akun ini terdaftar sebagai ${user.role.toUpperCase()}. Silakan masuk melalui portal ${roleLabel}.` 
      };
    }

    // Set sesi pengguna
    window.Storage.setCurrentUser(user);
    return { success: true, user: user, message: 'Login berhasil!' };
  },

  /**
   * Pendaftaran akun baru mandiri untuk Siswa
   * Disimpan ke database MySQL jika server aktif, dan disinkronkan ke LocalStorage
   */
  async registerStudent(nama, email, password, konfirmasiPassword, kelas = 'XI TJKT 1') {
    // 1. Validasi Keberadaan Nilai
    if (!nama || !nama.trim()) {
      return { success: false, message: 'Nama lengkap wajib diisi.' };
    }
    if (!email || !email.trim()) {
      return { success: false, message: 'Alamat email wajib diisi.' };
    }
    if (!password) {
      return { success: false, message: 'Kata sandi wajib diisi.' };
    }

    // 2. Validasi Format Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { success: false, message: 'Format alamat email tidak valid.' };
    }

    // 3. Validasi Panjang Password & Konfirmasi
    if (password.length < 6) {
      return { success: false, message: 'Kata sandi minimal terdiri dari 6 karakter.' };
    }
    if (password !== konfirmasiPassword) {
      return { success: false, message: 'Konfirmasi kata sandi tidak cocok dengan kata sandi.' };
    }

    const api = window.Storage ? window.Storage.getApiBaseUrl() : null;
    if (api) {
      try {
        const response = await fetch(`${api}/auth.php?action=register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nama: nama.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            confirmPassword: konfirmasiPassword,
            kelas: kelas
          })
        });
        const data = await response.json();
        if (data.success && data.user) {
          const newStudent = {
            ...data.user,
            password: password
          };
          window.Storage.saveUser(newStudent);
          window.Storage.setCurrentUser(newStudent);
          return { success: true, user: newStudent, message: data.message };
        } else {
          return { success: false, message: data.message || 'Pendaftaran akun gagal.' };
        }
      } catch (err) {
        console.warn('[CyberTech Auth] Gagal memanggil API register MySQL, beralih ke cache lokal:', err);
      }
    }

    // Fallback: LocalStorage
    const existing = window.Storage.getUserByUsernameOrEmail(email.trim());
    if (existing) {
      return { success: false, message: 'Email tersebut sudah terdaftar di sistem CyberTech.' };
    }

    const username = email.trim().split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');

    const newStudent = {
      id: `user_siswa_${Date.now()}`,
      username: username,
      email: email.trim().toLowerCase(),
      nama: nama.trim(),
      password: password,
      role: 'siswa',
      nisn: '-',
      kelas: kelas,
      sekolah: 'SMK Negeri 1 Takalar',
      avatar: nama.trim().charAt(0).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    window.Storage.saveUser(newStudent);
    // Langsung set sesi login
    window.Storage.setCurrentUser(newStudent);

    return { success: true, user: newStudent, message: 'Akun Siswa berhasil dibuat!' };
  },

  /**
   * Keluar dari sesi aplikasi
   */
  logout(redirectUrl = '../index.html') {
    window.Storage.setCurrentUser(null);
    window.location.href = redirectUrl;
  },

  /**
   * Perbarui informasi profil pengguna aktif
   */
  async updateProfile(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Sesi tidak aktif.' };

    const api = window.Storage ? window.Storage.getApiBaseUrl() : null;
    if (api) {
      try {
        await fetch(`${api}/auth.php?action=profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: currentUser.id,
            nama: updates.nama || currentUser.nama,
            kelas: updates.kelas || currentUser.kelas || '',
            nip: updates.nip || currentUser.nip || '',
            avatar: updates.avatar || currentUser.avatar || ''
          })
        });
      } catch (err) {
        console.warn('[CyberTech Auth] Gagal memanggil API profil MySQL:', err);
      }
    }

    const updated = window.Storage.updateUser(currentUser.id, updates);
    return { success: true, user: updated, message: 'Profil berhasil diperbarui.' };
  },

  /**
   * Ganti kata sandi
   */
  async changePassword(oldPassword, newPassword, confirmPassword) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Sesi tidak aktif.' };

    if (currentUser.password && currentUser.password !== oldPassword) {
      return { success: false, message: 'Kata sandi lama tidak sesuai.' };
    }
    if (newPassword.length < 6) {
      return { success: false, message: 'Kata sandi baru minimal 6 karakter.' };
    }
    if (newPassword !== confirmPassword) {
      return { success: false, message: 'Konfirmasi kata sandi baru tidak cocok.' };
    }

    const api = window.Storage ? window.Storage.getApiBaseUrl() : null;
    if (api) {
      try {
        const response = await fetch(`${api}/auth.php?action=password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: currentUser.id,
            oldPassword: oldPassword,
            newPassword: newPassword
          })
        });
        const data = await response.json();
        if (!data.success) {
          return { success: false, message: data.message || 'Gagal mengubah kata sandi.' };
        }
      } catch (err) {
        console.warn('[CyberTech Auth] Gagal memanggil API ubah sandi MySQL:', err);
      }
    }

    window.Storage.updateUser(currentUser.id, { password: newPassword });
    return { success: true, message: 'Kata sandi berhasil diperbarui.' };
  },

  /**
   * Route Guard: Memastikan hanya pengguna dengan role yang sesuai yang dapat membuka halaman
   */
  requireAuth(requiredRole = null, loginUrl = '../index.html') {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = loginUrl;
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Alihkan ke portal yang sesuai peran pengguna
      if (user.role === 'guru') {
        window.location.href = '../teacher/dashboard.html';
      } else {
        window.location.href = '../student/dashboard.html';
      }
      return false;
    }

    return true;
  }
};

window.Auth = Auth;

