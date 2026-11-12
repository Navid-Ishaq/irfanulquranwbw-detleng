/* Irfan-ul-Quran shell cache only. DOCX data remains network-fresh. */
const CACHE = 'irfan-pwa-shell-v1';
const SHELL = ['./','./index.html','./styles.css','./irfan.css','./iq-experience.css','./iq-polish.css','./app.js','./irfan-paras.js','./iq-experience.js','./iq-polish.js','./vendor/jszip.min.js','./assets/favicon.svg','./pwa-install.css','./pwa-install.js','./assets/icons/icon-192.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('irfan-pwa-shell-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(/\.(?:docx|pdf)(?:$|\?)/i.test(url.pathname))return;
 if(req.mode==='navigate')event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));
});
