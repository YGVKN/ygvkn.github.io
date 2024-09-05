const VERSION = "v2.4";

// The name of the cache
const CACHE_NAME = `YGVKN-PWA-${VERSION}`;

// The static resources that the app needs to function.
const APP_STATIC_RESOURCES = [
  "/",
  "/app.webmanifest",
  "/index.html",
  "/favicon.ico",
  "/style.css"
  "/app.js",
  "/icons",

];

//self.addEventListener("install", installEvent => {
//  installEvent.waitUntil(
//    caches.open(CACHE_NAME).then(cache => {
//      cache.addAll(APP_STATIC_RESOURCES);
//    })
//  );
//});
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
      await clients.claim();
    })()
  );
});


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

//
//// On fetch, intercept server requests
//// and respond with cached responses instead of going to network
//self.addEventListener("fetch", (event) => {
//  // As a single page app, direct app to always go to cached home page.
//  if (event.request.mode === "navigate") {
//    event.respondWith(caches.match("/"));
//    return;
//  }
//
//  // For all other requests, go to the cache first, and then the network.
//  event.respondWith(
//    (async () => {
//      const cache = await caches.open(CACHE_NAME);
//      const cachedResponse = await cache.match(event.request);
//      if (cachedResponse) {
//        // Return the cached response if it's available.
//        return cachedResponse;
//      }
//      // If resource isn't in the cache, return a 404.
//      return new Response(null, { status: 404 });
//    })()
//  );
//});
