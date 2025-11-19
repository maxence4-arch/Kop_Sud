document.addEventListener('DOMContentLoaded', () => {

    // --- ✅ MISE À JOUR : LA DATE EST MAINTENANT LE 22 NOVEMBRE 2025 À 20H00 ✅ ---
    // Format : "AAAA-MM-JJTHH:MM:SS" 
    const dateCible = new Date("2025-11-22T20:00:00").getTime(); 
    
    const element = document.getElementById("compte-a-rebours");

    // S'assure que l'élément existe avant de lancer le timer (utile pour les autres pages)
    if (!element) return; 

    function mettreAJourCompteARebours() {
        const maintenant = new Date().getTime();
        const distance = dateCible - maintenant;

        // Calculs
        const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
        const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
            // NOUVELLE STRUCTURE HTML DYNAMIQUE :
            element.innerHTML =
                `<div class="timer-item"><span class="timer-value">${jours}</span><span class="timer-label">Jours</span></div>` +
                `<div class="timer-item"><span class="timer-value">${heures}</span><span class="timer-label">Heures</span></div>` +
                `<div class="timer-item"><span class="timer-value">${minutes}</span><span class="timer-label">Minutes</span></div>` +
                `<div class="timer-item"><span class="timer-value">${secondes}</span><span class="timer-label">Secondes</span></div>`;
        } else {
            // Le compte à rebours est terminé
            element.innerHTML = "⚽️ **C'est le jour du match !** Allez les Verts ! 💚";
            clearInterval(intervalle); 
        }
    }

    mettreAJourCompteARebours();
    // Lance l'intervalle d'une seconde
    const intervalle = setInterval(mettreAJourCompteARebours, 1000);
});

// --- LOGIQUE CHANTS DE SUPPORTERS (ACCORDÉON) ---

document.addEventListener('DOMContentLoaded', () => {
    // Ne rien faire si nous ne sommes pas sur la page des chants (pour la robustesse)
    if (!document.getElementById('chants-accordion')) return; 

    // Récupère tous les titres cliquables
    const chantTitles = document.querySelectorAll('.chant-title');

    chantTitles.forEach(title => {
        title.addEventListener('click', () => {
            // Récupère le conteneur du contenu (paroles + audio)
            const content = title.nextElementSibling;
            
            // Vérifie si l'élément est actuellement ouvert (via la classe 'active')
            const isContentActive = content.classList.contains('active');

            // 1. Fermer tous les autres chants OU s'assurer qu'ils sont fermés
            document.querySelectorAll('.chant-content.active').forEach(activeContent => {
                // Seulement si ce n'est pas l'élément que nous sommes sur le point d'ouvrir
                if (activeContent !== content) {
                    activeContent.style.maxHeight = 0;
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.classList.remove('active');
                }
            });

            // 2. Ouvrir ou fermer le chant cliqué
            if (isContentActive) {
                // Si actif, le fermer
                content.style.maxHeight = 0;
                content.classList.remove('active');
                title.classList.remove('active');
            } else {
                // Si inactif, l'ouvrir
                // La clé est de définir le max-height sur la hauteur réelle du contenu
                content.style.maxHeight = content.scrollHeight + "px"; 
                content.classList.add('active');
                title.classList.add('active');
            }
        });
    });
});