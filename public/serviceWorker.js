const staticCacheName = "static-cache-v2";
const dynamicCacheName = "dynamic-cache-v1";
const staticAssets = [
   "./",
   "./index.html",
   "./favicon.png",
   "./favicon.ico",
   "./manifest.webmanifest",
   "./offline.html",
];

// manage cache size
const manageCacheSize = (name, size) => {
   caches.open(name).then((cache) => {
      cache.keys().then((keys) => {
         if (keys.length > size) {
            // remove oldest cache key with content until keys.length < size
            cache.delete(keys[0]).then(() => {
               manageCacheSize(name, size);
            });
         }
      });
   });
};

// install
this.addEventListener("install", async (event) => {
   const cache = await caches.open(staticCacheName);
   await cache.addAll(staticAssets);
   return this.skipWaiting();
});

// activate
this.addEventListener("activate", async (event) => {
   event.waitUntil(
      caches.keys().then((keys) => {
         return Promise.all(keys.filter((key) => key !== staticCacheName).map((key) => caches.delete(key)));
      })
   );
});

// fetch
this.addEventListener("fetch", async (event) => {
   if (!(event.request.url.indexOf("http") === 0)) return;
   if (event.request.method !== "GET") return;
   // Notification
   await event.waitUntil(this.registration.showNotification("hello", { body: "i am a notification" }));
   // Checking Connection
   // if(!navigator.onLine){}
   event.respondWith(
      (async () => {
         const responseInCache = await caches.match(event.request);
         if (responseInCache) return responseInCache;
         try {
            const freshResponse = await fetch(event.request);
            const cache = await caches.open(dynamicCacheName);
            cache.put(event.request.url, freshResponse.clone());
            manageCacheSize(dynamicCacheName, 20);
            return freshResponse;
         } catch (error) {
            // if (event.request.url.indexOf(".html") > -1) return caches.match("offline.html");
            return caches.match("offline.html");
         }
      })()
   );
});

// {
//    "subject": "mailto: <mehranjamali115@gmail.com>",
//    "publicKey": "BNr6-0Jcuqf-Y4oHCyLfwvCZZVh712l_G0zQxy8gacq5KhUmCor48b6rLwy4yq0LUaCA7IPnZwqGToA9fHJ00I0",
//    "privateKey": "SVJdf50MdtXh9FNkANYLieqQVWhtZ7IoR0JK9_tpQfo"
//    }
