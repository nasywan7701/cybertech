const {
  getSql,
  ensureInitialized,
  sendJson,
  handleOptions,
  parseJsonBody,
  getQueryParams,
  calcModulePercentage
} = require('./_db');

function createDefaultProgressMap() {
  return {
    '1': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, percentage: 0 },
    '2': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, percentage: 0 },
    '3': { materialRead: false, videoWatched: false, activityDone: false, quizScore: null, percentage: 0 }
  };
}

function formatProgressRow(row) {
  return {
    materialRead: Boolean(Number(row.material_read)),
    videoWatched: Boolean(Number(row.video_watched)),
    activityDone: Boolean(Number(row.activity_done)),
    quizScore: row.quiz_score !== null && row.quiz_score !== undefined ? Number(row.quiz_score) : null,
    percentage: Number(row.percentage || 0)
  };
}

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;

  try {
    const sql = getSql();
    await ensureInitialized(sql);

    const query = getQueryParams(req);
    const action = query.action || 'list';
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET' && action === 'list') {
      const students = await sql.query(
        `SELECT id, username, email, nama, kelas, sekolah, avatar, created_at
         FROM users
         WHERE role = 'siswa'
         ORDER BY created_at DESC`
      );
      const progressRows = await sql.query('SELECT * FROM student_progress');

      const progressByStudent = {};
      for (const row of progressRows) {
        if (!progressByStudent[row.student_id]) {
          progressByStudent[row.student_id] = createDefaultProgressMap();
        }
        progressByStudent[row.student_id][String(row.module_id)] = formatProgressRow(row);
      }

      const data = students.map((student) => ({
        ...student,
        createdAt: student.created_at,
        progress: progressByStudent[student.id] || createDefaultProgressMap()
      }));

      return sendJson(res, 200, { success: true, data });
    }

    if (action === 'progress') {
      if (method === 'GET') {
        const studentId = String(query.student_id || '').trim();
        if (!studentId) {
          return sendJson(res, 400, { success: false, message: 'student_id diperlukan.' });
        }

        const rows = await sql.query('SELECT * FROM student_progress WHERE student_id = $1', [studentId]);
        const progMap = createDefaultProgressMap();
        for (const row of rows) {
          progMap[String(row.module_id)] = formatProgressRow(row);
        }

        return sendJson(res, 200, { success: true, data: progMap });
      }

      if (method === 'POST') {
        const input = await parseJsonBody(req);
        const studentId = String(input.studentId || '').trim();
        const moduleId = String(input.moduleId || '').trim();

        if (!studentId || !moduleId) {
          return sendJson(res, 400, {
            success: false,
            message: 'studentId dan moduleId diperlukan.'
          });
        }

        const rows = await sql.query(
          'SELECT * FROM student_progress WHERE student_id = $1 AND module_id = $2 LIMIT 1',
          [studentId, moduleId]
        );
        const current = rows[0] || {};

        const mr = input.materialRead !== undefined ? Boolean(input.materialRead) : Boolean(Number(current.material_read || 0));
        const vw = input.videoWatched !== undefined ? Boolean(input.videoWatched) : Boolean(Number(current.video_watched || 0));
        const ad = input.activityDone !== undefined ? Boolean(input.activityDone) : Boolean(Number(current.activity_done || 0));
        const qs = input.quizScore !== undefined
          ? (input.quizScore === null ? null : Number(input.quizScore))
          : (current.quiz_score !== null && current.quiz_score !== undefined ? Number(current.quiz_score) : null);

        const pct = calcModulePercentage(moduleId, mr, vw, ad, qs);

        await sql.query(
          `INSERT INTO student_progress (student_id, module_id, material_read, video_watched, activity_done, quiz_score, percentage)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (student_id, module_id)
           DO UPDATE SET
             material_read = $3,
             video_watched = $4,
             activity_done = $5,
             quiz_score = $6,
             percentage = $7,
             updated_at = CURRENT_TIMESTAMP`,
          [studentId, moduleId, mr ? 1 : 0, vw ? 1 : 0, ad ? 1 : 0, qs, pct]
        );

        return sendJson(res, 200, {
          success: true,
          percentage: pct,
          progress: {
            materialRead: mr,
            videoWatched: vw,
            activityDone: ad,
            quizScore: qs,
            percentage: pct
          }
        });
      }
    }

    return sendJson(res, 400, { success: false, message: 'Aksi tidak valid.' });
  } catch (err) {
    console.error('[api/students] Error:', err);
    return sendJson(res, 500, {
      success: false,
      message: `Kesalahan server: ${err.message}`
    });
  }
};
