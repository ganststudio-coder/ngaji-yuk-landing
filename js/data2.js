// ════════════════════════════════════════
// NGAJI YUK! — Data
// ════════════════════════════════════════

var KELOMPOK_TITIK = [
    { label:'Kelompok 1', huruf:['ba','ta','tsa'] },
    { label:'Kelompok 2', huruf:['jim','ha_kecil','kha'] },
    { label:'Kelompok 3', huruf:['dal','dzal'] },
    { label:'Kelompok 4', huruf:['ra','zai'] },
    { label:'Kelompok 5', huruf:['sin','syin'] },
    { label:'Kelompok 6', huruf:['shad','dhad'] },
    { label:'Kelompok 7', huruf:['tha_besar','zha'] },
    { label:'Kelompok 8', huruf:['ain','ghain'] },
    { label:'Kelompok 9', huruf:['fa','qaf'] }
];

var KELOMPOK_UNIK = [
    { label:'Kelompok Unik', huruf:['alif','lam','mim','ha_besar','waw','kaf','nun','ya','hamzah'] }
];

// Data huruf sambung (29 huruf)
var SAMBUNG_DATA = {
    ba:  { char:'ب', nama:"Ba'",   awal:'بـ', tengah:'ـبـ', akhir:'ـب', sambung:'bisa', kelompok:'Titik' },
    ta:  { char:'ت', nama:"Ta'",   awal:'تـ', tengah:'ـتـ', akhir:'ـت', sambung:'bisa', kelompok:'Titik' },
    tsa: { char:'ث', nama:"Tsa'",  awal:'ثـ', tengah:'ـثـ', akhir:'ـث', sambung:'bisa', kelompok:'Titik' },
    jim: { char:'ج', nama:'Jim',   awal:'جـ', tengah:'ـجـ', akhir:'ـج', sambung:'bisa', kelompok:'Melengkung' },
    ha_kecil:{char:'ح', nama:"Ha'", awal:'حـ', tengah:'ـحـ', akhir:'ـح', sambung:'bisa', kelompok:'Melengkung' },
    kha: { char:'خ', nama:"Kho'",  awal:'خـ', tengah:'ـخـ', akhir:'ـخ', sambung:'bisa', kelompok:'Melengkung' },
    dal: { char:'د', nama:'Dal',   awal:'د', tengah:'', akhir:'ـد', sambung:'tidak_kiri', kelompok:'Melengkung' },
    dzal:{ char:'ذ', nama:'Dzal',  awal:'ذ', tengah:'', akhir:'ـذ', sambung:'tidak_kiri', kelompok:'Melengkung' },
    ra:  { char:'ر', nama:"Ro'",   awal:'ر', tengah:'', akhir:'ـر', sambung:'tidak_kiri', kelompok:'Melengkung' },
    zai: { char:'ز', nama:'Zai',   awal:'ز', tengah:'', akhir:'ـز', sambung:'tidak_kiri', kelompok:'Melengkung' },
    sin: { char:'س', nama:'Sin',   awal:'سـ', tengah:'ـسـ', akhir:'ـس', sambung:'bisa', kelompok:'Bergerigi' },
    syin:{ char:'ش', nama:'Syin',  awal:'شـ', tengah:'ـشـ', akhir:'ـش', sambung:'bisa', kelompok:'Bergerigi' },
    shad:{ char:'ص', nama:'Shod',  awal:'صـ', tengah:'ـصـ', akhir:'ـص', sambung:'bisa', kelompok:'Bergerigi' },
    dhad:{ char:'ض', nama:'Dhod',  awal:'ضـ', tengah:'ـضـ', akhir:'ـض', sambung:'bisa', kelompok:'Bergerigi' },
    tha_besar:{char:'ط', nama:"Tho'", awal:'طـ', tengah:'ـطـ', akhir:'ـط', sambung:'bisa', kelompok:'Unik' },
    zha: { char:'ظ', nama:"Dzo'",  awal:'ظـ', tengah:'ـظـ', akhir:'ـظ', sambung:'bisa', kelompok:'Unik' },
    ain: { char:'ع', nama:"'Ain",  awal:'عـ', tengah:'ـعـ', akhir:'ـع', sambung:'bisa', kelompok:'Unik' },
    ghain:{char:'غ', nama:'Ghoin', awal:'غـ', tengah:'ـغـ', akhir:'ـغ', sambung:'bisa', kelompok:'Unik' },
    fa:  { char:'ف', nama:"Fa'",   awal:'فـ', tengah:'ـفـ', akhir:'ـف', sambung:'bisa', kelompok:'Unik' },
    qaf: { char:'ق', nama:'Qof',   awal:'قـ', tengah:'ـقـ', akhir:'ـق', sambung:'bisa', kelompok:'Unik' },
    kaf: { char:'ك', nama:'Kaf',   awal:'كـ', tengah:'ـكـ', akhir:'ـك', sambung:'bisa', kelompok:'Unik' },
    lam: { char:'ل', nama:'Lam',   awal:'لـ', tengah:'ـلـ', akhir:'ـل', sambung:'bisa', kelompok:'Unik' },
    mim: { char:'م', nama:'Mim',   awal:'مـ', tengah:'ـمـ', akhir:'ـم', sambung:'bisa', kelompok:'Unik' },
    nun: { char:'ن', nama:'Nun',   awal:'نـ', tengah:'ـنـ', akhir:'ـن', sambung:'bisa', kelompok:'Unik' },
    ha_besar:{char:'ه', nama:"Ha'", awal:'هـ', tengah:'ـهـ', akhir:'ـه', sambung:'bisa', kelompok:'Unik' },
    waw: { char:'و', nama:'Waw',   awal:'و', tengah:'', akhir:'ـو', sambung:'tidak_kiri', kelompok:'Unik' },
    ya:  { char:'ي', nama:"Ya'",   awal:'يـ', tengah:'ـيـ', akhir:'ـي', sambung:'bisa', kelompok:'Unik' },
    alif:{ char:'ا', nama:'Alif',  awal:'ا', tengah:'', akhir:'ـا', sambung:'tidak_kiri', kelompok:'Unik' },
    hamzah:{char:'ء', nama:'Hamzah',awal:'ء', tengah:'', akhir:'ـئ', sambung:'tidak_kiri', kelompok:'Unik' }
};

