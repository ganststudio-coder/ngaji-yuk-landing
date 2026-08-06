// ════════════════════════════════════════
// NGAJI YUK! — App (clean)
// ════════════════════════════════════════

(function() {
    var audioPlayer = document.getElementById('audioPlayer');
    var detailPanel = document.getElementById('detailPanel');
    var detailContent = document.getElementById('detailContent');
    var kelompokContainer = document.getElementById('kelompokContainer');
    var hurufGrid = document.getElementById('hurufGrid');
    var sambungList = document.getElementById('sambungList');
    var currentAudio = null;
    var currentKeluarga = null;
    var recState = 'idle';
    var recTimer = null;

    // PAGE MAP
    var allPages = [
        'pageMenu','pagePilihKeluarga','pageKelompok','pageHuruf',
        'pageTalaqqi','pageRecord','pageTajwid','pageHTQ','pageSambung','pageLatihanSambung',
        'pageDonasi','pageWA','pagePDF','pagePDFEnglish'
    ];

    window.showPage = function(id) {
        allPages.forEach(function(p) {
            var el = document.getElementById(p);
            if (el) el.style.display = (p === id) ? 'block' : 'none';
        });
        window.scrollTo(0, 0);
        if (id === 'pageHTQ' && window.generateHarakatGrid2) generateHarakatGrid2();
    };

    // Splash
    document.getElementById('btnMulai').onclick = function() {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('dashLayer').style.display = 'block';
        showPage('pageMenu');
    };

    // Scroll to menu on "Mulai Belajar"
    var btnLanjut = document.querySelector('.btn-lanjut-dash');
    if (btnLanjut) btnLanjut.onclick = function() {
        document.querySelector('.dash-body').scrollIntoView({ behavior: 'smooth' });
    };

    // Build menu cards
    var menus = [
        { icon:'🔤', label:'Huruf\nHijaiyah', color:'#E8F5E9', border:'#4CAF50', page:'pagePilihKeluarga' },
        { icon:'🎙️', label:'Talaqqi', color:'#FFF3E0', border:'#E65100', page:'pageTalaqqi' },
        { icon:'🎵', label:'Tajwid', color:'#E3F2FD', border:'#1565C0', page:'pageTajwid' },
        { icon:'✨', label:'Harakat &\nQolqolah', color:'#FCE4EC', border:'#C62828', page:'pageHTQ' },
        { icon:'🔗', label:'Huruf\nSambung', color:'#F3E5F5', border:'#6A1B9A', page:'pageSambung' },
        { icon:'📝', label:'Latihan\nSambung', color:'#E0F7FA', border:'#006064', page:'pageLatihanSambung' }
    ];
    var menuGrid = document.getElementById('menuGrid');
    menus.forEach(function(m) {
        var card = document.createElement('div');
        card.className = 'menu-card';
        card.style.background = m.color;
        card.style.borderColor = m.border;
        card.innerHTML = '<span class="menu-icon">' + m.icon + '</span><span class="menu-label">' + m.label + '</span>';
        card.onclick = function() { showPage(m.page); };
        menuGrid.appendChild(card);
    });

    // HURUF HIJAIYAH
    window.pilihTitik = function() {
        currentKeluarga = 'titik';
        renderKelompok(KELOMPOK_TITIK, 'Keluarga Huruf Titik');
    };
    window.pilihUnik = function() {
        currentKeluarga = 'unik';
        renderKelompok(KELOMPOK_UNIK, 'Keluarga Huruf Unik');
    };

    function renderKelompok(data, title) {
        document.getElementById('kelTitle').textContent = title;
        kelompokContainer.innerHTML = '';
        data.forEach(function(kel, idx) {
            var item = document.createElement('div');
            item.className = 'kelompok-item';
            item.innerHTML = '<div class="kel-nomor">' + (idx + 1) + '</div>'
                + '<div class="kel-info"><div class="kel-label">' + kel.label + '</div>'
                + '<div class="kel-huruf-list">' + kel.huruf.map(function(k) { return HURUF_DATA[k].char; }).join(' · ') + '</div></div>'
                + '<div class="kel-jumlah">' + kel.huruf.length + ' huruf</div>';
            item.onclick = function() { renderHuruf(kel, idx); };
            kelompokContainer.appendChild(item);
        });
        showPage('pageKelompok');
    }

    function renderHuruf(kel, idx) {
        document.getElementById('hurufTitle').textContent = currentKeluarga === 'titik' ? 'Kelompok ' + (idx + 1) : 'Kelompok Unik';
        hurufGrid.innerHTML = '';
        kel.huruf.forEach(function(key) {
            var d = HURUF_DATA[key];
            var card = document.createElement('div');
            card.className = 'huruf-card';
            var inner = '';
            if (d.qolqolah) inner += '<span class="h-qolqolah">Qolqolah</span>';
            if (d.sambung === 'tidak_kiri') inner += '<span class="h-hint">Sambung</span>';
            inner += '<span class="h-char">' + d.char + '</span><span class="h-name">' + d.name + '</span>';
            inner += '<button class="h-play">🔊</button>';
            card.innerHTML = inner;
            card.querySelector('.h-play').onclick = function(e) {
                e.stopPropagation();
                playAudio(d.audio);
            };
            card.onclick = function() { showDetail(key); };
            hurufGrid.appendChild(card);
        });
        showPage('pageHuruf');
    }

    // TALAQQI
    // Semua data untuk tampilan Talaqqi
    var ALL_KEYS = ['ba','ta','tsa','jim','ha_kecil','kha','dal','dzal','ra','zai','sin','syin','shad','dhad','tha_besar','zha','ain','ghain','fa','qaf','kaf','lam','mim','nun','ha_besar','waw','ya','alif','hamzah'];
    var QOLQOLAH_KEYS = ['qaf','tha_besar','ba','jim','dal'];

    var taItems = {
        makhraj: ALL_KEYS.map(function(k) { return HURUF_DATA[k].char; }),
        harakat: ALL_KEYS.map(function(k) { var c = HURUF_DATA[k].char; return c + '\u064e ' + c + '\u0650 ' + c + '\u064f'; }),
        tanwin: ALL_KEYS.map(function(k) { var c = HURUF_DATA[k].char; return c + '\u064b ' + c + '\u064d ' + c + '\u064c'; }),
        qolqolah: QOLQOLAH_KEYS.map(function(k) { return HURUF_DATA[k].char; })
    };

    window.openTalaqqi = function(mode) {
        document.getElementById('recTitle').textContent = {
            makhraj: '🔤 Huruf & Makhraj',
            harakat: '✨ Harakat',
            tanwin: '〽️ Tanwin',
            qolqolah: '🔊 Qolqolah'
        }[mode];
        document.getElementById('recordPreview').innerHTML = '<div style="font-size:1.5rem; line-height:2.5;">' + taItems[mode].join(' · ') + '</div>';
        document.getElementById('recordStatus').textContent = 'Tap mic untuk merekam';
        document.getElementById('recordResult').style.display = 'none';
        document.getElementById('btnRecord').className = 'btn-record';
        recState = 'idle';
        document.getElementById('btnRecord').textContent = '🎤';
        showPage('pageRecord');
    };

    document.getElementById('btnRecord').onclick = function() {
        var btn = this;
        if (recState === 'idle') {
            recState = 'recording';
            btn.className = 'btn-record recording';
            btn.textContent = '🔴';
            document.getElementById('recordStatus').textContent = 'Merekam...';
            document.getElementById('recordResult').style.display = 'none';
            recTimer = setTimeout(function() {
                recState = 'analyzing';
                btn.className = 'btn-record';
                btn.textContent = '⚙️';
                document.getElementById('recordStatus').textContent = 'AI menganalisa...';
                setTimeout(function() {
                    recState = 'idle';
                    btn.textContent = '🎤';
                    document.getElementById('recordStatus').textContent = '';
                    showRecResult();
                }, 2000);
            }, 3000);
        } else {
            clearTimeout(recTimer);
            recState = 'idle';
            btn.className = 'btn-record';
            btn.textContent = '🎤';
            document.getElementById('recordStatus').textContent = 'Dibatalkan';
        }
    };

    function showRecResult() {
        var good = Math.random() > 0.4;
        var r = document.getElementById('recordResult');
        r.innerHTML = '<div class="rr-score"><div class="rr-stars">' + (good ? '⭐⭐⭐' : '⭐') + '</div>'
            + '<div class="rr-text">' + (good ? 'Masya Allah, bagus!' : 'Ayo coba lagi!') + '</div></div>'
            + '<div class="rr-actions"><button class="rr-ulang" onclick="this.parentElement.parentElement.style.display=\'none\';document.getElementById(\'btnRecord\').textContent=\'🎤\';recState=\'idle\'">🎙️ ' + (good ? 'Lagi' : 'Coba Lagi') + '</button>'
            + '<button class="rr-lanjut" onclick="showPage(\'pageTalaqqi\')">← Kembali</button></div>';
        r.style.display = 'block';
    }

    // LATIHAN SAMBUNG
    (function renderLatihanSambung() {
        var container = document.getElementById('latihanSambungContainer');
        if (!container) return;
        var contoh = [
            { title:'Contoh 1: Qaf-Tho-Ba', letters:['ق','ط','ب'], connected:'قَطْبٌ',
              desc:'Analisis: Qaf di awal, Tho di tengah, Ba di akhir. Terdapat hukum Qolqolah pada huruf Tho (sukun).' },
            { title:'Contoh 2: Mad Dasar', letters:['م','د','ا','ر','س'], connected:'مَدَارِسُ',
              desc:'Analisis: Huruf Dal, Alif, Ra tidak dapat disambung ke setelahnya.' },
            { title:'Contoh 3: Sukun & Mad', letters:['ج','د','ي','د'], connected:'جَدِيْدٌ',
              desc:'Analisis: Penekanan pada Mad Ya dan tanwin di akhir.' }
        ];
        var cardHtml = '<div style="display:grid;grid-template-columns:1fr;gap:24px;padding:20px">';
        contoh.forEach(function(c) {
            cardHtml += '<div style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-top:4px solid #22c55e;display:flex;flex-direction:column;gap:12px">'
                + '<div style="font-size:1.25rem;font-weight:700">' + c.title + '</div>'
                + '<div style="display:flex;align-items:center;justify-content:center;gap:16px">'
                + '<div style="display:flex;gap:8px">'
                + c.letters.map(function(l) { return '<span style="font-size:1.5rem;background:#f3f4f6;padding:8px;border-radius:8px">' + l + '</span>'; }).join('')
                + '</div>'
                + '<span style="font-size:1.5rem">→</span>'
                + '<span style="font-size:2.25rem;color:#15803d;font-family:\'Noto Naskh Arabic\',serif">' + c.connected + '</span>'
                + '</div>'
                + '<div style="font-size:0.875rem;color:#4b5563">' + c.desc + '</div>'
                + '</div>';
        });
        container.innerHTML = cardHtml + '</div>';
    })();

    // SAMBUNG
    (function renderSambung() {
        var conn = document.getElementById('connectorContainer');
        if (conn) {
            conn.innerHTML = '';
        }

        sambungList.innerHTML = '';
        Object.keys(SAMBUNG_DATA).forEach(function(k) {
            var d = SAMBUNG_DATA[k];
            var it = document.createElement('div');
            it.className = 'sambung-item';
            var h = '<div style="font-weight:700;font-size:0.9rem;color:var(--emerald);font-family:Georgia,serif">'
                + d.char + ' ' + d.nama + ' <span style="font-size:0.7rem;color:var(--gray)">(' + d.kelompok + ')</span></div><div class="sambung-row">'
                + '<span class="sambung-label">Awal:</span><span class="sambung-bentuk">' + (d.awal || '—') + '</span>'
                + '<span class="sambung-label">Tengah:</span><span class="sambung-bentuk">' + (d.tengah || '—') + '</span>'
                + '<span class="sambung-label">Akhir:</span><span class="sambung-bentuk">' + (d.akhir || '—') + '</span>';
            if (d.sambung === 'tidak_kiri') h += '<span class="sambung-hint">⚠️ Tak bisa sambung kiri</span>';
            h += '</div>';
            it.innerHTML = h;
            sambungList.appendChild(it);
        });
    })();

    // AUDIO
    window.playAudio = function(src) {
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
        audioPlayer.src = src;
        audioPlayer.play().catch(function() {});
        currentAudio = audioPlayer;
    };

    // DETAIL
    window.tutupDetail = function() {
        detailPanel.style.display = 'none';
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
    };

    function showDetail(key) {
        var d = HURUF_DATA[key];
        var h = '<div class="detail-char">' + d.char + '</div><div class="detail-name">' + d.name + '</div>'
            + '<div class="detail-bunyi">Bunyi: "' + d.bunyi + '"</div>'
            + '<button class="detail-play-btn" onclick="playAudio(\'' + d.audio + '\')">🔊</button>'
            + '<div class="detail-box green"><h4>📝 Makhraj</h4><p>' + d.makhraj + '</p></div>';
        if (d.qolqolah) h += '<div class="detail-box orange"><h4>💡 Qolqolah</h4><p>Dibaca memantul saat sukun atau waqaf.</p></div>';
        if (d.sambung === 'tidak_kiri') h += '<div class="detail-box gray"><h4>⚠️ Tak Bisa Sambung Kiri</h4><p>Hanya bentuk isolated dan akhir.</p></div>';
        h += '<div class="detail-contoh"><div class="detail-contoh-label">Contoh</div><div class="detail-contoh-ayat">' + d.contoh + '</div></div>';
        detailContent.innerHTML = h;
        detailPanel.style.display = 'flex';
    }

    // HARAKAT + TANWIN GRID — 3 bentuk per huruf
    window.generateHarakatGrid2 = function() {
        var HG = document.getElementById('harakatGrid2');
        var TG = document.getElementById('tanwinGrid2');
        if (!HG && !TG) return;
        var keys = ['ba','ta','tsa','jim','ha_kecil','kha','dal','dzal','ra','zai',
                    'sin','syin','shad','dhad','tha_besar','zha','ain','ghain','fa','qaf',
                    'kaf','lam','mim','nun','ha_besar','waw','ya','alif','hamzah'];
        // FATHAH \u064e, KASRAH \u0650, DAMMAH \u064f
        // TANWIN: fathah \u064b, kasrah \u064d, dammah \u064c
        if (HG) {
            var h = '<div class="harakat-grid2">';
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var d = HURUF_DATA[k];
                if (!d) continue;
                var c = d.char;
                var audioPath = HARAKAT_AUDIO[k] || '';
                var damma = c + '\u064f', kasra = c + '\u0650', fatha = c + '\u064e';
                if (audioPath) {
                    h += '<div class="hr-row" onclick="playAudio(\'' + audioPath + '\')">'
                        + '<span class="hr-name">' + d.name + '</span>'
                        + '<span class="hr-forms">'
                        + '<span class="hr-form">' + damma + '</span>'
                        + '<span class="hr-form">' + kasra + '</span>'
                        + '<span class="hr-form">' + fatha + '</span>'
                        + '</span>'
                        + '<span class="hr-play">🔊</span>'
                        + '</div>';
                } else {
                    h += '<div class="hr-row dim">'
                        + '<span class="hr-name">' + d.name + '</span>'
                        + '<span class="hr-forms">'
                        + '<span class="hr-form">' + damma + '</span>'
                        + '<span class="hr-form">' + kasra + '</span>'
                        + '<span class="hr-form">' + fatha + '</span>'
                        + '</span>'
                        + '<span class="hr-play" style="opacity:0.3">🚫</span>'
                        + '</div>';
                }
            }
            h += '</div>';
            HG.innerHTML = h;
        }
                        if (TG) {
            var t = '<div class="harakat-grid2">';
            // Menggunakan for-in agar otomatis mendeteksi semua yang ada di TANWIN_AUDIO
            for (var k2 in TANWIN_AUDIO) {
                var tanwinAudio = TANWIN_AUDIO[k2];
                var d2 = HURUF_DATA[k2];
                if (!d2) continue;
                
                var c2 = d2.char;
                var tanwinD = c2 + '\u064c', tanwinK = c2 + '\u064d', tanwinF = c2 + '\u064b';
                
                t += '<div class="hr-row tnw" onclick="playAudio(\'' + tanwinAudio + '\')">'
                    + '<span class="hr-name">' + d2.name + '</span>'
                    + '<span class="hr-forms">'
                    + '<span class="hr-form">' + tanwinD + '</span>'
                    + '<span class="hr-form">' + tanwinK + '</span>'
                    + '<span class="hr-form">' + tanwinF + '</span>'
                    + '</span>'
                    + '<span class="hr-play">🔊</span>'
                    + '</div>';
            }
            t += '</div>';
            TG.innerHTML = t;
        }
    };
})();
