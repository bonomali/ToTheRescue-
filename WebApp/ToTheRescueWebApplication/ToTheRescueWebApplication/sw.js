console.log('I am a Service Worker!');

self.addEventListener('install', event => {
    // Bypass the waiting lifecycle stage,
    // just in case there's an older version of this SW registration.
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    // Take control of all pages under this SW's scope immediately,
    // instead of waiting for reload/navigation.
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // In a real app, you'd use a more sophisticated URL check.
});