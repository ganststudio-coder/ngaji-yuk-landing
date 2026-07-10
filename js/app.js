// ════════════════════════════════════════
// NGAJI YUK! — Main Application
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    var splash = document.getElementById('splash');
    var hurufScreen = document.getElementById('huruf');
    var btnMulai = document.getElementById('btnMulai');
    var bodyHuruf = document.getElementById('bodyHuruf');
    var audioPlayer = document.getElementById('audioPlayer');
    var detailPanel = document.getElementById('detailPanel');
    var detailContent = document.getElementById('detailContent');

    var currentAudio = null;

    // --- Go to Huruf ---
    btnMulai.addEventListener('click', function() {
        splash.classList.remove('active');
        splash.style.display = 'none';
        hurufScreen.style.display = 'block';
        document.body.style.background = '#FDF6E3';
    });

    // --- Audio playback ---
    window.playAudio = function(src) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        audioPlayer.src = src;
        audioPlayer.play().catch(function(e) {});
        currentAudio = audioPlayer;
    };

    // --- Detail panel ---
    window.tutupDetail = function() {
        detailPanel.style.display = 'none';
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    };

    function showDetail(key) {
        var d = HURUF_DATA[key];
        var html = '';

        html += '<div class="detail-char">' + d.char + '</div>';
        html += '<div class="detail-name">' + d.name + '</div>';
        html += '<div class="detail-bunyi">Bunyi: "' + d.bunyi + '"</div>';
        html += '<button class="detail-play-btn" onclick="playAudio(\'' + d.audio + '\')">🔊</button>';

        html += '<div class="detail-info"><h4>📝 Makhraj Huruf</h4><p>' + d.makhraj + '</p></div>';

        if (d.qolqolah) {
            html += '<div class="detail-qolqolah"><h4>💡 Qolqolah!</h4><p>Huruf ini dibaca memantul saat sukun atau waqaf.</p></div>';
        }

        if (d.sambung === 'tidak_kiri') {
            html += '<div class="detail-qolqolah" style="background:#ECEFF1;border-color:#B0BEC5"><h4>⚠️ Catatan Sambung</h4><p>Huruf ini hanya punya bentuk isolated (terpisah) dan akhir — tidak bisa disambung ke huruf sebelumnya.</p></div>';
        }

        html += '<div class="detail-contoh"><div class="detail-contoh-label">Contoh dalam Al-Qur\'an</div>';
        html += '<div class="detail-contoh-ayat">' + d.contoh + '</div></div>';

        detailContent.innerHTML = html;
        detailPanel.style.display = 'flex';
    }

    // --- Render huruf ---
    function render() {
        KELUARGA.forEach(function(kel) {
            var block = document.createElement('div');
            block.className = 'keluarga-block';

            // Label
            var label = document.createElement('div');
            label.className = 'keluarga-label';

            var badge = document.createElement('div');
            badge.className = 'keluarga-badge';
            badge.style.background = kel.bg;
            badge.textContent = kel.badge;

            var nama = document.createElement('div');
            nama.className = 'keluarga-nama';
            nama.textContent = kel.nama;

            label.appendChild(badge);
            label.appendChild(nama);
            block.appendChild(label);

            // Grid
            var grid = document.createElement('div');
            grid.className = 'keluarga-grid';

            kel.huruf.forEach(function(key) {
                var d = HURUF_DATA[key];
                var card = document.createElement('div');
                card.className = 'huruf-card';

                // Badge Qolqolah
                if (d.qolqolah) {
                    var q = document.createElement('span');
                    q.className = 'h-qolqolah';
                    q.textContent = 'Qolqolah';
                    card.appendChild(q);
                }

                // Badge tidak sambung
                if (d.sambung === 'tidak_kiri') {
                    var h = document.createElement('span');
                    h.className = 'h-hint';
                    h.textContent = '❌ Sambung Kiri';
                    card.appendChild(h);
                }

                // Char
                var c = document.createElement('span');
                c.className = 'h-char';
                c.textContent = d.char;
                card.appendChild(c);

                // Name
                var n = document.createElement('span');
                n.className = 'h-name';
                n.textContent = d.name;
                card.appendChild(n);

                // Play button
                var p = document.createElement('button');
                p.className = 'h-play';
                p.textContent = '🔊';

                // Play event
                p.addEventListener('click', function(e) {
                    e.stopPropagation();
                    playAudio(d.audio);
                });

                card.appendChild(p);

                // Click card → detail
                card.addEventListener('click', function() {
                    showDetail(key);
                });

                grid.appendChild(card);
            });

            block.appendChild(grid);
            bodyHuruf.appendChild(block);
        });
    }

    render();
});
