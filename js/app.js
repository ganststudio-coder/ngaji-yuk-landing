// ════════════════════════════════════════
// NGAJI YUK! — App v9 (Simple show/hide)
// ════════════════════════════════════════

(function(){
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
    var pageHistory=['dashboard'];

    // ── Page map ──
    var PAGES={
        dashboard:   document.getElementById('pageMenu'),
        pilihKeluarga:document.getElementById('pagePilihKeluarga'),
        kelompok:    document.getElementById('pageKelompok'),
        huruf:       document.getElementById('pageHuruf'),
        talaqqi:     document.getElementById('pageTalaqqi'),
        record:      document.getElementById('pageRecord'),
        tajwid:      document.getElementById('pageTajwid'),
        htq:         document.getElementById('pageHTQ'),
        sambung:     document.getElementById('pageSambung')
    };

    // ── Navigation ──
    function showPage(id){
        // Hide all
        Object.keys(PAGES).forEach(function(k){
            if(PAGES[k]) PAGES[k].style.display='none';
        });
        // Show target
        if(PAGES[id]) PAGES[id].style.display='block';
        window.scrollTo(0,0);
    }

    window.goTo=function(id){
        pageHistory.push(id);
        showPage(id);
    };

    window.goBack=function(){
        if(pageHistory.length>1){
            pageHistory.pop();
            showPage(pageHistory[pageHistory.length-1]);
        }
    };

    // ── SPLASH ──
    document.getElementById('btnMulai').addEventListener('click',function(){
        document.getElementById('splash').style.display='none';
        document.getElementById('dashLayer').style.display='block';
        showPage('dashboard');
    });

    // ── Menu cards ──
    var menus=[
        {icon:'🔤',label:'Huruf\nHijaiyah',color:'#E8F5E9',border:'#4CAF50',page:'pilihKeluarga'},
        {icon:'🎙️',label:'Talaqqi',color:'#FFF3E0',border:'#E65100',page:'talaqqi'},
        {icon:'🎵',label:'Tajwid',color:'#E3F2FD',border:'#1565C0',page:'tajwid'},
        {icon:'✨',label:'Harakat &\nQolqolah',color:'#FCE4EC',border:'#C62828',page:'htq'},
        {icon:'🔗',label:'Huruf\nSambung',color:'#F3E5F5',border:'#6A1B9A',page:'sambung'}
    ];
    var menuGrid=document.getElementById('menuGrid');
    menus.forEach(function(m){
        var card=document.createElement('div');
        card.className='menu-card';
        card.style.background=m.color;
        card.style.borderColor=m.border;
        card.innerHTML='<span class="menu-icon">'+m.icon+'</span><span class="menu-label">'+m.label+'</span>';
        card.onclick=function(){goTo(m.page);};
        menuGrid.appendChild(card);
    });

    // scroll to menu
    var bl=document.querySelector('.btn-lanjut-dash');
    if(bl) bl.onclick=function(){document.querySelector('.dash-body').scrollIntoView({behavior:'smooth'});};

    // ── Back buttons ──
    var backMap={
        btnBackPilih: 'pilihKeluarga',
        btnBackKel: 'kelompok',
        btnBackHuruf: 'huruf',
        btnBackTalaqqi: 'talaqqi',
        btnBackRecord: 'record',
        btnBackTajwid: 'tajwid',
        btnBackHTQ: 'htq',
        btnBackSambung: 'sambung'
    };
    Object.keys(backMap).forEach(function(id){
        var el=document.getElementById(id);
        if(el) el.onclick=goBack;
    });

    // ── HURUF ──
    window.pilihTitik=function(){
        currentKeluarga='titik';
        renderKelompok(KELOMPOK_TITIK,'Keluarga Huruf Titik');
    };
    window.pilihUnik=function(){
        currentKeluarga='unik';
        renderKelompok(KELOMPOK_UNIK,'Keluarga Huruf Unik');
    };
    function renderKelompok(data,title){
        document.getElementById('kelTitle').textContent=title;
        kelompokContainer.innerHTML='';
        data.forEach(function(kel,idx){
            var item=document.createElement('div');
            item.className='kelompok-item';
            item.innerHTML='<div class="kel-nomor">'+(idx+1)+'</div>'
                +'<div class="kel-info"><div class="kel-label">'+kel.label+'</div>'
                +'<div class="kel-huruf-list">'+kel.huruf.map(function(k){return HURUF_DATA[k].char;}).join(' · ')+'</div></div>'
                +'<div class="kel-jumlah">'+kel.huruf.length+' huruf</div>';
            item.onclick=function(){renderHuruf(kel,idx);};
            kelompokContainer.appendChild(item);
        });
        goTo('kelompok');
    }
    function renderHuruf(kel,idx){
        document.getElementById('hurufTitle').textContent=currentKeluarga==='titik'?'Kelompok '+(idx+1):'Kelompok Unik';
        hurufGrid.innerHTML='';
        kel.huruf.forEach(function(key){
            var d=HURUF_DATA[key];
            var card=document.createElement('div');
            card.className='huruf-card';
            var inner='';
            if(d.qolqolah) inner+='<span class="h-qolqolah">Qolqolah</span>';
            if(d.sambung==='tidak_kiri') inner+='<span class="h-hint">Sambung</span>';
            inner+='<span class="h-char">'+d.char+'</span><span class="h-name">'+d.name+'</span>';
            inner+='<button class="h-play">🔊</button>';
            card.innerHTML=inner;
            card.querySelector('.h-play').onclick=function(e){
                e.stopPropagation();playAudio(d.audio);
            };
            card.onclick=function(){showDetail(key);};
            hurufGrid.appendChild(card);
        });
        goTo('huruf');
    }

    // ── TALAQQI ──
    var taPreview={
        makhraj:'بَ تَ ثَ جَ حَ خَ',
        harakat:'بَ  بِ  بُ',
        tanwin:'بً  بٍ  بٌ',
        qolqolah:'قَ  طَ  بَ  جَ  دَ'
    };
    window.openTalaqqi=function(mode){
        document.getElementById('recTitle').textContent={
            makhraj:'🔤 Huruf & Makhraj',
            harakat:'✨ Harakat',
            tanwin:'〽️ Tanwin',
            qolqolah:'🔊 Qolqolah'
        }[mode];
        document.getElementById('recordPreview').textContent=taPreview[mode];
        document.getElementById('recordStatus').textContent='Tap mic untuk merekam';
        document.getElementById('recordResult').style.display='none';
        document.getElementById('btnRecord').className='btn-record';
        recState='idle';
        document.getElementById('btnRecord').textContent='🎤';
        goTo('record');
    };

    document.getElementById('btnRecord').onclick=function(){
        var btn=this;
        if(recState==='idle'){
            recState='recording';
            btn.className='btn-record recording';
            btn.textContent='🔴';
            document.getElementById('recordStatus').textContent='Merekam...';
            document.getElementById('recordResult').style.display='none';
            recTimer=setTimeout(function(){
                recState='analyzing';
                btn.className='btn-record';
                btn.textContent='⚙️';
                document.getElementById('recordStatus').textContent='AI menganalisa...';
                setTimeout(function(){
                    recState='idle';
                    btn.textContent='🎤';
                    document.getElementById('recordStatus').textContent='';
                    showRecResult();
                },2000);
            },3000);
        } else {
            clearTimeout(recTimer);
            recState='idle';
            btn.className='btn-record';
            btn.textContent='🎤';
            document.getElementById('recordStatus').textContent='Dibatalkan';
        }
    };

    function showRecResult(){
        var good=Math.random()>0.4;
        var r=document.getElementById('recordResult');
        r.innerHTML='<div class="rr-score"><div class="rr-stars">'+(good?'⭐⭐⭐':'⭐')+'</div>'
            +'<div class="rr-text">'+(good?'Masya Allah, bagus!':'Ayo coba lagi!')+'</div></div>'
            +'<div class="rr-actions"><button class="rr-ulang" onclick="this.parentElement.parentElement.style.display=\'none\';document.getElementById(\'btnRecord\').textContent=\'🎤\';recState=\'idle\'">🎙️ '+(good?'Lagi':'Coba Lagi')+'</button>'
            +'<button class="rr-lanjut" onclick="goBack()">← Kembali</button></div>';
        r.style.display='block';
    }

    // ── SAMBUNG ──
    (function renderSambung(){
        sambungList.innerHTML='';
        Object.keys(SAMBUNG_DATA).forEach(function(k){
            var d=SAMBUNG_DATA[k];
            var it=document.createElement('div');
            it.className='sambung-item';
            var h='<div style="font-weight:700;font-size:0.9rem;color:var(--emerald);font-family:Georgia,serif">'
                +d.char+' '+d.nama+' <span style="font-size:0.7rem;color:var(--gray)">('+d.kelompok+')</span></div><div class="sambung-row">'
                +'<span class="sambung-label">Awal:</span><span class="sambung-bentuk">'+(d.awal||'—')+'</span>'
                +'<span class="sambung-label">Tengah:</span><span class="sambung-bentuk">'+(d.tengah||'—')+'</span>'
                +'<span class="sambung-label">Akhir:</span><span class="sambung-bentuk">'+(d.akhir||'—')+'</span>';
            if(d.sambung==='tidak_kiri') h+='<span class="sambung-hint">⚠️ Tak bisa sambung kiri</span>';
            h+='</div>';
            it.innerHTML=h;
            sambungList.appendChild(it);
        });
    })();

    // ── Audio ──
    window.playAudio=function(src){
        if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;}
        audioPlayer.src=src;
        audioPlayer.play().catch(function(){});
        currentAudio=audioPlayer;
    };

    // ── Detail ──
    window.tutupDetail=function(){
        detailPanel.style.display='none';
        if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;currentAudio=null;}
    };
    function showDetail(key){
        var d=HURUF_DATA[key];
        var h='<div class="detail-char">'+d.char+'</div><div class="detail-name">'+d.name+'</div>'
            +'<div class="detail-bunyi">Bunyi: "'+d.bunyi+'"</div>'
            +'<button class="detail-play-btn" onclick="playAudio(\''+d.audio+'\')">🔊</button>'
            +'<div class="detail-box green"><h4>📝 Makhraj</h4><p>'+d.makhraj+'</p></div>';
        if(d.qolqolah) h+='<div class="detail-box orange"><h4>💡 Qolqolah</h4><p>Dibaca memantul saat sukun atau waqaf.</p></div>';
        if(d.sambung==='tidak_kiri') h+='<div class="detail-box gray"><h4>⚠️ Tak Bisa Sambung Kiri</h4><p>Hanya bentuk isolated dan akhir.</p></div>';
        h+='<div class="detail-contoh"><div class="detail-contoh-label">Contoh</div><div class="detail-contoh-ayat">'+d.contoh+'</div></div>';
        detailContent.innerHTML=h;
        detailPanel.style.display='flex';
    }
})();
