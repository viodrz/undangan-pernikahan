'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "4fa301afbb24efa9fbe54b0fc3db44f7",
"index.html": "cd275273e32b0f80c752a706624e571b",
"/": "cd275273e32b0f80c752a706624e571b",
"main.dart.js": "ced07a64d08469c946258dd940ca7090",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "31b8d9ab868942ca73d5e415adb85d4b",
"assets/AssetManifest.json": "ffdcaf9ab4e6a2fae39b8dbaaada7b96",
"assets/NOTICES": "a51c452e922bce160406a6c7ef238d77",
"assets/FontManifest.json": "f5cd2682e27ae399b09d46b48a45e65e",
"assets/AssetManifest.bin.json": "5384671365a9e9899a3682de0d2eb960",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/flutter_map/lib/assets/flutter_map_logo.png": "208d63cc917af9713fc9572bd5c09362",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c9ebf0c73d6caf8191b8074fdce9e7a3",
"assets/fonts/MaterialIcons-Regular.otf": "bd8c566ff6c4212e634edf1222572c30",
"assets/assets/images/envelope.png": "d9ed25c4d65a46e80591d64e1cf6f682",
"assets/assets/images/8.png": "0d76f7c5828b8719283997be27a58446",
"assets/assets/images/flower3.png": "c019306cd406f5568791590c86aaf13f",
"assets/assets/images/pengantin.png": "1c9722cc5b3a4e96f99b6eb8f2f3f1b5",
"assets/assets/images/map.png": "39ecf304195101200609bbb6e9872580",
"assets/assets/images/flower-center.png": "357b4da6b362f1114dcc72567fb2a506",
"assets/assets/images/placeholder.png": "7b0fc0199f7dff9f97ad598670789761",
"assets/assets/images/ring.png": "1e17c5be73aafe1d0f116bc12e554b44",
"assets/assets/images/cloud.png": "e0d24fabf9eeb383b7e85efcdc476f2e",
"assets/assets/images/4.png": "a153c80383e1f90dbd7d2cd1ace0af2d",
"assets/assets/images/5.png": "5ac79c46788df0fca83b838ec3698b1b",
"assets/assets/images/7.png": "3debcb4bf1a33993496c05fd3c60a991",
"assets/assets/images/flower-left.png": "b92703cca63e9e7cb8165922ead6466b",
"assets/assets/images/line.png": "73992c639a1e72834802f5165cfe1182",
"assets/assets/images/6.png": "eabee971c0aa376cf2c495761509d1aa",
"assets/assets/images/2.png": "3ed086f48fac767a21e45c9259424de5",
"assets/assets/images/Copy%2520of%2520Undangan%2520Page%2520(648%2520x%25201152%2520px).zip": "19206d00f414cdb4e2a3ae25efe98f80",
"assets/assets/images/3.png": "20449b783addd0c5ae734da7dc1b151a",
"assets/assets/images/1.png": "8e370f3e85dc80c5f00b3e47439fe40e",
"assets/assets/audio/music.mp3": "8c8e6320d599e02febd75f134cdc9184",
"assets/assets/fonts/sailors/sailors.otf": "7335623e4455222bb5cfea207da0b4e0",
"assets/assets/fonts/glacial/GlacialIndifference-Regular.otf": "13dc531a2ffd9ca7eeb500515774fa74",
"assets/assets/fonts/glacial/GlacialIndifference-Italic.otf": "69b161f1f0d94f15afefbd34a37566d8",
"assets/assets/fonts/glacial/GlacialIndifference-Bold.otf": "f801e234d51049bd538d3d95f6f4e110",
"assets/assets/fonts/railey/Railey-Regular.ttf": "9c080e9c6cab37228b6efdfd9fb6e2f9",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
