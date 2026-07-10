// ========================================
// NGAJI YUK! - Landing Page Script
// ========================================

// 📚 Data Huruf Hijaiyah
const hurufData = [
    { huruf: 'ب', nama: "Ba'", audio: 'audio/02_huruf_ba.mp3', ket: 'Satu titik di bawah, seperti perahu kecil', makhraj: 'Kedua bibir' },
    { huruf: 'ت', nama: "Ta'", audio: 'audio/03_huruf_ta.mp3', ket: 'Dua titik di atas, seperti dua mata', makhraj: 'Ujung lidah & pangkal gigi atas' },
    { huruf: 'ث', nama: "Tsa'", audio: 'audio/04_huruf_tsa.mp3', ket: 'Tiga titik di atas, seperti tiga bintang ⭐', makhraj: 'Ujung lidah dijepit gigi depan' },
    { huruf: 'ج', nama: 'Jim', audio: 'audio/05_jim.mp3', ket: 'Seperti bulan sabit, tanpa titik', makhraj: 'Tengah lidah & langit-langit' },
    { huruf: 'ح', nama: "Ha'", audio: 'audio/06_ha_kecil.mp3', ket: 'Seperti bulan sabit, tengah kosong', makhraj: 'Tengah tenggorokan' },
    { huruf: 'خ', nama: "Kho'", audio: 'audio/07_kha.mp3', ket: 'Seperti bulan sabit, titik di atas', makhraj: 'Ujung tenggorokan (atas)' },
    { huruf: 'د', nama: 'Dal', audio: 'audio/08_dal.mp3', ket: 'Lengkungan seperti pisang', makhraj: 'Ujung lidah & langit-langit depan' },
    { huruf: 'ذ', nama: 'Dzal', audio: 'audio/09_dzal.mp3', ket: 'Dal dengan titik di atas', makhraj: 'Ujung lidah & ujung gigi atas' },
    { huruf: 'ر', nama: "Ro'", audio: 'audio/10_ra.mp3', ket: 'Melengkung kecil ke kanan', makhraj: 'Ujung lidah & langit-langit' },
    { huruf: 'ز', nama: 'Zai', audio: 'audio/11_zai.mp3', ket: "Ro' dengan titik di atas", makhraj: 'Ujung lidah & ujung gigi atas' },
    { huruf: 'س', nama: 'Sin', audio: 'audio/12_sin.mp3', ket: 'Seperti gigi gergaji, tiga gigi', makhraj: 'Ujung lidah & gigi bawah' },
    { huruf: 'ش', nama: 'Syin', audio: 'audio/13_syin.mp3', ket: 'Sin dengan tiga titik di atas', makhraj: 'Tengah lidah & langit-langit' },
    { huruf: 'ص', nama: 'Shod', audio: 'audio/14_shad.mp3', ket: 'Seperti lingkaran besar', makhraj: 'Ujung lidah & langit-langit (tebal)' },
    { huruf: 'ض', nama: 'Dhod', audio: 'audio/15_dhad.mp3', ket: 'Shod dengan titik di atas', makhraj: 'Samping lidah & geraham' },
    { huruf: 'ط', nama: "Tho'", audio: 'audio/16_tha_besar.mp3', ket: 'Lingkaran dengan tongkat', makhraj: 'Ujung lidah & langit-langit (tebal)' },
    { huruf: 'ظ', nama: "Dzo'", audio: 'audio/17_zha.mp3', ket: "Tho' dengan titik di atas", makhraj: 'Ujung lidah & ujung gigi atas (tebal)' },
    { huruf: 'ع', nama: "'Ain", audio: 'audio/18_ain.mp3', ket: 'Seperti mata terbuka', makhraj: 'Tengah tenggorokan' },
    { huruf: 'غ', nama: 'Ghoin', audio: 'audio/19_ghain.mp3', ket: "'Ain dengan titik di atas", makhraj: 'Ujung tenggorokan (atas)' },
    { huruf: 'ف', nama: "Fa'", audio: 'audio/20_fa.mp3', ket: 'Seperti mangkuk, titik di atas', makhraj: 'Bibir bawah & gigi atas' },
    { huruf: 'ق', nama: 'Qof', audio: 'audio/21_qaf.mp3', ket: 'Lingkaran dengan dua ekor', makhraj: 'Pangkal lidah & langit-langit belakang' },
    { huruf: 'ك', nama: 'Kaf', audio: 'audio/22_kaf.mp3', ket: 'Seperti pohon tegak', makhraj: 'Pangkal lidah (depan Qof)' },
    { huruf: 'ل', nama: 'Lam', audio: 'audio/23_lam.mp3', ket: 'Seperti tongkat bengkok', makhraj: 'Ujung lidah & langit-langit' },
    { huruf: 'م', nama: 'Mim', audio: 'audio/24_nun.mp3', ket: 'Lingkaran penuh', makhraj: 'Kedua bibir' },
    { huruf: 'ن', nama: 'Nun', audio: 'audio/24_nun.mp3', ket: 'Seperti mangkuk, titik di atas', makhraj: 'Ujung lidah & langit-langit' },
    { huruf: 'ه', nama: "Ha'", audio: 'audio/29_ha_besar.mp3', ket: 'Dua lingkaran menyatu', makhraj: 'Ujung tenggorokan' },
    { huruf: 'و', nama: 'Waw', audio: 'audio/28_waw.mp3', ket: 'Seperti koma terbalik', makhraj: 'Bibir dibulatkan' },
    { huruf: 'ي', nama: "Ya'", audio: 'audio/25_ya.mp3', ket: 'Seperti perahu, dua titik di bawah', makhraj: 'Tengah lidah & langit-langit' },
    { huruf: 'ا', nama: 'Alif', audio: 'audio/26_alif.mp3', ket: 'Lurus seperti tongkat, huruf istimewa', makhraj: 'Rongga tenggorokan' },
    { huruf: 'ء', nama: 'Hamzah', audio: 'audio/30_hamzah.mp3', ket: "Seperti kepala 'ain kecil", makhraj: 'Pangkal tenggorokan' },
];

