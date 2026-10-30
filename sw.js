// Parsec & Co : le service worker de l’appli installée.
// Réseau d’abord : en ligne, on a toujours la dernière version du jeu ; hors ligne, on rejoue la dernière version vue.
const CACHE = "parsec-v1";
const FICHIERS = [
  "./", "index.html", "manifest.webmanifest", "css/style.css",
  "js/galaxie.js", "js/etat.js", "js/interface.js", "js/carte.js", "js/sons.js", "js/ecoute.js", "js/voyage.js", "js/expeditions.js", "js/soute.js", "js/demarrage.js",
  "mondes/rocheux.js", "mondes/gazeux.js", "mondes/desert.js", "mondes/glace.js", "mondes/volcan.js", "mondes/toxique.js",
  "mondes/crateres.js", "mondes/ocean.js", "mondes/jungle.js", "mondes/tempere.js", "mondes/etrange.js", "mondes/habite.js",
  "icones/icone.svg", "icones/icone-180.png", "icones/icone-192.png", "icones/icone-512.png"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok || r.type === "opaque") { const copie = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
