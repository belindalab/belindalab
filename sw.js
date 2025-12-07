const CACHE_NAME = 'belinda-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon-192.png',
  './icon-512.png'
];

// Установка: Кэшируем основные файлы приложения
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Запрос: Отдаем из кэша, если есть, иначе идем в сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Ответ из кэша
        if (response) {
          return response;
        }
        // Запрос в сеть (для API)
        return fetch(event.request);
      })
  );
});