let currentIndex = 0;
let currentAudio = null;

// 🎯 Fungsi Navigasi
function updateHuruf() {
    const data = hurufData[currentIndex];
    const display = document.getElementById('hurufDisplay');
    const nama = document.getElementById('hurufNama');
    const ket = document.getElementById('hurufKeterangan');
    const makhraj = document.getElementById('hurufMakhraj');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (!display) return;
    
    // Animasi transisi
    display.style.transform = 'scale(0.5)';
    display.style.opacity = '0';
    
    setTimeout(() => {
        display.textContent = data.huruf;
        display.style.transform = 'scale(1)';
        display.style.opacity = '1';
    }, 150);
    
    nama.textContent = data.nama;
    ket.textContent = data.ket;
    makhraj.textContent = '📍 ' + data.makhraj;
    
    // Update tombol navigasi
    btnPrev.disabled = (currentIndex === 0);
    btnNext.disabled = (currentIndex === hurufData.length - 1);
    btnPrev.style.opacity = (currentIndex === 0) ? '0.3' : '1';
    btnNext.style.opacity = (currentIndex === hurufData.length - 1) ? '0.3' : '1';
}

function nextHuruf() {
    if (currentIndex < hurufData.length - 1) {
        currentIndex++;
        updateHuruf();
        // Reset tombol play
        const btnPlay = document.querySelector('.btn-play');
        if (btnPlay) {
            btnPlay.textContent = '🔊 Dengarkan';
            btnPlay.style.opacity = '1';
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
    }
}

function prevHuruf() {
    if (currentIndex > 0) {
        currentIndex--;
        updateHuruf();
        const btnPlay = document.querySelector('.btn-play');
        if (btnPlay) {
            btnPlay.textContent = '🔊 Dengarkan';
            btnPlay.style.opacity = '1';
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
    }
}

// 🔊 Fungsi Play Audio
function playCurrentHuruf() {
    const data = hurufData[currentIndex];
    const btnPlay = document.querySelector('.btn-play');
    
    if (!data.audio) {
        alert('🔊 Audio untuk huruf ini belum tersedia.');
        return;
    }
    
    // Hentikan audio sebelumnya
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    const audio = new Audio(data.audio);
    currentAudio = audio;
    
    btnPlay.textContent = '⏹️ Memutar...';
    btnPlay.style.opacity = '0.7';
    
    audio.play().then(() => {
        btnPlay.textContent = '🔊 Putar Ulang';
        btnPlay.style.opacity = '1';
    }).catch((err) => {
        console.log('Audio error:', err);
        btnPlay.textContent = '🔊 Dengarkan';
        btnPlay.style.opacity = '1';
        alert('Maaf, audio belum bisa diputar di sini. Coba buka di browser lain ya!');
    });
    
    audio.addEventListener('ended', () => {
        btnPlay.textContent = '🔊 Dengarkan';
        btnPlay.style.opacity = '1';
        currentAudio = null;
    });
}

// ✨ Inisialisasi setelah halaman siap
document.addEventListener('DOMContentLoaded', function() {
    // Init huruf
    updateHuruf();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextHuruf();
        if (e.key === 'ArrowLeft') prevHuruf();
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            playCurrentHuruf();
        }
    });

    // Nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Sticky header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Animate progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') || entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        if (width && width !== '0%') {
            bar.setAttribute('data-width', width);
            bar.style.width = '0%';
            observer.observe(bar);
        }
    });
});
