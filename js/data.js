// ════════════════════════════════════════
// NGAJI YUK! — Data Huruf Hijaiyah
// ════════════════════════════════════════

// Keluarga & mapping huruf
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
    ba:       { char: 'ب', name: "Ba'",   audio: 'audio/02_huruf_ba.mp3', bunyi: 'B', qolqolah: true, makhraj: 'Kedua bibir',    sambung: 'bisa', contoh: 'بِسْمِ' },
    ta:       { char: 'ت', name: "Ta'",   audio: 'audio/03_huruf_ta.mp3', bunyi: 'T', qolqolah: false, makhraj: 'Ujung lidah di atas gigi', sambung: 'bisa', contoh: 'تَوْبَة' },
    tsa:      { char: 'ث', name: "Tsa'",  audio: 'audio/04_huruf_tsa.mp3', bunyi: 'TS', qolqolah: false, makhraj: 'Ujung lidah di gigi atas', sambung: 'bisa', contoh: 'ثَوَاب' },
    jim:      { char: 'ج', name: 'Jim',   audio: 'audio/05_jim.mp3', bunyi: 'J', qolqolah: true, makhraj: 'Tengah lidah ke langit-langit', sambung: 'bisa', contoh: 'جَنَّة' },
    ha_kecil: { char: 'ح', name: "Ha'",   audio: 'audio/06_ha_kecil.mp3', bunyi: 'H', qolqolah: false, makhraj: 'Tengah tenggorokan', sambung: 'bisa', contoh: 'حَمْد' },
    kha:      { char: 'خ', name: "Kho'",  audio: 'audio/07_kha.mp3', bunyi: 'KH', qolqolah: false, makhraj: 'Akhir tenggorokan', sambung: 'bisa', contoh: 'خَيْر' },
    dal:      { char: 'د', name: 'Dal',   audio: 'audio/08_dal.mp3', bunyi: 'D', qolqolah: true, makhraj: 'Ujung lidah ke gusi', sambung: 'tidak_kiri', contoh: 'دِين' },
    dzal:     { char: 'ذ', name: 'Dzal',  audio: 'audio/09_dzal.mp3', bunyi: 'DZ', qolqolah: false, makhraj: 'Ujung lidah ke gigi atas', sambung: 'tidak_kiri', contoh: 'ذَنب' },
    ra:       { char: 'ر', name: "Ro'",   audio: 'audio/10_ra.mp3', bunyi: 'R', qolqolah: false, makhraj: 'Ujung lidah melengkung ke langit', sambung: 'tidak_kiri', contoh: 'رَحْمٰن' },
    zai:      { char: 'ز', name: 'Zai',   audio: 'audio/11_zai.mp3', bunyi: 'Z', qolqolah: false, makhraj: 'Ujung lidah ke ujung gigi', sambung: 'tidak_kiri', contoh: 'زَكَاة' },
    sin:      { char: 'س', name: 'Sin',   audio: 'audio/12_sin.mp3', bunyi: 'S', qolqolah: false, makhraj: 'Ujung lidah di gigi bawah', sambung: 'bisa', contoh: 'سَلَام' },
    syin:     { char: 'ش', name: 'Syin',  audio: 'audio/13_syin.mp3', bunyi: 'SY', qolqolah: false, makhraj: 'Tengah lidah ke langit', sambung: 'bisa', contoh: 'شَمْس' },
    shad:     { char: 'ص', name: 'Shod',  audio: 'audio/14_shad.mp3', bunyi: 'SH', qolqolah: true, makhraj: 'Sisi lidah ke langit', sambung: 'bisa', contoh: 'صَبْر' },
    dhad:     { char: 'ض', name: 'Dhod',  audio: 'audio/15_dhad.mp3', bunyi: 'DH', qolqolah: true, makhraj: 'Sisi lidah ke geraham', sambung: 'bisa', contoh: 'ضَلَال' },
    tha_besar:{ char: 'ط', name: "Tho'",  audio: 'audio/16_tha_besar.mp3', bunyi: 'TH', qolqolah: true, makhraj: 'Ujung lidah ke gusi', sambung: 'bisa', contoh: 'طَاعَة' },
    zha:      { char: 'ظ', name: "Dzo'",  audio: 'audio/17_zha.mp3', bunyi: 'DZ', qolqolah: true, makhraj: 'Ujung lidah ke gigi atas', sambung: 'bisa', contoh: 'ظُلْم' },
    ain:      { char: 'ع', name: "'Ain",  audio: 'audio/18_ain.mp3', bunyi: "'A", qolqolah: false, makhraj: 'Tengah tenggorokan', sambung: 'bisa', contoh: 'عِلْم' },
    ghain:    { char: 'غ', name: 'Ghoin', audio: 'audio/19_ghain.mp3', bunyi: 'GH', qolqolah: false, makhraj: 'Akhir tenggorokan', sambung: 'bisa', contoh: 'غَفُور' },
    fa:       { char: 'ف', name: "Fa'",   audio: 'audio/20_fa.mp3', bunyi: 'F', qolqolah: false, makhraj: 'Bibir bawah + gigi atas', sambung: 'bisa', contoh: 'فَرْض' },
    qaf:      { char: 'ق', name: 'Qof',   audio: 'audio/21_qaf.mp3', bunyi: 'Q', qolqolah: true, makhraj: 'Pangkal lidah ke langit', sambung: 'bisa', contoh: 'قُرْآن' },
    kaf:      { char: 'ك', name: 'Kaf',   audio: 'audio/22_kaf.mp3', bunyi: 'K', qolqolah: false, makhraj: 'Tengah lidah ke langit', sambung: 'bisa', contoh: 'كِتَاب' },
    lam:      { char: 'ل', name: 'Lam',   audio: 'audio/23_lam.mp3', bunyi: 'L', qolqolah: false, makhraj: 'Sisi lidah ke langit', sambung: 'bisa', contoh: 'لَطِيف' },
    mim:      { char: 'م', name: 'Mim',   audio: 'audio/27_mim.mp3', bunyi: 'M', qolqolah: false, makhraj: 'Kedua bibir', sambung: 'bisa', contoh: 'مُحَمَّد' },
    nun:      { char: 'ن', name: 'Nun',   audio: 'audio/24_nun.mp3', bunyi: 'N', qolqolah: false, makhraj: 'Ujung lidah ke langit', sambung: 'bisa', contoh: 'نُور' },
    ha_besar: { char: 'ه', name: "Ha'",   audio: 'audio/29_ha_besar.mp3', bunyi: 'H', qolqolah: false, makhraj: 'Akhir tenggorokan', sambung: 'bisa', contoh: 'هُدَى' },
    waw:      { char: 'و', name: 'Waw',   audio: 'audio/28_waw.mp3', bunyi: 'W', qolqolah: false, makhraj: 'Kedua bibir membulat', sambung: 'tidak_kiri', contoh: 'وَحْدَة' },
    ya:       { char: 'ي', name: "Ya'",   audio: 'audio/25_ya.mp3', bunyi: 'Y', qolqolah: false, makhraj: 'Tengah lidah ke langit', sambung: 'bisa', contoh: 'يَمِين' },
    alif:     { char: 'ا', name: 'Alif',  audio: 'audio/26_alif.mp3', bunyi: 'A', qolqolah: false, makhraj: 'Rongga tenggorokan', sambung: 'tidak_kiri', contoh: 'أَحَد' },
    hamzah:   { char: 'ء', name: 'Hamzah', audio: 'audio/30_hamzah.mp3', bunyi: "'A", qolqolah: false, makhraj: 'Ujung tenggorokan', sambung: 'tidak_kiri', contoh: 'سَأَل' },
};
