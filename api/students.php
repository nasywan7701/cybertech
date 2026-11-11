<?php
/**
 * ===================================================================
 * CyberTech - Students Directory & Progress API
 * ===================================================================
 */

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT id, username, email, nama, kelas, sekolah, avatar, created_at FROM users WHERE role = 'siswa' ORDER BY nama ASC");
        $students = $stmt->fetchAll();

        // Ambil progres untuk setiap siswa
        foreach ($students as &$s) {
            $progStmt = $pdo->prepare("SELECT module_id, material_read, video_watched, activity_done, quiz_score, completed, percentage FROM student_progress WHERE student_id = :sid");
            $progStmt->execute([':sid' => $s['id']]);
            $progRows = $progStmt->fetchAll();

            $progressMap = [
                '1' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0],
                '2' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0],
                '3' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0]
            ];

            foreach ($progRows as $pr) {
                $mId = (string)$pr['module_id'];
                $progressMap[$mId] = [
                    'materialRead' => (bool)$pr['material_read'],
                    'videoWatched' => (bool)$pr['video_watched'],
                    'activityDone' => (bool)$pr['activity_done'],
                    'quizScore' => $pr['quiz_score'] !== null ? (int)$pr['quiz_score'] : null,
                    'completed' => (bool)$pr['completed'],
                    'percentage' => (int)$pr['percentage']
                ];
            }
            $s['progress'] = $progressMap;
        }

        echo json_encode(['success' => true, 'data' => $students]);
        break;

    case 'progress':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = getJsonInput();
            $studentId = $data['studentId'] ?? '';
            $moduleId = (int)($data['moduleId'] ?? 1);
            $materialRead = isset($data['materialRead']) ? (int)$data['materialRead'] : null;
            $videoWatched = isset($data['videoWatched']) ? (int)$data['videoWatched'] : null;
            $activityDone = isset($data['activityDone']) ? (int)$data['activityDone'] : null;
            $quizScore = isset($data['quizScore']) ? (int)$data['quizScore'] : null;

            if (empty($studentId)) {
                echo json_encode(['success' => false, 'message' => 'Student ID wajib diisi.']);
                exit;
            }

            // Get existing or insert
            $stmt = $pdo->prepare("SELECT * FROM student_progress WHERE student_id = :sid AND module_id = :mid");
            $stmt->execute([':sid' => $studentId, ':mid' => $moduleId]);
            $existing = $stmt->fetch();

            $mr = ($materialRead !== null) ? $materialRead : ($existing ? (int)$existing['material_read'] : 0);
            $vw = ($videoWatched !== null) ? $videoWatched : ($existing ? (int)$existing['video_watched'] : 0);
            $ad = ($activityDone !== null) ? $activityDone : ($existing ? (int)$existing['activity_done'] : 0);
            $qs = ($quizScore !== null) ? $quizScore : ($existing ? $existing['quiz_score'] : null);

            $pct = 0;
            if ($moduleId === 1) {
                // Modul 1 menggabungkan baca materi & video dalam 1 tahap pilihan (40%)
                if ($mr || $vw) $pct += 40;
            } else {
                if ($mr) $pct += 20;
                if ($vw) $pct += 20;
            }
            if ($ad) $pct += 30;
            $comp = 0;
            if ($qs !== null && $qs >= 75) {
                $pct += 30;
                $comp = 1;
            }

            $upsert = $pdo->prepare("INSERT INTO student_progress (student_id, module_id, material_read, video_watched, activity_done, quiz_score, completed, percentage) VALUES (:sid, :mid, :mr, :vw, :ad, :qs, :comp, :pct) ON DUPLICATE KEY UPDATE material_read = :mr2, video_watched = :vw2, activity_done = :ad2, quiz_score = COALESCE(:qs2, quiz_score), completed = GREATEST(completed, :comp2), percentage = :pct2");
            $upsert->execute([
                ':sid' => $studentId,
                ':mid' => $moduleId,
                ':mr' => $mr,
                ':vw' => $vw,
                ':ad' => $ad,
                ':qs' => $qs,
                ':comp' => $comp,
                ':pct' => $pct,
                ':mr2' => $mr,
                ':vw2' => $vw,
                ':ad2' => $ad,
                ':qs2' => $qs,
                ':comp2' => $comp,
                ':pct2' => $pct
            ]);

            echo json_encode(['success' => true, 'percentage' => $pct, 'completed' => (bool)$comp]);
        } else {
            // GET progress for student
            $studentId = $_GET['student_id'] ?? '';
            $stmt = $pdo->prepare("SELECT * FROM student_progress WHERE student_id = :sid");
            $stmt->execute([':sid' => $studentId]);
            $rows = $stmt->fetchAll();

            $map = [
                '1' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0],
                '2' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0],
                '3' => ['materialRead' => false, 'videoWatched' => false, 'activityDone' => false, 'quizScore' => null, 'completed' => false, 'percentage' => 0]
            ];
            foreach ($rows as $r) {
                $map[(string)$r['module_id']] = [
                    'materialRead' => (bool)$r['material_read'],
                    'videoWatched' => (bool)$r['video_watched'],
                    'activityDone' => (bool)$r['activity_done'],
                    'quizScore' => $r['quiz_score'] !== null ? (int)$r['quiz_score'] : null,
                    'completed' => (bool)$r['completed'],
                    'percentage' => (int)$r['percentage']
                ];
            }
            echo json_encode(['success' => true, 'data' => $map]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi tidak valid.']);
}

