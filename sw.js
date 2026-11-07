/* Offline-Speicher für die Zahlen-Sanduhr. Bei jeder Änderung an der App VERSION hochzählen. */
const VERSION = 'z1-v2';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'data.js', 'pools.js', 'manifest.json',
  'fonts/cinzel-latin-600-normal.woff2', 'fonts/cinzel-latin-700-normal.woff2',
  'fonts/nunito-latin-400-normal.woff2', 'fonts/nunito-latin-700-normal.woff2',
  'fonts/nunito-latin-800-normal.woff2', 'fonts/nunito-latin-900-normal.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const IMGS = ['start', 'E1', 'R1', 'R2', 'R3', 'R4', 'R5', 'M1', 'M2', 'M3', 'M4', 'M5'];
const OPTIONAL = [...IMGS.flatMap(k => ['img/' + k + '.webp', 'img/' + k + '.jpg', 'img/' + k + '.png']), 'img/livia.png', 'img/balam.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(SHELL);
    await Promise.allSettled(OPTIONAL.map(u => c.add(u)));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy));
    }
    return res;
  })));
});
