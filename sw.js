// Rete per prima, cache come riserva: online vedi sempre l'ultima versione, offline l'app si apre lo stesso.
const C="autopilota-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["/","/manifest.webmanifest","/icon-180.png","/icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("/"))));
});
