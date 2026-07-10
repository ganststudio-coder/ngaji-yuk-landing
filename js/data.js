// ════════════════════════════════════════
// NGAJI YUK! — Data Huruf Hijaiyah
// ════════════════════════════════════════

const KELUARGA = [
    {
        id: 'titik',
        nama: 'Keluarga Titik',
        badge: '🔵',
        bg: '#1B5E3B',
        huruf: ['ba', 'ta', 'tsa']
    },
    {
        id: 'melengkung',
        nama: 'Keluarga Melengkung',
        badge: '🟢',
        bg: '#1565C0',
        huruf: ['jim', 'ha_kecil', 'kha', 'dal', 'dzal', 'ra', 'zai']
    },
    {
        id: 'bergerigi',
        nama: 'Keluarga Bergerigi',
        badge: '🟡',
        bg: '#E65100',
        huruf: ['sin', 'syin', 'shad', 'dhad']
    },
    {
        id: 'unik',
        nama: 'Keluarga Unik',
        badge: '🟣',
        bg: '#6A1B9A',
        huruf: ['tha_besar', 'zha', 'ain', 'ghain', 'fa', 'qaf', 'kaf', 'lam', 'mim', 'nun', 'ha_besar', 'waw', 'ya', 'alif', 'hamzah']
    }
];

