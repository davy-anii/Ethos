const CACHE_NAME = "ETHOS AI-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/site.webmanifest",
  "/favicon.ico",
  "/lucide.standalone.js",
  "/fonts/inter-local.css",
  "/fonts/inter-regular.woff2",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16x16.png",
  "/icons/favicon-32x32.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
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
  const url = new URL(event.request.url);
  // Bypass service worker for API calls and external model downloads (Hugging Face / WebLLM)
  if (url.pathname.startsWith('/api/') || url.hostname !== location.hostname) {
    return; // Let the browser handle it normally
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("/index.html");
    })
  );
});
