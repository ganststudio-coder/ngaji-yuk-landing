// ════════════════════════════════════════
// NGAJI YUK! — Main Application Logic
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash');
    const hurufScreen = document.getElementById('huruf');
    const btnMulai = document.getElementById('btnMulai');
    const keluargaContainer = document.getElementById('keluargaContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    const detailPanel = document.getElementById('detailPanel');
    const detailContent = document.getElementById('detailContent');
    const btnMic = document.getElementById('btnMic');
    const voiceResult = document.getElementById('voiceResult');

    let currentPlayingAudio = null;
    let micState = 'idle'; // idle | listening | analyzing | result

    // --- Screen Management ---
    btnMulai.addEventListener('click', function() {
        splashScreen.style.display = 'none';
        hurufScreen.style.display = 'block';
        document.body.style.background = '#FDF6E3';
    });

    // --- Audio Playback ---
    window.playAudio = function(src) {
        if (currentPlayingAudio) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
        }
        audioPlayer.src = src;
        audioPlayer.play().catch(function(e) {
            console.log('Audio play error:', e);
        });
        currentPlayingAudio = audioPlayer;
    };

    // --- Detail Panel ---
    window.tutupDetail = function() {
        detailPanel.style.display = 'none';
        if (currentPlayingAudio) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
            currentPlayingAudio = null;
        }
    };

    function tampilkanDetail(hurufKey) {
        const data = HURUF_DATA[hurufKey];
        detailContent.innerHTML = [
            '<div class="detail-char">' + data.char + '</div>',
            '<div class="detail-name">' + data.name + '</div>',
            '<div class="detail-bunyi">Bunyi: "' + data.bunyi + '"</div>',
            '<button class="detail-play-btn" onclick="playAudio(\'' + data.audio + '\')">🔊</button>',
            '<div class="detail-info-box">',
            '<h4>📝 Makhraj Huruf</h4>',
            '<p>' + data.makhraj + '</p>',
            '</div>',
            data.qolqolah ? [
                '<div class="detail-qolqolah-box">',
                '<h4>💡 Perhatikan!</h4>',
                '<p>Huruf ini termasuk <strong>Qolqolah</strong> — dibaca memantul saat sukun atau waqaf.</p>',
                '</div>'
            ].join('') : '',
            '<div class="detail-contoh">',
            '<div class="detail-contoh-label">Contoh dalam Al-Qur\'an:</div>',
            '<div class="detail-contoh-ayat">' + data.contoh + '</div>',
            '</div>'
        ].join('');
        detailPanel.style.display = 'flex';
    }

    // --- Reset Voice Coach ---
    window.resetVoiceCoach = function() {
        micState = 'idle';
        btnMic.classList.remove('listening');
        btnMic.innerHTML = '🎤';
        voiceResult.style.display = 'none';
    };

    function startListening() {
        micState = 'listening';
        btnMic.classList.add('listening');
        btnMic.innerHTML = '🔴';
        voiceResult.style.display = 'none';

        setTimeout(function() {
            micState = 'analyzing';
            btnMic.classList.remove('listening');
            btnMic.innerHTML = '⚙️';

            setTimeout(function() {
                micState = 'result';
                btnMic.innerHTML = '🎤';
                // Random: kadang benar kadang salah
                displayVoiceResult(Math.random() > 0.4);
            }, 2000);
        }, 3000);
    }

    btnMic.addEventListener('click', function() {
        if (micState === 'idle') {
            startListening();
        } else {
            resetVoiceCoach();
        }
    });

    function displayVoiceResult(isCorrect) {
        if (isCorrect) {
            voiceResult.innerHTML = [
                '<div class="vr-score">',
                '<div class="vr-stars">⭐⭐⭐</div>',
                '<div class="vr-text">Masya Allah, bacaanmu bagus sekali! 🎉</div>',
                '</div>',
                '<div class="vr-actions">',
                '<button class="btn-lanjut" onclick="resetVoiceCoach()">Lanjut Belajar →</button>',
                '</div>'
            ].join('');
        } else {
            voiceResult.innerHTML = [
                '<div class="vr-score">',
                '<div class="vr-stars">⭐</div>',
                '<div class="vr-text">Ayo coba lagi, kamu pasti bisa! 💪</div>',
                '</div>',
                '<div class="vr-feedback">',
                '💡 Coba perhatikan makhraj dan cara bacanya. Dengarkan dulu contohnya, lalu ulangi lagi ya!',
                '</div>',
                '<div class="vr-actions">',
                '<button class="btn-ulang" onclick="resetVoiceCoach()">🎙️ Coba Lagi</button>',
                '</div>'
            ].join('');
        }
        voiceResult.style.display = 'block';
    }

    // --- Render Huruf ---
    function renderHurufKeluarga() {
        KELUARGA.forEach(function(keluarga) {
            var block = document.createElement('div');
            block.className = 'keluarga-block';

            var labelDiv = document.createElement('div');
            labelDiv.className = 'keluarga-label';

            var badge = document.createElement('div');
            badge.className = 'keluarga-badge';
            badge.style.background = keluarga.bg;
            badge.textContent = keluarga.badge;

            var namaSpan = document.createElement('div');
            namaSpan.className = 'keluarga-nama';
            namaSpan.textContent = keluarga.nama;

            labelDiv.appendChild(badge);
            labelDiv.appendChild(namaSpan);
            block.appendChild(labelDiv);

            var grid = document.createElement('div');
            grid.className = 'keluarga-grid';

            keluarga.huruf.forEach(function(hurufKey) {
                var data = HURUF_DATA[hurufKey];
                var card = document.createElement('div');
                card.className = 'huruf-card';

                if (data.qolqolah) {
                    var qBadge = document.createElement('span');
                    qBadge.className = 'h-qolqolah';
                    qBadge.textContent = 'Qolqolah';
                    card.appendChild(qBadge);
                }

                if (data.sambung === 'tidak_kiri') {
                    var tBadge = document.createElement('span');
                    tBadge.className = 'h-tidak-sambung';
                    tBadge.textContent = '❌ Sambung Kiri';
                    card.appendChild(tBadge);
                }

                var charSpan = document.createElement('span');
                charSpan.className = 'h-char';
                charSpan.textContent = data.char;
                card.appendChild(charSpan);

                var nameSpan = document.createElement('span');
                nameSpan.className = 'h-name';
                nameSpan.textContent = data.name;
                card.appendChild(nameSpan);

                var playBtn = document.createElement('button');
                playBtn.className = 'h-play';
                playBtn.textContent = '🔊';
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    playAudio(data.audio);
                });
                card.appendChild(playBtn);

                card.addEventListener('click', function() {
                    tampilkanDetail(hurufKey);
                });

                grid.appendChild(card);
            });

            block.appendChild(grid);
            keluargaContainer.appendChild(block);
        });
    }

    // --- Init ---
    renderHurufKeluarga();
});
