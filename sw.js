const VERSION = "v2.5";

const CACHE_NAME = `YGVKN-PWA-${VERSION}`;

const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/app.webmanifest",
  "/app.js",
  "/icons",
  "/style.css",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(APP_STATIC_RESOURCES);
    })
  );
});


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
