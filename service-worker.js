const CACHE='santi-arcade-v0.6.0';
const CORE=[
  './','./index.html','./css/styles.css?v=0.6.0','./js/app.js?v=0.6.0',
  './js/city-seasons.js?v=0.6.0','./js/platform-v06.js?v=0.6.0','./manifest.json?v=0.6.0','./version.json','./README.md',
  './icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png',
  './assets/city-panorama.webp','./assets/santi-arcade-qr.png',
  './assets/hero-0.webp','./assets/hero-1.webp','./assets/hero-2.webp','./assets/hero-3.webp',
  './assets/hero-4.webp','./assets/hero-5.webp','./assets/hero-6.webp','./assets/hero-7.webp',
  './sounds/menu-theme.mp3','./sounds/city-quest-theme.mp3','./sounds/victory-theme.mp3'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key.startsWith('santi-arcade-')&&key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim()));
});

async function networkFirst(request,fallback){
  const cache=await caches.open(CACHE);
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response.ok)await cache.put(fallback||request,response.clone());
    return response;
  }catch(_){return(await cache.match(fallback||request))||Response.error()}
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('/version.json')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match('./version.json')));
    return;
  }
  if(event.request.mode==='navigate'){
    event.respondWith(networkFirst(event.request,'./index.html'));
    return;
  }
  event.respondWith(networkFirst(event.request));
});
