const CACHE_NAME = 'computear-v1';
const CACHE_VERSION = '1.0.0';

// Files to cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json'
];

// Files to cache on demand
const CACHE_ON_DEMAND = [
    // Images, 3D models, etc will be cached when accessed
];

// Install Event - Cache essential files

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching essential files');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('Service Worker: Installation failed', error);
            })
    );
});

// Activate Event - Clean old caches

self.addEventListener('activate', (event) => {
    console.log('⚡ Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch Event - Serve from cache or network

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached response if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache:', request.url);
                    
                    // Update cache in background (stale-while-revalidate)
                    fetchAndCache(request);
                    
                    return cachedResponse;
                }
                
                // Fetch from network and cache
                console.log('Service Worker: Fetching from network:', request.url);
                return fetchAndCache(request);
            })
            .catch((error) => {
                console.error('Service Worker: Fetch failed:', error);
                
                // Return offline page for navigation requests
                if (request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                
                // Return error for other requests
                return new Response('Offline - Content not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/plain'
                    })
                });
            })
    );
});

// Helper: Fetch and Cache

function fetchAndCache(request) {
    return fetch(request)
        .then((response) => {
            // Only cache successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
                return response;
            }
            
            // Clone response (can only be consumed once)
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(request, responseToCache);
                    console.log('Service Worker: Cached:', request.url);
                });
            
            return response;
        })
        .catch((error) => {
            console.error('Service Worker: Network fetch failed:', error);
            throw error;
        });
}

// Background Sync (future feature)

self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered');
    
    if (event.tag === 'sync-data') {
        event.waitUntil(
            syncData()
        );
    }
});

async function syncData() {
    // Implement data sync logic here
    console.log('Service Worker: Syncing data...');
    // This will be used for syncing user collections, favorites, etc.
}

// Push Notifications (future feature)

self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New content available!',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('ComputeAR Heritage', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message Handler

self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.payload;
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => cache.addAll(urlsToCache))
        );
    }
});

// Log Service Worker Version

console.log(`ComputeAR Heritage Service Worker v${CACHE_VERSION} loaded!`);