var HURUF_DATA = {
    ba:{char:'ب',name:"Ba'",audio:'audio/02_huruf_ba.mp3',bunyi:'B',qolqolah:true,sambung:'bisa',makhraj:'Kedua bibir',contoh:'بِسْمِ'},
    ta:{char:'ت',name:"Ta'",audio:'audio/03_huruf_ta.mp3',bunyi:'T',qolqolah:false,sambung:'bisa',makhraj:'Ujung lidah di gigi atas',contoh:'تَوْبَة'},
    tsa:{char:'ث',name:"Tsa'",audio:'audio/04_huruf_tsa.mp3',bunyi:'TS',qolqolah:false,sambung:'bisa',makhraj:'Ujung lidah di gigi atas',contoh:'ثَوَاب'},
    jim:{char:'ج',name:'Jim',audio:'audio/05_jim.mp3',bunyi:'J',qolqolah:true,sambung:'bisa',makhraj:'Tengah lidah ke langit',contoh:'جَنَّة'},
    ha_kecil:{char:'ح',name:"Ha'",audio:'audio/06_ha_kecil.mp3',bunyi:'H',qolqolah:false,sambung:'bisa',makhraj:'Tengah tenggorokan',contoh:'حَمْد'},
    kha:{char:'خ',name:"Kho'",audio:'audio/07_kha.mp3',bunyi:'KH',qolqolah:false,sambung:'bisa',makhraj:'Akhir tenggorokan',contoh:'خَيْر'},
    dal:{char:'د',name:'Dal',audio:'audio/08_dal.mp3',bunyi:'D',qolqolah:true,sambung:'tidak_kiri',makhraj:'Ujung lidah ke gusi',contoh:'دِين'},
    dzal:{char:'ذ',name:'Dzal',audio:'audio/09_dzal.mp3',bunyi:'DZ',qolqolah:false,sambung:'tidak_kiri',makhraj:'Ujung lidah ke gigi atas',contoh:'ذَنب'},
    ra:{char:'ر',name:"Ro'",audio:'audio/10_ra.mp3',bunyi:'R',qolqolah:false,sambung:'tidak_kiri',makhraj:'Ujung lidah melengkung',contoh:'رَحْمٰن'},
    zai:{char:'ز',name:'Zai',audio:'audio/11_zai.mp3',bunyi:'Z',qolqolah:false,sambung:'tidak_kiri',makhraj:'Ujung lidah ke gigi bawah',contoh:'زَكَاة'},
    sin:{char:'س',name:'Sin',audio:'audio/12_sin.mp3',bunyi:'S',qolqolah:false,sambung:'bisa',makhraj:'Ujung lidah di gigi bawah',contoh:'سَلَام'},
    syin:{char:'ش',name:'Syin',audio:'audio/13_syin.mp3',bunyi:'SY',qolqolah:false,sambung:'bisa',makhraj:'Tengah lidah ke langit',contoh:'شَمْس'},
    shad:{char:'ص',name:'Shod',audio:'audio/14_shad.mp3',bunyi:'SH',qolqolah:true,sambung:'bisa',makhraj:'Sisi lidah ke langit',contoh:'صَبْر'},
    dhad:{char:'ض',name:'Dhod',audio:'audio/15_dhad.mp3',bunyi:'DH',qolqolah:true,sambung:'bisa',makhraj:'Sisi lidah ke geraham',contoh:'ضَلَال'},
    tha_besar:{char:'ط',name:"Tho'",audio:'audio/16_tha_besar.mp3',bunyi:'TH',qolqolah:true,sambung:'bisa',makhraj:'Ujung lidah ke gusi',contoh:'طَاعَة'},
    zha:{char:'ظ',name:"Dzo'",audio:'audio/17_zha.mp3',bunyi:'DZ',qolqolah:true,sambung:'bisa',makhraj:'Ujung lidah ke gigi atas',contoh:'ظُلْم'},
    ain:{char:'ع',name:"'Ain",audio:'audio/18_ain.mp3',bunyi:"'A",qolqolah:false,sambung:'bisa',makhraj:'Tengah tenggorokan',contoh:'عِلْم'},
    ghain:{char:'غ',name:'Ghoin',audio:'audio/19_ghain.mp3',bunyi:'GH',qolqolah:false,sambung:'bisa',makhraj:'Akhir tenggorokan',contoh:'غَفُور'},
    fa:{char:'ف',name:"Fa'",audio:'audio/20_fa.mp3',bunyi:'F',qolqolah:false,sambung:'bisa',makhraj:'Bibir bawah + gigi atas',contoh:'فَرْض'},
    qaf:{char:'ق',name:'Qof',audio:'audio/21_qaf.mp3',bunyi:'Q',qolqolah:true,sambung:'bisa',makhraj:'Pangkal lidah ke langit',contoh:'قُرْآن'},
    kaf:{char:'ك',name:'Kaf',audio:'audio/22_kaf.mp3',bunyi:'K',qolqolah:false,sambung:'bisa',makhraj:'Tengah lidah ke langit',contoh:'كِتَاب'},
    lam:{char:'ل',name:'Lam',audio:'audio/23_lam.mp3',bunyi:'L',qolqolah:false,sambung:'bisa',makhraj:'Sisi lidah ke langit',contoh:'لَطِيف'},
    mim:{char:'م',name:'Mim',audio:'audio/27_mim.mp3',bunyi:'M',qolqolah:false,sambung:'bisa',makhraj:'Kedua bibir',contoh:'مُحَمَّد'},
    nun:{char:'ن',name:'Nun',audio:'audio/24_nun.mp3',bunyi:'N',qolqolah:false,sambung:'bisa',makhraj:'Ujung lidah ke langit',contoh:'نُور'},
    ha_besar:{char:'ه',name:"Ha'",audio:'audio/29_ha_besar.mp3',bunyi:'H',qolqolah:false,sambung:'bisa',makhraj:'Akhir tenggorokan',contoh:'هُدَى'},
    waw:{char:'و',name:'Waw',audio:'audio/28_waw.mp3',bunyi:'W',qolqolah:false,sambung:'tidak_kiri',makhraj:'Kedua bibir membulat',contoh:'وَحْدَة'},
    ya:{char:'ي',name:"Ya'",audio:'audio/25_ya.mp3',bunyi:'Y',qolqolah:false,sambung:'bisa',makhraj:'Tengah lidah ke langit',contoh:'يَمِين'},
    alif:{char:'ا',name:'Alif',audio:'audio/26_alif.mp3',bunyi:'A',qolqolah:false,sambung:'tidak_kiri',makhraj:'Rongga tenggorokan',contoh:'أَحَد'},
    hamzah:{char:'ء',name:'Hamzah',audio:'audio/30_hamzah.mp3',bunyi:"'A",qolqolah:false,sambung:'tidak_kiri',makhraj:'Ujung tenggorokan',contoh:'سَأَل'}
};

