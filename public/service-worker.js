const CACHE_NAME = "ETHOS AI-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/site.webmanifest"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("/index.html");
    })
  );
});
