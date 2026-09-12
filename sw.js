const CACHE_NAME = 'cyber-planner-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'TRIGGER_NOTIFICATION') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body
    });
  }
});
