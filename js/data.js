// ════════════════════════════════════════
// NGAJI YUK! — Data
// ════════════════════════════════════════

// Keluarga Titik — 20 huruf
var KELOMPOK_TITIK = [
    { label:'Kelompok 1', huruf:['ba','ta','tsa'], desc:'3 titik — bawah, atas × 2, atas × 3' },
    { label:'Kelompok 2', huruf:['jim','ha_kecil','kha'], desc:'Tanpa titik, tengah kosong, 1 titik' },
    { label:'Kelompok 3', huruf:['dal','dzal'], desc:'1 titik, 1 titik — ⚠️ tidak sambung kiri' },
    { label:'Kelompok 4', huruf:['ra','zai'], desc:'Tanpa titik, 1 titik — ⚠️ tidak sambung kiri' },
    { label:'Kelompok 5', huruf:['sin','syin'], desc:'3 gigi tanpa titik, 3 gigi 3 titik' },
    { label:'Kelompok 6', huruf:['shad','dhad'], desc:'Lingkaran besar, 1 titik di atas' },
    { label:'Kelompok 7', huruf:['tha_besar','zha'], desc:'Lingkaran+tongkat, 1 titik di atas' },
    { label:'Kelompok 8', huruf:['ain','ghain'], desc:'Mata terbuka, 1 titik di atas' },
    { label:'Kelompok 9', huruf:['fa','qaf'], desc:'Mangkuk+1 titik, 2 ekor' }
];

// Keluarga Unik — 9 huruf
var KELOMPOK_UNIK = [
    { label:'Kelompok Unik', huruf:['alif','lam','mim','ha_besar','waw','kaf','nun','ya','hamzah'], desc:'Bentuk istimewa — 9 huruf' }
];

