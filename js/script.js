// ==========================================
// SCRIPT.JS OPTIMISÉ MOBILE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- COMPTE À REBOURS ---
    const dateCible = new Date("2025-12-13T20:00:00").getTime(); 
    const element = document.getElementById("compte-a-rebours");

    if (element) {
        function mettreAJourCompteARebours() {
            const maintenant = new Date().getTime();
            const distance = dateCible - maintenant;

            const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
            const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secondes = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance > 0) {
                element.innerHTML =
                    `<div class="timer-item"><span class="timer-value">${jours}</span><span class="timer-label">Jours</span></div>` +
                    `<div class="timer-item"><span class="timer-value">${heures}</span><span class="timer-label">Heures</span></div>` +
                    `<div class="timer-item"><span class="timer-value">${minutes}</span><span class="timer-label">Minutes</span></div>` +
                    `<div class="timer-item"><span class="timer-value">${secondes}</span><span class="timer-label">Secondes</span></div>`;
            } else {
                element.innerHTML = "⚽️ <strong>C'est le jour du match !</strong> Allez les Verts ! 💚";
                clearInterval(intervalle); 
            }
        }

        mettreAJourCompteARebours();
        const intervalle = setInterval(mettreAJourCompteARebours, 1000);
    }

    // --- ACCORDÉON CHANTS ---
    const chantTitles = document.querySelectorAll('.chant-title');
    
    chantTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Fermer tous les autres chants
            document.querySelectorAll('.chant-content.active').forEach(activeContent => {
                if (activeContent !== content) {
                    activeContent.style.maxHeight = 0;
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.classList.remove('active');
                }
            });

            // Ouvrir ou fermer le chant cliqué
            if (isActive) {
                content.style.maxHeight = 0;
                content.classList.remove('active');
                title.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; 
                content.classList.add('active');
                title.classList.add('active');
            }
        });
    });

    // --- LIGHTBOX OPTIMISÉE MOBILE ---
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.querySelector('.close-btn');

    if (lightbox) {
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const imageUrl = this.getAttribute('href'); 
                lightboxContent.setAttribute('src', imageUrl);
                lightbox.classList.remove('hidden');
                lightbox.classList.add('visible');
                
                // Empêcher le scroll du body
                document.body.style.overflow = 'hidden';
            });
        });

        // Fermer avec le bouton
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                fermerLightbox();
            });
        }

        // Fermer en cliquant en dehors de l'image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                fermerLightbox();
            }
        });

        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
                fermerLightbox();
            }
        });

        function fermerLightbox() {
            lightbox.classList.remove('visible');
            lightbox.classList.add('hidden');
            lightboxContent.setAttribute('src', '');
            document.body.style.overflow = '';
        }

        // Support des gestes tactiles (swipe pour fermer)
        let startY = 0;
        let currentY = 0;
        
        lightboxContent.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        lightboxContent.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
        });
        
        lightboxContent.addEventListener('touchend', () => {
            if (Math.abs(currentY - startY) > 100) {
                fermerLightbox();
            }
        });
    }

    // --- OPTIMISATION DES PERFORMANCES ---
    // Lazy loading des images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});