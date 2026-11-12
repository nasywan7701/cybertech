const assert = require('node:assert/strict');
const db = require('../api/_db');
const authHandler = require('../api/auth');
const quizzesHandler = require('../api/quizzes');
const resultsHandler = require('../api/results');
const studentsHandler = require('../api/students');

function createInMemoryMockSql() {
  const tables = {
    users: [],
    modules: [],
    quizzes: [],
    student_progress: [],
    quiz_results: []
  };

  return {
    async query(sqlText, params = []) {
      const q = sqlText.replace(/\s+/g, ' ').trim();

      if (q.startsWith('CREATE TABLE') || q.startsWith('CREATE INDEX')) {
        return [];
      }

      if (q.startsWith('SELECT COUNT(*)::int AS cnt FROM modules')) {
        return [{ cnt: tables.modules.length }];
      }
      if (q.startsWith('SELECT COUNT(*)::int AS cnt FROM users')) {
        return [{ cnt: tables.users.length }];
      }
      if (q.startsWith('SELECT COUNT(*)::int AS cnt FROM quizzes')) {
        return [{ cnt: tables.quizzes.length }];
      }

      if (q.startsWith('INSERT INTO modules ')) {
        for (let i = 0; i < params.length; i += 7) {
          const row = {
            id: params[i],
            title: params[i + 1],
            subtitle: params[i + 2],
            description: params[i + 3],
            duration: params[i + 4],
            kkm: params[i + 5],
            total_questions: params[i + 6]
          };
          if (!tables.modules.some((m) => m.id === row.id)) tables.modules.push(row);
        }
        return [];
      }

      if (q.startsWith('INSERT INTO users ')) {
        if (q.includes('ON CONFLICT (id) DO NOTHING')) {
          for (let i = 0; i < params.length; i += 11) {
            const row = {
              id: params[i],
              username: params[i + 1],
              email: params[i + 2],
              password: params[i + 3],
              nama: params[i + 4],
              role: params[i + 5],
              nip: params[i + 6],
              nisn: params[i + 7],
              kelas: params[i + 8],
              sekolah: params[i + 9],
              avatar: params[i + 10],
              created_at: new Date().toISOString()
            };
            if (!tables.users.some((u) => u.id === row.id)) tables.users.push(row);
          }
          return [];
        }
        const row = {
          id: params[0],
          username: params[1],
          email: params[2],
          password: params[3],
          nama: params[4],
          role: 'siswa',
          nip: null,
          nisn: null,
          kelas: params[5],
          sekolah: 'SMK Negeri 1 Takalar',
          avatar: params[6],
          created_at: new Date().toISOString()
        };
        tables.users.push(row);
        return [row];
      }

      if (q.startsWith('INSERT INTO quizzes ')) {
        const stride = 11;
        for (let i = 0; i < params.length; i += stride) {
          const row = {
            id: params[i],
            module_id: params[i + 1],
            question_type: params[i + 2],
            pertanyaan: params[i + 3],
            opsi_a: params[i + 4],
            opsi_b: params[i + 5],
            opsi_c: params[i + 6],
            opsi_d: params[i + 7],
            kunci: params[i + 8],
            hots_data: params[i + 9],
            pembahasan: params[i + 10],
            created_at: new Date().toISOString()
          };
          if (!tables.quizzes.some((qz) => qz.id === row.id)) tables.quizzes.push(row);
        }
        return [];
      }

      if (q.startsWith('INSERT INTO student_progress (student_id, module_id)')) {
        if (!tables.student_progress.some((p) => p.student_id === params[0] && p.module_id === params[1])) {
          tables.student_progress.push({
            student_id: params[0],
            module_id: params[1],
            material_read: 0,
            video_watched: 0,
            activity_done: 0,
            quiz_score: null,
            percentage: 0,
            updated_at: new Date().toISOString()
          });
        }
        return [];
      }

      if (q.startsWith('SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.username.toLowerCase() === needle || u.email.toLowerCase() === needle).slice(0, 1);
      }
      if (q.startsWith('SELECT id, username, email, nama, role FROM users WHERE LOWER(username)')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.username.toLowerCase() === needle || u.email.toLowerCase() === needle).slice(0, 1);
      }
      if (q.startsWith('SELECT id FROM users WHERE LOWER(email) = LOWER($1) AND id <> $2')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.email.toLowerCase() === needle && u.id !== params[1]).slice(0, 1);
      }
      if (q.startsWith('SELECT id FROM users WHERE LOWER(email) = LOWER($1)')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.email.toLowerCase() === needle).slice(0, 1);
      }
      if (q.startsWith('SELECT id FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.username.toLowerCase() === needle || u.email.toLowerCase() === needle).slice(0, 1);
      }
      if (q.startsWith('SELECT id FROM users WHERE LOWER(username) = LOWER($1)')) {
        const needle = String(params[0]).toLowerCase();
        return tables.users.filter((u) => u.username.toLowerCase() === needle).slice(0, 1);
      }
      if (q.startsWith('SELECT password FROM users WHERE id = $1')) {
        return tables.users.filter((u) => u.id === params[0]).map((u) => ({ password: u.password }));
      }
      if (q.startsWith('UPDATE users SET nama = $1')) {
        const u = tables.users.find((x) => x.id === params[5]);
        if (!u) return [];
        u.nama = params[0];
        u.email = params[1];
        u.kelas = params[2];
        u.nip = params[3];
        u.avatar = params[4];
        return [u];
      }
      if (q.startsWith('UPDATE users SET password = $1 WHERE id = $2')) {
        const u = tables.users.find((x) => x.id === params[1]);
        if (u) u.password = params[0];
        return [];
      }
      if (q.startsWith('SELECT id, username, email, nama, role, nip, nisn, kelas, sekolah, avatar, created_at FROM users ORDER BY')) {
        return [...tables.users];
      }
      if (q.startsWith("SELECT id, username, email, nama, kelas, sekolah, avatar, created_at FROM users WHERE role = 'siswa'")) {
        return tables.users.filter((u) => u.role === 'siswa');
      }

      if (q.startsWith('SELECT * FROM quizzes WHERE id = $1')) {
        return tables.quizzes.filter((qz) => qz.id === params[0]).slice(0, 1);
      }
      if (q.startsWith('SELECT * FROM quizzes WHERE module_id = $1')) {
        return tables.quizzes.filter((qz) => qz.module_id === params[0]);
      }
      if (q.startsWith('SELECT * FROM quizzes ORDER BY')) {
        return [...tables.quizzes];
      }
      if (q.startsWith('UPDATE quizzes SET module_id = $1')) {
        const qz = tables.quizzes.find((x) => x.id === params[10]);
        if (qz) {
          qz.module_id = params[0];
          qz.question_type = params[1];
          qz.pertanyaan = params[2];
          qz.opsi_a = params[3];
          qz.opsi_b = params[4];
          qz.opsi_c = params[5];
          qz.opsi_d = params[6];
          qz.kunci = params[7];
          qz.hots_data = params[8];
          qz.pembahasan = params[9];
        }
        return [];
      }
      if (q.startsWith('DELETE FROM quizzes WHERE id = $1')) {
        const idx = tables.quizzes.findIndex((x) => x.id === params[0]);
        if (idx >= 0) tables.quizzes.splice(idx, 1);
        return [];
      }

      if (q.startsWith('SELECT * FROM student_progress WHERE student_id = $1 AND module_id = $2') ||
          q.startsWith('SELECT material_read, video_watched, activity_done, quiz_score FROM student_progress WHERE student_id = $1 AND module_id = $2') ||
          q.startsWith('SELECT material_read, video_watched, activity_done FROM student_progress WHERE student_id = $1 AND module_id = $2')) {
        return tables.student_progress.filter((p) => p.student_id === params[0] && p.module_id === params[1]).slice(0, 1);
      }
      if (q.startsWith('SELECT * FROM student_progress WHERE student_id = $1')) {
        return tables.student_progress.filter((p) => p.student_id === params[0]);
      }
      if (q.startsWith('SELECT * FROM student_progress')) {
        return [...tables.student_progress];
      }
      if (q.startsWith('INSERT INTO student_progress (student_id, module_id, material_read')) {
        const existing = tables.student_progress.find((p) => p.student_id === params[0] && p.module_id === params[1]);
        if (existing) {
          existing.material_read = params[2];
          existing.video_watched = params[3];
          existing.activity_done = params[4];
          existing.quiz_score = params[5];
          existing.percentage = params[6];
        } else {
          tables.student_progress.push({
            student_id: params[0],
            module_id: params[1],
            material_read: params[2],
            video_watched: params[3],
            activity_done: params[4],
            quiz_score: params[5],
            percentage: params[6]
          });
        }
        return [];
      }
      if (q.startsWith('INSERT INTO student_progress (student_id, module_id, quiz_score, percentage)')) {
        const existing = tables.student_progress.find((p) => p.student_id === params[0] && p.module_id === params[1]);
        if (existing) {
          existing.quiz_score = params[2];
          existing.percentage = params[3];
        } else {
          tables.student_progress.push({
            student_id: params[0],
            module_id: params[1],
            material_read: 0,
            video_watched: 0,
            activity_done: 0,
            quiz_score: params[2],
            percentage: params[3]
          });
        }
        return [];
      }

      if (q.startsWith('INSERT INTO quiz_results')) {
        if (!tables.quiz_results.some((r) => r.id === params[0])) {
          tables.quiz_results.push({
            id: params[0],
            student_id: params[1],
            module_id: params[2],
            module_title: params[3],
            score: params[4],
            correct_count: params[5],
            wrong_count: params[6],
            total_questions: params[7],
            duration_spent: params[8],
            kkm: params[9],
            teacher_feedback: '',
            graded_by_teacher: 0,
            user_answers: params[10],
            timestamp: new Date().toISOString()
          });
        }
        return [];
      }
      if (q.startsWith('SELECT r.*, u.nama AS student_name FROM quiz_results r')) {
        return tables.quiz_results.map((r) => {
          const u = tables.users.find((usr) => usr.id === r.student_id);
          return { ...r, student_name: u ? u.nama : null };
        });
      }
      if (q.startsWith('SELECT student_id, module_id, score, teacher_feedback, user_answers FROM quiz_results WHERE id = $1')) {
        return tables.quiz_results.filter((r) => r.id === params[0]).slice(0, 1);
      }
      if (q.startsWith('UPDATE quiz_results SET score = $1')) {
        const r = tables.quiz_results.find((x) => x.id === params[3]);
        if (r) {
          r.score = params[0];
          r.teacher_feedback = params[1];
          r.graded_by_teacher = 1;
          r.user_answers = params[2];
        }
        return [];
      }
      if (q.startsWith('SELECT MAX(score)::int AS max_score FROM quiz_results')) {
        const matches = tables.quiz_results.filter((r) => r.student_id === params[0] && r.module_id === params[1]);
        const max = matches.reduce((acc, x) => Math.max(acc, Number(x.score)), 0);
        return [{ max_score: max }];
      }

      throw new Error(`Unhandled mock SQL query: ${q}`);
    }
  };
}

