window.self.addEventListener('install', function (event) {
  event.waitUntil(
    window.caches.open('v1').then(function (cache) {
      return cache.addAll([
        './js/app.js'
      ])
    })
  )
})

window.self.addEventListener('activate', function (event) {
  // You're good to go!
})

window.self.addEventListener('fetch', (event) => {
  event.respondWith(
    // window.caches.match(event.request)
  )
})
