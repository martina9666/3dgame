const CACHE='taverna-maledetta-3d-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const THREE='https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);try{await c.add(THREE)}catch(_e){}self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const cached=await caches.match(e.request);if(cached)return cached;try{const r=await fetch(e.request);const c=await caches.open(CACHE);c.put(e.request,r.clone()).catch(()=>{});return r}catch(err){if(e.request.mode==='navigate')return caches.match('./index.html');throw err}})())});