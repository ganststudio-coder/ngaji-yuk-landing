// ════════════════════════════════════════
// NGAJI YUK! — App v5
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // Screens
    var s={};
    for(var i=1;i<=10;i++) s[i]=document.getElementById('s'+i);

    var audioPlayer=document.getElementById('audioPlayer');
    var detailPanel=document.getElementById('detailPanel');
    var detailContent=document.getElementById('detailContent');
    var kelompokContainer=document.getElementById('kelompokContainer');
    var hurufGrid=document.getElementById('hurufGrid');
    var sambungList=document.getElementById('sambungList');
    var currentAudio=null;
    var currentKeluarga=null;
    var recState='idle';
    var recTimer=null;

    // Menu data
    var menus=[
        {icon:'🔤',label:'Huruf Hijaiyah',color:'#E8F5E9',border:'#4CAF50',screen:3},
        {icon:'🎙️',label:'Talaqqi',color:'#FFF3E0',border:'#E65100',screen:6},
        {icon:'🎵',label:'Tajwid',color:'#E3F2FD',border:'#1565C0',screen:10},
        {icon:'✨',label:'Harakat, Tanwin\n& Qolqolah',color:'#FCE4EC',border:'#C62828',screen:8},
        {icon:'🔗',label:'Huruf Sambung',color:'#F3E5F5',border:'#6A1B9A',screen:9}
    ];

    // Build menu cards
    var menuGrid=document.getElementById('menuGrid');
    menus.forEach(function(m){
        var card=document.createElement('div');
        card.className='menu-card';
        card.style.background=m.color;
        card.style.borderColor=m.border;
        card.innerHTML='<span class="menu-icon">'+m.icon+'</span><span class="menu-label">'+m.label+'</span>';
        card.addEventListener('click',function(){show(s[m.screen]);});
        menuGrid.appendChild(card);
    });

    // ── Screen switching ──
    function show(sc){
        document.querySelectorAll('.screen').forEach(function(x){x.classList.remove('active');});
        sc.classList.add('active');
        sc.style.display='block';
        window.scrollTo(0,0);
    }

    // ── SPLASH → DASHBOARD ──
    document.getElementById('btnMulai').addEventListener('click',function(){show(s[2]);});
    document.getElementById('btnLanjut').addEventListener('click',function(){show(s[2]);});

    // ── Back buttons ──
    document.getElementById('back3').addEventListener('click',function(){show(s[2]);});
    document.getElementById('back4').addEventListener('click',function(){show(s[3]);});
    document.getElementById('back5').addEventListener('click',function(){show(s[4]);});
    document.getElementById('back6').addEventListener('click',function(){show(s[2]);});
    document.getElementById('back7').addEventListener('click',function(){show(s[6]);});
    document.getElementById('back8').addEventListener('click',function(){show(s[2]);});
    document.getElementById('back9').addEventListener('click',function(){show(s[2]);});
    document.getElementById('back10').addEventListener('click',function(){show(s[2]);});

    // ══ HURUF HIJAIYAH ══
    document.getElementById('pilihTitik').addEventListener('click',function(){
        currentKeluarga='titik';
        renderKelompok(KELOMPOK_TITIK,'Keluarga Huruf Titik');
    });
    document.getElementById('pilihUnik').addEventListener('click',function(){
        currentKeluarga='unik';
        renderKelompok(KELOMPOK_UNIK,'Keluarga Huruf Unik');
    });

    function renderKelompok(data,title){
        document.getElementById('s4Title').textContent=title;
        kelompokContainer.innerHTML='';
        data.forEach(function(kel,idx){
            var item=document.createElement('div');
            item.className='kelompok-item';
            item.innerHTML='<div class="kel-nomor">'+(idx+1)+'</div>'
                +'<div class="kel-info"><div class="kel-label">'+kel.label+'</div>'
                +'<div class="kel-huruf-list">'+kel.huruf.map(function(k){return HURUF_DATA[k].char;}).join(' · ')+'</div></div>'
                +'<div class="kel-jumlah">'+kel.huruf.length+' huruf</div>';
            item.addEventListener('click',function(){renderHuruf(kel,idx);});
            kelompokContainer.appendChild(item);
        });
        show(s[4]);
    }

    function renderHuruf(kel,idx){
        document.getElementById('s5Title').textContent=currentKeluarga==='titik'?'Kelompok '+(idx+1):'Kelompok Unik';
        hurufGrid.innerHTML='';
        kel.huruf.forEach(function(key){
            var d=HURUF_DATA[key];
            var card=document.createElement('div');
            card.className='huruf-card';
            var inner='';
            if(d.qolqolah) inner+='<span class="h-qolqolah">Qolqolah</span>';
            if(d.sambung==='tidak_kiri') inner+='<span class="h-hint">❌ Sambung</span>';
            inner+='<span class="h-char">'+d.char+'</span><span class="h-name">'+d.name+'</span>';
            inner+='<button class="h-play">🔊</button>';
            card.innerHTML=inner;
            card.querySelector('.h-play').addEventListener('click',function(e){
                e.stopPropagation();playAudio(d.audio);
            });
            card.addEventListener('click',function(){showDetail(key);});
            hurufGrid.appendChild(card);
        });
        show(s[5]);
    }

    // ══ TALAQQI ══
    var talaqqiPreview={
        makhraj:'بَ تَ ثَ جَ حَ خَ',
        harakat:'بَ بِ بُ',
        tanwin:'بً بٍ بٌ',
        qolqolah:'قَ طَ بَ جَ دَ'
    };
    document.querySelectorAll('.talaqqi-card').forEach(function(card){
        card.addEventListener('click',function(){
            var mode=card.dataset.mode;
            document.getElementById('s7Title').textContent={
                makhraj:'🔤 Huruf & Makhraj',
                harakat:'✨ Harakat',
                tanwin:'〽️ Tanwin',
                qolqolah:'🔊 Qolqolah'
            }[mode];
            document.getElementById('recordPreview').textContent=talaqqiPreview[mode];
            document.getElementById('recordStatus').textContent='Tap mic untuk mulai merekam';
            document.getElementById('recordResult').style.display='none';
            document.getElementById('btnRecord').classList.remove('recording');
            show(s[7]);
        });
    });

    // Record button
    document.getElementById('btnRecord').addEventListener('click',function(){
        var btn=this;
        if(recState==='idle'){
            recState='recording';
            btn.classList.add('recording');
            btn.textContent='🔴';
            document.getElementById('recordStatus').textContent='Merekam... baca yang ditampilkan!';
            document.getElementById('recordResult').style.display='none';
            recTimer=setTimeout(function(){
                recState='analyzing';
                btn.classList.remove('recording');
                btn.textContent='⚙️';
                document.getElementById('recordStatus').textContent='AI sedang menganalisa...';
                setTimeout(function(){
                    recState='idle';
                    btn.textContent='🎤';
                    document.getElementById('recordStatus').textContent='';
                    showRecordResult();
                },2000);
            },3000);
        } else {
            clearTimeout(recTimer);
            recState='idle';
            btn.classList.remove('recording');
            btn.textContent='🎤';
            document.getElementById('recordStatus').textContent='Dibatalkan';
        }
    });

    function showRecordResult(){
        var isGood=Math.random()>0.4;
        var result=document.getElementById('recordResult');
        if(isGood){
            result.innerHTML='<div class="rr-score"><div class="rr-stars">⭐⭐⭐</div>'
                +'<div class="rr-text">Masya Allah, bacaanmu bagus!</div></div>'
                +'<div class="rr-actions"><button class="rr-ulang" onclick="document.getElementById(\'recordResult\').style.display=\'none\'">🎙️ Rekam Lagi</button>'
                +'<button class="rr-lanjut" onclick="show(document.getElementById(\'s6\'))">← Kembali</button></div>';
        } else {
            result.innerHTML='<div class="rr-score"><div class="rr-stars">⭐</div>'
                +'<div class="rr-text">Ayo coba lagi!</div></div>'
                +'<div class="rr-actions"><button class="rr-ulang" onclick="document.getElementById(\'recordResult\').style.display=\'none\'">🎙️ Coba Lagi</button>'
                +'<button class="rr-lanjut" onclick="show(document.getElementById(\'s6\'))">← Kembali</button></div>';
        }
        result.style.display='block';
    }

    // ══ HURUF SAMBUNG ══
    function renderSambung(){
        sambungList.innerHTML='';
        var keys=Object.keys(SAMBUNG_DATA);
        keys.forEach(function(key){
            var d=SAMBUNG_DATA[key];
            var item=document.createElement('div');
            item.className='sambung-item';
            var html='<div class="sambung-nama">'+d.char+' '+d.nama+' <span style="font-size:0.7rem;color:var(--gray)">('+d.kelompok+')</span></div>';
            html+='<div class="sambung-row">';
            html+='<span class="sambung-label">Awal:</span><span class="sambung-bentuk">'+(d.awal||'—')+'</span>';
            html+='<span class="sambung-label">Tengah:</span><span class="sambung-bentuk">'+(d.tengah||'—')+'</span>';
            html+='<span class="sambung-label">Akhir:</span><span class="sambung-bentuk">'+(d.akhir||'—')+'</span>';
            if(d.sambung==='tidak_kiri'){
                html+='<span class="sambung-hint">⚠️ Tidak bisa sambung ke kiri</span>';
            }
            html+='</div>';
            item.innerHTML=html;
            sambungList.appendChild(item);
        });
    }
    renderSambung();

    // ══ Audio ══
    window.playAudio=function(src){
        if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;}
        audioPlayer.src=src;
        audioPlayer.play().catch(function(){});
        currentAudio=audioPlayer;
    };

    // ══ Detail ══
    window.tutupDetail=function(){
        detailPanel.style.display='none';
        if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null;}
    };

    window.show=function(sc){show(sc);};

    function showDetail(key){
        var d=HURUF_DATA[key];
        var html='<div class="detail-char">'+d.char+'</div>'
            +'<div class="detail-name">'+d.name+'</div>'
            +'<div class="detail-bunyi">Bunyi: "'+d.bunyi+'"</div>'
            +'<button class="detail-play-btn" onclick="playAudio(\''+d.audio+'\')">🔊</button>'
            +'<div class="detail-box green"><h4>📝 Makhraj Huruf</h4><p>'+d.makhraj+'</p></div>';
        if(d.qolqolah) html+='<div class="detail-box orange"><h4>💡 Qolqolah!</h4><p>Huruf ini dibaca memantul saat sukun atau waqaf.</p></div>';
        if(d.sambung==='tidak_kiri') html+='<div class="detail-box gray"><h4>⚠️ Tidak Bisa Sambung Kiri</h4><p>Huruf ini hanya punya bentuk isolated dan akhir.</p></div>';
        html+='<div class="detail-contoh"><div class="detail-contoh-label">Contoh dalam Al-Qur\'an</div>'
            +'<div class="detail-contoh-ayat">'+d.contoh+'</div></div>';
        detailContent.innerHTML=html;
        detailPanel.style.display='flex';
    }
});