async function invoke(handler, method, url, body = undefined) {
  const req = { method, url, body };
  const headers = {};
  let endedBody = '';
  const res = {
    statusCode: 200,
    setHeader(k, v) { headers[k.toLowerCase()] = v; },
    end(chunk) { endedBody = chunk || ''; }
  };
  await handler(req, res);
  return {
    status: res.statusCode,
    headers,
    json: endedBody ? JSON.parse(endedBody) : null
  };
}

async function runTests() {
  const mockSql = createInMemoryMockSql();
  db.setSqlFactoryForTest(() => mockSql);

  // 1. Seeded quizzes load & count
  let res = await invoke(quizzesHandler, 'GET', '/api/quizzes');
  assert.equal(res.status, 200);
  assert.equal(res.json.success, true);
  assert.equal(res.json.data.length, 90, 'Expected 90 seeded HOTS quizzes');

  // 2. Demo student login
  res = await invoke(authHandler, 'POST', '/api/auth?action=login', {
    identifier: 'siswa',
    password: 'siswa123cybertech',
    role: 'siswa'
  });
  assert.equal(res.status, 200);
  assert.equal(res.json.success, true);
  assert.equal(res.json.user.password, undefined, 'Password must be stripped');

  // 3. Portal mismatch check
  res = await invoke(authHandler, 'POST', '/api/auth?action=login', {
    identifier: 'guru',
    password: 'guru123cybertech',
    role: 'siswa'
  });
  assert.equal(res.status, 403);
  assert.equal(res.json.success, false);

  // 4. Student registration + scrypt hashed login + verify + reset password
  res = await invoke(authHandler, 'POST', '/api/auth?action=register', {
    nama: 'Budi Santoso',
    email: 'budi@smkn1takalar.sch.id',
    password: 'password123',
    confirmPassword: 'password123',
    kelas: 'XI TJKT 2'
  });
  assert.equal(res.status, 201);
  const newStudent = res.json.user;
  assert.equal(newStudent.role, 'siswa');

  res = await invoke(authHandler, 'POST', '/api/auth?action=login', {
    identifier: 'budi@smkn1takalar.sch.id',
    password: 'password123',
    role: 'siswa'
  });
  assert.equal(res.status, 200);
  assert.equal(res.json.user.id, newStudent.id);

  res = await invoke(authHandler, 'POST', '/api/auth?action=verify_account', {
    identifier: 'budi@smkn1takalar.sch.id'
  });
  assert.equal(res.status, 200);
  assert.equal(res.json.user.id, newStudent.id);

  res = await invoke(authHandler, 'POST', '/api/auth?action=reset_password', {
    identifier: 'budi@smkn1takalar.sch.id',
    newPassword: 'newpassword99',
    confirmPassword: 'newpassword99'
  });
  assert.equal(res.status, 200);

  res = await invoke(authHandler, 'POST', '/api/auth?action=login', {
    identifier: 'budi@smkn1takalar.sch.id',
    password: 'newpassword99',
    role: 'siswa'
  });
  assert.equal(res.status, 200);

  // 5. Progress update (Module 1: 40 + 30 = 70%)
  res = await invoke(studentsHandler, 'POST', '/api/students?action=progress', {
    studentId: newStudent.id,
    moduleId: '1',
    materialRead: true,
    activityDone: true
  });
  assert.equal(res.status, 200);
  assert.equal(res.json.percentage, 70);

  // 6. Save quiz result (>=75 completes Module 1 to 100%)
  res = await invoke(resultsHandler, 'POST', '/api/results', {
    id: 'res_test_01',
    studentId: newStudent.id,
    moduleId: '1',
    moduleTitle: 'Analisis & Klasifikasi Ancaman Jaringan',
    score: 85,
    correctCount: 9,
    wrongCount: 1,
    totalQuestions: 10,
    durationSpent: 320,
    kkm: 75,
    userAnswers: [{ questionId: 'hots_m1_01', score: 10 }]
  });
  assert.equal(res.status, 201);

  res = await invoke(studentsHandler, 'GET', '/api/students?action=list');
  assert.equal(res.status, 200);
  const listed = res.json.data.find((s) => s.id === newStudent.id);
  assert.equal(listed.progress['1'].percentage, 100);
  assert.equal(listed.progress['1'].quizScore, 85);

  // 7. Teacher grades result
  res = await invoke(resultsHandler, 'PUT', '/api/results', {
    id: 'res_test_01',
    score: 92,
    teacherFeedback: 'Analisis teknis sangat baik.'
  });
  assert.equal(res.status, 200);

  res = await invoke(resultsHandler, 'GET', '/api/results');
  assert.equal(res.status, 200);
  assert.equal(res.json.data[0].score, 92);
  assert.equal(res.json.data[0].gradedByTeacher, true);

  // 8. Quiz CRUD (POST, PUT, DELETE)
  res = await invoke(quizzesHandler, 'POST', '/api/quizzes', {
    id: 'quiz_custom_01',
    moduleId: '2',
    questionType: 'multiple_choice',
    pertanyaan: 'Contoh soal uji?',
    opsi: { A: '1', B: '2', C: '3', D: '4' },
    kunci: 'A',
    pembahasan: 'Karena A.'
  });
  assert.equal(res.status, 201);

  res = await invoke(quizzesHandler, 'PUT', '/api/quizzes', {
    id: 'quiz_custom_01',
    moduleId: '2',
    pertanyaan: 'Contoh soal uji diperbarui?',
    opsi: { A: '1', B: '2', C: '3', D: '4' },
    kunci: 'B'
  });
  assert.equal(res.status, 200);

  res = await invoke(quizzesHandler, 'DELETE', '/api/quizzes?id=quiz_custom_01');
  assert.equal(res.status, 200);

  console.log('ALL 8 API INTEGRATION SCENARIOS PASSED (90 seeded quizzes, auth, register, reset, progress, results, quiz CRUD).');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
