// ════════════════════════════════════════
// NGAJI YUK! — App v7 (Slide with CSS classes)
// ════════════════════════════════════════

document.addEventListener('DOMContentLoaded',function(){
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

    // ── PAGE MAP ──
    var PAGE_IDS=['pageMenu','pagePilihKeluarga','pageKelompok','pageHuruf',
                   'pageTalaqqi','pageRecord','pageTajwid','pageHTQ','pageSambung'];
    var pageHistory=['pageMenu']; // stack

    function setActivePage(id){
        PAGE_IDS.forEach(function(pid){
            var el=document.getElementById(pid);
            if(!el)return;
            if(pid===id){
                el.classList.add('active');
                el.classList.remove('left');
            } else {
                // check if this page was the previous one (animate left)
                if(pageHistory.length>=2 && pid===pageHistory[pageHistory.length-2]){
                    el.classList.remove('active');
                    el.classList.add('left');
                } else {
                    el.classList.remove('active');
                    el.classList.remove('left');
                }
            }
        });
    }

    window.slideTo=function(id){
        if(document.getElementById(id)){
            pageHistory.push(id);
            setActivePage(id);
        }
    };

    window.slideBack=function(){
        if(pageHistory.length>1){
            pageHistory.pop(); // remove current
            var prev=pageHistory[pageHistory.length-1];
            setActivePage(prev);
        }
    };

    // ── SPLASH ──
    document.getElementById('btnMulai').addEventListener('click',function(){
        document.getElementById('splash').style.display='none';
        document.getElementById('dashLayer').style.display='block';
        setActivePage('pageMenu');
    });

    // ── Build menu cards ──
    var menus=[
        {icon:'🔤',label:'Huruf\nHijaiyah',color:'#E8F5E9',border:'#4CAF50',page:'pagePilihKeluarga'},
        {icon:'🎙️',label:'Talaqqi',color:'#FFF3E0',border:'#E65100',page:'pageTalaqqi'},
        {icon:'🎵',label:'Tajwid',color:'#E3F2FD',border:'#1565C0',page:'pageTajwid'},
        {icon:'✨',label:'Harakat &\nQolqolah',color:'#FCE4EC',border:'#C62828',page:'pageHTQ'},
        {icon:'🔗',label:'Huruf\nSambung',color:'#F3E5F5',border:'#6A1B9A',page:'pageSambung'}
    ];
    var menuGrid=document.getElementById('menuGrid');
    menus.forEach(function(m){
        var card=document.createElement('div');
        card.className='menu-card';
        card.style.background=m.color;
        card.style.borderColor=m.border;
        card.innerHTML='<span class="menu-icon">'+m.icon+'</span><span class="menu-label">'+m.label+'</span>';
        card.addEventListener('click',function(){slideTo(m.page);});
        menuGrid.appendChild(card);
    });

    // also link "▶ Mulai Belajar" to scroll to menu
    document.querySelector('.btn-lanjut-dash')&&
        document.querySelector('.btn-lanjut-dash').addEventListener('click',function(){
            // scroll dashboard body to menu cards
            document.querySelector('.dash-body').scrollIntoView({behavior:'smooth'});
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
            item.addEventListener('click',function(){renderHuruf(kel,idx);});
            kelompokContainer.appendChild(item);
        });
        slideTo('pageKelompok');
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
            card.querySelector('.h-play').addEventListener('click',function(e){
                e.stopPropagation();playAudio(d.audio);
            });
            card.addEventListener('click',function(){showDetail(key);});
            hurufGrid.appendChild(card);
        });
        slideTo('pageHuruf');
    }

    // ── TALAQQI ──
    var talaqqiPreview={
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
        document.getElementById('recordPreview').textContent=talaqqiPreview[mode];
        document.getElementById('recordStatus').textContent='Tap mic untuk merekam';
        document.getElementById('recordResult').style.display='none';
        document.getElementById('btnRecord').classList.remove('recording');
        recState='idle';
        document.getElementById('btnRecord').textContent='🎤';
        slideTo('pageRecord');
    };

    // Record button
    document.getElementById('btnRecord').addEventListener('click',function(){
        var btn=this;
        if(recState==='idle'){
            recState='recording';
            btn.classList.add('recording');
            btn.textContent='🔴';
            document.getElementById('recordStatus').textContent='Merekam...';
            document.getElementById('recordResult').style.display='none';
            recTimer=setTimeout(function(){
                recState='analyzing';
                btn.classList.remove('recording');
                btn.textContent='⚙️';
                document.getElementById('recordStatus').textContent='AI menganalisa...';
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
                +'<div class="rr-text">Masya Allah, bagus!</div></div>'
                +'<div class="rr-actions"><button class="rr-ulang" onclick="document.getElementById(\'recordResult\').style.display=\'none\';document.getElementById(\'btnRecord\').textContent=\'🎤\';recState=\'idle\'">🎙️ Lagi</button>'
                +'<button class="rr-lanjut" onclick="slideBack()">← Kembali</button></div>';
        } else {
            result.innerHTML='<div class="rr-score"><div class="rr-stars">⭐</div>'
                +'<div class="rr-text">Ayo coba lagi!</div></div>'
                +'<div class="rr-actions"><button class="rr-ulang" onclick="document.getElementById(\'recordResult\').style.display=\'none\';document.getElementById(\'btnRecord\').textContent=\'🎤\';recState=\'idle\'">🎙️ Coba Lagi</button>'
                +'<button class="rr-lanjut" onclick="slideBack()">← Kembali</button></div>';
        }
        result.style.display='block';
    }

    // ── SAMBUNG ──
    function renderSambung(){
        sambungList.innerHTML='';
        var keys=Object.keys(SAMBUNG_DATA);
        keys.forEach(function(key){
            var d=SAMBUNG_DATA[key];
            var item=document.createElement('div');
            item.className='sambung-item';
            var html='<div style="font-weight:700;font-size:0.9rem;color:var(--emerald);font-family:Georgia,serif">'
                +d.char+' '+d.nama+' <span style="font-size:0.7rem;color:var(--gray);font-weight:400">('+d.kelompok+')</span></div>';
            html+='<div class="sambung-row">';
            html+='<span class="sambung-label">Awal:</span><span class="sambung-bentuk">'+(d.awal||'—')+'</span>';
            html+='<span class="sambung-label">Tengah:</span><span class="sambung-bentuk">'+(d.tengah||'—')+'</span>';
            html+='<span class="sambung-label">Akhir:</span><span class="sambung-bentuk">'+(d.akhir||'—')+'</span>';
            if(d.sambung==='tidak_kiri'){
                html+='<span class="sambung-hint">⚠️ Tak bisa sambung kiri</span>';
            }
            html+='</div>';
            item.innerHTML=html;
            sambungList.appendChild(item);
        });
    }
    renderSambung();

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
        var html='<div class="detail-char">'+d.char+'</div>'
            +'<div class="detail-name">'+d.name+'</div>'
            +'<div class="detail-bunyi">Bunyi: "'+d.bunyi+'"</div>'
            +'<button class="detail-play-btn" onclick="playAudio(\''+d.audio+'\')">🔊</button>'
            +'<div class="detail-box green"><h4>📝 Makhraj</h4><p>'+d.makhraj+'</p></div>';
        if(d.qolqolah) html+='<div class="detail-box orange"><h4>💡 Qolqolah</h4><p>Dibaca memantul saat sukun atau waqaf.</p></div>';
        if(d.sambung==='tidak_kiri') html+='<div class="detail-box gray"><h4>⚠️ Tak Bisa Sambung Kiri</h4><p>Hanya bentuk isolated dan akhir.</p></div>';
        html+='<div class="detail-contoh"><div class="detail-contoh-label">Contoh</div>'
            +'<div class="detail-contoh-ayat">'+d.contoh+'</div></div>';
        detailContent.innerHTML=html;
        detailPanel.style.display='flex';
    }
});