var HURUF_DATA = {
    ba:       { char:'ب', name:"Ba'",   audio:'audio/02_huruf_ba.mp3', bunyi:'B', qolqolah:true,  sambung:'bisa',       makhraj:'Kedua bibir',                       contoh:'بِسْمِ' },
    ta:       { char:'ت', name:"Ta'",   audio:'audio/03_huruf_ta.mp3', bunyi:'T', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah di atas gigi',          contoh:'تَوْبَة' },
    tsa:      { char:'ث', name:"Tsa'",  audio:'audio/04_huruf_tsa.mp3', bunyi:'TS',qolqolah:false, sambung:'bisa',      makhraj:'Ujung lidah di gigi atas',          contoh:'ثَوَاب' },
    jim:      { char:'ج', name:'Jim',   audio:'audio/05_jim.mp3', bunyi:'J', qolqolah:true,  sambung:'bisa',       makhraj:'Tengah lidah ke langit-langit',     contoh:'جَنَّة' },
    ha_kecil: { char:'ح', name:"Ha'",   audio:'audio/06_ha_kecil.mp3', bunyi:'H', qolqolah:false, sambung:'bisa',      makhraj:'Tengah tenggorokan',                contoh:'حَمْد' },
    kha:      { char:'خ', name:"Kho'",  audio:'audio/07_kha.mp3', bunyi:'KH',qolqolah:false, sambung:'bisa',       makhraj:'Akhir tenggorokan',                 contoh:'خَيْر' },
    dal:      { char:'د', name:'Dal',   audio:'audio/08_dal.mp3', bunyi:'D', qolqolah:true,  sambung:'tidak_kiri', makhraj:'Ujung lidah ke gusi',          contoh:'دِين' },
    dzal:     { char:'ذ', name:'Dzal',  audio:'audio/09_dzal.mp3', bunyi:'DZ',qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah ke gigi atas',     contoh:'ذَنب' },
    ra:       { char:'ر', name:"Ro'",   audio:'audio/10_ra.mp3', bunyi:'R', qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah melengkung ke langit',       contoh:'رَحْمٰن' },
    zai:      { char:'ز', name:'Zai',   audio:'audio/11_zai.mp3', bunyi:'Z', qolqolah:false, sambung:'tidak_kiri', makhraj:'Ujung lidah ke ujung gigi',       contoh:'زَكَاة' },
    sin:      { char:'س', name:'Sin',   audio:'audio/12_sin.mp3', bunyi:'S', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah di gigi bawah',         contoh:'سَلَام' },
    syin:     { char:'ش', name:'Syin',  audio:'audio/13_syin.mp3', bunyi:'SY',qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',            contoh:'شَمْس' },
    shad:     { char:'ص', name:'Shod',  audio:'audio/14_shad.mp3', bunyi:'SH',qolqolah:true,  sambung:'bisa',       makhraj:'Sisi lidah ke langit',              contoh:'صَبْر' },
    dhad:     { char:'ض', name:'Dhod',  audio:'audio/15_dhad.mp3', bunyi:'DH',qolqolah:true,  sambung:'bisa',       makhraj:'Sisi lidah ke geraham',             contoh:'ضَلَال' },
    tha_besar:{ char:'ط', name:"Tho'",  audio:'audio/16_tha_besar.mp3', bunyi:'TH',qolqolah:true, sambung:'bisa', makhraj:'Ujung lidah ke gusi',           contoh:'طَاعَة' },
    zha:      { char:'ظ', name:"Dzo'",  audio:'audio/17_zha.mp3', bunyi:'DZ',qolqolah:true,  sambung:'bisa',       makhraj:'Ujung lidah ke gigi atas',          contoh:'ظُلْم' },
    ain:      { char:'ع', name:"'Ain",  audio:'audio/18_ain.mp3', bunyi:"'A",qolqolah:false, sambung:'bisa',       makhraj:'Tengah tenggorokan',                contoh:'عِلْم' },
    ghain:    { char:'غ', name:'Ghoin', audio:'audio/19_ghain.mp3', bunyi:'GH',qolqolah:false, sambung:'bisa',      makhraj:'Akhir tenggorokan',                 contoh:'غَفُور' },
    fa:       { char:'ف', name:"Fa'",   audio:'audio/20_fa.mp3', bunyi:'F', qolqolah:false, sambung:'bisa',       makhraj:'Bibir bawah + gigi atas',           contoh:'فَرْض' },
    qaf:      { char:'ق', name:'Qof',   audio:'audio/21_qaf.mp3', bunyi:'Q', qolqolah:true,  sambung:'bisa',       makhraj:'Pangkal lidah ke langit',           contoh:'قُرْآن' },
    kaf:      { char:'ك', name:'Kaf',   audio:'audio/22_kaf.mp3', bunyi:'K', qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',            contoh:'كِتَاب' },
    lam:      { char:'ل', name:'Lam',   audio:'audio/23_lam.mp3', bunyi:'L', qolqolah:false, sambung:'bisa',       makhraj:'Sisi lidah ke langit',              contoh:'لَطِيف' },
    mim:      { char:'م', name:'Mim',   audio:'audio/27_mim.mp3', bunyi:'M', qolqolah:false, sambung:'bisa',       makhraj:'Kedua bibir',                       contoh:'مُحَمَّد' },
    nun:      { char:'ن', name:'Nun',   audio:'audio/24_nun.mp3', bunyi:'N', qolqolah:false, sambung:'bisa',       makhraj:'Ujung lidah ke langit',             contoh:'نُور' },
    ha_besar: { char:'ه', name:"Ha'",   audio:'audio/29_ha_besar.mp3', bunyi:'H', qolqolah:false, sambung:'bisa',  makhraj:'Akhir tenggorokan',             contoh:'هُدَى' },
    waw:      { char:'و', name:'Waw',   audio:'audio/28_waw.mp3', bunyi:'W', qolqolah:false, sambung:'tidak_kiri', makhraj:'Kedua bibir membulat',          contoh:'وَحْدَة' },
    ya:       { char:'ي', name:"Ya'",   audio:'audio/25_ya.mp3', bunyi:'Y', qolqolah:false, sambung:'bisa',       makhraj:'Tengah lidah ke langit',            contoh:'يَمِين' },
    alif:     { char:'ا', name:'Alif',  audio:'audio/26_alif.mp3', bunyi:'A', qolqolah:false, sambung:'tidak_kiri', makhraj:'Rongga tenggorokan',            contoh:'أَحَد' },
    hamzah:   { char:'ء', name:'Hamzah',audio:'audio/30_hamzah.mp3', bunyi:"'A",qolqolah:false, sambung:'tidak_kiri',makhraj:'Ujung tenggorokan',            contoh:'سَأَل' },
};
