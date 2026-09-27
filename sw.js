const CACHE_NAME = 'statlab-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './src/css/styles.css',
  './src/js/app.js',
  './src/js/calculator.js',
  './src/js/statistics.js',
  './src/js/probability.js',
  './src/js/distributions.js',
  './src/js/hypothesis.js',
  './src/js/regression.js',
  './src/js/simulation.js',
  './src/js/practice.js',
  './src/js/exercises.js',
  './src/js/formulas.js',
  './src/lib/chart.umd.js',
  './src/lib/math.js',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon.png',
  './assets/apple-touch-icon.png'
];

// Install event — cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch((err) => console.error('Cache error:', err))
  );
  self.skipWaiting();
});

// Activate event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});

// Fetch event — network first, fallback to cache (stale-while-revalidate pattern is better, but cache-first is fine for offline apps)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if found
      if (response) {
        return response;
      }
      // Otherwise fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Optionally cache the new request here if desired
        return networkResponse;
      });
    }).catch(() => {
      // If both fail (offline and not in cache), could return a fallback page here
    })
  );
});