const HURUF_DATA = {
    ba:       { char:'ب', name:"Ba'",   audio:'audio/02_huruf_ba.mp3', bunyi:'B', qolqolah:true,  sambung:'bisa',       makhraj:'Kedua bibir',                 contoh:'بِسْمِ' },
    ta:       { char:'ت', name:"Ta'",   audio:'audio/03_huruf_ta.mp3', bunyi:'T', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah di gigi atas',    contoh:'تَوْبَة' },
    tsa:      { char:'ث', name:"Tsa'",  audio:'audio/04_huruf_tsa.mp3', bunyi:'TS',qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah di gigi atas',    contoh:'ثَوَاب' },
    jim:      { char:'ج', name:'Jim',   audio:'audio/05_jim.mp3', bunyi:'J', qolqolah:true,  sambung:'bisa',       makhraj:'Tengah lidah ke langit',      contoh:'جَنَّة' },
    ha_kecil: { char:'ح', name:"Ha'",   audio:'audio/06_ha_kecil.mp3', bunyi:'H', qolqolah:false, sambung:'bisa',       makhraj:'Tengah tenggorokan',          contoh:'حَمْد' },
    kha:      { char:'خ', name:"Kho'",  audio:'audio/07_kha.mp3', bunyi:'KH',qolqolah:false, sambung:'bisa',       makhraj:'Akhir tenggorokan',           contoh:'خَيْر' },
    dal:      { char:'د', name:'Dal',   audio:'audio/08_dal.mp3', bunyi:'D', qolqolah:true,  sambung:'tidak_kiri', makhraj:'Ujung lidah ke gusi',         contoh:'دِين' },
    dzal:     { char:'ذ', name:'Dzal',  audio:'audio/09_dzal.mp3', bunyi:'DZ',qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah ke gigi atas',    contoh:'ذَنب' },
    ra:       { char:'ر', name:"Ro'",   audio:'audio/10_ra.mp3', bunyi:'R', qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah melengkung',       contoh:'رَحْمٰن' },
    zai:      { char:'ز', name:'Zai',   audio:'audio/11_zai.mp3', bunyi:'Z', qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah ke gigi bawah',   contoh:'زَكَاة' },
    sin:      { char:'س', name:'Sin',   audio:'audio/12_sin.mp3', bunyi:'S', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah di gigi bawah',   contoh:'سَلَام' },
    syin:     { char:'ش', name:'Syin',  audio:'audio/13_syin.mp3', bunyi:'SY',qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',      contoh:'شَمْس' },
    shad:     { char:'ص', name:'Shod',  audio:'audio/14_shad.mp3', bunyi:'SH',qolqolah:true,  sambung:'bisa',       makhraj:'Sisi lidah ke langit',        contoh:'صَبْر' },
    dhad:     { char:'ض', name:'Dhod',  audio:'audio/15_dhad.mp3', bunyi:'DH',qolqolah:true,  sambung:'bisa',       makhraj:'Sisi lidah ke geraham',       contoh:'ضَلَال' },
    tha_besar:{ char:'ط', name:"Tho'",  audio:'audio/16_tha_besar.mp3', bunyi:'TH',qolqolah:true, sambung:'bisa',   makhraj:'Ujung lidah ke gusi',         contoh:'طَاعَة' },
    zha:      { char:'ظ', name:"Dzo'",  audio:'audio/17_zha.mp3', bunyi:'DZ',qolqolah:true,  sambung:'bisa',       makhraj:'Ujung lidah ke gigi atas',    contoh:'ظُلْم' },
    ain:      { char:'ع', name:"'Ain",  audio:'audio/18_ain.mp3', bunyi:"'A",qolqolah:false, sambung:'bisa',       makhraj:'Tengah tenggorokan',          contoh:'عِلْم' },
    ghain:    { char:'غ', name:'Ghoin', audio:'audio/19_ghain.mp3', bunyi:'GH',qolqolah:false, sambung:'bisa',      makhraj:'Akhir tenggorokan',           contoh:'غَفُور' },
    fa:       { char:'ف', name:"Fa'",   audio:'audio/20_fa.mp3', bunyi:'F', qolqolah:false, sambung:'bisa',       makhraj:'Bibir bawah + gigi atas',     contoh:'فَرْض' },
    qaf:      { char:'ق', name:'Qof',   audio:'audio/21_qaf.mp3', bunyi:'Q', qolqolah:true,  sambung:'bisa',       makhraj:'Pangkal lidah ke langit',     contoh:'قُرْآن' },
    kaf:      { char:'ك', name:'Kaf',   audio:'audio/22_kaf.mp3', bunyi:'K', qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',      contoh:'كِتَاب' },
    lam:      { char:'ل', name:'Lam',   audio:'audio/23_lam.mp3', bunyi:'L', qolqolah:false, sambung:'bisa',       makhraj:'Sisi lidah ke langit',        contoh:'لَطِيف' },
    mim:      { char:'م', name:'Mim',   audio:'audio/27_mim.mp3', bunyi:'M', qolqolah:false, sambung:'bisa',       makhraj:'Kedua bibir',                 contoh:'مُحَمَّد' },
    nun:      { char:'ن', name:'Nun',   audio:'audio/24_nun.mp3', bunyi:'N', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah ke langit',       contoh:'نُور' },
    ha_besar: { char:'ه', name:"Ha'",   audio:'audio/29_ha_besar.mp3', bunyi:'H', qolqolah:false, sambung:'bisa',  makhraj:'Akhir tenggorokan',           contoh:'هُدَى' },
    waw:      { char:'و', name:'Waw',   audio:'audio/28_waw.mp3', bunyi:'W', qolqolah:false, sambung:'tidak_kiri', makhraj:'Kedua bibir membulat',        contoh:'وَحْدَة' },
    ya:       { char:'ي', name:"Ya'",   audio:'audio/25_ya.mp3', bunyi:'Y', qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',      contoh:'يَمِين' },
    alif:     { char:'ا', name:'Alif',  audio:'audio/26_alif.mp3', bunyi:'A', qolqolah:false, sambung:'tidak_kiri', makhraj:'Rongga tenggorokan',          contoh:'أَحَد' },
    hamzah:   { char:'ء', name:'Hamzah',audio:'audio/30_hamzah.mp3', bunyi:"'A",qolqolah:false, sambung:'tidak_kiri',makhraj:'Ujung tenggorokan',          contoh:'سَأَل' },
};
