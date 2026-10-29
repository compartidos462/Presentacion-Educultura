// Funciona sin internet: guarda la presentación, las fuentes y jsPDF en el equipo.
// La página se pide primero a internet (para tener siempre la última versión) y, si no hay conexión, se usa la copia guardada.
const V='dc-1793306262';
const FILES=['./','index.html','vendor/fonts.css','vendor/jspdf.umd.min.js',
 'vendor/fonts/plus-jakarta-sans-latin-400-normal.woff2','vendor/fonts/plus-jakarta-sans-latin-500-normal.woff2',
 'vendor/fonts/plus-jakarta-sans-latin-600-normal.woff2','vendor/fonts/plus-jakarta-sans-latin-700-normal.woff2',
 'vendor/fonts/plus-jakarta-sans-latin-800-normal.woff2'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return; // Supabase y otros: directo a internet
  const page=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html');
  if(page){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{ const cp=r.clone(); caches.open(V).then(c=>c.put('index.html',cp)); return r; })
      .catch(()=>caches.match('index.html').then(r=>r||caches.match('./'))));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{ const cp=n.clone(); caches.open(V).then(c=>c.put(e.request,cp)); return n; })));
  }
});
