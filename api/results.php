<?php
/**
 * ===================================================================
 * CyberTech - Quiz Results API (Penyimpanan & Rekapitulasi Nilai Siswa)
 * ===================================================================
 */

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $resultId = $_GET['id'] ?? null;
        $studentId = $_GET['student_id'] ?? null;
        $moduleId = $_GET['module_id'] ?? null;

        if ($resultId) {
            $stmt = $pdo->prepare("SELECT * FROM quiz_results WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $resultId]);
            $res = $stmt->fetch();
            if ($res) {
                $res['userAnswers'] = json_decode($res['user_answers'], true) ?? [];
                echo json_encode(['success' => true, 'data' => $res]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Hasil kuis tidak ditemukan.']);
            }
            exit;
        }

        $query = "SELECT r.* FROM quiz_results r JOIN users u ON r.student_id = u.id WHERE 1=1";
        $params = [];

        if ($studentId) {
          $query .= " AND r.student_id = :sid";
          $params[':sid'] = $studentId;
        }
        if ($moduleId && $moduleId !== 'all') {
          $query .= " AND r.module_id = :mid";
          $params[':mid'] = $moduleId;
        }

        $query .= " ORDER BY r.created_at DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $formatted = array_map(function($r) {
            return [
                'id' => $r['id'],
                'studentId' => $r['student_id'],
                'studentName' => $r['student_name'],
                'moduleId' => (string)$r['module_id'],
                'moduleTitle' => $r['module_title'],
                'score' => (int)$r['score'],
                'correctCount' => (int)$r['correct_count'],
                'wrongCount' => (int)$r['wrong_count'],
                'totalQuestions' => (int)$r['total_questions'],
                'durationSpent' => (int)$r['duration_spent'],
                'kkm' => (int)$r['kkm'],
                'timestamp' => $r['created_at'],
                'userAnswers' => json_decode($r['user_answers'], true) ?? []
            ];
        }, $rows);

        echo json_encode(['success' => true, 'data' => $formatted]);
        break;

    case 'POST':
        $data = getJsonInput();
        $studentId = $data['studentId'] ?? '';
        $studentName = $data['studentName'] ?? '';
        $moduleId = (int)($data['moduleId'] ?? 1);
        $moduleTitle = $data['moduleTitle'] ?? "Modul $moduleId";
        $score = (int)($data['score'] ?? 0);
        $correctCount = (int)($data['correctCount'] ?? 0);
        $wrongCount = (int)($data['wrongCount'] ?? 0);
        $totalQuestions = (int)($data['totalQuestions'] ?? 5);
        $userAnswers = json_encode($data['userAnswers'] ?? []);
        $durationSpent = (int)($data['durationSpent'] ?? 0);
        $kkm = (int)($data['kkm'] ?? 75);

        if (empty($studentId)) {
            echo json_encode(['success' => false, 'message' => 'Student ID wajib diisi.']);
            exit;
        }

        $id = 'res_' . round(microtime(true) * 1000);

        $stmt = $pdo->prepare("INSERT INTO quiz_results (id, student_id, student_name, module_id, module_title, score, correct_count, wrong_count, total_questions, user_answers, duration_spent, kkm) VALUES (:id, :sid, :sn, :mid, :mt, :sc, :cc, :wc, :tq, :ua, :ds, :kkm)");
        $stmt->execute([
            ':id' => $id,
            ':sid' => $studentId,
            ':sn' => $studentName,
            ':mid' => $moduleId,
            ':mt' => $moduleTitle,
            ':sc' => $score,
            ':cc' => $correctCount,
            ':wc' => $wrongCount,
            ':tq' => $totalQuestions,
            ':ua' => $userAnswers,
            ':ds' => $durationSpent,
            ':kkm' => $kkm
        ]);

        // Update student progress in MySQL
        $isCompleted = ($score >= $kkm) ? 1 : 0;
        $progressStmt = $pdo->prepare("INSERT INTO student_progress (student_id, module_id, quiz_score, completed) VALUES (:sid, :mid, :score, :comp) ON DUPLICATE KEY UPDATE quiz_score = VALUES(quiz_score), completed = GREATEST(completed, VALUES(completed))");
        $progressStmt->execute([
            ':sid' => $studentId,
            ':mid' => $moduleId,
            ':score' => $score,
            ':comp' => $isCompleted
        ]);

        echo json_encode([
            'success' => true,
            'id' => $id,
            'message' => 'Nilai kuis evaluasi berhasil disimpan ke database!'
        ]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung.']);
}

