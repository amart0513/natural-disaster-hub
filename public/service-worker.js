//defines cache
const CACHE_NAME = 'stormready-v1';
//list of files to cache for offline use
const urlsToCache = [
  '/',
  '/main/index.html',
  '/main/css/styles.css',
  '/main/js/main.js',
  '/main/images/tornado.jpg',
  '/offline.html'
];

//runs once to install the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(urlsToCache); //stores all files to cache
    })
  );
});

//catches network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    //tries to return cached version and resorts to offline file as fallback
    fetch(event.request).catch(() => caches.match(event.request) || caches.match('/offline.html'))
  );
});
