const {
  getSql,
  ensureInitialized,
  sendJson,
  handleOptions,
  parseJsonBody,
  getQueryParams
} = require('./_db');

function formatQuizRow(row) {
  let hotsData = null;
  if (row.hots_data) {
    try {
      hotsData = typeof row.hots_data === 'string' ? JSON.parse(row.hots_data) : row.hots_data;
    } catch {
      hotsData = null;
    }
  }
  return {
    id: row.id,
    moduleId: String(row.module_id),
    questionType: row.question_type || 'multiple_choice',
    pertanyaan: row.pertanyaan,
    opsi: {
      A: row.opsi_a || '',
      B: row.opsi_b || '',
      C: row.opsi_c || '',
      D: row.opsi_d || ''
    },
    kunci: row.kunci || '',
    hotsData,
    pembahasan: row.pembahasan || ''
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
      const moduleId = query.module_id ? String(query.module_id) : '';

      if (id) {
        const rows = await sql.query('SELECT * FROM quizzes WHERE id = $1 LIMIT 1', [id]);
        if (rows.length === 0) {
          return sendJson(res, 404, { success: false, message: 'Soal tidak ditemukan.' });
        }
        return sendJson(res, 200, { success: true, data: formatQuizRow(rows[0]) });
      }

      if (moduleId) {
        const rows = await sql.query(
          'SELECT * FROM quizzes WHERE module_id = $1 ORDER BY created_at ASC, id ASC',
          [moduleId]
        );
        return sendJson(res, 200, { success: true, data: rows.map(formatQuizRow) });
      }

      const rows = await sql.query('SELECT * FROM quizzes ORDER BY module_id ASC, created_at ASC, id ASC');
      return sendJson(res, 200, { success: true, data: rows.map(formatQuizRow) });
    }

    if (method === 'DELETE') {
      const id = String(query.id || (await parseJsonBody(req)).id || '');
      if (!id) {
        return sendJson(res, 400, { success: false, message: 'ID soal diperlukan.' });
      }

      await sql.query('DELETE FROM quizzes WHERE id = $1', [id]);
      return sendJson(res, 200, { success: true, message: 'Soal berhasil dihapus.' });
    }

    const input = await parseJsonBody(req);

    if (method === 'POST') {
      const id = String(input.id || `q_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`);
      const moduleId = String(input.moduleId || '1');
      const questionType = String(input.questionType || 'multiple_choice');
      const pertanyaan = String(input.pertanyaan || '');
      const opsiA = String(input.opsi?.A ?? '');
      const opsiB = String(input.opsi?.B ?? '');
      const opsiC = String(input.opsi?.C ?? '');
      const opsiD = String(input.opsi?.D ?? '');
      const kunci = String(input.kunci || '');
      const hotsData = input.hotsData ? JSON.stringify(input.hotsData) : null;
      const pembahasan = input.pembahasan ? String(input.pembahasan) : '';

      if (!pertanyaan) {
        return sendJson(res, 400, { success: false, message: 'Pertanyaan wajib diisi.' });
      }

      await sql.query(
        `INSERT INTO quizzes (id, module_id, question_type, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, kunci, hots_data, pembahasan)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [id, moduleId, questionType, pertanyaan, opsiA, opsiB, opsiC, opsiD, kunci, hotsData, pembahasan]
      );

      return sendJson(res, 201, {
        success: true,
        data: { id },
        message: 'Soal berhasil ditambahkan.'
      });
    }

    if (method === 'PUT') {
      const id = String(input.id || '');
      if (!id) {
        return sendJson(res, 400, { success: false, message: 'ID soal diperlukan.' });
      }

      const moduleId = String(input.moduleId || '1');
      const questionType = String(input.questionType || 'multiple_choice');
      const pertanyaan = String(input.pertanyaan || '');
      const opsiA = String(input.opsi?.A ?? '');
      const opsiB = String(input.opsi?.B ?? '');
      const opsiC = String(input.opsi?.C ?? '');
      const opsiD = String(input.opsi?.D ?? '');
      const kunci = String(input.kunci || '');
      const hotsData = input.hotsData ? JSON.stringify(input.hotsData) : null;
      const pembahasan = input.pembahasan ? String(input.pembahasan) : '';

      await sql.query(
        `UPDATE quizzes
         SET module_id = $1, question_type = $2, pertanyaan = $3,
             opsi_a = $4, opsi_b = $5, opsi_c = $6, opsi_d = $7,
             kunci = $8, hots_data = $9, pembahasan = $10
         WHERE id = $11`,
        [moduleId, questionType, pertanyaan, opsiA, opsiB, opsiC, opsiD, kunci, hotsData, pembahasan, id]
      );

      return sendJson(res, 200, { success: true, message: 'Soal berhasil diperbarui.' });
    }

    return sendJson(res, 405, { success: false, message: 'Metode tidak didukung.' });
  } catch (err) {
    console.error('[api/quizzes] Error:', err);
    return sendJson(res, 500, {
      success: false,
      message: `Kesalahan server: ${err.message}`
    });
  }
};
