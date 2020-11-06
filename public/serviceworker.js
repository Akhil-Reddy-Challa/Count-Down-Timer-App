const CACHE_NAME = "offline-app";
const urlsToCache = [
  "index.html",
  "runtime-main.515e7d0a.js",
  "main.4ae72433.chunk.js",
  "runtime-main.515e7d0a.js.map",
  "main.4ae72433.chunk.js.map",
  "2.43767341.chunk.js.map",
  "2.43767341.chunk.js",
  "fontawesome-webfont.b06871f2.ttf",
  "fontawesome-webfont.912ec66d.svg",
  "fontawesome-webfont.fee66e71.woff",
  "fontawesome-webfont.af7ae505.woff2",
  "fontawesome-webfont.674f50d2.eot",
  "main.179ae5d4.chunk.css.map",
  "main.179ae5d4.chunk.css",
  "2.79455ca0.chunk.css.map",
  "2.79455ca0.chunk.css",
];
const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("index.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
