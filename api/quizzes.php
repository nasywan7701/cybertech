<?php
/**
 * ===================================================================
 * CyberTech - Quizzes CRUD API (Bank Soal Kuis Guru)
 * ===================================================================
 */

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $quizId = $_GET['id'] ?? null;
        $moduleId = $_GET['module_id'] ?? null;

        if ($quizId) {
            $stmt = $pdo->prepare("SELECT * FROM quizzes WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $quizId]);
            $q = $stmt->fetch();
            if ($q) {
                $q['opsi'] = [
                    'A' => $q['opsi_a'],
                    'B' => $q['opsi_b'],
                    'C' => $q['opsi_c'],
                    'D' => $q['opsi_d']
                ];
                echo json_encode(['success' => true, 'data' => $q]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Soal tidak ditemukan.']);
            }
            exit;
        }

        if ($moduleId && $moduleId !== 'all') {
            $stmt = $pdo->prepare("SELECT * FROM quizzes WHERE module_id = :mid ORDER BY created_at ASC");
            $stmt->execute([':mid' => $moduleId]);
        } else {
            $stmt = $pdo->query("SELECT * FROM quizzes ORDER BY module_id ASC, created_at ASC");
        }

        $rows = $stmt->fetchAll();
        $formatted = array_map(function($q) {
            return [
                'id' => $q['id'],
                'moduleId' => (string)$q['module_id'],
                'pertanyaan' => $q['pertanyaan'],
                'opsi' => [
                    'A' => $q['opsi_a'],
                    'B' => $q['opsi_b'],
                    'C' => $q['opsi_c'],
                    'D' => $q['opsi_d']
                ],
                'kunci' => $q['kunci'],
                'pembahasan' => $q['pembahasan']
            ];
        }, $rows);

        echo json_encode(['success' => true, 'data' => $formatted]);
        break;

    case 'POST':
        $data = getJsonInput();
        $moduleId = (int)($data['moduleId'] ?? 1);
        $pertanyaan = trim($data['pertanyaan'] ?? '');
        $opsiA = trim($data['opsi']['A'] ?? '');
        $opsiB = trim($data['opsi']['B'] ?? '');
        $opsiC = trim($data['opsi']['C'] ?? '');
        $opsiD = trim($data['opsi']['D'] ?? '');
        $kunci = trim($data['kunci'] ?? 'A');
        $pembahasan = trim($data['pembahasan'] ?? '');

        if (empty($pertanyaan) || empty($opsiA) || empty($opsiB) || empty($opsiC) || empty($opsiD)) {
            echo json_encode(['success' => false, 'message' => 'Seluruh opsi dan pertanyaan wajib diisi.']);
            exit;
        }

        $id = 'q_m' . $moduleId . '_' . round(microtime(true) * 1000);

        $stmt = $pdo->prepare("INSERT INTO quizzes (id, module_id, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, kunci, pembahasan) VALUES (:id, :mid, :p, :oa, :ob, :oc, :od, :k, :pb)");
        $stmt->execute([
            ':id' => $id,
            ':mid' => $moduleId,
            ':p' => $pertanyaan,
            ':oa' => $opsiA,
            ':ob' => $opsiB,
            ':oc' => $opsiC,
            ':od' => $opsiD,
            ':k' => $kunci,
            ':pb' => $pembahasan
        ]);

        echo json_encode(['success' => true, 'id' => $id, 'message' => 'Soal baru berhasil ditambahkan ke database!']);
        break;

    case 'PUT':
        $data = getJsonInput();
        $id = $data['id'] ?? '';
        $moduleId = (int)($data['moduleId'] ?? 1);
        $pertanyaan = trim($data['pertanyaan'] ?? '');
        $opsiA = trim($data['opsi']['A'] ?? '');
        $opsiB = trim($data['opsi']['B'] ?? '');
        $opsiC = trim($data['opsi']['C'] ?? '');
        $opsiD = trim($data['opsi']['D'] ?? '');
        $kunci = trim($data['kunci'] ?? 'A');
        $pembahasan = trim($data['pembahasan'] ?? '');

        if (empty($id) || empty($pertanyaan)) {
            echo json_encode(['success' => false, 'message' => 'ID dan pertanyaan wajib diisi.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE quizzes SET module_id = :mid, pertanyaan = :p, opsi_a = :oa, opsi_b = :ob, opsi_c = :oc, opsi_d = :od, kunci = :k, pembahasan = :pb WHERE id = :id");
        $stmt->execute([
            ':mid' => $moduleId,
            ':p' => $pertanyaan,
            ':oa' => $opsiA,
            ':ob' => $opsiB,
            ':oc' => $opsiC,
            ':od' => $opsiD,
            ':k' => $kunci,
            ':pb' => $pembahasan,
            ':id' => $id
        ]);

        echo json_encode(['success' => true, 'message' => 'Soal berhasil diperbarui di database!']);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? (getJsonInput()['id'] ?? '');
        if (empty($id)) {
            echo json_encode(['success' => false, 'message' => 'ID soal wajib disertakan.']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM quizzes WHERE id = :id");
        $stmt->execute([':id' => $id]);

        echo json_encode(['success' => true, 'message' => 'Soal berhasil dihapus dari database!']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak didukung.']);
}

