/**
 * ===================================================================
 * CyberTech - Interactive Firewall Simulator Engine (Modul 3)
 * Menangani simulasi paket Klien <-> Firewall <-> Server, ruleset Allow/Block
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const trafficSelect = document.getElementById('trafficTypeSelect');
  const btnAllow = document.getElementById('btnRuleAllow');
  const btnBlock = document.getElementById('btnRuleBlock');
  const runSimBtn = document.getElementById('runSimulationBtn');
  const simPacket = document.getElementById('simPacket');
  const simStatusBadge = document.getElementById('simStatusBadge');
  const simExplanation = document.getElementById('simExplanation');
  const serverNode = document.getElementById('serverNode');
  const firewallNode = document.getElementById('firewallNode');
  const clientNode = document.getElementById('clientNode');
  const finalBanner = document.getElementById('finalSuccessBanner');
  const nextQuizBtn = document.getElementById('nextQuizBtn');

  // Basis data karakteristik lalu lintas
  const trafficRules = {
    http: {
      name: 'HTTP (Port 80)',
      icon: '🌐',
      color: '#00B4D8',
      correctRule: 'allow',
      allowExplanation: 'Tepat Sekali! Port 80 adalah port standar browsing web. Firewall mengizinkan paket HTTP menuju server web sekolah agar portal dapat diakses siswa.',
      blockExplanation: 'Kurang tepat. Jika port 80 diblokir, siswa tidak akan bisa membuka website sekolah sama sekali.'
    },
    https: {
      name: 'HTTPS (Port 443)',
      icon: '🔒',
      color: '#2BB673',
      correctRule: 'allow',
      allowExplanation: 'Tepat Sekali! Port 443 digunakan untuk lalu lintas web terenkripsi SSL/TLS. Sangat aman dan wajib diizinkan (ALLOW) oleh firewall.',
      blockExplanation: 'Kurang tepat. Memblokir port 443 akan mematikan seluruh akses transaksi aman dan web terenkripsi di sekolah.'
    },
    telnet: {
      name: 'Telnet (Port 23)',
      icon: '⚠️',
      color: '#E5484D',
      correctRule: 'block',
      allowExplanation: 'BAHAYA! Mengizinkan port Telnet 23 sangat berisiko karena teks sandi terkirim polos tanpa enkripsi. Server rentan disadap!',
      blockExplanation: 'Tepat Sekali! Port Telnet 23 wajib DIBLOKIR (BLOCK) karena tidak aman. Remote server sebaiknya diganti menggunakan SSH (Port 22).'
    },
    ddos: {
      name: 'DDoS Ping Flood',
      icon: '🌊',
      color: '#E5484D',
      correctRule: 'block',
      allowExplanation: 'BAHAYA! Server kebanjiran jutaan paket ICMP palsu hingga memory habis dan website sekolah tumbang (down)!',
      blockExplanation: 'Tepat Sekali! Firewall sukses mendeteksi dan MENCEGAT (BLOCK/DROP) banjir paket DDoS sehingga server tetap berjalan normal.'
    }
  };

  let selectedRule = null;
  const completedMissions = new Set();
  let isSimulating = false;

  // Pilih aturan ALLOW
  btnAllow.addEventListener('click', () => {
    if (isSimulating) return;
    selectedRule = 'allow';
    btnAllow.classList.add('active');
    btnBlock.classList.remove('active');
  });

  // Pilih aturan BLOCK
  btnBlock.addEventListener('click', () => {
    if (isSimulating) return;
    selectedRule = 'block';
    btnBlock.classList.add('active');
    btnAllow.classList.remove('active');
  });

  // Jalankan Simulasi
  runSimBtn.addEventListener('click', () => {
    if (isSimulating) return;

    const trafficKey = trafficSelect.value;
    if (!selectedRule) {
      window.Utils.showToast('Tentukan aturan firewall terlebih dahulu (ALLOW atau BLOCK)!', 'warning');
      return;
    }

    const traffic = trafficRules[trafficKey];
    isSimulating = true;
    runSimBtn.disabled = true;

    // Reset status visual
    simStatusBadge.style.display = 'none';
    simExplanation.textContent = 'Paket sedang dikirim dan diinspeksi oleh Firewall...';
    serverNode.classList.remove('node-active-success', 'node-active-danger');
    firewallNode.classList.remove('node-active-success', 'node-active-danger');

    // Siapkan elemen paket animasi
    simPacket.style.display = 'flex';
    simPacket.style.left = '12%';
    simPacket.style.backgroundColor = traffic.color;
    simPacket.textContent = traffic.icon;
    simPacket.style.transition = 'left 1.2s cubic-bezier(0.4, 0, 0.2, 1)';

    // 1. Gerakkan paket dari Klien ke Firewall (1.2 detik)
    setTimeout(() => {
      simPacket.style.left = '48%'; // Tepat di Firewall
      firewallNode.classList.add('inspecting');

      // 2. Firewall melakukan evaluasi ruleset (0.8 detik)
      setTimeout(() => {
        firewallNode.classList.remove('inspecting');

        const isCorrectDecision = selectedRule === traffic.correctRule;

        if (selectedRule === 'allow') {
          // Paket diizinkan -> Teruskan ke Server (48% -> 85%)
          simPacket.style.left = '85%';

          setTimeout(() => {
            simPacket.style.display = 'none';
            if (isCorrectDecision) {
              // Benar di-Allow (HTTP / HTTPS)
              serverNode.classList.add('node-active-success');
              simStatusBadge.className = 'badge badge-success';
              simStatusBadge.textContent = 'STATUS: DITERIMA (LALU LINTAS AMAN)';
              simStatusBadge.style.display = 'inline-block';
              simExplanation.textContent = traffic.allowExplanation;
              markMissionSuccess(trafficKey);
            } else {
              // Salah di-Allow (Telnet / DDoS lolos)
              serverNode.classList.add('node-active-danger');
              simStatusBadge.className = 'badge badge-danger';
              simStatusBadge.textContent = 'PERINGATAN: SERVER DISERANG!';
              simStatusBadge.style.display = 'inline-block';
              simExplanation.textContent = traffic.allowExplanation;
            }
            finishSimulation();
          }, 1000);

        } else {
          // Paket di-BLOCK -> Dicegat di Firewall
          simPacket.style.transform = 'scale(1.5)';
          simPacket.style.backgroundColor = '#E5484D';
          simPacket.textContent = '✕';

          setTimeout(() => {
            simPacket.style.display = 'none';
            simPacket.style.transform = 'scale(1)';

            if (isCorrectDecision) {
              // Benar di-Block (Telnet / DDoS)
              firewallNode.classList.add('node-active-success');
              simStatusBadge.className = 'badge badge-success';
              simStatusBadge.textContent = 'STATUS: DITOLAK (SUKSES DIBLOKIR)';
              simStatusBadge.style.display = 'inline-block';
              simExplanation.textContent = traffic.blockExplanation;
              markMissionSuccess(trafficKey);
            } else {
              // Salah di-Block (HTTP / HTTPS diblokir)
              firewallNode.classList.add('node-active-danger');
              simStatusBadge.className = 'badge badge-danger';
              simStatusBadge.textContent = 'KESALAHAN: LALU LINTAS AMAN DIBLOKIR';
              simStatusBadge.style.display = 'inline-block';
              simExplanation.textContent = traffic.blockExplanation;
            }
            finishSimulation();
          }, 800);
        }

      }, 800);
    }, 100);
  });

  function finishSimulation() {
    isSimulating = false;
    runSimBtn.disabled = false;
  }

  function markMissionSuccess(trafficKey) {
    completedMissions.add(trafficKey);
    const badgeEl = document.getElementById(`missionBadge_${trafficKey}`);
    if (badgeEl) {
      badgeEl.className = 'badge badge-success';
      badgeEl.textContent = 'Selesai ✓';
    }

    if (completedMissions.size === 4) {
      // Seluruh 4 misi simulasi firewall selesai
      finalBanner.style.display = 'flex';
      nextQuizBtn.classList.remove('disabled');
      nextQuizBtn.removeAttribute('disabled');
      nextQuizBtn.style.pointerEvents = 'auto';
      nextQuizBtn.style.opacity = '1';
      window.Utils.showToast('Luar biasa! Keempat skenario konfigurasi Firewall berhasil Anda selesaikan!', 'success', 3500);

      // Simpan progres ke storage
      window.ModuleHelper.markActivityDone('3');
    }
  }
});

