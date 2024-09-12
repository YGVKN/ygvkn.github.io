const VERSION = "v1.1.1";

const CACHE_NAME = `YGVKN-PWA-${VERSION}`;
//
const APPSHELLFILES = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/app.webmanifest",
  "/style.css",
  "/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(APPSHELLFILES);
    },
      (err) => {console.log(err)});});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CacheKey) {
          return caches.delete(key);
        }
      }));
    })
  );
});


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })); });
