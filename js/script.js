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

// 🔊 Play audio function
function playAudio(src, btn) {
    // Hentikan audio yang sedang diputar
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio = null;
    }
    
    const audio = new Audio(src);
    window.currentAudio = audio;
    
    // Update button state
    if (btn) {
        btn.textContent = '⏹️ Memutar...';
        btn.style.opacity = '0.7';
    }
    
    audio.play().then(() => {
        if (btn) {
            btn.textContent = '🔊 Putar Ulang';
            btn.style.opacity = '1';
        }
    }).catch((err) => {
        console.log('Audio error:', err);
        if (btn) {
            btn.textContent = '🔊 Dengarkan';
            btn.style.opacity = '1';
        }
    });
    
    audio.addEventListener('ended', () => {
        if (btn) {
            btn.textContent = '🔊 Dengarkan';
            btn.style.opacity = '1';
        }
        window.currentAudio = null;
    });
}
