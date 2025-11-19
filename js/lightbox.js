// Attendre que tout le HTML soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sélectionner tous les éléments qui déclenchent la lightbox
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    // 2. Sélectionner la lightbox et son contenu
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeBtn = document.querySelector('.close-btn');

    // 3. Boucler sur tous les triggers et ajouter l'écouteur d'événement
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le lien de naviguer vers l'image directement

            // Récupère l'URL de l'image à partir de l'attribut href du lien
            const imageUrl = this.getAttribute('href'); 

            // Met à jour la source de l'image dans la lightbox
            lightboxContent.setAttribute('src', imageUrl);

            // Affiche la lightbox (retire la classe 'hidden')
            lightbox.classList.remove('hidden');
        });
    });

    // 4. Fermer la lightbox lorsque l'utilisateur clique sur le bouton de fermeture
    closeBtn.addEventListener('click', function() {
        lightbox.classList.add('hidden'); // Cache la lightbox
        lightboxContent.setAttribute('src', ''); // Vide la source de l'image
    });

    // 5. Fermer la lightbox si l'utilisateur clique en dehors de l'image
    lightbox.addEventListener('click', function(e) {
        // Vérifie si le clic a eu lieu directement sur le conteneur de la lightbox (pas sur l'image)
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightboxContent.setAttribute('src', '');
        }
    });
});