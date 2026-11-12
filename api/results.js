const {
  getSql,
  ensureInitialized,
  sendJson,
  handleOptions,
  parseJsonBody,
  getQueryParams,
  calcModulePercentage
} = require('./_db');

function formatResultRow(row) {
  let userAnswers = [];
  if (row.user_answers) {
    try {
      userAnswers = typeof row.user_answers === 'string' ? JSON.parse(row.user_answers) : row.user_answers;
    } catch {
      userAnswers = [];
    }
  }
  return {
    id: row.id,
    studentId: row.student_id,
    studentName: row.student_name || 'Siswa',
    moduleId: String(row.module_id),
    moduleTitle: row.module_title || '',
    score: Number(row.score),
    correctCount: Number(row.correct_count),
    wrongCount: Number(row.wrong_count),
    totalQuestions: Number(row.total_questions),
    durationSpent: Number(row.duration_spent),
    kkm: Number(row.kkm),
    teacherFeedback: row.teacher_feedback || '',
    gradedByTeacher: Boolean(Number(row.graded_by_teacher)),
    timestamp: row.timestamp,
    userAnswers
  };
}

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;

  try {
    const sql = getSql();
    await ensureInitialized(sql);

    const query = getQueryParams(req);
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const id = query.id ? String(query.id) : '';
      const studentId = query.student_id ? String(query.student_id) : '';
      const moduleId = query.module_id ? String(query.module_id) : '';

      const params = [];
      const conditions = [];

      if (id) {
        params.push(id);
        conditions.push(`r.id = $${params.length}`);
      }
      if (studentId) {
        params.push(studentId);
        conditions.push(`r.student_id = $${params.length}`);
      }
      if (moduleId) {
        params.push(moduleId);
        conditions.push(`r.module_id = $${params.length}`);
      }

      let sqlStr = `
        SELECT r.*, u.nama AS student_name
        FROM quiz_results r
        LEFT JOIN users u ON r.student_id = u.id
      `;
      if (conditions.length > 0) {
        sqlStr += ` WHERE ${conditions.join(' AND ')}`;
      }
      sqlStr += ' ORDER BY r.timestamp DESC';

      const rows = await sql.query(sqlStr, params);
      return sendJson(res, 200, {
        success: true,
        data: rows.map(formatResultRow)
      });
    }

    const input = await parseJsonBody(req);

    if (method === 'POST') {
      const id = String(input.id || `res_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`);
      const studentId = String(input.studentId || '').trim();
      const moduleId = String(input.moduleId || '').trim();
      const moduleTitle = String(input.moduleTitle || '');
      const score = Number(input.score ?? 0);
      const correctCount = Number(input.correctCount ?? 0);
      const wrongCount = Number(input.wrongCount ?? 0);
      const totalQuestions = Number(input.totalQuestions ?? 0);
      const durationSpent = Number(input.durationSpent ?? 0);
      const kkm = Number(input.kkm ?? 75);
      const userAnswers = JSON.stringify(input.userAnswers || []);

      if (!studentId || !moduleId) {
        return sendJson(res, 400, {
          success: false,
          message: 'studentId dan moduleId wajib diisi.'
        });
      }

      await sql.query(
        `INSERT INTO quiz_results
           (id, student_id, module_id, module_title, score, correct_count, wrong_count, total_questions, duration_spent, kkm, user_answers)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO NOTHING`,
        [id, studentId, moduleId, moduleTitle, score, correctCount, wrongCount, totalQuestions, durationSpent, kkm, userAnswers]
      );

      const progRows = await sql.query(
        'SELECT material_read, video_watched, activity_done, quiz_score FROM student_progress WHERE student_id = $1 AND module_id = $2 LIMIT 1',
        [studentId, moduleId]
      );
      const current = progRows[0] || {};
      const mr = Boolean(Number(current.material_read || 0));
      const vw = Boolean(Number(current.video_watched || 0));
      const ad = Boolean(Number(current.activity_done || 0));
      const prevScore = current.quiz_score !== null && current.quiz_score !== undefined ? Number(current.quiz_score) : null;
      const bestScore = prevScore !== null ? Math.max(prevScore, score) : score;
      const pct = calcModulePercentage(moduleId, mr, vw, ad, bestScore);

      await sql.query(
        `INSERT INTO student_progress (student_id, module_id, quiz_score, percentage)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, module_id)
         DO UPDATE SET quiz_score = $3, percentage = $4, updated_at = CURRENT_TIMESTAMP`,
        [studentId, moduleId, bestScore, pct]
      );

      return sendJson(res, 201, {
        success: true,
        id,
        message: 'Hasil kuis berhasil disimpan ke database.'
      });
    }

    if (method === 'PUT') {
      const id = String(input.id || '').trim();
      if (!id) {
        return sendJson(res, 400, { success: false, message: 'ID hasil kuis diperlukan.' });
      }

      const existingRows = await sql.query(
        'SELECT student_id, module_id, score, teacher_feedback, user_answers FROM quiz_results WHERE id = $1 LIMIT 1',
        [id]
      );
      if (existingRows.length === 0) {
        return sendJson(res, 404, { success: false, message: 'Hasil kuis tidak ditemukan.' });
      }
      const existing = existingRows[0];

      const score = input.score !== undefined ? Number(input.score) : Number(existing.score);
      const feedback = input.teacherFeedback !== undefined ? String(input.teacherFeedback) : (existing.teacher_feedback || '');
      const userAnswers = input.userAnswers !== undefined ? JSON.stringify(input.userAnswers) : existing.user_answers;

      await sql.query(
        `UPDATE quiz_results
         SET score = $1, teacher_feedback = $2, graded_by_teacher = 1, user_answers = $3
         WHERE id = $4`,
        [score, feedback, userAnswers, id]
      );

      const maxRows = await sql.query(
        'SELECT MAX(score)::int AS max_score FROM quiz_results WHERE student_id = $1 AND module_id = $2',
        [existing.student_id, existing.module_id]
      );
      const bestScore = maxRows[0]?.max_score ?? score;

      const progRows = await sql.query(
        'SELECT material_read, video_watched, activity_done FROM student_progress WHERE student_id = $1 AND module_id = $2 LIMIT 1',
        [existing.student_id, existing.module_id]
      );
      const current = progRows[0] || {};
      const pct = calcModulePercentage(
        existing.module_id,
        Boolean(Number(current.material_read || 0)),
        Boolean(Number(current.video_watched || 0)),
        Boolean(Number(current.activity_done || 0)),
        bestScore
      );

      await sql.query(
        `INSERT INTO student_progress (student_id, module_id, quiz_score, percentage)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, module_id)
         DO UPDATE SET quiz_score = $3, percentage = $4, updated_at = CURRENT_TIMESTAMP`,
        [existing.student_id, existing.module_id, bestScore, pct]
      );

      return sendJson(res, 200, { success: true, message: 'Penilaian berhasil diperbarui.' });
    }

    return sendJson(res, 405, { success: false, message: 'Metode tidak didukung.' });
  } catch (err) {
    console.error('[api/results] Error:', err);
    return sendJson(res, 500, {
      success: false,
      message: `Kesalahan server: ${err.message}`
    });
  }
};
