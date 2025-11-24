const CACHE_NAME = 'kop-sud-asse-v1';
const urlsToCache = [
  '/Kop_Sud/',
  '/Kop_Sud/index.html',
  '/Kop_Sud/photos.html',
  '/Kop_Sud/chant.html',
  '/Kop_Sud/calendrier.html',
  '/Kop_Sud/meteo.html',
  '/Kop_Sud/stade.html',
  '/Kop_Sud/classement.html',
  '/Kop_Sud/css/style.css',
  // Ajoutez vos images importantes ici
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache : Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la requête réussit, mettre en cache et retourner
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si offline ou erreur, utiliser le cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // Page de fallback si pas en cache
          if (event.request.mode === 'navigate') {
            return caches.match('/Kop_Sud/index.html');
          }
        });
      })
  );
});