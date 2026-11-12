const {
  getSql,
  ensureInitialized,
  sendJson,
  handleOptions,
  parseJsonBody,
  getQueryParams,
  hashPassword,
  verifyPassword,
  sanitizeUser
} = require('./_db');

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;

  try {
    const sql = getSql();
    await ensureInitialized(sql);

    const query = getQueryParams(req);
    const action = query.action || '';
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET' && action === 'users') {
      const rows = await sql.query(
        'SELECT id, username, email, nama, role, nip, nisn, kelas, sekolah, avatar, created_at FROM users ORDER BY created_at DESC'
      );
      return sendJson(res, 200, {
        success: true,
        data: rows.map(sanitizeUser)
      });
    }

    const input = method === 'GET' ? query : await parseJsonBody(req);

    if (method === 'POST' && action === 'login') {
      const identifier = String(input.identifier || '').trim();
      const password = String(input.password || '');
      const role = input.role ? String(input.role) : '';

      if (!identifier || !password) {
        return sendJson(res, 400, {
          success: false,
          message: 'Username/Email dan kata sandi wajib diisi.'
        });
      }

      const rows = await sql.query(
        'SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1) LIMIT 1',
        [identifier]
      );
      const user = rows[0];

      if (!user) {
        return sendJson(res, 401, {
          success: false,
          message: 'Username atau email tidak ditemukan.'
        });
      }

      if (!verifyPassword(password, user.password)) {
        return sendJson(res, 401, {
          success: false,
          message: 'Kata sandi yang Anda masukkan salah.'
        });
      }

      if (role && user.role !== role) {
        const expectedPortal = user.role === 'guru' ? 'Guru' : 'Siswa';
        return sendJson(res, 403, {
          success: false,
          message: `Akun ini terdaftar sebagai ${expectedPortal}. Silakan pilih portal yang sesuai.`
        });
      }

      return sendJson(res, 200, {
        success: true,
        user: sanitizeUser(user),
        message: 'Login berhasil.'
      });
    }

    if (method === 'POST' && action === 'register') {
      const nama = String(input.nama || '').trim();
      const email = String(input.email || '').trim().toLowerCase();
      const password = String(input.password || '');
      const confirmPassword = String(input.confirmPassword || '');
      const kelas = String(input.kelas || '').trim();

      if (!nama || !email || !password) {
        return sendJson(res, 400, {
          success: false,
          message: 'Nama, email, dan kata sandi wajib diisi.'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendJson(res, 400, {
          success: false,
          message: 'Format alamat email tidak valid.'
        });
      }

      if (password.length < 6) {
        return sendJson(res, 400, {
          success: false,
          message: 'Kata sandi minimal 6 karakter.'
        });
      }

      if (password !== confirmPassword) {
        return sendJson(res, 400, {
          success: false,
          message: 'Konfirmasi kata sandi tidak cocok.'
        });
      }

      const existing = await sql.query(
        'SELECT id FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
        [email]
      );
      if (existing.length > 0) {
        return sendJson(res, 409, {
          success: false,
          message: 'Alamat email ini sudah terdaftar.'
        });
      }

      let baseUsername = email.split('@')[0].replace(/[^a-z0-9_]/gi, '') || 'siswa';
      const dupUsername = await sql.query(
        'SELECT id FROM users WHERE LOWER(username) = LOWER($1) LIMIT 1',
        [baseUsername]
      );
      const username = dupUsername.length > 0
        ? `${baseUsername}_${Math.floor(100 + Math.random() * 900)}`
        : baseUsername;

      const userId = `user_siswa_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
      const hashedPassword = hashPassword(password);
      const avatar = nama[0].toUpperCase();

      const inserted = await sql.query(
        `INSERT INTO users (id, username, email, password, nama, role, kelas, sekolah, avatar)
         VALUES ($1, $2, $3, $4, $5, 'siswa', $6, 'SMK Negeri 1 Takalar', $7)
         RETURNING id, username, email, nama, role, nip, nisn, kelas, sekolah, avatar, created_at`,
        [userId, username, email, hashedPassword, nama, kelas || null, avatar]
      );

      for (const modId of ['1', '2', '3']) {
        await sql.query(
          'INSERT INTO student_progress (student_id, module_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [userId, modId]
        );
      }

      return sendJson(res, 201, {
        success: true,
        user: sanitizeUser(inserted[0]),
        message: 'Registrasi berhasil!'
      });
    }

    if (method === 'POST' && action === 'profile') {
      const userId = String(input.id || '').trim();
      const nama = String(input.nama || '').trim();
      const email = String(input.email || '').trim().toLowerCase();
      const kelas = input.kelas !== undefined && input.kelas !== '' ? String(input.kelas).trim() : null;
      const nip = input.nip !== undefined && input.nip !== '' ? String(input.nip).trim() : null;
      const avatar = input.avatar !== undefined && input.avatar !== '' ? String(input.avatar).trim() : null;

      if (!userId || !nama || !email) {
        return sendJson(res, 400, {
          success: false,
          message: 'Data profil tidak lengkap.'
        });
      }

      const dupEmail = await sql.query(
        'SELECT id FROM users WHERE LOWER(email) = LOWER($1) AND id <> $2 LIMIT 1',
        [email, userId]
      );
      if (dupEmail.length > 0) {
        return sendJson(res, 409, {
          success: false,
          message: 'Alamat email tersebut sudah digunakan oleh akun lain.'
        });
      }

      const updated = await sql.query(
        `UPDATE users
         SET nama = $1, email = $2, kelas = $3, nip = $4, avatar = $5
         WHERE id = $6
         RETURNING id, username, email, nama, role, nip, nisn, kelas, sekolah, avatar, created_at`,
        [nama, email, kelas, nip, avatar, userId]
      );

      if (updated.length === 0) {
        return sendJson(res, 404, {
          success: false,
          message: 'Pengguna tidak ditemukan.'
        });
      }

      return sendJson(res, 200, {
        success: true,
        user: sanitizeUser(updated[0]),
        message: 'Profil berhasil diperbarui.'
      });
    }

    if (method === 'POST' && action === 'verify_account') {
      const identifier = String(input.identifier || '').trim().toLowerCase();
      if (!identifier) {
        return sendJson(res, 400, {
          success: false,
          message: 'Silakan masukkan email atau username terdaftar.'
        });
      }

      const rows = await sql.query(
        'SELECT id, username, email, nama, role FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1) LIMIT 1',
        [identifier]
      );
      const user = rows[0];

      if (!user) {
        return sendJson(res, 404, {
          success: false,
          message: 'Akun dengan email atau username tersebut tidak ditemukan di database.'
        });
      }

      return sendJson(res, 200, {
        success: true,
        user,
        message: 'Akun ditemukan.'
      });
    }

    if (method === 'POST' && action === 'reset_password') {
      const identifier = String(input.identifier || '').trim().toLowerCase();
      const newPassword = String(input.newPassword || '');
      const confirmPassword = String(input.confirmPassword || '');

      if (!identifier || !newPassword) {
        return sendJson(res, 400, {
          success: false,
          message: 'Data tidak lengkap.'
        });
      }
      if (newPassword.length < 6) {
        return sendJson(res, 400, {
          success: false,
          message: 'Kata sandi baru minimal 6 karakter.'
        });
      }
      if (newPassword !== confirmPassword) {
        return sendJson(res, 400, {
          success: false,
          message: 'Konfirmasi kata sandi tidak cocok.'
        });
      }

      const rows = await sql.query(
        'SELECT id FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1) LIMIT 1',
        [identifier]
      );
      const user = rows[0];
      if (!user) {
        return sendJson(res, 404, {
          success: false,
          message: 'Akun tidak ditemukan.'
        });
      }

      const hashed = hashPassword(newPassword);
      await sql.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, user.id]);

      return sendJson(res, 200, {
        success: true,
        message: 'Kata sandi Anda berhasil diperbarui! Silakan login dengan kata sandi baru.'
      });
    }

    if (method === 'POST' && action === 'password') {
      const userId = String(input.id || '').trim();
      const oldPassword = String(input.oldPassword || '');
      const newPassword = String(input.newPassword || '');

      if (!userId || !oldPassword || !newPassword) {
        return sendJson(res, 400, {
          success: false,
          message: 'Data tidak lengkap.'
        });
      }
      if (newPassword.length < 6) {
        return sendJson(res, 400, {
          success: false,
          message: 'Kata sandi baru minimal 6 karakter.'
        });
      }

      const rows = await sql.query('SELECT password FROM users WHERE id = $1 LIMIT 1', [userId]);
      const user = rows[0];
      if (!user) {
        return sendJson(res, 404, {
          success: false,
          message: 'Pengguna tidak ditemukan.'
        });
      }

      if (!verifyPassword(oldPassword, user.password)) {
        return sendJson(res, 400, {
          success: false,
          message: 'Kata sandi lama tidak sesuai.'
        });
      }

      const hashed = hashPassword(newPassword);
      await sql.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);

      return sendJson(res, 200, {
        success: true,
        message: 'Kata sandi berhasil diperbarui.'
      });
    }

    return sendJson(res, 400, {
      success: false,
      message: 'Endpoint auth action tidak valid.'
    });
  } catch (err) {
    console.error('[api/auth] Error:', err);
    return sendJson(res, 500, {
      success: false,
      message: `Kesalahan server: ${err.message}`
    });
  }
};
