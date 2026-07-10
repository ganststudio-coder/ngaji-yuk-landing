// ════════════════════════════════════════
// NGAJI YUK! — App v4
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    var s1 = document.getElementById('s1');
    var s2 = document.getElementById('s2');
    var s3 = document.getElementById('s3');
    var s4 = document.getElementById('s4');
    var s5 = document.getElementById('s5');

    var btnMulai = document.getElementById('btnMulai');
    var btnLanjut = document.getElementById('btnLanjut');
    var btnDashboard = document.getElementById('backKeDashboard');
    var backKePilihan = document.getElementById('backKePilihan');
    var backKeKelompok = document.getElementById('backKeKelompok');
    var menuHuruf = document.getElementById('menuHuruf');
    var pilihTitik = document.getElementById('pilihTitik');
    var pilihUnik = document.getElementById('pilihUnik');
    var kelompokContainer = document.getElementById('kelompokContainer');
    var hurufGrid = document.getElementById('hurufGrid');
    var s4Title = document.getElementById('s4Title');
    var s4Sub = document.getElementById('s4Sub');
    var s5Title = document.getElementById('s5Title');
    var s5Sub = document.getElementById('s5Sub');
    var audioPlayer = document.getElementById('audioPlayer');
    var detailPanel = document.getElementById('detailPanel');
    var detailContent = document.getElementById('detailContent');

    var currentAudio = null;
    var currentKeluarga = null;

    // --- Screen ---
    function show(screen) {
        document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
        screen.classList.add('active');
        screen.style.display = 'block';
    }

    // Splash → Dashboard
    btnMulai.addEventListener('click', function() { show(s2); });

    // Dashboard → Pilihan Keluarga (via "Lanjut Belajar" OR "Huruf Hijaiyah")
    function goToPilihan() {
        show(s3);
    }
    btnLanjut.addEventListener('click', goToPilihan);
    menuHuruf.addEventListener('click', goToPilihan);

    // Menu lainnya — placeholder
    document.getElementById('menuTajwid').addEventListener('click', function() { alert('📖 Ilmu Tajwid — segera hadir!'); });
    document.getElementById('menuVoice').addEventListener('click', function() { alert('🎙️ AI Voice Coach — segera hadir!'); });
    document.getElementById('menuSurah').addEventListener('click', function() { alert('📖 Baca Surah — segera hadir!'); });

    // Back from pilihan to dashboard
    btnDashboard.addEventListener('click', function() { show(s2); });

    // Pilih Titik
    pilihTitik.addEventListener('click', function() {
        currentKeluarga = 'titik';
        showKelompok(KELOMPOK_TITIK, 'Keluarga Huruf Titik');
    });

    // Pilih Unik
    pilihUnik.addEventListener('click', function() {
        currentKeluarga = 'unik';
        showKelompok(KELOMPOK_UNIK, 'Keluarga Huruf Unik');
    });

    // Back from kelompok to pilihan
    backKePilihan.addEventListener('click', function() { show(s3); });

    // Back from huruf to kelompok
    backKeKelompok.addEventListener('click', function() { show(s4); });

    // --- Show Kelompok ---
    function showKelompok(data, title) {
        s4Title.textContent = title;
        s4Sub.textContent = 'Pilih kelompok yang mau dipelajari';
        kelompokContainer.innerHTML = '';

        data.forEach(function(kel, idx) {
            var item = document.createElement('div');
            item.className = 'kelompok-item';

            var nomor = document.createElement('div');
            nomor.className = 'kel-nomor';
            nomor.textContent = idx + 1;

            var info = document.createElement('div');
            info.className = 'kel-info';

            var label = document.createElement('div');
            label.className = 'kel-label';
            label.textContent = kel.label;

            var hurufList = document.createElement('div');
            hurufList.className = 'kel-huruf-list';
            hurufList.textContent = kel.huruf.map(function(k) { return HURUF_DATA[k].char; }).join(' · ');

            info.appendChild(label);
            info.appendChild(hurufList);

            var jumlah = document.createElement('div');
            jumlah.className = 'kel-jumlah';
            jumlah.textContent = kel.huruf.length + ' huruf';

            item.appendChild(nomor);
            item.appendChild(info);
            item.appendChild(jumlah);

            item.addEventListener('click', function() {
                showHuruf(kel, idx);
            });

            kelompokContainer.appendChild(item);
        });

        show(s4);
    }

    // --- Show Huruf ---
    function showHuruf(kel, idx) {
        s5Title.textContent = currentKeluarga === 'titik' ? 'Kelompok ' + (idx + 1) : 'Kelompok Unik';
        s5Sub.textContent = 'Tap huruf untuk belajar';
        hurufGrid.innerHTML = '';

        kel.huruf.forEach(function(key) {
            var d = HURUF_DATA[key];
            var card = document.createElement('div');
            card.className = 'huruf-card';

            if (d.qolqolah) {
                var q = document.createElement('span');
                q.className = 'h-qolqolah';
                q.textContent = 'Qolqolah';
                card.appendChild(q);
            }

            if (d.sambung === 'tidak_kiri') {
                var h = document.createElement('span');
                h.className = 'h-hint';
                h.textContent = '❌ Sambung Kiri';
                card.appendChild(h);
            }

            var c = document.createElement('span');
            c.className = 'h-char';
            c.textContent = d.char;
            card.appendChild(c);

            var n = document.createElement('span');
            n.className = 'h-name';
            n.textContent = d.name;
            card.appendChild(n);

            var p = document.createElement('button');
            p.className = 'h-play';
            p.textContent = '🔊';
            p.addEventListener('click', function(e) {
                e.stopPropagation();
                window.playAudio(d.audio);
            });
            card.appendChild(p);

            card.addEventListener('click', function() {
                showDetail(key);
            });

            hurufGrid.appendChild(card);
        });

        show(s5);
    }

    // --- Audio ---
    window.playAudio = function(src) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        audioPlayer.src = src;
        audioPlayer.play().catch(function(e) {});
        currentAudio = audioPlayer;
    };

    // --- Detail ---
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

        html += '<div class="detail-box green"><h4>📝 Makhraj Huruf</h4><p>' + d.makhraj + '</p></div>';

        if (d.qolqolah) {
            html += '<div class="detail-box orange"><h4>💡 Qolqolah!</h4><p>Huruf ini dibaca memantul saat sukun atau waqaf.</p></div>';
        }

        if (d.sambung === 'tidak_kiri') {
            html += '<div class="detail-box gray"><h4>⚠️ Catatan Sambung</h4><p>Huruf ini hanya punya bentuk isolated (terpisah) dan akhir — tidak bisa disambung ke huruf sebelumnya.</p></div>';
        }

        html += '<div class="detail-contoh"><div class="detail-contoh-label">Contoh dalam Al-Qur\'an</div>';
        html += '<div class="detail-contoh-ayat">' + d.contoh + '</div></div>';

        detailContent.innerHTML = html;
        detailPanel.style.display = 'flex';
    }
});
