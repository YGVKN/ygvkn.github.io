const VERSION = "v2.8";

const CACHE_NAME = `YGVKN-PWA-${VERSION}`;
//APPSHELLFILES
const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",

  "/style.css",
  "/app.js",
  "/icons"

  //"/favicon.ico",
  //"/app.webmanifest",
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
