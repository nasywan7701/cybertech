<?php
/**
 * ===================================================================
 * CyberTech - Auth API (Login, Registrasi Siswa, Profil, Password)
 * ===================================================================
 */

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? '';
$data = getJsonInput();

switch ($action) {
    case 'login':
        $identifier = trim($data['identifier'] ?? '');
        $password = $data['password'] ?? '';
        $expectedRole = $data['role'] ?? null;

        if (empty($identifier) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Username/Email dan kata sandi wajib diisi.']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(username) = LOWER(:id1) OR LOWER(email) = LOWER(:id2) OR LOWER(nama) = LOWER(:id3) LIMIT 1");
        $stmt->execute([':id1' => $identifier, ':id2' => $identifier, ':id3' => $identifier]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Akun tidak ditemukan.']);
            exit;
        }

        if ($user['password'] !== $password) {
            echo json_encode(['success' => false, 'message' => 'Kata sandi yang Anda masukkan salah.']);
            exit;
        }

        if ($expectedRole && $user['role'] !== $expectedRole) {
            $label = $expectedRole === 'guru' ? 'Guru' : 'Siswa';
            echo json_encode([
                'success' => false, 
                'message' => "Akun ini terdaftar sebagai " . strtoupper($user['role']) . ". Silakan login via portal $label."
            ]);
            exit;
        }

        unset($user['password']);
        echo json_encode(['success' => true, 'user' => $user, 'message' => 'Login berhasil!']);
        break;

    case 'register':
        $nama = trim($data['nama'] ?? '');
        $email = trim(strtolower($data['email'] ?? ''));
        $password = $data['password'] ?? '';
        $confirmPassword = $data['confirmPassword'] ?? '';
        $kelas = trim($data['kelas'] ?? 'XI TJKT 1');

        if (empty($nama) || empty($email) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Seluruh data formulir wajib diisi.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Format email tidak valid.']);
            exit;
        }

        if (strlen($password) < 6) {
            echo json_encode(['success' => false, 'message' => 'Kata sandi minimal 6 karakter.']);
            exit;
        }

        if ($password !== $confirmPassword) {
            echo json_encode(['success' => false, 'message' => 'Konfirmasi kata sandi tidak cocok.']);
            exit;
        }

        // Cek email duplikat
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Alamat email sudah terdaftar.']);
            exit;
        }

        $username = preg_replace('/[^a-z0-9_]/', '', explode('@', $email)[0]);
        $id = 'user_siswa_' . round(microtime(true) * 1000);
        $avatar = strtoupper(substr($nama, 0, 1));

        $stmt = $pdo->prepare("INSERT INTO users (id, username, email, nama, password, role, nisn, kelas, sekolah, avatar) VALUES (:id, :username, :email, :nama, :password, 'siswa', '-', :kelas, 'SMK Negeri 1 Takalar', :avatar)");
        $stmt->execute([
            ':id' => $id,
            ':username' => $username,
            ':email' => $email,
            ':nama' => $nama,
            ':password' => $password,
            ':kelas' => $kelas,
            ':avatar' => $avatar
        ]);

        $newUser = [
            'id' => $id,
            'username' => $username,
            'email' => $email,
            'nama' => $nama,
            'role' => 'siswa',
            'kelas' => $kelas,
            'sekolah' => 'SMK Negeri 1 Takalar',
            'avatar' => $avatar
        ];

        echo json_encode(['success' => true, 'user' => $newUser, 'message' => 'Pendaftaran akun siswa berhasil!']);
        break;

    case 'profile':
        $userId = $data['id'] ?? '';
        $nama = trim($data['nama'] ?? '');
        $email = trim(strtolower($data['email'] ?? ''));
        $kelas = trim($data['kelas'] ?? '');
        $nip = trim($data['nip'] ?? '');
        $avatar = $data['avatar'] ?? null;

        if (empty($userId) || empty($nama)) {
            echo json_encode(['success' => false, 'message' => 'ID pengguna dan nama wajib diisi.']);
            exit;
        }

        // Jika email diubah, validasi dan cek duplikat
        if (!empty($email)) {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['success' => false, 'message' => 'Format alamat email tidak valid.']);
                exit;
            }

            $stmtCheck = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = :email AND id != :id LIMIT 1");
            $stmtCheck->execute([':email' => $email, ':id' => $userId]);
            if ($stmtCheck->fetch()) {
                echo json_encode(['success' => false, 'message' => 'Alamat email tersebut sudah digunakan oleh akun lain.']);
                exit;
            }
        }

        $query = "UPDATE users SET nama = :nama, kelas = :kelas, nip = :nip";
        $params = [
            ':nama' => $nama,
            ':kelas' => $kelas,
            ':nip' => $nip,
            ':id' => $userId
        ];

        if (!empty($email)) {
            $query .= ", email = :email";
            $params[':email'] = $email;
        }

        if ($avatar !== null) {
            $query .= ", avatar = :avatar";
            $params[':avatar'] = $avatar;
        }

        $query .= " WHERE id = :id";
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);

        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $userId]);
        $updatedUser = $stmt->fetch();
        unset($updatedUser['password']);

        echo json_encode(['success' => true, 'user' => $updatedUser, 'message' => 'Profil berhasil diperbarui.']);
        break;

    case 'verify_account':
        $identifier = trim($data['identifier'] ?? '');
        if (empty($identifier)) {
            echo json_encode(['success' => false, 'message' => 'Email atau username wajib diisi.']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id, username, email, nama, role FROM users WHERE LOWER(email) = LOWER(:id1) OR LOWER(username) = LOWER(:id2) LIMIT 1");
        $stmt->execute([':id1' => $identifier, ':id2' => $identifier]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Akun dengan email atau username tersebut tidak ditemukan.']);
            exit;
        }

        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'nama' => $user['nama'],
                'role' => $user['role']
            ],
            'message' => 'Akun terverifikasi.'
        ]);
        break;

    case 'reset_password':
        $identifier = trim($data['identifier'] ?? '');
        $newPass = $data['newPassword'] ?? '';
        $confirmPass = $data['confirmPassword'] ?? '';

        if (empty($identifier) || empty($newPass)) {
            echo json_encode(['success' => false, 'message' => 'Identitas akun dan kata sandi baru wajib diisi.']);
            exit;
        }

        if (strlen($newPass) < 6) {
            echo json_encode(['success' => false, 'message' => 'Kata sandi baru minimal 6 karakter.']);
            exit;
        }

        if (!empty($confirmPass) && $newPass !== $confirmPass) {
            echo json_encode(['success' => false, 'message' => 'Konfirmasi kata sandi baru tidak cocok.']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(:id1) OR LOWER(username) = LOWER(:id2) LIMIT 1");
        $stmt->execute([':id1' => $identifier, ':id2' => $identifier]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Akun tidak ditemukan.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE users SET password = :newPass WHERE id = :id");
        $stmt->execute([':newPass' => $newPass, ':id' => $user['id']]);

        echo json_encode(['success' => true, 'message' => 'Kata sandi berhasil dipulihkan dan diperbarui! Silakan login kembali.']);
        break;

    case 'password':
        $userId = $data['id'] ?? '';
        $oldPass = $data['oldPassword'] ?? '';
        $newPass = $data['newPassword'] ?? '';

        if (empty($userId) || empty($oldPass) || empty($newPass)) {
            echo json_encode(['success' => false, 'message' => 'Data kata sandi tidak lengkap.']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT password FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $userId]);
        $row = $stmt->fetch();

        if (!$row || $row['password'] !== $oldPass) {
            echo json_encode(['success' => false, 'message' => 'Kata sandi lama salah.']);
            exit;
        }

        if (strlen($newPass) < 6) {
            echo json_encode(['success' => false, 'message' => 'Kata sandi baru minimal 6 karakter.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE users SET password = :newPass WHERE id = :id");
        $stmt->execute([':newPass' => $newPass, ':id' => $userId]);

        echo json_encode(['success' => true, 'message' => 'Kata sandi berhasil diperbarui!']);
        break;

    case 'users':
        $stmt = $pdo->query("SELECT id, username, email, nama, role, nip, nisn, kelas, sekolah, avatar, created_at FROM users ORDER BY role ASC, nama ASC");
        $users = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $users]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi autentikasi tidak valid.']);
}
