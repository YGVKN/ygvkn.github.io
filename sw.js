const VERSION = "v2.9";

const CACHE_NAME = `YGVKN-PWA-${VERSION}`;
//APPSHELLFILES
const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/app.webmanifest",
  "/style.css",
  "/app.js",
  "/icons"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(APP_STATIC_RESOURCES);
    })); });

self.addEventListener("activate", (event) => {
  const cacheAllowlist = [`${CACHE_NAME}`];

  event.waitUntil(
    caches.forEach((cache, cacheName) => {
      if (!cacheAllowlist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    }),
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })); });