// ════════════════════════════════════════
// HARAKAT VO — Audio per huruf
// ════════════════════════════════════════
var HARAKAT_AUDIO = {
    ba:'audio/harakat/1.ba-bi-bu.mp3', ta:'audio/harakat/2.ta-ti-tu.mp3', tsa:'audio/harakat/3.tsa-tsi-tsu.mp3',
    jim:'audio/harakat/4.ja-ji-ju.mp3', ha_kecil:'audio/harakat/5.ha-hi-hu.mp3', kha:'audio/harakat/6.kho-khi-khu.mp3',
    dal:'audio/harakat/7.da-di-du.mp3', dzal:'audio/harakat/8.dza-dzi-dzu.mp3', ra:'audio/harakat/9.ro-ri-ru.mp3',
    zai:'audio/harakat/10.za-zi-zu.mp3', sin:'audio/harakat/11.sa-si-su.mp3', syin:'audio/harakat/12.sya-syi-syu.mp3',
    shad:'audio/harakat/13.sha-shi-su.mp3', dhad:'audio/harakat/14.dho-dhi-dhu.mp3', tha_besar:'audio/harakat/15.tho-thi-thu.mp3',
    zha:'audio/harakat/16.zho-zhi-zhu.mp3', ain:'audio/harakat/17.Aa-Ii-Uu.mp3', ghain:'audio/harakat/18.gho-ghi-ghu.mp3',
    fa:'audio/harakat/19.fa-fi-fu.mp3', qaf:'audio/harakat/20.ko-ki-ku.mp3', kaf:'audio/harakat/21.ka-ki-ku.mp3',
    lam:'audio/harakat/22.la-li-lu.mp3', mim:'audio/harakat/23.ma-mi-mu.mp3', nun:'audio/harakat/24.na-ni-nu.mp3',
    ha_besar:'audio/harakat/26.ha-hi-hu.mp3', waw:'audio/harakat/25.wa-wi-wu.mp3',
    alif:'audio/harakat/28-alif-a-i-u.mp3', hamzah:'audio/harakat/27-hamza-a-i-u.mp3'
};
