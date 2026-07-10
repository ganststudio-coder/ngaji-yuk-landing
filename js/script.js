// ========================================
// NGAJI YUK! - Landing Page Script
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }

    // Close nav on click link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Sticky header shadow
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Animate progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') || entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
        observer.observe(bar);
    });
});

// 🔊 Preview play button (hero) - placeholder
function playPreview() {
    // Cek apakah ada audio preview
    const audioSrc = 'audio/preview_ba.mp3';
    
    // Coba play audio kalo ada
    const audio = new Audio(audioSrc);
    audio.play().then(() => {
        console.log('🔊 Memutar preview...');
    }).catch(() => {
        // Fallback kalo file belum ada
        alert('🔊 Preview audio akan tersedia di aplikasi penuh!');
    });
}
