  (function() {
      var CACHE_VERSION = '20100418';

      var CONFIG = {
          cacheName: 'notesCache' + CACHE_VERSION,
          path: 'https://evanye1990.github.io/notes'
      }

      /* 缓存列表 */
      var filesToCache = [
          CONFIG.path + '/',
          CONFIG.path + '/assets/css/style.css',
          CONFIG.path + '/assets/js/index.js'
      ];

      self.addEventListener('install', function(e) {
          console.log('[ServiceWorker] Install');
          // e是一个InstallEvent对象,继承自ExtendableEvent
          // 其中的waitUntil()方法接收一个promise对象，直到这个promise对象成功resolve之后，才会继续运行sw.js
          e.waitUntil(
              // caches是一个CacheStorage对象，使用open()方法打开一个缓存，缓存通过名称进行区分
              // 获得cache实例之后，调用addAll()方法缓存文件
              caches.open(CONFIG.cacheName).then(function(cache) {
                  console.log('[ServiceWorker] Caching app shell');
                  cache.addAll(filesToCache)
                  return false;
              })
          );
      });

      self.addEventListener('activate', function(e) {
          console.log('[ServiceWorker] Activate');
          e.waitUntil(
              caches.keys().then(function(cacheNames) {
                  return Promise.all(cacheNames.map(function(cacheName) {
                      if (cacheName !== CONFIG.cacheName) {
                          console.log('[ServiceWorker] Removing old cache', cacheName);
                          return caches.delete(cacheName);
                      }
                  }))
              })
          );
          return self.clients.claim();
      });

      self.addEventListener('fetch', function(e) {
          console.log('[Service Worker] Fetch', e.request.url);
          /*
           * The app is asking for app shell files. In this scenario the app uses the
           * "Cache, falling back to the network" offline strategy:
           * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
           */
          e.respondWith(
              caches.match(e.request).then(function(response) {
                  if (response) {
                      return response;
                  }

                  var fetchRequest = e.request.clone();
                  return fetch(fetchRequest).then(function(response) {
                      // 保证response的类型是basic，这表示请求本身是同源的，非同源（即跨域）的请求也不能被缓存
                      if (!response || response.status !== 200 || response.type !== 'basic') {
                          return response;
                      }

                      var responseToCache = response.clone();
                      caches.open(CONFIG.cacheName).then(function(cache) {
                          cache.put(e.request, responseToCache);
                      });
                      return response;
                  });
              })
          );
      });

  })();

  // 想让浏览器使用缓存，还需要拦截fetch事件(拦截请求，伪造响应)
  // self.addEventListener('fetch', function (e) {
  //   console.log('[Service Worker] Fetch', e.request.url);
  //   e.responseWith(
  //     cahces.match(e.request).then(function (response) {
  //       // 首先检缓存中是否已经缓存了这个请求，如果有，就直接返回响应，就减少了一次网络请求
  //       if (response) {
  //         return response;
  //       }
  //       // 如果缓存中不存在该请求 则发起fetch
  //       var response = e.request.clone();
  //       return fetch(request).then(function (response) {
  //         // service worker请求的过程通过fetch api完成，得到response对象以后进行过滤，查看是否是图片文件，如果不是，就直接返回请求，不会缓存
  //         if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
  //           return response;
  //         }
  //         // 如果是图片，要先复制一份response，原因是request或者response对象属于stream，只能使用一次，之后一份存入缓存，另一份发送给页面。
  //         var responseClone = response.clone();
  //         cahces.open('cache-v1').then(function (cache) {
  //           cache.put(e.request, responseClone);
  //         });
  //         return response;
  //       })
  //     })
  //   )
  // });