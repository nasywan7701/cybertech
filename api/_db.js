const crypto = require('node:crypto');
const { neon } = require('@neondatabase/serverless');
const seedData = require('./_seed-data.json');

let customSqlFactory = null;
let initPromise = null;

function setSqlFactoryForTest(factory) {
  customSqlFactory = factory;
  initPromise = null;
}

function resetInitCacheForTest() {
  initPromise = null;
}

function getSql() {
  if (customSqlFactory) {
    return customSqlFactory();
  }
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not configured.');
  }
  return neon(connectionString);
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
}

function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}

async function parseJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return req.body;
    }
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
    return raw.trim() ? JSON.parse(raw) : {};
  }

  if (typeof req.on !== 'function' || req.readableEnded) {
    return {};
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8').trim();
      if (!text) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(text));
      } catch (err) {
        reject(new Error('Invalid JSON request body'));
      }
    });
    req.on('error', reject);
  });
}

function getQueryParams(req) {
  if (req.query && typeof req.query === 'object') {
    return req.query;
  }
  const parsed = new URL(req.url || '/', 'http://localhost');
  const out = {};
  for (const [k, v] of parsed.searchParams.entries()) {
    out[k] = v;
  }
  return out;
}

function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(plainPassword), salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

function verifyPassword(plainPassword, storedPassword) {
  if (!storedPassword) return false;
  const plain = String(plainPassword || '');
  const stored = String(storedPassword);

  if (stored.startsWith('scrypt$')) {
    const parts = stored.split('$');
    if (parts.length !== 3) return false;
    const [, salt, hashHex] = parts;
    const derived = crypto.scryptSync(plain, salt, 64);
    const expected = Buffer.from(hashHex, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  }

  return plain === stored;
}

function sanitizeUser(row) {
  if (!row) return null;
  const { password, ...rest } = row;
  return {
    ...rest,
    createdAt: rest.created_at || rest.createdAt || null
  };
}

function calcModulePercentage(moduleId, mr, vw, ad, qs) {
  let pct = 0;
  if (String(moduleId) === '1') {
    if (mr || vw) pct += 40;
  } else {
    if (mr) pct += 20;
    if (vw) pct += 20;
  }
  if (ad) pct += 30;
  if (qs !== null && qs !== undefined && Number(qs) >= 75) pct += 30;
  return Math.min(100, pct);
}

async function seedDatabase(sql) {
  const modCountRows = await sql.query('SELECT COUNT(*)::int AS cnt FROM modules');
  if ((modCountRows[0]?.cnt ?? 0) === 0 && seedData.modules.length > 0) {
    const values = [];
    const placeholders = seedData.modules.map((m, idx) => {
      const base = idx * 7;
      values.push(
        String(m.id),
        m.judul || m.title || '',
        m.subjudul || m.subtitle || null,
        m.deskripsi || m.description || null,
        m.durasi || m.duration || null,
        Number(m.kkm ?? 75),
        Number(m.totalSoal ?? m.total_questions ?? 10)
      );
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7})`;
    });
    await sql.query(
      `INSERT INTO modules (id, title, subtitle, description, duration, kkm, total_questions)
       VALUES ${placeholders.join(', ')}
       ON CONFLICT (id) DO NOTHING`,
      values
    );
  }

  const userCountRows = await sql.query('SELECT COUNT(*)::int AS cnt FROM users');
  if ((userCountRows[0]?.cnt ?? 0) === 0 && seedData.users.length > 0) {
    const values = [];
    const placeholders = seedData.users.map((u, idx) => {
      const base = idx * 11;
      values.push(
        u.id,
        u.username,
        u.email,
        u.password,
        u.nama,
        u.role || 'siswa',
        u.nip || null,
        u.nisn || null,
        u.kelas || null,
        u.sekolah || 'SMK Negeri 1 Takalar',
        u.avatar || (u.nama ? u.nama[0].toUpperCase() : 'U')
      );
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10}, $${base + 11})`;
    });
    await sql.query(
      `INSERT INTO users (id, username, email, password, nama, role, nip, nisn, kelas, sekolah, avatar)
       VALUES ${placeholders.join(', ')}
       ON CONFLICT (id) DO NOTHING`,
      values
    );
  }

  const quizCountRows = await sql.query('SELECT COUNT(*)::int AS cnt FROM quizzes');
  if ((quizCountRows[0]?.cnt ?? 0) === 0 && seedData.quizzes.length > 0) {
    const values = [];
    const placeholders = seedData.quizzes.map((q, idx) => {
      const base = idx * 11;
      const opsi = q.opsi || {};
      values.push(
        q.id,
        String(q.moduleId),
        q.questionType || 'multiple_choice',
        q.pertanyaan || '',
        opsi.A || '',
        opsi.B || '',
        opsi.C || '',
        opsi.D || '',
        q.kunci || '',
        q.hotsData ? JSON.stringify(q.hotsData) : null,
        q.pembahasan || null
      );
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10}, $${base + 11})`;
    });
    await sql.query(
      `INSERT INTO quizzes (id, module_id, question_type, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, kunci, hots_data, pembahasan)
       VALUES ${placeholders.join(', ')}
       ON CONFLICT (id) DO NOTHING`,
      values
    );
  }
}

async function ensureInitialized(sql) {
  if (!initPromise) {
    initPromise = (async () => {
      await sql.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          nama TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'siswa',
          nip TEXT DEFAULT NULL,
          nisn TEXT DEFAULT NULL,
          kelas TEXT DEFAULT NULL,
          sekolah TEXT DEFAULT 'SMK Negeri 1 Takalar',
          avatar TEXT DEFAULT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS modules (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          subtitle TEXT DEFAULT NULL,
          description TEXT DEFAULT NULL,
          duration TEXT DEFAULT NULL,
          kkm INTEGER DEFAULT 75,
          total_questions INTEGER DEFAULT 15
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS quizzes (
          id TEXT PRIMARY KEY,
          module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
          question_type TEXT DEFAULT 'multiple_choice',
          pertanyaan TEXT NOT NULL,
          opsi_a TEXT DEFAULT '',
          opsi_b TEXT DEFAULT '',
          opsi_c TEXT DEFAULT '',
          opsi_d TEXT DEFAULT '',
          kunci TEXT DEFAULT '',
          hots_data TEXT DEFAULT NULL,
          pembahasan TEXT DEFAULT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS student_progress (
          student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
          material_read INTEGER DEFAULT 0,
          video_watched INTEGER DEFAULT 0,
          activity_done INTEGER DEFAULT 0,
          quiz_score INTEGER DEFAULT NULL,
          percentage INTEGER DEFAULT 0,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (student_id, module_id)
        )
      `);

      await sql.query(`
        CREATE TABLE IF NOT EXISTS quiz_results (
          id TEXT PRIMARY KEY,
          student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
          module_title TEXT DEFAULT NULL,
          score INTEGER NOT NULL,
          correct_count INTEGER NOT NULL,
          wrong_count INTEGER NOT NULL,
          total_questions INTEGER NOT NULL,
          duration_spent INTEGER DEFAULT 0,
          kkm INTEGER DEFAULT 75,
          teacher_feedback TEXT DEFAULT '',
          graded_by_teacher INTEGER DEFAULT 0,
          user_answers TEXT DEFAULT NULL,
          timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await sql.query('CREATE INDEX IF NOT EXISTS idx_quizzes_module ON quizzes(module_id)');
      await sql.query('CREATE INDEX IF NOT EXISTS idx_results_student ON quiz_results(student_id)');
      await sql.query('CREATE INDEX IF NOT EXISTS idx_results_module ON quiz_results(module_id)');

      await seedDatabase(sql);
    })().catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
}

module.exports = {
  getSql,
  ensureInitialized,
  sendJson,
  handleOptions,
  parseJsonBody,
  getQueryParams,
  hashPassword,
  verifyPassword,
  sanitizeUser,
  calcModulePercentage,
  setSqlFactoryForTest,
  resetInitCacheForTest
};
